# TEMACONCEPT — plateforme web et assistant Lina

Plateforme de présentation réalisée avec React et Laravel. Elle présente les services et réalisations de TEMACONCEPT et inclut Lina, un assistant conversationnel qui répond aux questions fréquentes et oriente progressivement les demandes de contact.

## Fonctionnalités

- Pages Accueil, À propos, Services, Réalisations et Contact.
- API Laravel pour les contenus et les demandes de contact.
- Assistant Lina avec moteur local de secours lorsque l'API OpenAI n'est pas configurée.
- Qualification progressive : aucune coordonnée n'est transmise sans consentement explicite.
- Interface responsive construite avec React, TypeScript et Vite.

## Lancer le projet localement

### Prérequis

- Node.js 20 ou supérieur
- PHP 8.2 ou supérieur
- Composer 2

### Backend

```bash
cd backend
composer install
copy .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

Sous macOS ou Linux, remplacer `copy` par `cp`. L'API démarre sur `http://127.0.0.1:8000`.

### Frontend

Dans un second terminal :

```bash
cd frontend
npm install
npm run dev
```

Le site est accessible sur `http://localhost:5173`.

## Déploiement public

Le frontend accepte l'URL de l'API via la variable de build suivante :

```env
VITE_API_URL=https://votre-api.example.com
```

Sur le serveur Laravel, définir `APP_URL` avec l'URL publique de l'API et `FRONTEND_URL` avec l'URL publique du frontend. Ces deux valeurs permettent les appels entre le site et l'API (CORS).

Le backend Laravel est prêt pour Railway grâce aux fichiers `Dockerfile` et `railway.json` placés à la racine du dépôt. Railway les détecte automatiquement, même si le projet contient aussi le frontend. Pour une utilisation durable, renseigner les URL réellement attribuées par les hébergeurs dans `APP_URL`, `FRONTEND_URL` et `VITE_API_URL`.

### Cloudflare Pages

Créer un projet Pages depuis ce dépôt avec les valeurs suivantes :

- Répertoire racine : `frontend`
- Commande de build : `npm run build`
- Répertoire de sortie : `dist`
- Variable de build : `VITE_API_URL=https://votre-api.up.railway.app`

Le fichier `frontend/public/_redirects` assure le chargement direct de toutes les routes React. Si Cloudflare ou Railway attribue une URL différente, mettre à jour `VITE_API_URL` dans Cloudflare Pages, puis `FRONTEND_URL` dans le service Railway avec l'URL `pages.dev` obtenue.

### Vercel (alternative au frontend Cloudflare)

Vercel peut héberger le frontend React avec les paramètres suivants : répertoire racine `frontend`, preset « Vite », commande `npm run build`, sortie `dist`, et variable de production `VITE_API_URL` contenant l'URL publique de l'API Railway. Le fichier `frontend/vercel.json` conserve le routage direct des pages React.

### Railway pour l'API Laravel

Dans Railway, créer un projet depuis ce dépôt GitHub. Aucun répertoire racine n'est à définir : Railway détecte le Dockerfile et la configuration à la racine. Ajouter seulement :

- Volume persistant : point de montage `/app/backend/database`
- Domaine public : à générer dans l'onglet Networking

Ajouter ensuite les variables suivantes :

```env
APP_NAME=TEMACONCEPT
APP_ENV=production
APP_KEY=une_cle_generee_par_laravel
APP_DEBUG=false
DB_CONNECTION=sqlite
DB_DATABASE=database/database.sqlite
SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=sync
MAIL_MAILER=log
CHATBOT_MODE=auto
APP_URL=https://votre-api.up.railway.app
FRONTEND_URL=https://votre-projet.vercel.app
```

Après avoir généré le domaine Railway, utiliser son URL pour `VITE_API_URL` dans Vercel. Après avoir obtenu l'URL Vercel, la reporter dans `FRONTEND_URL` sur Railway, puis redéployer les deux services.

## Configuration facultative de Lina

Lina fonctionne avec le moteur local par défaut. Pour activer OpenAI, renseignez dans `backend/.env` :

```env
CHATBOT_MODE=auto
OPENAI_API_KEY=votre_cle
OPENAI_MODEL=gpt-4o-mini
OPENAI_EMBEDDING_MODEL=text-embedding-3-small
```

Ne publiez jamais le fichier `backend/.env` ni une clé API.

## Vérifications

```bash
cd frontend
npm run build
```

## Licence

Projet académique réalisé dans le cadre d'un stage. Les marques, logos et contenus propres à TEMACONCEPT restent la propriété de leurs détenteurs respectifs.
