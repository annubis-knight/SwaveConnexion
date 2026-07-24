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

  ⚠️ Contenu à personnaliser : les valeurs marquées `TODO` (accroche, parcours,
  chiffres, handle/reels Instagram) sont des placeholders en attendant les vraies infos.
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
  title: 'Jordan Gallon — Professeur',
  description: 'Découvrez Jordan Gallon, professeur de bachata chez Swave Connection à Sherbrooke. Une ambiance conviviale et énergique pour progresser en dansant.',
  path: '/jordan-gallon',
  ogType: 'profile',
  jsonLd: seoSchemaPerson({
    name: 'Jordan Gallon',
    description: 'Professeur de bachata chez Swave Connection à Sherbrooke. Une approche conviviale et énergique de la danse latine.',
    path: '/jordan-gallon',
    jobTitle: 'Professeur de bachata',
    specialties: skills,
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
  eyebrow: 'Professeur — Sherbrooke',
  firstName: 'Jordan',
  lastName: 'Gallon',
  description:
    "À Sherbrooke, Jordan fait de chaque cours un moment de plaisir. Énergie, convivialité et technique précise : sa signature, c'est te faire progresser vite sans jamais te prendre la tête.",
  tags: ['Ambiance', 'Musicalité', 'Guidage'],
  photo: heroPhoto,
};

/* Contenu du bento (partagé par les 3 variantes à comparer) */
const bentoContent = {
  title: 'Pourquoi Jordan',
  subtitle: "Une bachata accessible et vivante, où l'on apprend en s'amusant.",
  parcoursLabel: 'Parcours',
  parcoursTitle: 'La danse comme terrain de jeu',
  /* TODO: remplacer par le vrai parcours de Jordan */
  bio: [
    "Tombé dans la danse latine par passion, Jordan a rapidement voulu transmettre ce qui l'anime : le plaisir du mouvement partagé. Voyageur curieux, il puise son inspiration autant sur les pistes de danse que dans les grands espaces canadiens.",
    'À Sherbrooke, il a construit une communauté soudée où chacun trouve sa place, du grand débutant au danseur confirmé.',
  ],
  /* TODO: remplacer par les vrais chiffres de Jordan */
  stats: [
    { value: '5', label: "Années d'enseignement" },
    { value: '300+', label: 'Élèves accompagnés' },
  ],
  skills,
  images: [
    { src: bwPhoto, alt: 'Jordan Gallon — portrait studio' },
    { src: studioPhoto, alt: 'Jordan en studio' },
    { src: bombersPhoto, alt: 'Jordan — séance photo' },
    { src: canadaPhoto, alt: 'Lac Louise, Canada' },
    { src: cancunPhoto, alt: 'Tulum, Mexique' },
    { src: randoPhoto, alt: 'Rando au Québec' },
  ],
};

/* Section Instagram (structure identique à la page Denise) */
/* TODO: renseigner le vrai handle, l'URL et les vrais reels de Jordan */
const instagramProps = {
  handle: '@jordan.gallon',
  tagline: 'Professeur de bachata · Sherbrooke',
  profileImage: heroPhoto,
  profileUrl: 'https://instagram.com/',
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
