import { esc, img } from '../html.mjs';
import { seo, orgJsonLd } from '../data.mjs';

// Galerie : colonne (gc-s*), ratio, image et légende — ordre de la maquette.
const figures = [
  { span: 'gc-s8', ratio: 'ar-169', name: 'tp-sutures', widths: [800, 1600], alt: 'Travaux pratiques de sutures sur pièce anatomique, cursus Chirurgie orale SAPO Clinique', caption: 'Fig. 1 — TP sur pièce anatomique, Cursus Chirurgie.' },
  { span: 'gc-s4', ratio: 'ar-43', name: 'salle-tp', alt: 'Salle de travaux pratiques SAPO Clinique, praticiens en formation', caption: 'Fig. 2 — Salle de travaux pratiques.' },
  { span: 'gc-s4', ratio: 'ar-43', name: 'wix-chir', alt: 'Travaux pratiques de chirurgie orale sur modèle 3D, SAPO Clinique', caption: 'Fig. 3 — Cursus Chirurgie.' },
  { span: 'gc-s4', ratio: 'ar-43', name: 'wix-paro', alt: 'Travaux pratiques de parodontologie sur modèle pédagogique, SAPO Clinique', caption: 'Fig. 4 — Cursus Parodontologie.' },
  { span: 'gc-s4', ratio: 'ar-43', name: 'wix-chir3', alt: 'Démonstration clinique en cursus Chirurgie orale, SAPO Clinique', caption: 'Fig. 5 — Cursus Chirurgie.' },
  { span: 'gc-s6', ratio: 'ar-43', name: 'wix-chir2', alt: 'Gestes de chirurgie orale en travaux pratiques, SAPO Clinique', caption: 'Fig. 6 — Cursus Chirurgie.' },
  { span: 'gc-s6', ratio: 'ar-43', name: 'wix-paro1', alt: 'Chirurgie plastique parodontale sur mâchoire animale, cursus Parodontologie', caption: 'Fig. 7 — Cursus Parodontologie.' },
];

function sizesFor(span) {
  return span === 'gc-s4' ? '(max-width: 720px) 100vw, 33vw' : '(max-width: 720px) 100vw, 50vw';
}

function figure(f) {
  return `<figure class="${esc(f.span)}">
      ${img({ name: f.name, alt: f.alt, ...(f.widths ? { widths: f.widths } : {}), cls: `ph ${f.ratio}`, sizes: sizesFor(f.span) })}
      <figcaption>${esc(f.caption)}</figcaption>
    </figure>`;
}

const content = `<div class="container section--top stack" style="gap:48px">
  <h1 class="page-title">Médiathèque</h1>
  <div class="grid" style="row-gap:40px">
    ${figures.map(figure).join('\n    ')}
  </div>
</div>`;

export default {
  path: '/mediatheque/',
  title: seo.mediatheque.title,
  description: seo.mediatheque.description,
  navKey: 'mediatheque',
  jsonLd: [orgJsonLd()],
  content,
};
