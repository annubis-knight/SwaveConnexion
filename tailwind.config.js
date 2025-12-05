/**
 * TAILWIND CONFIG - Configuration MINIMALE
 *
 * Description : Config Tailwind réduite au strict minimum
 * Philosophie : Les variables sont dans _variables.css et _typography.css
 *
 * @dev Ne définir ICI que ce qui est IMPOSSIBLE en CSS natif
 * @dev Tailwind sert uniquement pour les layouts (flex, grid, responsive)
 * @dev Les couleurs/typo sont dans les fichiers CSS natifs
 *
 * Input : Chemins des fichiers à scanner
 * Output : Classes utilitaires Tailwind générées
 */

/** @type {import('tailwindcss').Config} */
export default {
  /**
   * Content paths
   * @dev Fichiers à scanner pour générer les classes Tailwind
   */
  content: [
    './app/components/**/*.{js,vue,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/app.vue',
  ],

  /**
   * Theme
   * @dev MINIMAL : on ne redéfinit PAS les couleurs/typo ici
   * @dev Elles sont dans _variables.css et _typography.css
   * @dev Note: safelist n'existe plus en Tailwind v4 (migration vers @theme)
   * @dev Les classes grid dynamiques utilisent un mapping statique dans Grid.vue
   */
  theme: {
    extend: {
      // Vide volontairement - tout est dans les CSS natifs
    },
  },

  /**
   * Plugins
   * @dev Aucun plugin pour l'instant (minimalisme)
   */
  plugins: [],
};
