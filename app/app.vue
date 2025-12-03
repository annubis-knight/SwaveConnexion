<template>
  <!--
    App.vue - Point d'entrée Nuxt

    Description : Root component qui active le système de layouts et routing

    @dev NuxtLayout charge le layout automatiquement (default.vue par défaut)
    @dev NuxtPage injecte le contenu de la page active (pages/index.vue)
  -->
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
/**
 * APP ROOT
 *
 * @dev Entry point de l'application Nuxt
 * @dev Active le système de layouts (app/layouts/)
 * @dev Active le file-based routing (app/pages/)
 */
</script>
