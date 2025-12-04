<template>
  <!--
    Page Index - Landing Page Marketing

    Description : Page d'accueil marketing avec Hero + Features + CTA

    Structure:
    - Hero avec gradient
    - FeaturesGrid (6 features)
    - CTA avec lien vers /design-system

    @dev Page simplifiée (Phase 13)
    @dev Composants : SectionsHero, SectionsFeaturesGrid, SectionsCTA
  -->
  <div class="min-h-screen">
    <!-- Hero Section avec gradient -->
    <SectionsHero variant="gradient" :centered="true">
      <h1 class="text-white text-5xl lg:text-6xl font-bold mb-6">
        SwaveConnexion Design System
      </h1>
      <p class="text-xl lg:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
        Système de design minimaliste et moderne avec CSS natif + Tailwind 4
      </p>
      <div class="flex gap-4 justify-center flex-wrap">
        <NuxtLink to="/design-system">
          <Button variant="primary" size="lg">Explorer le Design System</Button>
        </NuxtLink>
        <Button variant="outline-light" size="lg" @click="scrollToFeatures">Découvrir</Button>
      </div>
    </SectionsHero>

    <!-- FeaturesGrid Section -->
    <div id="features">
      <SectionsFeaturesGrid
        title="Fonctionnalités Principales"
        subtitle="Découvrez les avantages de notre design system minimaliste et performant"
        :features="features"
        :cols="3"
      />
    </div>

    <!-- CTA Section (Primary) -->
    <SectionsCTA
      title="Prêt à explorer le Design System ?"
      description="Découvrez plus de 30 composants UI, layouts et sections prêts à l'emploi, organisés par catégories pour une navigation facile."
      primary-text="Voir tous les composants"
      secondary-text="Documentation"
      variant="primary"
      :centered="true"
      @primary-click="navigateTo('/design-system')"
      @secondary-click="handleDocs"
    />

  </div>
</template>

<script setup lang="ts">
/**
 * INDEX PAGE - Landing Page Marketing (PHASE 13)
 *
 * @dev Page marketing simplifiée
 * @dev Hero + FeaturesGrid + CTA
 * @dev Lien vers /design-system pour explorer les composants
 */

// Meta tags
useHead({
  title: 'SwaveConnexion - Design System Minimaliste',
  meta: [
    { name: 'description', content: 'Design system minimaliste et moderne avec CSS natif + Tailwind 4. Plus de 30 composants UI, layouts et sections prêts à l\'emploi.' }
  ]
});

// FeaturesGrid data (6 features principales)
const features = [
  {
    icon: '⚡',
    title: 'Performance',
    description: 'Build optimisé avec Vite et Nuxt 4 pour des temps de chargement ultra-rapides et une expérience utilisateur fluide.',
  },
  {
    icon: '🎨',
    title: 'Design Moderne',
    description: 'Interface épurée avec polices custom (Space Grotesk, Clash Display) et type scale harmonieux basé sur Perfect Fourth.',
  },
  {
    icon: '♿',
    title: 'Accessibilité WCAG AA',
    description: 'Conformité WCAG 2.1 Level AA garantie avec contraste validé (≥4.5:1), navigation clavier et ARIA complet.',
  },
  {
    icon: '📱',
    title: '100% Responsive',
    description: 'Tous les composants s\'adaptent automatiquement à tous les écrans avec breakpoints Tailwind (sm, md, lg, xl).',
  },
  {
    icon: '🌓',
    title: 'Dark Mode',
    description: 'Support complet du dark mode avec 3 thèmes configurables (Default, Ocean, Sunset) et persistence localStorage.',
  },
  {
    icon: '🔧',
    title: 'TypeScript Strict',
    description: 'Props typées avec TypeScript strict, auto-import Nuxt, et documentation inline complète dans chaque composant.',
  },
];

// Scroll to features section
const scrollToFeatures = () => {
  const element = document.getElementById('features');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// Documentation handler
const handleDocs = () => {
  // Navigate to CLAUDE.md or PDM
  console.log('Navigating to documentation');
  // Could navigate to a dedicated /docs page in future
};
</script>
