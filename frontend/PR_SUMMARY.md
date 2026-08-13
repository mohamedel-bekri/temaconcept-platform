# PR — Refonte design system front-end

## Résumé

Consolidation du design system TEMACONCEPT : tokens sémantiques, paire de
polices Inter + Archivo, un composant `Button` unique, `Badge`, `Section`,
`ServiceCard`, `SectionHeading` extensible, une passe d'accessibilité
(contraste WCAG AA, focus, `aria-live`), et une déduplication de contenu entre
pages. Aucun changement de fonctionnalité ni de copy.

- **Scope** : `frontend/src` (pages, sections, layout, UI) + `index.html` + `index.css`.
- **Hors scope** : back-end Laravel, données, logique métier.

## Changements clés

1. **Typographie** — `IBM Plex Sans` remplacé par `Inter` (UI). Display :
   Archivo, mono : JetBrains Mono.
2. **Tokens** — `@theme` enrichi : rôles sémantiques (`primary`, `secondary`,
   `neutral`, `surface`, `accent`, `success`, `warning`, `danger`), `ink-muted`
   (#33576e), `accent-strong` (#16607f) pour l'azure sur fond clair.
3. **Composants**
   - `Button.tsx` — variantes `primary | secondary | ghost`, ton `light | dark`,
     taille `md | sm` ; rend `<Link>` / `<a>` / `<button>` ; états hover/focus/
     disabled gérés. Les classes `.btn*` de `index.css` ont été **supprimées**.
   - `Badge.tsx` — tags, secteurs, chips, statuts (9 tons).
   - `Section.tsx` — rythme vertical standard `py-20 md:py-28`, fonds
     `none|white|verre|ink|tinted`.
   - `ServiceCard.tsx` — carte service extraite de `ServicesGrid`.
   - `SectionHeading.tsx` — ajout `align` (`left|center`).
4. **Déduplication**
   - Boutons : 39 usages de classes `.btn-*` migrés vers `<Button />`.
   - Sections : 12 blocs `py-20 md:py-28` migrés vers `<Section />`.
   - Champs du formulaire de contact : boucle `FORM_FIELDS` (fini les 4 blocs
     quasi identiques).
   - Chips valeurs / tags / secteur / statut « Escaladé » : `<Badge />`.
5. **Accessibilité**
   - Contraste AA : `text-ink/60` → `text-ink-muted` (3.8→7.2:1), azure sur
     blanc → `accent-strong` (2.4→7:1), `text-acier/70-80` → `text-acier`,
     lien actif du menu mobile → `accent-strong`.
   - Focus : `outline: currentColor` (suit le contexte clair/sombre).
   - `aria-live="polite"` sur le formulaire ; erreurs en `role="alert"`.
   - États formulaires : `success` (envoi ok) et `danger` (erreurs) sémantiques.
6. **Contenu propre à chaque page**
   - `CTABand` supprimé de `/services`, `/realisations` et `/a-propos` — il ne
     reste qu'en fin d'accueil.
   - `ContactForm` retiré de l'accueil : le formulaire ne vit plus que sur
     `/contact` (variante `centered` supprimée, `split` par défaut).
   - Menu de navigation supprimé du footer (déjà dans la nav) ; compteur
     « 350+ » conservé au seul grand panneau de `NotreObjectif` (retiré du
     hero, du texte et de la stat « Projets livrés » remplacée par
     « Supervision 24/7 »).
7. **Photos réelles** — les illustrations SVG des pages About, Labo et
   Réalisations sont remplacées par des photos libres (Pexels) téléchargées
   dans `frontend/public/images/*.jpg` (`VisualsSeeder`/`ProjectsSeeder`
   mis à jour, `source => pexels`). Les SVG restent en fallback
   (`placeholder.svg`).
8. **Accueil illustré + allègement** — grande photo d'équipe dans le hero
   (à droite du texte) et une photo par `ServiceCard` (mapping par code dans
   `ServicesGrid`). Échelle typographique réduite légèrement : hero
   `clamp(2.2rem,5vw,3.6rem)`, `PageHero` `clamp(2rem,4.5vw,3.4rem)`,
   `SectionHeading` `text-3xl md:text-5xl`, stats `text-5xl md:text-7xl`.
   Éléments secondaires supprimés : barre de progression / flèche « Descendre »
   / ligne mono du hero, badges valeurs et liste secteurs de `NotreObjectif`,
   bloc « Parlez-en à Lina » redondant des services, boutons de navigation en
   fin d'`About`.

## Fichiers modifiés / créés

**Créés** : `src/components/ui/{Button,Badge,Section,ServiceCard}.tsx`,
`DESIGN_SYSTEM.md`.

**Modifiés** : `index.html` (polices) · `src/index.css` (tokens, focus,
suppression `.btn*`) · `Nav`, `Footer`, `SiteLayout`, `PageHero` (consommateurs),
`CTABand`, `Hero`, `ServicesGrid`, `ServicesAccordion`, `ServiceDeliverables`,
`Method`, `Labo`, `ProjectGrid`, `ProjectCard`, `ContactForm`, `ChatDock`,
`About`, `ContactPage`, `SignIn`, `Dashboard`, `NotreObjectif`, `Performance`,
`ServicesPage`, `Realisations`, `Home`.

## Vérification

- `npm run build` — OK, 0 warning.
- `npm run lint` — 0 erreur (2 warnings préexistants : fast-refresh `useAuth`/`useSite`).
- `npx vitest run` — 8/8 (SignIn : « Se connecter », labels, `role=alert` ; useChat).
- `http://localhost:5173/{/,a-propos,services,realisations,contact,connexion}` — 200.

## Captures avant / après (à faire dans le navigateur)

Serveur : `npm run dev` (front) + Laravel (`php artisan serve`) actifs.
DevTools responsive, desktop **1280×800** et mobile **375×667**. Nommer les
fichiers `before-<page>-<vp>.png` / `after-<page>-<vp>.png`.

| # | Page / URL          | Vueport | Point de contrôle                                       |
| - | ------------------- | ------- | -------------------------------------------------------- |
| 1 | `/` (haut)          | 1280    | Hero : typos Archivo + Inter, CTA azure + ghost          |
| 2 | `/` (haut)          | 375     | Menu mobile ouvert : lien actif accent-strong, bouton Connectez |
| 3 | `/` (section services) | 1280 | Grille de 3 `ServiceCard`, « Voir le détail → » en accent-strong |
| 4 | `/` (bas)           | 1280    | CTABand final (un seul sur le site) + footer sans menu    |
| 5 | `/services`         | 1280    | Accordéon + section Livrables (plus de CTABand)          |
| 6 | `/realisations`     | 1280    | Cartes projets : badge secteur (overlay), tags outline-dark (plus de CTABand) |
| 7 | `/contact`          | 1280    | PageHero CTA ghost dark + formulaire split (seul formulaire du site) |
| 8 | `/a-propos`         | 1280    | Deux sections espacées par `<Section />` (plus de CTABand) |
| 9 | `/connexion`        | 1280    | Bouton « Se connecter », erreur `danger`, texte secondaire ink-muted |

## Plan de test manuel (court)

1. **Navigation** : cliquer chaque lien du menu (desktop + mobile) → URL et
   contenu corrects, focus visible (TAB) sur chaque lien/bouton.
2. **Boutons** : survol des 3 variantes (primary/secondary/ghost) sur fond
   clair et sombre → relief offset + translation ; clic actif → enfoncement ;
   boutons désactivés (pagination, envoi chat vide) → grisés, non cliquables.
3. **Formulaire** : soumission vide → messages requis ; email invalide →
   validation ; envoi OK (si API up) → état « Message envoyé » avec coche
   `success` ; nouvelle soumission.
4. **Connexion** : identifiants erronés → `role=alert` rouge ; bons identifiants
   → redirection `/espace`.
5. **Dashboard admin** : filtres, pagination (boutons désactivés aux bornes),
   changement de statut, chip « Escaladé ».
6. **Accessibilité** : TAB sur toute une page (outline visible partout),
   lecteur d'écran sur le formulaire (labels lus), réduction des animations
   activée dans l'OS → le slider hero et les reveals sont immobiles.
7. **Responsive** : 375 px (menu hamburger, formulaire 1 colonne), 768 px,
   1280 px+ (grilles 2/3 colonnes, bandeau CTA aligné).
