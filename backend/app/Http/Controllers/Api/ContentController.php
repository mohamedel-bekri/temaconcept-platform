<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Service;
use App\Models\Visual;
use Illuminate\Http\JsonResponse;

class ContentController extends Controller
{
    public function index(): JsonResponse
    {
        $company = config('chatbot.company');

        $services = Service::query()
            ->active()
            ->orderBy('order')
            ->get(['code', 'slug', 'name', 'tagline', 'description', 'bullets', 'icon', 'order']);

        $projects = Project::query()
            ->orderBy('order')
            ->get(['id', 'title', 'client', 'sector', 'summary', 'tags', 'image_url', 'year']);

        $visuals = Visual::query()
            ->orderBy('order')
            ->get(['key', 'slot', 'url', 'credit', 'alt', 'source'])
            ->groupBy('slot');

        return response()->json([
            'meta' => [
                'name' => $company['name'],
                'tagline' => 'On conçoit les systèmes qu\'on déploie.',
                'address' => $company['address'],
                'phone' => $company['phone'],
                'email_contact' => $company['email_contact'],
                'email_support' => $company['email_support'],
                'hours' => $company['hours'],
                'years' => $company['years'],
                'projects' => $company['projects'],
            ],
            'services' => $services,
            'projects' => $projects,
            'visuals' => $visuals,
        ]);
    }
}
