/**
 * Couleurs des cartes de l'accueil.
 * Les classes sont écrites en entier pour que Tailwind les trouve et les génère.
 */
import type { CouleurCarte } from '../types/fiche';

export interface ThemeCarte {
    /** Fond, bordure et anneau au survol de la carte */
    carte: string;
    /** Couleur de l'icône et de la flèche */
    accent: string;
    /** Pastille en haut à droite */
    pastille: string;
}

const pastille = (couleurs: string): string => `${couleurs} text-xs px-2.5`;

export const THEMES_CARTES: Readonly<Record<CouleurCarte | 'linkedin', ThemeCarte>> = {
    amber: {
        carte: 'from-amber-50 to-amber-100 border-amber-200 hover:ring-amber-500/80',
        accent: 'text-amber-500',
        pastille: pastille('bg-amber-200 text-amber-800'),
    },
    blue: {
        carte: 'from-blue-50 to-blue-100 border-blue-200 hover:ring-blue-500/80',
        accent: 'text-blue-500',
        pastille: pastille('bg-blue-200 text-blue-800'),
    },
    cyan: {
        carte: 'from-cyan-50 to-cyan-100 border-cyan-200 hover:ring-cyan-500/80',
        accent: 'text-cyan-500',
        pastille: pastille('bg-cyan-200 text-cyan-800'),
    },
    emerald: {
        carte: 'from-emerald-50 to-emerald-100 border-emerald-200 hover:ring-emerald-500/80',
        accent: 'text-emerald-500',
        pastille: pastille('bg-emerald-200 text-emerald-800'),
    },
    fuchsia: {
        carte: 'from-fuchsia-50 to-fuchsia-100 border-fuchsia-200 hover:ring-fuchsia-500/80',
        accent: 'text-fuchsia-500',
        pastille: pastille('bg-fuchsia-200 text-fuchsia-800'),
    },
    lime: {
        carte: 'from-lime-50 to-lime-100 border-lime-200 hover:ring-lime-500/80',
        // Le vert citron 500 est trop clair sur ce fond : nuance 600
        accent: 'text-lime-600',
        pastille: pastille('bg-lime-200 text-lime-800'),
    },
    pink: {
        carte: 'from-pink-50 to-pink-100 border-pink-200 hover:ring-pink-500/80',
        accent: 'text-pink-500',
        pastille: pastille('bg-pink-200 text-pink-800'),
    },
    purple: {
        carte: 'from-purple-50 to-purple-100 border-purple-200 hover:ring-purple-500/80',
        accent: 'text-purple-500',
        pastille: pastille('bg-purple-200 text-purple-800'),
    },
    red: {
        carte: 'from-red-50 to-red-100 border-red-200 hover:ring-red-500/80',
        accent: 'text-red-500',
        pastille: pastille('bg-red-200 text-red-800'),
    },
    rose: {
        carte: 'from-rose-50 to-rose-100 border-rose-200 hover:ring-rose-500/80',
        accent: 'text-rose-500',
        pastille: pastille('bg-rose-200 text-rose-800'),
    },
    sky: {
        carte: 'from-sky-50 to-sky-100 border-sky-200 hover:ring-sky-500/80',
        accent: 'text-sky-500',
        pastille: pastille('bg-sky-200 text-sky-800'),
    },
    teal: {
        carte: 'from-teal-50 to-teal-100 border-teal-200 hover:ring-teal-500/80',
        accent: 'text-teal-500',
        pastille: pastille('bg-teal-200 text-teal-800'),
    },
    violet: {
        carte: 'from-violet-50 to-violet-100 border-violet-200 hover:ring-violet-500/80',
        accent: 'text-violet-500',
        pastille: pastille('bg-violet-200 text-violet-800'),
    },
    linkedin: {
        carte: 'from-indigo-50 to-blue-100 border-blue-200 hover:ring-blue-600',
        accent: 'text-blue-600',
        pastille: 'bg-blue-600 text-white text-[10px] px-2 uppercase',
    },
};
