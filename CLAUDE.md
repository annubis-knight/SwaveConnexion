# CLAUDE.md - Swave Connexion Design System

## Apercu du projet

**Swave Connexion** est un design system minimaliste et moderne construit avec Nuxt 4, Vue 3, TypeScript et Tailwind CSS v4. Ce projet combine l'efficacité de CSS natif avec variables pour les composants UI et les utilities Tailwind pour les layouts, créant ainsi une architecture hybride performante et maintenable.

### Technologies principales

- **Framework:** Nuxt 4.2.1
- **UI Library:** Vue 3.5.25
- **Styling:** Tailwind CSS 4.1.17 + CSS natif avec variables
- **Language:** TypeScript
- **State Management:** Pinia 3.0.4
- **Dark Mode:** @nuxtjs/color-mode (SSR-friendly, sans FOUC)
- **Tooling:** Vite, ESLint, Prettier, Vitest

---

## Philosophie du Design System

### Principes fondamentaux

1. **CSS natif avec variables** pour les composants UI
   - Variables CSS globales (`--primary`, etc.)
   - Styles scopes dans chaque composant Vue
   - Nommage BEM strict (`.block__element--modifier`)

2. **Tailwind utilities exclusivement pour les layouts**
   - Classes utilitaires pour flex, grid, spacing
   - Responsive natif avec breakpoints (sm:, md:, lg:)
   - Pas de duplication de styles entre CSS natif et Tailwind

