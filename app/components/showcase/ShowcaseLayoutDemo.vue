<template>
  <!--
    Composant LayoutDemo - Wrapper pour visualisation de layouts

    Description : Ajoute des bordures néon colorées pour rendre visibles les layouts
                  Utilisé UNIQUEMENT sur /design-system/layouts pour la démo

    Props :
      - color : Couleur du néon (primary, secondary, accent, success, etc.)
      - variant : Style de visualisation (neon, gradient, dashed)

    @dev Phase 13: Visualisation layouts
    @dev NE PAS utiliser en production (uniquement showcase)
  -->
  <div :class="demoClass">
    <slot />
  </div>
</template>

<script setup lang="ts">
/**
 * LAYOUTDEMO COMPONENT (PHASE 13)
 *
 * @dev Wrapper qui ajoute des styles de visualisation aux layouts
 * @dev Bordures néon colorées ou gradients pour voir les limites
 * @dev Utilisé UNIQUEMENT dans /design-system/layouts.vue
 */

// Props
interface Props {
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'info' | 'warning' | 'error';
  variant?: 'neon' | 'gradient' | 'dashed';
}

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
  variant: 'neon',
});

// Computed class
const demoClass = computed(() => {
  const baseClasses = 'layout-demo';
  const colorClass = `layout-demo--${props.color}`;
  const variantClass = `layout-demo--${props.variant}`;

  return [baseClasses, colorClass, variantClass].join(' ');
});
</script>

<style scoped>
/**
 * LAYOUT DEMO STYLES
 *
 * Styles de visualisation pour les layouts showcase
 * NE PAS utiliser en production !
 */

/* Base */
.layout-demo {
  position: relative;
}

/* ============================================
   VARIANT: NEON (Défaut)
   ============================================ */

.layout-demo--neon {
  border: 2px solid;
  border-radius: 0.5rem;
  padding: 0.25rem;
  background: rgba(255, 255, 255, 0.02);
}

/* Dark mode: bordure plus visible */
.dark .layout-demo--neon {
  background: rgba(0, 0, 0, 0.1);
}

/* Couleurs néon */
.layout-demo--primary.layout-demo--neon {
  border-color: #2563eb;
  box-shadow: 0 0 10px rgba(37, 99, 235, 0.5), inset 0 0 10px rgba(37, 99, 235, 0.1);
}

.layout-demo--secondary.layout-demo--neon {
  border-color: #525252;
  box-shadow: 0 0 10px rgba(82, 82, 82, 0.5), inset 0 0 10px rgba(82, 82, 82, 0.1);
}

.layout-demo--accent.layout-demo--neon {
  border-color: #f59e0b;
  box-shadow: 0 0 10px rgba(245, 158, 11, 0.6), inset 0 0 10px rgba(245, 158, 11, 0.1);
}

.layout-demo--success.layout-demo--neon {
  border-color: #10b981;
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.6), inset 0 0 10px rgba(16, 185, 129, 0.1);
}

.layout-demo--info.layout-demo--neon {
  border-color: #3b82f6;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.6), inset 0 0 10px rgba(59, 130, 246, 0.1);
}

.layout-demo--warning.layout-demo--neon {
  border-color: #f59e0b;
  box-shadow: 0 0 10px rgba(245, 158, 11, 0.6), inset 0 0 10px rgba(245, 158, 11, 0.1);
}

.layout-demo--error.layout-demo--neon {
  border-color: #ef4444;
  box-shadow: 0 0 10px rgba(239, 68, 68, 0.6), inset 0 0 10px rgba(239, 68, 68, 0.1);
}

/* ============================================
   VARIANT: GRADIENT
   ============================================ */

.layout-demo--gradient {
  border: 3px solid transparent;
  border-radius: 0.5rem;
  padding: 0.25rem;
  background-origin: border-box;
  background-clip: padding-box, border-box;
}

.layout-demo--primary.layout-demo--gradient {
  background-image:
    linear-gradient(white, white),
    linear-gradient(90deg, #2563eb, #60a5fa, #2563eb);
}

.dark .layout-demo--primary.layout-demo--gradient {
  background-image:
    linear-gradient(#262626, #262626),
    linear-gradient(90deg, #2563eb, #60a5fa, #2563eb);
}

.layout-demo--accent.layout-demo--gradient {
  background-image:
    linear-gradient(white, white),
    linear-gradient(90deg, #f59e0b, #fbbf24, #f59e0b);
}

.dark .layout-demo--accent.layout-demo--gradient {
  background-image:
    linear-gradient(#262626, #262626),
    linear-gradient(90deg, #f59e0b, #fbbf24, #f59e0b);
}

.layout-demo--success.layout-demo--gradient {
  background-image:
    linear-gradient(white, white),
    linear-gradient(90deg, #10b981, #34d399, #10b981);
}

.dark .layout-demo--success.layout-demo--gradient {
  background-image:
    linear-gradient(#262626, #262626),
    linear-gradient(90deg, #10b981, #34d399, #10b981);
}

/* ============================================
   VARIANT: DASHED
   ============================================ */

.layout-demo--dashed {
  border: 2px dashed;
  border-radius: 0.5rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.02);
}

.dark .layout-demo--dashed {
  background: rgba(0, 0, 0, 0.1);
}

.layout-demo--primary.layout-demo--dashed {
  border-color: #2563eb;
}

.layout-demo--accent.layout-demo--dashed {
  border-color: #f59e0b;
}

.layout-demo--success.layout-demo--dashed {
  border-color: #10b981;
}

.layout-demo--error.layout-demo--dashed {
  border-color: #ef4444;
}
</style>
