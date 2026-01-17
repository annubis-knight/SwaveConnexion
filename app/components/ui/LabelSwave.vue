<template>
  <div class="label-swave">
    <!-- Icône pin -->
    <svg
      class="label-swave__icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
        fill="currentColor"
      />
    </svg>
    <!-- Texte du label -->
    <Text as="span" size="sm" weight="light" transform="uppercase" color="primary">
      <slot />
    </Text>
  </div>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────┐
  │                      LABEL SWAVE                            │
  │  ┌───────────────────────────────────────────────────────┐  │
  │  │  .label-swave (inline-flex, border pill)              │  │
  │  │  ┌──────────────────────────────────────────────────┐ │  │
  │  │  │  ╭──────────────────────────────────────────╮    │ │  │
  │  │  │  │  📍  BARCELONE                           │    │ │  │
  │  │  │  ╰──────────────────────────────────────────╯    │ │  │
  │  │  │  ↑ icon pin + Text uppercase primary             │ │  │
  │  │  └──────────────────────────────────────────────────┘ │  │
  │  │  border: 1px primary, border-radius: pill             │  │
  │  └───────────────────────────────────────────────────────┘  │
  │                                                             │
  │  Props: Aucune                                              │
  │                                                             │
  │  Slots:                                                     │
  │    • default: Texte du label (ex: "BARCELONE")              │
  │                                                             │
  │  Events: Aucun (composant de présentation pure)             │
  └─────────────────────────────────────────────────────────────┘

  @dev Label pill avec icône pin pour localisation
  @dev CSS natif avec variables de _variables.css
  @dev BEM strict : .label-swave, .label-swave__icon
*/
</script>

<style scoped>
/**
 * LABEL SWAVE STYLES - BEM strict
 *
 * Label pill avec bordure primary et icône pin
 */

/* Block : .label-swave */
.label-swave {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  width: fit-content;
  padding: 6px 16px;
  border: 1px solid var(--primary);
  border-radius: 9999px;
  background-color: transparent;
}

/* Element : .label-swave__icon */
.label-swave__icon {
  width: 16px;
  height: 16px;
  color: var(--primary);
  flex-shrink: 0;
}
</style>
