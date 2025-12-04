<template>
  <!--
    Composant ProgressBar - Barre de progression

    Description : Barre de progression linéaire avec variantes

    Input (Props) :
      - value : number (0-100, défaut: 0) - Progression
      - variant : 'primary' | 'success' | 'warning' | 'error' (défaut: 'primary')
      - showLabel : boolean (défaut: false) - Affiche le pourcentage
      - animated : boolean (défaut: false) - Animation de la barre

    Output (Events) :
      Aucun

    Slots :
      Aucun
  -->
  <div :class="progressClass">
    <div class="progress__track">
      <div
        class="progress__bar"
        :style="progressStyle"
        role="progressbar"
        :aria-valuenow="value"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
    <span v-if="showLabel" class="progress__label">{{ value }}%</span>
  </div>
</template>

<script setup lang="ts">
/**
 * PROGRESS BAR COMPONENT
 *
 * @dev CSS natif avec variables de _variables.css
 * @dev BEM strict : .progress, .progress__track, .progress__bar, .progress--animated
 * @dev Transition CSS smooth sur width
 */

// Props
interface Props {
  value?: number;
  variant?: 'primary' | 'success' | 'warning' | 'error';
  showLabel?: boolean;
  animated?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  value: 0,
  variant: 'primary',
  showLabel: false,
  animated: false,
});

// Computed class BEM
const progressClass = computed(() => {
  return [
    'progress',
    `progress--${props.variant}`,
    props.animated && 'progress--animated',
  ].filter(Boolean).join(' ');
});

// Computed style for progress bar width
const progressStyle = computed(() => {
  const clampedValue = Math.min(Math.max(props.value, 0), 100);
  return {
    width: `${clampedValue}%`,
  };
});
</script>

<style scoped>
/**
 * PROGRESS BAR STYLES - BEM strict
 *
 * @dev Variables de _variables.css
 */

/* Block : .progress */
.progress {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  width: 100%;
}

/* Element : .progress__track */
.progress__track {
  flex: 1;
  height: 8px;
  background-color: var(--bg-subtle);
  border-radius: var(--radius-full);
  overflow: hidden;
  position: relative;
}

/* Element : .progress__bar */
.progress__bar {
  height: 100%;
  border-radius: var(--radius-full);
  transition: width 0.3s ease;
}

/* Variant : primary */
.progress--primary .progress__bar {
  background-color: var(--primary);
}

/* Variant : success */
.progress--success .progress__bar {
  background-color: var(--success);
}

/* Variant : warning */
.progress--warning .progress__bar {
  background-color: var(--warning);
}

/* Variant : error */
.progress--error .progress__bar {
  background-color: var(--error);
}

/* Modifier : animated (stripe animation) */
.progress--animated .progress__bar {
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 20px 20px;
  animation: progress-stripes 1s linear infinite;
}

@keyframes progress-stripes {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 20px 0;
  }
}

/* Element : .progress__label */
.progress__label {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--text-base);
  min-width: 40px;
  text-align: right;
  font-weight: var(--font-medium);
}
</style>
