<template>
  <!--
    Composant Tooltip - Info-bulle contextuelle

    Description : Info-bulle avec positioning automatique

    Input (Props) :
      - text : string (requis) - Texte de la tooltip
      - position : 'top' | 'bottom' | 'left' | 'right' (défaut: 'top')
      - trigger : 'hover' | 'click' (défaut: 'hover')

    Output (Events) :
      Aucun

    Slots :
      - default : Élément déclencheur (requis)
  -->
  <div class="tooltip" ref="tooltipRef">
    <div
      class="tooltip__trigger"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @click="handleClick"
    >
      <slot />
    </div>
    <Transition name="tooltip-fade">
      <div
        v-if="isVisible"
        :class="tooltipClass"
        role="tooltip"
      >
        {{ text }}
        <div class="tooltip__arrow"></div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';

/**
 * TOOLTIP COMPONENT
 *
 * @dev CSS natif avec variables de _variables.css
 * @dev BEM strict : .tooltip, .tooltip__trigger, .tooltip__content, .tooltip--top
 * @dev Positioning automatique avec flèche directionnelle
 * @dev z-index élevé pour être au-dessus de tout
 */

// Props
interface Props {
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'click';
}

const props = withDefaults(defineProps<Props>(), {
  position: 'top',
  trigger: 'hover',
});

// State
const isVisible = ref(false);
const tooltipRef = ref<HTMLElement | null>(null);

// Computed class BEM
const tooltipClass = computed(() => {
  return [
    'tooltip__content',
    `tooltip__content--${props.position}`,
  ].filter(Boolean).join(' ');
});

// Handle mouse enter (hover trigger)
const handleMouseEnter = () => {
  if (props.trigger === 'hover') {
    isVisible.value = true;
  }
};

// Handle mouse leave (hover trigger)
const handleMouseLeave = () => {
  if (props.trigger === 'hover') {
    isVisible.value = false;
  }
};

// Handle click (click trigger)
const handleClick = () => {
  if (props.trigger === 'click') {
    isVisible.value = !isVisible.value;
  }
};

// Click outside to close (click trigger only)
onClickOutside(tooltipRef, () => {
  if (props.trigger === 'click') {
    isVisible.value = false;
  }
});
</script>

<style scoped>
/**
 * TOOLTIP STYLES - BEM strict
 *
 * @dev Variables de _variables.css
 */

/* Block : .tooltip */
.tooltip {
  position: relative;
  display: inline-block;
}

/* Element : .tooltip__trigger */
.tooltip__trigger {
  display: inline-block;
  cursor: help;
}

/* Element : .tooltip__content */
.tooltip__content {
  position: absolute;
  z-index: 10000;
  padding: var(--space-xs) var(--space-sm);
  background-color: var(--bg-elevated);
  color: var(--text-strong);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  line-height: 1.4;
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-lg);
  white-space: nowrap;
  max-width: 250px;
  word-wrap: break-word;
  white-space: normal;
  border: var(--border-width) solid var(--border-base);
}

/* Position : top */
.tooltip__content--top {
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
}

.tooltip__content--top .tooltip__arrow {
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-top-color: var(--bg-elevated);
  border-bottom: none;
}

/* Position : bottom */
.tooltip__content--bottom {
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
}

.tooltip__content--bottom .tooltip__arrow {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-bottom-color: var(--bg-elevated);
  border-top: none;
}

/* Position : left */
.tooltip__content--left {
  right: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%);
}

.tooltip__content--left .tooltip__arrow {
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  border-left-color: var(--bg-elevated);
  border-right: none;
}

/* Position : right */
.tooltip__content--right {
  left: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%);
}

.tooltip__content--right .tooltip__arrow {
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  border-right-color: var(--bg-elevated);
  border-left: none;
}

/* Element : .tooltip__arrow (flèche) */
.tooltip__arrow {
  position: absolute;
  width: 0;
  height: 0;
  border: 4px solid transparent;
}

/* Transition : fade */
.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
  transition: opacity 0.2s ease;
}

.tooltip-fade-enter-from,
.tooltip-fade-leave-to {
  opacity: 0;
}
</style>
