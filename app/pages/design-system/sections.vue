<template>
  <ShowcaseLayout
    title="Sections"
    description="Sections complètes prêtes à l'emploi - Hero, CTA, FeaturesGrid"
  >

    <!-- HERO -->
    <ShowcaseSection title="Hero - Section d'en-tête">
      <div class="space-y-8">
        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Variante Primary</h3>
          <div class="border-2 border-neutral-medium rounded-lg overflow-hidden">
            <SectionsHero variant="primary" :centered="true">
              <h1 class="text-white text-4xl font-bold mb-4">Section Hero Primary</h1>
              <p class="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
                Fond bleu uni pour mise en avant simple et élégante
              </p>
              <div class="flex gap-4 justify-center">
                <Button variant="primary" size="lg">Call to Action</Button>
                <Button variant="outline" size="lg">En savoir plus</Button>
              </div>
            </SectionsHero>
          </div>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Variante Gradient</h3>
          <div class="border-2 border-neutral-medium rounded-lg overflow-hidden">
            <SectionsHero variant="gradient" :centered="true">
              <h1 class="text-white text-4xl font-bold mb-4">Section Hero Gradient</h1>
              <p class="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
                Gradient bleu vers orange pour impact visuel maximum
              </p>
              <div class="flex gap-4 justify-center">
                <Button variant="primary" size="lg">Découvrir</Button>
                <Button variant="outline-light" size="lg">Contact</Button>
              </div>
            </SectionsHero>
          </div>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Props</h3>
          <ShowcaseCodeBlock>
interface Props {
  variant?: 'primary' | 'gradient';
  centered?: boolean; // Centre le contenu (défaut: true)
}

// Slot:
// - default: Contenu du Hero (h1, p, buttons)

// Usage:
&lt;SectionsHero variant="gradient" :centered="true"&gt;
  &lt;h1&gt;Mon Titre&lt;/h1&gt;
  &lt;p&gt;Ma description&lt;/p&gt;
  &lt;Button&gt;Action&lt;/Button&gt;
&lt;/SectionsHero&gt;
          </ShowcaseCodeBlock>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Accessibilité</h3>
          <ul class="space-y-2 text-neutral-dark dark:text-neutral-medium">
            <li>✅ Padding vertical généreux (py-20)</li>
            <li>✅ Contraste texte blanc sur fond foncé</li>
            <li>✅ Slot flexible pour tout contenu</li>
            <li>✅ Responsive avec classes Tailwind</li>
          </ul>
        </div>
      </div>
    </ShowcaseSection>

    <!-- CTA -->
    <ShowcaseSection title="CTA - Call To Action">
      <div class="space-y-8">
        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Variante Primary</h3>
          <div class="border-2 border-neutral-medium rounded-lg overflow-hidden">
            <SectionsCTA
              title="Prêt à commencer ?"
              description="Rejoignez des milliers d'utilisateurs qui utilisent notre plateforme pour créer des applications modernes."
              primary-text="Commencer maintenant"
              secondary-text="En savoir plus"
              variant="primary"
              :centered="true"
              @primary-click="handleClick('primary')"
              @secondary-click="handleClick('secondary')"
            />
          </div>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Variante Gradient</h3>
          <div class="border-2 border-neutral-medium rounded-lg overflow-hidden">
            <SectionsCTA
              title="Contribuez au projet !"
              description="Le projet est open source. Vos contributions sont les bienvenues."
              primary-text="Voir sur GitHub"
              secondary-text="Documentation"
              variant="gradient"
              :centered="true"
              @primary-click="handleClick('github')"
              @secondary-click="handleClick('docs')"
            />
          </div>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Props</h3>
          <ShowcaseCodeBlock>
interface Props {
  title: string;
  description?: string;
  primaryText?: string; // Défaut: "Commencer"
  secondaryText?: string; // Optionnel
  variant?: 'primary' | 'gradient';
  centered?: boolean; // Défaut: true
}

// Events:
// - primary-click: Émis au clic sur bouton principal
// - secondary-click: Émis au clic sur bouton secondaire

// Usage:
&lt;SectionsCTA
  title="Mon titre"
  description="Ma description"
  primary-text="Commencer"
  secondary-text="En savoir plus"
  variant="gradient"
  @primary-click="handlePrimary"
  @secondary-click="handleSecondary"
