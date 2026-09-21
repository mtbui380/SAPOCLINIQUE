import { esc, img, arrow, inscriptionHref } from '../html.mjs';
import { site, cursusList, cursus, upcoming, upcomingYearsLabel, heroSession, stats, seo, orgJsonLd, courseJsonLd } from '../data.mjs';

const piliers = [
  { t: 'Comprendre', p: "Anatomie clinique, modèles 3D et imagerie. Repères, trajets nerveux et vasculaires : le socle commun à tous les cursus." },
  { t: 'Traiter sans chirurgie', p: 'Parodontologie non chirurgicale : diagnostic, alliance thérapeutique, traitement minimalement invasif, maintenance. Pour praticiens et assistantes.' },
  { t: 'Opérer', p: "Chirurgie orale et parodontale : incisions, sutures, gestion des hémorragies, chirurgie plastique. Du modèle animal à une journée de dissection sur corps humain." },
];

const cursusMeta = {
  chirurgie: { tag: 'Chirurgical', meta: '2 modules de 3 jours' },
  parodontologie: { tag: 'Non chirurgical / chirurgical', meta: '2 modules de 3 jours, ensemble ou séparément' },
  masterclass: { tag: 'Chirurgical', meta: '1 module de 3 jours' },
  assistante: { tag: 'Non chirurgical', meta: '1 module de 2 jours' },
};

function heroSection() {
  return `<section class="hero" aria-label="Présentation">
  <!-- Pas d'attribut autoplay : site.js lance la lecture sauf prefers-reduced-motion ; sans JS, le poster s'affiche (WCAG 2.2.2). -->
  <video class="hero__video" src="/assets/video/hero.mp4" poster="/assets/img/hero-poster.jpg" muted loop playsinline aria-hidden="true"></video>
  <div class="hero__shade hero__shade--v"></div>
  <div class="hero__shade hero__shade--r"></div>
  <button class="video-toggle" type="button" data-state="playing" aria-label="Mettre la vidéo en pause" hidden>
    <svg class="icon-pause" width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true" focusable="false"><rect x="1" y="0" width="3.5" height="12"></rect><rect x="7.5" y="0" width="3.5" height="12"></rect></svg>
    <svg class="icon-play" width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true" focusable="false"><path d="M1.5 0l10 6-10 6z"></path></svg>
  </button>
  <div class="container grid hero__grid">
    <div class="gc-1-8 stack gap-6">
      <p class="hero__note">Chirurgie orale et parodontologie depuis 2002</p>
      <h1 class="hero-title">Le savoir anatomique au service du savoir-faire clinique.</h1>
      <p class="lead" style="max-width:560px">Formations pratiques pour chirurgiens-dentistes et assistantes : du traitement parodontal non chirurgical à la chirurgie orale, jusqu'à la dissection sur corps humain.</p>
      <div style="display:flex;gap:24px;align-items:center;flex-wrap:wrap">
        <a class="btn btn--primary" href="/calendrier/">Voir les prochaines sessions</a>
        <a class="link-u" href="/cursus/">Les cursus</a>
      </div>
    </div>
    <div class="gc-10-3 hero__aside stack gap-2">
      <p class="eyebrow">Prochaine session</p>
      <p class="hero__aside-title">${esc(heroSession.title)}</p>
      <p class="small muted tnum">${esc(heroSession.meta)}<br>${esc(heroSession.sub)}</p>
      <a class="link-u small" href="/cursus/${cursus[heroSession.cursusKey].slug}/" style="align-self:flex-start;margin-top:4px">Voir le programme</a>
    </div>
  </div>
</section>`;
}

function piliersSection() {
  return `<section class="container section--sm" aria-label="Notre approche">
  <div class="grid" style="row-gap:20px">
    ${piliers.map((x, i) => `<div class="${['gc-1-4', 'gc-5-4', 'gc-9-4'][i]} rule-top stack gap-3" style="padding-top:20px">
      <h2 style="font-size:22px;line-height:1.2;font-weight:400">${esc(x.t)}</h2>
      <p class="muted">${esc(x.p)}</p>
    </div>`).join('\n    ')}
  </div>
</section>`;
}

