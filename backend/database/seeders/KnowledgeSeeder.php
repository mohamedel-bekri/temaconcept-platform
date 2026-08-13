<?php

namespace Database\Seeders;

use App\Models\KnowledgeChunk;
use Illuminate\Database\Seeder;

class KnowledgeSeeder extends Seeder
{
    public function run(): void
    {
        $chunks = [
            [
                'slug' => 'qui-sommes-nous',
                'title' => 'Qui est TEMACONCEPT ?',
                'source' => 'faq',
                'content' => "TEMACONCEPT est une société marocaine de solutions informatiques basée à Témara. Forte de 16 ans d'expérience, elle a livré plus de 350 projets. Elle intervient sur le développement de logiciels sur mesure, les applications mobiles, l'intégration de systèmes, l'infrastructure informatique, la gestion de projets et l'analyse de données / IA. Elle accompagne des PME et des grandes organisations dans la digitalisation de leurs processus.",
            ],
            [
                'slug' => 'comment-obtenir-un-devis',
                'title' => 'Comment obtenir un devis ?',
                'source' => 'faq',
                'content' => "Chaque projet fait l'objet d'un devis personnalisé. Après un premier échange sur vos besoins (périmètre, budget, délais), TEMACONCEPT remet une proposition détaillée généralement sous 48 heures. Pour lancer une demande : contact@temaconcept.com ou +212 5 37 61 24 97. Un devis est gratuit et sans engagement.",
            ],
            [
                'slug' => 'delai-de-realisation',
                'title' => 'Quel est le délai de réalisation d\'un projet ?',
                'source' => 'faq',
                'content' => "Le délai dépend du périmètre du projet : une application web sur mesure prend typiquement de 6 à 16 semaines, une application mobile de 8 à 20 semaines, et une mise en place d'infrastructure de 2 à 6 semaines. Ces délais sont affinés lors de la phase de cadrage et suivis par un chef de projet dédié.",
            ],
            [
                'slug' => 'technologies-utilisees',
                'title' => 'Quelles technologies utilise TEMACONCEPT ?',
                'source' => 'faq',
                'content' => "Côté logiciels : PHP / Laravel, Python, .NET, JavaScript. Côté mobile : natif iOS (Swift) et Android (Kotlin), ou cross-platform (Flutter, React Native). Côté infrastructure : Linux, virtualisation, cloud hybride, supervision. Côté data : bases SQL, outils BI, et plateformes d'IA. Le choix est toujours guidé par les besoins et la maintenabilité du projet.",
            ],
            [
                'slug' => 'maintenance-apres-livraison',
                'title' => 'Proposez-vous la maintenance après livraison ?',
                'source' => 'faq',
                'content' => "Oui. Chaque projet peut être accompagné d'un contrat de maintenance et d'évolution : corrections, mises à jour de sécurité, hébergement, supervision et évolutions fonctionnelles. Le support est joignable à support@temaconcept.com. Cette garantie de continuité est un des piliers de l'approche TEMACONCEPT.",
            ],
            [
                'slug' => 'service-logiciels-sur-mesure',
                'title' => 'Service : développement de logiciels sur mesure',
                'source' => 'service',
                'content' => "Développement de logiciels sur mesure : des applications métier conçues autour des processus de l'entreprise. Exemples : ERP, CRM, gestion de stock, facturation, portails web, gestion de production. Le projet démarre par une analyse des besoins et un cahier des charges, puis un développement itératif avec recettes régulières.",
            ],
            [
                'slug' => 'service-applications-mobiles',
                'title' => 'Service : applications mobiles iOS / Android',
                'source' => 'service',
                'content' => "Développement d'applications mobiles pour iOS et Android : applications destinées aux clients (e-commerce, services) ou aux équipes terrain (livraison, suivi de chantier, gestion de flotte). Gestion du déploiement sur les stores, notifications, fonctionnement hors-ligne et synchronisation temps réel.",
            ],
            [
                'slug' => 'service-integration-systemes',
                'title' => 'Service : intégration de systèmes',
                'source' => 'service',
                'content' => "Intégration de systèmes : interconnecter les logiciels existants (ERP, CRM, comptabilité) via des APIs et des webhooks pour automatiser les flux métier et supprimer les ressaisies. Inclut les migrations de données sécurisées et le développement d'interfaces dédiées.",
            ],
            [
                'slug' => 'service-infrastructure',
                'title' => 'Service : infrastructure informatique',
                'source' => 'service',
                'content' => "Infrastructure informatique : conception et déploiement de réseaux d'entreprise (LAN / WAN / Wi-Fi), installation de serveurs physiques ou virtualisés, passage au cloud hybride, plans de sauvegarde et supervision 24/7. Une infrastructure fiable garantit la disponibilité de vos applications.",
            ],
            [
                'slug' => 'service-gestion-projets',
                'title' => 'Service : gestion de projets informatiques',
                'source' => 'service',
                'content' => "Gestion de projets informatiques : un chef de projet dédié pilote le cadrage, la planification, le suivi des risques, la recette et la conduite du changement. Méthodes agiles ou cycle en V selon le contexte. Reporting régulier : vous savez toujours où en est votre projet.",
            ],
            [
                'slug' => 'service-data-ia',
                'title' => 'Service : analyse de données et IA',
                'source' => 'service',
                'content' => "Analyse de données et IA : tableaux de bord décisionnels (BI), préparation de données, machine learning et IA générative. Cas typiques : assistants conversationnels, automatisation documentaire, prévision de ventes, détection d'anomalies. Des briques concrètes et mesurables, intégrées au quotidien des équipes.",
            ],
            [
                'slug' => 'methode-de-travail',
                'title' => 'La méthode de travail en 4 phases',
                'source' => 'site',
                'content' => "La méthode TEMACONCEPT en 4 phases : 01 Écoute — cadrage et analyse des besoins ; 02 Conception — architecture, maquettes et cahier des charges validé ; 03 Livraison — développement itératif, recettes intermédiaires et mise en production ; 04 Support — maintenance, évolutions et accompagnement après livraison. Chaque phase produit un livrable validé par le client.",
            ],
            [
                'slug' => 'coordonnees-contact',
                'title' => 'Coordonnées de TEMACONCEPT',
                'source' => 'site',
                'content' => "TEMACONCEPT, 15, Lot Attanmiya, Apt 3, Témara — 12010, Maroc. Téléphone : +212 5 37 61 24 97. Email commercial : contact@temaconcept.com. Support : support@temaconcept.com. Horaires : du lundi au vendredi, 9h à 18h. Pour un devis, contactez contact@temaconcept.com ou demandez à être rappelé.",
            ],
            [
                'slug' => 'horaires-disponibilite',
                'title' => 'Horaires de travail et disponibilité',
                'source' => 'site',
                'content' => "TEMACONCEPT est joignable du lundi au vendredi de 9h à 18h (heure du Maroc) par téléphone au +212 5 37 61 24 97 ou par email. Les demandes de devis reçoivent une proposition généralement sous 48 heures. Pour les systèmes critiques, la supervision et le support peuvent fonctionner 24/7 dans le cadre des contrats de maintenance.",
            ],
            [
                'slug' => 'localisation-acces',
                'title' => 'Où se trouve TEMACONCEPT ?',
                'source' => 'site',
                'content' => "TEMACONCEPT est basée à Témara, au Maroc : 15, Lot Attanmiya, Apt 3, Témara — 12010. Témara se situe à une quinzaine de minutes de Rabat, le long de la côte atlantique, ce qui facilite les rencontres en personne. Les visites du bureau se font sur rendez-vous.",
            ],
            [
                'slug' => 'statut-entreprise',
                'title' => 'Le profil de la société',
                'source' => 'faq',
                'content' => "TEMACONCEPT est une société marocaine de solutions informatiques, établie à Témara. Elle s'appuie sur une équipe d'ingénieurs et de spécialistes qui cumule 16 ans d'expérience et plus de 350 projets livrés. Elle accompagne aussi bien des PME que de grandes organisations dans leur transformation numérique.",
            ],
            [
                'slug' => 'secteurs-experience',
                'title' => 'Secteurs et références clients',
                'source' => 'faq',
                'content' => "TEMACONCEPT intervient dans plusieurs secteurs : banque et assurance, industrie, santé, éducation, logistique et distribution. Des références peuvent être partagées à des prospects sérieux, dans le respect de la confidentialité. N'hésitez pas à les demander lors d'un premier échange.",
            ],
            [
                'slug' => 'confidentialite-nda',
                'title' => 'Confidentialité et protection des données',
                'source' => 'faq',
                'content' => "La confidentialité fait partie de l'engagement TEMACONCEPT. Vos échanges, vos données et les spécificités de votre projet restent strictement confidentiels. Une convention de confidentialité (NDA) peut être signée avant le partage d'informations sensibles, et les données manipulées dans nos projets sont protégées selon les standards de sécurité en vigueur.",
            ],
            [
                'slug' => 'support-sla',
                'title' => 'Maintenance, support et supervision 24/7',
                'source' => 'faq',
                'content' => "Chaque livraison peut être suivie d'un contrat de maintenance : corrections, mises à jour de sécurité, hébergement et supervision. Pour les systèmes critiques, une supervision 24/7 est proposée avec un point de contact dédié. Le support est joignable à support@temaconcept.com, et les délais d'intervention sont définis contractuellement (SLA).",
            ],
            [
                'slug' => 'conditions-paiement',
                'title' => 'Conditions commerciales et paiement',
                'source' => 'faq',
                'content' => "Le devis est gratuit et sans engagement, remis généralement sous 48 heures après un premier échange. La facturation se fait par phases, au fil des livrables validés, ce qui limite le risque pour le client. Les conditions précises (échéances, modalités, recette) sont consignées dans la proposition commerciale puis dans le contrat.",
            ],
            [
                'slug' => 'recrutement-carrieres',
                'title' => 'Rejoindre TEMACONCEPT',
                'source' => 'faq',
                'content' => "TEMACONCEPT recrute régulièrement des profils techniques : développeurs, chefs de projets, spécialistes infrastructure et data. Les candidatures (CV et lettre de motivation) peuvent être envoyées à contact@temaconcept.com avec pour objet « Candidature ». Les offres ouvertes sont aussi publiées sur nos réseaux.",
            ],
            [
                'slug' => 'engagements-approche',
                'title' => 'Pourquoi choisir TEMACONCEPT',
                'source' => 'faq',
                'content' => "Ce qui distingue TEMACONCEPT : une analyse approfondie des besoins avant tout développement, un cahier des charges validé par le client, des recettes intermédiaires tout au long du projet, un chef de projet dédié qui rend compte régulièrement, et une maintenance après livraison. L'objectif est un logiciel utile, fiable et durable.",
            ],
        ];

        foreach ($chunks as $chunk) {
            KnowledgeChunk::query()->updateOrCreate(['slug' => $chunk['slug']], $chunk);
        }
    }
}
