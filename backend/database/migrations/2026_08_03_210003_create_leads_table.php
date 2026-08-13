<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->string('session_uuid', 40)->nullable()->index();
            $table->string('name')->nullable();
            $table->string('company')->nullable();
            $table->string('email')->nullable();
            $table->string('phone', 40)->nullable();
            $table->text('need')->nullable();
            $table->string('budget', 40)->nullable();
            $table->string('timeline', 40)->nullable();
            $table->string('role', 60)->nullable();
            $table->unsignedTinyInteger('score')->default(0);
            $table->string('status', 20)->default('new'); // new | contacted | qualified | converted | recycled
            $table->string('source', 30)->default('chatbot');
            $table->boolean('escalated')->default(false);
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};
