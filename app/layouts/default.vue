<template>
  <!--
    Layout Default - Template standard avec Navbar et Footer

    Description : Layout principal utilisé par toutes les pages
    State Owner : Gère le thème (dark mode + theme custom)

    Slots :
      - NuxtPage : Contenu de la page active

    @dev Tailwind utilities pour structure flex
    @dev min-h-screen pour footer sticky en bas
    @dev flex-1 sur main pousse le footer vers le bas
  -->
  <div class="min-h-screen flex flex-col">
    <!-- Navbar sticky -->
    <SectionsNavbar @cta-click="handleCtaClick" />

    <!-- Contenu principal -->
    <main class="flex-1">
      <NuxtPage />
    </main>

    <!-- Footer -->
    <SectionsFooter />
  </div>
</template>

<script setup lang="ts">
/**
 * DEFAULT LAYOUT
 *
 * @dev Layout standard pour la majorité des pages
 * @dev Navbar sticky en haut, footer collé en bas
 * @dev State Owner pour thème
 */

const router = useRouter();

// Handler CTA click - navigation vers réservation
const handleCtaClick = () => {
  router.push('#reservation');
};
</script>
