<?php

use App\Http\Controllers\Api\ChatController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\ContentController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes — TEMACONCEPT (Public Headless API)
|--------------------------------------------------------------------------
|
| Securised public endpoints with strict rate limiting.
| Auth and Leads endpoints removed as frontend authentication is disabled.
|
*/

// Site content metadata, services, projects, and visuals
Route::get('/site', [ContentController::class, 'index']);

// Chatbot interactions (Max 20 requests/min per IP)
Route::post('/chat', ChatController::class)->middleware('throttle:20,1');

// Public contact form submission (Max 5 requests/min per IP)
Route::post('/contact', [ContactController::class, 'submit'])->middleware('throttle:5,1');
