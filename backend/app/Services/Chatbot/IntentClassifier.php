<?php

namespace App\Services\Chatbot;

use App\Support\TextNormalizer;

class IntentClassifier
{
    public function classify(string $message): array
    {
        $text = TextNormalizer::normalize($message);

        $intent = match (true) {
            $this->matchesAny($text, config('chatbot.escalation.triggers', [])) => 'human',
            $this->matchesAny($text, $this->leadPatterns()) => 'lead',
            $this->matchesAny($text, $this->pricingPatterns()) => 'pricing',
            $this->matchesAny($text, $this->contactPatterns()) => 'contact',
            $this->matchesAny($text, $this->aboutPatterns()) => 'about',
            $this->matchesAny($text, $this->careersPatterns()) => 'careers',
            $this->matchesAny($text, $this->processPatterns()) => 'process',
            $this->matchesAny($text, $this->servicesPatterns()) => 'services',
            $this->matchesAny($text, $this->greetingPatterns()) => 'greeting',
            $this->matchesAny($text, $this->thanksPatterns()) => 'thanks',
            default => 'default',
        };

        return [
            'intent' => $intent,
            'asked_human' => $intent === 'human',
        ];
    }

    private function matchesAny(string $text, array $needles): bool
    {
        foreach ($needles as $needle) {
            if ($needle === '') {
                continue;
            }

            $words = preg_split('/\s+/u', $needle) ?: [];
            $pattern = implode('\s+', array_map(
                fn ($word) => preg_quote($word, '/').'(?:x|es|s|z)?',
                $words
            ));

            if (preg_match('/\b'.$pattern.'\b/u', $text)) {
                return true;
            }
        }

        return false;
    }

    private function greetingPatterns(): array
    {
        return [
            'bonjour', 'bonsoir', 'salut', 'hello', 'salem', 'salam', 'bon matin',
            'مرحبا', 'السلام', 'اهلا', 'صباح الخير', 'مساء الخير', 'hi', 'cc',
        ];
    }

    private function leadPatterns(): array
    {
        return [
            'j ai besoin', 'je veux', 'je voudrais', 'nous avons besoin', 'on a besoin',
            'nous cherchons', 'nous voulons', 'je cherche', 'je suis interesse',
            'je suis interessee', 'interesse par', 'besoin d un', 'besoin de',
            'notre entreprise', 'notre societe', 'notre boite', 'je m appelle',
            'moi c est', 'mon nom est', 'nous sommes', 'faire une app', 'faire un site',
            'cahier des charges', 'un projet', 'un logiciel', 'une application',
            'من شركتنا', 'نحتاج', 'اريد', 'عندنا مشروع', 'شركتنا',
        ];
    }

    private function pricingPatterns(): array
    {
        return [
            'prix', 'tarif', 'cout', 'combien', 'devis', 'budget', 'cher',
            'facturation', 'honoraires', 'paiement', 'conditions de paiement',
            'price', 'cost', 'quote', 'expensive',
            'سعر', 'تكلفة', 'ثمن', 'كم يكلف', 'شحال', 'الدفع', 'دفع',
        ];
    }

    private function contactPatterns(): array
    {
        return [
            'contact', 'telephone', 'appel', 'appeler', 'email', 'mail', 'adresse',
            'joindre', 'rendez vous', 'rdv', 'phone', 'call', 'address',
            'horaires', 'heure de travail', 'heures de travail', 'heure d ouverture',
            'heures d ouverture', 'ouverture', 'ferme', 'ouvert', 'disponible',
            'jours de travail', 'jours ouvre', 'situes', 'situe', 'localisation',
            'emplacement', 'ville', 'temara', 'tamara', 'rabat', 'maroc', 'acces',
            'ou etes vous', 'etes vous situes', 'etes vous bases',
            'هاتف', 'اتصال', 'عنوان', 'رقم', 'تواصل', 'ساعات', 'اوقات', 'مواعيد',
        ];
    }

    private function aboutPatterns(): array
    {
        return [
            'qui etes vous', 'qui es tu', 'qui est temaconcept', 'que fait temaconcept',
            'que faites vous', 'parlez moi de votre entreprise', 'parle moi de votre entreprise',
            'parle moi de vous', 'parlez moi de vous', 'votre societe', 'votre entreprise',
            'a propos de temaconcept', 'a propos', 'presentation de l entreprise',
            'presentation', 'historique', 'l histoire', 'experience', 'fondateur',
            'dirige', 'fonde', 'c est quoi temaconcept', 'c est qui temaconcept',
            'qu est ce que temaconcept', 'que savez vous',
            'من انتم', 'من انت', 'عن الشركة', 'عنكم', 'ما هي تيماكونسبت',
        ];
    }

    private function careersPatterns(): array
    {
        return [
            'recrutement', 'recrute', 'embauche', 'offre d emploi', 'offre de travail',
            'poste', 'stage', 'stagiaire', 'carriere', 'candidature', 'cv',
            'travailler chez vous', 'rejoindre', 'postuler',
            'وظيفة', 'توظيف', 'شغل', 'تدريب', 'وظائف',
        ];
    }

    private function processPatterns(): array
    {
        return [
            'methode', 'methodologie', 'etapes', 'demarche', 'processus',
            'deroulement', 'comment travaillez', 'comment ca se passe',
            'comment procedez', 'comment se passe', 'comment fonctionne',
            'كيف تعملون', 'المنهجية', 'مراحل',
        ];
    }

    private function servicesPatterns(): array
    {
        return [
            'service', 'logiciel', 'application', 'app mobile', 'application mobile',
            'site web', 'site internet', 'web', 'mobile', 'integration', 'infrastructure',
            'reseau', 'serveur', 'servers', 'data', 'donnees', 'analytics', 'ia',
            'intelligence artificielle', 'gestion de projet', 'systeme', 'solution',
            'e-commerce', 'erp', 'crm', 'cloud', 'securite', 'developpement',
            'ios', 'android', 'devops', 'agence', 'qcm', 'savoir faire',
            'خدمات', 'برمجيات', 'تطبيق', 'بنية تحتية', 'شبكة', 'خوادم',
        ];
    }

    private function thanksPatterns(): array
    {
        return ['merci', 'thank', 'شكرا', 'شكرا جزيلا', 'choukran'];
    }
}
