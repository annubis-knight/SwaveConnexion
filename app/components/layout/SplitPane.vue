<template>
  <!--
    Composant SplitPane - Panneau divisé (sidebar + main)

    Description : Layout avec sidebar et zone principale

    Structure:
    ┌─────────┬─────────────────────┐
    │         │                     │
    │ Sidebar │     Main Content    │
    │  (col)  │     (12 - col)      │
    │         │                     │
    └─────────┴─────────────────────┘
    ← col-span → ← col-span-(12-col) →

    Input (Props) :
      - leftWidth : 1-11 (défaut: 3) - Largeur sidebar en colonnes sur 12
      - gap : 'none' | 'sm' | 'md' | 'lg' | 'xl' (défaut: 'md')
      - collapsible : boolean (défaut: false) - Sidebar collapsible sur mobile
      - fullHeight : boolean (défaut: false) - min-h-screen

    Output (Events) :
      Aucun

    Slots :
      - left : Contenu sidebar (requis)
      - right : Contenu principal (requis)

    @dev Tailwind utilities UNIQUEMENT (pas de CSS scoped)
    @dev grid grid-cols-12 avec col-span-{n}
    @dev Responsive: mobile stack vertical, desktop side-by-side
  -->
  <div :class="splitPaneClass">
    <div :class="leftPaneClass">
      <slot name="left" />
    </div>
    <div :class="rightPaneClass">
      <slot name="right" />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * SPLIT PANE COMPONENT
 *
 * @dev Tailwind utilities UNIQUEMENT
 * @dev grid grid-cols-12 avec col-span-{n}
 * @dev Responsive: mobile stack, desktop split
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

// Computed classes (Tailwind utilities)
const splitPaneClass = computed(() => {
  const gapClasses = {
    none: 'gap-0',
    sm: 'gap-4',   // 16px
    md: 'gap-6',   // 24px
    lg: 'gap-8',   // 32px
    xl: 'gap-12',  // 48px
  };

  return [
    'grid',
    'grid-cols-1',           // Mobile: stack vertical
    'lg:grid-cols-12',       // Desktop: 12 colonnes
    gapClasses[props.gap],
    props.fullHeight && 'min-h-screen',
  ].filter(Boolean).join(' ');
});

// Left pane (sidebar)
const leftPaneClass = computed(() => {
  // Map leftWidth to col-span classes
  const colSpanClasses = {
    1: 'lg:col-span-1',
    2: 'lg:col-span-2',
    3: 'lg:col-span-3',
    4: 'lg:col-span-4',
    5: 'lg:col-span-5',
    6: 'lg:col-span-6',
    7: 'lg:col-span-7',
    8: 'lg:col-span-8',
    9: 'lg:col-span-9',
    10: 'lg:col-span-10',
    11: 'lg:col-span-11',
  };

  return [
    'w-full',
    colSpanClasses[props.leftWidth],
    props.collapsible && 'lg:block hidden',  // Hidden on mobile if collapsible
  ].filter(Boolean).join(' ');
});

// Right pane (main content)
const rightPaneClass = computed(() => {
  // Calculate remaining columns (12 - leftWidth)
  const rightWidth = 12 - props.leftWidth;

  const colSpanClasses = {
    1: 'lg:col-span-1',
    2: 'lg:col-span-2',
    3: 'lg:col-span-3',
    4: 'lg:col-span-4',
    5: 'lg:col-span-5',
    6: 'lg:col-span-6',
    7: 'lg:col-span-7',
    8: 'lg:col-span-8',
    9: 'lg:col-span-9',
    10: 'lg:col-span-10',
    11: 'lg:col-span-11',
  };

  return [
    'w-full',
    colSpanClasses[rightWidth as keyof typeof colSpanClasses],
  ].filter(Boolean).join(' ');
});
</script>
