<template>
  <div class="hero-switcher">
    <!-- Variante de hero active -->
    <component :is="activeVariant.component" v-bind="heroProps" />

    <!-- Switch 4 positions (aperçu comparatif) -->
    <div class="hero-switcher__control" role="tablist" aria-label="Variante de hero">
      <button
        v-for="(variant, i) in variants"
        :key="variant.label"
        type="button"
        role="tab"
        class="hero-switcher__btn"
        :class="{ 'hero-switcher__btn--active': i === active }"
        :aria-selected="i === active"
        @click="active = i"
      >
        <span class="hero-switcher__btn-index">{{ i + 1 }}</span>
        <span class="hero-switcher__btn-label">{{ variant.label }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────┐
  │                       HERO SWITCHER                         │
  │  ┌───────────────────────────────────────────────────────┐  │
  │  │  .hero-switcher (position relative)                   │  │
  │  │    ├─ <component :is> (variante active)               │  │
  │  │    └─ .__control (switch 4 positions, flottant)       │  │
  │  └───────────────────────────────────────────────────────┘  │
  │                                                             │
  │  Outil de comparaison : bascule entre les 4 variantes de    │
  │  hero (Référence / Fondu / Panneau net / Immersif) via un   │
  │  switch 4 positions superposé en bas de la section.         │
  │                                                             │
  │  Props:                                                     │
  │    • heroProps: contenu passé à chaque variante            │
  │        { eyebrow?, firstName, lastName, description,         │
  │          tags?, photo }                                     │
  │                                                             │
  │  @dev À retirer une fois la variante définitive choisie.    │
  └─────────────────────────────────────────────────────────────┘
*/

import ProfHeroClassic from '~/components/sections/ProfHeroClassic.vue';
import ProfHeroBlurAccent from '~/components/sections/ProfHeroBlurAccent.vue';
import ProfHeroBlurPanel from '~/components/sections/ProfHeroBlurPanel.vue';
import ProfHeroBlur from '~/components/sections/ProfHeroBlur.vue';

interface HeroContent {
  eyebrow?: string;
  firstName: string;
  lastName: string;
  description: string;
  tags?: string[];
  photo: string;
}

defineProps<{
  heroProps: HeroContent;
}>();

const variants = [
  { label: 'Référence', component: ProfHeroClassic },
  { label: 'Fondu', component: ProfHeroBlurAccent },
  { label: 'Panneau net', component: ProfHeroBlurPanel },
  { label: 'Immersif', component: ProfHeroBlur },
];

const active = ref(0);

/* Variante active (fallback sur la 1re) — sûr côté typage strict */
const activeVariant = computed(() => variants[active.value] ?? variants[0]!);
</script>

<style scoped>
/**
 * HERO SWITCHER - BEM strict
 * Switch 4 positions superposé à la hero active
 */

.hero-switcher {
  position: relative;
}

/* Switch flottant, centré en bas de la section */
.hero-switcher__control {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  display: flex;
  gap: 0.25rem;
  padding: 0.35rem;
  border-radius: 999px;
  background-color: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(10px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
  max-width: calc(100% - 2rem);
  overflow-x: auto;
  scrollbar-width: none;
}

.hero-switcher__control::-webkit-scrollbar {
  display: none;
}

.hero-switcher__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.9rem;
  border: none;
  border-radius: 999px;
  background-color: transparent;
  color: rgba(255, 255, 255, 0.75);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.hero-switcher__btn:hover {
  color: #fff;
}

.hero-switcher__btn--active {
  background-color: var(--primary);
  color: var(--text-inverse);
}

.hero-switcher__btn-index {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.15);
  font-size: var(--text-xs);
  font-weight: var(--font-bold);
}

.hero-switcher__btn--active .hero-switcher__btn-index {
  background-color: rgba(255, 255, 255, 0.25);
}

/* Sur mobile : masquer les libellés, garder les numéros */
@media (max-width: 640px) {
  .hero-switcher__btn-label {
    display: none;
  }
}
</style>
