# Layout Components - Architecture Tailwind

## 🎯 Règles strictes

- **Tailwind utilities exclusivement** (flex, grid, spacing, colors)
- **Aucun CSS natif scoped** dans ces composants
- **Nommage sémantique** des composants (Header, Footer, Sidebar)
- **Responsive natif** avec breakpoints Tailwind (sm:, md:, lg:)

## 📦 Composants disponibles

### Header.vue
- Navigation sticky en haut de page
- Logo + liens de navigation
- Responsive avec menu burger mobile

### Footer.vue
- Pied de page avec grid 3 colonnes
- Liens, copyright, réseaux sociaux

### Sidebar.vue
- Barre latérale collapsible
- Navigation secondaire

## 🚫 Interdit

- `<style scoped>` dans layout/
- Classes BEM (.block__element)
- Variables CSS (--variable-name)
