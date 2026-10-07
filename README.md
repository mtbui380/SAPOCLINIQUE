# Site SAPO Clinique

Site statique de [SAPO Clinique](https://www.sapoclinique.com) — organisme de formation
en odontologie chirurgicale et parodontologie. Généré sans framework ni dépendance, servi par
GitHub Pages depuis le dossier `docs/`.

## Modifier le site

1. **Tout le contenu** (dates, cursus, textes, SEO) vit dans **`src/data.mjs`** —
   c'est la source de vérité unique. Une date de session, un tarif, une FAQ :
   tout se change là, une seule fois.
2. La mise en page de chaque page est dans `src/pages/*.mjs` ; l'enveloppe commune
   (header, footer, balises SEO) dans `src/layout.mjs` ; le style dans
   `docs/assets/css/styles.css` ; les interactions dans `docs/assets/js/site.js`.
   Les conventions sont documentées dans `src/SPEC.md`.
3. Régénérer le site :

```bash
node build.mjs
```

4. Commiter et pousser : GitHub Pages publie automatiquement le contenu de `docs/`.

## Déploiement (à faire une fois)

1. Sur GitHub : **Settings → Pages → Source : Deploy from a branch → `main` / `/docs`**.
2. Le site est alors servi sur `https://mtbui380.github.io/SAPOCLINIQUE/`.
   **Note** : `docs/` est actuellement généré avec `node build.mjs --base /SAPOCLINIQUE`
   pour cette préversion. Le jour de la bascule vers www.sapoclinique.com,
   régénérer SANS l'option (`node build.mjs`) et pousser.
3. **Domaine personnalisé** (quand vous êtes prêt à quitter Wix) :
   - Settings → Pages → Custom domain : `www.sapoclinique.com` (GitHub créera le fichier `docs/CNAME`) ;
   - chez votre registrar, faire pointer `www` en CNAME vers `mtbui380.github.io`
     et le domaine racine vers les IP GitHub Pages (185.199.108.153 …111.153) ;
   - cocher « Enforce HTTPS » une fois le certificat émis.
4. Les anciennes URL Wix (`/home-1`, `/home-1-1`…) sont redirigées vers les
   nouvelles pages (`docs/home-1/index.html`, etc.).

## Formulaires

**Préinscription** : fonctionne sans serveur, le formulaire ouvre la messagerie du
visiteur avec un e-mail prérédigé vers `contact@sapoclinique.com`. Aucune donnée n'est
stockée sur le site (choix RGPD : les pièces du dossier, dont le certificat de
vaccination — donnée de santé — transitent par e-mail, pas par le site).

**Contact** : même fonctionnement par défaut (mailto). Pour un envoi direct à
`contact@sapoclinique.com` sans passer par la messagerie du visiteur, le formulaire est
prêt pour [Formspree](https://formspree.io) :

1. Créer un compte Formspree avec l'adresse `contact@sapoclinique.com` (c'est elle qui
   recevra les messages), puis un formulaire « Contact » ; copier son URL
   `https://formspree.io/f/xxxxxxxx`.
2. Dans les réglages Formspree du formulaire : **désactiver reCAPTCHA** (incompatible
   avec l'envoi en arrière-plan utilisé par le site), laisser le filtre anti-spam actif,
   et restreindre les domaines autorisés à `www.sapoclinique.com` et
   `mtbui380.github.io`.
3. Renseigner `contactEndpoint` dans `src/data.mjs` avec cette URL, reconstruire
   (`node build.mjs`), commiter. La page Contact, la CSP (`connect-src`) et les mentions
   légales (sous-traitant Formspree) s'adaptent automatiquement.

Protections anti-spam côté site : champ piège invisible (`_gotcha`, également reconnu
par Formspree), délai minimal de 3 s entre l'affichage et l'envoi, bouton bloqué pendant
l'envoi. Le plan gratuit Formspree accepte 50 messages par mois ; au-delà, passer au
plan payant ou changer de service (le code n'est lié à Formspree que par l'URL et le
nom du champ piège).

## Reste à fournir / brancher (TODO)

- [ ] **Mentions légales** : forme juridique, SIREN, directeur de la publication,
      durée de conservation des dossiers (`src/pages/mentions-legales.mjs`).
- [ ] **CGV** : document à rédiger et à lier.
- [ ] **Tarifs** : affichés « Sur demande » — publier les prix quand ils seront arrêtés
      (`price` dans `src/data.mjs`).
- [ ] **Équipe** : portrait de Mélanie Blois si souhaité (`equipe` dans `src/data.mjs`, carte aux
      initiales en attendant) ; vérifier l'orthographe et les accents des formateurs occasionnels.
- [ ] **Témoignages** : trois citations en ligne sur l'accueil (prénom + cursus, `temoignages`
      dans `src/data.mjs`) — conserver l'accord écrit de chaque auteur.
- [ ] **Instagram** : URL réelle du compte (`site.instagram` dans `src/data.mjs`).
- [ ] **Certificat Qualiopi** : publier le PDF et le lier depuis l'accueil.
- [ ] **Espace anciens** : lien réel de la communauté (`src/pages/ressources.mjs`).
- [ ] **Adresses** : vérifier l'articulation siège (Avrillé) / adresse administrative
      (Carqueiranne) — voir pages Contact et Mentions légales.
- [ ] **Google Search Console** + Google Business Profile (voir `SEO.md` du handoff).

## Origine

Design : maquette « Sapo Clinique v2 » réalisée avec Claude Design (bundle
`Refonte Sapo Clinique-handoff.zip`), auditée puis industrialisée : pages statiques
multi-URL, accessibilité WCAG AA, médias compressés (vidéo 19 Mo → 1,3 Mo),
polices auto-hébergées (conformité CNIL), CSP stricte, données structurées
Schema.org statiques, sitemap + redirections Wix.
