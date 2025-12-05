<template>
  <!--
    Composant FeaturesGrid - Grille de fonctionnalités/features

    Description : Section présentant des features sous forme de grille avec icônes

    Structure:
    ┌──────────────────────────────────────────────┐
    │         Container (max-width)                │
    │  ┌────────────────────────────────────────┐  │
    │  │           Titre + Sous-titre          │  │
    │  └────────────────────────────────────────┘  │
    │  ┌──────┬──────┬──────┐                     │
    │  │ Icon │ Icon │ Icon │                     │
    │  │Title │Title │Title │  Grid responsive    │
    │  │Desc  │Desc  │Desc  │                     │
    │  ├──────┼──────┼──────┤                     │
    │  │ Icon │ Icon │ Icon │                     │
    │  └──────┴──────┴──────┘                     │
    └──────────────────────────────────────────────┘

    Input (Props) :
      - title : string (requis) - Titre principal
      - subtitle : string (optionnel) - Sous-titre
      - features : Feature[] (requis) - Liste des features
      - cols : 2 | 3 | 4 (défaut: 3) - Nombre de colonnes desktop

    Interface Feature :
      - icon : string - Emoji ou texte icône
      - title : string - Titre de la feature
      - description : string - Description courte

    Output (Events) :
      Aucun

    Slots :
      Aucun (données via props)

    @dev Utilise LayoutContainer et LayoutGrid de Phase 9
    @dev Tailwind utilities pour styling
    @dev Responsive: mobile 1 col → tablet 2 → desktop cols
  -->
  <section class="py-16 bg-[var(--bg-subtle)]">
    <LayoutContainer size="xl" :padding="true">
      <!-- Header -->
      <div class="text-center mb-12">
        <h2 class="mb-4">{{ title }}</h2>
        <p v-if="subtitle">
          {{ subtitle }}
        </p>
      </div>

      <!-- Features Grid -->
      <LayoutGrid
        :cols="cols"
        gap="lg"
        :responsive="{ sm: 1, md: 2, lg: cols }"
      >
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="p-6 rounded-lg shadow-sm bg-[var(--bg-base)]"
        >
          <!-- Icon -->
          <div class="flex items-center justify-center w-12 h-12 rounded-lg text-2xl mb-4">
            {{ feature.icon }}
          </div>

          <!-- Title -->
          <h3>
            {{ feature.title }}
          </h3>

          <!-- Description -->
          <p>
            {{ feature.description }}
          </p>
        </div>
      </LayoutGrid>
    </LayoutContainer>
  </section>
</template>

<script setup lang="ts">
/**
 * FEATURES GRID COMPONENT (PHASE 10)
 *
 * @dev Utilise Container + Grid de Phase 9
 * @dev Tailwind utilities pour styling
 * @dev Cartes avec hover effect
 * @dev Responsive natif via Grid
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
