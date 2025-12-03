<template>
  <!--
    Page Index - Showcase du Design System

    Description : Page de démonstration de TOUS les composants UI, Layout et Sections

    @dev Teste tous les composants créés dans Phases 4-5
    @dev Auto-import Nuxt (Button, Card, Input, etc.)
  -->
  <div>
    <!-- Hero Section avec gradient -->
    <SectionsHero variant="gradient" :centered="true">
      <h1 class="text-white text-5xl lg:text-6xl font-bold mb-6">
        SwaveConnexion Design System
      </h1>
      <p class="text-xl lg:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
        Système de design minimaliste avec CSS natif + Tailwind 4
      </p>
      <div class="flex gap-4 justify-center flex-wrap">
        <Button variant="primary" size="lg">Commencer</Button>
        <Button variant="outline" size="lg">Documentation</Button>
      </div>
    </SectionsHero>

    <!-- Contenu principal avec toutes les sections -->
    <div class="container mx-auto px-6 py-12 space-y-16">

      <!-- Section Typographie -->
      <section>
        <h2 class="text-4xl font-bold mb-6">Typographie</h2>
        <div class="space-y-4">
          <h1>H1 - Titre principal (84px)</h1>
          <h2>H2 - Titre secondaire (64px)</h2>
          <h3>H3 - Titre tertiaire (48px)</h3>
          <h4>H4 - Titre quaternaire (36px)</h4>
          <h5>H5 - Titre quinaire (28px)</h5>
          <h6>H6 - Titre sixième niveau (20px)</h6>
          <p class="mt-6">
            Paragraphe de base (16px). Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Type scale basé sur multiples de 4px pour cohérence avec grille design.
          </p>
          <ul class="mt-4">
            <li>Item de liste 1 avec Space Grotesk</li>
            <li>Item de liste 2 avec line-height relaxed</li>
            <li>Item de liste 3 pour démonstration</li>
          </ul>
        </div>
      </section>

      <!-- Section Boutons -->
      <section>
        <h2 class="text-4xl font-bold mb-6">Boutons</h2>
        <div class="space-y-6">
          <div>
            <h4 class="text-xl font-semibold mb-4">Variantes</h4>
            <div class="flex flex-wrap gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="accent">Accent</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="primary" disabled>Disabled</Button>
            </div>
          </div>
          <div>
            <h4 class="text-xl font-semibold mb-4">Tailles</h4>
            <div class="flex flex-wrap gap-4 items-center">
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
            </div>
          </div>
        </div>
      </section>

      <!-- Section Cards -->
      <section>
        <h2 class="text-4xl font-bold mb-6">Cards</h2>
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
      </section>

      <!-- Section Formulaires -->
      <section>
        <h2 class="text-4xl font-bold mb-6">Formulaires</h2>
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
      </section>

      <!-- Section Badges -->
      <section>
        <h2 class="text-4xl font-bold mb-6">Badges</h2>
        <div class="space-y-6">
          <div>
            <h4 class="text-xl font-semibold mb-4">Variantes sémantiques</h4>
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
            <h4 class="text-xl font-semibold mb-4">Tailles</h4>
            <div class="flex flex-wrap gap-3 items-center">
              <Badge variant="primary" size="sm">Small</Badge>
              <Badge variant="primary" size="md">Medium</Badge>
            </div>
          </div>
        </div>
      </section>

      <!-- Section Modal -->
      <section>
        <h2 class="text-4xl font-bold mb-6">Modal</h2>
        <Button variant="primary" @click="isModalOpen = true">
          Ouvrir la Modal
        </Button>

        <Modal
          :is-open="isModalOpen"
          title="Exemple de Modal"
          @close="isModalOpen = false"
        >
          <p class="mb-4">
            Ceci est le contenu de la modal. Elle se ferme avec la touche <strong>ESC</strong>
            ou en cliquant en dehors de la fenêtre.
          </p>
          <p>
            La modal utilise <code>@vueuse/core</code> pour les interactions (onKeyStroke, onClickOutside).
          </p>

          <template #footer>
            <div class="flex gap-3 justify-end">
              <Button variant="outline" @click="isModalOpen = false">Annuler</Button>
              <Button variant="primary" @click="isModalOpen = false">Confirmer</Button>
            </div>
          </template>
        </Modal>
      </section>

      <!-- Section Dropdown -->
      <section>
        <h2 class="text-4xl font-bold mb-6">Dropdown</h2>
        <div class="max-w-md">
          <Dropdown
            :items="dropdownItems"
            placeholder="Choisir une option"
            @select="handleSelect"
          />
          <p v-if="selectedValue" class="mt-4 text-lg">
            <strong>Sélection actuelle :</strong> {{ selectedValue }}
          </p>
        </div>
      </section>

      <!-- ========== PHASE 8: NOUVEAUX COMPOSANTS ========== -->

      <!-- Section Checkbox -->
      <section>
        <h2 class="text-4xl font-bold mb-6">Checkbox (Phase 8)</h2>
        <div class="space-y-4">
          <div>
            <h4 class="text-xl font-semibold mb-4">Cases à cocher simples</h4>
            <div class="space-y-3">
              <Checkbox v-model="checkboxes.option1" label="Option 1 (cochée par défaut)" />
              <Checkbox v-model="checkboxes.option2" label="Option 2" />
              <Checkbox v-model="checkboxes.option3" label="Option 3 désactivée" disabled />
              <Checkbox v-model="checkboxes.indeterminate" :indeterminate="true" label="État indéterminé" />
            </div>
          </div>
          <div class="mt-4 p-4 bg-gray-100 rounded">
            <strong>État :</strong> {{ JSON.stringify(checkboxes) }}
          </div>
        </div>
      </section>

      <!-- Section Switch -->
      <section>
        <h2 class="text-4xl font-bold mb-6">Switch (Phase 8)</h2>
        <div class="space-y-6">
          <div>
            <h4 class="text-xl font-semibold mb-4">Taille Medium</h4>
            <div class="space-y-3">
              <Switch v-model="switches.notifications" label="Notifications" />
              <Switch v-model="switches.darkMode" label="Mode sombre" />
              <Switch v-model="switches.disabled" label="Désactivé" disabled />
            </div>
          </div>
          <div>
            <h4 class="text-xl font-semibold mb-4">Taille Small</h4>
            <div class="space-y-3">
              <Switch v-model="switches.compact" label="Compact" size="sm" />
              <Switch v-model="switches.animations" label="Animations" size="sm" />
            </div>
          </div>
          <div class="mt-4 p-4 bg-gray-100 rounded">
            <strong>État :</strong> {{ JSON.stringify(switches) }}
          </div>
        </div>
      </section>

      <!-- Section ProgressBar -->
      <section>
        <h2 class="text-4xl font-bold mb-6">ProgressBar (Phase 8)</h2>
        <div class="space-y-6 max-w-2xl">
          <div>
            <h4 class="text-xl font-semibold mb-4">Variantes</h4>
            <div class="space-y-4">
              <div>
                <p class="mb-2">Primary (25%)</p>
                <ProgressBar :value="25" variant="primary" show-label />
              </div>
              <div>
                <p class="mb-2">Success (60%)</p>
                <ProgressBar :value="60" variant="success" show-label />
              </div>
              <div>
                <p class="mb-2">Warning (75%)</p>
                <ProgressBar :value="75" variant="warning" show-label />
              </div>
              <div>
                <p class="mb-2">Error (40%)</p>
                <ProgressBar :value="40" variant="error" show-label />
              </div>
            </div>
          </div>
          <div>
            <h4 class="text-xl font-semibold mb-4">Animation stripes</h4>
            <ProgressBar :value="progressValue" variant="primary" :animated="true" show-label />
            <div class="flex gap-3 mt-4">
              <Button variant="primary" size="sm" @click="progressValue = Math.min(progressValue + 10, 100)">+10%</Button>
              <Button variant="outline" size="sm" @click="progressValue = Math.max(progressValue - 10, 0)">-10%</Button>
            </div>
          </div>
        </div>
      </section>

      <!-- Section Toast -->
      <section>
        <h2 class="text-4xl font-bold mb-6">Toast (Phase 8)</h2>
        <div class="space-y-4">
          <h4 class="text-xl font-semibold mb-4">Notifications (auto-dismiss 3s)</h4>
          <div class="flex flex-wrap gap-3">
            <Button variant="primary" @click="showToast('success')">Success</Button>
            <Button variant="secondary" @click="showToast('warning')">Warning</Button>
            <Button variant="accent" @click="showToast('error')">Error</Button>
            <Button variant="outline" @click="showToast('info')">Info</Button>
          </div>
        </div>

        <Toast :is-open="toasts.success" variant="success" title="Succès !" @close="toasts.success = false">
          Action effectuée avec succès.
        </Toast>
        <Toast :is-open="toasts.warning" variant="warning" title="Attention" @close="toasts.warning = false">
          Action nécessite votre attention.
        </Toast>
        <Toast :is-open="toasts.error" variant="error" title="Erreur" @close="toasts.error = false">
          Une erreur s'est produite.
        </Toast>
        <Toast :is-open="toasts.info" variant="info" title="Information" @close="toasts.info = false">
          Information importante.
        </Toast>
      </section>

      <!-- Section Tooltip -->
      <section>
        <h2 class="text-4xl font-bold mb-6">Tooltip (Phase 8)</h2>
        <div class="space-y-6">
          <div>
            <h4 class="text-xl font-semibold mb-4">Positions (hover)</h4>
            <div class="flex flex-wrap gap-6 items-center justify-center p-12">
              <Tooltip text="Tooltip en haut" position="top">
                <Button variant="primary" size="sm">Top</Button>
              </Tooltip>
              <Tooltip text="Tooltip à droite" position="right">
                <Button variant="primary" size="sm">Right</Button>
              </Tooltip>
              <Tooltip text="Tooltip en bas" position="bottom">
                <Button variant="primary" size="sm">Bottom</Button>
              </Tooltip>
              <Tooltip text="Tooltip à gauche" position="left">
                <Button variant="primary" size="sm">Left</Button>
              </Tooltip>
            </div>
          </div>
        </div>
      </section>

      <!-- Section Tabs -->
      <section>
        <h2 class="text-4xl font-bold mb-6">Tabs (Phase 8)</h2>
        <div class="max-w-3xl">
          <h4 class="text-xl font-semibold mb-4">Navigation (Arrow keys, Home, End)</h4>
          <Tabs v-model="activeTab" :items="tabItems">
            <div v-if="activeTab === 'tab1'" class="p-6 border rounded">
              <h3 class="text-2xl font-semibold mb-3">Onglet 1</h3>
              <p>Contenu du premier onglet.</p>
            </div>
            <div v-else-if="activeTab === 'tab2'" class="p-6 border rounded">
              <h3 class="text-2xl font-semibold mb-3">Onglet 2</h3>
              <p>Contenu du deuxième onglet.</p>
            </div>
            <div v-else-if="activeTab === 'tab3'" class="p-6 border rounded">
              <h3 class="text-2xl font-semibold mb-3">Onglet 3</h3>
              <p>Contenu du troisième onglet.</p>
            </div>
          </Tabs>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * INDEX PAGE - Design System Showcase
 *
 * @dev Page de démonstration complète de tous les composants
 * @dev Utilise le layout default.vue (Header + Footer)
 * @dev Auto-import des composants par Nuxt
 */

