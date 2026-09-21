import { esc } from '../html.mjs';
import { seo, orgJsonLd } from '../data.mjs';

// Contenu de l'espace anciens — mêmes items que la section Communauté de l'accueil.
const contenus = [
  { t: 'Partager un cas clinique', p: "Demandez l'avis de nos formateurs sur un cas clinique rencontré au cabinet." },
  { t: 'Poser une question aux formateurs', p: 'Nos formateurs sont là pour vous accompagner dans votre apprentissage clinique, même après la fin de votre module.' },
  { t: 'Retrouver les supports', p: 'Consultez les supports de cours, vidéos des TP, protocoles et contenu exclusif, sans limite de durée.' },
];

function headSection() {
  const items = contenus.map((x, i) => `<div class="${i < contenus.length - 1 ? 'rule-bottom ' : ''}stack" style="gap:4px;padding:14px 0">
      <span style="font-size:16px">${esc(x.t)}</span>
      <span class="muted" style="font-size:14px;line-height:1.5">${esc(x.p)}</span>
    </div>`).join('\n    ');
  return `<section class="container section--top grid" style="row-gap:40px;align-items:start" aria-label="Présentation des ressources">
  <div class="gc-1-6 stack gap-6" style="padding-right:24px">
    <h1 class="page-title">Ressources</h1>
    <p class="lead">Retrouvez vos supports de cours, vidéos des TP et contenu exclusif à la fin de votre formation.</p>
  </div>
  <aside class="gc-8-5 card" aria-label="Contenu de l'espace anciens">
    <p class="eyebrow" style="padding:4px 0 10px">Dans l'espace anciens</p>
    ${items}
  </aside>
</section>`;
}

function accesSection() {
  return `<section class="container section--md grid" style="row-gap:32px;align-items:start" aria-labelledby="h-acces">
  <h2 id="h-acces" class="gc-1-4 h2-lg" style="padding-right:24px">Comment y accéder</h2>
  <div class="gc-5-8 rule-top-strong stack gap-5" style="padding-top:24px;max-width:640px">
    <p class="muted" style="line-height:1.65">L'accès est réservé aux participants des formations SAPO Clinique. Le lien d'accès à la communauté et aux supports vous est transmis à l'issue de votre module.</p>
    <p class="muted" style="line-height:1.65">Vous êtes ancien participant et n'avez plus votre accès ?</p>
    <a class="btn btn--primary btn--md" href="/contact/" style="align-self:flex-start">Contactez-nous</a>
  </div>
  <!-- TODO : brancher le lien réel de la communauté / espace membre quand il existera -->
</section>`;
}

export default {
  path: '/ressources/',
  title: seo.ressources.title,
  description: seo.ressources.description,
  navKey: 'ressources',
  noindex: true,
  jsonLd: [orgJsonLd()],
  content: [headSection(), accesSection()].join('\n\n'),
};
