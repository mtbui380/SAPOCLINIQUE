// ============================================================================
// SOURCE DE VÉRITÉ UNIQUE du site SAPO Clinique.
// Toutes les pages sont générées depuis ce fichier : modifier une date ou un
// texte ici, relancer `node build.mjs`, et tout le site est à jour.
// ============================================================================

export const site = {
  name: 'SAPO Clinique',
  legalName: 'SAPO CLINIQUE',
  baseUrl: 'https://www.sapoclinique.com',
  email: 'contact@sapoclinique.com',
  instagram: 'https://www.instagram.com/',           // TODO : URL du compte Instagram
  descriptionCourte: 'Organisme de formation en odontologie chirurgicale et parodontologie, depuis 2002.',
  qualiopi: { certificat: 'ICPF B05608', nda: '52490397949' },
  referentHandicap: 'Philippe Blois',
  fondation: '2002',
  adresseSiege: { rue: '2 Allée William Turner', cp: '49240', ville: 'Avrillé' },
  adresseAdministrative: { nom: 'Dr Philippe Blois', rue: '52 avenue du Général de Gaulle', cp: '83320', ville: 'Carqueiranne' },
  lieuFormation: 'Faculté de chirurgie dentaire, Université Paris Cité (Descartes), Paris',
};

// ---------------------------------------------------------------------------
// Cursus. `slug` = URL (/cursus/<slug>/). `reunion` est un événement sans page.
// ---------------------------------------------------------------------------
export const cursus = {
  chirurgie: {
    key: 'chirurgie', slug: 'chirurgie',
    title: 'Cursus Chirurgie', tag: 'Chirurgical', format: '2 modules de 3 jours',
    public: 'Chirurgiens-dentistes', price: 'Sur demande',
    seoDescription: "Formation en odontologie chirurgicale : analgésie, CBCT, sutures, hémostase, et une journée de dissection sur corps humain à l'École de Chirurgie de Paris.",
    place: "Faculté de chirurgie dentaire, Université Paris Cité (Descartes), Paris · journée de dissection à l'École de Chirurgie de l'AP-HP",
    intro: "Quatre thèmes en travaux pratiques : l'analgésie, l'odontologie chirurgicale (incisions, sutures), la gestion des hémorragies et l'imagerie. Une approche exclusivement clinique de l'anatomie, dans la continuité du Pr Jean-François Gaudy, avec une journée de dissection sur corps humain à l'École de Chirurgie de l'AP-HP.",
    sessionsNote: 'Une promotion par an, en deux modules de trois jours qui se suivent. Le module 2/2 comprend la journée de dissection.',
    sessions: [{ name: 'Promotion 2027', parts: [{ label: 'Module 1/2', dates: '2–4 juin 2027' }, { label: 'Module 2/2', dates: 'septembre 2027 (à confirmer)' }] }],
    goals: [
      'Choisir la molécule et la technique analgésique adaptées à chaque situation clinique',
      "Lire un CBCT et repérer les éléments nobles avant d'opérer",
      'Choisir le matériel et maîtriser les points de suture courants',
      'Pratiquer avulsions de dents de sagesse et canines incluses, résections apicales, freinectomies',
      'Traiter les patients sous traitement favorisant les saignements et gérer une hémorragie',
      'Dépister les lésions de la cavité orale',
    ],
    modules: [
      {
        num: 'M1', label: 'Module 1/2 · 3 jours', title: 'Analgésie, imagerie et sutures',
        body: "Maîtriser l'analgésie par la connaissance des territoires nerveux, en regard de l'imagerie 3D. Interpréter le CBCT en évitant ses pièges. Suturer pour prévenir le saignement et obtenir une cicatrisation optimale : choix du fil, du point et du nœud. Prescriptions et contre-indications actualisées.",
        days: [
          "Cours : comprendre l'analgésie pour éviter ses échecs. TP plans superficiels, de la peau aux régions intrabuccales : visualiser les trajets nerveux.",
          "TP : de l'ATM aux gestes analgésiques adaptés à l'anatomie, mise en évidence des territoires.",
          'Cours et TP CBCT (venir avec un PC). Cours lésions osseuses. Cours et TP sutures.',
        ],
      },
      {
        num: 'M2', label: 'Module 2/2 · 3 jours · dissection', title: 'Odontologie chirurgicale et hémostase',
        body: "Rapports anatomiques des sites opératoires pour opérer en sécurité, de l'avulsion simple à la dent de sagesse ou la canine incluse, la résection apicale, la ROG et le sinus lift. Initiation à la piézochirurgie. Hémostase et coagulation : bilans, anomalies, moyens thérapeutiques, urgences hémorragiques.",
        days: [
          'Cours : anatomie vasculaire, hémostase locale et générale, dermatologie buccale, avulsion de la dent de sagesse, résections apicales.',
          'TP : réseau carotidien, artère maxillaire, loge submandibulaire, avulsions de dents de sagesse et de canine incluse. Examen.',
          "TP sur corps humain, École de Chirurgie de l'AP-HP : réseau vasculaire cervico-facial, gestion des hémorragies, abord du sinus, piézochirurgie, freinectomies. Remise des diplômes.",
        ],
      },
    ],
    faq: [
      { q: 'Quels sont les prérequis ?', a: "Être chirurgien-dentiste diplômé. Aucun niveau préalable en odontologie chirurgicale n'est exigé : le cursus s'adresse autant à l'omnipraticien qui veut commencer à opérer qu'au praticien expérimenté." },
      { q: 'La journée de dissection est-elle obligatoire ?', a: "Elle fait partie du module 2/2 et se déroule à l'École de Chirurgie de l'AP-HP à Paris. Elle est réservée aux inscrits au cursus complet." },
      { q: 'Que dois-je apporter ?', a: 'Un ordinateur portable PC pour la séance CBCT (Mac et iPad incompatibles avec le logiciel utilisé). Le matériel de TP est fourni.' },
      { q: 'La formation est-elle prise en charge ?', a: 'SAPO Clinique est certifié Qualiopi : la formation est éligible au FIF-PL et aux prises en charge OPCO ou employeur. Une convention est établie à l’inscription.' },
    ],
  },

  parodontologie: {
    key: 'parodontologie', slug: 'parodontologie',
    title: 'Cursus Parodontologie', tag: 'Non chirurgical → chirurgical',
    format: '2 modules de 3 jours, inscription au cursus complet ou par module',
    formatCourt: '2 modules de 3 jours',
    public: 'Chirurgiens-dentistes', price: 'Sur demande',
    seoDescription: 'Du traitement parodontal non chirurgical à la chirurgie plastique : deux modules de 3 jours à suivre ensemble ou séparément, avec de nombreux TP sur modèles.',
    place: 'Faculté de chirurgie dentaire, Université Paris Cité (Descartes), Paris',
    intro: "Prise en charge actualisée des maladies parodontales, de la prévention à la chirurgie plastique. Travaux pratiques nombreux, des thérapeutiques ultrasonores au comblement des défauts infra-osseux et aux greffes, illustrés de démonstrations cliniques et de vidéos. Des modèles 3D permettent de transposer immédiatement l'apprentissage au cabinet.",
    sessionsNote: "Deux sessions identiques par an, chacune en deux modules de trois jours. Le module 1/2 (non chirurgical) et le module 2/2 (chirurgical) peuvent être suivis ensemble ou séparément, dans l'ordre de votre choix.",
    sessions: [
      { name: 'Session 2027 · I', parts: [{ label: 'Module 1/2', dates: '13–15 janvier 2027' }, { label: 'Module 2/2', dates: '24–26 mars 2027' }] },
      { name: 'Session 2027 · II', parts: [{ label: 'Module 1/2', dates: '13–15 octobre 2027' }, { label: 'Module 2/2', dates: '8–10 décembre 2027' }] },
    ],
    goals: [
      "Diagnostiquer les maladies parodontales et définir l'alliance thérapeutique",
      'Optimiser le traitement non chirurgical : ultrasons, débridement, maintenance',
      'Comprendre et gérer les échecs et récidives',
      'Pratiquer un lambeau minimalement invasif',
      "Analyser l'esthétique du sourire et pratiquer une élongation coronaire",
      'Classer les récessions et choisir la technique de recouvrement',
      'Réaliser greffe épithélio-conjonctive, tunnelisation et lambeau déplacé coronairement',
    ],
    modules: [
      {
        num: 'M1', label: 'Module 1/2 · 3 jours · non chirurgical · seul ou avec le module 2/2', title: 'Traitement des maladies parodontales',
        body: "Diagnostic, classification et alliance thérapeutique. Traitement non chirurgical de A à Z : potentiel des ultrasons, autres outils de débridement, réévaluation et maintenance. Troisième jour consacré aux défauts intra-osseux : biologie de la cicatrisation, incisions et sutures, lambeau minimalement invasif.",
        days: [
          'Prévention : diagnostic, épidémiologie, classification, alliance thérapeutique. TP brossage, calibration des brossettes, technique de Bass modifiée. Pathologies générales et parodonte.',
          'Traitement non chirurgical : objectifs, ultrasons, aéropolisseurs, curettes, lasers, gradient thérapeutique. TP micro-inserts sur dents extraites et modèles. Réévaluation, maintenance, gestion des récidives.',
          'Défauts intra-osseux : biologie, réparation et régénération. TP incisions et sutures, lambeau minimalement invasif sur modèle 3D. PRF, prévention et traitement des péri-implantites.',
        ],
      },
      {
        num: 'M2', label: 'Module 2/2 · 3 jours · chirurgical · seul ou avec le module 1/2', title: 'Esthétique et chirurgie plastique parodontale',
        body: "Communication et entretien motivationnel face aux parodontites réfractaires. Élongation coronaire et analyse esthétique du sourire. Chirurgie plastique parodontale : classification des récessions, greffes de renforcement et de recouvrement, prélèvement palatin, lambeau déplacé coronairement, tunnelisation modifiée. TP sur mâchoires animales.",
        days: [
          "Entretiens motivationnels par jeux de rôles. Principes des élongations coronaires, distance biologique, analyse esthétique du sourire. TP lambeau et sutures sur mâchoires animales.",
          'Chirurgie plastique 1 : objectifs, classification des récessions, greffes de renforcement vs recouvrement, indications. TP greffe épithélio-conjonctive sur mâchoires animales.',
          'Chirurgie plastique 2 : techniques de recouvrement, prélèvement palatin, lambeau déplacé coronairement et variantes, tunnelisation modifiée. TP tunnelisation avec conjonctif enfoui et lambeau déplacé coronairement.',
        ],
      },
    ],
    faq: [
      { q: 'Puis-je suivre un seul module ?', a: "Oui. Le module 1/2 (non chirurgical) et le module 2/2 (chirurgical) s'inscrivent ensemble ou séparément, dans l'ordre de votre choix, sur l'une des deux sessions annuelles." },
      { q: 'Faut-il déjà pratiquer la chirurgie parodontale ?', a: "Non. Le module 1/2 ne nécessite aucune expérience chirurgicale. Le module 2/2 suppose une pratique régulière des sutures ; les TP se font sur mâchoires animales et modèles 3D." },
      { q: 'Quelle place pour le traitement non chirurgical ?', a: "Le module 1/2 lui est entièrement consacré : diagnostic, ultrasons, débridement, réévaluation et maintenance. C'est la base de la prise en charge parodontale actuelle." },
      { q: 'La formation est-elle prise en charge ?', a: "SAPO Clinique est certifié Qualiopi : éligible FIF-PL, OPCO ou employeur. Une convention est établie à l'inscription." },
    ],
  },

  masterclass: {
    key: 'masterclass', slug: 'masterclass-parodontologie',
    title: 'Masterclass Parodontologie', tag: 'Chirurgical · avancé', format: '1 module de 3 jours',
    public: 'Praticiens expérimentés ou anciens du cursus', price: 'Sur demande',
    seoDescription: 'Trois jours pour maîtriser MINST, greffes de recouvrement des incisives mandibulaires et chirurgie péri-implantaire. Pour praticiens expérimentés.',
    place: 'Faculté de chirurgie dentaire, Université Paris Cité (Descartes), Paris',
    intro: 'Trois jours pour maîtriser les nouveaux concepts en MINST, les greffes de recouvrement des incisives mandibulaires et la chirurgie parodontale péri-implantaire. Pour praticiens expérimentés ou anciens du cursus.',
    sessionsNote: 'Une session par an, en un module unique de trois jours.',
    sessions: [{ name: 'Session 2027', parts: [{ label: 'Module unique', dates: '12–14 mai 2027' }] }],
    goals: [
      'Maîtriser le MINST et les nouvelles voies de régénération des défauts infra-osseux',
      'Pratiquer la greffe de gencive sans incision',
      'Maîtriser les greffes de recouvrement des incisives mandibulaires',
      'Traiter les péri-implantites par une approche muco-chirurgicale',
    ],
    modules: [
      {
        num: 'M', label: 'Module unique · 3 jours · chirurgical avancé', title: 'Masterclass muco-gingivale',
        body: "Défauts infra-osseux : approche chirurgicale selon les guidelines EFP, tracés d'incisions (MPPT, SPPF, m-MIST…), biomatériaux, MINST et microchirurgie. Recouvrement de l'incisive mandibulaire : tunnelisation vs CAF, prélèvement palatin, gestion des tensions musculaires. Approche muco-gingivale des péri-implantites.",
        days: [
          "Défauts infra-osseux : régénération vs réparation, tracés d'incisions, Emdogain, acide hyaluronique, PRF, MINST. TP sur modèle 3D, laser Er:YAG en dégranulation sélective.",
          'Incisive mandibulaire : tunnelisation vs CAF, prélèvement palatin, greffe sans incision, tensions musculaires, gestion ortho-parodontale. TP sur mâchoires animales : dissection sans incision, vestibuloplastie, m-Vista, tunnelisation.',
          'Péri-implantites : classification, greffe épithélio-conjonctive postérieure mandibulaire, approche muco-chirurgicale. TP gestion musculaire de la greffe et de la perte osseuse implantaire.',
        ],
      },
    ],
    faq: [
      { q: "À qui s'adresse la masterclass ?", a: 'Aux praticiens qui pratiquent déjà la chirurgie parodontale ou qui ont suivi le cursus Parodontologie, et souhaitent aborder MINST, greffes sans incision et péri-implantites.' },
      { q: 'Quels supports de TP ?', a: 'Modèles 3D pour les défauts infra-osseux, mâchoires animales pour la tunnelisation et les greffes, modèles pour la gestion péri-implantaire.' },
      { q: 'La formation est-elle prise en charge ?', a: 'SAPO Clinique est certifié Qualiopi : éligible FIF-PL, OPCO ou employeur.' },
    ],
  },

  assistante: {
    key: 'assistante', slug: 'assistante',
    title: 'Cursus Assistante en Parodontologie', tag: 'Non chirurgical', format: '1 module de 2 jours',
    formatCourt: '2 jours',
    public: 'Assistantes dentaires', price: 'Sur demande',
    seoDescription: "Deux jours pour donner à l'assistante dentaire un rôle actif en parodontologie : prévention, communication patient et traitement non chirurgical.",
    place: 'Faculté de chirurgie dentaire, Université Paris Cité (Descartes), Paris',
    intro: "Deux jours pour donner à l'assistante un rôle actif dans la prise en charge parodontale : prévention, communication avec le patient, préparation et compréhension du traitement non chirurgical.",
    sessionsNote: 'Deux sessions identiques par an, en un module unique de deux jours.',
    sessions: [
      { name: 'Session janvier 2027', parts: [{ label: 'Module unique', dates: '13–14 janvier 2027' }] },
      { name: 'Session octobre 2027', parts: [{ label: 'Module unique', dates: '6–7 octobre 2027' }] },
    ],
    goals: [
      'Comprendre les maladies parodontales, leurs facteurs de risque et leurs conséquences',
      'Engager le patient et communiquer les attentes du traitement',
      'Enseigner les techniques de brossage et calibrer les brossettes',
      'Préparer le matériel du traitement non chirurgical',
      "Planifier une routine d'hygiène adaptée au patient",
    ],
    modules: [
      {
        num: 'M', label: 'Module unique · 2 jours · non chirurgical', title: 'Prévention et traitement non chirurgical',
        body: "Deux journées pour donner à l'assistante un rôle actif : prévention et communication le premier jour, traitement non chirurgical de A à Z le second.",
        days: [
          "Prévention des maladies parodontales : prévalence, microbiote, facteurs de risque, conséquences sur la santé générale. Alliance thérapeutique et outils de communication. TP brossage manuel et électrique, technique de Bass modifiée, calibration des brossettes, produits d'hygiène.",
          "Le traitement non chirurgical de A à Z : objectifs, indications, matériel du débridement parodontal, préparation du plateau. TP : planifier une routine d'hygiène, exercices de cas et jeux de rôles.",
        ],
      },
    ],
    faq: [
      { q: 'Faut-il être assistante qualifiée ?', a: 'La formation s’adresse aux assistantes dentaires en exercice, qualifiées ou en cours de qualification, qui participent à la prise en charge parodontale du cabinet.' },
      { q: 'Le praticien doit-il suivre le cursus en parallèle ?', a: "Ce n'est pas obligatoire, mais la formation est conçue pour s'articuler avec le module 1/2 du cursus Parodontologie : les deux sessions de janvier partagent la même date de début." },
      { q: 'La formation est-elle prise en charge ?', a: "Oui, par l'OPCO de l'employeur (OPCO EP pour les cabinets dentaires) dans le cadre du plan de développement des compétences." },
    ],
  },

  // Événement ponctuel — pas de page dédiée, inscription via la page Contact.
  reunion: {
    key: 'reunion', slug: null,
    title: 'Conférence à la Réunion', tag: 'Chirurgical', format: '3 jours · 22, 23 et 24 octobre 2026',
    public: 'Chirurgiens-dentistes', price: 'Sur demande', place: 'La Réunion (lieu à préciser)',
    intro: 'Osez et progressez en odontologie chirurgicale. Conférence et démonstrations à la Réunion.',
    sessionsNote: 'Conférence sur trois jours.',
    sessions: [{ name: '2026', parts: [{ label: '3 jours', dates: '22–24 octobre 2026' }] }],
    goals: [], modules: [], faq: null,
  },
};

