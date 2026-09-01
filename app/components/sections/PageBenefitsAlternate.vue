<template>
  <section class="page-benefits-alternate py-16 lg:py-24" data-theme="light">
    <!-- Logo décoratif centré, grande taille, faible opacité -->
    <NuxtImg
      src="/images/logo_alpha.png"
      alt=""
      aria-hidden="true"
      class="page-benefits-alternate__watermark"
      sizes="100vw md:800px"
      format="webp"
      loading="lazy"
      :style="{ transform: `translate(-50%, -50%) scale(${watermarkScale})` }"
    />

    <LayoutContainerMax class="page-benefits-alternate__container">
      <!-- Header compact -->
      <div class="page-benefits-alternate__header">
        <!-- <img
          src="~/assets/images/logo_alpha.png"
          alt="Swave"
          class="page-benefits-alternate__logo"
        /> -->
        <Heading :level="2">
          {{ titleLine1 }}
          <span class="page-benefits-alternate__title-accent">{{ titleLine2 }}</span>
        </Heading>
      </div>

      <!-- Benefits alternés -->
      <div class="page-benefits-alternate__list">
        <div
          v-for="(benefit, index) in benefits"
          :key="index"
          :class="[
            'page-benefits-alternate__item',
            index % 2 === 1 ? 'page-benefits-alternate__item--reverse' : ''
          ]"
        >
          <!-- Visual side -->
          <div class="page-benefits-alternate__visual">
            <div class="page-benefits-alternate__image-wrapper">
              <NuxtImg :src="benefit.image" :alt="benefit.title" class="page-benefits-alternate__image" sizes="100vw lg:600px" format="webp" loading="lazy" />
              <!-- Shadow card (effet éventail) -->
              <div class="page-benefits-alternate__shadow-card"></div>
            </div>
            <!-- Decorative number -->
            <span class="page-benefits-alternate__number">0{{ index + 1 }}</span>
          </div>

          <!-- Content side -->
          <div class="page-benefits-alternate__content">
            <LabelSwave :show-icon="false">{{ benefit.tag }}</LabelSwave>

            <Heading :level="3" transform="uppercase" class="page-benefits-alternate__item-title">
              {{ benefit.title }}
            </Heading>

            <Text size="base" class="page-benefits-alternate__item-text">
              {{ benefit.description }}
            </Text>

            <!-- Highlight stat -->
            <div v-if="benefit.stat" class="page-benefits-alternate__stat">
              <Text as="span" size="2xl" weight="bold" color="primary">{{ benefit.stat }}</Text>
              <Text as="span" size="sm">{{ benefit.statLabel }}</Text>
            </div>

            <!-- CTA optionnel -->
            <NuxtLink v-if="benefit.cta && benefit.ctaTo" :to="benefit.ctaTo" class="page-benefits-alternate__cta-link">
              <ButtonSwave class="page-benefits-alternate__cta">
                {{ benefit.cta }}
              </ButtonSwave>
            </NuxtLink>
            <ButtonSwave v-else-if="benefit.cta" class="page-benefits-alternate__cta">
              {{ benefit.cta }}
            </ButtonSwave>
          </div>
        </div>
      </div>
    </LayoutContainerMax>
  </section>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                       PAGE BENEFITS ALTERNATE                                │
  │                                                                              │
  │  Version alternée: Cards en zigzag gauche/droite avec numérotation           │
  │  Design éditorial inspiré des magazines lifestyle                            │
  │                                                                              │
  │  STRUCTURE:                                                                  │
  │  ┌────────────────────────────────────────────────────────────────────────┐  │
  │  │  section.page-benefits-alternate                                      │  │
  │  │  └─ LayoutContainerMax                                                │  │
  │  │       ├─ __header (aligné gauche)                                     │  │
  │  │       └─ __list                                                       │  │
  │  │            ├─ __item [Visual | Content]                               │  │
  │  │            ├─ __item--reverse [Content | Visual]                      │  │
  │  │            └─ __item [Visual | Content]                               │  │
  │  └────────────────────────────────────────────────────────────────────────┘  │
  │                                                                              │
  │  Props:                                                                       │
  │    • titleLine1?: string - Première partie du titre                          │
  │    • titleLine2?: string - Partie accentuée du titre                         │
  │    • benefits: Benefit[] - Liste des bénéfices (REQUIS)                      │
  │  Events: Aucun                                                               │
  └─────────────────────────────────────────────────────────────────────────────┘
*/

