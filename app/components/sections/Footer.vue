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
              <NuxtLink to="/professeurs" class="footer__link">
                <Text as="span" size="sm" color="white">Nos professeurs</Text>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/denise-rodriguez" class="footer__link">
                <Text as="span" size="sm" color="white">Denise Rodriguez</Text>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/jordan-gallon" class="footer__link">
                <Text as="span" size="sm" color="white">Jordan Gallon</Text>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/#contact" class="footer__link">
                <Text as="span" size="sm" color="white">Contact</Text>
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <!-- Nos cours (4 cols mobile, 4 cols desktop) -->
        <nav class="col-span-4 lg:col-span-4">
          <Text
            as="span"
            size="sm"
            weight="semibold"
            color="primary"
            transform="uppercase"
            tracking="wide"
          >
            Nos cours
          </Text>
          <ul class="footer__nav-list mt-4">
            <li>
              <NuxtLink to="/bachata-debutant" class="footer__link">
                <Text as="span" size="sm" color="white">Bachata débutant</Text>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/bachata-sensual-cours" class="footer__link">
                <Text as="span" size="sm" color="white">Bachata sensual</Text>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/bachata-lady-style" class="footer__link">
                <Text as="span" size="sm" color="white">Lady styling</Text>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/bachata-team" class="footer__link">
                <Text as="span" size="sm" color="white">Team chorégraphie</Text>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/bachata-cours-prives" class="footer__link">
                <Text as="span" size="sm" color="white">Cours privés</Text>
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <!-- Copyright + crédit agence (full width) -->
        <div
          class="col-span-4 md:col-span-8 lg:col-span-12 mt-8 pt-6 border-t border-white/10 flex flex-col items-center gap-1"
        >
          <Text as="p" size="xs" color="white" align="center">
            © {{ currentYear }} Swave Connection. Tous droits réservés.
          </Text>
          <!-- Crédit d'agence (backlink brandé, dofollow) -->
          <a
            href="https://www.propulsitetoulouse.website"
            target="_blank"
            rel="noopener"
            class="footer__credit"
            aria-label="Site réalisé par PropulSite, agence web à Toulouse"
          >
            <Text as="span" size="xs" color="white" align="center">Réalisé par PropulSite</Text>
          </a>
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

/* Crédit d'agence : discret par défaut, plein au survol */
.footer__credit {
  text-decoration: none;
  opacity: 0.6;
  transition: opacity 0.2s ease;
}

.footer__credit:hover,
.footer__credit:focus-visible {
  opacity: 1;
  text-decoration: underline;
}
</style>
