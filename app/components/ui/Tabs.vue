<template>
  <!--
    Composant Tabs - Navigation par onglets

    Description : Système d'onglets avec keyboard navigation

    Input (Props) :
      - modelValue : string (requis) - Value de l'onglet actif
      - items : TabItem[] (requis) - Liste des onglets

    TabItem interface:
      - label : string - Texte de l'onglet
      - value : string - Valeur unique
      - disabled : boolean (optionnel) - Onglet désactivé

    Output (Events) :
      - update:modelValue : Émis lors du changement d'onglet

    Slots :
      - default : Contenu de l'onglet actif (utiliser v-if avec modelValue)
  -->
  <div class="tabs">
    <!-- Tab list -->
    <div
      class="tabs__list"
      role="tablist"
      @keydown="handleKeyDown"
    >
      <button
        v-for="(item, index) in items"
        :key="item.value"
        :class="getTabClass(item)"
        role="tab"
        :aria-selected="modelValue === item.value"
        :aria-disabled="item.disabled"
        :tabindex="getTabIndex(item, index)"
        @click="selectTab(item)"
        @focus="currentFocusIndex = index"
      >
        {{ item.label }}
      </button>
    </div>

    <!-- Tab panels (content) -->
    <div class="tabs__panels">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * TABS COMPONENT
 *
 * @dev CSS natif avec variables de _variables.css
 * @dev BEM strict : .tabs, .tabs__list, .tabs__item, .tabs__item--active
 * @dev Keyboard navigation : Arrow keys, Home, End
 * @dev ARIA complet : role=tablist, role=tab, aria-selected
 */

// Types
interface TabItem {
  label: string;
  value: string;
  disabled?: boolean;
}

// Props
interface Props {
  modelValue: string;
  items: TabItem[];
}

const props = defineProps<Props>();

// Events
interface Emits {
  'update:modelValue': [value: string];
}

const emit = defineEmits<Emits>();

// State for keyboard navigation
const currentFocusIndex = ref(0);

// Select tab
const selectTab = (item: TabItem) => {
  if (!item.disabled) {
    emit('update:modelValue', item.value);
  }
};

// Get tab class BEM
const getTabClass = (item: TabItem) => {
  return [
    'tabs__item',
    props.modelValue === item.value && 'tabs__item--active',
    item.disabled && 'tabs__item--disabled',
  ].filter(Boolean).join(' ');
};

// Get tab index for keyboard navigation
const getTabIndex = (item: TabItem, index: number) => {
  // Active tab is always focusable
  if (props.modelValue === item.value) return 0;
  // Disabled tabs are not focusable
  if (item.disabled) return -1;
  // Other tabs are not in tab order (keyboard nav with arrows)
  return -1;
};

// Keyboard navigation
const handleKeyDown = (event: KeyboardEvent) => {
  const { key } = event;
  const enabledItems = props.items.filter(item => !item.disabled);

  if (!enabledItems.length) return;

  let newIndex = currentFocusIndex.value;

  switch (key) {
    case 'ArrowRight':
    case 'ArrowDown':
      event.preventDefault();
      // Move to next enabled tab
      do {
        newIndex = (newIndex + 1) % props.items.length;
      } while (props.items[newIndex].disabled);
      break;

    case 'ArrowLeft':
    case 'ArrowUp':
      event.preventDefault();
      // Move to previous enabled tab
      do {
        newIndex = (newIndex - 1 + props.items.length) % props.items.length;
      } while (props.items[newIndex].disabled);
      break;

    case 'Home':
      event.preventDefault();
      // Move to first enabled tab
      newIndex = props.items.findIndex(item => !item.disabled);
      break;

    case 'End':
      event.preventDefault();
      // Move to last enabled tab
      newIndex = props.items.length - 1 - [...props.items].reverse().findIndex(item => !item.disabled);
      break;

    default:
      return;
  }

  currentFocusIndex.value = newIndex;
  selectTab(props.items[newIndex]);
};
</script>

<style scoped>
/**
 * TABS STYLES - BEM strict
 *
 * @dev Variables de _variables.css
 */

/* Block : .tabs */
.tabs {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

/* Element : .tabs__list */
.tabs__list {
  display: flex;
  gap: var(--space-xs);
  border-bottom: var(--border-width-thick) solid var(--neutral-medium);
}

/* Element : .tabs__item */
.tabs__item {
  padding: var(--space-sm) var(--space-md);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  color: var(--neutral-dark);
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  bottom: -2px;
}

.tabs__item:hover:not(.tabs__item--disabled) {
  color: var(--primary);
}

.tabs__item:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

/* Modifier : active */
.tabs__item--active {
  color: var(--primary);
  border-bottom-color: var(--primary);
}

/* Modifier : disabled */
.tabs__item--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Element : .tabs__panels */
.tabs__panels {
  min-height: 100px;
}
</style>
