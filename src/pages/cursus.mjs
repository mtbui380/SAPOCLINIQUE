import { esc, accIcon } from '../html.mjs';
import { cursusList, cursus, seo, orgJsonLd, courseJsonLd } from '../data.mjs';

// Libellés courts des en-têtes d'accordéon (versions maquette, distinctes des champs data).
const accMeta = {
  chirurgie: { tag: 'Chirurgical', format: '2 modules de 3 jours' },
  parodontologie: { tag: 'Non chirurgical / chirurgical', format: '2 modules de 3 jours · ensemble ou séparément' },
  masterclass: { tag: 'Chirurgical avancé', format: '1 module de 3 jours' },
  assistante: { tag: 'Non chirurgical', format: '1 module de 2 jours' },
};

function accordion(c, open = false) {
  const meta = accMeta[c.key];

  const modules = c.modules.map(m => `<div class="acc-mod">
        <span class="num-disp acc-mod__num">${esc(m.num)}</span>
        <div class="stack" style="gap:6px">
          <p class="smaller muted">${esc(m.label)}</p>
          <p style="font-size:17px;line-height:1.25">${esc(m.title)}</p>
          <p class="muted" style="font-size:14px;line-height:1.6">${esc(m.body)}</p>
          ${m.days && m.days.length ? `<div class="acc-days">
            ${m.days.map((d, i) => `<div class="row-day"><span class="row-day__n">J${i + 1}</span><span>${esc(d)}</span></div>`).join('\n            ')}
          </div>` : ''}
        </div>
      </div>`).join('\n      ');

  const goals = c.goals.map(g => `<div class="acc-goal">${esc(g)}</div>`).join('\n      ');

  return `<details class="acc" id="${esc(c.key)}"${open ? ' open' : ''}>
    <summary>
      <span class="acc-head">
        <span class="h3-item">${esc(c.title)}</span>
        <span class="eyebrow muted">${esc(meta.tag)}</span>
        <span class="muted" style="font-size:14px">${esc(meta.format)}</span>
        ${accIcon()}
      </span>
    </summary>
    <div class="acc-body">
      <div class="stack gap-5">
        <p style="font-size:15px;line-height:1.65;color:var(--ink-80)">${esc(c.intro)}</p>
        <p class="small muted" style="line-height:1.7">Public : ${esc(c.public)}<br>Format : ${esc(c.format)}</p>
        <a class="btn btn--primary btn--md" href="/cursus/${c.slug}/" style="align-self:flex-start">Dates et inscription<span class="visually-hidden"> — ${esc(c.title)}</span></a>
      </div>
      <div class="stack">
        <p class="small muted" style="padding-bottom:10px">Programme</p>
        ${modules}
        <p class="small muted rule-top" style="padding:24px 0 10px">Objectifs</p>
        ${goals}
      </div>
    </div>
  </details>`;
}

const content = `<section class="container section--top grid" style="row-gap:64px" aria-label="Les cursus">
  <div class="gc-1-7 stack gap-6" style="padding-right:24px">
    <h1 class="page-title">Chirurgie orale et parodontologie</h1>
    <p class="lead">Découvrez nos modules dédiés à la chirurgie orale et à la parodontologie, du traitement non chirurgical à la chirurgie plastique parodontale. <br>Des cursus essentiellement pratiques, sur modèles 3D et pièces anatomiques, <br>à appliquer au cabinet.</p>
    <nav class="jump-chips" aria-label="Accès direct aux cursus">
      <a href="#chirurgie">Chirurgie orale</a>
      <a href="#parodontologie">Parodontologie</a>
      <a href="#assistante">Assistante</a>
    </nav>
  </div>

  <h2 class="gc-1-3 h2-lg" style="padding-top:26px">Chirurgie orale</h2>
  <div class="gc-4-9 rule-top-strong">
    ${accordion(cursus.chirurgie, true)}
  </div>

  <h2 class="gc-1-3 h2-lg" style="padding-top:26px">Parodontologie</h2>
  <div class="gc-4-9 rule-top-strong">
    ${accordion(cursus.parodontologie)}
    ${accordion(cursus.masterclass)}
    ${accordion(cursus.assistante)}
  </div>
</section>`;

export default {
  path: '/cursus/',
  title: seo.cursus.title,
  description: seo.cursus.description,
  navKey: 'cursus',
  jsonLd: [orgJsonLd(), ...cursusList.map(c => courseJsonLd(c))],
  content,
};
