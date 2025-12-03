<template>
  <!--
    Composant Stack - Empilement vertical ou horizontal

    Description : Conteneur flex pour empiler des éléments avec espacement

    Structure (Vertical):
    ┌──────────────┐
    │   Item 1     │
    ├──────────────┤ ← gap
    │   Item 2     │
    ├──────────────┤ ← gap
    │   Item 3     │
    └──────────────┘

    Structure (Horizontal):
    ┌────┬───┬────┬───┬────┐
    │ 1  │ ↕ │ 2  │ ↕ │ 3  │
    └────┴─gap─┴────┴─gap─┴────┘

    Input (Props) :
      - direction : 'vertical' | 'horizontal' (défaut: 'vertical')
      - gap : 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' (défaut: 'md')
      - align : 'start' | 'center' | 'end' | 'stretch' (défaut: 'stretch')
      - justify : 'start' | 'center' | 'end' | 'between' | 'around' (défaut: 'start')

    Output (Events) :
      Aucun

    Slots :
      - default : Items à empiler

    @dev Tailwind utilities UNIQUEMENT (pas de CSS scoped)
    @dev flex avec flex-col (vertical) ou flex-row (horizontal)
    @dev Gap responsive : gap-{size}
  -->
  <div :class="stackClass">
    <slot />
  </div>
</template>

<script setup lang="ts">
/**
 * STACK COMPONENT
 *
 * @dev Tailwind utilities UNIQUEMENT
 * @dev flex flex-col (vertical) ou flex-row (horizontal)
 * @dev Gap configurable avec classes utilitaires
 */

// Props
interface Props {
  direction?: 'vertical' | 'horizontal';
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'vertical',
  gap: 'md',
  align: 'stretch',
  justify: 'start',
});

// Computed classes (Tailwind utilities)
const stackClass = computed(() => {
  const gapClasses = {
    none: 'gap-0',
    xs: 'gap-2',   // 8px
    sm: 'gap-4',   // 16px
    md: 'gap-6',   // 24px
    lg: 'gap-8',   // 32px
    xl: 'gap-12',  // 48px
  };

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
  };

  const directionClass = props.direction === 'vertical' ? 'flex-col' : 'flex-row';

  return [
    'flex',
    directionClass,
    gapClasses[props.gap],
    alignClasses[props.align],
    justifyClasses[props.justify],
  ].filter(Boolean).join(' ');
});
</script>
