<template>
  <div class="page-team-test">
    <!-- Bandeau de test, jamais destiné à la production -->
    <div class="page-team-test__banner">
      <LayoutContainerMax>
        <Text as="p" size="sm" weight="medium" color="white">
          Page de test, hors production. Dix propositions de section pour les
          chorégraphies des saisons passées.
        </Text>
      </LayoutContainerMax>
    </div>

    <!-- ═══════════════════════════════════════════════════════════════════════
         A. ARCHIVES ÉDITORIALES : zigzag, gros numéro de saison, cadre décalé
    ═══════════════════════════════════════════════════════════════════════ -->
    <p class="page-team-test__label">Proposition A · Archives éditoriales</p>

    <section class="variant-a py-16 lg:py-24" data-theme="light">
      <LayoutContainerMax>
        <Heading :level="2">
          NOS SAISONS
          <span class="variant-a__accent">SUR SCÈNE</span>
        </Heading>

        <Text weight="light" leading="relaxed" max-width="lg" class="variant-a__intro">
          Chaque saison, la team monte une chorégraphie et la présente sur
          scène. Voici celles des années précédentes.
        </Text>

        <div class="variant-a__list">
          <article
            v-for="(season, index) in seasons"
            :key="season.number"
            class="variant-a__item"
            :class="{ 'variant-a__item--reverse': index % 2 === 1 }"
          >
            <div class="variant-a__visual">
              <span class="variant-a__number">{{ season.number }}</span>
              <div class="variant-a__player-wrap">
                <SeasonPlayer
                  :video-id="season.videoId"
                  :title="season.title"
                />
                <div class="variant-a__frame" aria-hidden="true"></div>
              </div>
            </div>

            <div class="variant-a__content">
              <LabelSwave :show-icon="false">{{ season.label }}</LabelSwave>
              <Heading :level="3" transform="uppercase">{{ season.title }}</Heading>
              <Text weight="light" leading="relaxed">{{ season.text }}</Text>
            </div>
          </article>
        </div>
      </LayoutContainerMax>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════════
         B. BANDE SOMBRE : contraste fort, numéros en filigrane
    ═══════════════════════════════════════════════════════════════════════ -->
    <p class="page-team-test__label">Proposition B · Bande sombre</p>

    <section class="variant-b py-16 lg:py-24" data-theme="dark">
      <LayoutContainerMax>
        <div class="variant-b__head">
          <Text
            as="span"
            size="sm"
            weight="semibold"
            transform="uppercase"
            tracking="wide"
            color="primary"
          >
            Les saisons passées
          </Text>
          <Heading :level="2" color="white">DÉJÀ DEUX CHORÉS AU COMPTEUR</Heading>
        </div>

        <div class="variant-b__grid">
          <article
            v-for="season in seasons"
            :key="season.number"
            class="variant-b__item"
          >
            <span class="variant-b__ghost" aria-hidden="true">{{ season.number }}</span>
            <SeasonPlayer
              :video-id="season.videoId"
              :title="season.title"
            />
            <div class="variant-b__caption">
              <Text as="span" size="lg" weight="bold" transform="uppercase" color="white">
                {{ season.title }}
              </Text>
              <Text size="sm" weight="light" color="white">{{ season.text }}</Text>
            </div>
          </article>
        </div>
      </LayoutContainerMax>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════════
         C. PLAYLIST : un grand lecteur, des vignettes à côté
    ═══════════════════════════════════════════════════════════════════════ -->
    <p class="page-team-test__label">Proposition C · Playlist</p>

    <section class="variant-c py-16 lg:py-24" data-theme="light">
      <LayoutContainerMax>
        <Heading :level="2">
          LA TEAM
          <span class="variant-c__accent">EN VIDÉO</span>
        </Heading>

        <div class="variant-c__layout">
          <div class="variant-c__stage">
            <SeasonPlayer
              :key="activeSeason.number"
              :video-id="activeSeason.videoId"
              :title="activeSeason.title"
            />
          </div>

          <div class="variant-c__list">
            <button
              v-for="(season, index) in seasons"
              :key="season.number"
              type="button"
              class="variant-c__pick"
              :class="{ 'variant-c__pick--active': index === activeIndex }"
              :aria-pressed="index === activeIndex"
              @click="activeIndex = index"
            >
              <span class="variant-c__pick-number">{{ season.number }}</span>
              <span class="variant-c__pick-body">
                <Text as="span" size="lg" weight="bold" transform="uppercase" color="dark">
                  {{ season.title }}
                </Text>
                <Text as="span" size="sm" weight="light" color="dark">{{ season.label }}</Text>
              </span>
            </button>
          </div>
        </div>
      </LayoutContainerMax>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════════
         D. FRISE : la progression saison après saison
    ═══════════════════════════════════════════════════════════════════════ -->
    <p class="page-team-test__label">Proposition D · Frise des saisons</p>

    <section class="variant-d py-16 lg:py-24" data-theme="light">
      <LayoutContainerMax>
        <Heading :level="2">
          TROIS SAISONS
          <span class="variant-d__accent">ET ÇA CONTINUE</span>
        </Heading>

        <ol class="variant-d__timeline">
          <li v-for="season in timeline" :key="season.number" class="variant-d__step">
            <div class="variant-d__marker" aria-hidden="true">
              <span class="variant-d__dot" :class="{ 'variant-d__dot--current': season.current }"></span>
            </div>

            <div class="variant-d__body">
              <Text as="span" size="sm" weight="semibold" transform="uppercase" tracking="wide" color="primary">
                {{ season.current ? 'En cours' : season.label }}
              </Text>
              <Heading :level="3" transform="uppercase">{{ season.title }}</Heading>

              <div v-if="season.videoId" class="variant-d__player">
                <SeasonPlayer
                  :video-id="season.videoId"
                  :title="season.title"
                />
              </div>
              <Text v-else weight="light" leading="relaxed">{{ season.text }}</Text>
            </div>
          </li>
        </ol>
      </LayoutContainerMax>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════════
         E. DUO ASYMÉTRIQUE : les deux formats assumés côte à côte
    ═══════════════════════════════════════════════════════════════════════ -->
    <p class="page-team-test__label">Proposition E · Duo asymétrique</p>

    <section class="variant-e py-16 lg:py-24" data-theme="light">
      <LayoutContainerMax>
        <div class="variant-e__head">
          <Heading :level="2">
            CE QU'ON A
            <span class="variant-e__accent">DÉJÀ MONTÉ</span>
          </Heading>
          <Text weight="light" leading="relaxed" max-width="md">
            Deux saisons, deux chorégraphies, deux performances devant un
            public.
          </Text>
        </div>

        <div class="variant-e__duo">
          <figure class="variant-e__major">
            <SeasonPlayer
              :video-id="seasons[0].videoId"
              :title="seasons[0].title"
            />
            <figcaption class="variant-e__cap">
              <span class="variant-e__tag">01</span>
              <Text as="span" size="lg" weight="bold" transform="uppercase" color="dark">
                {{ seasons[0].title }}
              </Text>
            </figcaption>
          </figure>

          <figure class="variant-e__minor">
            <SeasonPlayer
              :video-id="seasons[1].videoId"
              :title="seasons[1].title"
            />
            <figcaption class="variant-e__cap">
              <span class="variant-e__tag">02</span>
              <Text as="span" size="lg" weight="bold" transform="uppercase" color="dark">
                {{ seasons[1].title }}
              </Text>
            </figcaption>
          </figure>
        </div>
      </LayoutContainerMax>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════════
         F. AFFICHE DE SCÈNE : grain, filets typographiques, numéro en contour
    ═══════════════════════════════════════════════════════════════════════ -->
    <p class="page-team-test__label">Proposition F · Affiche de scène</p>

    <section class="variant-f py-16 lg:py-24" data-theme="dark">
      <LayoutContainerMax class="variant-f__container">
        <p class="variant-f__rule">
          <span>Swave Sensual Team</span>
          <span>Montréal · QC</span>
        </p>

        <Heading :level="2" color="white">
          DEUX SAISONS
          <span class="variant-f__accent">À L'AFFICHE</span>
        </Heading>

        <div class="variant-f__posters">
          <article
            v-for="season in seasons"
            :key="season.number"
            class="variant-f__poster"
          >
            <span class="variant-f__side">Saison {{ season.number }}</span>

            <div class="variant-f__frame">
              <SeasonPlayer :video-id="season.videoId" :title="season.title" />
              <span class="variant-f__outline" aria-hidden="true">{{ season.number }}</span>
            </div>

            <div class="variant-f__foot">
              <Text as="span" size="lg" weight="bold" transform="uppercase" color="white">
                {{ season.title }}
              </Text>
              <Text size="sm" weight="light" color="white">{{ season.text }}</Text>
            </div>
          </article>
        </div>

        <p class="variant-f__rule variant-f__rule--end">
          <span>Chorégraphies originales</span>
          <span>Montées par la team</span>
        </p>
      </LayoutContainerMax>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════════
         G. BILLET DE SPECTACLE : souche verticale, perforation, code-barres
    ═══════════════════════════════════════════════════════════════════════ -->
    <p class="page-team-test__label">Proposition G · Billet de spectacle</p>

    <section class="variant-g py-16 lg:py-24" data-theme="light">
      <LayoutContainerMax>
        <Heading :level="2">
          DEUX SOIRS
          <span class="variant-g__accent">SUR SCÈNE</span>
        </Heading>

        <Text weight="light" leading="relaxed" max-width="lg" class="variant-g__intro">
          Chaque saison se termine devant un public. Voici les deux dernières,
          filmées le soir de la performance.
        </Text>

        <div class="variant-g__row">
          <article
            v-for="season in seasons"
            :key="season.number"
            class="variant-g__ticket"
          >
            <div class="variant-g__stub">
              <span class="variant-g__stub-text">Saison {{ season.number }}</span>
            </div>

            <div class="variant-g__body">
              <SeasonPlayer :video-id="season.videoId" :title="season.title" />

              <div class="variant-g__meta">
                <span class="variant-g__meta-text">
                  <Text as="span" size="xs" weight="semibold" transform="uppercase" tracking="wide" color="primary">
                    {{ season.label }}
                  </Text>
                  <Text as="span" size="lg" weight="bold" transform="uppercase" color="dark">
                    {{ season.title }}
                  </Text>
                </span>
                <span class="variant-g__barcode" aria-hidden="true"></span>
              </div>
            </div>
          </article>
        </div>
      </LayoutContainerMax>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════════
         H. REPÈRES MONTRÉAL : trame de plan, croix de repérage, fiche de data
    ═══════════════════════════════════════════════════════════════════════ -->
    <p class="page-team-test__label">Proposition H · Repères Montréal</p>

    <section class="variant-h py-16 lg:py-24" data-theme="light">
      <LayoutContainerMax>
        <div class="variant-h__head">
          <span class="variant-h__coord">45.5019° N · 73.5674° O</span>
          <Heading :level="2">
            MONTÉ ET DANSÉ
            <span class="variant-h__accent">À MONTRÉAL</span>
          </Heading>
        </div>

        <div class="variant-h__spots">
          <article
            v-for="season in seasons"
            :key="season.number"
            class="variant-h__spot"
          >
            <div class="variant-h__frame">
              <SeasonPlayer :video-id="season.videoId" :title="season.title" />
            </div>

            <dl class="variant-h__data">
              <div class="variant-h__row">
                <dt>Saison</dt>
                <dd>{{ season.number }}</dd>
              </div>
              <div class="variant-h__row">
                <dt>Chorégraphie</dt>
                <dd>{{ season.label }}</dd>
              </div>
              <div class="variant-h__row">
                <dt>Lieu</dt>
                <dd>Montréal, QC</dd>
              </div>
            </dl>
          </article>
        </div>
      </LayoutContainerMax>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════════
         I. PLANCHE CONTACT : bande de pellicule, repères de coupe, références
    ═══════════════════════════════════════════════════════════════════════ -->
    <p class="page-team-test__label">Proposition I · Planche contact</p>

    <section class="variant-i py-16 lg:py-24" data-theme="dark">
      <LayoutContainerMax>
        <div class="variant-i__head">
          <Text as="span" size="xs" weight="semibold" transform="uppercase" tracking="wide" color="primary">
            Archives de la team
          </Text>
          <Heading :level="2" color="white">LES CHORÉS, SAISON APRÈS SAISON</Heading>
        </div>

        <div class="variant-i__strip">
          <article
            v-for="season in seasons"
            :key="season.number"
            class="variant-i__item"
          >
            <span class="variant-i__ref">{{ season.number }}A · Saison {{ season.number }}</span>

            <div class="variant-i__frame">
              <SeasonPlayer :video-id="season.videoId" :title="season.title" />
            </div>

            <Text size="sm" weight="light" color="white">{{ season.text }}</Text>
          </article>
        </div>
      </LayoutContainerMax>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════════
         J. LOGO EN TRAME : bande diagonale, logo répété, cartes décalées
    ═══════════════════════════════════════════════════════════════════════ -->
    <p class="page-team-test__label">Proposition J · Logo en trame</p>

    <section class="variant-j py-16 lg:py-24" data-theme="light">
      <div class="variant-j__band" aria-hidden="true"></div>

      <LayoutContainerMax class="variant-j__container">
        <Heading :level="2">
          LA TEAM
          <span class="variant-j__accent">EN MOUVEMENT</span>
        </Heading>

        <div class="variant-j__cards">
          <figure
            v-for="season in seasons"
            :key="season.number"
            class="variant-j__card"
          >
            <SeasonPlayer :video-id="season.videoId" :title="season.title" />

            <figcaption class="variant-j__cap">
              <span class="variant-j__num">{{ season.number }}</span>
              <Text as="span" size="base" weight="bold" transform="uppercase" color="dark">
                {{ season.title }}
              </Text>
            </figcaption>
          </figure>
        </div>
      </LayoutContainerMax>
    </section>
  </div>
