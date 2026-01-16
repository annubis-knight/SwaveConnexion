<template>
  <input
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    :disabled="disabled"
    class="input-swave"
    :class="{ 'input-swave--disabled': disabled }"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────┐
  │                      INPUT SWAVE                            │
  │  ┌───────────────────────────────────────────────────────┐  │
  │  │  ╭───────────────────────────────────────────╮        │  │
  │  │  │                                           │        │  │
  │  │  │  [placeholder / value]                    │ ← pill │  │
  │  │  │                                           │        │  │
  │  │  ╰───────────────────────────────────────────╯        │  │
  │  │        ↑ bg: white, border-radius full               │  │
  │  └───────────────────────────────────────────────────────┘  │
  │                                                             │
  │  Props:                                                     │
  │    • modelValue: string (v-model)                           │
  │    • placeholder: string (défaut: "")                       │
  │    • type: string (défaut: "text")                          │
  │    • disabled: boolean (défaut: false)                      │
  │                                                             │
  │  Events:                                                    │
  │    • update:modelValue: string - v-model natif              │
  └─────────────────────────────────────────────────────────────┘

  Input pill style Swave : fond blanc, border-radius full, sobre

  @dev CSS natif avec variables de _variables.css
  @dev BEM strict : .input-swave, .input-swave--disabled
*/

interface Props {
  modelValue?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '',
  type: 'text',
  disabled: false,
});

defineEmits<{
  'update:modelValue': [value: string];
}>();
</script>

<style scoped>
/**
 * INPUT SWAVE STYLES - BEM strict
 *
 * Style pill : fond blanc, border-radius full, sobre
 */

.input-swave {
  display: block;
  width: 100%;
  padding: 0.875rem 1.5rem;
  font-family: var(--font-sans);
  font-size: var(--text-base);
  color: var(--text-strong);
  background-color: #ffffff;
  border: none;
  border-radius: 9999px;
  outline: none;
  transition: box-shadow 0.2s ease;
}

.input-swave::placeholder {
  color: var(--text-muted);
}

.input-swave:focus {
  box-shadow: 0 0 0 2px var(--primary-dark);
}

.input-swave--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
