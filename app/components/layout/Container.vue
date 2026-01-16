<template>
  <div :class="['container', sizeClass, paddingClass]">
    <slot />
  </div>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────┐
  │                       CONTAINER                             │
  │  ┌───────────────────────────────────────────────────────┐  │
  │  │ ←─ padding-x ─→   ←─── max-w-{size} ───→   ←─ px ─→  │  │
  │  │  ┌─────────────────────────────────────────────────┐  │  │
  │  │  │                                                 │  │  │
  │  │  │  [slot: default] ← contenu centré               │  │  │
  │  │  │                                                 │  │  │
  │  │  └─────────────────────────────────────────────────┘  │  │
  │  └───────────────────────────────────────────────────────┘  │
  │                                                             │
  │  Props:                                                     │
  │    • size: sm|md|lg|xl|2xl|full - Max-width                 │
  │    • padding: boolean - Padding horizontal                  │
  │                                                             │
  │  Slots:                                                     │
  │    • default: Contenu du container                          │
  │                                                             │
  │  Events: Aucun (wrapper passif)                             │
  │                                                             │
  │  Sizes: sm=640px, md=768px, lg=1024px, xl=1280px, 2xl=1536px│
  └─────────────────────────────────────────────────────────────┘

  @dev CSS scoped + BEM pour structure
  @dev Tailwind pour spacing uniquement
*/

// Props
interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'full',
  padding: true,
});

// BEM modifier pour size
const sizeClass = computed(() => `container--${props.size}`);

// Tailwind pour padding (spacing)
const paddingClass = computed(() =>
  props.padding ? 'px-6 md:px-8' : ''
);
</script>

<style scoped>
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.container--sm { max-width: 640px; }
.container--md { max-width: 768px; }
.container--lg { max-width: 1024px; }
.container--xl { max-width: 1280px; }
.container--2xl { max-width: 1536px; }
.container--full { max-width: 100%; }
</style>
