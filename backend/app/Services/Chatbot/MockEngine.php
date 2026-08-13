<?php

namespace App\Services\Chatbot;

use App\Models\KnowledgeChunk;
use App\Models\Service;

class MockEngine
{
    public function reply(string $intent, array $context = []): array
    {
        $company = config('chatbot.company');
        $content = match ($intent) {
            'greeting' => 'Bonjour, je suis Lina. Je peux répondre à vos questions sur nos services, les devis ou notre accompagnement. Que recherchez-vous ?',
            'services' => $this->servicesReply(),
            'pricing' => 'Le budget dépend du périmètre, des intégrations et du niveau d’accompagnement. Nous préparons un devis détaillé sous 48 h après avoir compris votre besoin. Quel type de solution souhaitez-vous mettre en place ?',
            'contact' => sprintf("Vous pouvez nous joindre au %s ou à %s. Nos bureaux sont à %s, du lundi au vendredi de 9 h à 18 h.", $company['phone'], $company['email_contact'], $company['address']),
            'about' => sprintf('TEMACONCEPT est une société d’ingénierie informatique basée à Témara. Depuis %d ans, nous accompagnons les entreprises sur leurs logiciels, applications, infrastructures et projets data / IA.', $company['years']),
            'careers' => 'Vous pouvez envoyer votre CV et une courte présentation à contact@temaconcept.com, avec l’objet « Candidature ». Nous étudierons votre profil.',
            'process' => "Notre méthode suit quatre étapes : cadrage, conception, réalisation puis accompagnement en production. Chaque étape est validée avec vos équipes avant de passer à la suivante.",
            'lead' => 'Nous pouvons vous accompagner sur ce type de projet. Pour vous orienter correctement, quelle est la fonction principale que votre solution doit remplir ?',
            'human' => 'Bien sûr. Vous pouvez laisser votre email ou votre numéro de téléphone ; je vous demanderai ensuite votre accord avant de le transmettre à notre équipe.',
            'thanks' => 'Avec plaisir. Je reste disponible si vous avez une autre question.',
            default => $this->defaultReply($context),
        };
        return ['content' => $content, 'quick_replies' => $this->quickRepliesFor($intent)];
    }

    public function quickRepliesFor(string $intent): array
    {
        return match ($intent) {
            'greeting' => ['Découvrir les services', 'Demander un devis', 'Nos coordonnées'],
            'services' => ['Logiciel sur mesure', 'Application mobile', 'Infrastructure informatique'],
            'pricing' => ['Décrire mon besoin', 'Nos coordonnées'],
            'human' => ['Laisser mon email', 'Laisser mon numéro'],
            'about', 'process' => ['Découvrir les services', 'Demander un devis'],
            default => ['Découvrir les services', 'Demander un devis'],
        };
    }

    private function servicesReply(): string
    {
        $services = Service::query()->active()->orderBy('order')->get();
        if ($services->isEmpty()) return 'Nous intervenons sur les logiciels sur mesure, les applications mobiles, l’intégration, l’infrastructure, la gestion de projets et la data / IA.';
        $names = $services->take(6)->pluck('name')->implode(', ');
        return "Nos principaux domaines sont : {$names}. Lequel correspond le mieux à votre besoin ?";
    }

    private function defaultReply(array $context): string
    {
        $chunk = $context['chunk'] ?? null;
        if ($chunk instanceof KnowledgeChunk && filled($chunk->content)) return mb_substr($chunk->content, 0, 900);
        return 'Je n’ai pas cette information avec certitude. Je peux répondre sur nos services, nos devis et notre accompagnement, ou vous orienter vers un conseiller.';
    }
}
