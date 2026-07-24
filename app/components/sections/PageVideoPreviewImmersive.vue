<template>
  <section class="page-video-immersive" data-theme="dark">
    <!-- Background avec overlay gradient -->
    <div class="page-video-immersive__bg" aria-hidden="true">
      <div class="page-video-immersive__bg-gradient"></div>
    </div>

    <!-- Contenu principal -->
    <div class="page-video-immersive__content py-24 lg:py-32">
      <LayoutContainerMax>
        <!-- Header avec badge flottant -->
        <div class="page-video-immersive__header">
          <div class="page-video-immersive__badge-row">
            <div class="page-video-immersive__line" aria-hidden="true"></div>
            <Text
              as="span"
              size="sm"
              weight="semibold"
              color="white"
              transform="uppercase"
              tracking="wide"
            >
              {{ tag }}
            </Text>
            <div class="page-video-immersive__line" aria-hidden="true"></div>
          </div>

          <Heading :level="2" color="white" align="center">
            {{ title }}
          </Heading>
        </div>

        <!-- Zone vidéo cinématique -->
        <div class="page-video-immersive__stage">
          <!-- Glow effect derrière la vidéo -->
          <div class="page-video-immersive__glow" aria-hidden="true"></div>

          <!-- Cadre vidéo avec reflet -->
          <div class="page-video-immersive__video-wrapper">
            <div class="page-video-immersive__video-frame">
              <VideoPreview
                :video-url="videoUrl"
                :poster="poster"
                :source="source"
                :likes="likes"
                :views="views"
                :show-engagement="false"
                tilt="none"
                theme="dark"
              />
            </div>

            <!-- Reflet sous la vidéo -->
            <div class="page-video-immersive__reflection" aria-hidden="true"></div>
          </div>

          <!-- Stats flottantes autour de la vidéo -->
          <div class="page-video-immersive__floating-stats">
            <div class="page-video-immersive__floating-stat page-video-immersive__floating-stat--left">
              <Text as="span" size="3xl" weight="bold" color="white">{{ stat1Value }}</Text>
              <Text as="span" size="xs" color="white" weight="medium" transform="uppercase">{{ stat1Label }}</Text>
            </div>

            <div class="page-video-immersive__floating-stat page-video-immersive__floating-stat--right">
              <Text as="span" size="3xl" weight="bold" color="white">{{ stat2Value }}</Text>
              <Text as="span" size="xs" color="white" weight="medium" transform="uppercase">{{ stat2Label }}</Text>
            </div>
          </div>
        </div>

        <!-- Footer avec description et CTA -->
        <div class="page-video-immersive__footer">
          <Text size="lg" weight="light" color="white" align="center" maxWidth="lg" class="page-video-immersive__description">
            {{ description }}
          </Text>

          <div class="page-video-immersive__cta-row">
            <ButtonSwave v-if="ctaText" @click="handleCtaClick">
              {{ ctaText }}
            </ButtonSwave>

            <!-- Indicateur social -->
            <div v-if="showSocial" class="page-video-immersive__social">
              <div class="page-video-immersive__social-avatars">
                <div class="page-video-immersive__avatar"></div>
                <div class="page-video-immersive__avatar"></div>
                <div class="page-video-immersive__avatar"></div>
              </div>
              <Text as="span" size="sm" color="white" weight="regular">
                {{ socialText }}
              </Text>
            </div>
          </div>
        </div>
      </LayoutContainerMax>
    </div>

    <!-- Particules décoratives -->
    <div class="page-video-immersive__particles" aria-hidden="true">
      <div class="page-video-immersive__particle page-video-immersive__particle--1"></div>
      <div class="page-video-immersive__particle page-video-immersive__particle--2"></div>
      <div class="page-video-immersive__particle page-video-immersive__particle--3"></div>
      <div class="page-video-immersive__particle page-video-immersive__particle--4"></div>
      <div class="page-video-immersive__particle page-video-immersive__particle--5"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                       PAGE VIDEO PREVIEW IMMERSIVE                           │
  │                                                                              │
  │  Version full-width cinématique - Fond sombre, glow effects, particules     │
  │  Design premium avec stats flottantes et social proof                        │
  │                                                                              │
  │  STRUCTURE:                                                                  │
  │  ┌────────────────────────────────────────────────────────────────────────┐  │
  │  │  section.page-video-immersive (full-width, fond noir)                 │  │
  │  │  ├─ .page-video-immersive__bg (gradient overlay)                      │  │
  │  │  ├─ .page-video-immersive__content                                    │  │
  │  │  │    └─ LayoutContainerMax                                           │  │
  │  │  │         ├─ __header (badge + titre centré)                         │  │
  │  │  │         ├─ __stage                                                 │  │
  │  │  │         │    ├─ __glow (effet lumineux)                            │  │
  │  │  │         │    ├─ __video-wrapper                                    │  │
  │  │  │         │    │    ├─ __video-frame + VideoPreview                  │  │
  │  │  │         │    │    └─ __reflection                                  │  │
  │  │  │         │    └─ __floating-stats (gauche + droite)                 │  │
  │  │  │         └─ __footer                                                │  │
  │  │  │              ├─ Text (description)                                 │  │
  │  │  │              └─ __cta-row                                          │  │
  │  │  │                   ├─ ButtonSwave                                   │  │
  │  │  │                   └─ __social (avatars + texte)                    │  │
  │  │  └─ __particles (x5 particules animées)                               │  │
  │  └────────────────────────────────────────────────────────────────────────┘  │
  │                                                                              │
  │  Props: tag, title, description, videoUrl, poster, source, likes, views,     │
  │         stat1Value/Label, stat2Value/Label, ctaText, showSocial, socialText  │
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
  stat1Value?: string;
  stat1Label?: string;
  stat2Value?: string;
  stat2Label?: string;
  ctaText?: string;
  showSocial?: boolean;
  socialText?: string;
}

