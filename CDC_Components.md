## 📊 Analyse de ton architecture

### Structure actuelle

```
components/
├── ui/          → Composants atomiques (Button, Input, Card) - CSS natif + BEM
├── layout/      → Structure (Container, Grid, Stack) - Tailwind uniquement
├── sections/    → Orchestrateurs (Hero, CTA, FeaturesGrid) - Mix
└── showcase/    → Composants démo (pas production)

composables/     → useTheme.ts (logique réutilisable)
pages/          → Pages qui utilisent tout
```

### Ce que j'ai observé

✅ **UI components** : Émettent seulement événements natifs (`@click`)  
✅ **Layout components** : Aucun événement, juste wrapper  
✅ **Sections (CTA)** : Orchestrent UI + Layout, émettent custom events  
✅ **TypeScript** partout, **BEM** pour CSS natif  

***

# 🎯 Règles pour CLAUDE.md

## 🏗️ Architecture des Composants & Gestion des Événements

### Hiérarchie et Responsabilités

Ce design system suit une architecture en 4 niveaux avec des responsabilités claires :

```
┌─────────────────────────────────────────────────────────────┐
│  NIVEAU 4: Pages (app/pages/)                               │
│  Rôle: Logique métier (router.push, API, tracking)         │
│  Exemples: index.vue, design-system/components.vue          │
└─────────────────────────────────────────────────────────────┘
                           ↑ écoute events custom
┌─────────────────────────────────────────────────────────────┐
│  NIVEAU 3: Sections (components/sections/)                  │
│  Rôle: Orchestration UI (compose UI + Layout)              │
│  Exemples: CTA.vue, Hero.vue, FeaturesGrid.vue             │
│  Events: Émet des événements custom vers les pages         │
└─────────────────────────────────────────────────────────────┘
                  ↑ utilise
        ┌─────────┴─────────┐
        ↓                   ↓
┌──────────────────┐  ┌──────────────────┐
│ NIVEAU 2a: UI    │  │ NIVEAU 2b: Layout│
│ (components/ui/) │  │ (components/     │
│                  │  │  layout/)        │
│ Rôle: Affichage  │  │ Rôle: Structure  │
│ + style          │  │ mise en page     │
│                  │  │                  │
│ Events: Natifs   │  │ Events: Aucun    │
│ uniquement       │  │                  │
│ (@click, @input) │  │                  │
└──────────────────┘  └──────────────────┘

NIVEAU 1: Composables (composables/)
Rôle: Logique métier réutilisable (API, state, utils)
```

### Règles strictes par niveau

#### ✅ Niveau 1: Composables (`composables/`)

**Responsabilité** : Logique métier réutilisable, appels API, state management local

**Contient** :
- Fonctions de logique métier
- Appels API (fetch, axios)
- Transformations de données
- Validation et formatage

**NE contient PAS** :
- Templates Vue
- Styles CSS
- Navigation (router.push)
- Logique UI (ouverture modals, scroll)

**Exemple** :
```
// composables/useDevis.ts
export function useDevis() {
  const createDevis = async (data: DevisData) => {
    // Logique API
    const response = await fetch('/api/devis', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return response.json();
  };
  
  return { createDevis };
}
```

---

#### ✅ Niveau 2a: Composants UI (`components/ui/`)

**Responsabilité** : Composants atomiques "dumb" (présentation visuelle uniquement)

**Caractéristiques** :
- **Styling** : CSS natif avec variables + BEM strict
- **Props** : Configurables (variant, size, disabled, etc.)
- **Events** : ❌ PAS d'events custom, UNIQUEMENT événements natifs HTML
- **Logique** : Aucune logique métier

**Events autorisés** :
- `@click` (natif du `<button>`)
- `@input` (natif du `<input>`)
- `@change`, `@focus`, `@blur` (natifs)
- `@update:modelValue` (v-model natif)

**❌ INTERDIT** :
```
<!-- ❌ MAUVAIS : Emit custom dans UI component -->
<template>
  <button @click="emit('action')">Click</button>
</template>
<script setup>
const emit = defineEmits(['action']); // ❌ NON !
</script>
```

