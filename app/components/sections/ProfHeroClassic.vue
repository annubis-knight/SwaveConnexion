<template>
  <section class="prof-hero" data-theme="light">
    <!-- Accent gris de référence (fond de container coupé net) -->
    <div class="prof-hero__bg-accent"></div>

    <LayoutContainerMax class="relative z-10 h-full">
      <div class="prof-hero__layout">
        <div class="prof-hero__content">
          <Text
            v-if="eyebrow"
            as="span"
            size="sm"
            weight="semibold"
            color="primary"
            transform="uppercase"
            tracking="wide"
          >
            {{ eyebrow }}
          </Text>
          <div class="prof-hero__name">
            <Heading :level="1">{{ firstName }}</Heading>
            <Text font="display" size="5xl" weight="extralight" color="primary" leading="xtratight">
              {{ lastName }}
            </Text>
          </div>
          <Text size="lg" weight="light" leading="relaxed" max-width="lg">
            {{ description }}
          </Text>
          <div v-if="tags.length" class="prof-hero__tags">
            <LabelSwave v-for="tag in tags" :key="tag" icon="check">{{ tag }}</LabelSwave>
          </div>
        </div>

        <div class="prof-hero__visual">
          <div class="prof-hero__photo">
            <NuxtImg :src="photo" :alt="`${firstName} ${lastName}`" class="prof-hero__photo-img" sizes="100vw lg:420px" format="webp" loading="lazy" />
          </div>
          <div class="prof-hero__photo-decoration"></div>
        </div>
      </div>
    </LayoutContainerMax>
  </section>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────┐
  │                   PROF HERO — CLASSIC (réf.)                 │
  │  ┌───────────────────────────────────────────────────────┐  │
  │  │  section.prof-hero (thème clair)                      │  │
  │  │    ├─ .__bg-accent (droite 40% : gris, coupé net)     │  │
  │  │    └─ LayoutContainerMax                              │  │
  │  │         └─ .__layout (asymétrique)                    │  │
  │  │              ├─ .__content (eyebrow, nom, desc, tags) │  │
  │  │              └─ .__visual (photo nette + déco)        │  │
  │  └───────────────────────────────────────────────────────┘  │
  │                                                             │
  │  Props:                                                     │
  │    • eyebrow?: string · firstName · lastName · description  │
  │    • tags?: string[] · photo: string                       │
  │                                                             │
  │  Events: Aucun · Slots: Aucun                              │
  │                                                             │
  │  Version de référence extraite des pages professeurs        │
  │  (accent gris d'origine), rendue réutilisable pour le switch│
  └─────────────────────────────────────────────────────────────┘
*/

interface Props {
  eyebrow?: string;
  firstName: string;
  lastName: string;
  description: string;
  tags?: string[];
  photo: string;
}

withDefaults(defineProps<Props>(), {
  eyebrow: '',
  tags: () => [],
});
</script>

<style scoped>
/**
 * PROF HERO CLASSIC - BEM strict
 * Hero de référence : accent gris à droite, layout asymétrique
 */

.prof-hero {
  padding: 6rem 0;
  position: relative;
  overflow: hidden;
  min-height: 95vh;
  display: flex;
  align-items: center;
  background-color: var(--bg-base);
}

@media (min-width: 1024px) {
  .prof-hero {
    padding: 8rem 0;
  }
}

.prof-hero__bg-accent {
  position: absolute;
  top: 0;
  right: 0;
  width: 40%;
  height: 100%;
  background-color: var(--bg-subtle);
  display: none;
}

@media (min-width: 1024px) {
  .prof-hero__bg-accent {
    display: block;
  }
}

.prof-hero__layout {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  position: relative;
  z-index: 1;
}

@media (min-width: 1024px) {
  .prof-hero__layout {
    flex-direction: row;
    align-items: center;
  }
}

.prof-hero__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 1rem;
  min-height: 50vh;
  text-align: left;
}

@media (min-width: 1024px) {
  .prof-hero__content {
    gap: 1.5rem;
    min-height: 55vh;
  }
}

.prof-hero__name {
  display: flex;
  flex-direction: column;
}

.prof-hero__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.prof-hero__visual {
  position: relative;
  flex-shrink: 0;
}

@media (min-width: 1024px) {
  .prof-hero__visual {
    width: 420px;
  }
}

.prof-hero__photo {
  width: 100%;
  aspect-ratio: 3 / 4;
  background-color: var(--bg-subtle);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-base);
  position: relative;
  z-index: 1;
  overflow: hidden;
}

.prof-hero__photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
}

.prof-hero__photo-decoration {
  position: absolute;
  bottom: -12px;
  right: -12px;
  width: 100%;
  height: 100%;
  border: 2px solid var(--primary);
  border-radius: 16px;
  z-index: 0;
  display: none;
}

@media (min-width: 768px) {
  .prof-hero__photo-decoration {
    display: block;
  }
}
</style>
