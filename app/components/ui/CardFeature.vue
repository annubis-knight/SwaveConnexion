<template>
  <component
    :is="href ? 'a' : 'div'"
    :href="href"
    :class="cardClass"
  >
    <!-- Image -->
    <div class="card-feature__image">
      <img
        :src="image"
        :alt="imageAlt"
        class="card-feature__img"
      />
    </div>

    <!-- Content -->
    <div class="card-feature__content">
      <Heading :level="4" :color="textColor">
        <slot name="title">{{ title }}</slot>
        <span class="card-feature__arrow">→</span>
      </Heading>

      <Text :color="textColor" size="sm">
        <slot name="description">{{ description }}</slot>
      </Text>
    </div>
  </component>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────┐
  │                     CARD FEATURE                            │
  │  ┌───────────────────────────────────────────────────────┐  │
  │  │  ╭───────────────────────────────────────────────────╮│  │
  │  │  │                                                   ││  │
  │  │  │              .card-feature__image                 ││  │
  │  │  │                   <img />                         ││  │
  │  │  │         portrait: 3/4  |  landscape: 4/3         ││  │
  │  │  │                                                   ││  │
  │  │  ├───────────────────────────────────────────────────┤│  │
  │  │  │  .card-feature__content  (fond bleu)              ││  │
  │  │  │  ┌─────────────────────────────────────────────┐  ││  │
  │  │  │  │ <Heading :level="3"> TITRE →               │  ││  │
  │  │  │  └─────────────────────────────────────────────┘  ││  │
  │  │  │  ┌─────────────────────────────────────────────┐  ││  │
  │  │  │  │ <Text> Description courte...               │  ││  │
  │  │  │  └─────────────────────────────────────────────┘  ││  │
  │  │  ╰───────────────────────────────────────────────────╯│  │
  │  └───────────────────────────────────────────────────────┘  │
  │                                                             │
  │  Props:                                                     │
  │    • image: string - URL de l'image (requis)                │
  │    • imageAlt: string - Alt text de l'image                 │
  │    • title: string - Titre de la card                       │
  │    • description: string - Description de la card           │
  │    • href: string - Lien (optionnel, rend la card cliquable)│
  │    • format: 'portrait' | 'landscape' - Format de la card   │
  │    • textColor: 'dark' | 'white' - Couleur des textes       │
  │                                                             │
  │  Slots:                                                     │
  │    • title: Contenu du titre                                │
  │    • description: Contenu de la description                 │
  │                                                             │
  │  Events: Aucun (composant de présentation pure)             │
  │                                                             │
  │  Responsive:                                                │
  │    • Mobile: 100% largeur                                   │
  │    • Desktop: portrait ~280px | landscape ~400px            │
  └─────────────────────────────────────────────────────────────┘

  @dev Card avec image + contenu sur fond bleu
  @dev Format portrait (3/4) ou landscape (4/3)
  @dev Pas de padding, coins droits (aucun border-radius)
  @dev BEM : .card-feature, .card-feature__image, .card-feature__content
*/

// Props
interface Props {
  image: string;
  imageAlt?: string;
  title?: string;
  description?: string;
  href?: string;
  format?: 'portrait' | 'landscape';
  layout?: 'outside' | 'overlay';
  textColor?: 'dark' | 'white';
}

const props = withDefaults(defineProps<Props>(), {
  imageAlt: '',
  title: '',
  description: '',
  format: 'portrait',
  layout: 'outside',
  textColor: 'dark',
});

// Computed class BEM
const cardClass = computed(() => {
  return [
    'card-feature',
    `card-feature--${props.format}`,
    `card-feature--${props.layout}`,
    props.href ? 'card-feature--clickable' : '',
  ].filter(Boolean).join(' ');
});
</script>

<style scoped>
/**
 * CARD FEATURE STYLES - BEM strict + CSS Nesting
 * Card portrait/landscape sans padding, coins droits
 */

/* Block : .card-feature */
.card-feature {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  text-decoration: none;
  width: 100%;
  height: fit-content;

  /* Element : Image container - portrait par défaut (mobile-first) */
  .card-feature__image {
    width: 100%;
    overflow: hidden;
    aspect-ratio: 3 / 4;
  }

  .card-feature__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: filter 0.3s ease-in-out;
  }

  /* Element : Content */
  .card-feature__content {
    padding: var(--space-sm) var(--space-md);
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);

    h4{
    text-transform: uppercase;      
    }

  }

  /* Element : Arrow */
  .card-feature__arrow {
    margin-left: var(--space-xs);
    transition: transform 0.3s ease-in-out;
  }
}

/* Modifier : Format portrait (défaut) */
.card-feature--portrait {
  max-width: 500px;

  @media (max-width: 640px) {
    max-width: 100%;
  }
}

/* Modifier : Format landscape - landscape seulement en desktop */
.card-feature--landscape {
  max-width: 400px;

  @media (max-width: 640px) {
    max-width: 100%;
  }

  @media (min-width: 1024px) {
    max-width: 800px;
    .card-feature__image {
      aspect-ratio: 5 / 3;
    }
  }
}

/* Modifier : Cliquable */
.card-feature--clickable {
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

/* Modifier : Layout overlay - contenu par dessus l'image */
/* Modifier : Scale hover group (contrôlé par Section parente) */
.card-feature--scale-up {
  transform: scale(1.02);
  z-index: 10;
}

.card-feature--scale-down {
  transform: scale(0.98);
}

/* Modifier : Layout overlay - contenu par dessus l'image */
.card-feature--overlay {
  position: relative;

  .card-feature__img {
    filter: grayscale(100%);
  }

  &:hover .card-feature__img {
    filter: grayscale(0%);
  }

  .card-feature__content {
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  /* Dégradé pour lisibilité des textes blancs */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%);
    pointer-events: none;
    z-index: 0;
  }

  .card-feature__content {
    z-index: 1;
  }

  /* Heading : toujours visible, positionné en bas */
  .card-feature__content h4 {
    margin: 0;
    transition: transform 0.3s ease-in-out;
  }

  /* Text : masqué par défaut */
  .card-feature__content p {
    opacity: 0;
    max-height: 0;
    overflow: hidden;
    transform: translateY(10px);
    transition:
      opacity 0.3s ease-in-out,
      max-height 0.3s ease-in-out,
      transform 0.3s ease-in-out;
  }

  /* Hover : Text apparaît et pousse le Heading vers le haut */
  &:hover .card-feature__content p {
    opacity: 1;
    max-height: 200px;
    transform: translateY(0);
  }
}
</style>