</template>

<script setup lang="ts">
/*
  PAGE DE TEST : /team-test

  Dix propositions de section pour mettre en avant les chorégraphies des
  saisons passées de la Swave Sensual Team (preuve sociale).

  A a E : compositions sobres, structurees par la grille.
  F a J : compositions graphiques (affiche, billet, plan, pellicule, trame de
  logo). Aucune animation ni interaction ajoutee : le dessin doit tenir a
  l'arret.

  @dev Page volontairement NON reliée depuis le site : sans lien entrant,
       nuxt generate ne la prerend pas, elle n'existe donc pas en
       production. Elle est aussi exclue du sitemap (nuxt.config) et en
       noindex. À supprimer une fois la proposition choisie.
  @dev Les styles vivent ici plutôt que dans des composants de section :
       seule la variante retenue sera extraite dans app/components/sections.
*/

definePageMeta({
  layout: 'default',
});

useHead({
  title: 'Page de test — sections saisons',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
});

interface Season {
  number: string;
  videoId: string;
  title: string;
  label: string;
  text: string;
}

const seasons: Season[] = [
  {
    number: '01',
    videoId: 'gb-6zdJkbJc',
    title: 'Saison 1',
    label: 'Première chorégraphie',
    text: 'La première chorégraphie montée par la team, présentée sur scène.',
  },
  {
    number: '02',
    videoId: 'M9AuoacjGds',
    title: 'Saison 2',
    label: 'Deuxième chorégraphie',
    text: 'La chorégraphie de la saison suivante, filmée le jour de la performance.',
  },
];

