<template>
  <div class="card-event">
    <!-- Inner container pour centrage global -->
    <div class="card-event__inner">
      <!-- Date block (gauche) -->
      <div class="card-event__date">
        <Text as="span"  size="5xl" weight="black" leading="xtratight" color="dark">{{ day }}</Text>
        <Text as="span" size="2xl" weight="black" transform="uppercase" leading="tight" color="dark">{{ month }}</Text>
      </div>

      <!-- Content block (droite) -->
      <div class="card-event__content">
        <Text as="span" font="display" size="2xl" weight="light" transform="uppercase" color="dark">{{ title }}</Text>
        <Text v-if="subtitle" as="span" size="lg" weight="regular" transform="uppercase" tracking="wide" color="primary">{{ subtitle }}</Text>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────┐
  │                       CARD EVENT                            │
  │  ┌───────────────────────────────────────────────────────┐  │
  │  │  .card-event (100% width, height du parent)           │  │
  │  │  ┌─────────────────────────────────────────────────┐  │  │
  │  │  │  .card-event__inner (centré H+V)                │  │  │
  │  │  │  ┌────────┬──────────────────────────────────┐  │  │  │
  │  │  │  │  DATE  │           CONTENT                │  │  │  │
  │  │  │  │ ┌────┐ │  ┌────────────────────────────┐  │  │  │  │
  │  │  │  │ │ 20 │ │  │  KIZOMBA                   │  │  │  │  │
  │  │  │  │ │NOV │ │  │  INTERMÉDIAIRE             │  │  │  │  │
  │  │  │  │ └────┘ │  └────────────────────────────┘  │  │  │  │
  │  │  │  └────────┴──────────────────────────────────┘  │  │  │
  │  │  └─────────────────────────────────────────────────┘  │  │
  │  └───────────────────────────────────────────────────────┘  │
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
  │                                                             │
  │  Note: 100% width/height - taille imposée par le parent     │
  └─────────────────────────────────────────────────────────────┘

  @dev Utilise le composant Text avec ses props typographiques
  @dev CSS scoped = layout uniquement (pas de styles typo)
  @dev La taille de la card est définie par le wrapper parent
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
 * Taille 100% - imposée par le wrapper parent
 *
 * Note: Les styles typographiques sont gérés via les props de Text.vue
 * Ici on ne gère que le layout et les espacements
 */

/* Block : .card-event - prend 100% du parent */
.card-event {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.9);
  width: 100%;
  height: 100%;
}

/* Element : .card-event__inner - conteneur centré */
.card-event__inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
}

/* Element : .card-event__date - Bloc date à gauche */
.card-event__date {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Element : .card-event__content - Bloc contenu à droite */
.card-event__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--space-xs);
}
</style>
