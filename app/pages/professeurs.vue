<template>
  <div class="page-professeurs">
    <!-- Split immersif plein écran (hover-expand) -->
    <SectionsTeachersImmersive
      title="Nos professeurs"
      subtitle="Deux professeurs, deux villes, une même passion."
      :teachers="teachers"
    />

    <SectionsSectionCTA @submit="handleNewsletterSubmit" />
  </div>
</template>

<script setup lang="ts">
/*
  Page Professeurs — présentation de l'équipe (Denise / Jordan)

  Deux professeurs : Denise (Montréal) et Jordan (Sherbrooke & Montréal),
  chacun renvoyant vers sa page dédiée via le split immersif.
*/

const denisePhoto = '/images/professeur_denise.jpg';
const jordanPhoto = '/images/professeur_jordan.png';

/* Forme d'un professeur (structurellement compatible avec la prop de SectionsTeachersImmersive) */
interface Teacher {
  name: string;
  city: string;
  role: string;
  description: string;
  image?: string;
  to?: string;
}

definePageMeta({
  layout: 'default',
});

useSeo({
  title: 'Nos professeurs de Bachata, Montréal & Sherbrooke',
  description:
    'Rencontrez les professeurs de Swave Connection : Denise à Montréal et Jordan à Sherbrooke. Cours de bachata fun et sensuel au Québec.',
  path: '/professeurs',
  jsonLd: seoSchemaTeacherList(),
});

/* Navbar : pas de hero sur cette page → affiche le CTA de réservation */
const { setHeroVisible } = useHeroVisibility();
onMounted(() => setHeroVisible(false));

const teachers: Teacher[] = [
  {
    name: 'Denise',
    city: 'Montréal',
    role: 'Professeure & Chorégraphe',
    description:
      "Denise accompagne les danseurs avec une approche axée sur la technique, la connexion et l'expression. Cours privés, initiations, Lady Styling en ligne et projets Swave.",
    image: denisePhoto,
    to: '/denise-rodriguez',
  },
  {
    name: 'Jordan',
    city: 'Sherbrooke',
    role: 'Professeur',
    description:
      "Jordan partage sa passion à travers les cours privés, les événements et les projets Swave. Son approche met l'accent sur la musicalité, la connexion et le plaisir de danser. Chaque mois, il anime aussi des ateliers à Montréal.",
    image: jordanPhoto,
    to: '/jordan-gallon',
  },
];

const handleNewsletterSubmit = (_payload: { email: string }) => {
  /* TODO: intégrer l'API newsletter */
};
</script>
