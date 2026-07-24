<template>
  <section class="page-benefits-timeline py-16 lg:py-24" data-theme="light">
    <LayoutContainerMax>
      <!-- Header -->
      <div class="page-benefits-timeline__header">
        <Heading :level="2">
          {{ title }}
        </Heading>
        <Text size="lg" maxWidth="md" class="page-benefits-timeline__subtitle">
          {{ subtitle }}
        </Text>
      </div>

      <!-- Timeline -->
      <div class="page-benefits-timeline__track">
        <!-- Vertical line -->
        <div class="page-benefits-timeline__line" aria-hidden="true"></div>

        <!-- Benefits -->
        <div
          v-for="(benefit, index) in benefits"
          :key="index"
          :class="[
            'page-benefits-timeline__item',
            index % 2 === 0 ? 'page-benefits-timeline__item--left' : 'page-benefits-timeline__item--right'
          ]"
        >
          <!-- Node -->
          <div class="page-benefits-timeline__node">
            <div class="page-benefits-timeline__node-inner">
              <component :is="benefit.icon" class="page-benefits-timeline__node-icon" />
            </div>
            <div class="page-benefits-timeline__node-ring"></div>
          </div>

          <!-- Content card -->
          <div class="page-benefits-timeline__card">
            <div class="page-benefits-timeline__card-tag">
              <Text as="span" size="xs" weight="bold" transform="uppercase">
                {{ benefit.tag }}
              </Text>
            </div>

            <Heading :level="4" class="page-benefits-timeline__card-title">
              {{ benefit.title }}
            </Heading>

            <Text size="sm" class="page-benefits-timeline__card-text">
              {{ benefit.description }}
            </Text>

            <!-- Features list -->
            <ul v-if="benefit.features" class="page-benefits-timeline__features">
              <li v-for="(feature, fIndex) in benefit.features" :key="fIndex">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <Text as="span" size="sm">{{ feature }}</Text>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- CTA bottom -->
      <div class="page-benefits-timeline__cta">
        <div class="page-benefits-timeline__cta-content">
          <Heading :level="3">{{ ctaTitle }}</Heading>
          <Text size="base">{{ ctaText }}</Text>
        </div>
        <ButtonSwave v-if="ctaButton" size="lg">
          {{ ctaButton }}
        </ButtonSwave>
      </div>
    </LayoutContainerMax>
  </section>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                       PAGE BENEFITS TIMELINE                                 │
  │                                                                              │
  │  Version timeline: Parcours vertical avec nodes et cards alternées           │
  │  Design narratif inspiré des roadmaps et parcours utilisateur                │
  │                                                                              │
  │  STRUCTURE:                                                                  │
  │  ┌────────────────────────────────────────────────────────────────────────┐  │
  │  │  section.page-benefits-timeline                                       │  │
  │  │  └─ LayoutContainerMax                                                │  │
  │  │       ├─ __header                                                     │  │
  │  │       ├─ __track                                                      │  │
  │  │       │    ├─ __line (vertical)                                       │  │
  │  │       │    ├─ __item--left  [Card] ● --------                         │  │
  │  │       │    ├─ __item--right -------- ● [Card]                         │  │
  │  │       │    └─ __item--left  [Card] ● --------                         │  │
  │  │       └─ __cta                                                        │  │
  │  └────────────────────────────────────────────────────────────────────────┘  │
  │                                                                              │
  │  Props: title, subtitle, benefits[], ctaTitle, ctaText, ctaButton            │
  │  Events: Aucun                                                               │
  └─────────────────────────────────────────────────────────────────────────────┘
*/

import { h, computed, type FunctionalComponent } from 'vue';

/* Types */
interface Benefit {
  icon: FunctionalComponent;
  tag: string;
  title: string;
  description: string;
  features?: string[];
}

interface Props {
  title?: string;
  subtitle?: string;
  ctaTitle?: string;
  ctaText?: string;
  ctaButton?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Ton parcours vers la danse',
  subtitle: 'En 3 étapes simples, passe de "je n\'ai jamais dansé" à "tu danses depuis combien de temps ?"',
  ctaTitle: 'Prêt à commencer ?',
  ctaText: 'Rejoins des centaines de débutants qui ont franchi le pas.',
  ctaButton: 'Réserver mon premier cours',
});

/* Icons SVG */
const IconSparkle: FunctionalComponent = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z' })
]);

const IconLightbulb: FunctionalComponent = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z' })
]);

const IconRocket: FunctionalComponent = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M12 2.5s4.5 2.04 4.5 10.5c0 2.49-1.04 5.57-1.6 7H9.1c-.56-1.43-1.6-4.51-1.6-7C7.5 4.54 12 2.5 12 2.5zm2 8.5c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm-6.31 9.52c-.48-1.23-1.52-4.17-1.67-6.87l-1.13.75c-.56.38-.89 1-.89 1.67V17c0 .62.38 1.18.95 1.42l2.74 1.1zm8.62 0l2.74-1.1c.57-.24.95-.8.95-1.42v-1.43c0-.67-.33-1.29-.89-1.66l-1.13-.76c-.15 2.69-1.2 5.64-1.67 6.87z' })
]);

