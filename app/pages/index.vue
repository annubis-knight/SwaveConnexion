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
</script>
