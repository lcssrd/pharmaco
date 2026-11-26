/** Cartes de l'accueil qui mènent hors du site, affichées après les fiches */
import type { ThemeCarte } from './themes-cartes';
import { THEMES_CARTES } from './themes-cartes';

export interface LienExterne {
    url: string;
    titre: string;
    sousTitre: string;
    pastille: string;
    theme: ThemeCarte;
    /** Tracé SVG de l'icône (Phosphor, grille 256 × 256) */
    icone: string;
}

export const LIENS_EXTERNES: readonly LienExterne[] = [
    {
        url: 'https://www.linkedin.com/in/lucas-s%C3%A9raudie-1858ba14b/',
        titre: 'Contacter le créateur',
        sousTitre: 'Retrouvez-moi sur LinkedIn',
        pastille: 'Contact',
        theme: THEMES_CARTES.linkedin,
        icone: 'M216,20H40A20,20,0,0,0,20,40V216a20,20,0,0,0,20,20H216a20,20,0,0,0,20-20V40A20,20,0,0,0,216,20Zm-4,192H44V44H212ZM112,176V120a12,12,0,0,1,21.43-7.41A40,40,0,0,1,192,148v28a12,12,0,0,1-24,0V148a16,16,0,0,0-32,0v28a12,12,0,0,1-24,0ZM96,120v56a12,12,0,0,1-24,0V120a12,12,0,0,1,24,0ZM68,80A16,16,0,1,1,84,96,16,16,0,0,1,68,80Z',
    },
    {
        url: 'https://eidos-simul.fr',
        titre: 'Visiter mon autre projet : Eidos',
        sousTitre: 'Simulateur de dossier patient informatisé pour formateur en santé',
        pastille: 'Projet',
        theme: THEMES_CARTES.sky,
        icone: 'M208,36H48A28,28,0,0,0,20,64V172a28,28,0,0,0,28,28h68v12H96a12,12,0,0,0,0,24h64a12,12,0,0,0,0-24H140V200h68a28,28,0,0,0,28-28V64A28,28,0,0,0,208,36ZM48,60H208a4,4,0,0,1,4,4v72H44V64A4,4,0,0,1,48,60ZM208,176H48a4,4,0,0,1-4-4V160H212v12A4,4,0,0,1,208,176Z',
    },
];
