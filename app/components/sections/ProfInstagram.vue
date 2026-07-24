<template>
  <section class="prof-instagram" data-theme="light">
    <LayoutContainer size="xl">
      <!-- Profil header -->
      <div class="prof-instagram__header">
        <div class="prof-instagram__profile">
          <div class="prof-instagram__profile-ring">
            <NuxtImg :src="profileImage" :alt="handle" class="prof-instagram__profile-photo" width="56" height="56" sizes="56px" format="webp" loading="lazy" />
          </div>
          <div class="prof-instagram__profile-info">
            <Text as="span" weight="semibold" size="lg">{{ handle }}</Text>
            <Text as="span" size="sm" weight="light" color="dark">{{ tagline }}</Text>
          </div>
        </div>
        <a :href="profileUrl" target="_blank" rel="noopener" class="prof-instagram__follow-btn">
          <svg class="prof-instagram__follow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
          </svg>
          Suivre
        </a>
      </div>

      <!-- Stories -->
      <div class="prof-instagram__stories">
        <div v-for="story in stories" :key="story.label" class="prof-instagram__story">
          <div class="prof-instagram__story-ring">
            <NuxtImg :src="story.image" :alt="story.label" class="prof-instagram__story-img" width="72" height="72" sizes="72px" format="webp" loading="lazy" />
          </div>
          <Text as="span" size="xs" weight="light">{{ story.label }}</Text>
        </div>
      </div>

      <!-- Reels grid -->
      <div class="prof-instagram__reels-header">
        <svg class="prof-instagram__reels-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.982c2.937 0 3.285.011 4.445.064a6.087 6.087 0 0 1 2.042.379 3.408 3.408 0 0 1 1.265.823 3.408 3.408 0 0 1 .823 1.265 6.087 6.087 0 0 1 .379 2.042c.053 1.16.064 1.508.064 4.445s-.011 3.285-.064 4.445a6.087 6.087 0 0 1-.379 2.042 3.643 3.643 0 0 1-2.088 2.088 6.087 6.087 0 0 1-2.042.379c-1.16.053-1.508.064-4.445.064s-3.285-.011-4.445-.064a6.087 6.087 0 0 1-2.042-.379 3.408 3.408 0 0 1-1.265-.823 3.408 3.408 0 0 1-.823-1.265 6.087 6.087 0 0 1-.379-2.042c-.053-1.16-.064-1.508-.064-4.445s.011-3.285.064-4.445a6.087 6.087 0 0 1 .379-2.042 3.408 3.408 0 0 1 .823-1.265 3.408 3.408 0 0 1 1.265-.823 6.087 6.087 0 0 1 2.042-.379c1.16-.053 1.508-.064 4.445-.064M12 1c-2.987 0-3.362.013-4.535.066a8.074 8.074 0 0 0-2.67.511 5.392 5.392 0 0 0-1.949 1.27 5.392 5.392 0 0 0-1.269 1.948 8.074 8.074 0 0 0-.51 2.67C1.012 8.638 1 9.013 1 12s.013 3.362.066 4.535a8.074 8.074 0 0 0 .511 2.67 5.392 5.392 0 0 0 1.27 1.949 5.392 5.392 0 0 0 1.948 1.269 8.074 8.074 0 0 0 2.67.51C8.638 22.988 9.013 23 12 23s3.362-.013 4.535-.066a8.074 8.074 0 0 0 2.67-.511 5.625 5.625 0 0 0 3.218-3.218 8.074 8.074 0 0 0 .51-2.67C22.988 15.362 23 14.987 23 12s-.013-3.362-.066-4.535a8.074 8.074 0 0 0-.511-2.67 5.392 5.392 0 0 0-1.27-1.949 5.392 5.392 0 0 0-1.948-1.269 8.074 8.074 0 0 0-2.67-.51C15.362 1.012 14.987 1 12 1z" />
        </svg>
        <Text as="span" weight="semibold" size="sm" transform="uppercase" tracking="wide">Reels</Text>
      </div>
      <div class="prof-instagram__reels">
        <a
          v-for="reel in reels"
          :key="reel.title"
          :href="reel.url"
          target="_blank"
          rel="noopener"
          class="prof-instagram__reel"
        >
          <NuxtImg :src="reel.image" :alt="reel.title" class="prof-instagram__reel-img" sizes="50vw md:300px" format="webp" loading="lazy" />
          <div class="prof-instagram__reel-overlay">
            <svg class="prof-instagram__reel-play" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <div class="prof-instagram__reel-info">
            <Text as="span" size="xs" weight="medium" color="white">{{ reel.title }}</Text>
            <div class="prof-instagram__reel-views">
              <svg viewBox="0 0 24 24" fill="white" width="12" height="12"><path d="M8 5v14l11-7z" /></svg>
              <Text as="span" size="xs" weight="light" color="white">{{ reel.views }}</Text>
            </div>
          </div>
        </a>
      </div>
    </LayoutContainer>
  </section>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────┐
  │                      PROF INSTAGRAM                         │
  │  ┌───────────────────────────────────────────────────────┐  │
  │  │  section.prof-instagram                               │  │
  │  │    └─ LayoutContainer                                 │  │
  │  │         ├─ .__header (profil + bouton Suivre)         │  │
  │  │         ├─ .__stories (highlights scrollables)        │  │
  │  │         ├─ .__reels-header                            │  │
  │  │         └─ .__reels (grille de reels)                 │  │
  │  └───────────────────────────────────────────────────────┘  │
  │                                                             │
  │  Props:                                                     │
  │    • handle: string - @pseudo                              │
  │    • tagline: string - Sous-titre du profil                │
  │    • profileImage: string - Photo de profil                │
  │    • profileUrl: string - Lien Instagram                   │
  │    • stories: { label, image }[]                           │
  │    • reels: { title, image, views, url }[]                 │
  │                                                             │
  │  Events: Aucun · Slots: Aucun                              │
  │                                                             │
  │  Section réutilisée par les pages professeurs (structure   │
  │  identique Denise / Jordan).                                │
  └─────────────────────────────────────────────────────────────┘
