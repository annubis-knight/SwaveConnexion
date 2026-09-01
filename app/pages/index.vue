<template>
  <div>
    <SectionsLandingHero />
    <SectionsLandingFeature id="cours" />
    <!-- Section masquée temporairement (déploiement simplifié) : <SectionsLandingAgenda id="agenda" /> -->
    <SectionsLandingEvents id="events" />

    <SectionsSectionCTA id="contact" @submit="handleNewsletterSubmit" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
});

useSeo({
  title: 'École de danse Bachata à Montréal',
  fullTitle: 'Swave Connection | École de danse Bachata à Montréal',
  description: 'École de bachata à Montréal. Cours collectifs, privés, lady styling, sensual et team chorégraphie. Rejoignez Swave Connection.',
  path: '/',
  jsonLd: seoSchemaLocalBusiness(),
});

const handleNewsletterSubmit = (payload: { email: string }) => {
  console.log('Newsletter subscription:', payload.email);
};
</script>
