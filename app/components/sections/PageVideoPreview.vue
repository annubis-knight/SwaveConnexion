<template>
  <section class="page-video-preview py-20 lg:py-28" data-theme="light">
    <!-- Éléments décoratifs de fond -->
    <div class="page-video-preview__grid-pattern" aria-hidden="true"></div>

    <LayoutContainerMax>
      <div class="page-video-preview__layout">
        <!-- Bloc gauche: Contenu texte -->
        <div class="page-video-preview__content">
          <!-- Tag avec ligne décorative -->
          <div class="page-video-preview__tag-wrapper">
            <div class="page-video-preview__tag-line" aria-hidden="true"></div>
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
          </div>

          <!-- Titre avec highlight -->
          <Heading :level="2">
            {{ titleStart }}
            <span class="page-video-preview__highlight">{{ titleHighlight }}</span>
          </Heading>

          <!-- Description -->
          <Text size="lg" weight="light" maxWidth="md">
            {{ description }}
          </Text>

          <!-- Stats rapides -->
          <div class="page-video-preview__stats">
            <div
              v-for="(stat, index) in stats"
              :key="index"
              class="page-video-preview__stat-item"
            >
              <Text as="span" size="2xl" weight="bold" color="primary">
                {{ stat.value }}
              </Text>
              <Text as="span" size="sm" weight="medium">
                {{ stat.label }}
              </Text>
            </div>
          </div>

          <!-- CTA -->
          <ButtonSwave v-if="ctaText" @click="handleCtaClick">
            {{ ctaText }}
          </ButtonSwave>
        </div>

        <!-- Bloc droit: Vidéo Preview -->
        <div class="page-video-preview__video-wrapper">
          <VideoPreview
            :video-url="videoUrl"
            :poster="poster"
            :source="source"
            :likes="likes"
            :views="views"
            :show-engagement="showEngagement"
            tilt="right"
          />

          <!-- Caption sous la vidéo -->
          <Text
            v-if="caption"
            as="span"
            size="sm"
            weight="regular"
            align="center"
            class="page-video-preview__caption"
          >
            {{ caption }}
          </Text>
        </div>
      </div>
    </LayoutContainerMax>
  </section>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                          PAGE VIDEO PREVIEW                                  │
  │                                                                              │
  │  Section pour mettre en valeur une vidéo Instagram/TikTok avec contexte     │
  │  textuel et stats d'engagement. Design asymétrique moderne.                  │
  │                                                                              │
  │  STRUCTURE (Desktop):                                                        │
  │  ┌────────────────────────────────────────────────────────────────────────┐  │
  │  │  section.page-video-preview                                           │  │
  │  │  ┌──────────────────────────────────────────────────────────────────┐  │  │
  │  │  │  .page-video-preview__grid-pattern (background décoratif)       │  │  │
  │  │  └──────────────────────────────────────────────────────────────────┘  │  │
  │  │  ┌──────────────────────────────────────────────────────────────────┐  │  │
  │  │  │  LayoutContainerMax                                             │  │  │
  │  │  │    └─ .page-video-preview__layout (flex row)                    │  │  │
  │  │  │         ┌───────────────────┬────────────────────┐               │  │  │
  │  │  │         │ __content (55%)   │ __video-wrapper    │               │  │  │
  │  │  │         │  ├─ __tag-wrapper │ (45%)              │               │  │  │
  │  │  │         │  ├─ Heading       │  ├─ VideoPreview   │               │  │  │
  │  │  │         │  ├─ Text          │  │   (incliné)     │               │  │  │
  │  │  │         │  ├─ __stats       │  └─ __caption      │               │  │  │
  │  │  │         │  └─ ButtonSwave   │                    │               │  │  │
  │  │  │         └───────────────────┴────────────────────┘               │  │  │
  │  │  └──────────────────────────────────────────────────────────────────┘  │  │
  │  └────────────────────────────────────────────────────────────────────────┘  │
  │                                                                              │
  │  STRUCTURE (Mobile): Layout empilé, vidéo en premier                         │
  │  ┌─────────────────────────┐                                                 │
  │  │  VideoPreview           │                                                 │
  │  ├─────────────────────────┤                                                 │
  │  │  Tag + Heading + Text   │                                                 │
  │  │  Stats + CTA            │                                                 │
  │  └─────────────────────────┘                                                 │
  │                                                                              │
  │  Props:                                                                      │
  │    • tag: string (défaut: 'Aperçu') - Label au-dessus du titre               │
  │    • titleStart: string (défaut: 'Découvrez notre') - Début du titre         │
  │    • titleHighlight: string (défaut: 'ambiance') - Partie colorée            │
  │    • description: string - Texte descriptif                                  │
  │    • videoUrl: string (optionnel) - URL de la vidéo                          │
  │    • poster: string (optionnel) - Image de couverture                        │
  │    • source: 'instagram' | 'tiktok' (optionnel) - Badge source               │
  │    • likes: number (défaut: 0) - Nombre de likes                             │
  │    • views: number (défaut: 0) - Nombre de vues                              │
  │    • showEngagement: boolean (défaut: true) - Afficher stats vidéo           │
  │    • caption: string (optionnel) - Légende sous la vidéo                     │
  │    • ctaText: string (optionnel) - Texte du bouton CTA                       │
  │    • stats: StatItem[] (optionnel) - Stats à afficher côté contenu           │
  │                                                                              │
  │  Events:                                                                     │
  │    • @cta-click: Émis au clic sur le bouton CTA                              │
  │                                                                              │
  │  Slots: Aucun (données via props)                                            │
  └─────────────────────────────────────────────────────────────────────────────┘
