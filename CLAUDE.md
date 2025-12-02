# 🤖 CLAUDE.md - SwaveConnexion Design System

## 📋 Aperçu du projet

**SwaveConnexion** est un design system minimaliste et moderne construit avec Nuxt 4, Vue 3, TypeScript et Tailwind CSS v4. Ce projet combine l'efficacité de CSS natif avec variables pour les composants UI et les utilities Tailwind pour les layouts, créant ainsi une architecture hybride performante et maintenable.

### Technologies principales

- **Framework:** Nuxt 4.2.1
- **UI Library:** Vue 3.5.25
- **Styling:** Tailwind CSS 4.1.17 + CSS natif avec variables
- **Language:** TypeScript
- **State Management:** Pinia 3.0.4
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

## 📁 Structure du projet

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
│   │   │   ├── CLAUDE.md
│   │   │   ├── Button.vue
│   │   │   ├── Card.vue
│   │   │   ├── Input.vue
│   │   │   ├── Badge.vue
│   │   │   ├── Modal.vue
│   │   │   └── Dropdown.vue
│   │   ├── layout/                 # Structure (Tailwind utilities)
│   │   │   ├── CLAUDE.md
│   │   │   ├── Header.vue
│   │   │   ├── Footer.vue
│   │   │   └── Sidebar.vue
│   │   └── sections/               # Sections complètes
│   │       ├── CLAUDE.md
│   │       └── Hero.vue
│   ├── layouts/
│   │   ├── default.vue             # Layout standard (Header + Footer)
│   │   └── blank.vue               # Layout vide
│   ├── pages/
│   │   └── index.vue               # Page de test du design system
│   └── app.vue                     # Point d'entrée Nuxt
├── public/
├── CLAUDE.md                       # Ce fichier
├── PDM_DesignSystem.md             # Plan détaillé avec suivi d'avancement
├── nuxt.config.ts
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

## 📦 Composants UI disponibles

### Composants atomiques (CSS natif + BEM)

Tous les composants UI utilisent CSS natif scoped avec variables et nommage BEM strict :

| Composant | Description | Props principales |
|-----------|-------------|-------------------|
| **Button** | Bouton avec variantes | `variant`, `size`, `disabled` |
| **Card** | Carte avec header/body/footer | `variant` |
| **Input** | Champ de formulaire | `label`, `type`, `error`, `modelValue` |
| **Badge** | Badge/tag coloré | `variant`, `size` |
| **Modal** | Modale accessible | `isOpen`, `title` |
| **Dropdown** | Menu déroulant | `items`, `placeholder` |

**Documentation détaillée:** Voir `app/components/ui/CLAUDE.md`

### Composants de layout (Tailwind utilities)

| Composant | Description |
|-----------|-------------|
| **Header** | En-tête sticky avec navigation responsive |
| **Footer** | Pied de page avec grid 3 colonnes |
| **Sidebar** | Barre latérale collapsible |

**Documentation détaillée:** Voir `app/components/layout/CLAUDE.md`

### Sections (Tailwind + slots)

| Composant | Description | Props |
|-----------|-------------|-------|
| **Hero** | Section d'en-tête avec fond configurable | `variant`, `centered` |

**Documentation détaillée:** Voir `app/components/sections/CLAUDE.md`

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
--text-xl: 1.266rem;   /* 20.25px */
--text-2xl: 1.688rem;  /* 27px */
--text-3xl: 2.25rem;   /* 36px */
--text-4xl: 3rem;      /* 48px */
--text-5xl: 4rem;      /* 64px */
--text-6xl: 5.333rem;  /* 85px */
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

**💡 Note pour Claude :** Ce fichier fournit un aperçu complet du projet. Pour les détails d'implémentation spécifiques, consultez toujours les fichiers `CLAUDE.md` dans chaque dossier de composants et le `PDM_DesignSystem.md` pour le plan détaillé.
