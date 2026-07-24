<template>
  <section class="page-benefits-classic py-16 lg:py-24" data-theme="light">
    <LayoutContainerMax>
      <!-- Header -->
      <div class="page-benefits-classic__header">
        <div class="page-benefits-classic__badge">
          <Text as="span" size="sm" weight="semibold" transform="uppercase" tracking="wide">
            {{ badge }}
          </Text>
        </div>

        <Heading :level="2" class="page-benefits-classic__title">
          {{ titleLine1 }}<br />
          <span class="page-benefits-classic__title-accent">{{ titleLine2 }}</span>
        </Heading>

        <Text size="lg" weight="light" maxWidth="lg" class="page-benefits-classic__intro">
          {{ intro }}
        </Text>
      </div>

      <!-- Cards Grid -->
      <div class="page-benefits-classic__grid">
        <div
          v-for="(benefit, index) in benefits"
          :key="index"
          class="page-benefits-classic__card"
        >
          <!-- Icon -->
          <div class="page-benefits-classic__icon">
            <component :is="benefit.icon" />
          </div>

          <!-- Content -->
          <Heading :level="4" class="page-benefits-classic__card-title">
            {{ benefit.title }}
          </Heading>

          <Text size="base" class="page-benefits-classic__card-text">
            {{ benefit.description }}
          </Text>
        </div>
      </div>
    </LayoutContainerMax>
  </section>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                       PAGE BENEFITS CLASSIC                                  │
  │                                                                              │
  │  Version classique: Header centré + 3 cards en grille                        │
  │  Layout simple et efficace, inspiré des meilleures pratiques SaaS            │
  │                                                                              │
  │  STRUCTURE:                                                                  │
  │  ┌────────────────────────────────────────────────────────────────────────┐  │
  │  │  section.page-benefits-classic                                        │  │
  │  │  └─ LayoutContainerMax                                                │  │
  │  │       ├─ __header (centré)                                            │  │
  │  │       │    ├─ __badge                                                 │  │
  │  │       │    ├─ Heading                                                 │  │
  │  │       │    └─ Text (intro)                                            │  │
  │  │       └─ __grid (3 colonnes desktop)                                  │  │
  │  │            ├─ __card (Fun)                                            │  │
  │  │            ├─ __card (Pédagogie)                                      │  │
  │  │            └─ __card (Expertise)                                      │  │
  │  └────────────────────────────────────────────────────────────────────────┘  │
  │                                                                              │
  │  Props: badge, titleLine1, titleLine2, intro                                 │
  │  Events: Aucun                                                               │
  └─────────────────────────────────────────────────────────────────────────────┘
*/

import { h, computed, type FunctionalComponent } from 'vue';

/* Types */
interface Benefit {
  icon: FunctionalComponent;
  title: string;
  description: string;
}

interface Props {
  badge?: string;
  titleLine1?: string;
  titleLine2?: string;
  intro?: string;
}

const props = withDefaults(defineProps<Props>(), {
  badge: 'Pourquoi nous choisir',
  titleLine1: 'Le cours parfait',
  titleLine2: 'pour débuter en confiance',
  intro: 'Tu n\'as jamais dansé ? Parfait. Notre cours débutant est conçu spécialement pour toi. Zéro prérequis, zéro stress, 100% de découverte.',
});

/* Icons SVG */
const IconFun: FunctionalComponent = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z' })
]);

const IconPedagogy: FunctionalComponent = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z' })
]);

const IconExpertise: FunctionalComponent = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' })
]);

/* Benefits data - définis comme computed pour éviter le problème de hoisting */
const benefits = computed<Benefit[]>(() => [
  {
    icon: IconFun,
    title: 'Du plaisir avant tout',
    description: 'Oublie la pression. Ici, on apprend en s\'amusant. Chaque cours est une parenthèse de bonne humeur où tu te surprendras à sourire tout en progressant.',
  },
  {
    icon: IconPedagogy,
    title: 'Une pédagogie adaptée',
    description: 'Pas de jargon compliqué, pas de jugement. Notre méthode progressive t\'accompagne pas à pas, à ton rythme, pour que tu te sentes confiant dès le premier cours.',
  },
  {
    icon: IconExpertise,
    title: 'Des experts passionnés',
    description: 'Nos instructeurs cumulent plus de 15 ans d\'expérience et ont formé des centaines de danseurs. Leur passion ? Te transmettre l\'art de la connexion en danse.',
  },
]);
</script>

<style scoped>
/**
 * PAGE BENEFITS CLASSIC - Design épuré et professionnel
 * Header centré + grille de 3 cards
 */

.page-benefits-classic {
  background-color: var(--bg-base);
}

/* Header */
.page-benefits-classic__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
  margin-bottom: 4rem;

  @media (min-width: 1024px) {
    margin-bottom: 5rem;
  }
}

.page-benefits-classic__badge {
  display: inline-flex;
  padding: 6px 16px;
  background: rgba(15, 143, 197, 0.1);
  border-radius: 20px;
  color: var(--primary);
}

.page-benefits-classic__title-accent {
  color: var(--primary);
}

.page-benefits-classic__intro {
  color: var(--text-base);
}

/* Grid */
.page-benefits-classic__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 2.5rem;
  }
}

/* Card */
.page-benefits-classic__card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem 1.5rem;
  background: var(--bg-subtle);
  border-radius: 16px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
  }
}

.page-benefits-classic__icon {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary), var(--primary-light));
  border-radius: 16px;
  margin-bottom: 1.5rem;

  & svg {
    width: 32px;
    height: 32px;
    color: var(--text-inverse);
  }
}

.page-benefits-classic__card-title {
  margin-bottom: 0.75rem;
}

.page-benefits-classic__card-text {
  color: var(--text-base);
  line-height: 1.6;
}
</style>
