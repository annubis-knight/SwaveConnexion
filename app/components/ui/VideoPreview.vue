<template>
  <div :class="previewClass">
    <!-- Cadre principal avec effet ombre portée -->
    <div class="video-preview__frame">
      <!-- Badge source (Instagram, TikTok, etc.) -->
      <div v-if="source" class="video-preview__badge">
        <svg
          v-if="source === 'instagram'"
          class="video-preview__badge-icon"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
        <span class="video-preview__badge-text">{{ sourceLabel }}</span>
      </div>

      <!-- Zone vidéo/placeholder -->
      <div class="video-preview__media">
        <!-- Placeholder quand pas de vidéo -->
        <div v-if="!videoUrl" class="video-preview__placeholder">
          <svg
            class="video-preview__play-icon"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>

        <!-- Vidéo réelle -->
        <video
          v-else
          ref="videoRef"
          class="video-preview__video"
          :poster="poster"
          :loop="loop"
          :muted="muted"
          playsinline
          @click="togglePlay"
        >
          <source :src="videoUrl" type="video/mp4" />
        </video>

        <!-- Bouton play overlay -->
        <button
          v-if="videoUrl && !isPlaying"
          class="video-preview__play-btn"
          type="button"
          aria-label="Lire la vidéo"
          @click="togglePlay"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </button>
      </div>

      <!-- Barre d'engagement (likes, vues) -->
      <div v-if="showEngagement" class="video-preview__engagement">
        <div class="video-preview__stat">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <span>{{ formattedLikes }}</span>
        </div>
        <div class="video-preview__stat">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
          </svg>
          <span>{{ formattedViews }}</span>
        </div>
      </div>
    </div>

    <!-- Élément décoratif: petits cercles -->
    <div class="video-preview__deco video-preview__deco--top" aria-hidden="true"></div>
    <div class="video-preview__deco video-preview__deco--bottom" aria-hidden="true"></div>
  </div>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                            VIDEO PREVIEW                                     │
  │                                                                              │
  │  Composant UI pour afficher une vidéo (Instagram/TikTok) avec style cadre   │
  │  moderne, badge source, stats d'engagement et éléments décoratifs           │
  │                                                                              │
  │  STRUCTURE:                                                                  │
  │  ┌────────────────────────────────────────────────────────────────────────┐  │
  │  │  .video-preview                                                       │  │
  │  │  ┌──────────────────────────────────────────────────────────────────┐  │  │
  │  │  │  .video-preview__frame                                          │  │  │
  │  │  │    ├─ .video-preview__badge (source icon + label)               │  │  │
  │  │  │    ├─ .video-preview__media                                     │  │  │
  │  │  │    │    ├─ .video-preview__placeholder (ou video)               │  │  │
  │  │  │    │    └─ .video-preview__play-btn                             │  │  │
  │  │  │    └─ .video-preview__engagement (likes, views)                 │  │  │
  │  │  └──────────────────────────────────────────────────────────────────┘  │  │
  │  │  ├─ .video-preview__deco--top                                        │  │
  │  │  └─ .video-preview__deco--bottom                                     │  │
  │  └────────────────────────────────────────────────────────────────────────┘  │
  │                                                                              │
  │  Props:                                                                      │
  │    • videoUrl: string (optionnel) - URL de la vidéo MP4                      │
  │    • poster: string (optionnel) - Image de couverture                        │
  │    • source: 'instagram' | 'tiktok' (optionnel) - Badge source               │
  │    • likes: number (défaut: 0) - Nombre de likes                             │
  │    • views: number (défaut: 0) - Nombre de vues                              │
  │    • showEngagement: boolean (défaut: true) - Afficher stats                 │
  │    • loop: boolean (défaut: true) - Boucler la vidéo                         │
  │    • muted: boolean (défaut: true) - Vidéo muette par défaut                 │
  │    • tilt: 'none' | 'left' | 'right' (défaut: 'right') - Inclinaison         │
  │    • theme: 'light' | 'dark' (défaut: 'light') - Thème visuel                │
  │                                                                              │
  │  Events: Natifs uniquement (click sur vidéo)                                 │
  │                                                                              │
  │  Slots: Aucun                                                                │
  └─────────────────────────────────────────────────────────────────────────────┘
*/

import { ref, computed } from 'vue';

/* Props */
interface Props {
  videoUrl?: string;
  poster?: string;
  source?: 'instagram' | 'tiktok';
  likes?: number;
  views?: number;
  showEngagement?: boolean;
  loop?: boolean;
  muted?: boolean;
  tilt?: 'none' | 'left' | 'right';
  theme?: 'light' | 'dark';
}

const props = withDefaults(defineProps<Props>(), {
  likes: 0,
  views: 0,
  showEngagement: true,
  loop: true,
  muted: true,
  tilt: 'right',
  theme: 'light',
});

/* State */
const videoRef = ref<HTMLVideoElement | null>(null);
const isPlaying = ref(false);

/* Computed */
const previewClass = computed(() => [
  'video-preview',
  `video-preview--tilt-${props.tilt}`,
  `video-preview--${props.theme}`,
].join(' '));

const sourceLabel = computed(() => {
  if (props.source === 'instagram') return 'Instagram';
  if (props.source === 'tiktok') return 'TikTok';
  return '';
});

const formattedLikes = computed(() => formatNumber(props.likes));
const formattedViews = computed(() => formatNumber(props.views));

/* Helpers */
function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

/* Methods */
function togglePlay() {
  if (!videoRef.value) return;

  if (isPlaying.value) {
    videoRef.value.pause();
    isPlaying.value = false;
  } else {
    videoRef.value.play();
    isPlaying.value = true;
  }
}
</script>