// ---------------------------------------------------------------------------
// Calendrier. `key` renvoie au cursus ; `formKey` à l'option du formulaire ;
// `sess` au nom de session présélectionné. `type` sert au filtre.
// ---------------------------------------------------------------------------
export const sessions = [
  { month: 'Mai 26', key: 'masterclass', type: 'paro', title: 'Masterclass Parodontologie', promo: 'Promotion 2026 · 3 jours', dates: '20–22 mai 2026', past: true },
  { month: 'Juin 26', key: 'chirurgie', type: 'chir', title: 'Cursus Chirurgie, avec dissection', promo: 'Promotion 2026 · 2 × 3 jours', dates: '10–12 juin · 16–18 sept 2026', past: true },
  { month: 'Oct 26', key: 'reunion', type: 'event', title: 'Conférence à la Réunion', promo: 'Odontologie chirurgicale', dates: '22–24 octobre', contact: true },
  { month: 'Janv 27', key: 'parodontologie', formKey: 'paro-m1', sess: 'Session 2027 · I', type: 'paro', title: 'Cursus Parodontologie · Module 1/2', promo: 'Promotion 2027-I · non chirurgical · 3 jours', dates: '13–15 janvier' },
  { month: 'Janv 27', key: 'assistante', formKey: 'assistante', sess: 'Session janvier 2027', type: 'assist', title: 'Cursus Assistante en Parodontologie', promo: 'Promotion 2027 · 2 jours', dates: '13–14 janvier' },
  { month: 'Mars 27', key: 'parodontologie', formKey: 'paro-m2', sess: 'Session 2027 · I', type: 'paro', title: 'Cursus Parodontologie · Module 2/2', promo: 'Promotion 2027-I · chirurgical · 3 jours', dates: '24–26 mars' },
  { month: 'Mai 27', key: 'masterclass', formKey: 'masterclass', sess: 'Session 2027', type: 'paro', title: 'Masterclass Parodontologie', promo: 'Promotion 2027 · 3 jours', dates: '12–14 mai' },
  { month: 'Juin 27', key: 'chirurgie', formKey: 'chirurgie', sess: 'Promotion 2027', type: 'chir', title: 'Cursus Chirurgie', promo: 'Promotion 2027 · 2 × 3 jours', dates: '2–4 juin · sept (à confirmer)' },
  { month: 'Oct 27', key: 'assistante', formKey: 'assistante', sess: 'Session octobre 2027', type: 'assist', title: 'Cursus Assistante en Parodontologie', promo: 'Promotion 2027 · 2 jours', dates: '6–7 octobre' },
  { month: 'Oct 27', key: 'parodontologie', formKey: 'paro-m1', sess: 'Session 2027 · II', type: 'paro', title: 'Cursus Parodontologie · Module 1/2', promo: 'Promotion 2027-II · non chirurgical · 3 jours', dates: '13–15 octobre' },
  { month: 'Déc 27', key: 'parodontologie', formKey: 'paro-m2', sess: 'Session 2027 · II', type: 'paro', title: 'Cursus Parodontologie · Module 2/2', promo: 'Promotion 2027-II · chirurgical · 3 jours', dates: '8–10 décembre' },
];

