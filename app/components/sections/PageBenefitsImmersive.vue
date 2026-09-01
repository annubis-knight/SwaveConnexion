<template>
  <section class="page-benefits-immersive" data-theme="dark">
    <!-- Hero header -->
    <div class="page-benefits-immersive__hero">
      <LayoutContainerMax>
        <div class="page-benefits-immersive__hero-content">
          <div class="page-benefits-immersive__hero-badge">
            <span class="page-benefits-immersive__hero-badge-icon">✦</span>
            <Text as="span" size="sm" weight="semibold">{{ badge }}</Text>
          </div>

          <Heading :level="1" class="page-benefits-immersive__hero-title">
            {{ title }}
          </Heading>

          <Text size="xl" class="page-benefits-immersive__hero-subtitle">
            {{ subtitle }}
          </Text>
        </div>
      </LayoutContainerMax>

      <!-- Decorative elements -->
      <div class="page-benefits-immersive__hero-decor page-benefits-immersive__hero-decor--1" aria-hidden="true"></div>
      <div class="page-benefits-immersive__hero-decor page-benefits-immersive__hero-decor--2" aria-hidden="true"></div>
    </div>

    <!-- Full-width stacked cards -->
    <div class="page-benefits-immersive__cards">
      <div
        v-for="(benefit, index) in benefits"
        :key="index"
        :class="[
          'page-benefits-immersive__card',
          `page-benefits-immersive__card--${benefit.theme}`
        ]"
      >
        <LayoutContainerMax>
          <div class="page-benefits-immersive__card-inner">
            <!-- Left: Big icon + number -->
            <div class="page-benefits-immersive__card-visual">
              <div class="page-benefits-immersive__card-icon-wrapper">
                <component :is="benefit.icon" class="page-benefits-immersive__card-icon" />
              </div>
              <span class="page-benefits-immersive__card-number">{{ String(index + 1).padStart(2, '0') }}</span>
            </div>

            <!-- Right: Content -->
            <div class="page-benefits-immersive__card-content">
              <div class="page-benefits-immersive__card-header">
                <span class="page-benefits-immersive__card-tag">{{ benefit.tag }}</span>
                <Heading :level="2" class="page-benefits-immersive__card-title">
                  {{ benefit.title }}
                </Heading>
              </div>

              <Text size="lg" class="page-benefits-immersive__card-text">
                {{ benefit.description }}
              </Text>

              <!-- Stats row -->
              <div v-if="benefit.stats" class="page-benefits-immersive__card-stats">
                <div
                  v-for="(stat, sIndex) in benefit.stats"
                  :key="sIndex"
                  class="page-benefits-immersive__stat"
                >
                  <Text as="span" size="3xl" weight="bold">{{ stat.value }}</Text>
                  <Text as="span" size="sm">{{ stat.label }}</Text>
                </div>
              </div>
            </div>
          </div>
        </LayoutContainerMax>

        <!-- Background pattern -->
        <div class="page-benefits-immersive__card-pattern" aria-hidden="true">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            <circle cx="80" cy="20" r="30" />
            <circle cx="20" cy="80" r="20" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Bottom CTA -->
    <div class="page-benefits-immersive__cta">
      <LayoutContainerMax>
        <div class="page-benefits-immersive__cta-inner">
          <div class="page-benefits-immersive__cta-text">
            <Heading :level="3">{{ ctaTitle }}</Heading>
            <Text size="lg">{{ ctaSubtitle }}</Text>
          </div>
          <ButtonSwave v-if="ctaButton" size="lg" variant="primary">
            {{ ctaButton }}
          </ButtonSwave>
        </div>
      </LayoutContainerMax>
    </div>
  </section>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                       PAGE BENEFITS IMMERSIVE                                │
  │                                                                              │
  │  Version immersive: Full-width cards empilées avec backgrounds colorés       │
  │  Design bold et impactant, style landing page premium                        │
  │                                                                              │
  │  STRUCTURE:                                                                  │
  │  ┌────────────────────────────────────────────────────────────────────────┐  │
  │  │  section.page-benefits-immersive                                      │  │
  │  │  ├─ __hero (dark bg, centered text)                                   │  │
  │  │  ├─ __cards                                                           │  │
  │  │  │    ├─ __card--light (full-width, light bg)                         │  │
  │  │  │    ├─ __card--primary (full-width, primary bg)                     │  │
  │  │  │    └─ __card--dark (full-width, dark bg)                           │  │
  │  │  └─ __cta (accent bg)                                                 │  │
  │  └────────────────────────────────────────────────────────────────────────┘  │
  │                                                                              │
  │  Props: badge, title, subtitle, benefits[], ctaTitle, ctaSubtitle, ctaButton │
  │  Events: Aucun                                                               │
  └─────────────────────────────────────────────────────────────────────────────┘
*/

import { h, computed, type FunctionalComponent } from 'vue';

/* Types */
interface BenefitStat {
  value: string;
  label: string;
}

