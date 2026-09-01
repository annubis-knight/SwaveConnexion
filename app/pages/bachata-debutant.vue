<template>
  <div>
    <SectionsPageHero
      title="BACHATA DÉBUTANT"
      subtitle="Découvrez les bases de la bachata dans une ambiance conviviale. Apprenez les pas fondamentaux, le guidage et le feeling avec nos instructeurs passionnés."
      tag="Cours collectif"
      :image="heroImage"
      image-alt="Danseurs de bachata"
      bg-color="primary"
      cta-text="RÉSERVER CE COURS"
      @cta-click="handleReservation"
    />

    <!-- ═══════════════════════════════════════════════════════════════════════
                              SECTIONS BENEFITS
         5 variations du plus classique au plus original
    ═══════════════════════════════════════════════════════════════════════ -->

    <!-- ═══════════════════════════════════════════════════════════════════════
         BENEFITS 1: CLASSIC - Header centré + 3 cards en grille
         Design épuré inspiré SaaS, icônes gradient, hover lift
    ═══════════════════════════════════════════════════════════════════════ -->
    <!-- <SectionsPageBenefitsClassic /> -->

    <!-- ═══════════════════════════════════════════════════════════════════════
         BENEFITS 2: ALTERNATE - Cards en zigzag gauche/droite
         Design éditorial magazine, grands numéros, stats highlight
    ═══════════════════════════════════════════════════════════════════════ -->
    <SectionsPageBenefitsAlternate
      title-line1="TROIS RAISONS DE "
      title-line2="NOUS FAIRE CONFIANCE"
      :benefits="benefitsData"
    />

    <!-- ═══════════════════════════════════════════════════════════════════════
         BENEFITS 3: STICKY - Sidebar fixe + cards défilantes
         Design premium portfolio, témoignages, progression visuelle
    ═══════════════════════════════════════════════════════════════════════ -->
    <!-- <SectionsPageBenefitsSticky /> -->

    <!-- ═══════════════════════════════════════════════════════════════════════
         BENEFITS 4: TIMELINE - Parcours vertical avec nodes
         Design roadmap, étapes numérotées, features lists, CTA bottom
    ═══════════════════════════════════════════════════════════════════════ -->
    <!-- <SectionsPageBenefitsTimeline /> -->

    <!-- ═══════════════════════════════════════════════════════════════════════
         BENEFITS 5: IMMERSIVE - Full-width cards empilées
         Design bold landing page, backgrounds colorés, stats row, patterns
    ═══════════════════════════════════════════════════════════════════════ -->
    <!-- <SectionsPageBenefitsImmersive /> -->


    <!-- ═══════════════════════════════════════════════════════════════════════
                              SECTION AGENGA
    -->
    <!-- <SectionsLandingAgenda /> -->




    <!-- ═══════════════════════════════════════════════════════════════════════
                              SECTIONS VIDEO PREVIEW
         4 variations du plus classique au plus original
    ═══════════════════════════════════════════════════════════════════════ -->

    <!-- ═══════════════════════════════════════════════════════════════════════
         VIDEO 1: CLASSIC - Épurée et minimaliste
         Design sobre, centré, bordure subtile gradient
    ═══════════════════════════════════════════════════════════════════════ -->
    <!-- <SectionsPageVideoPreviewClassic
      tag="Aperçu"
      title="Un aperçu de nos cours"
      description="Découvrez l'ambiance détendue et bienveillante de nos sessions de bachata pour débutants."
      source="instagram"
      :likes="1240"
      :views="8500"
      caption="@swaveconnection"
      cta-text="VOIR PLUS DE VIDÉOS"
      @cta-click="handleInstagramClick"
    /> -->

    <!-- ═══════════════════════════════════════════════════════════════════════
         VIDEO 2: ORIGINAL (PageVideoPreview) - Asymétrique moderne
         Layout flex avec stats, éléments décoratifs, titre splitté
    ═══════════════════════════════════════════════════════════════════════ -->
    <!-- <SectionsPageVideoPreview
      tag="En coulisses"
      title-start="VIVEZ L'"
      title-highlight="EXPERIENCE SWAVE"
      description="Découvrez l'ambiance unique de nos cours de bachata débutant. Une énergie contagieuse, des instructeurs passionnés et une communauté bienveillante vous attendent."
      source="instagram"
      :likes="1240"
      :views="8500"
      caption="@swaveconnection • Cours du mardi soir"
      cta-text="SUIVEZ-NOUS SUR INSTAGRAM"
      :stats="videoStats"
      @cta-click="handleInstagramClick"
    /> -->

    <!-- ═══════════════════════════════════════════════════════════════════════
         VIDEO 3: DYNAMIC - Énergique avec animations
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
         VIDEO 4: IMMERSIVE - Cinématique full-width
         Fond noir, glow effects, particules, stats flottantes, social proof
    ═══════════════════════════════════════════════════════════════════════ -->
    <!-- <SectionsPageVideoPreviewImmersive
      tag="Expérience"
      title="Plongez dans l'univers Swave"
      description="Une immersion totale dans la danse latine. Rejoignez notre communauté et vivez des moments inoubliables."
      source="instagram"
      :likes="1240"
      :views="8500"
      stat1-value="8.5K"
      stat1-label="Vues"
      stat2-value="1.2K"
      stat2-label="Likes"
      :show-social="true"
      social-text="+200 personnes ont rejoint ce mois-ci"
      cta-text="COMMENCER L'AVENTURE"
      @cta-click="handleReservation"
    /> -->


        <!-- ═══════════════════════════════════════════════════════════════════════
                              SECTIONS AMBIANCE
         3 variations pour mettre en valeur l'ambiance via une image immersive
    ═══════════════════════════════════════════════════════════════════════ -->

    <!-- ═══════════════════════════════════════════════════════════════════════
         AMBIANCE 1: CINEMATIC - Style cinématique immersif
         Vignettage, coins décoratifs, scroll indicator, punchline centrée
    ═══════════════════════════════════════════════════════════════════════ -->
    <!-- <SectionsPageAmbianceCinematic
      :image="ambianceSwave"
      image-alt="Ambiance cours de bachata"
      tag="L'expérience Swave"
      headline="Ressens la musique. Vis le moment."
      subheadline="Chaque cours est une invitation à te connecter avec toi-même et les autres. La danse, c'est bien plus que des pas."
      scroll-text="Explorer"
    /> -->

    <!-- ═══════════════════════════════════════════════════════════════════════
         AMBIANCE 2: POETIC - Style poétique avec citation
         Grande citation, mots-clés flottants, bande décorative
    ═══════════════════════════════════════════════════════════════════════ -->
    <SectionsPageAmbiancePoetic
      :image="ambianceSwave"
      image-alt="Danseurs de bachata"
      quote="Personne ne naît en sachant danser. Tout le monde commence par le premier pas."
      quote-author="Swave Connection"
      :keywords="['Passion', 'Connexion', 'Liberté']"
      tagline="Rejoins une communauté où chaque pas compte et chaque sourire est sincère."
      band-text="Swave Connection"
    />

    <!-- ═══════════════════════════════════════════════════════════════════════
         AMBIANCE 3: MINIMAL - Style minimaliste épuré
         Typographie comme élément principal, design sobre et élégant
    ═══════════════════════════════════════════════════════════════════════ -->
    <!-- <SectionsPageAmbianceMinimal
      :image="ambianceSwave"
      image-alt="Cours de danse"
      line1="Danse comme si"
      highlight="personne ne regardait"
      line2="et vis pleinement"
      caption="Swave Connection, là où la danse devient une seconde nature"
    /> -->



  </div>
