# 🤖 CLAUDE.md - SwaveConnexion Design System

## 📋 Aperçu du projet

**SwaveConnexion** est un design system minimaliste et moderne construit avec Nuxt 4, Vue 3, TypeScript et Tailwind CSS v4. Ce projet combine l'efficacité de CSS natif avec variables pour les composants UI et les utilities Tailwind pour les layouts, créant ainsi une architecture hybride performante et maintenable.

### Technologies principales

- **Framework:** Nuxt 4.2.1
- **UI Library:** Vue 3.5.25
- **Styling:** Tailwind CSS 4.1.17 + CSS natif avec variables
- **Language:** TypeScript
- **State Management:** Pinia 3.0.4
- **Dark Mode:** @nuxtjs/color-mode (SSR-friendly, sans FOUC)
- **Tooling:** Vite, ESLint, Prettier

---

## 🎨 Philosophie du Design System

### Principes fondamentaux

1. **CSS natif avec variables** pour les composants UI
   - Variables CSS globales (`--primary`, `--space-md`, etc.)
   - Styles scopés dans chaque composant Vue
   - Nommage BEM strict (`.block__element--modifier`)

2. **Tailwind utilities exclusivement pour les layouts**
   - Classes utilitaires pour flex, grid, spacing
   - Responsive natif avec breakpoints (sm:, md:, lg:)
   - Pas de duplication de styles entre CSS natif et Tailwind

