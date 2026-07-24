<template>
  <div class="page-prof-denise-rodriguez">

    <!-- ═══════════════════════════════════════════════════════════════════════
         HERO: switch 4 positions pour comparer les variantes
         (Référence / Fondu / Panneau net / Immersif)
    ═══════════════════════════════════════════════════════════════════════ -->
    <HeroSwitcher :hero-props="heroProps" />

    <!-- ═══════════════════════════════════════════════════════════════════════
         BENTO: variante éditoriale
    ═══════════════════════════════════════════════════════════════════════ -->
    <SectionsProfBentoEditorial :content="bentoContent" />

    <!-- ═══════════════════════════════════════════════════════════════════════
         INSTAGRAM: Stories & Reels
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
  Page Professeur Denise Rodriguez - Style moderne asymétrique

  Design: Typographie dramatique, bento grid, asymétrie
  Approche: Sections contrastées, bento layout, mise en avant visuelle forte
*/

import HeroSwitcher from '~/components/HeroSwitcher.vue';
const heroPhoto = '/images/professeur_denise.jpg';
const bentoPhoto = '/images/denise_profile_zoom.jpg';
const ambianceImage = '/images/ambianceSwave.jpg';
const ambianceImage2 = '/images/ambianceSwave2.jpg';
const progressionImage = '/images/progression1.jpg';
const simpliciteImage = '/images/simplicite3.jpg';

definePageMeta({
  layout: 'default'
});

useSeo({
  title: 'Denise Rodriguez — Professeur',
  description: 'Découvrez Denise Rodriguez, chorégraphe et pédagogue chez Swave Connection. Une approche artistique et créative de la bachata à Montréal.',
  path: '/denise-rodriguez',
  ogType: 'profile',
  jsonLd: seoSchemaPerson({
    name: 'Denise Rodriguez',
    description: 'Chorégraphe et pédagogue bachata chez Swave Connection. Approche artistique et créative de la danse latine.',
    path: '/denise-rodriguez',
    jobTitle: 'Professeur de bachata & Chorégraphe',
    specialties: ['Chorégraphie créative', 'Lady Styling avancé', 'Expression scénique', 'Danse contemporaine latine', 'Body movement', 'Performance & spectacle'],
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

/* Props partagées par les 3 variantes de hero (à comparer) */
const heroProps = {
  eyebrow: 'Professeur',
  firstName: 'Denise',
  lastName: 'Rodriguez',
  description:
    'Artiste, chorégraphe et pédagogue, Denise apporte à chaque cours une vision créative unique. Sa signature : transformer chaque élève en interprète.',
  tags: ['Chorégraphie', 'Lady Styling', 'Performance'],
  photo: heroPhoto,
};

const skills = [
  'Chorégraphie créative',
  'Lady Styling avancé',
  'Expression scénique',
  'Danse contemporaine latine',
  'Body movement',
  'Performance & spectacle',
];

/* Contenu du bento (partagé par les 2 variantes à comparer) */
const bentoContent = {
  title: 'Pourquoi Denise',
  subtitle:
    "Une approche artistique de la bachata, où technique et expression ne font qu'un.",
  parcoursLabel: 'Parcours',
  parcoursTitle: 'De la scène à la salle de cours',
  bio: [
    "Formée en danse contemporaine au Conservatoire de Madrid, Denise a découvert la bachata lors d'un voyage en République Dominicaine. Coup de foudre immédiat. Elle a fusionné ses deux mondes pour créer un style unique, entre grâce et sensualité.",
    "Après 5 ans sur scène dans des compagnies de danse latine, elle s'est tournée vers l'enseignement avec la conviction que chaque élève porte en lui un artiste.",
  ],
  stats: [
    { value: '8', label: "Années d'enseignement" },
    { value: '1500+', label: 'Élèves inspirés' },
  ],
  skills,
  images: [
    { src: bentoPhoto, alt: 'Denise Rodriguez — portrait' },
    { src: progressionImage, alt: 'Denise en cours' },
    { src: simpliciteImage, alt: 'Ambiance Swave' },
    { src: ambianceImage, alt: 'Sur scène' },
    { src: ambianceImage2, alt: 'Backstage' },
  ],
};

/* Stories Instagram (highlights) */
interface Story {
  label: string;
  image: string;
}

const stories: Story[] = [
  { label: 'Cours', image: heroPhoto },
  { label: 'Lady Style', image: bentoPhoto },
  { label: 'Backstage', image: ambianceImage },
  { label: 'Shows', image: ambianceImage2 },
  { label: 'Montréal', image: progressionImage },
  { label: 'Vibes', image: simpliciteImage },
];

/* Reels Instagram */
interface Reel {
  title: string;
  image: string;
  views: string;
  url: string;
}

const reels: Reel[] = [
  { title: 'Lady Style combo', image: heroPhoto, views: '12.4K', url: '#' },
  { title: 'Cours débutant', image: ambianceImage, views: '8.7K', url: '#' },
  { title: 'Chorégraphie show', image: progressionImage, views: '23.1K', url: '#' },
  // { title: 'Connexion partenaire', image: ambianceImage2, views: '15.6K', url: '#' },
  // { title: 'Backstage répétition', image: simpliciteImage, views: '6.2K', url: '#' },
  // { title: 'Sensual flow', image: bentoPhoto, views: '19.8K', url: '#' },
];

/* Props de la section Instagram (structure identique à la page Jordan) */
const instagramProps = {
  handle: '@denise.rodriguez',
  tagline: 'Chorégraphe & Pédagogue Bachata',
  profileImage: bentoPhoto,
  profileUrl: 'https://instagram.com/denise.rodriguez',
  stories,
  reels,
};

const handleNewsletterSubmit = (_payload: { email: string }) => {
  /* TODO: intégrer l'API newsletter */
};
</script>

<style scoped>
/**
 * PAGE PROF DENISE RODRIGUEZ - Moderne asymétrique
 *
 * Layout : asymétrique, bento grid, contrastes forts
 */

.page-prof-denise-rodriguez {
  /* Utilise les couleurs --primary du design system global */
}
</style>