**✅ CORRECT** :
```
<!-- ✅ BON : Event natif uniquement -->
<template>
  <button @click="$emit('click')">Click</button>
  <!-- Ou même pas besoin d'emit, le @click natif suffit -->
</template>
```

**Exemples** : Button.vue, Input.vue, Card.vue, Badge.vue

---

#### ✅ Niveau 2b: Composants Layout (`components/layout/`)

**Responsabilité** : Structure et mise en page (wrappers purs)

**Caractéristiques** :
- **Styling** : Tailwind utilities UNIQUEMENT
- **Props** : Configuration layout (size, gap, cols, padding)
- **Events** : ❌ AUCUN événement (ni natif ni custom)
- **Logique** : Uniquement computed classes pour Tailwind

**Rôle** : Ce sont des **wrappers passifs** qui ne font que disposer leurs enfants

**❌ INTERDIT** :
- Émettre des événements
- Contenir de la logique métier
- Faire des appels API
- Gérer du state

**✅ CORRECT** :
```
<!-- ✅ BON : Wrapper pur avec Tailwind -->
<template>
  <div :class="containerClass">
    <slot />
  </div>
</template>
<script setup>
const containerClass = computed(() => {
  return ['flex', 'gap-4', 'justify-center'].join(' ');
});
</script>
```

**Exemples** : Container.vue, Grid.vue, Stack.vue, SplitPane.vue

---

#### ✅ Niveau 3: Composants Sections (`components/sections/`)

**Responsabilité** : Orchestrateurs qui composent UI + Layout

**Caractéristiques** :
- **Composition** : Utilise composants UI + Layout
- **Styling** : Mix Tailwind + CSS natif pour sections
- **Props** : Configuration high-level (title, description, variant)
- **Events** : ✅ Émet des événements custom vers les pages
- **Logique** : Orchestration UI uniquement (pas de logique métier)

**Quand émettre un événement** :

✅ **OUI** si l'événement représente une **action utilisateur significative** :
- Clic sur un bouton CTA (`primary-click`, `secondary-click`)
- Soumission de formulaire intégré
- Sélection d'un item

❌ **NON** si c'est juste un wrapper visuel :
- Hero.vue : N'émet rien (juste un slot pour contenu)
- FeaturesGrid.vue : N'émet rien (affiche des données statiques)

**Pattern "Event Chaining"** :

```
<!-- ✅ BON : Transformation d'événement natif en événement sémantique -->
<!-- CTA.vue (Section) -->
<template>
  <section class="cta">
    <!-- Écoute l'événement NATIF du Button -->
    <Button @click="handlePrimaryClick">
      {{ primaryText }}
    </Button>
  </section>
</template>

<script setup>
// Transforme le click natif en événement sémantique
const emit = defineEmits<{
  'primary-click': [];  // Événement custom vers la page
}>();

const handlePrimaryClick = () => {
  emit('primary-click');  // ← Seul endroit où on émet
};
</script>
```

**❌ INTERDIT : "Event Relay Chain"**
```
<!-- ❌ MAUVAIS : Chaîne de relay inutile -->
<!-- Button.vue -->
<button @click="emit('button-click')">  <!-- ❌ NON -->

<!-- Layout.vue -->
<Button @button-click="emit('button-click')">  <!-- ❌ Relay inutile -->

<!-- CTA.vue -->
<Layout @button-click="emit('primary-click')">  <!-- ❌ Trop de niveaux -->
```

**Règle** : **Un seul niveau de transformation d'événement**
- Button → CTA : ✅ OK
- Button → Layout → CTA : ❌ NON (Layout ne doit jamais relayer)

**Exemples** : CTA.vue (avec events), Hero.vue (sans events), FeaturesGrid.vue (sans events)

---

#### ✅ Niveau 4: Pages (`app/pages/`)

**Responsabilité** : Smart components avec logique métier

**Caractéristiques** :
- **Composition** : Utilise Sections + UI + Layout
- **Events** : Écoute les événements des Sections
- **Logique** : Décisions métier (navigation, API via composables, tracking)
- **State** : Peut utiliser state local (ref, reactive) ou Pinia

**Pattern recommandé** :

