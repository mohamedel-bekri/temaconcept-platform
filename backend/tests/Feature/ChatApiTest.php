<?php

namespace Tests\Feature;

use App\Models\Lead;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ChatApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_chat_endpoint_returns_reply_and_session(): void
    {
        $response = $this->postJson('/api/chat', [
            'message' => 'Bonjour',
        ]);

        $response->assertOk()
            ->assertJsonPath('intent', 'greeting')
            ->assertJsonStructure([
                'session_uuid',
                'reply',
                'quick_replies',
                'intent',
                'escalated',
                'lead' => ['score', 'status', 'name', 'email'],
            ]);

        $this->assertDatabaseHas('chat_sessions', ['session_uuid' => $response->json('session_uuid')]);
    }

    public function test_chat_requires_message(): void
    {
        $this->postJson('/api/chat', ['message' => ''])
            ->assertUnprocessable();
    }
}