export const upcoming = sessions.filter(s => !s.past);
export const pastSessions = sessions.filter(s => s.past);

/**
 * Session mise en avant sur la page d'accueil : première session de CURSUS à
 * venir — les événements ponctuels (inscription via Contact) sont exclus, choix
 * éditorial. Calculée depuis sessions[] : impossible à désynchroniser.
 */
const heroSrc = upcoming.find(s => !s.contact);
const heroModule = cursus[heroSrc.key].modules[heroSrc.formKey === 'paro-m2' ? 1 : 0];
export const heroSession = {
  title: heroSrc.title,
  meta: `${heroSrc.dates} 20${heroSrc.month.trim().slice(-2)} · ${heroSrc.promo.split('·').pop().trim()}`,
  sub: heroModule ? heroModule.title : '',
  cursusKey: heroSrc.key,
};

/** Années couvertes par les sessions à venir, ex. « 2026–2027 ». */
export const upcomingYears = [...new Set(upcoming.map(s => '20' + s.month.trim().slice(-2)))].sort();
export const upcomingYearsLabel = upcomingYears.length > 1
  ? `${upcomingYears[0]}–${upcomingYears[upcomingYears.length - 1]}`
  : upcomingYears[0];

export const chips = [
  ['tous', 'Toutes'], ['chir', 'Chirurgie'], ['paro', 'Parodontologie'], ['assist', 'Assistantes'], ['event', 'Événements'],
];

