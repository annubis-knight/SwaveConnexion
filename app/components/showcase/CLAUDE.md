# 📦 Composants Showcase - Documentation Claude Code

## ⚠️ ATTENTION: Composants SHOWCASE UNIQUEMENT

**Ces composants sont destinés EXCLUSIVEMENT aux pages `/design-system/*`**

❌ **NE PAS utiliser en production**
✅ **Utiliser UNIQUEMENT sur les pages showcase**

---

## 📋 Aperçu

Les composants Showcase fournissent une structure unifiée pour présenter les composants du design system. Ils ajoutent des éléments visuels (borders, breadcrumbs, sections) qui ne doivent apparaître que sur les pages de démonstration.

**Emplacement:** `app/components/showcase/`
**Utilisation:** Pages sous `/design-system/*`
**Préfixe auto-import:** `Showcase` (ex: `ShowcaseLayout`, `ShowcaseSection`)

---

## 🗂️ Composants disponibles

### 1. ShowcaseLayout.vue

**Description:** Layout uniforme pour toutes les pages showcase avec breadcrumb et header.

**Props:**
```typescript
interface Props {
  title: string;        // Titre de la page (ex: "UI Components")
  description: string;  // Description sous le titre
}
```

**Slots:**
- `default`: Contenu de la page (sections, démos)

**Structure:**
- Breadcrumb (Design System / Titre)
- Header avec gradient bleu (title + description)
- Container avec padding pour le contenu

**Exemple:**
```vue
<ShowcaseLayout
  title="UI Components"
  description="Composants atomiques avec CSS natif et BEM"
>
  <!-- Contenu ici -->
</ShowcaseLayout>
```

---

### 2. ShowcaseSection.vue

**Description:** Wrapper pour encadrer chaque section de démo avec titre et bordure.

**Props:**
```typescript
interface Props {
  title: string;  // Titre de la section (ex: "Buttons")
}
```

**Slots:**
- `default`: Contenu de la section (démos de composants)

**Style:**
- Titre h2 bold
- Bordure blanche avec padding
- Fond blanc (light) / neutral-medium (dark)

**Exemple:**
```vue
<ShowcaseSection title="Buttons">
  <div class="flex gap-4">
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
  </div>
</ShowcaseSection>
```

---

### 3. ShowcaseCodeBlock.vue

**Description:** Affiche des snippets de code avec fond noir et police monospace.

**Props:**
```typescript
interface Props {
  code?: string;      // Code à afficher (optionnel si slot utilisé)
  language?: string;  // Language (non utilisé pour le moment)
}
```

**Slots:**
- `default`: Code en texte brut (alternative à la prop `code`)

**Style:**
- Fond noir avec texte blanc
- Police `JetBrains Mono` (monospace)
- Scroll horizontal si débordement

**Exemple:**
```vue
<ShowcaseCodeBlock>
interface Props {
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
}
</ShowcaseCodeBlock>
```

---

### 4. LayoutDemo.vue (SPÉCIAL)

**Description:** Wrapper pour visualiser les limites des layouts avec bordures néon colorées.

**⚠️ CRITIQUE:** Utiliser UNIQUEMENT sur `/design-system/layouts.vue`

**Props:**
```typescript
interface Props {
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'info' | 'warning' | 'error';
  variant?: 'neon' | 'gradient' | 'dashed';
}
```

**Variantes:**

1. **neon** (défaut): Bordure solide avec effet de glow (box-shadow)
   - Exemple: `<ShowcaseLayoutDemo color="primary" variant="neon">`

2. **gradient**: Bordure avec gradient animé
   - Exemple: `<ShowcaseLayoutDemo color="primary" variant="gradient">`

3. **dashed**: Bordure en pointillés
   - Exemple: `<ShowcaseLayoutDemo color="error" variant="dashed">`

