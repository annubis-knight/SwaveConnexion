
# 📋 PDM - Design System Minimaliste (Nuxt 4 + Tailwind 4) - V2

## 📊 Suivi d'avancement global

**État actuel:** 🟡 En cours d'implémentation
**Dernière mise à jour:** 2025-12-02
**Responsable:** Arnaud Gutierrez

### Progression par phase

| Phase | Statut | Progression | Description |
|-------|--------|-------------|-------------|
| **Phase 0** | 🟢 Complétée | 100% | Initialisation Git + CLAUDE.md |
| **Phase 1** | 🔴 Non démarrée | 0% | Configuration CSS + Polices |
| **Phase 2** | 🔴 Non démarrée | 0% | Configuration Tailwind |
| **Phase 3** | 🔴 Non démarrée | 0% | Installation @vueuse/core |
| **Phase 4** | 🔴 Non démarrée | 0% | Composants UI (6 composants) |
| **Phase 5** | 🔴 Non démarrée | 0% | Layout + Sections |
| **Phase 6** | 🔴 Non démarrée | 0% | Layouts Nuxt |
| **Phase 7** | 🔴 Non démarrée | 0% | Page de test |

**Légende:** 🔴 Non démarrée | 🟡 En cours | 🟢 Complétée

---

## 🎯 Objectif Global

Créer un design system minimaliste, maintenable et cohérent qui respecte tes principes :
- **CSS natif avec variables** pour les composants UI
- **Tailwind utilities** pour les layouts
- **BEM strict** pour le nommage des classes
- **Type scale avec ratio constant** (Perfect Fourth 1.333)
- **Documentation CLAUDE.md** par dossier
- **Commentaires explicites** dans chaque fichier

***

## 📐 Architecture du Projet

```
SwaveConnexion/
├── app/
│   ├── assets/
│   │   └── css/
│   │       ├── _variables.css      # Variables couleurs, espacements, bordures, ombres
│   │       ├── _typography.css     # Type scale + sélecteurs HTML
│   │       ├── _reset.css          # Reset CSS dédié
│   │       └── main.css            # Import global
│   ├── components/
│   │   ├── ui/                     # Composants atomiques (CSS natif)
│   │   │   ├── CLAUDE.md
│   │   │   ├── README.txt
│   │   │   ├── Button.vue
│   │   │   ├── Card.vue
│   │   │   ├── Input.vue
│   │   │   ├── Modal.vue
│   │   │   ├── Badge.vue
│   │   │   └── Dropdown.vue
│   │   ├── layout/                 # Structure (Tailwind utilities)
│   │   │   ├── CLAUDE.md
│   │   │   ├── README.txt
│   │   │   ├── Header.vue
│   │   │   ├── Footer.vue
│   │   │   └── Sidebar.vue
│   │   └── sections/               # Sections complètes
│   │       ├── CLAUDE.md
│   │       ├── README.txt
│   │       └── Hero.vue
│   ├── layouts/
│   │   ├── CLAUDE.md
│   │   ├── default.vue
│   │   └── blank.vue
│   ├── pages/
│   │   └── index.vue
│   └── app.vue
├── public/
├── tailwind.config.js              # Config MINIMALE
├── nuxt.config.ts
└── package.json
```

***

## 🚀 Phase 0 : Initialisation Git et Documentation

**Statut:** 🟢 Complétée | **Date:** 2025-12-02

### Checklist

