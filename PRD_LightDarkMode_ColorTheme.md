# 📋 PRD FINAL - Refonte du Système Light/Dark Mode + Thèmes

**Projet** : SwaveConnexion Design System  
**Version** : 2.0  
**Date** : 4 décembre 2025  
**Auteur** : PRD co-créé avec l'équipe technique

***

## 🎯 Objectif du Projet

Refondre complètement le système de gestion des modes (light/dark) et des thèmes (ocean, sunset) pour :
1. **Éliminer les 5 problèmes critiques** identifiés (FOUC, SSR, listeners, etc.)
2. **Améliorer la maintenabilité** du fichier `_variables.css` (nommage sémantique)
3. **Corriger les bugs d'accessibilité** (texte blanc sur fond blanc)
4. **Préserver la philosophie "Token Minimal"** (3 nuances par couleur)

***

## 📐 Architecture Actuelle (Analyse)

### **Philosophie : Token Minimal (3 Nuances)**

L'architecture actuelle utilise **une approche token minimaliste** avec 3 nuances par couleur :

```css
/* Exemple : Primary */
--primary: #2563eb;         /* Token base */
--primary-light: #60a5fa;   /* Token light */
--primary-dark: #1e40af;    /* Token dark */
```

**Caractéristiques :**
- ✅ **1 seul niveau** de variables (tokens utilisés directement dans les composants)
- ✅ **Minimal** : Seulement 3 nuances (pas 10 comme Material Design)
- ✅ **Pragmatique** : Juste ce qu'il faut pour couvrir les besoins

**Cette philosophie sera PRÉSERVÉE dans la refonte.**

***

### **Tokens Actuels : Classification**

#### **Catégorie 1 : Tokens Thématiques (Invariants)**

Ces tokens **ne changent PAS** en dark mode. Ils représentent les couleurs de marque.

```css
/* Primary - Bleu moderne */
--primary: #2563eb;
--primary-light: #60a5fa;
--primary-dark: #1e40af;

/* Secondary - Gris neutre */
--secondary: #525252;
--secondary-light: #a3a3a3;
--secondary-dark: #262626;

/* Accent - Orange/Ambre */
--accent: #f59e0b;
--accent-light: #fbbf24;
--accent-dark: #d97706;

/* Couleurs sémantiques */
--success: #10b981;
--error: #ef4444;
--warning: #f59e0b;
--info: #3b82f6;
```

**Verdict** : ✅ **Garder à l'identique** (nommage déjà correct)

***

#### **Catégorie 2 : Tokens Neutres (Problématiques)**

Ces tokens **changent** en dark mode, mais leur **nommage actuel** crée de la confusion.

```css
/* Actuels (nommage par couleur) */
--neutral-white: #ffffff;   /* ❌ "white" devient noir en dark */
--neutral-light: #f5f5f5;   /* ❌ "light" devient foncé en dark */
--neutral-medium: #d4d4d4;  /* ⚠️ Nom peu clair */
--neutral-dark: #404040;    /* ❌ "dark" devient clair en dark */
--neutral-black: #171717;   /* ❌ "black" devient blanc en dark */
```

**Problème** : Le **nom** ne correspond plus à la **valeur** en dark mode.

**Solution** : Renommer avec des noms **sémantiques** (rôle, pas couleur).

***

## 🔄 Tableau de Migration des Variables

### **Mapping Ancien → Nouveau (Tokens Neutres)**

| Ancien Token | Valeur Light | Nouveau Token | Usage/Rôle | Valeur Dark |
|--------------|--------------|---------------|------------|-------------|
| `--neutral-white` | `#ffffff` | `--bg-base` | Fonds de base (cards, pages, modals) | `#171717` |
| `--neutral-light` | `#f5f5f5` | `--bg-subtle` | Fonds subtils (footer, sections alternées) | `#262626` |
| N/A | N/A | `--bg-elevated` | Fonds surélevés (dropdowns, popovers) | `#262626` |
| N/A | N/A | `--bg-input` | Fonds des champs de formulaire | `#1f1f1f` |
| N/A | N/A | `--bg-hover` | État hover sur éléments cliquables | `#262626` |
| N/A | N/A | `--bg-active` | État actif/sélectionné | `#404040` |
| N/A | N/A | `--bg-code` | Fond des blocs de code (toujours foncé) | `#0a0a0a` |
| `--neutral-black` | `#171717` | `--text-strong` | Textes principaux (titres, headings) | `#fafafa` |
| `--neutral-dark` | `#404040` | `--text-base` | Textes secondaires (paragraphes, labels) | `#d4d4d4` |
| `--neutral-medium` | `#d4d4d4` | `--text-subtle` | Textes atténués (placeholders, hints) | `#a3a3a3` |
| `--neutral-white` | `#ffffff` | `--text-inverse` | Texte sur fond foncé (boutons primary) | `#171717` |
| N/A | N/A | `--text-code` | Texte dans blocs de code | `#e5e5e5` |
| `--neutral-medium` | `#d4d4d4` | `--border-base` | Bordures standards | `#404040` |
| N/A | N/A | `--border-strong` | Bordures accentuées | `#525252` |

### **Variables Invariantes (Aucun Changement)**

Ces variables **ne changent jamais** (ni en dark mode, ni par thème) :

| Catégorie | Variables | Raison |
|-----------|-----------|--------|
| **Espacements** | `--space-xs` à `--space-3xl` | Distances fixes |
| **Bordures** | `--radius-sm` à `--radius-full`, `--border-width` | Géométrie fixe |
| **Transitions** | `--transition-fast/base/slow` | Durées fixes |
| **Z-index** | `--z-dropdown` à `--z-tooltip` | Empilement fixe |

