<?php

namespace Database\Seeders;

use App\Models\Visual;
use Illuminate\Database\Seeder;

class VisualsSeeder extends Seeder
{
    /**
     * Visuels locaux servis par le frontend (frontend/public/images).
     * Photos libres (Pexels, licence libre) téléchargées en local — plus
     * d'illustrations SVG. source => 'pexels' ; credit = auteur Pexels.
     */
    public function run(): void
    {
        $images = [
            'project-dashboard' => ['project', '/images/project-dashboard.jpg', 'Analyse de données et graphiques sur une tablette : portail de gestion'],
            'project-mobile' => ['project', '/images/project-mobile.jpg', 'Livreur avec smartphone : application mobile de livraison'],
            'project-server' => ['project', '/images/project-server.jpg', 'Baies de serveurs en salle informatique : parc supervisé 24/7'],
            'project-erp' => ['project', '/images/project-erp.jpg', 'Inventaire en entrepôt avec scanner : gestion de stock'],
            'project-logistics' => ['project', '/images/project-logistics.jpg', 'Graphiques boursiers et données sur écran : tableau de bord décisionnel'],
            'project-elearning' => ['project', '/images/project-elearning.jpg', 'Personne qui suit un cours en ligne sur ordinateur : plateforme e-learning'],
            'labo-team' => ['labo', '/images/labo-team.jpg', 'L\'équipe en atelier, veille active et prototypes'],
            'labo-whiteboard' => ['labo', '/images/labo-whiteboard.jpg', 'Équipe au tableau blanc : prototypage avant de coder'],
            'labo-security' => ['labo', '/images/labo-security.jpg', 'Câblage réseau en salle serveur : supervision et sécurité'],
            'about-facade' => ['about', '/images/about-facade.jpg', 'Bureaux TEMACONCEPT à Témara'],
            'about-atelier' => ['about', '/images/about-atelier.jpg', 'Poste de développement de nos ingénieurs'],
            'about-team' => ['about', '/images/about-team.jpg', 'L\'équipe TEMACONCEPT en atelier'],
        ];

        foreach ($images as $key => [$slot, $file, $alt]) {
            Visual::query()->updateOrCreate(['key' => $key], [
                'slot' => $slot,
                'url' => $file,
                'credit' => 'TEMACONCEPT',
                'alt' => $alt,
                'source' => 'internal',
                'order' => array_search($key, array_keys($images), true),
            ]);
        }
    }
}
