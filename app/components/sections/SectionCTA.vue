<template>
  <section class="section-cta">
    <!-- Background image -->
    <img
      :src="backgroundImage"
      alt=""
      class="section-cta__bg"
    />
    <!-- Blue overlay with gradient fade -->
    <div class="section-cta__overlay" />

    <!-- Content -->
    <LayoutContainerMax class="relative z-10">
      <div class="section-cta__content py-16 lg:py-40">
        <Heading :level="2" color="white">
          {{ title }}
        </Heading>
        <Text
          font="display"
          color="dark"
          size="3xl"
          weight="bold"
          transform="uppercase"
          
        >
          {{ subtitle }}
        </Text>

        <form
          class="section-cta__form mt-10"
          @submit.prevent="handleSubmit"
        >
          <InputSwave
            v-model="email"
            type="email"
            :placeholder="inputPlaceholder"
            class="section-cta__input"
          />
          <ButtonSwave
            type="submit"
            class="section-cta__button"
          >
            {{ buttonText }}
          </ButtonSwave>
        </form>
      </div>
    </LayoutContainerMax>
  </section>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────┐
  │                      SECTION CTA                            │
  │                                                             │
  │  ARCHITECTURE :                                             │
  │  - Image en background (absolute)                           │
  │  - Overlay bleu avec dégradé (opacité 1 à gauche → 0.7)     │
  │  - Contenu au-dessus                                        │
  │                                                             │
  │  ┌───────────────────────────────────────────────────────┐  │
  │  │  section.section-cta                                  │  │
  │  │  ┌─────────────────────────────────────────────────┐  │  │
  │  │  │  img.section-cta__bg (absolute)                 │  │  │
  │  │  └─────────────────────────────────────────────────┘  │  │
  │  │  ┌─────────────────────────────────────────────────┐  │  │
  │  │  │  .section-cta__overlay (gradient blue)          │  │  │
  │  │  └─────────────────────────────────────────────────┘  │  │
  │  │  ┌─────────────────────────────────────────────────┐  │  │
  │  │  │  LayoutContainerMax                             │  │  │
  │  │  │    ├─ Heading (title)                           │  │  │
  │  │  │    ├─ Text (subtitle)                           │  │  │
  │  │  │    └─ form                                      │  │  │
  │  │  │         ├─ InputSwave                           │  │  │
  │  │  │         └─ ButtonSwave                          │  │  │
  │  │  └─────────────────────────────────────────────────┘  │  │
  │  └───────────────────────────────────────────────────────┘  │
  │                                                             │
  │  Props:                                                     │
  │    • title: string (défaut: "SWAVE CONNECTION ÇA BOUGE!")   │
  │    • subtitle: string (défaut: "NE MANQUEZ PAS NOS ACTUS")  │
  │    • inputPlaceholder: string (défaut: "Votre adresse mail")│
  │    • buttonText: string (défaut: "S'ABONNER")               │
  │    • backgroundImage: string (chemin image)                 │
  │                                                             │
  │  Events:                                                    │
  │    • @submit: { email: string } - Émis à la soumission      │
  └─────────────────────────────────────────────────────────────┘

  Section CTA Newsletter avec fond image + overlay bleu dégradé

  @dev Tailwind pour spacing, CSS scoped BEM pour visuel
*/

import ctaBackground from '~/assets/images/assetCTA.jpg';

interface Props {
  title?: string;
  subtitle?: string;
  inputPlaceholder?: string;
  buttonText?: string;
  backgroundImage?: string;
}

interface Emits {
  'submit': [payload: { email: string }];
}

const props = withDefaults(defineProps<Props>(), {
  title: 'SWAVE CONNECTION ÇA BOUGE!',
  subtitle: 'NE MANQUEZ PAS NOS ACTUS',
  inputPlaceholder: 'Votre adresse mail',
  buttonText: "S'ABONNER",
  backgroundImage: ctaBackground,
});

const emit = defineEmits<Emits>();

const email = ref('');

const handleSubmit = () => {
  if (email.value) {
    emit('submit', { email: email.value });
    email.value = '';
  }
};
</script>

<style scoped>
/**
 * SECTION CTA STYLES - BEM strict
 *
 * Fond image avec overlay bleu dégradé (opacité 1 gauche → transparente droite)
 */

.section-cta {
  position: relative;
  overflow: hidden;
  background-color: var(--primary);
}

/* Background image - absolute, covers section */
.section-cta__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 1;
}

/* Blue overlay with gradient fade to right */
.section-cta__overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  background: linear-gradient(
    to right,
    var(--primary) 0%,
    var(--primary) 30%,
    rgba(59, 130, 246, 0.85) 60%,
    rgba(59, 130, 246, 0.7) 100%
  );
}

/* Content container */
.section-cta__content {
  position: relative;
  z-index: 10;
}

/* Form layout */
.section-cta__form {
  display: flex;
  flex-direction: column;
  gap: 30px;


  /* Desktop: row layout */
  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: center;
  }
}

/* Input takes available space on desktop */
.section-cta__input {
  flex: 1;
  max-width: 600px;
}

/* Button auto width on desktop */
.section-cta__button {
  flex-shrink: 0;

  @media (min-width: 1024px) {
    width: auto;
  }
}
</style>
