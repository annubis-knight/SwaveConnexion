<template>
  <component
    :is="tag"
    class="btn-swave"
    :class="{ 'btn-swave--disabled': disabled }"
    :href="href || undefined"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
    :disabled="tag === 'button' ? disabled : undefined"
  >
    <!-- Shine effect - light beam crossing on hover -->
    <span class="btn-swave__shine"></span>
    <span class="btn-swave__content">
      <slot />
    </span>
  </component>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────┐
  │                      BUTTON SWAVE                           │
  │  ┌───────────────────────────────────────────────────────┐  │
  │  │  ╭───────────────────────────────────────────────────╮ │  │
  │  │  │  ~~~> shine (faisceau lumineux)                   │ │  │
  │  │  │  [slot: texte]                                    │ │  │
  │  │  ╰───────────────────────────────────────────────────╯ │  │
  │  └───────────────────────────────────────────────────────┘  │
  │                                                             │
  │  Props:                                                     │
  │    • disabled: boolean (default: false)                     │
  │    • href: string - Si fourni, rend un <a> au lieu de <button>│
  │    • external: boolean - Ouvre dans un nouvel onglet         │
  │      (target=_blank + rel=noopener noreferrer)               │
  │                                                             │
  │  Slots:                                                     │
  │    • default: Contenu du bouton (texte)                     │
  │                                                             │
  │  Events:                                                    │
  │    • click: MouseEvent - Natif                              │
  │                                                             │
  │  Hover Effect:                                              │
  │    • Shine: Faisceau lumineux + glow box-shadow             │
  └─────────────────────────────────────────────────────────────┘

  Bouton pill style Swave : fond bleu, bordure blanche, très arrondi

  @dev CSS natif avec variables de _variables.css
  @dev BEM strict : .btn-swave, .btn-swave--disabled
  @dev Polymorphe : <button> par défaut, <a> si prop `href` (lien externe)
*/

interface Props {
  disabled?: boolean;
  href?: string;
  external?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  href: undefined,
  external: false,
});

/* <a> quand href fourni (lien), sinon <button> */
const tag = computed(() => (props.href ? 'a' : 'button'));

/* Lien externe : nouvel onglet + rel sécurisé (best practice) */
const isExternal = computed(() => Boolean(props.href && props.external));
</script>

<style scoped>
/**
 * BUTTON SWAVE STYLES - BEM strict
 *
 * Style pill : bordure blanche 1px, fond bleu Swave, border-radius full
 * Hover effect : Shine (faisceau lumineux + glow)
 */

.btn-swave {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 3rem;
  font-family: var(--font-sans);
  font-weight: var(--font-medium);
  font-size: var(--text-md);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-inverse);
  text-decoration: none;
  background-color: var(--primary);
  border: 1px solid var(--border-base);
  border-radius: 9999px;
  cursor: pointer;
  overflow: hidden;
  isolation: isolate;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  /* Mobile: full width pour meilleure ergonomie tactile */
  width: 100%;

  /* Desktop: taille selon contenu */
  @media (min-width: 768px) {
    width: min-content;
    min-width: 300px;
  }
}

/* Content wrapper - always above background effects */
.btn-swave__content {
  position: relative;
  z-index: 3;
}

.btn-swave:focus-visible {
  outline: 2px solid var(--border-base);
  outline-offset: 2px;
}

.btn-swave--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ============================================
   HOVER EFFECT: SHINE - Faisceau lumineux + glow
   ============================================ */

.btn-swave__shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    120deg,
    transparent,
    rgba(239, 246, 255, 0.4),
    transparent
  );
  transition: left 650ms ease;
  z-index: 1;
  pointer-events: none;
}

.btn-swave:hover:not(.btn-swave--disabled) {
  background-color: var(--primary-dark);
  box-shadow: 1px 1px 25px 10px rgba(239, 246, 255, 0.4);
}

.btn-swave:hover:not(.btn-swave--disabled) .btn-swave__shine {
  left: 100%;
}

/* ============================================
   ANCIEN EFFET HALO - Conservé pour réactivation future
   ============================================

   Pour réactiver cet effet :
   1. Décommenter ce bloc CSS
   2. Ajouter la prop hoverEffect: 'default' | 'halo'
   3. Ajouter dans le template (avant btn-swave__content) :
      <template v-if="hoverEffect === 'halo'">
        <span class="btn-swave__halo btn-swave__halo--1"></span>
        <span class="btn-swave__halo btn-swave__halo--2"></span>
        <span class="btn-swave__halo btn-swave__halo--3"></span>
        <span class="btn-swave__halo btn-swave__halo--4"></span>
      </template>
   4. Ajouter la classe `btn-swave--hover-${hoverEffect}` sur le button

.btn-swave__halo {
  --size: 60px;
  --mix: 50%;
  --mix-color: white;
  --duration: 5s;
  --delay: 0s;
  position: absolute;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  background: color-mix(in srgb, var(--primary) var(--mix), var(--mix-color));
  filter: blur(20px);
  opacity: 0;
  pointer-events: none;
  z-index: 1;
  transition: opacity 0.4s ease;
  animation: halo-drift var(--duration) ease-in-out var(--delay) infinite;
}

.btn-swave__halo--1 { --size: 80px; --mix: 30%; --duration: 6s; top: -5px; left: 10%; }
.btn-swave__halo--2 { --size: 60px; --mix: 60%; --duration: 5s; --delay: -1s; bottom: -5px; right: 5%; }
.btn-swave__halo--3 { --size: 50px; --mix: 60%; --mix-color: black; --duration: 4s; --delay: -2s; top: 5%; left: 5%; }
.btn-swave__halo--4 { --size: 40px; --mix: 80%; --duration: 3.5s; --delay: -0.5s; top: -10px; right: 5%; }

.btn-swave--hover-halo:hover:not(.btn-swave--disabled) .btn-swave__halo {
  opacity: 0.7;
}

@keyframes halo-drift {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(25px, -15px) scale(1.1); }
  50% { transform: translate(-20px, 20px) scale(0.9); }
  75% { transform: translate(15px, 10px) scale(1.05); }
}

============================================ */
</style>
