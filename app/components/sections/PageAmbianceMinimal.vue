<template>
  <section class="ambiance-minimal py-16 lg:py-24" data-theme="dark">
    <!-- Background image -->
    <img
      :src="image"
      :alt="imageAlt"
      class="ambiance-minimal__bg"
    />
    <!-- Overlay minimaliste -->
    <div class="ambiance-minimal__overlay" />

    <!-- Content -->
    <LayoutContainerMax class="relative z-10">
      <div class="flex flex-col items-center justify-center min-h-[55vh] lg:min-h-[60vh]">
        <!-- Logo ou icône centrale -->
        <div class="ambiance-minimal__icon mb-8">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-12 h-12 lg:w-16 lg:h-16">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
          </svg>
        </div>

        <!-- Texte central épuré -->
        <Text
          font="display"
          size="2xl"
          color="white"
          align="center"
          weight="light"
          tracking="wide"
          transform="uppercase"
          class="ambiance-minimal__text"
        >
          {{ line1 }}
        </Text>

        <div class="ambiance-minimal__divider my-4" />

        <Text
          font="display"
          size="4xl"
          color="white"
          align="center"
          weight="bold"
          leading="tight"
          class="ambiance-minimal__highlight"
        >
          {{ highlight }}
        </Text>

        <div class="ambiance-minimal__divider my-4" />

        <Text
          font="display"
          size="2xl"
          color="white"
          align="center"
          weight="light"
          tracking="wide"
          transform="uppercase"
          class="ambiance-minimal__text"
        >
          {{ line2 }}
        </Text>

        <!-- Petite accroche en bas -->
        <Text
          size="sm"
          color="white"
          align="center"
          weight="light"
          max-width="sm"
          class="mt-12 opacity-60"
        >
          {{ caption }}
        </Text>
      </div>
    </LayoutContainerMax>

    <!-- Lignes décoratives latérales -->
    <div class="ambiance-minimal__line-left" />
    <div class="ambiance-minimal__line-right" />
  </section>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────┐
  │                  PAGE AMBIANCE MINIMAL                       │
  │                                                              │
  │  ARCHITECTURE :                                              │
  │  - Image fond avec overlay sobre                             │
  │  - Contenu centré très épuré                                 │
  │  - Typographie comme élément principal                       │
  │  - Lignes décoratives minimalistes                           │
  │                                                              │
  │  ┌───────────────────────────────────────────────────────┐  │
  │  │  section.ambiance-minimal                             │  │
  │  │  ┌─────────────────────────────────────────────────┐  │  │
  │  │  │  img.ambiance-minimal__bg (absolute)            │  │  │
  │  │  └─────────────────────────────────────────────────┘  │  │
  │  │  ┌─────────────────────────────────────────────────┐  │  │
  │  │  │  .ambiance-minimal__overlay                     │  │  │
  │  │  └─────────────────────────────────────────────────┘  │  │
  │  │  ┌─────────────────────────────────────────────────┐  │  │
  │  │  │  LayoutContainerMax (centered)                  │  │  │
  │  │  │    ├─ .ambiance-minimal__icon (svg)             │  │  │
  │  │  │    ├─ Text (line1)                              │  │  │
  │  │  │    ├─ .ambiance-minimal__divider                │  │  │
  │  │  │    ├─ Text (highlight)                          │  │  │
  │  │  │    ├─ .ambiance-minimal__divider                │  │  │
  │  │  │    ├─ Text (line2)                              │  │  │
  │  │  │    └─ Text (caption)                            │  │  │
  │  │  └─────────────────────────────────────────────────┘  │  │
  │  │  ┌─────────────────────────────────────────────────┐  │  │
  │  │  │  .ambiance-minimal__line-left/right             │  │  │
  │  │  └─────────────────────────────────────────────────┘  │  │
  │  └───────────────────────────────────────────────────────┘  │
  │                                                              │
  │  Props:                                                      │
  │    • image: string (requis) - Chemin de l'image de fond      │
  │    • imageAlt: string (défaut: "") - Alt text                │
  │    • line1: string - Texte haut (petit)                      │
  │    • highlight: string - Mot central mis en avant            │
  │    • line2: string - Texte bas (petit)                       │
  │    • caption: string - Petite accroche en bas                │
  │                                                              │
  │  Events: Aucun (section purement visuelle)                   │
  │                                                              │
  │  Slots: Aucun (données via props)                            │
  └─────────────────────────────────────────────────────────────┘

  Section minimaliste où la typographie et l'image parlent
  d'elles-mêmes avec un design épuré et élégant

  @dev Tailwind pour spacing, CSS scoped BEM pour visuel
*/

const defaultImage = '/images/assetCTA.jpg';

interface Props {
  image?: string;
  imageAlt?: string;
  line1?: string;
  highlight?: string;
  line2?: string;
  caption?: string;
}

withDefaults(defineProps<Props>(), {
  image: defaultImage,
  imageAlt: '',
  line1: 'Danse comme si',
  highlight: 'personne ne regardait',
  line2: 'et vis pleinement',
  caption: 'Swave Connection, là où la danse devient une seconde nature',
});
</script>

<style scoped>
/**
 * AMBIANCE MINIMAL STYLES - BEM strict
 *
 * Section épurée avec focus sur la typographie
 */

.ambiance-minimal {
  position: relative;
  overflow: hidden;
  background-color: var(--bg-invert);
}

/* Background image */
.ambiance-minimal__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 1;
  filter: brightness(0.5) grayscale(0.3);
}

/* Overlay sobre bleu primary */
.ambiance-minimal__overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  background: rgba(15, 143, 197, 0.6);
}

/* Icon centrale */
.ambiance-minimal__icon {
  color: var(--primary);
  opacity: 0.8;
}

/* Texte épuré */
.ambiance-minimal__text {
  opacity: 0.7;
  letter-spacing: 0.3em;
}

/* Highlight central */
.ambiance-minimal__highlight {
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background: var(--primary);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
}

.ambiance-minimal:hover .ambiance-minimal__highlight::after {
  opacity: 1;
}

/* Divider */
.ambiance-minimal__divider {
  width: 2px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);

  @media (min-width: 1024px) {
    height: 30px;
  }
}

/* Lignes décoratives latérales */
.ambiance-minimal__line-left,
.ambiance-minimal__line-right {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 1px;
  height: 30%;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  z-index: 3;
}

.ambiance-minimal__line-left {
  left: 24px;

  @media (min-width: 1024px) {
    left: 60px;
  }
}

.ambiance-minimal__line-right {
  right: 24px;

  @media (min-width: 1024px) {
    right: 60px;
  }
}
</style>
