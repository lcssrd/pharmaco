import { describe, expect, it } from 'vitest';
import { melanger, motsEntiers, normaliser, normaliserAvecPositions } from '../src/lib/texte';

describe('normaliser', () => {
    it('met en minuscules et retire les accents', () => {
        expect(normaliser('Héparine Bêtabloquant')).toBe('heparine betabloquant');
    });

    it('décompose les ligatures et uniformise apostrophes et espaces', () => {
        expect(normaliser('Cœur d’Æsop x y')).toBe("coeur d'aesop x y");
    });
});

describe('normaliserAvecPositions', () => {
    it("relie chaque caractère normalisé à sa position d'origine", () => {
        const { n, positions } = normaliserAvecPositions('Œil');
        expect(n).toBe('oeil');
        // « o » et « e » viennent tous deux de « Œ » (position 0)
        expect(positions).toEqual([0, 0, 1, 2, 3]);
    });
});

describe('motsEntiers', () => {
    it("étend l'intervalle au mot entier", () => {
        const texte = 'Les antivitamines K agissent';
        expect(motsEntiers(texte, 8, 12)).toBe('antivitamines');
    });
});

describe('melanger', () => {
    it('renvoie une permutation sans modifier le tableau', () => {
        const source = [1, 2, 3, 4, 5];
        const resultat = melanger(source);
        expect(source).toEqual([1, 2, 3, 4, 5]);
        expect([...resultat].sort()).toEqual(source);
    });

    it('est reproductible avec un générateur donné', () => {
        const generateur = () => 0;
        expect(melanger(['a', 'b', 'c'], generateur)).toEqual(['b', 'c', 'a']);
    });
});
