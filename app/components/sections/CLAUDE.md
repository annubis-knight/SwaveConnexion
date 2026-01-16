# Section Components

> **📁 Scope** : Ce fichier documente uniquement les composants du dossier `app/components/sections/`.

## Niveau 3 - Orchestrateurs

Composants qui **composent UI + Layout** pour créer des blocs réutilisables. Seul niveau autorisé à émettre des **événements custom**.

---

## Règles strictes

### Composition
- **Utilisent** les composants UI (`Button`, `Heading`, `Text`, etc.)
- **Utilisent** les composants Layout (`Container`, `ContainerFlex`, `Grid`) 
- **Ne dupliquent pas** la logique des composants enfants

### Styling
- **Tailwind** pour la structure via composants Layout
- **`<style scoped>`** autorisé pour : backgrounds, décorations, effets visuels
- Pas de duplication des styles UI (utiliser les props des composants)

### ⚠️ Typographie : déléguer à `_typography.css`

**INTERDIT** de définir dans `<style scoped>` ou via classes Tailwind :
- `font-family`, `font-size`, `font-weight` → gérés par `_typography.css` (h1-h6, p, etc.)
- `line-height`, `letter-spacing` → idem
- `text-transform` (uppercase, capitalize) → idem
- `margin-bottom` sur Heading/Text → déjà défini dans `_typography.css`

**Pourquoi ?** Les composants `Heading` et `Text` délèguent leur styling à `_typography.css`. Ajouter des overrides crée de la duplication et casse la cohérence globale.

**✅ Autorisé :**
- Props des composants : `<Heading :level="2" color="white">`, `<Text size="sm" weight="bold" transform="uppercase">`
- Layout structurel : `class="flex gap-4"` (si le composant doit être en flex)

**❌ Interdit :**
```vue
<!-- ❌ Overrides typographiques via classes ou CSS scoped -->
<Heading :level="2" class="uppercase tracking-wide mb-6">
<Text class="text-sm font-medium italic mb-4">
<Text class="card__title">  <!-- avec .card__title { font-size: ... } -->

<!-- ✅ Utiliser les props de Text -->
<Heading :level="2" color="white">
<Text size="sm" color="white" weight="bold" transform="uppercase">
```

**Règle d'or :** Si le rendu visuel ne convient pas → signaler à l'utilisateur qu'une modification manuelle de `_typography.css` est nécessaire. **Claude ne modifie jamais `_typography.css` de lui-même.**

### Events
- **✅ Events custom autorisés** : `@primary-click`, `@submit`, `@select`
- Pattern "Event Chaining" : transformer event natif → event sémantique
- **Un seul niveau** de transformation (pas de relay chain)

### Props
- Configuration **high-level** : `title`, `description`, `variant`, `centered`
- Pas de props de style bas niveau (utiliser les composants UI pour ça)

### Logique
- **Orchestration UI uniquement** (pas de logique métier)
- Pas d'appels API, pas de navigation, pas de state global

---

## Slots vs Props

| Approche | Quand l'utiliser | Exemple |
|----------|-----------------|---------|
| **Slot default** | Contenu 100% flexible, parent décide structure | `Hero.vue` |
| **Props texte** | Contenu structuré et prévisible | `CTA.vue` |
| **Props array** | Listes de données répétées (v-for) | `FeaturesGrid.vue` |

```vue
<!-- ✅ Slot : le parent contrôle tout -->
<SectionsHero variant="gradient">
  <Heading :level="1">Mon titre custom</Heading>
  <Text>Ma description custom</Text>
  <Button>Mon action</Button>
</SectionsHero>

<!-- ✅ Props : contenu prévisible -->
<SectionsCTA
  title="Rejoignez-nous"
  description="Une description fixe"
  primary-text="S'inscrire"
/>

<!-- ✅ Props array : données répétées -->
<SectionsFeaturesGrid
  title="Nos services"
  :features="[
    { icon: '⚡', title: 'Rapide', description: '...' },
    { icon: '🔒', title: 'Sécurisé', description: '...' },
  ]"
/>
```

---

### Props minimales (YAGNI)
- **Commencer simple** : uniquement les props essentielles
- **Ajouter au besoin** : quand un projet réel le nécessite
- **Préférer les slots** aux props quand le contenu est flexible