// Form data
const formData = reactive({
  name: '',
  email: '',
  password: '',
  error: '',
});

// Modal state
const isModalOpen = ref(false);

// Dropdown state
const dropdownItems = [
  { label: 'Option 1', value: 'opt1' },
  { label: 'Option 2', value: 'opt2' },
  { label: 'Option 3', value: 'opt3' },
];

const selectedValue = ref('');

const handleSelect = (value: string) => {
  selectedValue.value = value;
};

// ========== PHASE 8: STATE ========== //

// Checkbox state
const checkboxes = reactive({
  option1: true,
  option2: false,
  option3: false,
  indeterminate: false,
});

// Switch state
const switches = reactive({
  notifications: true,
  darkMode: false,
  disabled: false,
  compact: true,
  animations: false,
});

// ProgressBar state
const progressValue = ref(50);

// Toast state
const toasts = reactive({
  success: false,
  warning: false,
  error: false,
  info: false,
});

const showToast = (type: 'success' | 'warning' | 'error' | 'info') => {
  toasts[type] = true;
};

// Tabs state
const activeTab = ref('tab1');
const tabItems = [
  { label: 'Onglet 1', value: 'tab1' },
  { label: 'Onglet 2', value: 'tab2' },
  { label: 'Onglet 3', value: 'tab3' },
  { label: 'Désactivé', value: 'tab4', disabled: true },
];
</script>
