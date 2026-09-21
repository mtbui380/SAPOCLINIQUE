import { esc, img, inscriptionHref } from '../html.mjs';
import { cursusList, site, orgJsonLd, courseJsonLd, faqJsonLd } from '../data.mjs';

// Image d'illustration par cursus (base /assets/img).
const illustrations = {
  chirurgie: { name: 'wix-chir', alt: "Travaux pratiques d'odontologie chirurgicale sur modèle 3D, SAPO Clinique" },
  parodontologie: { name: 'tp-paro-detail', alt: 'Travaux pratiques du cursus Parodontologie, SAPO Clinique' },
  masterclass: { name: 'wix-paro1', alt: 'Chirurgie plastique parodontale sur mâchoire animale, cursus Parodontologie' },
  assistante: { name: 'wix-paro', alt: 'Travaux pratiques sur modèle pédagogique, formation assistante en parodontologie SAPO Clinique' },
};

// Clé d'option du formulaire d'inscription par cursus.
const formKeys = { chirurgie: 'chirurgie', parodontologie: 'parodontologie', masterclass: 'masterclass', assistante: 'assistante' };

function detailPage(c) {
  const ill = illustrations[c.key];
  const formKey = formKeys[c.key];

  const head = `<div class="container section--top grid" style="row-gap:40px;align-items:start">
  <a class="gc-full link-u small muted" href="/cursus/">Tous les cursus</a>
  <div class="gc-1-7 stack gap-6" style="padding-right:24px">
    <p class="eyebrow muted">${esc(c.tag)} · ${esc(c.format)}</p>
    <h1 class="page-title">${esc(c.title)}</h1>
    <p class="lead" style="max-width:600px">${esc(c.intro)}</p>
  </div>
  <aside class="gc-9-4 card tnum" aria-label="Informations pratiques">
    <div class="card-row"><span>Public</span><span>${esc(c.public)}</span></div>
    <div class="card-row"><span>Format</span><span>${esc(c.format)}</span></div>
    <div class="card-row" style="padding-bottom:18px"><span>Tarif</span><span>${esc(c.price)}</span></div>
    <a class="btn btn--primary" href="${inscriptionHref(formKey)}" style="display:block;padding:16px">S'inscrire</a>
    <a class="link-u small muted" href="#sessions" style="text-align:center;margin-top:14px;display:block">Voir les dates ci-dessous</a>
  </aside>
</div>`;

  const goals = c.goals.map(g =>
    `<div class="rule-top" style="padding:12px 0;font-size:15px;line-height:1.6;color:var(--ink-80)">${esc(g)}</div>`
  ).join('\n      ');

  const modules = c.modules.map(m => `<div class="row-mod">
      <span class="num-disp row-mod__num">${esc(m.num)}</span>
      <div class="stack gap-2">
        <p class="smaller muted">${esc(m.label)}</p>
        <h3 style="font-size:21px;line-height:1.2">${esc(m.title)}</h3>
        <p class="muted">${esc(m.body)}</p>
        ${m.days && m.days.length ? `<div class="stack" style="gap:6px;padding-top:8px">
          ${m.days.map((d, i) => `<div class="row-day"><span class="row-day__n">J${i + 1}</span><span>${esc(d)}</span></div>`).join('\n          ')}
        </div>` : ''}
      </div>
    </div>`).join('\n    ');

  const programme = `<div class="container section--md grid" style="row-gap:48px;align-items:start">
  <div class="gc-1-4 stack" style="padding-right:24px">
    <h2 class="h2-lg" style="margin-bottom:12px">Objectifs</h2>
      ${goals}
  </div>
  <div class="gc-6-7 stack">
    <h2 class="h2-lg" style="margin-bottom:12px">Programme</h2>
    ${modules}
    <div class="rule-top"></div>
  </div>
</div>`;

  const sessionRows = c.sessions.map(sess => `<div class="row-sess tnum">
      <span class="eyebrow eyebrow--sm" style="padding-top:4px">${esc(sess.name)}</span>
      <div class="stack gap-3">
        ${sess.parts.map(pt => `<div class="row-dates"><span class="muted">${esc(pt.label)}</span><span>${esc(pt.dates)}</span></div>`).join('\n        ')}
      </div>
      <a class="btn btn--outline" href="${inscriptionHref(formKey, sess.name)}">S'inscrire<span class="visually-hidden"> — ${esc(c.title)}, ${esc(sess.name)}</span></a>
    </div>`).join('\n    ');

  const sessions = `<div class="container section--md grid" id="sessions" style="row-gap:32px;align-items:start">
  <div class="gc-1-4 stack gap-4" style="padding-right:24px">
    <h2 class="h2-lg">Prochaines dates</h2>
    <p class="muted">${esc(c.sessionsNote)}</p>
  </div>
  <div class="gc-5-8 rule-top-strong">
    ${sessionRows}
  </div>
</div>`;

  const image = `<div class="container section--md grid bleed-left">
  <figure class="gc-1-8">
    ${img({ name: ill.name, alt: ill.alt, cls: 'ph ar-1610 ph--bleed-l', sizes: '(max-width: 720px) 100vw, 60vw' })}
  </figure>
</div>`;

  const faq = c.faq ? `<div class="container section--md grid" style="row-gap:24px;align-items:start">
  <h2 class="gc-1-4 h2-lg" style="padding-right:24px">Questions fréquentes</h2>
  <div class="gc-5-8 rule-top-strong">
    ${c.faq.map(f => `<div class="row-lbl">
      <h3 style="font-size:16px;line-height:1.4;font-weight:400">${esc(f.q)}</h3>
      <p class="muted">${esc(f.a)}</p>
    </div>`).join('\n    ')}
  </div>
</div>` : '';

  const infos = `<div class="container section--sm grid" style="row-gap:24px">
  <div class="gc-1-4 rule-top small muted" style="padding:16px 24px 0 0;line-height:1.6"><span style="color:var(--ink);display:block;margin-bottom:6px">Lieu</span>${esc(c.place)}</div>
  <div class="gc-5-4 rule-top small muted" style="padding:16px 24px 0 0;line-height:1.6"><span style="color:var(--ink);display:block;margin-bottom:6px">Financement</span>Organisme certifié Qualiopi : prise en charge FIF-PL, OPCO ou employeur possible.</div>
  <div class="gc-9-4 rule-top small muted" style="padding:16px 0 0;line-height:1.6"><span style="color:var(--ink);display:block;margin-bottom:6px">Accessibilité</span>Formation accessible aux personnes en situation de handicap. Référent : ${esc(site.referentHandicap)}.</div>
</div>`;

  const jsonLd = [orgJsonLd(), courseJsonLd(c)];
  const f = faqJsonLd(c);
  if (f) jsonLd.push(f);

  return {
    path: `/cursus/${c.slug}/`,
    title: `${c.title} · ${c.formatCourt || c.format} · SAPO Clinique`,
    description: c.seoDescription || c.intro,
    navKey: 'cursus',
    jsonLd,
    content: [head, programme, sessions, image, faq, infos].filter(Boolean).join('\n\n'),
  };
}

export default cursusList.map(detailPage);
