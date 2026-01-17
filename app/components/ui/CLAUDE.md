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
- **Variables CSS** : toujours consulter `_variables.css` et `_typography.css` pour les valeurs disponibles

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
  /* Consulter _variables.css pour les variables disponibles */
  padding: var(--space-*);
  border-radius: var(--radius-*);
}
.btn--primary { background: var(--primary); color: var(--text-*); }
.btn--secondary { background: var(--secondary); color: var(--text-*); }
.btn--outline { border: 1px solid var(--primary); color: var(--primary); }
.btn--sm { padding: var(--space-*) var(--space-*); }
.btn--lg { padding: var(--space-*) var(--space-*); }
</style>
```

---

## Cas spécial : Heading et Text

Ces composants sont **légers** - ils utilisent les classes utilitaires de `_typography.css` + styles inline.

**Pas de `<style scoped>`** - les props génèrent les styles.

### ⚠️ Règle critique : utiliser les props, pas les classes CSS

```vue
<!-- ❌ INTERDIT : overrides via classes ou CSS scoped -->
<Text class="text-lg font-bold uppercase">
<Text class="card__title">  <!-- avec .card__title { font-size: ... } -->

<!-- ✅ CORRECT : props uniquement -->
<Text size="lg" weight="bold" transform="uppercase">
```

**Les props Text/Heading gèrent TOUTE la typographie.**

**Seules exceptions autorisées dans CSS scoped :**
- Layout : `margin`, `padding`, `display`, `gap`
- Positionnement : `position`, `top`, `left`

**Pour les props disponibles** : consulter directement `Text.vue` et `Heading.vue`.

---

## Fichiers sources (SSOT)

| Besoin | Fichier à consulter |
|--------|---------------------|
| Variables CSS (couleurs, espacements, bordures, transitions) | `app/assets/css/_variables.css` |
| Typographie (polices, tailles, weights) | `app/assets/css/_typography.css` |
| Props d'un composant existant | Le fichier `.vue` du composant |

**Ne jamais supposer qu'une variable ou prop existe** - toujours vérifier le fichier source.

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
- [ ] Variables CSS vérifiées dans `_variables.css` (pas de valeurs hardcodées)
- [ ] Événements natifs uniquement
- [ ] Aucune logique métier