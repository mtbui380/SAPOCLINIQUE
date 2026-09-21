import { esc } from '../html.mjs';
import { seo, formOptions, buildFormData, orgJsonLd } from '../data.mjs';

const formData = buildFormData();
const defaultKey = 'chirurgie';
const def = formData[defaultKey];

function field({ id, label, name, type = 'text', required = false, autocomplete, inputmode, placeholder, hint }) {
  const req = required ? ' required' : '';
  const ac = autocomplete ? ` autocomplete="${autocomplete}"` : '';
  const im = inputmode ? ` inputmode="${inputmode}"` : '';
  const ph = placeholder ? ` placeholder="${esc(placeholder)}"` : '';
  return `<div class="field">
    <label for="${id}">${esc(label)}</label>
    <input type="${type}" id="${id}" name="${name}"${req}${ac}${im}${ph}${hint ? ` aria-describedby="${id}-hint"` : ''}>
    ${hint ? `<p class="smaller faint" id="${id}-hint">${esc(hint)}</p>` : ''}
  </div>`;
}

const recapParts = def.sessions[0].parts.map(pt =>
  `<div class="row-dates"><span class="muted">${esc(pt.label)}</span><span>${esc(pt.dates)}</span></div>`
).join('\n        ');

const aside = `<div class="gc-1-5 sticky-col stack gap-7" style="padding-right:24px">
  <h1 class="page-title">Inscription</h1>
  <p class="muted">Préinscrivez-vous en quelques minutes. Vous recevez une confirmation par e-mail, puis, après validation de votre dossier, le lien de règlement de l'acompte ou, en cas de prise en charge, le devis et la convention.</p>
  <div class="stack rule-top-strong">
    <p id="recap-title" style="padding:20px 0 4px;font-size:20px;line-height:1.2">${esc(def.title)}</p>
    <p id="recap-format" class="small muted" style="padding-bottom:16px">${esc(def.format)}</p>
    <div id="recap-dates" class="stack gap-3 rule-top tnum" style="padding:14px 0">
        ${recapParts}
    </div>
    <div class="rule-top"></div>
  </div>
  <div class="stack gap-2 small muted" style="line-height:1.6">
    <span style="color:var(--ink);padding-top:20px">Conditions particulières</span>
    <span>Renoncement à plus d'un mois du début : 50 % du coût dû.<br>Entre un mois et deux semaines : 70 %.<br>À moins de deux semaines : 100 %.<br>Aucun remboursement en cours de cursus.<br>Confirmation définitive par e-mail à réception du dossier complet.</span>
  </div>
</div>`;

const cursusOptions = formOptions.map(o =>
  `<option value="${esc(o.value)}"${o.value === defaultKey ? ' selected' : ''}>${esc(o.label)}</option>`
).join('');

const sessionOptions = def.sessions.map((s, i) =>
  `<option value="${esc(s.value)}"${i === 0 ? ' selected' : ''}>${esc(s.label)}</option>`
).join('');

const specialites = ['Chirurgien-dentiste omnipraticien', 'Chirurgie orale', 'Parodontologie', 'Implantologie', 'Assistante dentaire', 'Étudiant / interne', 'Autre']
  .map(s => `<option>${esc(s)}</option>`).join('');

const financements = ['Personnel · en 1 fois', 'Personnel · en plusieurs fois', 'Prise en charge FIF-PL', 'Prise en charge OPCO / employeur', 'Je ne sais pas encore']
  .map(s => `<option>${esc(s)}</option>`).join('');

