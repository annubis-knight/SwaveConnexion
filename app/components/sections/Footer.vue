<template>
  <footer class="footer py-12 lg:py-16">
    <LayoutContainer size="xl" :padding="true">
      <LayoutGridResponsive>
        <!-- Logo (4 cols mobile, 4 cols desktop) -->
        <div class="col-span-4 lg:col-span-4 flex items-center lg:items-start">
          <div class="footer__logo">
            <slot name="logo">
              <span class="footer__logo-placeholder">LOGO</span>
            </slot>
          </div>
        </div>

        <!-- Navigation (4 cols mobile, 4 cols desktop) -->
        <nav class="col-span-4 lg:col-span-4">
          <Text
            as="span"
            size="sm"
            weight="semibold"
            color="primary"
            transform="uppercase"
            tracking="wide"
          >
            Navigation
          </Text>
          <ul class="footer__nav-list mt-4">
            <li>
              <NuxtLink to="/" class="footer__link">
                <Text as="span" size="sm" color="white">Accueil</Text>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/cours" class="footer__link">
                <Text as="span" size="sm" color="white">Nos cours</Text>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/agenda" class="footer__link">
                <Text as="span" size="sm" color="white">Agenda</Text>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="footer__link">
                <Text as="span" size="sm" color="white">Contact</Text>
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <!-- Legal (4 cols mobile, 4 cols desktop) -->
        <nav class="col-span-4 lg:col-span-4">
          <Text
            as="span"
            size="sm"
            weight="semibold"
            color="primary"
            transform="uppercase"
            tracking="wide"
          >
            Informations légales
          </Text>
          <ul class="footer__nav-list mt-4">
            <li>
              <NuxtLink to="/mentions-legales" class="footer__link">
                <Text as="span" size="sm" color="white">Mentions légales</Text>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/cgu" class="footer__link">
                <Text as="span" size="sm" color="white">CGU</Text>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/confidentialite" class="footer__link">
                <Text as="span" size="sm" color="white">Politique de confidentialité</Text>
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <!-- Copyright (full width) -->
        <div class="col-span-4 md:col-span-8 lg:col-span-12 mt-8 pt-6 border-t border-white/10">
          <Text as="p" size="xs" color="white" align="center">
            © {{ currentYear }} Swave Connection. Tous droits réservés.
          </Text>
        </div>
      </LayoutGridResponsive>
    </LayoutContainer>
  </footer>
</template>

<script setup lang="ts">
/*
  ┌─────────────────────────────────────────────────────────────┐
  │                          FOOTER                             │
  │  ┌───────────────────────────────────────────────────────┐  │
  │  │  footer.footer                                        │  │
  │  │    └─ LayoutContainer                                 │  │
  │  │         └─ LayoutGridResponsive                       │  │
  │  │              ├─ [slot: logo]                          │  │
  │  │              ├─ nav (Navigation)                      │  │
  │  │              │    └─ Text + NuxtLink × 4            │  │
  │  │              ├─ nav (Légal)                           │  │
  │  │              │    └─ Text + NuxtLink × 3            │  │
  │  │              └─ Copyright                             │  │
  │  └───────────────────────────────────────────────────────┘  │
  │                                                             │
  │  Desktop (lg): 3 colonnes côte à côte                       │
  │  ┌────────┬────────────┬──────────────────────┐             │
  │  │  LOGO  │ Navigation │ Informations légales │             │
  │  └────────┴────────────┴──────────────────────┘             │
  │  ──────────────────────────────────────────────             │
  │           © 2025 Swave Connection...                        │
  │                                                             │
  │  Mobile: colonnes empilées                                  │
  │  ┌────────────────────────────────────────────┐             │
  │  │ LOGO │ Navigation │ Légal │ Copyright      │             │
  │  └────────────────────────────────────────────┘             │
  │                                                             │
  │  Props: Aucune                                              │
  │                                                             │
  │  Slots:                                                     │
  │    • logo: Emplacement pour le logo (défaut: placeholder)   │
  │                                                             │
  │  Events: Aucun (wrapper visuel)                             │
  └─────────────────────────────────────────────────────────────┘
*/

// Année courante pour le copyright
const currentYear = new Date().getFullYear();
</script>

<style scoped>
/* BEM : Block */
.footer {
  background-color: var(--bg-invert);
}

/* BEM : Element */
.footer__logo {
  display: flex;
  align-items: center;
}

.footer__logo-placeholder {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--text-inverse);
}

.footer__nav-list {
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer__nav-list li {
  margin-bottom: 0.5rem;
}

.footer__link {
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.footer__link:hover {
  opacity: 0.8;
}
</style>
