<template>
  <div class="btn-promo-swave">
    <ButtonSwave :disabled="disabled" class="btn-promo-swave__main">
      <slot />
    </ButtonSwave>
    <span class="btn-promo-swave__extension">
      {{ promo }}
    </span>
  </div>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────────────┐
  │                      BUTTON PROMO SWAVE                             │
  │  ┌────────────────────────────────────────────────────────────────┐ │
  │  │  ╭─────────────────────────╮╭────────────────╮                 │ │
  │  │  │    [slot: texte]        ││    [promo]     │                 │ │
  │  │  │    ButtonSwave          ││   extension    │                 │ │
  │  │  │    bg: primary          ││   bg: transp.  │                 │ │
  │  │  │    z-index: 2           ││   z-index: 1   │                 │ │
  │  │  ╰─────────────────────────╯╰────────────────╯                 │ │
  │  │         ↑ chevauchement (margin-left négatif)                  │ │
  │  └────────────────────────────────────────────────────────────────┘ │
  │                                                                     │
  │  Props:                                                             │
  │    • promo: string (default: "CODE") - Texte de l'extension        │
  │    • disabled: boolean (default: false) - Passé à ButtonSwave      │
  │                                                                     │
  │  Slots:                                                             │
  │    • default: Contenu du bouton principal (passé à ButtonSwave)    │
  │                                                                     │
  │  Events:                                                            │
  │    • click: MouseEvent - Natif (sur ButtonSwave)                   │
  └─────────────────────────────────────────────────────────────────────┘

  Bouton Swave avec extension promo à droite (code promo, réduction, etc.)
  Compose ButtonSwave en interne pour réutilisation.

  @dev CSS natif avec variables de _variables.css
  @dev BEM strict : .btn-promo-swave, .btn-promo-swave__main, .btn-promo-swave__extension
*/

interface Props {
  promo?: string;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  promo: 'CODE',
  disabled: false,
});
</script>

<style scoped>
/**
 * BUTTON PROMO SWAVE STYLES - BEM strict
 *
 * Wrapper flex avec bouton principal + extension promo
 * L'extension passe "sous" le bouton via z-index et margin-left négatif
 */

.btn-promo-swave {
  display: inline-flex;
  position: relative;
  width: 100%;

  /* XS (< 480px): Stack vertical */
  flex-direction: column;
  align-items: stretch;
  gap:8px;

  /* SM (≥ 480px): Horizontal */
  @media (min-width: 480px) {
    flex-direction: row;
    align-items: center;
    gap:0px;
  }

  /* Desktop (≥ 768px): taille selon contenu */
  @media (min-width: 768px) {
    width: fit-content;
  }
}

.btn-promo-swave__main {
  position: relative;
  z-index: 2;
}

/* Override ButtonSwave internal styles */
.btn-promo-swave__main:deep(.btn-swave) {
  /* XS/SM: s'étire pour remplir l'espace */
  width: 100%;
  min-width: 0;

  /* Desktop: taille selon contenu, sans min-width */
  @media (min-width: 768px) {
    width: auto;
    min-width: auto;
  }
}

.btn-promo-swave__extension {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-sans);
  font-weight: var(--font-medium);
  font-size: var(--text-md);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--primary);
  background-color: transparent;
  box-shadow: inset 0px 0px 0px 1px var(--primary);
  position: relative;
  z-index: 1;
  white-space: nowrap;

  /* XS (< 480px): Pill complet en dessous */
  padding: 1rem 3rem;
  border-radius: 9999px;

  /* SM (≥ 480px): Extension à droite */
  @media (min-width: 480px) {
    padding: 1rem 3rem 1rem 2.5rem;
    margin-left: -1.5rem;
    margin-top: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    flex-shrink: 0;
  }
}
</style>
