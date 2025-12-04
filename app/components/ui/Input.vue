<template>
  <!--
    Composant Input - Champ de formulaire

    Description : Input text avec label et error

    Input (Props) :
      - label : Libellé du champ
      - type : Type HTML (text, email, password, etc.)
      - modelValue : Valeur v-model
      - error : Message d'erreur
      - placeholder : Texte placeholder

    Output (Events) :
      - update:modelValue : Émis lors de la saisie
  -->
  <div class="input-group">
    <label v-if="label" :for="inputId" class="input-group__label">
      {{ label }}
    </label>

    <input
      :id="inputId"
      :class="inputClass"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />

    <span v-if="error" class="input-group__error">
      {{ error }}
    </span>
  </div>
</template>

<script setup lang="ts">
/**
 * INPUT COMPONENT
 *
 * @dev Utilise v-model pour binding bidirectionnel
 * @dev BEM : .input-group, .input-group__label, .input-group__input, .input-group__error
 */

// Props
interface Props {
  label?: string;
  type?: string;
  modelValue?: string;
  error?: string;
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  modelValue: '',
});

// Events
interface Emits {
  'update:modelValue': [value: string];
}

const emit = defineEmits<Emits>();

// ID unique pour label/input
const inputId = computed(() => `input-${Math.random().toString(36).slice(2, 9)}`);

// Computed class BEM
const inputClass = computed(() => {
  return [
    'input-group__input',
    props.error && 'input-group__input--error',
  ].filter(Boolean).join(' ');
});
</script>

<style scoped>
/**
 * INPUT STYLES - BEM strict
 */

/* Block : .input-group */
.input-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

/* Element : .input-group__label */
.input-group__label {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--text-base);
}

/* Element : .input-group__input */
.input-group__input {
  padding: var(--space-sm);
  font-size: var(--text-base);
  color: var(--text-strong);
  background-color: var(--bg-input);
  border: var(--border-width) solid var(--border-base);
  border-radius: var(--radius-md);
  transition: border-color 0.2s ease;
}

.input-group__input:focus {
  outline: none;
  border-color: var(--primary);
}

.input-group__input::placeholder {
  color: var(--text-subtle);
}

/* Modifier : Erreur */
.input-group__input--error {
  border-color: var(--error);
}

/* Element : .input-group__error */
.input-group__error {
  font-size: var(--text-xs);
  color: var(--error);
}
</style>
