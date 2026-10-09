// Configuration Tailwind du site.
//
// Le CSS est compilé (npm run build:css) au lieu d'être généré dans le navigateur
// par cdn.tailwindcss.com : affichage plus rapide, et fonctionne hors ligne.
//
// Mode sombre : plutôt que d'ajouter des classes "dark:" partout dans les fiches,
// chaque famille de couleurs (texte, fond, bordure, dégradé) passe par une variable CSS.
// En mode sombre, on redéfinit ces variables : les fonds clairs deviennent des teintes
// sombres, les textes foncés deviennent clairs, et les couleurs vives restent identiques.
// Les fiches existantes s'adaptent donc automatiquement, sans modification.

import plugin from 'tailwindcss/plugin';
import colors from 'tailwindcss/colors';

const PALETTES = [
    'slate', 'gray', 'zinc', 'neutral', 'stone',
    'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal',
    'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose',
];
const NEUTRES = ['slate', 'gray', 'zinc', 'neutral', 'stone'];
const NUANCES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const hexVersRgb = (hex) => {
    const n = parseInt(hex.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const rgbVersVar = ([r, g, b]) => `${r} ${g} ${b}`;
const melange = (couleur, fond, proportion) =>
    couleur.map((c, i) => Math.round(c * proportion + fond[i] * (1 - proportion)));

// Surface de référence du mode sombre (slate-900)
const SURFACE_SOMBRE = hexVersRgb(colors.slate[900]);

// Palette Tailwind dont chaque teinte lit une variable propre à l'usage (t = texte,
// b = fond, o = bordure, g = dégradé), avec repli sur la couleur de base (--c-*).
function paletteVariable(prefixe) {
    const ref = (nom) => `rgb(var(--${prefixe}-${nom}, var(--c-${nom})) / <alpha-value>)`;
    const palette = {
        inherit: 'inherit',
        current: 'currentColor',
        transparent: 'transparent',
        white: ref('white'),
        black: ref('black'),
    };
    for (const p of PALETTES) {
        palette[p] = {};
        for (const n of NUANCES) palette[p][n] = ref(`${p}-${n}`);
    }
    return palette;
}

// Variables de base (mode clair) : les couleurs Tailwind d'origine
function variablesClaires() {
    const vars = { '--c-white': '255 255 255', '--c-black': '0 0 0' };
    for (const p of PALETTES) {
        for (const n of NUANCES) vars[`--c-${p}-${n}`] = rgbVersVar(hexVersRgb(colors[p][n]));
    }
    return vars;
}

// Surcharges du mode sombre
function variablesSombres() {
    const vars = {
        '--b-white': rgbVersVar(SURFACE_SOMBRE),
        '--g-white': rgbVersVar(SURFACE_SOMBRE),
        '--o-white': rgbVersVar(melange(hexVersRgb(colors.slate[400]), SURFACE_SOMBRE, 0.2)),
        '--t-black': rgbVersVar(hexVersRgb(colors.slate[100])),
    };
    const fondTeinte = { 50: 0.07, 100: 0.12, 200: 0.2, 300: 0.3 };
    const bordureTeinte = { 50: 0.12, 100: 0.18, 200: 0.26, 300: 0.38 };
    // Texte foncé -> texte clair
    const texte = { 500: 400, 600: 400, 700: 300, 800: 200, 900: 100, 950: 50 };

    for (const p of PALETTES) {
        const base = hexVersRgb(colors[p][400]);
        for (const [n, k] of Object.entries(fondTeinte)) {
            const v = rgbVersVar(melange(base, SURFACE_SOMBRE, k));
            vars[`--b-${p}-${n}`] = v;
            vars[`--g-${p}-${n}`] = v;
        }
        for (const [n, k] of Object.entries(bordureTeinte)) {
            vars[`--o-${p}-${n}`] = rgbVersVar(melange(base, SURFACE_SOMBRE, k));
        }
        for (const [n, cible] of Object.entries(texte)) {
            vars[`--t-${p}-${n}`] = rgbVersVar(hexVersRgb(colors[p][cible]));
        }
    }
    // Les fonds gris foncés (en-têtes, pieds de page) restent foncés, un cran plus sombres
    for (const p of NEUTRES) {
        vars[`--b-${p}-700`] = rgbVersVar(hexVersRgb(colors[p][800]));
        vars[`--b-${p}-800`] = rgbVersVar(hexVersRgb(colors[p][950]));
        vars[`--b-${p}-900`] = rgbVersVar(hexVersRgb(colors[p][950]));
    }
    return vars;
}

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./*.html', './assets/js/site.js'],
    theme: {
        colors: paletteVariable('c'),
        textColor: paletteVariable('t'),
        placeholderColor: paletteVariable('t'),
        backgroundColor: paletteVariable('b'),
        ringOffsetColor: paletteVariable('b'),
        borderColor: { ...paletteVariable('o'), DEFAULT: paletteVariable('o').gray[200] },
        divideColor: ({ theme }) => theme('borderColor'),
        gradientColorStops: paletteVariable('g'),
        extend: {
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [
        plugin(({ addBase }) => {
            addBase({
                ':root': variablesClaires(),
                ':root[data-theme="dark"]': variablesSombres(),
            });
        }),
    ],
};
