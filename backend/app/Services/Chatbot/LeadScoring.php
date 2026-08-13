<?php

namespace App\Services\Chatbot;

class LeadScoring
{
    private array $weights = [
        'name' => 5,
        'phone' => 5,
        'email' => 10,
        'company' => 10,
        'role' => 10,
        'budget' => 10,
        'timeline' => 10,
        'need' => 15,
    ];

    /**
     * @param array<string, mixed> $fields
     * @param array<string, mixed> $flags
     * @return array{score: int, reasons: array<int, string>}
     */
    public function score(array $fields, array $flags = []): array
    {
        $score = 0;
        $reasons = [];

        foreach ($this->weights as $field => $points) {
            if (filled($fields[$field] ?? null)) {
                $score += $points;
                $reasons[] = $field;
            }
        }

        if (in_array($fields['intent'] ?? null, ['pricing', 'lead'], true)) {
            $score += 10;
            $reasons[] = 'intent';
        }

        if (! empty($flags['asked_human'])) {
            $score += 10;
            $reasons[] = 'escalation';
        }

        return [
            'score' => min(100, $score),
            'reasons' => $reasons,
        ];
    }
}
