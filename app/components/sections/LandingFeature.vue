<template>

  <section class="landing-feature py-16 lg:py-40">
    <LayoutContainerMax>
      <!-- Titre -->
      <Heading :level="2" class="mb-20">
        LE MEILLEUR APPRENTISSAGE,<br />
        <span class="landing-feature__subtitle">C'EST CELUI AVEC LE SOURIRE</span>
      </Heading>

      <!-- Grid: Text + Cards (mobile-first) -->
      <LayoutGridArea
        :cols="1"
        :areas="['text', 'card1', 'card2', 'card3']"
        :cols-lg="2"
        :areas-lg="['card1', 'text', 'card1', 'card2', null, 'card3']"
        gap="xl"
      >
        <!-- Text -->
        <Text style="grid-area: text">
          Découvre SwaveConnexion, l'école de bachata la plus fun et sensuelle de Montréal !
          Viens te connecter au rythme, à l'énergie et à la passion. Que tu sois débutant ou
          confirmé, notre équipe dynamique t'accompagne pour danser, progresser et vibrer à
          chaque pas. Rejoins la vibe Swave !
        </Text>

        <!-- Card 1 - Bachata Débutant -->
        <CardFeature
          style="grid-area: card1"
          :image="bachataDebutant"
          image-alt="Cours de Bachata débutant"
          title="BACHATA DÉBUTANT"
          href="/cours/bachata-debutant"
          layout="overlay"
          textColor="white"
          class="lg:translate-y-[150px]"
        />

        <!-- Card 2 - Cours Privés -->
        <CardFeature
          style="grid-area: card2" class="lg:justify-self-end"
          format="landscape"
          :image="coursPrivé"
          image-alt="Cours privés de danse"
          title="COURS PRIVÉS"
          href="/cours/prives"
          layout="overlay"
          textColor="white"
        />

        <!-- Card 3 - Kizomba -->
        <CardFeature
          image-alt="Cours de Kizomba"
          title="KIZOMBA"
          format="landscape"
          :image="kizomba"
          href="/cours/kizomba"
          style="grid-area: card3" class="lg:justify-self-end"
          layout="overlay"
          textColor="white"
        />
      </LayoutGridArea>
    </LayoutContainerMax>
  </section>
</template>

<script setup lang="ts">
/*
  <!--
    ┌─────────────────────────────────────────────────────────────┐
    │                     LANDING FEATURE                         │
    │                                                             │
    │  ┌───────────────────────────────────────────────────────┐  │
    │  │  section.landing-feature                              │  │
    │  │  ┌─────────────────────────────────────────────────┐  │  │
    │  │  │  ContainerMax                                   │  │  │
    │  │  │  ┌───────────────────────────────────────────┐  │  │  │
    │  │  │  │  Heading (titre seul)                     │  │  │  │
    │  │  │  └───────────────────────────────────────────┘  │  │  │
    │  │  │  ┌───────────────────────────────────────────┐  │  │  │
    │  │  │  │  GridArea (text + cards)                  │  │  │  │
    │  │  │  │                                           │  │  │  │
    │  │  │  │  MOBILE:     DESKTOP (lg:):               │  │  │  │
    │  │  │  │  "text"      "card1  text"                │  │  │  │
    │  │  │  │  "card1"     "card1  card2"               │  │  │  │
    │  │  │  │  "card2"     ".      card3"               │  │  │  │
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
  -->
*/
import bachataDebutant from '~/assets/images/bachataDebutant.jpg';
import coursPrivé from '~/assets/images/coursPrivé.jpg';
import kizomba from '~/assets/images/kizomba.jpg';
</script>

<style scoped>
/**
 * LANDING FEATURE STYLES - CSS Nesting + BEM strict
 *
 * Section avec grille asymétrique
 * @dev Fond clair, layout en grid-areas
 * @dev CSS Nesting natif (pas SASS)
 */

/* Block */
.landing-feature {
  position: relative;
  background-color: var(--bg-subtle);
  overflow: hidden;

  /* Element: Subtitle */
  .landing-feature__subtitle {
    color: var(--primary);
  }
}
</style>
