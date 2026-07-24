<template>
  <section class="landing-feature py-16 lg:py-24" data-theme="light">
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
          Découvre SwaveConnection, l'école de bachata la plus fun et sensuelle de Montréal !
          Viens te connecter au rythme, à l'énergie et à la passion. Que tu sois débutant ou
          confirmé, notre équipe dynamique t'accompagne pour danser, progresser et vibrer à
          chaque pas. Rejoins la vibe Swave !
        </Text>
      </LayoutGridResponsive>

      <!-- GridGolden 1 : Sensual, Team, Débutant -->
      <LayoutGridGolden gap="md">
          <template #primary>
            <CardFeature
              :image="sensualImage"
              image-alt="Cours de Bachata Sensual"
              title="Bachata Sensual"
              description="Explore la connexion profonde entre partenaires. Body waves, isolations et musicalité avancée."
              to="/bachata-sensual-cours"
              format="portrait"
              layout="overlay"
              text-color="white"
            />
          </template>

          <template #secondary>
            <CardFeature
              :image="teamImage"
              image-alt="Bachata Team chorégraphie"
              title="Bachata Team"
              description="Rejoins une équipe de danseurs passionnés et monte sur scène ensemble. Chorégraphies complètes et performances."
              to="/bachata-team"
              format="portrait"
              layout="overlay"
              text-color="white"
            />
          </template>

          <template #tertiary>
            <CardFeature
              :image="bachataImage"
              image-alt="Cours de Bachata débutant"
              title="Bachata Débutant"
              description="Apprenez les bases de la bachata dans une ambiance conviviale. Parfait pour débuter votre aventure dansante."
              :href="BOOKING_LINKS.bachata"
              external
              format="landscape"
              layout="overlay"
              text-color="white"
            />
          </template>
        </LayoutGridGolden>

      <!-- GridGolden 2 : Cours Privés, Lady Styling -->
      <LayoutGridGolden gap="md" class="mt-6 lg:mt-40">
          <template #primary>
            <CardFeature
              :image="coursPriveImage"
              image-alt="Cours privés personnalisés"
              title="Cours Privés"
              description="Un accompagnement sur-mesure pour progresser à ton rythme. Objectifs personnalisés et attention exclusive."
              to="/bachata-cours-prives"
              format="portrait"
              layout="overlay"
              text-color="white"
            />
          </template>

          <template #secondary>
            <CardFeature
              :image="ladyStyleImage"
              image-alt="Cours de Lady Styling"
              title="Lady Styling"
              description="Développe ta féminité et ton expression personnelle. Techniques de bras, isolations, tours et body movement."
              :href="BOOKING_LINKS.ladystyle"
              external
              format="portrait"
              layout="overlay"
              text-color="white"
            />
          </template>

          <template #tertiary>
            <!-- Slot vide : seulement 5 cours -->
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
  │  │         ├─ LayoutGridGolden #1                         │  │
  │  │         │    ├─ #primary: CardFeature (Débutant)      │  │
  │  │         │    ├─ #secondary: CardFeature (Sensual)     │  │
  │  │         │    └─ #tertiary: CardFeature (Privés)       │  │
  │  │         └─ LayoutGridGolden #2                         │  │
  │  │              ├─ #primary: CardFeature (Lady Style)    │  │
  │  │              ├─ #secondary: CardFeature (Team)        │  │
  │  │              └─ #tertiary: (vide)                     │  │
  │  └───────────────────────────────────────────────────────┘  │
  │                                                             │
  │  5 CardFeature cliquables -> pages cours respectives        │
  │                                                             │
  │  Props: Aucune (données hardcodées)                         │
  │                                                             │
  │  Events: Aucun (navigation via NuxtLink)                    │
  │                                                             │
  │  Slots: Aucun                                               │
  └─────────────────────────────────────────────────────────────┘

  @dev Utilise GridGolden pour layout golden ratio
  @dev 3 CardFeature en mode overlay avec images grayscale
  @dev Fond subtil pour contraste avec sections adjacentes
*/

/* Images servies depuis public/ pour optimisation @nuxt/image (NuxtImg) */
const bachataImage = '/images/cours-debutant.jpg';
const sensualImage = '/images/cours-sensual.png';
const coursPriveImage = '/images/cours-prive.jpg';
const ladyStyleImage = '/images/cours-lady-style.png';
const teamImage = '/images/cours-team.png';
</script>

<style scoped>
.landing-feature {
  background-color: var(--bg-subtle);

  /* Element: Subtitle */
  .landing-feature__subtitle {
    color: var(--primary);
  }
}

/* Cards hover group effect - desktop only */
@media (min-width: 1024px) {
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
}
</style>
