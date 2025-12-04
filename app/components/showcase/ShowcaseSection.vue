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

    @dev Tailwind utilities uniquement (NO CSS natif scoped)
    @dev White card avec border et padding
    @dev Dark mode support
  -->
  <section class="mb-12">
    <h2 class="text-2xl md:text-3xl font-bold text-neutral-black dark:text-neutral-white mb-6">
      {{ title }}
    </h2>
    <div class="bg-white dark:bg-neutral-medium rounded-lg p-8 border border-gray-200 dark:border-neutral-dark shadow-sm">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * SHOWCASESECTION COMPONENT (PHASE 13)
 *
 * @dev Section wrapper pour showcase pages
 * @dev Tailwind utilities uniquement
 * @dev Title + white card container
 * @dev Utilisé dans ShowcaseLayout pour organiser le contenu
 */

// Props
interface Props {
  title: string;
}

defineProps<Props>();
</script>
