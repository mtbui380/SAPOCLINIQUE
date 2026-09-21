import { esc } from './html.mjs';
import { site } from './data.mjs';

const CSP = [
  "default-src 'none'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",   // styles inline de mise en page ; les scripts restent 'self' strict
  "img-src 'self' data:",
  "font-src 'self'",
  "media-src 'self'",
  "connect-src 'self'",   // ajouter ici l'origine du service de formulaires si utilisé
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

const NAV = [
  { href: '/cursus/', label: 'Cursus', key: 'cursus' },
  { href: '/calendrier/', label: 'Calendrier', key: 'calendrier' },
  { href: '/qui-sommes-nous/', label: 'Qui sommes-nous', key: 'qui' },
  { href: '/mediatheque/', label: 'Médiathèque', key: 'mediatheque' },
  { href: '/ressources/', label: 'Ressources', key: 'ressources' },
];

function navLinks(navKey, mobile) {
  const links = mobile ? [...NAV, { href: '/contact/', label: 'Contact', key: 'contact' }] : NAV;
  return links
    .map(l => `<a href="${l.href}"${l.key === navKey ? ' aria-current="page"' : ''}>${esc(l.label)}</a>`)
    .join('');
}

function header(navKey) {
  return `<header class="site-header">
  <div class="site-header__inner">
    <a class="site-header__logo" href="/" aria-label="SAPO Clinique — accueil"><img src="/assets/img/logo-white.png" alt="" width="177" height="30"></a>
    <div class="site-header__right">
      <nav class="nav-desktop" aria-label="Navigation principale">${navLinks(navKey, false)}</nav>
      <a class="btn-inscription" href="/inscription/">Inscription</a>
      <button class="nav-burger" type="button" aria-expanded="false" aria-controls="nav-mobile" aria-label="Menu">
        <span></span><span></span>
      </button>
    </div>
  </div>
  <nav class="nav-mobile" id="nav-mobile" aria-label="Navigation mobile">${navLinks(navKey, true)}</nav>
</header>`;
}

function footer() {
  const q = site.qualiopi;
  return `<footer class="site-footer">
  <div class="container grid site-footer__grid">
    <div class="gc-1-4"><span class="site-footer__head">${esc(site.legalName)}</span>${esc(site.descriptionCourte)}</div>
    <div class="gc-5-3"><span class="site-footer__head">Formations</span>
      <a href="/cursus/chirurgie/">Cursus Chirurgie</a>
      <a href="/cursus/parodontologie/">Cursus Parodontologie</a>
      <a href="/cursus/masterclass-parodontologie/">Masterclass Parodontologie</a>
      <a href="/cursus/assistante/">Assistante</a>
    </div>
    <div class="gc-8-2"><span class="site-footer__head">Site</span>
      <a href="/calendrier/">Calendrier</a>
      <a href="/qui-sommes-nous/">Qui sommes-nous</a>
      <a href="/mediatheque/">Médiathèque</a>
      <a href="/ressources/">Ressources</a>
      <a href="/contact/">Contact</a>
    </div>
    <div class="gc-10-3 tnum"><span class="site-footer__head">Organisme de formation</span>
      Certifié Qualiopi · ${esc(q.certificat)}<br>
      <a class="link-u" href="/mentions-legales/#editeur">NDA ${esc(q.nda)}</a><br>
      Accessible PSH · Référent ${esc(site.referentHandicap)}<br>
      <a class="link-u" href="/mentions-legales/">Mentions légales</a>
    </div>
  </div>
  <div class="container site-footer__bottom">
    <span>Suivez-nous</span>
    <a class="social-btn" href="${esc(site.instagram)}" target="_blank" rel="noopener" aria-label="Instagram (nouvelle fenêtre)">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"></circle></svg>
    </a>
  </div>
</footer>`;
}

/**
 * Enveloppe une page complète.
 * page : { path, title, description, navKey, noindex?, jsonLd?, content, mainClass? }
 */
export function renderPage(page) {
  const url = site.baseUrl + page.path;
  const jsonLd = page.jsonLd
    ? `\n<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': page.jsonLd })}</script>`
    : '';
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="${CSP}">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
${page.noindex ? '<meta name="robots" content="noindex, nofollow">\n' : ''}<link rel="canonical" href="${esc(url)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="SAPO Clinique">
<meta property="og:locale" content="fr_FR">
<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:image" content="${site.baseUrl}/assets/img/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="preload" href="/assets/fonts/sora-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/archivo-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/styles.css">
<link rel="sitemap" href="/sitemap.xml">${jsonLd}
</head>
<body>
<a class="skip-link" href="#contenu">Aller au contenu</a>
${header(page.navKey)}
<main id="contenu"${page.mainClass ? ` class="${page.mainClass}"` : ''}>
${page.content}
</main>
${footer()}
<script src="/assets/js/site.js" defer></script>
</body>
</html>
`;
}
