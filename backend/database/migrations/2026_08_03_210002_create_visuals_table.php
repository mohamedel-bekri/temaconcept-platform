<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('visuals', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->string('slot'); // hero | project | labo | about
            $table->string('url');
            $table->string('credit')->nullable();
            $table->string('alt');
            $table->string('source', 20)->default('unsplash'); // unsplash | internal
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('visuals');
    }
};
