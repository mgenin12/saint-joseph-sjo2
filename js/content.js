/* ============================================================================
   FICHIER CENTRAL DES CONTENUS DU SITE — PROJET SJO2 (ÉGLISE SAINT-JOSEPH)
   ============================================================================
   Ce fichier (`js/content.js`) regroupe TOUS les contenus modifiables du site
   afin que l'équipe paroissiale puisse mettre à jour le site sans toucher au
   code technique :

   1. SITE              : Montant de la collecte, textes d'accueil, avancement,
                          budget, équipe, missions bénévoles, FAQ, RIB, contacts.
   2. ARTICLES          : Les articles du site (titre, catégorie, résumé, image,
                          photos, vidéos et texte complet en Markdown).
   3. EVENEMENTS        : Les événements du calendrier (date, lieu, description,
                          lien d'inscription, galerie photos, vidéos YouTube,
                          et `visible: true / false` pour afficher ou masquer).
   4. CALENDRIER_GOOGLE : Optionnel — permet de synchroniser le Google Agenda
                          en filtrant uniquement les événements marqués `[Site]`.
   ============================================================================ */

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
    // Formulaire externe d'inscription à la newsletter (Google Form, Brevo…) — vide = formulaire du site
    newsletter: "",
    // Formulaire de contact externe (Google Form…) — vide = formulaire du site
    formulaireContact: "",
    diocese: "https://nice.catholique.fr/",
    paroisseFacebook: "https://www.facebook.com/saint.arnoux",
    commune: "https://lerouret.fr/",
    ancienSite: "https://saint-joseph.saint-arnoux.fr/",
  },

  contact: {
    email: "secretariat@saint-arnoux.fr",
    telephone: "04 93 77 28 33",
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
    meta: [
      "≈ 1 000 m² sur 1 ha de terrain",
      "Un budget global de 6 M€",
      "400 personnes accueillies",
      "Livraison prévue en 2030",
    ],
  },

  projet: {
    surtitre: "Le projet",
    titre: "Un projet immobilier structuré et conçu pour la mission.",
    intro:
      "La Paroisse Saint-Arnoux, qui fédère dix communes et localités de l'arrière-pays grassois autour du Rouret, bâtit un centre paroissial et son église Saint-Joseph pour accueillir une communauté en pleine croissance.",
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
      "Après l'achat du terrain et le feu vert du Diocèse de Nice, le projet entre dans sa phase concrète : études, concours d'architectes, autorisations, puis travaux. Étape après étape, suivez ici le chemin qui mène à l'ouverture du centre paroissial, puis de l'église Saint Joseph, à l'horizon 2030.",
    jalons: [
      {
        periode: "2025",
        etat: "done",
        titre: "Acquisition du terrain",
        texte: "Achat et paiement intégral de la parcelle arborée de 8 736 m² près du collège du Pré-des-Roures au Rouret.",
      },
      {
        periode: "2025",
        etat: "done",
        titre: "Premiers grands donateurs",
        texte: "Les premiers soutiens s'engagent aux côtés du projet et lancent la dynamique financière.",
      },
      {
        periode: "Mai 2026",
        etat: "done",
        titre: "Validation du Diocèse de Nice",
        texte: "Faisabilité et plan de financement approuvés lors du CID le 7 mai, puis avis favorable de la CDAE le 19 mai.",
      },
      {
        periode: "Sept.–Déc. 2026",
        etat: "now",
        titre: "Campagne de dons & concours d'architectes",
        texte:
          "Messe de rentrée devant plus de 400 fidèles sur le terrain, lancement de l'appel aux dons et consultation participative des 5 projets d'architectes finalistes les 28 et 29 novembre.",
      },
      {
        periode: "2026–2027",
        etat: "now",
        titre: "Fiabilisation technique & réglementaire",
        texte: "Consolidation des études avec l'architecte retenu, dépôt du permis de construire et autorisations.",
      },
      {
        periode: "2027–2030",
        etat: "todo",
        titre: "Travaux & ouverture",
        texte: "Consultation des entreprises, chantier éco-responsable puis ouverture du centre paroissial et de l'église Saint-Joseph.",
      },
    ],
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
      role: "Curé de la Paroisse Saint-Arnoux · Doyen du Pays de Grasse",
      photo: "/assets/img/pere-paul-bao-dinh-ly.jpeg",
      citation: "Ce n'est pas un bâtiment que nous allons ériger, c'est une mission. Nous sommes tous des bâtisseurs.",
      bio: "Prêtre du Diocèse de Nice, curé de la Paroisse Saint-Arnoux et doyen du Pays de Grasse, le Père Paul Bao Dinh LY pilote le projet en tant que représentant du maître d'ouvrage diocésain. Surnommé le « curé bâtisseur », il porte la vision pastorale et missionnaire du futur ensemble paroissial Saint-Joseph.",
    },
    competences: [
      "Pilotage professionnel",
      "Architecture",
      "Finances",
      "Construction",
      "Bureaux d'études",
      "Communication",
      "Levée de fonds",
      "Gestion de projet",
    ],
    benevoles:
      "Plus de 100 bénévoles sont engagés autour du projet, avec une exigence partagée : maîtrise des coûts et des risques, sécurité, pérennité constructive et respect de l'environnement.",
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
      a: "En France, les nouvelles églises construites après 1905 sont intégralement financées par les fidèles et les mécènes. Face à l'afflux de paroissiens dans les dix communes de Saint-Arnoux, ce nouvel ensemble paroissial et liturgique est indispensable pour accueillir, célébrer, catéchiser et accompagner chaque génération.",
    },
    {
      q: "Comment aider si je ne peux pas donner financièrement ?",
      a: "En relayant notre appel auprès de votre entourage, en participant aux consultations paroissiales et en rejoignant nos équipes de bénévoles (communication, ambassadeurs, construction et art sacré).",
    },
    {
      q: "Mon don peut-il vraiment faire la différence ?",
      a: "Oui. Chaque don compte, petit ou grand : dès 10 €, vous posez une pierre de plus au clocher de 22 mètres. C'est par l'engagement de tous les bâtisseurs que ce projet verra le jour.",
    },
    {
      q: "Puis-je bénéficier d'une déduction fiscale ?",
      a: "Oui. Les dons consentis au profit de l'Association Diocésaine de Nice ouvrent droit, pour les particuliers imposables, à une réduction d'impôt de 66 % du montant du don (dans la limite de 20 % du revenu imposable) : un don de 200 € ne vous coûte réellement que 68 €. Pour les entreprises, la réduction est de 60 %. Un reçu fiscal vous est adressé automatiquement.",
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

  concours: {
    surtitre: "Concours d'architecture · Automne 2026",
    titre: "5 projets finalistes présentés aux paroissiens.",
    intro:
      "Sur 33 cabinets d'architectes candidats et 10 équipes présélectionnées, 5 maquettes finalistes font l'objet d'une consultation participative ouverte aux fidèles, aux habitants et aux riverains les 28 et 29 novembre 2026 à la salle Charvet du Rouret, avant le dévoilement du projet lauréat à Noël 2026.",
    etapes: [
      { chiffre: "33", label: "Cabinets candidats", detail: "Ont répondu au cahier des charges diocésain et paroissial" },
      { chiffre: "10", label: "Équipes présélectionnées", detail: "Retenues après analyse technique et architecturale" },
      { chiffre: "5", label: "Maquettes finalistes", detail: "Exposées les 28 et 29 novembre 2026 à la salle Charvet" },
      { chiffre: "Noël 2026", label: "Projet lauréat", detail: "Annonce officielle de l'architecte retenu" },
    ],
    criteres: [
      "Intégration paysagère exemplaire : 70 % d'espaces verts et d'oliviers centenaires préservés sur les 8 736 m²",
      "Église d'au moins 300 places assises avec un clocher de 22 mètres, repère spirituel et architectural",
      "Centre paroissial vivant (grande salle polyvalente, salles de catéchisme et d'aumônerie, café, cuisine) et presbytère",
      "Sobriété énergétique, matériaux locaux et maîtrise rigoureuse de l'enveloppe budgétaire de 6 M€ TTC",
    ],
    maquettes: [
      {
        code: "Projet finaliste #1",
        titre: "Lumière & Oliviers",
        statut: "Exposé les 28–29 nov. 2026",
        resume: "Maquette et perspectives à découvrir lors de la consultation participative à la salle Charvet du Rouret.",
        image: "/assets/img/l-ensemble-paroissial-dans-son-site.jpeg",
      },
      {
        code: "Projet finaliste #2",
        titre: "Pierre & Parvis fraternel",
        statut: "Exposé les 28–29 nov. 2026",
        resume: "Maquette et perspectives à découvrir lors de la consultation participative à la salle Charvet du Rouret.",
        image: "/assets/img/terrain-vue-aerienne.jpeg",
      },
      {
        code: "Projet finaliste #3",
        titre: "Clocher des Collines",
        statut: "Exposé les 28–29 nov. 2026",
        resume: "Maquette et perspectives à découvrir lors de la consultation participative à la salle Charvet du Rouret.",
        image: "/assets/img/hero-eglise-nuit.jpeg",
      },
      {
        code: "Projet finaliste #4",
        titre: "Arche de Saint-Joseph",
        statut: "Exposé les 28–29 nov. 2026",
        resume: "Maquette et perspectives à découvrir lors de la consultation participative à la salle Charvet du Rouret.",
        image: "/assets/img/terrain-oliviers.jpeg",
      },
      {
        code: "Projet finaliste #5",
        titre: "Jardin & Sanctuaire",
        statut: "Exposé les 28–29 nov. 2026",
        resume: "Maquette et perspectives à découvrir lors de la consultation participative à la salle Charvet du Rouret.",
        image: "/assets/img/l-ensemble-paroissial-dans-son-site.jpeg",
      },
    ],
  },

  temoignages: {
    surtitre: "Le Livre d'Or des Bâtisseurs",
    titre: "Pourquoi nous bâtissons l'église Saint-Joseph.",
    intro:
      "Fidèles des dix communes de Saint-Arnoux, familles, catéchumènes et bénévoles témoignent de l'élan fraternel qui porte ce projet.",
    items: [
      {
        auteur: "Père Paul Bao Dinh LY",
        role: "Curé de la paroisse Saint-Arnoux · Doyen du Pays de Grasse",
        commune: "Le Rouret",
        citation:
          "Nous allons mettre une pelle dans notre âme et dans notre prière. Ce n'est pas un simple bâtiment que nous allons ériger, c'est une mission : nous bâtissons un lieu vivant pour les générations à venir.",
      },
      {
        auteur: "Bertrand",
        role: "Bénévole & chargé de projet pour la communauté",
        commune: "Paroisse Saint-Arnoux",
        citation:
          "Il n'y a aujourd'hui aucun édifice capable de contenir 600 personnes dans nos dix communes. Avec un lieu central au Rouret, près du collège et doté d'un grand parking, chaque famille pourra enfin être accueillie dignement.",
      },
      {
        auteur: "Marie & Thomas",
        role: "Parents de trois enfants au catéchisme et à l'aumônerie",
        commune: "Roquefort-les-Pins & Le Rouret",
        citation:
          "Voir plus de 400 personnes réunies sous les oliviers pour la messe de rentrée et cinq adultes demander le baptême nous a profondément touchés. Poser nos pierres chaque mois, c'est offrir une maison spirituelle à nos enfants.",
      },
      {
        auteur: "Un catéchumène de la promotion 2026",
        role: "En chemin vers le baptême",
        commune: "Pays de Grasse",
        citation:
          "Être accueilli par toute la communauté sur la terre même où s'élèvera la future église Saint-Joseph donne un sens concret au mot Église : une famille ouverte qui grandit et qui bâtit dans l'espérance.",
      },
    ],
  },
};

