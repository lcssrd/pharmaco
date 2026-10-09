// Génère assets/css/couleurs.css : la palette du site et ses variantes pour le mode sombre.
// Lancé automatiquement par « npm run build:css » (et « npm run dev »).
//
// Palette : les couleurs de Tailwind 3 (hexadécimal), celles avec lesquelles le site a été
// conçu. Tailwind 4 propose une palette légèrement différente (oklch, plus saturée sur les
// écrans récents) : on garde l'originale pour ne pas changer l'apparence des fiches.
//
// Mode sombre : Tailwind 4 cherche la couleur d'un fond (et d'un dégradé) dans
// --background-color-*, d'un texte dans --text-color-* et d'une bordure dans
// --border-color-*, avant --color-*. On définit donc ces variables pour les teintes qui
// doivent changer, puis on les redéfinit en mode sombre : les fonds clairs deviennent des
// teintes sombres, les textes foncés deviennent clairs, les couleurs vives restent identiques.
// Les fiches s'adaptent ainsi sans aucune classe « dark: ».

import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const NUANCES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const PALETTE = {
    slate: ['#f8fafc', '#f1f5f9', '#e2e8f0', '#cbd5e1', '#94a3b8', '#64748b', '#475569', '#334155', '#1e293b', '#0f172a', '#020617'],
    gray: ['#f9fafb', '#f3f4f6', '#e5e7eb', '#d1d5db', '#9ca3af', '#6b7280', '#4b5563', '#374151', '#1f2937', '#111827', '#030712'],
    zinc: ['#fafafa', '#f4f4f5', '#e4e4e7', '#d4d4d8', '#a1a1aa', '#71717a', '#52525b', '#3f3f46', '#27272a', '#18181b', '#09090b'],
    neutral: ['#fafafa', '#f5f5f5', '#e5e5e5', '#d4d4d4', '#a3a3a3', '#737373', '#525252', '#404040', '#262626', '#171717', '#0a0a0a'],
    stone: ['#fafaf9', '#f5f5f4', '#e7e5e4', '#d6d3d1', '#a8a29e', '#78716c', '#57534e', '#44403c', '#292524', '#1c1917', '#0c0a09'],
    red: ['#fef2f2', '#fee2e2', '#fecaca', '#fca5a5', '#f87171', '#ef4444', '#dc2626', '#b91c1c', '#991b1b', '#7f1d1d', '#450a0a'],
    orange: ['#fff7ed', '#ffedd5', '#fed7aa', '#fdba74', '#fb923c', '#f97316', '#ea580c', '#c2410c', '#9a3412', '#7c2d12', '#431407'],
    amber: ['#fffbeb', '#fef3c7', '#fde68a', '#fcd34d', '#fbbf24', '#f59e0b', '#d97706', '#b45309', '#92400e', '#78350f', '#451a03'],
    yellow: ['#fefce8', '#fef9c3', '#fef08a', '#fde047', '#facc15', '#eab308', '#ca8a04', '#a16207', '#854d0e', '#713f12', '#422006'],
    lime: ['#f7fee7', '#ecfccb', '#d9f99d', '#bef264', '#a3e635', '#84cc16', '#65a30d', '#4d7c0f', '#3f6212', '#365314', '#1a2e05'],
    green: ['#f0fdf4', '#dcfce7', '#bbf7d0', '#86efac', '#4ade80', '#22c55e', '#16a34a', '#15803d', '#166534', '#14532d', '#052e16'],
    emerald: ['#ecfdf5', '#d1fae5', '#a7f3d0', '#6ee7b7', '#34d399', '#10b981', '#059669', '#047857', '#065f46', '#064e3b', '#022c22'],
    teal: ['#f0fdfa', '#ccfbf1', '#99f6e4', '#5eead4', '#2dd4bf', '#14b8a6', '#0d9488', '#0f766e', '#115e59', '#134e4a', '#042f2e'],
    cyan: ['#ecfeff', '#cffafe', '#a5f3fc', '#67e8f9', '#22d3ee', '#06b6d4', '#0891b2', '#0e7490', '#155e75', '#164e63', '#083344'],
    sky: ['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc', '#38bdf8', '#0ea5e9', '#0284c7', '#0369a1', '#075985', '#0c4a6e', '#082f49'],
    blue: ['#eff6ff', '#dbeafe', '#bfdbfe', '#93c5fd', '#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8', '#1e40af', '#1e3a8a', '#172554'],
    indigo: ['#eef2ff', '#e0e7ff', '#c7d2fe', '#a5b4fc', '#818cf8', '#6366f1', '#4f46e5', '#4338ca', '#3730a3', '#312e81', '#1e1b4b'],
    violet: ['#f5f3ff', '#ede9fe', '#ddd6fe', '#c4b5fd', '#a78bfa', '#8b5cf6', '#7c3aed', '#6d28d9', '#5b21b6', '#4c1d95', '#2e1065'],
    purple: ['#faf5ff', '#f3e8ff', '#e9d5ff', '#d8b4fe', '#c084fc', '#a855f7', '#9333ea', '#7e22ce', '#6b21a8', '#581c87', '#3b0764'],
    fuchsia: ['#fdf4ff', '#fae8ff', '#f5d0fe', '#f0abfc', '#e879f9', '#d946ef', '#c026d3', '#a21caf', '#86198f', '#701a75', '#4a044e'],
    pink: ['#fdf2f8', '#fce7f3', '#fbcfe8', '#f9a8d4', '#f472b6', '#ec4899', '#db2777', '#be185d', '#9d174d', '#831843', '#500724'],
    rose: ['#fff1f2', '#ffe4e6', '#fecdd3', '#fda4af', '#fb7185', '#f43f5e', '#e11d48', '#be123c', '#9f1239', '#881337', '#4c0519'],
};

