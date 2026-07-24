<template>
  <div class="page-team">
    <SectionsPageHero
      title="BACHATA TEAM"
      subtitle="Rejoins une équipe de danseurs passionnés et monte sur scène ensemble. Apprends des chorégraphies complètes, développe ta synchronisation et vis l'adrénaline des performances."
      tag="Chorégraphie collective"
      :image="heroImage"
      image-alt="Team de danseurs bachata"
      bg-color="primary"
      cta-text="REJOINDRE LA TEAM"
      @cta-click="handleReservation"
    />

    <!-- ═══════════════════════════════════════════════════════════════════════
         BENEFITS: ALTERNATE - Avantages du cours Team
    ═══════════════════════════════════════════════════════════════════════ -->
    <SectionsPageBenefitsAlternate
      title-line1="DANSE EN "
      title-line2="ÉQUIPE"
      :benefits="benefitsData"
    />

    <!-- ═══════════════════════════════════════════════════════════════════════
                              SECTION AGENDA
    ═══════════════════════════════════════════════════════════════════════ -->
    <!-- <SectionsLandingAgenda /> -->

    <!-- ═══════════════════════════════════════════════════════════════════════
         VIDEO: DYNAMIC - Aperçu des performances
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
         AMBIANCE: POETIC - Citation sur l'esprit d'équipe
    ═══════════════════════════════════════════════════════════════════════ -->
    <SectionsPageAmbiancePoetic
      :image="ambianceSwave"
      image-alt="Team bachata en répétition"
      quote="Seul on va plus vite, ensemble on va plus loin. Sur scène, nous ne faisons qu'un."
      quote-author="Proverbe africain"
      :keywords="['Synchronisation', 'Cohésion', 'Performance']"
      tagline="Plus qu'un cours, une aventure collective où chaque répétition forge des liens et prépare des moments inoubliables."
      band-text="Swave Connection"
    />

  </div>
</template>

<script setup lang="ts">
/*
  Page Bachata Team - Cours de chorégraphie en groupe

  Thème couleur: Bleu profond saturé (cohésion, synchronisation, performance)
  - primary: bleu plus intense et profond
  - primary-light: bleu vif mais pas trop clair
*/

const heroImage = '/images/cours-team.png';
const ambianceSwave = '/images/ambianceSwave.jpg';
const progression1 = '/images/progression1.jpg';
const professeurDenise = '/images/professeur_denise.jpg';
import type { Benefit } from '~/components/sections/PageBenefitsAlternate.vue';

definePageMeta({
  layout: 'default'
});

useSeo({
  title: 'Bachata Team',
  description: 'Rejoins notre team de chorégraphie bachata à Montréal. Apprends des chorégraphies complètes, danse en groupe et monte sur scène avec Swave Connection.',
  path: '/bachata-team',
  jsonLd: seoSchemaCourse({
    name: 'Bachata Team',
    description: 'Chorégraphie collective de bachata. Synchronisation, créativité et performances sur scène.',
    path: '/bachata-team',
  }),
});

/* ═══════════════════════════════════════════════════════════════════════════
   DONNÉES BENEFITS - Avantages des cours Team Chorégraphie
   ═══════════════════════════════════════════════════════════════════════════ */
const benefitsData: Benefit[] = [
  {
    image: ambianceSwave,
    tag: 'Synchronisation',
    title: 'Danser comme un seul corps',
    description: 'Tu apprendras à te synchroniser avec les autres danseurs, à anticiper les mouvements collectifs et à créer cette unité visuelle qui fait frissonner le public. Chaque répétition renforce cette connexion unique.',
    stat: '12',
    statLabel: 'danseurs par team',
  },
  {
    image: progression1,
    tag: 'Chorégraphie',
    title: 'Des créations originales',
    description: 'Nos chorégraphies sont créées spécialement pour le groupe. Tu participeras à l\'élaboration des enchaînements, tu pourras proposer des idées et voir ta créativité prendre vie sur scène.',
    stat: '3',
    statLabel: 'nouvelles choré/an',
  },
  {
    image: professeurDenise,
    tag: 'Performance',
    title: 'Monte sur scène',
    description: 'L\'objectif final : performer devant un vrai public. Soirées, événements, festivals — tu vivras l\'adrénaline de la scène et la fierté de présenter le fruit de mois de travail collectif.',
    stat: '3+',
    statLabel: 'shows par an',
    cta: 'Rencontrer l\'équipe',
    ctaTo: '/denise-rodriguez',
  },
];

const handleReservation = () => {
  console.log('Reservation clicked - Bachata Team');
};
</script>

<style scoped>
/**
 * PAGE TEAM - Override des couleurs thématiques
 *
 * Bleu profond et saturé : confiance, professionnalisme, expertise
 * Reste proche du primary mais plus intense
 */

.page-team {
  --primary: #0a7eb8;
  --primary-light: #4da8d4;
  --primary-dark: #065a87;
}
</style>
