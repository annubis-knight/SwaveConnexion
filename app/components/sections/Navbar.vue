<template>
  <nav class="navbar" :class="navbarClasses">
    <LayoutContainerMax class="h-full">
      <div class="navbar__inner">
        <!-- Logo + Nom -->
        <NuxtLink to="/" class="navbar__brand">
          <img
            src="~/assets/images/logo_alpha.png"
            alt="Swave Connexion Logo"
            class="navbar__logo"
          />
          <Text
            as="span"
            font="display"
            size="lg"
            weight="bold"
            :color="isScrolled ? 'dark' : 'white'"
            tracking="wide"
          >
            SWAVE CONNEXION
          </Text>
        </NuxtLink>

        <!-- Navigation Desktop -->
        <div class="navbar__nav">
          <NavLink
            v-for="link in navLinks"
            :key="link.href"
            :to="link.href"
            :variant="linkVariant"
          >
            {{ link.label }}
          </NavLink>
        </div>

        <!-- CTA Button Desktop -->
        <div class="navbar__cta">
          <ButtonSwave @click="handleCtaClick">
            {{ ctaText }}
          </ButtonSwave>
        </div>

        <!-- Hamburger Mobile -->
        <button
          class="navbar__hamburger"
          :aria-expanded="isMenuOpen"
          aria-label="Menu de navigation"
          @click="toggleMenu"
        >
          <span class="navbar__hamburger-line" />
          <span class="navbar__hamburger-line" />
          <span class="navbar__hamburger-line" />
        </button>
      </div>
    </LayoutContainerMax>

    <!-- Mobile Menu Overlay -->
    <Transition name="menu-fade">
      <div v-if="isMenuOpen" class="navbar__mobile-menu">
        <div class="navbar__mobile-links">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.href"
            :to="link.href"
            class="navbar__mobile-link"
            @click="closeMenu"
          >
            <Text
              as="span"
              font="sans"
              size="xl"
              weight="medium"
              color="white"
              transform="uppercase"
              tracking="wide"
            >
              {{ link.label }}
            </Text>
          </NuxtLink>
        </div>
        <div class="navbar__mobile-cta">
          <ButtonSwave @click="handleMobileCtaClick">
            {{ ctaText }}
          </ButtonSwave>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────┐
  │                         NAVBAR                              │
  │                                                             │
  │  DESKTOP (lg+):                                             │
  │  ┌───────────────────────────────────────────────────────┐  │
  │  │  nav.navbar (sticky top, bg transparent)              │  │
  │  │  ┌─────────────────────────────────────────────────┐  │  │
  │  │  │  .navbar__inner (flex row, justify-between)     │  │  │
  │  │  │    ├─ .navbar__brand                            │  │  │
  │  │  │    │    ├─ img.navbar__logo                     │  │  │
  │  │  │    │    └─ Text (SWAVE CONNEXION)               │  │  │
  │  │  │    ├─ .navbar__nav                              │  │  │
  │  │  │    │    └─ NuxtLink × 5 (Text)                  │  │  │
  │  │  │    └─ .navbar__cta                              │  │  │
  │  │  │         └─ ButtonSwave                          │  │  │
  │  │  └─────────────────────────────────────────────────┘  │  │
  │  └───────────────────────────────────────────────────────┘  │
  │                                                             │
  │  MOBILE (<lg):                                              │
  │  ┌───────────────────────────────────────────────────────┐  │
  │  │  nav.navbar                                           │  │
  │  │    ├─ .navbar__brand (logo + nom)                     │  │
  │  │    ├─ .navbar__hamburger (3 lignes animées)           │  │
  │  │    └─ .navbar__mobile-menu (overlay plein écran)      │  │
  │  │         ├─ .navbar__mobile-links (liens centrés)      │  │
  │  │         └─ .navbar__mobile-cta (ButtonSwave)          │  │
  │  └───────────────────────────────────────────────────────┘  │
  │                                                             │
  │  Props:                                                     │
  │    • ctaText: string (défaut: "RÉSERVE UN COURS")          │
  │                                                             │
  │  Events:                                                    │
  │    • @cta-click: Émis au clic sur le bouton CTA            │
  │                                                             │
  │  Slots: Aucun (structure fixe)                              │
  └─────────────────────────────────────────────────────────────┘

  Navbar sticky avec fond transparent, hamburger menu en mobile.
  Utilise Text.vue pour les liens et ButtonSwave.vue pour le CTA.

  @dev Tailwind pour spacing responsive
  @dev CSS scoped BEM pour visuel (backgrounds, animations)
*/

interface Props {
  ctaText?: string;
}

interface Emits {
  'cta-click': [];
}

interface NavLink {
  label: string;
  href: string;
}

const props = withDefaults(defineProps<Props>(), {
  ctaText: 'RÉSERVE UN COURS',
});

const emit = defineEmits<Emits>();

