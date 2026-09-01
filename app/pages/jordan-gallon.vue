<template>
  <div class="page-prof-jordan">

    <!-- ═══════════════════════════════════════════════════════════════════════
         HERO: switch 4 positions pour comparer les variantes
         (Référence / Fondu / Panneau net / Immersif)
    ═══════════════════════════════════════════════════════════════════════ -->
    <HeroSwitcher :hero-props="heroProps" />

    <!-- ═══════════════════════════════════════════════════════════════════════
         BENTO: variante éditoriale (images de Jordan intégrées)
    ═══════════════════════════════════════════════════════════════════════ -->
    <SectionsProfBentoEditorial :content="bentoContent" />

    <!-- ═══════════════════════════════════════════════════════════════════════
         INSTAGRAM: Stories & Reels (structure identique à la page Denise)
    ═══════════════════════════════════════════════════════════════════════ -->
    <SectionsProfInstagram v-bind="instagramProps" />

    <!-- ═══════════════════════════════════════════════════════════════════════
         CTA: Newsletter (réutilisation landing)
    ═══════════════════════════════════════════════════════════════════════ -->
    <SectionsSectionCTA @submit="handleNewsletterSubmit" />

  </div>
</template>

<script setup lang="ts">
/*
  Page Professeur Jordan Gallon — Style moderne asymétrique

  Structure identique à la page Denise Rodriguez :
    Hero → Bento → Instagram → CTA

  Bio et chiffres = vrais (12 ans, Toulouse/Montauban, Québec depuis 4 ans).
  ⚠️ Reste en placeholder : le handle/URL Instagram et les reels (en attente des vrais).
*/

import HeroSwitcher from '~/components/HeroSwitcher.vue';
const heroPhoto = '/images/professeur_jordan.png';
const studioPhoto = '/images/jordan_studio.png';
const bombersPhoto = '/images/jordan_bombers.png';
const bwPhoto = '/images/jordan_bw.png';
const canadaPhoto = '/images/jordan_canada.jpg';
const cancunPhoto = '/images/jordan_cancun.jpg';
const randoPhoto = '/images/jordan_rando.jpg';

definePageMeta({
  layout: 'default'
});

/* TODO: ajuster selon les vraies spécialités de Jordan */
const skills = [
  'Bachata dominicaine',
  'Musicalité',
  'Cours débutants',
  'Technique de guidage',
  'Social dancing',
  'Ambiance & convivialité',
];

useSeo({
  title: 'Jordan Gallon, Prof de Bachata à Sherbrooke et Montréal',
  description:
    'Professeur de bachata à Sherbrooke et Montréal chez Swave Connection. 12 ans d\'expérience, une ambiance conviviale et énergique pour progresser en dansant.',
  path: '/jordan-gallon',
  ogType: 'profile',
  ogImage: '/images/professeur_jordan.png',
  jsonLd: seoSchemaPerson({
    name: 'Jordan Gallon',
    description:
      'Professeur de bachata chez Swave Connection à Sherbrooke et Montréal. 12 ans d\'expérience (Toulouse, Montauban), approche conviviale et énergique de la danse latine.',
    path: '/jordan-gallon',
    jobTitle: 'Professeur de bachata',
    specialties: skills,
    image: '/images/professeur_jordan.png',
    sameAs: ['https://www.instagram.com/jordan.gln'],
  }),
});

/* Composable pour signaler la visibilité du Hero à la Navbar */
const { setHeroVisible } = useHeroVisibility();

let heroObserver: IntersectionObserver | null = null;

onMounted(() => {
  const heroSection = document.querySelector('.hero-switcher');
  if (!heroSection) return;

  setHeroVisible(true);

  heroObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        setHeroVisible(entry.isIntersecting);
      });
    },
    { threshold: 0, rootMargin: '-80px 0px 0px 0px' }
  );

  heroObserver.observe(heroSection);
});

onUnmounted(() => {
  heroObserver?.disconnect();
});

/* Props partagées par les 4 variantes de hero (à comparer) */
const heroProps = {
  eyebrow: 'Professeur, Sherbrooke & Montréal',
  firstName: 'Jordan',
  lastName: 'Gallon',
  description:
    "À Sherbrooke comme à Montréal, Jordan fait de chaque cours un moment de plaisir. Énergie, convivialité et technique précise : sa signature, c'est te faire progresser vite sans jamais te prendre la tête.",
  tags: ['Ambiance', 'Musicalité', 'Guidage'],
  photo: heroPhoto,
};

/* Contenu du bento (partagé par les 3 variantes à comparer) */
const bentoContent = {
  title: 'Pourquoi Jordan',
  subtitle: "Une bachata accessible et vivante, où l'on apprend en s'amusant.",
  parcoursLabel: 'Parcours',
  parcoursTitle: 'De Montauban à Sherbrooke',
  bio: [
    "Jordan danse et enseigne depuis 12 ans. Formé à Toulouse, il a animé ses propres cours pendant 5 ans à Montauban. C'est d'ailleurs la danse qui l'a réuni avec Denise, il y a une dizaine d'années. Arrivés au Québec il y a 4 ans, ils portent Swave Connection ensemble.",
    "À Sherbrooke comme à Montréal, Jordan cultive une bachata accessible et vivante, où l'on progresse vite dans une ambiance conviviale, du grand débutant au danseur confirmé.",
  ],
  stats: [
    { value: '12', label: "Ans d'expérience" },
    { value: '4', label: 'Ans au Québec' },
  ],
  skills,
  images: [
    { src: bwPhoto, alt: 'Jordan Gallon, portrait studio' },
    { src: studioPhoto, alt: 'Jordan en studio' },
    { src: bombersPhoto, alt: 'Jordan, séance photo' },
    { src: canadaPhoto, alt: 'Lac Louise, Canada' },
    { src: cancunPhoto, alt: 'Tulum, Mexique' },
    { src: randoPhoto, alt: 'Rando au Québec' },
  ],
};

/* Section Instagram (structure identique à la page Denise) */
/* TODO: renseigner les vrais reels de Jordan (handle + URL OK) */
const instagramProps = {
  handle: '@jordan.gln',
  tagline: 'Professeur de bachata · Sherbrooke & Montréal',
  profileImage: heroPhoto,
  profileUrl: 'https://www.instagram.com/jordan.gln',
  stories: [
    { label: 'Cours', image: studioPhoto },
    { label: 'Studio', image: bombersPhoto },
    { label: 'Canada', image: canadaPhoto },
    { label: 'Tulum', image: cancunPhoto },
    { label: 'Nature', image: randoPhoto },
    { label: 'Vibes', image: bwPhoto },
  ],
  reels: [
    { title: 'Bachata sociale', image: bwPhoto, views: '4.2K', url: '#' },
    { title: 'Cours débutant', image: studioPhoto, views: '3.1K', url: '#' },
    { title: 'Ambiance soirée', image: bombersPhoto, views: '6.8K', url: '#' },
  ],
};

const handleNewsletterSubmit = (_payload: { email: string }) => {
  /* TODO: intégrer l'API newsletter */
};
</script>

<style scoped>
/**
 * PAGE PROF JORDAN GALLON
 * Structure : Hero → Bento → Instagram → CTA (miroir de la page Denise)
 * Le style des sections vit dans leurs composants respectifs.
 */

.page-prof-jordan {
  /* Utilise les couleurs --primary du design system global */
}
</style>
