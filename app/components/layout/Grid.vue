<template>
  <!--
    Composant Grid - Système de grille configurable

    Description : Grille responsive avec colonnes configurables

    Structure:
    ┌──────────┬──────────┬──────────┐
    │  Col 1   │  Col 2   │  Col 3   │
    │          │          │          │
    ├──────────┼──────────┼──────────┤
    │  Col 4   │  Col 5   │  Col 6   │
    └──────────┴──────────┴──────────┘

    Input (Props) :
      - cols : 1-12 (défaut: 3) - Nombre de colonnes desktop
      - gap : 'sm' | 'md' | 'lg' | 'xl' (défaut: 'md') - Espacement entre items
      - responsive : object { sm?: number, md?: number, lg?: number } - Colonnes par breakpoint

    Output (Events) :
      Aucun

    Slots :
      - default : Items de la grille

    @dev Tailwind utilities UNIQUEMENT (pas de CSS scoped)
    @dev Responsive: mobile 1 col → tablet responsive.md → desktop cols
  -->
  <div :class="gridClass">
    <slot />
  </div>
</template>

<script setup lang="ts">
/**
 * GRID COMPONENT
 *
 * @dev Tailwind utilities UNIQUEMENT
 * @dev grid grid-cols-{n} avec gap configurable
 * @dev Responsive natif avec breakpoints Tailwind
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

// Computed classes (Tailwind utilities)
const gridClass = computed(() => {
  const gapClasses = {
    sm: 'gap-4',   // 16px
    md: 'gap-6',   // 24px
    lg: 'gap-8',   // 32px
    xl: 'gap-12',  // 48px
  };

  const colsClass = `grid-cols-${props.cols}`;

  // Responsive columns
  const responsiveClasses = [];
  if (props.responsive?.sm) {
    responsiveClasses.push(`sm:grid-cols-${props.responsive.sm}`);
  }
  if (props.responsive?.md) {
    responsiveClasses.push(`md:grid-cols-${props.responsive.md}`);
  }
  if (props.responsive?.lg) {
    responsiveClasses.push(`lg:grid-cols-${props.responsive.lg}`);
  }

  return [
    'grid',
    'grid-cols-1', // Mobile par défaut
    ...responsiveClasses,
    colsClass,
    gapClasses[props.gap],
  ].filter(Boolean).join(' ');
});
</script>
