<template>
  <!--
    Layout Default - Template standard avec Header et Footer

    Description : Layout principal utilisé par toutes les pages

    Slots :
      - NuxtPage : Contenu de la page active

    @dev Tailwind utilities pour structure flex
    @dev min-h-screen pour footer sticky en bas
    @dev flex-1 sur main pousse le footer vers le bas
  -->
  <div class="min-h-screen flex flex-col">
    <!-- Header sticky -->
    <LayoutHeader />

    <!-- Contenu principal -->
    <main class="flex-1">
      <NuxtPage />
    </main>

    <!-- Footer -->
    <LayoutFooter />
  </div>
</template>

<script setup lang="ts">
/**
 * DEFAULT LAYOUT
 *
 * @dev Layout standard pour la majorité des pages
 * @dev Header sticky en haut, footer collé en bas
 * @dev Utilise LayoutHeader et LayoutFooter (auto-import Nuxt)
 */
</script>
