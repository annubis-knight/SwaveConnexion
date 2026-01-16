# UI Components

> **📁 Scope** : Ce fichier documente uniquement les composants du dossier `app/components/ui/`.

## Niveau 2a - Composants "Dumb"

Composants atomiques de **présentation pure**. Aucune logique métier, uniquement affichage et style.

---

## Règles strictes

### Styling
- **CSS natif** dans `<style scoped>` avec variables `var(--*)`
- **Nommage BEM** : `.block__element--modifier`
- **Aucun Tailwind** (réservé aux Layouts)

### Events
- **Uniquement natifs** : `@click`, `@input`, `@change`, `@focus`, `@blur`
- **v-model** : `@update:modelValue` pour two-way binding
- **❌ INTERDIT** : `defineEmits(['custom-event'])`

### Props
- **TypeScript** obligatoire avec interface `Props`
- **withDefaults()** pour valeurs par défaut
- Configurer : `variant`, `size`, `disabled`, etc.

### Logique
- **Aucune** logique métier
- Computed uniquement pour classes dynamiques

### Props minimales (YAGNI)
- **Commencer simple** : uniquement les props essentielles au fonctionnement
- **Ajouter au besoin** : les props supplémentaires viendront avec les vrais cas d'usage
- **Éviter la sur-ingénierie** : pas de props "au cas où"
- Un composant peut évoluer quand un projet réel le nécessite

```typescript
// ❌ TROP : Sur-ingénierie dès le départ
interface Props {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'link';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  loading?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
}

// ✅ BIEN : Minimum efficient
interface Props {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}
// → Ajouter loading, icon, etc. quand un projet réel le demande
```

---

## Pattern de base

```vue
<template>
  <button :class="btnClass" :disabled="disabled">
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
});

const btnClass = computed(() => [
  'btn',
  `btn--${props.variant}`,
  `btn--${props.size}`,
].join(' '));
</script>

<style scoped>
.btn {
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-md);
  font-weight: var(--font-medium);
  transition: all var(--transition-fast);
}
.btn--primary { background: var(--primary); color: var(--text-inverse); }
.btn--secondary { background: var(--secondary); color: var(--text-inverse); }
.btn--outline { border: 1px solid var(--primary); color: var(--primary); }
.btn--sm { padding: var(--space-xs) var(--space-sm); }
.btn--lg { padding: var(--space-md) var(--space-lg); }
</style>
```

---

## Cas spécial : Heading et Text

Ces composants sont **légers** - ils utilisent les classes utilitaires de `_typography.css` + styles inline.

**Pas de `<style scoped>`** - les props génèrent les styles.

### Text - Props complètes

```vue
<!-- Défaut : <p> classique 16px 400weight -->
<Text>Paragraphe simple</Text>

<!-- Personnalisé via props -->
<Text
  as="span"
  font="display"
  size="lg"
  weight="bold"
  color="primary"
  transform="uppercase"
  tracking="wide"
  leading="tight"
>
  Texte stylisé
</Text>
```

| Prop | Valeurs | Défaut | Description |
|------|---------|--------|-------------|
| `as` | `p`, `span` | `p` | Balise HTML |
| `font` | `sans`, `display`, `mono` | `sans` | Famille de police |
| `size` | `xs`, `sm`, `base`, `lg`, `xl`, `2xl`, `3xl` | `base` | Taille |
| `weight` | `light`, `regular`, `medium`, `semibold`, `bold` | `regular` | Graisse |
| `color` | `dark`, `light`, `primary` | - | Couleur (classe CSS) |
| `align` | `left`, `center`, `right` | - | Alignement (classe CSS) |
| `transform` | `uppercase`, `capitalize`, `none` | `none` | Casse |
| `leading` | `tight`, `snug`, `normal`, `relaxed`, `loose` | `normal` | Interligne |
| `tracking` | `tight`, `normal`, `wide` | `normal` | Espacement lettres |
| `maxWidth` | `xs`, `sm`, `md`, `lg`, `xl`, `full` | `full` | Largeur max |

### Heading - Props