<style scoped>
/**
 * VIDEO PREVIEW STYLES - BEM + CSS Nesting
 *
 * Design: Cadre moderne avec ombre portée, inclinaison légère,
 * badge source, stats d'engagement et éléments décoratifs
 */

/* Block: .video-preview
   Variables locales pour theming
   Content-first: prend la largeur de son conteneur (le conteneur définit la taille) */
.video-preview {
  position: relative;
  display: block;
  width: 100%;

  /* Theme variables - Light (default) */
  --vp-frame-bg: var(--bg-base);
  --vp-frame-border: var(--border-base);
  --vp-frame-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.1),
    0 20px 40px -10px rgba(0, 0, 0, 0.15);
  --vp-frame-shadow-hover: 0 8px 12px -2px rgba(0, 0, 0, 0.12),
    0 4px 8px -2px rgba(0, 0, 0, 0.08),
    0 30px 50px -15px rgba(0, 0, 0, 0.2);
  --vp-media-bg: linear-gradient(135deg, var(--bg-subtle) 0%, var(--border-base) 100%);
  --vp-engagement-bg: var(--bg-base);
  --vp-engagement-border: var(--border-base);
  --vp-stat-color: var(--text-base);
  --vp-stat-icon-color: var(--text-subtle);
  --vp-deco-opacity: 0.6;
}

/* Modifier: Theme dark - Override variables */
.video-preview--dark {
  --vp-frame-bg: var(--bg-invert);
  --vp-frame-border: rgba(255, 255, 255, 0.1);
  --vp-frame-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3),
    0 2px 4px -2px rgba(0, 0, 0, 0.2),
    0 20px 40px -10px rgba(0, 0, 0, 0.4),
    0 0 80px rgba(15, 143, 197, 0.15);
  --vp-frame-shadow-hover: 0 8px 12px -2px rgba(0, 0, 0, 0.4),
    0 4px 8px -2px rgba(0, 0, 0, 0.3),
    0 30px 50px -15px rgba(0, 0, 0, 0.5),
    0 0 100px rgba(15, 143, 197, 0.25);
  --vp-media-bg: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
  --vp-engagement-bg: rgba(255, 255, 255, 0.05);
  --vp-engagement-border: rgba(255, 255, 255, 0.1);
  --vp-stat-color: var(--text-inverse);
  --vp-stat-icon-color: rgba(255, 255, 255, 0.6);
  --vp-deco-opacity: 0.4;
}

/* Modifier: Tilt variations */
.video-preview--tilt-right {
  transform: rotate(2deg);
}

.video-preview--tilt-left {
  transform: rotate(-2deg);
}

.video-preview--tilt-none {
  transform: rotate(0deg);
}


/* Element: Frame principal */
.video-preview__frame {
  position: relative;
  width: 100%;
  background: var(--vp-frame-bg);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--vp-frame-shadow);
  border: 1px solid var(--vp-frame-border);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--vp-frame-shadow-hover);
  }
}

/* Element: Badge source */
.video-preview__badge {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  border-radius: 20px;
  color: var(--text-inverse);
}

.video-preview__badge-icon {
  width: 16px;
  height: 16px;
}

.video-preview__badge-text {
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.02em;
}

/* Element: Zone média */
.video-preview__media {
  position: relative;
  aspect-ratio: 9 / 16;
  width: 100%;
  background: var(--vp-media-bg);
}

/* Element: Placeholder */
.video-preview__placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    var(--primary-dark) 0%,
    var(--primary) 50%,
    var(--primary-light) 100%
  );
}

.video-preview__play-icon {
  width: 64px;
  height: 64px;
  min-width: 64px;
  min-height: 64px;
  flex-shrink: 0;
  color: var(--text-inverse);
  opacity: 0.9;
}

/* Element: Vidéo */
.video-preview__video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
}

/* Element: Bouton play overlay */
.video-preview__play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease;

  & svg {
    width: 32px;
    height: 32px;
    color: var(--text-inverse);
    margin-left: 4px; /* Centrage optique du triangle */
  }

  &:hover {
    transform: translate(-50%, -50%) scale(1.1);
    background: var(--primary);
  }

  &:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 4px;
  }
}

/* Element: Barre d'engagement */
.video-preview__engagement {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 12px 16px;
  background: var(--vp-engagement-bg);
  border-top: 1px solid var(--vp-engagement-border);
}

.video-preview__stat {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--vp-stat-color);

  & svg {
    width: 18px;
    height: 18px;
    color: var(--vp-stat-icon-color);
  }

  & span {
    font-family: var(--font-sans);
    font-size: 14px;
    font-weight: 500;
  }
}

/* Element: Décorations */
.video-preview__deco {
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--primary);
  opacity: var(--vp-deco-opacity);
  pointer-events: none;
}

.video-preview__deco--top {
  top: -20px;
  right: 20px;

  &::before {
    content: '';
    position: absolute;
    top: -8px;
    left: 20px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--primary-light);
    opacity: 0.8;
  }
}

.video-preview__deco--bottom {
  bottom: -16px;
  left: 30px;

  &::before {
    content: '';
    position: absolute;
    bottom: -12px;
    right: -24px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--primary-dark);
    opacity: 0.7;
  }
}

/* Responsive */
@media (min-width: 768px) {
  .video-preview__media {
    max-height: 500px;
  }

  .video-preview__play-btn {
    width: 80px;
    height: 80px;

    & svg {
      width: 36px;
      height: 36px;
    }
  }
}

</style>