// ---------------------------------------------------------------------------
// Statistiques et équipe.
// ---------------------------------------------------------------------------
export const stats = [
  { value: '8,9', unit: '/10', label: 'Satisfaction, cursus Parodontologie', source: 'Enquête mars 2025' },
  { value: '8,4', unit: '/10', label: 'Satisfaction, cursus Chirurgie', source: 'Enquête septembre 2025' },
  { value: '100', unit: '%', label: 'Ont fait évoluer leur pratique et recommandent la formation', source: 'Toutes sessions 2025' },
];

export const equipe = [
  { nom: 'Dr Philippe Blois', role: 'Co-directeur · Odontologie chirurgicale', img: 'portrait-blois', pos: '50% 15%' },
  { nom: 'Dr Matthias Rzeznik', role: 'Co-directeur · Parodontologie', img: 'portrait-rzeznik', pos: '50% 20%' },
  // TODO : compléter l'équipe (formateurs, référent handicap) — portraits + noms.
];

// ---------------------------------------------------------------------------
// Formulaire de préinscription : options de formation → sessions proposées.
// ---------------------------------------------------------------------------
function shortDates(d) { return d.replace(/\s*\(à confirmer\)/, ''); }

export const formOptions = [
  { value: 'chirurgie', label: 'Cursus Chirurgie', base: 'chirurgie' },
  { value: 'parodontologie', label: 'Cursus Parodontologie complet', base: 'parodontologie' },
  { value: 'paro-m1', label: 'Cursus Parodontologie · Module 1/2', base: 'parodontologie', filter: 'Module 1/2' },
  { value: 'paro-m2', label: 'Cursus Parodontologie · Module 2/2', base: 'parodontologie', filter: 'Module 2/2' },
  { value: 'chir-paro', label: 'Cursus Chirurgie + Cursus Parodontologie', base: null },
  { value: 'masterclass', label: 'Masterclass Parodontologie', base: 'masterclass' },
  { value: 'assistante', label: 'Cursus Assistante en Parodontologie', base: 'assistante' },
];

