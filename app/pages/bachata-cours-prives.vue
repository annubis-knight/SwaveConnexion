<template>
  <div class="page-cours-prives">
    <SectionsPageHero
      title="COURS PRIVÉS"
      subtitle="Un accompagnement sur-mesure pour progresser à ton rythme. Objectifs personnalisés, attention exclusive et flexibilité totale pour une expérience d'apprentissage premium."
      tag="Formule premium"
      :image="heroImage"
      image-alt="Cours privé de bachata"
      bg-color="primary"
      cta-text="RÉSERVER UN COURS"
      @cta-click="handleReservation"
    />

    <!-- ═══════════════════════════════════════════════════════════════════════
         BENEFITS: ALTERNATE - Avantages des cours privés
    ═══════════════════════════════════════════════════════════════════════ -->
    <SectionsPageBenefitsAlternate
      title-line1="L'EXCELLENCE "
      title-line2="SUR MESURE"
      :benefits="benefitsData"
    />

    <!-- ═══════════════════════════════════════════════════════════════════════
                              SECTION AGENDA
    ═══════════════════════════════════════════════════════════════════════ -->
    <!-- <SectionsLandingAgenda /> -->

    <!-- ═══════════════════════════════════════════════════════════════════════
         VIDEO: DYNAMIC - Aperçu cours privé
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
         AMBIANCE: POETIC - Citation sur l'excellence
    ═══════════════════════════════════════════════════════════════════════ -->
    <SectionsPageAmbiancePoetic
      :image="ambianceSwave"
      image-alt="Cours privé personnalisé"
      quote="L'excellence n'est pas un acte, mais une habitude. Chaque détail compte quand on vise le meilleur."
      quote-author="Aristote"
      :keywords="['Excellence', 'Précision', 'Résultats']"
      tagline="Un investissement dans toi-même qui transforme ta danse et ta confiance."
      band-text="Swave Connection"
    />

  </div>
</template>

<script setup lang="ts">
/*
  Page Cours Privés - Formule premium personnalisée

  Thème couleur: Bleu-teal (exclusivité, premium, raffinement)
  - Légère touche de vert/cyan pour évoquer le premium
  - Reste dans la famille du bleu Swave
*/

const heroImage = '/images/cours-prive.jpg';
const ambianceSwave = '/images/ambianceSwave.jpg';
const progression1 = '/images/progression1.jpg';
const professeurDenise = '/images/professeur_denise.jpg';
import type { Benefit } from '~/components/sections/PageBenefitsAlternate.vue';

definePageMeta({
  layout: 'default'
});

useSeo({
  title: 'Cours Privés Bachata',
  description: 'Cours privés de bachata sur-mesure à Montréal. Progressez rapidement avec un accompagnement personnalisé et exclusif chez Swave Connection.',
  path: '/bachata-cours-prives',
  jsonLd: seoSchemaCourse({
    name: 'Cours Privés Bachata',
    description: 'Cours privés de bachata personnalisés. Programme sur-mesure, flexibilité totale et progression accélérée.',
    path: '/bachata-cours-prives',
  }),
});

/* ═══════════════════════════════════════════════════════════════════════════
   DONNÉES BENEFITS - Avantages des cours privés
   ═══════════════════════════════════════════════════════════════════════════ */
const benefitsData: Benefit[] = [
  {
    image: professeurDenise,
    tag: 'Personnalisation',
    title: 'Un programme taillé pour toi',
    description: 'Oublie les programmes génériques. Ton instructeur analyse ton niveau, tes forces, tes axes d\'amélioration et construit un parcours unique. Chaque minute de cours est optimisée pour ta progression.',
    stat: '100%',
    statLabel: 'adapté à tes objectifs',
  },
  {
    image: progression1,
    tag: 'Efficacité',
    title: 'Progresse deux fois plus vite',
    description: 'Sans attendre ton tour, sans suivre le rythme du groupe, tu maximises chaque seconde. Les corrections sont immédiates, les répétitions ciblées. Résultat : une progression spectaculaire.',
    stat: '2x',
    statLabel: 'plus rapide qu\'en groupe',
  },
  {
    image: ambianceSwave,
    tag: 'Flexibilité',
    title: 'Ton planning, tes règles',
    description: 'Cours tôt le matin, pause déjeuner, soirée tardive ou week-end — tu choisis. Besoin de reporter ? Pas de stress. Le cours privé s\'adapte à ta vie, pas l\'inverse.',
    stat: '7j/7',
    statLabel: 'disponibilité flexible',
    cta: 'Rencontrer l\'équipe',
    ctaTo: '/denise-rodriguez',
  },
];

const handleReservation = () => {
  console.log('Reservation clicked - Cours Privés');
};
</script>

<style scoped>
/**
 * PAGE COURS PRIVÉS - Override des couleurs thématiques
 *
 * Bleu-teal : exclusivité, premium, raffinement
 * Légère touche de cyan/vert pour évoquer le premium
 */

.page-cours-prives {
  --primary: #0e8a9e;
  --primary-light: #5bb8c9;
  --primary-dark: #0a6673;
}
</style>