```typescript
// ❌ TROP
interface Props {
  title: string;
  subtitle?: string;
  description?: string;
  variant?: 'primary' | 'secondary' | 'gradient' | 'dark' | 'light';
  centered?: boolean;
  primaryText?: string;
  primaryIcon?: string;
  secondaryText?: string;
  secondaryIcon?: string;
  showSecondary?: boolean;
  backgroundImage?: string;
}

// ✅ BIEN
interface Props {
  title: string;
  description?: string;
  variant?: 'primary' | 'gradient';
  centered?: boolean;
}
// → Utiliser un slot pour du contenu flexible
// → Ajouter des props quand un cas réel le demande
```

---

## Documentation ASCII Header (obligatoire)

Chaque composant Section **doit** avoir un header ASCII **au début de la balise `<script setup>`** (en commentaire JS) :

```vue
<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────┐
  │                      COMPONENT NAME                          │
  │  ┌───────────────────────────────────────────────────────┐  │
  │  │  [Structure visuelle ASCII du composant]              │  │
  │  │  section.class                                        │  │
  │  │    └─ LayoutContainer                                 │  │
  │  │         └─ LayoutContainerFlex                        │  │
  │  │              ├─ Heading                               │  │
  │  │              ├─ Text                                  │  │
  │  │              └─ Button(s)                             │  │
  │  └───────────────────────────────────────────────────────┘  │
  │                                                             │
  │  Props:                                                     │
  │    • propName: type (requis|défaut: value) - description    │
  │                                                             │
  │  Events:                                                    │
  │    • @event-name: description                               │
  │    (ou "Aucun" si wrapper visuel)                           │
  │                                                             │
  │  Slots:                                                     │
  │    • default: description                                   │
  │    (ou "Aucun (données via props)" si props only)           │
  │                                                             │
  │  Variants: (si applicable)                                  │
  │    • variant-name: description du style                     │
  └─────────────────────────────────────────────────────────────┘
*/
</script>
```

> **Note** : Les commentaires ASCII sont placés dans `<script setup>` (commentaire JS `/* */`) pour éviter qu'ils n'apparaissent dans le DOM rendu.

---

## Styling des Sections

### ⚠️ RÈGLE CRITIQUE : Variables CSS

**AVANT d'utiliser une variable CSS**, toujours lire `app/assets/css/_variables.css` pour vérifier son existence.

Les exemples ci-dessous utilisent des noms génériques. Remplacer par les vraies variables du projet.

### Règle unique : Tailwind (spacing) + CSS scoped BEM (visuel)

| Propriété | Où la définir | Exemple |
|-----------|---------------|---------|
| **Spacing** (padding, margin, gap) | Tailwind classes | `class="py-16 mb-12"` |
| **Background, couleurs, effets** | CSS scoped + BEM | `.hero--gradient { background: ... }` |

### Pattern de styling

```vue
<template>
  <!-- Tailwind pour spacing, computed class pour variante -->
  <section :class="sectionClass" class="py-16 lg:py-24">
    ...
  </section>
</template>

<script setup lang="ts">
const sectionClass = computed(() => ['hero', `hero--${props.variant}`].join(' '));
</script>

<style scoped>
/* BEM : Block */
.hero {
  position: relative;
  overflow: hidden;
}

/* BEM : Modifiers (variantes) - ⚠️ Vérifier _variables.css pour les vraies variables */
.hero--default {
  background-color: var(--bg-subtle);       /* ou var(--[bg-variable]) */
  color: var(--text-strong);                /* ou var(--[text-variable]) */
}

.hero--primary {
  background-color: var(--primary);
  color: var(--text-inverse);               /* ⚠️ Vérifier si existe */
}

.hero--gradient {
  background: linear-gradient(to bottom right, var(--primary), var(--primary-dark), var(--[accent-dark-si-existe]));
  color: var(--text-inverse);
}

.hero--dark {
  background-color: var(--bg-invert);       /* ⚠️ Vérifier si existe */
  color: var(--text-inverse);
}
</style>
```

### Ce qui va dans Tailwind vs CSS scoped

