<template>
  <section :class="['page-hero', `page-hero--bg-${bgColor}`]" class="py-24 lg:py-32" data-theme="dark">
    <!-- Blob decoratifs (behind content) -->
    <div class="page-hero__blob page-hero__blob--primary" aria-hidden="true"></div>
    <div class="page-hero__blob page-hero__blob--secondary" aria-hidden="true"></div>

    <!-- Background image -->
    <NuxtImg
      :src="image"
      :alt="imageAlt"
      class="page-hero__image"
      sizes="xs:320px sm:640px md:768px lg:1024px xl:1280px"
      format="webp"
      loading="eager"
      fetchpriority="high"
    />

    <!-- Overlay gradient -->
    <div class="page-hero__overlay" aria-hidden="true"></div>

    <!-- Content -->
    <LayoutContainerMax class="relative z-10 h-full">
      <div class="page-hero__content">
        <!-- Tag/Label -->
        <Text
          v-if="tag"
          as="span"
          size="sm"
          weight="semibold"
          color="primary"
          transform="uppercase"
          tracking="wide"
        >
          {{ tag }}
        </Text>

        <!-- Title -->
        <Heading :level="1" color="white">
          {{ title }}
        </Heading>

        <!-- Subtitle -->
        <Text
          v-if="subtitle"
          size="xl"
          color="white"
          weight="light"
          maxWidth="lg"
        >
          {{ subtitle }}
        </Text>

        <!-- CTA Button -->
        <ButtonSwave v-if="ctaText" @click="handleCtaClick">
          {{ ctaText }}
        </ButtonSwave>
      </div>
    </LayoutContainerMax>
  </section>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                              PAGE HERO                                       │
  │                                                                              │
  │  Hero section pour pages secondaires avec background coloré et blobs blur   │
  │                                                                              │
  │  STRUCTURE (Mobile & Desktop - image toujours en background):               │
  │  ┌────────────────────────────────────────────────────────────────────────┐  │
  │  │  section.page-hero                                                    │  │
  │  │  ┌──────────────────────────────────────────────────────────────────┐  │  │
  │  │  │  .page-hero__blob--primary (blur circle, top-left)              │  │  │
  │  │  │  .page-hero__blob--secondary (blur circle, bottom-right)        │  │  │
  │  │  └──────────────────────────────────────────────────────────────────┘  │  │
  │  │  ┌──────────────────────────────────────────────────────────────────┐  │  │
  │  │  │  img.page-hero__image (absolute, object-cover)                  │  │  │
  │  │  └──────────────────────────────────────────────────────────────────┘  │  │
  │  │  ┌──────────────────────────────────────────────────────────────────┐  │  │
  │  │  │  .page-hero__overlay (gradient overlay)                         │  │  │
  │  │  └──────────────────────────────────────────────────────────────────┘  │  │
  │  │  ┌──────────────────────────────────────────────────────────────────┐  │  │
  │  │  │  LayoutContainerMax                                             │  │  │
  │  │  │    └─ .page-hero__content (flex col, align end)                 │  │  │
  │  │  │         ├─ Text (tag - optional)                                │  │  │
  │  │  │         ├─ Heading h1 (title)                                   │  │  │
  │  │  │         ├─ Text (subtitle - optional)                           │  │  │
  │  │  │         └─ ButtonSwave (CTA - optional)                         │  │  │
  │  │  └──────────────────────────────────────────────────────────────────┘  │  │
  │  └────────────────────────────────────────────────────────────────────────┘  │
  │                                                                              │
  │  Props:                                                                      │
  │    • title: string (requis) - Titre principal                                │
  │    • subtitle: string (optionnel) - Sous-titre/description                   │
  │    • tag: string (optionnel) - Label au-dessus du titre                      │
  │    • image: string (requis) - Image de fond                                  │
  │    • imageAlt: string (défaut: '') - Alt text de l'image                     │
  │    • ctaText: string (optionnel) - Texte du bouton CTA                       │
  │    • bgColor: BgColor (défaut: 'invert') - Couleur de fond                   │
  │      Options: 'invert' | 'primary' | 'primary-dark' | 'secondary-dark'       │
  │                                                                              │
  │  Events:                                                                     │
  │    • @cta-click: Émis au clic sur le bouton CTA                              │
  │                                                                              │
  │  Slots: Aucun (données via props)                                            │
  └─────────────────────────────────────────────────────────────────────────────┘
*/

/* Types */
type BgColor = 'invert' | 'primary' | 'primary-dark' | 'secondary-dark';

/* Props */
interface Props {
  title: string;
  subtitle?: string;
  tag?: string;
  image: string;
  imageAlt?: string;
  ctaText?: string;
  bgColor?: BgColor;
}

withDefaults(defineProps<Props>(), {
  imageAlt: '',
  bgColor: 'invert',
});

/* Events */
interface Emits {
  (e: 'cta-click'): void;
}

