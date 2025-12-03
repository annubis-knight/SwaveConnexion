<template>
  <!--
    Composant Footer - Pied de page

    Description : Pied de page avec grid 3 colonnes et copyright

    Props :
      - Aucune

    Slots :
      - company : Colonne entreprise
      - links : Colonne liens
      - social : Colonne réseaux sociaux

    @dev Tailwind utilities uniquement (NO CSS natif scoped)
  -->
  <footer class="bg-gray-900 text-gray-300 py-12 mt-auto">
    <div class="container mx-auto px-6">
      <!-- Grid 3 colonnes -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <!-- Colonne 1 : Entreprise -->
        <div>
          <slot name="company">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-xl">S</span>
              </div>
              <span class="text-xl font-bold text-white">SwaveConnexion</span>
            </div>
            <p class="text-sm text-gray-400 leading-relaxed">
              Design system minimaliste et moderne pour applications web performantes.
            </p>
          </slot>
        </div>

        <!-- Colonne 2 : Liens -->
        <div>
          <slot name="links">
            <h4 class="text-white font-semibold mb-4">Liens rapides</h4>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-400 hover:text-blue-400 transition-colors text-sm">Documentation</a></li>
              <li><a href="#" class="text-gray-400 hover:text-blue-400 transition-colors text-sm">Composants</a></li>
              <li><a href="#" class="text-gray-400 hover:text-blue-400 transition-colors text-sm">GitHub</a></li>
              <li><a href="#" class="text-gray-400 hover:text-blue-400 transition-colors text-sm">Licence</a></li>
            </ul>
          </slot>
        </div>

        <!-- Colonne 3 : Réseaux sociaux -->
        <div>
          <slot name="social">
            <h4 class="text-white font-semibold mb-4">Suivez-nous</h4>
            <div class="flex gap-4">
              <a href="#" class="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                <span class="text-white text-sm font-bold">GH</span>
              </a>
              <a href="#" class="w-10 h-10 bg-gray-800 hover:bg-blue-400 rounded-lg flex items-center justify-center transition-colors">
                <span class="text-white text-sm font-bold">TW</span>
              </a>
              <a href="#" class="w-10 h-10 bg-gray-800 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors">
                <span class="text-white text-sm font-bold">LI</span>
              </a>
            </div>
          </slot>
        </div>
      </div>

      <!-- Copyright -->
      <div class="border-t border-gray-800 pt-8">
        <p class="text-center text-sm text-gray-500">
          © {{ new Date().getFullYear() }} SwaveConnexion. Tous droits réservés.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
/**
 * FOOTER COMPONENT
 *
 * @dev Tailwind utilities UNIQUEMENT (NO CSS natif)
 * @dev Grid responsive (grid-cols-1 md:grid-cols-3)
 */
</script>