3. **Type scale harmonieux**
   - Ratio Perfect Fourth (1.333x entre chaque niveau)
   - Base de 16px pour le corps de texte
   - Calcule via [typescale.com](https://typescale.com)

4. **`_typography.css` = source unique de verite (fichier protege)**
   - Tous les styles typographiques (font-*, line-height, letter-spacing, margins des titres) sont definis dans `_typography.css`
   - Les composants `Heading` et `Text` deleguent a ce fichier
   - **Interdit** d'overrider ces styles via classes Tailwind ou CSS scoped dans les Sections/Pages
   - **Claude ne modifie JAMAIS `_typography.css`** lors de la generation de composants
   - Si le rendu ne convient pas -> signaler a l'utilisateur qu'une modification manuelle de `_typography.css` est necessaire

5. **Documentation systematique**
   - `CLAUDE.md` dans chaque dossier de composants
   - `README.txt` pour les developpeurs humains
   - Commentaires explicites dans chaque fichier

---

## Polices personnalisees

Le projet utilise 2 polices avec forte personnalite :

| Usage | Police | Caracteristiques |
|-------|--------|------------------|
| **Corps de texte** | **Space Grotesk** | Geometrique, moderne, excellente en UI/UX |
| **Titres (Display)** | **Clash Display** | Bold, impactant, formes geometriques marquees |

**Emplacement:** `app/assets/fonts/`
**Format:** WOFF2 (performance optimale)
**Poids disponibles:** Regular (400), Medium (500), SemiBold (600), Bold (700)

---

## Structure du projet

```
SwaveConnexion/
├── app/
│   ├── assets/
│   │   ├── css/
│   │   │   ├── _variables.css      # Variables couleurs, espacements, bordures
│   │   │   ├── _typography.css     # @font-face + Type scale + styles HTML
│   │   │   ├── _reset.css          # Reset CSS dedie
│   │   │   └── main.css            # Point d'entree global
│   │   ├── fonts/                  # Polices custom (WOFF2)
│   │   └── images/                 # Images du projet
│   ├── components/
│   │   ├── ui/                     # Composants atomiques (CSS natif + BEM)
│   │   │   ├── ButtonSwave.vue, ButtonPromoSwave.vue
│   │   │   ├── CardEvent.vue, CardFeature.vue
│   │   │   ├── DateEvent.vue, InfoEvent.vue
│   │   │   ├── Heading.vue, Text.vue
│   │   │   ├── InputSwave.vue, LabelSwave.vue, NavLink.vue
│   │   │   └── CLAUDE.md
│   │   ├── layout/                 # Composants structure (Tailwind utilities)
│   │   │   ├── Container.vue, ContainerFlex.vue, ContainerMax.vue
│   │   │   ├── Grid.vue, GridArea.vue, GridResponsive.vue
│   │   │   ├── SplitPane.vue
│   │   │   └── CLAUDE.md
│   │   └── sections/               # Sections completes
│   │       ├── Navbar.vue, Footer.vue
│   │       ├── LandingHero.vue, LandingFeature.vue
│   │       ├── LandingAgenda.vue, LandingEvents.vue
│   │       ├── FeaturesGrid.vue, SectionCTA.vue
│   │       └── CLAUDE.md
│   ├── composables/
│   │   └── useThemeManager.ts      # Dark mode + Themes
│   ├── layouts/
│   │   ├── default.vue             # Layout standard (Navbar + Footer)
│   │   └── blank.vue               # Layout vide
│   ├── pages/
│   │   └── index.vue               # Landing page
│   └── app.vue                     # Point d'entree Nuxt
├── public/
├── CLAUDE.md                       # Ce fichier
├── README.txt                      # Documentation pour developpeurs
├── nuxt.config.ts                  # Config Nuxt + @nuxtjs/color-mode
├── tailwind.config.js
├── package.json
└── tsconfig.json
```

---

## Installation et developpement

### Prerequis

- Node.js >= 18
- npm >= 9

### Installation

```bash
# Cloner le depot
git clone <repository-url>
cd SwaveConnexion

# Installer les dependances
npm install

# Lancer le serveur de developpement
npm run dev
```

Le projet sera accessible sur `http://localhost:3000`

### Scripts disponibles

```bash
npm run dev          # Serveur de developpement (hot reload)
npm run build        # Build de production
npm run generate     # Generation statique
npm run preview      # Previsualisation du build
npm run lint         # Linter ESLint
npm run lint:fix     # Fix automatique ESLint
npm run format       # Formatage Prettier
npm run test         # Lancer les tests
npm run test:watch   # Tests en mode watch
```

---

## Composants disponibles

### 1. Composants UI (CSS natif + BEM)

**Fichiers:** `app/components/ui/`

| Composant | Description |
|-----------|-------------|
| **ButtonSwave** | Bouton principal avec variantes |
| **ButtonPromoSwave** | Bouton promotionnel |
| **CardEvent** | Carte evenement avec date |
| **CardFeature** | Carte fonctionnalite |
| **DateEvent** | Affichage date d'evenement |
| **InfoEvent** | Informations d'evenement |
| **Heading** | Titres h1-h6 (styles via _typography.css) |
| **Text** | Paragraphes/spans (props typographiques) |
| **InputSwave** | Champ de formulaire |
| **LabelSwave** | Label de formulaire |
| **NavLink** | Lien de navigation |

**Documentation:** `app/components/ui/CLAUDE.md`

### 2. Composants Layout (Tailwind utilities)

**Fichiers:** `app/components/layout/`

| Composant | Description |
|-----------|-------------|
| **Container** | Wrapper centre |
| **ContainerFlex** | Container avec flexbox |
| **ContainerMax** | Container avec max-width |
| **Grid** | Grid responsive |
| **GridArea** | Grid avec zones nommees |
| **GridResponsive** | Grid adaptatif |
| **SplitPane** | Layout 2 colonnes |

**Documentation:** `app/components/layout/CLAUDE.md`

### 3. Sections (Orchestrateurs)

**Fichiers:** `app/components/sections/`

**Role:** Les Sections sont des **orchestrateurs** qui composent Layout + UI components.
- **Structure:** Via composants Layout (Container, Grid)
- **Contenu:** Via composants UI (Heading, Text, Button)
- **Visuel:** CSS scoped pour backgrounds, decorations, spacing
- **Events:** Peuvent emettre des evenements custom vers les pages

| Composant | Description |
|-----------|-------------|
| **Navbar** | Navigation principale |
| **Footer** | Pied de page |
| **LandingHero** | Section hero de la landing |
| **LandingFeature** | Section fonctionnalites |
| **LandingAgenda** | Section agenda |
| **LandingEvents** | Section evenements |
| **FeaturesGrid** | Grille de features |
| **SectionCTA** | Call-to-action |

**Documentation:** `app/components/sections/CLAUDE.md`

---

## Variables CSS

### REGLE CRITIQUE : Toujours verifier les fichiers sources

**AVANT d'utiliser une variable CSS**, Claude DOIT lire le fichier source pour verifier son existence :
- **Couleurs/Backgrounds/Textes** -> Lire `app/assets/css/_variables.css`
- **Typographie** -> Lire `app/assets/css/_typography.css`

**Ne JAMAIS supposer qu'une variable existe.** Les exemples ci-dessous sont indicatifs et peuvent differer du projet reel.

### Fichiers sources (SSOT)

| Fichier | Contenu |
|---------|---------|
| `_variables.css` | Couleurs thematiques, backgrounds, textes, bordures |
| `_typography.css` | Polices, tailles, line-heights, font-weights |

### Exemples de variables (verifier `_variables.css`)

```css
/* Thematiques (exemples) */
--primary, --primary-light, --primary-dark
--secondary, --accent, --success, --error, --warning, --info

/* Backgrounds semantiques (exemples) */
--bg-base        /* Fond principal */
--bg-invert      /* Fond inverse (noir) */
--bg-subtle      /* Fond subtil */
--bg-elevated    /* Fond sureleve */

/* Textes semantiques (exemples) */
--text-strong    /* Texte principal */
--text-base      /* Texte secondaire */
--text-subtle    /* Texte attenue */
--text-inverse   /* Texte sur fond fonce */

/* Bordures (exemples) */
--border-base, --border-strong
```

### Exemples de typographie (verifier `_typography.css`)

```css
/* Polices (exemples) */
--font-sans, --font-display

/* Tailles (exemples) */
--text-xs, --text-sm, --text-base, --text-lg, --text-xl, --text-2xl...

/* Weights (exemples) */
--font-regular, --font-medium, --font-semibold, --font-bold...
```

---

## Documentation detaillee

- **Composants UI:** Voir `app/components/ui/CLAUDE.md`
- **Composants Layout:** Voir `app/components/layout/CLAUDE.md`
- **Sections:** Voir `app/components/sections/CLAUDE.md`

---

## Organisation des Pages

**Structure des pages:**

```
/                    -> Landing page (index.vue)
```

---

## Conventions de code

### CSS

- **Variables CSS** : `--nom-de-variable` (kebab-case)
- **Classes BEM** : `.block__element--modifier`
- **Ordre des proprietes** : Layout -> Box Model -> Visual -> Typography

### Vue/TypeScript

- **Composants** : PascalCase (`ButtonSwave.vue`, `Navbar.vue`)
- **Props** : camelCase avec types TypeScript
- **Events** : kebab-case (`@update:model-value`)
- **Computed** : camelCase avec prefixe descriptif
- **Commentaires ASCII** : Toujours dans `<script setup>` (commentaire JS `/* */`), jamais en HTML `<!-- -->` pour eviter qu'ils apparaissent dans le DOM

### Commits

Format : `type(scope): description`

**Types:**
- `feat`: Nouvelle fonctionnalite
- `fix`: Correction de bug
- `docs`: Documentation
- `style`: Formatage, CSS
- `refactor`: Refactoring
- `test`: Tests
- `chore`: Maintenance

**Exemple:** `feat(ui): add ButtonSwave component with BEM naming`

---

## Auteur

**Arnaud Gutierrez**
Email: arnaud.g.motiv@gmail.com
GitHub: [@annubis-knight](https://github.com/annubis-knight)

---

## Licence

Ce projet est prive et a usage personnel.

---

## Liens utiles

- [Nuxt 4 Documentation](https://nuxt.com/docs)
- [Vue 3 Documentation](https://vuejs.org/)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Type Scale Calculator](https://typescale.com/)
- [BEM Methodology](http://getbem.com/)

---

## Instructions pour Claude Code

### Workflow de developpement obligatoire

**IMPORTANT:** A chaque fois que Claude Code effectue des modifications sur ce projet, suivre IMPERATIVEMENT ce processus:

1. **Effectuer les modifications demandees** (creation de fichiers, edition de code, etc.)

2. **Verifier systematiquement le PDM** apres chaque session de travail (si existant):
   - Ouvrir PDM_DesignSystem.md
   - Identifier quelle(s) phase(s) a/ont ete impactee(s) par les modifications
   - Verifier si des taches de la checklist ont ete completees

3. **Mettre a jour le PDM si necessaire**:
   - Cocher les checkboxes `[ ]` -> `[x]` pour les taches terminees
   - Mettre a jour le statut de la phase si elle est completee
   - Mettre a jour la progression (0% -> 50% -> 100%)
   - Ajouter la date de realisation et le hash du commit si phase complete

4. **Valider le fonctionnement**:
   - Lancer `npm run dev` pour verifier que tout fonctionne
   - Tester les nouvelles fonctionnalites ajoutees
   - S'assurer qu'aucune regression n'a ete introduite

### Regles strictes

- NE JAMAIS terminer une session sans verifier le PDM (si existant)
- NE JAMAIS laisser des taches completees non cochees dans le PDM
- TOUJOURS maintenir le PDM a jour en temps reel
- TOUJOURS tester avec `npm run dev` avant de valider

---

**Note pour Claude Code:** Ce fichier fournit un apercu complet du projet. Pour les details d'implementation specifiques, consultez toujours les fichiers `CLAUDE.md` dans chaque dossier de composants.
