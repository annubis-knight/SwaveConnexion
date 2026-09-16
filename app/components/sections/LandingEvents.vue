<template>
  <section class="landing-events py-16 lg:py-40" data-theme="light">
    <LayoutContainerMax>
      <!-- Titre + Text dans GridResponsive -->
      <LayoutGridResponsive class="mb-40">
        <!-- Titre: full width mobile, colonnes 1-7 desktop -->
        <Heading :level="2" class="col-span-full">
          NOS ÉVÉNEMENTS SUR MONTRÉAL<br />
          <span class="landing-events__subtitle">& NOS PARTENAIRES</span>
        </Heading>

        <!-- Text: full width mobile, colonnes 8-12 desktop -->
        <Text class="col-span-4 md:col-span-8 lg:col-span-5 lg:col-start-8">
          Pas de cours de groupe réguliers cette saison, mais des occasions de
          danser avec nous : cours ponctuels, initiations et ateliers de Bachata
          Sensual lors de soirées à Montréal et d'événements partenaires. Swave
          Connection est aussi partenaire de Sensual Movement USA, dont tu
          retrouveras ci-dessous les prochains festivals.
        </Text>
      </LayoutGridResponsive>

      <!-- Stack d'événements -->
      <div class="landing-events__events">
        <InfoEvent
          location="MONTRÉAL"
          day="01"
          month="SEPT"
          end-day="08"
          date-separator="and"
          title="Auditions Swave Sensual Team 3"
          description="Deux mardis pour rejoindre la troupe bachata sensual : les 1er et 8 septembre 2026, de 19 h à 21 h, au Studio Uffizi (Espace des Arts, 9 rue Sainte-Catherine Est). Niveau amateur intermédiaire. Pas besoin de venir avec un partenaire."
          cta-text="VOIR PLUS D'INFOS"
          cta-href="/bachata-team#auditions"
          :image="auditionsImage"
          image-alt="Auditions Swave Sensual Team 3, les 1er et 8 septembre 2026"
        />

        <!-- Soirée à Montréal où Denise et Jordan donnent le cours -->
        <InfoEvent
          location="MONTRÉAL"
          day="14"
          month="SEPT"
          title="Chaleur Tropicale"
          description="Lundi 14 septembre 2026, soirée latine au The Bar, 3575 avenue du Parc. À 20 h, cours de bachata avec Denise et Jordan, puis soirée dès 21 h : DJ Kelo aux platines, performances salsa de Ramon et du duo Ricky & Danielle. 15 $ cours et soirée, 10 $ soirée seule, paiement comptant uniquement. Photos et vidéos prises pendant l'événement."
          :image="chaleurTropicaleImage"
          image-alt="Affiche de la soirée Chaleur Tropicale du 14 septembre, avec Denise et Jordan"
          image-position="left"
        />

        <!-- ═══════════════════════════════════════════════════════════════════
             Festivals partenaires, par ordre chronologique
        ═══════════════════════════════════════════════════════════════════ -->
        <InfoEvent
          location="ORLANDO"
          day="11"
          month="FÉV"
          end-day="15"
          title="Sensual Movement, 11e anniversaire"
          description="Le festival Sensual Movement fête ses onze ans du 11 au 15 février 2027, au Hyatt Regency Orlando. Une édition anniversaire qui réunit une large affiche d'artistes internationaux."
          cta-text="PLUS D'INFOS"
          cta-href="https://sensualmovementusa.com/sensual-movement-11th-anniversary/"
          cta-external
          :image="orlandoImage"
          image-alt="Affiche du 11e anniversaire de Sensual Movement, du 11 au 15 février 2027 à Orlando"
        />

        <InfoEvent
          location="PARIS"
          day="22"
          month="AVR"
          end-day="26"
          title="Sensual Movement Paris"
          description="Sensual Movement traverse l'Atlantique : rendez-vous à Paris du 22 au 26 avril 2027. Cinq jours de bachata sensual avec une affiche d'artistes déjà confirmée et plusieurs festivals partenaires."
          cta-text="PLUS D'INFOS"
          cta-href="https://sensualmovementusa.com/sensual-movement-paris-france-2027/"
          cta-external
          :image="parisImage"
          image-alt="Affiche de Sensual Movement Paris, du 22 au 26 avril 2027"
          image-position="left"
        />

        <InfoEvent
          location="TORONTO"
          day="03"
          month="JUIN"
          end-day="06"
          title="Toronto Bachata Level Up"
          description="Du 3 au 6 juin 2027, le Toronto Bachata Level Up Festival ouvre sa billetterie en « blind ticket », avant l'annonce des artistes. Le festival de cette sélection le plus proche de Montréal."
          :image="torontoImage"
          image-alt="Affiche du Toronto Bachata Level Up Festival, du 3 au 6 juin 2027"
        />

        <InfoEvent
          location="MIAMI"
          day="17"
          month="JUIN"
          end-day="21"
          title="Miami Bachata Paradise"
          description="Cinq jours de bachata sensual en Floride, du 17 au 21 juin 2027, au Hyatt Regency de Miami. Une édition signée Sensual Movement."
          cta-text="PLUS D'INFOS"
          cta-href="https://sensualmovementusa.com/miami-bachata-paradise-2027/"
          cta-external
          :image="miamiImage"
          image-alt="Affiche de Miami Bachata Paradise, du 17 au 21 juin 2027"
          image-position="left"
        />

        <InfoEvent
          location="NEW YORK"
          day="29"
          month="JUIL"
          end-day="02"
          end-month="AOÛT"
          title="Empire Sensual Movement"
          description="L'Empire Sensual Movement s'installe au Marriott Marquis de Times Square, du 29 juillet au 2 août 2027. Cinq jours de bachata sensual au cœur de New York."
          cta-text="PLUS D'INFOS"
          cta-href="https://sensualmovementusa.com/empire-sensual-movement-nyc-2027/"
          cta-external
          :image="newYorkImage"
          image-alt="Affiche de l'Empire Sensual Movement, du 29 juillet au 2 août 2027 à New York"
        />

        <!-- ═══════════════════════════════════════════════════════════════════
             Exemples conservés comme modèle de mise en forme (contenu fictif :
             dates, lieux et prix inventés). Renseigner de vrais événements
             avant de les réafficher.
        ═══════════════════════════════════════════════════════════════════ -->
        <!-- <InfoEvent
          location="BARCELONE"
          day="17"
          month="NOV"
          title="BACHATA SENSUAL PARADISE"
          description="Una semana para combinarlo todo, para explorar el movimiento corporal a través de distintas disciplinas. Conecta con la naturaleza en el agua, sintoniza con tu cuerpo mediante el yoga y amplía tu conciencia del movimiento a través de la danza."
          cta-text="ACHETER LE PASS -5€"
          :image="eventImage1"
          image-alt="Bachata Sensual Paradise"
        />

        <InfoEvent
          location="MONTREAL"
          day="25"
          month="DEC"
          title="BACHATA SENSUAL 5+"
          description="Découvre SwaveConnection, l'école de bachata la plus fun et sensuelle de Montréal ! Viens te connecter au rythme, à l'énergie et à la passion. Une expérience unique qui équilibre l'énergie, la flexibilité et le rythme."
          cta-text="ACHETER LE PASS -5€"
          :image="eventImage2"
          image-alt="Bachata Sensual 5+"
          image-position="left"
        />

        <InfoEvent
          location="BERLIN"
          day="08"
          month="JAN"
          title="BS GERMANY REAL LEVELS"
          description="Connecta con la naturaleza en el agua, sintoniza con tu cuerpo mediante el yoga y amplía tu conciencia del movimiento a través de la danza. Una experiencia única que equilibra la energía, la flexibilidad y el ritmo."
          cta-text="ACHETER LE PASS -5€"
          :image="eventImage3"
          image-alt="BS Germany Real Levels"
        /> -->
      </div>
    </LayoutContainerMax>
  </section>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────┐
  │                     LANDING EVENTS                           │
  │                                                             │
  │  Événements à Montréal & partenaires internationaux          │
  │                                                             │
  │  ┌───────────────────────────────────────────────────────┐  │
  │  │  section.landing-events                               │  │
  │  │  ┌─────────────────────────────────────────────────┐  │  │
  │  │  │  ContainerMax                                   │  │  │
  │  │  │  ┌───────────────────────────────────────────┐  │  │  │
  │  │  │  │  Heading (titre)                          │  │  │  │
  │  │  │  └───────────────────────────────────────────┘  │  │  │
  │  │  │  ┌───────────────────────────────────────────┐  │  │  │
  │  │  │  │  Text (paragraphe)                        │  │  │  │
  │  │  │  └───────────────────────────────────────────┘  │  │  │
  │  │  │  ┌───────────────────────────────────────────┐  │  │  │
  │  │  │  │  .landing-events__events (stack)          │  │  │  │
  │  │  │  │  ┌─────────────────────────────────────┐  │  │  │  │
  │  │  │  │  │  InfoEvent × N, ordre chronologique │  │  │  │  │
  │  │  │  │  │  1. événements Swave à Montréal     │  │  │  │  │
  │  │  │  │  │  2. festivals partenaires           │  │  │  │  │
  │  │  │  │  │  Affiche alternée droite / gauche   │  │  │  │  │
  │  │  │  │  └─────────────────────────────────────┘  │  │  │  │
  │  │  │  └───────────────────────────────────────────┘  │  │  │
  │  │  └─────────────────────────────────────────────────┘  │  │
  │  └───────────────────────────────────────────────────────┘  │
  │                                                             │
  │  Props: Aucune (contenu en dur)                             │
  │                                                             │
  │  Events: Aucun (wrapper visuel)                             │
  │                                                             │
  │  Slots: Aucun                                               │
  └─────────────────────────────────────────────────────────────┘
