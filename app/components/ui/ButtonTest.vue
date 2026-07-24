<template>
  <div class="btn-test-wrapper">
    <button
      ref="btnRef"
      class="btn-test"
      :class="[
        { 'btn-test--disabled': disabled },
        `btn-test--${hoverEffect}`
      ]"
      :disabled="disabled"
    >
      <!-- Inner container for clipped effects (sweep/spin) -->
      <span class="btn-test__inner">
        <span class="btn-test__content">
          <slot />
        </span>

        <!-- Sweep effect - diagonal background reveal -->
        <span
          v-if="hoverEffect === 'sweep'"
          class="btn-test__sweep"
        ></span>

        <!-- Spin effect - rotating expanding element -->
        <span
          v-if="hoverEffect === 'spin'"
          class="btn-test__spin"
        ></span>

        <!-- Shine effect - light beam crossing on hover -->
        <span
          v-if="hoverEffect === 'shine'"
          class="btn-test__shine"
        ></span>

        <!-- SweepShine effect - sweep + shine combined -->
        <span
          v-if="hoverEffect === 'sweepshine'"
          class="btn-test__sweep"
        ></span>
        <span
          v-if="hoverEffect === 'sweepshine'"
          class="btn-test__shine"
        ></span>

      </span>

      <!-- Slide effect - text slides in from left (outside inner to avoid clip) -->
      <span
        v-if="hoverEffect === 'slide'"
        class="btn-test__slide"
      >
        <slot />
      </span>
    </button>

    <!-- SVG container OUTSIDE button - for snake/orbital effects -->
    <svg
      v-if="hasSnakeEffect"
      class="btn-test__svg"
      preserveAspectRatio="none"
    >
      <!-- Snake effect -->
      <path
        :d="rectPath"
        class="btn-test__snake"
        :style="{
          strokeDasharray: dashArray,
          '--perimeter': `${perimeter}px`
        }"
      />

      <!-- Orbital effect - seulement pour orbital/both -->
      <circle
        v-if="hoverEffect === 'orbital' || hoverEffect === 'both'"
        r="6"
        class="btn-test__orb"
      >
        <animateMotion
          dur="2s"
          begin="-0.8s"
          repeatCount="indefinite"
          calcMode="linear"
          :path="rectPath"
        />
      </circle>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

/*
  ┌─────────────────────────────────────────────────────────────┐
  │                      BUTTON TEST                            │
  │  ┌───────────────────────────────────────────────────────┐  │
  │  │  ╭─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─╮   │  │
  │  │  ┊  [slot: texte]                                 ┊   │  │
  │  │  ╰─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─╯   │  │
  │  │      ○~~~~ snake (stroke animé sur path)              │  │
  │  │    ◉ ←── orbital (à la TÊTE du snake)                 │  │
  │  └───────────────────────────────────────────────────────┘  │
  │                                                             │
  │  Props:                                                     │
  │    • disabled: boolean (default: false)                     │
  │    • hoverEffect: 'snake' | 'orbital' | 'both' | 'none'    │
  │                                                             │
  │  Technique:                                                 │
  │    - Snake: 40% visible, stroke-dashoffset animé            │
  │    - Orbital: animateMotion avec keyPoints="0.4" (tête)     │
  │    - Glow: CSS drop-shadow (pas SVG filter)                 │
  └─────────────────────────────────────────────────────────────┘
*/

interface Props {
  disabled?: boolean;
  hoverEffect?: 'snake' | 'orbital' | 'both' | 'sweep' | 'spin' | 'shine' | 'slide' | 'sweepshine' | 'none';
  withSnake?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  hoverEffect: 'both',
  withSnake: undefined,
});

/* Détermine si le snake doit s'afficher */
const hasSnakeEffect = computed(() => {
  // Si withSnake est explicitement défini, on l'utilise
  if (props.withSnake !== undefined) return props.withSnake;
  // Sinon, snake uniquement pour les variantes snake/orbital/both
  return ['snake', 'orbital', 'both'].includes(props.hoverEffect);
});

const btnRef = ref<HTMLButtonElement | null>(null);
const width = ref(200);
const height = ref(50);
const radius = 50;

