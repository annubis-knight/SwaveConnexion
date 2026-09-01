<template>
  <section class="page-benefits-sticky py-16 lg:py-0" data-theme="light">
    <LayoutContainerMax>
      <div class="page-benefits-sticky__layout">
        <!-- Sticky sidebar -->
        <div class="page-benefits-sticky__sidebar">
          <div class="page-benefits-sticky__sidebar-inner">
            <div class="page-benefits-sticky__badge">
              <span class="page-benefits-sticky__badge-dot"></span>
              <Text as="span" size="sm" weight="semibold">{{ badge }}</Text>
            </div>

            <Heading :level="2" class="page-benefits-sticky__title">
              {{ titleLine1 }}<br />
              <span class="page-benefits-sticky__title-accent">{{ titleLine2 }}</span>
            </Heading>

            <Text size="base" class="page-benefits-sticky__intro">
              {{ intro }}
            </Text>

            <!-- Progress indicator -->
            <div class="page-benefits-sticky__progress">
              <div
                v-for="(benefit, index) in benefits"
                :key="index"
                class="page-benefits-sticky__progress-item"
              >
                <span class="page-benefits-sticky__progress-number">{{ index + 1 }}</span>
                <span class="page-benefits-sticky__progress-label">{{ benefit.shortTitle }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Scrollable cards -->
        <div class="page-benefits-sticky__cards">
          <div
            v-for="(benefit, index) in benefits"
            :key="index"
            class="page-benefits-sticky__card"
          >
            <div class="page-benefits-sticky__card-header">
              <div class="page-benefits-sticky__card-icon">
                <component :is="benefit.icon" />
              </div>
              <span class="page-benefits-sticky__card-index">{{ String(index + 1).padStart(2, '0') }}</span>
            </div>

            <Heading :level="3" class="page-benefits-sticky__card-title">
              {{ benefit.title }}
            </Heading>

            <Text size="base" class="page-benefits-sticky__card-text">
              {{ benefit.description }}
            </Text>

            <!-- Highlight quote -->
            <blockquote v-if="benefit.quote" class="page-benefits-sticky__quote">
              <Text as="span" size="lg" weight="medium" style="font-style: italic;">
                "{{ benefit.quote }}"
              </Text>
              <Text as="cite" size="sm" class="page-benefits-sticky__quote-author">
                — {{ benefit.quoteAuthor }}
              </Text>
            </blockquote>
          </div>
        </div>
      </div>
    </LayoutContainerMax>
  </section>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                       PAGE BENEFITS STICKY                                   │
  │                                                                              │
  │  Version sticky: Sidebar fixe à gauche, cards défilantes à droite            │
  │  Design immersif inspiré des sites premium/portfolio                         │
  │                                                                              │
  │  STRUCTURE (Desktop):                                                        │
  │  ┌────────────────────────────────────────────────────────────────────────┐  │
  │  │  section.page-benefits-sticky                                         │  │
  │  │  └─ LayoutContainerMax                                                │  │
  │  │       └─ __layout (grid 2 cols)                                       │  │
  │  │            ┌──────────────┬────────────────────────────┐              │  │
  │  │            │  __sidebar   │  __cards (scroll)          │              │  │
  │  │            │  (sticky)    │  ├─ __card                 │              │  │
  │  │            │  ├─ badge    │  ├─ __card                 │              │  │
  │  │            │  ├─ Heading  │  └─ __card                 │              │  │
  │  │            │  ├─ Text     │                            │              │  │
  │  │            │  └─ progress │                            │              │  │
  │  │            └──────────────┴────────────────────────────┘              │  │
  │  └────────────────────────────────────────────────────────────────────────┘  │
  │                                                                              │
  │  Props: badge, titleLine1, titleLine2, intro, benefits[]                     │
  │  Events: Aucun                                                               │
  └─────────────────────────────────────────────────────────────────────────────┘
*/

import { h, computed, type FunctionalComponent } from 'vue';

/* Types */
interface Benefit {
  icon: FunctionalComponent;
  shortTitle: string;
  title: string;
  description: string;
  quote?: string;
  quoteAuthor?: string;
}

interface Props {
  badge?: string;
  titleLine1?: string;
  titleLine2?: string;
  intro?: string;
}

const props = withDefaults(defineProps<Props>(), {
  badge: 'L\'expérience Swave',
  titleLine1: 'Pourquoi des centaines',
  titleLine2: 'de débutants nous choisissent',
  intro: 'Parce qu\'apprendre à danser, c\'est bien plus qu\'une technique. C\'est une expérience humaine.',
});

/* Icons SVG */
const IconMusic: FunctionalComponent = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z' })
]);

const IconGroup: FunctionalComponent = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z' })
]);

const IconTrophy: FunctionalComponent = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z' })
]);

