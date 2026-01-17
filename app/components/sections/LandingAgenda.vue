<template>
  <section class="landing-events py-24 lg:py-32">
    <!-- Glow effect (behind image) -->
    <div class="landing-events__glow" aria-hidden="true"></div>

    <!-- Background image (absolute) -->
    <img
      :src="eventsImage"
      alt="Event illustration"
      class="landing-events__bg"
    />

    <!-- Desktop: GridResponsive pour placement précis -->
    <LayoutContainerMax class="relative z-10">
      <LayoutGridResponsive>
        <!-- Featured Event Info (droite sur desktop) -->
        <div class="landing-events__featured col-span-4 md:col-span-8 lg:col-span-5 lg:col-start-8">
          <!-- Date line: DAY + DATE + MONTH -->
          <Heading :level="2" color="white" class="flex gap-4">
            <span class="text-primary">{{ featured.dayName }}</span>
            <span>{{ featured.day }}</span>
            <span>{{ featured.month }}</span>
          </Heading>

          <div class="flex flex-col gap-1 items-end">
            <!-- Time & Location -->
            <Text v-if="featured.time && featured.location" as="span" color="white" size="lg">
              {{ featured.time }} | {{ featured.location }}
            </Text>

            <!-- Dance type -->
            <Text font="display" as="span" color="white" size="4xl" >
              {{ featured.title }}
            </text>

            <!-- Level/subtitle -->
            <Text v-if="featured.subtitle" as="span" color="white" size="2xl">
              {{ featured.subtitle }}
            </Text>

            <!-- Instructors -->
            <Text v-if="featured.instructors" as="span" color="white" size="2xl" class="mt-4">
              {{ featured.instructors }}
            </Text>
          </div>
          <!-- CTA Button -->
          <ButtonSwave>
            RÉSERVER UN COURS
          </ButtonSwave>
        </div>

        <!-- Slider Section (full width) -->
        <div class="col-span-4 md:col-span-8 lg:col-span-12">
          <Text as="span" size="2xl" weight="semibold" color="white">
            PROCHAINS COURS & EVENTS
          </Text>

          <!-- Swiper slider -->
          <SwiperSwave
            v-model="activeIndex"
            :items="events"
            class="landing-events__swiper"
          >
            <template #default="{ item }">
              <CardEvent
                :day="(item as EventData).day"
                :month="(item as EventData).month"
                :title="(item as EventData).title"
                :subtitle="(item as EventData).subtitle"
              />
            </template>
          </SwiperSwave>
        </div>
      </LayoutGridResponsive>
    </LayoutContainerMax>
  </section>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                            LANDING EVENTS                                    │
  │                                                                              │
  │  MOBILE (image en background overlay):                                       │
  │  ┌────────────────────────────────────────────────────────────────────────┐  │
  │  │  section.landing-events                                                │  │
  │  │  ┌──────────────────────────────────────────────────────────────────┐  │  │
  │  │  │  img.landing-events__bg (absolute, full cover + overlay)        │  │  │
  │  │  └──────────────────────────────────────────────────────────────────┘  │  │
  │  │  ┌──────────────────────────────────────────────────────────────────┐  │  │
  │  │  │  .landing-events__featured (stack vertical)                     │  │  │
  │  │  │    ├─ Date (WED 17 NOV)                                         │  │  │
  │  │  │    ├─ Infos (6PM | Salle 2)                                     │  │  │
  │  │  │    ├─ Type (BACHATA DÉBUTANT)                                   │  │  │
  │  │  │    ├─ Instructeurs (Denise & Jordan)                            │  │  │
  │  │  │    └─ ButtonSwave (RÉSERVER UN COURS)                           │  │  │
  │  │  └──────────────────────────────────────────────────────────────────┘  │  │
  │  │  ┌──────────────────────────────────────────────────────────────────┐  │  │
  │  │  │  .landing-events__slider                                        │  │  │
  │  │  │    ├─ Heading H4 "PROCHAINS COURS & EVENTS"                     │  │  │
  │  │  │    └─ .landing-events__cards (overflow-x scroll)                │  │  │
  │  │  │         └─ CardEvent × N                                        │  │  │
  │  │  └──────────────────────────────────────────────────────────────────┘  │  │
  │  └────────────────────────────────────────────────────────────────────────┘  │
  │                                                                              │
  │  DESKTOP (image à gauche, infos à droite sur grid 12 cols):                  │
  │  ┌────────────────────────────────────────────────────────────────────────┐  │
  │  │  GridResponsive (12 cols)                                              │  │
  │  │  ┌──────────────────────────┬───────────────────────────────────────┐  │  │
  │  │  │  Image (col-span-5)      │  Featured Info (col-span-6 col-start-7)│  │  │
  │  │  │  (absolute, clip-path)   │    ├─ Date line                       │  │  │
  │  │  │                          │    ├─ Time/Location                   │  │  │
  │  │  │                          │    ├─ Dance type                      │  │  │
  │  │  │                          │    ├─ Instructors                     │  │  │
  │  │  │                          │    └─ ButtonSwave                     │  │  │
  │  │  └──────────────────────────┴───────────────────────────────────────┘  │  │
  │  │  ┌────────────────────────────────────────────────────────────────────┐│  │
  │  │  │  Slider (col-span-12)                                             ││  │
  │  │  │    ├─ Heading                                                     ││  │
  │  │  │    └─ CardEvent × N                                               ││  │
  │  │  └────────────────────────────────────────────────────────────────────┘│  │
  │  └────────────────────────────────────────────────────────────────────────┘  │
  │                                                                              │
  │  Props: Aucune (données statiques internes)                                  │
  │                                                                              │
  │  Events: Aucun                                                               │
  │                                                                              │
  │  Slots: Aucun                                                                │
  │                                                                              │
  │  @dev Le premier événement de la liste devient le featured                   │
  │  @dev Utilise GridResponsive pour placement desktop avec col-span/col-start │
  │  @dev Slider horizontal prêt pour intégration Swiper.js                      │
  └─────────────────────────────────────────────────────────────────────────────┘