/** Table formKey → { title, sessions: [{ value, label, parts }] } embarquée côté client. */
export function buildFormData() {
  const out = {};
  for (const opt of formOptions) {
    if (opt.value === 'chir-paro') {
      const list = [];
      for (const cs of cursus.chirurgie.sessions) {
        for (const ps of cursus.parodontologie.sessions) {
          const name = `Chirurgie ${cs.name.replace('Promotion ', '')} + Parodontologie ${ps.name}`;
          list.push({
            value: name, label: name,
            parts: [
              ...cs.parts.map(p => ({ label: `Chir. ${p.label}`, dates: p.dates })),
              ...ps.parts.map(p => ({ label: `Paro. ${p.label}`, dates: p.dates })),
            ],
          });
        }
      }
      out[opt.value] = { title: 'Cursus Chirurgie + Cursus Parodontologie', format: 'Deux cursus complets', sessions: list };
      continue;
    }
    const c = cursus[opt.base];
    const list = c.sessions.map(ss => {
      const parts = opt.filter ? ss.parts.filter(p => p.label === opt.filter) : ss.parts;
      return {
        value: ss.name,
        label: `${ss.name} · ${parts.map(p => shortDates(p.dates)).join(' / ')}`,
        parts,
      };
    });
    out[opt.value] = { title: opt.label, format: c.format, sessions: list };
  }
  return out;
}

