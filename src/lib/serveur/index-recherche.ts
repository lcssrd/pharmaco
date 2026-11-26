import { parse } from 'node-html-parser';
import type { EntreeIndex } from '../recherche';
import type { FicheChargee } from './fiches';
import { ONGLET_QUIZ } from './fiches';

const espaces = (texte: string): string => texte.replace(/\s+/g, ' ').trim();

/** Texte lisible d'un fragment HTML, sans les éléments qui n'en contiennent pas */
export function texteDuContenu(html: string): string {
    const racine = parse(html);
    for (const element of racine.querySelectorAll('script, style, iframe, canvas')) element.remove();
    return espaces(racine.structuredText);
}

/**
 * Une entrée par onglet de contenu. Les fiches sont parcourues par ordre alphabétique
 * de leur fichier : à pertinence égale, les résultats gardent l'ordre de la première version.
 */
export function construireIndexRecherche(fiches: readonly FicheChargee[]): EntreeIndex[] {
    const parFichier = [...fiches].sort((a, b) => (`${a.slug}.html` < `${b.slug}.html` ? -1 : 1));
    return parFichier.flatMap((fiche) =>
        fiche.onglets
            .filter((onglet) => onglet.id !== ONGLET_QUIZ)
            .map((onglet) => ({
                f: fiche.slug,
                n: fiche.carte.titre,
                o: onglet.id,
                l: onglet.libelle,
                x: texteDuContenu(fiche.sources[onglet.id] ?? ''),
            })),
    );
}