/* Variante C : la vidéo affichée dans le grand lecteur */
const activeIndex = ref(0);
const activeSeason = computed(() => seasons[activeIndex.value]!);

/* Variante D : les saisons passées, plus celle en cours */
const timeline = [
  ...seasons,
  {
    number: '03',
    videoId: '',
    title: 'Saison 3',
    label: 'Saison en cours',
    text: 'La chorégraphie de cette saison est en préparation.',
    current: true,
  },
];
</script>

<style scoped>
/**
 * PAGE DE TEST - Cinq variantes de section "saisons passées"
 * Palette de la page team (bleu profond), pour juger en contexte.
 */

.page-team-test {
  --primary: #0a7eb8;
  --primary-light: #4da8d4;
  --primary-dark: #065a87;
}

/* Bandeau et étiquettes de repérage, hors maquette */
.page-team-test__banner {
  padding: 12px 0;
  background-color: var(--error, #b4231f);
}

.page-team-test__label {
  margin: 0;
  padding: 8px 24px;
  background-color: var(--bg-active);
  color: var(--text-strong);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

/* ============================================================
   A. ARCHIVES ÉDITORIALES
   ============================================================ */
.variant-a {
  background-color: var(--bg-subtle);
}

.variant-a__accent {
  color: var(--primary);
}

.variant-a__intro {
  margin-bottom: 2.5rem;

  @media (min-width: 1024px) {
    margin-bottom: 4rem;
  }
}

/* Respiration proportionnee a l'ecran : 5rem entre deux blocs, c'est un
   demi-ecran de vide sur mobile */
.variant-a__list {
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media (min-width: 1024px) {
    gap: 5rem;
  }
}

.variant-a__item {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: center;

  /*
    Deux colonnes seulement a partir de 1280px : a 1024px, la video tombait
    a 316px de large alors qu'elle en faisait 604 sur un ecran plus petit.
    Colonnes egales, car les rangees alternent via order : des colonnes
    inegales donneraient des videos de tailles differentes d'une rangee a
    l'autre.
  */
  @media (min-width: 1280px) {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }
}

.variant-a__item--reverse .variant-a__visual {
  @media (min-width: 1280px) {
    order: 2;
  }
}

/*
  Colonne de largeur fixe pour le numero : en flux libre, "01" est plus
  etroit que "02" (le 1 est moins large que le 2 dans la police d'affichage)
  et la video n'avait pas la meme largeur d'une rangee a l'autre.
*/
.variant-a__visual {
  position: relative;
  display: grid;
  /* Mobile : le numero passe au-dessus, il prenait un tiers de la largeur
     au detriment de la video */
  grid-template-columns: 1fr;
  align-items: center;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: clamp(3rem, 8vw, 6rem) 1fr;
    gap: 1.5rem;
  }

  /* Deux colonnes : le numero se resserre pour ne pas prendre la place de
     la video, qui n'a plus que la moitie de la page */
  @media (min-width: 1280px) {
    grid-template-columns: 4.5rem 1fr;
    gap: 1rem;
  }
}

/* Numéro de saison, très grand et discret */
.variant-a__number {
  font-family: var(--font-display);
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 700;
  line-height: 1;
  color: var(--primary);
  opacity: 0.18;
  font-variant-numeric: tabular-nums;
}

/* Plafond de largeur : en une seule colonne, la video occuperait toute la
   largeur du conteneur */
.variant-a__player-wrap {
  position: relative;
  max-width: 640px;
}

/* Cadre fin décalé, comme sur les pages cours */
.variant-a__frame {
  position: absolute;
  inset: 0;
  transform: translate(12px, 12px);
  border: 1px solid var(--primary);
  border-radius: 12px;
  pointer-events: none;
}

.variant-a__content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: flex-start;
}