interface Benefit {
  icon: FunctionalComponent;
  tag: string;
  title: string;
  description: string;
  theme: 'light' | 'primary' | 'dark';
  stats?: BenefitStat[];
}

interface Props {
  badge?: string;
  title?: string;
  subtitle?: string;
  ctaTitle?: string;
  ctaSubtitle?: string;
  ctaButton?: string;
}

const props = withDefaults(defineProps<Props>(), {
  badge: 'L\'expérience Swave',
  title: 'Pourquoi nous ?',
  subtitle: 'Trois promesses. Une seule mission : te faire danser.',
  ctaTitle: 'Ton premier cours t\'attend',
  ctaSubtitle: 'Rejoins la communauté Swave et découvre une nouvelle façon de bouger.',
  ctaButton: 'Je réserve mon cours découverte',
});

/* Icons SVG */
const IconParty: FunctionalComponent = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M2 22l14-5-9-9-5 14zm10.6-8.01L11 12.4l-1.4 1.49L11 15.28l1.6-1.29zM12.01 2L9 9l2.51 2.51L18 9l-5.99-7zm1.86 6L12 5.55 10.13 8h3.74z' })
]);

const IconBrain: FunctionalComponent = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M13 3c.65 0 1.26.09 1.83.26-.27.43-.46.89-.57 1.39-.41-.09-.83-.15-1.26-.15-2.76 0-5 2.24-5 5v1c-1.66 0-3 1.34-3 3s1.34 3 3 3h1v2H8c-2.76 0-5-2.24-5-5 0-2.64 2.05-4.78 4.65-4.96C8.58 5.01 10.58 3 13 3zm4 0c2.76 0 5 2.24 5 5 0 2.64-2.05 4.78-4.65 4.96C16.42 15.99 14.42 18 12 18c-.65 0-1.26-.09-1.83-.26.27-.43.46-.89.57-1.39.41.09.83.15 1.26.15 2.76 0 5-2.24 5-5v-1c1.66 0 3-1.34 3-3s-1.34-3-3-3h-1V3h1z' })
]);

const IconCrown: FunctionalComponent = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z' })
]);

/* Benefits data */
const benefits = computed<Benefit[]>(() => [
  {
    icon: IconParty,
    tag: 'Le plaisir d\'abord',
    title: 'Oublie tout ce que tu crois savoir sur les cours de danse',
    description: 'Ici, pas de miroir intimidant, pas de prof distant, pas de pression. On rit, on fait des erreurs, on recommence. Et bizarrement, c\'est comme ça qu\'on apprend le mieux. Tu vas découvrir que danser, c\'est naturel, il suffisait juste de trouver le bon environnement.',
    theme: 'light',
    stats: [
      { value: '100%', label: 'de sourires garantis' },
      { value: '0', label: 'jugement' },
      { value: '∞', label: 'bonne humeur' },
    ],
  },
  {
    icon: IconBrain,
    tag: 'Méthode éprouvée',
    title: 'Une pédagogie qui a fait ses preuves',
    description: 'Notre méthode Swave décompose chaque mouvement en micro-étapes intuitives. Pas de jargon technique, pas de frustration. Tu progresses sans t\'en rendre compte, et au bout de 4 semaines, tu te retournes et tu réalises tout le chemin parcouru.',
    theme: 'primary',
    stats: [
      { value: '4 sem.', label: 'pour les bases' },
      { value: '500+', label: 'élèves formés' },
      { value: '4.9★', label: 'satisfaction' },
    ],
  },
  {
    icon: IconCrown,
    tag: 'Excellence accessible',
    title: 'Apprends des meilleurs, à ton rythme',
    description: 'Nos instructeurs ont dansé sur les plus grandes scènes. Mais leur vraie passion ? Transmettre. Ils ont ce don rare de voir exactement ce dont tu as besoin et de te l\'expliquer avec les bons mots. Leur patience est légendaire, leur bienveillance, contagieuse.',
    theme: 'dark',
    stats: [
      { value: '15+', label: 'ans d\'expérience' },
      { value: '3', label: 'champions' },
      { value: '∞', label: 'passion' },
    ],
  },
]);
</script>

<style scoped>
/**
 * PAGE BENEFITS IMMERSIVE - Design bold full-width
 * Cards empilées avec backgrounds colorés et patterns
 */

.page-benefits-immersive {
  overflow: hidden;
}

/* Hero */
.page-benefits-immersive__hero {
  position: relative;
  padding: 6rem 0 4rem;
  background: var(--bg-invert);
  overflow: hidden;

  @media (min-width: 1024px) {
    padding: 8rem 0 5rem;
  }
}

.page-benefits-immersive__hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
}

.page-benefits-immersive__hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  color: var(--primary-light);
}

.page-benefits-immersive__hero-badge-icon {
  font-size: 14px;
}

.page-benefits-immersive__hero-title {
  color: var(--text-inverse);
  max-width: 600px;
}

.page-benefits-immersive__hero-subtitle {
  color: rgba(255, 255, 255, 0.7);
  max-width: 500px;
}

