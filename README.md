# Synthèses de Pharmacologie - IFSI

[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)

Ce dépôt centralise un ensemble de fiches de synthèse structurées portant sur les principales classes médicamenteuses abordées dans le cursus des Études en Soins Infirmiers (IFSI). Chaque synthèse est conçue pour offrir une vision claire, académique et rapide des points essentiels à maîtriser.

Cette version (Pharmaco2) est une réécriture complète de la première version du site, avec un affichage et un fonctionnement identiques : mêmes pages, mêmes adresses (`antico.html#avk`), même apparence, mêmes scores de quiz mémorisés.

## 📚 Sommaire des Synthèses

- **Douleur & Inflammation** : Antalgiques, Anti-inflammatoires.
- **Système Cardiovasculaire** : Antihypertenseurs (Anti-HTA), Anticoagulants, Antiarythmiques, Hypolipémiants.
- **Système Nerveux & Psychiatrie** : Psychotropes, Anxiolytiques.
- **Métabolisme & Endocrinologie** : Antidiabétiques.
- **Pathologies Spécifiques** : Asthme, Cancer (Anticancéreux), Immunosuppresseurs.
- **Système Digestif** : Pathologies et traitements digestifs.

## ✨ Fonctionnalités

- **Recherche** dans toutes les fiches depuis l'accueil (nom de molécule, nom commercial, mot-clé), avec ouverture directe du bon onglet et surlignage du passage.
- **Onglets dans l'adresse** : chaque section a son propre lien (`antico.html#avk`), partageable, et le bouton « Retour » du téléphone revient à l'onglet précédent.
- **Quiz** : questions et réponses mélangées à chaque tentative, meilleur score mémorisé (affiché sur la carte de la fiche à l'accueil), bouton « Refaire mes erreurs ».
- **Écran d'accueil** : le site peut être ajouté à l'écran d'accueil du téléphone. Il n'a pas de version hors ligne.
- **Sans JavaScript**, les fiches restent lisibles : tous les onglets s'affichent les uns sous les autres.

Les scores des quiz sont enregistrés uniquement dans le navigateur de l'étudiant (aucun compte, aucune donnée envoyée).

## 🛠️ Modifier le site

Le site est construit avec [Astro](https://astro.build) (pages statiques), [Tailwind CSS 4](https://tailwindcss.com) et TypeScript. Il s'affiche correctement à partir de Safari 16.4 (iOS 16.4), Chrome 111 et Firefox 128.

### Organisation

| Dossier ou fichier                | Rôle                                                                                                                                                                                 |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `src/contenu/fiches/<fiche>/`     | **Le contenu d'une fiche** : c'est ici qu'on travaille au quotidien (voir ci-dessous).                                                                                               |
| `src/contenu/ordre-accueil.json`  | Ordre des fiches sur l'accueil (et dans le plan du site).                                                                                                                            |
| `src/components/`, `src/layouts/` | Mise en page commune : en-tête, onglets, quiz, pied de page, cartes de l'accueil.                                                                                                    |
| `src/scripts/`                    | Code exécuté dans le navigateur : onglets, quiz, recherche, graphiques.                                                                                                              |
| `src/lib/`                        | Règles indépendantes de la page (quiz, recherche, texte), couvertes par les tests ; `src/lib/serveur/` ne sert qu'à la construction (chargement et vérification des fiches, icônes). |
| `src/pages/`                      | Les pages produites : accueil, une page par fiche, index de recherche, plan du site.                                                                                                 |
| `src/styles/`                     | Styles communs et palette de couleurs (celle d'origine).                                                                                                                             |
| `src/data/`                       | Informations du site (auteur, version, liens externes, couleurs des cartes).                                                                                                         |
| `public/`                         | Fichiers publiés tels quels : icônes, images, PDF, `manifest.webmanifest`, `CNAME`…                                                                                                  |
| `tests/`                          | Tests automatiques (`npm test`).                                                                                                                                                     |

#### Une fiche

Chaque fiche a son dossier, dont le nom donne l'adresse de la page (`antico` → `antico.html`) :

| Fichier         | Contenu                                                                                                                                                                                                                                  |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fiche.ts`      | Titre, description pour les moteurs de recherche, date de mise à jour, carte de l'accueil, couleurs, liste des onglets, texte du quiz. Chaque champ est décrit dans `src/types/fiche.ts` ; l'éditeur le complète et signale les erreurs. |
| `<onglet>.html` | Le contenu d'un onglet (un fichier par onglet, du nom de son identifiant). HTML avec les classes Tailwind.                                                                                                                               |
| `quiz.json`     | Les questions : `question`, `options` (propositions), `correct` (position de la bonne réponse, 0 pour la première), `feedback` (explication).                                                                                            |
| `graphiques.ts` | Facultatif : graphiques Chart.js, rattachés à un `<canvas id="…">` du contenu.                                                                                                                                                           |

Dans le contenu, une icône [Lucide](https://lucide.dev/icons) s'écrit `<i data-lucide="pill" class="w-4 h-4"></i>` : elle est remplacée par l'image de l'icône lors de la construction.

Les images vont dans `public/images/` (`<img src="images/…" width="…" height="…" loading="lazy" alt="…">`).

### Commandes

Il faut [Node.js](https://nodejs.org) 22 ou plus.

```bash
npm install        # une fois, pour installer les outils
npm run dev        # aperçu local, rechargé à chaque modification : http://localhost:4321/index.html
npm test           # vérifie le contenu des fiches et les règles du quiz et de la recherche
npm run build      # construit le site dans dist/
npm run preview    # aperçu du site construit
npm run verify     # tout vérifier comme lors du déploiement (format, lint, types, tests, construction)
npm run format     # remet en forme le code (le HTML des fiches n'est pas touché)
```

La construction **s'arrête avec un message clair** si une fiche est incomplète : onglet sans fichier, fichier sans onglet, question dont la bonne réponse n'existe pas, icône inconnue, fiche absente de `ordre-accueil.json`…

`npm audit` doit afficher « 0 vulnerabilities ». S'il signale une alerte, **ne pas lancer `npm audit fix --force`** (risque d'installer une version majeure incompatible) : regarder de quelle dépendance il s'agit avec `npm ls nom-du-paquet`. Ces outils ne servent qu'à construire le site et ne sont jamais envoyés aux étudiants.

Pour intégrer une vidéo YouTube, copier le code d'intégration complet proposé par YouTube (« Partager » puis « Intégrer ») : il contient `referrerpolicy="strict-origin-when-cross-origin"`, sans lequel certains navigateurs affichent « Erreur 153 ». Ajouter `loading="lazy"`.

### Après une modification de contenu

Mettre à jour `miseAJour` dans le `fiche.ts` de la fiche (date affichée en bas de la page).

### Ajouter une fiche

1.  Copier le dossier d'une fiche existante dans `src/contenu/fiches/` et le renommer (ce nom sera l'adresse de la page).
2.  Adapter `fiche.ts` (onglets, couleurs, carte de l'accueil), un fichier `.html` par onglet, et `quiz.json`.
3.  Ajouter le nom du dossier dans `src/contenu/ordre-accueil.json`.
4.  Lancer `npm test` puis `npm run dev` pour vérifier.

La carte de l'accueil, l'index de recherche et le plan du site (`sitemap.xml`) se mettent à jour d'eux-mêmes.

### Mise en ligne

Le site est publié par GitHub Pages (`.github/workflows/deploy.yml`) : à chaque mise à jour de la branche `main`, tout est vérifié puis seul le dossier `dist/` est publié. Une proposition de modification (pull request) est vérifiée sans être publiée.

Dans les réglages du dépôt GitHub, « Pages » doit avoir pour source « GitHub Actions ».

## 👥 Équipe du Projet

- **Lucas Séraudie** : Créateur et auteur principal, conception et développement des supports visuels.
- **Thomas Duflot** : Relecture critique et validation de l'exactitude des contenus scientifiques.

## 🔎 Sources et relecture

Les informations sur les médicaments (noms commerciaux, état de commercialisation, posologies, contre-indications, interactions) ont été relues en novembre 2026 avec la [Base de données publique des médicaments](https://base-donnees-publique.medicaments.gouv.fr/) (ANSM), à partir des résumés des caractéristiques du produit (RCP).

Les notions qui ne figurent pas dans cette base (physiopathologie, seuils diagnostiques, recommandations de la HAS ou des sociétés savantes) restent à valider par la relecture scientifique.

## ⚖️ Licence

Le contenu de ce projet est mis à disposition selon les termes de la licence [Creative Commons Attribution - Partage dans les Mêmes Conditions 4.0 International (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/).

Vous êtes libre de :

- **Partager** : Copier et redistribuer le matériel sous n'importe quel format.
- **Adapter** : Remixer, transformer et créer à partir du matériel pour toute utilisation, même commerciale.

Selon les conditions suivantes :

- **Attribution** : Vous devez citer et créditer ce dépot, fournir un lien vers la licence et indiquer si des modifications ont été effectuées.
- **Partage dans les Mêmes Conditions** : Si vous modifiez le matériel, vous devez distribuer votre contribution sous la même licence que l'original.
