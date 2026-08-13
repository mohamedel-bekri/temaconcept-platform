<?php

namespace App\Support;

final class TextNormalizer
{
    public static function normalize(string $value): string
    {
        $value = mb_strtolower(trim($value));

        return strtr($value, [
            'à' => 'a', 'á' => 'a', 'â' => 'a', 'ä' => 'a', 'ã' => 'a', 'å' => 'a',
            'é' => 'e', 'è' => 'e', 'ê' => 'e', 'ë' => 'e',
            'î' => 'i', 'ï' => 'i', 'í' => 'i', 'ì' => 'i',
            'ô' => 'o', 'ö' => 'o', 'ò' => 'o', 'ó' => 'o',
            'ù' => 'u', 'û' => 'u', 'ü' => 'u', 'ú' => 'u',
            'ç' => 'c', 'ÿ' => 'y', 'ñ' => 'n', 'œ' => 'oe', 'æ' => 'ae',
        ]);
    }

    /**
     * @return array<int, string>
     */
    public static function tokens(string $value): array
    {
        $value = preg_replace('/[^\p{L}\p{N}\s]/u', ' ', self::normalize($value)) ?? '';

        return array_values(array_filter(preg_split('/\s+/u', $value) ?: []));
    }
}
