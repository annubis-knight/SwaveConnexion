<template>
  <!--
    Composant Dropdown - Menu déroulant

    Description : Menu contextuel avec items cliquables

    Input (Props) :
      - items : Array<{label: string, value: string}>
      - placeholder : Texte par défaut

    Output (Events) :
      - select : Émis lors de la sélection (value)
  -->
  <div class="dropdown" ref="dropdownRef">
    <button class="dropdown__trigger" @click="isOpen = !isOpen">
      {{ selectedLabel || placeholder }}
      <span class="dropdown__arrow">▼</span>
    </button>

    <Transition name="dropdown">
      <ul v-if="isOpen" class="dropdown__menu">
        <li
          v-for="item in items"
          :key="item.value"
          class="dropdown__item"
          @click="selectItem(item)"
        >
          {{ item.label }}
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';

/**
 * DROPDOWN COMPONENT
 *
 * @dev Fermeture au clic extérieur via onClickOutside
 * @dev BEM : .dropdown, .dropdown__trigger, .dropdown__menu, .dropdown__item
 */

// Types
interface DropdownItem {
  label: string;
  value: string;
}

// Props
interface Props {
  items: DropdownItem[];
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Sélectionner',
});

// Events
interface Emits {
  select: [value: string];
}

const emit = defineEmits<Emits>();

// State
const isOpen = ref(false);
const selectedLabel = ref('');
const dropdownRef = ref<HTMLElement | null>(null);

// Sélection d'un item
const selectItem = (item: DropdownItem) => {
  selectedLabel.value = item.label;
  emit('select', item.value);
  isOpen.value = false;
};

// Fermeture au clic extérieur
onClickOutside(dropdownRef, () => {
  isOpen.value = false;
});
</script>

<style scoped>
/**
 * DROPDOWN STYLES - BEM strict
 */

/* Block : .dropdown */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Element : .dropdown__trigger */
.dropdown__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  font-size: var(--text-base);
  color: var(--neutral-dark);
  background-color: var(--neutral-white);
  border: var(--border-width) solid var(--neutral-medium);
  border-radius: var(--radius-md);
  cursor: pointer;
  min-width: 200px;
}

.dropdown__trigger:hover {
  border-color: var(--primary);
}

/* Element : .dropdown__arrow */
.dropdown__arrow {
  font-size: var(--text-xs);
  color: var(--neutral-dark);
}

/* Element : .dropdown__menu */
.dropdown__menu {
  position: absolute;
  top: calc(100% + 0.25rem);
  left: 0;
  right: 0;
  background-color: var(--neutral-white);
  border: var(--border-width) solid var(--neutral-medium);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 300px;
  overflow-y: auto;
  z-index: 100;
}

/* Element : .dropdown__item */
.dropdown__item {
  padding: var(--space-sm) var(--space-md);
  font-size: var(--text-base);
  color: var(--neutral-dark);
  cursor: pointer;
}

.dropdown__item:hover {
  background-color: var(--neutral-light);
  color: var(--primary);
}

/* Transitions */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
