# Layout Components

> **📁 Scope** : Ce fichier documente uniquement les composants du dossier `app/components/layout/`.

## Niveau 2b - Wrappers Passifs

Composants de **structure pure**. Ils organisent l'espace, ils ne stylisent pas le contenu.

---

## Règles strictes

### ⚠️ Variables CSS

Si un Layout utilise des variables CSS (rare), **toujours lire `app/assets/css/_variables.css`** pour vérifier leur existence avant utilisation.

### Styling
- **CSS scoped + BEM** pour la structure (flex, grid, sizing, positioning)
- **Tailwind uniquement pour le spacing** : `gap-*`, `p-*`, `m-*`, `space-*`
- Nommage BEM : `.layout-name`, `.layout-name--modifier`

### Events
- **❌ AUCUN événement** (ni natif, ni custom)
- Ce sont des wrappers passifs qui ne réagissent à rien

### Props
- **TypeScript** obligatoire avec interface `Props`
- **withDefaults()** pour valeurs par défaut
- Configurer : `size`, `gap`, `cols`, `direction`, `align`, `justify`

### Logique
- **Uniquement** computed pour classes dynamiques (BEM modifiers + Tailwind spacing)
- Aucune logique métier, aucun state, aucun appel API

### Props minimales (YAGNI)
- **Commencer simple** : uniquement les props essentielles
- **Ajouter au besoin** : quand un projet réel le nécessite
- **Éviter la sur-ingénierie** : pas de props "au cas où"

```typescript
// ❌ TROP
interface Props {
  direction?: 'horizontal' | 'vertical' | 'row-reverse' | 'column-reverse';
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
  reverse?: boolean;
}

// ✅ BIEN
interface Props {
  direction?: 'horizontal' | 'vertical';
  gap?: 'sm' | 'md' | 'lg';
  align?: 'start' | 'center' | 'end';
}
```

---

## Structure de fichier obligatoire

Chaque composant Layout suit cette structure :

```vue
<template>
  <div :class="['layout-name', modifierClass, gapClass]">
    <slot />
  </div>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────┐
  │                    NOM DU COMPOSANT                         │
  │                                                             │
  │  [Diagramme ASCII illustrant le layout]                     │
  │                                                             │
  │  Props:                                                     │
  │    • prop1: type - Description                              │
  │                                                             │
  │  Slots:                                                     │
  │    • default: Description                                   │
  │                                                             │
  │  Events: Aucun (wrapper passif)                             │
  └─────────────────────────────────────────────────────────────┘

  @dev CSS scoped + BEM pour structure
  @dev Tailwind pour spacing uniquement
*/

// Props
interface Props {
  direction?: 'vertical' | 'horizontal';
  gap?: 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'vertical',
  gap: 'md',
});

// BEM modifier
const modifierClass = computed(() =>
  `layout-name--${props.direction}`
);

// Tailwind spacing uniquement
const gapClass = computed(() => {
  const gapMap = { sm: 'gap-4', md: 'gap-6', lg: 'gap-8' };
  return gapMap[props.gap];
});
</script>

<style scoped>
.layout-name {
  display: flex;
  width: 100%;
}

.layout-name--vertical {
  flex-direction: column;
}

.layout-name--horizontal {
  flex-direction: row;
}
</style>
```

### Points clés

1. **Commentaire ASCII art dans `<script setup>`** (commentaire JS `/* */`) avec diagramme + props + slots + `@dev`
2. **Interface Props** nommée `Props`
3. **BEM pour structure** (flex, grid, sizing) dans `<style scoped>`
4. **Tailwind pour spacing uniquement** (`gap-*`, `p-*`, `m-*`)

> **Note** : Les commentaires ASCII sont placés dans `<script setup>` pour éviter qu'ils n'apparaissent dans le DOM rendu.

---

## Pattern de base

```vue
<template>
  <div :class="['container', sizeClass, paddingClass]">
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'lg',
  padding: true,
});

// BEM modifier pour size
const sizeClass = computed(() => `container--${props.size}`);

// Tailwind pour padding (spacing)
const paddingClass = computed(() =>
  props.padding ? 'px-4 sm:px-6 lg:px-8' : ''
);
</script>

<style scoped>
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.container--sm { max-width: 640px; }
.container--md { max-width: 768px; }
.container--lg { max-width: 1024px; }
.container--xl { max-width: 1280px; }
.container--full { max-width: 100%; }
</style>
```

---

## Composants existants

