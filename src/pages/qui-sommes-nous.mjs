import { esc, img } from '../html.mjs';
import { site, equipe, formateursOccasionnels, seo, orgJsonLd } from '../data.mjs';

function headSection() {
  return `<div class="container section--top grid" style="align-items:end">
  <h1 class="page-title gc-1-7">Qui sommes-nous</h1>
  <p class="lead gc-8-5">SAPO CLINIQUE a été fondée en 2002 et poursuit l'enseignement initial créé par le Professeur Jean-François GAUDY. Nous enrichissons vos connaissances anatomiques dans un objectif exclusivement clinique et vous faisons bénéficier du savoir-faire transmis, complété des moyens techniques et technologiques actuels.</p>
</div>`;
}

function imageSection() {
  return `<div class="container section--top grid">
  <figure class="gc-5-end">
    ${img({ name: 'equipe', alt: 'Équipe pédagogique SAPO Clinique en session de formation', cls: 'ph ar-169', sizes: '(max-width: 720px) 100vw, 66vw' })}
  </figure>
</div>`;
}

function teamCard(m) {
  const portrait = m.img
    ? img({ name: m.img, alt: m.nom, widths: [480], sizes: '220px', cls: 'ph' })
        .replace('<img ', `<img style="object-position:${esc(m.pos)}" `)
    : `<span class="ph team-card__initiales" aria-hidden="true">${esc(m.nom.replace(/^Dr /, '').split(/\s+/).map(w => w[0]).join(''))}</span>`;
  const bio = (m.bio || []).map(l => `<br>${esc(l)}`).join('');
  return `<li class="team-card">
      ${portrait}
      <span class="team-card__nom">${esc(m.nom)}</span>
      <span class="team-card__role"><span class="team-card__titre">${m.role.split(' · ').map(esc).join('<br>')}</span>${bio}</span>
    </li>`;
}

function railArrow(dir) {
  const d = dir < 0 ? 'M10 3L5 8l5 5' : 'M6 3l5 5-5 5';
  return `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="${d}"></path></svg>`;
}

function teamSection() {
  const membres = [...equipe, ...formateursOccasionnels.noms.map(nom => ({ nom, role: formateursOccasionnels.role }))];
  return `<section class="container section--md grid" aria-labelledby="h-equipe" style="row-gap:32px;align-items:start" data-rail-wrap>
  <div class="gc-1-3 stack gap-5">
    <h2 id="h-equipe" class="h2-lg">L'équipe pédagogique</h2>
    <!-- Flèches affichées par site.js ; sans JS, la rangée défile au doigt ou à la molette. -->
    <div class="rail-nav">
      <button class="social-btn rail-btn" type="button" data-rail-prev aria-label="Membres précédents" hidden>${railArrow(-1)}</button>
      <button class="social-btn rail-btn" type="button" data-rail-next aria-label="Membres suivants" hidden>${railArrow(1)}</button>
    </div>
  </div>
  <ul class="gc-4-9 team-rail" data-rail aria-label="Membres de l'équipe" tabindex="0">
    ${membres.map(teamCard).join('\n    ')}
  </ul>
</section>`;
}

function legalSection() {
  return `<section class="container section" aria-label="Certification">
  <div class="grid">
    <div class="gc-1-7 rule-top small muted stack gap-3" style="padding-top:20px;line-height:1.8">
      <p>Organisme de formation certifié Qualiopi au titre des actions de formation. Certificat ${esc(site.qualiopi.certificat)}, NDA ${esc(site.qualiopi.nda)}.</p>
      <p>Formation accessible aux personnes en situation de handicap. <a class="link-u" href="/contact/">Contactez-nous</a> pour toute demande de renseignement.</p>
    </div>
  </div>
</section>`;
}

export default {
  path: '/qui-sommes-nous/',
  title: seo.qui.title,
  description: seo.qui.description,
  navKey: 'qui',
  jsonLd: [orgJsonLd()],
  content: [
    headSection(),
    imageSection(),
    teamSection(),
    legalSection(),
  ].join('\n\n'),
};