function cursusSection() {
  const rows = cursusList.map(c => {
    const m = cursusMeta[c.key];
    return `<a class="row-acc" href="/cursus/${c.slug}/">
      <span class="h3-item">${esc(c.title)}</span>
      <span class="eyebrow row-acc__tag">${esc(m.tag)}</span>
      <span class="row-acc__meta">${esc(m.meta)}</span>
      <span class="arrow">${arrow()}</span>
    </a>`;
  }).join('\n    ');
  return `<section class="container section" aria-labelledby="h-cursus">
  <div class="grid" style="row-gap:32px">
    <h2 id="h-cursus" class="gc-1-3 h2-xl" style="padding:24px 0;align-self:start">Cursus</h2>
    <div class="gc-4-9 rule-top">
    ${rows}
    </div>
  </div>
</section>`;
}

function dissectionSection() {
  return `<section class="section" aria-labelledby="h-dissection">
  <div class="container grid bleed-right" style="align-items:end">
    <div class="gc-1-4 stack gap-5" style="padding-bottom:48px;padding-right:24px">
      <h2 id="h-dissection" class="h2-xl">Une journée de dissection sur corps humain</h2>
      <p class="muted" style="line-height:1.65">Pratiquez sur des corps humains au sein de l'École de Chirurgie de l'AP-HP à Paris, dans le respect du cadre légal et déontologique en vigueur.<br>Réservée aux praticiens inscrits au cursus chirurgical intégral.</p>
      <a class="link-u" href="/cursus/chirurgie/" style="align-self:flex-start">Cursus Chirurgie, module 2/2</a>
    </div>
    <div class="gc-5-end">
      ${img({ name: 'tp-sutures', alt: 'Travaux pratiques de sutures sur pièce anatomique, cursus Chirurgie orale SAPO Clinique', cls: 'ph ar-32 ph--bleed-r', sizes: '(max-width: 720px) 100vw, 60vw' })}
    </div>
  </div>
</section>`;
}

function paroSection() {
  return `<section class="section--md" aria-labelledby="h-paro">
  <div class="container grid bleed-left" style="align-items:end">
    <div class="gc-1-8">
      ${img({ name: 'tp-paro-inserts', alt: 'Travaux pratiques de parodontologie non chirurgicale, micro-inserts ultrasoniques sur modèle', cls: 'ph ar-32 ph--bleed-l', sizes: '(max-width: 720px) 100vw, 60vw' })}
    </div>
    <div class="gc-9-4 stack gap-5" style="padding-bottom:48px">
      <h2 id="h-paro" class="h2-xl">Parodontologie non chirurgicale</h2>
      <p class="muted" style="line-height:1.65">Traiter la maladie parodontale sans incision, du diagnostic à l'instrumentation ultrasonique et la maintenance. Maîtrisez un concept de traitement efficace, plus conservateur, moins douloureux, et comprenez les cas où la chirurgie intervient.</p>
      <a class="link-u" href="/cursus/parodontologie/" style="align-self:flex-start">Cursus Parodontologie, module 1/2</a>
    </div>
  </div>
</section>`;
}

function sessionsSection() {
  const rows = upcoming.slice(0, 5).map(s => {
    const href = s.contact ? '/contact/?sujet=reunion' : `/cursus/${cursus[s.key].slug}/`;
    return `<a class="row-cal" href="${href}">
      <span class="eyebrow eyebrow--sm eyebrow--accent">${esc(s.month)}</span>
      <span class="row-cal__title">${esc(s.title)}</span>
      <span class="muted">${esc(s.promo)}</span>
      <span>${esc(s.dates)}</span>
      <span class="arrow muted">${arrow()}</span>
    </a>`;
  }).join('\n    ');
  return `<section class="container section" aria-labelledby="h-sessions">
  <div class="page-head" style="padding-bottom:20px;border-bottom:1px solid var(--line-strong)">
    <h2 id="h-sessions" class="h2-xl">Sessions ${esc(upcomingYearsLabel)}</h2>
    <span class="small muted">${upcoming.length} sessions · inscriptions ouvertes</span>
  </div>
  ${rows}
  <p style="margin-top:24px"><a class="link-u small" href="/calendrier/">Calendrier complet</a></p>
</section>`;
}

