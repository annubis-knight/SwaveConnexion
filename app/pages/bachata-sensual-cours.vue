<template>
  <div class="page-sensual">
    <SectionsPageHero
      title="BACHATA SENSUAL"
      subtitle="La Bachata Sensual est au cœur de Swave Connection. On y travaille la qualité du mouvement, la connexion entre partenaires, la musicalité et l'expression personnelle."
      tag="Notre spécialité"
      :image="heroImage"
      image-alt="Danseurs de bachata sensual"
      bg-color="primary"
      cta-text="RÉSERVER UN COURS PRIVÉ"
      @cta-click="handleReservation"
    />

    <!-- ═══════════════════════════════════════════════════════════════════════
         BENEFITS: ALTERNATE - Spécificités du sensual
    ═══════════════════════════════════════════════════════════════════════ -->
    <SectionsPageBenefitsAlternate
      title-line1="L'ART DE LA "
      title-line2="CONNEXION"
      intro="Notre approche s'adresse autant aux personnes qui découvrent cette danse qu'aux danseurs qui souhaitent aller plus loin. À travers les cours privés, les initiations, les ateliers et la Swave Sensual Team, on crée des occasions d'apprendre et de progresser. Notre objectif : t'aider à mieux comprendre la danse pour mieux la ressentir."
      :benefits="benefitsData"
    />

    <!-- ═══════════════════════════════════════════════════════════════════════
                              SECTION AGENDA
    ═══════════════════════════════════════════════════════════════════════ -->
    <!-- <SectionsLandingAgenda /> -->

    <!-- ═══════════════════════════════════════════════════════════════════════
         VIDEO: DYNAMIC - Aperçu bachata sensual
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
         AMBIANCE: POETIC - Citation sur la connexion
    ═══════════════════════════════════════════════════════════════════════ -->
    <SectionsPageAmbiancePoetic
      :image="ambianceSwave"
      image-alt="Couple dansant la bachata sensual"
      quote="Écouter son partenaire, c'est déjà danser."
      quote-author="Swave Connection"
      :keywords="['Émotion', 'Connexion', 'Intensité']"
      tagline="Un espace où tu apprends à écouter ton partenaire et à te laisser guider par la musique."
      band-text="Swave Connection"
    />

  </div>
</template>

<script setup lang="ts">
/*
  Page Bachata Sensual - Cours niveau intermédiaire

  Thème couleur: Bleu doux et chaud (intimité, connexion, émotion)
  - Bleu légèrement désaturé et plus chaud
  - Évoque la douceur et l'intimité du sensual
*/

const heroImage = '/images/cours-sensual.jpeg';
const ambianceSwave = '/images/ambianceSwave.jpg';

/* Visuels des bénéfices, propres à cette page */
const sensualImage1 = '/images/bachata_senusal1.jpeg';
const sensualImage2 = '/images/bachata_senusal2.jpeg';
const sensualImage3 = '/images/bachata_senusal3.jpeg';
import type { Benefit } from '~/components/sections/PageBenefitsAlternate.vue';

definePageMeta({
  layout: 'default'
});

useSeo({
  title: 'Bachata Sensual',
  description: 'Cours de bachata sensual à Montréal. Maîtrisez les body waves, isolations et la connexion profonde avec votre partenaire chez Swave Connection.',
  path: '/bachata-sensual-cours',
  jsonLd: seoSchemaCourse({
    name: 'Bachata Sensual',
    description: 'Cours de bachata sensual. Body waves, isolations, musicalité avancée et connexion profonde entre partenaires.',
    path: '/bachata-sensual-cours',
  }),
});

/* ═══════════════════════════════════════════════════════════════════════════
   DONNÉES BENEFITS - Spécificités du bachata sensual
   ═══════════════════════════════════════════════════════════════════════════ */
const benefitsData: Benefit[] = [
  {
    image: sensualImage1,
    tag: 'Connexion',
    title: 'Dialogue sans paroles',
    description: 'La bachata sensual, c\'est avant tout une conversation corporelle. Tu apprendras à écouter les micro-mouvements de ton partenaire, à anticiper et à y répondre.',
  },
  {
    image: sensualImage2,
    tag: 'Technique',
    title: 'Body waves et isolations',
    description: 'Les mouvements du corps sont la signature de la bachata sensual. Notre méthode décompose chaque isolation : poitrine, hanches, épaules, afin que tu puisses maîtriser et comprendre les codes sur la piste.',
  },
  {
    image: sensualImage3,
    tag: 'Musicalité',
    title: 'Interprète chaque note',
    description: 'Au-delà des pas, c\'est la musique qui guide. Tu développeras une oreille fine pour les breaks, les accents, les moments de suspension. Ta danse deviendra une interprétation unique de chaque chanson.',
    cta: 'Rencontrer l\'équipe',
    ctaTo: '/denise-rodriguez',
  },
];

const handleReservation = () => {
  console.log('Reservation clicked - Bachata Sensual');
};
</script>

<style scoped>
/**
 * PAGE SENSUAL - Override des couleurs thématiques
 *
 * Bleu-indigo doux : entre primary et lady-style
 * Touche violette subtile pour l'intimité, mais reste proche du bleu
 */

.page-sensual {
  --primary: #5a8bc4;
  --primary-light: #8fb3db;
  --primary-dark: #3d6a9e;
}
</style>
