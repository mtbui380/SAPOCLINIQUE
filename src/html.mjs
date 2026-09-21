// Petits utilitaires de génération HTML — zéro dépendance.

/** Échappe une chaîne pour insertion dans du HTML (texte ou attribut). */
export function esc(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

/**
 * Image responsive : <picture> WebP + repli JPEG.
 * name  : base du fichier dans /assets/img (ex. "tp-sutures")
 * alt   : texte alternatif (obligatoire ; "" si décorative)
 * widths: tailles générées (défaut [800, 1600])
 * sizes : attribut sizes (défaut "100vw")
 * cls   : classes CSS de l'<img> (ex. "ph ar-32")
 * eager : true → loading eager + fetchpriority high (au-dessus de la ligne de flottaison)
 */
export function img({ name, alt, widths = [800, 1600], sizes = '100vw', cls = '', eager = false }) {
  const src = (ext, w) => widths.length > 1 ? `/assets/img/${name}-${w}.${ext}` : `/assets/img/${name}.${ext}`;
  const srcset = (ext) => widths.map(w => `${src(ext, w)} ${w}w`).join(', ');
  const biggest = widths[widths.length - 1];
  const loading = eager ? 'loading="eager" fetchpriority="high"' : 'loading="lazy" decoding="async"';
  return `<picture>` +
    `<source type="image/webp" srcset="${srcset('webp')}" sizes="${esc(sizes)}">` +
    `<img src="${src('jpg', biggest)}" srcset="${srcset('jpg')}" sizes="${esc(sizes)}" alt="${esc(alt)}"${cls ? ` class="${esc(cls)}"` : ''} ${loading}>` +
    `</picture>`;
}

/** Flèche longue (liens de liste). aria-hidden : décorative. */
export function arrow() {
  return `<svg width="28" height="12" viewBox="0 0 28 12" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true" focusable="false"><path d="M0 6h26M21 1l5 5-5 5"></path></svg>`;
}

/** Chevron accordéon (+ / −) — géré en CSS via details[open]. */
export function accIcon() {
  return `<svg class="acc-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true" focusable="false"><path d="M0 8h16"></path><path class="acc-icon-v" d="M8 0v16"></path></svg>`;
}

/** Lien « S'inscrire » vers la préinscription avec cursus/session présélectionnés. */
export function inscriptionHref(formKey, session) {
  const q = new URLSearchParams();
  if (formKey) q.set('cursus', formKey);
  if (session) q.set('session', session);
  const qs = q.toString();
  return `/inscription/${qs ? '?' + qs : ''}`;
}