*/

/* Affiches des événements (servies depuis public/, optimisées par NuxtImg) */
const auditionsImage = '/images/portrait_auditions.jpg';
const chaleurTropicaleImage = '/images/event_chaleur_tropicale.jpeg';
const orlandoImage = '/images/event_Sensual_Mouvement_11th.jpeg';
const parisImage = '/images/event_Sensual_Mouvement_Paris.jpeg';
const torontoImage = '/images/event_Toronto_LevelUp.jpeg';
const miamiImage = '/images/event_Sensual_Mouvement_Miami.jpeg';
const newYorkImage = '/images/event_ESM_NewYork.jpeg';

/* Images des exemples mis en commentaire dans le template, à réactiver avec eux */
// import eventImage1 from '~/assets/images/agendaAsset1.png';
// import eventImage2 from '~/assets/images/agendaAsset2.png';
// import eventImage3 from '~/assets/images/agendaAsset3.png';
</script>

<style scoped>
/**
 * LANDING EVENTS STYLES - CSS Nesting + BEM strict
 *
 * Événements à Montréal & partenaires internationaux
 * Section avec stack d'InfoEvent
 * @dev Fond clair, layout vertical
 * @dev CSS Nesting natif (pas SASS)
 */

/* Block */
.landing-events {
  position: relative;
  /* bg-base (blanc) et non bg-subtle : la section cours juste au-dessus est
     deja en bg-subtle, les deux se confondaient */
  background-color: var(--bg-base);
  overflow: hidden;
}

  /* Element: Subtitle */
  .landing-events__subtitle {
    color: var(--primary);
  }

/* Element : stack d'événements */
.landing-events__events {
  display: flex;
  flex-direction: column;
  gap: 160px;
}
</style>