***

## 🔴 Problèmes Actuels Identifiés

### **A. Problèmes Techniques Critiques**

| # | Problème | Impact Utilisateur | Gravité | Cause |
|---|----------|-------------------|---------|-------|
| 1 | **FOUC** (Flash blanc au chargement) | Flash désagréable, semble buggy | 🔴 Critique | `initTheme()` appelé dans `onMounted()` (après rendu) |
| 2 | **Multiple initTheme() calls** | Performance dégradée | 🟡 Moyen | Pas de garantie d'appel unique |
| 3 | **SSR non géré** | Hydration warnings, flash blanc | 🔴 Critique | `localStorage` côté serveur n'existe pas |
| 4 | **Pas de listener media query** | Thème système non suivi en temps réel | 🟡 Moyen | `matchMedia()` appelé une seule fois |
| 5 | **Double state complexity** | Comportement imprévisible | 🟠 Élevé | `colorMode` et `currentTheme` indépendants |

***

### **B. Problème de Nommage des Variables**

**État actuel** : Noms basés sur les couleurs (`--neutral-white`, `--neutral-black`)

**Conséquence en dark mode :**
```css
:root {
  --neutral-white: #ffffff;  /* Blanc */
}

.dark {
  --neutral-white: #171717;  /* ❌ "white" = noir ??? */
}
```

**Impact pour le dev en maintenance :**
- 🤯 Confusion mentale ("white" affiche du noir)
- 🐛 Risque d'utiliser la mauvaise variable
- 📦 Difficulté à comprendre l'intention

***

### **C. Problème de Backgrounds Non Gérés**

**Constat** : Le mode dark actuel inverse uniquement certaines variables, mais **pas toutes** les surfaces nécessaires.

**Exemple problématique :**
```css
/* Component Card.vue */
.card {
  background-color: var(--neutral-white);  /* ✅ S'inverse bien */
}

.card__footer {
  background-color: var(--neutral-light);  /* ✅ S'inverse bien */
}

/* Mais manque : */
/* - Fond des inputs */
/* - État hover */
/* - Fond des dropdowns (elevated) */
/* - Fond des blocs code */
```

**Variables manquantes :**
- `--bg-input` (champs de formulaire)
- `--bg-hover` (hover states)
- `--bg-elevated` (dropdowns, modals au-dessus)
- `--bg-code` (blocs de code)

***

### **D. Problème d'Accessibilité (Contraste)**

**Symptôme** : Texte blanc sur fond blanc dans certains composants en dark mode.

**Cause identifiée :**

#### **1. Layouts avec classes Tailwind hardcodées (Sidebar.vue)**

```vue
<!-- ❌ Problème : Classes Tailwind ne s'adaptent pas -->
<aside class="bg-white shadow-2xl">  <!-- Reste blanc en dark -->
  <h3 class="text-gray-900">Navigation</h3>  <!-- Reste noir en dark -->
</aside>
```

**Bugs détectés dans Sidebar.vue :**

| Ligne | Code | Bug | Impact |
|-------|------|-----|--------|
| 40 | `class="bg-white"` | Fond blanc en dark | Surface invisible |
| 43 | `class="text-gray-900"` | Texte noir en dark | Texte invisible sur fond blanc |
| 46 | `class="text-gray-500"` | Texte gris moyen | Mauvais contraste |
| 46 | `class="hover:bg-gray-100"` | Hover gris clair | Pas adapté au dark |
| 57 | `class="text-gray-700"` | Liens gris foncé | Invisible en dark |

***

#### **2. Typography avec variables qui s'inversent 2× (`_typography.css`)**

```css
/* ❌ Problème : pre s'inverse 2 fois */
pre {
  background-color: var(--neutral-black);  /* Light: noir, Dark: blanc ❌ */
  color: var(--neutral-white);             /* Light: blanc, Dark: noir ❌ */
}
```

**Pourquoi ça pose problème ?**
- **Light mode** : Fond noir, texte blanc → ✅ OK
- **Dark mode** :
  - `--neutral-black` devient `#ffffff` (blanc)
  - `--neutral-white` devient `#171717` (noir)
  - **Résultat** : Fond blanc, texte noir → ❌ Inversion non voulue !

***

#### **3. Pourquoi le plugin d'accessibilité ne détecte pas ?**

**Réponse** : Les outils d'accessibilité testent le **DOM initial** (light mode par défaut).

Ils **ne testent PAS** :
- Les états dynamiques (classe `.dark` appliquée après)
- Les changements de variables CSS en temps réel

**Solution** : Tester **manuellement** en dark mode pour chaque composant.

***

## 🎨 Architecture Cible (Solution)

### **Principe Fondamental : SSOT (Single Source of Truth)**

**Définition** : Un **seul endroit** pour définir/modifier les variables → `_variables.css`

**Fonctionnement :**

1. **Fichier `_variables.css`** :
   - Section `:root` → Valeurs light mode
   - Section `.dark` → Valeurs dark mode
   - Section `[data-theme]` → Couleurs thématiques (ocean, sunset)

2. **Composants** :
   - Utilisent **uniquement** des variables CSS (`var(--...)`)
   - **Aucune** logique de mode/thème dans les composants
   - S'adaptent **automatiquement** quand les variables changent

3. **Toggle light/dark** :
   - `@nuxtjs/color-mode` applique la classe `.dark` sur `<html>`
   - CSS recalcule les variables automatiquement
   - Composants se re-rendent avec nouvelles valeurs