const formPanel = `<div class="gc-6-7" data-form-panel>
<form id="inscription-form" class="card card--form stack" style="gap:22px" method="post" novalidate>
  <noscript><p class="small muted">Ce formulaire nécessite JavaScript. Sans JavaScript, envoyez simplement votre demande à <a class="link-u" href="mailto:contact@sapoclinique.com">contact@sapoclinique.com</a> en précisant la formation et la session souhaitées.</p></noscript>

  <div class="field">
    <label for="f-cursus">Formation</label>
    <select id="f-cursus" name="cursus" required>${cursusOptions}</select>
  </div>
  <div class="field">
    <label for="f-promo">Session</label>
    <select id="f-promo" name="promo" required>${sessionOptions}</select>
  </div>

  <div class="field-grid">
    ${field({ id: 'f-prenom', label: 'Prénom', name: 'prenom', required: true, autocomplete: 'given-name' })}
    ${field({ id: 'f-nom', label: 'Nom', name: 'nom', required: true, autocomplete: 'family-name' })}
  </div>
  <div class="field-grid">
    ${field({ id: 'f-email', label: 'E-mail', name: 'email', type: 'email', required: true, autocomplete: 'email' })}
    ${field({ id: 'f-tel', label: 'Téléphone', name: 'tel', type: 'tel', autocomplete: 'tel' })}
  </div>
  <div class="field-grid">
    <div class="field">
      <label for="f-specialite">Spécialité</label>
      <select id="f-specialite" name="specialite">${specialites}</select>
    </div>
    ${field({ id: 'f-naissance', label: 'Date de naissance', name: 'naissance', type: 'date', autocomplete: 'bday' })}
  </div>
  ${field({ id: 'f-adresse', label: 'Adresse', name: 'adresse', autocomplete: 'address-line1', placeholder: 'N° et rue' })}
  <div class="field-grid--3">
    ${field({ id: 'f-cp', label: 'Code postal', name: 'cp', autocomplete: 'postal-code' })}
    ${field({ id: 'f-ville', label: 'Ville', name: 'ville', autocomplete: 'address-level2' })}
    ${field({ id: 'f-pays', label: 'Pays', name: 'pays', autocomplete: 'country-name', placeholder: 'France' })}
  </div>

  <p class="form-sep">Structure payante</p>
  <div class="field-grid">
    ${field({ id: 'f-structure', label: 'Structure (SCP, SCM, SEL, nom propre…)', name: 'structure', autocomplete: 'organization' })}
    ${field({ id: 'f-siren', label: 'N° SIREN', name: 'siren', inputmode: 'numeric', placeholder: '9 chiffres' })}
  </div>
  <div class="field">
    <label for="f-financement">Règlement</label>
    <select id="f-financement" name="financement">${financements}</select>
  </div>

  <p class="form-sep">Votre dossier</p>
  <p class="small muted">Après l'envoi de votre préinscription, complétez votre dossier en adressant par e-mail à <a class="link-u" href="mailto:contact@sapoclinique.com">contact@sapoclinique.com</a> : votre <strong style="color:var(--ink);font-weight:500">CV</strong>, une <strong style="color:var(--ink);font-weight:500">lettre de motivation</strong> et, pour le cursus Chirurgie, votre <strong style="color:var(--ink);font-weight:500">certificat de vaccination contre l'hépatite B</strong>. Seuls les dossiers complets sont traités.</p>

  <div class="field">
    <label for="f-message">Message <span class="faint">(facultatif)</span></label>
    <textarea id="f-message" name="message" rows="3" placeholder="Besoins d'adaptation, questions…"></textarea>
  </div>

  <label class="check-line">
    <input type="checkbox" name="cgv" required>
    <span>J'ai pris connaissance des conditions particulières d'annulation affichées sur cette page et des <a class="link-u" href="/mentions-legales/#cgv">conditions générales de vente</a>, et je les accepte.</span>
  </label>
  <p class="small faint">Les informations de ce formulaire sont utilisées uniquement pour le traitement de votre demande d'inscription et l'établissement de la convention de formation. <a class="link-u" href="/mentions-legales/#donnees">Politique de confidentialité</a></p>

  <p class="form-error" id="form-error" role="alert" hidden>L'envoi a échoué. Réessayez, ou écrivez-nous directement à contact@sapoclinique.com.</p>
  <button class="btn-submit" type="submit">Envoyer ma préinscription</button>
</form>
</div>`;

const confirmPanel = `<div class="gc-6-7 card card--form stack gap-6" id="inscription-confirm" hidden>
  <p class="eyebrow eyebrow--accent">Étape 01 terminée</p>
  <h2 class="h2-lg" style="font-size:clamp(26px,3vw,34px)">Merci. Votre demande est prête à partir.</h2>
  <p class="muted" id="confirm-intro">Votre messagerie s'est ouverte avec votre demande de préinscription prérédigée — vérifiez le contenu puis envoyez l'e-mail. Pensez à joindre les pièces de votre dossier (CV, lettre de motivation, et certificat de vaccination hépatite B pour le cursus Chirurgie).</p>
  <div id="confirm-recap" class="stack"></div>
  <p class="small faint">Après validation de votre dossier, vous recevrez le lien de règlement sécurisé de l'acompte ou, en cas de prise en charge, le devis et la convention. Vous préférez un virement ? Précisez-le simplement dans votre e-mail.</p>
  <button type="button" class="link-u small muted" id="confirm-again" style="align-self:flex-start;text-align:left">Modifier ma demande</button>
</div>`;

export default {
  path: '/inscription/',
  title: seo.inscription.title,
  description: seo.inscription.description,
  navKey: null,
  jsonLd: [orgJsonLd()],
  content: `<div class="container section--top grid" style="row-gap:40px;align-items:start">
${aside}
${formPanel}
${confirmPanel}
</div>
<script type="application/json" id="form-data">${JSON.stringify(formData)}</script>`,
};
