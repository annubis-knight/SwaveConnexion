<template>
  <ShowcaseLayout
    title="Layouts"
    description="Composants de structure avec Tailwind utilities - Container, Grid, Stack, SplitPane"
  >

    <!-- CONTAINER -->
    <ShowcaseSection title="Container - Wrapper Responsive">
      <div class="space-y-8">
        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Tailles disponibles</h3>
          <div class="space-y-6">
            <!-- Container SM -->
            <div>
              <p class="text-sm font-medium mb-2 text-neutral-dark dark:text-neutral-medium">size="sm" (max-w-sm: 640px)</p>
              <LayoutContainer size="sm" :padding="true">
                <div class="bg-primary text-white p-4 rounded-lg text-center">
                  Contenu centré 640px
                </div>
              </LayoutContainer>
            </div>

            <!-- Container MD -->
            <div>
              <p class="text-sm font-medium mb-2 text-neutral-dark dark:text-neutral-medium">size="md" (max-w-md: 768px)</p>
              <LayoutContainer size="md" :padding="true">
                <div class="bg-secondary text-white p-4 rounded-lg text-center">
                  Contenu centré 768px
                </div>
              </LayoutContainer>
            </div>

            <!-- Container LG -->
            <div>
              <p class="text-sm font-medium mb-2 text-neutral-dark dark:text-neutral-medium">size="lg" (max-w-lg: 1024px) - Défaut</p>
              <LayoutContainer size="lg" :padding="true">
                <div class="bg-accent text-white p-4 rounded-lg text-center">
                  Contenu centré 1024px
                </div>
              </LayoutContainer>
            </div>

            <!-- Container XL -->
            <div>
              <p class="text-sm font-medium mb-2 text-neutral-dark dark:text-neutral-medium">size="xl" (max-w-xl: 1280px)</p>
              <LayoutContainer size="xl" :padding="true">
                <div class="bg-success text-white p-4 rounded-lg text-center">
                  Contenu centré 1280px
                </div>
              </LayoutContainer>
            </div>

            <!-- Container 2XL -->
            <div>
              <p class="text-sm font-medium mb-2 text-neutral-dark dark:text-neutral-medium">size="2xl" (max-w-2xl: 1536px)</p>
              <LayoutContainer size="2xl" :padding="true">
                <div class="bg-info text-white p-4 rounded-lg text-center">
                  Contenu centré 1536px
                </div>
              </LayoutContainer>
            </div>

            <!-- Container Full -->
            <div>
              <p class="text-sm font-medium mb-2 text-neutral-dark dark:text-neutral-medium">size="full" (max-w-full: 100%)</p>
              <LayoutContainer size="full" :padding="true">
                <div class="bg-error text-white p-4 rounded-lg text-center">
                  Pleine largeur sans max-width
                </div>
              </LayoutContainer>
            </div>
          </div>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Props</h3>
          <ShowcaseCodeBlock>
interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: boolean; // Ajoute px-6 (padding horizontal)
}
          </ShowcaseCodeBlock>
        </div>
      </div>
    </ShowcaseSection>

    <!-- GRID -->
    <ShowcaseSection title="Grid - Système de Grille">
      <div class="space-y-8">
        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Colonnes fixes</h3>

          <!-- Grid 3 colonnes -->
          <div class="mb-6">
            <p class="text-sm font-medium mb-3 text-neutral-dark dark:text-neutral-medium">cols=3 gap="md" (défaut)</p>
            <LayoutGrid :cols="3" gap="md">
              <div class="bg-primary text-white p-4 rounded-lg text-center">Col 1</div>
              <div class="bg-primary text-white p-4 rounded-lg text-center">Col 2</div>
              <div class="bg-primary text-white p-4 rounded-lg text-center">Col 3</div>
              <div class="bg-primary text-white p-4 rounded-lg text-center">Col 4</div>
              <div class="bg-primary text-white p-4 rounded-lg text-center">Col 5</div>
              <div class="bg-primary text-white p-4 rounded-lg text-center">Col 6</div>
            </LayoutGrid>
          </div>

          <!-- Grid 4 colonnes -->
          <div class="mb-6">
            <p class="text-sm font-medium mb-3 text-neutral-dark dark:text-neutral-medium">cols=4 gap="lg"</p>
            <LayoutGrid :cols="4" gap="lg">
              <div class="bg-secondary text-white p-4 rounded-lg text-center">Col 1</div>
              <div class="bg-secondary text-white p-4 rounded-lg text-center">Col 2</div>
              <div class="bg-secondary text-white p-4 rounded-lg text-center">Col 3</div>
              <div class="bg-secondary text-white p-4 rounded-lg text-center">Col 4</div>
            </LayoutGrid>
          </div>

          <!-- Grid 2 colonnes -->
          <div>
            <p class="text-sm font-medium mb-3 text-neutral-dark dark:text-neutral-medium">cols=2 gap="sm"</p>
            <LayoutGrid :cols="2" gap="sm">
              <div class="bg-accent text-white p-4 rounded-lg text-center">Col 1</div>
              <div class="bg-accent text-white p-4 rounded-lg text-center">Col 2</div>
            </LayoutGrid>
          </div>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Grid Responsive</h3>
          <p class="text-sm text-neutral-dark dark:text-neutral-medium mb-4">Redimensionne la fenêtre : mobile (1 col) → tablet (2 cols) → desktop (4 cols)</p>
          <LayoutGrid :cols="4" gap="md" :responsive="{ sm: 1, md: 2, lg: 4 }">
            <div class="bg-success text-white p-4 rounded-lg text-center">Item 1</div>
            <div class="bg-success text-white p-4 rounded-lg text-center">Item 2</div>
            <div class="bg-success text-white p-4 rounded-lg text-center">Item 3</div>
            <div class="bg-success text-white p-4 rounded-lg text-center">Item 4</div>
          </LayoutGrid>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Props</h3>
          <ShowcaseCodeBlock>
interface Props {
  cols?: 1 | 2 | 3 | 4 | 6 | 12; // Nombre de colonnes
  gap?: 'sm' | 'md' | 'lg';
  responsive?: {
    sm?: 1 | 2 | 3 | 4;
    md?: 1 | 2 | 3 | 4;
    lg?: 1 | 2 | 3 | 4 | 6 | 12;
  };
}
          </ShowcaseCodeBlock>
        </div>
      </div>
    </ShowcaseSection>

    <!-- STACK -->
    <ShowcaseSection title="Stack - Empilement Flex">
      <div class="space-y-8">
        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Direction</h3>

          <!-- Stack vertical -->
          <div class="mb-6">
            <p class="text-sm font-medium mb-3 text-neutral-dark dark:text-neutral-medium">direction="vertical" gap="md" (défaut)</p>
            <LayoutStack direction="vertical" gap="md">
              <div class="bg-primary text-white p-4 rounded-lg">Item 1 - Vertical</div>
              <div class="bg-primary text-white p-4 rounded-lg">Item 2 - Vertical</div>
              <div class="bg-primary text-white p-4 rounded-lg">Item 3 - Vertical</div>
            </LayoutStack>
          </div>

          <!-- Stack horizontal -->
          <div>
            <p class="text-sm font-medium mb-3 text-neutral-dark dark:text-neutral-medium">direction="horizontal" gap="sm"</p>
            <LayoutStack direction="horizontal" gap="sm">
              <div class="bg-secondary text-white p-4 rounded-lg flex-1">Item 1</div>
              <div class="bg-secondary text-white p-4 rounded-lg flex-1">Item 2</div>
              <div class="bg-secondary text-white p-4 rounded-lg flex-1">Item 3</div>
            </LayoutStack>
          </div>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Alignment</h3>

          <!-- Stack align center -->
          <div class="mb-6">
            <p class="text-sm font-medium mb-3 text-neutral-dark dark:text-neutral-medium">align="center" justify="center"</p>
            <div class="bg-neutral-50 dark:bg-neutral-dark rounded-lg p-6">
              <LayoutStack direction="vertical" gap="md" align="center" justify="center">
                <div class="bg-accent text-white p-4 rounded-lg">Centré horizontalement</div>
                <div class="bg-accent text-white p-4 rounded-lg">Chaque élément centré</div>
              </LayoutStack>
            </div>
          </div>

          <!-- Stack justify between -->
          <div>
            <p class="text-sm font-medium mb-3 text-neutral-dark dark:text-neutral-medium">horizontal justify="between"</p>
            <LayoutStack direction="horizontal" gap="none" justify="between">
              <div class="bg-success text-white p-4 rounded-lg">Gauche</div>
              <div class="bg-success text-white p-4 rounded-lg">Centre</div>
              <div class="bg-success text-white p-4 rounded-lg">Droite</div>
            </LayoutStack>
          </div>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Props</h3>
          <ShowcaseCodeBlock>
