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

  // Mapping statique pour Tailwind v4 (safelist n'existe plus en v4)
  const colsClassMap: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
    7: 'grid-cols-7',
    8: 'grid-cols-8',
    9: 'grid-cols-9',
    10: 'grid-cols-10',
    11: 'grid-cols-11',
    12: 'grid-cols-12',
  };

  const colsClass = colsClassMap[props.cols];

  // Responsive columns avec mapping statique
  const smColsMap: Record<number, string> = {
    1: 'sm:grid-cols-1',
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-3',
    4: 'sm:grid-cols-4',
  };

  const mdColsMap: Record<number, string> = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  };

  const lgColsMap: Record<number, string> = {
    1: 'lg:grid-cols-1',
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
    5: 'lg:grid-cols-5',
    6: 'lg:grid-cols-6',
    12: 'lg:grid-cols-12',
  };

  const responsiveClasses = [];
  if (props.responsive?.sm && smColsMap[props.responsive.sm]) {
    responsiveClasses.push(smColsMap[props.responsive.sm]);
  }
  if (props.responsive?.md && mdColsMap[props.responsive.md]) {
    responsiveClasses.push(mdColsMap[props.responsive.md]);
  }
  if (props.responsive?.lg && lgColsMap[props.responsive.lg]) {
    responsiveClasses.push(lgColsMap[props.responsive.lg]);
  }

  return [
    'grid',
    colsClass,
    ...responsiveClasses,
    gapClasses[props.gap],
  ].filter(Boolean).join(' ');
});
</script>