*/

import { ref } from 'vue';
import eventsImage from '~/assets/images/EventsImg.png';

/* Index de la slide active (v-model pour SwiperSwave) */
const activeIndex = ref(0);

/* Type pour les événements */
interface EventData {
  day: string;
  month: string;
  dayName: string;
  title: string;
  subtitle: string;
  time: string;
  location: string;
  instructors: string;
}

/* Données statiques des événements (format uniforme) */
const events: EventData[] = [
  {
    day: '17',
    month: 'NOV',
    dayName: 'WED',
    title: 'BACHATA',
    subtitle: 'DÉBUTANT',
    time: '6PM',
    location: 'Salle 2',
    instructors: 'Denise & Jordan',
  },
  {
    day: '18',
    month: 'NOV',
    dayName: 'THU',
    title: 'BACHATA',
    subtitle: 'LADY STYLE',
    time: '7PM',
    location: 'Salle 1',
    instructors: 'Marie & Sophie',
  },
  {
    day: '20',
    month: 'NOV',
    dayName: 'SAT',
    title: 'KIZOMBA',
    subtitle: 'INTERMÉDIAIRE',
    time: '3PM',
    location: 'Salle 2',
    instructors: 'Lucas & Emma',
  },
  {
    day: '22',
    month: 'NOV',
    dayName: 'MON',
    title: 'SALSA',
    subtitle: 'DÉBUTANT',
    time: '6PM',
    location: 'Salle 1',
    instructors: 'Carlos & Ana',
  },
];

/* Le premier événement est le featured */
const featured = events[0] as EventData;
</script>

<style scoped>
/**
 * LANDING EVENTS STYLES - BEM strict + CSS Nesting natif
 *
 * Mobile: Image en background avec overlay, contenu centré
 * Desktop: Image à gauche (absolute), infos à droite via grid
 *
 * @dev Tailwind pour spacing (py-12, lg:py-0, col-span-*)
 * @dev CSS scoped BEM pour visuel (backgrounds, colors, effects)
 * @dev CSS Nesting natif pour organisation hiérarchique
 */

/* Block: .landing-events */
.landing-events {
  position: relative;
  overflow: hidden;
  background-color: var(--bg-invert);
  min-height: 80vh;

  /* Overlay sombre pour lisibilité mobile */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.6) 0%,
      rgba(0, 0, 0, 0.4) 50%,
      rgba(0, 0, 0, 0.8) 100%
    );
    z-index: 1;
    pointer-events: none;

    /* Desktop: overlay uniquement sur la gauche */
    @media (min-width: 1024px) {
      background: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.3) 0%,
        rgba(0, 0, 0, 0.7) 40%,
        rgba(0, 0, 0, 0.95) 60%,
        var(--neutral-black) 100%
      );
    }
  }
}

/* Element: Glow effect (halo behind image) */
.landing-events__glow {
  position: absolute;
  width: 600px;
  height: 600px;
  left: 10%;
  top: 50%;
  transform: translateY(-50%);
  background: var(--primary);
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.8;
  z-index: 0;
  pointer-events: none;

  @media (min-width: 1024px) {
    width: 800px;
    height: 800px;
    left: 5%;
  }
}

/* Element: Background image */
.landing-events__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 0;

  @media (min-width: 1024px) {
    width: 60%;
    object-position: center top;
  }
}

/* Element: Featured event container */
.landing-events__featured {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  min-height: 60vh;
  gap:40px;

  @media (min-width: 1024px) {
    min-height: 70vh;
  }
}

/* Element: Swiper container */
.landing-events__swiper {
  margin-top: 1rem;
}
</style>
