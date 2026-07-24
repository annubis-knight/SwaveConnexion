<template>
  <section class="page-video-dynamic py-20 lg:py-80" data-theme="light">
    <!-- Logos décoratifs animés -->
    <img
      src="~/assets/images/logo_alpha.png"
      alt=""
      aria-hidden="true"
      class="page-video-dynamic__decor page-video-dynamic__decor--1"
    />
    <img
      src="~/assets/images/logo_alpha.png"
      alt=""
      aria-hidden="true"
      class="page-video-dynamic__decor page-video-dynamic__decor--2"
    />
    <img
      src="~/assets/images/logo_alpha.png"
      alt=""
      aria-hidden="true"
      class="page-video-dynamic__decor page-video-dynamic__decor--3"
    />

    <LayoutContainerMax>
      <div class="page-video-dynamic__layout">
        <!-- Colonne vidéo avec effet carte -->
        <div class="page-video-dynamic__video-col">
          <!-- Carte vidéo principale -->
          <div class="page-video-dynamic__card page-video-dynamic__card--main">
            <VideoPreview
              :video-url="videoUrl"
              :poster="poster"
              :source="source"
              :likes="likes"
              :views="views"
              :show-engagement="showEngagement"
              tilt="left"
            />
          </div>

          <!-- Mini cartes flottantes décoratives -->
          <div class="page-video-dynamic__floating-card page-video-dynamic__floating-card--top">
            <div class="page-video-dynamic__mini-stat">
              <span class="page-video-dynamic__mini-stat-icon">🔥</span>
              <Text as="span" size="xs" weight="bold">Trending</Text>
            </div>
          </div>

          <div class="page-video-dynamic__floating-card page-video-dynamic__floating-card--bottom">
            <div class="page-video-dynamic__mini-stat">
              <span class="page-video-dynamic__mini-stat-icon">💃</span>
              <Text as="span" size="xs" weight="bold">{{ danceStyle }}</Text>
            </div>
          </div>
        </div>

        <!-- Colonne contenu -->
        <div class="page-video-dynamic__content-col">
          <!-- Badge -->
          <LabelSwave icon="heart">{{ tag }}</LabelSwave>

          <!-- Titre avec effet gradient -->
          <Heading :level="2" class="page-video-dynamic__title">
            {{ titleLine1 }}<br />
            <span class="page-video-dynamic__title-gradient">{{ titleLine2 }}</span>
          </Heading>

          <!-- Description -->
          <Text size="lg" weight="light" maxWidth="md">
            {{ description }}
          </Text>

          <!-- Stats avec icônes -->
          <div class="page-video-dynamic__stats">
            <div class="page-video-dynamic__stat">
              <div class="page-video-dynamic__stat-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div class="page-video-dynamic__stat-content">
                <Text as="span" size="xl" weight="bold" color="primary">{{ stat1Value }}</Text>
                <Text as="span" size="xs" weight="medium">{{ stat1Label }}</Text>
              </div>
            </div>

            <div class="page-video-dynamic__stat">
              <div class="page-video-dynamic__stat-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              </div>
              <div class="page-video-dynamic__stat-content">
                <Text as="span" size="xl" weight="bold" color="primary">{{ stat2Value }}</Text>
                <Text as="span" size="xs" weight="medium">{{ stat2Label }}</Text>
              </div>
            </div>

            <div class="page-video-dynamic__stat">
              <div class="page-video-dynamic__stat-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                </svg>
              </div>
              <div class="page-video-dynamic__stat-content">
                <Text as="span" size="xl" weight="bold" color="primary">{{ stat3Value }}</Text>
                <Text as="span" size="xs" weight="medium">{{ stat3Label }}</Text>
              </div>
            </div>
          </div>

          <!-- CTA avec effet hover -->
          <div class="page-video-dynamic__cta-wrapper">
            <ButtonSwave v-if="ctaText" @click="handleCtaClick">
              {{ ctaText }}
            </ButtonSwave>

            <Text v-if="caption" as="span" size="sm" class="page-video-dynamic__caption">
              {{ caption }}
            </Text>
          </div>
        </div>
      </div>
    </LayoutContainerMax>
  </section>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                       PAGE VIDEO PREVIEW DYNAMIC                             │
  │                                                                              │
  │  Version énergique avec éléments flottants, animations et couleurs vives    │
  │  Design moderne avec cartes décoratives et stats animées                     │
  │                                                                              │
  │  STRUCTURE (Desktop):                                                        │
  │  ┌────────────────────────────────────────────────────────────────────────┐  │
  │  │  section.page-video-dynamic                                           │  │
  │  │  ├─ .page-video-dynamic__decor (x3 - cercles animés)                  │  │
  │  │  └─ LayoutContainerMax                                                │  │
  │  │       └─ .page-video-dynamic__layout (flex row-reverse)               │  │
  │  │            ┌─────────────────┬─────────────────────┐                   │  │
  │  │            │  __video-col    │  __content-col      │                   │  │
  │  │            │  ├─ __card      │  ├─ __badge         │                   │  │
  │  │            │  │   └─ Video   │  ├─ Heading         │                   │  │
  │  │            │  ├─ __floating  │  ├─ Text            │                   │  │
  │  │            │  │   (Trending) │  ├─ __stats (x3)    │                   │  │
  │  │            │  └─ __floating  │  └─ __cta-wrapper   │                   │  │
  │  │            │      (Bachata)  │                     │                   │  │
  │  │            └─────────────────┴─────────────────────┘                   │  │
  │  └────────────────────────────────────────────────────────────────────────┘  │
  │                                                                              │
  │  Props: tag, titleLine1, titleLine2, description, danceStyle,                │
  │         stat1Value/Label, stat2Value/Label, stat3Value/Label,                │
  │         videoUrl, poster, source, likes, views, showEngagement,              │
  │         caption, ctaText                                                     │
  │                                                                              │
  │  Events: @cta-click                                                          │
  └─────────────────────────────────────────────────────────────────────────────┘
