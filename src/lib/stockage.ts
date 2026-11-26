/**
 * Lecture et écriture dans le stockage local du navigateur.
 *
 * localStorage peut être indisponible (navigation privée, stockage bloqué, quota atteint) :
 * le site doit alors fonctionner normalement, simplement sans mémoire.
 */

export function lireStockage<T>(cle: string): T | null {
    try {
        const brut = localStorage.getItem(cle);
        return brut === null ? null : (JSON.parse(brut) as T);
    } catch {
        return null;
    }
}

export function ecrireStockage(cle: string, valeur: unknown): void {
    try {
        localStorage.setItem(cle, JSON.stringify(valeur));
    } catch {
        // stockage indisponible : la progression n'est simplement pas mémorisée
    }
}
