# Swave Connexion - Design System

Design system minimaliste et moderne construit avec Nuxt 4, Vue 3, TypeScript et Tailwind CSS v4.

## Technologies

| Stack | Version |
|-------|---------|
| Framework | Nuxt 4.2.1 |
| UI Library | Vue 3.5.25 |
| Styling | Tailwind CSS 4.1.17 + CSS natif |
| Language | TypeScript |
| State Management | Pinia 3.0.4 |
| Dark Mode | @nuxtjs/color-mode |

## Prerequis

- Node.js >= 18
- npm >= 9

## Installation

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

## Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de developpement (hot reload) |
| `npm run build` | Build de production |
| `npm run generate` | Generation statique |
| `npm run preview` | Previsualisation du build |
| `npm run lint` | Linter ESLint |
| `npm run lint:fix` | Fix automatique ESLint |
| `npm run format` | Formatage Prettier |
| `npm run test` | Lancer les tests |
| `npm run test:watch` | Tests en mode watch |
| `npm run test:coverage` | Tests avec couverture |

## Structure du projet

```
app/
  assets/
    css/              # Variables CSS, typographie, reset
    fonts/            # Polices custom (WOFF2)
    images/           # Images du projet
  components/
    ui/               # Composants atomiques (CSS natif + BEM)
    layout/           # Composants structure (Tailwind utilities)
    sections/         # Sections completes (orchestrateurs)
  composables/        # Hooks Vue (useThemeManager)
  layouts/            # Layouts Nuxt (default, blank)
  pages/              # Pages de l'application
```

## Architecture CSS

### 1. CSS natif avec variables pour les composants UI
- Variables CSS globales (`--primary`, `--bg-base`, etc.)
- Styles scopes dans chaque composant Vue
- Nommage BEM strict (`.block__element--modifier`)

### 2. Tailwind utilities exclusivement pour les layouts
- Classes utilitaires pour flex, grid, spacing
- Responsive natif avec breakpoints (`sm:`, `md:`, `lg:`)

### 3. Fichiers CSS principaux
| Fichier | Contenu |
|---------|---------|
| `_variables.css` | Variables couleurs, espacements, bordures |
| `_typography.css` | @font-face + Type scale + styles HTML |
| `_reset.css` | Reset CSS dedie |
| `main.css` | Point d'entree global |

## Polices personnalisees

| Usage | Police | Caracteristiques |
|-------|--------|------------------|
| Corps de texte | Space Grotesk | Geometrique, moderne |
| Titres | Clash Display | Bold, impactant |

**Poids disponibles:** Regular (400), Medium (500), SemiBold (600), Bold (700)

## Documentation

- `CLAUDE.md` - Instructions pour Claude Code (IA)
- `app/components/*/CLAUDE.md` - Documentation par dossier de composants

## Conventions de code

### CSS
- Variables CSS: `--nom-de-variable` (kebab-case)
- Classes BEM: `.block__element--modifier`

### Vue/TypeScript
- Composants: PascalCase (`Button.vue`)
- Props: camelCase avec types TypeScript
- Events: kebab-case (`@update:model-value`)

### Commits
- Format: `type(scope): description`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## Auteur

**Arnaud Gutierrez**
Email: arnaud.g.motiv@gmail.com
GitHub: [@annubis-knight](https://github.com/annubis-knight)

## Licence

Ce projet est prive et a usage personnel.
