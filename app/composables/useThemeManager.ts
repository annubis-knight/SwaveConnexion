/**
 * COMPOSABLE useThemeManager - PRD v2.0
 *
 * Gère le mode (light/dark) via @nuxtjs/color-mode
 * Gère les thèmes custom (default, ocean, sunset)
 *
 * @architecture SSOT (Single Source of Truth)
 * @module @nuxtjs/color-mode pour light/dark
 *
 * Phase 1 du PRD - Refonte Dark Mode
 */

export type ThemeName = 'default' | 'ocean' | 'sunset';
export type ColorModeValue = 'light' | 'dark' | 'system';

export const useThemeManager = () => {
  // @nuxtjs/color-mode gère automatiquement light/dark
  const colorMode = useColorMode();

  // State pour thème custom (default, ocean, sunset)
  const currentTheme = useState<ThemeName>('theme', () => 'default');

  /**
   * Change le mode light/dark
   * @param mode 'light' | 'dark' | 'system'
   */
  const setColorMode = (mode: ColorModeValue) => {
    colorMode.preference = mode;
  };

  /**
   * Change le thème de couleurs
   * @param theme 'default' | 'ocean' | 'sunset'
   */
  const setTheme = (theme: ThemeName) => {
    currentTheme.value = theme;
    if (process.client) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('propulsite-theme', theme);
    }
  };

  /**
   * Init thème au chargement (appelé via plugin)
   */
  const initTheme = () => {
    if (process.client) {
      const savedTheme = localStorage.getItem('propulsite-theme') as ThemeName | null;
      if (savedTheme && ['default', 'ocean', 'sunset'].includes(savedTheme)) {
        setTheme(savedTheme);
      } else {
        // Thème par défaut
        setTheme('default');
      }
    }
  };

  /**
   * Liste des thèmes disponibles
   */
  const availableThemes = [
    {
      value: 'default' as ThemeName,
      label: 'Default',
      description: 'Thème par défaut (Blue)',
    },
    {
      value: 'ocean' as ThemeName,
      label: 'Ocean',
      description: 'Thème bleu océan',
    },
    {
      value: 'sunset' as ThemeName,
      label: 'Sunset',
      description: 'Thème orange sunset',
    },
  ];

  return {
    // State (readonly)
    colorMode: readonly(computed(() => colorMode.value)),
    currentTheme: readonly(currentTheme),

    // Computed
    isDark: computed(() => colorMode.value === 'dark'),

    // Methods
    setColorMode,
    setTheme,
    initTheme,

    // Data
    availableThemes,
  };
};
