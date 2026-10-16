# Église Saint Joseph — Projet SJO2 (site v2, dynamique)

Site du projet de construction de l'église Saint Joseph et de son centre paroissial au Rouret
(Paroisse Saint-Arnoux, Diocèse de Nice). Il remplace le site vitrine monopage (v1) par un site
**multi-pages** dont les **articles** et les **événements** sont pilotés depuis un **Google Sheet**.

- **Next.js 15 (App Router) · React 19 · TypeScript** — hébergé sur Vercel.
- **Contenus** : Google Sheet (articles, catégories, événements, config) + fichiers du dépôt (`content/`).
- **Pages** : Accueil · Le projet (articles + recherche) · Article · Soutenir · Calendrier · Événement · Contact · Newsletter · Mentions légales · Confidentialité.
- **Menu** (4 entrées) : Découvrir · Le projet · Soutenir · **Faire un don** (bouton direct vers la plateforme du Diocèse).
- Chaque page se termine par deux liens : **« M'inscrire à la newsletter »** et **« Donner »**.
- Partage social optimisé (Open Graph + Twitter Cards, image générée par article, données structurées Schema.org).

---

## 1. Démarrer

```bash
npm install
cp .env.example .env.local   # puis compléter (voir §5)
npm run dev                  # http://localhost:3000
```

Scripts : `npm run build` · `npm start` · `npm test` (Vitest) · `npm run lint` · `npm run check:og [URL…]`.

---

## 2. Publier un article (Google Sheet)

Le classeur « Idées d'articles pour site web et newsletter » est la source des articles.

