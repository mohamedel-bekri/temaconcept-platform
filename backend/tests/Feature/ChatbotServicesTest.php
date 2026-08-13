<?php

namespace Tests\Feature;

use App\Services\Chatbot\IntentClassifier;
use App\Services\Chatbot\LeadScoring;
use App\Services\Chatbot\RetrievalService;
use Database\Seeders\KnowledgeSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ChatbotServicesTest extends TestCase
{
    use RefreshDatabase;

    public function test_intent_classifier_identifies_intents(): void
    {
        $classifier = app(IntentClassifier::class);

        $this->assertSame('greeting', $classifier->classify('Bonjour, salam !')['intent']);
        $this->assertSame('pricing', $classifier->classify('Quels sont vos tarifs ?')['intent']);
        $this->assertSame('contact', $classifier->classify('J\'aimerais avoir votre numéro de téléphone')['intent']);
        $this->assertSame('human', $classifier->classify('Parlez-moi à un conseiller humain')['intent']);
        $this->assertSame('thanks', $classifier->classify('Merci beaucoup')['intent']);
        $this->assertTrue($classifier->classify('Je veux parler à quelqu\'un')['asked_human']);
    }

    public function test_intent_classifier_supports_arabic(): void
    {
        $classifier = app(IntentClassifier::class);

        $this->assertSame('greeting', $classifier->classify('مرحبا')['intent']);
    }

    public function test_lead_scoring_weights_fields(): void
    {
        $scoring = app(LeadScoring::class);

        $empty = $scoring->score(['intent' => 'default']);
        $this->assertSame(0, $empty['score']);

        $full = $scoring->score([
            'name' => 'Karim',
            'company' => 'Atlas',
            'email' => 'k@example.com',
            'phone' => '0612345678',
            'role' => 'Directeur',
            'budget' => '100k',
            'timeline' => 'urgent',
            'need' => 'application mobile',
            'intent' => 'lead',
        ]);
        $this->assertSame(85, $full['score']);
    }

    public function test_keyword_retrieval_returns_relevant_chunks(): void
    {
        $this->seed(KnowledgeSeeder::class);

        $results = app(RetrievalService::class)->search('application mobile de livraison pour livreurs', 3);

        $this->assertNotEmpty($results);
        $this->assertStringContainsString('application', $results[0]['chunk']->slug);
    }
}
