<template>
  <!--
    Composant Sidebar - Navigation latérale

    Description : Barre latérale collapsible pour navigation secondaire

    Props :
      - isOpen : boolean (contrôle l'état ouvert/fermé)
      - position : 'left' | 'right' (position de la sidebar)

    Events :
      - close : Émis lors de la fermeture

    Slots :
      - default : Contenu de la sidebar

    @dev Tailwind utilities uniquement (NO CSS natif scoped)
  -->
  <Transition
    enter-active-class="transition-all duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-all duration-300"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/50 z-40"
      @click="emit('close')"
    />
  </Transition>

  <Transition
    enter-active-class="transition-transform duration-300"
    :enter-from-class="position === 'left' ? '-translate-x-full' : 'translate-x-full'"
    enter-to-class="translate-x-0"
    leave-active-class="transition-transform duration-300"
    leave-from-class="translate-x-0"
    :leave-to-class="position === 'left' ? '-translate-x-full' : 'translate-x-full'"
  >
    <aside
      v-if="isOpen"
      :class="[
        'fixed top-0 h-full bg-white shadow-2xl z-50 w-80 overflow-y-auto',
        position === 'left' ? 'left-0' : 'right-0'
      ]"
    >
      <!-- Header avec bouton fermer -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <h3 class="text-xl font-bold text-gray-900">Navigation</h3>
        <button
          @click="emit('close')"
          class="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Close sidebar"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Contenu -->
      <div class="p-6">
        <slot>
          <nav class="flex flex-col gap-2">
            <a href="#" class="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium">
              Accueil
            </a>
            <a href="#" class="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium">
              Composants
            </a>
            <a href="#" class="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium">
              Documentation
            </a>
            <a href="#" class="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium">
              À propos
            </a>
          </nav>
        </slot>
      </div>
    </aside>
  </Transition>
</template>

<script setup lang="ts">
/**
 * SIDEBAR COMPONENT
 *
 * @dev Tailwind utilities UNIQUEMENT (NO CSS natif)
 * @dev Position dynamique (left/right)
 * @dev Transitions Tailwind (duration-300, translate-x-*)
 */

interface Props {
  isOpen: boolean;
  position?: 'left' | 'right';
}

const props = withDefaults(defineProps<Props>(), {
  position: 'left',
});

interface Emits {
  close: [];
}

const emit = defineEmits<Emits>();
</script>
