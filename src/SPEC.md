# SAPO Clinique — conventions du générateur

## Architecture

- `src/data.mjs` — source de vérité unique (contenu, dates, SEO, JSON-LD).
- `src/html.mjs` — helpers : `esc()`, `img()` (picture WebP+JPEG responsive), `arrow()`, `accIcon()`, `inscriptionHref(formKey, session)`.
- `src/layout.mjs` — enveloppe de page (head SEO/CSP, header, footer). Appelée par build.mjs.
- `src/pages/*.mjs` — un module par page. Export par défaut : un objet page **ou un tableau** d'objets page.
- `build.mjs` — `node build.mjs` régénère tout le site dans `docs/`.
- `docs/assets/css/styles.css` — système de design complet (ne pas dupliquer de styles dans les pages ; styles inline autorisés uniquement pour micro-ajustements de mise en page : max-width, padding, gap, align…).
- `docs/assets/js/site.js` — améliorations progressives. Le site doit rester lisible sans JS.

## Interface d'un module de page

```js
export default {
  path: '/calendrier/',            // URL, avec / final ; fichier écrit : docs/calendrier/index.html
  title: seo.calendrier.title,     // <title> — depuis data.mjs
  description: seo.calendrier.description,
  navKey: 'calendrier',            // souligne l'onglet actif : cursus|calendrier|qui|mediatheque|ressources|contact ou null
  noindex: false,                  // true → meta robots noindex + exclu du sitemap
  jsonLd: [orgJsonLd()],           // tableau @graph, ou omis
  content: `<section>…</section>`, // contenu du <main> uniquement
};
```

## Système de design (classes clés)

- Conteneurs : `container` (1360px + padding latéral), sections `section` (160px top) / `section--md` (120) / `section--sm` (96) / `section--top` (64, entête de page).
- Grille : `grid` (12 col, gap 24) + colonnes `gc-1-3 … gc-10-3`, `gc-full`, `gc-5-end`, `gc-s4/s6/s8` (voir styles.css). Tout passe en pleine largeur en mobile automatiquement.
- Typo : `page-title` (h1), `h2-xl` (40px), `h2-lg` (28px), `h3-item` (24px), `lead`, `eyebrow` (+`--sm`, `--accent`), `num-disp`, `muted`, `faint`, `small`, `smaller`, `tnum`.
- Boutons/liens : `btn btn--primary`, `btn btn--primary btn--md`, `btn btn--outline`, `btn--chip` (filtres, `aria-pressed`), `link-u` (lien souligné).
- Rangées : `row-acc` (liste cursus), `row-cal` (calendrier, + `row-cal--past`), `row-sess`, `row-dates`, `row-mod`, `row-day`, `row-lbl` (+`--wide`), `stat`/`stats`, `quote`.
- Accordéons : `<details class="acc" id="…"><summary><span class="acc-head">…${accIcon()}</span></summary><div class="acc-body">…</div></details>` — natifs, sans JS.
- Cartes/formulaires : `card`, `card--form`, `card-row`, `field`, `field-grid`, `field-grid--3`, `form-sep`, `check-line`, `btn-submit`.
- Images : toujours via `img({ name, alt, cls: 'ph ar-32', sizes })` — classes de ratio : `ar-32|ar-169|ar-1610|ar-43|ar-45` ; pleine largeur bord à bord : `ph--bleed-l|r` + `bleed-left|right` sur la grille.
- Utilitaires : `stack`, `gap-2 … gap-7`, `rule-top`, `rule-top-strong`, `rule-bottom`, `page-head`, `sticky-col`, `visually-hidden`, `notice`.

## Exigences transverses

- **Accessibilité** : un seul `<h1>` par page ; hiérarchie h1→h2→h3 stricte ; chaque `<label>` relié par `for`/`id` ; `autocomplete` sur les champs d'identité ; boutons = `<button>`, navigation = `<a href>` ; SVG décoratifs `aria-hidden="true" focusable="false"`.
- **Interdits** : aucun lien `href="#"` mort ; pas de gestionnaire inline (`onclick=`) — la CSP les bloque ; pas de `<style>` ni de ressources externes.
- **Contenu** : fidèle à la maquette (`Sapo Clinique v2.dc.html`), fautes corrigées. Prix : « Sur demande ». Ne rien inventer : les contenus manquants sont marqués `<!-- TODO -->`.
- Après écriture : `node --check src/pages/<fichier>.mjs` puis `node build.mjs` doivent passer.

## Images disponibles (docs/assets/img)

En 800/1600/2400 (WebP+JPEG, défaut du helper `img()`) : `tp-chirurgie-praticien`, `tp-paro-detail`, `equipe`, `salle-tp`, `wix-paro`, `wix-chir`, `wix-chir2`, `wix-chir3`, `wix-paro1`. En 800/1600 seulement (source 1772px — passer `widths: [800, 1600]`) : `tp-sutures`. Portraits : `portrait-blois`, `portrait-rzeznik` (taille unique, `widths: [480]`). Qualité : WebP 82 / JPEG 84 (mozjpeg).
