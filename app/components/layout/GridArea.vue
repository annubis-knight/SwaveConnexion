<template>
  <div :class="['grid-area', gapClass]">
    <slot />
  </div>
</template>

<script setup lang="ts">

/**
 *   <!--
    ┌─────────────────────────────────────────────────────────────┐
    │                        GRID AREA                            │
    │                                                             │
    │  ┌───────────────────────────────────────────────────────┐  │
    │  │  .grid-area                                           │  │
    │  │  ┌─────────┬─────────┐                                │  │
    │  │  │  card1  │  null   │  row 1                         │  │
    │  │  ├─────────┼─────────┤                                │  │
    │  │  │  card1  │  card2  │  row 2                         │  │
    │  │  ├─────────┼─────────┤                                │  │
    │  │  │  null   │  card3  │  row 3                         │  │
    │  │  └─────────┴─────────┘                                │  │
    │  │                                                       │  │
    │  │  areas = ['card1', null, 'card1', 'card2', null, 'card3']
    │  └───────────────────────────────────────────────────────┘  │
    │                                                             │
    │  Props:                                                     │
    │    • cols: number - Nombre de colonnes mobile (requis)      │
    │    • areas: (string|null)[] - Zones mobile (requis)         │
    │    • colsLg: number - Colonnes desktop lg: (optionnel)      │
    │    • areasLg: (string|null)[] - Zones desktop (optionnel)   │
    │    • gap: 'sm' | 'md' | 'lg' | 'xl' - Espacement entre zones│
    │                                                             │
    │  Slots:                                                     │
    │    • default: Enfants positionnés via grid-area CSS         │
    │                                                             │
    │  Events: Aucun (wrapper passif)                             │
    │                                                             │
    │  Responsive:                                                │
    │    • Mobile-first : cols/areas par défaut                   │
    │    • Desktop (lg:) : colsLg/areasLg si fournis              │
    └─────────────────────────────────────────────────────────────┘
  -->
 * GRID AREA
 *
 * @dev Composant layout pour CSS Grid avec zones nommées
 * @dev Props simplifiées : cols + tableau d'areas
 * @dev Responsive mobile-first avec colsLg/areasLg optionnels
 * @dev CSS scoped avec v-bind() pour injecter les valeurs dynamiques
 */

/* Helper: génère grid-template-areas à partir d'un tableau */
function generateGridAreas(areas: (string | null)[], cols: number): string {
  if (!areas || !Array.isArray(areas) || areas.length === 0) {
    return 'none';
  }
  const rows: string[] = [];
  for (let i = 0; i < areas.length; i += cols) {
    const row = areas
      .slice(i, i + cols)
      .map(a => a ?? '.')
      .join(' ');
    rows.push(`"${row}"`);
  }
  return rows.join(' ');
}

/* Helper: génère grid-template-columns (1fr par colonne) */
function generateGridColumns(cols: number): string {
  return Array(cols).fill('1fr').join(' ');
}

// Props
interface Props {
  cols: number;
  areas: (string | null)[];
  colsLg?: number;
  areasLg?: (string | null)[];
  gap?: 'sm' | 'md' | 'lg' | 'xl';
}

const props = withDefaults(defineProps<Props>(), {
  gap: 'md',
});

// Tailwind spacing uniquement
const gapClass = computed(() => {
  const gapMap = { sm: 'gap-4', md: 'gap-6', lg: 'gap-8', xl: 'gap-40'};
  return gapMap[props.gap];
});

// Mobile (défaut)
const gridTemplateAreas = computed(() => generateGridAreas(props.areas, props.cols));
const gridTemplateColumns = computed(() => generateGridColumns(props.cols));

// Desktop (lg:) - fallback sur mobile si non défini
const gridTemplateAreasLg = computed(() => {
  if (props.areasLg && props.colsLg) {
    return generateGridAreas(props.areasLg, props.colsLg);
  }
  return gridTemplateAreas.value;
});

const gridTemplateColumnsLg = computed(() => {
  if (props.colsLg) {
    return generateGridColumns(props.colsLg);
  }
  return gridTemplateColumns.value;
});
</script>

<style scoped>
.grid-area {
  display: grid;
  width: 100%;
  grid-template-areas: v-bind(gridTemplateAreas);
  grid-template-columns: v-bind(gridTemplateColumns);
}

@media (min-width: 1024px) {
  .grid-area {
    grid-template-areas: v-bind(gridTemplateAreasLg);
    grid-template-columns: v-bind(gridTemplateColumnsLg);
  }
}
</style>
