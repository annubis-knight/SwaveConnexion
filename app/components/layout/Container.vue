<template>
  <!--
    Composant Container - Wrapper responsive

    Description : Container avec max-width responsive et padding

    Structure:
    ┌────────────────────────────────────┐
    │ ←─ padding-x                    ─→ │
    │  ┌──────────────────────────┐     │
    │  │   max-w-{size} mx-auto   │     │
    │  │   Content here           │     │
    │  └──────────────────────────┘     │
    └────────────────────────────────────┘

    Input (Props) :
      - size : 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' (défaut: 'lg')
      - padding : boolean (défaut: true) - Active le padding horizontal

    Output (Events) :
      Aucun

    Slots :
      - default : Contenu du container

    @dev Tailwind utilities UNIQUEMENT (pas de CSS scoped)
    @dev Sizes: sm=640px, md=768px, lg=1024px, xl=1280px, 2xl=1536px, full=100%
  -->
  <div :class="containerClass">
    <slot />
  </div>
</template>

<script setup lang="ts">
/**
 * CONTAINER COMPONENT
 *
 * @dev Tailwind utilities UNIQUEMENT
 * @dev max-width responsive avec mx-auto pour centrer
 * @dev padding optionnel (px-6 md:px-8)
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

// Computed classes (Tailwind utilities)
const containerClass = computed(() => {
  const sizeClasses = {
    sm: 'max-w-sm',      // 640px
    md: 'max-w-md',      // 768px
    lg: 'max-w-lg',      // 1024px
    xl: 'max-w-xl',      // 1280px
    '2xl': 'max-w-2xl',  // 1536px
    full: 'max-w-full',  // 100%
  };

  return [
    'w-full',
    'container-center',  // Custom class pour margin: 0 auto (au lieu de mx-auto qui utilise margin-inline)
    sizeClasses[props.size],
    props.padding && 'px-6 md:px-8',
  ].filter(Boolean).join(' ');
});
</script>

<style scoped>
/**
 * CONTAINER STYLES
 *
 * @dev Custom class pour centrage horizontal traditionnel
 * @dev Tailwind v4 mx-auto utilise margin-inline au lieu de margin-left/right
 */

.container-center {
  margin-left: auto;
  margin-right: auto;
}
</style>
