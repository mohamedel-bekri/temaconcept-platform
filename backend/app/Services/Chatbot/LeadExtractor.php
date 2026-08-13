<?php

namespace App\Services\Chatbot;

use App\Support\TextNormalizer;

class LeadExtractor
{
    /**
     * Extrait les champs structurés d'un lead depuis l'historique des
     * messages de l'utilisateur, complété optionnellement par un
     * enrichissement LLM (JSON).
     *
     * @param array<int, string> $userMessages
     * @param array<string, mixed>|null $llmFields
     */
    public function extract(array $userMessages, ?array $llmFields = null): array
    {
        $text = implode("\n", $userMessages);
        $fields = $this->rules($text);

        if (is_array($llmFields)) {
            foreach ($llmFields as $key => $value) {
                if (is_string($value) && filled($value) && ! isset($fields[$key])) {
                    $fields[$key] = $value;
                }
            }
        }

        return array_filter($fields, fn ($value) => filled($value));
    }

    /**
     * @return array<string, string>
     */
    private function rules(string $text): array
    {
        $fields = [];

        if (preg_match('/[\w.+-]+@[\w-]+\.[\w.-]+/', $text, $matches)) {
            $fields['email'] = $matches[0];
        }

        $phonePatterns = [
            '/(?:\+212|00212)[\s.-]?\d[\s.-]?\d{2}[\s.-]?\d{2}[\s.-]?\d{2}[\s.-]?\d{2}/',
            '/\b0[567]\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}\b/',
            '/\b(\d{2}[\s.-]?\d{2}[\s.-]?\d{2}[\s.-]?\d{2})\b/',
        ];
        foreach ($phonePatterns as $pattern) {
            if (preg_match($pattern, $text, $matches)) {
                $fields['phone'] = $matches[0];
                break;
            }
        }

        $namePatterns = [
            '/je m[\' ]appelle\s+([A-ZÀ-ÿ][A-Za-zÀ-ÿ\'\-]+(?:\s+[A-ZÀ-ÿ][A-Za-zÀ-ÿ\'\-]+)*)/',
            '/moi c[\' ]est\s+([A-ZÀ-ÿ][A-Za-zÀ-ÿ\'\-]+(?:\s+[A-ZÀ-ÿ][A-Za-zÀ-ÿ\'\-]+)*)/',
            '/mon nom est\s+([A-ZÀ-ÿ][A-Za-zÀ-ÿ\'\-]+(?:\s+[A-ZÀ-ÿ][A-Za-zÀ-ÿ\'\-]+)*)/',
            '/اسمي\s+([\p{Arabic}][\p{Arabic}\s]{1,40})/u',
        ];
        foreach ($namePatterns as $pattern) {
            if (preg_match($pattern, $text, $matches)) {
                $fields['name'] = mb_convert_case(trim($matches[1]), MB_CASE_TITLE);
                break;
            }
        }

        $companyPatterns = [
            '/je travaille (?:pour|chez|a|au sein de|dans)\s+([A-Za-z0-9À-ÿ&.\'\- ]{2,50})/i',
            '/notre (?:entreprise|societe|boite|structure|société)\s*(?:est|s[\' ]appelle|appelle)?\s*([A-Za-z0-9À-ÿ&.\'\- ]{2,50})/i',
            '/nous sommes\s+([A-Za-z0-9À-ÿ&.\'\- ]{2,50})/i',
            '/la (?:societe|société|boite|compagnie)\s*([A-Za-z0-9À-ÿ&.\'\- ]{2,50})/i',
            '/شركتنا\s*([\p{Arabic}][\p{Arabic}\s0-9]{1,40})/u',
        ];
        foreach ($companyPatterns as $pattern) {
            if (preg_match($pattern, $text, $matches)) {
                $fields['company'] = rtrim(trim($matches[1]), '.,;:!?');
                break;
            }
        }

        if (preg_match('/(?:entre|de)\s*(\d[\d\s.,]*)\s*(?:a|et|à)\s*(\d[\d\s.,]*)\s*(k ?dh|dh|dirhams?|euros?|eur|€|mad)?/iu', $text, $matches)) {
            $unit = isset($matches[3]) ? ' '.$matches[3] : '';
            $fields['budget'] = trim($matches[1]).' - '.trim($matches[2]).$unit;
        } elseif (preg_match('/(?:budget|devis|enveloppe|fourchette)[^.\n]{0,40}?(\d[\d\s.,]*(?:\s*(?:k ?dh|dh|dirhams?|euros?|eur|€|mad))?)/iu', $text, $matches)) {
            $fields['budget'] = trim($matches[1]);
        }

        if (preg_match('/\b(urgent|des que possible|le plus vite possible|cette semaine|ce mois(?:-ci)?|d ici\s+\w+|avant\s+\w+|fin d annee|dans\s+\d+\s*(?:mois|semaines?|jours?))\b/iu', $text, $matches)) {
            $fields['timeline'] = $matches[1];
        }

        $rolePatterns = [
            '/je suis\s+(?:le|la|un|une)?\s*(directeur(?: general| technique| financier| commercial)?|cto|dsi|responsable|chef de projet|fondateur|fondatrice|gerant|manager|charge d affaires|architecte|developpeur|commercial)/i',
            '/en tant que\s+(?:le|la|un|une)?\s*(directeur|cto|dsi|responsable|chef de projet|fondateur|gerant|manager|charge d affaires|architecte|developpeur|commercial)/i',
        ];
        foreach ($rolePatterns as $pattern) {
            if (preg_match($pattern, $text, $matches)) {
                $fields['role'] = ucfirst($matches[1]);
                break;
            }
        }

        if (preg_match('/(?:j ai besoin|nous avons besoin|on a besoin|je veux|je voudrais|nous cherchons|nous voulons|besoin d un)[^.\n]{0,90}/iu', $text, $matches)) {
            $fields['need'] = trim(preg_replace('/\s+/u', ' ', $matches[0]));
        }

        return $fields;
    }
}
