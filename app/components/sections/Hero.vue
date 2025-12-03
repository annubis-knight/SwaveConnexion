<template>
  <!--
    Composant Hero - Section d'en-tête

    Description : Section impactante en haut de page avec variants de fond

    Props :
      - variant : 'default' | 'primary' | 'gradient' | 'dark' (défaut: 'default')
      - centered : boolean (centrer le contenu, défaut: true)

    Slots :
      - default : Contenu du Hero (titre, description, CTA)

    @dev Tailwind utilities pour layouts
    @dev Variants via classes dynamiques
  -->
  <section :class="heroClass">
    <div class="container mx-auto px-6 py-20 lg:py-32">
      <div :class="contentClass">
        <slot>
          <h1 class="text-5xl lg:text-6xl font-bold mb-6">
            Design System Moderne
          </h1>
          <p class="text-xl lg:text-2xl mb-8 max-w-2xl">
            Créez des interfaces élégantes avec SwaveConnexion
          </p>
          <div class="flex gap-4 flex-wrap">
            <button class="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Commencer
            </button>
            <button class="px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
              En savoir plus
            </button>
          </div>
        </slot>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * HERO COMPONENT
 *
 * @dev Tailwind utilities UNIQUEMENT (NO CSS natif)
 * @dev Variants via computed class
 * @dev Responsive (py-20 lg:py-32)
 */

interface Props {
  variant?: 'default' | 'primary' | 'gradient' | 'dark';
  centered?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  centered: true,
});

const heroClass = computed(() => {
  const baseClasses = 'relative overflow-hidden';

  const variantClasses: Record<string, string> = {
    default: 'bg-gray-50 text-gray-900',
    primary: 'bg-blue-600 text-white',
    gradient: 'bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white',
    dark: 'bg-gray-900 text-white',
  };

  return [baseClasses, variantClasses[props.variant]].join(' ');
});

const contentClass = computed(() => {
  return props.centered ? 'text-center mx-auto' : '';
});
</script>
