<template>
  <component
    :is="as"
    :class="textClass"
    :style="textStyle"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────┐
  │                          TEXT                               │
  │  ┌───────────────────────────────────────────────────────┐  │
  │  │                                                       │  │
  │  │  <p|span> [slot: contenu texte] </p|span>             │  │
  │  │                                                       │  │
  │  └───────────────────────────────────────────────────────┘  │
  │                                                             │
  │  Props:                                                     │
  │    • as: p | span - Balise HTML (défaut: p)                 │
  │    • font: sans | display | mono - Famille (défaut: sans)   │
  │    • size: xs|sm|base|lg|xl|2xl|3xl - Taille (défaut: base) │
  │    • weight: extralight|light|regular|medium|semibold|bold|black │
  │    • color: dark | white | primary - Couleur                │
  │    • align: left | center | right - Alignement              │
  │    • transform: uppercase | capitalize | none - Casse       │
  │    • leading: tight|snug|normal|relaxed|loose - Interligne  │
  │    • tracking: tight | normal | wide - Espacement lettres   │
  │    • maxWidth: xs|sm|md|lg|xl|full - Largeur max du texte   │
  │                                                             │
  │  Slots:                                                     │
  │    • default: Contenu du texte                              │
  │                                                             │
  │  Events: Aucun (composant de présentation pure)             │
  │                                                             │
  │  Note: Par défaut = <p> classique 16px 400weight            │
  │  Note: Styles via _typography.css + inline styles           │
  └─────────────────────────────────────────────────────────────┘

  @dev Composant léger - utilise les classes globales de _typography.css
  @dev Les styles inline sont utilisés pour les props non couvertes par les classes
*/

// Props
interface Props {
  as?: 'p' | 'span';
  font?: 'sans' | 'display' | 'mono';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '5xl';
  weight?: 'extralight' | 'light' | 'regular' | 'medium' | 'semibold' | 'bold' | 'black';
  color?: 'dark' | 'white' | 'primary';
  align?: 'left' | 'center' | 'right';
  transform?: 'uppercase' | 'capitalize' | 'none';
  leading?: 'xtratight' | 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose';
  tracking?: 'tight' | 'normal' | 'wide';
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const props = withDefaults(defineProps<Props>(), {
  as: 'p',
  font: 'sans',
  size: 'base',
  weight: 'regular',
  leading: 'normal',
  tracking: 'normal',
  transform: 'none',
  maxWidth: 'full',
});

// Types pour les maps
type FontKey = NonNullable<Props['font']>;
type SizeKey = NonNullable<Props['size']>;
type WeightKey = NonNullable<Props['weight']>;
type LeadingKey = NonNullable<Props['leading']>;
type TrackingKey = NonNullable<Props['tracking']>;
type MaxWidthKey = NonNullable<Props['maxWidth']>;

// Maps pour styles inline
const fontMap: Record<FontKey, string> = {
  sans: 'var(--font-sans)',
  display: 'var(--font-display)',
  mono: 'var(--font-mono)',
};

const sizeMap: Record<SizeKey, string> = {
  xs: 'var(--text-xs)',
  sm: 'var(--text-sm)',
  base: 'var(--text-base)',
  lg: 'var(--text-lg)',
  xl: 'var(--text-xl)',
  '2xl': 'var(--text-2xl)',
  '3xl': 'var(--text-3xl)',
  '5xl': 'var(--text-5xl)',
};

const weightMap: Record<WeightKey, string> = {
  extralight: 'var(--font-extralight)',
  light: 'var(--font-light)',
  regular: 'var(--font-regular)',
  medium: 'var(--font-medium)',
  semibold: 'var(--font-semibold)',
  bold: 'var(--font-bold)',
  black: 'var(--font-black)',
};

const leadingMap: Record<LeadingKey, string> = {
  xtratight: '0.8',
  tight: 'var(--leading-tight)',
  snug: 'var(--leading-snug)',
  normal: 'var(--leading-normal)',
  relaxed: 'var(--leading-relaxed)',
  loose: 'var(--leading-loose)',
};

const trackingMap: Record<TrackingKey, string> = {
  tight: '-0.02em',
  normal: '0',
  wide: '0.05em',
};

const maxWidthMap: Record<MaxWidthKey, string> = {
  xs: '20rem',
  sm: '30rem',
  md: '40rem',
  lg: '50rem',
  xl: '60rem',
  full: '100%',
};

// Classes globales de _typography.css (uniquement pour color et align)
const textClass = computed(() => {
  const classes: string[] = [];

  if (props.color) {
    classes.push(`text-${props.color}`);
  }

  if (props.align) {
    classes.push(`text-${props.align}`);
  }

  return classes.length > 0 ? classes.join(' ') : undefined;
});

// Styles inline pour toutes les props typographiques
const textStyle = computed(() => {
  const styles: Record<string, string> = {
    fontFamily: fontMap[props.font],
    fontSize: sizeMap[props.size],
    fontWeight: weightMap[props.weight],
    lineHeight: leadingMap[props.leading],
  };

  // Letter spacing (seulement si différent de normal)
  if (props.tracking !== 'normal') {
    styles.letterSpacing = trackingMap[props.tracking];
  }

  // Text transform (seulement si différent de none)
  if (props.transform !== 'none') {
    styles.textTransform = props.transform;
  }

  // Max width (seulement si différent de full)
  if (props.maxWidth !== 'full') {
    styles.maxWidth = maxWidthMap[props.maxWidth];
  }

  return styles;
});
</script>
