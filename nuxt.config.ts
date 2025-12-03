import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
  ],
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
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
