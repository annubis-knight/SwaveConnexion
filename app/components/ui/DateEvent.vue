<template>
  <div class="date-event">
    <div class="date-event__inner">
      <Text as="span" size="5xl" weight="black" leading="xtratight" color="dark">{{ day }}</Text>
      <Text as="span" size="2xl" weight="black" transform="uppercase" leading="tight" color="dark">{{ month }}</Text>
    </div>
  </div>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────┐
  │                       DATE EVENT                            │
  │  ┌───────────────────────────────────────────────────────┐  │
  │  │  .date-event (writing-mode trick pour carré 1:1)      │  │
  │  │  ┌─────────────────────────────────────────────────┐  │  │
  │  │  │  .date-event__inner                             │  │  │
  │  │  │  ┌─────────────────────────────────────────┐    │  │  │
  │  │  │  │           17                            │    │  │  │
  │  │  │  │          NOV                            │    │  │  │
  │  │  │  └─────────────────────────────────────────┘    │  │  │
  │  │  │  ↑ Text 5xl black + Text 2xl uppercase         │  │  │
  │  │  └─────────────────────────────────────────────────┘  │  │
  │  │  ↑ aspect-ratio 1/1 basé sur hauteur (writing-mode)   │  │
  │  └───────────────────────────────────────────────────────┘  │
  │                                                             │
  │  Technique CSS "content-first" :                            │
  │    1. writing-mode: vertical-lr inverse les axes            │
  │    2. aspect-ratio: 1/1 utilise la "largeur" (= hauteur)    │
  │    3. Le wrapper interne remet le texte à l'horizontal      │
  │    → Résultat : carré dont la taille = hauteur du texte     │
  │                                                             │
  │  Props:                                                     │
  │    • day: string - Jour (ex: "17")                          │
  │    • month: string - Mois abrégé (ex: "NOV")                │
  │                                                             │
  │  Slots: Aucun                                               │
  │                                                             │
  │  Events: Aucun (composant de présentation pure)             │
  └─────────────────────────────────────────────────────────────┘

  @dev Extrait de CardEvent.vue pour réutilisation
  @dev Utilise le composant Text avec ses props typographiques
  @dev CSS scoped = layout uniquement (pas de styles typo)
*/

interface Props {
  day: string;
  month: string;
}

defineProps<Props>();
</script>

<style scoped>
/**
 * DATE EVENT STYLES - BEM strict
 * Bloc date carré 1:1 basé sur la hauteur du contenu
 *
 * Technique content-first (hauteur comme référence) :
 * - writing-mode: vertical-lr inverse les axes
 * - aspect-ratio: 1/1 utilise alors la hauteur intrinsèque comme référence
 * - Le wrapper interne remet le texte à l'horizontal
 */

/* Block : .date-event - Carré 1:1 basé sur la HAUTEUR du contenu */
.date-event {
  writing-mode: vertical-lr;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

/* Element : .date-event__inner - Remet le texte à l'horizontal */
.date-event__inner {
  writing-mode: horizontal-tb;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;

  span {
    text-box: trim-both cap alphabetic;
  }
}
</style>
