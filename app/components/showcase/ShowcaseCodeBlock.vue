<template>
  <!--
    Composant ShowcaseCodeBlock - Code snippet display

    Description : Affiche du code source avec styling

    Input (Props) :
      - code : string (optionnel) - Code à afficher (via prop)
      - language : string (optionnel) - Language du code (typescript, vue, etc.)

    Slots :
      - default : Code à afficher (via slot, priorité sur prop)

    @dev Tailwind utilities uniquement (NO CSS natif scoped)
    @dev Monospace font (JetBrains Mono)
    @dev Dark background avec scroll horizontal
  -->
  <div class="my-4">
    <pre class="showcase-code p-6 rounded-lg overflow-x-auto font-mono text-sm leading-relaxed">{{ displayCode }}</pre>
  </div>
</template>

<script setup lang="ts">
/**
 * CODEBLOCK COMPONENT (PHASE 13)
 *
 * @dev Code snippet display
 * @dev CSS scoped pour couleurs (variables sémantiques)
 * @dev Tailwind utilities pour layout
 * @dev Monospace font avec dark background
 * @dev Support prop ou slot content
 */

// Props
interface Props {
  code?: string;
  language?: string;
}

const props = defineProps<Props>();
const slots = useSlots();

// Computed: Récupérer le code depuis prop ou slot
const displayCode = computed(() => {
  // Priorité au slot
  if (slots.default) {
    const slotContent = slots.default();
    if (slotContent && slotContent[0] && typeof slotContent[0].children === 'string') {
      return slotContent[0].children.trim();
    }
  }

  // Sinon utiliser la prop
  return props.code || '';
});
</script>

<style scoped>
/**
 * SHOWCASECODEBLOCK STYLES
 *
 * @dev Variables CSS sémantiques (adapté dark mode)
 */

.showcase-code {
  background-color: var(--bg-code);
  color: var(--text-code);
}
</style>
