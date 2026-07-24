<template>
  <section class="ambiance-cinematic py-24 lg:py-40" data-theme="dark">
    <!-- Background image -->
    <img
      :src="image"
      :alt="imageAlt"
      class="ambiance-cinematic__bg"
    />
    <!-- Overlay gradient cinématique -->
    <div class="ambiance-cinematic__overlay" />

    <!-- Content -->
    <LayoutContainerMax class="relative z-10">
      <div class="flex flex-col items-center justify-center min-h-[60vh] lg:min-h-[70vh]">
        <!-- Tag badge -->
        <div class="ambiance-cinematic__tag mb-6">
          <Text as="span" size="xs" weight="semibold" color="white" transform="uppercase">
            {{ tag }}
          </Text>
        </div>

        <!-- Punchline principale -->
        <Heading :level="2" color="white" align="center">
          {{ headline }}
        </Heading>

        <!-- Sous-titre évocateur -->
        <Text
          size="xl"
          color="white"
          align="center"
          weight="light"
          leading="relaxed"
          max-width="md"
          class="mt-6 opacity-90"
        >
          {{ subheadline }}
        </Text>

        <!-- Indicateur scroll -->
        <div class="ambiance-cinematic__scroll mt-16">
          <div class="ambiance-cinematic__scroll-line" />
          <Text as="span" size="xs" color="white" weight="medium" transform="uppercase" class="opacity-60">
            {{ scrollText }}
          </Text>
        </div>
      </div>
    </LayoutContainerMax>

    <!-- Éléments décoratifs -->
    <div class="ambiance-cinematic__corner ambiance-cinematic__corner--top-left" />
    <div class="ambiance-cinematic__corner ambiance-cinematic__corner--top-right" />
    <div class="ambiance-cinematic__corner ambiance-cinematic__corner--bottom-left" />
    <div class="ambiance-cinematic__corner ambiance-cinematic__corner--bottom-right" />
  </section>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────┐
  │                 PAGE AMBIANCE CINEMATIC                      │
  │                                                              │
  │  ARCHITECTURE :                                              │
  │  - Image plein écran avec overlay cinématique                │
  │  - Vignettage subtil sur les bords                          │
  │  - Coins décoratifs style cinéma                            │
  │  - Animation scroll indicator                                │
  │                                                              │
  │  ┌───────────────────────────────────────────────────────┐  │
  │  │  section.ambiance-cinematic                           │  │
  │  │  ┌─────────────────────────────────────────────────┐  │  │
  │  │  │  img.ambiance-cinematic__bg (absolute)          │  │  │
  │  │  └─────────────────────────────────────────────────┘  │  │
  │  │  ┌─────────────────────────────────────────────────┐  │  │
  │  │  │  .ambiance-cinematic__overlay (vignette)        │  │  │
  │  │  └─────────────────────────────────────────────────┘  │  │
  │  │  ┌─────────────────────────────────────────────────┐  │  │
  │  │  │  LayoutContainerMax                             │  │  │
  │  │  │    ├─ .ambiance-cinematic__tag                  │  │  │
  │  │  │    ├─ Heading (headline)                        │  │  │
  │  │  │    ├─ Text (subheadline)                        │  │  │
  │  │  │    └─ .ambiance-cinematic__scroll               │  │  │
  │  │  └─────────────────────────────────────────────────┘  │  │
  │  │  ┌─────────────────────────────────────────────────┐  │  │
  │  │  │  .ambiance-cinematic__corner (x4)               │  │  │
  │  │  └─────────────────────────────────────────────────┘  │  │
  │  └───────────────────────────────────────────────────────┘  │
  │                                                              │
  │  Props:                                                      │
  │    • image: string (requis) - Chemin de l'image de fond      │
  │    • imageAlt: string (défaut: "") - Alt text                │
  │    • tag: string (défaut: "Ambiance") - Badge en haut        │
  │    • headline: string - Punchline principale                 │
  │    • subheadline: string - Texte secondaire évocateur        │
  │    • scrollText: string (défaut: "Découvrir")                │
  │                                                              │
  │  Events: Aucun (section purement visuelle)                   │
  │                                                              │
  │  Slots: Aucun (données via props)                            │
  └─────────────────────────────────────────────────────────────┘

  Section immersive style cinématique pour créer une ambiance forte
  via une image plein écran avec effets de vignettage

  @dev Tailwind pour spacing, CSS scoped BEM pour visuel
*/

const defaultImage = '/images/assetCTA.jpg';

interface Props {
  image?: string;
  imageAlt?: string;
  tag?: string;
  headline?: string;
  subheadline?: string;
  scrollText?: string;
}

withDefaults(defineProps<Props>(), {
  image: defaultImage,
  imageAlt: '',
  tag: 'Ambiance',
  headline: 'Ressens la musique. Vis le moment.',
  subheadline: 'Chaque cours est une invitation à te connecter avec toi-même et les autres. La danse, c\'est bien plus que des pas.',
  scrollText: 'Découvrir',
});
</script>

<style scoped>
/**
 * AMBIANCE CINEMATIC STYLES - BEM strict
 *
 * Section immersive avec image plein écran et effets cinématiques
 */

.ambiance-cinematic {
  position: relative;
  overflow: hidden;
  background-color: var(--bg-invert);
}

/* Background image - absolute, covers section */
.ambiance-cinematic__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 1;
  filter: brightness(0.85);
}

/* Overlay cinématique avec vignettage bleu primary */
.ambiance-cinematic__overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  background: radial-gradient(
    ellipse at center,
    rgba(15, 143, 197, 0.4) 0%,
    rgba(15, 143, 197, 0.6) 50%,
    rgba(0, 96, 151, 0.85) 100%
  );
}

/* Tag badge */
.ambiance-cinematic__tag {
  padding: 8px 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
}

/* Scroll indicator */
.ambiance-cinematic__scroll {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.ambiance-cinematic__scroll-line {
  width: 1px;
  height: 40px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.6),
    transparent
  );
  animation: scroll-pulse 2s ease-in-out infinite;
}

@keyframes scroll-pulse {
  0%, 100% {
    opacity: 0.3;
    transform: scaleY(0.8);
  }
  50% {
    opacity: 1;
    transform: scaleY(1);
  }
}

/* Coins décoratifs style cinéma */
.ambiance-cinematic__corner {
  position: absolute;
  width: 60px;
  height: 60px;
  border-color: rgba(255, 255, 255, 0.2);
  border-style: solid;
  border-width: 0;
  z-index: 3;

  @media (min-width: 1024px) {
    width: 80px;
    height: 80px;
  }
}

.ambiance-cinematic__corner--top-left {
  top: 24px;
  left: 24px;
  border-top-width: 2px;
  border-left-width: 2px;

  @media (min-width: 1024px) {
    top: 40px;
    left: 40px;
  }
}

.ambiance-cinematic__corner--top-right {
  top: 24px;
  right: 24px;
  border-top-width: 2px;
  border-right-width: 2px;

  @media (min-width: 1024px) {
    top: 40px;
    right: 40px;
  }
}

.ambiance-cinematic__corner--bottom-left {
  bottom: 24px;
  left: 24px;
  border-bottom-width: 2px;
  border-left-width: 2px;

  @media (min-width: 1024px) {
    bottom: 40px;
    left: 40px;
  }
}

.ambiance-cinematic__corner--bottom-right {
  bottom: 24px;
  right: 24px;
  border-bottom-width: 2px;
  border-right-width: 2px;

  @media (min-width: 1024px) {
    bottom: 40px;
    right: 40px;
  }
}
</style>
