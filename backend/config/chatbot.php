<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Mode de production de l'agent
    |--------------------------------------------------------------------------
    | auto : live si une clé OPENAI_API_KEY est présente, sinon mock.
    | live : force l'appel à l'API (erreur si pas de clé).
    | mock : moteur de règles, aucune dépendance réseau.
    */
    'mode' => env('CHATBOT_MODE', 'auto'),

    'agent_name' => 'Lina',

    'company' => [
        'name' => 'TEMACONCEPT',
        'address' => '15, Lot Attanmiya, Apt 3, Témara — 12010',
        'phone' => '+212 5 37 61 24 97',
        'email_contact' => 'contact@temaconcept.com',
        'email_support' => 'support@temaconcept.com',
        'hours' => 'Lundi–Vendredi, 9h–18h',
        'years' => 16,
        'projects' => 350,
    ],

    'scoring' => [
        'warm_threshold' => 40,
        'hot_threshold' => 70,
    ],

    'escalation' => [
        'triggers' => [
            'conseiller', 'humain', 'rappele', 'rappeler', 'appele',
            'un appel', 'un vrai', 'vraie personne', 'parler a',
            'مستشار', 'بشر', 'اتصال', 'مساعد مباشر', 'انسان',
        ],
    ],

    'retrieval' => [
        'top_k' => 4,
        'min_score' => 0.18,
    ],
];