const emit = defineEmits<Emits>();

/* Handlers */
const handleCtaClick = () => {
  emit('cta-click');
};

/* Composable pour signaler la visibilité du Hero à la Navbar */
const { setHeroVisible } = useHeroVisibility();

let heroObserver: IntersectionObserver | null = null;

onMounted(() => {
  const heroSection = document.querySelector('.page-hero');
  if (!heroSection) return;

  /* Reset : le hero est visible au montage */
  setHeroVisible(true);

  heroObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        setHeroVisible(entry.isIntersecting);
      });
    },
    { threshold: 0, rootMargin: '-80px 0px 0px 0px' }
  );

  heroObserver.observe(heroSection);
});

onUnmounted(() => {
  heroObserver?.disconnect();
});
</script>

<style scoped>
/**
 * PAGE HERO STYLES - BEM strict + CSS Nesting natif
 *
 * Design: Background coloré (--bg-invert) avec blobs blur primary,
 * image en fond avec overlay gradient, textes alignés à droite
 *
 * @dev Tailwind pour spacing (py-24, lg:py-32)
 * @dev CSS scoped BEM pour visuel (backgrounds, blobs, effects)
 */

/* Block: .page-hero */
.page-hero {
  position: relative;
  /* z-index : le hero precede la section benefits dans le DOM, il lui faut un
     z-index explicite pour passer devant son watermark fixe */
  z-index: 1;
  overflow: hidden;
  min-height: 95vh;
  display: flex;
  align-items: center;
}

/* Modifier: Background colors */
.page-hero--bg-invert {
  background-color: var(--bg-invert);
}

.page-hero--bg-primary {
  background-color: var(--primary-light);
}

.page-hero--bg-primary-dark {
  background-color: var(--primary-dark);
}

.page-hero--bg-secondary-dark {
  background-color: var(--secondary-dark);
}

/* Element: Blobs decoratifs */
.page-hero__blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  pointer-events: none;
  z-index: 0;
}

.page-hero__blob--primary {
  width: 500px;
  height: 500px;
  left: -10%;
  top: -20%;
  background: var(--primary);
  opacity: 0.6;

  @media (min-width: 1024px) {
    width: 700px;
    height: 700px;
    left: -5%;
    top: -30%;
    opacity: 0.5;
  }
}

.page-hero__blob--secondary {
  width: 400px;
  height: 400px;
  right: -15%;
  bottom: -30%;
  background: var(--primary-dark);
  opacity: 0.4;

  @media (min-width: 1024px) {
    width: 600px;
    height: 600px;
    right: 20%;
    bottom: -40%;
    opacity: 0.3;
  }
}

/* Element: Background image */
.page-hero__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 1;

  @media (min-width: 1024px) {
    width: 65%;
    left: auto;
    right: 0;
    object-position: center top;
  }
}

/* Element: Overlay gradient */
.page-hero__overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.5) 50%,
    rgba(0, 0, 0, 0.8) 100%
  );
}

/* Overlay variants per background color (desktop only) */
@media (min-width: 1024px) {
  .page-hero--bg-invert .page-hero__overlay {
    background: linear-gradient(
      to right,
      var(--bg-invert) 0%,
      var(--bg-invert) 25%,
      rgba(0, 0, 0, 0.8) 45%,
      rgba(0, 0, 0, 0.4) 70%,
      rgba(0, 0, 0, 0.2) 100%
    );
  }

  .page-hero--bg-primary .page-hero__overlay {
    background: linear-gradient(
      to right,
      var(--primary-light) 0%,
      var(--primary-light) 25%,
      color-mix(in srgb, var(--primary-light) 80%, transparent) 45%,
      color-mix(in srgb, var(--primary-light) 40%, transparent) 70%,
      color-mix(in srgb, var(--primary-light) 20%, transparent) 100%
    );
  }

  .page-hero--bg-primary-dark .page-hero__overlay {
    background: linear-gradient(
      to right,
      var(--primary-dark) 0%,
      var(--primary-dark) 25%,
      color-mix(in srgb, var(--primary-dark) 80%, transparent) 45%,
      color-mix(in srgb, var(--primary-dark) 40%, transparent) 70%,
      color-mix(in srgb, var(--primary-dark) 20%, transparent) 100%
    );
  }

  .page-hero--bg-secondary-dark .page-hero__overlay {
    background: linear-gradient(
      to right,
      var(--secondary-dark) 0%,
      var(--secondary-dark) 25%,
      rgba(38, 38, 38, 0.8) 45%,
      rgba(38, 38, 38, 0.4) 70%,
      rgba(38, 38, 38, 0.2) 100%
    );
  }
}

/* Element: Content container */
.page-hero__content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 1rem;
  min-height: 50vh;
  text-align: left;

  @media (min-width: 1024px) {
    max-width: 50%;
    gap: 1.5rem;
    min-height: 55vh;
  }
}
</style>
