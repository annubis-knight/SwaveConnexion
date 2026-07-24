<template>
  <section class="page-video-classic py-20 lg:py-28" data-theme="light">
    <LayoutContainerMax>
      <!-- Header centré -->
      <div class="page-video-classic__header">
        <Text
          as="span"
          size="sm"
          weight="semibold"
          color="primary"
          transform="uppercase"
          tracking="wide"
        >
          {{ tag }}
        </Text>

        <Heading :level="2" align="center">
          {{ title }}
        </Heading>

        <Text size="lg" weight="light" align="center" maxWidth="lg" class="page-video-classic__description">
          {{ description }}
        </Text>
      </div>

      <!-- Vidéo centrée avec bordure élégante -->
      <div class="page-video-classic__video-container">
        <div class="page-video-classic__video-frame">
          <VideoPreview
            :video-url="videoUrl"
            :poster="poster"
            :source="source"
            :likes="likes"
            :views="views"
            :show-engagement="showEngagement"
            tilt="none"
          />
        </div>
      </div>

      <!-- CTA centré -->
      <div class="page-video-classic__cta">
        <ButtonSwave v-if="ctaText" @click="handleCtaClick">
          {{ ctaText }}
        </ButtonSwave>

        <Text v-if="caption" as="span" size="sm" weight="regular" class="page-video-classic__caption">
          {{ caption }}
        </Text>
      </div>
    </LayoutContainerMax>
  </section>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                       PAGE VIDEO PREVIEW CLASSIC                             │
  │                                                                              │
  │  Version épurée et minimaliste - Contenu centré, focus sur la vidéo         │
  │  Design sobre avec bordure subtile et espacement généreux                    │
  │                                                                              │
  │  STRUCTURE:                                                                  │
  │  ┌────────────────────────────────────────────────────────────────────────┐  │
  │  │  section.page-video-classic                                           │  │
  │  │  ┌──────────────────────────────────────────────────────────────────┐  │  │
  │  │  │  LayoutContainerMax                                             │  │  │
  │  │  │    ├─ .page-video-classic__header (centré)                      │  │  │
  │  │  │    │    ├─ Text (tag)                                           │  │  │
  │  │  │    │    ├─ Heading h2                                           │  │  │
  │  │  │    │    └─ Text (description)                                   │  │  │
  │  │  │    ├─ .page-video-classic__video-container                      │  │  │
  │  │  │    │    └─ .page-video-classic__video-frame                     │  │  │
  │  │  │    │         └─ VideoPreview (tilt: none)                       │  │  │
  │  │  │    └─ .page-video-classic__cta (centré)                         │  │  │
  │  │  │         ├─ ButtonSwave                                          │  │  │
  │  │  │         └─ Text (caption)                                       │  │  │
  │  │  └──────────────────────────────────────────────────────────────────┘  │  │
  │  └────────────────────────────────────────────────────────────────────────┘  │
  │                                                                              │
  │  Props:                                                                      │
  │    • tag: string - Label au-dessus du titre                                  │
  │    • title: string - Titre principal                                         │
  │    • description: string - Texte descriptif                                  │
  │    • videoUrl, poster, source, likes, views, showEngagement - VideoPreview   │
  │    • caption: string - Légende                                               │
  │    • ctaText: string - Texte du bouton                                       │
  │                                                                              │
  │  Events: @cta-click                                                          │
  └─────────────────────────────────────────────────────────────────────────────┘
*/

/* Props */
interface Props {
  tag?: string;
  title?: string;
  description?: string;
  videoUrl?: string;
  poster?: string;
  source?: 'instagram' | 'tiktok';
  likes?: number;
  views?: number;
  showEngagement?: boolean;
  caption?: string;
  ctaText?: string;
}

withDefaults(defineProps<Props>(), {
  tag: 'Vidéo',
  title: 'Un aperçu de nos cours',
  description: 'Découvrez l\'ambiance unique de Swave Connection à travers nos vidéos.',
  likes: 0,
  views: 0,
  showEngagement: true,
});

/* Events */
interface Emits {
  (e: 'cta-click'): void;
}

const emit = defineEmits<Emits>();

const handleCtaClick = () => {
  emit('cta-click');
};
</script>

<style scoped>
/**
 * PAGE VIDEO CLASSIC - Design épuré et minimaliste
 * Tout centré, focus sur le contenu, espacement généreux
 */

.page-video-classic {
  background-color: var(--bg-subtle);
}

/* Header centré */
.page-video-classic__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
  margin-bottom: 3rem;

  @media (min-width: 1024px) {
    margin-bottom: 4rem;
  }
}

.page-video-classic__description {
  margin-left: auto;
  margin-right: auto;
}

/* Container vidéo */
.page-video-classic__video-container {
  display: flex;
  justify-content: center;
  margin-bottom: 2.5rem;

  @media (min-width: 1024px) {
    margin-bottom: 3rem;
  }
}

.page-video-classic__video-frame {
  position: relative;
  width: 280px;
  max-width: 100%;
  padding: 8px;
  background: var(--bg-base);
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  @media (min-width: 640px) {
    width: 320px;
  }

  @media (min-width: 1024px) {
    width: 340px;
  }

  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    background: linear-gradient(135deg, var(--primary-light), var(--primary), var(--primary-dark));
    border-radius: 22px;
    z-index: -1;
    opacity: 0.3;
  }
}

/* CTA centré */
.page-video-classic__cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.page-video-classic__caption {
  color: var(--text-subtle);
  font-style: italic;
}
</style>
