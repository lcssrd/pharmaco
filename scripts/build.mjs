// Génère les fichiers dérivés des fiches (à relancer après chaque modification de contenu :
// « npm run build » ; le déploiement GitHub Pages le fait aussi automatiquement).
//
//  1. assets/js/icones.js      : uniquement les icônes Lucide utilisées dans les fiches
//                                (au lieu de charger toute la bibliothèque, ~400 Ko)
//  2. assets/data/recherche.json : le texte de chaque onglet, pour la recherche de l'accueil
//  3. sw.js                     : la liste des fichiers à garder pour la consultation hors
//                                ligne, et un numéro de version qui change avec le contenu

import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'node-html-parser';
import { icons as iconesLucide } from 'lucide';

const RACINE = join(dirname(fileURLToPath(import.meta.url)), '..');
const chemin = (...morceaux) => join(RACINE, ...morceaux);
const lire = (fichier) => readFileSync(chemin(fichier), 'utf8');
const ecrire = (fichier, contenu) => {
    mkdirSync(dirname(chemin(fichier)), { recursive: true });
    writeFileSync(chemin(fichier), contenu);
};

const versionLucide = JSON.parse(lire('node_modules/lucide/package.json')).version;

// Toutes les pages HTML du site (hors fichier de vérification Google)
const pages = readdirSync(RACINE).filter((f) => f.endsWith('.html') && !f.startsWith('google')).sort();
const fiches = pages.filter((f) => f !== 'index.html');

// ----------------------------------------------------------------------
// 1. Icônes
// ----------------------------------------------------------------------

const enPascalCase = (nom) => nom.split('-').map((m) => m.charAt(0).toUpperCase() + m.slice(1)).join('');

const nomsIcones = new Set();
for (const page of pages) {
    for (const [, nom] of lire(page).matchAll(/data-lucide="([^"]+)"/g)) nomsIcones.add(nom);
}

const icones = {};
for (const nom of [...nomsIcones].sort()) {
    const noeuds = iconesLucide[enPascalCase(nom)];
    if (!noeuds) {
        console.warn(`⚠ Icône Lucide inconnue : « ${nom} » (voir https://lucide.dev/icons)`);
        continue;
    }
    icones[nom] = noeuds;
}

ecrire('assets/js/icones.js', `/*
 * Fichier généré par scripts/build.mjs : ne pas modifier à la main.
 * Icônes Lucide ${versionLucide} utilisées dans les fiches (licence ISC, https://lucide.dev).
 * Remplace les éléments <i data-lucide="nom"></i> par l'icône SVG correspondante.
 */
(() => {
    const ICONES = ${JSON.stringify(icones)};
    const NS = 'http://www.w3.org/2000/svg';
    const ATTRIBUTS = {
        xmlns: NS, width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
        'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true',
    };

    function createIcons() {
        document.querySelectorAll('[data-lucide]').forEach((element) => {
            const nom = element.getAttribute('data-lucide');
            const noeuds = ICONES[nom];
            if (!noeuds) return;
            const svg = document.createElementNS(NS, 'svg');
            Object.entries(ATTRIBUTS).forEach(([cle, valeur]) => svg.setAttribute(cle, valeur));
            for (const { name, value } of element.attributes) {
                if (name !== 'data-lucide' && name !== 'class') svg.setAttribute(name, value);
            }
            svg.setAttribute('class', \`lucide lucide-\${nom} \${element.getAttribute('class') || ''}\`.trim());
            noeuds.forEach(([balise, attributs]) => {
                const enfant = document.createElementNS(NS, balise);
                Object.entries(attributs).forEach(([cle, valeur]) => enfant.setAttribute(cle, valeur));
                svg.appendChild(enfant);
            });
            element.replaceWith(svg);
        });
    }

    window.lucide = { createIcons };
    createIcons();
})();
`);

// ----------------------------------------------------------------------
// 2. Index de recherche
// ----------------------------------------------------------------------

const espaces = (texte) => texte.replace(/\s+/g, ' ').trim();

// Nom de chaque fiche tel qu'affiché sur les cartes de l'accueil
const accueil = parse(lire('index.html'));
const nomsFiches = {};
for (const carte of accueil.querySelectorAll('a[href$=".html"]')) {
    const titre = carte.querySelector('h3');
    if (titre) nomsFiches[carte.getAttribute('href').replace(/\.html$/, '')] = espaces(titre.text);
}

const entrees = [];
for (const fichier of fiches) {
    const fiche = fichier.replace(/\.html$/, '');
    const document = parse(lire(fichier));
    const nom = nomsFiches[fiche] || espaces(document.querySelector('h1')?.text || fiche);

    for (const bouton of document.querySelectorAll('.nav-btn[data-page]')) {
        const onglet = bouton.getAttribute('data-page');
        if (onglet === 'quiz') continue;
        const section = document.getElementById(onglet);
        if (!section) continue;
        section.querySelectorAll('script, style, iframe, canvas').forEach((e) => e.remove());
        entrees.push({
            f: fiche,
            n: nom,
            o: onglet,
            l: espaces(bouton.text),
            x: espaces(section.structuredText),
        });
    }
}
ecrire('assets/data/recherche.json', JSON.stringify(entrees));

// ----------------------------------------------------------------------
// 3. Service worker : fichiers disponibles hors ligne
// ----------------------------------------------------------------------

const lister = (dossier, extensions) => readdirSync(chemin(dossier))
    .filter((f) => extensions.some((e) => f.endsWith(e)))
    .map((f) => (dossier === '.' ? f : `${dossier}/${f}`))
    .sort();

const fichiersHorsLigne = [
    ...pages,
    'manifest.webmanifest',
    ...lister('assets/css', ['site.css']),
    ...lister('assets/js', ['.js']),
    ...lister('assets/data', ['.json']),
    ...lister('assets/icones', ['.png', '.svg']),
    ...lister('.', ['.jpg', '.png', '.webp']),
];

const empreinte = createHash('sha256');
for (const fichier of fichiersHorsLigne) empreinte.update(fichier).update(readFileSync(chemin(fichier)));
const version = empreinte.digest('hex').slice(0, 12);

const sw = lire('sw.js').replace(
    /\/\/ <genere>[\s\S]*?\/\/ <\/genere>/,
    `// <genere> (par scripts/build.mjs, ne pas modifier à la main)
const VERSION = '${version}';
const FICHIERS = ${JSON.stringify(['./', ...fichiersHorsLigne], null, 4)};
// </genere>`,
);
ecrire('sw.js', sw);

console.log(`✓ ${Object.keys(icones).length} icônes, ${entrees.length} onglets indexés, ${fichiersHorsLigne.length} fichiers hors ligne (version ${version})`);