```vue
<!-- ✅ Tailwind : spacing responsive -->
<section class="py-16 lg:py-24 mb-12">

<!-- ✅ CSS scoped : backgrounds, couleurs, effets visuels -->
<style scoped>
.section--gradient {
  background: linear-gradient(...);
  box-shadow: ...;
}
</style>

<!-- ❌ INTERDIT : spacing en CSS scoped -->
<style scoped>
.section { padding: var(--space-2xl) 0; }  /* NON ! Utiliser Tailwind */
</style>

<!-- ❌ INTERDIT : backgrounds en Tailwind -->
<section class="bg-gradient-to-br from-blue-600">  /* NON ! Utiliser CSS scoped */
</style>
```

---

## Pattern de base (Props + Events)

```vue
<template>
  <section :class="sectionClass">
    <LayoutContainer size="lg">
      <LayoutContainerFlex direction="vertical" gap="lg" :align="centered ? 'center' : 'start'">

        <Heading :level="2" :color="textColor" :align="centered ? 'center' : 'left'">
          {{ title }}
        </Heading>

        <Text v-if="description" :color="textColor" :align="centered ? 'center' : 'left'">
          {{ description }}
        </Text>

        <LayoutContainerFlex direction="horizontal" gap="md">
          <Button :variant="buttonVariant" @click="handlePrimaryClick">
            {{ primaryText }}
          </Button>
        </LayoutContainerFlex>

      </LayoutContainerFlex>
    </LayoutContainer>
  </section>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  description?: string;
  primaryText?: string;
  variant?: 'primary' | 'gradient';  // Union type, pas string
  centered?: boolean;
}

interface Emits {
  'primary-click': [];
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  centered: true,
  primaryText: 'Action',
});

const emit = defineEmits<Emits>();

// Computed pour styling conditionnel
const textColor = computed(() => props.variant === 'gradient' ? 'light' : 'dark');
const buttonVariant = computed(() => props.variant === 'gradient' ? 'outline-light' : 'primary');

// Handler qui transforme click natif → event sémantique
const handlePrimaryClick = () => {
  emit('primary-click');
};
</script>

<style scoped>
/* ⚠️ Vérifier _variables.css pour les vraies variables */
.section--primary { background: var(--primary); }
.section--gradient {
  background: linear-gradient(to right, var(--primary), var(--primary-dark), var(--[accent-dark-si-existe]));
}
</style>
```

---

## Export Interface (pour données répétées)

Quand une Section affiche des listes via v-for, **exporter l'interface** pour typage externe :

```typescript
// Dans FeaturesGrid.vue
export interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface Props {
  features: Feature[];  // Typé avec l'interface exportée
  cols?: 2 | 3 | 4;     // Union type, pas number
}
```

**Utilisation dans une page :**

```vue
<script setup lang="ts">
import type { Feature } from '~/components/sections/FeaturesGrid.vue';

const features: Feature[] = [
  { icon: '⚡', title: 'Performance', description: '...' },
  { icon: '🎨', title: 'Design', description: '...' },
];
</script>

<template>
  <SectionsFeaturesGrid title="Nos atouts" :features="features" />
</template>
```

---

## Props conditionnelles (adapter les enfants)

Pattern pour adapter les props des composants enfants selon les props de la Section :

```vue
<!-- Alignement conditionnel -->
<Heading :align="centered ? 'center' : 'left'" />
<Text :align="centered ? 'center' : 'left'" />
<LayoutContainerFlex :justify="centered ? 'center' : 'start'" />

<!-- Variante conditionnelle (adapter au background) -->
<Button :variant="variant === 'gradient' ? 'outline-light' : 'primary'" />
<Button :variant="variant === 'gradient' ? 'outline-light' : 'outline'" />
```

---

## Quand émettre un événement ?

### ✅ OUI - Action utilisateur significative

```vue
<!-- CTA avec boutons d'action -->
<Button @click="handlePrimaryClick">S'inscrire</Button>

const handlePrimaryClick = () => {
  emit('primary-click');  // ✅ Action significative
};
```

### ❌ NON - Simple wrapper visuel

```vue
<!-- Hero = juste un wrapper visuel avec slot -->
<template>
  <section class="hero">
    <slot />  <!-- La page gère directement les actions -->
  </section>
</template>
<!-- Pas besoin d'emit, le contenu est géré par le parent -->
```

