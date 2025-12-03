<template>
  <!--
    Composant CTA - Call To Action

    Description : Section d'appel à l'action avec titre, description et boutons

    Structure:
    ┌────────────────────────────────────────────┐
    │     Container (max-width, centered)        │
    │  ┌──────────────────────────────────────┐  │
    │  │          Titre Principal            │  │
    │  │          Sous-titre/Desc            │  │
    │  │   ┌────────┐      ┌────────┐       │  │
    │  │   │ Button │      │ Button │       │  │
    │  │   │Primary │      │Secondary│      │  │
    │  │   └────────┘      └────────┘       │  │
    │  └──────────────────────────────────────┘  │
    └────────────────────────────────────────────┘

    Input (Props) :
      - title : string (requis) - Titre principal
      - description : string (optionnel) - Description/sous-titre
      - primaryText : string (défaut: "Commencer") - Texte bouton principal
      - secondaryText : string (optionnel) - Texte bouton secondaire
      - variant : 'primary' | 'gradient' (défaut: 'primary') - Style de fond
      - centered : boolean (défaut: true) - Centrer le contenu

    Output (Events) :
      - primary-click : Émis lors du clic sur bouton principal
      - secondary-click : Émis lors du clic sur bouton secondaire

    Slots :
      Aucun (données via props)

    @dev Utilise LayoutContainer et LayoutStack de Phase 9
    @dev Tailwind utilities pour styling
    @dev Variantes: fond primary ou gradient
  -->
  <section :class="sectionClass">
    <LayoutContainer size="xl" :padding="true">
      <LayoutStack
        direction="vertical"
        gap="lg"
        :align="centered ? 'center' : 'start'"
        justify="center"
      >
        <!-- Title -->
        <h2 :class="titleClass">
          {{ title }}
        </h2>

        <!-- Description -->
        <p v-if="description" :class="descriptionClass">
          {{ description }}
        </p>

        <!-- Buttons -->
        <LayoutStack
          direction="horizontal"
          gap="md"
          align="center"
          :justify="centered ? 'center' : 'start'"
        >
          <!-- Primary Button -->
          <Button
            variant="primary"
            size="lg"
            @click="handlePrimaryClick"
          >
            {{ primaryText }}
          </Button>

          <!-- Secondary Button (optional) -->
          <Button
            v-if="secondaryText"
            :variant="variant === 'gradient' ? 'outline-light' : 'outline'"
            size="lg"
            @click="handleSecondaryClick"
          >
            {{ secondaryText }}
          </Button>
        </LayoutStack>
      </LayoutStack>
    </LayoutContainer>
  </section>
</template>

<script setup lang="ts">
/**
 * CTA COMPONENT (PHASE 10)
 *
 * @dev Utilise Container + Stack de Phase 9
 * @dev Tailwind utilities pour styling
 * @dev Variantes: fond primary ou gradient
 * @dev Buttons avec events personnalisés
 */

// Props
interface Props {
  title: string;
  description?: string;
  primaryText?: string;
  secondaryText?: string;
  variant?: 'primary' | 'gradient';
  centered?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  primaryText: 'Commencer',
  variant: 'primary',
  centered: true,
});

// Events
interface Emits {
  'primary-click': [];
  'secondary-click': [];
}

const emit = defineEmits<Emits>();

// Computed classes
const sectionClass = computed(() => {
  const baseClasses = 'py-20';

  const variantClasses = {
    primary: 'bg-primary',
    gradient: 'bg-gradient-to-r from-primary to-accent',
  };

  return [
    baseClasses,
    variantClasses[props.variant],
  ].join(' ');
});

const titleClass = computed(() => {
  return [
    'text-4xl md:text-5xl font-bold text-white',
    props.centered ? 'text-center' : 'text-left',
  ].join(' ');
});

const descriptionClass = computed(() => {
  return [
    'text-xl text-white/90 max-w-2xl',
    props.centered ? 'text-center mx-auto' : 'text-left',
  ].join(' ');
});

// Event handlers
const handlePrimaryClick = () => {
  emit('primary-click');
};

const handleSecondaryClick = () => {
  emit('secondary-click');
};
</script>
