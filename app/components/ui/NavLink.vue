<template>
  <NuxtLink :to="to" :class="linkClass" :style="linkStyle">
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────┐
  │                        NAVLINK                              │
  │  ┌───────────────────────────────────────────────────────┐  │
  │  │  <NuxtLink class="navlink navlink--{variant}">       │  │
  │  │    [slot: texte du lien]                             │  │
  │  │  </NuxtLink>                                         │  │
  │  └───────────────────────────────────────────────────────┘  │
  │                                                             │
  │  Props:                                                     │
  │    • to: string (requis) - URL du lien                     │
  │    • variant: 'light' | 'dark' (défaut: 'light')           │
  │                                                             │
  │  Slots:                                                     │
  │    • default: Contenu du lien                              │
  │                                                             │
  │  Events: natifs (click)                                     │
  │                                                             │
  │  Note: Inspiré de Text.vue - styles inline + CSS scoped    │
  └─────────────────────────────────────────────────────────────┘

  Lien de navigation avec deux variantes de couleur.

  @dev CSS natif avec variables de _variables.css
  @dev BEM strict : .navlink, .navlink--light, .navlink--dark
*/

interface Props {
  to: string;
  variant?: 'light' | 'dark';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'light',
});

// Classe BEM pour la variante
const linkClass = computed(() => ['navlink', `navlink--${props.variant}`]);

// Styles inline (comme Text.vue)
const linkStyle = computed(() => ({
  fontFamily: 'var(--font-sans)',
  fontSize: 'var(--text-sm)',
  fontWeight: 'var(--font-medium)',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
}));
</script>

<style scoped>
/**
 * NAVLINK STYLES - BEM strict
 *
 * Lien de navigation avec underline au hover.
 * Deux variantes : light (texte blanc) et dark (texte sombre).
 *
 * @dev Variables de _variables.css
 */

.navlink {
  text-decoration: none;
  position: relative;
  transition: opacity 0.2s ease, color 0.3s ease;
}

.navlink:hover {
  opacity: 0.8;
}

/* Underline on hover */
.navlink::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 1px;
  transition: width 0.2s ease, background-color 0.3s ease;
}

.navlink:hover::after {
  width: 100%;
}

/* Variant: light (texte blanc sur fond sombre) */
.navlink--light {
  color: var(--text-inverse);
}

.navlink--light::after {
  background-color: var(--text-inverse);
}

/* Variant: dark (texte sombre sur fond clair) */
.navlink--dark {
  color: var(--text-strong);
}

.navlink--dark::after {
  background-color: var(--text-strong);
}
</style>