/* ============================================================
   B. BANDE SOMBRE
   ============================================================ */
.variant-b {
  background-color: var(--bg-invert);
}

.variant-b__head {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 3rem;
}

.variant-b__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: start;

  /* Colonnes egales (les deux saisons ont le meme statut), a partir de
     1024px seulement : a 768px chaque video tombait a 325px de large */
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
  }
}

/* Empilees, les videos sont bridees et centrees : sans plafond elles
   passeraient de 690px a 434px en franchissant le breakpoint */
.variant-b__item {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 480px;
  margin-inline: auto;

  @media (min-width: 1024px) {
    max-width: none;
    margin-inline: 0;
  }
}

/* Numéro fantôme derrière le lecteur */
.variant-b__ghost {
  position: absolute;
  top: -2.5rem;
  left: -0.5rem;
  z-index: 0;
  font-family: var(--font-display);
  font-size: clamp(4rem, 10vw, 8rem);
  font-weight: 700;
  line-height: 1;
  color: var(--text-inverse);
  opacity: 0.12;
  pointer-events: none;
}

.variant-b__caption {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

/* ============================================================
   C. PLAYLIST
   ============================================================ */
.variant-c {
  background-color: var(--bg-base);
}

.variant-c__accent {
  color: var(--primary);
}

.variant-c__layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 3rem;
  align-items: start;

  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr;
    gap: 3rem;
  }
}

