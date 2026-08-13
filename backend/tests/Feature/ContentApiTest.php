<?php

namespace Tests\Feature;

use Database\Seeders\ProjectsSeeder;
use Database\Seeders\ServicesSeeder;
use Database\Seeders\VisualsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ContentApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_site_endpoint_returns_meta_services_projects_and_visuals(): void
    {
        $this->seed([ServicesSeeder::class, ProjectsSeeder::class, VisualsSeeder::class]);

        $response = $this->getJson('/api/site');

        $response->assertOk()
            ->assertJsonPath('meta.projects', 350)
            ->assertJsonPath('meta.phone', '+212 5 37 61 24 97')
            ->assertJsonCount(6, 'services')
            ->assertJsonCount(6, 'projects')
            ->assertJsonStructure([
                'visuals' => ['project', 'labo'],
                'services' => [['code', 'name', 'tagline', 'description', 'bullets', 'icon']],
            ]);
    }
}
