import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
  ],

  // Configuration color-mode
  colorMode: {
    preference: 'system', // Préférence par défaut (system, light, dark)
    fallback: 'light', // Si system échoue
    classSuffix: '', // Classe CSS ajoutée (dark au lieu de dark-mode)
    storageKey: 'swave-color-mode', // Clé localStorage
  },
  css: ['~/assets/css/main.css'],

  // Configuration auto-import des composants
  components: [
    {
      path: '~/components/ui',
      pathPrefix: false, // Pas de préfixe "ui" (Button au lieu de UiButton)
    },
    {
      path: '~/components/layout',
      prefix: 'Layout', // Préfixe "Layout" (LayoutHeader, LayoutFooter)
    },
    {
      path: '~/components/sections',
      prefix: 'Sections', // Préfixe "Sections" (SectionsHero)
    },
    {
      path: '~/components/showcase',
      prefix: 'Showcase', // Préfixe "Showcase" (ShowcaseLayoutDemo, ShowcaseLayout, etc.)
    },
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