.variant-c__stage {
  width: 100%;
}

.variant-c__list {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  /* Sous le lecteur, les deux vignettes se partagent la largeur plutot que
     de former deux bandes pleine page */
  @media (min-width: 640px) and (max-width: 1023px) {
    flex-direction: row;
  }
}

.variant-c__pick {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid var(--border-base);
  border-radius: 12px;
  background-color: var(--bg-base);
  text-align: left;
  cursor: pointer;
  transition: border-color 0.25s ease, background-color 0.25s ease;

  /* En ligne, les deux vignettes se partagent la largeur a parts egales */
  @media (min-width: 640px) and (max-width: 1023px) {
    flex: 1;
  }
}

.variant-c__pick:hover {
  border-color: var(--primary);
}

.variant-c__pick--active {
  border-color: var(--primary);
  background-color: var(--bg-subtle);
}

.variant-c__pick-number {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: 700;
  line-height: 1;
  color: var(--primary);
}

.variant-c__pick-body {
  display: flex;
  flex-direction: column;
}

/* ============================================================
   D. FRISE DES SAISONS
   ============================================================ */
.variant-d {
  background-color: var(--bg-subtle);
}

.variant-d__accent {
  color: var(--primary);
}

.variant-d__timeline {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin: 3rem 0 0;
  padding: 0;
  list-style: none;
}

