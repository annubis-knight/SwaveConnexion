<template>
  <section class="bento-editorial" data-theme="light">
    <LayoutContainer size="xl">
      <div class="bento-editorial__header">
        <Heading :level="2" align="center">{{ content.title }}</Heading>
        <Text align="center" weight="light" max-width="md" leading="relaxed">
          {{ content.subtitle }}
        </Text>
      </div>

      <div class="bento-editorial__layout">
        <!-- Photo vedette verticale (plus haute → dépasse en bas) -->
        <figure class="bento-editorial__feature">
          <NuxtImg :src="content.images[0]?.src" :alt="content.images[0]?.alt" class="bento-editorial__feature-img" sizes="100vw lg:600px" format="webp" loading="lazy" />
          <figcaption class="bento-editorial__feature-stat">
            <Text as="span" font="display" size="5xl" weight="bold" color="white" leading="xtratight">{{ content.stats[0]?.value }}</Text>
            <Text as="span" size="sm" weight="light" color="white" transform="uppercase" tracking="wide">{{ content.stats[0]?.label }}</Text>
          </figcaption>
        </figure>

        <!-- Colonne principale (plus courte que la vedette) -->
        <div class="bento-editorial__main">
          <div class="bento-editorial__bio">
            <LabelSwave icon="heart">{{ content.parcoursLabel }}</LabelSwave>
            <Heading :level="4">{{ content.parcoursTitle }}</Heading>
            <Text v-for="(para, i) in content.bio" :key="i" weight="light" leading="relaxed">
              {{ para }}
            </Text>
          </div>

          <!-- Bande asymétrique : stat + spécialités -->
          <div class="bento-editorial__band">
            <div class="bento-editorial__stat">
              <Text as="span" font="display" size="5xl" weight="bold" color="white" align="center">{{ content.stats[1]?.value }}</Text>
              <Text size="sm" weight="light" color="white" align="center" transform="uppercase" tracking="wide">{{ content.stats[1]?.label }}</Text>
            </div>
            <div class="bento-editorial__skills">
              <Heading :level="5">Spécialités</Heading>
              <div class="bento-editorial__skills-list">
                <div v-for="skill in content.skills" :key="skill" class="bento-editorial__skill">
                  <span class="bento-editorial__dot"></span>
                  <Text as="span" size="sm" weight="light">{{ skill }}</Text>
                </div>
              </div>
            </div>
          </div>

          <!-- Bande de 2 photos -->
          <div class="bento-editorial__strip">
            <figure v-for="img in stripImages" :key="img.src" class="bento-editorial__thumb">
              <NuxtImg :src="img.src" :alt="img.alt" class="bento-editorial__thumb-img" sizes="50vw lg:400px" format="webp" loading="lazy" />
            </figure>
          </div>
        </div>
      </div>
    </LayoutContainer>
  </section>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────┐
  │                  PROF BENTO — ÉDITORIAL                      │
  │  Variante : photo vedette verticale à gauche, plus HAUTE     │
  │  que la colonne de contenu → elle dépasse en bas (silhouette │
  │  en L, non rectangulaire). Colonne droite : bio + bande      │
  │  asymétrique (stat / spécialités) + 2 photos.                │
  │                                                             │
  │  Props:                                                     │
  │    • content: BentoContent (images ≥ 3)                     │
  │  Events: Aucun · Slots: Aucun                              │
  └─────────────────────────────────────────────────────────────┘
*/

interface BentoStat {
  value: string;
  label: string;
}
interface BentoImage {
  src: string;
  alt: string;
}
interface BentoContent {
  title: string;
  subtitle: string;
  parcoursLabel: string;
  parcoursTitle: string;
  bio: string[];
  stats: BentoStat[];
  skills: string[];
  images: BentoImage[];
}

const props = defineProps<{ content: BentoContent }>();

/* 2 photos pour la bande (après la vedette) */
const stripImages = computed(() => props.content.images.slice(1, 3));
</script>

<style scoped>
/**
 * BENTO ÉDITORIAL - BEM strict
 * Photo vedette plus haute que le contenu → silhouette en L
 */

.bento-editorial {
  padding: 5rem 0;
  background-color: var(--bg-subtle);
}

.bento-editorial__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 3rem;
}

.bento-editorial__layout {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 1024px) {
  .bento-editorial__layout {
    flex-direction: row;
    align-items: flex-start; /* les colonnes gardent leur hauteur propre */
  }
}

/* Photo vedette (plus haute que la colonne de droite) */
.bento-editorial__feature {
  position: relative;
  margin: 0;
  overflow: hidden;
  border-radius: 16px;
  min-height: 380px;
  background-color: var(--secondary-dark);
}

@media (min-width: 1024px) {
  .bento-editorial__feature {
    flex: 0 0 40%;
    min-height: clamp(560px, 64vh, 740px);
  }
}

.bento-editorial__feature-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
  transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.bento-editorial__feature:hover .bento-editorial__feature-img {
  transform: scale(1.05);
}

.bento-editorial__feature-stat {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding: 1.5rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.75) 0%, transparent 100%);
}

/* Colonne principale */
.bento-editorial__main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.bento-editorial__bio {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 2rem;
  background-color: var(--bg-base);
  border: 1px solid var(--border-base);
  border-radius: 16px;
}

/* Bande asymétrique stat + spécialités */
.bento-editorial__band {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 640px) {
  .bento-editorial__band {
    grid-template-columns: 1fr 1.7fr;
  }
}

.bento-editorial__stat {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  padding: 1.5rem;
  min-height: 150px;
  background-color: var(--primary);
  border-radius: 16px;
}

.bento-editorial__skills {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.5rem 2rem;
  background-color: var(--bg-base);
  border: 1px solid var(--border-base);
  border-radius: 16px;
}

.bento-editorial__skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
  margin-top: 0.5rem;
}

.bento-editorial__skill {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.bento-editorial__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--primary);
  flex-shrink: 0;
}

/* Bande de photos (2 vignettes) */
.bento-editorial__strip {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.bento-editorial__thumb {
  margin: 0;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 12px;
  background-color: var(--secondary-dark);
}

.bento-editorial__thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.bento-editorial__thumb:hover .bento-editorial__thumb-img {
  transform: scale(1.06);
}

@media (prefers-reduced-motion: reduce) {
  .bento-editorial__feature-img,
  .bento-editorial__thumb-img {
    transition: none;
  }
}
</style>
