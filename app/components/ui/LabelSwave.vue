<template>
  <div class="label-swave">
    <!-- Icône optionnelle -->
    <svg
      v-if="showIcon"
      class="label-swave__icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        :d="iconPath"
        :fill="iconStyle === 'stroke' ? 'none' : 'currentColor'"
        :stroke="iconStyle === 'stroke' ? 'currentColor' : 'none'"
        :stroke-width="iconStyle === 'stroke' ? '1.5' : '0'"
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
  │  │  │  ↑ icon (pin/calendar/star/clock/check/heart)     │ │  │
  │  │  └──────────────────────────────────────────────────┘ │  │
  │  │  border: 1px primary, border-radius: pill             │  │
  │  └───────────────────────────────────────────────────────┘  │
  │                                                             │
  │  Props:                                                     │
  │    • showIcon: boolean (default: true)                      │
  │    • icon: 'pin' | 'calendar' | 'star' | 'clock' | ...      │
  │                                                             │
  │  Slots:                                                     │
  │    • default: Texte du label (ex: "BARCELONE")              │
  │                                                             │
  │  Events: Aucun (composant de présentation pure)             │
  └─────────────────────────────────────────────────────────────┘

  @dev Label pill avec icône optionnelle
  @dev CSS natif avec variables de _variables.css
  @dev BEM strict : .label-swave, .label-swave__icon
*/

type IconName = 'pin' | 'calendar' | 'star' | 'clock' | 'check' | 'heart';

interface Props {
  showIcon?: boolean;
  icon?: IconName;
}

const props = withDefaults(defineProps<Props>(), {
  showIcon: true,
  icon: 'pin',
});

/* Icônes avec leur style de rendu (fill ou stroke) */
const icons: Record<IconName, { path: string; style: 'fill' | 'stroke' }> = {
  pin: {
    path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
    style: 'fill',
  },
  calendar: {
    path: 'M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z',
    style: 'fill',
  },
  star: {
    path: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',
    style: 'fill',
  },
  clock: {
    path: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z',
    style: 'fill',
  },
  check: {
    path: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
    style: 'fill',
  },
  heart: {
    path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
    style: 'stroke',
  },
};

const iconPath = computed(() => icons[props.icon].path);
const iconStyle = computed(() => icons[props.icon].style);
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
