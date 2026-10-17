# Guide de l'équipe projet — Site web Église Saint-Joseph (Projet SJO2 · Le Rouret)

Ce document est destiné aux membres de l'équipe projet et aux bénévoles de la **Paroisse Saint-Arnoux** (Diocèse de Nice). Il explique où consulter le site, comment il est organisé, et comment mettre à jour très simplement les textes, le montant de la collecte, les articles, le calendrier des événements, les photos et les vidéos — **sans aucune connaissance en programmation**.

---

## 1. Où trouver le site et ses accès ?

| Ressource | Adresse (lien direct) | À quoi ça sert ? |
| :--- | :--- | :--- |
| **Site public en ligne** | **[https://saint-joseph-sjo2.vercel.app](https://saint-joseph-sjo2.vercel.app)** | Le site visible par tous les paroissiens, donateurs et visiteurs (ordinateur, tablette et téléphone). |
| **Espace rédaction visuel (`/admin`)** | **[https://saint-joseph-sjo2.vercel.app/admin](https://saint-joseph-sjo2.vercel.app/admin)** | Interface protégée par mot de passe pour ajouter/modifier des articles, des événements, des photos/vidéos et le montant de la collecte via un formulaire. |
| **Bulletin de don à imprimer (PDF)** | **[https://saint-joseph-sjo2.vercel.app/soutenir/bulletin-de-don](https://saint-joseph-sjo2.vercel.app/soutenir/bulletin-de-don)** | Fiche récapitulative d'une page prête à imprimer pour les dons par chèque ou virement. |
| **Fichier unique de contenu (`js/content.js`)** | **[https://github.com/mgenin12/saint-joseph-sjo2/blob/main/js/content.js](https://github.com/mgenin12/saint-joseph-sjo2/blob/main/js/content.js)** | Le **seul fichier** qui contient tous les textes, chiffres, articles et événements du site. |
| **Dossier des photos (`public/assets/img`)** | **[https://github.com/mgenin12/saint-joseph-sjo2/tree/main/public/assets/img](https://github.com/mgenin12/saint-joseph-sjo2/tree/main/public/assets/img)** | Le dossier où déposer de nouvelles photos pour le site. |

---

## 2. Présentation des pages et sections du site

### 2.1. En-tête (Header) et bouton Français / Anglais (`FR | EN`)
Sur toutes les pages du site, la barre supérieure comporte :
- **4 entrées principales** :
  1. **« Découvrir »** (`/`) : amène à la présentation du projet sur la page d'accueil ;
  2. **« Le projet »** (`/articles`) : ouvre la liste des articles avec recherche par mots-clés, filtres par catégories et accès rapide au calendrier ;
  3. **« Soutenir »** (`/soutenir`) : ouvre la page de collecte du *Clocher des Bâtisseurs* (22 mètres) ;
  4. **« Faire un don »** : bouton doré menant directement à la plateforme sécurisée de don du Diocèse de Nice.
- **Bouton `FR | EN` en haut à droite de chaque page** :
  - Permet aux visiteurs anglophones (nombreux dans le Pays de Grasse et sur la Côte d'Azur) de basculer **tout le site en anglais** en un clic (menus, boutons, articles, calendrier et simulateur de don), sans que l'équipe paroissiale ait besoin de rédiger ses textes en double.

---

### 2.2. Page d'accueil (`/`)
La page d'accueil présente une vue d'ensemble vivante du projet :
1. **Bannière d'accueil (Hero)** : titre, chiffres clés (*+ de 300 places dans l'église · + de 100 personnes au centre paroissial · 8 736 m² au Rouret · 70 % d'espaces verts*) et boutons *« Découvrir le projet »* et *« Faire un don »*.
2. **Section « Découvrir »** : explication du besoin pastoral (croissance de 200 à plus de 600 fidèles chaque dimanche dans les 10 communes de la paroisse Saint-Arnoux), présentation des **3 volets** (*Le Centre Paroissial*, *L'Église*, *Le Presbytère*) et bouton **« En savoir plus »** vers les articles.
3. **Section « L'avancement »** : frise chronologique des étapes (Acquisition du terrain en 2025, Validation du Diocèse en mai 2026, Messe de rentrée et concours d'architectes à l'automne 2026, Études 2026–2027, Travaux et ouverture à l'horizon 2030).
4. **Section « Soutenir — Faites monter le clocher »** : visualisation interactive du clocher de **22 mètres** qui s'élève au rythme des dons (1,4 M€ déjà réunis sur 6 M€, soit **5,13 m sur 22 m**).
5. **Section « Nos valeurs »** : *Foi · Transmission · Fraternité · Espérance*.
6. **Section « Les derniers articles »** : aperçu des 3 articles récents.
7. **Section « Prochains rendez-vous »** : aperçu des prochains événements du calendrier.
8. **Section « Concours d'architecture »** : présentation des étapes du concours (*33 cabinets candidats → 10 équipes présélectionnées → 5 maquettes finalistes exposées les 28 et 29 novembre 2026 à la salle Charvet du Rouret → projet lauréat annoncé à Noël 2026*).
9. **Section « Le Livre d'Or des Bâtisseurs »** : témoignages du curé, des bénévoles, des familles et des catéchumènes, avec un bouton pour laisser un témoignage.

---

### 2.3. Page « Le projet » — Liste des articles et recherche (`/articles`)
- Permet de rechercher un article **par mot-clé** (ex. *architectes, budget, Bao Dinh, oliviers*) et **par catégorie** (*Projet, Architecture, Budget, Équipe, Agenda, Avancement, Foire aux questions, Déduction fiscales*).
- **Les 3 articles actuellement publiés** :
  1. **Le projet au Rouret (*Nice-Matin*)** : `/articles/projet-eglise-saint-joseph-le-rouret` — *« Projet à 6 millions d'euros unique dans les Alpes-Maritimes : la paroisse Saint-Arnoux lance la construction de l'église Saint-Joseph au Rouret »*.
  2. **Le curé et l'équipe** : `/articles/qui-est-bao-dinh` — *« Portrait du Père Paul Bao Dinh Ly, le "curé bâtisseur" de la paroisse Saint-Arnoux »* (avec le trombinoscope interactif des 19 membres de l'équipe projet).
  3. **La vie du projet, la messe de rentrée et la FAQ** : `/articles/messe-de-rentree-et-vie-du-projet` — *« Plus de 400 fidèles sous les oliviers, Clocher des Bâtisseurs et prochaines étapes : comment participer à l'aventure »*.
- Chaque page d'article dispose de **galeries photos et vidéos**, de **boutons de partage** (WhatsApp, Facebook, LinkedIn, X, E-mail, Copier le lien) et d'un aperçu automatique optimisé pour les réseaux sociaux (*Open Graph*).

---

### 2.4. Page « Calendrier » (`/calendrier`) et pages d'événements (`/calendrier/[slug]`)
- **Vue mensuelle interactive + liste des événements à venir et passés**.
- Lorsqu'un visiteur **clique sur une date** du calendrier :
  - Un panneau affiche la **description de l'événement**, l'horaire et le lieu ;
  - Un bouton **« S'inscrire »** (si un lien d'inscription est renseigné) ;
  - Un bouton **« Page de l'événement (photos & vidéos) → »** qui ouvre la page complète dédiée à l'événement (`/calendrier/[slug]`) contenant toutes les photos et vidéos de la rencontre.

---

### 2.5. Page « Soutenir » (`/soutenir`) et Bulletin de don imprimable (`/soutenir/bulletin-de-don`)
- **Le Clocher des Bâtisseurs (22 mètres)** et **le Mur des Bâtisseurs** :
  - **1 pierre = 10 €** ;
  - **1 mur = 100 pierres = 1 000 €** ;
  - **22 mètres de clocher = 6 000 000 €** (soit environ **272 727 € par mètre**).
- **Simulateur fiscal interactif** :
  - Permet de choisir un montant (curseur, boutons rapides ou montant libre) et de voir immédiatement le nombre de pierres/murs, les centimètres de clocher financés, et surtout le **coût réel après réduction d'impôt** (**66 %** pour les particuliers, **60 %** pour les entreprises).
- **Autres moyens de donner** : coordonnées bancaires (IBAN/BIC), chèque à l'ordre de *ADN – Paroisse St Arnoux* (mention « SJO2 » au dos), QR code, contact Dons & Legs, et **Bulletin de don papier à imprimer en PDF** (`/soutenir/bulletin-de-don`).

---

### 2.6. Bandeau de bas de page (présent sur chaque page)
En bas de chaque page du site figurent systématiquement les deux liens demandés :
- **« M'inscrire à la newsletter »** (`/newsletter`) ;
- **« Donner »** (lien direct vers la plateforme de don du Diocèse de Nice).

---

## 3. Comment modifier le site facilement (2 méthodes au choix)

Vous n'avez **jamais** besoin de toucher au code technique du site. Deux méthodes simples s'offrent à vous :

### Méthode A — Via l'interface visuelle protégée par mot de passe (`/admin`)
1. Ouvrez **[https://saint-joseph-sjo2.vercel.app/admin](https://saint-joseph-sjo2.vercel.app/admin)**.
2. Entrez le mot de passe paroissial :
   - Mot de passe actuel : **`SJO2-Batisseurs-2026`** *(modifiable à tout moment dans les paramètres Vercel via la variable `ADMIN_PASSWORD`)*.
3. Choisissez l'onglet souhaité :
   - **📰 Articles** (modifier un article existant ou cliquer sur *« + Nouvel article »*) ;
   - **📅 Événements du Calendrier** (modifier un événement ou cliquer sur *« + Nouvel événement »*, cocher/décocher *« Afficher cet événement sur le site »*, ajouter des photos et vidéos) ;
   - **📊 Collecte & Liens** (changer le montant collecté `1400000`) ;
   - **💬 Témoignages & Architectes** (ajouter un témoignage au Livre d'Or ou mettre à jour les 5 maquettes finalistes).
4. Cliquez sur **« 🚀 Enregistrer / Générer `js/content.js` »** :
   - Si un jeton GitHub (`GITHUB_TOKEN`) est configuré, la modification est publiée directement en ligne en ~45 secondes ;
   - Sinon, cliquez sur **« 📋 Copier tout le fichier `js/content.js` »** puis collez-le dans [`js/content.js` sur GitHub](https://github.com/mgenin12/saint-joseph-sjo2/edit/main/js/content.js) et cliquez sur le bouton vert **« Commit changes... »**.

### Méthode B — Directement dans le fichier `js/content.js` sur GitHub
1. Ouvrez **[https://github.com/mgenin12/saint-joseph-sjo2/blob/main/js/content.js](https://github.com/mgenin12/saint-joseph-sjo2/blob/main/js/content.js)**.
2. Cliquez sur l'icône **crayon ✏️ (*Edit this file*)** en haut à droite.
3. Modifiez le texte, le chiffre ou l'événement souhaité.
4. Cliquez sur le bouton vert **« Commit changes... »** en haut à droite : le site se met à jour automatiquement en **45 secondes**.

---

## 4. Comment ajouter un événement au calendrier (avec inscription, photos et vidéos)

Chaque événement ajouté dans `/admin` (ou dans la section `EVENEMENTS` de `js/content.js`) crée **automatiquement** :
1. Une case colorée à sa date dans le calendrier interactif (`/calendrier`) ;
2. Une **page web dédiée** (`/calendrier/nom-de-l-evenement`) contenant sa description complète, son bouton d'inscription, sa **galerie de photos** et ses **vidéos intégrées**.

### Masquer un événement sans le supprimer
- Dans `/admin`, décochez simplement la case **« Afficher cet événement sur le site (`visible`) »** (ou mettez `visible: false` dans `js/content.js`).

### Exemple d'événement dans `js/content.js`
```javascript
  {
    slug: "2026-11-28-kermesse-et-consultation-des-maquettes-d-architectes",
    visible: true, // Mettez false pour masquer l'événement du site
    titre: "Kermesse paroissiale & Consultation participative des 5 maquettes d'architectes",
    date: "2026-11-28", // Format AAAA-MM-JJ
    dateFin: "2026-11-29", // Optionnel
    heureDebut: "10h00",
    heureFin: "18h00",
    lieu: "Salle Charvet · Le Rouret",
    categorie: "Étape du projet", // Étape du projet | Messe | Fête paroissiale | Rencontre
    description: "Texte complet décrivant l'événement...",
    lienInscription: "/contact?sujet=information", // Lien Google Forms, HelloAsso, ou /contact
    image: "/assets/img/l-ensemble-paroissial-dans-son-site.jpeg",
    photos: [
      {
        url: "/assets/img/l-ensemble-paroissial-dans-son-site.jpeg",
        legende: "Présentation des esquisses à la salle Charvet.",
      },
    ],
    videos: [
      {
        url: "https://www.youtube.com/watch?v=VOTRE_ID_VIDEO",
        titre: "Vidéo de présentation des maquettes",
      },
    ],
  },
```

---

## 5. Comment ajouter des photos et des vidéos (et limites de stockage)

### 5.1. Ajouter des photos (`.jpg`, `.png`, `.webp`)
Vous avez deux possibilités :
1. **Déposer la photo sur GitHub (recommandé)** :
   - Ouvrez le dossier **[`public/assets/img`](https://github.com/mgenin12/saint-joseph-sjo2/tree/main/public/assets/img)** sur GitHub.
   - Cliquez sur **« Add file » → « Upload files »** en haut à droite.
   - Glissez-déposez vos photos depuis votre ordinateur ou téléphone, puis cliquez sur le bouton vert **« Commit changes »**.
   - Utilisez ensuite le chemin `"/assets/img/nom-de-votre-photo.jpg"` dans `/admin` ou dans `js/content.js`.
2. **Ou utiliser un lien Google Drive** :
   - Partagez la photo sur Google Drive (*« Tous les utilisateurs disposant du lien »*) et collez directement le lien Google Drive dans le champ URL de la photo : le site le convertit automatiquement.

### 5.2. Ajouter des vidéos (YouTube, Vimeo ou Google Drive)
- **Sur YouTube (recommandé — gratuit et sans limite)** :
  1. Publiez votre vidéo sur la chaîne YouTube de la paroisse en mode **« Public »** ou **« Non répertoriée »** (*Unlisted* : seules les personnes visitant le site de la paroisse pourront la voir, elle n'apparaîtra pas dans les recherches YouTube).
  2. Copiez l'adresse de la vidéo (ex. `https://www.youtube.com/watch?v=...` ou `https://youtu.be/...`) et collez-la dans la section **Vidéos** de l'événement ou de l'article (dans `/admin` ou dans `js/content.js`).
  3. Le site affiche automatiquement un lecteur vidéo intégré sur la page de l'événement ou de l'article !
- **Sur Google Drive** :
  - Vous pouvez aussi coller un lien de partage Google Drive (`https://drive.google.com/file/d/.../view`).

### 5.3. Où sont stockés les fichiers et quelles sont les limites ?
- **Photos sur GitHub (`public/assets/img/`)** : hébergement gratuit jusqu'à **1 Go** recommandé (100 Mo maximum par fichier individuel), ce qui représente **1 500 à 3 000 photos** optimisées pour le web (environ 300 à 500 Ko par photo).
- **Vidéos sur YouTube** : **stockage illimité et 100 % gratuit** (et jusqu'à 15 Go gratuits sur un compte Google Drive standard). Ne déposez pas de gros fichiers vidéo `.mp4` directement dans GitHub : passez toujours par YouTube ou Google Drive.

---

## 6. Comment ajouter ou modifier un article

Dans `/admin` (onglet **📰 Articles**) ou dans la section `ARTICLES` de [`js/content.js`](https://github.com/mgenin12/saint-joseph-sjo2/blob/main/js/content.js) :
- Chaque article possède :
  - `titre` : le titre de l'article ;
  - `slug` : l'identifiant dans l'adresse web (`/articles/mon-titre`) ;
  - `categories` : une ou plusieurs catégories parmi *Présentation, Architecture, Avancement, Équipe, Budget, Déduction fiscales, Foire aux questions, Projet, Mécènes, Agenda, Construction* ;
  - `date` : au format `AAAA-MM-JJ` ;
  - `auteur` : ex. `"Paroisse Saint-Arnoux"` ;
  - `image` : l'image de couverture ;
  - `resume` : 1 ou 2 phrases affichées sur la carte de l'article et lors d'un partage WhatsApp/Facebook ;
  - `statut` : `"publie"` (visible) ou `"brouillon"` (masqué) ;
  - `photos` et `videos` : galeries affichées au bas de l'article ;
  - `contenu` : le texte de l'article (avec titres `## Mon sous-titre`, listes `- point`, gras `**texte**`).
- **Blocs interactifs spéciaux** : si vous écrivez l'un de ces codes seul sur une ligne dans le `contenu` d'un article, le site insère automatiquement le bloc interactif correspondant :
  - `[[budget]]` : le graphique camembert interactif du budget de 6 M€ ;
  - `[[equipe]]` : le portrait du Père Paul Bao Dinh Ly et le trombinoscope des 19 membres ;
  - `[[concours]]` : la section complète du concours d'architectes et des 5 maquettes finalistes ;
  - `[[clocher]]` : la jauge interactive du clocher de 22 m et le mur des bâtisseurs ;
  - `[[avancement]]` : la frise chronologique du projet ;
  - `[[missions]]` : les fiches des missions bénévoles ouvertes ;
  - `[[faq]]` : la foire aux questions déroulante.

---

## 7. Comment mettre à jour le montant de la collecte (Clocher de 22 m)

Au fur et à mesure de l'avancement des dons :
1. Ouvrez **`/admin`** (onglet **📊 Collecte & Liens**) ou le début de **`js/content.js`** :
   ```javascript
   collecte: {
     collecteActuelle: 1_400_000, // Remplacez par le nouveau montant (ex. 1_650_000)
     objectifGlobal: 6_000_000,
   },
   ```
2. Dès que vous enregistrez ce chiffre, le site recalcule automatiquement sur toutes les pages :
   - Le montant restant à financer ;
   - Le pourcentage atteint ;
   - La hauteur atteinte en mètres sur les **22 mètres** du clocher ;
   - Le nombre de **pierres de 10 €** et de **murs de 1 000 €** posés.

---

## 8. Sécurité : qui peut modifier le site ?

Le site est protégé à deux niveaux :
1. **Sur GitHub** : même si le code du site est lisible publiquement, **personne ne peut modifier `js/content.js` ni ajouter de photos sans être connecté avec un compte GitHub autorisé**. Pour donner accès à un nouveau membre de l'équipe projet, l'administrateur du dépôt se rend sur `https://github.com/mgenin12/saint-joseph-sjo2/settings/access` (*Settings → Collaborators → Add people*).
2. **Sur l'interface `/admin`** : l'accès est protégé par le mot de passe défini dans la variable `ADMIN_PASSWORD` sur Vercel.
