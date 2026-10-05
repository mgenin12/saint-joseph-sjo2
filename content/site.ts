/* ============================================================
   SJO2 — CONTENUS ÉDITABLES DU SITE (hors Google Sheet)
   Modifiez ici les textes de l'accueil, les jalons, les fiches
   de l'équipe, les missions bénévoles, la FAQ et le budget.
   Les articles et les événements viennent du Google Sheet
   (voir README).
   ============================================================ */

export const SITE = {
  nom: "Saint Joseph",
  sousTitre: "Paroisse Saint-Arnoux · Le Rouret",
  adresse: "30 Allée du Pré des Roures · 06650 Le Rouret",
  devise: "Pour aujourd'hui, pour demain, pour la Mission.",
  valeursLigne: "Foi · Transmission · Fraternité · Espérance",
  afficherValeurs: true,

  collecte: {
    // Montant déjà réuni (terrain inclus) et objectif global, en euros.
    montantCollecte: 1_400_000,
    objectif: 6_000_000,
  },

  liens: {
    don: "https://don-nice.catholique.fr/centre-paroissial-st-arnoux-rouret/",
    // Formulaire externe d'inscription à la newsletter (Google Form, Brevo…) — vide = formulaire du site seul
    newsletter: "",
    // Formulaire de contact externe (Google Form…) — vide = formulaire du site seul
    formulaireContact: "",
    diocese: "https://nice.catholique.fr/",
    paroisseFacebook: "https://www.facebook.com/saint.arnoux",
    commune: "https://lerouret.fr/",
    ancienSite: "https://saint-joseph.saint-arnoux.fr/",
  },

  contact: {
    email: "",
    telephone: "",
    donsEtLegs: {
      nom: "Anne-Marie Floréan",
      telephone: "+33 6 79 42 93 25",
      email: "am-flo@orange.fr",
    },
  },

  reseaux: {
    facebook: "https://www.facebook.com/saint.arnoux",
    instagram: "",
    snapchat: "",
    linkedin: "",
    youtube: "",
    x: "",
  },

  hero: {
    titre: ["Bâtir un lieu de ", "Foi", ", de ", "Vie", " et d'", "Espérance", "."],
    meta: ["≈ 1 000 m² sur 1 ha de terrain", "Un budget global de 6 M€", "400 personnes accueillies", "Livraison prévue en 2030"],
  },

  projet: {
    surtitre: "Le projet",
    titre: "Un projet immobilier structuré et conçu pour la mission.",
    intro:
      "La Paroisse Saint-Arnoux, créée par le regroupement de ses 9 communes, bâtit un centre paroissial et son église pour accueillir la forte croissance missionnaire.",
    compteurs: [
      { valeur: 8736, suffixe: " m²", label: "Parcelle acquise" },
      { valeur: 6, suffixe: " M€", label: "Budget" },
      { valeur: 400, suffixe: " pers.", label: "Capacité d'accueil" },
      { valeur: 70, suffixe: " %", label: "Espaces paysagers" },
    ],
    phases: [
      {
        titre: "Le Centre Paroissial",
        capacite: "+ de 100 personnes",
        points: [
          "Accueil & espaces de rencontre",
          "Une grande salle polyvalente pour accueillir les grands évènements",
          "Salles de catéchisme et d'aumônerie",
          "Un café, une cuisine, des espaces de rangement",
          "Espaces missionnaires",
          "Vie quotidienne de la paroisse",
        ],
      },
      {
        titre: "L'Église",
        capacite: "+ 300 personnes",
        points: ["Nef principale", "Clocher de 22 m", "Parvis & espaces extérieurs", "Lieu liturgique durable"],
      },
      {
        titre: "Le Presbytère",
        capacite: "3 logements",
        points: ["3 logements (T3) de prêtres", "Lieu de vie de la communauté sacerdotale"],
      },
    ],
  },

  avancement: {
    surtitre: "L'avancement",
    titre: "Une dynamique déjà lancée.",
    intro:
      "Après l'achat du terrain et le feu vert du Diocèse de Nice, le projet entre dans sa phase concrète : études, autorisations, puis travaux. Étape après étape, suivez ici le chemin qui mène à l'ouverture du centre paroissial, puis de l'église Saint Joseph, à l'horizon 2030.",
    jalons: [
      { periode: "2025", etat: "done", titre: "Acquisition du terrain", texte: "Achat et paiement intégral du terrain au Rouret." },
      {
        periode: "2025",
        etat: "done",
        titre: "Premiers grands donateurs",
        texte: "Les premiers soutiens s'engagent aux côtés du projet et lancent la dynamique.",
      },
      {
        periode: "2026",
        etat: "done",
        titre: "Validation du Diocèse",
        texte: "Faisabilité et plan de financement approuvés : lors du CID le 7 mai, puis du CDAE le 19 mai.",
      },
      {
        periode: "2026",
        etat: "now",
        titre: "Lancement de la campagne de dons",
        texte: "Mobilisation des grands donateurs et mécènes, et ouverture de l'appel aux dons.",
      },
      {
        periode: "2026–2027",
        etat: "now",
        titre: "Fiabilisation technique & réglementaire",
        texte: "Consolidation des études, du budget et des autorisations.",
      },
      {
        periode: "2027–2030",
        etat: "todo",
        titre: "Autorisations, travaux & livraison",
        texte: "Permis de construire, consultation des entreprises, construction puis ouverture — Centre paroissial puis Église.",
      },
    ] as { periode: string; etat: "done" | "now" | "todo"; titre: string; texte: string }[],
  },

  valeurs: {
    titre: "Pour aujourd'hui, pour demain, pour la Mission.",
    intro:
      "Plus qu'un chantier : on ne bâtit pas une église pour une génération, mais pour des siècles. Une œuvre que nous bâtissons ensemble, portée par quatre convictions partagées.",
    items: [
      { nom: "Foi", texte: "Un lieu de prière et de célébration, ancré dans la tradition et ouvert à la rencontre avec Dieu." },
      { nom: "Transmission", texte: "Transmettre un héritage spirituel et bâtir un patrimoine durable pour les générations à venir." },
      { nom: "Fraternité", texte: "Accueillir et fédérer une communauté vivante, intergénérationnelle, au service de tous." },
      { nom: "Espérance", texte: "Regarder l'avenir avec confiance, en posant aujourd'hui les fondations d'un projet d'avenir." },
    ],
  },

  equipe: {
    intro:
      "Le projet est porté par la Paroisse Saint-Arnoux et l'Association Diocésaine de Nice, accompagnées d'une équipe d'experts structurée et bénévole.",
    cure: {
      nom: "Père Paul Bao Dinh LY",
      role: "Curé de la Paroisse Saint-Arnoux",
      photo: "/assets/img/pere-paul-bao-dinh-ly.jpeg",
      citation: "Nous ne bâtissons pas seulement des murs. Nous bâtissons un lieu vivant.",
      bio: "Pilote principal du projet et maître d'ouvrage en tant que représentant du Diocèse de Nice, le Père Bao Dinh LY est le garant de la vision pastorale et de la relation avec l'évêché. Porté par une vision stratégique large — à l'échelle de la paroisse comme du diocèse — il défend les décisions du projet et conduit la communauté avec une volonté résolue de le mener à bien.",
    },
    competences: ["Pilotage professionnel", "Architecture", "Finances", "Construction", "Bureaux d'études", "Communication", "Levée de fonds", "Gestion de projet"],
    benevoles:
      "Plus de 100 bénévoles sont engagés autour du projet, avec une exigence partagée : maîtrise des coûts et des risques, sécurité, pérennité constructive et infrastructures.",
    citation: "« Là où deux ou trois sont réunis en mon nom, je suis au milieu d'eux » — Mt 18, 20",
    membres: [
      { nom: "François Muller", photo: "francois-muller", role: "Commission Finance", bio: "Toute une carrière dans la banque, achevée à la Direction Générale d'une banque régionale. Expérience en conseil économique paroissial (EAP, END, Vision) et engagements associatifs (Banque Alimentaire, conseil municipal)." },
      { nom: "Marlyne Caula", photo: "marlyne-caula", role: "Pilotage central · Consultante méthode", bio: "Garante de la structuration et de la conduite du projet. 18 ans de chefferie de projets complexes : planification, coordination multi-acteurs et sécurisation des livrables. Certifiée PMP, PRINCE2 et Scrum Master, elle apporte management d'équipes, conduite du changement et communication." },
      { nom: "Christel Naujoks", photo: "christel-naujoks", role: "Commission Construction / Art", bio: "Historienne de l'art (architecture, patrimoine religieux, art sacré) et membre de la commission d'art sacré. Elle accompagne la conception des espaces — centre paroissial et église — pour en garantir la pertinence fonctionnelle, pastorale, artistique et iconographique." },
      { nom: "Nicolas Jayne", photo: "nicolas-jayne", role: "Commission Construction / Art", bio: "Directeur d'agence d'un bureau d'études techniques tous corps d'état. Pilotage d'opérations complexes en bâtiment : AMO technique, maîtrise d'ouvrage déléguée, maîtrise d'œuvre d'exécution et conduite de travaux. Expert en gestion patrimoniale et diagnostics." },
      { nom: "Anne-Marie Floréan", photo: "anne-marie-florean", role: "Commission Finance · Économe", bio: "Économe de la paroisse depuis 2008 (St Pierre du Brusc puis St Arnoux). Comptabilité sur logiciels spécialisés (Sage, EBP) et gestion budgétaire. Trésorière de plusieurs associations." },
      { nom: "Cécile Messineo", photo: "cecile-messineo", role: "Commission Finance", bio: "Gestion de projet (analyse des besoins, pilotage budgétaire, reporting), gestion des risques et contrôle interne. Esprit d'analyse et de synthèse, animation d'ateliers et de comités. Accompagnement de jeunes confirmands et bénévolats locaux." },
      { nom: "Alexandre Romana", photo: "alexandre-romana", role: "Commission Pastorale", bio: "Nouvelles technologies, management d'équipes et de projets. Engagé en aumônerie, catéchuménat et EAP, dans un esprit missionnaire, il souhaite un projet vivant et rayonnant." },
      { nom: "Daniel Hauser", photo: "daniel-hauser", role: "Commission Finance & Communication", bio: "Attaché de presse pendant 15 ans (tourisme, hôtellerie, restauration), puis fondateur et rédacteur en chef adjoint d'un magazine. Études religieuses reprises à 50 ans. Longue expérience en conseil économique paroissial et bénévolat (Chantiers du Cardinal, aumôneries)." },
      { nom: "Claude Seguin", photo: "claude-seguin", role: "Commission Pastorale · Diacre", bio: "Diacre et architecte retraité, attentif à la liturgie, à l'art sacré et au mobilier liturgique. Il apporte une vision à long terme et la capacité de traduire un programme pastoral en espace." },
      { nom: "Bertrand Dejouy", photo: "bertrand-dejouy", role: "Commission Communication", bio: "Développement commercial, management et entrepreneuriat. Compétences en IA, design, gestion de produit et prise de parole en public. Dynamisme, créativité et facilitation au service du projet." },
      { nom: "Bertrand Gorge", photo: "bertrand-gorge", role: "Commission Pastorale", bio: "Entrepreneur dans la tech et la transition écologique. Impliqué dans l'EAP et de nombreux projets de la paroisse. Digital, communication et collectif !" },
      { nom: "Jérôme Ivanez", photo: "jerome-ivanez", role: "Commission Construction / Art", bio: "Management, planification et gestion des risques. Président de la section départementale des travaux publics et routiers, il apporte une expertise en construction et conduite de projets d'infrastructure. Accompagne familles et couples pour les baptêmes et mariages." },
      { nom: "Marvin Zanarelli", photo: "marvin-zanarelli", role: "Commission Construction / Art", bio: "Cadre des travaux publics, domicilié au Rouret. Encadrement de travaux sur de grands chantiers de la région (Monaco : nouvel hôpital CHPG, Evos, Mare Terra, Jardin Exotique, îlot Pasteur, Villa Ariane). Compétences en VRD, gros œuvre (béton armé) et second œuvre. Marié, père de deux enfants." },
      { nom: "Kevin Galligan", photo: "kevin-galligan", role: "Commission Finance", bio: "Ingénieur en télécommunications, 20 ans à l'Agence Spatiale Européenne sur les premiers satellites européens, avec un accent sur les relations financières et institutionnelles avec les États membres. Membre du conseil économique paroissial et guide bénévole de haute montagne." },
      { nom: "Eugénie Cabot", photo: "eugenie-cabot", role: "Commission Communication", bio: "Succès client et fidélisation, organisation d'événements et coordination des opérations. A travaillé cinq ans pour une ONG dans l'éducation à la finance personnelle." },
      { nom: "Nelly Gauche", photo: "nelly-gauche", role: "Commission Pastorale", bio: "Coordinatrice enfance et management d'équipes (jusqu'à 36 personnes), pilotage de projets éducatifs territoriaux. Animation d'éveil à la foi, groupes de prière et chorale paroissiale. Riche expérience associative et humanitaire (MSF, projets de développement, Amnesty)." },
      { nom: "Hervé Goguely", photo: "herve-goguely", role: "Commission Finance", bio: "Dirigeant d'entreprises, spécialiste de la levée de fonds et du développement. Créateur et président de la fondation Grattard-Goguely, incubateur de projets philanthropiques en France, au Sénégal et au Vietnam." },
      { nom: "Xavier Manuel", photo: "xavier-manuel", role: "Pilotage central · Coordinateur général", bio: "Coordinateur général et facilitateur du projet. Il anime le comité projet (CoProj), assure l'interface avec le diocèse et la représentation multi-conseils, gère les outils et moyens et tient à jour les tableaux de bord et grilles de décision." },
      { nom: "Gwendoline Jayne Tuzzeo", photo: "gwendoline-jayne-tuzzeo", role: "Photographe", bio: "Photographe, elle accompagne le projet en images et contribue à sa communication visuelle." },
    ],
  },

  missions: {
    intro:
      "Le projet avance grâce à l'engagement de bénévoles. Découvrez les missions ouvertes : cliquez sur une annonce pour lire la fiche détaillée. Toutes ces missions sont bénévoles, au service du projet Saint-Joseph.",
    groupes: [
      {
        nom: "Commission Communication",
        missions: [
          { id: "community-manager", titre: "Community manager", resume: "Animer les réseaux sociaux du projet.", mission: "Animer les réseaux sociaux du projet (Facebook, Instagram) : publier régulièrement l'avancement, les temps forts et les appels à la générosité, répondre aux messages et faire grandir une communauté engagée autour de Saint-Joseph.", profil: "Aisance avec les réseaux sociaux, sens de l'écriture courte et du visuel, créativité et régularité. Une première expérience (personnelle ou professionnelle) est un plus.", engagement: "Quelques heures par semaine, à distance, en lien avec la commission Communication." },
          { id: "designer", titre: "Designer / graphiste", resume: "Créer les visuels et supports du projet.", mission: "Concevoir les visuels du projet — affiches, publications réseaux, livret donateurs, signalétique — dans le respect de l'identité graphique (navy & or) et de la sobriété du projet.", profil: "Maîtrise d'outils de création (Canva, Suite Adobe ou équivalent), sens de la mise en page et du détail.", engagement: "À la mission, selon les besoins de communication." },
          { id: "data", titre: "Spécialistes data (3 jeunes)", resume: "Structurer et suivre les données du projet.", mission: "Structurer et suivre les données du projet : base de contacts et de donateurs, tableaux de suivi de la collecte, indicateurs et reporting simple et fiable.", profil: "Jeunes à l'aise avec les tableurs et la donnée, rigoureux et curieux. Idéal pour des étudiants en data, gestion ou informatique.", engagement: "En équipe (3 personnes), de façon ponctuelle et régulière, en lien avec les commissions Finance et Communication." },
          { id: "referent-digital", titre: "Référent digital & réseaux", resume: "Coordonner toutes les actions digitales.", mission: "Coordonner l'ensemble des actions digitales (site, réseaux, outils), garantir la cohérence des messages et accompagner les bénévoles du numérique.", profil: "Vision d'ensemble du digital, sens de l'organisation et goût de l'animation d'équipe.", engagement: "Rôle de coordination régulier, en lien direct avec la commission Communication." },
        ],
      },
      {
        nom: "Ambassadeurs (en paroisse)",
        missions: [
          { id: "amb-b2b", titre: "Ambassadeurs commerciaux (B2B)", resume: "Représenter le projet auprès des entreprises.", mission: "Représenter le projet auprès des entreprises et mécènes du territoire, présenter les opportunités de mécénat (réduction d'impôt de 60 %) et nouer des partenariats.", profil: "Aisance relationnelle, goût du contact et sens de la conviction. Une expérience commerciale ou entrepreneuriale est un atout.", engagement: "Rendez-vous et relances, à votre rythme, avec le soutien de la commission." },
          { id: "amb-jeunes", titre: "Ambassadeurs jeunes & ados", resume: "Porter le projet auprès des jeunes et familles.", mission: "Porter le projet auprès des jeunes et des familles, animer des temps de sensibilisation et de mobilisation, et donner envie de participer à l'aventure.", profil: "Jeunes dynamiques et enthousiastes, à l'aise pour parler en public et entraîner les autres.", engagement: "Selon vos disponibilités, en lien avec l'aumônerie et la pastorale." },
          { id: "referent-amb", titre: "Référent ambassadeurs", resume: "Animer et coordonner le réseau d'ambassadeurs.", mission: "Recruter, animer et coordonner le réseau d'ambassadeurs (B2B et jeunes), suivre les contacts et les engagements, et faire le lien avec les commissions.", profil: "Sens de l'organisation et du management bienveillant, goût du collectif.", engagement: "Rôle de coordination régulier." },
        ],
      },
      {
        nom: "Commission Construction & Art sacré",
        missions: [
          { id: "juriste", titre: "Juriste en droit de l'urbanisme", resume: "Sécuriser les démarches réglementaires.", mission: "Accompagner le projet sur les aspects réglementaires (PLU, autorisations, permis de construire), sécuriser les démarches et anticiper les risques juridiques.", profil: "Formation ou expérience en droit de l'urbanisme ou de l'immobilier. Bénévolat ponctuel d'expertise.", engagement: "À la mission, lors des étapes réglementaires clés." },
          { id: "dessinateur", titre: "Dessinateur (plans & perspectives)", resume: "Produire plans, croquis et perspectives.", mission: "Produire des plans, croquis et perspectives pour illustrer le projet (communication, présentations, dossiers), en lien avec l'équipe Construction & Art sacré.", profil: "Maîtrise d'outils de dessin / CAO (AutoCAD, SketchUp, Illustrator…) et sens de la représentation.", engagement: "À la mission, selon les besoins." },
        ],
      },
    ],
  },

  faq: [
    {
      q: "Pourquoi la paroisse fait-elle appel à la générosité de ses fidèles ?",
      a: "L'aménagement et la construction des bâtiments paroissiaux représentent un coût important. Pour continuer à accueillir, célébrer, accompagner et annoncer l'Évangile dans de bonnes conditions, la paroisse doit engager des investissements durables. La générosité de chacun rend ce projet possible.",
    },
    {
      q: "Comment aider si je ne peux pas donner financièrement ?",
      a: "En relayant notre appel auprès de votre entourage, vous permettez à notre message de toucher davantage de personnes et vous contribuez directement au succès de la campagne. Le partage est une aide précieuse — et vous pouvez aussi rejoindre nos équipes de bénévoles.",
    },
    {
      q: "Mon don peut-il vraiment faire la différence ?",
      a: "Oui. Chaque don compte, petit ou grand : chacun pose une pierre de plus à l'édifice. C'est par l'engagement de tous que ce projet verra le jour.",
    },
    {
      q: "Puis-je bénéficier d'une déduction fiscale ?",
      a: "Oui. Les dons consentis au profit de l'Église ouvrent droit, pour les particuliers imposables, à une réduction d'impôt de 66 % du montant du don, dans la limite de 20 % du revenu imposable. Ainsi, un don de 200 € ne vous coûte réellement que 68 €. Pour les entreprises, la réduction est de 60 %. Un reçu fiscal vous est adressé dans tous les cas.",
    },
  ],

  budget: {
    cartes: [
      { label: "Coût global", valeur: "6 M€ TTC" },
      { label: "Déjà réuni · terrain inclus", valeur: "1,4 M€" },
      { label: "Reste à financer", valeur: "4,6 M€ TTC" },
    ],
    citation: "Chaque don, quel que soit son montant, contribue à bâtir un lieu de foi, de communion et d'espérance.",
    repartition: [
      { label: "Construction & travaux", montant: "3 M€", pct: 60, couleur: "#00204E" },
      { label: "VRD · accès · stationnement", montant: "750 K€", pct: 15, couleur: "#6E7A5A" },
      { label: "Honoraires & assurances", montant: "700 K€", pct: 14, couleur: "#C5A24B" },
      { label: "Aménagements", montant: "400 K€", pct: 8, couleur: "#8a9b6e" },
      { label: "Études & conception", montant: "150 K€", pct: 3, couleur: "#3a6ea5" },
    ],
    note: "Répartition indicative de l'enveloppe travaux (hors part déjà couverte par l'acquisition du terrain).",
    calendrier: [
      { periode: "2025", label: "Acquisition du terrain" },
      { periode: "25-26", label: "Études & concours d'architecture" },
      { periode: "2026", label: "Autorisations" },
      { periode: "27-29", label: "Travaux" },
      { periode: "29-30", label: "Aménagements" },
      { periode: "2030", label: "Ouverture" },
    ],
  },

  don: {
    paliers: [
      { nom: "1 pierre", montant: 10, texte: "Vous posez la première pierre du clocher." },
      { nom: "10 pierres", montant: 100, texte: "Vous montez une rangée du mur." },
      { nom: "1 mur", montant: 1000, texte: "100 pierres : un mur entier s'élève." },
      { nom: "5 murs", montant: 5000, texte: "Le clocher prend de la hauteur." },
      { nom: "10 murs", montant: 10000, texte: "Les cloches approchent du sommet." },
      { nom: "Le clocher", montant: 0, texte: "Ensemble : les cloches sonnent en 2030." },
    ],
    virement: {
      beneficiaire: "Assoc. Diocésaine de Nice — Paroisse St Arnoux",
      iban: "FR76 1910 6006 1344 7002 5482 594",
      bic: "AGRIFRPP891",
      banque: "Crédit Agricole Provence Côte d'Azur",
      objet: "SJO2",
      qr: "/assets/img/qr-code-don-sjo2.png",
    },
    cheque: { ordre: "ADN – Paroisse St Arnoux", mention: "indiquer « SJO2 » au dos" },
    fiscalite: {
      particuliers:
        "Si vous êtes imposable, vous bénéficiez d'une réduction d'impôt sur le revenu de 66 % du montant de votre don, dans la limite de 20 % de votre revenu imposable. Ainsi, un don de 200 € ne vous coûte réellement que 68 €. Un reçu fiscal vous sera adressé.",
      entreprises:
        "Au titre de votre entreprise, vous bénéficiez d'une réduction d'impôt sur les sociétés de 60 % du montant de votre don, dans la limite de 20 000 € ou 5‰ du chiffre d'affaires annuel HT. Ainsi, un don de 500 € ne vous coûte réellement que 200 €. Un reçu fiscal vous sera adressé.",
    },
    engagements: [
      { nom: "Prier", texte: "Prier pour la réussite du projet et la mobilisation du territoire." },
      { nom: "Partager", texte: "Parler du projet et encourager d'autres à s'engager." },
      { nom: "Soutenir", texte: "Soutenir financièrement selon vos possibilités, avec reçu fiscal." },
      { nom: "S'engager", texte: "Rejoindre les équipes bénévoles et participer à la vie du projet." },
    ],
  },
} as const;