export const MENU_PROJET = ["Projet", "Équipe", "Architecture", "Agenda", "Budget"];

export const FOOTER_LINKS = {
  quiSommesNous: [
    { label: "Le projet de l'église au Rouret", href: "/articles/projet-eglise-saint-joseph-le-rouret" },
    { label: "Le Père Paul Bao Dinh Ly & l'équipe", href: "/articles/qui-est-bao-dinh" },
    { label: "Messe de rentrée & prochaines étapes", href: "/articles/messe-de-rentree-et-vie-du-projet" },
    { label: "Soutenir la collecte (clocher 22 m)", href: "/soutenir" },
    { label: "Bulletin de don papier (à imprimer)", href: "/soutenir/bulletin-de-don" },
  ],
  liensUtiles: [
    { label: "Calendrier des événements", href: "/calendrier" },
    { label: "Newsletter", href: "/newsletter" },
    { label: "Article Nice-Matin (4 oct. 2026)", href: "https://www.nicematin.com/societe/vie-locale/projet-a-6-millions-d-euros-unique-dans-les-alpes-maritimes-appel-aux-dons-face-a-la-croissance-du-nombre-de-fideles-cette-paroisse-lance-la-construction-d-une-eglise-10734256" },
    { label: "Diocèse de Nice", href: "https://nice.catholique.fr/" },
    { label: "Paroisse Saint-Arnoux (Facebook)", href: "https://www.facebook.com/saint.arnoux" },
    { label: "Commune du Rouret", href: "https://lerouret.fr/" },
    { label: "Espace rédaction (Admin)", href: "/admin" },
  ],
};