| Colonne (onglet « Articles ») | Rôle |
| --- | --- |
| **Article** | Titre (obligatoire). Sert aussi à fabriquer l'URL : `Qui est Bao Dinh ?` → `/articles/qui-est-bao-dinh`. |
| **Catégorie** | Une ou plusieurs catégories séparées par des virgules (`Budget, Présentation`). Doivent exister dans l'onglet « Catégories d'articles (mots clés) ». |
| **Contenu en quelques mots** | Résumé de travail. Affiché comme chapô si aucune colonne `Résumé` n'existe, et utilisé pour la recherche. |
| **Cible principale** | Information interne (non affichée, mais indexée pour la recherche). |
| **Rédacteur** | Nom affiché sous le titre. |
| **Date de publication** | `JJ/MM/AAAA`. Sert au tri (plus récents d'abord). **Une date future masque l'article** jusqu'à cette date. |

Colonnes **facultatives** reconnues si vous les ajoutez (n'importe où, l'ordre n'a pas d'importance) :
`Slug`, `Résumé` (ou `Chapô`), `Contenu` (Markdown complet de l'article), `Image` (URL ou lien de partage Google Drive),
`Mots clés`, `Statut`.

### Règle de publication

> Un article est **publié par défaut** dès qu'il a un titre.
> Il est masqué (brouillon) si **`Statut`** contient autre chose que « Publié » (ex. « Brouillon », « En cours ») **ou** si la **`Date de publication`** est dans le futur.

Les brouillons restent visibles dans les déploiements de prévisualisation Vercel et en local (`npm run dev`),
avec un bandeau « Brouillon », ce qui permet de relire avant publication.

### D'où vient le texte d'un article ?

1. Colonne **`Contenu`** du Sheet si elle existe et est remplie (Markdown) ;
2. sinon le fichier **`content/articles/<slug>.md`** du dépôt (c'est le cas des 11 articles actuels + 3 articles « dépôt seul ») ;
3. sinon le « Contenu en quelques mots » est affiché avec la mention « Article en préparation ».

Pour relier un fichier du dépôt à une ligne dont le titre a changé, ajoutez l'ancien slug dans `aliases:` de l'en-tête du fichier.
Un fichier avec `publie: true` dans son en-tête est publié **même sans ligne** dans le Sheet (FAQ, réduction d'impôt, bénévoles).

### Blocs dynamiques dans un article

Un jeton seul sur sa ligne insère un composant interactif :
`[[budget]]` (cartes + camembert + calendrier budgétaire) · `[[equipe]]` (curé, compétences, trombinoscope) · `[[avancement]]` (frise des jalons) ·
`[[calendrier]]` (calendrier complet) · `[[clocher]]` (clocher + mur des bâtisseurs) · `[[faq]]` · `[[missions]]` (missions bénévoles).

### Délai de mise à jour

Le site relit le Sheet au plus toutes les **10 minutes**. Pour une mise à jour immédiate :
`curl -X POST "https://<site>/api/revalidate?secret=<REVALIDATE_SECRET>"` (ou un déclencheur Apps Script « à la modification »).

> [!IMPORTANT]
> La lecture « en direct » nécessite que le classeur soit partagé en **« Tous les utilisateurs disposant du lien : Lecteur »**.
> Tant que ce n'est pas le cas, le site utilise la copie embarquée `content/sheet-snapshot/*.csv` (mise à jour à la main :
> *Fichier → Télécharger → CSV* de chaque onglet).

---

## 3. Événements (Google Agenda)

Le calendrier du site (`/calendrier`) est connecté directement au **Google Agenda du projet**
(`9f2cb93155d97884909c3bcb4fb4c887a2659636e5c6059d68c6e43ad0b842e5@group.calendar.google.com`) :

1. Dans les **Paramètres de Google Agenda**, sélectionnez l'agenda puis cochez **« Rendre disponible publiquement »** (*Afficher tous les détails de l'événement*), **ou** copiez l'*Adresse secrète au format iCal* dans la variable d'environnement `GOOGLE_CALENDAR_ICS_URL`.
2. Créez ou modifiez vos événements directement dans Google Agenda :
   - **Titre** : utilisez optionnellement un préfixe `[Catégorie] Titre` (ex. `[Célébration] Messe sur le terrain`).
   - **Dates / Horaires** : journée entière, sur plusieurs jours, ou avec horaires (convertis automatiquement au fuseau `Europe/Paris`).
   - **Lieu** : champ *Lieu* de Google Agenda.
   - **Description & bouton « S'inscrire »** : tout lien `https://...` placé dans la description (ou sur une ligne `Inscription : https://...`) active automatiquement le bouton **« S'inscrire »** sur le site. Vous pouvez aussi indiquer `Catégorie : ...`, `Info : https://...`, `Places : 150`.
3. Pour importer les 6 jalons de 2026 dans votre Google Agenda, téléchargez `/calendrier/export.ics` puis importez-le dans *Google Agenda → Paramètres → Importer et exporter*.

*(En secours, si l'agenda Google n'est pas encore public ou est vide, le site utilise un éventuel onglet `Evenements` du Google Sheet ou `content/evenements.ts`.)*

Chaque événement a sa page `/calendrier/<slug>`, un fichier `.ics` (`/calendrier/<slug>/ics`) et un lien « Ajouter à Google Agenda ».

---

## 4. Textes de l'accueil, équipe, FAQ, budget, montant de la collecte

Tout est dans **`content/site.ts`** (commenté). En particulier :

- `collecte.montantCollecte` / `collecte.objectif` : le clocher de **22 m** représente l'objectif ; 1 pierre = 10 €, 1 mur = 100 pierres.
  Avec 1,4 M€ sur 6 M€ : 5,13 m, 140 000 pierres, 1 400 murs, 1 m ≈ 272 727 €.
- `avancement.jalons`, `valeurs`, `equipe.membres` (photos dans `public/assets/img/`), `missions`, `faq`, `budget`, `don` (IBAN, chèque, fiscalité).
- `MENU_PROJET` : sous-entrées du menu « Le projet » (catégories) · `FOOTER_LINKS` : liens du pied de page.

Un onglet **`Config`** (colonnes `Clé` / `Valeur`) peut surcharger sans redéploiement : `montant_collecte`, `objectif`, `url_don`,
`url_newsletter`, `url_formulaire_contact`, `email_contact`, `telephone_contact`, `reseaux_instagram`, `reseaux_linkedin`…
(renseigner `SHEET_GID_CONFIG`).

---

## 5. Variables d'environnement

| Variable | Rôle |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL publique (canonical, Open Graph, sitemap). Ex. `https://saint-joseph-sjo2.vercel.app` |
| `NEXT_PUBLIC_URL_DON` | Plateforme de don (défaut : plateforme diocésaine dans `content/site.ts`) |
| `SHEET_ID` | Identifiant du classeur (défaut : classeur du projet) |
| `SHEET_GID_ARTICLES` / `SHEET_GID_CATEGORIES` | `0` / `659450165` (défauts) |
| `SHEET_GID_EVENEMENTS` / `SHEET_GID_CONFIG` | onglets facultatifs |
| `REVALIDATE_SECRET` | secret de `/api/revalidate` |
| `CONTACT_WEBHOOK_URL` / `NEWSLETTER_WEBHOOK_URL` | réception des formulaires (JSON en POST) — voir §6 |
| `AFFICHER_BROUILLONS` | `true` pour afficher les brouillons en production (déconseillé) |

---

## 6. Formulaires contact / newsletter

Les formulaires envoient un JSON (`{ type, nom, email, sujet, message }` ou `{ type, email, prenom }`) vers l'URL configurée.
Sans URL, ils affichent les moyens de contact alternatifs. Solution gratuite recommandée : un **Google Apps Script** déployé en
application web qui ajoute une ligne dans un Google Sheet dédié :

```js
function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.openById("ID_DU_CLASSEUR").getSheetByName(d.type === "newsletter" ? "Newsletter" : "Contact");
  sheet.appendRow([new Date(), d.nom || d.prenom || "", d.email, d.sujet || "", d.mission || "", d.message || ""]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
```

Déployer → *Application web* → accès « Tout le monde », puis copier l'URL `/exec` dans la variable d'environnement.
Vous pouvez aussi brancher Brevo/Mailchimp (newsletter) via Make ou Zapier.

---

## 7. Déploiement (Vercel)

1. Importer le dépôt GitHub dans Vercel (framework détecté : Next.js).
2. Renseigner les variables d'environnement (§5), au minimum `NEXT_PUBLIC_SITE_URL`.
3. Chaque `git push` sur `main` déploie en production ; les branches donnent des URL de prévisualisation (brouillons visibles, `robots` en `noindex`).
4. Domaine : ajouter `saint-joseph.saint-arnoux.fr` dans *Settings → Domains* et créer l'enregistrement CNAME indiqué.

Vérifier le partage social après déploiement : `SITE_URL=https://<site> npm run check:og`, puis
[Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) / [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/).

---

## 8. Structure du dépôt

```
app/            pages (App Router), actions serveur, sitemap, robots, API de revalidation
components/     en-tête, pied de page, bandeau CTA, recherche, calendrier, clocher, simulateur…
content/        site.ts (textes), evenements.ts, articles/*.md, sheet-snapshot/*.csv
lib/            accès au Sheet, articles, événements, recherche, dates, SEO, ICS, règles de la collecte
public/         images, og-image.jpg
styles/         globals.css (design system navy / or / parchemin)
tests/          tests unitaires (Vitest)
scripts/        check-og.mjs
```

Anciennes URL (v1) redirigées : `/don`, `/budget`, `/equipe`, `/faq`, `/rejoindre`, `/avancement`, `/valeurs` et les ancres `/#budget`, `/#don`…
