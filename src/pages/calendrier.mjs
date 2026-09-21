import { esc, inscriptionHref } from '../html.mjs';
import { cursus, upcoming, pastSessions, chips, seo, orgJsonLd } from '../data.mjs';

/* Filtres : boutons chips, « tous » pressé par défaut ; site.js gère le filtrage. */
function filters() {
  return chips.map(([key, label]) =>
    `<button type="button" class="btn--chip" data-filter="${esc(key)}" aria-pressed="${key === 'tous' ? 'true' : 'false'}">${esc(label)}</button>`
  ).join('\n      ');
}

/* Rangée d'une session à venir. */
function row(s) {
  const titleHref = s.key === 'reunion' ? '/contact/?sujet=reunion' : `/cursus/${cursus[s.key].slug}/`;
  const btnHref = s.contact ? '/contact/?sujet=reunion' : inscriptionHref(s.formKey, s.sess);
  return `<div class="row-cal" data-type="${esc(s.type)}">
      <span class="eyebrow eyebrow--sm eyebrow--accent">${esc(s.month)}</span>
      <a class="row-cal__title" href="${titleHref}">${esc(s.title)}</a>
      <span class="muted">${esc(s.promo)}</span>
      <span>${esc(s.dates)}</span>
      <a class="btn btn--outline" href="${btnHref}">S'inscrire<span class="visually-hidden"> — ${esc(s.title)}, ${esc(s.promo)}</span></a>
    </div>`;
}

/* Rangée d'une session passée : mois sans accent, statut « Terminée » à la place du bouton. */
function pastRow(s) {
  return `<div class="row-cal row-cal--past">
        <span class="eyebrow eyebrow--sm">${esc(s.month)}</span>
        <span class="row-cal__title">${esc(s.title)}</span>
        <span>${esc(s.promo)}</span>
        <span>${esc(s.dates)}</span>
        <span class="eyebrow eyebrow--sm">Terminée</span>
      </div>`;
}

const content = `<section class="container section--top stack" style="gap:40px" aria-labelledby="h-calendrier">
  <div class="page-head">
    <h1 id="h-calendrier" class="page-title">Calendrier</h1>
    <div class="chips" role="group" data-cal-filters aria-label="Filtrer les sessions par type de formation">
      ${filters()}
    </div>
  </div>
  <p class="visually-hidden" role="status" id="cal-count"></p>
  <div class="rule-top-strong" data-cal-list>
    ${upcoming.map(row).join('\n    ')}
  </div>
  <details class="past-toggle">
    <summary>Sessions passées</summary>
    <div class="rule-top" style="margin-top:20px">
      ${pastSessions.map(pastRow).join('\n      ')}
    </div>
  </details>
  <p class="notice">Les dates marquées « à confirmer » seront précisées au plus tard trois mois avant la session. Les inscriptions restent ouvertes jusqu'à 15 jours avant le premier module, dans la limite des places disponibles.</p>
</section>`;

export default {
  path: '/calendrier/',
  title: seo.calendrier.title,
  description: seo.calendrier.description,
  navKey: 'calendrier',
  jsonLd: [orgJsonLd()],
  content,
};