// Réglages du mode sombre
const SURFACE_SOMBRE = PALETTE.slate[9]; // slate-900 : fond des cartes blanches
const FOND = { 50: 0.07, 100: 0.12, 200: 0.2, 300: 0.3 }; // part de la teinte 400 dans les fonds clairs
const BORDURE = { 50: 0.12, 100: 0.18, 200: 0.26, 300: 0.38 }; // idem pour les bordures
const TEXTE = { 500: 400, 600: 400, 700: 300, 800: 200, 900: 100, 950: 50 }; // texte foncé -> clair
// Les fonds gris foncés (en-têtes) passent un cran plus sombres dans source.css et non ici :
// en Tailwind 4, les dégradés (from-/to-) lisent les mêmes variables que les fonds.

const teinte = (p, n) => PALETTE[p][NUANCES.indexOf(Number(n))];
const versRgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const versHex = (rgb) => `#${rgb.map((c) => c.toString(16).padStart(2, '0')).join('')}`;
const melange = (couleur, fond, part) => versHex(versRgb(couleur).map((c, i) => Math.round(c * part + versRgb(fond)[i] * (1 - part))));

const clair = [];
const sombre = [];
const declarer = (liste, nom, valeur) => liste.push(`    --${nom}: ${valeur};`);

// Palette de base
declarer(clair, 'color-white', '#fff');
declarer(clair, 'color-black', '#000');
for (const p of Object.keys(PALETTE)) {
    for (const n of NUANCES) declarer(clair, `color-${p}-${n}`, teinte(p, n));
}

// Couleurs par usage (valeur claire, puis valeur sombre)
const parUsage = (usage, nom, valeurClaire, valeurSombre) => {
    declarer(clair, `${usage}-${nom}`, valeurClaire);
    declarer(sombre, `${usage}-${nom}`, valeurSombre);
};
parUsage('background-color', 'white', '#fff', SURFACE_SOMBRE);
parUsage('border-color', 'white', '#fff', melange(PALETTE.slate[4], SURFACE_SOMBRE, 0.2));
parUsage('text-color', 'black', '#000', PALETTE.slate[1]);
for (const p of Object.keys(PALETTE)) {
    const base = teinte(p, 400);
    for (const [n, part] of Object.entries(FOND)) parUsage('background-color', `${p}-${n}`, teinte(p, n), melange(base, SURFACE_SOMBRE, part));
    for (const [n, part] of Object.entries(BORDURE)) parUsage('border-color', `${p}-${n}`, teinte(p, n), melange(base, SURFACE_SOMBRE, part));
    for (const [n, cible] of Object.entries(TEXTE)) parUsage('text-color', `${p}-${n}`, teinte(p, n), teinte(p, cible));
}

const css = `/*
 * Fichier généré par scripts/couleurs.mjs : ne pas modifier à la main.
 * Palette du site (couleurs de Tailwind 3) et variantes du mode sombre.
 */

@theme {
    --color-*: initial;
${clair.join('\n')}
}

:root[data-theme="dark"] {
${sombre.join('\n')}
}
`;

const destination = join(dirname(fileURLToPath(import.meta.url)), '..', 'assets', 'css', 'couleurs.css');
writeFileSync(destination, css);
console.log(`✓ Palette : ${clair.length} variables de couleur, ${sombre.length} redéfinies en mode sombre`);
