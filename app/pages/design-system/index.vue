<template>
  <!--
    Page Design System Landing

    Description : Page d'accueil du design system avec navigation vers 4 catégories

    Structure:
    ┌─────────────────────────────────────────────┐
    │              Hero Section                   │
    ├─────────────────────────────────────────────┤
    │                                             │
    │       Grid 2x2 - 4 Category Cards:          │
    │    ┌────────────┐  ┌────────────┐          │
    │    │ Components │  │  Feedback  │          │
    │    └────────────┘  └────────────┘          │
    │    ┌────────────┐  ┌────────────┐          │
    │    │  Layouts   │  │  Sections  │          │
    │    └────────────┘  └────────────┘          │
    │                                             │
    └─────────────────────────────────────────────┘

    Catégories:
      1. UI Components : Buttons, Forms, Badge, Card
      2. Feedback : Toast, Modal, Tooltip, ProgressBar, Tabs
      3. Layouts : Container, Grid, Stack, SplitPane
      4. Sections : Hero, CTA, FeaturesGrid

    @dev Tailwind utilities uniquement
    @dev Grid responsive (1 col mobile, 2 cols desktop)
    @dev Cards cliquables avec hover effect
  -->
  <div class="min-h-screen bg-neutral-50 dark:bg-neutral-light">
    <!-- Hero -->
    <SectionsHero variant="primary" :centered="true">
      <h1 class="text-white mb-6">Design System</h1>
      <p class="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
        Système de design minimaliste avec composants UI, layouts et sections prêtes à l'emploi
      </p>
    </SectionsHero>

    <!-- Navigation par catégories -->
    <LayoutContainer size="xl" :padding="true" class="py-20">
      <h2 class="text-3xl font-bold text-neutral-black dark:text-neutral-white mb-12 text-center">
        Explorez les composants
      </h2>

      <LayoutGrid :cols="2" gap="lg" :responsive="{ sm: 1, md: 2 }">

        <!-- Card 1: UI Components -->
        <NuxtLink to="/design-system/components" class="group block">
          <Card variant="elevated" class="hover:shadow-xl transition-all duration-300 h-full">
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="text-2xl font-bold text-neutral-black dark:text-neutral-white">UI Components</h3>
                <svg class="w-6 h-6 text-primary group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </template>

            <p class="text-neutral-dark dark:text-neutral-medium mb-6">
              Composants atomiques avec CSS natif et BEM
            </p>

            <ul class="space-y-2 text-sm text-neutral-dark dark:text-neutral-medium">
              <li class="flex items-start">
                <span class="text-primary mr-2">•</span>
                <span>Buttons (5 variantes + 3 tailles)</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary mr-2">•</span>
                <span>Forms (Input, Checkbox, Switch, Dropdown)</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary mr-2">•</span>
                <span>Badge (6 variantes sémantiques)</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary mr-2">•</span>
                <span>Card (3 variantes + slots)</span>
              </li>
            </ul>
          </Card>
        </NuxtLink>

        <!-- Card 2: Feedback Components -->
        <NuxtLink to="/design-system/feedback" class="group block">
          <Card variant="elevated" class="hover:shadow-xl transition-all duration-300 h-full">
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="text-2xl font-bold text-neutral-black dark:text-neutral-white">Feedback</h3>
                <svg class="w-6 h-6 text-primary group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </template>

            <p class="text-neutral-dark dark:text-neutral-medium mb-6">
              Retours utilisateur et composants d'interaction
            </p>

            <ul class="space-y-2 text-sm text-neutral-dark dark:text-neutral-medium">
              <li class="flex items-start">
                <span class="text-primary mr-2">•</span>
                <span>Toast (notifications temporaires)</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary mr-2">•</span>
                <span>Modal (dialogues et confirmations)</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary mr-2">•</span>
                <span>Tooltip (infobulles contextuelles)</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary mr-2">•</span>
                <span>ProgressBar (indicateurs de chargement)</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary mr-2">•</span>
                <span>Tabs (navigation interne)</span>
              </li>
            </ul>
          </Card>
        </NuxtLink>

        <!-- Card 3: Layouts -->
        <NuxtLink to="/design-system/layouts" class="group block">
          <Card variant="elevated" class="hover:shadow-xl transition-all duration-300 h-full">
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="text-2xl font-bold text-neutral-black dark:text-neutral-white">Layouts</h3>
                <svg class="w-6 h-6 text-primary group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </template>

            <p class="text-neutral-dark dark:text-neutral-medium mb-6">
              Composants de structure avec Tailwind utilities
            </p>

            <ul class="space-y-2 text-sm text-neutral-dark dark:text-neutral-medium">
              <li class="flex items-start">
                <span class="text-primary mr-2">•</span>
                <span>Container (5 tailles responsives)</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary mr-2">•</span>
                <span>Grid (système responsive avancé)</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary mr-2">•</span>
                <span>Stack (flex wrapper vertical/horizontal)</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary mr-2">•</span>
                <span>SplitPane (layout 2 colonnes)</span>
              </li>
            </ul>
          </Card>
        </NuxtLink>

        <!-- Card 4: Sections -->
        <NuxtLink to="/design-system/sections" class="group block">
          <Card variant="elevated" class="hover:shadow-xl transition-all duration-300 h-full">
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="text-2xl font-bold text-neutral-black dark:text-neutral-white">Sections</h3>
                <svg class="w-6 h-6 text-primary group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </template>

            <p class="text-neutral-dark dark:text-neutral-medium mb-6">
              Sections complètes prêtes à l'emploi
            </p>

            <ul class="space-y-2 text-sm text-neutral-dark dark:text-neutral-medium">
              <li class="flex items-start">
                <span class="text-primary mr-2">•</span>
                <span>Hero (2 variantes: primary/gradient)</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary mr-2">•</span>
                <span>CTA (Call-to-Action avec boutons)</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary mr-2">•</span>
                <span>FeaturesGrid (grille de features)</span>
              </li>
            </ul>
          </Card>
        </NuxtLink>

      </LayoutGrid>
    </LayoutContainer>

    <!-- Footer CTA -->
    <SectionsCTA
      title="Prêt à utiliser le Design System ?"
      description="Découvrez tous les composants et commencez à construire votre interface"
      primary-text="Explorer les composants"
      variant="gradient"
      :centered="true"
      @primary-click="navigateTo('/design-system/components')"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * DESIGN SYSTEM LANDING PAGE (PHASE 13)
 *
 * @dev Page d'accueil avec navigation vers 4 catégories
 * @dev Tailwind utilities uniquement
 * @dev Grid 2x2 responsive
 * @dev Cards cliquables avec hover effects
 */

// Meta tags
useHead({
  title: 'Design System - SwaveConnexion',
  meta: [
    { name: 'description', content: 'Système de design minimaliste avec composants UI, layouts et sections prêtes à l\'emploi' }
  ]
});
</script>
