<?php

namespace Database\Factories;

use App\Models\Lead;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lead>
 */
class LeadFactory extends Factory
{
    protected $model = Lead::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'company' => $this->faker->company(),
            'email' => $this->faker->safeEmail(),
            'phone' => $this->faker->phoneNumber(),
            'need' => $this->faker->sentence(8),
            'budget' => '50k - 100k DH',
            'timeline' => 'urgent',
            'score' => 50,
            'status' => 'contacted',
            'source' => 'chatbot',
            'escalated' => false,
        ];
    }
}
