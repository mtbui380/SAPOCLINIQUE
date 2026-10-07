/* ============================================================================
   SAPO Clinique — améliorations progressives (aucune dépendance).
   Le site reste entièrement lisible et navigable sans JavaScript.
   ========================================================================== */
(function () {
  'use strict';

  /* --------------------------------------------------------------------
     Configuration formulaires.
     FORM_ENDPOINT : laisser vide pour l'envoi par e-mail (mailto).
     Pour brancher un service de formulaires (Formspree, etc.), renseigner
     l'URL du point de terminaison — et : 1) ajouter son origine à la CSP
     (balise <meta http-equiv="Content-Security-Policy">, directive
     connect-src) dans src/layout.mjs ; 2) mettre à jour la page Mentions
     légales (sections Données personnelles et Cookies : le site enverra
     alors des données à un tiers) et la note sous le formulaire de
     contact ; puis reconstruire (node build.mjs).
     -------------------------------------------------------------------- */
  var FORM_ENDPOINT = '';
  var CONTACT_EMAIL = 'contact@sapoclinique.com';

  /* ------------------------------ Menu mobile ------------------------- */
  var burger = document.querySelector('.nav-burger');
  var mobileNav = document.getElementById('nav-mobile');
  if (burger && mobileNav) {
    burger.addEventListener('click', function () {
      var open = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!open));
      mobileNav.classList.toggle('is-open', !open);
    });
  }

  /* ------------------------- Vidéo d'accueil --------------------------
     Autoplay coupé + bouton lecture/pause (WCAG 2.2.2). L'autoplay est
     désactivé si l'utilisateur préfère réduire les animations.          */
  var video = document.querySelector('.hero__video');
  var toggle = document.querySelector('.video-toggle');
  if (video) {
    // Pas d'autoplay si l'utilisateur préfère réduire les animations, ni sur
    // mobile (économie de données — le poster s'affiche, la lecture reste
    // possible via le bouton).
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(max-width: 720px)').matches;
    var setState = function (playing) {
      if (!toggle) return;
      toggle.dataset.state = playing ? 'playing' : 'paused';
      toggle.setAttribute('aria-label', playing ? 'Mettre la vidéo en pause' : 'Lire la vidéo');
    };
    if (reduced) {
      video.removeAttribute('autoplay');
      video.pause();
      setState(false);
    } else {
      video.muted = true;
      var p = video.play();
      if (p && p.catch) p.catch(function () { setState(false); });
      setState(true);
    }
    var userPaused = false;
    if (toggle) {
      toggle.hidden = false;
      toggle.addEventListener('click', function () {
        if (video.paused) { userPaused = false; video.play(); setState(true); }
        else { userPaused = true; video.pause(); setState(false); }
      });
    }
    // Onglet ouvert en arrière-plan : le play() initial est refusé tant que la
    // page est invisible — réessayer quand elle le devient (sauf pause volontaire).
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden && video.paused && !userPaused && !reduced) {
        var pp = video.play();
        if (pp && pp.then) pp.then(function () { setState(true); }).catch(function () {});
      }
    });
  }

  /* ------------------------- Filtres du calendrier --------------------- */
  var chipWrap = document.querySelector('[data-cal-filters]');
  if (chipWrap) {
    var rows = document.querySelectorAll('[data-cal-list] [data-type]');
    var calCount = document.getElementById('cal-count');
    chipWrap.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-filter]');
      if (!btn) return;
      var f = btn.dataset.filter;
      chipWrap.querySelectorAll('button[data-filter]').forEach(function (b) {
        b.setAttribute('aria-pressed', String(b === btn));
      });
      var visibles = 0;
      rows.forEach(function (row) {
        row.hidden = f !== 'tous' && row.dataset.type !== f;
        if (!row.hidden) visibles++;
      });
      // Annonce le résultat du filtre aux lecteurs d'écran (WCAG 4.1.3).
      if (calCount) calCount.textContent = visibles + (visibles > 1 ? ' sessions affichées' : ' session affichée');
    });
  }

  /* ------------- Page Cursus : ouvrir l'accordéon ciblé par #hash ------ */
  function openFromHash() {
    if (!location.hash) return;
    var id = decodeURIComponent(location.hash.slice(1));
    var el = document.getElementById(id);
    if (el && el.tagName === 'DETAILS') el.open = true;
  }
  openFromHash();
  window.addEventListener('hashchange', openFromHash);

  /* ------------------------ Formulaire de contact ----------------------
     Sans service tiers : compose un e-mail prérempli.                    */
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    // Présélection du sujet via /contact/?sujet=<clé> (ex. liens « S'inscrire »
    // de la conférence à la Réunion depuis le calendrier).
    var sujetKey = new URLSearchParams(location.search).get('sujet');
    if (sujetKey) {
      var sel = contactForm.querySelector('[name="sujet"]');
      var opt = sel && sel.querySelector('option[data-key="' + sujetKey + '"]');
      if (opt) sel.value = opt.value;
    }
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!contactForm.reportValidity()) return;
      var d = new FormData(contactForm);
      var sujet = 'Site SAPO Clinique — ' + (d.get('sujet') || 'Contact');
      var corps = 'Nom : ' + (d.get('nom') || '') + '\n' +
        'E-mail : ' + (d.get('email') || '') + '\n\n' +
        (d.get('message') || '');
      location.href = 'mailto:' + CONTACT_EMAIL +
        '?subject=' + encodeURIComponent(sujet) +
        '&body=' + encodeURIComponent(corps);
      var ok = document.getElementById('contact-sent');
      if (ok) ok.hidden = false;
    });
  }

  /* --------------------- Formulaire de préinscription ------------------ */
  var form = document.getElementById('inscription-form');
  if (!form) return;

  var dataEl = document.getElementById('form-data');
  var FORM_DATA = dataEl ? JSON.parse(dataEl.textContent) : {};
  var selCursus = form.querySelector('[name="cursus"]');
  var selSession = form.querySelector('[name="promo"]');
  var recapTitle = document.getElementById('recap-title');
  var recapFormat = document.getElementById('recap-format');
  var recapDates = document.getElementById('recap-dates');

  function fillSessions(keepValue) {
    var info = FORM_DATA[selCursus.value];
    if (!info) return;
    var prev = keepValue ? selSession.value : null;
    selSession.innerHTML = '';
    info.sessions.forEach(function (s) {
      var o = document.createElement('option');
      o.value = s.value;
      o.textContent = s.label;
      selSession.appendChild(o);
    });
    if (prev && info.sessions.some(function (s) { return s.value === prev; })) selSession.value = prev;
    updateRecap();
  }

  function updateRecap() {
    var info = FORM_DATA[selCursus.value];
    if (!info) return;
    var sess = info.sessions.find(function (s) { return s.value === selSession.value; }) || info.sessions[0];
    if (recapTitle) recapTitle.textContent = info.title;
    if (recapFormat) recapFormat.textContent = info.format;
    if (recapDates && sess) {
      recapDates.innerHTML = '';
      sess.parts.forEach(function (pt) {
        var row = document.createElement('div');
        row.className = 'row-dates';
        var l = document.createElement('span');
        l.className = 'muted';
        l.textContent = pt.label;
        var v = document.createElement('span');
        v.textContent = pt.dates;
        row.appendChild(l); row.appendChild(v);
        recapDates.appendChild(row);
      });
    }
  }

  // Présélection depuis l'URL (?cursus=…&session=…)
  var params = new URLSearchParams(location.search);
  var qCursus = params.get('cursus');
  if (qCursus && FORM_DATA[qCursus]) selCursus.value = qCursus;
  fillSessions(false);
  var qSession = params.get('session');
  if (qSession) {
    var match = Array.prototype.find.call(selSession.options, function (o) { return o.value === qSession; });
    if (match) selSession.value = qSession;
    updateRecap();
  }

  selCursus.addEventListener('change', function () { fillSessions(false); });
  selSession.addEventListener('change', updateRecap);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;

    var d = new FormData(form);
    var info = FORM_DATA[selCursus.value] || { title: selCursus.value };
    var lignes = [
      ['Formation', info.title],
      ['Session', d.get('promo')],
      ['Prénom', d.get('prenom')],
      ['Nom', d.get('nom')],
      ['E-mail', d.get('email')],
      ['Téléphone', d.get('tel')],
      ['Spécialité', d.get('specialite')],
      ['Date de naissance', d.get('naissance')],
      ['Adresse', [d.get('adresse'), d.get('cp'), d.get('ville'), d.get('pays')].filter(Boolean).join(', ')],
      ['Structure payante', d.get('structure')],
      ['SIREN', d.get('siren')],
      ['Règlement', d.get('financement')],
      ['Message', d.get('message')],
    ];
    var avecVaccin = selCursus.value === 'chirurgie' || selCursus.value === 'chir-paro';
    var corps = 'Demande de préinscription — site sapoclinique.com\n\n' +
      lignes.filter(function (l) { return l[1]; })
        .map(function (l) { return l[0] + ' : ' + l[1]; }).join('\n') +
      '\n\nPièces à joindre à cet e-mail : CV, lettre de motivation' +
      (avecVaccin ? ", certificat de vaccination contre l'hépatite B" : '') + '.' +
      (avecVaccin
        ? "\n\nJe consens expressément au traitement de mon certificat de vaccination contre l'hépatite B (donnée de santé) pour la constitution de mon dossier d'inscription."
        : '');

    function showConfirmation() {
      var conf = document.getElementById('inscription-confirm');
      var confRecap = document.getElementById('confirm-recap');
      // En mode service de formulaires, la messagerie ne s'ouvre pas :
      // adapter le texte de confirmation.
      var intro = document.getElementById('confirm-intro');
      if (intro && FORM_ENDPOINT) {
        intro.textContent = 'Votre préinscription nous est bien parvenue. Complétez maintenant votre dossier en envoyant par e-mail les pièces demandées (CV, lettre de motivation, et certificat de vaccination hépatite B pour le cursus Chirurgie).';
      }
      if (confRecap) {
        confRecap.innerHTML = '';
        [['Formation', info.title], ['Session', d.get('promo')], ['E-mail', d.get('email')]].forEach(function (l) {
          var row = document.createElement('div');
          row.className = 'card-row';
          var a = document.createElement('span'); a.className = 'muted'; a.textContent = l[0];
          var b = document.createElement('span'); b.textContent = l[1] || '—';
          row.appendChild(a); row.appendChild(b);
          confRecap.appendChild(row);
        });
      }
      form.closest('[data-form-panel]').hidden = true;
      if (conf) {
        conf.hidden = false;
        // Déplacer le focus sur la carte de confirmation : sans cela il
        // retombe sur <body> (le bouton soumis est masqué) et rien n'est
        // annoncé aux lecteurs d'écran (WCAG 2.4.3).
        conf.setAttribute('tabindex', '-1');
        conf.focus();
      }
    }

    if (FORM_ENDPOINT) {
      var payload = {};
      lignes.forEach(function (l) { payload[l[0]] = l[1] || ''; });
      fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      }).then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        showConfirmation();
      }).catch(function () {
        var err = document.getElementById('form-error');
        if (err) err.hidden = false;
      });
    } else {
      var sujet = 'Préinscription — ' + info.title + (d.get('promo') ? ' — ' + d.get('promo') : '');
      location.href = 'mailto:' + CONTACT_EMAIL +
        '?subject=' + encodeURIComponent(sujet) +
        '&body=' + encodeURIComponent(corps);
      showConfirmation();
    }
  });

  var again = document.getElementById('confirm-again');
  if (again) {
    again.addEventListener('click', function (e) {
      e.preventDefault();
      document.getElementById('inscription-confirm').hidden = true;
      var panel = document.querySelector('[data-form-panel]');
      panel.hidden = false;
      var first = panel.querySelector('select, input');
      if (first) first.focus();
      panel.scrollIntoView({ block: 'start' });
    });
  }
})();
