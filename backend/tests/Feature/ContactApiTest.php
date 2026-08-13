<?php

namespace Tests\Feature;

use App\Models\Lead;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ContactApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_contact_form_creates_lead(): void
    {
        $response = $this->postJson('/api/contact', [
            'name' => 'Sara Bennani',
            'email' => 'sara@example.com',
            'phone' => '+212 6 12 34 56 78',
            'company' => 'Bennani & Fils',
            'message' => 'Nous cherchons à digitaliser notre gestion de stock.',
        ]);

        $response->assertCreated();

        $this->assertDatabaseHas('leads', [
            'email' => 'sara@example.com',
            'source' => 'form',
            'status' => 'contacted',
        ]);
    }

    public function test_contact_form_requires_valid_email(): void
    {
        $this->postJson('/api/contact', [
            'name' => 'Sara',
            'email' => 'pas-un-email',
            'message' => 'Bonjour',
        ])->assertUnprocessable();
    }
}
