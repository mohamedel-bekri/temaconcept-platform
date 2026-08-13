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
