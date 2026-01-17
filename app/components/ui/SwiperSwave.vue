<template>
  <Swiper
    :modules="[FreeMode, Pagination]"
    :slides-per-view="'auto'"
    :space-between="16"
    :free-mode="true"
    :pagination="pagination ? { clickable: true } : false"
    :breakpoints="{
      768: { spaceBetween: 20 },
      1024: { spaceBetween: 30 }
    }"
    class="swiper-swave"
    @swiper="onSwiper"
  >
    <SwiperSlide
      v-for="(item, index) in items"
      :key="index"
      :class="[
        'swiper-swave__slide',
        { 'swiper-swave__slide--active': activeIndex === index }
      ]"
      @click="setActiveSlide(index)"
    >
      <slot :item="item" :index="index" :is-active="activeIndex === index" />
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                            SWIPER SWAVE                                      │
  │                                                                              │
  │  Composant slider generique basé sur Swiper.js                              │
  │                                                                              │
  │  ┌────────────────────────────────────────────────────────────────────────┐  │
  │  │  Swiper (FreeMode + Pagination)                                        │  │
  │  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐                   │  │
  │  │  │ Slide 0 │  │ Slide 1 │  │ Slide 2 │  │ Slide N │  ...              │  │
  │  │  │ (active)│  │         │  │         │  │         │                   │  │
  │  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘                   │  │
  │  │                     ● ○ ○ ○  (pagination)                              │  │
  │  └────────────────────────────────────────────────────────────────────────┘  │
  │                                                                              │
  │  Props:                                                                      │
  │    • items: T[] - Tableau d'items a afficher dans les slides                │
  │    • pagination: boolean - Afficher les bullets de pagination (default true)│
  │    • modelValue: number - Index de la slide active (v-model)                │
  │                                                                              │
  │  Events:                                                                     │
  │    • update:modelValue - Emis quand la slide active change                  │
  │                                                                              │
  │  Slots:                                                                      │
  │    • default - Contenu de chaque slide (scoped: item, index, isActive)      │
  │                                                                              │
  │  @dev Utilise Swiper avec FreeMode pour scroll fluide                       │
  │  @dev Slide active mise en evidence (opacity + scale desktop)               │
  │  @dev Click sur une slide = devient active + slideTo                        │
  └─────────────────────────────────────────────────────────────────────────────┘
*/

import { ref, watch } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { FreeMode, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

/* Props generiques */
interface Props {
  items: unknown[];
  pagination?: boolean;
  modelValue?: number;
}

const props = withDefaults(defineProps<Props>(), {
  pagination: false,
  modelValue: 0,
});

const emit = defineEmits<{
  'update:modelValue': [index: number];
}>();

/* Swiper instance et index actif */
const swiperInstance = ref<SwiperType | null>(null);
const activeIndex = ref(props.modelValue);

/* Sync avec v-model */
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal !== activeIndex.value) {
      activeIndex.value = newVal;
      swiperInstance.value?.slideTo(newVal);
    }
  }
);

/* Callback quand Swiper est initialise */
const onSwiper = (swiper: SwiperType) => {
  swiperInstance.value = swiper;
};

/* Selectionner une slide et la positionner en premier */
const setActiveSlide = (index: number) => {
  activeIndex.value = index;
  emit('update:modelValue', index);
  if (swiperInstance.value) {
    swiperInstance.value.slideTo(index);
  }
};
</script>

<style scoped>
/**
 * SWIPER SWAVE STYLES - BEM strict
 *
 * Slider generique avec:
 * - FreeMode pour scroll fluide
 * - Pagination clickable
 * - Slide active mise en evidence
 *
 * @dev Les largeurs de slides sont definies par le parent via CSS
 * @dev Couleurs de pagination personnalisables via variables CSS
 */

/* Block: .swiper-swave */
.swiper-swave {
  width: 100%;
  overflow: visible;
  padding-bottom: 2.5rem;

  /* Pagination bullets */
  :deep(.swiper-pagination) {
    bottom: 0;
  }

  :deep(.swiper-pagination-bullet) {
    background-color: var(--swiper-bullet-color, white);
    opacity: var(--swiper-bullet-opacity, 0.5);
  }

  :deep(.swiper-pagination-bullet-active) {
    background-color: var(--swiper-bullet-active-color, var(--primary));
    opacity: 1;
  }
}

/* Element: Slide - largeurs responsive */
.swiper-swave__slide {
  height: auto;
  cursor: pointer;
  transition: transform 0.3s ease, opacity 0.3s ease;

  /* Mobile first */
  width: 85% !important;
  max-width: 400px;

  /* Tablet */
  @media (min-width: 768px) {
    width: 320px !important;
    max-width: none;
  }

  /* Desktop */
  @media (min-width: 1024px) {
    width: 360px !important;
  }

  /* Large desktop */
  @media (min-width: 1280px) {
    width: 400px !important;
  }
}

/* Modifier: Slide inactive (opacity reduite) */
.swiper-swave__slide:not(.swiper-swave__slide--active) {
  opacity: 0.6;
}

/* Modifier: Slide active (pleine opacity, scale uniquement desktop) */
.swiper-swave__slide--active {
  opacity: 1;

  @media (min-width: 1024px) {
    transform: scale(1.02);
  }
}
</style>
