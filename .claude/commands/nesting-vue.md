# Commande : Appliquer le CSS Nesting à un composant Vue

Applique une couche de CSS nesting natif au bloc `<style scoped>` du composant Vue spécifié.

## Fichier cible

$ARGUMENTS

## Règles de transformation

### 1. Structure générale

Transformer le CSS plat en CSS nesté en regroupant les éléments BEM sous leur bloc parent.

### 2. Syntaxe à utiliser

**CSS Nesting natif** (pas SASS) :
- Les media queries peuvent être nestées directement dans leur sélecteur
- Les sélecteurs enfants doivent être écrits EN ENTIER (pas de concaténation `&__`)
- Le `&` seul est valide pour les pseudo-classes (`:hover`, `:focus`, etc.)

### 3. Ce qui fonctionne

```css
/* Media queries nestées */
.block {
  height: 90vh;

  @media (min-width: 1024px) {
    height: 100vh;
  }
}

/* Sélecteurs enfants complets nestés */
.block {
  .block__element {
    color: red;
  }
}

/* Pseudo-classes avec & */
.block {
  &:hover {
    color: blue;
  }
}
```

### 4. Ce qui NE fonctionne PAS

```css
/* INTERDIT : concaténation & + texte (syntaxe SASS uniquement) */
.block {
  &__element {  /* ERREUR */
    color: red;
  }

  &--modifier {  /* ERREUR */
    color: blue;
  }
}
```

## Processus

1. Lire le fichier Vue spécifié
2. Identifier le bloc `<style scoped>`
3. Regrouper les éléments BEM (`__element`) sous leur bloc parent
4. Nester les media queries dans chaque sélecteur concerné
5. Conserver les commentaires existants
6. Mettre à jour le commentaire d'en-tête pour mentionner "CSS Nesting"

## Exemple de transformation

### Avant (CSS plat)

```css
.card {
  padding: 1rem;
}

.card__header {
  font-weight: bold;
}

.card__body {
  color: gray;
}

@media (min-width: 1024px) {
  .card {
    padding: 2rem;
  }

  .card__header {
    font-size: 1.5rem;
  }
}
```

### Après (CSS nesté)

```css
.card {
  padding: 1rem;

  @media (min-width: 1024px) {
    padding: 2rem;
  }

  .card__header {
    font-weight: bold;

    @media (min-width: 1024px) {
      font-size: 1.5rem;
    }
  }

  .card__body {
    color: gray;
  }
}
```
