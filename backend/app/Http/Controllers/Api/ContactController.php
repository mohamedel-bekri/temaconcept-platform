<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function submit(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email:rfc,dns', 'max:190'],
            'phone' => ['nullable', 'string', 'max:40'],
            'company' => ['nullable', 'string', 'max:120'],
            'message' => ['required', 'string', 'max:2000'],
        ]);

        $name = trim(strip_tags($validated['name']));
        $email = trim(strtolower($validated['email']));
        $phone = isset($validated['phone']) ? trim(strip_tags($validated['phone'])) : null;
        $company = isset($validated['company']) ? trim(strip_tags($validated['company'])) : null;
        $message = trim(strip_tags($validated['message']));

        $lead = Lead::create([
            'name' => $name,
            'email' => $email,
            'phone' => $phone,
            'company' => $company,
            'need' => $message,
            'score' => 40,
            'status' => 'contacted',
            'source' => 'form',
        ]);

        return response()->json([
            'message' => 'Merci, votre demande a bien été transmise. Nous vous répondrons sous 24h.',
            'data' => $lead->only(['id', 'name', 'email']),
        ], 201);
    }
}