```
<!-- index.vue (Page) -->
<template>
  <CTA
    title="Rejoignez-nous"
    primaryText="S'inscrire"
    secondaryText="En savoir plus"
    @primary-click="handleSignup"
    @secondary-click="openInfoModal"
  />
</template>

<script setup>
// Import composable pour logique métier
const { createAccount } = useAuth();
const router = useRouter();

// Décisions métier dans la page
const handleSignup = async () => {
  // Option 1: Navigation simple
  router.push('/signup');
  
  // Option 2: Logique métier via composable
  // await createAccount();
  
  // Option 3: Tracking analytics
  // trackEvent('cta_signup_click');
};

const openInfoModal = () => {
  // Logique UI locale
  modal.open('info');
};
</script>
```

---

### Où placer la logique ?

Utilise cette table de décision :

| Question | Si OUI → Placer dans |
|----------|---------------------|
| C'est juste du style/visuel ? | Composant UI (Level 2a) |
| C'est de la mise en page (flex, grid) ? | Composant Layout (Level 2b) |
| Ça orchestre plusieurs composants UI ? | Composant Section (Level 3) |
| Ça appelle une API ? | Composable (Level 1) |
| Ça navigue entre pages ? | Page (Level 4) |
| Ça transforme/valide des données ? | Composable (Level 1) |
| C'est utilisé dans 2-3 pages ? | Composable (Level 1) |
| C'est utilisé PARTOUT ? | Store Pinia |
| Ça ouvre un modal / scroll ? | Page (Level 4) |

---

### Règle d'or : Stop à la délégation

❌ **NE PAS faire remonter tout au store** :
```
// ❌ MAUVAIS : Store surchargé
store.createDevis();      // ← Logique métier (composable !)
store.openModal();        // ← Logique UI (page !)
store.scrollToSection();  // ← Logique UI (page !)
```

✅ **BON : Séparation claire** :
```
// ✅ Store = État global uniquement
const user = userStore.user;  // OK : partagé partout

// ✅ Composable = Logique métier
const { createDevis } = useDevis();  // OK : réutilisable

// ✅ Page = Orchestration UI
const openModal = () => modal.open();  // OK : logique locale
```

---

### Exemples concrets (Propulsite)

#### Exemple 1 : CTA avec actions différentes

```
<!-- Page: index.vue (landing marketing) -->
<CTA
  title="Découvrez Propulsite"
  primaryText="Commencer"
  secondaryText="Documentation"
  @primary-click="router.push('/design-system')"
  @secondary-click="scrollToSection('features')"
/>

<!-- Page: design-system/components.vue -->
<CTA
  title="Besoin d'aide ?"
  primaryText="Nous contacter"
  secondaryText="GitHub"
  @primary-click="openContactModal"
  @secondary-click="window.open('https://github.com/...')"
/>
```

**Même composant CTA, actions différentes selon le contexte !**

#### Exemple 2 : Hero sans événements

```
<!-- Hero.vue ne besoin PAS d'émettre des événements -->
<!-- La page gère directement les actions des boutons via slots -->

<!-- Page: index.vue -->
<Hero variant="gradient" :centered="true">
  <h1>Bienvenue</h1>
  <p>Description</p>
  <!-- Boutons gérés par la page directement -->
  <Button @click="router.push('/signup')">S'inscrire</Button>
</Hero>
```

---

### Checklist avant d'ajouter un emit

Avant d'ajouter `defineEmits` dans un composant, vérifie :

- [ ] Le composant est-il de type **Section** (Level 3) ? Si non → ❌ Pas d'emit
- [ ] L'événement représente-t-il une **action utilisateur significative** ? Si non → ❌ Pas d'emit  
- [ ] Est-ce que je peux utiliser un **slot** à la place ? Si oui → ✅ Préférer slot
- [ ] Y a-t-il déjà un événement natif qui suffit (`@click`) ? Si oui → ✅ Utiliser natif
- [ ] Est-ce que je vais créer une **chaîne de relay** (Button → Layout → Section) ? Si oui → ❌ Revoir architecture

**Règle finale** : Dans ce design system, SEULS les composants **Sections** peuvent émettre des événements custom.

