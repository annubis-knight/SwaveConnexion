<template>
  <section class="offer-list py-16 lg:py-24" data-theme="light">
    <LayoutContainerMax>
      <div class="offer-list__head">
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

      <ul class="offer-list__items">
        <li v-for="item in items" :key="item" class="offer-list__item">
          <Text as="span" leading="relaxed">{{ item }}</Text>
        </li>
      </ul>

      <Text
        v-if="footnote"
        weight="light"
        leading="relaxed"
        max-width="lg"
        class="offer-list__footnote"
      >
        {{ footnote }}
      </Text>
    </LayoutContainerMax>
  </section>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────┐
  │                      PAGE OFFER LIST                         │
  │  ┌───────────────────────────────────────────────────────┐  │
  │  │  section.offer-list                                   │  │
  │  │    └─ LayoutContainerMax                              │  │
  │  │         ├─ .offer-list__head                          │  │
  │  │         │    ├─ Text (tag)                            │  │
  │  │         │    ├─ Heading (title)                       │  │
  │  │         │    └─ Text (description)                    │  │
  │  │         ├─ ul.offer-list__items                       │  │
  │  │         │    └─ li × N (2 colonnes en desktop)        │  │
  │  │         └─ Text (footnote)                            │  │
  │  └───────────────────────────────────────────────────────┘  │
  │                                                             │
  │  Props:                                                     │
  │    • title: string (requis) - Titre de la section           │
  │    • items: string[] (requis) - Points de la liste          │
  │    • tag?: string - Petit label au-dessus du titre          │
  │    • description?: string - Texte d'introduction            │
  │    • footnote?: string - Phrase de conclusion sous la liste │
  │                                                             │
  │  Events: Aucun (section informative)                        │
  │  Slots: Aucun (données via props)                           │
  └─────────────────────────────────────────────────────────────┘

  Liste de ce que couvre une offre : concret, verifiable, sans chiffre
  invente. Pensee pour repondre a la question "qu'est-ce que j'achete ?".
*/

interface Props {
  title: string;
  items: string[];
  tag?: string;
  description?: string;
  footnote?: string;
}

withDefaults(defineProps<Props>(), {
  tag: '',
  description: '',
  footnote: '',
});
</script>

<style scoped>
/**
 * PAGE OFFER LIST - BEM strict
 * Section claire listant les points couverts par une offre
 */

/*
  z-index : passe devant le watermark fixe de PageBenefitsAlternate, present
  sur les memes pages. Sans cela le logo transparait par-dessus la liste.
*/
.offer-list {
  position: relative;
  z-index: 1;
  background-color: var(--bg-base);
}

.offer-list__head {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Liste sur deux colonnes des qu'il y a la place */
.offer-list__items {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem 2.5rem;
  margin-top: 2.5rem;
  padding: 0;
  list-style: none;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.offer-list__item {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--border-base);
}

/* Puce : petit trait dans la couleur de la page */
.offer-list__item::before {
  content: '';
  flex-shrink: 0;
  width: 1rem;
  height: 2px;
  background-color: var(--primary);
}

.offer-list__footnote {
  margin-top: 2.5rem;
}
</style>
