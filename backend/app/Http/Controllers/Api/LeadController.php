<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LeadController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Lead::query()
            ->withCount('chatSessions')
            ->orderByDesc('updated_at');

        if ($request->filled('status')) {
            $query->where('status', $request->string('status'));
        }

        if ($request->filled('q')) {
            $search = $request->string('q')->toString();
            $query->where(function ($where) use ($search) {
                $where->where('name', 'like', "%{$search}%")
                    ->orWhere('company', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('need', 'like', "%{$search}%");
            });
        }

        $perPage = min(100, max(1, $request->integer('per_page', 20)));

        return response()->json([
            'data' => $query->paginate($perPage),
        ]);
    }

    public function show(Lead $lead): JsonResponse
    {
        $lead->load('chatSessions.messages');

        return response()->json(['data' => $lead]);
    }

    public function updateStatus(Request $request, Lead $lead): JsonResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'string', 'in:new,contacted,qualified,converted,recycled'],
        ]);

        $lead->update(['status' => $validated['status']]);

        return response()->json(['data' => $lead]);
    }
}
