<template>
  <!--
    Composant ShowcaseSection - Section wrapper

    Description : Card wrapper pour chaque section de showcase

    Structure:
    ┌─────────────────────────────────────────────┐
    │           Title (h2)                        │
    ├─────────────────────────────────────────────┤
    │                                             │
    │       White Card Container                  │
    │         (Slot Content)                      │
    │                                             │
    └─────────────────────────────────────────────┘

    Input (Props) :
      - title : string (requis) - Titre de la section

    Slots :
      - default : Contenu de la section (démos, code, etc.)

    @dev CSS scoped pour couleurs (variables sémantiques)
    @dev Tailwind utilities pour layout
    @dev White card avec border et padding
    @dev Dark mode support
  -->
  <section class="mb-12">
    <h2 class="showcase-title text-2xl md:text-3xl font-bold mb-6">
      {{ title }}
    </h2>
    <div class="showcase-card rounded-lg p-8 shadow-sm">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * SHOWCASESECTION COMPONENT (PHASE 13)
 *
 * @dev Section wrapper pour showcase pages
 * @dev CSS scoped pour couleurs (variables sémantiques)
 * @dev Tailwind utilities pour layout
 * @dev Title + white card container
 * @dev Utilisé dans ShowcaseLayout pour organiser le contenu
 */

// Props
interface Props {
  title: string;
}

defineProps<Props>();
</script>

<style scoped>
/**
 * SHOWCASESECTION STYLES
 *
 * @dev Variables CSS sémantiques (adapté dark mode)
 */

.showcase-title {
  color: var(--text-strong);
}

.showcase-card {
  background-color: var(--bg-base);
  border: 1px solid var(--border-base);
}
</style>
