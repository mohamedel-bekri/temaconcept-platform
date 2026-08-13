<?php

namespace App\Services\Ai;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Http;

class OpenAiClient
{
    private string $baseUrl = 'https://api.openai.com/v1';

    public function isAvailable(): bool
    {
        return filled(config('services.openai.api_key'));
    }

    /**
     * @return array<int, float>|null
     */
    public function embed(string $text): ?array
    {
        $response = Http::withToken($this->key())
            ->timeout(30)
            ->retry(1, 500)
            ->post("{$this->baseUrl}/embeddings", [
                'model' => config('services.openai.embedding_model', 'text-embedding-3-small'),
                'input' => $text,
            ]);

        if ($response->failed()) {
            throw new OpenAiException('Embedding request failed: '.$response->body());
        }

        $data = $response->json('data');

        return $data[0]['embedding'] ?? null;
    }

    public function complete(array $messages, array $options = []): string
    {
        $response = Http::withToken($this->key())
            ->timeout(45)
            ->retry(1, 500)
            ->post("{$this->baseUrl}/chat/completions", array_merge([
                'model' => config('services.openai.model', 'gpt-4o-mini'),
                'messages' => $messages,
                'temperature' => 0.6,
            ], $options));

        if ($response->failed()) {
            throw new OpenAiException('Chat completion failed: '.$response->body());
        }

        return $response->json('choices.0.message.content') ?? '';
    }

    public function completeJson(array $messages, array $options = []): ?array
    {
        $content = $this->complete($messages, array_merge($options, [
            'response_format' => ['type' => 'json_object'],
        ]));

        $decoded = json_decode($content, true);

        return is_array($decoded) ? $decoded : null;
    }

    private function key(): string
    {
        return (string) config('services.openai.api_key');
    }
}
