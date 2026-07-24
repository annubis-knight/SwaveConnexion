<template>
  <section class="prof-hero-blur py-24 lg:py-32" data-theme="dark">
    <!-- Rappel flou de la photo de profil en background (immersif) -->
    <img :src="photo" alt="" aria-hidden="true" class="prof-hero-blur__bg" />
    <div class="prof-hero-blur__scrim" aria-hidden="true"></div>

    <LayoutContainerMax class="relative z-10">
      <div class="prof-hero-blur__layout">
        <div class="prof-hero-blur__content">
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
          <div class="prof-hero-blur__name">
            <Heading :level="1" color="white">{{ firstName }}</Heading>
            <Text font="display" size="5xl" weight="extralight" color="primary" leading="xtratight">
              {{ lastName }}
            </Text>
          </div>
          <Text size="lg" weight="light" color="white" leading="relaxed" max-width="lg">
            {{ description }}
          </Text>
          <div v-if="tags.length" class="prof-hero-blur__tags">
            <LabelSwave v-for="tag in tags" :key="tag" icon="check">{{ tag }}</LabelSwave>
          </div>
        </div>

        <div class="prof-hero-blur__visual">
          <div class="prof-hero-blur__photo">
            <img :src="photo" :alt="`${firstName} ${lastName}`" class="prof-hero-blur__photo-img" />
          </div>
        </div>
      </div>
    </LayoutContainerMax>
  </section>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────┐
  │                     PROF HERO — BLUR                         │
  │  ┌───────────────────────────────────────────────────────┐  │
  │  │  section.prof-hero-blur                               │  │
  │  │    ├─ img.__bg (photo floutée plein cadre)            │  │
  │  │    ├─ .__scrim (voile sombre)                         │  │
  │  │    └─ LayoutContainerMax                              │  │
  │  │         └─ .__layout (asymétrique)                    │  │
  │  │              ├─ .__content (eyebrow, nom, desc, tags) │  │
  │  │              └─ .__visual (photo nette encadrée)      │  │
  │  └───────────────────────────────────────────────────────┘  │
  │                                                             │
  │  Props:                                                     │
  │    • eyebrow?: string - Sur-titre (ex. "Professeur")       │
  │    • firstName: string - Prénom (Heading h1)               │
  │    • lastName: string - Nom (display, couleur primary)     │
  │    • description: string - Accroche                         │
  │    • tags?: string[] - Labels (LabelSwave)                 │
  │    • photo: string - Photo (nette au 1er plan, floutée bg) │
  │                                                             │
  │  Events: Aucun · Slots: Aucun                              │
  │                                                             │
  │  Variante 1/3 : fond = rappel flou de la photo de profil   │
  │  Layout asymétrique (texte gauche / photo nette droite)    │
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
 * PROF HERO BLUR - BEM strict
 * Fond immersif : photo de profil floutée + voile sombre
 */

.prof-hero-blur {
  position: relative;
  overflow: hidden;
  min-height: 95vh;
  display: flex;
  align-items: center;
  background-color: var(--bg-invert);
}

/* Background flou (rappel de la photo) */
.prof-hero-blur__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 25%;
  filter: blur(28px) brightness(0.5) saturate(1.1);
  transform: scale(1.15);
}

.prof-hero-blur__scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    100deg,
    rgba(0, 0, 0, 0.75) 0%,
    rgba(0, 0, 0, 0.45) 55%,
    rgba(0, 0, 0, 0.25) 100%
  );
}

/* Layout asymétrique */
.prof-hero-blur__layout {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

@media (min-width: 1024px) {
  .prof-hero-blur__layout {
    flex-direction: row;
    align-items: center;
  }
}

.prof-hero-blur__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
}

.prof-hero-blur__name {
  display: flex;
  flex-direction: column;
}

.prof-hero-blur__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.prof-hero-blur__visual {
  flex-shrink: 0;
}

@media (min-width: 1024px) {
  .prof-hero-blur__visual {
    width: 420px;
  }
}

.prof-hero-blur__photo {
  width: 100%;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
}

.prof-hero-blur__photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
