import { esc } from '../html.mjs';
import { site, cursus, seo, orgJsonLd } from '../data.mjs';

const adr = site.adresseAdministrative;
const direct = Boolean(site.contactEndpoint); // envoi direct (Formspree) ou mailto

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

const form = `<form id="contact-form" class="gc-6-7 card card--form stack" style="gap:18px" method="post" novalidate${direct ? ` data-endpoint="${esc(site.contactEndpoint)}"` : ''}>
  <noscript><p class="small muted">Ce formulaire nécessite JavaScript. Sans JavaScript, écrivez-nous simplement à <a class="link-u" href="mailto:${esc(site.email)}">${esc(site.email)}</a>.</p></noscript>
  <!-- Champ piège anti-spam : invisible et hors tabulation ; un robot qui le remplit
       voit son envoi ignoré (côté site et côté Formspree, champ _gotcha). -->
  <div class="hp" aria-hidden="true"><label for="c-site">Ne pas remplir</label><input type="text" id="c-site" name="_gotcha" tabindex="-1" autocomplete="off"></div>

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

  ${direct
    ? `<p class="small faint">Votre message est transmis à ${esc(site.email)} par notre prestataire d'envoi (Formspree). Il ne sert qu'à vous répondre — <a class="link-u" href="/mentions-legales/#donnees">politique de confidentialité</a>.</p>`
    : `<p class="small faint">Ce formulaire ouvre votre messagerie avec le message prérédigé — aucune donnée n'est stockée sur ce site.</p>`}
  <button class="btn-submit" type="submit">Envoyer</button>
  <p id="contact-sent" role="status" hidden class="small" style="color:var(--accent)">${direct
    ? 'Merci, votre message a bien été envoyé. Nous vous répondons dans les meilleurs délais.'
    : `Votre messagerie s'est ouverte avec votre message. Si ce n'est pas le cas, écrivez-nous directement à ${esc(site.email)}.`}</p>
  <p id="contact-error" role="alert" hidden class="form-error">L'envoi a échoué. Réessayez dans un instant, ou écrivez-nous directement à <a class="link-u" href="mailto:${esc(site.email)}">${esc(site.email)}</a>.</p>
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
