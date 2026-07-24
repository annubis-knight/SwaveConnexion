<template>
  <section class="prof-hero-panel" data-theme="light">
    <!-- Accent de droite = photo floutée, panneau coupé net (comme le gris de base) -->
    <div class="prof-hero-panel__accent" aria-hidden="true">
      <img :src="photo" alt="" class="prof-hero-panel__accent-img" />
    </div>

    <LayoutContainerMax class="relative z-10 h-full">
      <div class="prof-hero-panel__layout">
        <div class="prof-hero-panel__content">
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
          <div class="prof-hero-panel__name">
            <Heading :level="1">{{ firstName }}</Heading>
            <Text font="display" size="5xl" weight="extralight" color="primary" leading="xtratight">
              {{ lastName }}
            </Text>
          </div>
          <Text size="lg" weight="light" leading="relaxed" max-width="lg">
            {{ description }}
          </Text>
          <div v-if="tags.length" class="prof-hero-panel__tags">
            <LabelSwave v-for="tag in tags" :key="tag" icon="check">{{ tag }}</LabelSwave>
          </div>
        </div>

        <div class="prof-hero-panel__visual">
          <div class="prof-hero-panel__photo">
            <img :src="photo" :alt="`${firstName} ${lastName}`" class="prof-hero-panel__photo-img" />
          </div>
          <div class="prof-hero-panel__photo-decoration"></div>
        </div>
      </div>
    </LayoutContainerMax>
  </section>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────┐
  │                 PROF HERO — BLUR PANEL                       │
  │  ┌───────────────────────────────────────────────────────┐  │
  │  │  section.prof-hero-panel (thème clair, comme la réf.) │  │
  │  │    ├─ .__accent (droite 40% : photo floutée, net)     │  │
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
  │  Variante : comme la hero de référence, mais le panneau     │
  │  gris de droite devient la photo floutée, coupée net        │
  │  (aucun fondu — bord franc via overflow: hidden)            │
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
 * PROF HERO BLUR PANEL - BEM strict
 * Clone de la hero de référence ; accent droit = photo floutée coupée net
 */

.prof-hero-panel {
  padding: 6rem 0;
  position: relative;
  overflow: hidden;
  min-height: 95vh;
  display: flex;
  align-items: center;
  background-color: var(--bg-base);
}

@media (min-width: 1024px) {
  .prof-hero-panel {
    padding: 8rem 0;
  }
}

/* Accent droite : panneau flou coupé net (remplace le gris --bg-subtle) */
.prof-hero-panel__accent {
  position: absolute;
  top: 0;
  right: 0;
  width: 40%;
  height: 100%;
  overflow: hidden; /* coupe le flou franchement au bord gauche du panneau */
  display: none;
}

@media (min-width: 1024px) {
  .prof-hero-panel__accent {
    display: block;
  }
}

.prof-hero-panel__accent-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 25%;
  filter: blur(18px) saturate(1.05);
  /* léger zoom pour éviter les bords transparents du flou dans le panneau */
  transform: scale(1.12);
}

.prof-hero-panel__layout {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  position: relative;
  z-index: 1;
}

@media (min-width: 1024px) {
  .prof-hero-panel__layout {
    flex-direction: row;
    align-items: center;
  }
}

.prof-hero-panel__content {
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
  .prof-hero-panel__content {
    gap: 1.5rem;
    min-height: 55vh;
  }
}

.prof-hero-panel__name {
  display: flex;
  flex-direction: column;
}

.prof-hero-panel__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.prof-hero-panel__visual {
  position: relative;
  flex-shrink: 0;
}

@media (min-width: 1024px) {
  .prof-hero-panel__visual {
    width: 420px;
  }
}

.prof-hero-panel__photo {
  width: 100%;
  aspect-ratio: 3 / 4;
  background-color: var(--bg-subtle);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-base);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.28);
  position: relative;
  z-index: 1;
  overflow: hidden;
}

.prof-hero-panel__photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
}

.prof-hero-panel__photo-decoration {
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
  .prof-hero-panel__photo-decoration {
    display: block;
  }
}
</style>
