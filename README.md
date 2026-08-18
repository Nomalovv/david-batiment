# David Bâtiment — proposition de refonte du site vitrine

Maquette fonctionnelle proposée à l'entreprise **David Bâtiment** (maçonnerie et
bâtiment, Épinay-sur-Odon / Villers-Bocage, Calvados) en remplacement du site
actuel [david-batiment-villers-bocage.fr](https://www.david-batiment-villers-bocage.fr/).

L'objectif est de conserver **toutes les informations réelles de l'entreprise**
(activité, prestations, coordonnées, zone d'intervention) en les présentant dans
une interface nettement plus moderne : typographie soignée, palette pierre/ardoise
avec un accent terre cuite, grande respiration, animations sobres.

> ⚠️ Ce dépôt est une **proposition de refonte**, pas le site officiel en production.

---

## Aperçu

| | |
|---|---|
| **Type** | Site vitrine statique, une seule page avec ancres |
| **Technos** | HTML5, CSS3, JavaScript natif — **aucun framework, aucune étape de build** |
| **Hébergement cible** | GitHub Pages (100 % statique) |
| **Dépendances externes** | Uniquement Google Fonts (Bricolage Grotesque + Inter) |
| **Images** | Une seule : la photo réelle du dépôt (`img/entreprise-facade.jpg`) dans le hero. Tous les autres visuels restent des SVG inline et des dégradés CSS |

### Structure de la page

1. **Header** sticky — logo, navigation, bouton d'appel direct
2. **Hero** — accroche, doubles CTA, 4 chiffres clés, **photo réelle de l'entreprise**, bandeau défilant
3. **Services** — 8 prestations en grille, avec icônes SVG dessinées à la main
4. **Pourquoi nous choisir** — certification, expérience, devis gratuit, proximité
5. **Réalisations** — 5 types de chantiers, illustrés par des scènes SVG décoratives
6. **Zone d'intervention** — carte stylisée (SVG, pas de Google Maps) + communes du secteur
7. **Contact / devis** — coordonnées réelles (deux numéros) + formulaire de démonstration
8. **Prendre rendez-vous** — emplacement réservé au futur widget Calendly / Cal.com (aperçu visuel)
9. **CTA final + footer** — rappel des coordonnées, navigation, mentions

---

## Arborescence

```
david-batiment/
├── index.html        # Toute la page (contenu + SVG inline)
├── css/
│   └── style.css     # Feuille de style unique, organisée en 17 sections
├── js/
│   └── script.js     # Menu mobile, reveals, compteurs, scrollspy, formulaire
├── img/
│   └── entreprise-facade.jpg   # Photo du dépôt (visuel du hero)
├── README.md
└── .gitignore
```

---

## Lancer le site en local

Le site n'a besoin d'aucune compilation. Deux possibilités :

### 1. Le plus simple

Double-cliquez sur `index.html` : il s'ouvre directement dans le navigateur.

### 2. Avec un petit serveur local (recommandé)

Certaines fonctions se comportent mieux via `http://` que via `file://`.

```bash
# Python 3 (déjà installé sur la plupart des machines)
python -m http.server 8000

# ou avec Node.js
npx serve .
```

Puis ouvrez <http://localhost:8000>.

Sous VS Code, l'extension **Live Server** fait la même chose en un clic
(« Go Live »), avec rechargement automatique.

---

## Publier sur GitHub Pages

1. Poussez le dépôt sur GitHub.
2. **Settings → Pages**.
3. *Source* : `Deploy from a branch`, branche `main`, dossier `/ (root)`.
4. Après une minute, le site est en ligne sur
   `https://<utilisateur>.github.io/david-batiment/`.

Aucune configuration supplémentaire n'est nécessaire : pas de build, pas d'action
GitHub, pas de variables d'environnement.

---

## Personnaliser

### Les couleurs

Toute la palette est centralisée dans les variables CSS en haut de
`css/style.css` (section `1. TOKENS`). Changer une valeur met à jour tout le site.

```css
:root {
  --ink:        #12161b;  /* ardoise très sombre : fonds sombres */
  --slate:      #5c6672;  /* gris béton : texte secondaire */
  --stone-50:   #faf8f5;  /* pierre claire : fond général */
  --accent:     #d1683a;  /* terre cuite : couleur principale d'accent */
  --accent-600: #b8552b;  /* accent survolé */
  --accent-soft:#fbeee7;  /* accent très clair : pastilles, badges */
}
```

Pour tester une autre ambiance, il suffit de remplacer `--accent`,
`--accent-600`, `--accent-700` et `--accent-soft` par une autre famille
(jaune bâtiment, ocre, brique profonde…).

> Quelques SVG inline dans `index.html` reprennent la valeur `#d1683a` en dur
> (illustrations, carte). Une recherche/remplacement de `d1683a` suffit à les
> aligner sur une nouvelle couleur d'accent.

### Les polices

Elles sont chargées via un unique `<link>` Google Fonts dans le `<head>` de
`index.html`, puis référencées par `--font-display` et `--font-body`.
Pour en changer : remplacer l'URL Google Fonts, puis les deux variables.

### Les textes

Tout le contenu est éditable directement dans `index.html` : aucune donnée n'est
générée par JavaScript, hormis l'année du copyright.

Les coordonnées apparaissent à plusieurs endroits — pensez à toutes les mettre à
jour si elles changent :

| Donnée | Où |
|---|---|
| **Mobile** `06 20 25 94 20` → `tel:0620259420` | header, hero, zone d'intervention, contact, rendez-vous, CTA final, footer, bouton flottant, message du formulaire (`js/script.js`) |
| **Fixe** `02 31 80 93 38` → `tel:0231809338` | contact, rendez-vous, footer, mention sous le formulaire |
| `david.batiment@orange.fr` | contact, CTA final, footer |
| Adresse `8 Lieu Dit Les Gouix, 14310 Épinay-sur-Odon` | hero (légende de la photo), contact, footer |

#### Les deux numéros de téléphone

L'entreprise dispose de **deux lignes**, toutes deux présentées comme de simples
numéros de téléphone cliquables (`tel:`) :

- **06 20 25 94 20** — mobile, ligne principale ;
- **02 31 80 93 38** — fixe.

Répartition volontaire pour ne pas surcharger l'interface :

| Emplacement | Numéros affichés |
|---|---|
| Header, hero, CTA final, bouton flottant mobile | Mobile uniquement (un seul CTA d'appel clair) |
| Section **Contact** | Les deux, sur deux lignes distinctes (« Téléphone mobile » / « Téléphone fixe ») |
| Section **Prendre rendez-vous** | Les deux, en deux boutons |
| **Footer** | Les deux (« Mobile : … » / « Fixe : … ») |

> ℹ️ Il n'y a **plus aucun lien ni bouton WhatsApp** sur le site : le numéro
> `02 31 80 93 38`, auparavant présenté comme un contact WhatsApp, est désormais
> affiché comme un numéro de téléphone fixe classique.

### La photo du hero (`img/entreprise-facade.jpg`)

Le visuel du hero n'est plus une illustration SVG : c'est la **vraie photo du
dépôt de l'entreprise**, avec l'enseigne « David Bâtiment — Maçonnerie
Rénovation ». Elle est affichée dans une carte à coins arrondis, avec un voile
sombre dégradé en bas qui porte la légende (adresse) sans masquer le bâtiment.

**Remplacer la photo**

1. Déposez la nouvelle image dans `img/` (idéalement en `.jpg`/`.webp`,
   **1600 px de large minimum**, < 300 Ko après optimisation).
2. Dans `index.html`, mettez à jour `src`, `alt`, `width` et `height` de
   `<img class="visual-photo" …>`.
3. Le `alt` doit décrire ce que l'on voit (il est lu par les lecteurs d'écran et
   par Google) — pas « photo » ni « image ».

> ⚠️ La photo actuelle ne fait que **550 × 413 px** : elle suffit pour la
> maquette mais reste un peu douce sur écran haute densité. Si le client
> retrouve l'original de son appareil photo, il suffit de l'écraser dans `img/`
> (même nom de fichier) : rien d'autre à modifier.

**Recadrer / réglages du cadrage**

Tout se règle dans `css/style.css`, règle `.visual-photo` :

```css
.visual-photo {
  aspect-ratio: 3 / 2;          /* format du cadre : 16/10 ou 4/3 sont aussi valables */
  object-fit: cover;            /* la photo remplit le cadre sans se déformer */
  object-position: 46% 42%;     /* ← LE réglage du cadrage */
  transform: scale(1.08);       /* zoom léger : resserre encore un peu */
  transform-origin: 46% 42%;    /* garder la même valeur que object-position */
}
```

- `object-position` : le 1er pourcentage est **horizontal** (0 % = bord gauche,
  100 % = bord droit), le 2nd est **vertical** (0 % = haut, 100 % = bas).
  Ici `42 %` en vertical remonte le cadrage sur le bâtiment et l'enseigne, et
  évite qu'une bande de ciel ou la cour en gravier n'occupe tout le cadre.
- Le `aspect-ratio` plus « panoramique » que la photo source (3/2 contre 4/3)
  rogne automatiquement le haut et le bas. Passez à `4 / 3` pour tout montrer,
  ou à `16 / 9` pour un cadrage encore plus resserré.
- `transform: scale()` : au-delà de `1.15`, l'image basse définition devient
  visiblement floue — l'augmenter seulement avec une photo haute résolution.

L'intensité du voile sombre se règle sur `.visual-card__frame::after`
(`height` et les opacités du `linear-gradient`). Le fond du hero, lui, est un
simple dégradé (`.hero__bg`) : la grille de lignes et les halos flous d'origine
ont été retirés pour laisser la photo réelle dominer.

### Remplacer les visuels décoratifs par de vraies photos

Les scènes de la section **Réalisations** sont volontairement des illustrations
SVG : la maquette ne dépend d'aucune image externe et ne peut donc pas « casser ».
Dès que les photos de chantier du client sont disponibles :

1. Créez un dossier `img/` et déposez-y les photos (format `.webp` ou `.jpg`
   optimisé, largeur ~1200 px, poids < 300 Ko).
2. Dans `index.html`, remplacez le bloc SVG de chaque carte :

```html
<!-- Avant -->
<div class="work__media work__media--stone" aria-hidden="true">
  <svg viewBox="0 0 480 300"> … </svg>
</div>

<!-- Après -->
<div class="work__media">
  <img src="img/facade-pierre.jpg"
       alt="Façade en pierre rejointoyée à la chaux"
       loading="lazy" width="1200" height="750">
</div>
```

3. Ajoutez dans `css/style.css` :

```css
.work__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform .6s var(--ease);
}
.work:hover .work__media img { transform: scale(1.05); }
```

Retirez `aria-hidden="true"` sur les conteneurs devenus informatifs, et
renseignez un `alt` descriptif.

### Brancher un vrai widget de rendez-vous (Calendly / Cal.com)

La section **« Prendre rendez-vous »** (`<section id="rendez-vous">`) est un
**emplacement réservé** : aucun compte n'est encore créé, **aucune réservation
n'est enregistrée**.

Ce qu'elle contient aujourd'hui :

- une **carte `.booking__widget`** — le conteneur définitif, déjà stylé (fond,
  bordure, marges, ombre), dans lequel le vrai widget viendra s'insérer ;
- à l'intérieur, un **aperçu visuel statique** `.booking__mock` : sélection de
  jours, liste de créneaux et bouton de confirmation, uniquement en HTML/CSS.
  **Rien n'est cliquable, aucun JavaScript n'y est associé**, le bloc est en
  `aria-hidden="true"` pour les lecteurs d'écran. Il sert à montrer au client le
  rendu attendu ;
- une **étiquette « Aperçu — widget Calendly / Cal.com à connecter »** et un
  encadré explicite sous la maquette, pour qu'aucun visiteur ne puisse croire à
  une vraie réservation ;
- une colonne latérale (déroulé en 3 étapes + les **deux numéros de téléphone**)
  qui, elle, reste utile même une fois le widget branché.

**Mise en service, une fois le compte créé :**

1. Créez le compte et le type d'événement (par exemple « Visite technique &
   devis gratuit », 30 min) sur [Calendly](https://calendly.com) ou
   [Cal.com](https://cal.com).
2. Dans `index.html`, repérez le commentaire
   `► EMPLACEMENT DU WIDGET CALENDLY / CAL.COM ◄`.
3. **Supprimez tout le bloc `<div class="booking__mock"> … </div>`**, ainsi que
   le paragraphe `.booking__flag` (l'étiquette « Aperçu ») et le paragraphe
   `.booking__note` (l'avertissement « simulation visuelle »).
4. Collez à la place le code d'intégration fourni par le service :

```html
<!-- Calendly, en ligne (inline embed) -->
<div class="calendly-inline-widget"
     data-url="https://calendly.com/david-batiment/devis-gratuit"
     style="min-width:320px;height:700px"></div>
<script src="https://assets.calendly.com/assets/external/widget.js" async></script>
```

```html
<!-- Cal.com, en ligne (inline embed) -->
<div id="my-cal-inline" style="min-height:700px"></div>
<script>/* snippet fourni par Cal.com */</script>
```

5. Les styles `.booking__mock…` deviennent alors inutiles dans
   `css/style.css` (section *11b*) : ils peuvent être supprimés. Gardez
   `.booking__grid`, `.booking__widget` et `.booking__aside`, qui portent la
   mise en page de la section.

> Le widget charge un script tiers : c'est la **seule** dépendance externe qui
> s'ajoutera au site (avec Google Fonts). Pensez à mentionner ce service dans la
> politique de confidentialité, puisqu'il collecte nom, e-mail et créneau.
>
> Variante « sans script » si le client préfère : remplacer la carte par un
> simple bouton `<a class="btn btn--accent" href="https://calendly.com/…">`
> qui ouvre la page de réservation hébergée par le service.

### Rendre le formulaire opérationnel

Le formulaire de la section **Contact** est **une démonstration** : il valide les
champs côté client puis affiche un message de confirmation, mais **n'envoie
aucun e-mail** (GitHub Pages n'exécute pas de code serveur). C'est signalé par
un commentaire dans `index.html` et dans `js/script.js`, ainsi que par une
mention sous le bouton d'envoi.

Pour l'activer sans quitter l'hébergement statique, branchez un service tiers :

```html
<form class="form" id="quote-form" method="POST"
      action="https://formspree.io/f/VOTRE_ID">
```

Puis, dans `js/script.js`, supprimez le `e.preventDefault()` du gestionnaire
`submit` une fois la validation passée (la validation client peut être conservée).
Alternatives équivalentes : **Web3Forms**, **Getform**, **Netlify Forms** (si le
site est déplacé sur Netlify), ou un simple script PHP sur un hébergement mutualisé.

Pensez à ajouter une mention RGPD / politique de confidentialité dès que des
données personnelles sont réellement collectées et transmises.

---

## Détails techniques

- **Responsive** : points de rupture à 1180 px (nav resserrée), 1080 px, 900 px,
  720 px et 520 px.
  Le menu mobile est un panneau latéral avec voile, fermeture au clic extérieur,
  au clic sur un lien et à la touche `Échap`.
- **Accessibilité** : lien d'évitement, `aria-label` sur les boutons icônes,
  `aria-expanded` sur le burger, `role="alert"` sur les erreurs de formulaire,
  `aria-live` sur le message de statut, focus visibles, contrastes soutenus,
  illustrations décoratives en `aria-hidden` (dont l'aperçu du widget de
  rendez-vous, qui n'expose donc aucun faux créneau aux lecteurs d'écran),
  `alt` descriptif sur la photo du hero.
- **Mouvement** : les animations (reveals, compteurs, bandeau défilant, carte)
  sont intégralement neutralisées si `prefers-reduced-motion: reduce` est actif.
- **Performance** : aucune librairie, une seule image bitmap (27 Ko), un seul
  fichier CSS et un seul fichier JS (chargé en `defer`). Les écouteurs de scroll passent par
  `requestAnimationFrame` et sont marqués `passive`.
- **Impression** : une feuille `@media print` masque header, CTA et bouton flottant.

## Compatibilité

Navigateurs modernes (Chrome, Edge, Firefox, Safari — 2 dernières versions).
Les fonctionnalités avancées dégradent proprement : sans `IntersectionObserver`,
tout le contenu s'affiche immédiatement ; sans `backdrop-filter`, le header
reste lisible grâce à un fond opaque de repli.

---

## Licence et contenus

Le code de cette maquette est librement réutilisable par David Bâtiment.
Les informations d'entreprise (raison sociale, coordonnées, prestations,
certification) appartiennent à David Bâtiment et proviennent de son site
actuel — aucune n'a été inventée. Les descriptions de réalisations sont
volontairement génériques : ni nom de client, ni adresse de chantier, ni
témoignage n'ont été fabriqués. Les jours et horaires visibles dans la section
« Prendre rendez-vous » sont des **exemples d'affichage**, signalés comme tels :
ils ne correspondent à aucune disponibilité réelle. La photo `img/` appartient à
David Bâtiment.
