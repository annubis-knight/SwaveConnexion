<template>
  <div class="season-player">
    <!-- Facade : tant qu'on n'a pas cliqué, aucun script YouTube n'est chargé -->
    <button
      v-if="!isPlaying"
      type="button"
      class="season-player__facade"
      :aria-label="`Lire la chorégraphie : ${title}`"
      @click="isPlaying = true"
    >
      <img
        :src="thumbnail"
        :alt="title"
        class="season-player__thumb"
        loading="lazy"
        decoding="async"
        @error="useFallbackThumbnail"
      >
      <span class="season-player__play" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </button>

    <iframe
      v-else
      class="season-player__iframe"
      :src="embedUrl"
      :title="title"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    />
  </div>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────┐
  │                      SEASON PLAYER                          │
  │                                                             │
  │  Lecteur YouTube en facade, horizontal ou vertical.         │
  │                                                             │
  │  Props:                                                     │
  │    • videoId: string (requis) - ID YouTube                  │
  │    • title: string (requis) - Titre, sert d'alt et d'aria   │
  │                                                             │
  │  Events: Aucun (l'etat de lecture reste interne)            │
  │  Slots: Aucun                                               │
  └─────────────────────────────────────────────────────────────┘

  @dev Facade : le lecteur (~1 Mo de JS) et les cookies YouTube ne sont
       charges qu'au clic. Domaine youtube-nocookie.
  @dev Les Shorts n'ont pas de miniature verticale : YouTube renvoie une
       image 16/9 ou la video verticale est centree entre deux bandes
       floutees. Affichee telle quelle dans le cadre 16/9, c'est donc
       exactement la miniature d'origine, sans recadrage.
*/

interface Props {
  videoId: string;
  title: string;
}

const props = defineProps<Props>();

const isPlaying = ref(false);

/* maxresdefault n'existe pas pour toutes les videos : repli sur hqdefault */
const thumbnail = ref(
  `https://i.ytimg.com/vi/${props.videoId}/maxresdefault.jpg`
);

const useFallbackThumbnail = () => {
  thumbnail.value = `https://i.ytimg.com/vi/${props.videoId}/hqdefault.jpg`;
};

const embedUrl = computed(
  () => `https://www.youtube-nocookie.com/embed/${props.videoId}?autoplay=1&rel=0`
);
</script>

<style scoped>
/**
 * SEASON PLAYER - BEM strict
 * Cadre au ratio fixe, miniature recadree, pastille de lecture centree
 */

/*
  Ratio unique 16/9, quel que soit le format de la video : le cadre est une
  affaire de mise en page, le format une affaire de contenu. YouTube presente
  lui-meme un Short vertical centre dans son lecteur, et livre de toute facon
  sa miniature en 16/9.
*/
.season-player {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 12px;
  background-color: var(--secondary-dark);
}

.season-player__facade {
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
}

.season-player__thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.season-player__play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 999px;
  background-color: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
  color: var(--text-inverse);
  transition: background-color 0.3s ease, border-color 0.3s ease,
    transform 0.3s ease;
}

.season-player__facade:hover .season-player__thumb {
  transform: scale(1.04);
}

.season-player__facade:hover .season-player__play {
  background-color: var(--primary);
  border-color: var(--primary);
  transform: translate(-50%, -50%) scale(1.08);
}

.season-player__facade:focus-visible {
  outline: 3px solid var(--primary-light);
  outline-offset: -3px;
}

.season-player__iframe {
  width: 100%;
  height: 100%;
  border: none;
}

@media (prefers-reduced-motion: reduce) {
  .season-player__thumb,
  .season-player__play {
    transition: none;
  }
}
</style>
