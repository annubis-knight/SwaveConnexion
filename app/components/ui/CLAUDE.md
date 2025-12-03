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