// ---------------------------------------------------------------------------
// SEO : title + meta description par page.
// ---------------------------------------------------------------------------
export const seo = {
  accueil: {
    title: 'SAPO Clinique · Odontologie chirurgicale et parodontologie',
    description: 'Organisme certifié Qualiopi depuis 2002 : cursus Odontologie chirurgicale avec dissection, Parodontologie, Masterclass et formation assistante dentaire, à Paris.',
  },
  cursus: {
    title: "Cursus d'odontologie chirurgicale et parodontologie · SAPO Clinique",
    description: 'Quatre formations pratiques pour chirurgiens-dentistes et assistantes : programme détaillé, objectifs, déroulé jour par jour.',
  },
  calendrier: {
    title: 'Calendrier des sessions · SAPO Clinique',
    description: 'Dates des cursus Odontologie chirurgicale, Parodontologie (modules 1/2 et 2/2), Masterclass et Assistante. Inscriptions ouvertes.',
  },
  qui: {
    title: 'Qui sommes-nous · SAPO Clinique, formation continue depuis 2002',
    description: "Organisme fondé en 2002 dans la continuité de l'enseignement du Pr Jean-François Gaudy. Équipe pédagogique, certification Qualiopi, accessibilité.",
  },
  ressources: {
    title: 'Ressources · Communauté SAPO',
    description: 'Espace réservé aux anciens participants : supports de cours, vidéos de TP, partage de cas cliniques.',
  },
  inscription: {
    title: 'Inscription à une formation · SAPO Clinique',
    description: 'Préinscription en ligne aux cursus SAPO Clinique. Convention Qualiopi, prise en charge FIF-PL ou OPCO.',
  },
  mediatheque: {
    title: 'Médiathèque · SAPO Clinique',
    description: 'Photos des travaux pratiques et des sessions de formation SAPO Clinique.',
  },
  contact: {
    title: 'Contact · SAPO Clinique',
    description: "Une question sur un cursus, un financement ou une adaptation d'accueil : contactez SAPO Clinique.",
  },
  mentions: {
    title: 'Mentions légales et confidentialité · SAPO Clinique',
    description: 'Mentions légales, données personnelles et conditions générales de vente.',
  },
};

