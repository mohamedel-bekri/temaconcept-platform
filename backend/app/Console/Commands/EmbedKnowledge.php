<?php

namespace App\Console\Commands;

use App\Models\KnowledgeChunk;
use App\Services\Ai\OpenAiClient;
use App\Services\Ai\OpenAiException;
use Illuminate\Console\Command;

class EmbedKnowledge extends Command
{
    protected $signature = 'chatbot:embed {--force : Recalcule tous les embeddings}';

    protected $description = 'Génère les embeddings OpenAI de la base de connaissances (RAG).';

    public function handle(OpenAiClient $openAi): int
    {
        if (! $openAi->isAvailable()) {
            $this->warn('Pas de clé OPENAI_API_KEY : les chunks restent en mode recherche par mots-clés.');

            return self::SUCCESS;
        }

        $chunks = KnowledgeChunk::query()
            ->when(! $this->option('force'), fn ($query) => $query->whereNull('embedding'))
            ->get();

        if ($chunks->isEmpty()) {
            $this->info('Aucun chunk à traiter.');

            return self::SUCCESS;
        }

        $bar = $this->output->createProgressBar($chunks->count());
        $bar->start();

        $failures = 0;
        foreach ($chunks as $chunk) {
            try {
                $chunk->embedding = $openAi->embed($chunk->title."\n".$chunk->content);
                $chunk->save();
            } catch (OpenAiException $e) {
                $failures++;
                $this->warn("  Échec pour [{$chunk->slug}] : {$e->getMessage()}");
            }
            $bar->advance();
        }

        $bar->finish();
        $this->newLine();
        $this->info("Terminé : {$chunks->count()} chunks traités, {$failures} échecs.");

        return $failures > 0 ? self::FAILURE : self::SUCCESS;
    }
}
