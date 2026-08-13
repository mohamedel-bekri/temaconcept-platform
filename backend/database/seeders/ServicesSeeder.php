<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServicesSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'code' => '01',
                'name' => 'Développement de logiciels sur mesure',
                'slug' => 'logiciels-sur-mesure',
                'tagline' => 'Des applications métier conçues autour de vos processus, pas l\'inverse.',
                'description' => 'Nous concevons et développons des logiciels qui épousent exactement votre métier : gestion de production, facturation, RH, portails web, ERP. Chaque module est pensé pour réduire la saisie, fiabiliser les données et faire gagner du temps à vos équipes.',
                'bullets' => [
                    'Analyse des besoins et cahier des charges',
                    'Développement en PHP / Laravel, Python, .NET',
                    'ERP, CRM, gestion de stock, portails web',
                    'Intégration avec vos outils existants',
                ],
                'icon' => 'code',
                'order' => 1,
            ],
            [
                'code' => '02',
                'name' => 'Développement d\'applications mobiles',
                'slug' => 'applications-mobiles',
                'tagline' => 'Votre activité dans la poche de vos équipes et de vos clients.',
                'description' => 'Applications iOS et Android, natives ou cross-platform, pour vos clients comme pour vos équipes terrain : livraison, gestion de flotte, e-commerce, suivi de chantier. Nous gérons le déploiement et la maintenance sur les stores.',
                'bullets' => [
                    'Applications natives et cross-platform',
                    'Déploiement sur App Store et Google Play',
                    'Maintenance et évolutions continues',
                    'Notifications, hors-ligne, synchronisation temps réel',
                ],
                'icon' => 'mobile',
                'order' => 2,
            ],
            [
                'code' => '03',
                'name' => 'Intégration de systèmes',
                'slug' => 'integration-systemes',
                'tagline' => 'Connecter vos outils pour que l\'information circule sans friction.',
                'description' => 'Vos logiciels ne communiquent pas entre eux ? Nous interconnectons ERP, CRM, outils comptables et applications métier via des API, afin de supprimer les ressaisies et d\'automatiser les flux qui consommaient vos journées.',
                'bullets' => [
                    'Interfaçage de logiciels et ERP',
                    'Développement d\'APIs et webhooks',
                    'Migration de données sécurisée',
                    'Automatisation de flux métier',
                ],
                'icon' => 'link',
                'order' => 3,
            ],
            [
                'code' => '04',
                'name' => 'Infrastructure informatique',
                'slug' => 'infrastructure',
                'tagline' => 'Des réseaux et des serveurs qui tiennent la charge, de jour comme de nuit.',
                'description' => 'Conception, déploiement et supervision de votre infrastructure : réseaux d\'entreprise, serveurs physiques ou virtualisés, cloud hybride, sauvegardes et sécurité. Une infrastructure saine, c\'est l\'assurance que vos applications restent disponibles.',
                'bullets' => [
                    'Réseaux d\'entreprise (LAN / WAN / Wi-Fi)',
                    'Serveurs physiques et virtualisés',
                    'Cloud hybride et plan de sauvegarde',
                    'Supervision et sécurité périmétrique',
                ],
                'icon' => 'server',
                'order' => 4,
            ],
            [
                'code' => '05',
                'name' => 'Gestion de projets informatiques',
                'slug' => 'gestion-projets',
                'tagline' => 'Un pilote pour vos projets : délais tenus, budgets maîtrisés.',
                'description' => 'Un chef de projet dédié orchestre votre projet de A à Z : cadrage, planification, suivi des risques, recette et conduite du changement. Vous savez à tout instant où en est votre projet et ce qui reste à faire.',
                'bullets' => [
                    'Chef de projet dédié',
                    'Méthodes agiles et cycle en V',
                    'Reporting régulier et maîtrise des risques',
                    'Accompagnement à la conduite du changement',
                ],
                'icon' => 'route',
                'order' => 5,
            ],
            [
                'code' => '06',
                'name' => 'Analyse de données / IA',
                'slug' => 'data-ia',
                'tagline' => 'Transformer vos données en décisions, avec des modèles utiles au métier.',
                'description' => 'Nous aidons les entreprises à exploiter leurs données : tableaux de bord décisionnels, préparation de données, machine learning et IA générative (assistants conversationnels, automatisation documentaire). Des briques utiles, mesurables, intégrées à votre quotidien.',
                'bullets' => [
                    'Tableaux de bord décisionnels (BI)',
                    'ETL et préparation de données',
                    'IA générative et assistants conversationnels',
                    'Machine learning sur données métier',
                ],
                'icon' => 'chart',
                'order' => 6,
            ],
        ];

        foreach ($services as $service) {
            Service::query()->updateOrCreate(['code' => $service['code']], $service);
        }
    }
}
