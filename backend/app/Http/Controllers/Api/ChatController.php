<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\Chatbot\ChatPipeline;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ChatController extends Controller
{
    public function __invoke(Request $request, ChatPipeline $pipeline): JsonResponse
    {
        $validated = $request->validate([
            'message' => ['required', 'string', 'min:1', 'max:2000'],
            'session_uuid' => ['sometimes', 'string', 'uuid', 'max:40'],
        ]);

        $sessionUuid = $validated['session_uuid'] ?? Str::uuid()->toString();
        $message = trim(strip_tags($validated['message']));

        if (empty($message)) {
            return response()->json([
                'message' => 'Le contenu du message est invalide.',
            ], 422);
        }

        $result = $pipeline->handle($sessionUuid, $message);

        return response()->json([
            'session_uuid' => $sessionUuid,
            ...$result,
        ]);
    }
}
