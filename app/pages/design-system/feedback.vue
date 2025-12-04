<template>
  <ShowcaseLayout
    title="Feedback"
    description="Composants de retour utilisateur et d'interaction - Toast, Modal, Tooltip, ProgressBar, Tabs"
  >

    <!-- TOAST -->
    <ShowcaseSection title="Toast">
      <div class="space-y-8">
        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Notifications (auto-dismiss 3s)</h3>
          <div class="flex flex-wrap gap-3">
            <Button variant="primary" @click="showToast('success')">Success</Button>
            <Button variant="secondary" @click="showToast('warning')">Warning</Button>
            <Button variant="accent" @click="showToast('error')">Error</Button>
            <Button variant="outline" @click="showToast('info')">Info</Button>
          </div>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Props</h3>
          <ShowcaseCodeBlock>
interface Props {
  isOpen: boolean;
  variant?: 'success' | 'warning' | 'error' | 'info';
  title: string;
  duration?: number; // Auto-dismiss delay (ms)
}

// Events:
// - close: Émis quand le toast se ferme
          </ShowcaseCodeBlock>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Accessibilité</h3>
          <ul class="space-y-2 text-neutral-dark dark:text-neutral-medium">
            <li>✅ Position fixed top-right (z-index élevé)</li>
            <li>✅ Fermeture automatique après 3s</li>
            <li>✅ Bouton close accessible</li>
            <li>✅ Transition smooth (fade in/out)</li>
          </ul>
        </div>
      </div>

      <!-- Toast instances -->
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
    </ShowcaseSection>

    <!-- MODAL -->
    <ShowcaseSection title="Modal">
      <div class="space-y-8">
        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Dialogue</h3>
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
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Props</h3>
          <ShowcaseCodeBlock>
interface Props {
  isOpen: boolean;
  title: string;
}

// Slots:
// - default: Contenu de la modal
// - footer: Pied de page (boutons d'action)

// Events:
// - close: Émis lors de la fermeture
          </ShowcaseCodeBlock>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Accessibilité</h3>
          <ul class="space-y-2 text-neutral-dark dark:text-neutral-medium">
            <li>✅ Backdrop avec Teleport (rendu hors DOM parent)</li>
            <li>✅ Fermeture avec ESC (onKeyStroke)</li>
            <li>✅ Fermeture en cliquant sur backdrop (onClickOutside)</li>
            <li>✅ Focus trap (focus reste dans modal)</li>
            <li>✅ ARIA: role="dialog" + aria-modal="true"</li>
          </ul>
        </div>
      </div>
    </ShowcaseSection>

    <!-- TOOLTIP -->
    <ShowcaseSection title="Tooltip">
      <div class="space-y-8">
        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Positions (hover)</h3>
          <div class="flex flex-wrap gap-6 items-center justify-center p-12 bg-neutral-50 dark:bg-neutral-dark rounded-lg">
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

        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Props</h3>
          <ShowcaseCodeBlock>
interface Props {
  text: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
}

// Slot:
// - default: Élément déclencheur (hover)
          </ShowcaseCodeBlock>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Accessibilité</h3>
          <ul class="space-y-2 text-neutral-dark dark:text-neutral-medium">
            <li>✅ Affichage au hover (mouseenter/mouseleave)</li>
            <li>✅ Position relative au trigger</li>
            <li>✅ Fond sombre avec texte blanc (contraste élevé)</li>
            <li>✅ Arrow pointer vers le trigger</li>
          </ul>
        </div>
      </div>
    </ShowcaseSection>

    <!-- PROGRESSBAR -->
    <ShowcaseSection title="ProgressBar">
      <div class="space-y-8">
        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Variantes</h3>
          <div class="space-y-4 max-w-2xl">
            <div>
              <p class="mb-2 text-neutral-black dark:text-neutral-white">Primary (25%)</p>
              <ProgressBar :value="25" variant="primary" show-label />
            </div>
            <div>
              <p class="mb-2 text-neutral-black dark:text-neutral-white">Success (60%)</p>
              <ProgressBar :value="60" variant="success" show-label />
            </div>
            <div>
              <p class="mb-2 text-neutral-black dark:text-neutral-white">Warning (75%)</p>
              <ProgressBar :value="75" variant="warning" show-label />
            </div>
            <div>
              <p class="mb-2 text-neutral-black dark:text-neutral-white">Error (40%)</p>
              <ProgressBar :value="40" variant="error" show-label />
            </div>
          </div>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Animation stripes</h3>
          <div class="max-w-2xl">
            <ProgressBar :value="progressValue" variant="primary" :animated="true" show-label />
            <div class="flex gap-3 mt-4">
              <Button variant="primary" size="sm" @click="progressValue = Math.min(progressValue + 10, 100)">+10%</Button>
              <Button variant="outline" size="sm" @click="progressValue = Math.max(progressValue - 10, 0)">-10%</Button>
            </div>
          </div>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Props</h3>
          <ShowcaseCodeBlock>