**Avantages :**
- ✅ **1 fichier** à maintenir = `_variables.css`
- ✅ **1 changement** = Impact global
- ✅ **0 duplication** de code
- ✅ **0 logique** dans les composants

***

### **Séparation Mode vs Thème**

| Concept | Responsabilité | Variables Modifiées | Exemples |
|---------|---------------|---------------------|----------|
| **Mode** (light/dark) | Contraste général, backgrounds, textes | `--bg-*`, `--text-*`, `--border-*`, ombres | Light = fond blanc, Dark = fond noir |
| **Thème** (ocean/sunset/default) | Couleurs d'accent, primaires, secondaires | `--primary-*`, `--secondary-*`, `--accent-*` | Ocean = bleu cyan, Sunset = orange rose |

**Clarification : Que gère le mode light/dark ?**

Le mode doit gérer **tous** les éléments qui impactent la **lisibilité** :

**Variables à inverser en dark mode :**
1. **Backgrounds** : `--bg-base`, `--bg-subtle`, `--bg-elevated`, `--bg-input`, `--bg-hover`, `--bg-active`
2. **Textes** : `--text-strong`, `--text-base`, `--text-subtle`, `--text-inverse`
3. **Bordures** : `--border-base`, `--border-strong`
4. **Ombres** : Toutes les `--shadow-*` (plus prononcées en dark)

**Variables qui NE changent PAS en dark mode :**
- `--primary`, `--secondary`, `--accent` → Gérées par le **thème**
- `--space-*`, `--radius-*` → Invariantes
- Couleurs sémantiques (`--success`, `--error`) → Légèrement ajustées

***

## 📄 Fichier `_variables.css` FINAL

```css
/**
 * VARIABLES CSS - SwaveConnexion Design System v2.0
 * 
 * @architecture SSOT (Single Source of Truth)
 * @principe Token Minimal (3 nuances par couleur)
 * @convention Nommage sémantique (rôle, pas couleur)
 * 
 * STRUCTURE :
 * 1. Variables invariantes (espacements, bordures, transitions, z-index)
 * 2. Tokens thématiques (primary, secondary, accent) - Invariants
 * 3. Tokens neutres (backgrounds, textes, bordures) - Mode light par défaut
 * 4. Mode dark (.dark) - Redéfinition tokens neutres
 * 5. Thèmes ([data-theme]) - Changent couleurs thématiques
 * 
 * PHILOSOPHIE :
 * - 1 seul niveau de variables (tokens utilisés directement)
 * - 3 nuances max par couleur (light, base, dark)
 * - Nommage par rôle, pas par couleur
 */

:root {
  /* ============================================
     1. VARIABLES INVARIANTES (ne changent jamais)
     ============================================ */
  
  /* Espacements (grille 8px) */
  --space-xs: 0.5rem;      /* 8px */
  --space-sm: 1rem;        /* 16px */
  --space-md: 1.5rem;      /* 24px */
  --space-lg: 2rem;        /* 32px */
  --space-xl: 3rem;        /* 48px */
  --space-2xl: 4rem;       /* 64px */
  --space-3xl: 6rem;       /* 96px */
  
  /* Bordures - Radius */
  --radius-sm: 0.25rem;    /* 4px */
  --radius-md: 0.5rem;     /* 8px */
  --radius-lg: 0.75rem;    /* 12px */
  --radius-xl: 1rem;       /* 16px */
  --radius-full: 9999px;   /* Cercle parfait */
  
  /* Bordures - Largeurs */
  --border-width: 1px;
  --border-width-thick: 2px;
  
  /* Transitions */
  --transition-fast: 150ms ease-in-out;
  --transition-base: 250ms ease-in-out;
  --transition-slow: 350ms ease-in-out;
  
  /* Z-index (empilement) */
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;
  
  /* ============================================
     2. TOKENS THÉMATIQUES (invariants)
     Ne changent PAS en dark mode, changent par thème
     ============================================ */
  
  /* Primary - Bleu moderne */
  --primary: #2563eb;
  --primary-light: #60a5fa;
  --primary-dark: #1e40af;
  
  /* Secondary - Gris neutre */
  --secondary: #525252;
  --secondary-light: #a3a3a3;
  --secondary-dark: #262626;
  
  /* Accent - Orange/Ambre */
  --accent: #f59e0b;
  --accent-light: #fbbf24;
  --accent-dark: #d97706;
  
  /* Couleurs sémantiques (légèrement ajustées en dark) */
  --success: #10b981;
  --success-light: #34d399;
  --success-dark: #059669;
  
  --error: #ef4444;
  --error-light: #f87171;
  --error-dark: #dc2626;
  
  --warning: #f59e0b;
  --warning-light: #fbbf24;
  --warning-dark: #d97706;
  
  --info: #3b82f6;
  --info-light: #60a5fa;
  --info-dark: #2563eb;
  
  /* ============================================
     3. TOKENS NEUTRES (Light Mode par défaut)
     Changent en dark mode - Nommage sémantique
     ============================================ */
  
  /* Backgrounds */
  --bg-base: #ffffff;          /* Fonds de base (cards, pages, modals) */
  --bg-subtle: #f5f5f5;        /* Fonds subtils (footer, sections alternées) */
  --bg-elevated: #ffffff;      /* Fonds surélevés (dropdowns, popovers au-dessus) */
  --bg-input: #ffffff;         /* Fonds des champs de formulaire */
  --bg-hover: #f5f5f5;         /* État hover sur éléments cliquables */
  --bg-active: #e5e5e5;        /* État actif/sélectionné */
  --bg-code: #1e1e1e;          /* Fond des blocs de code (toujours foncé) */
  
  /* Textes */
  --text-strong: #171717;      /* Textes principaux (titres, headings) */
  --text-base: #404040;        /* Textes secondaires (paragraphes, labels) */
  --text-subtle: #737373;      /* Textes atténués (placeholders, hints) */
  --text-inverse: #ffffff;     /* Texte sur fond foncé (boutons primary) */
  --text-code: #d4d4d4;        /* Texte dans blocs de code */
  
  /* Bordures */
  --border-base: #e5e5e5;      /* Bordures standards */
  --border-strong: #d4d4d4;    /* Bordures accentuées */
  
  /* Ombres */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* ============================================
   4. MODE DARK (Redéfinition tokens neutres)
   Classe appliquée sur <html> par @nuxtjs/color-mode
   ============================================ */

.dark {
  /* Backgrounds inversés */
  --bg-base: #171717;          /* Gris très foncé (ex blanc) */
  --bg-subtle: #262626;        /* Gris foncé (ex gris clair) */
  --bg-elevated: #262626;      /* Gris foncé surélevé */
  --bg-input: #1f1f1f;         /* Gris très foncé pour inputs */
  --bg-hover: #262626;         /* Gris foncé hover */
  --bg-active: #404040;        /* Gris moyen actif */
  --bg-code: #0a0a0a;          /* Presque noir pour code */
  
  /* Textes inversés */
  --text-strong: #fafafa;      /* Blanc cassé (ex noir) */
  --text-base: #d4d4d4;        /* Gris clair (ex gris foncé) */
  --text-subtle: #a3a3a3;      /* Gris moyen (ex gris clair) */
  --text-inverse: #171717;     /* Noir (pour texte sur fond clair) */
  --text-code: #e5e5e5;        /* Blanc cassé pour code */
  
  /* Bordures adaptées */
  --border-base: #404040;      /* Gris moyen */
  --border-strong: #525252;    /* Gris plus clair */
  
  /* Ombres plus prononcées */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3);
  --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  
  /* Couleurs sémantiques légèrement ajustées (plus claires) */
  --success: #34d399;
  --success-light: #6ee7b7;
  --success-dark: #10b981;
  
  --error: #f87171;
  --error-light: #fca5a5;
  --error-dark: #ef4444;
  
  --warning: #fbbf24;
  --warning-light: #fcd34d;
  --warning-dark: #f59e0b;
  
  --info: #60a5fa;
  --info-light: #93c5fd;
  --info-dark: #3b82f6;
}

/* ============================================
   5. THÈMES (Changent couleurs thématiques)
   Attribut appliqué sur <html> data-theme="ocean"
   ============================================ */

/* Thème Ocean - Bleu océan profond */
[data-theme='ocean'] {
  --primary: #0ea5e9;
  --primary-light: #38bdf8;
  --primary-dark: #0284c7;
  
  --secondary: #0f766e;
  --secondary-light: #14b8a6;
  --secondary-dark: #115e59;
  
  --accent: #06b6d4;
  --accent-light: #22d3ee;
  --accent-dark: #0891b2;
}

/* Thème Sunset - Orange/Rose sunset */
[data-theme='sunset'] {
  --primary: #f97316;
  --primary-light: #fb923c;
  --primary-dark: #ea580c;
  
  --secondary: #be123c;
  --secondary-light: #fb7185;
  --secondary-dark: #9f1239;
  
  --accent: #f59e0b;
  --accent-light: #fbbf24;
  --accent-dark: #d97706;
}
```

