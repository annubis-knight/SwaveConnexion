<template>
  <div :class="[
    'container-flex',
    directionClass,
    alignClass,
    justifyClass,
    wrapClass,
    gapClass
  ]">
    <slot />
  </div>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────┐
  │                     CONTAINER FLEX                          │
  │                                                             │
  │  Vertical:                    Horizontal:                   │
  │  ┌──────────────┐            ┌────┬───┬────┬───┬────┐       │
  │  │   Item 1     │            │ 1  │gap│ 2  │gap│ 3  │       │
  │  ├──────────────┤ ← gap      └────┴───┴────┴───┴────┘       │
  │  │   Item 2     │                                           │
  │  ├──────────────┤ ← gap                                     │
  │  │   Item 3     │                                           │
  │  └──────────────┘                                           │
  │                                                             │
  │  Props:                                                     │
  │    • direction: vertical | horizontal                       │
  │    • gap: none | xs | sm | md | lg | xl                     │
  │    • align: start | center | end | stretch                  │
  │    • justify: start | center | end | between | around       │
  │    • wrap: boolean (défaut: false)                          │
  │                                                             │
  │  Slots:                                                     │
  │    • default: Items à empiler                               │
  │                                                             │
  │  Events: Aucun (wrapper passif)                             │
  └─────────────────────────────────────────────────────────────┘

  @dev CSS scoped + BEM pour structure
  @dev Tailwind pour spacing uniquement
*/

// Props
interface Props {
  direction?: 'vertical' | 'horizontal';
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  wrap?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'vertical',
  gap: 'md',
  align: 'stretch',
  justify: 'start',
  wrap: false,
});

// BEM modifiers pour structure
const directionClass = computed(() =>
  `container-flex--${props.direction}`
);

const alignClass = computed(() =>
  `container-flex--align-${props.align}`
);

const justifyClass = computed(() =>
  `container-flex--justify-${props.justify}`
);

const wrapClass = computed(() =>
  props.wrap ? 'container-flex--wrap' : ''
);

// Tailwind pour spacing uniquement
const gapClass = computed(() => {
  const gapMap = {
    none: 'gap-0',
    xs: 'gap-2',
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
  };
  return gapMap[props.gap];
});
</script>

<style scoped>
.container-flex {
  display: flex;
  width: 100%;
}

/* Direction */
.container-flex--vertical {
  flex-direction: column;
}

.container-flex--horizontal {
  flex-direction: row;
}

/* Align (align-items) */
.container-flex--align-start {
  align-items: flex-start;
}

.container-flex--align-center {
  align-items: center;
}

.container-flex--align-end {
  align-items: flex-end;
}

.container-flex--align-stretch {
  align-items: stretch;
}

/* Justify (justify-content) */
.container-flex--justify-start {
  justify-content: flex-start;
}

.container-flex--justify-center {
  justify-content: center;
}

.container-flex--justify-end {
  justify-content: flex-end;
}

.container-flex--justify-between {
  justify-content: space-between;
}

.container-flex--justify-around {
  justify-content: space-around;
}

/* Wrap */
.container-flex--wrap {
  flex-wrap: wrap;
}
</style>
