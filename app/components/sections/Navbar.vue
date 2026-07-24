<template>
  <nav class="navbar" :class="navbarClasses">
    <LayoutContainerMax class="h-full">
      <div class="navbar__inner">
        <!-- Logo + Nom -->
        <NuxtLink to="/" class="navbar__brand">
          <NuxtImg
            src="/images/logo_alpha.png"
            alt="Swave Connection Logo"
            class="navbar__logo"
            width="40"
            height="40"
            format="webp"
          />
          <span class="navbar__brand-text">
            <Text
              as="span"
              font="display"
              size="lg"
              weight="bold"
              :color="isScrolled ? 'dark' : 'white'"
              tracking="wide"
            >
              SWAVE CONNECTION
            </Text>
          </span>
        </NuxtLink>

        <!-- Navigation Desktop -->
        <div class="navbar__nav">
          <NavLink
            v-for="link in navLinks"
            :key="link.href"
            :to="link.href"
            :variant="linkVariant"
            :size="linkSize"
          >
            {{ link.label }}
          </NavLink>
        </div>

        <!-- CTA Button Desktop - Apparaît après avoir quitté le Hero -->
        <div class="navbar__cta" :class="{ 'navbar__cta--visible': showNavbarCta }">
          <ButtonSwave :href="BOOKING_LINKS.bachata" external>
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
          <ButtonSwave :href="BOOKING_LINKS.bachata" external @click="closeMenu">
            {{ ctaText }}
          </ButtonSwave>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
/**
 * NAVBAR
 *
 * Navigation principale avec 3 fonctionnalités dynamiques :
 * - Détection sections claires/sombres via data-theme → change le style
 * - CTA slide-in après Hero (showNavbarCta) → via useHeroVisibility
 * - Menu mobile (isMenuOpen) → hamburger + overlay
 *
 * SYSTÈME DE THÈME (data-theme) :
 * - Les sections ajoutent data-theme="light" ou data-theme="dark"
 * - La navbar détecte automatiquement quelle section est sous elle
 * - Elle adapte ses couleurs (texte clair sur fond sombre, texte sombre sur fond clair)
 *
 * Voir la documentation détaillée dans <style scoped>
 */

/* ============================================================================
   TYPES
   ============================================================================ */

interface Props {
  ctaText?: string;
}

interface NavLink {
  label: string;
  href: string;
}

/* ============================================================================
   PROPS
   ============================================================================ */

withDefaults(defineProps<Props>(), {
  ctaText: 'RÉSERVE UN COURS',
});

/* ============================================================================
   STATE
   ============================================================================ */

const isMenuOpen = ref(false);
const isScrolled = ref(false);
const windowWidth = ref(1280);

const { isHeroVisible } = useHeroVisibility();
const showNavbarCta = computed(() => !isHeroVisible.value);

const linkVariant = computed(() => (isScrolled.value ? 'dark' : 'light'));
const linkSize = computed(() => (windowWidth.value < 1280 ? 'xs' : 'sm'));
const navbarClasses = computed(() => ({
  'navbar--open': isMenuOpen.value,
  'navbar--scrolled': isScrolled.value,
}));

/* ============================================================================
   DATA
   ============================================================================ */

const navLinks: NavLink[] = [
  { label: 'Cours', href: '/#cours' },
  { label: 'Professeurs', href: '/professeurs' },
  // Nav item masqué temporairement (déploiement simplifié) : { label: 'Events', href: '/#events' },
  // Nav item masqué temporairement (déploiement simplifié) : { label: 'Agenda', href: '/#agenda' },
  { label: 'Contact', href: '/#contact' },
];

/* ============================================================================
   HANDLERS
   ============================================================================ */

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  document.body.style.overflow = isMenuOpen.value ? 'hidden' : '';
};

const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = '';
};

/* ============================================================================
   LIFECYCLE - Détection sections claires + resize
   ============================================================================ */

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

const checkSectionTheme = () => {
  /* Re-query à chaque appel pour supporter les changements de route (SPA) */
  const sections = document.querySelectorAll('[data-theme]');
  if (sections.length === 0) {
    isScrolled.value = false;
    return;
  }

  let isOverLightSection = false;

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const navbarHeight = 80;

    /* Section visible sous la navbar ? */
    if (rect.top <= navbarHeight && rect.bottom > navbarHeight) {
      const theme = section.getAttribute('data-theme');
      if (theme === 'light') {
        isOverLightSection = true;
      }
    }
  });

  isScrolled.value = isOverLightSection;
};

onMounted(() => {
  windowWidth.value = window.innerWidth;
  window.addEventListener('resize', handleResize);
  window.addEventListener('scroll', checkSectionTheme, { passive: true });
  checkSectionTheme();
});

onUnmounted(() => {
  document.body.style.overflow = '';
  window.removeEventListener('resize', handleResize);
  window.removeEventListener('scroll', checkSectionTheme);
});
</script>