/* ============================================================================
   2. LES ARTICLES DU SITE
   ============================================================================
   Pour modifier un article ou en ajouter un nouveau :
   - Copiez un bloc `{ slug: "...", titre: "...", ... }` ci-dessous.
   - `statut: "publie"` affiche l'article sur le site ; `"brouillon"` le masque.
   - Vous pouvez ajouter des photos (`photos: [...]`) et des vidéos YouTube
     (`videos: [...]`) ainsi que des blocs interactifs dans `contenu` :
     `[[budget]]`, `[[equipe]]`, `[[avancement]]`, `[[clocher]]`, `[[missions]]`, `[[faq]]`.
   ============================================================================ */

export const ARTICLES = [
  {
    slug: "projet-eglise-saint-joseph-le-rouret",
    aliases: ["budget", "le-terrain", "les-architectes", "selection-des-architectes", "pourquoi-le-cout-a-augmente", "materiaux-locaux-et-normes"],
    titre: "Projet à 6 millions d'euros unique dans les Alpes-Maritimes : la paroisse Saint-Arnoux lance la construction de l'église Saint-Joseph au Rouret",
    categories: ["Projet", "Architecture", "Budget"],
    date: "2026-10-04",
    auteur: "Paroisse Saint-Arnoux (avec Nice-Matin)",
    image: "/assets/img/l-ensemble-paroissial-dans-son-site.jpeg",
    resume:
      "Face à la croissance rapide du nombre de fidèles dans les dix communes de la paroisse Saint-Arnoux, un nouvel ensemble paroissial et une église de 300 places avec un clocher de 22 mètres vont voir le jour au Rouret sur un terrain arboré d'oliviers centenaires.",
    motsCles: ["Le Rouret", "Nice-Matin", "Église Saint-Joseph", "Budget 6 M€", "Concours d'architectes", "Environnement"],
    statut: "publie",
    photos: [
      {
        url: "/assets/img/l-ensemble-paroissial-dans-son-site.jpeg",
        legende: "Intégration paysagère du futur ensemble paroissial Saint-Joseph au Rouret (70 % d'espaces végétalisés).",
      },
      {
        url: "/assets/img/hero-eglise-nuit.jpeg",
        legende: "Perspective nocturne de la future église Saint-Joseph et de son clocher de 22 mètres.",
      },
    ],
    videos: [],
    contenu: `C'est un chantier spirituel et architectural **unique dans le département des Alpes-Maritimes**. Comme le souligne le quotidien [*Nice-Matin* dans son reportage du 4 octobre 2026](https://www.nicematin.com/societe/vie-locale/projet-a-6-millions-d-euros-unique-dans-les-alpes-maritimes-appel-aux-dons-face-a-la-croissance-du-nombre-de-fideles-cette-paroisse-lance-la-construction-d-une-eglise-10734256), la **paroisse Saint-Arnoux** a officiellement lancé la construction de la future **église Saint-Joseph** et de son nouveau centre paroissial sur la commune du **Rouret**.

## Une paroisse de dix communes en pleine croissance démographique et missionnaire

La paroisse Saint-Arnoux fédère aujourd'hui **dix communes et localités** du moyen-pays grassois : **Le Rouret, Roquefort-les-Pins, Opio, Le Bar-sur-Loup, Châteauneuf-Grasse, Cipières, Courmes, Gourdon, Gréolières et Pont-du-Loup**.

Face à l'arrivée de nombreuses familles et au dynamisme des activités paroissiales (catéchisme, aumônerie des jeunes, catéchuménat adulte, parcours Alpha, chorale et solidarité), l'église historique Saint-Pons et les locaux actuels du centre Saint-Joseph (1104, route de Nice au Rouret) sont devenus trop exigus :

> « Devant la démographie grandissante de la paroisse, le centre paroissial est de plus en plus petit. Cette dynamique est limitée par l'espace, alors nous allons bâtir notre église et son centre paroissial sur ce terrain idéalement situé dans un espace arboré et préservé. Ce n'est pas un bâtiment que nous allons ériger, c'est une mission. Nous sommes tous des bâtisseurs. »
> — **Père Paul Bao Dinh Ly**, curé de la paroisse Saint-Arnoux (*Nice-Matin*, 4 octobre 2026)

## Un terrain de 8 736 m² à l'ombre des oliviers centenaires

Située à proximité immédiate du **collège du Pré-des-Roures** au Rouret (30, allée du Pré-des-Roures), la parcelle de **8 736 m²** (près d'un hectare) a été intégralement acquise et payée en 2025.

Planté d'**oliviers centenaires** et de **cyprès dressés vers le ciel**, ce terrain bénéficie d'une situation centrale pour l'ensemble des communes de la paroisse. Le projet accorde une place majeure au **volet environnemental** : **70 % de la parcelle restera en espaces paysagers**, pour accueillir les fidèles dans un cadre paisible et méditerranéen.

L'ensemble bâti (environ **1 000 m²**) regroupera trois pôles complémentaires permettant d'accueillir jusqu'à **400 personnes** :

1. **L'église Saint-Joseph (+ de 300 places)** : une nef lumineuse et priante, un parvis d'accueil fraternel et un **clocher de 22 mètres** appelé à devenir un repère spirituel et architectural durable.
2. **Le centre paroissial (+ de 100 personnes)** : une grande salle polyvalente pour les temps forts communautaires, des salles de catéchisme et d'aumônerie, un espace café convivial, une cuisine et les bureaux d'accueil.
3. **Le presbytère** : trois logements (T3) destinés aux prêtres au service de la communauté sacerdotale.

## 33 architectes candidats et une consultation participative les 28 et 29 novembre

Après le feu vert officiel du Diocèse de Nice en mai 2026 — validation par le Comité d'Investissement Diocésain (CID) le 7 mai, puis par la Commission Diocésaine d'Art Sacré (CDAE) le 19 mai — la sélection du maître d'œuvre est entrée dans sa phase active :

- **33 cabinets d'architectes** ont reçu le cahier des charges et remis leurs candidatures ;
- **10 équipes** sont présélectionnées lors d'un premier écrémage ;
- **5 projets finalistes** seront retenus pour le concours final et **présentés sous forme de maquettes lors d'une consultation participative** ouverte à la communauté paroissiale, au public et aux riverains les **28 et 29 novembre 2026** à la **salle Charvet du Rouret**, à l'occasion de la kermesse paroissiale ;
- Le projet lauréat sera dévoilé **durant les fêtes de Noël 2026**.

[[concours]]

## Un budget de 6 millions d'euros financé par l'appel aux dons

Comme le rappelle Bertrand, bénévole et chargé de projet pour la communauté : *« L'enveloppe prévisionnelle est de 6 millions d'euros au total, comprenant le terrain qui est déjà acquis. Nous lançons bien évidemment un appel aux dons, c'est ainsi que nous financerons ce projet. »*

Grâce à l'acquisition du terrain et à l'engagement des premiers grands donateurs, **1,4 M€ ont déjà été réunis**. Il reste **4,6 M€ TTC** à mobiliser sur la durée du chantier pour ériger le centre paroissial puis l'église :

[[budget]]

Chaque don (déductible de l'impôt sur le revenu à hauteur de **66 %** pour les particuliers et de **60 %** pour les entreprises) permet de poser symboliquement une pierre de 10 € ou un mur de 1 000 € pour faire monter le clocher de 22 mètres.`,
  },

  {
    slug: "qui-est-bao-dinh",
    aliases: ["qui-sommes-nous"],
    titre: "Portrait du Père Paul Bao Dinh Ly, le « curé bâtisseur » de la paroisse Saint-Arnoux",
    categories: ["Équipe", "Projet"],
    date: "2026-10-05",
    auteur: "Équipe projet SJO2",
    image: "/assets/img/pere-paul-bao-dinh-ly.jpeg",
    resume:
      "Curé de la paroisse Saint-Arnoux et doyen du Pays de Grasse au sein du Diocèse de Nice, le Père Paul Bao Dinh Ly fédère plus de 100 bénévoles et une équipe pluridisciplinaire autour du projet de l'église Saint-Joseph au Rouret.",
    motsCles: ["Père Paul Bao Dinh Ly", "Curé bâtisseur", "Paroisse Saint-Arnoux", "Diocèse de Nice", "Équipe", "Bénévoles"],
    statut: "publie",
    photos: [
      {
        url: "/assets/img/pere-paul-bao-dinh-ly.jpeg",
        legende: "Le Père Paul Bao Dinh Ly, curé de la paroisse Saint-Arnoux et doyen du Pays de Grasse.",
      },
    ],
    videos: [],
    contenu: `Surnommé avec affection le **« curé bâtisseur »** dans les colonnes de [*Nice-Matin*](https://www.nicematin.com/societe/vie-locale/projet-a-6-millions-d-euros-unique-dans-les-alpes-maritimes-appel-aux-dons-face-a-la-croissance-du-nombre-de-fideles-cette-paroisse-lance-la-construction-d-une-eglise-10734256), le **Père Paul Bao Dinh Ly** (Lý Bảo Đinh) est l'âme et le pilote pastoral du projet de construction de l'église Saint-Joseph et de son centre paroissial au Rouret.

## Un pasteur au service du Diocèse de Nice et du Pays de Grasse

Prêtre du **Diocèse de Nice**, le Père Paul Bao Dinh Ly exerce sa mission au cœur des Alpes-Maritimes avec une double responsabilité pastorale et diocésaine :

- **Curé de la paroisse Saint-Arnoux**, qui rassemble dix communes et villages de l'arrière-pays grassois autour du Rouret (Roquefort-les-Pins, Le Rouret, Opio, Le Bar-sur-Loup, Châteauneuf-Grasse, Cipières, Courmes, Gourdon, Gréolières et Pont-du-Loup) ;
- **Doyen du Pays de Grasse**, coordonnant l'action pastorale des paroisses du doyenné en lien étroit avec l'évêque de Nice, Mgr Jean-Philippe Nault ;
- Au sein du diocèse, il a également servi comme **modérateur pour la Pastorale Liturgique et Sacramentelle (PLS)**, cérémoniaire épiscopal et aumônier de la **Communauté catholique vietnamienne de la Côte d'Azur**.

## « Mettre une pelle dans notre âme et dans notre prière »

Pour le Père Paul Bao Dinh Ly, la construction d'une église au XXIᵉ siècle ne répond pas seulement à un besoin matériel de mètres carrés : elle est le fruit et l'outil d'un **renouveau missionnaire**. Lors de la messe de rentrée en plein air célébrée fin septembre 2026 devant plus de 400 fidèles sous les oliviers du futur terrain, il a accueilli **cinq nouveaux catéchumènes** en route vers le baptême ainsi qu'une personne appelée à la conversion, avant de lancer à l'assemblée :

> « Nous allons mettre une pelle dans notre âme et dans notre prière. [...] Nous ne bâtissons pas seulement des murs. Nous bâtissons un lieu vivant. »
> — **Père Paul Bao Dinh Ly**

Cette conviction irrigue tout le cahier des charges du projet SJO2 : concevoir un lieu à la fois profondément sacré pour la liturgie, chaleureux et ouvert pour les familles et les jeunes, et respectueux de la beauté naturelle du site du Rouret.

## Une équipe structurée de 19 experts et plus de 100 bénévoles

Pour mener à bien un projet de **6 millions d'euros** avec la rigueur professionnelle qu'il exige, le Père Paul Bao Dinh Ly s'est entouré d'un comité de pilotage et de quatre commissions spécialisées (**Pilotage central, Construction & Art sacré, Finance, Pastorale & Communication**) réunissant ingénieurs, chefs de projets, architectes, juristes, financiers et communicants :

[[equipe]]`,
  },

  {
    slug: "messe-de-rentree-et-vie-du-projet",
    aliases: [
      "la-journee-de-rentree",
      "ou-en-est-le-projet",
      "les-evenements",
      "questions-frequentes",
      "reduction-d-impot",
      "rejoindre-les-benevoles",
    ],
    titre: "Plus de 400 fidèles sous les oliviers, Clocher des Bâtisseurs et prochaines étapes : comment participer à l'aventure",
    categories: ["Agenda", "Avancement", "Foire aux questions", "Déduction fiscales"],
    date: "2026-10-06",
    auteur: "Commission Communication SJO2",
    image: "/assets/img/hero-eglise-nuit.jpeg",
    resume:
      "Retour sur la première messe de rentrée célébrée en plein air sur le terrain du Rouret devant plus de 400 personnes, calendrier des prochaines étapes jusqu'au choix de l'architecte à Noël, fonctionnement du Clocher des Bâtisseurs et missions bénévoles.",
    motsCles: ["Messe de rentrée", "Mgr Jean-Philippe Nault", "Clocher des Bâtisseurs", "Kermesse novembre", "Bénévolat", "Fiscalité"],
    statut: "publie",
    photos: [
      {
        url: "/assets/img/hero-eglise-nuit.jpeg",
        legende: "Le futur clocher de 22 mètres s'élève au rythme des dons de toute la communauté.",
      },
    ],
    videos: [],
    contenu: `La rentrée pastorale de septembre 2026 restera gravée dans la mémoire de la paroisse Saint-Arnoux. Pour la première fois, **plus de 400 fidèles** se sont rassemblés en plein air sur le terrain même où s'élèvera la future église Saint-Joseph, près du collège du Pré-des-Roures au Rouret, en présence de **Mgr Jean-Philippe Nault**, évêque de Nice, et du **Père Paul Bao Dinh Ly**.

## Une célébration fondatrice sous les oliviers centenaires

À l'ombre des oliviers centenaires et des grands cyprès qui bordent la parcelle de 8 736 m², familles, jeunes de l'aumônerie, anciens et élus ont découvert concrètement l'emplacement du futur ensemble paroissial. L'intronisation de **cinq catéchumènes** adultes qui recevront le baptême au printemps a donné à cette journée tout son sens : bâtir l'église de demain pour celles et ceux qui frappent aujourd'hui à sa porte.

## Où en est le projet aujourd'hui ?

Après l'acquisition du terrain en 2025 et les validations diocésaines de mai 2026 (CID et CDAE), l'automne 2026 est rythmé par le **concours d'architectes** (33 candidats, 10 sélectionnés, puis **5 finalistes exposés les 28 et 29 novembre 2026 à la salle Charvet** lors de la kermesse paroissiale, avant l'annonce du lauréat à **Noël 2026**) :

[[avancement]]

## Le « Clocher des Bâtisseurs » : 22 mètres à élever ensemble

Pour permettre à chacun de suivre et de soutenir concrètement l'avancement de la collecte, la paroisse a imaginé le **Clocher des Bâtisseurs** :

- **1 pierre = 10 €** · **1 mur = 100 pierres = 1 000 €** ;
- Les **22 mètres** du clocher représentent les **6 M€** du budget global (soit environ **272 727 € par mètre**) ;
- Avec **1,4 M€ déjà réunis** (terrain inclus), le clocher culmine déjà à **5,13 mètres** (140 000 pierres posées).

[[clocher]]

## Rejoindre les équipes de bénévoles

Au-delà du don financier, plus de 100 bénévoles font vivre le projet au quotidien. Trois commissions recrutent actuellement de nouveaux talents :

[[missions]]

## Questions fréquentes sur le projet et la réduction d'impôt (66 % / 60 %)

[[faq]]`,
  },
];

