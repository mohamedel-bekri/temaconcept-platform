# Design System — TEMACONCEPT

Conventions front-end du site. Toutes les tokens vivent dans `@theme` de
`frontend/src/index.css` (Tailwind CSS v4, pas de `tailwind.config.js`).

## Typographie

| Rôle      | Police        | Usage                                             |
| --------- | ------------- | ------------------------------------------------- |
| Display   | Archivo (900) | Titres, chiffres clés (`display`)                 |
| Texte     | Inter (400-700) | Corps de texte, champs, UI (font par défaut)    |
| Mono      | JetBrains Mono | Kickers, tags, labels « système », code           |

Chargées dans `frontend/index.html` (Google Fonts). La classe `.display`
fournit graisse, interlettrage et équilibrage (`text-wrap: balance`).
`.kicker` = label mono 0.75rem espacé. `.lede` = chapeau 1.125rem/1.65.

## Couleurs

### Palette officielle (degrés de bleu)

| Token             | Hex      | Rôle                              |
| ----------------- | -------- | --------------------------------- |
| `--color-ink`     | `#06324C`| Texte principal, fonds sombres    |
| `--color-ink-soft`| `#0a3a57`| Variante survol des fonds ink     |
| `--color-ink-muted`| `#33576e`| Texte secondaire (AA)             |
| `--color-azure`   | `#4DA9D9`| Accent unique (CTA, highlights)   |
| `--color-acier`   | `#47708A`| Libellés secondaires              |
| `--color-acier-light`| `#8fb4cc` | Accents clairs                  |
| `--color-brume`   | `#f5fafd`| Fond de page clair                |
| `--color-verre`   | `#e0eef6`| Fond de section alterné           |
| `--color-verre-dark`| `#c8ddec`| Bordures                          |
| `--color-sky-fade`| `#e8f4fa`| Fond de section teinté            |

### Rôles sémantiques (consommés par les composants)

| Token               | Hex       | Rôle                                    |
| ------------------- | --------- | --------------------------------------- |
| `--color-primary`   | `#06324C` | Action principale (`ink`)               |
| `--color-secondary` | `#47708A` | Accents secondaires (`acier`)           |
| `--color-neutral`   | `#33576e` | Texte neutre (`ink-muted`)              |
| `--color-surface`   | `#f5fafd` | Surface de page (`brume`)               |
| `--color-surface-elevated` | `#ffffff` | Cartes, formulaires                |
| `--color-accent`    | `#4DA9D9` | Accent brand (`azure`)                  |
| `--color-accent-strong` | `#16607f` | Accent assombri : **texte azure sur fond clair** |
| `--color-border`    | `#c8ddec` | Bordures (`verre-dark`)                 |
| `--color-success`   | `#1e7a4d` | Succès (formulaires)                    |
| `--color-warning`   | `#9a5b00` | Avertissement                           |
| `--color-danger`    | `#b3261e` | Erreur (formulaires, leads)             |

### Règles de contraste (WCAG AA)

- Texte de corps `ink` sur `brume`/`white` : ~17:1. ✓
- Texte secondaire `ink-muted` / `acier` sur fond clair : ≥ 4.9:1. ✓
- **Ne pas** utiliser `azure` (#4DA9D9, 2.4:1) en *texte* sur fond clair →
  `accent-strong` (7:1). L'azure reste ok sur fond `ink` (5.1:1, ex. Hero).
- Focus : `outline: 2px solid currentColor` (suit le contexte, 1.4.11).

## Rythme & espacements

- Sections : `py-20 md:py-28` (80 px → 112 px). Toujours via `<Section />`.
- Gap standard des grilles : `gap-6` (24 px).
- Cartes : padding `p-8` (32 px), `p-6` en composé.
- Titre de section → contenu : `mb-12 md:mb-16`.

## Composants (`src/components/ui/`)

| Composant      | Fichier               | Usage                                                                |
| -------------- | --------------------- | -------------------------------------------------------------------- |
| `Button`       | `Button.tsx`          | **Le seul bouton.** `variant: primary|secondary|ghost`, `tone: light|dark`, `size: md|sm`. Rendu `<Link>` (to) / `<a>` (href) / `<button>`. |
| `Badge`        | `Badge.tsx`           | Tags, secteurs, chips de valeur, statuts. `tone: neutral|accent|info|outline|outline-dark|overlay|success|warning|danger`. |
| `Section`      | `Section.tsx`         | Rythme vertical standard. `bg: none|white|verre|ink|tinted`.          |
| `SectionHeading`| `SectionHeading.tsx`  | Kicker + titre `display` + lede. `dark`, `align: left|center`.        |
| `ServiceCard`  | `ServiceCard.tsx`     | Carte service (grille d'accueil).                                    |
| `Reveal` / `RevealDraw` | —             | Animations d'apparition au scroll (respectent `prefers-reduced-motion`). |
| `Counter`      | `Counter.tsx`         | Compteur animé des chiffres clés.                                    |
| `PageHero`     | `layout/PageHero.tsx` | Héro sombre des pages internes (+ `children` = actions).              |
| `CTABand`      | `ui/CTABand.tsx`      | Bandeau de fin de page (contact + Lina).                             |
| `ContactForm`  | `sections/ContactForm.tsx` | Formulaire de contact (variant `split`, seule page : `/contact`). |

## Accessibilité

- `<main>` unique par page (layout), sections sémantiques.
- Boutons icône uniquement : `aria-label` (ex. envoi du chat, toggle nav).
- Champs : `<label>` reliés par `htmlFor`/`id`.
- États d'erreur : `role="alert"` (+ `aria-live="polite"` sur le formulaire).
- Focus visible via `currentColor` ; animations désactivées sous
  `prefers-reduced-motion` (bloc global + `usePrefersReducedMotion`).

## Guide de migration

Code existant → nouveau pattern :

| Avant (à ne plus faire)                    | Après                                   |
| ------------------------------------------ | --------------------------------------- |
| `className="btn btn-signal"`               | `<Button variant="primary">`            |
| `className="btn btn-white"`                | `<Button variant="secondary" tone="dark">` |
| `className="btn btn-azure"`                | `<Button variant="secondary">`          |
| `className="btn btn-ghost"`                | `<Button variant="ghost">`              |
| `className="btn btn-ghost-on-dark"`        | `<Button variant="ghost" tone="dark">`  |
| `className="btn btn-sm"`                   | `<Button size="sm">`                    |
| `<section className="py-20 md:py-28">`     | `<Section>`                             |
| `<section className="bg-ink py-20 text-brume md:py-28">` | `<Section bg="ink">`        |
| `<span className="border border-verre-dark px-2 py-1 font-mono …">` | `<Badge tone="outline">` |
| `text-ink/60` (texte secondaire clair)     | `text-ink-muted`                        |
| `text-azure` en texte sur fond clair       | `text-accent-strong`                    |
| `text-acier/70` / `text-acier/80`          | `text-acier`                            |
| répéter kicker + titre + lede              | `<SectionHeading kicker=… title=… lede=… />` |

**Règle** : on n'instancie plus un bouton avec une classe CSS (`btn-*` a été
supprimé de `index.css`) — toujours `<Button />`.
