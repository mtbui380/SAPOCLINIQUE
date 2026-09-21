import { esc, img } from '../html.mjs';
import { site, equipe, seo, orgJsonLd } from '../data.mjs';

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
  const portrait = img({ name: m.img, alt: m.nom, widths: [480], sizes: '220px', cls: 'ph' })
    .replace('<img ', `<img style="object-position:${esc(m.pos)}" `);
  return `<div class="team-card">
      ${portrait}
      <span class="team-card__nom">${esc(m.nom)}</span>
      <span class="team-card__role">${m.role.split(' · ').map(esc).join('<br>')}</span>
    </div>`;
}

function teamSection() {
  return `<section class="container section--md grid" aria-labelledby="h-equipe" style="row-gap:32px;align-items:start">
  <h2 id="h-equipe" class="gc-1-3 h2-lg">L'équipe pédagogique</h2>
  <div class="gc-4-9 team-grid">
    ${equipe.map(teamCard).join('\n    ')}
    <!-- TODO : compléter l'équipe (formateurs, référent handicap) — portraits + noms -->
  </div>
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