***

## 🔄 Guide de Migration des Composants

### **Règle Générale**

**Pour CHAQUE composant** :
1. Ouvrir le fichier `.vue`
2. Chercher les anciennes variables dans `<style scoped>`
3. Remplacer selon le tableau de migration
4. Tester visuellement en light ET dark mode

***

### **Mapping de Remplacement (Find & Replace)**

#### **Backgrounds**

```css
/* ❌ Ancien → ✅ Nouveau */
background-color: var(--neutral-white)  →  background-color: var(--bg-base)
background-color: var(--neutral-light)  →  background-color: var(--bg-subtle)
background: var(--neutral-white)        →  background: var(--bg-base)
```

#### **Textes**

```css
/* ❌ Ancien → ✅ Nouveau */
color: var(--neutral-black)  →  color: var(--text-strong)
color: var(--neutral-dark)   →  color: var(--text-base)
color: var(--neutral-medium) →  color: var(--text-subtle)
color: var(--neutral-white)  →  color: var(--text-inverse)  /* Si sur fond foncé */
color: var(--neutral-white)  →  color: var(--bg-base)       /* Si inverse du fond */
```

#### **Bordures**

```css
/* ❌ Ancien → ✅ Nouveau */
border-color: var(--neutral-medium)  →  border-color: var(--border-base)
border: 1px solid var(--neutral-medium)  →  border: 1px solid var(--border-base)
border-bottom: ... var(--neutral-medium) →  border-bottom: ... var(--border-base)
```

***

### **Exemples Concrets par Composant**

#### **Card.vue**

```vue
<style scoped>
/* ❌ AVANT */
.card {
  background-color: var(--neutral-white);
  border-radius: var(--radius-lg);
}

.card__header {
  padding: var(--space-md);
  border-bottom: var(--border-width) solid var(--neutral-medium);
}

.card__footer {
  padding: var(--space-md);
  border-top: var(--border-width) solid var(--neutral-medium);
  background-color: var(--neutral-light);
}

/* ✅ APRÈS */
.card {
  background-color: var(--bg-base);          /* Changé */
  border-radius: var(--radius-lg);           /* Inchangé */
}

.card__header {
  padding: var(--space-md);                  /* Inchangé */
  border-bottom: var(--border-width) solid var(--border-base); /* Changé */
}

.card__footer {
  padding: var(--space-md);                  /* Inchangé */
  border-top: var(--border-width) solid var(--border-base);    /* Changé */
  background-color: var(--bg-subtle);        /* Changé */
}
</style>
```

