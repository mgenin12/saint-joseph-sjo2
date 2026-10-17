# Église Saint Joseph — Projet SJO2 (Paroisse Saint-Arnoux · Le Rouret)

Site officiel du projet de construction de l'**église Saint-Joseph** et de son **centre paroissial** au Rouret (Alpes-Maritimes), porté par la **Paroisse Saint-Arnoux** et l'**Association Diocésaine de Nice**.

- **Site en ligne (production)** : **[https://saint-joseph-sjo2.vercel.app](https://saint-joseph-sjo2.vercel.app)**
- **Fichier unique de contenu** : **[`js/content.js`](./js/content.js)** — **tous les textes, chiffres, articles et événements du calendrier se modifient dans ce seul fichier**, sans toucher au code technique.

---

## 1. Comment modifier le site facilement depuis GitHub (sans rien installer)

Toute personne autorisée de la paroisse peut mettre à jour le site directement depuis son navigateur web :

1. Ouvrez le fichier **[`js/content.js`](https://github.com/mgenin12/saint-joseph-sjo2/blob/main/js/content.js)** sur GitHub.
2. Cliquez sur l'icône **crayon ✏️ (*Edit this file*)** en haut à droite du fichier.
3. Modifiez le texte, le montant de la collecte, un article ou un événement.
4. Cliquez sur le bouton vert **« Commit changes... »** en haut à droite, puis validez.

---

## 2. Comment modifier ou ajouter un article (`ARTICLES` dans `js/content.js`)

Les articles ne dépendent d'aucun tableur externe : ils se trouvent tous dans la section **`export const ARTICLES = [ ... ]`** du fichier [`js/content.js`](./js/content.js).

### Les 3 articles actuellement publiés
1. **`projet-eglise-saint-joseph-le-rouret`** — *Projet à 6 millions d'euros unique dans les Alpes-Maritimes : la paroisse Saint-Arnoux lance la construction de l'église Saint-Joseph au Rouret* (basé sur l'article de *Nice-Matin* du 4 octobre 2026).
2. **`qui-est-bao-dinh`** — *Portrait du Père Paul Bao Dinh Ly, le « curé bâtisseur » de la paroisse Saint-Arnoux* (présentation du curé et de l'équipe projet).
3. **`messe-de-rentree-et-vie-du-projet`** — *Plus de 400 fidèles sous les oliviers, Clocher des Bâtisseurs et prochaines étapes : comment participer à l'aventure*.

### Ajouter un nouvel article (modèle à copier-coller)
Dans [`js/content.js`](./js/content.js), au début de la liste `export const ARTICLES = [`, collez un bloc comme celui-ci :

```javascript
  {
    slug: "visite-du-chantier-2027", // Devient l'adresse : /articles/visite-du-chantier-2027
    titre: "Première visite du chantier avec les paroissiens",
    categories: ["Construction", "Projet"], // Catégories pour le filtre de recherche
    date: "2027-03-15", // Format AAAA-MM-JJ
    auteur: "Équipe projet SJO2",
    image: "/assets/img/l-ensemble-paroissial-dans-son-site.jpeg", // Image principale
    resume: "Une phrase courte qui s'affiche dans la liste des articles et lors d'un partage sur Facebook ou WhatsApp.",
    motsCles: ["Chantier", "Le Rouret", "Bâtisseurs"],
    statut: "publie", // Mettez "brouillon" pour masquer l'article sans le supprimer
    photos: [
      {
        url: "/assets/img/l-ensemble-paroissial-dans-son-site.jpeg",
        legende: "Légende affichée sous la photo.",
      },
    ],
    videos: [
      {
        url: "https://www.youtube.com/watch?v=VOTRE_ID_VIDEO",
        titre: "Vidéo de présentation",
      },
    ],
    contenu: `Écrivez ici le texte complet de votre article.

## Un sous-titre de section

Vous pouvez écrire plusieurs paragraphes, mettre du texte en **gras** ou en *italique*, et créer des listes :

- Premier point
- Deuxième point

> « Vous pouvez aussi insérer une citation mise en valeur. »`,
  },
```

### Blocs interactifs utilisables dans le texte d'un article
Si vous écrivez l'un de ces mots-clés seul sur une ligne dans `contenu`, le site insère automatiquement le bloc interactif correspondant :
- `[[budget]]` : les 3 chiffres clés + le camembert interactif du budget
- `[[equipe]]` : le Père Paul Bao Dinh Ly + le trombinoscope interactif des 19 membres de l'équipe
- `[[avancement]]` : la frise chronologique des étapes du projet
- `[[clocher]]` : l'infographie du clocher de 22 mètres et le Mur des Bâtisseurs
- `[[missions]]` : les missions ouvertes aux bénévoles
- `[[faq]]` : la foire aux questions interactive

---

## 3. Comment gérer les événements du calendrier (`EVENEMENTS` dans `js/content.js`)

Chaque événement présent dans la section **`export const EVENEMENTS = [ ... ]`** de [`js/content.js`](./js/content.js) crée automatiquement :
1. Une pastille dorée sur le calendrier mensuel (`/calendrier`) ;
2. Une fenêtre de détail au clic sur la date avec la description et le bouton **« S'inscrire »** ;
3. **Une page web dédiée** (`/calendrier/<slug>`) avec le récit de l'événement, sa **galerie de photos** et ses **vidéos intégrées**, accessible directement depuis le calendrier via le bouton *« Page de l'événement (photos & vidéos) → »*.

### Exemple d'événement avec inscription, photos et vidéo

```javascript
  {
    slug: "2026-11-28-kermesse-et-consultation-des-maquettes-d-architectes",
    visible: true, // Mettez false pour cacher cet événement aux visiteurs du site
    titre: "Kermesse paroissiale & Consultation participative des 5 projets d'architectes",
    date: "2026-11-28",
    dateFin: "2026-11-29", // Optionnel (si l'événement dure plusieurs jours)
    heureDebut: "10:00",   // Optionnel
    heureFin: "18:00",     // Optionnel
    categorie: "Consultation & Événement",
    lieu: "Salle Charvet, Le Rouret",
    description: "Présentation publique des maquettes des 5 cabinets d'architectes finalistes.",
    lienInscription: "https://forms.gle/votre-formulaire", // Active le bouton doré « S'inscrire »
    photos: [
      {
        url: "/assets/img/hero-eglise-nuit.jpeg",
        legende: "Découverte des maquettes à la salle Charvet.",
      },
    ],
    videos: [
      {
        url: "https://www.youtube.com/watch?v=VOTRE_ID_VIDEO",
        titre: "Retour en vidéo sur la rencontre",
      },
    ],
  },
```

### Option Google Agenda : n'afficher que certains événements choisis
Si vous utilisez aussi le Google Agenda paroissial (`CALENDRIER_GOOGLE` en bas de `js/content.js`), l'option `filtrerVisibilite: true` est activée :
- Vos réunions internes restent **invisibles** sur le site ;
- **Seuls** les événements dont la visibilité dans Google Agenda est réglée sur **« Public »** *ou* dont le titre/la description contient le mot-clé **`[Site]`** (ou `#site`) apparaissent sur le site web.

---

## 4. Comment ajouter des photos et des vidéos (et limites de stockage)

### Ajouter une photo sur GitHub
1. Sur GitHub, ouvrez le dossier **[`public/assets/img`](https://github.com/mgenin12/saint-joseph-sjo2/tree/main/public/assets/img)**.
2. Cliquez sur **« Add file » → « Upload files »** en haut à droite.
3. Glissez-déposez vos photos (format `.jpg`, `.jpeg`, `.png` ou `.webp`), puis cliquez sur **« Commit changes »**.
4. Dans `js/content.js`, utilisez simplement le chemin `"/assets/img/nom-de-votre-photo.jpg"`.
   *(Vous pouvez aussi coller un lien de partage Google Drive d'une image : le site le convertit automatiquement.)*

### Ajouter une vidéo
- **Recommandé (stockage illimité et gratuit)** : publiez la vidéo sur **YouTube** (en mode *« Public »* ou *« Non répertoriée »* si vous voulez qu'elle ne soit visible que depuis le site de la paroisse), puis collez simplement son lien `https://www.youtube.com/watch?v=...` dans `videos: [ ... ]` dans `js/content.js`.
- Vous pouvez aussi coller un lien vidéo **Vimeo** ou **Google Drive** (`https://drive.google.com/file/d/.../view`).

### Limites de stockage
- **Photos dans GitHub** : gratuit jusqu'à **1 Go** par dépôt (soit environ **1 000 à 2 000 photos** optimisées pour le web à ~500 Ko–1 Mo par photo).
- **Vidéos sur YouTube / Google Drive** : **aucune limite** sur le site web puisque la vidéo est diffusée par YouTube/Google.

---

## 5. Comment mettre à jour le montant de la collecte (Clocher de 22 m)

Au tout début de [`js/content.js`](./js/content.js) :

```javascript
  collecte: {
    collecteActuelle: 1_400_000, // Changez ce chiffre (ex. 1_650_000)
    objectifGlobal: 6_000_000,
  },
```

Le site recalcule automatiquement la hauteur atteinte sur les **22 mètres** du clocher, le pourcentage, le nombre de **pierres de 10 €** et le nombre de **murs de 1 000 €** sur la page d'accueil et sur la page *Soutenir*.

---

## 6. Utiliser l'interface visuelle protégée par mot de passe (`/admin`)

Pour les bénévoles qui préfèrent remplir un formulaire visuel plutôt que d'éditer [`js/content.js`](./js/content.js) sur GitHub :

1. Rendez-vous sur **[https://saint-joseph-sjo2.vercel.app/admin](https://saint-joseph-sjo2.vercel.app/admin)**.
2. Connectez-vous avec le mot de passe paroissial (défini par la variable d'environnement `ADMIN_PASSWORD` dans Vercel ; mot de passe initial : `SJO2-Batisseurs-2026`).
3. Modifiez vos **Articles**, vos **Événements du calendrier** (avec leurs photos et vidéos YouTube/Drive), le **compteur de la collecte**, les **témoignages du Livre d'Or** (`SITE.temoignages`) ou les **5 maquettes du concours d'architectes** (`SITE.concours`).
4. Cliquez sur **« 🚀 Enregistrer / Générer js/content.js »** :
   - Si un jeton `GITHUB_TOKEN` est configuré sur Vercel (ou saisi dans l'interface), la modification est publiée directement sur GitHub et redéployée automatiquement ;
   - Sinon, vous pouvez télécharger ou copier le fichier `js/content.js` prêt à l'emploi en un clic.

---

## 7. Bulletin de don papier & Fiche projet à imprimer (`/soutenir/bulletin-de-don`)

Une page prête à imprimer (ou à enregistrer en PDF) est disponible sur **[https://saint-joseph-sjo2.vercel.app/soutenir/bulletin-de-don](https://saint-joseph-sjo2.vercel.app/soutenir/bulletin-de-don)** pour les donateurs souhaitant donner par chèque (*à l'ordre de ADN – Paroisse St Arnoux, mention « SJO2 » au dos*) ou par virement bancaire.

---

## 8. Développement local (pour les développeurs)

```bash
npm install
npm run dev     # http://localhost:3000
npm test        # Tests unitaires (Vitest)
npm run build   # Build de production Next.js
```
