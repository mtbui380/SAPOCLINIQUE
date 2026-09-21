// Serveur de prévisualisation locale — aucune dépendance.
//   node serve.mjs        → http://localhost:8035
// Sert le dossier docs/ comme le ferait GitHub Pages (index.html par
// répertoire, 404.html pour les pages introuvables).
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname, dirname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const DOCS = join(dirname(fileURLToPath(import.meta.url)), 'docs');
const PORT = Number(process.env.PORT || 8035);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.mp4': 'video/mp4',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.ico': 'image/x-icon',
};

createServer(async (req, res) => {
  try {
    let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (path.endsWith('/')) path += 'index.html';
    const file = normalize(join(DOCS, path));
    if (!file.startsWith(DOCS)) throw new Error('forbidden');
    let body, status = 200, type = TYPES[extname(file)] || 'application/octet-stream';
    try {
      body = await readFile(file);
    } catch {
      // Répertoire sans / final → redirection, sinon 404.html
      try {
        await readFile(join(file, 'index.html'));
        res.writeHead(301, { Location: path + '/' });
        res.end();
        return;
      } catch { /* vraie 404 */ }
      status = 404;
      type = TYPES['.html'];
      body = await readFile(join(DOCS, '404.html'));
    }
    res.writeHead(status, { 'Content-Type': type });
    res.end(body);
  } catch {
    res.writeHead(500);
    res.end('Erreur serveur');
  }
}).listen(PORT, () => console.log(`SAPO Clinique → http://localhost:${PORT}`));
