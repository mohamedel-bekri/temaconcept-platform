<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthApiTest extends TestCase
{
    use RefreshDatabase;

    private function seedAdmin(): User
    {
        return User::factory()->create([
            'email' => 'admin@temaconcept.com',
            'password' => 'password',
            'role' => 'admin',
        ]);
    }

    public function test_login_returns_token(): void
    {
        $this->seedAdmin();

        $response = $this->postJson('/api/auth/login', [
            'email' => 'admin@temaconcept.com',
            'password' => 'password',
        ]);

        $response->assertOk()
            ->assertJsonPath('user.role', 'admin')
            ->assertJsonStructure(['token', 'user']);
    }

    public function test_login_with_wrong_password_fails(): void
    {
        $this->seedAdmin();

        $this->postJson('/api/auth/login', [
            'email' => 'admin@temaconcept.com',
            'password' => 'wrong',
        ])->assertUnprocessable();
    }

    public function test_me_requires_authentication(): void
    {
        $this->getJson('/api/auth/me')->assertUnauthorized();
    }

    public function test_me_returns_authenticated_user(): void
    {
        $user = $this->seedAdmin();

        $this->actingAs($user, 'sanctum')
            ->getJson('/api/auth/me')
            ->assertOk()
            ->assertJsonPath('user.email', $user->email);
    }

    public function test_logout_revokes_token(): void
    {
        $user = $this->seedAdmin();
        $token = $user->createToken('spa')->plainTextToken;

        $this->withToken($token)
            ->postJson('/api/auth/logout')
            ->assertOk();

        $this->assertSame(0, $user->tokens()->count());
    }
}