/* ============================================================================
   3. LES ÉVÉNEMENTS DU CALENDRIER (/calendrier)
   ============================================================================
   Chaque événement ci-dessous crée automatiquement :
   - un point doré sur le calendrier mensuel (/calendrier) ;
   - une fiche détaillée avec bouton « S'inscrire » au clic sur la date ;
   - une page web dédiée (/calendrier/<slug>) pouvant afficher une galerie de
     photos (`photos`) et des vidéos YouTube / MP4 (`videos`).

   Pour masquer un événement aux visiteurs sans le supprimer, mettez :
     `visible: false`
   ============================================================================ */

export const EVENEMENTS = [
  {
    slug: "2026-05-07-comite-d-investissement-diocesain",
    visible: true,
    titre: "Comité d'Investissement Diocésain (CID)",
    date: "2026-05-07",
    categorie: "Étape du projet",
    lieu: "Diocèse de Nice",
    description:
      "Validation officielle de la faisabilité et du plan de financement du projet SJO2 par le Comité d'Investissement Diocésain du Diocèse de Nice.",
    photos: [],
    videos: [],
  },
  {
    slug: "2026-05-19-commission-diocesaine-d-art-sacre",
    visible: true,
    titre: "Commission Diocésaine d'Art Sacré (CDAE)",
    date: "2026-05-19",
    categorie: "Étape du projet",
    lieu: "Diocèse de Nice",
    description:
      "Avis favorable de la Commission Diocésaine d'Art Sacré sur le programme architectural, liturgique et artistique de l'église Saint-Joseph et de son centre paroissial.",
    photos: [],
    videos: [],
  },
  {
    slug: "2026-06-21-fete-de-fin-d-annee-les-batisseurs",
    visible: true,
    titre: "Fête de fin d'année — Les Bâtisseurs",
    date: "2026-06-21",
    categorie: "Événement",
    lieu: "Paroisse Saint-Arnoux, Le Rouret",
    description:
      "Fête paroissiale de fin d'année sur le thème des Bâtisseurs : temps fraternel et festif autour du projet Saint-Joseph.",
    lienInfo: "https://www.facebook.com/saint.arnoux",
    photos: [],
    videos: [],
  },
  {
    slug: "2026-08-15-messe-de-l-assomption",
    visible: true,
    titre: "Messe de l'Assomption de la Vierge Marie",
    date: "2026-08-15",
    categorie: "Célébration",
    lieu: "Paroisse Saint-Arnoux",
    description: "Solennité de l'Assomption célébrée avec l'ensemble de la communauté paroissiale.",
    photos: [],
    videos: [],
  },
  {
    slug: "2026-09-lancement-public-de-la-campagne-de-dons",
    visible: true,
    titre: "Lancement public de la campagne de dons & concours d'architectes",
    date: "2026-09-01",
    dateFin: "2026-09-30",
    categorie: "Étape du projet",
    lieu: "Le Rouret",
    description:
      "Ouverture officielle de l'appel aux dons (« Le Clocher des Bâtisseurs ») et remise du cahier des charges aux 33 cabinets d'architectes candidats.",
    photos: [],
    videos: [],
  },
  {
    slug: "2026-09-20-premiere-messe-de-rentree-sur-le-nouveau-terrain",
    visible: true,
    titre: "1ʳᵉ messe de rentrée en plein air sur le terrain de la future église",
    date: "2026-09-20",
    heureDebut: "10:30",
    categorie: "Célébration",
    lieu: "Terrain du Pré-des-Roures, Le Rouret",
    description:
      "Plus de 400 fidèles réunis à l'ombre des oliviers centenaires pour la messe de rentrée présidée par Mgr Jean-Philippe Nault, évêque de Nice, aux côtés du Père Paul Bao Dinh Ly. Intronisation de cinq catéchumènes et lancement solennel du projet Saint-Joseph.",
    lienInfo:
      "https://www.nicematin.com/societe/vie-locale/projet-a-6-millions-d-euros-unique-dans-les-alpes-maritimes-appel-aux-dons-face-a-la-croissance-du-nombre-de-fideles-cette-paroisse-lance-la-construction-d-une-eglise-10734256",
    photos: [
      {
        url: "/assets/img/l-ensemble-paroissial-dans-son-site.jpeg",
        legende: "Le site arboré du Pré-des-Roures au Rouret qui a accueilli plus de 400 fidèles fin septembre.",
      },
      {
        url: "/assets/img/pere-paul-bao-dinh-ly.jpeg",
        legende: "Le Père Paul Bao Dinh Ly : « Nous allons mettre une pelle dans notre âme et dans notre prière. »",
      },
    ],
    videos: [],
  },
  {
    slug: "2026-11-28-kermesse-et-consultation-des-maquettes-d-architectes",
    visible: true,
    titre: "Kermesse paroissiale & Consultation participative des 5 projets d'architectes",
    date: "2026-11-28",
    dateFin: "2026-11-29",
    heureDebut: "10:00",
    heureFin: "18:00",
    categorie: "Consultation & Événement",
    lieu: "Salle Charvet, Le Rouret",
    description:
      "Présentation publique des maquettes des **5 cabinets d'architectes finalistes** retenus à l'issue du concours. Tous les paroissiens, habitants et riverains sont invités à découvrir les projets et à donner leur avis avant le choix final.",
    lienInscription: "/contact",
    photos: [
      {
        url: "/assets/img/hero-eglise-nuit.jpeg",
        legende: "Découverte des esquisses et maquettes de la future église Saint-Joseph.",
      },
    ],
    videos: [],
  },
  {
    slug: "2026-12-25-annonce-du-projet-architectural-laureat",
    visible: true,
    titre: "Fêtes de Noël — Dévoilement du projet d'architecte retenu",
    date: "2026-12-25",
    categorie: "Étape du projet",
    lieu: "Paroisse Saint-Arnoux, Le Rouret",
    description:
      "À l'issue de la consultation participative de fin novembre, la paroisse Saint-Arnoux et le Père Paul Bao Dinh Ly dévoilent durant les fêtes de Noël le projet architectural lauréat pour l'église Saint-Joseph et le centre paroissial.",
    photos: [],
    videos: [],
  },
];