interface Props {
  direction?: 'vertical' | 'horizontal';
  gap?: 'none' | 'sm' | 'md' | 'lg';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
}
          </ShowcaseCodeBlock>
        </div>
      </div>
    </ShowcaseSection>

    <!-- SPLITPANE -->
    <ShowcaseSection title="SplitPane - Layout Sidebar">
      <div class="space-y-8">
        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Ratios de colonnes</h3>

          <!-- SplitPane 3/9 -->
          <div class="mb-6">
            <p class="text-sm font-medium mb-3 text-neutral-dark dark:text-neutral-medium">leftWidth=3 gap="md" (3/9 split)</p>
            <LayoutSplitPane :leftWidth="3" gap="md">
              <template #left>
                <div class="bg-primary text-white p-6 rounded-lg min-h-[200px]">
                  <p class="font-semibold mb-2">Sidebar (3 cols)</p>
                  <p class="text-sm">Navigation ou filtres</p>
                </div>
              </template>
              <template #right>
                <div class="bg-neutral-50 dark:bg-neutral-dark p-6 rounded-lg min-h-[200px]">
                  <p class="font-semibold text-neutral-black dark:text-neutral-white mb-2">Contenu principal (9 cols)</p>
                  <p class="text-neutral-dark dark:text-neutral-medium">Zone principale</p>
                </div>
              </template>
            </LayoutSplitPane>
          </div>

          <!-- SplitPane 4/8 -->
          <div class="mb-6">
            <p class="text-sm font-medium mb-3 text-neutral-dark dark:text-neutral-medium">leftWidth=4 gap="lg" (4/8 split)</p>
            <LayoutSplitPane :leftWidth="4" gap="lg">
              <template #left>
                <div class="bg-secondary text-white p-6 rounded-lg min-h-[200px]">
                  <p class="font-semibold mb-2">Sidebar Large (4 cols)</p>
                  <p class="text-sm">Plus de contenu</p>
                </div>
              </template>
              <template #right>
                <div class="bg-neutral-50 dark:bg-neutral-dark p-6 rounded-lg min-h-[200px]">
                  <p class="font-semibold text-neutral-black dark:text-neutral-white mb-2">Contenu principal (8 cols)</p>
                  <p class="text-neutral-dark dark:text-neutral-medium">Zone restante</p>
                </div>
              </template>
            </LayoutSplitPane>
          </div>

          <!-- SplitPane 2/10 -->
          <div>
            <p class="text-sm font-medium mb-3 text-neutral-dark dark:text-neutral-medium">leftWidth=2 gap="sm" (2/10 split)</p>
            <LayoutSplitPane :leftWidth="2" gap="sm">
              <template #left>
                <div class="bg-accent text-white p-6 rounded-lg min-h-[200px]">
                  <p class="font-semibold mb-2">Mini (2 cols)</p>
                  <p class="text-sm">Icônes</p>
                </div>
              </template>
              <template #right>
                <div class="bg-neutral-50 dark:bg-neutral-dark p-6 rounded-lg min-h-[200px]">
                  <p class="font-semibold text-neutral-black dark:text-neutral-white mb-2">Contenu principal (10 cols)</p>
                  <p class="text-neutral-dark dark:text-neutral-medium">Maximum d'espace</p>
                </div>
              </template>
            </LayoutSplitPane>
          </div>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Sidebar Collapsible</h3>
          <p class="text-sm text-neutral-dark dark:text-neutral-medium mb-4">Redimensionne la fenêtre : la sidebar disparaît sur mobile</p>
          <LayoutSplitPane :leftWidth="3" gap="md" :collapsible="true">
            <template #left>
              <div class="bg-success text-white p-6 rounded-lg min-h-[200px]">
                <p class="font-semibold mb-2">Sidebar Collapsible</p>
                <p class="text-sm">Visible uniquement sur desktop (lg:)</p>
              </div>
            </template>
            <template #right>
              <div class="bg-neutral-50 dark:bg-neutral-dark p-6 rounded-lg min-h-[200px]">
                <p class="font-semibold text-neutral-black dark:text-neutral-white mb-2">Contenu principal</p>
                <p class="text-neutral-dark dark:text-neutral-medium">Pleine largeur sur mobile</p>
              </div>
            </template>
          </LayoutSplitPane>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-4 text-neutral-black dark:text-neutral-white">Props</h3>
          <ShowcaseCodeBlock>
