<template>
  <section class="teachers-immersive" data-theme="dark">
    <!-- Header optionnel (au-dessus du split) -->
    <div v-if="title || subtitle" class="teachers-immersive__header">
      <LayoutContainerMax>
        <Heading v-if="title" :level="2" align="center">{{ title }}</Heading>
        <Text
          v-if="subtitle"
          align="center"
          weight="light"
          max-width="md"
          leading="relaxed"
        >
          {{ subtitle }}
        </Text>
      </LayoutContainerMax>
    </div>

    <!-- Split immersif plein écran -->
    <div class="teachers-immersive__split">
      <component
        :is="teacher.to ? NuxtLink : 'div'"
        v-for="teacher in teachers"
        :key="teacher.name"
        :to="teacher.to || undefined"
        class="panel"
        :class="{ 'panel--link': teacher.to, 'panel--soon': !teacher.to }"
      >
        <!-- Photo plein background -->
        <div class="panel__media">
          <NuxtImg
            v-if="teacher.image"
            :src="teacher.image"
            :alt="`${teacher.name} — professeur de bachata à ${teacher.city}`"
            class="panel__img"
            sizes="100vw md:50vw"
            format="webp"
            loading="lazy"
          />
        </div>

        <!-- Voile dégradé pour lisibilité du texte -->
        <div class="panel__scrim" aria-hidden="true"></div>

        <!-- Contenu superposé -->
        <div class="panel__content">
          <Text
            as="span"
            size="sm"
            weight="semibold"
            color="white"
            transform="uppercase"
            tracking="wide"
            class="panel__city"
          >
            {{ teacher.city }}
          </Text>

          <Heading :level="2" color="white">{{ teacher.name }}</Heading>

          <Text
            as="span"
            size="sm"
            weight="medium"
            color="white"
            transform="uppercase"
            tracking="wide"
          >
            {{ teacher.role }}
          </Text>

          <Text
            color="white"
            weight="light"
            leading="relaxed"
            max-width="sm"
            class="panel__desc"
          >
            {{ teacher.description }}
          </Text>

          <!-- Bouton d'accès (pastille visuelle : le panneau entier est le lien) -->
          <span class="panel__cta" :class="{ 'panel__cta--soon': !teacher.to }">
            <span class="panel__cta-label">
              {{ teacher.to ? 'Découvrir' : 'Bientôt' }}
            </span>
            <span v-if="teacher.to" class="panel__cta-arrow" aria-hidden="true"
              >→</span
            >
          </span>
        </div>
      </component>
    </div>
  </section>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────┐
  │                    TEACHERS IMMERSIVE                        │
  │  ┌───────────────────────────────────────────────────────┐  │
  │  │  section.teachers-immersive                           │  │
  │  │    ├─ .teachers-immersive__header (optionnel)         │  │
  │  │    │    └─ LayoutContainerMax (Heading + Text)        │  │
  │  │    └─ .teachers-immersive__split (2 panneaux)         │  │
  │  │         └─ .panel × N (NuxtLink | div)                │  │
  │  │              ├─ .panel__media (img plein bg)          │  │
  │  │              ├─ .panel__scrim (voile dégradé)         │  │
  │  │              └─ .panel__content                       │  │
  │  │                   ├─ Text (ville)                     │  │
  │  │                   ├─ Heading (nom)                    │  │
  │  │                   ├─ Text (rôle)                      │  │
  │  │                   ├─ Text (description)               │  │
  │  │                   └─ .panel__cta (pastille d'accès)   │  │
  │  └───────────────────────────────────────────────────────┘  │
  │                                                             │
  │  Props:                                                     │
  │    • title?: string - Titre au-dessus du split             │
  │    • subtitle?: string - Sous-titre                         │
  │    • teachers: Teacher[] - Liste des professeurs           │
  │        { name, city, role, description, image?, to? }       │
  │        Panneau = NuxtLink si `to`, sinon <div> (placeholder)│
  │                                                             │
  │  Events: Aucun (navigation via NuxtLink, données via props) │
  │  Slots: Aucun                                               │
  │                                                             │
  │  Variante immersive de Teachers :                           │
  │    • Photo en background plein écran, split 2 colonnes      │
  │    • Textes superposés + pastille d'accès en bas            │
  │    • Hover-expand desktop : le panneau survolé s'agrandit,  │
  │      l'autre se rétracte et s'assombrit                     │
  │    • Mobile : empilé verticalement, sans hover-expand       │
  └─────────────────────────────────────────────────────────────┘

  @dev Full-bleed : la section occupe toute la largeur du viewport
  @dev data-theme="dark" → contexte sombre (textes en color="white")
*/

interface Teacher {
  name: string;
  city: string;
  role: string;
  description: string;
  image?: string;
  to?: string;
}

interface Props {
  title?: string;
  subtitle?: string;
  teachers: Teacher[];
}

withDefaults(defineProps<Props>(), {
  title: '',
  subtitle: '',
});

/* Résolution de NuxtLink pour le panneau polymorphe (<NuxtLink> | <div>) */
const NuxtLink = resolveComponent('NuxtLink');
</script>

<style scoped>
/**
 * TEACHERS IMMERSIVE - BEM strict
 * Split immersif plein écran, photo en background + textes superposés
 */

.teachers-immersive {
  position: relative;
  background-color: var(--bg-invert);
}

/* Header optionnel au-dessus du split */
.teachers-immersive__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding-top: 4rem;
  padding-bottom: 2.5rem;
  background-color: var(--bg-base);
}

