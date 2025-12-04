/**
 * COMPOSABLE useTheme (REFACTORISÉ AVEC @nuxtjs/color-mode)
 *
 * Gère le dark mode (via @nuxtjs/color-mode) et les thèmes configurables
 *
 * Features:
 * - Dark mode toggle avec @nuxtjs/color-mode (résout FOUC + SSR + MediaQuery)
 * - 3 thèmes custom: default, ocean, sunset
 * - Persistence localStorage automatique
 * - Classes appliquées sur <html>
 *
 * @dev Phase 11: Dark Mode (refactorisé Phase 13)
 * @dev Phase 12: Thèmes configurables
 * @dev Phase 13: Migration vers @nuxtjs/color-mode
 */

export type ThemeName = 'default' | 'ocean' | 'sunset';

// Clé localStorage pour thème custom (color-mode gère son propre storage)
const STORAGE_KEY_THEME = 'swave-theme';

export const useTheme = () => {
  // Utiliser @nuxtjs/color-mode pour gérer dark/light
  const colorMode = useColorMode();

  // State pour thème custom (default, ocean, sunset)
  const currentTheme = useState<ThemeName>('currentTheme', () => 'default');

  /**
   * Initialise le thème custom depuis localStorage
   * Note: color-mode gère automatiquement dark/light, pas besoin d'init
   */
  const initTheme = () => {
    if (process.client) {
      const savedTheme = localStorage.getItem(STORAGE_KEY_THEME) as ThemeName | null;

      if (savedTheme) {
        currentTheme.value = savedTheme;
      }

      // Appliquer le thème custom
      applyCustomTheme();
    }
  };

  /**
   * Applique le thème custom sur <html>
   * Note: @nuxtjs/color-mode gère automatiquement la classe "dark"
   */
  const applyCustomTheme = () => {
    if (process.client) {
      const html = document.documentElement;
      html.setAttribute('data-theme', currentTheme.value);
    }
  };

  /**
   * Toggle dark mode (délégué à @nuxtjs/color-mode)
   */
  const toggleDarkMode = () => {
    colorMode.preference = colorMode.preference === 'light' ? 'dark' : 'light';
  };

  /**
   * Set un thème custom spécifique
   */
  const setTheme = (theme: ThemeName) => {
    currentTheme.value = theme;

    if (process.client) {
      localStorage.setItem(STORAGE_KEY_THEME, theme);
      applyCustomTheme();
    }
  };

  /**
   * Get le mode actuel (computed)
   */
  const isDark = computed(() => colorMode.value === 'dark');

  /**
   * Liste des thèmes custom disponibles
   */
  const availableThemes: { value: ThemeName; label: string; description: string }[] = [
    {
      value: 'default',
      label: 'Default',
      description: 'Thème par défaut (Blue)',
    },
    {
      value: 'ocean',
      label: 'Ocean',
      description: 'Thème bleu océan',
    },
    {
      value: 'sunset',
      label: 'Sunset',
      description: 'Thème orange sunset',
    },
  ];

  return {
    // State (readonly pour éviter mutations directes)
    colorMode: readonly(computed(() => colorMode.value)),
    currentTheme: readonly(currentTheme),
    isDark,

    // Methods
    initTheme,
    toggleDarkMode,
    setTheme,

    // Data
    availableThemes,
  };
};
