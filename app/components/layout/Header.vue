<template>
  <!--
    Composant Header - Navigation principale

    Description : En-tête sticky avec logo et navigation responsive

    Props :
      - Aucune (configuration statique pour l'instant)

    Slots :
      - default : Remplace les liens de navigation

    @dev Tailwind utilities uniquement (NO CSS natif scoped)
  -->
  <header class="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
    <div class="container mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-xl">S</span>
          </div>
          <span class="text-xl font-bold text-gray-900">SwaveConnexion</span>
        </div>

        <!-- Navigation Desktop -->
        <nav class="hidden md:flex items-center gap-8">
          <slot>
            <a href="#" class="text-gray-700 hover:text-blue-600 transition-colors font-medium">Accueil</a>
            <a href="#" class="text-gray-700 hover:text-blue-600 transition-colors font-medium">Composants</a>
            <a href="#" class="text-gray-700 hover:text-blue-600 transition-colors font-medium">Documentation</a>
            <a href="#" class="text-gray-700 hover:text-blue-600 transition-colors font-medium">À propos</a>
          </slot>
        </nav>

        <!-- Bouton Menu Mobile -->
        <button
          class="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
          @click="toggleMenu"
          aria-label="Toggle menu"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <!-- Navigation Mobile -->
      <Transition
        enter-active-class="transition-all duration-200"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <nav v-if="isMenuOpen" class="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
          <div class="flex flex-col gap-3">
            <a href="#" class="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2">Accueil</a>
            <a href="#" class="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2">Composants</a>
            <a href="#" class="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2">Documentation</a>
            <a href="#" class="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2">À propos</a>
          </div>
        </nav>
      </Transition>
    </div>
  </header>
</template>

<script setup lang="ts">
/**
 * HEADER COMPONENT
 *
 * @dev Tailwind utilities UNIQUEMENT (NO CSS natif)
 * @dev Responsive avec breakpoints (md:hidden, md:flex)
 */

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>
