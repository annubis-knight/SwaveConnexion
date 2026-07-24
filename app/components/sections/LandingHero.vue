<template>
  <section class="landing-hero" data-theme="dark">
    <!-- Background image: remplit l'espace, s'adapte au contenu -->
    <NuxtImg
      src="/images/heroSwave6alpha.png"
      alt="Swave illustration"
      class="landing-hero__bg"
      sizes="xs:320px sm:640px md:768px lg:1024px xl:1280px xxl:1280px"
      format="webp"
      densities="x1 x2"
      preload
      loading="eager"
      fetchpriority="high"
      decoding="async"
    />

    <!-- CONTENT-FIRST: c'est ce bloc qui définit la taille de la section -->
    <LayoutContainerMax class="relative">
      <div class="landing-hero__content py-8 lg:py-12">
        <Heading :level="1" color="white" class="display">
          <span class="landing-hero__line text-shadow-md">
            <span>MAKE</span>
            <span>IT</span>
          </span>
          <span class="landing-hero__line text-shadow-md">SMOOTH</span>
        </Heading>
        <div>
          <Text color="white" max-width="md" class="relative z-5 my-4">
            Découvre SwaveConnection, l'école de bachata fun et sensual de Montréal. Que tu sois débutant ou avancé, notre équipe t'accompagne
            pour danser, progresser et vibrer à chaque pas. Rejoins la vibe Swave !
          </Text>
          <ButtonSwave
            hover-effect="halo"
            :href="BOOKING_LINKS.bachata"
            external
            class="relative z-5"
          >
            {{ ctaText }}
          </ButtonSwave>
          <!-- Test buttons for glow effects -->
          <div class="flex flex-wrap gap-4 mt-4 relative z-5 hidden">
            <ButtonTest hover-effect="snake">
              Snake
            </ButtonTest>
            <ButtonTest hover-effect="orbital">
              Orbital
            </ButtonTest>
            <ButtonTest hover-effect="both">
              Both
            </ButtonTest>
            <ButtonTest hover-effect="sweep">
              Sweep
            </ButtonTest>
            <ButtonTest hover-effect="spin">
              Spin
            </ButtonTest>
            <ButtonTest hover-effect="shine">
              Shine
            </ButtonTest>
            <ButtonTest hover-effect="slide">
              Slide
            </ButtonTest>
            <ButtonTest hover-effect="sweepshine">
              SweepShine
            </ButtonTest>
          </div>
        </div>

      </div>
    </LayoutContainerMax>
  </section>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────┐
  │                      LANDING HERO                           │
  │                                                             │
  │  ARCHITECTURE CONTENT-FIRST :                               │
  │  1. Le CONTENU définit la taille (min-height sur content)   │
  │  2. La SECTION s'adapte au contenu                          │
  │  3. L'IMAGE remplit l'espace disponible (absolute)          │
  │                                                             │
  │  ┌───────────────────────────────────────────────────────┐  │
  │  │  section.landing-hero (s'adapte au contenu)           │  │
  │  │  ┌─────────────────────────────────────────────────┐  │  │
  │  │  │  img.landing-hero__bg (absolute, remplit)       │  │  │
  │  │  └─────────────────────────────────────────────────┘  │  │
  │  │  ┌─────────────────────────────────────────────────┐  │  │
  │  │  │  .landing-hero__content (min-h: 90/100vh)       │  │  │
  │  │  │    ├─ Heading (top)                             │  │  │
  │  │  │    └─ ButtonSwave (bottom)                      │  │  │
  │  │  └─────────────────────────────────────────────────┘  │  │
  │  └───────────────────────────────────────────────────────┘  │
  │                                                             │
  │  Props:                                                     │
  │    • ctaText: string (défaut: "RÉSERVER UN COURS")          │
  │                                                             │
  │  CTA:                                                       │
  │    • Lien externe vers la réservation (BOOKING_LINKS.bachata)│
  │      ouvert dans un nouvel onglet                           │
  └─────────────────────────────────────────────────────────────┘

  Section Hero plein écran avec titre display et CTA.
  Image de fond en absolute positionnée derrière la grille.

  @dev Structure : ContainerMax > GridResponsive > Content
  @dev Tailwind pour spacing, CSS scoped BEM pour visuel
*/

interface Props {
  ctaText?: string;
}

withDefaults(defineProps<Props>(), {
  ctaText: 'RÉSERVER UN COURS',
});

/* Composable pour signaler la visibilité du Hero à la Navbar */
const { setHeroVisible } = useHeroVisibility();

/* Référence à la section pour l'IntersectionObserver */
const heroSection = ref<HTMLElement | null>(null);
let heroObserver: IntersectionObserver | null = null;

/*
  ╔═══════════════════════════════════════════════════════════════════════╗
  ║  IntersectionObserver - Détection sortie du Hero                      ║
  ╠═══════════════════════════════════════════════════════════════════════╣
  ║                                                                       ║
  ║  OBJECTIF:                                                            ║
  ║  Détecter quand l'utilisateur a fini de survoler le Hero pour         ║
  ║  déclencher l'apparition du CTA dans la Navbar (desktop only).        ║
  ║                                                                       ║
  ║  FONCTIONNEMENT:                                                      ║
  ║  - On observe la section Hero avec un threshold de 0                  ║
  ║  - Quand le Hero n'est plus visible (isIntersecting = false),         ║
  ║    on passe isHeroVisible à false                                     ║
  ║  - La Navbar réagit et affiche le CTA avec animation slide-in         ║
  ║                                                                       ║
  ╚═══════════════════════════════════════════════════════════════════════╝
*/
onMounted(() => {
  /* Récupérer la section Hero via la classe */
  heroSection.value = document.querySelector('.landing-hero');

  if (!heroSection.value) return;

  heroObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        /*
          isIntersecting = true  → Hero visible dans le viewport
          isIntersecting = false → Hero complètement sorti du viewport
        */
        setHeroVisible(entry.isIntersecting);
      });
    },
    {
      /* threshold: 0 → callback dès que le Hero commence à sortir/entrer */
      threshold: 0,
      /* rootMargin négatif pour déclencher un peu avant la sortie complète */
      rootMargin: '-80px 0px 0px 0px',
    }
  );

  heroObserver.observe(heroSection.value);
});

