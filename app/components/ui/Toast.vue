<template>
  <!--
    Composant Toast - Notification temporaire

    Description : Notification avec auto-dismiss et icône

    Input (Props) :
      - isOpen : boolean (défaut: false) - Affichage
      - variant : 'success' | 'warning' | 'error' | 'info' (défaut: 'info')
      - title : string (requis) - Titre
      - duration : number (défaut: 3000) - Durée avant auto-dismiss (ms), 0 = infini
      - closable : boolean (défaut: true) - Affiche bouton fermer

    Output (Events) :
      - close : Émis lors de la fermeture

    Slots :
      - default : Contenu du message
  -->
  <Teleport to="body">
    <Transition name="toast-slide">
      <div v-if="isOpen" :class="toastClass" role="alert">
        <div class="toast__icon">{{ iconText }}</div>
        <div class="toast__content">
          <div class="toast__title">{{ title }}</div>
          <div v-if="$slots.default" class="toast__message">
            <slot />
          </div>
        </div>
        <button
          v-if="closable"
          class="toast__close"
          @click="handleClose"
          aria-label="Fermer"
        >
          ×
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
/**
 * TOAST COMPONENT
 *
 * @dev CSS natif avec variables de _variables.css
 * @dev BEM strict : .toast, .toast__icon, .toast__content, .toast--success
 * @dev Position fixed top-right
 * @dev Auto-dismiss avec setTimeout
 */

// Props
interface Props {
  isOpen?: boolean;
  variant?: 'success' | 'warning' | 'error' | 'info';
  title: string;
  duration?: number;
  closable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
  variant: 'info',
  duration: 3000,
  closable: true,
});

// Events
interface Emits {
  close: [];
}

const emit = defineEmits<Emits>();

// Auto-dismiss timer
let autoCloseTimer: NodeJS.Timeout | null = null;

// Watch isOpen to manage auto-dismiss
watch(() => props.isOpen, (newValue) => {
  if (newValue && props.duration > 0) {
    // Clear existing timer
    if (autoCloseTimer) {
      clearTimeout(autoCloseTimer);
    }
    // Set new timer
    autoCloseTimer = setTimeout(() => {
      emit('close');
    }, props.duration);
  }
});

// Cleanup on unmount
onUnmounted(() => {
  if (autoCloseTimer) {
    clearTimeout(autoCloseTimer);
  }
});

// Computed class BEM
const toastClass = computed(() => {
  return [
    'toast',
    `toast--${props.variant}`,
  ].filter(Boolean).join(' ');
});

// Icon text based on variant
const iconText = computed(() => {
  const icons = {
    success: '✓',
    warning: '⚠',
    error: '✕',
    info: 'ℹ',
  };
  return icons[props.variant];
});

// Handle close
const handleClose = () => {
  if (autoCloseTimer) {
    clearTimeout(autoCloseTimer);
  }
  emit('close');
};
</script>

<style scoped>
/**
 * TOAST STYLES - BEM strict
 *
 * @dev Variables de _variables.css
 */

/* Block : .toast */
.toast {
  position: fixed;
  top: var(--space-lg);
  right: var(--space-lg);
  z-index: 9999;
  display: flex;
  align-items: flex-start;
  gap: var(--space-sm);
  min-width: 300px;
  max-width: 400px;
  padding: var(--space-md);
  background-color: var(--bg-base);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  border-left: 4px solid;
}

/* Variants */
.toast--success {
  border-left-color: var(--success);
}

.toast--warning {
  border-left-color: var(--warning);
}

.toast--error {
  border-left-color: var(--error);
}

.toast--info {
  border-left-color: var(--info);
}

/* Element : .toast__icon */
.toast__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: var(--radius-full);
  font-size: var(--text-base);
  font-weight: var(--font-bold);
  flex-shrink: 0;
  color: var(--text-inverse);
}

.toast--success .toast__icon {
  background-color: var(--success);
}

.toast--warning .toast__icon {
  background-color: var(--warning);
}

.toast--error .toast__icon {
  background-color: var(--error);
}

.toast--info .toast__icon {
  background-color: var(--info);
}

/* Element : .toast__content */
.toast__content {
  flex: 1;
  min-width: 0;
}

/* Element : .toast__title */
.toast__title {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--text-strong);
  margin-bottom: var(--space-xs);
}

/* Element : .toast__message */
.toast__message {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  color: var(--text-base);
  line-height: 1.5;
}

/* Element : .toast__close */
.toast__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  background: none;
  border: none;
  font-size: 24px;
  line-height: 1;
  color: var(--text-base);
  cursor: pointer;
  flex-shrink: 0;
  transition: color 0.2s ease;
}

.toast__close:hover {
  color: var(--text-strong);
}

/* Transition : slide from right */
.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 0.3s ease;
}

.toast-slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.toast-slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
