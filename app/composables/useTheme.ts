/**
 * COMPOSABLE useTheme
 *
 * Gère le dark mode et les thèmes configurables
 *
 * Features:
 * - Dark mode toggle avec persistence localStorage
 * - 3 thèmes: default, ocean, sunset
 * - Sync avec prefers-color-scheme
 * - Classes appliquées sur <html>
 *
 * @dev Phase 11: Dark Mode
 * @dev Phase 12: Thèmes configurables
 */

export type ThemeName = 'default' | 'ocean' | 'sunset';
export type ColorMode = 'light' | 'dark';

interface ThemeState {
  mode: ColorMode;
  theme: ThemeName;
}

// Clés localStorage
const STORAGE_KEY_MODE = 'swave-color-mode';
const STORAGE_KEY_THEME = 'swave-theme';

export const useTheme = () => {
  // State réactif
  const colorMode = useState<ColorMode>('colorMode', () => 'light');
  const currentTheme = useState<ThemeName>('currentTheme', () => 'default');

  /**
   * Initialise le thème depuis localStorage ou system preference
   */
  const initTheme = () => {
    if (process.client) {
      // Récupérer le mode depuis localStorage ou system
      const savedMode = localStorage.getItem(STORAGE_KEY_MODE) as ColorMode | null;
      const savedTheme = localStorage.getItem(STORAGE_KEY_THEME) as ThemeName | null;

      if (savedMode) {
        colorMode.value = savedMode;
      } else {
        // Détecter la préférence système
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        colorMode.value = prefersDark ? 'dark' : 'light';
      }

      if (savedTheme) {
        currentTheme.value = savedTheme;
      }

      // Appliquer les classes
      applyTheme();
    }
  };

  /**
   * Applique les classes sur <html>
   */
  const applyTheme = () => {
    if (process.client) {
      const html = document.documentElement;

      // Appliquer le mode (dark/light)
      if (colorMode.value === 'dark') {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }

      // Appliquer le thème
      html.setAttribute('data-theme', currentTheme.value);
    }
  };

  /**
   * Toggle dark mode
   */
  const toggleDarkMode = () => {
    colorMode.value = colorMode.value === 'light' ? 'dark' : 'light';

    if (process.client) {
      localStorage.setItem(STORAGE_KEY_MODE, colorMode.value);
      applyTheme();
    }
  };

  /**
   * Set un thème spécifique
   */
  const setTheme = (theme: ThemeName) => {
    currentTheme.value = theme;

    if (process.client) {
      localStorage.setItem(STORAGE_KEY_THEME, theme);
      applyTheme();
    }
  };

  /**
   * Get le mode actuel (computed)
   */
  const isDark = computed(() => colorMode.value === 'dark');

  /**
   * Liste des thèmes disponibles
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
    // State
    colorMode: readonly(colorMode),
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