interface Props {
  value: number; // 0-100
  variant?: 'primary' | 'success' | 'warning' | 'error';
  showLabel?: boolean;
  animated?: boolean; // Stripes animation
}
          </ShowcaseCodeBlock>
        </div>
      </div>
    </ShowcaseSection>

    <!-- TABS -->
    <ShowcaseSection title="Tabs">
      <div class="space-y-8">
        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Navigation (Arrow keys, Home, End)</h3>
          <Tabs v-model="activeTab" :items="tabItems">
            <div v-if="activeTab === 'tab1'" class="p-6 border border-neutral-medium rounded-lg bg-white dark:bg-neutral-medium">
              <h3 class="text-2xl font-semibold mb-3 text-neutral-black dark:text-neutral-white">Onglet 1</h3>
              <p class="text-neutral-dark dark:text-neutral-medium">Contenu du premier onglet avec démonstration de la navigation par clavier.</p>
            </div>
            <div v-else-if="activeTab === 'tab2'" class="p-6 border border-neutral-medium rounded-lg bg-white dark:bg-neutral-medium">
              <h3 class="text-2xl font-semibold mb-3 text-neutral-black dark:text-neutral-white">Onglet 2</h3>
              <p class="text-neutral-dark dark:text-neutral-medium">Contenu du deuxième onglet. Utilisez les flèches gauche/droite pour naviguer.</p>
            </div>
            <div v-else-if="activeTab === 'tab3'" class="p-6 border border-neutral-medium rounded-lg bg-white dark:bg-neutral-medium">
              <h3 class="text-2xl font-semibold mb-3 text-neutral-black dark:text-neutral-white">Onglet 3</h3>
              <p class="text-neutral-dark dark:text-neutral-medium">Contenu du troisième onglet. Home pour premier onglet, End pour dernier.</p>
            </div>
          </Tabs>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Props</h3>
          <ShowcaseCodeBlock>
interface Props {
  modelValue: string; // ID du tab actif
  items: Array&lt;{ id: string; label: string }&gt;;
}

// Slot:
// - default: Contenu des tabs (v-if sur activeTab)

// Events:
// - update:modelValue: Émis lors du changement de tab
          </ShowcaseCodeBlock>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Accessibilité</h3>
          <ul class="space-y-2 text-neutral-dark dark:text-neutral-medium">
            <li>✅ ARIA: role="tablist", role="tab", role="tabpanel"</li>
            <li>✅ Keyboard: Arrows, Home, End</li>
            <li>✅ Active indicator (bordure bottom primary)</li>
            <li>✅ Focus visible avec outline</li>
          </ul>
        </div>
      </div>
    </ShowcaseSection>

  </ShowcaseLayout>
</template>

<script setup lang="ts">
/**
 * DESIGN SYSTEM - FEEDBACK PAGE (PHASE 13)
 *
 * @dev Regroupe tous les composants de feedback
 * @dev Toast, Modal, Tooltip, ProgressBar, Tabs
 */

// Meta tags
useHead({
  title: 'Feedback - Design System',
  meta: [
    { name: 'description', content: 'Composants de retour utilisateur - Toast, Modal, Tooltip, ProgressBar, Tabs' }
  ]
});

// Toast state
const toasts = ref({
  success: false,
  warning: false,
  error: false,
  info: false
});

const showToast = (variant: 'success' | 'warning' | 'error' | 'info') => {
  toasts.value[variant] = true;
};

// Modal state
const isModalOpen = ref(false);

// ProgressBar state
const progressValue = ref(50);

// Tabs state
const activeTab = ref('tab1');
const tabItems = [
  { id: 'tab1', label: 'Onglet 1' },
  { id: 'tab2', label: 'Onglet 2' },
  { id: 'tab3', label: 'Onglet 3' }
];
</script>
