<template>
  <component
    :is="tag"
    :class="headingClass"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────┐
  │                        HEADING                              │
  │  ┌───────────────────────────────────────────────────────┐  │
  │  │                                                       │  │
  │  │  <h1-h6> [slot: contenu du titre] </h1-h6>            │  │
  │  │                                                       │  │
  │  └───────────────────────────────────────────────────────┘  │
  │                                                             │
  │  Props:                                                     │
  │    • level: 1 | 2 | 3 | 4 | 5 | 6 - Niveau du heading      │
  │    • color: dark | light | primary - Couleur               │
  │    • align: left | center | right - Alignement             │
  │                                                             │
  │  Slots:                                                     │
  │    • default: Contenu du heading                            │
  │                                                             │
  │  Events: Aucun (composant de présentation pure)             │
  │                                                             │
  │  Note: Styles via _typography.css (h1-h6 globaux)           │
  └─────────────────────────────────────────────────────────────┘

  @dev Composant léger - utilise les classes globales de _typography.css
*/

// Props
interface Props {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  color?: 'dark' | 'white' | 'primary';
  align?: 'left' | 'center' | 'right';
}

const props = withDefaults(defineProps<Props>(), {
  level: 2,
});

// Tag dynamique
const tag = computed(() => `h${props.level}` as const);

// Classes globales de _typography.css
const headingClass = computed(() => {
  const classes: string[] = [];

  if (props.color) {
    classes.push(`text-${props.color}`);
  }

  if (props.align) {
    classes.push(`text-${props.align}`);
  }

  return classes.length > 0 ? classes.join(' ') : undefined;
});
</script>