| Composant | Rôle | Props clés |
|-----------|------|------------|
| `Container` | Centrer le contenu avec max-width | `size`, `padding` |
| `ContainerFlex` | Flex vertical ou horizontal | `direction`, `gap`, `align`, `justify`, `wrap` |
| `Grid` | Grille CSS responsive | `cols`, `gap`, `responsive` |
| `SplitPane` | Layout 2 colonnes | `leftWidth`, `gap`, `collapsible`, `fullHeight` |

---

## Exemples d'utilisation

```vue
<!-- Container centré -->
<LayoutContainer size="lg" :padding="true">
  <p>Contenu centré max 1024px</p>
</LayoutContainer>

<!-- ContainerFlex vertical -->
<LayoutContainerFlex direction="vertical" gap="md" align="center">
  <Heading :level="2">Titre</Heading>
  <Text>Description</Text>
</LayoutContainerFlex>

<!-- ContainerFlex horizontal (boutons) -->
<LayoutContainerFlex direction="horizontal" gap="sm" :wrap="true">
  <Button>Action 1</Button>
  <Button>Action 2</Button>
</LayoutContainerFlex>

<!-- Grid 3 colonnes -->
<LayoutGrid :cols="3" gap="lg">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</LayoutGrid>

<!-- SplitPane (sidebar + content) -->
<LayoutSplitPane :leftWidth="4" gap="lg" :collapsible="true">
  <template #left>Navigation</template>
  <template #right>Contenu principal</template>
</LayoutSplitPane>
```

---

## Mapping Props → Classes

### Gap (Tailwind - spacing)
```typescript
const gapClasses = {
  none: 'gap-0',
  xs: 'gap-2',    // 8px
  sm: 'gap-4',    // 16px
  md: 'gap-6',    // 24px
  lg: 'gap-8',    // 32px
  xl: 'gap-12',   // 48px
};
```

### Align (CSS scoped - structure)
```css
.layout--align-start { align-items: flex-start; }
.layout--align-center { align-items: center; }
.layout--align-end { align-items: flex-end; }
.layout--align-stretch { align-items: stretch; }
```

### Justify (CSS scoped - structure)
```css
.layout--justify-start { justify-content: flex-start; }
.layout--justify-center { justify-content: center; }
.layout--justify-end { justify-content: flex-end; }
.layout--justify-between { justify-content: space-between; }
.layout--justify-around { justify-content: space-around; }
```

---

## ❌ Interdit

```vue
<!-- ❌ Overrides typographiques sur les enfants -->
<LayoutStack>
  <Heading class="text-4xl uppercase mb-8">  <!-- NON ! Laisser _typography.css gérer -->
</LayoutStack>

<!-- ❌ Tailwind pour structure (flex, grid, sizing) -->
<div class="flex flex-col items-center justify-between">  <!-- NON ! Utiliser CSS scoped -->

<!-- ❌ CSS natif avec variables globales -->
<div style="padding: var(--space-md)">  <!-- NON ! Utiliser Tailwind pour spacing -->

<!-- ❌ Events -->
<script setup>
const emit = defineEmits(['click']);  // NON ! Aucun event
</script>

<!-- ❌ Logique métier -->
<script setup>
const router = useRouter();  // NON !
const { data } = useFetch();  // NON !
</script>

<!-- ❌ Event relay -->
<LayoutStack @click="emit('click')">  <!-- NON ! Ne jamais relayer -->
```

---

## ✅ Checklist nouveau composant

- [ ] **Commentaire ASCII art dans `<script setup>`** (diagramme + props + slots + events + `@dev`)
- [ ] Interface `Props` TypeScript stricte (types unions, pas de `string | number`)
- [ ] **Props minimales** (YAGNI - pas de props "au cas où")
- [ ] `withDefaults()` pour valeurs par défaut
- [ ] **CSS scoped + BEM** pour structure (flex, grid, sizing, positioning)
- [ ] **Tailwind uniquement pour spacing** (`gap-*`, `p-*`, `m-*`)
- [ ] Aucun événement (ni emit, ni @click interne)
- [ ] Slot(s) pour le contenu (default ou named)

---

## Règle d'or : Event Relay

**Un Layout ne doit JAMAIS relayer un événement.**

```vue
<!-- ❌ MAUVAIS : Relay chain -->
<LayoutStack @click="emit('click')">
  <Button @click="..." />
</LayoutStack>

<!-- ✅ BON : L'event remonte directement -->
<LayoutStack>
  <Button @click="handleClick" />  <!-- Event géré par le parent (Section/Page) -->
</LayoutStack>
```

Les Layouts sont **transparents** pour les événements. Ils ne les interceptent pas, ne les transforment pas, ne les relaient pas.
