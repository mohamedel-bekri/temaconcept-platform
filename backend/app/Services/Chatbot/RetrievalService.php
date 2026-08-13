<?php

namespace App\Services\Chatbot;

use App\Models\KnowledgeChunk;
use App\Services\Ai\OpenAiClient;
use App\Services\Ai\OpenAiException;
use App\Support\TextNormalizer;

class RetrievalService
{
    public function __construct(private OpenAiClient $openAi)
    {
    }

    /**
     * Recherche sémantique (embeddings) si disponible, sinon recherche
     * par mots-clés. Retourne une liste de paires [chunk, score] triées.
     *
     * @return array<int, array{chunk: KnowledgeChunk, score: float}>
     */
    public function search(string $query, int $topK = null): array
    {
        $topK ??= (int) config('chatbot.retrieval.top_k', 4);

        $chunks = KnowledgeChunk::query()->where('active', true)->get();
        if ($chunks->isEmpty()) {
            return [];
        }

        $embedding = $this->tryEmbed($query);

        $results = $embedding !== null
            ? $this->semanticSearch($chunks, $embedding, $topK)
            : $this->keywordSearch($chunks, $query, $topK);

        $minimum = (float) config('chatbot.retrieval.min_score', 0.18);

        return array_values(array_filter(
            $results,
            fn (array $result) => $result['score'] >= $minimum
        ));
    }

    private function tryEmbed(string $query): ?array
    {
        if (! $this->openAi->isAvailable()) {
            return null;
        }

        try {
            return $this->openAi->embed($query);
        } catch (OpenAiException $e) {
            report($e);

            return null;
        }
    }

    /**
     * @param \Illuminate\Support\Collection<int, KnowledgeChunk> $chunks
     * @param array<int, float> $queryVector
     * @return array<int, array{chunk: KnowledgeChunk, score: float}>
     */
    private function semanticSearch($chunks, array $queryVector, int $topK): array
    {
        $scored = [];

        foreach ($chunks as $chunk) {
            $vector = $chunk->getEmbeddingVector();
            if ($vector === []) {
                continue;
            }

            $scored[] = [
                'chunk' => $chunk,
                'score' => $this->cosine($queryVector, $vector),
            ];
        }

        usort($scored, fn ($a, $b) => $b['score'] <=> $a['score']);

        return array_slice($scored, 0, $topK);
    }

    /**
     * Recherche par mots-clés avec pondération IDF : les mots-outils
     * (de, pour, une…) sont ignorés pour que les termes discriminants
     * (livraison, serveur, mobile) dominent le classement.
     *
     * @param \Illuminate\Support\Collection<int, KnowledgeChunk> $chunks
     * @return array<int, array{chunk: KnowledgeChunk, score: float}>
     */
    private function keywordSearch($chunks, string $query, int $topK): array
    {
        $queryTokens = $this->significantTokens($query);
        if ($queryTokens === []) {
            return [];
        }

        $total = $chunks->count();
        $docFrequency = [];
        $haystacks = [];

        foreach ($chunks as $chunk) {
            $hay = TextNormalizer::normalize($chunk->title.' '.$chunk->content);
            $haystacks[$chunk->id] = $hay;
            foreach ($queryTokens as $token) {
                if (substr_count($hay, $token) > 0) {
                    $docFrequency[$token] = ($docFrequency[$token] ?? 0) + 1;
                }
            }
        }

        $scored = [];
        foreach ($chunks as $chunk) {
            $hay = $haystacks[$chunk->id];
            $score = 0.0;
            foreach ($queryTokens as $token) {
                $count = substr_count($hay, $token);
                if ($count === 0) {
                    continue;
                }
                $idf = log(1 + $total / (1 + ($docFrequency[$token] ?? 1)));
                $score += $count * $idf;
            }
            if ($score > 0) {
                $scored[] = ['chunk' => $chunk, 'score' => $score];
            }
        }

        usort($scored, fn ($a, $b) => $b['score'] <=> $a['score']);

        return array_slice($scored, 0, $topK);
    }

    /**
     * @return array<int, string>
     */
    private function significantTokens(string $query): array
    {
        $stop = [
            'de', 'du', 'des', 'le', 'la', 'les', 'un', 'une', 'et', 'ou', 'o',
            'pour', 'dans', 'sur', 'avec', 'mon', 'ma', 'mes', 'je', 'tu',
            'nous', 'votre', 'vos', 'a', 'au', 'aux', 'en', 'que', 'qui',
            'quoi', 'ce', 'cette', 'ces', 'ne', 'pas', 'il', 'elle', 'on',
            'y', 'se', 'sa', 'son', 'ses', 'leur', 'leurs', 'to', 'of', 'for',
            'in', 'and', 'is', 'are', 'at', 'from', 'by', 'as', 'an', 'the',
        ];

        return array_values(array_filter(
            TextNormalizer::tokens($query),
            fn ($token) => mb_strlen($token) > 1 && ! in_array($token, $stop, true)
        ));
    }

    public function cosine(array $a, array $b): float
    {
        $dot = 0.0;
        $normA = 0.0;
        $normB = 0.0;
        $count = min(count($a), count($b));

        for ($i = 0; $i < $count; $i++) {
            $dot += $a[$i] * $b[$i];
            $normA += $a[$i] * $a[$i];
            $normB += $b[$i] * $b[$i];
        }

        if ($normA == 0.0 || $normB == 0.0) {
            return 0.0;
        }

        return $dot / (sqrt($normA) * sqrt($normB));
    }
}
