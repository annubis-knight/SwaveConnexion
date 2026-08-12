/**
 * useSeo — Composable SEO centralisé
 *
 * Génère automatiquement à partir de données minimales :
 * - <title> + meta description
 * - Open Graph (Facebook, LinkedIn)
 * - Twitter Cards (summary_large_image)
 * - Canonical URL
 * - Robots
 * - JSON-LD Schema.org (LocalBusiness, Course, Person…)
 * - lang="fr" sur <html>
 *
 * Usage :
 *   useSeo({ title: 'Bachata Débutant', description: '…', path: '/bachata-debutant' })
 *
 * Les données JSON-LD sont injectées en <script type="application/ld+json">
 * et rendues statiquement par `nuxt generate`.
 */

/* ============================================================================
   TYPES
   ============================================================================ */

export interface SeoOptions {
  title: string;
  /* Titre <title> complet, verbatim (bypasse le template "{title} | Swave
     Connection"). Utile quand on veut la marque en premier, ex. sur la home. */
  fullTitle?: string;
  description: string;
  path?: string;
  ogType?: 'website' | 'article' | 'profile';
  /* Image OG/Twitter spécifique à la page (chemin racine ou URL absolue).
     Par défaut : visuel global SITE.image. */
  ogImage?: string;
  robots?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

/* Absolutise un chemin d'image (laisse une URL http intacte) */
const absUrl = (src: string) =>
  src.startsWith('http') ? src : `${SITE.url}${src}`;

/* ============================================================================
   CONSTANTES GLOBALES
   ============================================================================ */

const SITE = {
  name: 'Swave Connection',
  /* Domaine principal (canonical) = www : version déjà indexée par Google et
     pour laquelle il a déjà le favicon. Prévoir une redirection apex → www. */
  url: 'https://www.swaveconnection.com',
  locale: 'fr_CA',
  image: '/og_visual.jpg',
  twitter: '@swaveconnection',
} as const;

/* ============================================================================
   COMPOSABLE
   ============================================================================ */

export const useSeo = (options: SeoOptions) => {
  const fullTitle = options.fullTitle ?? `${options.title} | ${SITE.name}`;
  const canonical = `${SITE.url}${options.path || '/'}`;
  const ogImage = options.ogImage ? absUrl(options.ogImage) : `${SITE.url}${SITE.image}`;

  /* --- Head: lang + canonical --- */
  useHead({
    htmlAttrs: { lang: 'fr' },
    link: [{ rel: 'canonical', href: canonical }],
    ...(options.jsonLd
      ? {
          script: [
            {
              type: 'application/ld+json',
              innerHTML: JSON.stringify(
                Array.isArray(options.jsonLd) ? options.jsonLd : options.jsonLd
              ),
            },
          ],
        }
      : {}),
  });

  /* --- SEO Meta: OG + Twitter + robots --- */
  useSeoMeta({
    title: fullTitle,
    description: options.description,
    ogTitle: fullTitle,
    ogDescription: options.description,
    ogImage,
    ogUrl: canonical,
    ogType: options.ogType || 'website',
    ogLocale: SITE.locale,
    ogSiteName: SITE.name,
    twitterCard: 'summary_large_image',
    twitterTitle: fullTitle,
    twitterDescription: options.description,
    twitterImage: ogImage,
    robots: options.robots || 'index, follow',
  });
};

/* ============================================================================
   HELPERS JSON-LD — Schémas réutilisables
   ============================================================================ */

/**
 * Schema LocalBusiness pour la page d'accueil
 */
export const seoSchemaLocalBusiness = (): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE.url}/#business`,
  name: SITE.name,
  description:
    'École de bachata à Montréal. Cours collectifs, privés, lady styling, sensual et team chorégraphie.',
  url: SITE.url,
  image: `${SITE.url}${SITE.image}`,
  telephone: '+15794210132',
  email: 'contact@swaveconnection.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '9 Rue Sainte-Catherine Est, 2e étage',
    addressLocality: 'Montréal',
    addressRegion: 'QC',
    postalCode: 'H2X 1K3',
    addressCountry: 'CA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 45.5017,
    longitude: -73.5673,
  },
  /* Zones desservies : Montréal (Denise) + Sherbrooke (Jordan) */
  areaServed: [
    { '@type': 'City', name: 'Montréal' },
    { '@type': 'City', name: 'Sherbrooke' },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Sunday'],
      opens: '12:00',
      closes: '22:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Friday', 'Saturday'],
      opens: '10:00',
      closes: '22:00',
    },
  ],
  sameAs: [
    'https://instagram.com/swaveconnection',
  ],
});

/**
 * Schema Course pour les pages de cours
 */
export const seoSchemaCourse = (course: {
  name: string;
  description: string;
  path: string;
}): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: course.name,
  description: course.description,
  url: `${SITE.url}${course.path}`,
  provider: {
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
  },
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'onsite',
    courseWorkload: 'PT1H',
    inLanguage: 'fr',
    location: {
      '@type': 'Place',
      name: SITE.name,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Montréal',
        addressRegion: 'QC',
        addressCountry: 'CA',
      },
    },
  },
});

/**
 * Schema Person pour les pages de professeur
 */
export const seoSchemaPerson = (person: {
  name: string;
  description: string;
  path: string;
  jobTitle?: string;
  specialties?: string[];
  image?: string;
  sameAs?: string[];
}): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: person.name,
  description: person.description,
  url: `${SITE.url}${person.path}`,
  jobTitle: person.jobTitle || 'Professeur de bachata',
  ...(person.image ? { image: absUrl(person.image) } : {}),
  ...(person.sameAs?.length ? { sameAs: person.sameAs } : {}),
  worksFor: {
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
  },
  knowsAbout: person.specialties || [],
});

/**
 * Schema ItemList pour la page listant les professeurs (/professeurs)
 */
export const seoSchemaTeacherList = (): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      url: `${SITE.url}/denise-rodriguez`,
      name: 'Denise Rodriguez',
    },
    {
      '@type': 'ListItem',
      position: 2,
      url: `${SITE.url}/jordan-gallon`,
      name: 'Jordan Gallon',
    },
  ],
});
