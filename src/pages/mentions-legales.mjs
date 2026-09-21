import { esc } from '../html.mjs';
import { site, seo, orgJsonLd } from '../data.mjs';

// Rangée libellé / contenu. `row-lbl` porte déjà la ligne de séparation basse :
// seule la première rangée reçoit `rule-top-strong` pour ouvrir la liste.
function row(id, label, body, first = false) {
  return `<div class="row-lbl row-lbl--wide${first ? ' rule-top-strong' : ''}" id="${id}">
      <h2 class="row-lbl__h">${esc(label)}</h2>
      <div class="muted stack gap-3" style="line-height:1.7">
        ${body}
      </div>
    </div>`;
}

const editeur = row('editeur', 'Éditeur', `<p>SAPO CLINIQUE · ${esc(site.adresseSiege.rue)}, ${esc(site.adresseSiege.cp)} ${esc(site.adresseSiege.ville)}.</p>
        <p>Déclaration d'activité enregistrée sous le numéro ${esc(site.qualiopi.nda)} auprès du préfet de la région Pays de la Loire. Cet enregistrement ne vaut pas agrément de l'État (art. L.6352-12 du Code du travail). Certifié Qualiopi au titre des actions de formation, certificat ${esc(site.qualiopi.certificat)}.</p>
        <p>Forme juridique : [à compléter] · SIREN : [à compléter] · RCS et capital social (si société) : [à compléter] · Directeur de la publication : [à compléter] · Téléphone : [à compléter]</p><!-- TODO : compléter forme juridique, SIREN, RCS/capital, directeur de la publication et téléphone (obligatoires, LCEN art. 6-III) -->`, true);

const hebergement = row('hebergement', 'Hébergement', `<p>GitHub Pages — GitHub, Inc., 88 Colin P. Kelly Jr Street, San Francisco, CA 94107, États-Unis — <a class="link-u" href="https://pages.github.com">pages.github.com</a>.</p>
        <p>L'hébergeur traite les données techniques de connexion (adresse IP, journaux serveur) nécessaires à la fourniture du site ; GitHub, Inc. est certifié au titre du cadre de protection des données UE–États-Unis (Data Privacy Framework).</p>`);

const donnees = row('donnees', 'Données personnelles', `<p>Responsable de traitement : SAPO CLINIQUE, coordonnées ci-dessus. Les formulaires de ce site ouvrent la messagerie du visiteur avec un message prérempli : aucune donnée n'est collectée ni stockée par le site lui-même.</p>
        <p>Les données que vous nous transmettez par e-mail — identité, coordonnées, ainsi que les pièces du dossier d'inscription, dont le certificat de vaccination contre l'hépatite B (donnée de santé) — servent uniquement au traitement de votre demande, à l'établissement de la convention de formation et au respect de nos obligations liées à la certification Qualiopi.</p>
        <p>Base légale : mesures précontractuelles et exécution du contrat de formation (art. 6.1.b du RGPD) ; consentement explicite pour le certificat de vaccination (art. 9.2.a). Destinataires : l'équipe SAPO CLINIQUE uniquement ; aucune donnée n'est cédée ni transmise à des tiers.</p>
        <p>Durée de conservation : durée de la relation de formation, puis archivage au titre des obligations légales ([à préciser]).</p><!-- TODO : préciser les durées d'archivage légal -->
        <p>Vous disposez de droits d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité sur vos données : écrivez à <a class="link-u" href="mailto:${esc(site.email)}">${esc(site.email)}</a>. Vous pouvez également adresser une réclamation à la CNIL (<a class="link-u" href="https://www.cnil.fr">cnil.fr</a>).</p>`);

const cookies = row('cookies', 'Cookies', `<p>Ce site n'utilise aucun cookie ni traceur. Les polices et médias sont hébergés sur ce site ; aucune requête n'est envoyée à des services tiers.</p>`);

const cgv = row('cgv', 'Conditions générales de vente', `<p>Modalités d'inscription, d'acompte, d'annulation et de report : [document à fournir]. Conditions particulières d'annulation affichées sur la page <a class="link-u" href="/inscription/">Inscription</a>.</p><!-- TODO : rédiger et publier les conditions générales de vente -->`);

const credits = row('credits', 'Crédits', `<p>Photographies SAPO CLINIQUE. Site réalisé sans framework — polices Archivo et Sora (SIL Open Font License), auto-hébergées.</p>`);

export default {
  path: '/mentions-legales/',
  title: seo.mentions.title,
  description: seo.mentions.description,
  navKey: null,
  jsonLd: [orgJsonLd()],
  content: `<section class="container section--top grid" style="row-gap:40px">
  <h1 class="page-title gc-full">Mentions légales et confidentialité</h1>
  <div class="gc-1-8">
    ${[editeur, hebergement, donnees, cookies, cgv, credits].join('\n    ')}
  </div>
</section>`,
};