/* Benefits data */
const benefits = computed<Benefit[]>(() => [
  {
    icon: IconMusic,
    shortTitle: 'Fun',
    title: 'Redécouvre le plaisir de bouger',
    description: 'La bachata, c\'est avant tout une invitation au lâcher-prise. Ici, pas de performance à atteindre, pas de regard critique. Juste toi, la musique, et cette sensation unique quand ton corps commence à comprendre le rythme. Chaque cours se termine avec le sourire.',
    quote: 'Je n\'avais pas dansé depuis le lycée. Après 3 cours, j\'attends la prochaine session avec impatience !',
    quoteAuthor: 'Marie, 34 ans',
  },
  {
    icon: IconGroup,
    shortTitle: 'Méthode',
    title: 'Une pédagogie qui te respecte',
    description: 'On sait que débuter peut être intimidant. C\'est pourquoi notre méthode est pensée pour toi : explications claires, démonstrations lentes, temps de pratique généreux. On ne te laisse jamais perdu. Et si tu as besoin de revoir un pas ? Aucun problème, c\'est normal.',
    quote: 'Enfin des profs qui prennent le temps d\'expliquer sans te faire sentir bête.',
    quoteAuthor: 'Thomas, 28 ans',
  },
  {
    icon: IconTrophy,
    shortTitle: 'Expertise',
    title: 'L\'excellence au service de ta progression',
    description: 'Nos instructeurs ont dansé sur les plus grandes scènes internationales. Mais ce qui les distingue vraiment ? Leur capacité à transmettre. Ils voient ce que tu ne vois pas, corrigent avec bienveillance, et célèbrent chacune de tes victoires, même les petites.',
    quote: 'Des pros qui restent accessibles et passionnés. Ça change tout.',
    quoteAuthor: 'Sofia, 41 ans',
  },
]);
</script>

<style scoped>
/**
 * PAGE BENEFITS STICKY - Sidebar fixe + cards défilantes
 * Design premium avec progression visuelle
 */

.page-benefits-sticky {
  background-color: var(--bg-base);
}

/* Layout */
.page-benefits-sticky__layout {
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 380px 1fr;
    gap: 5rem;
    min-height: 100vh;
  }
}

/* Sidebar */
.page-benefits-sticky__sidebar {
  @media (min-width: 1024px) {
    position: relative;
  }
}

.page-benefits-sticky__sidebar-inner {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    position: sticky;
    top: 100px;
    padding: 2rem 0;
  }
}

.page-benefits-sticky__badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--primary);
}

.page-benefits-sticky__badge-dot {
  width: 8px;
  height: 8px;
  background: var(--primary);
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.page-benefits-sticky__title-accent {
  color: var(--primary);
}

.page-benefits-sticky__intro {
  color: var(--text-base);
  line-height: 1.6;
}

/* Progress indicator */
.page-benefits-sticky__progress {
  display: none;

  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid var(--border-base);
  }
}

.page-benefits-sticky__progress-item {
  display: flex;
  align-items: center;
  gap: 12px;
  opacity: 0.5;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
}

.page-benefits-sticky__progress-number {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-subtle);
  border-radius: 8px;
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 600;
  color: var(--primary);
}

.page-benefits-sticky__progress-label {
  font-family: var(--font-sans);
  font-size: 14px;
  color: var(--text-base);
}

/* Cards */
.page-benefits-sticky__cards {
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media (min-width: 1024px) {
    gap: 0;
    padding: 4rem 0;
  }
}

.page-benefits-sticky__card {
  padding: 2rem;
  background: var(--bg-subtle);
  border-radius: 20px;

  @media (min-width: 1024px) {
    padding: 3rem;
    margin-bottom: 3rem;
    background: var(--bg-base);
    border: 1px solid var(--border-base);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateX(8px);
      box-shadow: -8px 8px 40px rgba(0, 0, 0, 0.08);
    }
  }
}

.page-benefits-sticky__card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.page-benefits-sticky__card-icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary), var(--primary-light));
  border-radius: 14px;

  & svg {
    width: 28px;
    height: 28px;
    color: var(--text-inverse);
  }
}

.page-benefits-sticky__card-index {
  font-family: var(--font-display);
  font-size: 3rem;
  font-weight: 700;
  color: var(--primary);
  opacity: 0.15;
  line-height: 1;
}

.page-benefits-sticky__card-title {
  margin-bottom: 1rem;
}

.page-benefits-sticky__card-text {
  color: var(--text-base);
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

/* Quote */
.page-benefits-sticky__quote {
  padding: 1.5rem;
  background: rgba(15, 143, 197, 0.05);
  border-left: 3px solid var(--primary);
  border-radius: 0 12px 12px 0;
  margin: 0;
}

.page-benefits-sticky__quote-author {
  display: block;
  margin-top: 0.75rem;
  color: var(--text-subtle);
  font-style: normal;
}
</style>
