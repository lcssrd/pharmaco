/**
 * Règles du quiz, sans dépendance au navigateur (testées dans tests/).
 *
 * Compatibilité : la clé de stockage et l'identifiant des questions sont ceux de la première
 * version du site, pour que les étudiants retrouvent leurs scores et leurs erreurs.
 */
import type { QuestionQuiz } from '../types/fiche';

/** Ce que le navigateur mémorise pour le quiz d'une fiche */
export interface DonneesQuiz {
    /** Meilleur score obtenu sur le quiz complet */
    meilleur?: number;
    /** Nombre de questions du quiz lors de ce meilleur score */
    total?: number;
    /** Score de la dernière tentative complète */
    dernier?: number;
    /** Date de la dernière tentative (ISO 8601) */
    date?: string;
    /** Identifiants des questions manquées lors de la dernière tentative */
    erreurs?: string[];
}

export type ModeQuiz = 'complet' | 'erreurs';

export const cleQuiz = (fiche: string): string => `pharmaco:quiz:${fiche}`;

/**
 * Identifiant stable d'une question, indépendant de sa position dans la liste.
 * Le calcul (parcours par caractère Unicode, premier code de chacun) doit rester identique :
 * les erreurs déjà mémorisées par les navigateurs y font référence.
 */
export function idQuestion(question: Pick<QuestionQuiz, 'question'>): string {
    let h = 0;
    for (const caractere of question.question) {
        h = (Math.imul(31, h) + caractere.charCodeAt(0)) | 0;
    }
    return (h >>> 0).toString(36);
}

export const mesErreurs = (n: number): string => (n > 1 ? `mes ${n} erreurs` : 'mon erreur');

/** Message d'encouragement selon le pourcentage de bonnes réponses */
export function messageFinal(pourcentage: number): string {
    if (pourcentage >= 80) return 'Excellent travail ! 🎉';
    if (pourcentage >= 50) return 'Pas mal, continuez à réviser ! 💪';
    return 'Encore un effort ! 📚';
}

export type NiveauScore = 'bon' | 'moyen' | 'faible';

export function niveauScore(pourcentage: number): NiveauScore {
    if (pourcentage >= 80) return 'bon';
    if (pourcentage >= 50) return 'moyen';
    return 'faible';
}

export interface Tentative {
    mode: ModeQuiz;
    bonnes: number;
    total: number;
    /** Identifiants des questions manquées */
    erreurs: string[];
    date: Date;
}

/**
 * Données à mémoriser après une tentative. Le meilleur score n'est conservé que s'il porte
 * sur le même nombre de questions (le quiz a pu être modifié entre-temps) ; une révision
 * des erreurs ne change pas les scores, seulement la liste des erreurs restantes.
 */
export function enregistrerTentative(precedentes: DonneesQuiz | null, tentative: Tentative): DonneesQuiz {
    const donnees: DonneesQuiz = { ...precedentes };
    if (tentative.mode === 'complet') {
        const meilleurPrecedent = donnees.total === tentative.total ? (donnees.meilleur ?? 0) : 0;
        donnees.meilleur = Math.max(meilleurPrecedent, tentative.bonnes);
        donnees.total = tentative.total;
        donnees.dernier = tentative.bonnes;
    }
    donnees.date = tentative.date.toISOString();
    donnees.erreurs = tentative.erreurs;
    return donnees;
}

/** Texte du score affiché en fin de quiz */
export function texteScoreFinal(mode: ModeQuiz, bonnes: number, total: number, nbErreurs: number): string {
    const message = messageFinal((bonnes / total) * 100);
    if (mode === 'erreurs') {
        return `Erreurs corrigées : ${bonnes} / ${total} - ${nbErreurs ? message : 'Tout est acquis ! 🎉'}`;
    }
    return `Score final : ${bonnes} / ${total} - ${message}`;
}

export const dateLisible = (iso: string): string =>
    new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