/* Types - exporté pour réutilisation */
export interface Benefit {
  image: string;
  tag: string;
  title: string;
  description: string;
  stat?: string;
  statLabel?: string;
  cta?: string;
  ctaTo?: string;
}

interface Props {
  titleLine1?: string;
  titleLine2?: string;
  benefits: Benefit[];
}

const props = defineProps<Props>();

/* Watermark shrink au scroll — scale de 1 → 0.3 sur 6000px de scroll */
const watermarkScale = ref(1);

const onScroll = () => {
  watermarkScale.value = Math.max(0.3, 1 - window.scrollY / 6000);
};

// onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }));
// onUnmounted(() => window.removeEventListener('scroll', onScroll));
</script>

<style scoped>
/**
 * PAGE BENEFITS ALTERNATE - Design éditorial zigzag
 * Alternance gauche/droite avec grands numéros décoratifs
 */

.page-benefits-alternate {
  position: relative;
  overflow: hidden;
  background-color: var(--bg-subtle);
}

/*
  Logo watermark centré dans SA section.
  @dev absolute et non fixed : en fixed le watermark se référait au viewport,
  echappait à l'overflow:hidden du parent et restait affiché par-dessus les
  sections suivantes. Étant positionné (z-index:0), il était peint APRÈS les
  éléments en flux normal et recouvrait leur contenu — d'où l'impression que
  les cartes des sections d'en dessous étaient translucides.
*/
.page-benefits-alternate__watermark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  filter:drop-shadow(0px 0px 20px grey);
  width: 60vw;
  max-width: 700px;
  pointer-events: none;
  opacity: 0.1;
  z-index: 0;
}

/* Container - z-index pour passer devant les décos */
.page-benefits-alternate__container {
  position: relative;
  z-index: 1;
}

/* Header */
.page-benefits-alternate__header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 4rem;

  @media (min-width: 1024px) {
    gap: 1.5rem;
    margin-bottom: 5rem;
  }
}

.page-benefits-alternate__logo {
  width: 48px;
  height: auto;
  flex-shrink: 0;

  @media (min-width: 1024px) {
    width: 64px;
  }
}

.page-benefits-alternate__title-accent {
  color: var(--primary);
}

/* List - Espacement augmenté entre benefits */
.page-benefits-alternate__list {
  display: flex;
  flex-direction: column;
  gap: 6rem;

  @media (min-width: 1024px) {
    gap: 10rem;
  }
}

/* Item */
.page-benefits-alternate__item {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: center;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1.2fr;
    gap: 4rem;
  }
}

.page-benefits-alternate__item--reverse {
  @media (min-width: 768px) {
    direction: rtl;

    & > * {
      direction: ltr;
    }
  }
}

/* Visual side */
.page-benefits-alternate__visual {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;

  @media (min-width: 768px) {
    min-height: 280px;
  }
}

.page-benefits-alternate__image-wrapper {
  position: relative;
  width: 100%;
  max-width: 280px;
  aspect-ratio: 3 / 4;
  overflow: visible;

  @media (min-width: 768px) {
    max-width: 340px;
  }

  @media (min-width: 1024px) {
    max-width: 400px;
  }
}

/* Shadow card - Effet éventail (carte derrière l'image) */
.page-benefits-alternate__shadow-card {
  position: absolute;
  inset: 0;
  background-color: var(--primary);
  border-radius: 4px;
  transform: rotate(6deg);
  transform-origin: bottom left;
  transition: transform 0.3s ease;

  .page-benefits-alternate__image-wrapper:hover & {
    transform: rotate(0deg);
  }
}

.page-benefits-alternate__image {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.page-benefits-alternate__number {
  position: absolute;
  font-family: var(--font-display);
  font-size: 8rem;
  font-weight: 700;
  color: var(--primary);
  opacity: 0.08;
  line-height: 1;
  z-index: -1;

  @media (min-width: 768px) {
    font-size: 12rem;
  }
}

/* Content side */
.page-benefits-alternate__content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.page-benefits-alternate__item-title {
  color: var(--text-strong);
}

.page-benefits-alternate__item-text {
  color: var(--text-base);
  line-height: 1.7;
}

.page-benefits-alternate__stat {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-top: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-base);
}

.page-benefits-alternate__cta-link {
  text-decoration: none;
  align-self: flex-start;
  margin-top: 1rem;
}

.page-benefits-alternate__cta {
  margin-top: 1rem;
  align-self: flex-start;
}

.page-benefits-alternate__cta-link .page-benefits-alternate__cta {
  margin-top: 0;
}
</style>
