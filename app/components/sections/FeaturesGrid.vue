<template>
  <section class="features-grid py-16 lg:py-24" data-theme="light">
    <LayoutContainer size="xl" :padding="true">
      <!-- Header -->
      <div class="mb-12">
        <Heading :level="2" align="center" class="mb-4">{{ title }}</Heading>
        <Text v-if="subtitle" align="center">
          {{ subtitle }}
        </Text>
      </div>

      <!-- Features Grid -->
      <LayoutGrid :cols="cols" gap="lg" :responsive="{ sm: 1, md: 2, lg: cols }">
        <Card
          v-for="(feature, index) in features"
          :key="index"
          :icon="feature.icon"
          :title="feature.title"
          :description="feature.description"
          variant="elevated"
        />
      </LayoutGrid>
    </LayoutContainer>
  </section>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────┐
  │                      FEATURES GRID                          │
  │  ┌───────────────────────────────────────────────────────┐  │
  │  │  section (py-16, bg-[var(--bg-subtle)])               │  │
  │  │  ┌─────────────────────────────────────────────────┐  │  │
  │  │  │  LayoutContainer size="xl"                      │  │  │
  │  │  │                                                 │  │  │
  │  │  │  ┌───────────────────────────────────────────┐  │  │  │
  │  │  │  │  Header (text-center, mb-12)              │  │  │  │
  │  │  │  │    <h2>{{ title }}</h2>                   │  │  │  │
  │  │  │  │    <p>{{ subtitle }}</p>                  │  │  │  │
  │  │  │  └───────────────────────────────────────────┘  │  │  │
  │  │  │                                                 │  │  │
  │  │  │  ┌───────────────────────────────────────────┐  │  │  │
  │  │  │  │  LayoutGrid :cols="cols" gap="lg"        │  │  │  │
  │  │  │  │  ┌─────────┬─────────┬─────────┐         │  │  │  │
  │  │  │  │  │  Card   │  Card   │  Card   │         │  │  │  │
  │  │  │  │  │  ┌───┐  │  ┌───┐  │  ┌───┐  │         │  │  │  │
  │  │  │  │  │  │ 🎨│  │  │ ⚡│  │  │ 🔧│  │  icons  │  │  │  │
  │  │  │  │  │  └───┘  │  └───┘  │  └───┘  │         │  │  │  │
  │  │  │  │  │  Title  │  Title  │  Title  │         │  │  │  │
  │  │  │  │  │  Desc   │  Desc   │  Desc   │         │  │  │  │
  │  │  │  │  ├─────────┼─────────┼─────────┤         │  │  │  │
  │  │  │  │  │  Card   │  Card   │  Card   │         │  │  │  │
  │  │  │  │  └─────────┴─────────┴─────────┘         │  │  │  │
  │  │  │  └───────────────────────────────────────────┘  │  │  │
  │  │  │                                                 │  │  │
  │  │  └─────────────────────────────────────────────────┘  │  │
  │  └───────────────────────────────────────────────────────┘  │
  │                                                             │
  │  Props:                                                     │
  │    • title: string (requis) - Titre principal               │
  │    • subtitle: string - Sous-titre optionnel                │
  │    • features: Feature[] (requis) - Liste des features      │
  │    • cols: 2 | 3 | 4 (défaut: 3) - Colonnes desktop         │
  │                                                             │
  │  Interface Feature:                                         │
  │    { icon: string, title: string, description: string }     │
  │                                                             │
  │  Events: Aucun (présentation pure)                          │
  │                                                             │
  │  Slots: Aucun (données via props)                           │
  │                                                             │
  │  Responsive: sm=1col → md=2cols → lg=cols                   │
  └─────────────────────────────────────────────────────────────┘

  @dev Utilise Container + Grid + Card
  @dev Responsive natif via Grid
*/

// Feature interface
export interface Feature {
  icon: string;
  title: string;
  description: string;
}

// Props
interface Props {
  title: string;
  subtitle?: string;
  features: Feature[];
  cols?: 2 | 3 | 4;
}

const props = withDefaults(defineProps<Props>(), {
  cols: 3,
});
</script>

<style scoped>
/**
 * FEATURES GRID SECTION STYLES
 *
 * @dev Spacing géré par Tailwind (py-16 lg:py-24 sur <section>)
 * @dev Background géré par CSS scoped
 */

.features-grid {
  background-color: var(--bg-subtle);
}
</style>
