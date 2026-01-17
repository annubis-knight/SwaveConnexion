<template>
  <section class="landing-feature py-16 lg:py-24">
    <LayoutContainerMax>
      <!-- Titre + Text dans GridResponsive -->
      <LayoutGridResponsive class="mb-40">
        <!-- Titre: full width mobile, colonnes 1-7 desktop -->
        <Heading :level="2" class="col-span-full">
          LE MEILLEUR APPRENTISSAGE,<br />
          <span class="landing-feature__subtitle">C'EST CELUI AVEC LE SOURIRE</span>
        </Heading>

        <!-- Text: full width mobile, colonnes 8-12 desktop -->
        <Text class="col-span-4 md:col-span-8 lg:col-span-5 lg:col-start-8">
          Découvre SwaveConnexion, l'école de bachata la plus fun et sensuelle de Montréal !
          Viens te connecter au rythme, à l'énergie et à la passion. Que tu sois débutant ou
          confirmé, notre équipe dynamique t'accompagne pour danser, progresser et vibrer à
          chaque pas. Rejoins la vibe Swave !
        </Text>
      </LayoutGridResponsive>

      <!-- GridGolden avec 3 CardFeature -->
      <LayoutGridGolden gap="md">
          <template #primary>
            <CardFeature
              :image="bachataImage"
              image-alt="Cours de Bachata débutant"
              title="Bachata Débutant"
              description="Apprenez les bases de la bachata dans une ambiance conviviale. Parfait pour débuter votre aventure dansante."
              format="portrait"
              layout="overlay"
              text-color="white"
            />
          </template>

          <template #secondary>
            <CardFeature
              :image="kizombaImage"
              image-alt="Cours de Kizomba"
              title="Kizomba"
              description="Explorez la sensualité de la kizomba avec nos instructeurs passionnés."
              format="portrait"
              layout="overlay"
              text-color="white"
            />
          </template>

          <template #tertiary>
            <CardFeature
              :image="coursPriveImage"
              image-alt="Cours privés personnalisés"
              title="Cours Privés"
              description="Sessions personnalisées pour progresser rapidement. Idéal pour les couples ou ceux qui veulent perfectionner leur technique."
              format="landscape"
              layout="overlay"
              text-color="white"
            />
          </template>
        </LayoutGridGolden>
    </LayoutContainerMax>
  </section>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────┐
  │                      LANDING FEATURE                        │
  │  ┌───────────────────────────────────────────────────────┐  │
  │  │  section.landing-feature                              │  │
  │  │    └─ LayoutContainerMax                              │  │
  │  │         ├─ LayoutGridResponsive (header)              │  │
  │  │         │    ├─ Heading (col-span-full)               │  │
  │  │         │    └─ Text (col 8-12 desktop)               │  │
  │  │         └─ LayoutGridGolden                           │  │
  │  │              ├─ #primary: CardFeature (Bachata)       │  │
  │  │              ├─ #secondary: CardFeature (Kizomba)     │  │
  │  │              └─ #tertiary: CardFeature (Privés)       │  │
  │  └───────────────────────────────────────────────────────┘  │
  │                                                             │
  │  Desktop:                      Mobile:                      │
  │  ┌────────────┬───────┐        ┌──────────────────┐         │
  │  │  Bachata   │Kizomba│        │     Bachata      │         │
  │  │  (61.8%)   │(38.2%)│        ├──────────────────┤         │
  │  ├────────────┴───────┤        │     Kizomba      │         │
  │  │    Cours Privés    │        ├──────────────────┤         │
  │  └────────────────────┘        │   Cours Privés   │         │
  │                                └──────────────────┘         │
  │                                                             │
  │  Props: Aucune (données hardcodées pour démo)               │
  │                                                             │
  │  Events: Aucun (section de présentation)                    │
  │                                                             │
  │  Slots: Aucun                                               │
  └─────────────────────────────────────────────────────────────┘

  @dev Utilise GridGolden pour layout golden ratio
  @dev 3 CardFeature en mode overlay avec images grayscale
  @dev Fond subtil pour contraste avec sections adjacentes
*/

import bachataImage from '~/assets/images/bachataDebutant.jpg';
import kizombaImage from '~/assets/images/kizomba.jpg';
import coursPriveImage from '~/assets/images/coursPrivé.jpg';
</script>

<style scoped>
.landing-feature {
  background-color: var(--bg-subtle);

  /* Element: Subtitle */
  .landing-feature__subtitle {
    color: var(--primary);
  }
}

/* Cards hover group effect - CSS pur avec :has() */
.landing-feature :deep(.card-feature) {
  transition: transform 0.3s ease-in-out;
}

/* Quand une card est hover : scale up */
.landing-feature :deep(.card-feature:hover) {
  transform: scale(1.02);
  z-index: 10;
}

/* Quand la section contient une card hover : scale down les autres */
.landing-feature:has(.card-feature:hover) :deep(.card-feature:not(:hover)) {
  transform: scale(0.98);
}
</style>