interface Props {
  leftWidth?: 2 | 3 | 4; // Colonnes sidebar (sur 12)
  gap?: 'sm' | 'md' | 'lg';
  collapsible?: boolean; // Cache sidebar sur mobile
  fullHeight?: boolean; // min-h-screen
}

// Slots:
// - left: Contenu sidebar
// - right: Contenu principal
          </ShowcaseCodeBlock>
        </div>
      </div>
    </ShowcaseSection>

    <!-- EXEMPLE COMBINÉ -->
    <ShowcaseSection title="Exemple Combiné - Dashboard Layout">
      <LayoutSplitPane :leftWidth="3" gap="md" :fullHeight="false">
        <template #left>
          <div class="bg-primary text-white p-6 rounded-lg">
            <h3 class="font-semibold text-lg mb-4">Navigation</h3>
            <LayoutStack direction="vertical" gap="sm">
              <div class="bg-primary-dark p-3 rounded">Dashboard</div>
              <div class="bg-primary-dark p-3 rounded">Analytics</div>
              <div class="bg-primary-dark p-3 rounded">Settings</div>
              <div class="bg-primary-dark p-3 rounded">Profile</div>
            </LayoutStack>
          </div>
        </template>
        <template #right>
          <LayoutStack direction="vertical" gap="md">
            <div class="bg-white dark:bg-neutral-medium p-6 rounded-lg shadow">
              <h3 class="font-semibold text-neutral-black dark:text-neutral-white mb-4">Stats Grid</h3>
              <LayoutGrid :cols="3" gap="md">
                <div class="bg-success text-white p-4 rounded text-center">
                  <p class="text-2xl font-bold">2.4k</p>
                  <p class="text-sm">Users</p>
                </div>
                <div class="bg-info text-white p-4 rounded text-center">
                  <p class="text-2xl font-bold">156</p>
                  <p class="text-sm">Orders</p>
                </div>
                <div class="bg-warning text-white p-4 rounded text-center">
                  <p class="text-2xl font-bold">$12k</p>
                  <p class="text-sm">Revenue</p>
                </div>
              </LayoutGrid>
            </div>

            <div class="bg-white dark:bg-neutral-medium p-6 rounded-lg shadow">
              <h3 class="font-semibold text-neutral-black dark:text-neutral-white mb-4">Recent Activity</h3>
              <LayoutStack direction="vertical" gap="sm">
                <div class="bg-neutral-50 dark:bg-neutral-dark p-3 rounded">User John signed up</div>
                <div class="bg-neutral-50 dark:bg-neutral-dark p-3 rounded">New order #1234</div>
                <div class="bg-neutral-50 dark:bg-neutral-dark p-3 rounded">Payment received</div>
              </LayoutStack>
            </div>
          </LayoutStack>
        </template>
      </LayoutSplitPane>
    </ShowcaseSection>

  </ShowcaseLayout>
</template>

<script setup lang="ts">
/**
 * DESIGN SYSTEM - LAYOUTS PAGE (PHASE 13)
 *
 * @dev Regroupe tous les composants de layout
 * @dev Container, Grid, Stack, SplitPane
 */

// Meta tags
useHead({
  title: 'Layouts - Design System',
  meta: [
    { name: 'description', content: 'Composants de structure avec Tailwind utilities - Container, Grid, Stack, SplitPane' }
  ]
});
</script>