function statsSection() {
  const cards = stats.map(x => `<div class="stat">
      <span class="num-disp stat__value">${esc(x.value)}<small>${esc(x.unit)}</small></span>
      <span>${esc(x.label)}</span>
      <span class="smaller muted">${esc(x.source)}</span>
    </div>`).join('\n    ');
  return `<section class="container section" aria-labelledby="h-avis">
  <div class="grid" style="row-gap:56px">
    <div class="gc-1-5 stack gap-5" style="padding-right:24px">
      <h2 id="h-avis" class="h2-xl">Ce qu'en disent les ancien·ne·s élèves</h2>
    </div>
    <div class="gc-7-6 stats">
    ${cards}
    </div>
    <figure class="gc-1-6">
      ${img({ name: 'tp-chirurgie-praticien', alt: 'Praticien en travaux pratiques de chirurgie orale, cursus SAPO Clinique', cls: 'ph ar-45', sizes: '(max-width: 720px) 100vw, 45vw' })}
    </figure>
    <figure class="gc-7-6">
      ${img({ name: 'wix-paro', alt: 'Travaux pratiques de parodontologie sur modèle pédagogique, SAPO Clinique', cls: 'ph ar-45', sizes: '(max-width: 720px) 100vw, 45vw' })}
    </figure>
  </div>
</section>`;
}

function communauteSection() {
  const items = [
    { t: 'Partager un cas clinique', p: "Demandez l'avis de nos formateurs sur un cas clinique rencontré au cabinet." },
    { t: 'Poser une question aux formateurs', p: 'Nos formateurs sont là pour vous accompagner dans votre apprentissage clinique, même après la fin de votre module.' },
    { t: 'Retrouver les supports', p: 'Consultez les supports de cours, vidéos des TP, protocoles et contenu exclusif, sans limite de durée.' },
  ].map(x => `<div class="rule-bottom" style="padding:18px 0">
      <div class="stack" style="gap:4px">
        <span style="font-size:17px">${esc(x.t)}</span>
        <span class="muted" style="font-size:14px;line-height:1.5">${esc(x.p)}</span>
      </div>
    </div>`).join('\n    ');
  return `<section class="container section" aria-labelledby="h-communaute">
  <div class="grid" style="row-gap:32px">
    <div class="gc-1-5 stack gap-5" style="padding-right:24px">
      <h2 id="h-communaute" class="h2-xl">Communauté SAPO</h2>
      <p class="muted" style="line-height:1.65">Votre formation ne s'arrête pas à la fin du module. En vous inscrivant à une de nos formations, rejoignez la communauté SAPO CLINIQUE et partagez vos cas et vos questions avec vos formateurs et les autres membres.</p>
    </div>
    <div class="gc-7-6 rule-top">
    ${items}
    </div>
  </div>
</section>`;
}

function legalSection() {
  return `<section class="container section" aria-label="Certification">
  <div class="grid">
    <div class="gc-1-7 rule-top small muted stack gap-3" style="padding-top:20px;line-height:1.8">
      <p>SAPO CLINIQUE a été fondée en 2002 et poursuit l'enseignement initial créé par le Professeur Jean-François GAUDY.</p>
      <p>Organisme de formation certifié Qualiopi au titre des actions de formation. Certificat ${esc(site.qualiopi.certificat)}, NDA ${esc(site.qualiopi.nda)}.</p>
      <p>Formation accessible aux personnes en situation de handicap. <a class="link-u" href="/contact/">Contactez-nous</a> pour toute demande de renseignement.</p>
    </div>
  </div>
</section>`;
}

export default {
  path: '/',
  title: seo.accueil.title,
  description: seo.accueil.description,
  navKey: null,
  jsonLd: [orgJsonLd(), ...cursusList.map(c => courseJsonLd(c))],
  content: [
    heroSection(),
    piliersSection(),
    cursusSection(),
    dissectionSection(),
    paroSection(),
    sessionsSection(),
    statsSection(),
    communauteSection(),
    legalSection(),
  ].join('\n\n'),
};