3. **Type scale harmonieux**
   - Ratio Perfect Fourth (1.333x entre chaque niveau)
   - Base de 16px pour le corps de texte
   - Calculé via [typescale.com](https://typescale.com)

4. **Documentation systématique**
   - `CLAUDE.md` dans chaque dossier de composants
   - `README.txt` pour les développeurs humains
   - Commentaires explicites dans chaque fichier

---

## 🎯 Polices personnalisées

Le projet utilise 3 polices avec forte personnalité pour se démarquer :

| Usage | Police | Caractéristiques |
|-------|--------|------------------|
| **Corps de texte** | **Space Grotesk** | Géométrique, moderne, excellente en UI/UX |
| **Titres (Display)** | **Clash Display** | Bold, impactant, formes géométriques marquées |
| **Code (Monospace)** | **JetBrains Mono** | Ligatures pour code, hauteur optimale |

**Emplacement:** `app/assets/fonts/`
**Format:** WOFF2 (performance optimale)
**Poids disponibles:** Regular (400), Medium (500), SemiBold (600), Bold (700)

---

## 📁 Structure du projet (Phase 13)

```
SwaveConnexion/
├── app/
│   ├── assets/
│   │   ├── css/
│   │   │   ├── _variables.css      # Variables couleurs, espacements, bordures
│   │   │   ├── _typography.css     # @font-face + Type scale + styles HTML
│   │   │   ├── _reset.css          # Reset CSS dédié
│   │   │   └── main.css            # Point d'entrée global
│   │   └── fonts/                  # Polices custom (WOFF2)
│   ├── components/
│   │   ├── ui/                     # Composants atomiques (CSS natif + BEM)
│   │   │   ├── Button.vue, Card.vue, Input.vue, Badge.vue
│   │   │   ├── Modal.vue, Dropdown.vue, Checkbox.vue, Switch.vue
│   │   │   ├── Toast.vue, Tooltip.vue, ProgressBar.vue
│   │   │   └── Tabs.vue
│   │   ├── layout/                 # Composants structure (Tailwind utilities)
│   │   │   ├── Header.vue, Footer.vue
│   │   │   ├── Container.vue, Grid.vue, Stack.vue, SplitPane.vue
│   │   │   └── CLAUDE.md
│   │   ├── sections/               # Sections complètes
│   │   │   ├── Hero.vue, CTA.vue, FeaturesGrid.vue
│   │   │   └── CLAUDE.md
│   │   └── showcase/               # Composants showcase UNIQUEMENT
│   │       ├── ShowcaseLayout.vue       # Layout showcase pages
│   │       ├── ShowcaseSection.vue      # Section wrapper
│   │       ├── ShowcaseCodeBlock.vue    # Code snippets
│   │       └── LayoutDemo.vue           # Wrapper visualisation layouts
│   ├── composables/
│   │   └── useTheme.ts             # Dark mode + Thèmes (@nuxtjs/color-mode)
│   ├── layouts/
│   │   ├── default.vue             # Layout standard (Header + Footer)
│   │   └── blank.vue               # Layout vide
│   ├── pages/
│   │   ├── index.vue               # Landing page marketing
│   │   └── design-system/          # Pages showcase (Phase 13)
│   │       ├── index.vue            # Landing design system
│   │       ├── components.vue       # UI Components showcase
│   │       ├── feedback.vue         # Feedback components
│   │       ├── layouts.vue          # Layouts showcase
│   │       └── sections.vue         # Sections showcase
│   └── app.vue                     # Point d'entrée Nuxt
├── public/
├── CLAUDE.md                       # Ce fichier
├── PDM_DesignSystem.md             # Plan détaillé avec suivi d'avancement
├── nuxt.config.ts                  # Config Nuxt + @nuxtjs/color-mode
├── tailwind.config.js
├── package.json
└── tsconfig.json
```

---

## 🛠️ Installation et développement

### Prérequis

- Node.js >= 18
- npm >= 9

### Installation

```bash
# Cloner le dépôt
git clone https://github.com/annubis-knight/SwaveConnexion.git
cd SwaveConnexion

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Le projet sera accessible sur `http://localhost:3000`

### Scripts disponibles

```bash
npm run dev          # Serveur de développement (hot reload)
npm run build        # Build de production
npm run generate     # Génération statique
npm run preview      # Prévisualisation du build
npm run lint         # Linter ESLint
npm run lint:fix     # Fix automatique ESLint
```

---

## 📦 Composants disponibles (Phase 13)

### 1. Composants UI (CSS natif + BEM)

**Localisation:** `/design-system/components` | Fichiers: `app/components/ui/`

| Composant | Description | Props principales |
|-----------|-------------|-------------------|
| **Button** | 5 variantes + 3 tailles | `variant`, `size`, `disabled` |
| **Card** | 3 variantes avec slots | `variant` |
| **Input** | Champ de formulaire avec validation | `label`, `type`, `error`, `modelValue` |
| **Badge** | 6 variantes sémantiques (WCAG AA) | `variant`, `size` |
| **Checkbox** | Checkbox accessible | `label`, `modelValue` |
| **Switch** | Toggle switch animé | `modelValue` |
| **Dropdown** | Menu déroulant | `items`, `placeholder` |

**Documentation:** `app/components/ui/CLAUDE.md`

### 2. Composants Feedback (CSS natif + BEM)

**Localisation:** `/design-system/feedback` | Fichiers: `app/components/ui/`

| Composant | Description | Props principales |
|-----------|-------------|-------------------|
| **Toast** | Notifications temporaires | `message`, `type`, `duration` |
| **Modal** | Dialogue modal accessible | `isOpen`, `title` |
| **Tooltip** | Infobulle contextuelle | `content`, `position` |
| **ProgressBar** | Barre de progression | `value`, `max`, `variant` |
| **Tabs** | Navigation par onglets (keyboard) | `tabs`, `activeTab` |

**Documentation:** `app/components/ui/CLAUDE.md`

### 3. Composants Layout (Tailwind utilities)

**Localisation:** `/design-system/layouts` | Fichiers: `app/components/layout/`

| Composant | Description | Props principales |
|-----------|-------------|-------------------|
| **Header** | En-tête sticky avec dark mode | - |
| **Footer** | Pied de page responsive | - |
| **Container** | Wrapper centré 5 tailles | `size`, `padding` |
| **Grid** | Grid responsive | `cols`, `gap`, `responsive` |
| **Stack** | Flex wrapper H/V | `direction`, `gap`, `align` |
| **SplitPane** | Layout 2 colonnes | `leftWidth`, `gap` |

**Documentation:** `app/components/layout/CLAUDE.md`

### 4. Sections (Tailwind + slots)

**Localisation:** `/design-system/sections` | Fichiers: `app/components/sections/`

| Composant | Description | Props principales |
|-----------|-------------|-------------------|
| **Hero** | En-tête 2 variantes (WCAG AA) | `variant`, `centered` |
| **CTA** | Call-to-action 2 variantes | `title`, `description`, `variant` |
| **FeaturesGrid** | Grille de features | `title`, `features`, `cols` |

**Documentation:** `app/components/sections/CLAUDE.md`

### 5. Composants Showcase (UNIQUEMENT pour /design-system)

**⚠️ NE PAS utiliser en production**

| Composant | Description | Usage |
|-----------|-------------|-------|
| **ShowcaseLayout** | Layout showcase pages | Wrapper pour pages design-system |
| **ShowcaseSection** | Section wrapper | Encadrer les démos |
| **ShowcaseCodeBlock** | Afficher code snippets | Exemples de code |
| **LayoutDemo** | Bordures néon visualisation | Wrapper UNIQUEMENT sur /design-system/layouts |

**Fichiers:** `app/components/showcase/`

---

## 🎨 Variables CSS disponibles

### Couleurs

```css
/* Principales */
--primary: #2563eb;
--primary-light: #60a5fa;
--primary-dark: #1e40af;

--secondary: #525252;
--secondary-light: #a3a3a3;
--secondary-dark: #262626;

--accent: #f59e0b;
--accent-light: #fbbf24;
--accent-dark: #d97706;

/* Neutres */
--neutral-white: #ffffff;
--neutral-light: #f5f5f5;
--neutral-medium: #d4d4d4;
--neutral-dark: #404040;
--neutral-black: #171717;

/* Sémantiques */
--success: #10b981;
--warning: #f59e0b;
--error: #ef4444;
--info: #3b82f6;
```

### Espacements

```css
--space-xs: 0.5rem;   /* 8px */
--space-sm: 1rem;     /* 16px */
--space-md: 1.5rem;   /* 24px */
--space-lg: 2rem;     /* 32px */
--space-xl: 3rem;     /* 48px */
--space-2xl: 4rem;    /* 64px */
```

### Typographie

```css
--font-sans: 'Space Grotesk', system-ui, sans-serif;
--font-display: 'Clash Display', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', monospace;

--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.75rem;   /* 28px */
--text-3xl: 2.25rem;   /* 36px */
--text-4xl: 3rem;      /* 48px */
--text-5xl: 4rem;      /* 64px */
--text-6xl: 5.25rem;   /* 84px */
```

---

## 🚀 Utilisation des composants

### Exemple : Page avec Hero + Composants UI

```vue
<template>
  <div>
    <!-- Hero avec fond dégradé -->
    <SectionsHero variant="gradient" :centered="true">
      <h1 class="text-white mb-6">Bienvenue sur SwaveConnexion</h1>
      <p class="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
        Design system minimaliste pour applications modernes
      </p>
      <div class="flex gap-4 justify-center">
        <Button variant="primary" size="lg">Commencer</Button>
        <Button variant="outline" size="lg">En savoir plus</Button>
      </div>
    </SectionsHero>

    <!-- Contenu avec composants UI -->
    <div class="container mx-auto px-6 py-12">
      <Card variant="elevated">
        <template #header>
          <h3>Titre de la carte</h3>
        </template>
        <p>Contenu de la carte avec composants CSS natif.</p>
        <template #footer>
          <Button variant="primary">Action</Button>
        </template>
      </Card>
    </div>
  </div>
</template>
```

---

## 📖 Documentation détaillée

- **Plan d'implémentation complet:** Voir [PDM_DesignSystem.md](./PDM_DesignSystem.md)
- **Composants UI:** Voir `app/components/ui/CLAUDE.md`
- **Composants Layout:** Voir `app/components/layout/CLAUDE.md`
- **Sections:** Voir `app/components/sections/CLAUDE.md`

---

## 🌓 Dark Mode & Thèmes (Phase 11-13)

### Dark Mode avec @nuxtjs/color-mode

**Module officiel Nuxt** pour gestion du dark mode (Phase 13 - refactorisation):

✅ **Avantages:**
- **Sans FOUC** (Flash of Unstyled Content): Script inline dans `<head>`
- **SSR-friendly**: Génération serveur sans hydration mismatch
- **Auto media query listener**: Détecte changements système en temps réel
- **Persistence localStorage**: Préférence utilisateur sauvegardée
- **Initialisation unique**: Via plugin Nuxt (pas de multiples appels)

**Configuration:** `nuxt.config.ts`

```typescript
export default defineNuxtConfig({
  modules: ['@nuxtjs/color-mode'],
  colorMode: {
    preference: 'system',      // Préférence par défaut
    fallback: 'light',          // Si system échoue
    classSuffix: '',            // Classe 'dark' au lieu de 'dark-mode'
    storageKey: 'swave-color-mode',
  },
});
```

**Utilisation:**

```typescript
// Dans composables/useTheme.ts
const colorMode = useColorMode(); // Fourni par @nuxtjs/color-mode

// Toggle
colorMode.preference = colorMode.preference === 'light' ? 'dark' : 'light';

// Check
const isDark = computed(() => colorMode.value === 'dark');
```

### Thèmes Custom (default, ocean, sunset)

**3 thèmes** configurables avec CSS custom properties:

- **default**: Bleu primary (#2563eb)
- **ocean**: Palette bleu océan
- **sunset**: Palette orange sunset

**Implémentation:** `data-theme` attribute sur `<html>`:

```css
/* _variables.css */
[data-theme="ocean"] {
  --primary: #0ea5e9;
  --accent: #06b6d4;
}

[data-theme="sunset"] {
  --primary: #f97316;
  --accent: #f59e0b;
}
```

**Gestion:** `composables/useTheme.ts` (thèmes custom) + `@nuxtjs/color-mode` (dark/light)

---

## 🗂️ Organisation Multi-Pages (Phase 13)

**Structure consolidée** avec 5 pages pour éviter la surcharge:

```
/                            → Landing page marketing
/design-system/              → Landing design system (4 catégories)
/design-system/components    → UI atomiques (Buttons, Forms, Badge, Card)
/design-system/feedback      → Interactions (Toast, Modal, Tooltip, Tabs)
/design-system/layouts       → Structure (Container, Grid, Stack, SplitPane)
/design-system/sections      → Prêt-à-l'emploi (Hero, CTA, FeaturesGrid)
```

**Avantages:**
- ✅ **Lazy loading** par page (performance)
- ✅ **Navigation claire** (4 catégories logiques)
- ✅ **Maintainable** (moins de fichiers que 10 pages séparées)
- ✅ **Isolation fonctionnelle** (chaque catégorie indépendante)

**Composants Showcase** pour affichage cohérent:
- `ShowcaseLayout`: Layout uniforme avec breadcrumbs
- `ShowcaseSection`: Wrapper sections avec bordure
- `ShowcaseCodeBlock`: Afficher code exemples
- `LayoutDemo`: Bordures néon pour visualiser layouts (UNIQUEMENT sur /layouts)

---

## 🤝 Conventions de code

### CSS

- **Variables CSS** : `--nom-de-variable` (kebab-case)
- **Classes BEM** : `.block__element--modifier`
- **Ordre des propriétés** : Layout → Box Model → Visual → Typography

### Vue/TypeScript

- **Composants** : PascalCase (`Button.vue`, `Header.vue`)
- **Props** : camelCase avec types TypeScript
- **Events** : kebab-case (`@update:model-value`)
- **Computed** : camelCase avec préfixe descriptif

### Commits

Format : `type(scope): description`

**Types:**
- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Documentation
- `style`: Formatage, CSS
- `refactor`: Refactoring
- `test`: Tests
- `chore`: Maintenance

**Exemple:** `feat(ui): add Button component with BEM naming`

---

## 🎯 État d'avancement

**Projet en phase d'initialisation**

Consultez [PDM_DesignSystem.md](./PDM_DesignSystem.md) pour suivre l'avancement détaillé de chaque phase d'implémentation avec système de checkboxes.

---

## 👤 Auteur

**Arnaud Gutierrez**
Email: arnaud.g.motiv@gmail.com
GitHub: [@annubis-knight](https://github.com/annubis-knight)

---

## 📄 Licence

Ce projet est privé et à usage personnel.

---

## 🔗 Liens utiles

- [Nuxt 4 Documentation](https://nuxt.com/docs)
- [Vue 3 Documentation](https://vuejs.org/)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Type Scale Calculator](https://typescale.com/)
- [BEM Methodology](http://getbem.com/)

---

## ⚙️ Instructions pour Claude Code

### Workflow de développement obligatoire

**IMPORTANT:** À chaque fois que Claude Code effectue des modifications sur ce projet, suivre IMPÉRATIVEMENT ce processus:

1. **Effectuer les modifications demandées** (création de fichiers, édition de code, etc.)

2. **Vérifier systématiquement le PDM** après chaque session de travail:
   - Ouvrir [PDM_DesignSystem.md](./PDM_DesignSystem.md)
   - Identifier quelle(s) phase(s) a/ont été impactée(s) par les modifications
   - Vérifier si des tâches de la checklist ont été complétées

3. **Mettre à jour le PDM si nécessaire**:
   - Cocher les checkboxes `[ ]` → `[x]` pour les tâches terminées
   - Mettre à jour le statut de la phase si elle est complétée (🔴 → 🟡 → 🟢)
   - Mettre à jour la progression (0% → 50% → 100%)
   - Ajouter la date de réalisation et le hash du commit si phase complète
   - Documenter les détails importants (temps de build, fichiers créés, etc.)

4. **Commiter les changements du PDM**:
   ```bash
   git add PDM_DesignSystem.md
   git commit -m "docs(pdm): mise à jour Phase X [statut]"
   git push origin master
   ```

5. **Valider le fonctionnement**:
   - Lancer `npm run dev` pour vérifier que tout fonctionne
   - Tester les nouvelles fonctionnalités ajoutées
   - S'assurer qu'aucune régression n'a été introduite

### Règles strictes

- ❌ **NE JAMAIS** terminer une session sans vérifier le PDM
- ❌ **NE JAMAIS** laisser des tâches complétées non cochées dans le PDM
- ❌ **NE JAMAIS** oublier de commiter les mises à jour du PDM
- ✅ **TOUJOURS** maintenir le PDM à jour en temps réel
- ✅ **TOUJOURS** documenter les résultats de chaque phase
- ✅ **TOUJOURS** tester avec `npm run dev` avant de valider

### Exemple de workflow complet

```
1. User demande: "Crée le composant Button.vue"
2. Claude Code crée Button.vue avec BEM + CSS natif
3. Claude Code teste le composant
4. Claude Code ouvre PDM_DesignSystem.md
5. Claude Code identifie: Phase 4, tâche "Créer Button.vue"
6. Claude Code coche: [x] Créer Button.vue
7. Claude Code commit: "docs(pdm): Button.vue complété"
8. Claude Code valide avec npm run dev
9. Session terminée ✅
```

---

**💡 Note pour Claude Code:** Ce fichier fournit un aperçu complet du projet. Pour les détails d'implémentation spécifiques, consultez toujours les fichiers `CLAUDE.md` dans chaque dossier de composants et le `PDM_DesignSystem.md` pour le plan détaillé.

**🔴 RAPPEL CRITIQUE:** Ne JAMAIS oublier de mettre à jour le PDM après chaque modification du projet!