</template>

<script setup lang="ts">
/*
  Page d'atterrissage pour le cours Bachata Débutant
  Accessible via CardFeature depuis la landing page

  Cette page présente:

  5 VARIATIONS BENEFITS (du plus classique au plus original):
  1. Classic - Header centré + 3 cards en grille
  2. Alternate - Cards en zigzag gauche/droite avec numéros
  3. Sticky - Sidebar fixe + cards défilantes avec témoignages
  4. Timeline - Parcours vertical avec nodes et features lists
  5. Immersive - Full-width cards empilées avec backgrounds colorés

  4 VARIATIONS VIDEO PREVIEW:
  1. Classic - Épurée et minimaliste (fond gris clair)
  2. Original - Asymétrique moderne (fond blanc)
  3. Dynamic - Énergique avec animations (fond blanc)
  4. Immersive - Cinématique full-width (fond noir)
*/

const heroImage = '/images/cours-debutant.jpg';
const ambianceSwave = '/images/ambianceSwave.jpg';
const progression1 = '/images/progression1.jpg';
const professeurDenise = '/images/professeur_denise.jpg';
import type { Benefit } from '~/components/sections/PageBenefitsAlternate.vue';

definePageMeta({
  layout: 'default'
});

useSeo({
  title: 'Bachata Débutant',
  description: 'Cours de bachata pour débutants à Montréal. Apprenez les bases, le guidage et le feeling avec nos instructeurs passionnés chez Swave Connection.',
  path: '/bachata-debutant',
  jsonLd: seoSchemaCourse({
    name: 'Bachata Débutant',
    description: 'Cours de bachata pour débutants. Pas fondamentaux, guidage et feeling dans une ambiance conviviale.',
    path: '/bachata-debutant',
  }),
});

/* Stats pour la section vidéo Original */
// const videoStats = [
//   { value: '500+', label: 'Élèves formés' },
//   { value: '4.9/5', label: 'Note moyenne' },
//   { value: '3', label: 'Instructeurs' },
// ];

/* ═══════════════════════════════════════════════════════════════════════════
   DONNÉES BENEFITS - Facilement modifiables
   ═══════════════════════════════════════════════════════════════════════════ */
const benefitsData: Benefit[] = [
  {
    image: ambianceSwave,
    tag: 'Ambiance',
    title: 'Une atmosphère où tu te sens chez toi',
    description: 'Dès que tu franchis la porte, tu ressens l\'énergie positive. Pas de regard de travers, pas de compétition. Juste des gens comme toi qui veulent passer un bon moment et apprendre quelque chose de nouveau.',
    stat: '98%',
    statLabel: 'de nos élèves reviennent après le 1er cours',
  },
  {
    image: progression1,
    tag: 'Méthode',
    title: 'Progresser sans même t\'en rendre compte',
    description: 'Notre approche unique décompose chaque mouvement en étapes simples et ludiques. Tu intègres les bases naturellement, sans frustration. Au bout de quelques semaines, tu seras surpris de ce que tu sais faire.',
  },
  {
    image: professeurDenise,
    tag: 'Excellence',
    title: 'Apprendre avec des passionnés',
    description: 'Nos instructeurs ne sont pas que des danseurs, ce sont avant tout des passionnés, formés pour t\'apprendre de la meilleure des façons. Ils ont l\'œil pour repérer ce qui bloque et les mots pour t\'aider à avancer.',
    stat: '15+ ans',
    statLabel: 'd\'expérience combinée',
    cta: 'Rencontrer l\'équipe',
    ctaTo: '/denise-rodriguez',
  },
];

const handleReservation = () => {
  console.log('Reservation clicked - Bachata Débutant');
};

// const handleInstagramClick = () => {
//   window.open('https://instagram.com/swaveconnection', '_blank');
// };
</script>
