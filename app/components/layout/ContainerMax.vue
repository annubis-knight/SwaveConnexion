<template>
  <div class="container-max" :style="maxWidthStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────┐
  │                     CONTAINER MAX                           │
  │                                                             │
  │  ┌─ mx-4 ─┐ ┌──────────────────────────────┐ ┌─ mx-4 ─┐    │
  │  │        │ │      max-width: 1300px       │ │        │    │
  │  │        │ │  ┌────────────────────────┐  │ │        │    │
  │  │ mobile │ │  │                        │  │ │ mobile │    │
  │  │ margin │ │  │   [slot: default]      │  │ │ margin │    │
  │  │        │ │  │                        │  │ │        │    │
  │  │        │ │  └────────────────────────┘  │ │        │    │
  │  └────────┘ └──────────────────────────────┘ └────────┘    │
  │                                                             │
  │  Breakpoints:                                               │
  │    • Mobile  : mx-4 (16px margins)                          │
  │    • Tablet  : mx-8 (32px margins)                          │
  │    • Desktop : mx-auto, w-[90%], max-width appliqué         │
  │                                                             │
  │  Props:                                                     │
  │    • maxWidth: string - Max-width CSS (default: 1300px)     │
  │                                                             │
  │  Slots:                                                     │
  │    • default: Contenu limité en largeur                     │
  │                                                             │
  │  Events: Aucun (wrapper passif)                             │
  └─────────────────────────────────────────────────────────────┘

  Limite la largeur du contenu pour une meilleure lisibilité sur grands écrans.
  Centre le contenu avec une max-width configurable (1300px par défaut).

  @dev CSS scoped + BEM pour structure
  @dev Tailwind pour spacing uniquement (margins)
*/

// Props
interface Props {
  maxWidth?: string;
}

const props = withDefaults(defineProps<Props>(), {
  maxWidth: '1300px',
});

// Style dynamique pour max-width
const maxWidthStyle = computed(() => ({
  maxWidth: props.maxWidth,
}));
</script>

<style scoped>
.container-max {
  margin-left: 1rem;
  margin-right: 1rem;
  min-width: 0;
  height: 100%;
}

/* Tablet */
@media (min-width: 768px) {
  .container-max {
    margin-left: 2rem;
    margin-right: 2rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container-max {
    margin-left: auto;
    margin-right: auto;
    width: 90%;
  }
}
</style>
