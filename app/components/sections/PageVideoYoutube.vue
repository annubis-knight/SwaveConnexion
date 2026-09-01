<template>
  <section class="video-youtube py-16 lg:py-24" data-theme="dark">
    <LayoutContainerMax>
      <div class="video-youtube__head">
        <Text
          v-if="tag"
          as="span"
          size="sm"
          weight="semibold"
          transform="uppercase"
          tracking="wide"
          color="primary"
        >
          {{ tag }}
        </Text>

        <Heading :level="2" color="white">{{ title }}</Heading>

        <Text
          v-if="description"
          color="white"
          weight="light"
          leading="relaxed"
          max-width="lg"
        >
          {{ description }}
        </Text>
      </div>

      <div class="video-youtube__frame">
        <!-- Facade : tant qu'on n'a pas cliqué, aucune ressource YouTube
             n'est chargée (hors miniature) et aucun cookie n'est déposé. -->
        <button
          v-if="!isPlaying"
          type="button"
          class="video-youtube__facade"
          :aria-label="`Lire la vidéo : ${title}`"
          @click="isPlaying = true"
        >
          <img
            :src="thumbnail"
            :alt="thumbnailAlt || title"
            class="video-youtube__thumb"
            width="1280"
            height="720"
            loading="lazy"
            decoding="async"
            @error="useFallbackThumbnail"
          >
          <span class="video-youtube__play" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>

        <iframe
          v-else
          class="video-youtube__iframe"
          :src="embedUrl"
          :title="title"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        />
      </div>
    </LayoutContainerMax>
  </section>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────┐
  │                    PAGE VIDEO YOUTUBE                        │
  │  ┌───────────────────────────────────────────────────────┐  │
  │  │  section.video-youtube                                │  │
  │  │    └─ LayoutContainerMax                              │  │
  │  │         ├─ .video-youtube__head                       │  │
  │  │         │    ├─ Text (tag)                            │  │
  │  │         │    ├─ Heading (title)                       │  │
  │  │         │    └─ Text (description)                    │  │
  │  │         └─ .video-youtube__frame (ratio 16/9)         │  │
  │  │              ├─ button.__facade (miniature + play)    │  │
  │  │              └─ iframe (après clic uniquement)        │  │
  │  └───────────────────────────────────────────────────────┘  │
  │                                                             │
  │  Props:                                                     │
  │    • videoId: string (requis) - ID YouTube (ex: 8-aC39RWmEg)│
  │    • title: string (requis) - Titre de la section           │
  │    • description?: string - Texte sous le titre             │
  │    • tag?: string - Petit label au-dessus du titre          │
  │    • thumbnailAlt?: string - Alt de la miniature            │
  │                                                             │
  │  Events: Aucun (l'état de lecture reste interne)            │
  │  Slots: Aucun (données via props)                           │
  └─────────────────────────────────────────────────────────────┘

  @dev Pattern "facade" : le lecteur YouTube (~1 Mo de JS) et ses cookies ne
       sont chargés qu'au clic. Seule la miniature part au chargement.
  @dev Domaine youtube-nocookie.com : pas de traceur avant lecture.
  @dev autoplay=1 dans l'URL car l'iframe n'apparaît qu'après un clic
       utilisateur — la lecture démarre donc sans second clic.
*/

interface Props {
  videoId: string;
  title: string;
  description?: string;
  tag?: string;
  thumbnailAlt?: string;
}

const props = withDefaults(defineProps<Props>(), {
  description: '',
  tag: '',
  thumbnailAlt: '',
});

const isPlaying = ref(false);

/*
  maxresdefault n'existe pas pour toutes les vidéos (dépend de la résolution
  de l'upload) : on retombe sur hqdefault, toujours généré par YouTube.
*/
const thumbnail = ref(
  `https://i.ytimg.com/vi/${props.videoId}/maxresdefault.jpg`
);

const useFallbackThumbnail = () => {
  thumbnail.value = `https://i.ytimg.com/vi/${props.videoId}/hqdefault.jpg`;
};

const embedUrl = computed(
  () =>
    `https://www.youtube-nocookie.com/embed/${props.videoId}?autoplay=1&rel=0`
);
</script>

<style scoped>
/**
 * PAGE VIDEO YOUTUBE - BEM strict
 * Section sombre + lecteur en ratio 16/9 avec facade cliquable
 */

.video-youtube {
  background-color: var(--bg-invert);
}

.video-youtube__head {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Cadre du lecteur : ratio fixe pour éviter tout saut de mise en page */
.video-youtube__frame {
  position: relative;
  aspect-ratio: 16 / 9;
  width: 100%;
  overflow: hidden;
  /* Valeur en dur : --border-radius-md n'est pas defini dans _variables.css */
  border-radius: 12px;
  background-color: var(--secondary-dark);
}

.video-youtube__facade {
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
}

.video-youtube__thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Pastille de lecture centrée */
.video-youtube__play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 999px;
  background-color: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
  color: var(--text-inverse);
  transition: background-color 0.3s ease, border-color 0.3s ease,
    transform 0.3s ease;
}

.video-youtube__facade:hover .video-youtube__thumb {
  transform: scale(1.04);
}

.video-youtube__facade:hover .video-youtube__play {
  background-color: var(--primary);
  border-color: var(--primary);
  transform: translate(-50%, -50%) scale(1.08);
}

.video-youtube__facade:focus-visible {
  outline: 3px solid var(--primary-light);
  outline-offset: -3px;
}

.video-youtube__iframe {
  width: 100%;
  height: 100%;
  border: none;
}

@media (prefers-reduced-motion: reduce) {
  .video-youtube__thumb,
  .video-youtube__play {
    transition: none;
  }
}
</style>
