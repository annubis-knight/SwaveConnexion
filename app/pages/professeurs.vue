<template>
  <div class="page-professeurs">
    <!-- Split immersif plein écran (hover-expand) -->
    <SectionsTeachersImmersive
      title="Nos professeurs"
      subtitle="Deux professeurs, deux villes. Retrouve Swave Connection à Montréal et à Sherbrooke."
      :teachers="teachers"
    />

    <SectionsSectionCTA @submit="handleNewsletterSubmit" />
  </div>
</template>

<script setup lang="ts">
/*
  Page Professeurs — présentation de l'équipe (Denise / Jordan)

  Deux professeurs : Denise (Montréal) et Jordan (Sherbrooke),
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
  title: 'Nos professeurs de Bachata — Montréal & Sherbrooke',
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
      "Fondatrice de Swave Connection, Denise enseigne la bachata avec une approche artistique et sensuelle. Elle t'accompagne du premier pas à la scène.",
    image: denisePhoto,
    to: '/denise-rodriguez',
  },
  {
    name: 'Jordan',
    city: 'Sherbrooke',
    role: 'Professeur',
    description:
      "Jordan porte la vibe Swave à Sherbrooke. Dans une ambiance conviviale et énergique, il te guide pour progresser et prendre du plaisir à chaque cours.",
    image: jordanPhoto,
    to: '/jordan-gallon',
  },
];

const handleNewsletterSubmit = (_payload: { email: string }) => {
  /* TODO: intégrer l'API newsletter */
};
</script>
