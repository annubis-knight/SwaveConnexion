# COPYWRITING.md — Ton de communication Swave Connection

Référence unique pour tout texte visible par un visiteur : titres, descriptions,
boutons, chiffres, meta SEO, alt d'images.

**Règle d'or : on ne parle pas de nous, on parle de ce que la personne va vivre.**

---

## 1. Les 4 règles non négociables

### R1 — Tutoiement partout

Le site tutoie, sans exception. Une même page ne doit jamais mélanger « tu » et « vous ».

| ❌ | ✅ |
|---|---|
| « Apprenez les pas fondamentaux » | « Tu apprends les pas fondamentaux » |
| « Rejoignez notre communauté » | « Rejoins la communauté » |
| « la connexion avec votre partenaire » | « la connexion avec ton partenaire » |

S'applique aussi aux **meta descriptions SEO** (visibles dans Google) et aux textes
par défaut des composants.

### R2 — Zéro auto-congratulation

On ne se décerne pas de médaille. Le mérite se déduit du bénéfice décrit, il ne
s'affirme pas.

Mots bannis : *exceptionnel, légendaire, spectaculaire, incroyable, magique,
révolutionnaire, les meilleurs, le meilleur, unique (au sens « sans équivalent »),
pédagogue né, don rare*.

| ❌ | ✅ |
|---|---|
| « Guidé par les meilleurs de Montréal » | Décrire ce que le prof fait pour l'élève |
| « des danseurs exceptionnels » | « des danseurs » |
| « Leur patience est légendaire » | (supprimer — invérifiable) |
| « une progression spectaculaire » | « une progression significative » |

### R3 — Aucune promesse qu'on ne peut pas tenir

Un chiffre ou une garantie n'a le droit d'exister que si on peut **dire à quelles
conditions il est vrai**, et le prouver.

Formules bannies : *garanti, 100 % de…, X semaines pour maîtriser…, 7j/7*, toute
disponibilité ou tout délai qu'on ne contrôle pas.

Test avant de publier un chiffre — les 3 questions :
1. D'où sort-il ? (source réelle, pas une estimation d'ambiance)
2. À quelles conditions est-il vrai ? (rythme, format de cours, niveau de départ)
3. Ces conditions sont-elles écrites juste à côté ?

Si une réponse manque → **on supprime le chiffre**, on ne l'arrondit pas.

> Précédent : « 4 semaines pour maîtriser les fondamentaux » et « 7j/7 —
> disponibilité flexible » ont été retirés en août 2026 faute de conditions
> vérifiables. Ils pourront revenir si le contexte est précisé (ex. « à raison de
> 2 cours/semaine »).

### R4 — Bénéfice élève > performance école

On tourne chaque phrase du point de vue de la personne qui lit.

| ❌ (nous) | ✅ (elle) |
|---|---|
| « Nos instructeurs ont dansé sur les plus grandes scènes » | « Tu repars avec la correction qui débloque ton pas » |
| « L'excellence sur mesure » | « Un cours construit autour de tes objectifs » |

---

## 2. Le ton en une ligne

**Chaleureux, direct, concret — jamais publicitaire.**

- Phrases courtes. Vocabulaire du quotidien, pas de jargon de danse non expliqué.
- On peut être enthousiaste, jamais grandiloquent : l'enthousiasme vient du détail
  vrai (« pas de regard de travers »), pas de l'adjectif (« ambiance incroyable »).
