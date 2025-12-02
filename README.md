# 🌊 SwaveConnexion Design System

> Design system minimaliste et performant construit avec Nuxt 4, Vue 3, TypeScript et Tailwind CSS v4

[![Nuxt](https://img.shields.io/badge/Nuxt-4.2.1-00DC82?style=flat&logo=nuxt.js&logoColor=white)](https://nuxt.com/)
[![Vue](https://img.shields.io/badge/Vue-3.5.25-4FC08D?style=flat&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.17-06B6D4?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 📖 Table des matières

- [Vue d'ensemble](#-vue-densemble)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Structure du projet](#-structure-du-projet)
- [Philosophie du design system](#-philosophie-du-design-system)
- [Composants disponibles](#-composants-disponibles)
- [Variables CSS](#-variables-css)
- [Guide de développement](#-guide-de-développement)
- [Conventions de code](#-conventions-de-code)
- [Workflow Git](#-workflow-git)
- [Documentation pour l'IA](#-documentation-pour-lia)
- [Roadmap](#-roadmap)
- [Contributeurs](#-contributeurs)

---

## 🎯 Vue d'ensemble

**SwaveConnexion** est un design system moderne qui combine le meilleur de deux mondes :
- **CSS natif avec variables** pour les composants UI (indépendance et réutilisabilité)
- **Tailwind utilities** exclusivement pour les layouts (rapidité et cohérence)

### Pourquoi cette approche hybride ?

| Aspect | CSS natif (Composants UI) | Tailwind (Layouts) |
|--------|---------------------------|-------------------|
| **Utilisation** | Composants atomiques réutilisables | Structure de page, grilles, espacements |
| **Avantages** | Variables globales, BEM strict, découplage | Utilities préconstruites, responsive natif |
| **Maintenance** | Centralisation dans `_variables.css` | Pas de CSS custom à maintenir |
| **Performance** | Chargement optimal des polices custom | Tree-shaking automatique |

### Objectifs du projet

1. ✅ **Minimalisme** : Pas de sur-ingénierie, seulement l'essentiel
2. ✅ **Maintenabilité** : Documentation systématique (CLAUDE.md par dossier)
3. ✅ **Performance** : Polices locales (WOFF2), CSS optimisé, Vite build
4. ✅ **Cohérence** : Type scale harmonieux (ratio 1.333), BEM strict
5. ✅ **Accessibilité** : ARIA, focus visible, keyboard navigation

---

## 🏗️ Architecture

### Stack technique

```
SwaveConnexion
├── Frontend Framework : Nuxt 4.2.1 (Vue 3.5.25)
├── Styling         : Tailwind CSS 4.1.17 + CSS natif
├── Language        : TypeScript 5.x
├── State           : Pinia 3.0.4
├── Build Tool      : Vite
├── Linting         : ESLint 8.57.1
├── Formatting      : Prettier 3.7.3
└── Composables     : @vueuse/core (à installer)
```

### Principes d'architecture

1. **Séparation des responsabilités**
   - `app/components/ui/` : Composants atomiques (CSS natif scopé)
   - `app/components/layout/` : Structure de page (Tailwind uniquement)
   - `app/components/sections/` : Sections complètes (Tailwind + slots)

2. **CSS natif avec variables globales**
   ```css
   /* Définies dans app/assets/css/_variables.css */
   --primary: #2563eb;
   --space-md: 1.5rem;
   --text-base: 1rem;
   ```

3. **Nommage BEM strict**
   ```css
   .block {}               /* Composant principal */
   .block__element {}      /* Élément enfant */
   .block--modifier {}     /* Variante du composant */
   ```

4. **Type scale harmonieux**
   - Ratio : Perfect Fourth (1.333x)
   - Base : 16px (1rem)
   - Calculé via [typescale.com](https://typescale.com)

---

## 🚀 Installation

### Prérequis

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **Git** >= 2.0.0

### Cloner le dépôt

```bash
git clone https://github.com/annubis-knight/SwaveConnexion.git
cd SwaveConnexion
```

### Installer les dépendances

```bash
npm install
```

### Lancer le serveur de développement

```bash
npm run dev
```

Le projet sera accessible sur `http://localhost:3000`

### Build de production

```bash
npm run build
npm run preview  # Prévisualisation du build
```

---

## 📁 Structure du projet

```
SwaveConnexion/
├── .claude/                          # Configuration Claude Code
│   └── settings.local.json
├── app/
│   ├── assets/
│   │   ├── css/
│   │   │   ├── _variables.css        # Variables couleurs, espacements, bordures
│   │   │   ├── _typography.css       # @font-face + Type scale + styles HTML
│   │   │   ├── _reset.css            # Reset CSS dédié
│   │   │   └── main.css              # Point d'entrée (importe tout)
│   │   └── fonts/                    # Polices custom WOFF2 (à télécharger)
│   │       ├── space-grotesk/
│   │       ├── clash-display/
│   │       └── jetbrains-mono/
│   ├── components/
│   │   ├── ui/                       # Composants atomiques (CSS natif + BEM)
│   │   │   ├── CLAUDE.md             # Doc pour l'IA
│   │   │   ├── README.txt            # Doc pour développeurs
│   │   │   ├── Button.vue
│   │   │   ├── Card.vue
│   │   │   ├── Input.vue
│   │   │   ├── Badge.vue
│   │   │   ├── Modal.vue
│   │   │   └── Dropdown.vue
│   │   ├── layout/                   # Structure (Tailwind utilities)
│   │   │   ├── CLAUDE.md
│   │   │   ├── README.txt
│   │   │   ├── Header.vue
│   │   │   ├── Footer.vue
│   │   │   └── Sidebar.vue
│   │   └── sections/                 # Sections complètes
│   │       ├── CLAUDE.md
│   │       ├── README.txt
│   │       └── Hero.vue
│   ├── layouts/
│   │   ├── CLAUDE.md
│   │   ├── default.vue               # Layout standard (Header + Footer)
│   │   └── blank.vue                 # Layout vide
│   ├── pages/
│   │   └── index.vue                 # Page de test du design system
│   └── app.vue                       # Point d'entrée Nuxt
├── public/
│   ├── favicon.ico
│   └── robots.txt
├── CLAUDE.md                         # Documentation complète pour l'IA
├── PDM_DesignSystem.md               # Plan détaillé avec suivi d'avancement
├── README.md                         # Ce fichier
├── .eslintrc.cjs                     # Configuration ESLint
├── .prettierrc                       # Configuration Prettier
├── .gitignore
├── nuxt.config.ts                    # Configuration Nuxt
├── tailwind.config.js                # Configuration Tailwind (minimale)
├── tsconfig.json                     # Configuration TypeScript
├── package.json
└── package-lock.json
```

---

## 🎨 Philosophie du design system

### 1. CSS natif avec variables (Composants UI)

**Pourquoi ?**
- Indépendance totale de Tailwind
- Variables réutilisables globalement
- Maintenance centralisée dans `_variables.css`
- Nommage BEM pour clarté et prévisibilité

**Exemple :**
```vue
<template>
  <button :class="btnClass">
    <slot />
  </button>
</template>

<script setup lang="ts">
const btnClass = computed(() => [
  'btn',                      // Block
  `btn--${props.variant}`,    // Modifier (variant)
  `btn--${props.size}`,       // Modifier (size)
].join(' '));
</script>

<style scoped>
.btn {
  padding: var(--space-sm) var(--space-md);
  background-color: var(--primary);
  border-radius: var(--radius-md);
}

.btn--primary {
  background-color: var(--primary);
}

.btn--sm {
  font-size: var(--text-sm);
}
</style>
```

### 2. Tailwind utilities (Layouts uniquement)

**Pourquoi ?**
- Rapidité de développement pour structures de page
- Responsive natif avec breakpoints (sm:, md:, lg:)
- Pas besoin de CSS custom pour flex/grid
- Tree-shaking automatique (performance)

**Exemple :**
```vue
<template>
  <header class="bg-white border-b sticky top-0 z-50">
    <div class="container mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <!-- Navigation ici -->
      </div>
    </div>
  </header>
</template>
```

### 3. Type scale harmonieux (Ratio 1.333)

**Échelle typographique complète :**

| Niveau | Variable | Taille | Usage |
|--------|----------|--------|-------|
| XS | `--text-xs` | 12px (0.75rem) | Small text, labels |
| SM | `--text-sm` | 14px (0.875rem) | Secondary text |
| Base | `--text-base` | 16px (1rem) | **Corps de texte** |
| LG | `--text-lg` | 18px (1.125rem) | Large body |
| XL | `--text-xl` | 20.25px (1.266rem) | h6 |
| 2XL | `--text-2xl` | 27px (1.688rem) | h5 |
| 3XL | `--text-3xl` | 36px (2.25rem) | h4 |
| 4XL | `--text-4xl` | 48px (3rem) | h3 |
| 5XL | `--text-5xl` | 64px (4rem) | h2 |
| 6XL | `--text-6xl` | 85px (5.333rem) | h1 |

### 4. Polices personnalisées (forte personnalité)

| Usage | Police | Caractéristiques | Poids disponibles |
|-------|--------|------------------|-------------------|
| **Corps** | **Space Grotesk** | Géométrique, moderne, excellent en UI | 400, 500, 600, 700 |
| **Titres** | **Clash Display** | Bold, impactant, formes géométriques | 400, 500, 600, 700 |
| **Code** | **JetBrains Mono** | Ligatures code, hauteur optimale | 400, 500, 700 |

**Téléchargement :**
- Space Grotesk : [Google Fonts](https://fonts.google.com/specimen/Space+Grotesk)
- Clash Display : [Fontshare](https://www.fontshare.com/fonts/clash-display)
- JetBrains Mono : [JetBrains](https://www.jetbrains.com/lp/mono/)

**Format :** WOFF2 uniquement (performance optimale)

---

## 🧩 Composants disponibles

### Composants UI (CSS natif + BEM)

| Composant | Description | Props principales | Status |
|-----------|-------------|-------------------|--------|
| **Button** | Bouton avec variantes | `variant`, `size`, `disabled` | 🔴 À créer |
| **Card** | Carte avec header/body/footer | `variant` | 🔴 À créer |
| **Input** | Champ de formulaire | `label`, `type`, `error`, `modelValue` | 🔴 À créer |
| **Badge** | Badge/tag coloré | `variant`, `size` | 🔴 À créer |
| **Modal** | Modale accessible | `isOpen`, `title` | 🔴 À créer |
| **Dropdown** | Menu déroulant | `items`, `placeholder` | 🔴 À créer |

**Documentation détaillée :** Voir `app/components/ui/CLAUDE.md` (après création)

### Composants Layout (Tailwind utilities)

| Composant | Description | Status |
|-----------|-------------|--------|
| **Header** | En-tête sticky avec navigation responsive | 🔴 À créer |
| **Footer** | Pied de page avec grid 3 colonnes | 🔴 À créer |
| **Sidebar** | Barre latérale collapsible | 🔴 À créer |

**Documentation détaillée :** Voir `app/components/layout/CLAUDE.md` (après création)

### Sections (Tailwind + slots)

| Composant | Description | Props | Status |
|-----------|-------------|-------|--------|
| **Hero** | Section d'en-tête avec fond configurable | `variant`, `centered` | 🔴 À créer |

**Documentation détaillée :** Voir `app/components/sections/CLAUDE.md` (après création)

---

## 🎨 Variables CSS

### Couleurs

```css
/* Principales */
--primary: #2563eb;             /* Bleu principal */
--primary-light: #60a5fa;       /* Bleu clair */
--primary-dark: #1e40af;        /* Bleu foncé */

--secondary: #525252;           /* Gris principal */
--secondary-light: #a3a3a3;     /* Gris clair */
--secondary-dark: #262626;      /* Gris foncé */

--accent: #f59e0b;              /* Orange/Jaune principal */
--accent-light: #fbbf24;        /* Orange clair */
--accent-dark: #d97706;         /* Orange foncé */

/* Neutres */
--neutral-white: #ffffff;
--neutral-light: #f5f5f5;       /* Backgrounds clairs */
--neutral-medium: #d4d4d4;      /* Borders */
--neutral-dark: #404040;        /* Textes secondaires */
--neutral-black: #171717;       /* Textes principaux */

/* Sémantiques */
--success: #10b981;             /* Vert succès */
--warning: #f59e0b;             /* Orange warning */
--error: #ef4444;               /* Rouge erreur */
--info: #3b82f6;                /* Bleu info */
```

### Espacements (échelle 8px base)

```css
--space-xs: 0.5rem;    /* 8px */
--space-sm: 1rem;      /* 16px */
--space-md: 1.5rem;    /* 24px */
--space-lg: 2rem;      /* 32px */
--space-xl: 3rem;      /* 48px */
--space-2xl: 4rem;     /* 64px */
```

### Bordures

```css
--radius-sm: 0.25rem;  /* 4px */
--radius-md: 0.5rem;   /* 8px */
--radius-lg: 0.75rem;  /* 12px */
--radius-xl: 1rem;     /* 16px */
--radius-full: 9999px; /* Cercle parfait */

--border-width: 1px;
--border-width-thick: 2px;
```

### Ombres

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
```

---

## 🛠️ Guide de développement

### Scripts npm disponibles

```bash
# Développement
npm run dev          # Serveur de développement (hot reload)

# Build
npm run build        # Build de production
npm run generate     # Génération statique
npm run preview      # Prévisualisation du build

# Qualité de code
npm run lint         # Linter ESLint
npm run lint:fix     # Fix automatique ESLint
```

### Créer un nouveau composant UI

1. **Créer le fichier Vue** dans `app/components/ui/`
   ```bash
   touch app/components/ui/NouveauComposant.vue
   ```

2. **Structure du composant** :
   ```vue
   <template>
     <!--
       Composant NouveauComposant - Description

       Input (Props) :
         - prop1 : Type - Description

       Output (Events) :
         - event1 : Description

       Slots :
         - default : Description
     -->
     <div :class="componentClass">
       <slot />
     </div>
   </template>

   <script setup lang="ts">
   /**
    * NOUVEAU COMPOSANT
    *
    * @dev Description technique
    * @dev BEM : .nouveau-composant, .nouveau-composant--modifier
    */

   // Props
   interface Props {
     prop1?: string;
   }

   const props = withDefaults(defineProps<Props>(), {
     prop1: 'default',
   });

   // Computed class BEM
   const componentClass = computed(() => {
     return ['nouveau-composant', `nouveau-composant--${props.prop1}`].join(' ');
   });
   </script>

   <style scoped>
   /**
    * STYLES BEM
    */

   /* Block */
   .nouveau-composant {
     padding: var(--space-md);
     background-color: var(--neutral-light);
   }

   /* Modifier */
   .nouveau-composant--modifier {
     background-color: var(--primary);
   }
   </style>
   ```

3. **Auto-import Nuxt** : Le composant est automatiquement disponible dans toute l'app via `<NouveauComposant />`

### Créer un nouveau composant Layout

1. **Créer le fichier Vue** dans `app/components/layout/`

2. **Utiliser uniquement Tailwind** :
   ```vue
   <template>
     <header class="bg-white border-b sticky top-0 z-50">
       <div class="container mx-auto px-6 py-4">
         <div class="flex items-center justify-between">
           <!-- Structure ici -->
         </div>
       </div>
     </header>
   </template>

   <script setup lang="ts">
   /**
    * LAYOUT COMPONENT
    *
    * @dev Tailwind utilities uniquement
    */
   </script>
   ```

### Utiliser les variables CSS

```vue
<style scoped>
.mon-element {
  /* Couleurs */
  color: var(--primary);
  background-color: var(--neutral-light);

  /* Espacements */
  padding: var(--space-md);
  margin-bottom: var(--space-lg);

  /* Typographie */
  font-size: var(--text-lg);
  font-family: var(--font-sans);

  /* Bordures */
  border-radius: var(--radius-md);
  border: var(--border-width) solid var(--neutral-medium);

  /* Ombres */
  box-shadow: var(--shadow-md);
}
</style>
```

---

## 📝 Conventions de code

### CSS

- **Variables CSS** : `--nom-de-variable` (kebab-case)
- **Classes BEM** : `.block__element--modifier`
- **Ordre des propriétés** :
  1. Layout (display, position, float)
  2. Box Model (width, height, margin, padding)
  3. Visual (background, border, box-shadow)
  4. Typography (font, text, line-height)

### Vue/TypeScript

- **Composants** : PascalCase (`Button.vue`, `Header.vue`)
- **Props** : camelCase avec types TypeScript
- **Events** : kebab-case (`@update:model-value`)
- **Computed** : camelCase avec préfixe descriptif (`computedClass`, `isActive`)
- **Functions** : camelCase (`handleClick`, `formatDate`)

### Commits (Conventional Commits)

**Format :** `type(scope): description`

**Types disponibles :**
- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Documentation
- `style`: Formatage, CSS (pas de changement de code)
- `refactor`: Refactoring (ni feat ni fix)
- `test`: Ajout/modification de tests
- `chore`: Maintenance, config

**Exemples :**
```bash
feat(ui): add Button component with BEM naming
fix(typography): correct font-face paths for WOFF2 files
docs(readme): add installation instructions
style(card): adjust padding and border-radius
refactor(header): simplify navigation logic
test(button): add unit tests for variants
chore(deps): update Nuxt to 4.2.1
```

---

## 🔀 Workflow Git

### Branches

- `master` : Production (code stable uniquement)
- `develop` : Intégration (à créer si nécessaire)
- `feature/nom-feature` : Nouvelles fonctionnalités
- `fix/nom-bug` : Corrections de bugs

### Workflow recommandé

1. **Créer une branche de feature**
   ```bash
   git checkout -b feature/button-component
   ```

2. **Développer et commit**
   ```bash
   git add .
   git commit -m "feat(ui): add Button component with variants"
   ```

3. **Push vers GitHub**
   ```bash
   git push origin feature/button-component
   ```

4. **Créer une Pull Request** sur GitHub

5. **Merge après review** (si travail en équipe)

### Commandes Git utiles

```bash
# Vérifier le statut
git status

# Voir l'historique
git log --oneline --graph

# Créer un tag de version
git tag v1.0.0
git push origin v1.0.0

# Annuler le dernier commit (conserver les changements)
git reset --soft HEAD~1

# Mettre à jour depuis master
git checkout feature/ma-branche
git merge master
```

---

## 🤖 Documentation pour l'IA

### Fichiers clés pour l'IA

| Fichier | Usage | Priorité |
|---------|-------|----------|
| **CLAUDE.md** | Documentation complète du projet | ⭐⭐⭐ |
| **PDM_DesignSystem.md** | Plan détaillé avec suivi d'avancement | ⭐⭐⭐ |
| **README.md** | Vue d'ensemble + guide développeurs | ⭐⭐ |
| **app/components/ui/CLAUDE.md** | Règles pour composants UI | ⭐⭐ |
| **app/components/layout/CLAUDE.md** | Règles pour layouts | ⭐⭐ |

### Contexte pour l'IA

#### Règles strictes à respecter

1. **CSS natif pour composants UI** : JAMAIS de Tailwind dans les composants atomiques
2. **BEM strict** : Toujours suivre `.block__element--modifier`
3. **Variables CSS** : Utiliser `var(--*)` pour couleurs, espacements, typo
4. **Tailwind pour layouts** : UNIQUEMENT pour flex, grid, spacing, responsive
5. **Documentation** : Toujours commenter (en-tête de fichier + commentaires inline)
6. **TypeScript** : Props typées, interfaces explicites
7. **Pas de Heading.vue** : Utiliser directement `<h1>`, `<h2>`, etc.

#### Fichiers de référence (code complet)

Tout le code des composants est disponible dans **PDM_DesignSystem.md** :
- Variables CSS (_variables.css)
- Typography (_typography.css)
- Reset CSS (_reset.css)
- Composants UI (Button, Card, Input, Badge, Modal, Dropdown)
- Composants Layout (Header, Footer, Sidebar)
- Sections (Hero)
- Layouts Nuxt (default, blank)
- Page de test (index.vue)

#### État d'avancement

Consultez le tableau de suivi dans **PDM_DesignSystem.md** :
- 🟢 Complétée : Phase 0 (Git + CLAUDE.md)
- 🔴 Non démarrée : Phases 1-7

#### Commandes IA utiles

```bash
# Télécharger les polices (Phase 1.1)
# Space Grotesk : https://fonts.google.com/specimen/Space+Grotesk
# Clash Display : https://www.fontshare.com/fonts/clash-display
# JetBrains Mono : https://www.jetbrains.com/lp/mono/

# Installer les dépendances manquantes (Phase 3)
npm install @vueuse/core

# Tester le dev server
npm run dev

# Vérifier le build
npm run build
```

---

## 🗺️ Roadmap

### Phase 0 : Initialisation ✅
- [x] Git + Remote GitHub
- [x] CLAUDE.md
- [x] README.md
- [x] Système de suivi d'avancement

### Phase 1 : Configuration CSS + Polices 🔴
- [ ] Télécharger polices (Space Grotesk, Clash Display, JetBrains Mono)
- [ ] Créer _variables.css
- [ ] Créer _typography.css (avec @font-face)
- [ ] Créer _reset.css
- [ ] Mettre à jour main.css

### Phase 2 : Configuration Tailwind 🔴
- [ ] Configurer tailwind.config.js (content paths)

### Phase 3 : Dépendances 🔴
- [ ] Installer @vueuse/core

### Phase 4 : Composants UI 🔴
- [ ] Button.vue
- [ ] Card.vue
- [ ] Input.vue
- [ ] Badge.vue
- [ ] Modal.vue
- [ ] Dropdown.vue

### Phase 5 : Layout + Sections 🔴
- [ ] Header.vue
- [ ] Footer.vue
- [ ] Sidebar.vue
- [ ] Hero.vue

### Phase 6 : Layouts Nuxt 🔴
- [ ] default.vue
- [ ] blank.vue

### Phase 7 : Page de test 🔴
- [ ] index.vue (démonstration complète)

---

## 👥 Contributeurs

### Auteur principal

**Arnaud Gutierrez**
- Email : arnaud.g.motiv@gmail.com
- GitHub : [@annubis-knight](https://github.com/annubis-knight)

### Contribution

Si vous souhaitez contribuer :

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'feat: add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

**Conventions à respecter :**
- Lire attentivement [CLAUDE.md](./CLAUDE.md) et [PDM_DesignSystem.md](./PDM_DesignSystem.md)
- Suivre les conventions de code (BEM, TypeScript, Conventional Commits)
- Documenter tout nouveau composant

---

## 📄 Licence

Ce projet est privé et à usage personnel.

---

## 🔗 Liens utiles

### Documentation officielle

- [Nuxt 4 Documentation](https://nuxt.com/docs)
- [Vue 3 Documentation](https://vuejs.org/)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [VueUse Documentation](https://vueuse.org/)

### Outils design

- [Type Scale Calculator](https://typescale.com/) - Calculer les échelles typographiques
- [Coolors](https://coolors.co/) - Générateur de palettes de couleurs
- [Can I Use](https://caniuse.com/) - Compatibilité navigateurs

### Méthodologies

- [BEM Methodology](http://getbem.com/) - Block Element Modifier
- [Conventional Commits](https://www.conventionalcommits.org/) - Spec de commits
- [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) - Architecture composants

---

## 📞 Support

Pour toute question ou problème :

1. **Consulter la documentation** : [CLAUDE.md](./CLAUDE.md) et [PDM_DesignSystem.md](./PDM_DesignSystem.md)
2. **Ouvrir une issue** sur GitHub
3. **Contacter** : arnaud.g.motiv@gmail.com

---

<div align="center">

**Fait avec ❤️ par Arnaud Gutierrez**

🤖 *Projet développé avec l'assistance de Claude Code*

[⬆ Retour en haut](#-swaveconnexion-design-system)

</div>
