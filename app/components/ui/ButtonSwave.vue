<template>
  <button
    class="btn-swave"
    :class="{ 'btn-swave--disabled': disabled }"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────┐
  │                      BUTTON SWAVE                           │
  │  ┌───────────────────────────────────────────────────────┐  │
  │  │  ╭───────────────────────────────────────────╮        │  │
  │  │  │                                           │        │  │
  │  │  │  [slot: texte]                            │ ← pill │  │
  │  │  │                                           │        │  │
  │  │  ╰───────────────────────────────────────────╯        │  │
  │  │        ↑ border: 1px white, bg: blue                  │  │
  │  └───────────────────────────────────────────────────────┘  │
  │                                                             │
  │  Props:                                                     │
  │    • disabled: boolean (default: false)                     │
  │                                                             │
  │  Slots:                                                     │
  │    • default: Contenu du bouton (texte)                     │
  │                                                             │
  │  Events:                                                    │
  │    • click: MouseEvent - Natif                              │
  └─────────────────────────────────────────────────────────────┘

  Bouton pill style Swave : fond bleu, bordure blanche, très arrondi

  @dev CSS natif avec variables de _variables.css
  @dev BEM strict : .btn-swave, .btn-swave--disabled
*/

interface Props {
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  disabled: false,
});
</script>

<style scoped>
/**
 * BUTTON SWAVE STYLES - BEM strict
 *
 * Style pill : bordure blanche 1px, fond bleu Swave, border-radius full
 */

.btn-swave {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 3rem;
  font-family: var(--font-sans);
  font-weight: var(--font-medium);
  font-size: var(--text-md);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-inverse);
  background-color: var(--primary);
  border: 1px solid var(--border-base);
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.2s ease;

  /* Mobile: full width pour meilleure ergonomie tactile */
  width: 100%;

  /* Desktop: taille selon contenu */
  @media (min-width: 768px) {
    width: min-content;
    min-width: 300px;
  }
}

.btn-swave:hover:not(.btn-swave--disabled) {
  background-color: var(--primary-dark);
}

.btn-swave:focus-visible {
  outline: 2px solid var(--border-base);
  outline-offset: 2px;
}

.btn-swave--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
