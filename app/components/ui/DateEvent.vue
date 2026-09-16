<template>
  <div class="date-event" :class="{ 'date-event--multi': endDay }">
    <!-- Plusieurs jours : deux blocs jour + mois, reliés par – ou & -->
    <div v-if="endDay" class="date-event__inner date-event__inner--split">
      <div class="date-event__col">
        <Text as="span" size="5xl" weight="black" leading="xtratight" color="dark">{{ day }}</Text>
        <Text as="span" size="2xl" weight="black" transform="uppercase" leading="tight" color="dark">{{ month }}</Text>
      </div>
      <Text as="span" size="2xl" weight="black" leading="tight" color="dark">
        {{ separator === 'and' ? '&' : '–' }}
      </Text>
      <div class="date-event__col">
        <Text as="span" size="5xl" weight="black" leading="xtratight" color="dark">{{ endDay }}</Text>
        <Text as="span" size="2xl" weight="black" transform="uppercase" leading="tight" color="dark">{{ endMonth || month }}</Text>
      </div>
    </div>

    <!-- Date simple -->
    <div v-else class="date-event__inner">
      <Text as="span" size="5xl" weight="black" leading="xtratight" color="dark">{{ day }}</Text>
      <Text as="span" size="2xl" weight="black" transform="uppercase" leading="tight" color="dark">{{ month }}</Text>
    </div>
  </div>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────┐
  │                       DATE EVENT                            │
  │  ┌───────────────────────────────────────────────────────┐  │
  │  │  .date-event (writing-mode trick pour carré 1:1)      │  │
  │  │  ┌─────────────────────────────────────────────────┐  │  │
  │  │  │  Date simple        │  Plusieurs jours          │  │  │
  │  │  │      17             │   11      15              │  │  │
  │  │  │      NOV            │  FÉVR  –  FÉVR            │  │  │
  │  │  │                     │   01      08              │  │  │
  │  │  │                     │  SEPT  &  SEPT            │  │  │
  │  │  └─────────────────────────────────────────────────┘  │  │
  │  │  ↑ Text 5xl black + Text 2xl uppercase               │  │
  │  └───────────────────────────────────────────────────────┘  │
  │                                                             │
  │  Technique CSS "content-first" :                            │
  │    1. writing-mode: vertical-lr inverse les axes            │
  │    2. aspect-ratio: 1/1 utilise la "largeur" (= hauteur)    │
  │    3. Le wrapper interne remet le texte à l'horizontal      │
  │    → Résultat : carré dont la taille = hauteur du texte     │
  │    Sur plusieurs jours (.date-event--multi), le carré est   │
  │    désactivé : le bloc prend la taille de son contenu.      │
  │                                                             │
  │  Props:                                                     │
  │    • day: string - Jour (ex: "17")                          │
  │    • month: string - Mois abrégé (ex: "NOV")                │
  │    • endDay?: string - Second jour : active l'affichage     │
  │      en deux blocs                                          │
  │    • endMonth?: string - Mois du second jour (défaut: month)│
  │    • separator?: 'range' | 'and' (défaut: range)            │
  │      range = plage continue (–), and = dates distinctes (&) │
  │                                                             │
  │  Slots: Aucun                                               │
  │                                                             │
  │  Events: Aucun (composant de présentation pure)             │
  └─────────────────────────────────────────────────────────────┘

  @dev Extrait de CardEvent.vue pour réutilisation
  @dev Utilise le composant Text avec ses props typographiques
  @dev CSS scoped = layout uniquement (pas de styles typo)
  @dev Jamais de barre oblique entre deux jours : "1/8" se lit
       "1er août" en notation française.
*/

interface Props {
  day: string;
  month: string;
  endDay?: string;
  endMonth?: string;
  separator?: 'range' | 'and';
}

withDefaults(defineProps<Props>(), {
  endDay: '',
  endMonth: '',
  separator: 'range',
});
</script>

<style scoped>
/**
 * DATE EVENT STYLES - BEM strict
 * Bloc date carré 1:1 basé sur la hauteur du contenu
 *
 * Technique content-first (hauteur comme référence) :
 * - writing-mode: vertical-lr inverse les axes
 * - aspect-ratio: 1/1 utilise alors la hauteur intrinsèque comme référence
 * - Le wrapper interne remet le texte à l'horizontal
 */

/* Block : .date-event - Carré 1:1 basé sur la HAUTEUR du contenu */
/*
  Aucun padding : les chiffres s'alignent sur le bord, comme l'etiquette et le
  titre voisins. L'espace avec le titre est un gap du parent (InfoEvent).
*/
.date-event {
  writing-mode: vertical-lr;
  aspect-ratio: 1 / 1;
  display: flex;
  /* En vertical-lr, l'axe transversal est horizontal : flex-start = a gauche */
  align-items: flex-start;
  justify-content: center;
}

/*
  Modifier : plusieurs jours. Le contenu est plus large que haut : avec le
  carré 1:1, le navigateur reportait cette largeur sur la hauteur et le bloc
  devenait un grand carré vide au-dessus et en dessous des chiffres. Ici le
  bloc prend simplement la taille de son contenu.
*/
.date-event--multi {
  writing-mode: horizontal-tb;
  aspect-ratio: auto;
}

/* Element : .date-event__inner - Remet le texte à l'horizontal */
/*
  Jour et mois cales a gauche et non centres : centre, un jour plus etroit
  que son mois ("11" au-dessus de "FEVR") rentrait jusqu'a 16px vers
  l'interieur et ne s'alignait plus sur l'etiquette et le titre.
*/
.date-event__inner {
  writing-mode: horizontal-tb;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 16px;

  span {
    text-box: trim-both cap alphabetic;
  }
}

/* Plusieurs jours : deux colonnes jour + mois, séparateur centré */
.date-event__inner--split {
  flex-direction: row;
  /* En ligne, l'axe transversal redevient vertical : le separateur reste
     centre entre les deux colonnes */
  align-items: center;
  gap: 12px;
}

.date-event__col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}
</style>
