# Sections Components - Blocs réutilisables

## 🎯 Règles strictes

- **Tailwind utilities** pour les layouts
- **Slots** pour le contenu flexible
- **Variants** via props (primary, gradient, etc.)
- **Responsive natif** Tailwind

## 📦 Composants disponibles

### Hero.vue
- Section d'en-tête impactante
- Variants : default, primary, gradient, dark
- Slot par défaut pour contenu personnalisé
- Centrage optionnel

## 🎨 Utilisation

```vue
<SectionsHero variant="gradient" :centered="true">
  <h1>Titre</h1>
  <p>Description</p>
  <Button>CTA</Button>
</SectionsHero>
```
