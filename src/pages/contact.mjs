import { esc } from '../html.mjs';
import { site, cursus, seo, orgJsonLd } from '../data.mjs';

const adr = site.adresseAdministrative;

// Le sujet « Réunion » est dérivé des données de l'événement ; les liens
// « S'inscrire » du calendrier le présélectionnent via /contact/?sujet=reunion.
const sujets = [
  { label: 'Renseignement sur un cursus' },
  { label: `Inscription · ${cursus.reunion.title} (${cursus.reunion.sessions[0].parts[0].dates})`, key: 'reunion' },
  { label: 'Financement, convention' },
  { label: 'Accessibilité' },
  { label: 'Ressources, accès communauté' },
  { label: 'Autre' },
].map(s => `<option${s.key ? ` data-key="${s.key}"` : ''}>${esc(s.label)}</option>`).join('');

const coordonnees = `<div class="stack muted" style="font-size:15px;line-height:1.6">
    <div class="rule-top" style="padding:14px 0">
      <span style="color:var(--ink);display:block">SAPO CLINIQUE — adresse administrative</span>
      ${esc(adr.nom)}<br>${esc(adr.rue)}<br>${esc(adr.cp)} ${esc(adr.ville)}
    </div>
    <div class="rule-top" style="padding:14px 0">
      <span style="color:var(--ink);display:block">Lieu des formations</span>
      ${esc(site.lieuFormation)}
    </div>
    <div class="rule-top" style="padding:14px 0">
      <span style="color:var(--ink);display:block">E-mail</span>
      <a class="link-u" href="mailto:${esc(site.email)}">${esc(site.email)}</a>
    </div>
  </div>`;

const aside = `<div class="gc-1-5 stack gap-7" style="padding-right:24px">
  <h1 class="page-title">Contact</h1>
  <p class="muted" style="font-size:15px;line-height:1.6">Une question sur un cursus, un financement ou une adaptation d'accueil ?</p>
  ${coordonnees}
</div>`;

const form = `<form id="contact-form" class="gc-6-7 card card--form stack" style="gap:18px" method="post" novalidate>
  <noscript><p class="small muted">Ce formulaire nécessite JavaScript. Sans JavaScript, écrivez-nous simplement à <a class="link-u" href="mailto:${esc(site.email)}">${esc(site.email)}</a>.</p></noscript>

  <div class="field-grid">
    <div class="field">
      <label for="c-nom">Nom</label>
      <input type="text" id="c-nom" name="nom" autocomplete="name" required>
    </div>
    <div class="field">
      <label for="c-email">E-mail</label>
      <input type="email" id="c-email" name="email" autocomplete="email" required>
    </div>
  </div>
  <div class="field">
    <label for="c-sujet">Sujet</label>
    <select id="c-sujet" name="sujet">${sujets}</select>
  </div>
  <div class="field">
    <label for="c-message">Message</label>
    <textarea id="c-message" name="message" rows="5" required></textarea>
  </div>

  <p class="small faint">Ce formulaire ouvre votre messagerie avec le message prérédigé — aucune donnée n'est stockée sur ce site.</p>
  <button class="btn-submit" type="submit">Envoyer</button>
  <p id="contact-sent" role="status" hidden class="small" style="color:var(--accent)">Votre messagerie s'est ouverte avec votre message. Si ce n'est pas le cas, écrivez-nous directement à ${esc(site.email)}.</p>
</form>`;

export default {
  path: '/contact/',
  title: seo.contact.title,
  description: seo.contact.description,
  navKey: 'contact',
  jsonLd: [orgJsonLd()],
  content: `<div class="container section--top grid" style="row-gap:40px;align-items:start">
${aside}
${form}
</div>`,
};
