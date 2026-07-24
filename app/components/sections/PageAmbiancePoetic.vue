<template>
  <section class="ambiance-poetic py-20 lg:py-20" data-theme="dark">
    <!-- Background image -->
    <NuxtImg
      :src="image"
      :alt="imageAlt"
      class="ambiance-poetic__bg"
      sizes="xs:320px sm:640px md:768px lg:1024px xl:1280px"
      densities="x1"
      format="webp"
      loading="lazy"
    />
    <!-- Overlay doux avec dégradé -->
    <div class="ambiance-poetic__overlay" />

    <!-- Content -->
    <LayoutContainerMax class="relative z-10">
      <div class="flex flex-col lg:flex-row lg:items-center min-h-[50vh] lg:min-h-[65vh]">
        <!-- Zone citation (gauche) -->
        <div class="flex-1 flex flex-col justify-center lg:pr-16">
          <!-- Guillemets décoratifs -->
          <div class="ambiance-poetic__quote-mark">"</div>

          <!-- Citation principale -->
          <Text
            font="display"
            size="3xl"
            color="white"
            weight="medium"
            leading="snug"
            class="ambiance-poetic__quote"
          >
            {{ quote }}
          </Text>

          <!-- Auteur de la citation -->
          <div class="mt-8 flex items-center gap-4">
            <div class="ambiance-poetic__line" />
            <Text as="span" size="sm" color="white" weight="medium" transform="uppercase" class="opacity-70">
              {{ quoteAuthor }}
            </Text>
          </div>
        </div>

        <!-- Zone ambiance (droite) - visible sur grand écran -->
        <div class="hidden lg:flex flex-col items-end justify-center flex-1 pl-16">
          <!-- Mots-clés ambiance -->
          <div class="ambiance-poetic__keywords">
            <Text
              v-for="(word, index) in keywords"
              :key="index"
              as="span"
              font="display"
              size="xl"
              color="white"
              weight="bold"
              transform="uppercase"
              class="ambiance-poetic__keyword"
            >
              {{ word }}
            </Text>
          </div>

          <!-- Tagline -->
          <Text
            size="base"
            color="white"
            align="right"
            weight="light"
            max-width="sm"
            class="mt-8 opacity-80"
          >
            {{ tagline }}
          </Text>
        </div>
      </div>
    </LayoutContainerMax>

    <!-- Bande décorative bottom -->
    <div class="ambiance-poetic__band">
      <div class="ambiance-poetic__band-inner">
        <Text
          v-for="n in 4"
          :key="n"
          as="span"
          font="display"
          size="xs"
          color="white"
          weight="semibold"
          transform="uppercase"
          class="opacity-40"
        >
          {{ bandText }}
        </Text>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────┐
  │                  PAGE AMBIANCE POETIC                        │
  │                                                              │
  │  ARCHITECTURE :                                              │
  │  - Image fond avec overlay doux                              │
  │  - Citation mise en avant côté gauche                        │
  │  - Mots-clés flottants côté droit (desktop)                  │
  │  - Bande décorative en bas                                   │
  │                                                              │
  │  ┌───────────────────────────────────────────────────────┐  │
  │  │  section.ambiance-poetic                              │  │
  │  │  ┌─────────────────────────────────────────────────┐  │  │
  │  │  │  img.ambiance-poetic__bg (absolute)             │  │  │
  │  │  └─────────────────────────────────────────────────┘  │  │
  │  │  ┌─────────────────────────────────────────────────┐  │  │
  │  │  │  .ambiance-poetic__overlay                      │  │  │
  │  │  └─────────────────────────────────────────────────┘  │  │
  │  │  ┌─────────────────────────────────────────────────┐  │  │
  │  │  │  LayoutContainerMax (flex row)                  │  │  │
  │  │  │    ├─ Zone gauche                               │  │  │
  │  │  │    │    ├─ Quote mark                           │  │  │
  │  │  │    │    ├─ Text (quote)                         │  │  │
  │  │  │    │    └─ Text (author)                        │  │  │
  │  │  │    └─ Zone droite (lg only)                     │  │  │
  │  │  │         ├─ Keywords                             │  │  │
  │  │  │         └─ Text (tagline)                       │  │  │
  │  │  └─────────────────────────────────────────────────┘  │  │
  │  │  ┌─────────────────────────────────────────────────┐  │  │
  │  │  │  .ambiance-poetic__band                         │  │  │
  │  │  └─────────────────────────────────────────────────┘  │  │
  │  └───────────────────────────────────────────────────────┘  │
  │                                                              │
  │  Props:                                                      │
  │    • image: string (requis) - Chemin de l'image de fond      │
  │    • imageAlt: string (défaut: "") - Alt text                │
  │    • quote: string - Citation principale                     │
  │    • quoteAuthor: string - Auteur de la citation             │
  │    • keywords: string[] - Mots-clés ambiance                 │
  │    • tagline: string - Texte court droite                    │
  │    • bandText: string - Texte répété dans la bande           │
  │                                                              │
  │  Events: Aucun (section purement visuelle)                   │
  │                                                              │
  │  Slots: Aucun (données via props)                            │
  └─────────────────────────────────────────────────────────────┘

  Section poétique avec citation mise en avant pour créer
  une connexion émotionnelle avec le visiteur

  @dev Tailwind pour spacing, CSS scoped BEM pour visuel