***

#### **Button.vue**

```vue
<style scoped>
/* ❌ AVANT */
.btn {
  display: inline-flex;
  /* ... */
}

.btn--primary {
  background-color: var(--primary);
  color: var(--neutral-white);  /* ❌ À changer */
}

.btn--outline {
  background-color: transparent;
  color: var(--primary);
  border-color: var(--primary);
}

.btn--outline:hover:not(.btn--disabled) {
  background-color: var(--primary-light);
  color: var(--neutral-white);  /* ❌ À changer */
}

/* ✅ APRÈS */
.btn {
  display: inline-flex;
  /* ... */
}

.btn--primary {
  background-color: var(--primary);
  color: var(--text-inverse);
}

.btn--outline {
  background-color: transparent;
  color: var(--primary);
  border-color: var(--primary);
}

.btn--outline:hover:not(.btn--disabled) {
  background-color: var(--primary-light);
  color: var(--text-inverse);
}
</style>
```

**Note** : La variable `--text-inverse` s'adapte automatiquement au mode (light: `#ffffff`, dark: `#171717`) pour assurer un bon contraste sur les fonds colorés.

***

#### **Switch.vue**

```vue
<style scoped>
/* ❌ AVANT */
.switch__track {
  display: inline-block;
  position: relative;
  background-color: var(--neutral-medium);  /* ❌ À changer */
  border-radius: var(--radius-full);
  transition: background-color 0.3s ease;
  flex-shrink: 0;
}

.switch__thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  background-color: var(--neutral-white);  /* ❌ À changer */
  border-radius: var(--radius-full);
  transition: transform 0.3s ease;
  box-shadow: var(--shadow-sm);
}

.switch__label {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  color: var(--neutral-black);  /* ❌ À changer */
  user-select: none;
}

/* ✅ APRÈS */
.switch__track {
  display: inline-block;
  position: relative;
  background-color: var(--border-base);  /* Changé */
  border-radius: var(--radius-full);
  transition: background-color 0.3s ease;
  flex-shrink: 0;
}

.switch__thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  background-color: var(--bg-base);  /* Changé */
  border-radius: var(--radius-full);
  transition: transform 0.3s ease;
  box-shadow: var(--shadow-sm);
}

.switch__label {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  color: var(--text-strong);  /* Changé */
  user-select: none;
}
</style>
```

***

#### **Input.vue** (à créer si pas déjà fait)

```vue
<style scoped>
.input-group__input {
  padding: var(--space-sm);
  font-size: var(--text-base);
  color: var(--text-strong);              /* Nouveau */
  background-color: var(--bg-input);      /* Nouveau */
  border: var(--border-width) solid var(--border-base);  /* Nouveau */
  border-radius: var(--radius-md);
  transition: border-color 0.2s ease;
}

.input-group__input:focus {
  outline: none;
  border-color: var(--primary);
}

.input-group__input::placeholder {
  color: var(--text-subtle);              /* Nouveau */
}
</style>
```

***

#### **Modal.vue**

```vue
<style scoped>
/* ❌ AVANT */
.modal__backdrop {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);  /* OK - Reste tel quel */
}

.modal__container {
  position: relative;
  background-color: var(--neutral-white);  /* ❌ À changer */
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 100%;
}

.modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-md);
  border-bottom: var(--border-width) solid var(--neutral-medium);  /* ❌ À changer */
}

/* ✅ APRÈS */
.modal__backdrop {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);  /* Inchangé */
}

.modal__container {
  position: relative;
  background-color: var(--bg-elevated);  /* Changé (elevated car au-dessus) */
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 100%;
}

.modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-md);
  border-bottom: var(--border-width) solid var(--border-base);  /* Changé */
}
</style>
```

***

#### **Badge.vue**

```vue
<style scoped>
/* Pas de changement nécessaire - Utilise déjà --primary, --secondary, etc. */
/* Pour les couleurs sémantiques, utiliser les variantes -light et -dark */

.badge--success {
  background-color: #d1fae5;  /* ❌ Hardcodé */
  color: var(--success);
}

/* ✅ APRÈS */
.badge--success {
  background-color: var(--success-light);
  color: var(--success-dark);
}

.badge--warning {
  background-color: var(--warning-light);
  color: var(--warning-dark);
}

.badge--error {
  background-color: var(--error-light);
  color: var(--error-dark);
}
```

***

#### **Dropdown.vue**

```vue
<style scoped>
/* ❌ AVANT */
.dropdown__trigger {
  /* ... */
  color: var(--neutral-dark);              /* ❌ À changer */
  background-color: var(--neutral-white);  /* ❌ À changer */
  border: var(--border-width) solid var(--neutral-medium);  /* ❌ À changer */
  /* ... */
}

.dropdown__menu {
  /* ... */
  background-color: var(--neutral-white);  /* ❌ À changer */
  border: var(--border-width) solid var(--neutral-medium);  /* ❌ À changer */
  /* ... */
}

.dropdown__item {
  /* ... */
  color: var(--neutral-dark);              /* ❌ À changer */
}

.dropdown__item:hover {
  background-color: var(--neutral-light);  /* ❌ À changer */
  color: var(--primary);
}

/* ✅ APRÈS */
.dropdown__trigger {
  /* ... */
  color: var(--text-base);                 /* Changé */
  background-color: var(--bg-input);       /* Changé */
  border: var(--border-width) solid var(--border-base);  /* Changé */
  /* ... */
}

.dropdown__menu {
  /* ... */
  background-color: var(--bg-elevated);    /* Changé (elevated car au-dessus) */
  border: var(--border-width) solid var(--border-base);  /* Changé */
  /* ... */
}

.dropdown__item {
  /* ... */
  color: var(--text-base);                 /* Changé */
}

.dropdown__item:hover {
  background-color: var(--bg-hover);       /* Changé */
  color: var(--primary);
}
</style>
```

