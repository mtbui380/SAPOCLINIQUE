// ============================================================================
// Générateur du site SAPO Clinique — aucune dépendance.
//   node build.mjs
// Lit src/pages/*.mjs et écrit le site complet dans docs/ (servi par
// GitHub Pages). Génère aussi sitemap.xml, robots.txt, 404.html et les
// redirections depuis les anciennes URL Wix.
// ============================================================================
import { mkdirSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderPage } from './src/layout.mjs';
import { site } from './src/data.mjs';
import { esc } from './src/html.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const OUT = join(ROOT, 'docs');

// --base /SAPOCLINIQUE : préfixe les URL internes (préversion GitHub Pages
// sur mtbui380.github.io/SAPOCLINIQUE avant bascule du domaine).
// Sans option : build de production, servi à la racine de www.sapoclinique.com.
const baseIdx = process.argv.indexOf('--base');
const BASE = baseIdx > -1 ? process.argv[baseIdx + 1].replace(/\/$/, '') : '';
function applyBase(html) {
  if (!BASE) return html;
  return html
    .replaceAll('content="0; url=/', `content="0; url=${BASE}/`)
    .replaceAll('href="/', `href="${BASE}/`)
    .replaceAll('src="/', `src="${BASE}/`)
    .replaceAll('poster="/', `poster="${BASE}/`)
    .replaceAll('srcset="/', `srcset="${BASE}/`)
    .replaceAll(', /assets/', `, ${BASE}/assets/`)
    .replaceAll(`href="${BASE}//`, 'href="//');
}

// ---- Collecte des pages ----------------------------------------------------
const pages = [];
const pagesDir = join(ROOT, 'src', 'pages');
for (const f of readdirSync(pagesDir).sort()) {
  if (!f.endsWith('.mjs')) continue;
  const mod = await import(`./src/pages/${f}`);
  const val = mod.default;
  for (const p of Array.isArray(val) ? val : [val]) pages.push(p);
}

// ---- Écriture --------------------------------------------------------------
function writePage(path, html) {
  const file = path.endsWith('.html') ? join(OUT, path) : join(OUT, path, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, applyBase(html));
  console.log('  ✓', path);
}

for (const page of pages) {
  writePage(page.path, renderPage(page));
}

// ---- Redirections depuis les anciennes URL Wix (SEO.md) --------------------
const redirects = {
  '/home-1/': '/cursus/chirurgie/',
  '/home-1-1/': '/cursus/parodontologie/',
  '/home-1-1-2/': '/cursus/masterclass-parodontologie/',
  '/home-1-1-1/': '/cursus/assistante/',
  '/home-2/': '/inscription/',
};
for (const [from, to] of Object.entries(redirects)) {
  const target = site.baseUrl + to;
  writePage(from, `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta http-equiv="refresh" content="0; url=${esc(to)}">
<link rel="canonical" href="${esc(target)}">
<meta name="robots" content="noindex">
<title>Redirection…</title>
</head>
<body>
<p>Cette page a déménagé : <a href="${esc(to)}">${esc(target)}</a></p>
</body>
</html>
`);
}

// ---- 404 -------------------------------------------------------------------
writePage('404.html', renderPage({
  path: '/404.html',
  title: 'Page introuvable · SAPO Clinique',
  description: "La page demandée n'existe pas ou a été déplacée.",
  navKey: null,
  noindex: true,
  content: `<div class="container section--top stack gap-6">
  <h1 class="page-title">Page introuvable</h1>
  <p class="lead">La page demandée n'existe pas ou a été déplacée.</p>
  <p><a class="btn btn--primary" href="/">Retour à l'accueil</a></p>
</div>`,
}));

// ---- robots.txt & sitemap.xml ---------------------------------------------
writeFileSync(join(OUT, 'robots.txt'), `User-agent: *
Allow: /

Sitemap: ${site.baseUrl}/sitemap.xml
`);

const urls = pages
  .filter(p => !p.noindex)
  .map(p => `  <url><loc>${site.baseUrl}${p.path}</loc></url>`)
  .join('\n');
writeFileSync(join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`);

// ---- Fichiers techniques GitHub Pages --------------------------------------
writeFileSync(join(OUT, '.nojekyll'), '');

console.log(`\nSite généré dans docs/ — ${pages.length} pages + ${Object.keys(redirects).length} redirections.`);