- Humour léger accepté, ironie et second degré non (mal lus à l'écrit).
- Ponctuation : pas de point d'exclamation en cascade, jamais de MAJUSCULES pour
  insister (réservées aux titres de section, qui sont stylés en CSS).

---

## 3. Où vit le contenu dans le code

Le texte n'est presque jamais écrit en dur dans le HTML : il est passé aux
composants, ce qui permet de le modifier sans toucher à la structure.

| Type | Emplacement | Comment modifier |
|---|---|---|
| Blocs « bénéfices » | tableau `benefitsData` en bas des fichiers `app/pages/*.vue` | éditer les chaînes entre guillemets |
| Titres de section | props passées au composant dans le `<template>` (ex. `title-line1="…"`) | éditer la valeur de la prop |
| Meta SEO (Google) | appel `useSeo({ title, description })` dans chaque page | éditer `description` |
| Textes par défaut | valeurs en dur dans `app/components/sections/*.vue` | à corriger aussi, même si la section est commentée |

**Supprimer un chiffre proprement :** dans `PageBenefitsAlternate.vue`, la stat est
affichée derrière un `v-if="benefit.stat"`. Il suffit donc de retirer les lignes
`stat` et `statLabel` de l'objet — rien ne casse, le bloc chiffré disparaît.
Effet de bord à vérifier à l'œil : un bloc sans chiffre au milieu de blocs qui en
ont un peut déséquilibrer la mise en page.

---

## 4. Checklist avant de publier un texte

- [ ] Tutoiement, cohérent sur toute la page (meta SEO comprise)
- [ ] Aucun mot de la liste bannie (R2)
- [ ] Chaque chiffre passe le test des 3 questions (R3)
- [ ] La phrase parle du lecteur, pas de nous (R4)
- [ ] Les mots-clés SEO de la page sont préservés (« bachata », « Montréal », nom du cours) — vérifier avant de réécrire un titre
- [ ] Textes par défaut du composant corrigés aussi, pas seulement la page

---

## 5. Faits de référence (source unique de vérité)

Ces chiffres et éléments de parcours apparaissent sur **plusieurs pages à la fois**.
Toute modification doit être répercutée partout, sinon le site se contredit.
Mis à jour le 2026-08-29 (source : client).

| Fait | Valeur | Où il apparaît |
|---|---|---|
| Expérience de Jordan | 12 ans (danse + enseignement) | page Jordan (bio, stat, meta SEO) |
| Formation de Jordan | Toulouse | page Jordan (bio, meta SEO) |
| Ses propres cours | 5 ans à Montauban | page Jordan (bio) |
| Rencontre Denise / Jordan | par la danse, il y a une dizaine d'années (en France) | pages Jordan **et** Denise |
| Arrivée au Québec | il y a 4 ans, tous les deux | pages Jordan **et** Denise (bio + stat) |
| Expérience de Denise | 12 ans à Toulouse (danseuse puis professeure) | page Denise |
| Formation de Denise | Bachata Sensual auprès de Korke & Judith | page Denise |
| Villes | Denise → Montréal · Jordan → Sherbrooke **et** Montréal | pages profs, `useSeo.ts` (areaServed) |

⚠️ Ces chiffres sont **relatifs à aujourd'hui** (« il y a 4 ans »). Ils vieillissent
tout seuls : à revoir chaque année, ou à remplacer par une année fixe (« depuis 2022 »).

---

## 6. Backlog — incohérences repérées, non encore traitées

État au 2026-08-29. À traiter par lots, aucune n'est bloquante.

**Vouvoiement à convertir (R1)**
- `app/pages/bachata-debutant.vue` : lignes 5, 74, 91, 132, 230
- `app/pages/bachata-sensual-cours.vue` : ligne 88
- `app/pages/bachata-cours-prives.vue` : ligne 88
- `app/pages/index.vue` : ligne 20
- `app/components/sections/PageVideoPreview.vue` : ligne 172
- `app/components/sections/PageVideoPreviewImmersive.vue` : ligne 167

**Auto-congratulation / promesses (R2, R3)**
- `app/components/sections/LandingFeature.vue:8` — « LE MEILLEUR APPRENTISSAGE »
- `app/components/sections/PageBenefitsTimeline.vue:172` — « Progresse avec les meilleurs »
- `app/components/sections/PageBenefitsTimeline.vue:155` — « Musique entraînante garantie »
- `app/components/sections/PageBenefitsSticky.vue:147` — « avec le sourire — garanti »
- `app/components/sections/PageBenefitsImmersive.vue:183` — « 100% de sourires garantis »
- `app/components/sections/PageBenefitsImmersive.vue:204` — « patience légendaire », « don rare », « plus grandes scènes »
- `app/pages/bachata-team.vue:60` — « moments inoubliables »
- `app/pages/bachata-debutant.vue:132` — « moments inoubliables »

**Titres à remplacer, alternative à valider**
- `app/pages/bachata-debutant.vue:267` — « Guidé par les meilleurs de Montréal »
- `app/pages/bachata-cours-prives.vue:18-19` — « L'EXCELLENCE / SUR MESURE »

**En attente de retour**
- Section Lady Styling — relecture confiée à Denise, aucune action code d'ici là.
- `app/pages/denise-rodriguez.vue:122` — phrase de rencontre réécrite par déduction depuis la bio de Jordan (voir §5). **À faire valider par Denise.**

---

## 7. Processus de relecture

1. Les retours des collaborateurs non-devs arrivent en langage naturel (barrés,
   commentaires entre parenthèses). Ils décrivent une **intention**, pas une
   instruction technique : les traduire avant d'éditer.
2. Toute suppression d'un chiffre ou d'une promesse s'applique **immédiatement**,
   sans validation supplémentaire (le risque juridique et de crédibilité prime).
3. Tout remplacement de titre est **proposé** avec 2-3 options, puis tranché par
   le client — un titre porte souvent des mots-clés SEO.
4. Ce fichier est mis à jour à chaque décision de ton nouvelle, pour ne pas
   rediscuter deux fois la même règle.
