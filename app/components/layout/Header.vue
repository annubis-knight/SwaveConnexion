<template>
  <!--
    Composant Header - Navigation principale

    Description : En-tête sticky avec logo et navigation responsive

    Props :
      - Aucune (configuration statique pour l'instant)

    Slots :
      - default : Remplace les liens de navigation

    @dev Tailwind utilities uniquement (NO CSS natif scoped)
    @dev Phase 11: Dark mode toggle
    @dev Phase 12: Theme selector
  -->
  <header class="sticky top-0 z-50 bg-white dark:bg-neutral-light border-b border-gray-200 dark:border-neutral-medium shadow-sm">
    <div class="container mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-xl">S</span>
          </div>
          <span class="text-xl font-bold text-gray-900 dark:text-neutral-black">SwaveConnexion</span>
        </div>

        <!-- Navigation Desktop -->
        <nav class="hidden md:flex items-center gap-6">
          <slot>
            <a href="/" class="text-gray-700 dark:text-neutral-dark hover:text-blue-600 transition-colors font-medium">Accueil</a>
            <a href="/design-system" class="text-gray-700 dark:text-neutral-dark hover:text-blue-600 transition-colors font-medium">Design System</a>
            <a href="/design-system/layouts" class="text-gray-700 dark:text-neutral-dark hover:text-blue-600 transition-colors font-medium">Layouts</a>
          </slot>

          <!-- Theme Selector -->
          <select
            v-model="selectedTheme"
            @change="handleThemeChange"
            class="px-3 py-1.5 text-sm border border-gray-300 dark:border-neutral-medium rounded-md bg-white dark:bg-neutral-medium text-gray-900 dark:text-neutral-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Choisir un thème"
          >
            <option
              v-for="theme in availableThemes"
              :key="theme.value"
              :value="theme.value"
            >
              {{ theme.label }}
            </option>
          </select>

          <!-- Dark Mode Toggle -->
          <ClientOnly>
            <button
              @click="toggleDark"
              class="p-2 text-gray-700 dark:text-neutral-dark hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-medium"
              :aria-label="isDark ? 'Activer le mode clair' : 'Activer le mode sombre'"
            >
              <!-- Sun Icon (Light Mode) -->
              <svg v-if="isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <!-- Moon Icon (Dark Mode) -->
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>
          </ClientOnly>
        </nav>

        <!-- Bouton Menu Mobile -->
        <button
          class="md:hidden p-2 text-gray-700 dark:text-neutral-dark hover:text-blue-600 transition-colors"
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
        <nav v-if="isMenuOpen" class="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-neutral-medium pt-4">
          <div class="flex flex-col gap-3">
            <a href="/" class="text-gray-700 dark:text-neutral-dark hover:text-blue-600 transition-colors font-medium py-2">Accueil</a>
            <a href="/design-system" class="text-gray-700 dark:text-neutral-dark hover:text-blue-600 transition-colors font-medium py-2">Design System</a>
            <a href="/design-system/layouts" class="text-gray-700 dark:text-neutral-dark hover:text-blue-600 transition-colors font-medium py-2">Layouts</a>

            <!-- Theme Selector Mobile -->
            <div class="py-2">
              <label class="text-sm font-medium text-gray-700 dark:text-neutral-dark mb-2 block">Thème:</label>
              <select
                v-model="selectedTheme"
                @change="handleThemeChange"
                class="w-full px-3 py-2 border border-gray-300 dark:border-neutral-medium rounded-md bg-white dark:bg-neutral-medium text-gray-900 dark:text-neutral-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option
                  v-for="theme in availableThemes"
                  :key="theme.value"
                  :value="theme.value"
                >
                  {{ theme.label }}
                </option>
              </select>
            </div>

            <!-- Dark Mode Toggle Mobile -->
            <button
              @click="toggleDark"
              class="flex items-center gap-3 text-gray-700 dark:text-neutral-dark hover:text-blue-600 transition-colors font-medium py-2"
            >
              <svg v-if="isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              <span>{{ isDark ? 'Mode Clair' : 'Mode Sombre' }}</span>
            </button>
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
 * @dev Phase 11: Dark mode toggle
 * @dev Phase 12: Theme selector dropdown
 */

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// Theme management (PRD v2.0 - Phase 1)
const { isDark, setColorMode, currentTheme, setTheme, availableThemes } = useThemeManager();

// Local state for select binding
const selectedTheme = ref(currentTheme.value);

// Note: initTheme() appelé automatiquement via plugin theme.client.ts
// Pas besoin de onMounted() ici

// Watch currentTheme changes
watch(currentTheme, (newTheme) => {
  selectedTheme.value = newTheme;
});

// Toggle dark mode
const toggleDark = () => {
  const newMode = isDark.value ? 'light' : 'dark';
  setColorMode(newMode);
};

// Handle theme change from select
const handleThemeChange = () => {
  setTheme(selectedTheme.value);
};
</script>
