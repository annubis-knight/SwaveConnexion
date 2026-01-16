# Commande : Audit FOUC (Flash of Unstyled Content)

Analyse complète du projet pour détecter, diagnostiquer et corriger les problèmes de FOUC.

## Contexte du projet

$ARGUMENTS

## Qu'est-ce que le FOUC ?

Le FOUC (Flash of Unstyled Content) est un flash visible où le contenu apparaît brièvement sans styles avant que le CSS ne soit appliqué. Cela inclut :

- **FOUC classique** : HTML affiché avec styles navigateur par défaut
- **FOUT** (Flash of Unstyled Text) : Texte affiché avec police de fallback avant la custom
- **FOIT** (Flash of Invisible Text) : Texte invisible pendant le chargement de la police

## Phase 1 : Analyse du chargement CSS

### 1.1 Vérifier l'ordre de chargement

Examiner les fichiers suivants :

```
- nuxt.config.ts / vite.config.ts / next.config.js (selon le framework)
- app.vue / _app.tsx / layout.tsx (point d'entrée)
- Fichiers CSS principaux (main.css, globals.css, etc.)
```

**Points de contrôle :**
- [ ] Le CSS est-il dans le `<head>` et bloquant (pas async/defer) ?
- [ ] L'ordre d'import CSS est-il correct ? (reset → variables → base → components)
- [ ] Y a-t-il du CSS chargé via JavaScript (injection dynamique) ?
- [ ] Le CSS critique est-il inliné ou préchargé ?

### 1.2 Analyser le bundler

**Vite/Nuxt :**
- En dev, Vite injecte le CSS via JS → FOUC fréquent en développement
- Vérifier si `cssCodeSplit` est activé (peut causer des délais)

**Webpack/Next.js :**
- Vérifier la configuration `extractCSS` / `MiniCssExtractPlugin`
- CSS critique doit être extrait et inliné

## Phase 2 : Analyse des polices

### 2.1 Vérifier les déclarations @font-face

Examiner tous les fichiers CSS pour les `@font-face` :

```css
/* Propriété font-display à vérifier */
@font-face {
  font-family: 'NomPolice';
  src: url('...') format('woff2');
  font-display: ???;  /* swap | optional | fallback | block | auto */
}
```

**Impact de chaque valeur :**

| Valeur | FOUT | FOIT | Recommandation |
|--------|------|------|----------------|
| `swap` | Oui | Non | Corps de texte (lisibilité prioritaire) |
| `optional` | Non | Non* | Titres display (si preload actif) |
| `fallback` | Minime | ~100ms | Bon compromis général |
| `block` | Non | Oui (3s max) | À éviter (mauvaise UX) |
| `auto` | Dépend | Dépend | Navigateur décide (généralement block) |

*`optional` : utilise la police seulement si déjà en cache

### 2.2 Vérifier le preload des polices

Chercher dans le HTML/config :

```html
<link rel="preload" href="/fonts/..." as="font" type="font/woff2" crossorigin>
```

**Points de contrôle :**
- [ ] Les polices critiques (titres, body) sont-elles préchargées ?
- [ ] Le chemin de preload correspond-il au chemin @font-face ?
- [ ] L'attribut `crossorigin` est-il présent (obligatoire pour les fonts) ?

### 2.3 Vérifier les métriques de fallback

Pour éviter le layout shift lors du swap :

```css
@font-face {
  font-family: 'Police Custom';
  src: url('...') format('woff2');
  /* Ajuster pour matcher la police de fallback */
  size-adjust: 105%;
  ascent-override: 95%;
  descent-override: 20%;
  line-gap-override: 0%;
}
```

## Phase 3 : Analyse du framework

### 3.1 Nuxt.js / Vue

**Fichiers à examiner :**
- `nuxt.config.ts` : configuration `css`, `app.head`
- `app.vue` : point d'entrée
- `layouts/*.vue` : layouts
- `plugins/*.ts` : plugins qui pourraient injecter du CSS

**Problèmes courants :**
- CSS dans `assets/` chargé via JS en dev
- `@nuxtjs/color-mode` sans script inline → FOUC dark mode
- Composants avec `<style>` non scopé créant des conflits

### 3.2 Next.js / React

**Fichiers à examiner :**
- `next.config.js` : configuration
- `_app.tsx` / `layout.tsx` : imports CSS
- `_document.tsx` : head personnalisé

**Problèmes courants :**
- CSS-in-JS sans extraction serveur (styled-components, emotion)
- Import CSS dynamique dans les composants

### 3.3 Vite (vanilla)

**Fichiers à examiner :**
- `vite.config.ts` : configuration CSS
- `index.html` : ordre des scripts/styles
- `main.ts` : imports CSS

## Phase 4 : Tests et diagnostic

### 4.1 Test manuel avec DevTools

**Procédure de test :**

