import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    '@nuxtjs/sitemap',
  ],

  /*
   * Site config (nuxt-site-config) — source unique du domaine canonique.
   * Domaine principal = www (cf. useSeo.ts). Utilise par @nuxtjs/sitemap
   * pour generer des URL absolues https://www.swaveconnection.com/*.
   */
  site: {
    url: 'https://www.swaveconnection.com',
    name: 'Swave Connection',
  },

  /*
   * Sitemap : genere /sitemap.xml au build (nuxt generate).
   * Les routes sont auto-decouvertes depuis les pages prerendered.
   */
  sitemap: {
    /* Pages techniques Nuxt exclues du sitemap */
    exclude: ['/200.html', '/404.html'],
  },

  /*
   * @nuxt/image
   * Optimisation images : WebP + srcset responsive generes au build
   * (nuxt generate -> images statiques ecrites dans .output/public, pas de
   * serveur requis, compatible Firebase Hosting statique).
   * Les images sources vivent dans public/images/ et sont referencees par /images/*.
   */
  image: {
    quality: 70,
    format: ['webp'],
    /* Largeurs generees pour les srcset (alignees sur nos breakpoints) */
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },

  /* Generation statique pour Firebase Hosting */
  nitro: {
    preset: 'static',
    prerender: {
      /* Ignore les 404 des pages pas encore creees (contact, cgu, etc.) */
      failOnError: false,
    },
  },

  // Preload polices critiques + CSS anti-FOUC
  app: {
    head: {
      meta: [
        // Verification Google Search Console (permet de demander des indexations)
        {
          name: 'google-site-verification',
          content: 'QMlqxgENpfrGcFMticG4eSLEPjBGWWv2gldY7zL8Gls',
        },
      ],
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
        // Favicons (genere via favicon.io)
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        // Icone >= 48x48 requise par Google Search (downscale mais n'upscale pas)
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '192x192',
          href: '/android-chrome-192x192.png',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'manifest',
          href: '/site.webmanifest',
        },
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
