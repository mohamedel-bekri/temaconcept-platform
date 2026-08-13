<?php

namespace Tests\Feature;

use App\Models\Lead;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LeadsApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_list_leads(): void
    {
        Lead::factory()->create(['name' => 'Karim Alami']);
        $admin = User::factory()->create(['role' => 'admin']);

        $this->actingAs($admin, 'sanctum')
            ->getJson('/api/leads')
            ->assertOk()
            ->assertJsonPath('data.data.0.name', 'Karim Alami');
    }

    public function test_client_cannot_list_leads(): void
    {
        $client = User::factory()->create(['role' => 'client']);

        $this->actingAs($client, 'sanctum')
            ->getJson('/api/leads')
            ->assertForbidden();
    }

    public function test_admin_can_update_lead_status(): void
    {
        $lead = Lead::factory()->create();
        $admin = User::factory()->create(['role' => 'admin']);

        $this->actingAs($admin, 'sanctum')
            ->postJson("/api/leads/{$lead->id}/status", ['status' => 'converted'])
            ->assertOk()
            ->assertJsonPath('data.status', 'converted');
    }

    public function test_status_must_be_valid(): void
    {
        $lead = Lead::factory()->create();
        $admin = User::factory()->create(['role' => 'admin']);

        $this->actingAs($admin, 'sanctum')
            ->postJson("/api/leads/{$lead->id}/status", ['status' => 'nope'])
            ->assertUnprocessable();
    }
}