// État menu mobile
const isMenuOpen = ref(false);

// État scroll (détection sections à fond clair)
const isScrolled = ref(false);
let observer: IntersectionObserver | null = null;

// Variant pour les liens (réactif selon scroll)
const linkVariant = computed(() => isScrolled.value ? 'dark' : 'light');

// Classes navbar (réactif)
const navbarClasses = computed(() => ({
  'navbar--open': isMenuOpen.value,
  'navbar--scrolled': isScrolled.value,
}));

// Liens de navigation
const navLinks: NavLink[] = [
  { label: 'Cours', href: '#cours' },
  { label: 'Professeurs', href: '#professeurs' },
  { label: 'Events', href: '#events' },
  { label: 'Agenda', href: '#agenda' },
  { label: 'Contact', href: '#contact' },
];

// Handlers
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  // Bloquer le scroll du body quand le menu est ouvert
  if (isMenuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = '';
};

const handleCtaClick = () => {
  emit('cta-click');
};

const handleMobileCtaClick = () => {
  closeMenu();
  emit('cta-click');
};

/*
  ╔═══════════════════════════════════════════════════════════════════════╗
  ║  IntersectionObserver - Détection des sections à fond clair           ║
  ╠═══════════════════════════════════════════════════════════════════════╣
  ║                                                                       ║
  ║  PROBLÈME RÉSOLU:                                                     ║
  ║  La navbar a un fond transparent avec du texte blanc par défaut.      ║
  ║  Quand on scroll sur une section à fond clair (ex: Features, Agenda), ║
  ║  le texte blanc devient illisible. On doit donc:                      ║
  ║    → Détecter quand la navbar "passe au-dessus" d'une section claire  ║
  ║    → Changer le style (fond clair + texte sombre) via isScrolled      ║
  ║                                                                       ║
  ║  FONCTIONNEMENT:                                                      ║
  ║                                                                       ║
  ║  1. On sélectionne toutes les sections à fond clair                   ║
  ║     (classes .landing-feature et .landing-agenda)                     ║
  ║                                                                       ║
  ║  2. On crée un IntersectionObserver qui surveille ces sections        ║
  ║                                                                       ║
  ║  3. À chaque intersection détectée, on vérifie si une section         ║
  ║     est positionnée sous la navbar (hauteur = 80px)                   ║
  ║                                                                       ║
  ║  4. Si rect.top <= 80 ET rect.bottom > 80, ça signifie que:           ║
  ║       - Le haut de la section est passé sous la navbar                ║
  ║       - Le bas de la section n'a pas encore dépassé la navbar         ║
  ║       → La navbar est AU-DESSUS de cette section claire               ║
  ║                                                                       ║
  ║  SCHÉMA VISUEL:                                                       ║
  ║                                                                       ║
  ║     ┌──────────────────────────┐  ← top: 0px                          ║
  ║     │  NAVBAR (80px height)    │                                      ║
  ║     └──────────────────────────┘  ← bottom: 80px                      ║
  ║     ┌──────────────────────────┐  ← rect.top (section)                ║
  ║     │                          │                                      ║
  ║     │   SECTION CLAIRE         │  ← isScrolled = true si:             ║
  ║     │   (landing-feature)      │    rect.top <= 80 && rect.bottom > 80║
  ║     │                          │                                      ║
  ║     └──────────────────────────┘  ← rect.bottom                       ║
  ║                                                                       ║
  ║  OPTIONS DE L'OBSERVER:                                               ║
  ║    • threshold: [0, 0.1, 0.2, ... 1] → callbacks tous les 10%         ║
  ║      de visibilité pour une détection très réactive                   ║
  ║    • rootMargin: '0px' → observe tout le viewport, le callback        ║
  ║      utilise getBoundingClientRect() pour le calcul précis            ║
  ║                                                                       ║
  ╚═══════════════════════════════════════════════════════════════════════╝
*/
onMounted(() => {
  /* Étape 1: Récupérer toutes les sections avec un fond clair */
  const lightSections = document.querySelectorAll('.landing-feature, .landing-agenda');

  /* Si aucune section claire n'existe, pas besoin d'observer */
  if (lightSections.length === 0) return;

  /* Étape 2: Créer l'observer avec callback et options */
  observer = new IntersectionObserver(
    () => {
      /*
        Callback exécuté à chaque changement d'intersection.
        On parcourt TOUTES les sections claires pour vérifier
        si l'une d'elles est actuellement sous la navbar.
      */
      let isOverLightSection = false;

      lightSections.forEach((section) => {
        /* getBoundingClientRect() donne la position relative au viewport */
        const rect = section.getBoundingClientRect();

        /*
          Condition: la section est "sous" la navbar si:
          - rect.top <= 80   → le haut de la section a atteint/dépassé le bas de la navbar
          - rect.bottom > 80 → le bas de la section n'a pas encore dépassé le bas de la navbar

          En d'autres termes: la bande des 80px du haut est AU-DESSUS de cette section
        */
        if (rect.top <= 80 && rect.bottom > 80) {
          isOverLightSection = true;
        }
      });

      /* Met à jour le state réactif → déclenche le changement de style */
      isScrolled.value = isOverLightSection;
    },
    {
      /*
        threshold: pourcentages de visibilité qui déclenchent le callback
        Plus de valeurs = plus de callbacks pendant le scroll = détection plus réactive
      */
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],

      /*
        rootMargin: pas de décalage - on observe tout le viewport
        Le callback utilise getBoundingClientRect() pour le calcul précis
      */
      rootMargin: '0px 0px 0px 0px'
    }
  );

  /* Étape 3: Activer l'observation sur chaque section claire */
  lightSections.forEach(section => observer!.observe(section));
});

