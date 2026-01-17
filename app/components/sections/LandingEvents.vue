<template>
  <section class="landing-agenda py-16 lg:py-40">
    <LayoutContainerMax>
      <!-- Titre + Text dans GridResponsive -->
      <LayoutGridResponsive class="mb-40">
        <!-- Titre: full width mobile, colonnes 1-7 desktop -->
        <Heading :level="2" class="col-span-full">
          NOS ÉVENEMENTS SUR MONTRÉAL<br />
          <span class="landing-events__subtitle">& NOS PARTENAIRES</span>
        </Heading>

        <!-- Text: full width mobile, colonnes 8-12 desktop -->
        <Text class="col-span-4 md:col-span-8 lg:col-span-5 lg:col-start-8">
          Découvre SwaveConnexion, l'école de bachata la plus fun et sensuelle de Montréal !
          Viens te connecter au rythme, à l'énergie et à la passion. Que tu sois débutant ou
          confirmé, notre équipe dynamique t'accompagne pour danser, progresser et vibrer à
          chaque pas. Rejoins la vibe Swave !
        </Text>
      </LayoutGridResponsive>

      <!-- Stack d'événements -->
      <div class="landing-agenda__events">
        <InfoEvent
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
          description="Découvre SwaveConnexion, l'école de bachata la plus fun et sensuelle de Montréal ! Viens te connecter au rythme, à l'énergie et à la passion. Une expérience unique qui équilibre l'énergie, la flexibilité et le rythme."
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
        />
      </div>
    </LayoutContainerMax>
  </section>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────┐
  │                     LANDING AGENDA                           │
  │                                                             │
  │  ┌───────────────────────────────────────────────────────┐  │
  │  │  section.landing-agenda                               │  │
  │  │  ┌─────────────────────────────────────────────────┐  │  │
  │  │  │  ContainerMax                                   │  │  │
  │  │  │  ┌───────────────────────────────────────────┐  │  │  │
  │  │  │  │  Heading (titre)                          │  │  │  │
  │  │  │  └───────────────────────────────────────────┘  │  │  │
  │  │  │  ┌───────────────────────────────────────────┐  │  │  │
  │  │  │  │  Text (paragraphe)                        │  │  │  │
  │  │  │  └───────────────────────────────────────────┘  │  │  │
  │  │  │  ┌───────────────────────────────────────────┐  │  │  │
  │  │  │  │  .landing-agenda__events (stack)          │  │  │  │
  │  │  │  │  ┌─────────────────────────────────────┐  │  │  │  │
  │  │  │  │  │  InfoEvent 1                        │  │  │  │  │
  │  │  │  │  └─────────────────────────────────────┘  │  │  │  │
  │  │  │  │  ┌─────────────────────────────────────┐  │  │  │  │
  │  │  │  │  │  InfoEvent 2                        │  │  │  │  │
  │  │  │  │  └─────────────────────────────────────┘  │  │  │  │
  │  │  │  │  ┌─────────────────────────────────────┐  │  │  │  │
  │  │  │  │  │  InfoEvent 3                        │  │  │  │  │
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

/* Images des événements */
import eventImage1 from '~/assets/images/agendaAsset1.png';
import eventImage2 from '~/assets/images/agendaAsset2.png';
import eventImage3 from '~/assets/images/agendaAsset3.png';
</script>

<style scoped>
/**
 * LANDING AGENDA STYLES - CSS Nesting + BEM strict
 *
 * Section événements avec stack d'InfoEvent
 * @dev Fond clair, layout vertical
 * @dev CSS Nesting natif (pas SASS)
 */

/* Block */
.landing-agenda {
  position: relative;
  background-color: var(--bg-subtle);
  overflow: hidden;
}

  /* Element: Subtitle */
  .landing-events__subtitle {
    color: var(--primary);
  }

/* Element : stack d'événements */
.landing-agenda__events {
  display: flex;
  flex-direction: column;
  gap: 160px;
}
</style>