/* Benefits data */
const benefits = computed<Benefit[]>(() => [
  {
    icon: IconSparkle,
    tag: 'Étape 1',
    title: 'Découvre le plaisir de danser',
    description: 'Ton premier cours, c\'est une révélation. Tu découvres que ton corps sait bouger, que le rythme est naturel, et que la danse, c\'est avant tout du bonheur partagé.',
    features: [
      'Ambiance décontractée et bienveillante',
      'Pas de partenaire requis',
      'Musique entraînante garantie',
    ],
  },
  {
    icon: IconLightbulb,
    tag: 'Étape 2',
    title: 'Apprends avec méthode',
    description: 'Notre pédagogie progressive te guide naturellement. Chaque séance construit sur la précédente. Tu ne mémorises pas, tu intègres. La différence ? Tu n\'oublies jamais.',
    features: [
      'Progression adaptée à ton rythme',
      'Exercices ludiques et mémorisables',
      'Feedback personnalisé',
    ],
  },
  {
    icon: IconRocket,
    tag: 'Étape 3',
    title: 'Progresse avec les meilleurs',
    description: 'Nos instructeurs champions te transmettent leur passion et leur expertise. Ils voient ton potentiel et t\'aident à le révéler. En quelques semaines, tu épates ton entourage.',
    features: [
      'Instructeurs certifiés internationaux',
      'Techniques professionnelles accessibles',
      'Communauté motivante',
    ],
  },
]);
</script>

<style scoped>
/**
 * PAGE BENEFITS TIMELINE - Design parcours vertical
 * Ligne de temps avec nodes et cards alternées
 */

.page-benefits-timeline {
  background: linear-gradient(180deg, var(--bg-base) 0%, var(--bg-subtle) 100%);
}

/* Header */
.page-benefits-timeline__header {
  text-align: center;
  margin-bottom: 4rem;

  @media (min-width: 1024px) {
    margin-bottom: 5rem;
  }
}

.page-benefits-timeline__subtitle {
  color: var(--text-base);
  margin: 0 auto;
}

/* Track */
.page-benefits-timeline__track {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
}

/* Vertical line */
.page-benefits-timeline__line {
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(
    180deg,
    var(--primary) 0%,
    var(--primary-light) 50%,
    var(--primary) 100%
  );

  @media (min-width: 768px) {
    left: 50%;
    transform: translateX(-50%);
  }
}

/* Item */
.page-benefits-timeline__item {
  position: relative;
  display: flex;
  align-items: flex-start;
  padding-left: 60px;
  margin-bottom: 3rem;

  @media (min-width: 768px) {
    padding-left: 0;
    margin-bottom: 4rem;
  }

  &:last-child {
    margin-bottom: 0;
  }
}

.page-benefits-timeline__item--left {
  @media (min-width: 768px) {
    flex-direction: row-reverse;
    text-align: right;

    .page-benefits-timeline__card {
      margin-right: calc(50% + 40px);
      margin-left: 0;
    }

    .page-benefits-timeline__features {
      justify-content: flex-end;
    }
  }
}

.page-benefits-timeline__item--right {
  @media (min-width: 768px) {
    .page-benefits-timeline__card {
      margin-left: calc(50% + 40px);
    }
  }
}

/* Node */
.page-benefits-timeline__node {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;

  @media (min-width: 768px) {
    left: 50%;
    transform: translateX(-50%);
  }
}

.page-benefits-timeline__node-inner {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(15, 143, 197, 0.4);
}

.page-benefits-timeline__node-icon {
  width: 20px;
  height: 20px;
  color: var(--text-inverse);
}

.page-benefits-timeline__node-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 56px;
  height: 56px;
  border: 2px solid var(--primary);
  border-radius: 16px;
  opacity: 0.3;
  animation: ringPulse 2s ease-out infinite;
}

@keyframes ringPulse {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
  100% { transform: translate(-50%, -50%) scale(1.3); opacity: 0; }
}

/* Card */
.page-benefits-timeline__card {
  flex: 1;
  padding: 1.5rem;
  background: var(--bg-base);
  border-radius: 16px;
  border: 1px solid var(--border-base);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  @media (min-width: 768px) {
    padding: 2rem;
    max-width: calc(50% - 60px);
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
  }
}

.page-benefits-timeline__card-tag {
  display: inline-block;
  padding: 4px 10px;
  background: rgba(15, 143, 197, 0.1);
  border-radius: 4px;
  color: var(--primary);
  margin-bottom: 0.75rem;
}

.page-benefits-timeline__card-title {
  margin-bottom: 0.5rem;
}

.page-benefits-timeline__card-text {
  color: var(--text-base);
  line-height: 1.6;
  margin-bottom: 1rem;
}

/* Features list */
.page-benefits-timeline__features {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  & li {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  & svg {
    width: 16px;
    height: 16px;
    min-width: 16px;
    color: var(--primary);
  }
}

/* CTA */
.page-benefits-timeline__cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
  margin-top: 4rem;
  padding: 2.5rem;
  background: var(--bg-invert);
  border-radius: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
    padding: 3rem;
    margin-top: 5rem;
  }
}

.page-benefits-timeline__cta-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  & h3, & p {
    color: var(--text-inverse);
  }
}
</style>
