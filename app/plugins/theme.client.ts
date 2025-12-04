/**
 * PLUGIN theme.client.ts - PRD v2.0
 *
 * Initialise le thème custom au chargement de l'app
 *
 * @note Le mode light/dark est géré automatiquement par @nuxtjs/color-mode
 * @note Ce plugin gère UNIQUEMENT les thèmes custom (default, ocean, sunset)
 *
 * Phase 1 du PRD - Refonte Dark Mode
 */

export default defineNuxtPlugin(() => {
  const { initTheme } = useThemeManager();

  // Init thème custom (default, ocean, sunset)
  initTheme();
});