*/

interface Story {
  label: string;
  image: string;
}

interface Reel {
  title: string;
  image: string;
  views: string;
  url: string;
}

interface Props {
  handle: string;
  tagline: string;
  profileImage: string;
  profileUrl: string;
  stories: Story[];
  reels: Reel[];
}

withDefaults(defineProps<Props>(), {
  stories: () => [],
  reels: () => [],
});
</script>

<style scoped>
/**
 * PROF INSTAGRAM - BEM strict
 * Section réseaux : profil, stories highlights, grille de reels
 */

.prof-instagram {
  padding: 5rem 0;
  background-color: var(--bg-base);
}

/* --- Header profil --- */

.prof-instagram__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-base);
}

.prof-instagram__profile {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.prof-instagram__profile-ring {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  padding: 2px;
  background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
  flex-shrink: 0;
}

.prof-instagram__profile-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid var(--bg-base);
}

.prof-instagram__profile-info {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.prof-instagram__follow-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.25rem;
  background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.2s ease;
  white-space: nowrap;
}

.prof-instagram__follow-btn:hover {
  opacity: 0.9;
  transform: scale(1.02);
}

.prof-instagram__follow-icon {
  width: 16px;
  height: 16px;
}

/* --- Stories --- */

.prof-instagram__stories {
  display: flex;
  gap: 1.25rem;
  overflow-x: auto;
  padding: 1rem 0 2rem;
  scrollbar-width: none;
}

.prof-instagram__stories::-webkit-scrollbar {
  display: none;
}

.prof-instagram__story {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  cursor: pointer;
}

.prof-instagram__story-ring {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  padding: 3px;
  background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
  transition: transform 0.2s ease;
}

.prof-instagram__story:hover .prof-instagram__story-ring {
  transform: scale(1.08);
}

.prof-instagram__story-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid var(--bg-base);
}

/* --- Reels header --- */

.prof-instagram__reels-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0;
  border-top: 1px solid var(--border-base);
  margin-bottom: 0.5rem;
}

.prof-instagram__reels-icon {
  width: 18px;
  height: 18px;
  color: var(--text-strong);
}

/* --- Reels grid --- */

.prof-instagram__reels {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4px;
}

@media (min-width: 768px) {
  .prof-instagram__reels {
    grid-template-columns: repeat(3, 1fr);
  }
}

.prof-instagram__reel {
  position: relative;
  aspect-ratio: 9 / 16;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  text-decoration: none;
}

.prof-instagram__reel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.prof-instagram__reel:hover .prof-instagram__reel-img {
  transform: scale(1.05);
}

.prof-instagram__reel-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    transparent 40%,
    rgba(0, 0, 0, 0.6) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.prof-instagram__reel:hover .prof-instagram__reel-overlay {
  opacity: 1;
}

.prof-instagram__reel-play {
  width: 40px;
  height: 40px;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3));
}

.prof-instagram__reel-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.75rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 100%);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.prof-instagram__reel-views {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.prof-instagram__reel-views svg {
  width: 10px;
  height: 10px;
  opacity: 0.8;
}
</style>
