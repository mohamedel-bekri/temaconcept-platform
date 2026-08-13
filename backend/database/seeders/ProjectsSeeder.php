<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Visual;
use Illuminate\Database\Seeder;

class ProjectsSeeder extends Seeder
{
    /**
     * Projets illustratifs (démo) : à remplacer par les références réelles
     * de TEMACONCEPT. Les noms de clients sont anonymisés par secteur.
     */
    public function run(): void
    {
        $projects = [
            [
                'title' => 'Portail de gestion comptable & télédéclarations',
                'client' => 'Cabinet comptable (anonymisé)',
                'sector' => 'Finance & Services',
                'summary' => 'Traitement automatisé de 15 000 factures/mois et intégration directe des API bancaires, réduisant les erreurs de saisie de 85%.',
                'tags' => ['Laravel', 'PostgreSQL', 'API Bancaire'],
                'visual' => 'project-dashboard',
                'year' => '2026',
            ],
            [
                'title' => 'Application de traçabilité & géolocalisation',
                'client' => 'Plateforme de livraison (anonymisée)',
                'sector' => 'Logistique',
                'summary' => 'Suivi GPS en temps réel et routage hors-ligne pour 120 livreurs avec synchronisation delta à faible consommation.',
                'tags' => ['React Native', 'Node.js', 'SQLite Offline', 'GPS'],
                'visual' => 'project-mobile',
                'year' => '2024',
            ],
            [
                'title' => 'Infrastructure hybride & supervision d\'usines',
                'client' => 'Industriel (anonymisé)',
                'sector' => 'Industrie',
                'summary' => 'Virtualisation haute disponibilité (99,98% uptime) et plan de reprise d\'activité (RPO < 5 min) pour 4 sites de production.',
                'tags' => ['Docker', 'Supervision 24/7'],
                'visual' => 'project-server',
                'year' => '2025',
            ],
            [
                'title' => 'ERP sur-mesure de gestion de stocks multi-dépôts',
                'client' => 'Distributeur (anonymisé)',
                'sector' => 'Commerce',
                'summary' => 'Centralisation en temps réel de 45 000 références et inventaire mobile par code-barres, réduisant le temps de préparation de 30%.',
                'tags' => ['ERP Sur Mesure', 'Vue.js', 'REST API'],
                'visual' => 'project-erp',
                'year' => '2023',
            ],
            [
                'title' => 'Système d\'optimisation des flux d\'expédition & tournée',
                'client' => 'Plateforme de distribution (anonymisée)',
                'sector' => 'Distribution',
                'summary' => 'Consolidation des bons de livraison et algorithme d\'optimisation des chargements de camions réduisant le coût kilométrique de 14%.',
                'tags' => ['Algorithmes de Flux', 'PostgreSQL', 'Logistique'],
                'visual' => 'project-logistics',
                'year' => '2026',
            ],
            [
                'title' => 'Plateforme d\'apprentissage & certification à forte charge',
                'client' => 'Organisme de formation (anonymisé)',
                'sector' => 'Éducation',
                'summary' => 'Architecture microservices supportant des pics de 8 000 apprenants simultanés en période d\'examen sans dégradation.',
                'tags' => ['Microservices', 'Redis'],
                'visual' => 'project-elearning',
                'year' => '2024',
            ],
        ];

        foreach ($projects as $index => $project) {
            $visual = Visual::query()->where('key', $project['visual'])->first();

            Project::query()->updateOrCreate(['title' => $project['title']], [
                'client' => $project['client'],
                'sector' => $project['sector'],
                'summary' => $project['summary'],
                'tags' => $project['tags'],
                'image_url' => $visual?->url,
                'year' => $project['year'],
                'order' => $index + 1,
            ]);
        }
    }
}