/* La frise mange 48px de largeur (colonne + gouttiere) : on la resserre
   tant que l'ecran est etroit */
.variant-d__step {
  display: grid;
  grid-template-columns: 24px 1fr;
  gap: 1rem;

  @media (min-width: 768px) {
    gap: 1.5rem;
  }
}

/* Ligne verticale reliant les jalons */
.variant-d__marker {
  position: relative;
  display: flex;
  justify-content: center;
}

.variant-d__marker::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: -3rem;
  width: 1px;
  background-color: var(--border-base);
}

.variant-d__step:last-child .variant-d__marker::before {
  bottom: auto;
  height: 12px;
}

.variant-d__dot {
  position: relative;
  width: 12px;
  height: 12px;
  margin-top: 6px;
  border-radius: 999px;
  background-color: var(--primary);
}

.variant-d__dot--current {
  background-color: var(--bg-base);
  border: 2px solid var(--primary);
}

.variant-d__body {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
}

.variant-d__player {
  width: 100%;
  max-width: 460px;
  margin-top: 0.5rem;

  @media (min-width: 1024px) {
    max-width: 560px;
  }
}

/* ============================================================
   E. DUO ASYMÉTRIQUE
   ============================================================ */
.variant-e {
  background-color: var(--bg-base);
}

.variant-e__accent {
  color: var(--primary);
}

.variant-e__head {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 3rem;
}

.variant-e__duo {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: end;

  /* Asymetrie a partir de 1024px seulement : a 768px, le petit lecteur
     tombait a 240px de large */
  @media (min-width: 1024px) {
    grid-template-columns: 1.7fr 1fr;
    gap: 2.5rem;
  }
}

