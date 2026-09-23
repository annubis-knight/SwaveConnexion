<template>
  <section class="seasons-poster py-16 lg:py-24" data-theme="dark">
    <LayoutContainerMax class="seasons-poster__container">
      <p v-if="ruleStartLeft || ruleStartRight" class="seasons-poster__rule">
        <span>{{ ruleStartLeft }}</span>
        <span>{{ ruleStartRight }}</span>
      </p>

      <Heading :level="2" color="white">
        {{ titleLine1 }}
        <span class="seasons-poster__accent">{{ titleLine2 }}</span>
      </Heading>

      <div class="seasons-poster__list">
        <article
          v-for="season in seasons"
          :key="season.number"
          class="seasons-poster__item"
        >
          <span class="seasons-poster__year">{{ season.year }}</span>

          <div class="seasons-poster__frame">
            <SeasonPlayer :video-id="season.videoId" :title="season.title" />
            <span class="seasons-poster__outline" aria-hidden="true">
              {{ season.number }}
            </span>
          </div>

          <div class="seasons-poster__foot">
            <Text as="span" size="lg" weight="bold" color="white">
              {{ season.title }}
            </Text>
            <Text v-if="season.text" size="sm" weight="light" color="white">
              {{ season.text }}
            </Text>
          </div>
        </article>
      </div>

      <p
        v-if="ruleEndLeft || ruleEndRight"
        class="seasons-poster__rule seasons-poster__rule--end"
      >
        <span>{{ ruleEndLeft }}</span>
        <span>{{ ruleEndRight }}</span>
      </p>
    </LayoutContainerMax>
  </section>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────┐
  │                    PAGE SEASONS POSTER                       │
  │  ┌───────────────────────────────────────────────────────┐  │
  │  │  section.seasons-poster (fond noir + grain)           │  │
  │  │    └─ LayoutContainerMax                              │  │
  │  │         ├─ p.__rule (mentions, filet haut)            │  │
  │  │         ├─ Heading (titre + accent)                   │  │
  │  │         ├─ .__list                                    │  │
  │  │         │    └─ article.__item                        │  │
  │  │         │         ├─ span.__year (vertical, bleu)     │  │
  │  │         │         ├─ .__frame                         │  │
  │  │         │         │    ├─ SeasonPlayer                │  │
  │  │         │         │    └─ span.__outline (numero)     │  │
  │  │         │         └─ .__foot (titre + description)    │  │
  │  │         └─ p.__rule--end (mentions, filet bas)        │  │
  │  └───────────────────────────────────────────────────────┘  │
  │                                                             │
  │  Props:                                                     │
  │    • seasons: SeasonPoster[] (requis) - Les saisons         │
  │    • titleLine1: string (requis) - Debut du titre           │
  │    • titleLine2?: string - Fin du titre, en bleu            │
  │    • ruleStartLeft/Right?: string - Mentions du filet haut  │
  │    • ruleEndLeft/Right?: string - Mentions du filet bas     │
  │                                                             │
  │  Events: Aucun (la lecture est interne a SeasonPlayer)      │
  │  Slots: Aucun (donnees via props)                           │
  └─────────────────────────────────────────────────────────────┘

  @dev Mise en page d'affiche : le dessin repose sur la composition
       (grain, filets typographiques, numero en contour qui deborde du
       cadre), pas sur des animations.
  @dev Les vignettes YouTube ne chargent rien avant le clic (cf. SeasonPlayer).
*/

export interface SeasonPoster {
  /* Annee affichee a la verticale, dans la tranche gauche */
  year: string;
  /* Numero de saison, repris en tres grand et en contour sur le cadre */
  number: string;
  videoId: string;
  title: string;
  text?: string;
}

interface Props {
  seasons: SeasonPoster[];
  titleLine1: string;
  titleLine2?: string;
  ruleStartLeft?: string;
  ruleStartRight?: string;
  ruleEndLeft?: string;
  ruleEndRight?: string;
}

withDefaults(defineProps<Props>(), {
  titleLine2: '',
  ruleStartLeft: '',
  ruleStartRight: '',
  ruleEndLeft: '',
  ruleEndRight: '',
});
</script>

<style scoped>
/**
 * PAGE SEASONS POSTER - BEM strict
 * Affiche de scène : grain, filets typographiques, numéro en contour.
 */

.seasons-poster {
  position: relative;
  overflow: hidden;
  /* z-index : passe devant le watermark fixe de PageBenefitsAlternate */
  z-index: 1;
  background-color: #0b0b0b;
}

/* Même texture que le hero de la landing */
.seasons-poster::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('~/assets/images/grain.svg');
  background-size: 256px;
  opacity: 0.2;
  pointer-events: none;
}

.seasons-poster__container {
  position: relative;
  z-index: 1;
}

.seasons-poster__accent {
  color: var(--primary-light);
}

/* Filets d'affiche : une ligne de mentions en haut, une en bas */
.seasons-poster__rule {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.25rem 1.5rem;
  margin: 0 0 2rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.22);
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
}

.seasons-poster__rule--end {
  margin: 3.5rem 0 0;
  padding: 0.75rem 0 0;
  border-top: 1px solid rgba(255, 255, 255, 0.22);
  border-bottom: none;
}

.seasons-poster__list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3.5rem;
  margin-top: 2.5rem;

  /* Deux affiches côte à côte seulement quand la page est assez large pour
     que chacune reste lisible */
  @media (min-width: 1280px) {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }
}

.seasons-poster__item {
  display: grid;
  grid-template-columns: 1.5rem 1fr;
  /*
    Sans align-content, les deux affiches etant etirees a la meme hauteur par
    la grille parente, celle qui a le texte le plus court redistribue l'espace
    libre a parts egales entre ses rangees : sa video grandissait et son texte
    descendait de ~11px par rapport a sa voisine.
  */
  align-content: start;
  column-gap: 1rem;
  /* Laisse passer le numéro en contour, qui descend sous le cadre */
  row-gap: 2.75rem;
  /* Empilées, les affiches gardent une largeur d'affiche */
  max-width: 680px;

  @media (min-width: 1280px) {
    max-width: none;
  }
}

/*
  span 2 et non 1 / -1 : sans grid-template-rows déclaré, la grille explicite
  n'a aucune ligne et -1 retombe sur la première — le pied de l'affiche irait
  alors se loger dans cette colonne de 1.5rem.
*/
.seasons-poster__year {
  grid-row: 1 / span 2;
  /* Cale l'annee en haut du cadre : quatre chiffres ne remplissent pas la
     tranche, centres ils flotteraient loin de la video */
  align-self: start;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: 0.3em;
  text-transform: uppercase;
  white-space: nowrap;
  color: var(--primary-light);
}

/* Angles nets : une affiche ne s'accommode pas de coins arrondis */
.seasons-poster__frame {
  position: relative;
}

.seasons-poster__frame :deep(.season-player) {
  border-radius: 0;
}

.seasons-poster__outline {
  position: absolute;
  right: -0.25rem;
  bottom: -1.75rem;
  font-family: var(--font-display);
  font-size: clamp(3.5rem, 10vw, 6.5rem);
  font-weight: var(--font-black);
  line-height: 0.78;
  color: transparent;
  -webkit-text-stroke: 1px var(--primary-light);
  font-variant-numeric: tabular-nums;
}

.seasons-poster__foot {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  align-items: flex-start;
}
</style>
