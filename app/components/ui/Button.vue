<template>
  <!--
    Composant Button - Bouton réutilisable

    Description : Bouton avec variantes de couleur et tailles

    Input (Props) :
      - variant : 'primary' | 'secondary' | 'accent' | 'outline' | 'outline-light' (défaut: 'primary')
      - size : 'sm' | 'md' | 'lg' (défaut: 'md')
      - disabled : boolean (défaut: false)

    Output (Events) :
      - click : Émis lors du clic

    Slots :
      - default : Contenu du bouton
  -->
  <button
    :class="btnClass"
    :disabled="disabled"
    @click="emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
/**
 * BUTTON COMPONENT
 *
 * @dev CSS natif avec variables de _variables.css
 * @dev BEM strict : .btn, .btn--primary, .btn--sm
 */

// Props
interface Props {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'outline-light';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
});

// Events
interface Emits {
  click: [event: MouseEvent];
}

const emit = defineEmits<Emits>();

// Computed class BEM
const btnClass = computed(() => {
  return [
    'btn',
    `btn--${props.variant}`,
    `btn--${props.size}`,
    props.disabled && 'btn--disabled',
  ].filter(Boolean).join(' ');
});
</script>

<style scoped>
/**
 * BUTTON STYLES - BEM strict
 *
 * @dev Variables de _variables.css et _typography.css
 */

/* Block : .btn */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  font-family: var(--font-sans);
  font-weight: var(--font-medium);
  border: var(--border-width) solid transparent;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

/* Modifier : Variantes */
.btn--primary {
  background-color: var(--primary);
  color: white; /* Hardcodé OK (bouton sur fond coloré) */
}

.btn--primary:hover:not(.btn--disabled) {
  background-color: var(--primary-dark);
}

.btn--secondary {
  background-color: var(--secondary);
  color: white; /* Hardcodé OK (bouton sur fond coloré) */
}

.btn--secondary:hover:not(.btn--disabled) {
  background-color: var(--secondary-dark);
}

.btn--accent {
  background-color: var(--accent);
  color: white; /* Hardcodé OK (bouton sur fond coloré) */
}

.btn--accent:hover:not(.btn--disabled) {
  background-color: var(--accent-dark);
}

.btn--outline {
  background-color: transparent;
  color: var(--primary);
  border-color: var(--primary);
}

.btn--outline:hover:not(.btn--disabled) {
  background-color: var(--primary-light);
  color: white; /* Hardcodé OK (bouton sur fond coloré au hover) */
}

.btn--outline-light {
  background-color: transparent;
  color: white; /* Hardcodé OK (utilisé sur fonds foncés type Hero) */
  border-color: white;
}

.btn--outline-light:hover:not(.btn--disabled) {
  background-color: white;
  color: var(--primary);
}

/* Modifier : Tailles */
.btn--sm {
  padding: var(--space-xs) var(--space-sm);
  font-size: var(--text-sm);
}

.btn--md {
  padding: var(--space-sm) var(--space-md);
  font-size: var(--text-base);
}

.btn--lg {
  padding: var(--space-md) var(--space-lg);
  font-size: var(--text-lg);
}

/* Modifier : Désactivé */
.btn--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