- [x] Initialiser le dépôt Git local
- [x] Lier le remote GitHub (https://github.com/annubis-knight/SwaveConnexion)
- [x] Configurer l'identité Git (Arnaud Gutierrez)
- [x] Créer le fichier CLAUDE.md à la racine
- [x] Ajouter le système de suivi d'avancement au PDM
- [ ] Premier commit et push vers GitHub (en cours)

---

## 🚀 Phase 1 : Configuration des Variables CSS Natives + Polices

**Statut:** 🔴 Non démarrée | **Durée estimée:** 45 minutes

**But** : Créer les fichiers de variables CSS, typographie avec polices custom et reset

### Checklist Phase 1

#### 1.1 - Téléchargement des polices custom

- [ ] Télécharger **Space Grotesk** (WOFF2) depuis Google Fonts
- [ ] Télécharger **Clash Display** (WOFF2) depuis Fontshare
- [ ] Télécharger **JetBrains Mono** (WOFF2) depuis JetBrains
- [ ] Créer la structure `app/assets/fonts/`
- [ ] Organiser les fichiers WOFF2 par police (space-grotesk/, clash-display/, jetbrains-mono/)

#### 1.2 - Créer la structure CSS

- [ ] Créer le dossier `app/assets/css/`
- [ ] Créer le fichier `_variables.css`
- [ ] Créer le fichier `_typography.css` (avec déclarations @font-face)
- [ ] Créer le fichier `_reset.css`
- [ ] Créer le fichier `main.css`

#### 1.3 - Intégration

- [ ] Mettre à jour `main.css` pour importer tous les fichiers CSS
- [ ] Vérifier `nuxt.config.ts` (import de `main.css`)
- [ ] Tester le chargement des polices avec `npm run dev`

**Résultat attendu:**
- ✅ Polices custom chargées localement
- ✅ Variables CSS disponibles via `var(--primary)`, `var(--space-md)`, etc.
- ✅ Type scale appliqué aux éléments HTML (h1-h6, p, ul, etc.)
- ✅ Reset CSS uniforme

---

### Détail - Créer la structure CSS

```powershell
# Créer le dossier CSS
New-Item -Path "app/assets/css" -ItemType Directory -Force

# Créer les fichiers de variables
New-Item -Path "app/assets/css/_variables.css" -ItemType File
New-Item -Path "app/assets/css/_typography.css" -ItemType File
New-Item -Path "app/assets/css/_reset.css" -ItemType File
New-Item -Path "app/assets/css/main.css" -ItemType File
```

### 1.2 - Fichier `_variables.css` (Simplifié)

Ouvre `app/assets/css/_variables.css` :

```css
/**
 * VARIABLES CSS - Design System
 * 
 * Description : Variables globales pour couleurs, espacements, bordures, ombres.
 * Usage : Utilisées dans les composants UI avec var(--nom-variable)
 * 
 * @dev Modifier ces valeurs impacte tout le design system
 * @dev Ne PAS dupliquer dans tailwind.config.js
 * @dev Couleurs simplifiées : Primary, Secondary, Accent (light/dark)
 */

:root {
  /* ============================================
     COULEUR PRINCIPALE (Primary)
     ============================================ */
  --primary-light: #60a5fa;    /* Bleu clair */
  --primary: #2563eb;          /* Bleu standard */
  --primary-dark: #1e40af;     /* Bleu foncé */

  /* ============================================
     COULEUR SECONDAIRE (Secondary)
     ============================================ */
  --secondary-light: #a3a3a3;  /* Gris clair */
  --secondary: #525252;        /* Gris standard */
  --secondary-dark: #262626;   /* Gris foncé */

  /* ============================================
     COULEUR D'ACCENT (Accent)
     ============================================ */
  --accent-light: #fbbf24;     /* Orange/Jaune clair */
  --accent: #f59e0b;           /* Orange/Jaune standard */
  --accent-dark: #d97706;      /* Orange/Jaune foncé */

  /* ============================================
     COULEURS NEUTRES (Background, Text, Borders)
     ============================================ */
  --neutral-white: #ffffff;
  --neutral-light: #f5f5f5;    /* Backgrounds clairs */
  --neutral-medium: #d4d4d4;   /* Borders */
  --neutral-dark: #404040;     /* Textes secondaires */
  --neutral-black: #171717;    /* Textes principaux */

  /* ============================================
     COULEURS SÉMANTIQUES
     ============================================ */
  --success: #10b981;          /* Vert succès */
  --warning: #f59e0b;          /* Orange warning */
  --error: #ef4444;            /* Rouge erreur */
  --info: #3b82f6;             /* Bleu info */

  /* ============================================
     ESPACEMENTS (échelle 8px base)
     ============================================ */
  --space-xs: 0.5rem;          /* 8px */
  --space-sm: 1rem;            /* 16px */
  --space-md: 1.5rem;          /* 24px */
  --space-lg: 2rem;            /* 32px */
  --space-xl: 3rem;            /* 48px */
  --space-2xl: 4rem;           /* 64px */

  /* ============================================
     BORDURES
     ============================================ */
  --radius-sm: 0.25rem;        /* 4px */
  --radius-md: 0.5rem;         /* 8px */
  --radius-lg: 0.75rem;        /* 12px */
  --radius-xl: 1rem;           /* 16px */
  --radius-full: 9999px;       /* Cercle parfait */

  --border-width: 1px;
  --border-width-thick: 2px;

  /* ============================================
     OMBRES
     ============================================ */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

### 1.3 - Fichier `_typography.css` (Type Scale avec ratio)

Ouvre `app/assets/css/_typography.css` :

```css
/**
 * TYPOGRAPHIE - Type Scale avec ratio constant
 *
 * Description : Échelle typographique harmonieuse basée sur un ratio de 1.333 (Perfect Fourth)
 * Usage : Styles appliqués directement aux éléments HTML (h1-h6, p, ul, li, etc.)
 *
 * @dev Ratio : 1.333 (Perfect Fourth) - chaque niveau est 1.333× plus grand
 * @dev Base : 16px (1rem) pour le corps de texte (p, li, etc.)
 * @dev Calculateur : https://typescale.com
 * @dev Polices personnalisées : Space Grotesk (corps), Clash Display (titres), JetBrains Mono (code)
 *
 * Input : Aucun (styles globaux)
 * Output : Tous les éléments textuels HTML stylés automatiquement
 */

/* ============================================
   DÉCLARATIONS @font-face
   ============================================ */

/* Space Grotesk - Corps de texte */
@font-face {
  font-family: 'Space Grotesk';
  src: url('../fonts/space-grotesk/SpaceGrotesk-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Space Grotesk';
  src: url('../fonts/space-grotesk/SpaceGrotesk-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Space Grotesk';
  src: url('../fonts/space-grotesk/SpaceGrotesk-SemiBold.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Space Grotesk';
  src: url('../fonts/space-grotesk/SpaceGrotesk-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

/* Clash Display - Titres */
@font-face {
  font-family: 'Clash Display';
  src: url('../fonts/clash-display/ClashDisplay-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Clash Display';
  src: url('../fonts/clash-display/ClashDisplay-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Clash Display';
  src: url('../fonts/clash-display/ClashDisplay-SemiBold.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Clash Display';
  src: url('../fonts/clash-display/ClashDisplay-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

/* JetBrains Mono - Code */
@font-face {
  font-family: 'JetBrains Mono';
  src: url('../fonts/jetbrains-mono/JetBrainsMono-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'JetBrains Mono';
  src: url('../fonts/jetbrains-mono/JetBrainsMono-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'JetBrains Mono';
  src: url('../fonts/jetbrains-mono/JetBrainsMono-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

/* ============================================
   VARIABLES CSS TYPOGRAPHIQUES
   ============================================ */

:root {
  /* ============================================
     FAMILLES DE POLICES
     ============================================ */
  --font-sans: 'Space Grotesk', system-ui, -apple-system, sans-serif;
  --font-display: 'Clash Display', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Courier New', monospace;

  /* ============================================
     TYPE SCALE (Ratio 1.333 - Perfect Fourth)
     Base : 16px (1rem)
     ============================================ */
  --text-xs: 0.75rem;          /* 12px - Small text, labels */
  --text-sm: 0.875rem;         /* 14px - Secondary text */
  --text-base: 1rem;           /* 16px - Body text (BASE) */
  --text-lg: 1.125rem;         /* 18px - Large body */
  --text-xl: 1.266rem;         /* 20.25px - h6 */
  --text-2xl: 1.688rem;        /* 27px - h5 */
  --text-3xl: 2.25rem;         /* 36px - h4 */
  --text-4xl: 3rem;            /* 48px - h3 */
  --text-5xl: 4rem;            /* 64px - h2 */
  --text-6xl: 5.333rem;        /* 85px - h1 */

  /* ============================================
     HAUTEURS DE LIGNE (line-height)
     ============================================ */
  --leading-tight: 1.25;       /* Titres */
  --leading-normal: 1.5;       /* Corps de texte */
  --leading-relaxed: 1.75;     /* Textes larges */

  /* ============================================
     POIDS DE POLICE
     ============================================ */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
}

/* ============================================
   STYLES GLOBAUX - Sélecteurs HTML
   ============================================ */

/**
 * TITRES (h1 - h6)
 * @dev Échelle descendante basée sur le ratio 1.333
 * @dev Line-height serré pour meilleure lisibilité
 */

h1 {
  font-family: var(--font-display);
  font-size: var(--text-6xl);        /* 85px */
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  color: var(--neutral-black);
  margin-top: 0;
  margin-bottom: var(--space-lg);
}

h2 {
  font-family: var(--font-display);
  font-size: var(--text-5xl);        /* 64px */
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  color: var(--neutral-black);
  margin-top: var(--space-xl);
  margin-bottom: var(--space-md);
}

h3 {
  font-family: var(--font-display);
  font-size: var(--text-4xl);        /* 48px */
  font-weight: var(--font-semibold);
  line-height: var(--leading-tight);
  color: var(--neutral-black);
  margin-top: var(--space-lg);
  margin-bottom: var(--space-md);
}

h4 {
  font-family: var(--font-sans);
  font-size: var(--text-3xl);        /* 36px */
  font-weight: var(--font-semibold);
  line-height: var(--leading-tight);
  color: var(--neutral-black);
  margin-top: var(--space-lg);
  margin-bottom: var(--space-sm);
}

h5 {
  font-family: var(--font-sans);
  font-size: var(--text-2xl);        /* 27px */
  font-weight: var(--font-medium);
  line-height: var(--leading-tight);
  color: var(--neutral-dark);
  margin-top: var(--space-md);
  margin-bottom: var(--space-sm);
}

h6 {
  font-family: var(--font-sans);
  font-size: var(--text-xl);         /* 20.25px */
  font-weight: var(--font-medium);
  line-height: var(--leading-tight);
  color: var(--neutral-dark);
  margin-top: var(--space-md);
  margin-bottom: var(--space-xs);
}

/**
 * PARAGRAPHES
 * @dev Taille de base (16px) avec line-height confortable
 */

p {
  font-family: var(--font-sans);
  font-size: var(--text-base);       /* 16px */
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
  color: var(--neutral-dark);
  margin-top: 0;
  margin-bottom: var(--space-md);
}

/**
 * LISTES (ul, ol, li)
 * @dev Mêmes styles que les paragraphes pour cohérence
 */

ul,
ol {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
  color: var(--neutral-dark);
  margin-top: 0;
  margin-bottom: var(--space-md);
  padding-left: var(--space-lg);
}

li {
  margin-bottom: var(--space-xs);
}

/**
 * LABELS (formulaires)
 * @dev Légèrement plus petit et medium weight
 */

label {
  font-family: var(--font-sans);
  font-size: var(--text-sm);         /* 14px */
  font-weight: var(--font-medium);
  line-height: var(--leading-normal);
  color: var(--neutral-dark);
  display: block;
  margin-bottom: var(--space-xs);
}

/**
 * SMALL (texte secondaire)
 * @dev Pour notes, disclaimers, etc.
 */

small {
  font-family: var(--font-sans);
  font-size: var(--text-xs);         /* 12px */
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
  color: var(--neutral-dark);
}

/**
 * STRONG & B (texte en gras)
 */

strong,
b {
  font-weight: var(--font-bold);
}

/**
 * EM & I (texte italique)
 */

em,
i {
  font-style: italic;
}

/**
 * BLOCKQUOTE (citations)
 * @dev Légèrement plus grand avec style distinctif
 */

blockquote {
  font-family: var(--font-sans);
  font-size: var(--text-lg);         /* 18px */
  font-weight: var(--font-normal);
  font-style: italic;
  line-height: var(--leading-relaxed);
  color: var(--neutral-dark);
  border-left: 4px solid var(--primary);
  padding-left: var(--space-md);
  margin: var(--space-lg) 0;
}

/**
 * CODE & PRE (code)
 * @dev Police monospace
 */

code {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  background-color: var(--neutral-light);
  padding: 0.125rem 0.25rem;
  border-radius: var(--radius-sm);
}

pre {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  line-height: var(--leading-normal);
  background-color: var(--neutral-light);
  padding: var(--space-md);
  border-radius: var(--radius-md);
  overflow-x: auto;
  margin: var(--space-md) 0;
}

pre code {
  background-color: transparent;
  padding: 0;
}

/**
 * LINKS (a)
 * @dev Couleur primary avec underline au hover
 */

a {
  color: var(--primary);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

a:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}
```

### 1.4 - Fichier `_reset.css` (Reset CSS dédié)

Ouvre `app/assets/css/_reset.css` :

```css
/**
 * RESET CSS - Normalisation des styles navigateurs
 * 
 * Description : Reset minimal pour uniformiser les styles par défaut des navigateurs
 * Usage : Importé en premier dans main.css
 * 
 * @dev Basé sur un mix de normalize.css et reset moderne
 * @dev Approche "douce" : garde certains styles utiles (listes, titres)
 * 
 * Input : Aucun
 * Output : Styles de base cohérents sur tous les navigateurs
 */

/* ============================================
   BOX-SIZING UNIVERSEL
   ============================================ */

*,
*::before,
*::after {
  box-sizing: border-box;
}

/* ============================================
   RESET MARGES ET PADDINGS
   ============================================ */

* {
  margin: 0;
  padding: 0;
}

/* ============================================
   HTML & BODY
   ============================================ */

html {
  /* Taille de base : 16px */
  font-size: 100%;
  
  /* Scroll smooth */
  scroll-behavior: smooth;
  
  /* Améliore le rendu des polices */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

body {
  /* Minimum height pour footer sticky */
  min-height: 100vh;
  
  /* Line-height par défaut */
  line-height: 1.5;
  
  /* Prévient les débordements horizontaux */
  overflow-x: hidden;
}

/* ============================================
   IMAGES & MÉDIAS
   ============================================ */

img,
picture,
video,
canvas,
svg {
  /* Responsive par défaut */
  display: block;
  max-width: 100%;
  height: auto;
}

/* ============================================
   FORMULAIRES
   ============================================ */

input,
button,
textarea,
select {
  /* Hérite la police du parent */
  font: inherit;
  color: inherit;
}

button {
  /* Reset du style natif */
  background: none;
  border: none;
  cursor: pointer;
}

/* ============================================
   TABLEAUX
   ============================================ */

table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
}

/* ============================================
   LISTES
   ============================================ */

/* Note : on garde les puces/numéros par défaut */
/* Les composants peuvent les override si besoin */

ul,
ol {
  list-style-position: inside;
}

/* ============================================
   LIENS
   ============================================ */

a {
  /* Reset du style souligné */
  text-decoration: none;
  
  /* Améliore l'apparence du tap sur mobile */
  -webkit-tap-highlight-color: transparent;
}

/* ============================================
   FOCUS VISIBLE (Accessibilité)
   ============================================ */

:focus {
  outline: none;
}

:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

/* ============================================
   SÉLECTION DE TEXTE
   ============================================ */

::selection {
  background-color: var(--primary-light);
  color: var(--neutral-white);
}

::-moz-selection {
  background-color: var(--primary-light);
  color: var(--neutral-white);
}

/* ============================================
   SUPPRESSION DES ANIMATIONS POUR UTILISATEURS
   QUI PRÉFÈRENT RÉDUIRE LE MOUVEMENT
   ============================================ */

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### 1.5 - Fichier `main.css` (Point d'entrée)

Ouvre `app/assets/css/main.css` :

```css
/**
 * MAIN CSS - Point d'entrée global
 * 
 * Description : Importe tous les fichiers CSS du design system
 * Usage : Importé dans nuxt.config.ts
 * 
 * @dev Ordre d'import CRITIQUE :
 *      1. Reset (normalisation navigateurs)
 *      2. Variables (couleurs, espacements)
 *      3. Typography (type scale + sélecteurs HTML)
 *      4. Tailwind (utilities pour layouts)
 * 
 * Input : Aucun
 * Output : Design system complet chargé globalement
 */

/* ============================================
   1. RESET CSS (en premier)
   ============================================ */
@import './_reset.css';

/* ============================================
   2. VARIABLES DU DESIGN SYSTEM
   ============================================ */
@import './_variables.css';

/* ============================================
   3. TYPOGRAPHIE (Type Scale + Sélecteurs HTML)
   ============================================ */
@import './_typography.css';

/* ============================================
   4. TAILWIND CSS DIRECTIVES
   ============================================ */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ============================================
   CLASSES UTILITAIRES CUSTOM
   (Utilisées dans les layouts avec Tailwind)
   ============================================ */

/**
 * Container responsive centré
 * @dev Alternative au container Tailwind pour plus de contrôle
 */
.container {
  width: 100%;
  max-width: 1280px;
  margin-inline: auto;
  padding-inline: var(--space-md);
}

/* Variantes de container */
.container--narrow {
  max-width: 960px;
}

.container--wide {
  max-width: 1440px;
}

.container--full {
  max-width: 100%;
  padding-inline: 0;
}
```

### 1.6 - Configuration Nuxt

Ouvre `nuxt.config.ts` :

```typescript
/**
 * NUXT CONFIG - Configuration Nuxt 4
 * 
 * Description : Configuration principale du projet Nuxt
 * 
 * @dev Import du CSS global : main.css charge tout le design system
 * @dev PostCSS : Tailwind + Autoprefixer
 * 
 * Input : Configuration du projet
 * Output : Application Nuxt configurée
 */

export default defineNuxtConfig({
  /**
   * CSS global
   * @dev main.css importe : reset, variables, typography, Tailwind
   */
  css: ['~/assets/css/main.css'],
  
  /**
   * PostCSS plugins
   * @dev Tailwind pour les utilities, Autoprefixer pour compatibilité
   */
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  /**
   * DevTools
   * @dev Outils de développement Nuxt
   */
  devtools: { enabled: true },

  /**
   * Compatibility date
   * @dev Date de compatibilité pour Nuxt
   */
  compatibilityDate: '2025-12-02',
});
```

### 1.7 - Configuration Tailwind MINIMALE

Ouvre `tailwind.config.js` :

```javascript
/**
 * TAILWIND CONFIG - Configuration MINIMALE
 * 
 * Description : Config Tailwind réduite au strict minimum
 * Philosophie : Les variables sont dans _variables.css et _typography.css
 * 
 * @dev Ne définir ICI que ce qui est IMPOSSIBLE en CSS natif
 * @dev Tailwind sert uniquement pour les layouts (flex, grid, responsive)
 * @dev Les couleurs/typo sont dans les fichiers CSS natifs
 * 
 * Input : Chemins des fichiers à scanner
 * Output : Classes utilitaires Tailwind générées
 */

/** @type {import('tailwindcss').Config} */
export default {
  /**
   * Content paths
   * @dev Fichiers à scanner pour générer les classes Tailwind
   */
  content: [
    './app/components/**/*.{js,vue,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/app.vue',
  ],
  
  /**
   * Theme
   * @dev MINIMAL : on ne redéfinit PAS les couleurs/typo ici
   * @dev Elles sont dans _variables.css et _typography.css
   */
  theme: {
    extend: {
      // Vide volontairement - tout est dans les CSS natifs
    },
  },
  
  /**
   * Plugins
   * @dev Aucun plugin pour l'instant (minimalisme)
   */
  plugins: [],
};
```

***

## ✅ Checkpoint Phase 1

**Commandes PowerShell complètes** :

```powershell
# Créer la structure CSS
New-Item -Path "app/assets/css" -ItemType Directory -Force
New-Item -Path "app/assets/css/_variables.css" -ItemType File
New-Item -Path "app/assets/css/_typography.css" -ItemType File
New-Item -Path "app/assets/css/_reset.css" -ItemType File
New-Item -Path "app/assets/css/main.css" -ItemType File
```

**Vérification** :
```powershell
# Lancer le dev server
npm run dev
```

Tu devrais avoir :
- ✅ Reset CSS appliqué (pas de marges/paddings par défaut)
- ✅ Variables CSS chargées globalement
- ✅ Type scale appliqué aux éléments HTML (h1-h6, p, ul, li, etc.)
- ✅ Tailwind utilities disponibles pour les layouts
- ✅ Aucune erreur de compilation

**Test rapide** : Crée une page `app/pages/index.vue` temporaire :

```vue
<template>
  <div class="container">
    <h1>Titre H1 (85px)</h1>
    <h2>Titre H2 (64px)</h2>
    <h3>Titre H3 (48px)</h3>
    <p>Paragraphe de base (16px) avec line-height confortable.</p>
    <ul>
      <li>Item de liste 1</li>
      <li>Item de liste 2</li>
    </ul>
  </div>
</template>
```

***

## 🚀 Phase 2 : Création des Composants UI (CSS Natif + BEM)

**But** : Créer les composants atomiques avec CSS natif scoped et nommage BEM strict.

### 2.1 - Documentation du dossier `ui/`

```powershell
# Créer le dossier ui
New-Item -Path "app/components/ui" -ItemType Directory -Force

# Créer les fichiers de documentation
New-Item -Path "app/components/ui/CLAUDE.md" -ItemType File
New-Item -Path "app/components/ui/README.txt" -ItemType File
```

Ouvre `app/components/ui/CLAUDE.md` :

```markdown
# Composants UI - Documentation pour Claude

## Contexte
Ce dossier contient les **composants atomiques** du design system.

## Règles strictes
1. **CSS natif uniquement** dans `<style scoped>` avec variables `var(--*)`
2. **Nommage BEM strict** : `.block__element--modifier`
3. **Props typées** en TypeScript pour toutes les variantes
4. **Classes calculées** via `computed` properties
5. **Aucune classe Tailwind** directement dans le template
6. **Simple et minimal** : pas de sur-ingénierie

## Architecture d'un composant UI

```
<template>
  <!-- Classes BEM dynamiques via computed -->
</template>

<script setup lang="ts">
// Props typées
// Computed classes
// Emits (si événements)
</script>

<style scoped>
/* CSS natif avec variables */
/* Nommage BEM strict */
</style>
```

## Composants disponibles
- `Button.vue` : Boutons avec variantes
- `Card.vue` : Cartes avec slots
- `Input.vue` : Champs de formulaire
- `Modal.vue` : Modales accessibles
- `Badge.vue` : Badges/tags
- `Dropdown.vue` : Menus déroulants

**Note:** Le composant `Heading.vue` n'est pas nécessaire - utiliser directement les balises HTML (`<h1>`, `<h2>`, etc.) stylées via `_typography.css`

## Variables utilisées
Issues de `_variables.css` et `_typography.css` :
- Couleurs : `var(--primary)`, `var(--secondary)`, `var(--accent)`
- Espacements : `var(--space-sm)`, `var(--space-md)`
- Typographie : `var(--text-base)`, `var(--font-sans)`
- Bordures : `var(--radius-md)`
- Ombres : `var(--shadow-md)`
```

Ouvre `app/components/ui/README.txt` :

```
COMPOSANTS UI - Guide développeur
==================================

Composants de base réutilisables du design system.

PRINCIPES :
-----------
- CSS natif avec variables (voir assets/css/)
- Nommage BEM strict
- Props TypeScript
- Accessibilité (ARIA, focus, keyboard)
- Simple et minimal

UTILISATION :
-------------
<Button variant="primary" size="md">Texte</Button>
<Card>Contenu</Card>
<Input label="Email" type="email" />

MODIFICATION :
--------------
Modifier assets/css/_variables.css pour les couleurs/espacements
Ne PAS modifier tailwind.config.js
```

### 2.2 - Composant `Button.vue`

```powershell
New-Item -Path "app/components/ui/Button.vue" -ItemType File
```

Ouvre `app/components/ui/Button.vue` :

```vue
<template>
  <!--
    Composant Button - Bouton réutilisable
    
    Description : Bouton avec variantes de couleur et tailles
    
    Input (Props) :
      - variant : 'primary' | 'secondary' | 'accent' | 'outline' (défaut: 'primary')
      - size : 'sm' | 'md' | 'lg' (défaut: 'md')
      - disabled : boolean (défaut: false)
    
    Output (Events) :
      - click : Émis lors du clic
    
    Slots :
      - default : Contenu du bouton
  -->
  <button
    :class="btnClass"
    :disabled="disabled"
    @click="emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
/**
 * BUTTON COMPONENT
 * 
 * @dev CSS natif avec variables de _variables.css
 * @dev BEM strict : .btn, .btn--primary, .btn--sm
 */

// Props
interface Props {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
});

// Events
interface Emits {
  click: [event: MouseEvent];
}

const emit = defineEmits<Emits>();

// Computed class BEM
const btnClass = computed(() => {
  return [
    'btn',
    `btn--${props.variant}`,
    `btn--${props.size}`,
    props.disabled && 'btn--disabled',
  ].filter(Boolean).join(' ');
});
</script>

<style scoped>
/**
 * BUTTON STYLES - BEM strict
 * 
 * @dev Variables de _variables.css et _typography.css
 */

/* Block : .btn */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  font-family: var(--font-sans);
  font-weight: var(--font-medium);
  border: var(--border-width) solid transparent;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

/* Modifier : Variantes */
.btn--primary {
  background-color: var(--primary);
  color: var(--neutral-white);
}

.btn--primary:hover:not(.btn--disabled) {
  background-color: var(--primary-dark);
}

.btn--secondary {
  background-color: var(--secondary);
  color: var(--neutral-white);
}

.btn--secondary:hover:not(.btn--disabled) {
  background-color: var(--secondary-dark);
}

.btn--accent {
  background-color: var(--accent);
  color: var(--neutral-white);
}

.btn--accent:hover:not(.btn--disabled) {
  background-color: var(--accent-dark);
}

.btn--outline {
  background-color: transparent;
  color: var(--primary);
  border-color: var(--primary);
}

.btn--outline:hover:not(.btn--disabled) {
  background-color: var(--primary-light);
  color: var(--neutral-white);
}

/* Modifier : Tailles */
.btn--sm {
  padding: var(--space-xs) var(--space-sm);
  font-size: var(--text-sm);
}

.btn--md {
  padding: var(--space-sm) var(--space-md);
  font-size: var(--text-base);
}

.btn--lg {
  padding: var(--space-md) var(--space-lg);
  font-size: var(--text-lg);
}

/* Modifier : Désactivé */
.btn--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
```

### 2.3 - Composant `Card.vue`

```powershell
New-Item -Path "app/components/ui/Card.vue" -ItemType File
```

Ouvre `app/components/ui/Card.vue` :

```vue
<template>
  <!--
    Composant Card - Carte conteneur
    
    Description : Carte avec header et footer optionnels
    
    Input (Props) :
      - variant : 'default' | 'bordered' | 'elevated' (défaut: 'default')
    
    Slots :
      - header : En-tête optionnel
      - default : Contenu principal
      - footer : Pied de page optionnel
  -->
  <div :class="cardClass">
    <div v-if="$slots.header" class="card__header">
      <slot name="header" />
    </div>
    
    <div class="card__body">
      <slot />
    </div>
    
    <div v-if="$slots.footer" class="card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * CARD COMPONENT
 * 
 * @dev Structure simple : header, body, footer (optionnels)
 * @dev BEM : .card, .card__header, .card__body, .card__footer
 */

// Props
interface Props {
  variant?: 'default' | 'bordered' | 'elevated';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
});

// Computed class BEM
const cardClass = computed(() => {
  return ['card', `card--${props.variant}`].join(' ');
});
</script>

<style scoped>
/**
 * CARD STYLES - BEM strict
 */

/* Block : .card */
.card {
  background-color: var(--neutral-white);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

/* Element : .card__header */
.card__header {
  padding: var(--space-md);
  border-bottom: var(--border-width) solid var(--neutral-medium);
}

/* Element : .card__body */
.card__body {
  padding: var(--space-md);
}

/* Element : .card__footer */
.card__footer {
  padding: var(--space-md);
  border-top: var(--border-width) solid var(--neutral-medium);
  background-color: var(--neutral-light);
}

/* Modifier : Variantes */
.card--default {
  border: var(--border-width) solid var(--neutral-medium);
}

.card--bordered {
  border: var(--border-width-thick) solid var(--neutral-dark);
}

.card--elevated {
  border: none;
  box-shadow: var(--shadow-lg);
}
</style>
```

### 2.4 - Composant `Input.vue`

```powershell
New-Item -Path "app/components/ui/Input.vue" -ItemType File
```

Ouvre `app/components/ui/Input.vue` :

```vue
<template>
  <!--
    Composant Input - Champ de formulaire
    
    Description : Input text avec label et error
    
    Input (Props) :
      - label : Libellé du champ
      - type : Type HTML (text, email, password, etc.)
      - modelValue : Valeur v-model
      - error : Message d'erreur
      - placeholder : Texte placeholder
    
    Output (Events) :
      - update:modelValue : Émis lors de la saisie
  -->
  <div class="input-group">
    <label v-if="label" :for="inputId" class="input-group__label">
      {{ label }}
    </label>
    
    <input
      :id="inputId"
      :class="inputClass"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    
    <span v-if="error" class="input-group__error">
      {{ error }}
    </span>
  </div>
</template>

<script setup lang="ts">
/**
 * INPUT COMPONENT
 * 
 * @dev Utilise v-model pour binding bidirectionnel
 * @dev BEM : .input-group, .input-group__label, .input-group__input, .input-group__error
 */

// Props
interface Props {
  label?: string;
  type?: string;
  modelValue?: string;
  error?: string;
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  modelValue: '',
});

// Events
interface Emits {
  'update:modelValue': [value: string];
}

const emit = defineEmits<Emits>();

// ID unique pour label/input
const inputId = computed(() => `input-${Math.random().toString(36).slice(2, 9)}`);

// Computed class BEM
const inputClass = computed(() => {
  return [
    'input-group__input',
    props.error && 'input-group__input--error',
  ].filter(Boolean).join(' ');
});
</script>

<style scoped>
/**
 * INPUT STYLES - BEM strict
 */

/* Block : .input-group */
.input-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

/* Element : .input-group__label */
.input-group__label {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--neutral-dark);
}

/* Element : .input-group__input */
.input-group__input {
  padding: var(--space-sm);
  font-size: var(--text-base);
  color: var(--neutral-black);
  background-color: var(--neutral-white);
  border: var(--border-width) solid var(--neutral-medium);
  border-radius: var(--radius-md);
  transition: border-color 0.2s ease;
}

.input-group__input:focus {
  outline: none;
  border-color: var(--primary);
}

.input-group__input::placeholder {
  color: var(--secondary-light);
}

/* Modifier : Erreur */
.input-group__input--error {
  border-color: var(--error);
}

/* Element : .input-group__error */
.input-group__error {
  font-size: var(--text-xs);
  color: var(--error);
}
</style>
```

### 2.5 - Composant `Badge.vue`

```powershell
New-Item -Path "app/components/ui/Badge.vue" -ItemType File
```

Ouvre `app/components/ui/Badge.vue` :

```vue
<template>
  <!--
    Composant Badge - Tag/Badge
    
    Description : Badge coloré pour statuts, tags
    
    Input (Props) :
      - variant : 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error'
      - size : 'sm' | 'md'
    
    Slots :
      - default : Contenu du badge
  -->
  <span :class="badgeClass">
    <slot />
  </span>
</template>

<script setup lang="ts">
/**
 * BADGE COMPONENT
 * 
 * @dev Simple span inline avec couleurs sémantiques
 * @dev BEM : .badge, .badge--primary, .badge--sm
 */

// Props
interface Props {
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
});

// Computed class BEM
const badgeClass = computed(() => {
  return [
    'badge',
    `badge--${props.variant}`,
    `badge--${props.size}`,
  ].join(' ');
});
</script>

<style scoped>
/**
 * BADGE STYLES - BEM strict
 */

/* Block : .badge */
.badge {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-sans);
  font-weight: var(--font-medium);
  border-radius: var(--radius-full);
  white-space: nowrap;
}

/* Modifier : Variantes */
.badge--primary {
  background-color: var(--primary-light);
  color: var(--primary-dark);
}

.badge--secondary {
  background-color: var(--secondary-light);
  color: var(--secondary-dark);
}

.badge--accent {
  background-color: var(--accent-light);
  color: var(--accent-dark);
}

.badge--success {
  background-color: #d1fae5;
  color: var(--success);
}

.badge--warning {
  background-color: #fef3c7;
  color: var(--warning);
}

.badge--error {
  background-color: #fee2e2;
  color: var(--error);
}

/* Modifier : Tailles */
.badge--sm {
  padding: 0.25rem 0.5rem;
  font-size: var(--text-xs);
}

.badge--md {
  padding: 0.375rem 0.75rem;
  font-size: var(--text-sm);
}
</style>
```

### 2.6 - Composant `Modal.vue`

```powershell
New-Item -Path "app/components/ui/Modal.vue" -ItemType File
```

Ouvre `app/components/ui/Modal.vue` :

```vue
<template>
  <!--
    Composant Modal - Modale accessible
    
    Description : Overlay modale avec fermeture ESC/backdrop
    
    Input (Props) :
      - isOpen : boolean - Contrôle l'affichage
      - title : Titre de la modale
    
    Output (Events) :
      - close : Émis lors de la fermeture
    
    Slots :
      - default : Contenu de la modale
      - footer : Actions (boutons)
  -->
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="modal" @click="emit('close')">
        <div class="modal__backdrop"></div>
        
        <div class="modal__container" @click.stop>
          <div class="modal__header">
            <h3 class="modal__title">{{ title }}</h3>
            <button class="modal__close" @click="emit('close')" aria-label="Fermer">
              ✕
            </button>
          </div>
          
          <div class="modal__body">
            <slot />
          </div>
          
          <div v-if="$slots.footer" class="modal__footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
/**
 * MODAL COMPONENT
 * 
 * @dev Teleport vers body pour overlay
 * @dev Fermeture ESC via onKeyStroke (composable Vue)
 * @dev BEM : .modal, .modal__backdrop, .modal__container
 */

// Props
interface Props {
  isOpen: boolean;
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Modal',
});

// Events
interface Emits {
  close: [];
}

const emit = defineEmits<Emits>();

// Fermeture avec ESC
onKeyStroke('Escape', () => {
  if (props.isOpen) emit('close');
});

// Bloquer le scroll du body quand modal ouverte
watch(() => props.isOpen, (open) => {
  if (open) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});
</script>

<style scoped>
/**
 * MODAL STYLES - BEM strict
 */

/* Block : .modal */
.modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-md);
}

/* Element : .modal__backdrop */
.modal__backdrop {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

/* Element : .modal__container */
.modal__container {
  position: relative;
  background-color: var(--neutral-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
}

/* Element : .modal__header */
.modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-md);
  border-bottom: var(--border-width) solid var(--neutral-medium);
}

/* Element : .modal__title */
.modal__title {
  margin: 0;
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
}

/* Element : .modal__close */
.modal__close {
  padding: var(--space-xs);
  font-size: var(--text-xl);
  color: var(--neutral-dark);
  background: none;
  border: none;
  cursor: pointer;
  border-radius: var(--radius-sm);
}

.modal__close:hover {
  background-color: var(--neutral-light);
}

/* Element : .modal__body */
.modal__body {
  padding: var(--space-md);
}

/* Element : .modal__footer */
.modal__footer {
  display: flex;
  gap: var(--space-sm);
  justify-content: flex-end;
  padding: var(--space-md);
  border-top: var(--border-width) solid var(--neutral-medium);
}

/* Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
```

### 2.7 - Composant `Dropdown.vue`

```powershell
New-Item -Path "app/components/ui/Dropdown.vue" -ItemType File
```

Ouvre `app/components/ui/Dropdown.vue` :

```vue
<template>
  <!--
    Composant Dropdown - Menu déroulant
    
    Description : Menu contextuel avec items cliquables
    
    Input (Props) :
      - items : Array<{label: string, value: string}>
      - placeholder : Texte par défaut
    
    Output (Events) :
      - select : Émis lors de la sélection (value)
  -->
  <div class="dropdown" ref="dropdownRef">
    <button class="dropdown__trigger" @click="isOpen = !isOpen">
      {{ selectedLabel || placeholder }}
      <span class="dropdown__arrow">▼</span>
    </button>
    
    <Transition name="dropdown">
      <ul v-if="isOpen" class="dropdown__menu">
        <li
          v-for="item in items"
          :key="item.value"
          class="dropdown__item"
          @click="selectItem(item)"
        >
          {{ item.label }}
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script setup lang="ts">
/**
 * DROPDOWN COMPONENT
 * 
 * @dev Fermeture au clic extérieur via onClickOutside
 * @dev BEM : .dropdown, .dropdown__trigger, .dropdown__menu, .dropdown__item
 */

// Types
interface DropdownItem {
  label: string;
  value: string;
}

// Props
interface Props {
  items: DropdownItem[];
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Sélectionner',
});

// Events
interface Emits {
  select: [value: string];
}

const emit = defineEmits<Emits>();

// State
const isOpen = ref(false);
const selectedLabel = ref('');
const dropdownRef = ref<HTMLElement | null>(null);

// Sélection d'un item
const selectItem = (item: DropdownItem) => {
  selectedLabel.value = item.label;
  emit('select', item.value);
  isOpen.value = false;
};

// Fermeture au clic extérieur
onClickOutside(dropdownRef, () => {
  isOpen.value = false;
});
</script>

<style scoped>
/**
 * DROPDOWN STYLES - BEM strict
 */

/* Block : .dropdown */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Element : .dropdown__trigger */
.dropdown__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  font-size: var(--text-base);
  color: var(--neutral-dark);
  background-color: var(--neutral-white);
  border: var(--border-width) solid var(--neutral-medium);
  border-radius: var(--radius-md);
  cursor: pointer;
  min-width: 200px;
}

.dropdown__trigger:hover {
  border-color: var(--primary);
}

/* Element : .dropdown__arrow */
.dropdown__arrow {
  font-size: var(--text-xs);
  color: var(--neutral-dark);
}

/* Element : .dropdown__menu */
.dropdown__menu {
  position: absolute;
  top: calc(100% + 0.25rem);
  left: 0;
  right: 0;
  background-color: var(--neutral-white);
  border: var(--border-width) solid var(--neutral-medium);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 300px;
  overflow-y: auto;
  z-index: 100;
}

/* Element : .dropdown__item */
.dropdown__item {
  padding: var(--space-sm) var(--space-md);
  font-size: var(--text-base);
  color: var(--neutral-dark);
  cursor: pointer;
}

.dropdown__item:hover {
  background-color: var(--neutral-light);
  color: var(--primary);
}

/* Transitions */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
```

***

## ✅ Checkpoint Phase 2

**Commandes PowerShell complètes** :

```powershell
# Créer le dossier ui
New-Item -Path "app/components/ui" -ItemType Directory -Force

# Créer les documentations
New-Item -Path "app/components/ui/CLAUDE.md" -ItemType File
New-Item -Path "app/components/ui/README.txt" -ItemType File

# Créer les composants
New-Item -Path "app/components/ui/Button.vue" -ItemType File
New-Item -Path "app/components/ui/Card.vue" -ItemType File
New-Item -Path "app/components/ui/Input.vue" -ItemType File
New-Item -Path "app/components/ui/Badge.vue" -ItemType File
New-Item -Path "app/components/ui/Modal.vue" -ItemType File
New-Item -Path "app/components/ui/Dropdown.vue" -ItemType File
```

***

## 🚀 Phase 3 : Création des Layouts (Tailwind Utilities)

**But** : Créer les composants de structure (Header, Footer, Sidebar) en utilisant **uniquement les classes Tailwind** pour la mise en page.

### 3.1 - Documentation du dossier `layout/`

```powershell
# Créer le dossier layout
New-Item -Path "app/components/layout" -ItemType Directory -Force

# Créer les fichiers de documentation
New-Item -Path "app/components/layout/CLAUDE.md" -ItemType File
New-Item -Path "app/components/layout/README.txt" -ItemType File
```

Ouvre `app/components/layout/CLAUDE.md` :

```markdown
# Composants Layout - Documentation pour Claude

## Contexte
Ce dossier contient les **composants de structure** (Header, Footer, Sidebar).

## Règles strictes
1. **Tailwind utilities UNIQUEMENT** pour la mise en page (flex, grid, spacing)
2. **Aucun CSS custom** sauf cas exceptionnel
3. **Responsive** : utiliser les préfixes `sm:`, `md:`, `lg:`
4. **Composants UI** : importer depuis `ui/` (Button, etc.)
5. **Simple et minimal**

## Architecture d'un composant Layout

```
<template>
  <!-- Classes Tailwind pour structure -->
  <!-- Composants UI importés pour boutons, etc. -->
</template>

<script setup lang="ts">
// Props minimes
// Logique simple
</script>

<style scoped>
/* Vide ou quasi-vide - tout en Tailwind */
</style>
```

## Composants disponibles
- `Header.vue` : En-tête avec navigation
- `Footer.vue` : Pied de page
- `Sidebar.vue` : Barre latérale (menu)

## Classes Tailwind principales
- Layout : `flex`, `grid`, `container`
- Spacing : `p-4`, `px-6`, `py-8`, `gap-4`
- Responsive : `md:flex`, `lg:grid-cols-3`
- Alignment : `items-center`, `justify-between`
```

Ouvre `app/components/layout/README.txt` :

```
COMPOSANTS LAYOUT - Guide développeur
=====================================

Composants de structure pour pages (Header, Footer, Sidebar).

PRINCIPES :
-----------
- Tailwind utilities pour mise en page
- Responsive natif (sm:, md:, lg:)
- Import des composants UI pour boutons/liens
- Pas de CSS custom

UTILISATION :
-------------
<LayoutHeader />
<LayoutFooter />
<LayoutSidebar />

MODIFICATION :
--------------
Modifier les classes Tailwind directement dans le template
Utiliser les variables CSS via arbitrary values si besoin :
  class="bg-[var(--primary)]"
```

### 3.2 - Composant `Header.vue`

```powershell
New-Item -Path "app/components/layout/Header.vue" -ItemType File
```

Ouvre `app/components/layout/Header.vue` :

```vue
<template>
  <!--
    Composant Header - En-tête global
    
    Description : Header avec logo et navigation responsive
    
    Input (Props) : Aucun
    
    Output (Events) : Aucun
    
    @dev Tailwind utilities pour layout
    @dev Mobile-first : menu burger sur petits écrans
  -->
  <header class="bg-white border-b border-[var(--neutral-medium)] sticky top-0 z-50">
    <div class="container mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2">
          <span class="text-2xl font-bold text-[var(--primary)]">
            SwaveConnexion
          </span>
        </NuxtLink>

        <!-- Navigation Desktop -->
        <nav class="hidden md:flex items-center gap-6">
          <NuxtLink 
            to="/" 
            class="text-base text-[var(--neutral-dark)] hover:text-[var(--primary)] transition-colors"
          >
            Accueil
          </NuxtLink>
          <NuxtLink 
            to="/about" 
            class="text-base text-[var(--neutral-dark)] hover:text-[var(--primary)] transition-colors"
          >
            À propos
          </NuxtLink>
          <NuxtLink 
            to="/services" 
            class="text-base text-[var(--neutral-dark)] hover:text-[var(--primary)] transition-colors"
          >
            Services
          </NuxtLink>
        </nav>

        <!-- CTA Button Desktop -->
        <div class="hidden md:block">
          <Button variant="primary" size="md">Contact</Button>
        </div>

        <!-- Menu Burger Mobile -->
        <button 
          class="md:hidden p-2 text-[var(--neutral-dark)]"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          aria-label="Menu"
        >
          <span class="text-2xl">☰</span>
        </button>
      </div>

      <!-- Mobile Menu -->
      <Transition name="mobile-menu">
        <nav v-if="isMobileMenuOpen" class="md:hidden mt-4 pb-4 flex flex-col gap-4">
          <NuxtLink 
            to="/" 
            class="text-base text-[var(--neutral-dark)] hover:text-[var(--primary)]"
            @click="isMobileMenuOpen = false"
          >
            Accueil
          </NuxtLink>
          <NuxtLink 
            to="/about" 
            class="text-base text-[var(--neutral-dark)] hover:text-[var(--primary)]"
            @click="isMobileMenuOpen = false"
          >
            À propos
          </NuxtLink>
          <NuxtLink 
            to="/services" 
            class="text-base text-[var(--neutral-dark)] hover:text-[var(--primary)]"
            @click="isMobileMenuOpen = false"
          >
            Services
          </NuxtLink>
          <Button variant="primary" size="md" class="w-full">Contact</Button>
        </nav>
      </Transition>
    </div>
  </header>
</template>

<script setup lang="ts">
/**
 * HEADER COMPONENT
 * 
 * @dev Sticky header avec navigation responsive
 * @dev Menu burger sur mobile (<768px)
 */

// State
const isMobileMenuOpen = ref(false);
</script>

<style scoped>
/**
 * TRANSITIONS Mobile Menu
 * 
 * @dev Seule exception CSS : animations
 */

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.2s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
```

### 3.3 - Composant `Footer.vue`

```powershell
New-Item -Path "app/components/layout/Footer.vue" -ItemType File
```

Ouvre `app/components/layout/Footer.vue` :

```vue
<template>
  <!--
    Composant Footer - Pied de page global
    
    Description : Footer simple avec copyright et liens
    
    Input (Props) : Aucun
    
    Output (Events) : Aucun
    
    @dev Tailwind utilities pour layout
    @dev Responsive : colonnes sur desktop, stack sur mobile
  -->
  <footer class="bg-[var(--neutral-black)] text-[var(--neutral-light)] mt-auto">
    <div class="container mx-auto px-6 py-12">
      <!-- Grid responsive -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Colonne 1 : À propos -->
        <div>
          <h3 class="text-xl font-semibold text-white mb-4">SwaveConnexion</h3>
          <p class="text-sm text-[var(--neutral-medium)]">
            Design system minimaliste pour applications modernes.
          </p>
        </div>

        <!-- Colonne 2 : Liens rapides -->
        <div>
          <h4 class="text-lg font-medium text-white mb-4">Liens rapides</h4>
          <ul class="flex flex-col gap-2">
            <li>
              <NuxtLink 
                to="/" 
                class="text-sm text-[var(--neutral-medium)] hover:text-white transition-colors"
              >
                Accueil
              </NuxtLink>
            </li>
            <li>
              <NuxtLink 
                to="/about" 
                class="text-sm text-[var(--neutral-medium)] hover:text-white transition-colors"
              >
                À propos
              </NuxtLink>
            </li>
            <li>
              <NuxtLink 
                to="/services" 
                class="text-sm text-[var(--neutral-medium)] hover:text-white transition-colors"
              >
                Services
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Colonne 3 : Contact -->
        <div>
          <h4 class="text-lg font-medium text-white mb-4">Contact</h4>
          <p class="text-sm text-[var(--neutral-medium)]">
            Email : contact@swaveconnexion.fr
          </p>
        </div>
      </div>

      <!-- Séparateur -->
      <div class="border-t border-[var(--neutral-dark)] mt-8 pt-8">
        <p class="text-center text-sm text-[var(--neutral-medium)]">
          © {{ currentYear }} SwaveConnexion. Tous droits réservés.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
/**
 * FOOTER COMPONENT
 * 
 * @dev Footer simple avec année dynamique
 * @dev Grid 3 colonnes sur desktop, stack sur mobile
 */

// Année courante
const currentYear = new Date().getFullYear();
</script>
```

### 3.4 - Composant `Sidebar.vue`

```powershell
New-Item -Path "app/components/layout/Sidebar.vue" -ItemType File
```

Ouvre `app/components/layout/Sidebar.vue` :

```vue
<template>
  <!--
    Composant Sidebar - Barre latérale
    
    Description : Menu latéral pour navigation secondaire
    
    Input (Props) :
      - items : Array<{label: string, to: string, icon?: string}>
      - isCollapsed : boolean - État réduit/étendu
    
    Output (Events) : Aucun
    
    @dev Tailwind utilities pour layout
    @dev Collapse sur petits écrans
  -->
  <aside 
    :class="[
      'bg-white border-r border-[var(--neutral-medium)] transition-all duration-300',
      isCollapsed ? 'w-16' : 'w-64'
    ]"
  >
    <nav class="p-4 flex flex-col gap-2">
      <NuxtLink
        v-for="item in items"
        :key="item.to"
        :to="item.to"
        :class="[
          'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
          'text-[var(--neutral-dark)] hover:bg-[var(--neutral-light)] hover:text-[var(--primary)]'
        ]"
      >
        <!-- Icône (optionnel) -->
        <span v-if="item.icon" class="text-xl">{{ item.icon }}</span>
        
        <!-- Label (masqué si collapsed) -->
        <span v-if="!isCollapsed" class="text-base font-medium">
          {{ item.label }}
        </span>
      </NuxtLink>
    </nav>
  </aside>
</template>

<script setup lang="ts">
/**
 * SIDEBAR COMPONENT
 * 
 * @dev Sidebar collapsible
 * @dev Width animée avec Tailwind transitions
 */

// Types
interface SidebarItem {
  label: string;
  to: string;
  icon?: string;
}

// Props
interface Props {
  items: SidebarItem[];
  isCollapsed?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isCollapsed: false,
});
</script>
```

***

## 🚀 Phase 4 : Layouts Nuxt (Templates de pages)

**But** : Créer les layouts Nuxt réutilisables pour structurer les pages.

### 4.1 - Documentation du dossier `layouts/`

```powershell
# Créer les fichiers de documentation
New-Item -Path "app/layouts/CLAUDE.md" -ItemType File
```

Ouvre `app/layouts/CLAUDE.md` :

```markdown
# Layouts Nuxt - Documentation pour Claude

## Contexte
Les **layouts** Nuxt sont des templates de pages réutilisables.

## Règles
1. **Tailwind utilities** pour structure globale
2. **Import des composants layout** : `<LayoutHeader />`, `<LayoutFooter />`
3. **Slot `<NuxtPage />`** pour injecter le contenu des pages
4. **Simple et minimal**

## Layouts disponibles
- `default.vue` : Layout standard (Header + Footer)
- `blank.vue` : Layout vide (pour pages spéciales)

## Utilisation dans les pages

```
<!-- Page avec layout par défaut -->
<template>
  <div>Mon contenu</div>
</template>

<!-- Page avec layout custom -->
<script setup>
definePageMeta({
  layout: 'blank'
})
</script>
```
```

### 4.2 - Layout `default.vue`

```powershell
New-Item -Path "app/layouts/default.vue" -ItemType File
```

Ouvre `app/layouts/default.vue` :

```vue
<template>
  <!--
    Layout Default - Template standard
    
    Description : Layout avec Header, contenu, Footer
    
    @dev Utilise Tailwind pour structure flex
    @dev min-h-screen pour footer sticky
  -->
  <div class="min-h-screen flex flex-col bg-[var(--neutral-light)]">
    <!-- Header -->
    <LayoutHeader />

    <!-- Contenu principal -->
    <main class="flex-1 container mx-auto px-6 py-8">
      <NuxtPage />
    </main>

    <!-- Footer -->
    <LayoutFooter />
  </div>
</template>

<script setup lang="ts">
/**
 * DEFAULT LAYOUT
 * 
 * @dev Layout standard pour la majorité des pages
 * @dev Header sticky, footer collé en bas
 */
</script>
```

### 4.3 - Layout `blank.vue`

```powershell
New-Item -Path "app/layouts/blank.vue" -ItemType File
```

Ouvre `app/layouts/blank.vue` :

```vue
<template>
  <!--
    Layout Blank - Template vide
    
    Description : Layout sans Header/Footer
    Usage : Pages login, 404, landing pages
    
    @dev Juste le slot NuxtPage
  -->
  <div class="min-h-screen bg-[var(--neutral-light)]">
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
/**
 * BLANK LAYOUT
 * 
 * @dev Layout minimal sans structure
 * @dev Pour pages spéciales (login, 404, etc.)
 */
</script>
```

***

## 🚀 Phase 5 : Sections (Hero)

**But** : Créer un composant Hero minimaliste pour les landing pages.

### 5.1 - Documentation du dossier `sections/`

```powershell
# Créer le dossier sections
New-Item -Path "app/components/sections" -ItemType Directory -Force

# Créer les fichiers de documentation
New-Item -Path "app/components/sections/CLAUDE.md" -ItemType File
New-Item -Path "app/components/sections/README.txt" -ItemType File
```

Ouvre `app/components/sections/CLAUDE.md` :

```markdown
# Composants Sections - Documentation pour Claude

## Contexte
Ce dossier contient les **sections complètes** réutilisables (Hero, Features, CTA, etc.).

## Règles strictes
1. **Tailwind utilities UNIQUEMENT** pour la mise en page
2. **Composants UI** : importer depuis `ui/` (Button, Card, etc.)
3. **Slots flexibles** : permettre la personnalisation du contenu
4. **Responsive natif** : mobile-first avec breakpoints
5. **Minimal et réutilisable**

## Composants disponibles
- `Hero.vue` : Section d'en-tête avec variantes de background

## Architecture d'un composant Section

```
<template>
  <!-- Structure Tailwind avec slot(s) -->
</template>

<script setup lang="ts">
// Props pour variantes
// Computed classes
</script>

<style scoped>
/* Vide ou minimal - tout en Tailwind */
</style>
```
```

Ouvre `app/components/sections/README.txt` :

```
COMPOSANTS SECTIONS - Guide développeur
========================================

Sections complètes réutilisables pour pages (Hero, Features, etc.).

PRINCIPES :
-----------
- Tailwind utilities pour layout
- Import des composants UI
- Slots pour flexibilité
- Responsive natif

UTILISATION :
-------------
<SectionsHero variant="gradient">
  <h1>Mon titre</h1>
  <Button>CTA</Button>
</SectionsHero>
```

### 5.2 - Composant `Hero.vue`

```powershell
New-Item -Path "app/components/sections/Hero.vue" -ItemType File
```

Ouvre `app/components/sections/Hero.vue` :

```vue
<template>
  <!--
    Composant Hero - Section Hero minimaliste

    Description : Section d'en-tête de page avec arrière-plan et contenu flexible

    Input (Props) :
      - variant : 'default' | 'gradient' | 'image' (défaut: 'default')
      - centered : boolean - Centre le contenu verticalement (défaut: true)

    Slots :
      - default : Contenu principal du Hero

    @dev Tailwind utilities pour layout
    @dev Slot flexible pour personnalisation maximale
  -->
  <section :class="heroClass">
    <div class="container mx-auto px-6 py-20 md:py-32">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * HERO COMPONENT
 *
 * @dev Section Hero simple avec variantes de background
 * @dev Utilise Tailwind uniquement
 * @dev Content via slot pour flexibilité maximale
 */

// Props
interface Props {
  variant?: 'default' | 'gradient' | 'image';
  centered?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  centered: true,
});

// Computed class
const heroClass = computed(() => {
  const baseClasses = 'relative min-h-[500px] flex items-center';

  const variantClasses = {
    default: 'bg-[var(--neutral-light)]',
    gradient: 'bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white',
    image: 'bg-cover bg-center bg-no-repeat',
  };

  const centerClass = props.centered ? 'justify-center text-center' : '';

  return [baseClasses, variantClasses[props.variant], centerClass].filter(Boolean).join(' ');
});
</script>
```

***

## 🚀 Phase 6 : Page de Test

**But** : Créer une page exemple pour tester tout le design system.

### 6.1 - Configuration `app.vue`

```powershell
New-Item -Path "app/app.vue" -ItemType File -Force
```

Ouvre `app/app.vue` :

```vue
<template>
  <!--
    App.vue - Point d'entrée Nuxt
    
    @dev NuxtLayout charge le layout automatiquement
  -->
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
/**
 * APP ROOT
 * 
 * @dev Entry point de l'app Nuxt
 */
</script>
```

### 6.2 - Page `index.vue` (Test complet)

```powershell
New-Item -Path "app/pages" -ItemType Directory -Force
New-Item -Path "app/pages/index.vue" -ItemType File
```

Ouvre `app/pages/index.vue` :

```vue
<template>
  <!--
    Page Index - Test du Design System
    
    @dev Teste tous les composants UI
    @dev Utilise le layout default
  -->
  <div>
    <!-- Section Hero -->
    <SectionsHero variant="gradient" :centered="true">
      <h1 class="text-white mb-6">Design System SwaveConnexion</h1>
      <p class="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
        Système de design minimaliste avec CSS natif + Tailwind 4
      </p>
      <div class="flex gap-4 justify-center">
        <Button variant="primary" size="lg">Commencer</Button>
        <Button variant="outline" size="lg">Documentation</Button>
      </div>
    </SectionsHero>

    <!-- Contenu principal -->
    <div class="space-y-12 py-12">
      <!-- Section Typographie -->
    <section>
      <h1>Design System - Test</h1>
      <h2>Typographie</h2>
      <h3>Heading 3 (48px)</h3>
      <h4>Heading 4 (36px)</h4>
      <h5>Heading 5 (27px)</h5>
      <h6>Heading 6 (20px)</h6>
      <p>
        Paragraphe de base (16px). Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Ratio typographique : 1.333 (Perfect Fourth).
      </p>
      <ul>
        <li>Item de liste 1</li>
        <li>Item de liste 2</li>
        <li>Item de liste 3</li>
      </ul>
    </section>

    <!-- Section Boutons -->
    <section>
      <h2>Boutons</h2>
      <div class="flex flex-wrap gap-4">
        <Button variant="primary" size="sm">Primary SM</Button>
        <Button variant="primary" size="md">Primary MD</Button>
        <Button variant="primary" size="lg">Primary LG</Button>
      </div>
      <div class="flex flex-wrap gap-4 mt-4">
        <Button variant="secondary">Secondary</Button>
        <Button variant="accent">Accent</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="primary" disabled>Disabled</Button>
      </div>
    </section>

    <!-- Section Cards -->
    <section>
      <h2>Cards</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="default">
          <template #header>
            <h4>Card Default</h4>
          </template>
          <p>Contenu de la card avec bordure simple.</p>
          <template #footer>
            <Button variant="primary" size="sm">Action</Button>
          </template>
        </Card>

        <Card variant="bordered">
          <template #header>
            <h4>Card Bordered</h4>
          </template>
          <p>Card avec bordure épaisse.</p>
        </Card>

        <Card variant="elevated">
          <template #header>
            <h4>Card Elevated</h4>
          </template>
          <p>Card avec ombre portée.</p>
        </Card>
      </div>
    </section>

    <!-- Section Inputs -->
    <section>
      <h2>Formulaires</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
        <Input 
          v-model="formData.name"
          label="Nom"
          placeholder="Entrez votre nom"
        />
        <Input 
          v-model="formData.email"
          label="Email"
          type="email"
          placeholder="exemple@mail.com"
        />
        <Input 
          v-model="formData.password"
          label="Mot de passe"
          type="password"
          placeholder="••••••••"
        />
        <Input 
          v-model="formData.error"
          label="Avec erreur"
          error="Ce champ est requis"
        />
      </div>
    </section>

    <!-- Section Badges -->
    <section>
      <h2>Badges</h2>
      <div class="flex flex-wrap gap-3">
        <Badge variant="primary" size="sm">Primary SM</Badge>
        <Badge variant="secondary" size="md">Secondary MD</Badge>
        <Badge variant="accent">Accent</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="error">Error</Badge>
      </div>
    </section>

    <!-- Section Modal -->
    <section>
      <h2>Modal</h2>
      <Button variant="primary" @click="isModalOpen = true">
        Ouvrir la modal
      </Button>

      <Modal 
        :is-open="isModalOpen" 
        title="Exemple de Modal"
        @close="isModalOpen = false"
      >
        <p>Ceci est le contenu de la modal. Elle se ferme avec ESC ou en cliquant en dehors.</p>
        
        <template #footer>
          <Button variant="outline" @click="isModalOpen = false">Annuler</Button>
          <Button variant="primary" @click="isModalOpen = false">Confirmer</Button>
        </template>
      </Modal>
    </section>

    <!-- Section Dropdown -->
    <section>
      <h2>Dropdown</h2>
      <Dropdown 
        :items="dropdownItems"
        placeholder="Choisir une option"
        @select="handleSelect"
      />
      <p v-if="selectedValue" class="mt-4">Sélection : {{ selectedValue }}</p>
    </section>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * INDEX PAGE - Test Design System
 * 
 * @dev Teste tous les composants UI
 */

// Form data
const formData = reactive({
  name: '',
  email: '',
  password: '',
  error: '',
});

// Modal
const isModalOpen = ref(false);

// Dropdown
const dropdownItems = [
  { label: 'Option 1', value: 'opt1' },
  { label: 'Option 2', value: 'opt2' },
  { label: 'Option 3', value: 'opt3' },
];

const selectedValue = ref('');

const handleSelect = (value: string) => {
  selectedValue.value = value;
};
</script>
```

***

## ✅ Checkpoint Final

**Commandes PowerShell complètes** :

```powershell
# Layouts components
New-Item -Path "app/components/layout" -ItemType Directory -Force
New-Item -Path "app/components/layout/CLAUDE.md" -ItemType File
New-Item -Path "app/components/layout/README.txt" -ItemType File
New-Item -Path "app/components/layout/Header.vue" -ItemType File
New-Item -Path "app/components/layout/Footer.vue" -ItemType File
New-Item -Path "app/components/layout/Sidebar.vue" -ItemType File

# Nuxt layouts
New-Item -Path "app/layouts/CLAUDE.md" -ItemType File
New-Item -Path "app/layouts/default.vue" -ItemType File
New-Item -Path "app/layouts/blank.vue" -ItemType File

# Pages
New-Item -Path "app/pages" -ItemType Directory -Force
New-Item -Path "app/pages/index.vue" -ItemType File

# App root
New-Item -Path "app/app.vue" -ItemType File -Force
```

**Test final** :

```powershell
npm run dev
```

Ouvre `http://localhost:3000` et tu devrais voir :
- ✅ Tous les composants UI fonctionnels
- ✅ Type scale appliqué (ratio 1.333)
- ✅ Header/Footer structurés avec Tailwind
- ✅ Layouts responsives
- ✅ Design system minimal et cohérent

***
