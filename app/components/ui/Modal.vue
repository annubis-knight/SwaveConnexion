<template>
  <!--
    Composant Modal - Modale accessible

    Description : Overlay modale avec fermeture ESC/backdrop

    Input (Props) :
      - isOpen : boolean - Contrôle l'affichage
      - title : Titre de la modale

    Output (Events) :
      - close : Émis lors de la fermeture

    Slots :
      - default : Contenu de la modale
      - footer : Actions (boutons)
  -->
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="modal" @click="emit('close')">
        <div class="modal__backdrop"></div>

        <div class="modal__container" @click.stop>
          <div class="modal__header">
            <h3 class="modal__title">{{ title }}</h3>
            <button class="modal__close" @click="emit('close')" aria-label="Fermer">
              ✕
            </button>
          </div>

          <div class="modal__body">
            <slot />
          </div>

          <div v-if="$slots.footer" class="modal__footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core';

/**
 * MODAL COMPONENT
 *
 * @dev Teleport vers body pour overlay
 * @dev Fermeture ESC via onKeyStroke (composable Vue)
 * @dev BEM : .modal, .modal__backdrop, .modal__container
 */

// Props
interface Props {
  isOpen: boolean;
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Modal',
});

// Events
interface Emits {
  close: [];
}

const emit = defineEmits<Emits>();

// Fermeture avec ESC
onKeyStroke('Escape', () => {
  if (props.isOpen) emit('close');
});

// Bloquer le scroll du body quand modal ouverte
watch(() => props.isOpen, (open) => {
  if (open) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});
</script>

<style scoped>
/**
 * MODAL STYLES - BEM strict
 */

/* Block : .modal */
.modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-md);
}

/* Element : .modal__backdrop */
.modal__backdrop {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

/* Element : .modal__container */
.modal__container {
  position: relative;
  background-color: var(--bg-base);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
}

/* Element : .modal__header */
.modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-md);
  border-bottom: var(--border-width) solid var(--border-base);
}

/* Element : .modal__title */
.modal__title {
  margin: 0;
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
}

/* Element : .modal__close */
.modal__close {
  padding: var(--space-xs);
  font-size: var(--text-xl);
  color: var(--text-base);
  background: none;
  border: none;
  cursor: pointer;
  border-radius: var(--radius-sm);
}

.modal__close:hover {
  background-color: var(--bg-hover);
}

/* Element : .modal__body */
.modal__body {
  padding: var(--space-md);
}

/* Element : .modal__footer */
.modal__footer {
  display: flex;
  gap: var(--space-sm);
  justify-content: flex-end;
  padding: var(--space-md);
  border-top: var(--border-width) solid var(--border-base);
}

/* Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
