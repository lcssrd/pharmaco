# Synthèses de Pharmacologie - IFSI

[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)

Ce dépôt centralise un ensemble de fiches de synthèse structurées portant sur les principales classes médicamenteuses abordées dans le cursus des Études en Soins Infirmiers (IFSI). Chaque synthèse est conçue pour offrir une vision claire, académique et rapide des points essentiels à maîtriser.

## 📚 Sommaire des Synthèses

Les thématiques suivantes sont actuellement disponibles :

*   **Douleur & Inflammation** : Antalgiques, Anti-inflammatoires.
*   **Système Cardiovasculaire** : Antihypertenseurs (Anti-HTA), Anticoagulants, Antiarythmiques, Hypolipémiants.
*   **Système Nerveux & Psychiatrie** : Psychotropes, Anxiolytiques.
*   **Métabolisme & Endocrinologie** : Antidiabétiques.
*   **Pathologies Spécifiques** : Asthme, Cancer (Anticancéreux), Immunosuppresseurs.
*   **Système Digestif** : Pathologies et traitements digestifs.

## ✨ Fonctionnalités

*   **Recherche** dans toutes les fiches depuis l'accueil (nom de molécule, nom commercial, mot-clé), avec ouverture directe du bon onglet et surlignage du passage.
*   **Onglets dans l'adresse** : chaque section a son propre lien (`antico.html#avk`), partageable, et le bouton « Retour » du téléphone revient à l'onglet précédent.
*   **Quiz** : questions et réponses mélangées à chaque tentative, meilleur score mémorisé (affiché sur la carte de la fiche à l'accueil), bouton « Refaire mes erreurs ».
*   **Hors ligne** : le site s'installe comme une application et reste consultable sans réseau après une première visite.
*   **Mode sombre**, qui suit le réglage du téléphone ou se choisit avec le bouton 🌙.

Les scores et le thème choisi sont enregistrés uniquement dans le navigateur de l'étudiant (aucun compte, aucune donnée envoyée).

## 🛠️ Modifier le site

Le site reste un ensemble de pages HTML statiques publiées par GitHub Pages. Une petite étape de construction génère quelques fichiers à partir des fiches.

### Organisation

| Fichier | Rôle |
| --- | --- |
| `*.html` | Les fiches et l'accueil. Le contenu et les questions du quiz (`quizData`, en bas de chaque fiche) se modifient directement ici. |
| `assets/js/site.js` | Code commun : onglets, quiz, thème, recherche, hors ligne. |
| `assets/css/source.css` | Styles communs. Compilé avec Tailwind dans `assets/css/site.css`. |
| `tailwind.config.js` | Configuration de Tailwind et des couleurs du mode sombre. |
| `scripts/build.mjs` | Génère `assets/js/icones.js` (icônes utilisées), `assets/data/recherche.json` (index de recherche) et la liste des fichiers hors ligne dans `sw.js`. |

Les fichiers `assets/css/site.css`, `assets/js/icones.js`, `assets/data/recherche.json` et la partie générée de `sw.js` ne se modifient pas à la main.

### Commandes

Il faut [Node.js](https://nodejs.org) (version 20 ou plus).

```bash
npm install
```

```bash
npm run build
```

`npm run dev` recompile le CSS automatiquement à chaque modification d'une fiche (pratique pendant qu'on écrit). Le déploiement GitHub Pages relance `npm run build` à chaque mise en ligne : un oubli en local n'a donc pas de conséquence sur le site publié.

Pour prévisualiser le site en local, il faut un petit serveur (par exemple `python -m http.server`) puis ouvrir `http://localhost:8000`. En local, le mode hors ligne n'est activé qu'en ajoutant `?sw` à l'adresse, pour éviter de voir d'anciennes versions pendant qu'on modifie les fiches.

### Après une modification de contenu

Mettre à jour la date en bas de la fiche (`<time datetime="AAAA-MM-JJ">`), dans le pied de page.

### Ajouter une fiche

1.  Partir d'une fiche existante : garder l'en-tête (boutons « Toutes les fiches » et thème), la barre d'onglets et le pied de page.
2.  Chaque onglet est un bouton `<button data-page="identifiant" data-actif="from-… to-…" class="nav-btn …">` qui correspond à une section `<div id="identifiant" class="page hidden">`. `data-actif` donne le dégradé du bouton actif, `data-survol` (facultatif) sa couleur au survol.
3.  Ajouter la carte sur l'accueil (`<a href="fiche.html" data-fiche="fiche" …>`) et l'adresse dans `sitemap.xml`.
4.  Lancer `npm run build`.

## 👥 Équipe du Projet

*   **Lucas Séraudie** : Créateur et auteur principal, conception et développement des supports visuels. Et c'est peut être pas super bien codé selon les règles de bonnes pratiques... C'est ma faute !
*   **Thomas Duflot** : Relecture critique et validation de l'exactitude des contenus scientifiques.

## ⚖️ Licence

Le contenu de ce projet est mis à disposition selon les termes de la licence [Creative Commons Attribution - Partage dans les Mêmes Conditions 4.0 International (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/).

Vous êtes libre de :
*   **Partager** : Copier et redistribuer le matériel sous n'importe quel format.
*   **Adapter** : Remixer, transformer et créer à partir du matériel pour toute utilisation, même commerciale.

Selon les conditions suivantes :
*   **Attribution** : Vous devez citer et créditer ce dépot, fournir un lien vers la licence et indiquer si des modifications ont été effectuées.
*   **Partage dans les Mêmes Conditions** : Si vous modifiez le matériel, vous devez distribuer votre contribution sous la même licence que l'original.
