import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
  ],

  // Preload polices critiques + CSS anti-FOUC
  app: {
    head: {
      style: [
        // CSS critique inline pour éviter FOUC
        // Cache le contenu jusqu'au chargement complet du CSS
        {
          innerHTML: `
            html:not(.css-loaded) body { opacity: 0; }
            html.css-loaded body { opacity: 1; transition: opacity 0.1s ease-in; }
          `,
        },
      ],
      link: [
        // Preload Unbounded Bold (titres display) - police la plus visible au chargement
        {
          rel: 'preload',
          href: '/fonts/unbounded/Unbounded-Bold.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous',
        },
        // Preload Unbounded SemiBold (titres h1-h6)
        {
          rel: 'preload',
          href: '/fonts/unbounded/Unbounded-SemiBold.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous',
        },
      ],
      // Script inline pour détecter le chargement CSS
      script: [
        {
          innerHTML: `
            (function() {
              // Attend que les styles soient chargés
              if (document.readyState === 'complete') {
                document.documentElement.classList.add('css-loaded');
              } else {
                window.addEventListener('load', function() {
                  document.documentElement.classList.add('css-loaded');
                });
              }
            })();
          `,
          type: 'text/javascript',
        },
      ],
    },
  },

  // Configuration color-mode
  colorMode: {
    preference: 'light', // Préférence par défaut (system, light, dark)
    fallback: 'light', // Si system échoue
    classSuffix: '', // Classe CSS ajoutée (dark au lieu de dark-mode)
    storageKey: 'propulsite-color-mode', // Clé localStorage
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
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
