/* ============================================================================
   FICHIER UNIQUE DE CONTENU DU SITE — js/content.js
   Projet SJO2 · Église Saint-Joseph & Centre Paroissial (Le Rouret)
   Paroisse Saint-Arnoux - Diocèse de Nice
   ============================================================================

   👉 TOUT LE CONTENU DU SITE SE MODIFIE ICI, SANS TOUCHER AU CODE :
   1. Chiffres de la collecte et coordonnées (SITE.collecte, SITE.contact…)
   2. Textes de la page d'accueil, frise d'avancement, équipe, budget, FAQ (SITE)
   3. Les articles du site (ARTICLES)
   4. Les événements du calendrier, avec photos et vidéos (CALENDRIER)

   💡 Comment modifier ce fichier directement sur GitHub :
   - Ouvrez https://github.com/mgenin12/saint-joseph-sjo2/blob/main/js/content.js
   - Cliquez sur l'icône crayon ✏️ (« Edit this file ») en haut à droite
   - Modifiez les textes entre guillemets, puis cliquez sur « Commit changes… »
   ============================================================================ */

export const SITE = {
  nom: "Saint Joseph",
  sousTitre: "Paroisse Saint-Arnoux · Le Rouret",
  adresse: "1104 route de Nice · 30 Allée du Pré des Roures · 06650 Le Rouret",
  devise: "Pour aujourd'hui, pour demain, pour la Mission.",
  valeursLigne: "Foi · Transmission · Fraternité · Espérance",
  afficherValeurs: true,

  /* --------------------------------------------------------------------------
     1. COLLECTE & OBJECTIF (le clocher de 22 m se calcule automatiquement)
     -------------------------------------------------------------------------- */
  collecte: {
    // Montant déjà réuni (terrain inclus) et objectif global, en euros :
    montantCollecte: 1_400_000,
    objectif: 6_000_000,
  },

  liens: {
    don: "https://don-nice.catholique.fr/centre-paroissial-st-arnoux-rouret/",
    newsletter: "",
    formulaireContact: "",
    diocese: "https://nice.catholique.fr/",
    paroisseFacebook: "https://www.facebook.com/saint.arnoux",
    commune: "https://lerouret.fr/",
    ancienSite: "https://saint-joseph.saint-arnoux.fr/",
  },

  contact: {
    email: "",
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

  /* --------------------------------------------------------------------------
     2. PAGE D'ACCUEIL (« Découvrir », « L'avancement », « Nos valeurs »)
     -------------------------------------------------------------------------- */
  hero: {
    titre: ["Bâtir un lieu de ", "Foi", ", de ", "Vie", " et d'", "Espérance", "."],
    meta: [
      "≈ 1 000 m² sur 1 ha de terrain",
      "Un budget global de 6 M€",
      "400 personnes accueillies",
      "Horizon 2030–2031",
    ],
  },

  projet: {
    surtitre: "Le projet",
    titre: "Un projet immobilier structuré et conçu pour la mission.",
    intro:
      "La Paroisse Saint-Arnoux, qui rassemble dix communes autour du Rouret, bâtit un centre paroissial et l'église Saint-Joseph pour répondre à la forte croissance démographique et missionnaire du territoire.",
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
        points: [
          "Nef principale lumineuse",
          "Clocher de 22 m",
          "Parvis & espaces extérieurs sous les oliviers",
          "Lieu liturgique durable et écologique",
        ],
      },
      {
        titre: "Le Presbytère",
        capacite: "3 logements",
        points: [
          "3 logements (T3) de prêtres",
          "Lieu de vie de la communauté sacerdotale",
        ],
      },
    ],
  },

  avancement: {
    surtitre: "L'avancement",
    titre: "Une dynamique déjà lancée.",
    intro:
      "Après l'achat du terrain et le feu vert du Diocèse de Nice, le projet entre dans sa phase concrète : concours d'architectes, exposition participative des maquettes, autorisations, puis travaux. Étape après étape, suivez ici le chemin qui mène à l'ouverture du centre paroissial, puis de l'église Saint Joseph.",
    jalons: [
      {
        periode: "2025",
        etat: "done",
        titre: "Acquisition du terrain",
        texte: "Achat et paiement intégral du terrain arboré de 8 736 m² au Rouret, près du collège du Pré-des-Roures.",
      },
      {
        periode: "2025",
        etat: "done",
        titre: "Premiers grands donateurs",
        texte: "Les premiers soutiens s'engagent aux côtés du projet et permettent de réunir 1,4 M€ (terrain inclus).",
      },
      {
        periode: "Mai 2026",
        etat: "done",
        titre: "Validation du Diocèse",
        texte: "Faisabilité et plan de financement approuvés par le Comité d'Investissement Diocésain (CID le 7 mai) et la Commission Diocésaine d'Art Sacré (CDAE le 19 mai).",
      },
      {
        periode: "Automne 2026",
        etat: "now",
        titre: "Concours des 33 architectes & appel aux dons",
        texte: "Messe de rentrée devant plus de 400 fidèles sur le terrain, sélection de 10 puis 5 cabinets finalistes et exposition des maquettes les 28–29 novembre à la salle Charvet.",
      },
      {
        periode: "Noël 2026 – 2027",
        etat: "now",
        titre: "Choix de l'architecte & études réglementaires",
        texte: "Dévoilement du projet lauréat à Noël, consolidation des études techniques, environnementales et dépôt du permis de construire.",
      },
      {
        periode: "2027–2030",
        etat: "todo",
        titre: "Travaux & ouverture",
        texte: "Consultation des entreprises, construction puis inauguration du centre paroissial et de l'église Saint-Joseph.",
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

  /* --------------------------------------------------------------------------
     2bis. TÉMOIGNAGES (« Pourquoi je bâtis »)
     Affichés sur la page d'accueil et sur la page /soutenir.
     -------------------------------------------------------------------------- */
  temoignages: {
    surtitre: "Pourquoi je bâtis",
    titre: "La parole aux paroissiens et aux donateurs.",
    intro:
      "Familles nouvellement installées, catéchumènes, bénévoles ou chefs d'entreprise : chacun pose sa pierre pour que l'église Saint-Joseph et son centre paroissial voient le jour au Rouret.",
    items: [
      {
        citation:
          "Arrivés au Rouret il y a trois ans avec nos trois enfants, nous avons trouvé dans la paroisse Saint-Arnoux une vraie famille spirituelle. Mais le dimanche et au catéchisme, on pousse littéralement les murs ! Donner chaque mois pour bâtir Saint-Joseph, c'est offrir à nos enfants un lieu où grandir dans la foi.",
        auteur: "Claire & Thomas M.",
        role: "Jeune famille de la paroisse",
        commune: "Le Rouret",
      },
      {
        citation:
          "J'ai demandé le baptême à l'âge adulte cette année. Être accueilli sous les oliviers du futur terrain lors de la messe de rentrée devant plus de 400 fidèles m'a profondément touché. Bâtir cette église, c'est ouvrir grand les portes à tous ceux qui cherchent Dieu aujourd'hui.",
        auteur: "Marc D.",
        role: "Catéchumène",
        commune: "Roquefort-les-Pins",
      },
      {
        citation:
          "En tant que chef d'entreprise attaché à notre territoire, le mécénat à 60 % nous permet de soutenir concrètement un projet patrimonial et fraternel qui rayonnera sur nos dix communes pendant des siècles. C'est un investissement local qui a du sens.",
        auteur: "Pierre-Antoine L.",
        role: "Dirigeant de PME & mécène",
        commune: "Châteauneuf-de-Grasse",
      },
      {
        citation:
          "On ne bâtit pas une église à chaque génération ! Même une pierre à 10 € ou quelques heures de bénévolat dans une commission font avancer l'édifice. Voir plus de cent bénévoles unir leurs compétences autour du père Bao-Dinh est une immense source d'espérance.",
        auteur: "Marie-Hélène V.",
        role: "Bénévole engagée",
        commune: "Opio",
      },
    ],
  },

  /* --------------------------------------------------------------------------
     3. ÉQUIPE PROJET, MISSIONS BÉNÉVOLES, FAQ, BUDGET & DONS
     -------------------------------------------------------------------------- */
  equipe: {
    intro:
      "Le projet est porté par la Paroisse Saint-Arnoux et l'Association Diocésaine de Nice, accompagnées d'une équipe d'experts structurée et bénévole.",
    cure: {
      nom: "Père Paul Bao Dinh LY",
      role: "Curé de la Paroisse Saint-Arnoux",
      photo: "/assets/img/pere-paul-bao-dinh-ly.jpeg",
      citation: "Ce n'est pas un bâtiment que nous allons ériger, c'est une mission. Nous sommes tous des bâtisseurs.",
      bio: "Ordonné prêtre le 11 octobre 2009 en la cathédrale Sainte-Réparate de Nice, curé de la paroisse Saint-Arnoux et membre du conseil épiscopal du Diocèse de Nice, le Père Paul Bao-Dinh Ly est le pilote principal du projet SJO2. Surnommé le « curé bâtisseur », il fédère les dix communes de la paroisse autour de la construction de l'église Saint-Joseph et de son centre paroissial au Rouret.",
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
      a: "En France, les nouvelles églises construites depuis 1905 sont intégralement financées par les fidèles et les mécènes. Face à la forte croissance démographique des dix communes de la paroisse Saint-Arnoux, les locaux actuels sont devenus trop étroits. La générosité de chacun permet de bâtir un lieu d'accueil, de prière et de fraternité pour les générations futures.",
    },
    {
      q: "Comment aider si je ne peux pas donner financièrement ?",
      a: "En relayant notre appel auprès de votre entourage, en priant pour le projet, ou en rejoignant nos équipes de bénévoles (communication, ambassadeurs, construction, accueil lors des événements comme la kermesse des 28 et 29 novembre).",
    },
    {
      q: "Mon don peut-il vraiment faire la différence ?",
      a: "Oui. Chaque don compte, petit ou grand : dès 10 €, vous posez une pierre de l'édifice et faites s'élever le clocher de 22 mètres. C'est par l'engagement de tous que ce projet verra le jour.",
    },
    {
      q: "Puis-je bénéficier d'une déduction fiscale ?",
      a: "Oui. Les dons consentis à l'Association Diocésaine de Nice ouvrent droit, pour les particuliers imposables, à une réduction d'impôt sur le revenu de 66 % du montant du don (dans la limite de 20 % du revenu imposable) : un don de 200 € ne vous coûte réellement que 68 €. Pour les entreprises, la réduction est de 60 % (un don de 500 € revient à 200 €). Un reçu fiscal officiel vous est adressé.",
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
    note: "Répartition indicative de l'enveloppe travaux (5 M€ hors part déjà couverte par l'acquisition du terrain).",
    calendrier: [
      { periode: "2025", label: "Acquisition du terrain" },
      { periode: "Automne 2026", label: "Concours des 33 architectes" },
      { periode: "Noël 2026", label: "Choix du cabinet lauréat" },
      { periode: "2027", label: "Études & autorisations" },
      { periode: "2028–2030", label: "Travaux & aménagements" },
      { periode: "2030–2031", label: "Inauguration" },
    ],
  },

  don: {
    paliers: [
      { nom: "1 pierre", montant: 10, texte: "Vous posez la première pierre du clocher." },
      { nom: "10 pierres", montant: 100, texte: "Vous montez une rangée du mur." },
      { nom: "1 mur", montant: 1000, texte: "100 pierres : un mur entier s'élève." },
      { nom: "5 murs", montant: 5000, texte: "Le clocher prend de la hauteur." },
      { nom: "10 murs", montant: 10000, texte: "Les cloches approchent du sommet." },
      { nom: "Le clocher", montant: 0, texte: "Ensemble : les cloches sonnent à 22 mètres." },
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
    bonDeSoutien: {
      titre: "Bon de soutien — Projet SJO2",
      sousTitre:
        "À imprimer et à retourner accompagné de votre chèque ou de votre avis de virement pour recevoir votre reçu fiscal officiel.",
      adressePostale: [
        "Paroisse Saint-Arnoux — Projet SJO2",
        "1104 route de Nice · 30 Allée du Pré des Roures",
        "06650 Le Rouret",
      ],
      montantsParticuliers: [50, 100, 200, 500, 1000],
      montantsEntreprises: [1000, 2500, 5000, 10000],
      noteRecuFiscal:
        "Les dons versés à l'Association Diocésaine de Nice ouvrent droit à un reçu fiscal officiel (réduction d'impôt de 66 % sur l'impôt sur le revenu pour les particuliers dans la limite de 20 % du revenu imposable ; réduction de 60 % sur l'impôt sur les sociétés ou l'IR pour les entreprises dans la limite de 20 000 € ou 5 ‰ du chiffre d'affaires HT).",
    },
  },

  /* --------------------------------------------------------------------------
     3bis. ESPACE ENTREPRISES & MÉCÉNAT (60 % de réduction d'impôt)
     Affiché sur /soutenir et sur la brochure imprimable /mecenat.
     -------------------------------------------------------------------------- */
  mecenat: {
    surtitre: "Entreprises & Mécénat · 60 % de déduction",
    titre: "Associez votre entreprise à un projet patrimonial et fraternel d'exception.",
    intro:
      "En soutenant la construction de l'église Saint-Joseph et du centre paroissial au Rouret, votre entreprise participe à l'édification d'un lieu d'accueil, de culture et de lien social au cœur des dix communes de la paroisse Saint-Arnoux, tout en bénéficiant du régime fiscal du mécénat d'entreprise (article 238 bis du Code général des impôts).",
    avantages: [
      {
        titre: "60 % de réduction d'impôt (IS ou IR)",
        texte:
          "Votre entreprise déduit 60 % du montant du don de son impôt sur les sociétés (ou impôt sur le revenu), dans la limite de 20 000 € ou 5 ‰ du chiffre d'affaires annuel HT (avec report possible de l'excédent sur les 5 exercices suivants).",
      },
      {
        titre: "Ancrage local sur 10 communes",
        texte:
          "Un projet emblématique au Rouret qui rassemble Roquefort-les-Pins, Le Rouret, Opio, Châteauneuf-de-Grasse, Le Bar-sur-Loup, Gourdon, Cipières, Courmes, Gréolières et Pont-du-Loup, avec 70 % d'espaces paysagers préservés.",
      },
      {
        titre: "Convention & reconnaissance des mécènes",
        texte:
          "Établissement d'une convention de mécénat sur demande, reçu fiscal officiel de l'Association Diocésaine de Nice, invitation aux étapes clés (présentation des maquettes, pose de la première pierre, inauguration).",
      },
    ],
    paliersEntreprises: [
      {
        nom: "1 mur bâti",
        don: 1000,
        coutReel: 400,
        equivalent: "100 pierres posées",
        description: "Soutien d'un mur de l'édifice · Mention au livre des entreprises bâtisseuses.",
      },
      {
        nom: "5 murs bâtis",
        don: 5000,
        coutReel: 2000,
        equivalent: "500 pierres posées",
        description: "Mécène engagé · Invitation aux temps forts et à la présentation des maquettes.",
      },
      {
        nom: "10 murs bâtis",
        don: 10000,
        coutReel: 4000,
        equivalent: "1 000 pierres posées",
        description: "Grand partenaire du chantier · Convention personnalisée et visibilité dédiée.",
      },
      {
        nom: "Grand Mécène du Clocher",
        don: 25000,
        coutReel: 10000,
        equivalent: "Près d'1 mètre de clocher",
        description: "Mécénat pluriannuel possible (sur 2 à 5 exercices fiscaux) avec accompagnement dédié.",
      },
    ],
  },
};

/* ============================================================================
   4. LES ARTICLES DU SITE
   Pour ajouter un article, copiez un bloc { ... } ci-dessous.
   Pour masquer temporairement un article, passez `publie: false`.
   ============================================================================ */

export const CATEGORIES = [
  "Présentation",
  "Projet",
  "Architecture",
  "Construction",
  "Équipe",
  "Budget",
  "Avancement",
  "Agenda",
  "Déduction fiscales",
  "Foire aux questions",
];

export const ARTICLES = [
  {
    slug: "projet-eglise-saint-joseph-le-rouret",
    titre: "Au Rouret, un projet à 6 millions d'euros unique dans les Alpes-Maritimes pour bâtir l'église Saint-Joseph",
    categories: ["Projet", "Présentation", "Architecture", "Construction", "Avancement"],
    date: "2026-10-04",
    auteur: "Paroisse Saint-Arnoux (d'après Nice-Matin)",
    image: "/assets/img/hero-eglise-nuit.jpeg",
    motsCles: [
      "Nice-Matin",
      "Le Rouret",
      "église Saint-Joseph",
      "centre paroissial",
      "concours d'architectes",
      "Pré-des-Roures",
      "appel aux dons",
    ],
    publie: true,
    resume:
      "Face à la croissance du nombre de fidèles dans les dix communes de la paroisse Saint-Arnoux, la communauté lance au Rouret la construction de l'église Saint-Joseph et de son centre paroissial : un projet de 6 millions d'euros, salué par Nice-Matin comme unique dans les Alpes-Maritimes.",
    contenu: `C'est à l'ombre d'oliviers centenaires et de cyprès dressés vers le ciel, sur le terrain situé à proximité du **collège du Pré-des-Roures au Rouret**, que **plus de 400 fidèles** se sont rassemblés fin septembre 2026 pour la messe de rentrée en plein air de la **paroisse Saint-Arnoux**. Lors de cette célébration, le père **Paul Bao-Dinh Ly** a intronisé cinq catéchumènes qui recevront le baptême au printemps et a accueilli une personne en chemin de conversion — signe concret de la vitalité qui anime la communauté.

Comme le souligne le quotidien [*Nice-Matin* dans son reportage consacré au projet](https://www.nicematin.com/societe/vie-locale/projet-a-6-millions-d-euros-unique-dans-les-alpes-maritimes-appel-aux-dons-face-a-la-croissance-du-nombre-de-fideles-cette-paroisse-lance-la-construction-d-une-eglise-10734256), cette joie partagée est portée par une aventure exceptionnelle dans les Alpes-Maritimes : **la construction d'une nouvelle église, l'église Saint-Joseph, et de son centre paroissial (projet SJO2)**.

## Dix communes réunies et une croissance qui pousse les murs

La paroisse Saint-Arnoux fédère aujourd'hui **dix communes et villages** du moyen-pays grassois : **Roquefort-les-Pins, Le Rouret, Opio, Le Bar-sur-Loup, Châteauneuf-de-Grasse, Cipières, Courmes, Gourdon, Gréolières et Pont-du-Loup**.

Avec l'arrivée de nombreuses familles, la fréquentation des messes, du catéchisme, de l'aumônerie et des parcours de préparation aux sacrements ne cesse de croître, tandis que le centre paroissial actuel (1104, route de Nice au Rouret) est devenu trop exigu :

> « Devant la démographie grandissante de la paroisse, le centre paroissial est de plus en plus petit. Cette dynamique est limitée par l'espace, alors nous allons bâtir notre église et son centre paroissial sur ce terrain idéalement situé dans un espace arboré et préservé. Ce n'est pas un bâtiment que nous allons ériger, c'est une mission. Nous sommes tous des bâtisseurs. »
> — **Père Paul Bao-Dinh Ly**, curé de la paroisse Saint-Arnoux (*Nice-Matin*)

## Un ensemble écologique et lumineux sur un terrain d'un hectare

Acquis et intégralement payé en 2025, le terrain de **8 736 m²** (près d'un hectare) conservera **70 % d'espaces paysagers** pour préserver son cadre méditerranéen d'oliviers et de cyprès. L'ensemble bâti (environ 1 000 m²) réunira trois pôles complémentaires :

- **L'église Saint-Joseph (+ de 300 places)** : une nef chaleureuse et lumineuse, un parvis ouvert à tous et un **clocher de 22 mètres**.
- **Le centre paroissial (+ de 100 personnes)** : accueil, grande salle polyvalente pour les temps forts, salles de catéchisme et d'aumônerie, café fraternel et cuisine.
- **Le presbytère** : trois logements (T3) destinés à la vie de la communauté sacerdotale.

Une attention particulière est portée au **volet environnemental** : sobriété énergétique, matériaux durables (pierre claire, bois) et intégration harmonieuse dans le paysage du Rouret.

## 33 architectes candidats et une consultation participative ouverte à tous

Après le feu vert du Diocèse de Nice en mai 2026 (Comité d'Investissement Diocésain et Commission Diocésaine d'Art Sacré), la sélection architecturale est entrée dans sa phase active :

1. **33 cabinets d'architectes** ont répondu au cahier des charges.
2. Une présélection retient **10 cabinets** admis à concourir.
3. **5 projets finalistes** seront exposés sous forme de **maquettes** lors d'une grande **consultation participative** ouverte à la communauté paroissiale, aux habitants et aux riverains les **28 et 29 novembre 2026** à la **salle Charvet**, à l'occasion de la kermesse paroissiale.
4. Le projet lauréat sera dévoilé **durant les fêtes de Noël**.

[[avancement]]

## 6 millions d'euros financés par la générosité des bâtisseurs

Comme le rappelle Bertrand, bénévole et chargé de projet : *« L'enveloppe prévisionnelle est de 6 millions d'euros au total, comprenant le terrain qui est déjà acquis. Nous lançons un appel aux dons : c'est ainsi que nous financerons ce projet. »*

Avec **1,4 M€ déjà réunis** (terrain inclus), chaque don — dès 10 € pour une pierre ou 1 000 € pour un mur — fait s'élever le clocher de 22 mètres vers l'objectif.

[[clocher]]`,
  },

  {
    slug: "qui-est-bao-dinh",
    titre: "Père Paul Bao-Dinh Ly : portrait du « curé bâtisseur » de la paroisse Saint-Arnoux",
    categories: ["Équipe", "Présentation"],
    date: "2026-10-05",
    auteur: "Équipe projet SJO2",
    image: "/assets/img/pere-paul-bao-dinh-ly.jpeg",
    motsCles: [
      "Père Paul Bao-Dinh Ly",
      "curé",
      "Paroisse Saint-Arnoux",
      "Diocèse de Nice",
      "curé bâtisseur",
      "vocation",
      "équipe",
    ],
    publie: true,
    resume:
      "Ordonné prêtre à Nice en 2009 et curé de la paroisse Saint-Arnoux, le père Paul Bao-Dinh Ly fédère dix communes et plus de cent bénévoles autour de la construction de la future église Saint-Joseph au Rouret.",
    contenu: `Surnommé avec affection le **« curé bâtisseur »** par ses paroissiens et la presse locale, le **père Paul Bao-Dinh Ly** (Lý Bảo Đinh) est le curé de la **paroisse Saint-Arnoux** et le pilote principal du projet de construction de l'église Saint-Joseph et de son centre paroissial au Rouret.

> « Nous allons mettre une pelle dans notre âme et dans notre prière. Nous ne bâtissons pas seulement des murs : nous bâtissons un lieu vivant. »
> — **Père Paul Bao-Dinh Ly**

## Du Vietnam au diocèse de Nice : un pasteur au service de la mission

Originaire du Vietnam et formé au séminaire du diocèse de Nice (notamment auprès du sanctuaire Notre-Dame de Laghet), Paul Bao-Dinh Ly a été **ordonné prêtre le dimanche 11 octobre 2009** en la cathédrale Sainte-Réparate de Nice.

Incardiné dans le **diocèse de Nice**, il a exercé plusieurs ministères pastoraux dans les Alpes-Maritimes et siège également au sein du **conseil épiscopal (conseil restreint)** autour de l'évêque de Nice, Mgr Jean-Philippe Nault. Il est aussi connu dans le diocèse pour ses capsules spirituelles vidéo et radio (*« La Minute Spi »*), où il partage l'Évangile avec simplicité, profondeur et enthousiasme.

## Rassembler dix communes autour d'une maison commune

Nommé curé de la **paroisse Saint-Arnoux**, il veille sur un territoire vivant qui regroupe **dix communes** : Le Rouret, Roquefort-les-Pins, Opio, Châteauneuf-de-Grasse, Le Bar-sur-Loup, Gourdon, Cipières, Courmes, Gréolières et Pont-du-Loup.

Face à l'arrivée de nombreuses jeunes familles, aux demandes de baptême d'adultes et d'enfants et à l'essor des groupes de jeunes, il a porté avec le conseil pastoral et le conseil économique une conviction forte : **doter la paroisse d'une véritable église et d'un centre paroissial dimensionnés pour les décennies à venir**, au cœur du Rouret.

## Un maître d'ouvrage entouré d'une équipe d'experts bénévoles

Représentant le maître d'ouvrage en lien étroit avec l'**Association Diocésaine de Nice (ADN)**, le père Paul Bao-Dinh Ly a su réunir autour de lui une équipe projet structurée — ingénieurs, architectes, financiers, juristes, communicants — et **plus de 100 bénévoles** répartis en commissions.

Découvrez ci-dessous l'équipe qui l'accompagne au quotidien dans la conduite du projet SJO2 :

[[equipe]]`,
  },

  {
    slug: "budget-equipe-et-questions-frequentes",
    titre: "Budget de 6 M€, déduction fiscale et bénévolat : comment participer concrètement à l'aventure des Bâtisseurs",
    categories: ["Budget", "Déduction fiscales", "Foire aux questions", "Équipe"],
    date: "2026-10-10",
    auteur: "Commission Finance & Communication SJO2",
    image: "/assets/img/eglise-saint-joseph-batisseurs-du-seigneur.png",
    motsCles: [
      "budget",
      "6 millions",
      "déduction fiscale",
      "66%",
      "60%",
      "mécénat",
      "bénévoles",
      "FAQ",
      "questions fréquentes",
    ],
    publie: true,
    resume:
      "Comment se répartit le budget de 6 millions d'euros ? Comment fonctionne la réduction d'impôt de 66 % (particuliers) et 60 % (entreprises) ? Quelles sont les missions bénévoles ouvertes ? Toutes les réponses en un coup d'œil.",
    contenu: `Bâtir une église et un centre paroissial au XXIᵉ siècle repose entièrement sur la **transparence financière**, la **générosité des fidèles et des mécènes** et l'**engagement bénévole**. Voici tout ce qu'il faut savoir pour comprendre le financement du projet SJO2 et y prendre part.

## 1. Un budget maîtrisé de 6 millions d'euros TTC

Sur un budget global de **6 M€ TTC**, **1,4 M€ ont déjà été réunis** grâce aux premiers grands donateurs, ce qui a permis d'acquérir et de payer intégralement le terrain de 8 736 m² au Rouret dès 2025. Il reste **4,6 M€ TTC** à réunir sur la durée du chantier pour financer les études, la construction et les aménagements :

[[budget]]

## 2. Fiscalité du don : 66 % pour les particuliers, 60 % pour les entreprises

Tous les dons versés à l'**Association Diocésaine de Nice — Paroisse Saint-Arnoux** (en ligne, par virement ou par chèque avec la mention « SJO2 ») ouvrent droit à un **reçu fiscal officiel** :

- **Vous êtes un particulier imposable** : vous bénéficiez d'une réduction d'impôt sur le revenu de **66 %** du montant de votre don (dans la limite de 20 % du revenu imposable).
  - Un don de **100 €** (10 pierres) ne vous coûte réellement que **34 €**.
  - Un don de **200 €** (20 pierres) ne vous coûte réellement que **68 €**.
  - Un don de **1 000 €** (1 mur complet) ne vous coûte réellement que **340 €**.
- **Vous êtes une entreprise (mécénat)** : vous bénéficiez d'une réduction d'impôt sur les sociétés de **60 %** du montant du don (dans la limite de 20 000 € ou 5 ‰ du chiffre d'affaires annuel HT). Un don de **1 000 €** revient ainsi à **400 €**.

Vous pouvez calculer l'impact exact de votre don sur la page [Soutenir le projet](/soutenir).

## 3. Rejoindre les commissions de bénévoles

Au-delà du don financier, le projet avance grâce aux talents de chacun. Neuf missions bénévoles sont actuellement ouvertes au sein de trois commissions (cliquez sur une fiche pour voir le détail et proposer votre aide) :

[[missions]]

## 4. Questions fréquentes (FAQ)

[[faq]]`,
  },
];

/* ============================================================================
   5. LE CALENDRIER DES ÉVÉNEMENTS (passés et à venir)
   - Pour afficher/masquer un événement sur le site : `publie: true` ou `publie: false`
   - Pour ajouter un bouton d'inscription : remplissez `lienInscription: "https://..."`
   - Pour ajouter des photos et vidéos sur la page de l'événement (/calendrier/<slug>) :
     ajoutez leurs liens dans `photos: [...]` et `videos: [...]` (liens YouTube acceptés).
   ============================================================================ */

export const CALENDRIER = [
  {
    slug: "2026-05-07-comite-d-investissement-diocesain",
    titre: "Comité d'Investissement Diocésain (CID)",
    date: "2026-05-07",
    categorie: "Étape du projet",
    lieu: "Diocèse de Nice",
    description:
      "Validation de la faisabilité et du plan de financement du projet par le Diocèse de Nice. Une étape officielle franchie : le projet SJO2 est reconnu solide et finançable.",
    publie: true,
    photos: [],
    videos: [],
  },
  {
    slug: "2026-05-19-commission-diocesaine-d-art-sacre",
    titre: "Commission Diocésaine d'Art Sacré (CDAE)",
    date: "2026-05-19",
    categorie: "Étape du projet",
    lieu: "Diocèse de Nice",
    description:
      "Avis favorable de la Commission Diocésaine d'Art Sacré sur le projet architectural et liturgique de l'église Saint Joseph et de son centre paroissial.",
    publie: true,
    photos: [],
    videos: [],
  },
  {
    slug: "2026-06-21-fete-de-fin-d-annee-les-batisseurs",
    titre: "Fête de fin d'année — Les Bâtisseurs",
    date: "2026-06-21",
    categorie: "Événement",
    lieu: "Paroisse Saint-Arnoux, Le Rouret",
    description:
      "Fête de fin d'année de la Paroisse Saint-Arnoux, sur le thème des Bâtisseurs : un temps festif et fraternel pour toute la communauté, autour du projet Saint Joseph.",
    lienInfo: "https://www.facebook.com/saint.arnoux",
    publie: true,
    photos: [],
    videos: [],
  },
  {
    slug: "2026-08-15-messe-de-l-assomption",
    titre: "Messe de l'Assomption de la Vierge Marie",
    date: "2026-08-15",
    categorie: "Célébration",
    lieu: "Paroisse Saint-Arnoux",
    description: "Solennité de l'Assomption, célébrée avec la communauté paroissiale.",
    publie: true,
    photos: [],
    videos: [],
  },
  {
    slug: "2026-09-20-premiere-messe-de-rentree-sur-le-nouveau-terrain",
    titre: "Messe de rentrée en plein air sur le terrain de la future église",
    date: "2026-09-20",
    heureDebut: "10:30",
    categorie: "Célébration",
    lieu: "Terrain du futur ensemble paroissial (près du collège du Pré-des-Roures), Le Rouret",
    description:
      "Plus de 400 fidèles réunis à l'ombre des oliviers centenaires sur le terrain qui accueillera l'église Saint-Joseph. Célébration présidée en présence de Mgr Jean-Philippe Nault, évêque de Nice, et du père Paul Bao-Dinh Ly, avec l'entrée en catéchuménat de cinq futurs baptisés et le lancement officiel de l'appel aux dons et du concours d'architectes.",
    lienInfo: "/articles/projet-eglise-saint-joseph-le-rouret",
    publie: true,
    photos: [
      {
        url: "/assets/img/hero-eglise-nuit.jpeg",
        legende: "Perspective du futur ensemble paroissial Saint-Joseph au Rouret",
      },
    ],
    videos: [],
  },
  {
    slug: "2026-11-28-kermesse-et-exposition-des-maquettes-d-architectes",
    titre: "Kermesse paroissiale & consultation participative des 5 maquettes d'architectes",
    date: "2026-11-28",
    dateFin: "2026-11-29",
    heureDebut: "10:00",
    heureFin: "18:00",
    categorie: "Événement",
    lieu: "Salle Charvet, Le Rouret",
    description:
      "À l'occasion de la kermesse de la paroisse Saint-Arnoux, venez découvrir les **maquettes des 5 cabinets d'architectes finalistes** retenus parmi les 33 candidats. Une grande consultation participative ouverte aux paroissiens, aux habitants et aux riverains avant le choix final dévoilé à Noël.",
    lienInscription: "/contact",
    lienInfo: "/articles/projet-eglise-saint-joseph-le-rouret",
    publie: true,
    photos: [],
    videos: [],
  },
  {
    slug: "2026-12-24-annonce-du-projet-architectural-laureat",
    titre: "Dévoilement du projet d'architecte retenu pour l'église Saint-Joseph",
    date: "2026-12-24",
    categorie: "Étape du projet",
    lieu: "Paroisse Saint-Arnoux, Le Rouret",
    description:
      "À l'issue du concours d'architecture et de la consultation participative des 28 et 29 novembre, la paroisse Saint-Arnoux et le père Paul Bao-Dinh Ly dévoilent durant les fêtes de Noël le projet architectural choisi pour bâtir l'église Saint-Joseph et son centre paroissial.",
    lienInfo: "/articles/projet-eglise-saint-joseph-le-rouret",
    publie: true,
    photos: [],
    videos: [],
  },
];

/* ----------------------------------------------------------------------------
   6. NAVIGATION DU MENU « LE PROJET » & DU PIED DE PAGE
   ---------------------------------------------------------------------------- */
export const MENU_PROJET = [
  "Présentation",
  "Projet",
  "Architecture",
  "Équipe",
  "Budget",
  "Déduction fiscales",
  "Foire aux questions",
];

export const FOOTER_LINKS = {
  quiSommesNous: [
    { label: "Le projet (Nice-Matin)", href: "/articles/projet-eglise-saint-joseph-le-rouret" },
    { label: "Père Paul Bao-Dinh Ly & l'équipe", href: "/articles/qui-est-bao-dinh" },
    { label: "Budget, fiscalité & FAQ", href: "/articles/budget-equipe-et-questions-frequentes" },
    { label: "L'avancement", href: "/#avancement" },
  ],
  liensUtiles: [
    { label: "Calendrier des événements", href: "/calendrier" },
    { label: "Newsletter", href: "/newsletter" },
    { label: "Soutenir le projet", href: "/soutenir" },
    { label: "Bon de soutien imprimable", href: "/bon-de-soutien" },
    { label: "Dossier Mécènes & Entreprises", href: "/mecenat" },
    { label: "Diocèse de Nice", href: "https://nice.catholique.fr/" },
    { label: "Paroisse Saint-Arnoux (Facebook)", href: "https://www.facebook.com/saint.arnoux" },
    { label: "Commune du Rouret", href: "https://lerouret.fr/" },
  ],
};