/* Split : 2 panneaux côte à côte (desktop) / empilés (mobile) */
.teachers-immersive__split {
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
    height: clamp(560px, 90vh, 880px);
  }
}

/* ============================================
   PANNEAU
   ============================================ */
.panel {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  min-height: 60vh;
  padding: 2rem 1.75rem 2.5rem;
  text-decoration: none;
  color: inherit;

  @media (min-width: 768px) {
    flex: 1 1 0;
    min-height: 0;
    padding: 3rem 3rem 3.5rem;
    /* flex-grow animé pour l'effet hover-expand */
    transition: flex-grow 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
}

/* Média (photo) en background plein panneau */
.panel__media {
  position: absolute;
  inset: 0;
  background-color: var(--secondary-dark);
}

.panel__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 25%;
  transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Voile dégradé : sombre en bas → transparent en haut (lisibilité) */
.panel__scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.85) 0%,
    rgba(0, 0, 0, 0.55) 35%,
    rgba(0, 0, 0, 0.15) 65%,
    rgba(0, 0, 0, 0.05) 100%
  );
  transition: background 0.5s ease;
}

/* Contenu superposé (au-dessus média + voile) */
.panel__content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.panel__city {
  /* Petit accent coloré devant la ville */
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.panel__city::before {
  content: '';
  width: 1.5rem;
  height: 2px;
  background-color: var(--primary-light);
}

.panel__desc {
  margin-top: 0.5rem;
}

/* ============================================
   PASTILLE D'ACCÈS (bouton visuel dans le lien)
   ============================================ */
.panel__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  align-self: flex-start;
  margin-top: 1.5rem;
  padding: 0.7rem 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 999px;
  background-color: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(4px);
  color: var(--text-inverse);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  transition: background-color 0.3s ease, border-color 0.3s ease,
    transform 0.3s ease;
}

.panel__cta-arrow {
  transition: transform 0.3s ease;
}

.panel__cta--soon {
  border-color: rgba(255, 255, 255, 0.35);
  background-color: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.7);
}

/* ============================================
   INTERACTIONS (desktop uniquement)
   ============================================ */
@media (min-width: 768px) {
  /* Hover-expand : le panneau survolé s'agrandit */
  .teachers-immersive__split:hover .panel--link {
    flex-grow: 0.7;
  }

  .teachers-immersive__split:hover .panel--link:hover {
    flex-grow: 1.6;
  }

  /* Les panneaux non survolés s'assombrissent quand un autre est actif */
  .teachers-immersive__split:hover .panel:not(:hover) .panel__scrim {
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.9) 0%,
      rgba(0, 0, 0, 0.75) 50%,
      rgba(0, 0, 0, 0.6) 100%
    );
  }
}

/* Zoom photo + CTA plein au survol du panneau cliquable */
.panel--link:hover .panel__img {
  transform: scale(1.06);
}

.panel--link:hover .panel__cta {
  background-color: var(--primary);
  border-color: var(--primary);
  transform: translateY(-2px);
}

.panel--link:hover .panel__cta-arrow {
  transform: translateX(4px);
}

/* Accessibilité clavier : même mise en avant au focus */
.panel--link:focus-visible {
  outline: 3px solid var(--primary-light);
  outline-offset: -3px;
}

@media (prefers-reduced-motion: reduce) {
  .panel,
  .panel__img,
  .panel__cta,
  .panel__cta-arrow,
  .panel__scrim {
    transition: none;
  }
}
</style>