***

### **Sidebar.vue (Correction des classes Tailwind)**

**Problème** : Classes Tailwind hardcodées qui ne s'adaptent pas au dark mode.

**Solution** : Utiliser les variables CSS avec arbitrary values `[]`.

```vue
<template>
  <!-- ❌ AVANT -->
  <aside class="fixed top-0 h-full bg-white shadow-2xl z-50 w-80">
    <div class="flex items-center justify-between p-6 border-b border-gray-200">
      <h3 class="text-xl font-bold text-gray-900">Navigation</h3>
      <button class="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100">
        <!-- Icône -->
      </button>
    </div>
    
    <div class="p-6">
      <nav class="flex flex-col gap-2">
        <a href="#" class="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
          Accueil
        </a>
      </nav>
    </div>
  </aside>

  <!-- ✅ APRÈS (Option 1 : Variables CSS avec arbitrary values) -->
  <aside class="fixed top-0 h-full bg-[var(--bg-base)] shadow-2xl z-50 w-80">
    <div class="flex items-center justify-between p-6 border-b border-[var(--border-base)]">
      <h3 class="text-xl font-bold text-[var(--text-strong)]">Navigation</h3>
      <button class="p-2 text-[var(--text-base)] hover:text-[var(--text-strong)] hover:bg-[var(--bg-hover)]">
        <!-- Icône -->
      </button>
    </div>
    
    <div class="p-6">
      <nav class="flex flex-col gap-2">
        <a href="#" class="px-4 py-3 text-[var(--text-base)] hover:bg-[var(--bg-hover)] hover:text-primary-600">
          Accueil
        </a>
      </nav>
    </div>
  </aside>

  <!-- ✅ APRÈS (Option 2 : Classes Tailwind avec dark:) -->
  <aside class="fixed top-0 h-full bg-white dark:bg-gray-900 shadow-2xl z-50 w-80">
    <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
      <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100">Navigation</h3>
      <button class="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800">
        <!-- Icône -->
      </button>
    </div>
    
    <div class="p-6">
      <nav class="flex flex-col gap-2">
        <a href="#" class="px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600">
          Accueil
        </a>
      </nav>
    </div>
  </aside>
</template>
```

**Recommandation** : Utiliser **Option 1** (variables CSS) pour cohérence avec les composants UI.

***

### **_typography.css (Correction blocs code)**

```css
/* ❌ AVANT */
body {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: var(--font-regular);
  line-height: var(--leading-normal);
  color: var(--neutral-black);               /* ❌ À changer */
  background-color: var(--neutral-white);    /* ❌ À changer */
  /* ... */
}

h1, h2, h3, h4, h5, h6 {
  /* ... */
  color: var(--neutral-black);               /* ❌ À changer */
  /* ... */
}

code {
  background-color: var(--neutral-light);    /* ❌ À changer */
  padding: 0.125rem 0.375rem;
  border-radius: var(--border-radius-sm);
  color: var(--error-dark);                  /* OK - Reste tel quel */
}

pre {
  background-color: var(--neutral-black);    /* ❌ PROBLÈME : s'inverse 2× */
  color: var(--neutral-white);               /* ❌ PROBLÈME : s'inverse 2× */
  padding: var(--space-md);
  border-radius: var(--border-radius-md);
  overflow-x: auto;
  margin-bottom: var(--space-md);
}

/* ✅ APRÈS */
body {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: var(--font-regular);
  line-height: var(--leading-normal);
  color: var(--text-strong);                 /* Changé */
  background-color: var(--bg-base);          /* Changé */
  /* ... */
}

h1, h2, h3, h4, h5, h6 {
  /* ... */
  color: var(--text-strong);                 /* Changé */
  /* ... */
}

code {
  background-color: var(--bg-hover);         /* Changé */
  padding: 0.125rem 0.375rem;
  border-radius: var(--border-radius-sm);
  color: var(--error-dark);                  /* Inchangé */
}

pre {
  background-color: var(--bg-code);          /* Changé (variable dédiée) */
  color: var(--text-code);                   /* Changé (variable dédiée) */
  padding: var(--space-md);
  border-radius: var(--border-radius-md);
  overflow-x: auto;
  margin-bottom: var(--space-md);
}
```

***

## 🛠️ Solution Technique (Module `@nuxtjs/color-mode`)

### **Installation**

```bash
npm install @nuxtjs/color-mode
```

### **Configuration `nuxt.config.ts`**

```typescript
export default defineNuxtConfig({
  modules: ['@nuxtjs/color-mode'],
  
  colorMode: {
    preference: 'system',      // Auto-détecte le thème système
    fallback: 'light',         // Fallback si pas de préférence
    classSuffix: '',           // Classe = "dark" (pas "dark-mode")
    storageKey: 'swave-color-mode'
  }
})
```

### **Composable de Gestion du Thème**