---

## Composants existants

| Composant | Contenu | Events | Props clés |
|-----------|---------|--------|------------|
| `Hero` | Slot | Aucun | `variant`, `centered` |
| `CTA` | Props | `primary-click`, `secondary-click` | `title`, `description`, `variant` |
| `FeaturesGrid` | Props array | Aucun | `title`, `features[]`, `cols` |
| `Header` | Slot | `toggle-menu`, `toggle-dark`, `change-theme` | `isDark`, `isMenuOpen`, `currentTheme`, `availableThemes` |
| `Footer` | Slots | Aucun | - |

> Tous utilisent : **Tailwind** (spacing) + **CSS scoped BEM** (backgrounds/variantes)

---

## Pattern "Event Chaining"

**Transformer un event natif en event sémantique :**

```
┌─────────────────────────────────────────────────────────┐
│ Button (UI)          →  CTA (Section)    →  Page       │
│ @click (natif)       →  @primary-click   →  handler    │
└─────────────────────────────────────────────────────────┘
```

```vue
<!-- Dans CTA.vue (Section) -->
<Button @click="handlePrimaryClick">{{ primaryText }}</Button>

<script setup>
const handlePrimaryClick = () => {
  emit('primary-click');  // Transformation: click → primary-click
};
</script>
```

```vue
<!-- Dans index.vue (Page) -->
<SectionsCTA
  title="Rejoignez-nous"
  @primary-click="router.push('/signup')"  <!-- Logique métier ici -->
/>
```

---

## ❌ Interdit

```vue
<!-- ❌ Event relay chain (via Layout) -->
<LayoutContainerFlex @button-click="emit('button-click')">  <!-- NON ! -->

<!-- ❌ Logique métier -->
<script setup>
const router = useRouter();  // NON ! C'est pour les pages
router.push('/signup');
</script>

<!-- ❌ Appels API -->
<script setup>
const { data } = await useFetch('/api/users');  // NON !
</script>

<!-- ❌ State global -->
<script setup>
const store = useUserStore();  // NON ! Utiliser dans les pages
</script>

<!-- ❌ Duplication des styles UI -->
<style scoped>
.cta__button {
  background: var(--primary);  /* NON ! Utiliser <Button variant="primary"> */
}
</style>
```

---


## ✅ Checklist nouveau composant

### Structure
- [ ] Header ASCII documentation **dans `<script setup>`** (Props/Events/Slots/Variants)
- [ ] Balise `<section>` racine
- [ ] Utilise Layout pour structure (`Container`, `ContainerFlex`, `Grid`)
- [ ] Utilise UI pour contenu (`Button`, `Heading`, `Text`, `Card`)

### Props & Types
- [ ] Interface `Props` TypeScript
- [ ] `withDefaults()` pour valeurs par défaut
- [ ] **Union types** pour props à valeurs fixes (`cols?: 2 | 3 | 4`)
- [ ] Props high-level uniquement (pas de style bas niveau)
- [ ] YAGNI : commencer minimal, ajouter au besoin

### Events (si applicable)
- [ ] Interface `Emits` TypeScript
- [ ] Handlers qui transforment events natifs → events sémantiques
- [ ] Pas de relay chain via Layout

### Styling (approche unique)
- [ ] **Tailwind** sur `<section>` pour spacing responsive (py-16, lg:py-24)
- [ ] **CSS scoped BEM** pour backgrounds, couleurs, effets visuels
- [ ] Variables CSS pour les couleurs (pas de valeurs hardcodées)
- [ ] **Aucun override typographique** (font-*, letter-spacing, text-transform, line-height)

### Interdit
- [ ] ❌ Logique métier (navigation, API, state global)
- [ ] ❌ Duplication des styles UI
- [ ] ❌ Overrides typographiques sur Heading/Text (déléguer à `_typography.css`)

---

## Règle d'or

**Les Sections orchestrent, elles ne décident pas.**

- ✅ Composer UI + Layout
- ✅ Transformer events natifs → events sémantiques
- ✅ Styler backgrounds et décorations
- ❌ Naviguer
- ❌ Appeler des API
- ❌ Gérer du state global

La **logique métier** appartient aux **Pages** (Niveau 4).