*/

/* Types */
interface StatItem {
  value: string;
  label: string;
}

/* Props */
interface Props {
  tag?: string;
  titleStart?: string;
  titleHighlight?: string;
  description?: string;
  videoUrl?: string;
  poster?: string;
  source?: 'instagram' | 'tiktok';
  likes?: number;
  views?: number;
  showEngagement?: boolean;
  caption?: string;
  ctaText?: string;
  stats?: StatItem[];
}

withDefaults(defineProps<Props>(), {
  tag: 'Aperçu',
  titleStart: 'Découvrez notre',
  titleHighlight: 'ambiance',
  description: 'Plongez dans l\'univers Swave Connection à travers nos vidéos. Danse, passion et bonne humeur garanties !',
  likes: 0,
  views: 0,
  showEngagement: true,
  stats: () => [],
});

/* Events */
interface Emits {
  (e: 'cta-click'): void;
}

const emit = defineEmits<Emits>();

/* Handlers */
const handleCtaClick = () => {
  emit('cta-click');
};
</script>

<style scoped>
/**
 * PAGE VIDEO PREVIEW STYLES - BEM + CSS Nesting
 *
 * Design: Section asymétrique avec contenu texte à gauche,
 * vidéo inclinée à droite, pattern de fond subtil
 */

/* Block: .page-video-preview */
.page-video-preview {
  position: relative;
  overflow: hidden;
  background-color: var(--bg-base);
}

/* Element: Pattern de fond */
.page-video-preview__grid-pattern {
  position: absolute;
  inset: 0;
  opacity: 0.03;
  background-image:
    linear-gradient(var(--text-subtle) 1px, transparent 1px),
    linear-gradient(90deg, var(--text-subtle) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
}

/* Element: Layout principal */
.page-video-preview__layout {
  display: flex;
  flex-direction: column-reverse;
  gap: 3rem;
  align-items: center;

  @media (min-width: 1024px) {
    flex-direction: row;
    gap: 4rem;
    align-items: center;
    justify-content: space-between;
  }
}

/* Element: Bloc contenu */
.page-video-preview__content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: center;

  @media (min-width: 1024px) {
    flex: 0 0 50%;
    text-align: left;
    gap: 1.75rem;
  }
}

/* Element: Tag wrapper avec ligne */
.page-video-preview__tag-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  @media (min-width: 1024px) {
    justify-content: flex-start;
  }
}

.page-video-preview__tag-line {
  width: 32px;
  height: 2px;
  background: var(--primary);
  border-radius: 1px;
}

/* Element: Highlight du titre */
.page-video-preview__highlight {
  color: var(--primary);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 8px;
    background: var(--primary-light);
    opacity: 0.3;
    transform: skewX(-12deg);
    z-index: -1;
  }
}

/* Element: Stats grid */
.page-video-preview__stats {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  padding-top: 0.5rem;

  @media (min-width: 1024px) {
    justify-content: flex-start;
  }
}

.page-video-preview__stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;

  @media (min-width: 1024px) {
    align-items: flex-start;
  }
}

/* Element: Video wrapper */
.page-video-preview__video-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 280px;
  max-width: 100%;

  @media (min-width: 640px) {
    width: 320px;
  }

  @media (min-width: 1024px) {
    flex: 0 0 auto;
    width: 340px;
  }
}

/* Element: Caption sous vidéo */
.page-video-preview__caption {
  display: block;
  color: var(--text-subtle);
  font-style: italic;
  margin-top: 0.5rem;
}
</style>