*/

const defaultImage = '/images/assetCTA.jpg';

interface Props {
  image?: string;
  imageAlt?: string;
  quote?: string;
  quoteAuthor?: string;
  keywords?: string[];
  tagline?: string;
  bandText?: string;
}

withDefaults(defineProps<Props>(), {
  image: defaultImage,
  imageAlt: '',
  quote: 'La danse est le langage caché de l\'âme. Elle révèle ce que les mots ne peuvent exprimer.',
  quoteAuthor: 'Martha Graham',
  keywords: () => ['Passion', 'Connexion', 'Liberté'],
  tagline: 'Rejoins une communauté où chaque pas compte et chaque sourire est sincère.',
  bandText: 'Swave Connection',
});
</script>

<style scoped>
/**
 * AMBIANCE POETIC STYLES - BEM strict
 *
 * Section poétique avec citation et ambiance douce
 */

.ambiance-poetic {
  position: relative;
  overflow: hidden;
  background-color: var(--bg-invert);
}

/* Background image */
.ambiance-poetic__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 1;
  filter: brightness(0.7) saturate(0.9);
}

/* Overlay doux avec dégradé latéral primary */
.ambiance-poetic__overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  background: linear-gradient(
    to right,
    color-mix(in srgb, var(--primary-dark) 90%, transparent) 0%,
    color-mix(in srgb, var(--primary) 60%, transparent) 50%,
    color-mix(in srgb, var(--primary) 70%, transparent) 100%
  );
}

/* Guillemets décoratifs */
.ambiance-poetic__quote-mark {
  font-family: var(--font-display);
  font-size: 120px;
  line-height: 0.6;
  color: var(--primary);
  opacity: 0.4;
  margin-bottom: 16px;

  @media (min-width: 1024px) {
    font-size: 180px;
  }
}

/* Citation styling */
.ambiance-poetic__quote {
  font-style: italic;
}

/* Ligne décorative auteur */
.ambiance-poetic__line {
  width: 40px;
  height: 1px;
  background: var(--primary);
}

/* Keywords container */
.ambiance-poetic__keywords {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

/* Keyword individual */
.ambiance-poetic__keyword {
  position: relative;
  opacity: 0.6;
  transition: opacity 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    right: 0;
    width: 0;
    height: 2px;
    background: var(--primary);
    transition: width 0.3s ease;
  }
}

.ambiance-poetic:hover .ambiance-poetic__keyword {
  opacity: 1;

  &::after {
    width: 100%;
  }
}

/* Bande décorative bottom */
.ambiance-poetic__band {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;
  padding: 12px 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.ambiance-poetic__band-inner {
  display: flex;
  justify-content: center;
  gap: 60px;
  white-space: nowrap;
}
</style>