*/

/* Props */
interface Props {
  tag?: string;
  titleLine1?: string;
  titleLine2?: string;
  description?: string;
  danceStyle?: string;
  stat1Value?: string;
  stat1Label?: string;
  stat2Value?: string;
  stat2Label?: string;
  stat3Value?: string;
  stat3Label?: string;
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
  tag: 'Live',
  titleLine1: 'Ressens',
  titleLine2: 'l\'énergie Swave',
  description: 'Plonge dans l\'univers de la danse latine avec notre communauté passionnée. Chaque cours est une nouvelle aventure.',
  danceStyle: 'Bachata',
  stat1Value: '500+',
  stat1Label: 'Élèves actifs',
  stat2Value: '4.9',
  stat2Label: 'Note moyenne',
  stat3Value: '50+',
  stat3Label: 'Cours/mois',
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
 * PAGE VIDEO DYNAMIC - Design énergique et moderne
 * Éléments flottants, animations, couleurs vives
 */

.page-video-dynamic {
  position: relative;
  overflow: hidden;
  background-color: var(--bg-base);
}

/* Logos décoratifs animés */
.page-video-dynamic__decor {
  position: absolute;
  pointer-events: none;
  opacity: 0.15;
  filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.3));
}

.page-video-dynamic__decor--1 {
  width: 280px;
  top: -80px;
  right: -40px;
  animation: float1 6s ease-in-out infinite;

  @media (min-width: 768px) {
    width: 360px;
  }
}

.page-video-dynamic__decor--2 {
  width: 180px;
  bottom: -30px;
  left: 5%;
  animation: float2 6s ease-in-out infinite 2s;

  @media (min-width: 768px) {
    width: 240px;
  }
}

.page-video-dynamic__decor--3 {
  width: 120px;
  top: 35%;
  left: -20px;
  animation: float3 6s ease-in-out infinite 4s;

  @media (min-width: 768px) {
    width: 160px;
  }
}

@keyframes float1 {
  0%, 100% { transform: translateY(0) rotate(15deg); }
  50% { transform: translateY(-20px) rotate(15deg) scale(1.05); }
}

@keyframes float2 {
  0%, 100% { transform: translateY(0) rotate(-10deg); }
  50% { transform: translateY(-20px) rotate(-10deg) scale(1.05); }
}

@keyframes float3 {
  0%, 100% { transform: translateY(0) rotate(25deg); }
  50% { transform: translateY(-20px) rotate(25deg) scale(1.05); }
}

/* Layout principal */
.page-video-dynamic__layout {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;

  @media (min-width: 1024px) {
    flex-direction: row-reverse;
    gap: 5rem;
    align-items: center;
  }
}

/* Colonne vidéo */
.page-video-dynamic__video-col {
  position: relative;
  width: 280px;
  max-width: 100%;

  @media (min-width: 640px) {
    width: 320px;
  }

  @media (min-width: 1024px) {
    width: 380px;
    flex-shrink: 0;
  }
}

.page-video-dynamic__card--main {
  position: relative;
  z-index: 1;
}

/* Cartes flottantes */
.page-video-dynamic__floating-card {
  position: absolute;
  z-index: 10;
  padding: 8px 14px;
  background: var(--bg-base);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  animation: floatCard 4s ease-in-out infinite;
}

.page-video-dynamic__floating-card--top {
  top: -10px;
  right: -20px;
  animation-delay: 0s;

  @media (min-width: 1024px) {
    top: 20px;
    right: -40px;
  }
}

.page-video-dynamic__floating-card--bottom {
  bottom: 40px;
  left: -15px;
  animation-delay: 2s;

  @media (min-width: 1024px) {
    bottom: 60px;
    left: -30px;
  }
}

@keyframes floatCard {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.page-video-dynamic__mini-stat {
  display: flex;
  align-items: center;
  gap: 6px;
}

.page-video-dynamic__mini-stat-icon {
  font-size: 16px;
}

/* Colonne contenu */
.page-video-dynamic__content-col {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: center;

  @media (min-width: 1024px) {
    flex: 1;
    text-align: left;
    gap: 1.75rem;
  }
}

/* Titre avec gradient */
.page-video-dynamic__title-gradient {
  background: linear-gradient(135deg, var(--primary), var(--primary-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Stats */
.page-video-dynamic__stats {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  padding: 1rem 0;

  @media (min-width: 1024px) {
    justify-content: flex-start;
    gap: 2rem;
  }
}

.page-video-dynamic__stat {
  display: flex;
  align-items: center;
  gap: 10px;
}

.page-video-dynamic__stat-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(15, 143, 197, 0.1);
  border-radius: 10px;

  & svg {
    width: 20px;
    height: 20px;
    color: var(--primary);
  }
}

.page-video-dynamic__stat-content {
  display: flex;
  flex-direction: column;
}

/* CTA wrapper */
.page-video-dynamic__cta-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding-top: 0.5rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: center;
    gap: 1.5rem;
  }
}

.page-video-dynamic__caption {
  color: var(--text-subtle);
}
</style>
