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
  title: 'Denise Rodriguez, Professeure de Bachata à Montréal',
  description:
    'Professeure de bachata à Montréal chez Swave Connection. 12 ans d\'expérience, formée en Bachata Sensual auprès de Korke & Judith. Chorégraphie & lady styling.',
  path: '/denise-rodriguez',
  ogType: 'profile',
  ogImage: '/images/professeur_denise.jpg',
  jsonLd: seoSchemaPerson({
    name: 'Denise Rodriguez',
    description:
      'Professeure de bachata et chorégraphe chez Swave Connection à Montréal. 12 ans d\'expérience (Toulouse), formée en Bachata Sensual auprès de Korke & Judith, les créateurs du style.',
    path: '/denise-rodriguez',
    jobTitle: 'Professeure de bachata & Chorégraphe',
    specialties: ['Chorégraphie créative', 'Lady Styling avancé', 'Expression scénique', 'Danse contemporaine latine', 'Body movement', 'Performance & spectacle'],
    image: '/images/professeur_denise.jpg',
    sameAs: ['https://instagram.com/denise_rdrgz'],
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
  parcoursTitle: 'De Toulouse à Montréal',
  bio: [
    "Denise a grandi dans la danse : 12 ans à Toulouse comme danseuse puis professeure, avant de poser ses valises à Montréal il y a 4 ans. C'est avec Jordan, rencontré par la danse une dizaine d'années plus tôt, qu'elle y fait vivre Swave Connection.",
    "Elle s'est formée en Bachata Sensual directement auprès de Korke & Judith, les créateurs du style. De cet héritage elle a fait sa signature : une bachata artistique où technique, musicalité et expression scénique ne font qu'un.",
  ],
  stats: [
    { value: '12', label: "Ans d'expérience" },
    { value: '4', label: 'Ans à Montréal' },
  ],
  skills,
  images: [
    { src: bentoPhoto, alt: 'Denise Rodriguez, portrait' },
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
  handle: '@denise_rdrgz',
  tagline: 'Chorégraphe & Pédagogue Bachata',
  profileImage: bentoPhoto,
  profileUrl: 'https://instagram.com/denise_rdrgz',
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
