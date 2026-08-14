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

Le dépôt contient `render.yaml` pour déployer l'API Laravel. Le frontend est prévu pour Cloudflare Pages. Pour une utilisation durable, remplacer SQLite par une base de données managée et renseigner les URL réellement attribuées par les hébergeurs dans `APP_URL`, `FRONTEND_URL` et `VITE_API_URL`.

### Cloudflare Pages

Créer un projet Pages depuis ce dépôt avec les valeurs suivantes :

- Répertoire racine : `frontend`
- Commande de build : `npm run build`
- Répertoire de sortie : `dist`
- Variable de build : `VITE_API_URL=https://temaconcept-api.onrender.com`

Le fichier `frontend/public/_redirects` assure le chargement direct de toutes les routes React. Si Cloudflare ou Render attribue une URL différente, mettre à jour `VITE_API_URL` dans Cloudflare Pages, puis `FRONTEND_URL` dans le service Render avec l'URL `pages.dev` obtenue.

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
