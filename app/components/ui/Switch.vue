<template>
  <!--
    Composant Switch - Toggle on/off

    Description : Interrupteur minimaliste avec animation

    Input (Props) :
      - modelValue : boolean (défaut: false) - État on/off
      - label : string (optionnel) - Texte du label
      - disabled : boolean (défaut: false)
      - size : 'sm' | 'md' (défaut: 'md')

    Output (Events) :
      - update:modelValue : Émis lors du changement

    Slots :
      - default : Remplace le label si fourni
  -->
  <label :class="switchClass">
    <input
      type="checkbox"
      class="switch__input"
      :checked="modelValue"
      :disabled="disabled"
      @change="handleChange"
    />
    <span class="switch__track">
      <span class="switch__thumb"></span>
    </span>
    <span v-if="label || $slots.default" class="switch__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
/**
 * SWITCH COMPONENT
 *
 * @dev CSS natif avec variables de _variables.css
 * @dev BEM strict : .switch, .switch__track, .switch__thumb, .switch--checked
 * @dev Animation smooth du thumb avec transition CSS
 */

// Props
interface Props {
  modelValue?: boolean;
  label?: string;
  disabled?: boolean;
  size?: 'sm' | 'md';
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  label: '',
  disabled: false,
  size: 'md',
});

// Events
interface Emits {
  'update:modelValue': [value: boolean];
}

const emit = defineEmits<Emits>();

// Computed class BEM
const switchClass = computed(() => {
  return [
    'switch',
    `switch--${props.size}`,
    props.modelValue && 'switch--checked',
    props.disabled && 'switch--disabled',
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
 * SWITCH STYLES - BEM strict
 *
 * @dev Variables de _variables.css
 */

/* Block : .switch */
.switch {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  cursor: pointer;
  position: relative;
}

.switch--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Element : .switch__input (hidden) */
.switch__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

/* Element : .switch__track */
.switch__track {
  display: inline-block;
  position: relative;
  background-color: var(--neutral-medium);
  border-radius: var(--radius-full);
  transition: background-color 0.3s ease;
  flex-shrink: 0;
}

/* Taille MD (défaut) */
.switch--md .switch__track {
  width: 44px;
  height: 24px;
}

/* Taille SM */
.switch--sm .switch__track {
  width: 36px;
  height: 20px;
}

/* Element : .switch__thumb */
.switch__thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  background-color: var(--neutral-white);
  border-radius: var(--radius-full);
  transition: transform 0.3s ease;
  box-shadow: var(--shadow-sm);
}

/* Taille MD thumb */
.switch--md .switch__thumb {
  width: 20px;
  height: 20px;
}

/* Taille SM thumb */
.switch--sm .switch__thumb {
  width: 16px;
  height: 16px;
}

/* Checked state */
.switch--checked .switch__track {
  background-color: var(--primary);
}

/* MD thumb translation when checked */
.switch--md.switch--checked .switch__thumb {
  transform: translateX(20px);
}

/* SM thumb translation when checked */
.switch--sm.switch--checked .switch__thumb {
  transform: translateX(16px);
}

/* Focus visible */
.switch__input:focus-visible ~ .switch__track {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

/* Hover (non-disabled) */
.switch:hover:not(.switch--disabled) .switch__track {
  opacity: 0.9;
}

/* Element : .switch__label */
.switch__label {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  color: var(--neutral-black);
  user-select: none;
}

.switch--disabled .switch__label {
  color: var(--neutral-dark);
}
</style>
