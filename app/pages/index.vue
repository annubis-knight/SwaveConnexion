<template>
  <div>
    <SectionsLandingHero />
    <SectionsLandingFeature />
    <SectionsLandingAgenda />
    <SectionsLandingEvents />

    <SectionsSectionCTA @submit="handleNewsletterSubmit" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
});

useHead({
  title: 'Swave Connexion - Make It Smooth',
  meta: [
    { name: 'description', content: 'Swave Connexion - Réservez votre cours et apprenez à danser.' }
  ]
});

const handleNewsletterSubmit = (payload: { email: string }) => {
  console.log('Newsletter subscription:', payload.email);
};
</script>
