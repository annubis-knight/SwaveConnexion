<template>
  <!--
    Composant Card - Carte conteneur

    Description : Carte avec header et footer optionnels

    Input (Props) :
      - variant : 'default' | 'bordered' | 'elevated' (défaut: 'default')

    Slots :
      - header : En-tête optionnel
      - default : Contenu principal
      - footer : Pied de page optionnel
  -->
  <div :class="cardClass">
    <div v-if="$slots.header" class="card__header">
      <slot name="header" />
    </div>

    <div class="card__body">
      <slot />
    </div>

    <div v-if="$slots.footer" class="card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * CARD COMPONENT
 *
 * @dev Structure simple : header, body, footer (optionnels)
 * @dev BEM : .card, .card__header, .card__body, .card__footer
 */

// Props
interface Props {
  variant?: 'default' | 'bordered' | 'elevated';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
});

// Computed class BEM
const cardClass = computed(() => {
  return ['card', `card--${props.variant}`].join(' ');
});
</script>

<style scoped>
/**
 * CARD STYLES - BEM strict
 * PRD v2.0 - Phase 3: Migré vers variables sémantiques
 */

/* Block : .card */
.card {
  background-color: var(--bg-base);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

/* Element : .card__header */
.card__header {
  padding: var(--space-md);
  border-bottom: var(--border-width) solid var(--border-base);
}

/* Element : .card__body */
.card__body {
  padding: var(--space-md);
}

/* Element : .card__footer */
.card__footer {
  padding: var(--space-md);
  border-top: var(--border-width) solid var(--border-base);
  background-color: var(--bg-subtle);
}

/* Modifier : Variantes */
.card--default {
  border: var(--border-width) solid var(--border-base);
}

.card--bordered {
  border: var(--border-width-thick) solid var(--border-strong);
}

.card--elevated {
  border: none;
  box-shadow: var(--shadow-lg);
}
</style>