export type Membre = (typeof SITE.equipe.membres)[number];
export type Mission = (typeof SITE.missions.groupes)[number]["missions"][number];

/* ------------------------------------------------------------
   MENU « Le projet » (en-tête) : sous-entrées renvoyant vers la
   liste des articles filtrée par catégorie (onglet « Organisation
   du menu » du Google Sheet). Le nom doit correspondre à une
   catégorie de l'onglet « Catégories d'articles ».
   ------------------------------------------------------------ */
export const MENU_PROJET = [
  "Présentation",
  "Architecture",
  "Avancement",
  "Équipe",
  "Déduction fiscales",
  "Foire aux questions",
] as const;

/* Liens du pied de page (colonne « Qui sommes-nous » et « Liens utiles »). */
export const FOOTER_LINKS = {
  quiSommesNous: [
    { label: "Le projet", href: "/articles" },
    { label: "L'équipe", href: "/articles/qui-sommes-nous" },
    { label: "L'avancement", href: "/#avancement" },
    { label: "Le budget", href: "/articles/budget" },
    { label: "Rejoindre les bénévoles", href: "/articles/rejoindre-les-benevoles" },
  ],
  liensUtiles: [
    { label: "Calendrier des événements", href: "/calendrier" },
    { label: "Newsletter", href: "/newsletter" },
    { label: "Questions fréquentes", href: "/articles/questions-frequentes" },
    { label: "Diocèse de Nice", href: "https://nice.catholique.fr/" },
    { label: "Paroisse Saint-Arnoux (Facebook)", href: "https://www.facebook.com/saint.arnoux" },
    { label: "Commune du Rouret", href: "https://lerouret.fr/" },
  ],
} as const;