.variant-e__major,
.variant-e__minor {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Asymétrie d'échelle : le second lecteur, plus petit, est décalé vers le bas
   pour que les deux blocs se répondent au lieu de s'aligner platement */
.variant-e__minor {
  @media (min-width: 1024px) {
    margin-bottom: -3rem;
  }
}

.variant-e__cap {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.variant-e__tag {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 700;
  line-height: 1;
  color: var(--primary);
}

/* ============================================
   F. AFFICHE DE SCÈNE
   Grain, filets typographiques, numéro en contour qui déborde du cadre.
   ============================================ */
.variant-f {
  position: relative;
  overflow: hidden;
  background-color: #0b0b0b;
}

/* Même texture que le hero de la landing */
.variant-f::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('~/assets/images/grain.svg');
  background-size: 256px;
  opacity: 0.2;
  pointer-events: none;
}

.variant-f__container {
  position: relative;
  z-index: 1;
}

.variant-f__accent {
  color: var(--primary-light);
}

/* Filets d'affiche : une ligne de mentions en haut, une en bas */
.variant-f__rule {
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

.variant-f__rule--end {
  margin: 3.5rem 0 0;
  padding: 0.75rem 0 0;
  border-top: 1px solid rgba(255, 255, 255, 0.22);
  border-bottom: none;
}

.variant-f__posters {
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

.variant-f__poster {
  display: grid;
  grid-template-columns: 1.5rem 1fr;
  /* Voir PageSeasonsPoster : sans align-content, l'affiche au texte le plus
     court etire ses rangees et desaligne sa video de sa voisine */
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
  span 2 et non 1 / -1 : sans grid-template-rows declare, la grille explicite
  n'a aucune ligne et -1 retombe sur la premiere — le pied de l'affiche allait
  alors se loger dans cette colonne de 1.5rem.
*/
.variant-f__side {
  grid-row: 1 / span 2;
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
.variant-f__frame {
  position: relative;
}

.variant-f__frame :deep(.season-player) {
  border-radius: 0;
}

.variant-f__outline {
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

.variant-f__foot {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  align-items: flex-start;
}

/* ============================================
   G. BILLET DE SPECTACLE
   Souche verticale, perforation, encoches, code-barres.
   ============================================ */
.variant-g {
  background-color: var(--bg-subtle);
}

.variant-g__accent {
  color: var(--primary);
}

.variant-g__intro {
  margin-bottom: 2.5rem;

  @media (min-width: 1024px) {
    margin-bottom: 3.5rem;
  }
}

.variant-g__row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;

  @media (min-width: 1280px) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
}

/* Un billet a une largeur de billet : empilé, il est bridé et centré plutôt
   qu'étiré sur toute la page */
.variant-g__ticket {
  position: relative;
  display: grid;
  grid-template-columns: 2.5rem 1fr;
  width: 100%;
  max-width: 580px;
  margin-inline: auto;
  background-color: var(--bg-base);
  border: 1px solid var(--border-strong);

  @media (min-width: 1280px) {
    max-width: none;
    margin-inline: 0;
  }
}

/*
  Encoches de perforation : deux disques de la couleur du fond, à cheval sur
  le bord. Ils interrompent le filet du billet, ce qui suffit à lire le
  découpage — pas de bordure sur le disque, sinon l'arc déborde à l'extérieur.
*/
.variant-g__ticket::before,
.variant-g__ticket::after {
  content: '';
  position: absolute;
  left: 2.5rem;
  width: 14px;
  height: 14px;
  border-radius: 999px;
  background-color: var(--bg-subtle);
}

.variant-g__ticket::before {
  top: 0;
  transform: translate(-50%, -50%);
}

.variant-g__ticket::after {
  bottom: 0;
  transform: translate(-50%, 50%);
}

.variant-g__stub {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem 0;
  background-color: var(--primary);
  border-right: 1px dashed rgba(255, 255, 255, 0.6);
}

.variant-g__stub-text {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: var(--font-bold);
  letter-spacing: 0.28em;
  text-transform: uppercase;
  white-space: nowrap;
  color: var(--text-inverse);
}

.variant-g__body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

.variant-g__body :deep(.season-player) {
  border-radius: 0;
}

.variant-g__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
}

.variant-g__meta-text {
  display: flex;
  flex-direction: column;
}

/* Code-barres décoratif : une simple trame de traits */
.variant-g__barcode {
  width: 118px;
  height: 38px;
  background-image: repeating-linear-gradient(
    90deg,
    var(--text-strong) 0 2px,
    transparent 2px 5px,
    var(--text-strong) 5px 6px,
    transparent 6px 10px
  );
  opacity: 0.8;
}

/* ============================================
   H. REPÈRES MONTRÉAL
   Trame de plan, croix de repérage aux angles, fiche de relevé.
   ============================================ */
.variant-h {
  background-color: var(--bg-base);
  /* Quadrillage de plan, dessiné en CSS (aucune image à charger) */
  background-image:
    linear-gradient(color-mix(in srgb, var(--primary) 12%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--primary) 12%, transparent) 1px, transparent 1px);
  background-size: 48px 48px;
}

.variant-h__accent {
  color: var(--primary);
}

.variant-h__head {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2.5rem;
}

.variant-h__coord {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--primary);
}

.variant-h__spots {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;

  @media (min-width: 1280px) {
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
  }
}

.variant-h__spot {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  max-width: 640px;

  @media (min-width: 1280px) {
    max-width: none;
  }
}

/* Le cadre blanc masque le quadrillage : la vidéo se pose sur le plan */
.variant-h__frame {
  position: relative;
  padding: 10px;
  background-color: var(--bg-base);
  outline: 1px solid var(--border-base);
}

/* Croix de repérage, en haut à gauche et en bas à droite */
.variant-h__frame::before,
.variant-h__frame::after {
  content: '';
  position: absolute;
  width: 14px;
  height: 14px;
  background-image:
    linear-gradient(var(--primary) 0 0),
    linear-gradient(var(--primary) 0 0);
  background-size: 14px 1px, 1px 14px;
  background-position: center;
  background-repeat: no-repeat;
}

.variant-h__frame::before {
  top: -7px;
  left: -7px;
}

.variant-h__frame::after {
  right: -7px;
  bottom: -7px;
}

.variant-h__frame :deep(.season-player) {
  border-radius: 0;
}

.variant-h__data {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0;
}

.variant-h__row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-base);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
}