.page-benefits-immersive__hero-decor {
  position: absolute;
  border-radius: 50%;
  background: var(--primary);
  opacity: 0.1;
  pointer-events: none;
}

.page-benefits-immersive__hero-decor--1 {
  width: 400px;
  height: 400px;
  top: -200px;
  right: -100px;
}

.page-benefits-immersive__hero-decor--2 {
  width: 300px;
  height: 300px;
  bottom: -150px;
  left: -100px;
}

/* Cards */
.page-benefits-immersive__cards {
  display: flex;
  flex-direction: column;
}

.page-benefits-immersive__card {
  position: relative;
  padding: 4rem 0;
  overflow: hidden;

  @media (min-width: 1024px) {
    padding: 6rem 0;
  }
}

.page-benefits-immersive__card--light {
  background: var(--bg-base);

  .page-benefits-immersive__card-tag {
    background: var(--primary);
    color: var(--text-inverse);
  }

  .page-benefits-immersive__card-title,
  .page-benefits-immersive__card-text {
    color: var(--text-strong);
  }

  .page-benefits-immersive__card-number {
    color: var(--primary);
  }

  .page-benefits-immersive__stat span:first-child {
    color: var(--primary);
  }

  .page-benefits-immersive__card-pattern svg {
    fill: rgba(15, 143, 197, 0.05);
  }
}

.page-benefits-immersive__card--primary {
  background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%);

  .page-benefits-immersive__card-tag {
    background: rgba(255, 255, 255, 0.2);
    color: var(--text-inverse);
  }

  .page-benefits-immersive__card-title,
  .page-benefits-immersive__card-text,
  .page-benefits-immersive__card-number {
    color: var(--text-inverse);
  }

  .page-benefits-immersive__card-icon-wrapper {
    background: rgba(255, 255, 255, 0.2);
  }

  .page-benefits-immersive__stat span {
    color: var(--text-inverse);
  }

  .page-benefits-immersive__card-pattern svg {
    fill: rgba(255, 255, 255, 0.05);
  }
}

.page-benefits-immersive__card--dark {
  background: var(--bg-invert);

  .page-benefits-immersive__card-tag {
    background: var(--primary);
    color: var(--text-inverse);
  }

  .page-benefits-immersive__card-title,
  .page-benefits-immersive__card-text {
    color: var(--text-inverse);
  }

  .page-benefits-immersive__card-number {
    color: var(--primary-light);
  }

  .page-benefits-immersive__card-icon-wrapper {
    background: var(--primary);
  }

  .page-benefits-immersive__stat span:first-child {
    color: var(--primary-light);
  }

  .page-benefits-immersive__stat span:last-child {
    color: rgba(255, 255, 255, 0.7);
  }

  .page-benefits-immersive__card-pattern svg {
    fill: rgba(15, 143, 197, 0.1);
  }
}

.page-benefits-immersive__card-inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: center;
    gap: 4rem;
  }
}

/* Visual */
.page-benefits-immersive__card-visual {
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    min-width: 200px;
  }
}

.page-benefits-immersive__card-icon-wrapper {
  width: 80px;
  height: 80px;
  min-width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary), var(--primary-light));
  border-radius: 20px;

  @media (min-width: 1024px) {
    width: 100px;
    height: 100px;
    min-width: 100px;
    border-radius: 24px;
  }
}

.page-benefits-immersive__card-icon {
  width: 40px;
  height: 40px;
  color: var(--text-inverse);

  @media (min-width: 1024px) {
    width: 48px;
    height: 48px;
  }
}

.page-benefits-immersive__card-number {
  font-family: var(--font-display);
  font-size: 4rem;
  font-weight: 700;
  line-height: 1;
  opacity: 0.2;

  @media (min-width: 1024px) {
    font-size: 6rem;
  }
}

/* Content */
.page-benefits-immersive__card-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex: 1;
}

.page-benefits-immersive__card-header {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.page-benefits-immersive__card-tag {
  display: inline-block;
  width: fit-content;
  padding: 6px 14px;
  border-radius: 6px;
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.page-benefits-immersive__card-title {
  max-width: 600px;
}

.page-benefits-immersive__card-text {
  line-height: 1.7;
  max-width: 600px;
  opacity: 0.9;
}

/* Stats */
.page-benefits-immersive__card-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(128, 128, 128, 0.2);

  @media (min-width: 768px) {
    gap: 3rem;
  }
}

.page-benefits-immersive__stat {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

/* Pattern */
.page-benefits-immersive__card-pattern {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  pointer-events: none;

  & svg {
    width: 100%;
    height: 100%;
  }
}

/* CTA */
.page-benefits-immersive__cta {
  padding: 4rem 0;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);

  @media (min-width: 1024px) {
    padding: 5rem 0;
  }
}

.page-benefits-immersive__cta-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
}

.page-benefits-immersive__cta-text {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  & h3, & p {
    color: var(--text-inverse);
  }
}
</style>
