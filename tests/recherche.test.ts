import { describe, expect, it } from 'vitest';
import { extrait, lienResultat, motsRecherche, preparerIndex, rechercher, trouverPassage } from '../src/lib/recherche';

const index = preparerIndex([
    {
        f: 'antico',
        n: 'Antithrombotiques',
        o: 'avk',
        l: 'AVK',
        x: "Surveillance par l'INR. L'INR cible est entre 2 et 3.",
    },
    { f: 'antico', n: 'Antithrombotiques', o: 'hbpm', l: 'HBPM', x: 'Le Lovenox® est une HBPM.' },
    { f: 'antalgiques', n: 'Antalgiques', o: 'douleur', l: 'La Douleur', x: 'Évaluer la douleur avant la morphine.' },
]);

describe('motsRecherche', () => {
    it('ignore les mots de moins de deux lettres et normalise', () => {
        expect(motsRecherche('  Évaluer a la  ')).toEqual(['evaluer', 'la']);
    });
});

describe('rechercher', () => {
    it('exige tous les mots', () => {
        expect(rechercher(index, ['inr', 'lovenox'])).toHaveLength(0);
    });

    it('classe par nombre d’occurrences, le nom de l’onglet comptant davantage', () => {
        const resultats = rechercher(index, ['hbpm']);
        expect(resultats.map((r) => r.entree.o)).toEqual(['hbpm']);
        expect(resultats[0]?.points).toBe(21);
        expect(rechercher(index, ['inr'])[0]?.points).toBe(2);
    });

    it('trouve les mots sans tenir compte des accents', () => {
        expect(rechercher(index, ['evaluer']).map((r) => r.entree.o)).toEqual(['douleur']);
    });
});

describe('passage, extrait et lien', () => {
    const entree = index[2]!;

    it('situe le passage dans le texte d’origine (accents compris)', () => {
        const passage = trouverPassage(entree, 'evaluer');
        expect(passage).toEqual({ debut: 0, fin: 7 });
        expect(extrait(entree.x, passage!)).toEqual({
            coupeAvant: false,
            avant: '',
            trouve: 'Évaluer',
            apres: ' la douleur avant la morphine.',
            coupeApres: false,
        });
    });

    it('fait surligner le mot entier par le navigateur', () => {
        const passage = trouverPassage(entree, 'morph');
        expect(lienResultat(entree, passage)).toBe('antalgiques.html#douleur:~:text=morphine');
        expect(lienResultat(entree, null)).toBe('antalgiques.html#douleur');
    });

    it('coupe les longs textes aux espaces', () => {
        const long = `${'mot '.repeat(40)}cible${' suite'.repeat(40)}`;
        const resultat = extrait(long, { debut: 160, fin: 165 });
        expect(resultat.trouve).toBe('cible');
        expect(resultat.coupeAvant).toBe(true);
        expect(resultat.coupeApres).toBe(true);
    });
});