```typescript
// composables/useThemeManager.ts
export const useThemeManager = () => {
  const colorMode = useColorMode(); // Fourni par @nuxtjs/color-mode
  const currentTheme = useState<'default' | 'ocean' | 'sunset'>('theme', () => 'default');

  /**
   * Change le mode light/dark
   * @param mode 'light' | 'dark' | 'system'
   */
  const setColorMode = (mode: 'light' | 'dark' | 'system') => {
    colorMode.preference = mode;
  };

  /**
   * Change le thème de couleurs
   * @param theme 'default' | 'ocean' | 'sunset'
   */
  const setTheme = (theme: 'default' | 'ocean' | 'sunset') => {
    currentTheme.value = theme;
    if (process.client) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('swave-theme', theme);
    }
  };

  /**
   * Init thème au chargement (via plugin)
   */
  const initTheme = () => {
    if (process.client) {
      const savedTheme = localStorage.getItem('swave-theme') as 'default' | 'ocean' | 'sunset' | null;
      if (savedTheme) {
        setTheme(savedTheme);
      }
    }
  };

  return {
    colorMode: readonly(colorMode),
    currentTheme: readonly(currentTheme),
    setColorMode,
    setTheme,
    initTheme,
  };
};
```

### **Plugin d'Initialisation**

```typescript
// plugins/theme.client.ts
export default defineNuxtPlugin(() => {
  const { initTheme } = useThemeManager();
  initTheme();
});
```

### **Utilisation dans Header.vue**

```vue
<script setup lang="ts">
const { colorMode, currentTheme, setColorMode, setTheme } = useThemeManager();

// Toggle light/dark
const toggleColorMode = () => {
  setColorMode(colorMode.value === 'dark' ? 'light' : 'dark');
};

// Toggle theme
const toggleTheme = () => {
  const themes: Array<'default' | 'ocean' | 'sunset'> = ['default', 'ocean', 'sunset'];
  const currentIndex = themes.indexOf(currentTheme.value);
  const nextIndex = (currentIndex + 1) % themes.length;
  setTheme(themes[nextIndex]);
};
</script>

<template>
  <header>
    <!-- Toggle light/dark -->
    <button @click="toggleColorMode">
      {{ colorMode.value === 'dark' ? '☀️' : '🌙' }}
    </button>
    
    <!-- Toggle theme -->
    <button @click="toggleTheme">
      Thème: {{ currentTheme }}
    </button>
  </header>
</template>
```

***

## 📋 Plan de Développement (Phases)

### **Phase 1 : Installation `@nuxtjs/color-mode`** (30min)

**Tâches :**
1. `npm install @nuxtjs/color-mode`
2. Configurer `nuxt.config.ts`
3. Créer `composables/useThemeManager.ts`
4. Créer `plugins/theme.client.ts`
5. Mettre à jour Header.vue
6. Supprimer ancien code `initTheme()` dans Header.vue
7. Tester que le toggle light/dark fonctionne

**Validation :**
- ✅ Pas de FOUC au chargement
- ✅ Classe `.dark` appliquée sur `<html>`
- ✅ localStorage `swave-color-mode` créée
- ✅ Toggle fonctionne

***

### **Phase 2 : Remplacement `_variables.css`** (30min)

**Tâches :**
1. **Backup** de l'ancien fichier (`_variables.css.backup`)
2. Remplacer par le nouveau fichier (fourni ci-dessus)
3. Vérifier que l'app compile sans erreur

**Validation :**
- ✅ Compilation réussie
- ✅ Aucune erreur CSS dans la console

**Note** : À cette étape, certains composants afficheront des bugs visuels (normal, variables changées).

***

### **Phase 3 : Migration des Composants UI** (3h)

**Ordre de priorité** : Card, Button, Switch, Input, Modal, Badge, Dropdown

**Pour CHAQUE composant :**
1. Ouvrir le fichier `.vue`
2. Appliquer le mapping de remplacement (voir guide ci-dessus)
3. Sauvegarder
4. Tester visuellement en light mode
5. Tester visuellement en dark mode
6. Vérifier tous les états (hover, active, disabled)

**Checklist par composant :**
- [ ] Card.vue
- [ ] Button.vue
- [ ] Switch.vue
- [ ] Input.vue
- [ ] Modal.vue
- [ ] Badge.vue
- [ ] Dropdown.vue

**Validation :**
- ✅ Chaque composant lisible en light ET dark
- ✅ Tous les états fonctionnels

***

### **Phase 4 : Correction des Layouts** (1h30)

**Composants à corriger :**
- Sidebar.vue (priorité 🔴)
- Header.vue (vérifier si classes hardcodées)
- Footer.vue (vérifier si classes hardcodées)

**Méthode :**
- Remplacer classes Tailwind hardcodées par variables CSS avec `[]`
- OU ajouter classes `dark:` Tailwind
- Préférence : Variables CSS (cohérence avec composants UI)

**Validation :**
- ✅ Sidebar lisible en dark mode
- ✅ Header lisible en dark mode
- ✅ Footer lisible en dark mode

***

### **Phase 5 : Correction `_typography.css`** (30min)

**Tâches :**
1. Ouvrir `app/assets/css/_typography.css`
2. Appliquer les corrections (voir guide ci-dessus)
3. Focus sur `body`, `h1-h6`, `code`, `pre`

