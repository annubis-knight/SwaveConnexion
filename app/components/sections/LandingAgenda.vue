<template>
  <section :class="sectionClass" class="landing-agenda py-24 lg:py-32" :data-theme="theme">
    <!-- Glow effect (behind image) -->
    <div class="landing-agenda__glow" aria-hidden="true"></div>

    <!-- Background image (absolute) -->
    <img
      :src="agendaImage"
      alt="Event illustration"
      class="landing-agenda__bg"
    />

    <!-- Desktop: GridResponsive pour placement précis -->
    <LayoutContainerMax class="relative z-10">
      <LayoutGridResponsive>
        <!-- Featured Event Info (droite sur desktop) -->
        <div class="landing-agenda__featured col-span-4 md:col-span-8 lg:col-span-5 lg:col-start-8">
          <!-- Date line: DAY + DATE + MONTH -->
          <Heading :level="2" :color="textColor" class="flex gap-4">
            <span class="text-primary">{{ featured.dayName }}</span>
            <span>{{ featured.day }}</span>
            <span>{{ featured.month }}</span>
          </Heading>

          <div class="flex flex-col gap-1 items-end">
            <!-- Time & Location -->
            <Text v-if="featured.time && featured.location" as="span" :color="textColor" size="lg">
              {{ featured.time }} | {{ featured.location }}
            </Text>

            <!-- Dance type -->
            <Text font="display" as="span" :color="textColor" size="4xl">
              {{ featured.title }}
            </Text>

            <!-- Level/subtitle -->
            <Text v-if="featured.subtitle" as="span" :color="textColor" size="2xl">
              {{ featured.subtitle }}
            </Text>

            <!-- Instructors -->
            <Text v-if="featured.instructors" as="span" :color="textColor" size="2xl" class="mt-4">
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
          <Text as="span" size="2xl" weight="semibold" :color="textColor">
            PROCHAINS COURS & EVENTS
          </Text>

          <!-- Swiper slider -->
          <SwiperSwave
            v-model="activeIndex"
            :items="events"
            class="landing-agenda__swiper"
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
  │                            LANDING AGENDA                                    │
  │                                                                              │
  │  Agenda des prochains cours : featured event + slider CardEvent              │
  │                                                                              │
  │  MOBILE (image en background overlay):                                       │
  │  ┌────────────────────────────────────────────────────────────────────────┐  │
  │  │  section.landing-agenda                                                │  │
  │  │  ┌──────────────────────────────────────────────────────────────────┐  │  │
  │  │  │  img.landing-agenda__bg (absolute, full cover + overlay)        │  │  │
  │  │  └──────────────────────────────────────────────────────────────────┘  │  │
  │  │  ┌──────────────────────────────────────────────────────────────────┐  │  │
  │  │  │  .landing-agenda__featured (stack vertical)                     │  │  │
  │  │  │    ├─ Date (WED 17 NOV)                                         │  │  │
  │  │  │    ├─ Infos (6PM | Salle 2)                                     │  │  │
  │  │  │    ├─ Type (BACHATA DÉBUTANT)                                   │  │  │
  │  │  │    ├─ Instructeurs (Denise & Jordan)                            │  │  │
  │  │  │    └─ ButtonSwave (RÉSERVER UN COURS)                           │  │  │
  │  │  └──────────────────────────────────────────────────────────────────┘  │  │
  │  │  ┌──────────────────────────────────────────────────────────────────┐  │  │
  │  │  │  .landing-agenda__slider                                        │  │  │
  │  │  │    ├─ Text "PROCHAINS COURS & EVENTS"                           │  │  │
  │  │  │    └─ .landing-agenda__cards (SwiperSwave)                      │  │  │
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
  │  │  │    ├─ Text                                                        ││  │
  │  │  │    └─ CardEvent × N                                               ││  │
  │  │  └────────────────────────────────────────────────────────────────────┘│  │
  │  └────────────────────────────────────────────────────────────────────────┘  │
  │                                                                              │
  │  Props:                                                                      │
  │    • theme: 'dark' | 'light' (défaut: 'dark') - Thème visuel de la section  │
  │                                                                              │
  │  Events: Aucun                                                               │
  │                                                                              │
  │  Slots: Aucun                                                                │
  │                                                                              │
  │  @dev Le premier événement de la liste devient le featured                   │
  │  @dev Utilise GridResponsive pour placement desktop avec col-span/col-start │
  │  @dev SwiperSwave pour le slider horizontal                                  │
  └─────────────────────────────────────────────────────────────────────────────┘
*/

import { ref, computed } from 'vue';
import agendaImage from '~/assets/images/EventsImg.png';

/* Props interface */
interface Props {
  theme?: 'dark' | 'light';
}

const props = withDefaults(defineProps<Props>(), {
  theme: 'dark',
});

/* Computed: classe BEM avec modifier de thème */
const sectionClass = computed(() => [
  'landing-agenda',
  `landing-agenda--${props.theme}`,
]);

/* Computed: couleur des textes selon le thème */
const textColor = computed(() => (props.theme === 'dark' ? 'white' : 'dark'));

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
 * LANDING AGENDA STYLES - BEM strict + CSS Nesting natif
 *
 * Agenda des prochains cours : featured event + slider CardEvent
 * Mobile: Image en background avec overlay, contenu centré
 * Desktop: Image à gauche (absolute), infos à droite via grid
 *
 * Themes:
 * - dark (défaut): fond noir, textes blancs, overlay sombre
 * - light: fond blanc, textes noirs, overlay clair
 *
 * @dev Tailwind pour spacing (py-12, lg:py-0, col-span-*)
 * @dev CSS scoped BEM pour visuel (backgrounds, colors, effects)
 * @dev CSS Nesting natif pour organisation hiérarchique
 */

/* Block: .landing-agenda */
.landing-agenda {
  position: relative;
  overflow: hidden;
  min-height: 80vh;
}

/* ============================================
   Modifier: --dark (thème par défaut)
   ============================================ */
.landing-agenda--dark {
  background-color: var(--bg-invert);

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
        var(--bg-invert) 100%
      );
    }
  }

  /* Glow dark theme */
  & .landing-agenda__glow {
    background: var(--primary);
    opacity: 0.8;
  }
}

/* ============================================
   Modifier: --light (thème clair)
   ============================================ */
.landing-agenda--light {
  background-color: var(--bg-base);

  /* Overlay clair pour lisibilité mobile */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.6) 0%,
      rgba(255, 255, 255, 0.4) 50%,
      rgba(255, 255, 255, 0.8) 100%
    );
    z-index: 1;
    pointer-events: none;

    /* Desktop: overlay uniquement sur la gauche */
    @media (min-width: 1024px) {
      background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0.3) 0%,
        rgba(255, 255, 255, 0.7) 40%,
        rgba(255, 255, 255, 0.95) 60%,
        var(--bg-base) 100%
      );
    }
  }

  /* Glow light theme */
  & .landing-agenda__glow {
    background: var(--primary);
    opacity: 0.6;
  }
}

/* Element: Glow effect (halo behind image) */
.landing-agenda__glow {
  position: absolute;
  width: 600px;
  height: 600px;
  left: 10%;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 50%;
  filter: blur(100px);
  z-index: 0;
  pointer-events: none;

  @media (min-width: 1024px) {
    width: 800px;
    height: 800px;
    left: 5%;
  }
}

/* Element: Background image */
.landing-agenda__bg {
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
.landing-agenda__featured {
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
.landing-agenda__swiper {
  margin-top: 1rem;
}
</style>
