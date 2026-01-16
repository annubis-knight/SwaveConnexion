<template>
  <section class="landing-agenda py-16 lg:py-24">
    <LayoutContainerMax>
      <!-- Titre -->
      <Heading :level="2" class="mb-20">
        NOS EVENEMENTS SUR MONTREAL
      </Heading>

      <!-- Grid: Cards avec layout asymétrique -->
      <LayoutGridArea
        :cols="1"
        :areas="['card1', 'card2', 'card3']"
        :cols-lg="2"
        :areas-lg="['card1', 'card2', 'card1', 'card3']"
        gap="xl"
      >
        <!-- Card 1 - World Event (grande card à gauche) -->
        <CardFeature
          style="grid-area: card1"
          :image="worldEventImage"
          image-alt="Bachata Sensual World Congress"
          title="WORLD EVENT"
          href="/events/world-congress"
          description="Découvre SwaveConnexion, l'école de bachata la plus fun et sensuelle de Montréal."
          layout="outside"
        />

        <!-- Card 2 - Bachata Sensual 5+ -->
        <CardFeature
          style="grid-area: card2"
          :image="bachataSensualImage"
          image-alt="Bachata Sensual 5+"
          title="BACHATA SENSUAL 5 +"
          href="/events/bachata-sensual"
          description="Découvre SwaveConnexion, l'école de bachata la plus fun et sensuelle de Montréal."
          layout="outside"
        />

        <!-- Card 3 - BS Germany (Real Levels) -->
        <CardFeature
          style="grid-area: card3"
          :image="bsGermanyImage"
          image-alt="BS Germany Real Levels"
          title="BS GERMANY"
          href="/events/bs-germany"
          description="Découvre SwaveConnexion, l'école de bachata la plus fun et sensuelle de Montréal."
          layout="outside"
        />
      </LayoutGridArea>
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
  │  │  │  │  Heading (titre seul)                     │  │  │  │
  │  │  │  └───────────────────────────────────────────┘  │  │  │
  │  │  │  ┌───────────────────────────────────────────┐  │  │  │
  │  │  │  │  GridArea (cards)                         │  │  │  │
  │  │  │  │                                           │  │  │  │
  │  │  │  │  MOBILE:     DESKTOP (lg:):               │  │  │  │
  │  │  │  │  "card1"     "card1  card2"               │  │  │  │
  │  │  │  │  "card2"     "card1  card3"               │  │  │  │
  │  │  │  │  "card3"                                  │  │  │  │
  │  │  │  │                                           │  │  │  │
  │  │  │  └───────────────────────────────────────────┘  │  │  │
  │  │  └─────────────────────────────────────────────────┘  │  │
  │  └───────────────────────────────────────────────────────┘  │
  │                                                             │
  │  Props: Aucune (contenu en dur)                             │
  │                                                             │
  │  Events: Aucun (wrapper visuel)                             │
  │                                                             │
  │  Slots: Aucun                                               │
  │                                                             │
  │  Responsive: Mobile-first (cols=1 → cols-lg=2)              │
  └─────────────────────────────────────────────────────────────┘
*/

/* Images des événements */
import worldEventImage from '~/assets/images/agendaAsset1.png';
import bachataSensualImage from '~/assets/images/agendaAsset2.png';
import bsGermanyImage from '~/assets/images/agendaAsset3.png';
</script>

<style scoped>
/**
 * LANDING AGENDA STYLES - CSS Nesting + BEM strict
 *
 * Section événements avec grille asymétrique
 * @dev Fond clair, layout en grid-areas
 * @dev CSS Nesting natif (pas SASS)
 */

/* Block */
.landing-agenda {
  position: relative;
  background-color: var(--bg-subtle);
  overflow: hidden;
}
</style>
