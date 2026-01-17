<template>
  <div class="card-event">
    <!-- Date block (gauche) - carré 1:1 basé sur la hauteur du contenu -->
    <div class="card-event__date">
      <div class="card-event__date-inner">
        <Text as="span" size="5xl" weight="black" leading="xtratight" color="dark">{{ day }}</Text>
        <Text as="span" size="2xl" weight="black" transform="uppercase" leading="tight" color="dark">{{ month }}</Text>
      </div>
    </div>

    <!-- Content block (droite) -->
    <div class="card-event__content">
      <Text as="span" font="display" size="2xl" weight="light" transform="uppercase" color="dark">{{ title }}</Text>
      <Text v-if="subtitle" as="span" size="lg" weight="regular" transform="uppercase" tracking="wide" color="primary">{{ subtitle }}</Text>
    </div>
  </div>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────┐
  │                       CARD EVENT                            │
  │  ┌───────────────────────────────────────────────────────┐  │
  │  │  .card-event (inline-flex, height = date block)      │  │
  │  │  ┌────────────┬────────────────────────────────────┐  │  │
  │  │  │    DATE    │           CONTENT                  │  │  │
  │  │  │  ┌──────┐  │  ┌──────────────────────────────┐  │  │  │
  │  │  │  │  20  │  │  │  KIZOMBA                     │  │  │  │
  │  │  │  │ NOV  │  │  │  INTERMÉDIAIRE               │  │  │  │
  │  │  │  └──────┘  │  └──────────────────────────────┘  │  │  │
  │  │  │  1:1 ratio │                                    │  │  │
  │  │  └────────────┴────────────────────────────────────┘  │  │
  │  └───────────────────────────────────────────────────────┘  │
  │                                                             │
  │  Architecture "content-first" (hauteur comme référence) :   │
  │    1. writing-mode: vertical-lr inverse les axes            │
  │    2. aspect-ratio: 1/1 utilise la "largeur" (= hauteur)    │
  │    3. Le wrapper interne remet le texte à l'horizontal      │
  │    → Résultat : carré dont la taille = hauteur du texte     │
  │                                                             │
  │  Props:                                                     │
  │    • day: string - Jour de l'événement (ex: "20")           │
  │    • month: string - Mois abrégé (ex: "NOV")                │
  │    • title: string - Titre de l'événement                   │
  │    • subtitle: string (optionnel) - Sous-titre/niveau       │
  │                                                             │
  │  Slots: Aucun                                               │
  │                                                             │
  │  Events: Aucun (composant de présentation pure)             │
  └─────────────────────────────────────────────────────────────┘

  @dev Utilise le composant Text avec ses props typographiques
  @dev CSS scoped = layout uniquement (pas de styles typo)
  @dev La taille de la card est définie par le bloc date (content-first)
  @dev Technique CSS: writing-mode trick pour aspect-ratio basé sur hauteur
*/

// Props
interface Props {
  day: string;
  month: string;
  title: string;
  subtitle?: string;
}

withDefaults(defineProps<Props>(), {});
</script>

<style scoped>
/**
 * CARD EVENT STYLES - BEM strict
 * Carte événement avec date à gauche et description à droite
 *
 * Architecture content-first (hauteur comme référence) :
 * - writing-mode: vertical-lr sur .card-event__date inverse les axes
 * - aspect-ratio: 1/1 utilise alors la hauteur intrinsèque comme référence
 * - Le wrapper interne remet le texte à l'horizontal
 * - Résultat : carré parfait basé sur la hauteur du contenu texte
 */

/* Block : .card-event - hauteur définie par le bloc date */
.card-event {
  display: flex;
  gap:20px;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  min-width: 360px;
}

/* Element : .card-event__date - Carré 1:1 basé sur la HAUTEUR du contenu */
.card-event__date {
  writing-mode: vertical-lr;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

/* Element : .card-event__date-inner - Remet le texte à l'horizontal */
.card-event__date-inner {
  writing-mode: horizontal-tb;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap:16px;

  span{
    text-box: trim-both cap alphabetic;
  }
}

/* Element : .card-event__content - Bloc contenu à droite */
.card-event__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: var(--space-xs);
  padding: var(--space-md);
}
</style>
