COMPOSANTS UI - Guide développeur
==================================

Composants de base réutilisables du design system.

PRINCIPES :
-----------
- CSS natif avec variables (voir assets/css/)
- Nommage BEM strict
- Props TypeScript
- Accessibilité (ARIA, focus, keyboard)
- Simple et minimal

UTILISATION :
-------------
<Button variant="primary" size="md">Texte</Button>
<Card>Contenu</Card>
<Input label="Email" type="email" />

MODIFICATION :
--------------
Modifier assets/css/_variables.css pour les couleurs/espacements
Ne PAS modifier tailwind.config.js
