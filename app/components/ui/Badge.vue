<template>
  <!--
    Composant Badge - Tag/Badge

    Description : Badge coloré pour statuts, tags

    Input (Props) :
      - variant : 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error'
      - size : 'sm' | 'md'

    Slots :
      - default : Contenu du badge
  -->
  <span :class="badgeClass">
    <slot />
  </span>
</template>

<script setup lang="ts">
/**
 * BADGE COMPONENT
 *
 * @dev Simple span inline avec couleurs sémantiques
 * @dev BEM : .badge, .badge--primary, .badge--sm
 */

// Props
interface Props {
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
});

// Computed class BEM
const badgeClass = computed(() => {
  return [
    'badge',
    `badge--${props.variant}`,
    `badge--${props.size}`,
  ].join(' ');
});
</script>

<style scoped>
/**
 * BADGE STYLES - BEM strict
 */

/* Block : .badge */
.badge {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-sans);
  font-weight: var(--font-medium);
  border-radius: var(--radius-full);
  white-space: nowrap;
}

/* Modifier : Variantes */
.badge--primary {
  background-color: var(--primary-light);
  color: var(--primary-dark);
}

.badge--secondary {
  background-color: var(--secondary-light);
  color: var(--secondary-dark);
}

.badge--accent {
  background-color: var(--accent-light);
  color: var(--accent-dark);
}

.badge--success {
  background-color: #d1fae5;
  color: #047857; /* WCAG AA: 4.8:1 (avant: #10b981 = 2.87:1) */
}

.badge--warning {
  background-color: #fef3c7;
  color: #92400e; /* WCAG AA: 4.5:1 (avant: #f59e0b = 3.21:1) */
}

.badge--error {
  background-color: #fee2e2;
  color: #991b1b; /* WCAG AA: 4.6:1 (avant: #ef4444 = 2.93:1) */
}

/* Modifier : Tailles */
.badge--sm {
  padding: 0.25rem 0.5rem;
  font-size: var(--text-xs);
}

.badge--md {
  padding: 0.375rem 0.75rem;
  font-size: var(--text-sm);
}
</style>