.variant-h__row dt {
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-subtle);
}

.variant-h__row dd {
  margin: 0;
  font-weight: var(--font-semibold);
  color: var(--text-strong);
}

/* ============================================
   I. PLANCHE CONTACT
   Bande de pellicule perforée, repères de coupe, références de planche.
   ============================================ */
.variant-i {
  background-color: #101010;
}

.variant-i__head {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2.5rem;
}

.variant-i__strip {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  padding: 2.75rem 1rem;
  background-color: #1a1a1a;

  /* Une planche contact est une grille de petites vignettes : ici, deux
     colonnes dès que la largeur le permet, contrairement aux autres
     variantes qui privilégient une grande vidéo */
  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
    gap: 1.75rem;
    padding: 2.75rem 1.75rem;
  }
}

/* Perforations de pellicule, haut et bas de la bande */
.variant-i__strip::before,
.variant-i__strip::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 10px;
  background-image: repeating-linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.8) 0 12px,
    transparent 12px 28px
  );
  /* Motif centre : la bande se coupe symetriquement aux deux bouts plutot
     que de trancher une perforation a droite */
  background-size: 28px 10px;
  background-position: center;
}

.variant-i__strip::before {
  top: 10px;
}

.variant-i__strip::after {
  bottom: 10px;
}

.variant-i__item {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.variant-i__ref {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: var(--font-bold);
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--primary-light);
}

/* Repères de coupe : deux équerres en diagonale */
.variant-i__frame {
  position: relative;
}

.variant-i__frame::before,
.variant-i__frame::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  border: 1px solid rgba(255, 255, 255, 0.55);
}

.variant-i__frame::before {
  top: -8px;
  left: -8px;
  border-right: none;
  border-bottom: none;
}

.variant-i__frame::after {
  right: -8px;
  bottom: -8px;
  border-left: none;
  border-top: none;
}

.variant-i__frame :deep(.season-player) {
  border-radius: 0;
}

/* ============================================
   J. LOGO EN TRAME
   Bande diagonale, logo de la marque répété en motif, cartes décalées.
   ============================================ */
.variant-j {
  position: relative;
  overflow: hidden;
  background-color: var(--bg-base);
}

.variant-j__band {
  position: absolute;
  inset: 0;
  background-color: color-mix(in srgb, var(--primary) 9%, transparent);
  clip-path: polygon(0 6%, 100% 26%, 100% 96%, 0 74%);
}

/* Le logo devient une texture : répété, très clair, jamais lisible comme un
   logo isolé (il reste un motif, pas une signature) */
.variant-j__band::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('/images/logo_alpha.png');
  background-size: 104px;
  background-repeat: repeat;
  opacity: 0.07;
}

.variant-j__container {
  position: relative;
  z-index: 1;
}

.variant-j__accent {
  color: var(--primary);
}

.variant-j__cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 2.5rem;

  @media (min-width: 1280px) {
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
    align-items: start;
  }
}

.variant-j__card {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  max-width: 620px;
  margin-inline: auto;
  padding: 0.75rem;
  background-color: var(--bg-base);
  border: 1px solid var(--border-base);

  @media (min-width: 1280px) {
    max-width: none;
    margin-inline: 0;
  }
}

/* Décalage fixe : la seconde carte suit la pente de la bande */
.variant-j__card:nth-child(2) {
  @media (min-width: 1280px) {
    margin-top: 3.5rem;
  }
}

.variant-j__card :deep(.season-player) {
  border-radius: 0;
}

.variant-j__cap {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0 0.25rem 0.25rem;
}

.variant-j__num {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  line-height: 1;
  color: var(--primary);
}
</style>