// ---------------------------------------------------------------------------
// Schema.org (JSON-LD) — généré en statique dans chaque page.
// ---------------------------------------------------------------------------
export function orgJsonLd() {
  return {
    '@type': 'EducationalOrganization',
    '@id': `${site.baseUrl}/#org`,
    name: 'SAPO Clinique',
    url: `${site.baseUrl}/`,
    email: site.email,
    foundingDate: site.fondation,
    address: { '@type': 'PostalAddress', streetAddress: site.adresseSiege.rue, postalCode: site.adresseSiege.cp, addressLocality: site.adresseSiege.ville, addressCountry: 'FR' },
    hasCredential: { '@type': 'EducationalOccupationalCredential', name: 'Certification Qualiopi', identifier: site.qualiopi.certificat },
  };
}

export function courseJsonLd(c) {
  const place = { '@type': 'Place', name: 'Faculté de chirurgie dentaire, Université Paris Cité', address: { '@type': 'PostalAddress', addressLocality: 'Paris', addressCountry: 'FR' } };
  return {
    '@type': 'Course',
    name: c.title,
    description: c.intro,
    url: `${site.baseUrl}/cursus/${c.slug}/`,
    provider: { '@id': `${site.baseUrl}/#org` },
    courseMode: 'onsite',
    hasCourseInstance: (c.sessions || []).map(s => ({
      '@type': 'CourseInstance',
      name: `${c.title} · ${s.name}`,
      courseMode: 'onsite',
      location: place,
      description: s.parts.map(p => `${p.label} : ${p.dates}`).join(' · '),
    })),
  };
}

export function faqJsonLd(c) {
  if (!c.faq) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: c.faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

/** Les 4 cursus avec page dédiée, dans l'ordre d'affichage. */
export const cursusList = [cursus.chirurgie, cursus.parodontologie, cursus.masterclass, cursus.assistante];
