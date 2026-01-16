<template>
  <div :class="['grid', colsClass, gapClass]">
    <slot />
  </div>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────┐
  │                          GRID                               │
  │  ┌───────────────────────────────────────────────────────┐  │
  │  │  ┌──────────┬──────────┬──────────┐                   │  │
  │  │  │  Col 1   │  Col 2   │  Col 3   │  ← grid cols      │  │
  │  │  │          │          │          │                   │  │
  │  │  ├──────────┼──────────┼──────────┤  ← gap            │  │
  │  │  │  Col 4   │  Col 5   │  Col 6   │                   │  │
  │  │  └──────────┴──────────┴──────────┘                   │  │
  │  └───────────────────────────────────────────────────────┘  │
  │                                                             │
  │  Props:                                                     │
  │    • cols: 1-12 - Nombre de colonnes desktop                │
  │    • gap: sm | md | lg | xl - Espacement                    │
  │    • responsive: {sm?, md?, lg?} - Colonnes par breakpoint  │
  │                                                             │
  │  Slots:                                                     │
  │    • default: Items de la grille                            │
  │                                                             │
  │  Events: Aucun (wrapper passif)                             │
  │                                                             │
  │  Responsive: mobile 1 col → tablet → desktop cols           │
  └─────────────────────────────────────────────────────────────┘

  @dev CSS scoped + BEM pour structure
  @dev Tailwind pour spacing uniquement
*/

// Props
interface Props {
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  responsive?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
}

const props = withDefaults(defineProps<Props>(), {
  cols: 3,
  gap: 'md',
});

// BEM modifier pour colonnes
const colsClass = computed(() => {
  const classes = [`grid--cols-${props.cols}`];

  // Responsive modifiers
  if (props.responsive?.sm) {
    classes.push(`grid--sm-cols-${props.responsive.sm}`);
  }
  if (props.responsive?.md) {
    classes.push(`grid--md-cols-${props.responsive.md}`);
  }
  if (props.responsive?.lg) {
    classes.push(`grid--lg-cols-${props.responsive.lg}`);
  }

  return classes.join(' ');
});

// Tailwind pour spacing uniquement
const gapClass = computed(() => {
  const gapMap = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
  };
  return gapMap[props.gap];
});
</script>

<style scoped>
.grid {
  display: grid;
  width: 100%;
}

/* Colonnes par défaut */
.grid--cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.grid--cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.grid--cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.grid--cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.grid--cols-5 { grid-template-columns: repeat(5, minmax(0, 1fr)); }
.grid--cols-6 { grid-template-columns: repeat(6, minmax(0, 1fr)); }
.grid--cols-7 { grid-template-columns: repeat(7, minmax(0, 1fr)); }
.grid--cols-8 { grid-template-columns: repeat(8, minmax(0, 1fr)); }
.grid--cols-9 { grid-template-columns: repeat(9, minmax(0, 1fr)); }
.grid--cols-10 { grid-template-columns: repeat(10, minmax(0, 1fr)); }
.grid--cols-11 { grid-template-columns: repeat(11, minmax(0, 1fr)); }
.grid--cols-12 { grid-template-columns: repeat(12, minmax(0, 1fr)); }

/* Responsive: sm (≥640px) */
@media (min-width: 640px) {
  .grid--sm-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
  .grid--sm-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .grid--sm-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .grid--sm-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}

/* Responsive: md (≥768px) */
@media (min-width: 768px) {
  .grid--md-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
  .grid--md-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .grid--md-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .grid--md-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}

/* Responsive: lg (≥1024px) */
@media (min-width: 1024px) {
  .grid--lg-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
  .grid--lg-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .grid--lg-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .grid--lg-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .grid--lg-cols-5 { grid-template-columns: repeat(5, minmax(0, 1fr)); }
  .grid--lg-cols-6 { grid-template-columns: repeat(6, minmax(0, 1fr)); }
  .grid--lg-cols-12 { grid-template-columns: repeat(12, minmax(0, 1fr)); }
}
</style>
