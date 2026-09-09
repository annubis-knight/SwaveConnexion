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
  title: 'École de Bachata Sensual à Montréal',
  fullTitle: 'Swave Connection | École de Bachata Sensual à Montréal',
  description: 'École de bachata sensual à Montréal : cours collectifs, privés, lady styling et team chorégraphie. Apprends, progresse et trouve ta connexion.',
  path: '/',
  jsonLd: seoSchemaLocalBusiness(),
});

const handleNewsletterSubmit = (payload: { email: string }) => {
  console.log('Newsletter subscription:', payload.email);
};
</script>