1. Ouvrir Chrome DevTools → onglet **Network**
2. Activer **Disable cache**
3. Sélectionner throttling **Slow 3G**
4. Ouvrir onglet **Performance**
5. Activer **Screenshots** (icône caméra)
6. Cliquer **Record** puis recharger la page
7. Analyser le filmstrip pour repérer les frames sans styles

**Commande console pour détecter le chargement CSS :**

```javascript
// Coller dans la console pour logger le chargement des styles
new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.name.includes('.css')) {
      console.log(`CSS loaded: ${entry.name} at ${entry.startTime}ms`);
    }
  }
}).observe({ entryTypes: ['resource'] });
```

### 4.2 Test automatisé avec Lighthouse

```bash
# Via CLI
npx lighthouse http://localhost:3000 --view --preset=desktop

# Métriques à surveiller :
# - First Contentful Paint (FCP)
# - Largest Contentful Paint (LCP)
# - Cumulative Layout Shift (CLS) → impacté par FOUT
```

### 4.3 Test des polices

```javascript
// Vérifier quand les polices sont prêtes
document.fonts.ready.then(() => {
  console.log('Toutes les polices sont chargées');
  console.log('Polices disponibles:', [...document.fonts].map(f => f.family));
});

// Observer le chargement de chaque police
document.fonts.onloadingdone = (e) => {
  console.log('Police chargée:', e.fontfaces.map(f => f.family));
};
```

## Phase 5 : Solutions et corrections

### 5.1 CSS critique inline

**Pour Nuxt :**

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  app: {
    head: {
      style: [
        {
          innerHTML: `
            /* CSS critique - variables et reset minimal */
            :root { --bg: #fff; --text: #000; }
            body { background: var(--bg); color: var(--text); }
          `,
        },
      ],
    },
  },
});
```

### 5.2 Masquer le contenu jusqu'au chargement

**Technique opacity + load event :**

```typescript
// nuxt.config.ts ou _document.tsx
{
  style: [{
    innerHTML: `
      html:not(.loaded) body { opacity: 0; }
      html.loaded body { opacity: 1; transition: opacity 0.15s; }
    `,
  }],
  script: [{
    innerHTML: `
      (function() {
        if (document.readyState === 'complete') {
          document.documentElement.classList.add('loaded');
        } else {
          window.addEventListener('load', function() {
            document.documentElement.classList.add('loaded');
          });
        }
      })();
    `,
  }],
}
```

**Alternative avec fonts.ready :**

```javascript
// Attend spécifiquement les polices
document.fonts.ready.then(() => {
  document.documentElement.classList.add('fonts-loaded');
});
```

### 5.3 Preload des ressources critiques

```html
<!-- Polices critiques -->
<link rel="preload" href="/fonts/heading.woff2" as="font" type="font/woff2" crossorigin>

<!-- CSS critique (si fichier séparé) -->
<link rel="preload" href="/css/critical.css" as="style">
```

### 5.4 Optimisation font-display

**Stratégie recommandée :**

```css
/* Titres display - optional + preload = pas de FOUC */
@font-face {
  font-family: 'Heading Font';
  src: url('/fonts/heading.woff2') format('woff2');
  font-display: optional;
}

/* Corps de texte - swap acceptable (lisibilité prioritaire) */
@font-face {
  font-family: 'Body Font';
  src: url('/fonts/body.woff2') format('woff2');
  font-display: swap;
}
```

## Phase 6 : Checklist de validation

### Avant déploiement

- [ ] CSS critique inliné dans le `<head>`
- [ ] Polices critiques préchargées avec `rel="preload"`
- [ ] `font-display` configuré selon l'usage (optional/swap/fallback)
- [ ] Pas de CSS chargé via JavaScript de manière asynchrone
- [ ] Test Lighthouse avec score LCP < 2.5s et CLS < 0.1

### Tests à effectuer

- [ ] Hard refresh (Ctrl+Shift+R) en throttling Slow 3G
- [ ] Navigation client-side (pas de FOUC sur changement de page)
- [ ] Test sur mobile réel (pas seulement émulateur)
- [ ] Test en mode incognito (pas de cache)

## Rapport d'analyse

Après avoir effectué l'audit, générer un rapport avec :

1. **Problèmes détectés** : Liste des sources de FOUC identifiées
2. **Impact** : Gravité (critique/modéré/mineur) et éléments affectés
3. **Corrections proposées** : Solutions ordonnées par priorité
4. **Plan d'implémentation** : Étapes concrètes avec fichiers à modifier

## Ressources

- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/reference)
- [Web Font Loading Strategies - Zach Leatherman](https://www.zachleat.com/web/comprehensive-webfonts)
- [CSS-Tricks Font Loading Strategies](https://css-tricks.com/the-best-font-loading-strategies-and-how-to-execute-them/)
- [Smashing Magazine - CSS Font Descriptors](https://www.smashingmagazine.com/2021/05/reduce-font-loading-impact-css-descriptors/)
