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
| **Images** | Aucune. Tous les visuels sont des SVG inline et des dégradés CSS |

### Structure de la page

1. **Header** sticky — logo, navigation, bouton d'appel direct
2. **Hero** — accroche, doubles CTA, 4 chiffres clés, illustration SVG, bandeau défilant
3. **Services** — 8 prestations en grille, avec icônes SVG dessinées à la main
4. **Pourquoi nous choisir** — certification, expérience, devis gratuit, proximité
5. **Réalisations** — 5 types de chantiers, illustrés par des scènes SVG décoratives
6. **Zone d'intervention** — carte stylisée (SVG, pas de Google Maps) + communes du secteur
7. **Contact / devis** — coordonnées réelles + formulaire de démonstration
8. **CTA final + footer** — rappel des coordonnées, navigation, mentions

---

## Arborescence

```
david-batiment/
├── index.html        # Toute la page (contenu + SVG inline)
├── css/
│   └── style.css     # Feuille de style unique, organisée en 17 sections
├── js/
│   └── script.js     # Menu mobile, reveals, compteurs, scrollspy, formulaire
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
| `06 20 25 94 20` | header, hero, contact, CTA final, footer, bouton flottant, message du formulaire (`js/script.js`) |
| `david.batiment@orange.fr` | contact, CTA final, footer |
| WhatsApp `02 31 80 93 38` → `https://wa.me/33231809338` | contact, footer |
| Adresse `8 Lieu Dit Les Gouix, 14310 Épinay-sur-Odon` | contact, footer |

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

La même logique s'applique à l'illustration du hero (`.visual-card`) : elle peut
être remplacée par une belle photo de chantier ou de réalisation terminée.

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

- **Responsive** : points de rupture à 1080 px, 900 px, 720 px et 520 px.
  Le menu mobile est un panneau latéral avec voile, fermeture au clic extérieur,
  au clic sur un lien et à la touche `Échap`.
- **Accessibilité** : lien d'évitement, `aria-label` sur les boutons icônes,
  `aria-expanded` sur le burger, `role="alert"` sur les erreurs de formulaire,
  `aria-live` sur le message de statut, focus visibles, contrastes soutenus,
  illustrations décoratives en `aria-hidden`.
- **Mouvement** : les animations (reveals, compteurs, bandeau défilant, carte)
  sont intégralement neutralisées si `prefers-reduced-motion: reduce` est actif.
- **Performance** : aucune librairie, aucune image bitmap, un seul fichier CSS et
  un seul fichier JS (chargé en `defer`). Les écouteurs de scroll passent par
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
témoignage n'ont été fabriqués.
