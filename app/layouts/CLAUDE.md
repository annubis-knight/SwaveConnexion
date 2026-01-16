# Layouts Nuxt - Documentation pour Claude

## Contexte

Les **layouts** Nuxt sont des templates de pages réutilisables qui structurent l'application.

## Règles strictes

1. **Tailwind utilities** pour structure globale (flex, grid, spacing)
2. **Import des composants layout** : `<LayoutHeader />`, `<LayoutFooter />`
3. **Slot `<NuxtPage />`** pour injecter le contenu des pages
4. **Simple et minimal** - pas de sur-ingénierie

## Layouts disponibles

- `default.vue` : Layout standard avec Header + Footer
- `blank.vue` : Layout vide pour pages spéciales (login, 404, etc.)

## Utilisation dans les pages

Par défaut, toutes les pages utilisent `default.vue`. Pour utiliser un autre layout:

```vue
<script setup>
definePageMeta({
  layout: 'blank'
})
</script>
```

## Architecture

```
app/
├── layouts/
│   ├── default.vue    # Header + Footer + <NuxtPage />
│   └── blank.vue      # Juste <NuxtPage />
└── pages/
    └── index.vue      # Utilise default.vue automatiquement
```

## Composants layout disponibles

Ces composants sont créés dans `app/components/layout/` et auto-importés par Nuxt:

- `<LayoutHeader />` - Navigation sticky avec menu responsive
- `<LayoutFooter />` - Pied de page avec grid 3 colonnes
- `<LayoutSidebar />` - Barre latérale collapsible (optionnel)