/* ============================================================================
   4. SYNCHRONISATION GOOGLE AGENDA (OPTIONNELLE)
   ============================================================================
   - Si `activer: false` (recommandé pour la simplicité), seuls les événements
     listés dans `EVENEMENTS` ci-dessus sont affichés.
   - Si `activer: true`, le site lit aussi le Google Agenda ci-dessous.
   - Pour ne rendre visibles sur le site QUE certains événements du Google
     Agenda, laissez `filtrerVisibilite: true` : seuls les événements dont
     la visibilité Google Agenda est réglée sur « Public » OU dont le titre /
     la description contient `[Site]` (ou `#site`) seront affichés aux visiteurs !
   ============================================================================ */

export const CALENDRIER_GOOGLE = {
  activer: true,
  calendarId: "9f2cb93155d97884909c3bcb4fb4c887a2659636e5c6059d68c6e43ad0b842e5@group.calendar.google.com",
  // Si true : un événement du Google Agenda n'apparaît sur le site que s'il contient
  // `[Site]` ou `#site` (dans son titre ou sa description) OU s'il est marqué « Public » (CLASS:PUBLIC).
  filtrerVisibilite: true,
  motCleFiltre: "[Site]",
  // Si true : conserve toujours les événements de `EVENEMENTS` ci-dessus en plus du Google Agenda.
  fusionnerAvecEvenementsLocaux: true,
};
