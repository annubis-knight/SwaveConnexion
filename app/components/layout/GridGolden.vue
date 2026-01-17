<template>
  <div :class="['grid-golden', gapClass]">
    <div class="grid-golden__primary">
      <slot name="primary" />
    </div>
    <div class="grid-golden__secondary">
      <slot name="secondary" />
    </div>
    <div class="grid-golden__tertiary">
      <slot name="tertiary" />
    </div>
  </div>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────┐
  │                       GRID GOLDEN                           │
  │                                                             │
  │  Desktop (lg:)                    Mobile (< lg)             │
  │  ┌──────────────┬────────┐        ┌──────────────────────┐  │
  │  │              │        │        │       primary        │  │
  │  │   primary    │secondary        │      (1fr height)    │  │
  │  │   (61.8%)    │(38.2%) │        ├──────────────────────┤  │
  │  │              │        │        │      secondary       │  │
  │  ├──────────────┴────────┤        │      (1fr height)    │  │
  │  │       tertiary        │        ├──────────────────────┤  │
  │  │      (100% width)     │        │       tertiary       │  │
  │  └───────────────────────┘        │      (1fr height)    │  │
  │                                   └──────────────────────┘  │
  │                                                             │
  │  Props:                                                     │
  │    • gap: 'sm' | 'md' | 'lg' | 'xl' - Espacement zones     │
  │                                                             │
  │  Slots:                                                     │
  │    • primary: Zone principale (grande, gauche desktop)      │
  │    • secondary: Zone secondaire (petite, droite desktop)    │
  │    • tertiary: Zone tertiaire (pleine largeur, bas)         │
  │                                                             │
  │  Events: Aucun (wrapper passif)                             │
  │                                                             │
  │  Responsive:                                                │
  │    • Mobile-first : stack vertical, hauteurs égales         │
  │    • Desktop (lg:) : grid 2 cols golden ratio + 1 row full  │
  └─────────────────────────────────────────────────────────────┘

  @dev CSS scoped + BEM pour structure grid
  @dev Tailwind pour spacing uniquement (gap)
  @dev Golden ratio : 1.618fr / 1fr ≈ 61.8% / 38.2%
*/

// Props
interface Props {
  gap?: 'sm' | 'md' | 'lg' | 'xl';
}

const props = withDefaults(defineProps<Props>(), {
  gap: 'md',
});

// Tailwind spacing uniquement
const gapClass = computed(() => {
  const gapMap = { sm: 'gap-4', md: 'gap-6', lg: 'gap-8', xl: 'gap-10' };
  return gapMap[props.gap];
});
</script>

<style scoped>
/* Mobile-first : stack vertical avec hauteurs égales */
.grid-golden {
  display: grid;
  width: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas:
    "primary"
    "secondary"
    "tertiary";
}

.grid-golden__primary {
  grid-area: primary;
}

.grid-golden__secondary {
  grid-area: secondary;

  @media (min-width: 1024px) {
  padding-top: 200px;
  justify-items: flex-end;
  }
}

.grid-golden__tertiary {
  grid-area: tertiary;
    @media (min-width: 1024px) {
  padding-top: 160px;
  padding-left: 200px;
  }
}

/* Desktop (lg:) : golden ratio layout */
@media (min-width: 1024px) {
  .grid-golden {
    grid-template-columns: 1fr 1.618fr;
    grid-template-rows: auto auto;
    grid-template-areas:
      "primary secondary"
      "tertiary tertiary";
  }
}
</style>