<style scoped>
/**
 * NAVBAR STYLES
 *
 * Structure BEM : .navbar > __inner > __brand, __nav, __cta, __hamburger
 * Mobile-first : hamburger + overlay menu
 * Desktop (1024px+) : liens inline + CTA animé
 *
 * ============================================================================
 * FONCTIONNALITÉS DYNAMIQUES
 * ============================================================================
 *
 * 1. DÉTECTION SECTIONS CLAIRES/SOMBRES (isScrolled)
 *    ----------------------------------------
 *    La navbar détecte automatiquement le thème de la section
 *    sous elle via l'attribut data-theme="light" ou data-theme="dark".
 *
 *    - data-theme="light" → .navbar--scrolled (texte sombre)
 *    - data-theme="dark" ou absent → navbar par défaut (texte clair)
 *    - Détection : scroll listener + getBoundingClientRect()
 *
 *
 * 2. CTA SLIDE-IN APRÈS HERO (showNavbarCta)
 *    ----------------------------------------
 *    Le bouton CTA de la navbar apparaît uniquement après avoir
 *    quitté la section LandingHero (évite doublon avec le CTA du Hero).
 *
 *    Mécanisme :
 *    - LandingHero utilise IntersectionObserver pour détecter sa sortie
 *    - Il update le composable useHeroVisibility (useState partagé)
 *    - Navbar lit isHeroVisible et affiche le CTA quand false
 *
 *    Animation (CSS) :
 *    ┌─────────────────────────────────────────────────────────────┐
 *    │  ÉTAT CACHÉ                    ÉTAT VISIBLE                 │
 *    │  .navbar__cta                  .navbar__cta--visible        │
 *    │  ├─ max-width: 0        →      ├─ max-width: 30vw           │
 *    │  ├─ overflow: hidden           ├─ overflow: hidden          │
 *    │  └─ .btn-swave                 └─ .btn-swave                │
 *    │      └─ translateX(100%)           └─ translateX(0)         │
 *    └─────────────────────────────────────────────────────────────┘
 *
 *    Pourquoi cette approche ?
 *    - flex-grow: 1 sur __brand ET __cta → ils partagent l'espace équitablement
 *    - max-width animé de 0 à 30vw → l'espace s'ouvre progressivement
 *    - translateX sur le bouton → effet slide-in depuis la droite
 *    - Les deux animations sont synchronisées (même durée/easing)
 *
 *
 * 3. MENU MOBILE (isMenuOpen)
 *    ----------------------------------------
 *    - Hamburger visible < 1024px, caché en desktop
 *    - Classe .navbar--open transforme les 3 lignes en X
 *    - Overlay plein écran avec Vue <Transition> (fade)
 *
 */

/* ==========================================================================
   NAVBAR - Block principal
   ========================================================================== */

.navbar {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 100;
  height: 80px;
  background-color: transparent;
  transition: background-color 0.3s ease;

  /* --scrolled : fond clair sur sections light */
  &.navbar--scrolled {
    background-color: var(--bg-subtle);

    .navbar__hamburger-line {
      background-color: var(--text-strong);
    }
  }

  /* --open : hamburger en X */
  &.navbar--open {
    .navbar__hamburger-line:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    .navbar__hamburger-line:nth-child(2) { opacity: 0; }
    .navbar__hamburger-line:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
  }
}

/* ==========================================================================
   INNER - Conteneur flex
   ========================================================================== */

.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

/* ==========================================================================
   BRAND - Logo + nom
   ========================================================================== */

.navbar__brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
  flex-basis: 0%;
  text-decoration: none;

  @media (min-width: 1024px) {
    flex-grow: 1;
  }
}

.navbar__logo {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.navbar__brand-text :deep(span) {
  font-size: var(--text-sm) !important;

  @media (min-width: 1280px) {
    font-size: var(--text-lg) !important;
  }
}

/* ==========================================================================
   NAV - Liens de navigation (desktop only)
   ========================================================================== */

.navbar__nav {
  display: none;

  @media (min-width: 1024px) {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    gap: 1rem;
  }

  @media (min-width: 1280px) {
    gap: 2rem;
  }
}

/* ==========================================================================
   CTA - Bouton desktop avec animation slide-in
   ========================================================================== */

.navbar__cta {
  display: none;

  @media (min-width: 1024px) {
    display: flex;
    justify-content: flex-end;
    flex: 1 0 0%;
    max-width: 0;
    overflow: hidden;
    transition: max-width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &.navbar__cta--visible {
    @media (min-width: 1024px) {
      max-width: 30vw;
    }
  }
}

/* Animation du bouton à l'intérieur */
.navbar__cta :deep(.btn-swave) {
  transform: translateX(100%);
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.navbar__cta--visible :deep(.btn-swave) {
  transform: translateX(0);
}

/* ==========================================================================
   HAMBURGER - Menu mobile (visible < 1024px)
   ========================================================================== */

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

/* ==========================================================================
   MOBILE MENU - Overlay plein écran
   ========================================================================== */

.navbar__mobile-menu {
  position: fixed;
  inset: 0;
  z-index: 99;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  padding: 2rem;
  background-color: var(--primary);

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

/* ==========================================================================
   VUE TRANSITIONS - Menu mobile fade
   ========================================================================== */

.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 0.3s ease;
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
}
</style>