/* Génère un path SVG pour un rectangle arrondi */
const rectPath = computed(() => {
  const w = width.value;
  const h = height.value;
  const r = Math.min(radius, w / 2, h / 2);

  return `
    M ${r} 0
    L ${w - r} 0
    A ${r} ${r} 0 0 1 ${w} ${r}
    L ${w} ${h - r}
    A ${r} ${r} 0 0 1 ${w - r} ${h}
    L ${r} ${h}
    A ${r} ${r} 0 0 1 0 ${h - r}
    L 0 ${r}
    A ${r} ${r} 0 0 1 ${r} 0
    Z
  `.replace(/\s+/g, ' ').trim();
});

/* Périmètre pour le dasharray */
const perimeter = computed(() => {
  const w = width.value;
  const h = height.value;
  const r = Math.min(radius, w / 2, h / 2);
  return 2 * (w - 2 * r) + 2 * (h - 2 * r) + 2 * Math.PI * r;
});

/* Dasharray: segment visible (40%) + espace (60%) */
const dashArray = computed(() => {
  const p = perimeter.value;
  return `${p * 0.4} ${p * 0.6}`;
});

/* Observer les dimensions du bouton */
let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
  if (btnRef.value) {
    const updateSize = () => {
      if (btnRef.value) {
        width.value = btnRef.value.offsetWidth;
        height.value = btnRef.value.offsetHeight;
      }
    };
    updateSize();

    resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(btnRef.value);
  }
});

onUnmounted(() => {
  resizeObserver?.disconnect();
});
</script>

<style scoped>
/**
 * BUTTON TEST STYLES - BEM strict
 *
 * Architecture:
 * - Wrapper: contient button + SVG (glow jamais clippé)
 * - Inner: contient content + effets clippés (sweep/spin)
 *
 * Effets disponibles:
 * - snake: bordure animée avec glow
 * - orbital: orbe lumineux qui suit le snake
 * - both: snake + orbital combinés
 * - sweep: révélation diagonale
 * - spin: expansion rotative
 */

.btn-test-wrapper {
  /* Tokens locaux */
  --btn-glow-color: #eff6ff;
  --btn-effect-color: var(--primary-dark);
  --btn-animation-duration: 2s;

  position: relative;
  display: inline-flex;
}

.btn-test {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  font-family: var(--font-sans);
  font-weight: var(--font-medium);
  font-size: var(--text-md);
  color: var(--btn-glow-color);
  background: transparent;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  overflow: visible;
}

.btn-test__inner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 3rem;
  border: 1px solid var(--btn-glow-color);
  border-radius: 50px;
  overflow: hidden;
  background-color: var(--primary);
  transition: filter 0.2s ease;
}

.btn-test:hover .btn-test__inner {
  filter: brightness(1.1);
}

.btn-test:active .btn-test__inner {
  filter: brightness(0.95);
}

.btn-test__content {
  position: relative;
  z-index: 2;
}

.btn-test:focus-visible {
  outline: 2px solid var(--btn-glow-color);
  outline-offset: 2px;
}

.btn-test--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ============================================
   SVG CONTAINER
   ============================================ */

.btn-test__svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: visible;
  z-index: 1;
}

/* ============================================
   SNAKE EFFECT
   Glow via CSS drop-shadow
   ============================================ */

.btn-test__snake {
  fill: none;
  stroke: var(--btn-glow-color);
  stroke-width: 1px;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0;
  transition: opacity 0.3s ease;
  animation: snake var(--btn-animation-duration) linear infinite;
  animation-play-state: paused;
  filter:
    drop-shadow(0 0 2px var(--btn-glow-color))
    drop-shadow(0 0 4px var(--btn-glow-color))
    drop-shadow(0 0 8px var(--btn-glow-color))
    drop-shadow(0 0 16px rgba(239, 246, 255, 0.8));
}

.btn-test-wrapper:hover .btn-test__snake {
  opacity: 1;
  animation-play-state: running;
}

.btn-test-wrapper:has(.btn-test--disabled):hover .btn-test__snake,
.btn-test-wrapper:has(.btn-test--none):hover .btn-test__snake {
  opacity: 0;
  animation-play-state: paused;
}

@keyframes snake {
  to {
    stroke-dashoffset: calc(-1 * var(--perimeter));
  }
}

/* ============================================
   ORBITAL EFFECT
   Glow via CSS drop-shadow
   ============================================ */

