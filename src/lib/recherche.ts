/**
 * Recherche dans toutes les fiches, sans dépendance au navigateur (testée dans tests/).
 * L'index est produit à la construction du site (src/pages/recherche.json.ts).
 */
import { motsEntiers, normaliser, normaliserAvecPositions } from './texte';

/** Un onglet d'une fiche, tel qu'enregistré dans l'index (noms courts : fichier plus léger) */
export interface EntreeIndex {
    /** Identifiant de la fiche (antico) */
    f: string;
    /** Nom de la fiche (Antithrombotiques) */
    n: string;
    /** Identifiant de l'onglet (avk) */
    o: string;
    /** Libellé de l'onglet (AVK) */
    l: string;
    /** Texte de l'onglet */
    x: string;
}

export interface EntreePreparee extends EntreeIndex {
    /** Texte normalisé */
    xn: string;
    /** Correspondance entre le texte normalisé et le texte d'origine */
    positions: number[];
    /** Nom de la fiche et de l'onglet, normalisés */
    en: string;
}

export interface Resultat {
    entree: EntreePreparee;
    points: number;
}

/** Passage trouvé, en positions du texte d'origine : [debut, fin[ */
export interface Passage {
    debut: number;
    fin: number;
}

export interface Extrait {
    /** Le début du texte a été coupé */
    coupeAvant: boolean;
    avant: string;
    trouve: string;
    apres: string;
    /** La fin du texte a été coupée */
    coupeApres: boolean;
}

/** Une occurrence dans le nom de la fiche ou de l'onglet compte autant que 20 dans le texte */
const POIDS_NOM = 20;
const LONGUEUR_MIN_MOT = 2;

export const preparerIndex = (entrees: readonly EntreeIndex[]): EntreePreparee[] =>
    entrees.map((e) => {
        const { n, positions } = normaliserAvecPositions(e.x);
        return { ...e, xn: n, positions, en: normaliser(`${e.n} ${e.l}`) };
    });

/** Mots de la requête pris en compte (normalisés, au moins deux caractères) */
export const motsRecherche = (requete: string): string[] =>
    normaliser(requete.trim())
        .split(/\s+/)
        .filter((m) => m.length >= LONGUEUR_MIN_MOT);

const occurrences = (texte: string, mot: string): number => texte.split(mot).length - 1;

/** Onglets contenant tous les mots, du plus pertinent au moins pertinent */
export function rechercher(index: readonly EntreePreparee[], mots: readonly string[]): Resultat[] {
    const resultats: Resultat[] = [];
    for (const entree of index) {
        if (!mots.every((m) => entree.xn.includes(m) || entree.en.includes(m))) continue;
        let points = 0;
        for (const m of mots) {
            points += occurrences(entree.xn, m);
            if (entree.en.includes(m)) points += POIDS_NOM;
        }
        resultats.push({ entree, points });
    }
    return resultats.sort((a, b) => b.points - a.points);
}

/** Première occurrence du mot dans le texte de l'onglet */
export function trouverPassage(entree: EntreePreparee, mot: string): Passage | null {
    const p = entree.xn.indexOf(mot);
    if (p < 0) return null;
    const debut = entree.positions[p];
    const dernier = entree.positions[p + mot.length - 1];
    if (debut === undefined || dernier === undefined) return null;
    return { debut, fin: dernier + 1 };
}

/** Extrait du texte autour du passage : environ 60 caractères avant, 90 après, coupé aux espaces */
export function extrait(texte: string, { debut: position, fin: finMot }: Passage): Extrait {
    const debut = position > 60 ? texte.lastIndexOf(' ', position - 60) + 1 : 0;
    const finBrute = finMot + 90;
    const espace = finBrute < texte.length ? texte.indexOf(' ', finBrute) : -1;
    const fin = espace < 0 ? texte.length : espace;
    return {
        coupeAvant: debut > 0,
        avant: texte.slice(debut, position),
        trouve: texte.slice(position, finMot),
        apres: texte.slice(finMot, fin),
        coupeApres: fin < texte.length,
    };
}

/**
 * Lien vers l'onglet ; avec un passage, le fragment #:~:text= fait surligner celui-ci
 * par le navigateur (le script des onglets ignore cette partie de l'adresse).
 */
export function lienResultat(entree: EntreeIndex, passage: Passage | null): string {
    const fragment = passage ? `:~:text=${encodeURIComponent(motsEntiers(entree.x, passage.debut, passage.fin))}` : '';
    return `${entree.f}.html#${encodeURIComponent(entree.o)}${fragment}`;
}
