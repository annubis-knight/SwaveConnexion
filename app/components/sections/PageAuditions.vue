<template>
  <section class="auditions py-16 lg:py-24" data-theme="light">
    <LayoutContainerMax>
      <div class="auditions__head">
        <Text
          v-if="tag"
          as="span"
          size="sm"
          weight="semibold"
          transform="uppercase"
          tracking="wide"
          color="primary"
        >
          {{ tag }}
        </Text>

        <Heading :level="2">{{ title }}</Heading>

        <Text v-if="description" weight="light" leading="relaxed" max-width="lg">
          {{ description }}
        </Text>
      </div>

      <div class="auditions__list">
        <CardEvent
          v-for="session in sessions"
          :key="`${session.day}-${session.month}`"
          :day="session.day"
          :month="session.month"
          :title="session.title"
          :subtitle="session.subtitle"
        />
      </div>

      <div class="auditions__cta">
        <ButtonSwave :href="ctaHref" :external="ctaExternal">
          {{ ctaText }}
        </ButtonSwave>
      </div>
    </LayoutContainerMax>
  </section>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────┐
  │                       PAGE AUDITIONS                         │
  │  ┌───────────────────────────────────────────────────────┐  │
  │  │  section.auditions                                    │  │
  │  │    └─ LayoutContainerMax                              │  │
  │  │         ├─ .auditions__head                           │  │
  │  │         │    ├─ Text (tag)                            │  │
  │  │         │    ├─ Heading (title)                       │  │
  │  │         │    └─ Text (description)                    │  │
  │  │         ├─ .auditions__list                           │  │
  │  │         │    └─ CardEvent × N (une par date)          │  │
  │  │         └─ .auditions__cta                            │  │
  │  │              └─ ButtonSwave (lien externe)            │  │
  │  └───────────────────────────────────────────────────────┘  │
  │                                                             │
  │  Props:                                                     │
  │    • title: string (requis) - Titre de la section           │
  │    • sessions: AuditionSession[] (requis) - Dates ouvertes  │
  │    • ctaHref: string (requis) - Lien du bouton              │
  │    • ctaText?: string - Libellé du bouton                   │
  │    • ctaExternal?: boolean - Nouvel onglet (false = mailto) │
  │    • description?: string - Texte sous le titre             │
  │    • tag?: string - Petit label au-dessus du titre          │
  │                                                             │
  │  Events: Aucun (le CTA est un lien, pas un bouton d'action) │
  │  Slots: Aucun (données via props)                           │
  └─────────────────────────────────────────────────────────────┘

  @dev Les dates sont passées déjà formatées (day/month) : le composant
       n'interprète aucune date, il affiche ce qu'on lui donne.
*/

export interface AuditionSession {
  day: string;
  month: string;
  title: string;
  subtitle?: string;
}

interface Props {
  title: string;
  sessions: AuditionSession[];
  ctaHref: string;
  ctaText?: string;
  description?: string;
  tag?: string;
}

withDefaults(defineProps<Props>(), {
  ctaText: 'NOUS CONTACTER',
  description: '',
  tag: '',
});
</script>

<style scoped>
/**
 * PAGE AUDITIONS - BEM strict
 * Section claire listant les dates d'audition ouvertes
 */

.auditions {
  background-color: var(--bg-subtle);
}

.auditions__head {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Les cartes se posent côte à côte dès qu'il y a la place */
.auditions__list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 2rem;
  }
}

.auditions__cta {
  margin-top: 2.5rem;
}
</style>
