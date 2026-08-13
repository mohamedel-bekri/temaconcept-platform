<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Default accounts created with randomized secure passwords
        User::query()->updateOrCreate(
            ['email' => 'admin@temaconcept.com'],
            [
                'name' => 'Admin TEMACONCEPT',
                'password' => Hash::make(Str::random(32)),
                'role' => 'admin',
                'phone' => '+212 5 37 61 24 97',
            ]
        );
    }
}
