<template>
  <div class="event-info" :class="{ 'event-info--image-left': imagePosition === 'left' }">
    <!-- Bloc informations (gauche) -->
    <div class="event-info__content">
      <!-- Label localisation -->
      <LabelSwave>{{ location }}</LabelSwave>

      <!-- Date + Titre -->
      <div
        class="event-info__header"
        :class="{ 'event-info__header--wide-date': hasWideDate }"
      >
        <DateEvent
          :day="day"
          :month="month"
          :end-day="endDay"
          :end-month="endMonth"
          :separator="dateSeparator"
        />
        <Text as="span" size="3xl" weight="bold" transform="uppercase" color="dark">
          {{ title }}
        </Text>
      </div>

      <!-- Description -->
      <Text size="base" color="dark" maxWidth="md" weight="light">
        {{ description }}
      </Text>

      <!-- CTA optionnel : lien si ctaHref, bouton + code promo si promoText,
           aucun bouton sinon (evenement sans billetterie en ligne) -->
      <ButtonSwave
        v-if="ctaText && ctaHref"
        :href="ctaHref"
        :external="ctaExternal"
      >
        {{ ctaText }}
      </ButtonSwave>
      <ButtonPromoSwave v-else-if="ctaText && promoText" :promo="promoText">
        {{ ctaText }}
      </ButtonPromoSwave>
    </div>

    <!-- Image (droite) -->
    <div class="event-info__image">
      <NuxtImg
        :src="image"
        :alt="computedImageAlt"
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
  │    • endDay / endMonth / dateSeparator : date sur plusieurs jours,           │
  │      transmis à DateEvent (voir ce composant)                                │
  │    • title: string - Titre de l'événement                                    │
  │    • description: string - Description de l'événement                        │
  │    • ctaText: string - Texte du bouton (vide par defaut = aucun bouton)      │
  │    • ctaHref: string - Avec ctaText : bouton-lien, sans code promo           │
  │    • ctaExternal: boolean - Ouvre le lien dans un nouvel onglet              │
  │    • promoText: string - Avec ctaText et sans ctaHref : bouton + pastille    │
  │      promo. Vide par defaut.                                                 │
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
  /* Événement sur plusieurs jours : transmis tels quels à DateEvent */
  endDay?: string;
  endMonth?: string;
  dateSeparator?: 'range' | 'and';
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
  endDay: '',
  endMonth: '',
  dateSeparator: 'range',
  /* Vides par defaut : sans ctaText, aucun bouton n'est affiche */
  ctaText: '',
  ctaHref: undefined,
  ctaExternal: false,
  promoText: '',
  imageAlt: '',
  imagePosition: 'right',
});

/* Computed pour alt text par défaut */
const computedImageAlt = computed(() => props.imageAlt || props.title);

/* Date sur plusieurs jours : deux blocs côte à côte, donc plus large */
const hasWideDate = computed(() => Boolean(props.endDay));
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
    /* flex-start et non stretch : une colonne de texte plus haute que
       l'image l'etirait, et le recadrage rognait les bords de l'affiche,
       la ou figurent justement ses dates et son titre. */
    align-items: flex-start;
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
/* Le gap porte seul l'espace entre la date et le titre : la date n'a plus de
   padding, ses chiffres s'alignent sur l'etiquette et le titre. 24px, comme
   le gap vertical de la colonne. */
.event-info__header {
  display: flex;
  align-items: center;
  gap: 24px;
}

/*
  Date sur plusieurs jours, affichée en largeur : sous 1024px elle passe
  au-dessus du titre. Côte à côte, elle laisserait moins de 200px à un
  titre en majuscules, qui partirait sur quatre ou cinq lignes.
*/
.event-info__header--wide-date {
  flex-direction: column;
  align-items: flex-start;

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: center;
  }
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

/* Proportions d'origine : une affiche d'evenement ne se recadre pas */
.event-info__image img {
  width: 100%;
  height: auto;
  display: block;
}
</style>
