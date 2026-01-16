<template>
  <div class="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-8 mx-auto w-full">
    <slot />
  </div>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────┐
  │                     GRID RESPONSIVE                         │
  │                                                             │
  │  Mobile (< 768px):                                          │
  │  ┌──────┬──────┬──────┬──────┐                              │
  │  │  1   │  2   │  3   │  4   │  ← 4 colonnes                │
  │  └──────┴──────┴──────┴──────┘                              │
  │                                                             │
  │  Tablet (≥ 768px):                                          │
  │  ┌────┬────┬────┬────┬────┬────┬────┬────┐                  │
  │  │ 1  │ 2  │ 3  │ 4  │ 5  │ 6  │ 7  │ 8  │  ← 8 colonnes   │
  │  └────┴────┴────┴────┴────┴────┴────┴────┘                  │
  │                                                             │
  │  Desktop (≥ 1024px):                                        │
  │  ┌──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┐                      │
  │  │1 │2 │3 │4 │5 │6 │7 │8 │9 │10│11│12│  ← 12 colonnes      │
  │  └──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┘                      │
  │                                                             │
  │  Props: Aucune (comportement fixe)                          │
  │                                                             │
  │  Slots:                                                     │
  │    • default: Grid items (col-span-*, col-start-*, etc.)    │
  │                                                             │
  │  Events: Aucun (wrapper passif)                             │
  └─────────────────────────────────────────────────────────────┘

  Grille Tailwind responsive avec colonnes fixes par breakpoint:
  - Mobile: 4 colonnes
  - Tablet (md): 8 colonnes
  - Desktop (lg): 12 colonnes
  - Gap: 32px (gap-8)

  Accueille des grid-items comme enfants.
  Utiliser col-span-*, col-start-*, etc. sur les enfants.

  @dev Full Tailwind - permet col-span-* sur les enfants
  @dev Aucune prop - comportement fixe
*/
</script>
