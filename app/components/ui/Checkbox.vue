<template>
  <!--
    Composant Checkbox - Case à cocher réutilisable

    Description : Case à cocher avec label et support v-model

    Input (Props) :
      - modelValue : boolean (défaut: false) - État coché
      - label : string (optionnel) - Texte du label
      - disabled : boolean (défaut: false)
      - indeterminate : boolean (défaut: false) - État indéterminé

    Output (Events) :
      - update:modelValue : Émis lors du changement

    Slots :
      - default : Remplace le label si fourni
  -->
  <label :class="checkboxClass">
    <input
      type="checkbox"
      class="checkbox__input"
      :checked="modelValue"
      :disabled="disabled"
      :indeterminate="indeterminate"
      @change="handleChange"
    />
    <span class="checkbox__checkmark"></span>
    <span v-if="label || $slots.default" class="checkbox__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
/**
 * CHECKBOX COMPONENT
 *
 * @dev CSS natif avec variables de _variables.css
 * @dev BEM strict : .checkbox, .checkbox__input, .checkbox__label, .checkbox--disabled
 * @dev Support v-model avec modelValue
 */

// Props
interface Props {
  modelValue?: boolean;
  label?: string;
  disabled?: boolean;
  indeterminate?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  label: '',
  disabled: false,
  indeterminate: false,
});

// Events
interface Emits {
  'update:modelValue': [value: boolean];
}

const emit = defineEmits<Emits>();

// Computed class BEM
const checkboxClass = computed(() => {
  return [
    'checkbox',
    props.disabled && 'checkbox--disabled',
    props.indeterminate && 'checkbox--indeterminate',
  ].filter(Boolean).join(' ');
});

// Handle change
const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.checked);
};
</script>

<style scoped>
/**
 * CHECKBOX STYLES - BEM strict
 *
 * @dev Variables de _variables.css
 */

/* Block : .checkbox */
.checkbox {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  cursor: pointer;
  position: relative;
}

.checkbox--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Element : .checkbox__input (hidden) */
.checkbox__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

/* Element : .checkbox__checkmark (custom checkbox) */
.checkbox__checkmark {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: var(--border-width-thick) solid var(--border-base);
  border-radius: var(--radius-sm);
  background-color: var(--bg-base);
  position: relative;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

/* Checkmark icon (hidden by default) */
.checkbox__checkmark::after {
  content: '';
  position: absolute;
  display: none;
  left: 5px;
  top: 1px;
  width: 6px;
  height: 11px;
  border: solid var(--text-inverse);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

/* Checked state */
.checkbox__input:checked ~ .checkbox__checkmark {
  background-color: var(--primary);
  border-color: var(--primary);
}

.checkbox__input:checked ~ .checkbox__checkmark::after {
  display: block;
}

/* Indeterminate state (ligne horizontale) */
.checkbox--indeterminate .checkbox__checkmark {
  background-color: var(--primary);
  border-color: var(--primary);
}

.checkbox--indeterminate .checkbox__checkmark::after {
  display: block;
  left: 4px;
  top: 7px;
  width: 10px;
  height: 0;
  border: none;
  border-bottom: 2px solid var(--text-inverse);
  transform: none;
}

/* Focus visible */
.checkbox__input:focus-visible ~ .checkbox__checkmark {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

/* Hover (non-disabled) */
.checkbox:hover:not(.checkbox--disabled) .checkbox__checkmark {
  border-color: var(--primary);
}

/* Element : .checkbox__label */
.checkbox__label {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  color: var(--text-strong);
  user-select: none;
}

.checkbox--disabled .checkbox__label {
  color: var(--text-subtle);
}
</style>