/*
  ╔═══════════════════════════════════════════════════════════════════════╗
  ║  Cleanup - Nettoyage au démontage du composant                        ║
  ╠═══════════════════════════════════════════════════════════════════════╣
  ║  Important pour éviter les fuites mémoire et les effets de bord:      ║
  ║    1. Rétablir le scroll du body (au cas où le menu mobile était      ║
  ║       ouvert lors du changement de page)                              ║
  ║    2. Déconnecter l'observer pour arrêter la surveillance             ║
  ╚═══════════════════════════════════════════════════════════════════════╝
*/
onUnmounted(() => {
  /* Rétablir le scroll si le menu était ouvert */
  document.body.style.overflow = '';

  /* Arrêter l'observer (libère les ressources) */
  observer?.disconnect();
});
</script>

<style scoped>
/**
 * NAVBAR STYLES - CSS Nesting + BEM strict
 *
 * Sticky navbar avec fond transparent.
 * Hamburger animé en mobile, liens en row sur desktop.
 *
 * @dev Variables de _variables.css
 * @dev CSS Nesting natif (pas SASS)
 * @dev Transitions pour hamburger et menu mobile
 */

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: transparent;
  height: 80px;
  transition: background-color 0.3s ease, border-color 0.3s ease;

  /* Bordures haut et bas */
  /* border-top: 1px solid color-mix(in srgb, var(--text-inverse) 30%, transparent);
  border-bottom: 1px solid color-mix(in srgb, var(--text-inverse) 30%, transparent); */

  /* Modifier: scrolled (fond clair) */
  &.navbar--scrolled {
    background-color: var(--bg-subtle);
    border-top-color: var(--border-base);
    border-bottom-color: var(--border-base);

    .navbar__hamburger-line {
      background-color: var(--text-strong);
    }
  }

  /* Modifier: open (menu mobile ouvert) */
  &.navbar--open {
    .navbar__hamburger-line:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }

    .navbar__hamburger-line:nth-child(2) {
      opacity: 0;
    }

    .navbar__hamburger-line:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }
  }

  /* Element: inner container */
  .navbar__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    gap: 1rem;
  }

  /* Element: brand (logo + nom) */
  .navbar__brand {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
    flex-shrink: 0;
  }

  .navbar__logo {
    width: 40px;
    height: 40px;
    object-fit: contain;
  }

  /* Element: navigation links - HIDDEN on mobile */
  .navbar__nav {
    display: none;
    align-items: center;
    gap: 2rem;

    @media (min-width: 1024px) {
      display: flex;
    }
  }

  /* Element: CTA button - HIDDEN on mobile */
  .navbar__cta {
    display: none;
    flex-shrink: 0;

    @media (min-width: 1024px) {
      display: block;
    }

    /* Override ButtonSwave sizing for navbar */
    :deep(.btn-swave) {
      padding: 0.625rem 1.5rem;
      min-width: auto;
      width: auto;
      font-size: var(--text-sm);
    }
  }

  /* Element: hamburger button - VISIBLE only on mobile */
  .navbar__hamburger {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    width: 40px;
    height: 40px;
    padding: 8px;
    background: transparent;
    border: none;
    cursor: pointer;
    z-index: 101;

    @media (min-width: 1024px) {
      display: none;
    }
  }

  .navbar__hamburger-line {
    display: block;
    width: 24px;
    height: 2px;
    background-color: var(--text-inverse);
    border-radius: 1px;
    transition: transform 0.3s ease, opacity 0.3s ease, background-color 0.3s ease;
  }

  /* Element: mobile menu overlay */
  .navbar__mobile-menu {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: var(--primary);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3rem;
    padding: 2rem;

    @media (min-width: 1024px) {
      display: none;
    }
  }

  .navbar__mobile-links {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  .navbar__mobile-link {
    text-decoration: none;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.8;
    }
  }

  .navbar__mobile-cta {
    margin-top: 1rem;
  }
}

/* Transitions for mobile menu (Vue Transition) */
.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 0.3s ease;
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
}
</style>
