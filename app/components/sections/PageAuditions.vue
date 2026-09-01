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

      <div v-if="location" class="auditions__location">
        <Text
          as="span"
          size="sm"
          weight="semibold"
          transform="uppercase"
          tracking="wide"
          color="primary"
        >
          Lieu
        </Text>
        <Text as="p" weight="light" leading="relaxed">{{ location }}</Text>
      </div>

      <ul v-if="notes.length" class="auditions__notes">
        <li v-for="note in notes" :key="note" class="auditions__note">
          <Text as="span" size="sm" weight="light" leading="relaxed">
            {{ note }}
          </Text>
        </li>
      </ul>
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
  │  │         ├─ .auditions__location (lieu)                │  │
  │  │         └─ ul.auditions__notes (bon à savoir)         │  │
  │  └───────────────────────────────────────────────────────┘  │
  │                                                             │
  │  Props:                                                     │
  │    • title: string (requis) - Titre de la section           │
  │    • sessions: AuditionSession[] (requis) - Dates ouvertes  │
  │    • description?: string - Texte sous le titre             │
  │    • tag?: string - Petit label au-dessus du titre          │
  │    • location?: string - Adresse du lieu des auditions      │
  │    • notes?: string[] - Infos pratiques (bon à savoir)      │
  │                                                             │
  │  Events: Aucun (section purement informative)               │
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
  description?: string;
  tag?: string;
  location?: string;
  notes?: string[];
}

withDefaults(defineProps<Props>(), {
  description: '',
  tag: '',
  location: '',
  notes: () => [],
});
</script>

<style scoped>
/**
 * PAGE AUDITIONS - BEM strict
 * Section claire listant les dates d'audition ouvertes
 */

/*
  Volontairement NON positionnée : son fond est donc peint avant le watermark
  fixe de PageBenefitsAlternate, qui reste visible en filigrane par-dessus.
  Seules les cartes remontent au-dessus du logo (voir plus bas).
*/
.auditions {
  background-color: var(--bg-subtle);
  /* Cible d'ancre (#auditions) : compense la navbar fixe de 80px, sinon le
     haut de la section arrive dessous */
  scroll-margin-top: 80px;
}

.auditions__head {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/*
  Grid plutôt que flex : CardEvent impose width:100% à ses instances, donc
  en flex-row chaque carte prenait toute la ligne et repassait dessous.
  La grid contraint la colonne, la carte remplit sa cellule.
*/
.auditions__list {
  display: grid;
  grid-template-columns: 1fr;
  align-items: start;
  gap: 1.5rem;
  margin-top: 2.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2rem;
  }
}

/* CardEvent est translucide par défaut (blanc à 90 %) : sur le fond clair
   de cette section, la carte manquait de contraste. */
.auditions__list :deep(.card-event) {
  /* z-index 1 : seul élément de la section à passer devant le watermark
     (z-index 0), pour que les dates restent parfaitement lisibles */
  position: relative;
  z-index: 1;
  background-color: var(--bg-elevated);
  border: 1px solid var(--border-base);
  border-radius: 12px;
  overflow: hidden;
}

.auditions__location {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 2.5rem;
}

.auditions__notes {
  margin-top: 1.5rem;
  padding-left: 1.25rem;
  list-style: disc;
}

.auditions__note {
  margin-bottom: 0.5rem;
}
</style>