.btn-test__orb {
  fill: var(--btn-glow-color);
  opacity: 0;
  transition: opacity 0.3s ease;
  filter:
    drop-shadow(0 0 3px var(--btn-glow-color))
    drop-shadow(0 0 6px var(--btn-glow-color))
    drop-shadow(0 0 12px var(--btn-glow-color))
    drop-shadow(0 0 24px rgba(239, 246, 255, 0.9))
    drop-shadow(0 0 48px rgba(239, 246, 255, 0.5));
}

.btn-test-wrapper:has(.btn-test--orbital):hover .btn-test__orb,
.btn-test-wrapper:has(.btn-test--both):hover .btn-test__orb {
  opacity: 1;
}

.btn-test-wrapper:has(.btn-test--disabled):hover .btn-test__orb {
  opacity: 0;
}

/* ============================================
   SWEEP EFFECT
   Diagonal background reveal on hover
   ============================================ */

.btn-test__sweep {
  position: absolute;
  top: -30%;
  left: -100%;
  width: 100%;
  height: 200%;
  background: var(--btn-effect-color);
  transform: rotate(50deg) scaleX(1.5);
  transition: left 0.35s ease-out;
  z-index: 1;
}

.btn-test--sweep:hover .btn-test__sweep {
  left: -10%;
}


/* ============================================
   SPIN EFFECT
   Rotating expanding element on hover
   ============================================ */

.btn-test__spin {
  position: absolute;
  width: 0;
  height: 0;
  top: 50%;
  left: 50%;
  background: var(--btn-effect-color);
  opacity: 0;
  transform: translate(-50%, -50%) rotate(0deg);
  transition: all 0.5s ease-out;
  z-index: 1;
}

.btn-test--spin:hover .btn-test__spin {
  width: 300%;
  height: 300%;
  opacity: 1;
  transform: translate(-50%, -50%) rotate(80deg);
}

/* ============================================
   SHINE EFFECT
   Light beam crossing + glow box-shadow on hover
   ============================================ */

.btn-test--shine .btn-test__inner {
  transition: box-shadow 0.3s ease, filter 0.2s ease;
}

.btn-test--shine:hover .btn-test__inner {
  box-shadow:1px 1px 25px 10px rgba(239, 246, 255, 0.4);
  background-color: var(--btn-effect-color);

}

.btn-test__shine {
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
}

.btn-test--shine:hover .btn-test__shine {
  left: 100%;
}

/* ============================================
   SWEEPSHINE EFFECT
   Sweep + Shine combined
   ============================================ */

.btn-test--sweepshine .btn-test__inner {
  transition: box-shadow 0.3s ease, filter 0.2s ease;
}

.btn-test--sweepshine:hover .btn-test__inner {
  box-shadow: 1px 1px 25px 10px rgba(239, 246, 255, 0.4);
}

.btn-test--sweepshine:hover .btn-test__sweep {
  left: -10%;
}

.btn-test--sweepshine:hover .btn-test__shine {
  left: 100%;
}

/* ============================================
   SLIDE EFFECT
   Text slides in from left + button lifts up
   ============================================ */

.btn-test-wrapper:has(.btn-test--slide) {
  transition: transform 0.3s ease;
  transition-delay: 0.3s;
}

.btn-test-wrapper:has(.btn-test--slide):hover {
  transform: translateY(-0.3em);
  transition-delay: 0s;
}

.btn-test--slide {
  overflow: hidden;
}

.btn-test--slide .btn-test__inner {
  transition: border-color 0.3s ease;
  transition-delay: 0.3s;
}

.btn-test--slide .btn-test__content {
  transition: opacity 0.3s ease, transform 0.3s ease;
  transition-delay: 0.3s;
}


.btn-test--slide:hover .btn-test__content {
  opacity: 0;
  transform: translateX(60%);
  transition-delay: 0s;
}

.btn-test__slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--btn-glow-color);
  opacity: 0;
  transform: translateX(-60%);
  transition: opacity 0.4s ease, transform 0.4s ease;
  z-index: 3;
  pointer-events: none;
}

.btn-test--slide:hover .btn-test__slide {
  opacity: 1;
  transform: translateX(0);
  transition-delay: 0.15s;
}
</style>