**Validation :**
- ✅ Textes lisibles en light ET dark
- ✅ Blocs de code lisibles en dark (pas d'inversion)

***

### **Phase 6 : Tests d'Accessibilité** (2h)

**Objectif** : Garantir que TOUS les états sont accessibles.

**Méthode de test :**

1. **Tests manuels par composant** :
   - Ouvrir la page showcase
   - Activer light mode → Tester CHAQUE composant
   - Activer dark mode → Tester CHAQUE composant
   - Changer thème (ocean, sunset) → Retester
   - Total = 6 configurations par composant

2. **Vérification contraste** :
   - Utiliser WebAIM Contrast Checker (https://webaim.org/resources/contrastchecker/)
   - Vérifier ratios :
     - Texte normal : ≥ 4.5:1 (WCAG AA)
     - Texte large (>18px) : ≥ 3:1 (WCAG AA Large)

3. **Tests automatisés (optionnel)** :
   ```bash
   npm install -D @nuxtjs/axe
   ```
   - Configurer pour tester dark mode
   - Lancer tests sur toutes les pages

**Validation :**
- ✅ Zéro bug de contraste en light mode
- ✅ Zéro bug de contraste en dark mode
- ✅ Tous les thèmes passent les tests

***

### **Phase 7 : Documentation** (1h)

**Tâches :**

1. **Mettre à jour `CLAUDE.md` dans chaque dossier** :
   ```markdown
   # Variables CSS - Utilisation
   
   ## Backgrounds
   - `--bg-base` : Fonds de base (cards, pages)
   - `--bg-subtle` : Fonds subtils (footer)
   - `--bg-elevated` : Fonds surélevés (dropdowns)
   
   ## Textes
   - `--text-strong` : Textes principaux (titres)
   - `--text-base` : Textes secondaires
   - `--text-subtle` : Textes atténués
   ```

2. **Créer guide d'utilisation global** (`docs/DESIGN_SYSTEM.md`) :
   ```markdown
   # Design System - Guide d'Utilisation
   
   ## Mode Light/Dark
   
   Géré automatiquement par `@nuxtjs/color-mode`.
   
   ### Changer le mode
   ```
   <script setup>
   const colorMode = useColorMode();
   </script>
   
   <button @click="colorMode.preference = 'dark'">Dark</button>
   ```
   
   ## Thèmes (Ocean, Sunset)
   
   ```
   <script setup>
   const { setTheme } = useThemeManager();
   </script>
   
   <button @click="setTheme('ocean')">Ocean</button>
   ```
   ```

**Validation :**
- ✅ Documentation claire et complète
- ✅ Exemples de code fonctionnels

***

## 🎯 Critères de Succès

| Critère | Métrique | Objectif |
|---------|----------|----------|
| **FOUC** | Temps de flash visible | 0ms (zéro flash) |
| **Performance** | Temps d'init thème | < 50ms |
| **Accessibilité** | Contraste WCAG AA | 100% des composants ≥ 4.5:1 |
| **Bugs visuels** | Composants illisibles | 0 (zéro bug) |
| **Maintenabilité** | Variables dupliquées | 0 (zéro doublon) |
| **Nommage** | Variables sémantiques | 100% (aucun nom de couleur) |
| **Tests** | Coverage accessibilité | 100% des pages |

***

## ⚠️ Risques et Mitigation

| Risque | Impact | Probabilité | Mitigation |
|--------|--------|-------------|------------|
| Migration cassant des composants existants | 🔴 Élevé | Moyen | Tests exhaustifs Phase 6 |
| Oubli de migrer certains composants | 🟠 Moyen | Élevé | Checklist stricte Phase 3 |
| `@nuxtjs/color-mode` incompatible | 🟡 Moyen | Faible | Tester sur projet vierge d'abord |
| Variables mal nommées | 🟡 Faible | Faible | Review par pairs |
| Performance dégradée | 🟢 Très faible | Très faible | Benchmark avant/après |

***

## 📦 Livrables

1. **Code** :
   - Nouveau `_variables.css` (architecture sémantique)
   - Composants UI migrés (7 composants)
   - Layouts corrigés (Sidebar, Header, Footer)
   - `_typography.css` corrigé
   - Composable `useThemeManager.ts`
   - Plugin `theme.client.ts`

2. **Documentation** :
   - Guide de migration (ce document)
   - `CLAUDE.md` mis à jour dans chaque dossier
   - Guide d'utilisation global

3. **Tests** :
   - Checklist validation manuelle
   - Rapport contraste accessibilité

***

## ⏱️ Estimation Temporelle

| Phase | Durée | Commentaire |
|-------|-------|-------------|
| Phase 1 : `@nuxtjs/color-mode` | 30min | Installation + config |
| Phase 2 : `_variables.css` | 30min | Remplacement fichier |
| Phase 3 : Migration composants UI | 3h | 7 composants × ~25min |
| Phase 4 : Correction layouts | 1h30 | Sidebar, Header, Footer |
| Phase 5 : Correction typography | 30min | Blocs code + body |
| Phase 6 : Tests accessibilité | 2h | Manuel + contraste |
| Phase 7 : Documentation | 1h | Guides + CLAUDE.md |
| **TOTAL** | **9h** | - |

***

## 🚀 Prochaines Étapes

1. **Validation du PRD** : Review et approbation
2. **Lancement Phase 1** : Installation `@nuxtjs/color-mode`
3. **Point d'étape** : Après Phase 3 (composants UI migrés)
4. **Release** : Après Phase 7 (tests OK)

***

## 📞 Contact & Support

Pour toute question ou problème durant la migration :
- Consulter ce PRD (source de vérité)
- Vérifier le tableau de migration (section 🔄)
- Tester en light ET dark mode systématiquement

***

**Document créé le** : 4 décembre 2025  
**Dernière mise à jour** : 4 décembre 2025  
**Version** : 1.0 (Finale)

