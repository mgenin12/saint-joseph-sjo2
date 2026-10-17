# Église Saint Joseph — Projet SJO2 (Le Rouret · Paroisse Saint-Arnoux)

Site web dynamique du projet de construction de l'**église Saint-Joseph** et de son **centre paroissial** au Rouret
(Paroisse Saint-Arnoux, Diocèse de Nice).

- **Site en ligne** : **https://saint-joseph-sjo2.vercel.app**
- **Code source** : **https://github.com/mgenin12/saint-joseph-sjo2**
- **Fichier unique pour modifier tout le contenu du site (sans toucher au code)** : **[`js/content.js`](./js/content.js)**

---

## ✏️ Guide pratique (en français) : comment modifier le site sans toucher au code

Toute l'équipe paroissiale habilitée peut modifier **les articles, le calendrier des événements, les photos/vidéos, le montant de la collecte, les textes d'accueil, l'équipe et la FAQ** dans **un seul fichier** : **`js/content.js`**.

### Étape par étape directement depuis votre navigateur (sur GitHub)

1. Connectez-vous sur **[github.com](https://github.com)** et ouvrez le fichier :
   👉 **[`js/content.js`](https://github.com/mgenin12/saint-joseph-sjo2/blob/main/js/content.js)**
2. Cliquez sur l'icône **crayon ✏️ (« Edit this file »)** en haut à droite du fichier.
3. Effectuez vos modifications (voir les exemples ci-dessous).
4. Cliquez sur le bouton vert **« Commit changes… »** en haut à droite, puis validez.

---

## 📰 1. Modifier ou ajouter un article (`ARTICLES` dans `js/content.js`)

Dans `js/content.js`, cherchez la section **`export const ARTICLES = [`**.
Trois articles complets y figurent déjà :
1. **`projet-eglise-saint-joseph-le-rouret`** — *Au Rouret, un projet à 6 millions d'euros unique dans les Alpes-Maritimes pour bâtir l'église Saint-Joseph* (d'après le reportage de *Nice-Matin*).
2. **`qui-est-bao-dinh`** — *Père Paul Bao-Dinh Ly : portrait du « curé bâtisseur » de la paroisse Saint-Arnoux*.
3. **`budget-equipe-et-questions-frequentes`** — *Budget de 6 M€, déduction fiscale et bénévolat : comment participer concrètement à l'aventure des Bâtisseurs*.

### Pour ajouter un nouvel article

Copiez-collez un bloc `{ ... }` au début de `export const ARTICLES = [` :

```javascript
  {
    slug: "mon-nouvel-article", // URL de la page : /articles/mon-nouvel-article (sans espaces ni accents)
    titre: "Titre de mon nouvel article",
    categories: ["Projet", "Avancement"], // Choisir parmi CATEGORIES
    date: "2026-11-30", // Format AAAA-MM-JJ
    auteur: "Paroisse Saint-Arnoux",
    image: "/assets/img/hero-eglise-nuit.jpeg", // Image de couverture (optionnelle)
    motsCles: ["kermesse", "architectes", "Le Rouret"],
    publie: true, // Mettre false pour masquer temporairement l'article (brouillon)
    resume: "Court résumé d'une ou deux phrases affiché dans la liste des articles et lors d'un partage sur Facebook / WhatsApp.",
    contenu: `Écrivez ici le texte complet de votre article.

## Un sous-titre de section

Vous pouvez écrire plusieurs paragraphes, mettre des mots en **gras** ou en *italique*, et créer des listes :
- Premier point
- Deuxième point

> « Une citation mise en valeur. »`,
  },
```

### Blocs interactifs que vous pouvez insérer dans un article

En écrivant l'un de ces mots seul sur une ligne dans `contenu`, le site insère automatiquement le bloc interactif correspondant :
- `[[budget]]` : les 3 cartes du budget + le camembert interactif + le calendrier de réalisation
- `[[equipe]]` : la fiche du père Paul Bao-Dinh Ly + les 8 compétences + le trombinoscope des 19 bénévoles
- `[[avancement]]` : la frise chronologique des étapes du projet
- `[[clocher]]` : l'infographie du clocher de 22 m et du Mur des Bâtisseurs
- `[[missions]]` : les 9 fiches de missions bénévoles
- `[[faq]]` : l'accordéon des questions fréquentes

---

## 📅 2. Modifier le calendrier, choisir quels événements sont visibles et ajouter des photos / vidéos (`CALENDRIER` dans `js/content.js`)

Dans `js/content.js`, cherchez la section **`export const CALENDRIER = [`**.

Chaque événement possède automatiquement :
- son apparition dans le calendrier mensuel (`/calendrier`) et dans la liste « À venir » / « Événements passés »,
- une fiche qui s'ouvre lorsqu'on clique sur la date (avec sa description et le bouton **« S'inscrire »**),
- **sa propre page web dédiée** (`/calendrier/<slug>`) où s'affichent ses **photos** et ses **vidéos**.

### Exemple complet d'événement avec inscription, photos et vidéo YouTube

```javascript
  {
    slug: "2026-11-28-kermesse-et-exposition-des-maquettes-d-architectes",
    titre: "Kermesse paroissiale & consultation participative des 5 maquettes d'architectes",
    date: "2026-11-28",       // Date de début (AAAA-MM-JJ)
    dateFin: "2026-11-29",    // Optionnel : date de fin si l'événement dure plusieurs jours
    heureDebut: "10:00",      // Optionnel
    heureFin: "18:00",        // Optionnel
    categorie: "Événement",   // "Célébration", "Événement", "Étape du projet", "Réunion"...
    lieu: "Salle Charvet, Le Rouret",
    description: "Description affichée quand on clique sur la date et sur la page de l'événement.",
    lienInscription: "https://forms.gle/votre-formulaire", // Active le bouton doré « S'inscrire »
    lienInfo: "/articles/projet-eglise-saint-joseph-le-rouret", // Bouton « En savoir plus »
    publie: true,             // 👉 Mettez false pour masquer cet événement sur le site !
    photos: [
      {
        url: "/assets/img/ma-photo-1.jpg",
        legende: "Présentation des maquettes à la salle Charvet",
      },
    ],
    videos: [
      {
        url: "https://www.youtube.com/watch?v=XXXXXXXXXXX",
        titre: "Vidéo récapitulative de la journée",
      },
    ],
  },
```

### Où stocker les photos et les vidéos d'un événement ?

- **Pour les photos** :
  - **Sur GitHub (recommandé, gratuit)** : sur GitHub, ouvrez le dossier [`public/assets/img/`](https://github.com/mgenin12/saint-joseph-sjo2/tree/main/public/assets/img), cliquez sur **« Add file » → « Upload files »**, glissez vos photos (`.jpg` ou `.png`), validez, puis indiquez `/assets/img/nom-de-la-photo.jpg` dans `photos`.
  - **Ou sur Google Drive** : partagez la photo en lecture (« Tous les utilisateurs disposant du lien ») et collez le lien Google Drive dans `url`.
- **Pour les vidéos** :
  - **Sur YouTube (recommandé, gratuit et sans aucune limite de taille)** : publiez la vidéo sur la chaîne YouTube de la paroisse (en mode *Public* ou *Non répertorié*) et collez simplement le lien `https://www.youtube.com/watch?v=...` dans `videos` : le lecteur vidéo s'intègre automatiquement sur la page de l'événement !

---

## 💶 3. Mettre à jour le montant de la collecte (clocher de 22 m)

Au tout début de `js/content.js` :

```javascript
  collecte: {
    montantCollecte: 1_400_000, // 👈 Changez ce chiffre (en euros)
    objectif: 6_000_000,
  },
```

Dès que vous modifiez `montantCollecte`, **tout le site se recalcule automatiquement** :
- la hauteur atteinte sur le clocher de **22 mètres** (ex. `1 400 000 €` → **5,13 m**, soit **23 %**),
- le nombre de **pierres posées** (1 pierre = 10 €) et de **murs bâtis** (1 mur = 100 pierres = 1 000 €),
- le reste à financer.

---

## 💬 4. Modifier les témoignages « Pourquoi je bâtis » et l'espace Entreprises & Mécénat (`js/content.js`)

Toujours dans [`js/content.js`](./js/content.js) :

- **Témoignages (`SITE.temoignages`)** : affichés sur la page d'accueil et sur `/soutenir`. Vous pouvez modifier ou ajouter un témoignage en ajoutant un bloc `{ citation, auteur, role, commune }` dans `SITE.temoignages.items`.
- **Espace Entreprises & Mécénat (`SITE.mecenat`)** : affiché sur `/soutenir#mecenat` et sur le dossier imprimable `/mecenat`. Vous pouvez modifier les avantages (`avantages`) et les paliers entreprises (`paliersEntreprises`).
- **Bon de soutien imprimable (`SITE.don.bonDeSoutien`)** : affiché sur `/bon-de-soutien` (avec bouton « 🖨️ Imprimer / Enregistrer en PDF »).

---

## 🔄 5. Activer la mise à jour automatique du site (lier GitHub à Vercel)

Une fois le dépôt GitHub connecté à Vercel, **chaque modification enregistrée (« Commit changes ») dans `js/content.js` sur GitHub met à jour le site public en ~45 secondes** :

1. Ouvrez **[vercel.com/dashboard](https://vercel.com/dashboard)** et connectez-vous (équipe **`eglise-saint-joseph`**).
2. Cliquez sur le projet **`saint-joseph-sjo2`**.
3. Cliquez sur l'onglet **« Settings »** (en haut), puis sur **« Git »** dans le menu de gauche.
4. Dans **« Connected Git Repository »**, cliquez sur **« Connect Git Repository »** → choisissez **GitHub** → sélectionnez **`mgenin12/saint-joseph-sjo2`** (branche de production : `main`).
5. Si GitHub vous demande d'autoriser l'application Vercel, cliquez sur **« Install / Authorize Vercel »** pour le dépôt `saint-joseph-sjo2`.

---

## 💻 6. Lancer ou déployer le site (pour les administrateurs techniques)

```bash
npm install
npm run dev      # Lance le site en local sur http://localhost:3000
npm test         # Lance les 32 tests unitaires (Vitest)
npm run lint     # Vérifie le code (ESLint)
npm run build    # Compile le site pour la production
```

### Variables d'environnement (`.env.example`)

| Variable | Rôle |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL publique du site (`https://saint-joseph-sjo2.vercel.app` puis `https://saint-joseph.saint-arnoux.fr`) |
| `NEXT_PUBLIC_URL_DON` | URL de la plateforme de don diocésaine |
| `GOOGLE_CALENDAR_ENABLED` | `false` par défaut (les événements viennent de `js/content.js`). Mettre `true` pour fusionner en plus les événements publics du Google Agenda |
| `GOOGLE_CALENDAR_ID` | ID du Google Agenda (`9f2cb93155d97884909c3bcb4fb4c887a2659636e5c6059d68c6e43ad0b842e5@group.calendar.google.com`) |
| `GOOGLE_CALENDAR_FILTER_TAG` | Optionnel (ex. `#site`) : n'affiche que les événements Google Agenda contenant ce mot-clé |
| `CONTACT_WEBHOOK_URL` / `NEWSLETTER_WEBHOOK_URL` | URL optionnelle recevant les formulaires de contact et de newsletter |
