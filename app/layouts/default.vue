<template>
  <!--
    Layout Default - Template standard avec Header et Footer

    Description : Layout principal utilisé par toutes les pages
    State Owner : Gère le thème (dark mode + theme custom) et menu mobile

    Slots :
      - NuxtPage : Contenu de la page active

    @dev Tailwind utilities pour structure flex
    @dev min-h-screen pour footer sticky en bas
    @dev flex-1 sur main pousse le footer vers le bas
  -->
  <div class="min-h-screen flex flex-col">
    <!-- Header sticky -->
    <SectionsHeader
      :is-dark="isDark"
      :is-menu-open="isMenuOpen"
      :current-theme="currentTheme"
      :available-themes="availableThemes"
      @toggle-menu="handleToggleMenu"
      @toggle-dark="handleToggleDark"
      @change-theme="handleChangeTheme"
    />

    <!-- Contenu principal -->
    <main class="flex-1">
      <NuxtPage />
    </main>

    <!-- Footer -->
    <SectionsFooter />
  </div>
</template>

<script setup lang="ts">
/**
 * DEFAULT LAYOUT
 *
 * @dev Layout standard pour la majorité des pages
 * @dev Header sticky en haut, footer collé en bas
 * @dev State Owner pour thème et menu mobile
 */
import type { ThemeName } from '~/composables/useThemeManager';

// Theme management (state owner)
const { isDark, setColorMode, currentTheme, setTheme, availableThemes } = useThemeManager();

// Mobile menu state
const isMenuOpen = ref(false);

// Event handlers
const handleToggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const handleToggleDark = () => {
  setColorMode(isDark.value ? 'light' : 'dark');
};

const handleChangeTheme = (theme: ThemeName) => {
  setTheme(theme);
};
</script>