**Couleurs disponibles:**
- `primary`: Bleu (#2563eb)
- `secondary`: Gris (#525252)
- `accent`: Orange (#f59e0b)
- `success`: Vert (#10b981)
- `info`: Bleu info (#3b82f6)
- `warning`: Orange warning (#f59e0b)
- `error`: Rouge (#ef4444)

**Exemple d'utilisation:**
```vue
<!-- Containers avec bordure bleue néon -->
<ShowcaseLayoutDemo color="primary" variant="neon">
  <LayoutContainer size="sm" :padding="true">
    <div class="bg-primary text-white p-4 rounded-lg">
      Contenu centré 640px
    </div>
  </LayoutContainer>
</ShowcaseLayoutDemo>

<!-- Grid avec bordure orange néon -->
<ShowcaseLayoutDemo color="accent" variant="neon">
  <LayoutGrid :cols="3" gap="md">
    <div class="bg-accent text-white p-4">Item 1</div>
    <div class="bg-accent text-white p-4">Item 2</div>
    <div class="bg-accent text-white p-4">Item 3</div>
  </LayoutGrid>
</ShowcaseLayoutDemo>
```

**Pourquoi les bordures néon ?**

Sur la page `/design-system/layouts`, les composants `Container`, `Grid`, `Stack`, et `SplitPane` ont des backgrounds blancs qui se confondent avec le fond de la page showcase. Les bordures néon permettent de visualiser clairement les limites de chaque layout.

**Stratégie de couleurs sur /design-system/layouts:**
- Containers → Bleu (`primary`)
- Grids → Orange (`accent`)
- Stacks → Vert (`success`)
- SplitPanes → Rouge (`error`)
- Exemples combinés → Gradient

---

## 🎨 Styles

### Scoped CSS

Tous les composants Showcase utilisent **scoped CSS** pour éviter les fuites de styles vers les composants de production.

### Dark Mode

Tous les composants supportent le dark mode avec classes Tailwind (`dark:`).

---

## 🔧 Configuration Nuxt

**Auto-import configuré dans `nuxt.config.ts`:**

```typescript
components: [
  {
    path: '~/components/showcase',
    prefix: 'Showcase', // ShowcaseLayout, ShowcaseSection, etc.
  },
]
```

Pas besoin d'importer manuellement, Nuxt les détecte automatiquement.

---

## 📖 Bonnes Pratiques

### ✅ À FAIRE

1. **Utiliser ShowcaseLayout** comme wrapper principal sur toutes les pages `/design-system/*`
2. **Regrouper les démos** par type dans des `ShowcaseSection`
3. **Ajouter des exemples de code** avec `ShowcaseCodeBlock` pour chaque composant
4. **Utiliser LayoutDemo UNIQUEMENT sur /layouts** pour visualiser les limites

### ❌ À NE PAS FAIRE

1. **NE PAS utiliser ces composants en production** (pages non-showcase)
2. **NE PAS utiliser LayoutDemo** sur d'autres pages que `/design-system/layouts`
3. **NE PAS modifier les styles** sans vérifier l'impact sur toutes les pages showcase
4. **NE PAS ajouter de logique métier** dans ces composants (présentation uniquement)

---

## 📝 Exemple Page Showcase Complète

```vue
<template>
  <!-- Layout principal -->
  <ShowcaseLayout
    title="UI Components"
    description="Composants atomiques avec CSS natif et BEM"
  >

    <!-- Section Buttons -->
    <ShowcaseSection title="Buttons">
      <h3 class="text-xl font-semibold mb-4">Variantes</h3>
      <div class="flex gap-4 flex-wrap mb-6">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="accent">Accent</Button>
      </div>

      <h3 class="text-xl font-semibold mb-4">Props</h3>
      <ShowcaseCodeBlock>
interface Props {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'outline-light';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}
      </ShowcaseCodeBlock>
    </ShowcaseSection>

    <!-- Section Cards -->
    <ShowcaseSection title="Cards">
      <!-- Démos cards... -->
    </ShowcaseSection>

  </ShowcaseLayout>
</template>

<script setup lang="ts">
// Meta tags
useHead({
  title: 'UI Components - Design System',
  meta: [
    { name: 'description', content: 'Composants atomiques showcase' }
  ]
});
</script>
```

---

## 🚀 Évolution Future

**Améliorations potentielles:**

1. **ShowcaseCodeBlock amélioré**
   - Syntax highlighting avec Shiki
   - Bouton "Copy to clipboard"
   - Toggle vue/code

2. **ShowcaseSection avec tabs**
   - Onglet "Demo" / "Code" / "Props"
   - Navigation entre exemples

3. **LayoutDemo avec controls**
   - Slider pour ajuster la couleur du néon
   - Toggle entre variantes (neon/gradient/dashed)

**Note:** Ces améliorations ne sont PAS nécessaires pour le MVP actuel (Phase 13 complète).

---

## 📅 Historique

- **Phase 13** (2024-12-04): Création composants Showcase
  - `ShowcaseLayout.vue`: Layout uniforme pages design-system
  - `ShowcaseSection.vue`: Wrapper sections avec bordure
  - `ShowcaseCodeBlock.vue`: Affichage code snippets
  - `LayoutDemo.vue`: Visualisation layouts avec bordures néon

---

**💡 Note pour Claude Code:** Ces composants sont spécifiques aux pages showcase. Ne jamais suggérer leur utilisation dans le code de production. Toujours vérifier que `LayoutDemo` n'est utilisé QUE sur `/design-system/layouts.vue`.