withDefaults(defineProps<Props>(), {
  tag: 'Expérience',
  title: 'Plongez dans l\'univers Swave',
  description: 'Une immersion totale dans la danse latine. Rejoignez notre communauté et vivez des moments inoubliables.',
  likes: 0,
  views: 0,
  stat1Value: '8.5K',
  stat1Label: 'Vues',
  stat2Value: '1.2K',
  stat2Label: 'Likes',
  showSocial: true,
  socialText: '+200 personnes ont rejoint ce mois-ci',
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
 * PAGE VIDEO IMMERSIVE - Design cinématique premium
 * Full-width, fond sombre, effets glow, particules animées
 */

.page-video-immersive {
  position: relative;
  overflow: hidden;
  background-color: var(--bg-invert);
}

/* Background avec gradient */
.page-video-immersive__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.page-video-immersive__bg-gradient {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 80% 50% at 50% 0%,
    rgba(15, 143, 197, 0.15) 0%,
    transparent 60%
  );
}

/* Contenu principal */
.page-video-immersive__content {
  position: relative;
  z-index: 1;
}

/* Header */
.page-video-immersive__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 3rem;

  @media (min-width: 1024px) {
    margin-bottom: 4rem;
  }
}

.page-video-immersive__badge-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.page-video-immersive__line {
  width: 40px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--primary), transparent);

  @media (min-width: 1024px) {
    width: 60px;
  }
}

/* Stage vidéo */
.page-video-immersive__stage {
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;

  @media (min-width: 1024px) {
    margin-bottom: 4rem;
  }
}

/* Glow effect */
.page-video-immersive__glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, var(--primary) 0%, transparent 70%);
  opacity: 0.2;
  filter: blur(60px);
  animation: glowPulse 4s ease-in-out infinite;
}

@keyframes glowPulse {
  0%, 100% { opacity: 0.2; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.3; transform: translate(-50%, -50%) scale(1.1); }
}

/* Video wrapper */
.page-video-immersive__video-wrapper {
  position: relative;
  z-index: 1;
}

.page-video-immersive__video-frame {
  position: relative;
  width: 280px;
  max-width: 100%;
  border-radius: 20px;
  overflow: hidden;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.1),
    0 20px 50px rgba(0, 0, 0, 0.5),
    0 0 100px rgba(15, 143, 197, 0.2);

  @media (min-width: 640px) {
    width: 340px;
  }

  @media (min-width: 768px) {
    width: 380px;
  }
}

/* Reflet */
.page-video-immersive__reflection {
  position: absolute;
  bottom: -60px;
  left: 10%;
  right: 10%;
  height: 60px;
  background: linear-gradient(
    to bottom,
    rgba(15, 143, 197, 0.15) 0%,
    transparent 100%
  );
  filter: blur(8px);
  transform: scaleY(-1);
  opacity: 0.5;
}

/* Stats flottantes */
.page-video-immersive__floating-stats {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: none;
  justify-content: space-between;
  padding: 0 2rem;
  pointer-events: none;

  @media (min-width: 1024px) {
    display: flex;
  }
}

.page-video-immersive__floating-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.page-video-immersive__floating-stat--left {
  transform: translateX(-20px);
}

.page-video-immersive__floating-stat--right {
  transform: translateX(20px);
}

/* Footer */
.page-video-immersive__footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.page-video-immersive__description {
  opacity: 0.9;
  margin-left: auto;
  margin-right: auto;
}

.page-video-immersive__cta-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 2rem;
  }
}

/* Social proof */
.page-video-immersive__social {
  display: flex;
  align-items: center;
  gap: 12px;
}

.page-video-immersive__social-avatars {
  display: flex;
}

.page-video-immersive__avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-light), var(--primary));
  border: 2px solid var(--bg-invert);
  margin-left: -8px;

  &:first-child {
    margin-left: 0;
  }
}

/* Particules */
.page-video-immersive__particles {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.page-video-immersive__particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--primary-light);
  border-radius: 50%;
  opacity: 0.4;
  animation: particleFloat 8s ease-in-out infinite;
}

.page-video-immersive__particle--1 {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.page-video-immersive__particle--2 {
  top: 60%;
  left: 5%;
  animation-delay: 1.5s;
}

.page-video-immersive__particle--3 {
  top: 30%;
  right: 15%;
  animation-delay: 3s;
}

.page-video-immersive__particle--4 {
  top: 70%;
  right: 8%;
  animation-delay: 4.5s;
}

.page-video-immersive__particle--5 {
  top: 45%;
  right: 25%;
  animation-delay: 6s;
}

@keyframes particleFloat {
  0%, 100% {
    transform: translateY(0) translateX(0);
    opacity: 0.4;
  }
  25% {
    transform: translateY(-30px) translateX(10px);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-10px) translateX(-10px);
    opacity: 0.3;
  }
  75% {
    transform: translateY(-40px) translateX(5px);
    opacity: 0.5;
  }
}
</style>
