/**
 * Outils de traitement de texte, sans dépendance au navigateur (testés dans tests/).
 */

/** Caractères ramenés à une forme simple avant comparaison */
const REMPLACEMENTS: Readonly<Record<string, string>> = {
    œ: 'oe',
    æ: 'ae',
    '\u2019': "'", // apostrophe typographique
    '\u00a0': ' ', // espace insécable
    '\u202f': ' ', // espace fine insécable
};

const DIACRITIQUES = /[\u0300-\u036f]/g;

export interface TexteNormalise {
    /** Texte en minuscules, sans accents (« Cœur » -> « coeur ») */
    n: string;
    /**
     * Pour chaque caractère de « n », sa position dans le texte d'origine ;
     * un dernier élément vaut la longueur du texte d'origine.
     */
    positions: number[];
}

export function normaliserAvecPositions(texte: string): TexteNormalise {
    let n = '';
    const positions: number[] = [];
    for (let i = 0; i < texte.length; i++) {
        let c = texte.charAt(i).normalize('NFD').replace(DIACRITIQUES, '').toLowerCase();
        c = REMPLACEMENTS[c] ?? c;
        for (const caractere of c) {
            n += caractere;
            positions.push(i);
        }
    }
    positions.push(texte.length);
    return { n, positions };
}

export const normaliser = (texte: string): string => normaliserAvecPositions(texte).n;

const LETTRE = /[\p{L}\p{N}]/u;

/**
 * Étend l'intervalle [debut, fin[ aux mots entiers : le surlignage de texte du navigateur
 * (#:~:text=) ne trouve que des mots entiers.
 */
export function motsEntiers(texte: string, debut: number, fin: number): string {
    let d = debut;
    let f = fin;
    while (d > 0 && LETTRE.test(texte.charAt(d - 1))) d--;
    while (f < texte.length && LETTRE.test(texte.charAt(f))) f++;
    return texte.slice(d, f);
}

/** Copie mélangée d'un tableau (algorithme de Fisher-Yates) */
export function melanger<T>(tableau: readonly T[], aleatoire: () => number = Math.random): T[] {
    const copie = tableau.slice();
    for (let i = copie.length - 1; i > 0; i--) {
        const j = Math.floor(aleatoire() * (i + 1));
        [copie[i], copie[j]] = [copie[j] as T, copie[i] as T];
    }
    return copie;
}
