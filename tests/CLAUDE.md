# Tests

## Objectif

Assurer la **stabilité et fiabilité** du design system via tests unitaires et snapshots.

---

## Stack technique

- **Vitest** : Runner de tests natif Vite
- **Vue Test Utils** : Utilitaires de test Vue officiels
- **jsdom** : DOM complet pour tests rigoureux
- **unplugin-auto-import** : Auto-import des fonctions Vue (`computed`, `ref`, etc.)

---

## Structure

```
tests/
├── ui/              # Tests composants UI (Button, Input, etc.)
├── layout/          # Tests composants Layout (Container, Stack, etc.)
├── sections/        # Tests composants Sections (CTA, Hero, etc.)
├── __snapshots__/   # Snapshots générés automatiquement
└── CLAUDE.md        # Ce fichier
```

---

## Commandes

```bash
npm run test           # Exécuter tous les tests une fois
npm run test:watch     # Mode watch (re-run sur changements)
npm run test:coverage  # Avec rapport de couverture
```

---

## Règles strictes

### Quoi tester ?

| Niveau | Tester | Ne pas tester |
|--------|--------|---------------|
| **UI** | Props, classes, events natifs, slots | Styles CSS, logique métier |
| **Layout** | Props, classes Tailwind générées | Events (il n'y en a pas) |
| **Sections** | Props, events custom, composition | Logique métier (appartient aux pages) |

### Naming convention

```
tests/{niveau}/{Composant}.test.ts
```

Exemples :
- `tests/ui/Button.test.ts`
- `tests/layout/Stack.test.ts`
- `tests/sections/CTA.test.ts`

### Structure d'un fichier test

```typescript
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Button from '~/components/ui/Button.vue';

describe('Button', () => {
  // Helper pour accéder à l'élément réel (pas le wrapper div)
  const getButton = (wrapper: ReturnType<typeof mount>) => wrapper.find('button');

  // ============================================
  // RENDU DE BASE
  // ============================================

  it('renders a button element', () => {
    const wrapper = mount(Button, {
      slots: { default: 'Click me' },
    });

    expect(getButton(wrapper).exists()).toBe(true);
  });

  it('renders slot content', () => {
    const wrapper = mount(Button, {
      slots: { default: 'Click me' },
    });

    expect(getButton(wrapper).text()).toBe('Click me');
  });

  // ============================================
  // PROPS
  // ============================================

  describe('props', () => {
    it('applies variant class', () => {
      const wrapper = mount(Button, {
        props: { variant: 'secondary' },
      });

      expect(getButton(wrapper).classes()).toContain('btn--secondary');
    });
  });

  // ============================================
  // EVENTS
  // ============================================

  describe('events', () => {
    it('emits click event', async () => {
      const wrapper = mount(Button);
      await getButton(wrapper).trigger('click');
      expect(wrapper.emitted('click')).toHaveLength(1);
    });
  });

  // ============================================
  // SNAPSHOTS
  // ============================================

  describe('snapshots', () => {
    it('matches snapshot - primary md', () => {
      const wrapper = mount(Button, {
        slots: { default: 'Primary' },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});
```

### Pattern Helper obligatoire

**Vue Test Utils enveloppe les composants dans un `<div>`**. Pour accéder à l'élément réel, utiliser un helper :

```typescript
// ✅ CORRECT : Helper pour accéder à l'élément réel
const getButton = (wrapper: ReturnType<typeof mount>) => wrapper.find('button');
const getHeading = (wrapper: ReturnType<typeof mount>, level = 2) => wrapper.find(`h${level}`);
const getText = (wrapper: ReturnType<typeof mount>, tag: 'p' | 'span' = 'p') => wrapper.find(tag);

// ✅ Utilisation
expect(getButton(wrapper).classes()).toContain('btn--primary');
expect(getHeading(wrapper, 1).exists()).toBe(true);

// ❌ INCORRECT : Accès direct au wrapper
expect(wrapper.classes()).toContain('btn');  // Retourne [] (classes du div wrapper)
expect(wrapper.element.tagName).toBe('BUTTON');  // Retourne 'DIV'
```

---

## Snapshots

### Quand créer un snapshot ?

- **Toujours** pour les variantes principales du composant
- **Configurations clés** : variant + size combinés
- **États spéciaux** : disabled, loading, error

### Mise à jour des snapshots

```bash
npm run test -- -u  # Update all snapshots
```

**Attention** : Vérifier les diffs avant de valider.

---

## Tests par niveau

### UI Components

```typescript
// Helper obligatoire
const getButton = (wrapper: ReturnType<typeof mount>) => wrapper.find('button');

// Tester : props → classes BEM
it('applies variant class', () => {
  const wrapper = mount(Button, { props: { variant: 'outline' } });
  expect(getButton(wrapper).classes()).toContain('btn--outline');
});

// Tester : events natifs
it('emits click event', async () => {
  const wrapper = mount(Button);
  await getButton(wrapper).trigger('click');
  expect(wrapper.emitted('click')).toBeTruthy();
});

// Tester : slots
it('renders slot content', () => {
  const wrapper = mount(Button, { slots: { default: 'Label' } });
  expect(getButton(wrapper).text()).toBe('Label');
});
```

### Layout Components

```typescript
// Tester : props → classes Tailwind
it('applies gap class', () => {
  const wrapper = mount(Stack, { props: { gap: 'lg' } });
  expect(wrapper.classes()).toContain('gap-6');
});

// Tester : slots
it('renders slot content', () => {
  const wrapper = mount(Container, {
    slots: { default: '<div>Content</div>' },
  });
  expect(wrapper.text()).toBe('Content');
});

// NE PAS tester : events (il n'y en a pas)
```

### Section Components

```typescript
// Tester : events custom
it('emits primary-click when button clicked', async () => {
  const wrapper = mount(CTA, {
    props: { title: 'Test', primaryText: 'Click' },
  });

  await wrapper.find('button').trigger('click');
  expect(wrapper.emitted('primary-click')).toHaveLength(1);
});

// Tester : composition (utilise bien les composants)
it('renders Heading component', () => {
  const wrapper = mount(CTA, { props: { title: 'Test' } });
  expect(wrapper.findComponent({ name: 'Heading' }).exists()).toBe(true);
});
```

---

## ❌ Ne pas tester

```typescript
// ❌ Styles CSS (testé visuellement, pas en unit test)
expect(wrapper.element.style.backgroundColor).toBe('blue');

// ❌ Logique métier (appartient aux pages)
expect(router.push).toHaveBeenCalled();

// ❌ Appels API (appartient aux composables)
expect(fetch).toHaveBeenCalled();

// ❌ Implémentation interne
expect(wrapper.vm.internalState).toBe(true);
```

---

## ✅ Checklist nouveau test

- [ ] Fichier dans le bon dossier (`tests/{niveau}/`)
- [ ] Sections : Rendu de base, Props, Events, Snapshots
- [ ] Tests des props essentielles (pas toutes les combinaisons)
- [ ] Snapshots pour variantes principales
- [ ] Pas de test de styles CSS
- [ ] Pas de logique métier

---

## Coverage

Objectif minimal :
- **UI** : 80% des composants
- **Layout** : 70% des composants
- **Sections** : 60% des composants

Les composants `showcase/` sont exclus du coverage.
