<template>
  <div :class="['split-pane', fullHeightClass, gapClass]">
    <div :class="['split-pane__left', leftColClass, collapsibleClass]">
      <slot name="left" />
    </div>
    <div :class="['split-pane__right', rightColClass]">
      <slot name="right" />
    </div>
  </div>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────┐
  │                       SPLITPANE                             │
  │  ┌───────────────────────────────────────────────────────┐  │
  │  │  ┌─────────────┬─────────────────────────────────┐    │  │
  │  │  │             │                                 │    │  │
  │  │  │ [slot:left] │        [slot:right]             │    │  │
  │  │  │   Sidebar   │        Main Content             │    │  │
  │  │  │ col-span-N  │        col-span-(12-N)          │    │  │
  │  │  │             │                                 │    │  │
  │  │  └─────────────┴─────────────────────────────────┘    │  │
  │  │  ← leftWidth →   ←───────── gap ─────────→            │  │
  │  └───────────────────────────────────────────────────────┘  │
  │                                                             │
  │  Props:                                                     │
  │    • leftWidth: 1-11 - Largeur sidebar (sur 12 colonnes)    │
  │    • gap: none | sm | md | lg | xl - Espacement             │
  │    • collapsible: boolean - Sidebar cachée sur mobile       │
  │    • fullHeight: boolean - min-h-screen                     │
  │                                                             │
  │  Slots:                                                     │
  │    • left: Contenu sidebar (requis)                         │
  │    • right: Contenu principal (requis)                      │
  │                                                             │
  │  Events: Aucun (wrapper passif)                             │
  │                                                             │
  │  Responsive: mobile stack vertical, desktop side-by-side    │
  └─────────────────────────────────────────────────────────────┘

  @dev CSS scoped + BEM pour structure
  @dev Tailwind pour spacing uniquement
*/

// Props
interface Props {
  leftWidth?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  collapsible?: boolean;
  fullHeight?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  leftWidth: 3,
  gap: 'md',
  collapsible: false,
  fullHeight: false,
});

// BEM modifiers pour structure
const leftColClass = computed(() =>
  `split-pane__left--col-${props.leftWidth}`
);

const rightColClass = computed(() => {
  const rightWidth = 12 - props.leftWidth;
  return `split-pane__right--col-${rightWidth}`;
});

const collapsibleClass = computed(() =>
  props.collapsible ? 'split-pane__left--collapsible' : ''
);

const fullHeightClass = computed(() =>
  props.fullHeight ? 'split-pane--full-height' : ''
);

// Tailwind pour spacing uniquement
const gapClass = computed(() => {
  const gapMap = {
    none: 'gap-0',
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
  };
  return gapMap[props.gap];
});
</script>

<style scoped>
.split-pane {
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
}

.split-pane--full-height {
  min-height: 100vh;
}

.split-pane__left,
.split-pane__right {
  width: 100%;
}

/* Collapsible: hidden on mobile */
.split-pane__left--collapsible {
  display: none;
}

/* Desktop: 12 colonnes */
@media (min-width: 1024px) {
  .split-pane {
    grid-template-columns: repeat(12, minmax(0, 1fr));
  }

  .split-pane__left--collapsible {
    display: block;
  }

  /* Left pane col-span */
  .split-pane__left--col-1 { grid-column: span 1; }
  .split-pane__left--col-2 { grid-column: span 2; }
  .split-pane__left--col-3 { grid-column: span 3; }
  .split-pane__left--col-4 { grid-column: span 4; }
  .split-pane__left--col-5 { grid-column: span 5; }
  .split-pane__left--col-6 { grid-column: span 6; }
  .split-pane__left--col-7 { grid-column: span 7; }
  .split-pane__left--col-8 { grid-column: span 8; }
  .split-pane__left--col-9 { grid-column: span 9; }
  .split-pane__left--col-10 { grid-column: span 10; }
  .split-pane__left--col-11 { grid-column: span 11; }

  /* Right pane col-span */
  .split-pane__right--col-1 { grid-column: span 1; }
  .split-pane__right--col-2 { grid-column: span 2; }
  .split-pane__right--col-3 { grid-column: span 3; }
  .split-pane__right--col-4 { grid-column: span 4; }
  .split-pane__right--col-5 { grid-column: span 5; }
  .split-pane__right--col-6 { grid-column: span 6; }
  .split-pane__right--col-7 { grid-column: span 7; }
  .split-pane__right--col-8 { grid-column: span 8; }
  .split-pane__right--col-9 { grid-column: span 9; }
  .split-pane__right--col-10 { grid-column: span 10; }
  .split-pane__right--col-11 { grid-column: span 11; }
}
</style>
