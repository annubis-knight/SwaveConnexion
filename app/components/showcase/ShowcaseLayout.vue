<template>
  <!--
    Composant ShowcaseLayout - Layout pour pages showcase

    Description : Wrapper réutilisable pour toutes les pages du design system

    Structure:
    ┌─────────────────────────────────────────────┐
    │         Breadcrumb Navigation               │
    ├─────────────────────────────────────────────┤
    │       Gradient Header (title + desc)        │
    ├─────────────────────────────────────────────┤
    │                                             │
    │           Slot Content Area                 │
    │     (ShowcaseSection components)            │
    │                                             │
    └─────────────────────────────────────────────┘

    Input (Props) :
      - title : string (requis) - Titre de la page
      - description : string (requis) - Description de la page

    Slots :
      - default : Contenu de la page (ShowcaseSection)

    @dev CSS scoped pour couleurs (variables sémantiques)
    @dev Tailwind utilities pour layout
    @dev Breadcrumb avec lien vers /design-system
    @dev Gradient header avec title + description
  -->
  <div class="showcase-layout min-h-screen">
    <!-- Breadcrumb -->
    <div class="showcase-breadcrumb border-b">
      <LayoutContainer size="full" :padding="true">
        <nav class="py-4 text-sm">
          <NuxtLink to="/design-system" class="text-primary hover:underline font-medium transition-colors">
            Design System
          </NuxtLink>
          <span class="mx-2 breadcrumb-separator">/</span>
          <span class="breadcrumb-active font-semibold">
            {{ title }}
          </span>
        </nav>
      </LayoutContainer>
    </div>

    <!-- Header avec gradient -->
    <div class="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
      <LayoutContainer size="full" :padding="true">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ title }}</h1>
        <p class="text-xl text-white/90 max-w-3xl">{{ description }}</p>
      </LayoutContainer>
    </div>

    <!-- Content Area -->
    <LayoutContainer size="2xl" :padding="true" class="py-12">
      <slot />
    </LayoutContainer>
  </div>
</template>

<script setup lang="ts">
/**
 * SHOWCASELAYOUT COMPONENT (PHASE 13)
 *
 * @dev Layout wrapper pour pages showcase
 * @dev CSS scoped pour couleurs (variables sémantiques)
 * @dev Tailwind utilities pour layout
 * @dev Breadcrumb + Gradient header + Content area
 * @dev Utilisé par components.vue, feedback.vue, layouts.vue, sections.vue
 */

// Props
interface Props {
  title: string;
  description: string;
}

defineProps<Props>();
</script>

<style scoped>
/**
 * SHOWCASELAYOUT STYLES
 *
 * @dev Variables CSS sémantiques (adapté dark mode)
 */

.showcase-layout {
  background-color: var(--bg-subtle);
}

.showcase-breadcrumb {
  background-color: var(--bg-base);
  border-color: var(--border-base);
}

.breadcrumb-separator {
  color: var(--text-subtle);
}

.breadcrumb-active {
  color: var(--text-strong);
}
</style>
