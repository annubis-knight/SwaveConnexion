<template>
  <div class="page-lady-style">
    <SectionsPageHero
      title="LADY STYLING"
      subtitle="Développe ta féminité et ton expression personnelle en danse. Apprends les techniques de bras, les isolations, les tours et le body movement pour briller sur la piste."
      tag="Cours spécialisé"
      :image="heroImage"
      image-alt="Danseuse de bachata lady style"
      bg-color="primary"
      cta-text="RÉSERVER CE COURS"
      @cta-click="handleReservation"
    />

    <!-- ═══════════════════════════════════════════════════════════════════════
         BENEFITS: ALTERNATE - Cards en zigzag gauche/droite
         Design éditorial magazine, grands numéros, stats highlight
    ═══════════════════════════════════════════════════════════════════════ -->
    <SectionsPageBenefitsAlternate
      title-line1="RÉVÈLE LA "
      title-line2="DANSEUSE EN TOI"
      :benefits="benefitsData"
    />

    <!-- ═══════════════════════════════════════════════════════════════════════
                              SECTION AGENDA
    ═══════════════════════════════════════════════════════════════════════ -->
    <!-- <SectionsLandingAgenda /> -->

    <!-- ═══════════════════════════════════════════════════════════════════════
         VIDEO: DYNAMIC - Énergique avec animations
         Cercles animés, cartes flottantes, stats avec icônes, gradient title
    ═══════════════════════════════════════════════════════════════════════ -->
    <!-- <SectionsPageVideoPreviewDynamic
      tag="Live"
      title-line1="RESSENS"
      title-line2="L'ÉNERGIE SWAVE"
      description="Plonge dans l'univers de la danse latine avec notre communauté passionnée. Chaque cours est une nouvelle aventure."
      dance-style="Bachata"
      stat1-value="500+"
      stat1-label="Élèves actifs"
      stat2-value="4.9"
      stat2-label="Note moyenne"
      stat3-value="50+"
      stat3-label="Cours/mois"
      source="instagram"
      :likes="1240"
      :views="8500"
      caption="Rejoins la vibe Swave"
      cta-text="RÉSERVER UN COURS"
      @cta-click="handleReservation"
    /> -->

    <!-- ═══════════════════════════════════════════════════════════════════════
         AMBIANCE: POETIC - Style poétique avec citation
         Grande citation, mots-clés flottants, bande décorative
    ═══════════════════════════════════════════════════════════════════════ -->
    <SectionsPageAmbiancePoetic
      :image="ambianceSwave"
      image-alt="Danseuse en lady styling"
      quote="Ta danse t'appartient. On t'aide juste à la trouver."
      quote-author="Swave Connection"
      :keywords="['Grâce', 'Féminité', 'Expression']"
      tagline="Un espace où chaque femme peut s'épanouir et exprimer sa singularité à travers le mouvement."
      band-text="Swave Connection"
    />

  </div>
</template>

<script setup lang="ts">
/*
  Page d'atterrissage pour le cours Lady Styling

  Cette page reprend la structure de bachata-debutant mais avec:
  - Un thème violet subtil (override local des variables primary)
  - Du contenu adapté au lady styling (féminité, expression, grâce)
  - Les mêmes sections: Hero, Benefits Alternate, Agenda, Video Dynamic, Ambiance Poetic
*/

const heroImage = '/images/cours-lady-style.png';
const ambianceSwave = '/images/ambianceSwave.jpg';
const progression1 = '/images/progression1.jpg';
const professeurDenise = '/images/professeur_denise.jpg';
import type { Benefit } from '~/components/sections/PageBenefitsAlternate.vue';

definePageMeta({
  layout: 'default'
});

useSeo({
  title: 'Lady Styling Bachata',
  description: 'Cours de lady styling bachata à Montréal. Développe ta féminité et ton expression personnelle avec nos instructrices passionnées chez Swave Connection.',
  path: '/bachata-lady-style',
  jsonLd: seoSchemaCourse({
    name: 'Lady Styling Bachata',
    description: 'Cours de lady styling. Techniques de bras, isolations, tours et body movement pour exprimer ta féminité.',
    path: '/bachata-lady-style',
  }),
});

/* ═══════════════════════════════════════════════════════════════════════════
   DONNÉES BENEFITS - Contenu adapté au Lady Styling
   ═══════════════════════════════════════════════════════════════════════════ */
const benefitsData: Benefit[] = [
  {
    image: ambianceSwave,
    tag: 'Expression',
    title: 'Libère ta personnalité sur la piste',
    description: 'Le lady styling, c\'est bien plus que des mouvements de bras. C\'est l\'art d\'exprimer qui tu es à travers chaque geste. Ici, tu apprends à danser avec ton âme, pas juste avec ton corps.',
    stat: '100%',
    statLabel: 'de nos élèves gagnent en confiance',
  },
  {
    image: progression1,
    tag: 'Technique',
    title: 'Des fondations solides pour briller',
    description: 'Body waves, isolations, tours, jeux de bras... Notre méthode progressive te permet de maîtriser chaque technique étape par étape. Tu développes ta grâce naturellement, sans précipitation.',
    stat: '6 semaines',
    statLabel: 'pour maîtriser les bases du styling',
  },
  {
    image: professeurDenise,
    tag: 'Mentorat',
    title: 'Guidée par des danseuses inspirantes',
    description: 'Nos instructrices sont des passionnées qui comprennent le parcours de chaque femme. Elles créent un espace bienveillant où tu peux explorer, te tromper et grandir. Leur énergie est contagieuse.',
    stat: '10+ ans',
    statLabel: 'd\'expérience en styling',
    cta: 'Rencontrer l\'équipe',
    ctaTo: '/denise-rodriguez',
  },
];

const handleReservation = () => {
  console.log('Reservation clicked - Lady Styling');
};
</script>

<style scoped>
/**
 * PAGE LADY STYLE - Override des couleurs thématiques
 *
 * Violet subtil proche du bleu primary mais avec une touche féminine
 * --primary: bleu-violet (#7c6cc4 -> violet modéré)
 * --primary-light: violet clair (#a89cd9 -> overlay et backgrounds)
 */

.page-lady-style {
  /* Override local des couleurs primary -> violet subtil */
  --primary: #8b7bc7;
  --primary-light: #b8aee0;
  --primary-dark: #6b5aa8;
}
</style>
