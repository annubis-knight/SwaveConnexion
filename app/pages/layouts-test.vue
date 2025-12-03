<template>
  <div class="min-h-screen bg-neutral-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b border-neutral-200 sticky top-0 z-50">
      <LayoutContainer size="2xl" :padding="true">
        <div class="py-6">
          <h1 class="text-3xl font-bold text-neutral-900 mb-2">Phase 9 - Tests Layouts Avancés</h1>
          <p class="text-neutral-600">Tests des composants Container, Grid, Stack, et SplitPane avec Tailwind utilities</p>
        </div>
      </LayoutContainer>
    </div>

    <div class="py-12">
      <!-- Section 1: Container -->
      <section class="mb-16">
        <LayoutContainer size="2xl" :padding="true">
          <h2 class="text-2xl font-bold text-neutral-900 mb-6">1. Container - Wrapper Responsive</h2>

          <!-- Container SM -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold text-neutral-800 mb-3">Container size="sm" (max-w-sm: 640px)</h3>
            <LayoutContainer size="sm" :padding="true">
              <div class="bg-primary text-white p-6 rounded-lg text-center">
                <p>Contenu centré avec max-width de 640px</p>
              </div>
            </LayoutContainer>
          </div>

          <!-- Container MD -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold text-neutral-800 mb-3">Container size="md" (max-w-md: 768px)</h3>
            <LayoutContainer size="md" :padding="true">
              <div class="bg-secondary text-white p-6 rounded-lg text-center">
                <p>Contenu centré avec max-width de 768px</p>
              </div>
            </LayoutContainer>
          </div>

          <!-- Container LG (défaut) -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold text-neutral-800 mb-3">Container size="lg" (max-w-lg: 1024px) - Défaut</h3>
            <LayoutContainer size="lg" :padding="true">
              <div class="bg-accent text-white p-6 rounded-lg text-center">
                <p>Contenu centré avec max-width de 1024px</p>
              </div>
            </LayoutContainer>
          </div>

          <!-- Container XL -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold text-neutral-800 mb-3">Container size="xl" (max-w-xl: 1280px)</h3>
            <LayoutContainer size="xl" :padding="true">
              <div class="bg-success text-white p-6 rounded-lg text-center">
                <p>Contenu centré avec max-width de 1280px</p>
              </div>
            </LayoutContainer>
          </div>

          <!-- Container 2XL -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold text-neutral-800 mb-3">Container size="2xl" (max-w-2xl: 1536px)</h3>
            <LayoutContainer size="2xl" :padding="true">
              <div class="bg-info text-white p-6 rounded-lg text-center">
                <p>Contenu centré avec max-width de 1536px</p>
              </div>
            </LayoutContainer>
          </div>

          <!-- Container Full -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold text-neutral-800 mb-3">Container size="full" (max-w-full: 100%)</h3>
            <LayoutContainer size="full" :padding="true">
              <div class="bg-error text-white p-6 rounded-lg text-center">
                <p>Contenu pleine largeur sans max-width</p>
              </div>
            </LayoutContainer>
          </div>
        </LayoutContainer>
      </section>

      <!-- Section 2: Grid -->
      <section class="mb-16">
        <LayoutContainer size="2xl" :padding="true">
          <h2 class="text-2xl font-bold text-neutral-900 mb-6">2. Grid - Système de Grille</h2>

          <!-- Grid 3 colonnes (défaut) -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold text-neutral-800 mb-3">Grid cols=3 gap="md" (défaut)</h3>
            <LayoutGrid :cols="3" gap="md">
              <div class="bg-primary text-white p-6 rounded-lg text-center">
                <p class="font-semibold">Col 1</p>
              </div>
              <div class="bg-primary text-white p-6 rounded-lg text-center">
                <p class="font-semibold">Col 2</p>
              </div>
              <div class="bg-primary text-white p-6 rounded-lg text-center">
                <p class="font-semibold">Col 3</p>
              </div>
              <div class="bg-primary text-white p-6 rounded-lg text-center">
                <p class="font-semibold">Col 4</p>
              </div>
              <div class="bg-primary text-white p-6 rounded-lg text-center">
                <p class="font-semibold">Col 5</p>
              </div>
              <div class="bg-primary text-white p-6 rounded-lg text-center">
                <p class="font-semibold">Col 6</p>
              </div>
            </LayoutGrid>
          </div>

          <!-- Grid 4 colonnes -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold text-neutral-800 mb-3">Grid cols=4 gap="lg"</h3>
            <LayoutGrid :cols="4" gap="lg">
              <div class="bg-secondary text-white p-6 rounded-lg text-center">
                <p class="font-semibold">Col 1</p>
              </div>
              <div class="bg-secondary text-white p-6 rounded-lg text-center">
                <p class="font-semibold">Col 2</p>
              </div>
              <div class="bg-secondary text-white p-6 rounded-lg text-center">
                <p class="font-semibold">Col 3</p>
              </div>
              <div class="bg-secondary text-white p-6 rounded-lg text-center">
                <p class="font-semibold">Col 4</p>
              </div>
            </LayoutGrid>
          </div>

          <!-- Grid 2 colonnes avec petit gap -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold text-neutral-800 mb-3">Grid cols=2 gap="sm"</h3>
            <LayoutGrid :cols="2" gap="sm">
              <div class="bg-accent text-white p-6 rounded-lg text-center">
                <p class="font-semibold">Col 1</p>
              </div>
              <div class="bg-accent text-white p-6 rounded-lg text-center">
                <p class="font-semibold">Col 2</p>
              </div>
            </LayoutGrid>
          </div>

          <!-- Grid responsive -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold text-neutral-800 mb-3">Grid Responsive (mobile: 1, tablet: 2, desktop: 4)</h3>
            <p class="text-sm text-neutral-600 mb-4">Redimensionne la fenêtre pour voir l'effet responsive</p>
            <LayoutGrid :cols="4" gap="md" :responsive="{ sm: 1, md: 2, lg: 4 }">
              <div class="bg-success text-white p-6 rounded-lg text-center">
                <p class="font-semibold">Item 1</p>
              </div>
              <div class="bg-success text-white p-6 rounded-lg text-center">
                <p class="font-semibold">Item 2</p>
              </div>
              <div class="bg-success text-white p-6 rounded-lg text-center">
                <p class="font-semibold">Item 3</p>
              </div>
              <div class="bg-success text-white p-6 rounded-lg text-center">
                <p class="font-semibold">Item 4</p>
              </div>
            </LayoutGrid>
          </div>
        </LayoutContainer>
      </section>

      <!-- Section 3: Stack -->
      <section class="mb-16">
        <LayoutContainer size="2xl" :padding="true">
          <h2 class="text-2xl font-bold text-neutral-900 mb-6">3. Stack - Empilement Flex</h2>

          <!-- Stack vertical (défaut) -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold text-neutral-800 mb-3">Stack direction="vertical" gap="md" (défaut)</h3>
            <LayoutStack direction="vertical" gap="md">
              <div class="bg-primary text-white p-4 rounded-lg">
                <p class="font-semibold">Item 1 - Vertical</p>
              </div>
              <div class="bg-primary text-white p-4 rounded-lg">
                <p class="font-semibold">Item 2 - Vertical</p>
              </div>
              <div class="bg-primary text-white p-4 rounded-lg">
                <p class="font-semibold">Item 3 - Vertical</p>
              </div>
            </LayoutStack>
          </div>

          <!-- Stack horizontal -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold text-neutral-800 mb-3">Stack direction="horizontal" gap="sm"</h3>
            <LayoutStack direction="horizontal" gap="sm">
              <div class="bg-secondary text-white p-4 rounded-lg flex-1">
                <p class="font-semibold">Item 1</p>
              </div>
              <div class="bg-secondary text-white p-4 rounded-lg flex-1">
                <p class="font-semibold">Item 2</p>
              </div>
              <div class="bg-secondary text-white p-4 rounded-lg flex-1">
                <p class="font-semibold">Item 3</p>
              </div>
            </LayoutStack>
          </div>

          <!-- Stack avec alignment -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold text-neutral-800 mb-3">Stack align="center" justify="center"</h3>
            <div class="bg-neutral-100 rounded-lg p-6">
              <LayoutStack direction="vertical" gap="md" align="center" justify="center">
                <div class="bg-accent text-white p-4 rounded-lg">
                  <p class="font-semibold">Centré horizontalement</p>
                </div>
                <div class="bg-accent text-white p-4 rounded-lg">
                  <p class="font-semibold">Chaque élément est centré</p>
                </div>
              </LayoutStack>
            </div>
          </div>

          <!-- Stack horizontal avec justify between -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold text-neutral-800 mb-3">Stack horizontal justify="between"</h3>
            <LayoutStack direction="horizontal" gap="none" justify="between">
              <div class="bg-success text-white p-4 rounded-lg">
                <p class="font-semibold">Gauche</p>
              </div>
              <div class="bg-success text-white p-4 rounded-lg">
                <p class="font-semibold">Centre</p>
              </div>
              <div class="bg-success text-white p-4 rounded-lg">
                <p class="font-semibold">Droite</p>
              </div>
            </LayoutStack>
          </div>
        </LayoutContainer>
      </section>

      <!-- Section 4: SplitPane -->
      <section class="mb-16">
        <LayoutContainer size="2xl" :padding="true">
          <h2 class="text-2xl font-bold text-neutral-900 mb-6">4. SplitPane - Layout Sidebar</h2>

          <!-- SplitPane 3/9 (défaut) -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold text-neutral-800 mb-3">SplitPane leftWidth=3 gap="md" (3/9 split)</h3>
            <LayoutSplitPane :leftWidth="3" gap="md">
              <template #left>
                <div class="bg-primary text-white p-6 rounded-lg min-h-[300px]">
                  <p class="font-semibold mb-2">Sidebar (3 cols)</p>
                  <p class="text-sm">Navigation, filtres, ou menu latéral</p>
                </div>
              </template>
              <template #right>
                <div class="bg-neutral-100 p-6 rounded-lg min-h-[300px]">
                  <p class="font-semibold text-neutral-900 mb-2">Contenu principal (9 cols)</p>
                  <p class="text-neutral-600">Zone principale de l'application avec le contenu</p>
                </div>
              </template>
            </LayoutSplitPane>
          </div>

          <!-- SplitPane 4/8 -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold text-neutral-800 mb-3">SplitPane leftWidth=4 gap="lg" (4/8 split)</h3>
            <LayoutSplitPane :leftWidth="4" gap="lg">
              <template #left>
                <div class="bg-secondary text-white p-6 rounded-lg min-h-[300px]">
                  <p class="font-semibold mb-2">Sidebar Large (4 cols)</p>
                  <p class="text-sm">Pour des sidebars avec plus de contenu</p>
                </div>
              </template>
              <template #right>
                <div class="bg-neutral-100 p-6 rounded-lg min-h-[300px]">
                  <p class="font-semibold text-neutral-900 mb-2">Contenu principal (8 cols)</p>
                  <p class="text-neutral-600">Zone restante pour le contenu</p>
                </div>
              </template>
            </LayoutSplitPane>
          </div>

          <!-- SplitPane 2/10 -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold text-neutral-800 mb-3">SplitPane leftWidth=2 gap="sm" (2/10 split)</h3>
            <LayoutSplitPane :leftWidth="2" gap="sm">
              <template #left>
                <div class="bg-accent text-white p-6 rounded-lg min-h-[300px]">
                  <p class="font-semibold mb-2">Mini Sidebar (2 cols)</p>
                  <p class="text-sm">Pour icônes ou navigation minimaliste</p>
                </div>
              </template>
              <template #right>
                <div class="bg-neutral-100 p-6 rounded-lg min-h-[300px]">
                  <p class="font-semibold text-neutral-900 mb-2">Contenu principal (10 cols)</p>
                  <p class="text-neutral-600">Maximum d'espace pour le contenu</p>
                </div>
              </template>
            </LayoutSplitPane>
          </div>

          <!-- SplitPane collapsible -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold text-neutral-800 mb-3">SplitPane collapsible=true (sidebar cachée sur mobile)</h3>
            <p class="text-sm text-neutral-600 mb-4">Redimensionne la fenêtre : la sidebar disparaît sur mobile</p>
            <LayoutSplitPane :leftWidth="3" gap="md" :collapsible="true">
              <template #left>
                <div class="bg-success text-white p-6 rounded-lg min-h-[300px]">
                  <p class="font-semibold mb-2">Sidebar Collapsible</p>
                  <p class="text-sm">Visible uniquement sur desktop (lg:)</p>
                </div>
              </template>
              <template #right>
                <div class="bg-neutral-100 p-6 rounded-lg min-h-[300px]">
                  <p class="font-semibold text-neutral-900 mb-2">Contenu principal</p>
                  <p class="text-neutral-600">Prend toute la largeur sur mobile</p>
                </div>
              </template>
            </LayoutSplitPane>
          </div>
        </LayoutContainer>
      </section>

      <!-- Exemple combiné -->
      <section class="mb-16">
        <LayoutContainer size="2xl" :padding="true">
          <h2 class="text-2xl font-bold text-neutral-900 mb-6">5. Exemple Combiné - Dashboard Layout</h2>

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
                <div class="bg-white p-6 rounded-lg shadow">
                  <h3 class="font-semibold text-neutral-900 mb-4">Stats Grid</h3>
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

                <div class="bg-white p-6 rounded-lg shadow">
                  <h3 class="font-semibold text-neutral-900 mb-4">Recent Activity</h3>
                  <LayoutStack direction="vertical" gap="sm">
                    <div class="bg-neutral-50 p-3 rounded">User John signed up</div>
                    <div class="bg-neutral-50 p-3 rounded">New order #1234</div>
                    <div class="bg-neutral-50 p-3 rounded">Payment received</div>
                  </LayoutStack>
                </div>
              </LayoutStack>
            </template>
          </LayoutSplitPane>
        </LayoutContainer>
      </section>
    </div>

    <!-- Footer -->
    <div class="bg-neutral-900 text-white py-8">
      <LayoutContainer size="2xl" :padding="true">
        <p class="text-center text-neutral-400">Phase 9 - Layouts Avancés avec Tailwind Utilities</p>
      </LayoutContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * PAGE DE TEST PHASE 9
 *
 * Tests visuels des 4 layouts avancés :
 * - Container (responsive max-width)
 * - Grid (colonnes configurables)
 * - Stack (flex vertical/horizontal)
 * - SplitPane (sidebar + main)
 *
 * Avec exemple combiné en fin de page
 */
</script>