| Prop | Valeurs | Description |
|------|---------|-------------|
| `level` | `1-6` | Niveau de titre (h1-h6) |
| `color` | `dark`, `light`, `primary` | Couleur |
| `align` | `left`, `center`, `right` | Alignement |

### ⚠️ Règle critique : utiliser les props, pas les classes CSS

```vue
<!-- ❌ INTERDIT : overrides via classes ou CSS scoped -->
<Text class="text-lg font-bold uppercase">
<Text class="card__title">  <!-- avec .card__title { font-size: ... } -->

<!-- ✅ CORRECT : props uniquement -->
<Text size="lg" weight="bold" transform="uppercase">
```

**Les props Text gèrent TOUTE la typographie** :
- `font-family` → prop `font`
- `font-size` → prop `size`
- `font-weight` → prop `weight`
- `line-height` → prop `leading`
- `letter-spacing` → prop `tracking`
- `text-transform` → prop `transform`
- `color` → prop `color` (via classes `_typography.css`)

**Seules exceptions autorisées dans CSS scoped :**
- Layout : `margin`, `padding`, `display`, `gap`
- Positionnement : `position`, `top`, `left`

---

## Variables CSS disponibles

```css
/* Couleurs */
var(--primary), var(--secondary), var(--accent)
var(--text-strong), var(--text-inverse)
var(--success), var(--warning), var(--error), var(--info)

/* Espacements */
var(--space-xs), var(--space-sm), var(--space-md), var(--space-lg), var(--space-xl)

/* Bordures */
var(--radius-sm), var(--radius-md), var(--radius-lg)

/* Transitions */
var(--transition-fast), var(--transition-normal)
```

---

## Composants existants

| Composant | Description | Props clés |
|-----------|-------------|------------|
| `Button` | Bouton 5 variantes | `variant`, `size`, `disabled` |
| `IconButton` | Bouton carré pour icônes | `variant`, `size`, `ariaLabel` |
| `Card` | Carte avec props ou slot | `variant`, `icon`, `title`, `description` |
| `Input` | Champ formulaire | `label`, `type`, `error`, `modelValue` |
| `Badge` | Label sémantique | `variant`, `size` |
| `Checkbox` | Case à cocher | `label`, `modelValue` |
| `Switch` | Toggle animé | `modelValue` |
| `Dropdown` | Menu déroulant | `items`, `placeholder` |
| `Modal` | Dialogue modal | `isOpen`, `title` |
| `Toast` | Notification | `message`, `type`, `duration` |
| `Tooltip` | Infobulle | `content`, `position` |
| `ProgressBar` | Barre progression | `value`, `max`, `variant` |
| `Tabs` | Onglets keyboard | `tabs`, `activeTab` |
| `Heading` | Titres h1-h6 | `level`, `color`, `align` |
| `Text` | Paragraphes/spans | `as`, `font`, `size`, `weight`, `color`, `transform`, `leading`, `tracking` |
| `CardEvent` | Carte événement | `day`, `month`, `title`, `subtitle` |

---

## ❌ Interdit

```vue
<!-- ❌ Event custom -->
<script setup>
const emit = defineEmits(['action']); // NON !
</script>

<!-- ❌ Tailwind -->
<div class="flex gap-4 p-4">  <!-- NON ! Utiliser CSS natif -->

<!-- ❌ Logique métier -->
<script setup>
const { createDevis } = useDevis();  // NON ! C'est pour les pages
</script>

<!-- ❌ Navigation -->
<script setup>
const router = useRouter();  // NON ! C'est pour les pages
</script>
```

---

## ✅ Checklist nouveau composant

- [ ] **Commentaire ASCII art dans `<script setup>`** (Props/Events/Slots) - commentaire JS `/* */`
- [ ] Interface `Props` TypeScript
- [ ] **Props minimales** (YAGNI - pas de props "au cas où")
- [ ] `withDefaults()` pour valeurs par défaut
- [ ] Classes BEM dans `<style scoped>`
- [ ] Variables CSS (pas de valeurs hardcodées)
- [ ] Événements natifs uniquement
- [ ] Aucune logique métier