onUnmounted(() => {
  heroObserver?.disconnect();
});
</script>

<style scoped>
/**
 * LANDING HERO STYLES - CONTENT-FIRST ARCHITECTURE
 *
 * Principe : Le CONTENU définit la taille, pas la section.
 * 1. .landing-hero__content a un min-height (90vh mobile, 100vh desktop)
 * 2. .landing-hero s'adapte automatiquement à son contenu
 * 3. .landing-hero__bg remplit l'espace disponible (absolute)
 *
 * @dev Mobile : min-h 90vh, image centrée en bas, space-between
 * @dev Desktop : min-h 100vh, image bas-droite, contenu en bas
 */

.landing-hero {
  /* Section s'adapte au contenu - PAS de height fixe */
  position: relative;
  overflow: hidden;
  background-color: var(--primary-light);
  padding-top:8vh;

  /*
   * Z-INDEX STACK (réorganisé pour overlay grain)
   * 0 : background couleur (auto)
   * 1 : landing-hero__line:first-of-type
   * 2 : image .landing-hero__bg
   * 3 : landing-hero__line
   * 4 : overlay grain ::after
   * 5 : contenu (text, boutons)
   */

  /* Overlay grain - au-dessus de l'image, sous le contenu */
  /* Style Figma: Mono, size 0.6, density 100%, black #000 at 25% */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url('~/assets/images/grain.svg');
    opacity: 0.25;
    pointer-events: none;
    z-index: 4;
    mix-blend-mode: multiply;
  }

  /* Element: background image - remplit l'espace défini par le contenu */
  .landing-hero__bg {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: -150px 0px;
    pointer-events: none;
    z-index: 2;

    /* Desktop: image à droite, contain */
    @media (min-width: 1024px) {
      object-fit: contain;
      object-position: center;
      height: 90%;
    }
  }

  /* Element: CONTENT-FIRST - C'est lui qui définit la taille */
  .landing-hero__content {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    container-type: inline-size;

    /*
     * Mobile : on remplit le viewport RÉELLEMENT visible (dvh) et non le
     * viewport théorique (vh). Sur mobile, `vh` inclut la zone occupée par
     * la barre d'URL → le contenu aligné en bas (flex-end) passait sous le
     * pli et le CTA disparaissait. `dvh` suit la hauteur visible dynamique.
     *
     * calc(100dvh - 8vh) : on soustrait le padding-top (8vh) de la section
     * pour que le BAS du contenu (donc le CTA) tombe pile en bas de la zone
     * visible, avec le léger espace du py-8 en dessous.
     */
    min-height: 90vh; /* fallback navigateurs sans dvh */
    min-height: calc(100dvh - 8vh);

    /* Desktop: 100vh minimum, contenu aligné en bas (INCHANGÉ) */
    @media (min-width: 1024px) {
      min-height: 105vh;
      /* justify-content: space-between; */
      justify-content: flex-start;
    }
  }

  /* Element: title line */
  .landing-hero__line {
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    z-index: 3;

    @media (min-width: 1024px) {
      flex-direction: row;

      &:first-of-type {
        z-index: 1;
        margin-bottom: 20vh;
      }
    }
  }

}
</style>
