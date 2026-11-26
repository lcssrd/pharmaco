import { describe, expect, it } from 'vitest';
import {
    cleQuiz,
    enregistrerTentative,
    idQuestion,
    mesErreurs,
    messageFinal,
    niveauScore,
    texteScoreFinal,
} from '../src/lib/quiz';

/** Calcul de la première version du site (assets/js/site.js), recopié tel quel pour comparaison */
function idQuestionV1(question: { question: string }): string {
    let h = 0;
    for (const c of question.question) h = (Math.imul(31, h) + c.charCodeAt(0)) | 0;
    return (h >>> 0).toString(36);
}

describe('compatibilité avec la première version', () => {
    it.each(["Quel est l'antidote du paracétamol en cas de surdosage ?", 'Question avec émoji 💊 et accents éèà', ''])(
        'identifiant identique pour « %s »',
        (texte) => {
            expect(idQuestion({ question: texte })).toBe(idQuestionV1({ question: texte }));
        },
    );

    it('même clé de stockage', () => {
        expect(cleQuiz('antico')).toBe('pharmaco:quiz:antico');
    });
});

describe('enregistrerTentative', () => {
    const date = new Date('2026-11-25T10:00:00Z');

    it('mémorise le premier score', () => {
        expect(
            enregistrerTentative(null, { mode: 'complet', bonnes: 7, total: 10, erreurs: ['a', 'b', 'c'], date }),
        ).toEqual({
            meilleur: 7,
            total: 10,
            dernier: 7,
            date: '2026-11-25T10:00:00.000Z',
            erreurs: ['a', 'b', 'c'],
        });
    });

    it('garde le meilleur score', () => {
        const precedent = { meilleur: 9, total: 10, dernier: 9 };
        const nouveau = enregistrerTentative(precedent, { mode: 'complet', bonnes: 5, total: 10, erreurs: [], date });
        expect(nouveau.meilleur).toBe(9);
        expect(nouveau.dernier).toBe(5);
    });

    it('repart de zéro si le nombre de questions a changé', () => {
        const precedent = { meilleur: 9, total: 10 };
        expect(
            enregistrerTentative(precedent, { mode: 'complet', bonnes: 5, total: 12, erreurs: [], date }).meilleur,
        ).toBe(5);
    });

    it('une révision des erreurs ne touche pas aux scores', () => {
        const precedent = { meilleur: 6, total: 10, dernier: 6, erreurs: ['a', 'b'] };
        const nouveau = enregistrerTentative(precedent, { mode: 'erreurs', bonnes: 2, total: 2, erreurs: [], date });
        expect(nouveau).toMatchObject({ meilleur: 6, total: 10, dernier: 6, erreurs: [] });
    });
});

describe('messages', () => {
    it('accorde « erreur »', () => {
        expect(mesErreurs(1)).toBe('mon erreur');
        expect(mesErreurs(3)).toBe('mes 3 erreurs');
    });

    it('encourage selon le score', () => {
        expect(messageFinal(80)).toBe('Excellent travail ! 🎉');
        expect(messageFinal(50)).toBe('Pas mal, continuez à réviser ! 💪');
        expect(messageFinal(49)).toBe('Encore un effort ! 📚');
        expect(niveauScore(85)).toBe('bon');
        expect(niveauScore(60)).toBe('moyen');
        expect(niveauScore(10)).toBe('faible');
    });

    it('affiche le score final', () => {
        expect(texteScoreFinal('complet', 8, 10, 2)).toBe('Score final : 8 / 10 - Excellent travail ! 🎉');
        expect(texteScoreFinal('erreurs', 2, 2, 0)).toBe('Erreurs corrigées : 2 / 2 - Tout est acquis ! 🎉');
    });
});
