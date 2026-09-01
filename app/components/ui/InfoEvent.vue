<template>
  <div class="event-info" :class="{ 'event-info--image-left': imagePosition === 'left' }">
    <!-- Bloc informations (gauche) -->
    <div class="event-info__content">
      <!-- Label localisation -->
      <LabelSwave>{{ location }}</LabelSwave>

      <!-- Date + Titre -->
      <div class="event-info__header">
        <DateEvent :day="day" :month="month" />
        <Text as="span" size="3xl" weight="bold" transform="uppercase" color="dark">
          {{ title }}
        </Text>
      </div>

      <!-- Description -->
      <Text size="base" color="dark" maxWidth="md" weight="light">
        {{ description }}
      </Text>

      <!-- CTA : lien simple si ctaHref fourni, sinon bouton + code promo -->
      <ButtonSwave v-if="ctaHref" :href="ctaHref" :external="ctaExternal">
        {{ ctaText }}
      </ButtonSwave>
      <ButtonPromoSwave v-else :promo="promoText">{{ ctaText }}</ButtonPromoSwave>
    </div>

    <!-- Image (droite) -->
    <div class="event-info__image">
      <NuxtImg
        :src="image"
        :alt="imageAlt"
        sizes="100vw md:600px"
        format="webp"
        loading="lazy"
        decoding="async"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                              EVENT INFO                                      │
  │  ┌───────────────────────────────────────────────────────────────────────┐  │
  │  │  .event-info (flex row → stack vertical en mobile)                    │  │
  │  │  ┌─────────────────────────────────┬─────────────────────────────────┐│  │
  │  │  │  .event-info__content           │  .event-info__image             ││  │
  │  │  │  ┌───────────────────────────┐  │  ┌───────────────────────────┐  ││  │
  │  │  │  │  LabelSwave (BARCELONE)   │  │  │                           │  ││  │
  │  │  │  └───────────────────────────┘  │  │                           │  ││  │
  │  │  │  ┌───────────────────────────┐  │  │                           │  ││  │
  │  │  │  │  DateEvent + Text 3xl     │  │  │        <img>              │  ││  │
  │  │  │  │  ┌──────┬───────────────┐ │  │  │                           │  ││  │
  │  │  │  │  │  17  │ BACHATA       │ │  │  │                           │  ││  │
  │  │  │  │  │ NOV  │ SENSUAL       │ │  │  │                           │  ││  │
  │  │  │  │  │      │ PARADISE      │ │  │  │                           │  ││  │
  │  │  │  │  └──────┴───────────────┘ │  │  │                           │  ││  │
  │  │  │  └───────────────────────────┘  │  │                           │  ││  │
  │  │  │  ┌───────────────────────────┐  │  │                           │  ││  │
  │  │  │  │  Text (description)       │  │  │                           │  ││  │
  │  │  │  └───────────────────────────┘  │  │                           │  ││  │
  │  │  │  ┌───────────────────────────┐  │  │                           │  ││  │
  │  │  │  │  ButtonPromoSwave (CTA)   │  │  │                           │  ││  │
  │  │  │  └───────────────────────────┘  │  └───────────────────────────┘  ││  │
  │  │  └─────────────────────────────────┴─────────────────────────────────┘│  │
  │  └───────────────────────────────────────────────────────────────────────┘  │
  │                                                                              │
  │  Props:                                                                      │
  │    • location: string - Lieu de l'événement (ex: "BARCELONE")                │
  │    • day: string - Jour (ex: "17")                                           │
  │    • month: string - Mois abrégé (ex: "NOV")                                 │
  │    • title: string - Titre de l'événement                                    │
  │    • description: string - Description de l'événement                        │
  │    • ctaText: string - Texte du bouton CTA (default: "ACHETER LE PASS")      │
  │    • ctaHref: string - Si fourni, le CTA devient un lien sans code promo     │
  │    • ctaExternal: boolean - Ouvre le lien dans un nouvel onglet              │
  │    • promoText: string - Texte du code promo (default: "CODE"), ignoré       │
  │      quand ctaHref est fourni                                                │
  │    • image: string - URL/chemin de l'image                                   │
  │    • imageAlt: string - Alt text de l'image (default: title)                 │
  │                                                                              │
  │  Slots: Aucun                                                                │
  │                                                                              │
  │  Events: Aucun (composant de présentation pure)                              │
  │                                                                              │
  │  Responsive:                                                                 │
  │    • Mobile (< md): Stack vertical (image en bas)                            │
  │    • Desktop (≥ md): Flex row (content gauche, image droite)                 │
  └─────────────────────────────────────────────────────────────────────────────┘

  @dev Composant UI composé utilisant DateEvent, LabelSwave, Text, ButtonPromoSwave
  @dev NuxtImg et non <img> : une balise native sert le fichier brut et fait
       echouer la gate de poids (scripts/check-image-weights.mjs). Le `src`
       doit donc pointer vers public/ (/images/...) pour etre optimise ; un
       import depuis ~/assets ne passerait pas par _ipx.
  @dev CSS natif avec variables de _variables.css
  @dev BEM strict : .event-info, .event-info__content, .event-info__image
*/

interface Props {
  location: string;
  day: string;
  month: string;
  title: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
  ctaExternal?: boolean;
  promoText?: string;
  image: string;
  imageAlt?: string;
  imagePosition?: 'left' | 'right';
}

const props = withDefaults(defineProps<Props>(), {
  ctaText: 'ACHETER LE PASS',
  ctaHref: undefined,
  ctaExternal: false,
  promoText: 'CODE',
  imageAlt: '',
  imagePosition: 'right',
});

/* Computed pour alt text par défaut */
const computedImageAlt = computed(() => props.imageAlt || props.title);
</script>

<style scoped>
/**
 * EVENT INFO STYLES - BEM strict
 *
 * Layout flex horizontal (desktop) / vertical (mobile)
 * Informations à gauche, image à droite
 */

/* Block : .event-info */
.event-info {
  display: flex;
  flex-direction: column;
  gap: 80px;

}

/* Desktop: layout horizontal */
@media (min-width: 768px) {
  .event-info {
    flex-direction: row;
    align-items: stretch;
  }
}

/* Element : .event-info__content */
.event-info__content {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: var(--space-lg);
  flex: 1;
}

/* Element : .event-info__header - Date + Titre */
.event-info__header {
  display: flex;
  align-items: center;

}

/* Element : .event-info__image */
.event-info__image {
  order: -1;
}

/* Desktop: image à droite (par défaut) */
@media (min-width: 768px) {
  .event-info__image {
    order: 0;
    flex: 0 0 35%;
    max-width: 40%;
  }

  /* Modifier: image à gauche */
  .event-info--image-left .event-info__image {
    order: -1;
  }
}

.event-info__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>