/&gt;
          </ShowcaseCodeBlock>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Accessibilité WCAG AA</h3>
          <ul class="space-y-2 text-neutral-dark dark:text-neutral-medium">
            <li>✅ Gradient corrigé : via-primary-dark to-accent-dark</li>
            <li>✅ Contraste texte blanc ≥4.5:1 sur toute la surface</li>
            <li>✅ Boutons accessibles avec focus visible</li>
            <li>✅ Structure sémantique (section + h2 + p + buttons)</li>
          </ul>
        </div>
      </div>
    </ShowcaseSection>

    <!-- FEATURESGRID -->
    <ShowcaseSection title="FeaturesGrid - Grille de features">
      <div class="space-y-8">
        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Grid 3 colonnes</h3>
          <div class="border-2 border-neutral-medium rounded-lg overflow-hidden">
            <SectionsFeaturesGrid
              title="Fonctionnalités Principales"
              subtitle="Découvrez les avantages de notre design system"
              :features="features3cols"
              :cols="3"
            />
          </div>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Grid 4 colonnes</h3>
          <div class="border-2 border-neutral-medium rounded-lg overflow-hidden">
            <SectionsFeaturesGrid
              title="Composants Disponibles"
              subtitle="Un ensemble complet de composants UI et Layout"
              :features="features4cols"
              :cols="4"
            />
          </div>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Props</h3>
          <ShowcaseCodeBlock>
interface Props {
  title: string;
  subtitle?: string;
  features: Array&lt;{
    icon: string; // Emoji
    title: string;
    description: string;
  }&gt;;
  cols?: 3 | 4; // Défaut: 3
}

// Usage:
const features = [
  {
    icon: '⚡',
    title: 'Performance',
    description: 'Optimisé pour la vitesse'
  },
  {
    icon: '🎨',
    title: 'Design',
    description: 'Interface moderne et élégante'
  }
];

&lt;SectionsFeaturesGrid
  title="Fonctionnalités"
  :features="features"
  :cols="3"
/&gt;
          </ShowcaseCodeBlock>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Accessibilité</h3>
          <ul class="space-y-2 text-neutral-dark dark:text-neutral-medium">
            <li>✅ Grid responsive (mobile: 1 col, tablet: 2 cols, desktop: 3-4 cols)</li>
            <li>✅ Emojis comme icônes (accessibles nativement)</li>
            <li>✅ Structure sémantique avec titres et descriptions</li>
            <li>✅ Spacing cohérent entre éléments</li>
          </ul>
        </div>
      </div>
    </ShowcaseSection>

  </ShowcaseLayout>
</template>

<script setup lang="ts">
/**
 * DESIGN SYSTEM - SECTIONS PAGE (PHASE 13)
 *
 * @dev Regroupe toutes les sections prêtes à l'emploi
 * @dev Hero, CTA, FeaturesGrid
 */

// Meta tags
useHead({
  title: 'Sections - Design System',
  meta: [
    { name: 'description', content: 'Sections complètes prêtes à l\'emploi - Hero, CTA, FeaturesGrid' }
  ]
});

// Event handlers
const handleClick = (action: string) => {
  console.log(`CTA click: ${action}`);
};

// Features data (3 colonnes)
const features3cols = [
  {
    icon: '⚡',
    title: 'Performance',
    description: 'Design system optimisé avec CSS natif et Tailwind 4 pour des performances maximales'
  },
  {
    icon: '🎨',
    title: 'Design Moderne',
    description: 'Interface épurée avec polices custom (Space Grotesk, Clash Display) et type scale harmonieux'
  },
  {
    icon: '♿',
    title: 'Accessibilité',
    description: 'Conforme WCAG 2.1 Level AA avec contraste validé et navigation clavier complète'
  },
  {
    icon: '📱',
    title: 'Responsive',
    description: 'Tous les composants sont 100% responsive avec breakpoints Tailwind (sm, md, lg)'
  },
  {
    icon: '🌓',
    title: 'Dark Mode',
    description: 'Support complet du dark mode avec 3 thèmes configurables (Default, Ocean, Sunset)'
  },
  {
    icon: '🔧',
    title: 'Maintenable',
    description: 'Code structuré avec BEM, TypeScript strict et documentation complète inline'
  }
];

// Features data (4 colonnes)
const features4cols = [
  {
    icon: '🔘',
    title: 'Buttons',
    description: '5 variantes + 3 tailles'
  },
  {
    icon: '📝',
    title: 'Forms',
    description: 'Input, Checkbox, Switch, Dropdown'
  },
  {
    icon: '🏷️',
    title: 'Badges',
    description: '6 variantes sémantiques'
  },
  {
    icon: '🗂️',
    title: 'Cards',
    description: '3 variantes avec slots'
  },
  {
    icon: '💬',
    title: 'Feedback',
    description: 'Toast, Modal, Tooltip, ProgressBar'
  },
  {
    icon: '📐',
    title: 'Layouts',
    description: 'Container, Grid, Stack, SplitPane'
  },
  {
    icon: '🎯',
    title: 'Sections',
    description: 'Hero, CTA, FeaturesGrid'
  },
  {
    icon: '⌨️',
    title: 'Navigation',
    description: 'Tabs avec keyboard support'
  }
];
</script>
