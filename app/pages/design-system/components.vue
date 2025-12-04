<template>
  <ShowcaseLayout
    title="UI Components"
    description="Composants atomiques avec CSS natif et BEM - Buttons, Forms, Badges, Cards"
  >

    <!-- BUTTONS -->
    <ShowcaseSection title="Buttons">
      <div class="space-y-8">
        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Variantes</h3>
          <div class="flex flex-wrap gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="primary" disabled>Disabled</Button>
          </div>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Tailles</h3>
          <div class="flex flex-wrap gap-4 items-center">
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="md">Medium</Button>
            <Button variant="primary" size="lg">Large</Button>
          </div>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Props</h3>
          <ShowcaseCodeBlock>
interface Props {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'outline-light';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}
          </ShowcaseCodeBlock>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Utilisation</h3>
          <ShowcaseCodeBlock>
&lt;Button variant="primary" size="lg" @click="handleClick"&gt;
  Click me
&lt;/Button&gt;
          </ShowcaseCodeBlock>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Accessibilité</h3>
          <ul class="space-y-2 text-neutral-dark dark:text-neutral-medium">
            <li>✅ Keyboard: Support natif (button HTML)</li>
            <li>✅ Screen reader: Texte accessible</li>
            <li>✅ Focus visible: Outline 2px primary</li>
            <li>✅ Disabled: cursor not-allowed + opacity 60%</li>
          </ul>
        </div>
      </div>
    </ShowcaseSection>

    <!-- FORMS -->
    <ShowcaseSection title="Forms">
      <div class="space-y-8">
        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Input</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
            <Input
              v-model="formData.name"
              label="Nom complet"
              placeholder="Entrez votre nom"
            />
            <Input
              v-model="formData.email"
              label="Email"
              type="email"
              placeholder="exemple@mail.com"
            />
            <Input
              v-model="formData.password"
              label="Mot de passe"
              type="password"
              placeholder="••••••••"
            />
            <Input
              v-model="formData.error"
              label="Avec erreur"
              error="Ce champ est requis"
              placeholder="Champ invalide"
            />
          </div>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Checkbox</h3>
          <div class="space-y-3">
            <Checkbox v-model="checkboxes.option1" label="Option 1 (cochée par défaut)" />
            <Checkbox v-model="checkboxes.option2" label="Option 2" />
            <Checkbox v-model="checkboxes.option3" label="Option 3 désactivée" disabled />
            <Checkbox v-model="checkboxes.indeterminate" :indeterminate="true" label="État indéterminé" />
          </div>
          <div class="mt-4 p-4 bg-neutral-50 dark:bg-neutral-dark rounded text-sm">
            <strong>État :</strong> {{ JSON.stringify(checkboxes) }}
          </div>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Switch</h3>
          <div class="space-y-6">
            <div>
              <h4 class="text-lg font-medium mb-3 text-neutral-black dark:text-neutral-white">Taille Medium</h4>
              <div class="space-y-3">
                <Switch v-model="switches.notifications" label="Notifications" />
                <Switch v-model="switches.darkMode" label="Mode sombre" />
                <Switch v-model="switches.disabled" label="Désactivé" disabled />
              </div>
            </div>
            <div>
              <h4 class="text-lg font-medium mb-3 text-neutral-black dark:text-neutral-white">Taille Small</h4>
              <div class="space-y-3">
                <Switch v-model="switches.compact" label="Compact" size="sm" />
                <Switch v-model="switches.animations" label="Animations" size="sm" />
              </div>
            </div>
            <div class="p-4 bg-neutral-50 dark:bg-neutral-dark rounded text-sm">
              <strong>État :</strong> {{ JSON.stringify(switches) }}
            </div>
          </div>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Dropdown</h3>
          <div class="max-w-md">
            <Dropdown
              :items="dropdownItems"
              placeholder="Choisir une option"
              @select="handleSelect"
            />
            <p v-if="selectedValue" class="mt-4 text-lg text-neutral-black dark:text-neutral-white">
              <strong>Sélection actuelle :</strong> {{ selectedValue }}
            </p>
          </div>
        </div>
      </div>
    </ShowcaseSection>

    <!-- BADGES -->
    <ShowcaseSection title="Badges">
      <div class="space-y-8">
        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Variantes sémantiques</h3>
          <div class="flex flex-wrap gap-3">
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="accent">Accent</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
          </div>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Tailles</h3>
          <div class="flex flex-wrap gap-3 items-center">
            <Badge variant="primary" size="sm">Small</Badge>
            <Badge variant="primary" size="md">Medium</Badge>
          </div>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Accessibilité WCAG AA</h3>
          <ul class="space-y-2 text-neutral-dark dark:text-neutral-medium">
            <li>✅ Success: Contraste 4.8:1 (vert foncé #047857)</li>
            <li>✅ Warning: Contraste 4.5:1 (brun #92400e)</li>
            <li>✅ Error: Contraste 4.6:1 (rouge foncé #991b1b)</li>
            <li>✅ Toutes les variantes passent WCAG 2.1 Level AA</li>
          </ul>
        </div>
      </div>
    </ShowcaseSection>

    <!-- CARDS -->
    <ShowcaseSection title="Cards">
      <div class="space-y-8">
        <div>
          <h3 class="text-xl font-semibold mb-6 text-neutral-black dark:text-neutral-white">Variantes</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="default">
              <template #header>
                <h4 class="text-xl font-semibold">Card Default</h4>
              </template>
              <p>Card avec style par défaut. Contenu simple et épuré pour afficher des informations.</p>
              <template #footer>
                <Button variant="primary" size="sm">Action</Button>
              </template>
            </Card>

            <Card variant="bordered">
              <template #header>
                <h4 class="text-xl font-semibold">Card Bordered</h4>
              </template>
              <p>Card avec bordure épaisse pour mise en avant visuelle supplémentaire.</p>
            </Card>

            <Card variant="elevated">
              <template #header>
                <h4 class="text-xl font-semibold">Card Elevated</h4>
              </template>
              <p>Card avec ombre portée pour effet de profondeur et hiérarchie visuelle.</p>
            </Card>
          </div>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Props</h3>
          <ShowcaseCodeBlock>
interface Props {
  variant?: 'default' | 'bordered' | 'elevated';
}

// Slots:
// - header: En-tête de la card
// - default: Contenu principal
// - footer: Pied de page (optionnel)
          </ShowcaseCodeBlock>
        </div>
      </div>
    </ShowcaseSection>

  </ShowcaseLayout>
</template>

<script setup lang="ts">
/**
 * DESIGN SYSTEM - UI COMPONENTS PAGE (PHASE 13)
 *
 * @dev Regroupe tous les composants UI atomiques
 * @dev Utilise ShowcaseLayout + ShowcaseSection
 * @dev 4 catégories: Buttons, Forms, Badges, Cards
 */

// Meta tags
useHead({
  title: 'UI Components - Design System',
  meta: [
    { name: 'description', content: 'Composants UI atomiques avec CSS natif et BEM - Buttons, Forms, Badges, Cards' }
  ]
});

// État du formulaire
const formData = ref({
  name: '',
  email: '',
  password: '',
  error: ''
});

// État des checkboxes
const checkboxes = ref({
  option1: true,
  option2: false,
  option3: false,
  indeterminate: false
});

// État des switches
const switches = ref({
  notifications: true,
  darkMode: false,
  disabled: false,
  compact: true,
  animations: false
});

// Dropdown items
const dropdownItems = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4 (très longue pour tester)' }
];

const selectedValue = ref('');

const handleSelect = (value: string) => {
  const selected = dropdownItems.find(item => item.value === value);
  selectedValue.value = selected?.label || '';
};
</script>
