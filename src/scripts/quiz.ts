/**
 * Quiz des fiches : questions et propositions mélangées à chaque tentative, meilleur score
 * mémorisé dans le navigateur, bouton « Refaire mes erreurs ».
 * Les règles (scores, messages, mémorisation) sont dans src/lib/quiz.ts.
 */
import type { QuestionQuiz } from '../types/fiche';
import type { DonneesQuiz, ModeQuiz } from '../lib/quiz';
import { cleQuiz, dateLisible, enregistrerTentative, idQuestion, mesErreurs, texteScoreFinal } from '../lib/quiz';
import { ecrireStockage, lireStockage } from '../lib/stockage';
import { melanger } from '../lib/texte';

interface Reponse {
    question: QuestionQuiz;
    juste: boolean | null;
}

function element<T extends Element>(racine: ParentNode, selecteur: string): T {
    const trouve = racine.querySelector<T>(selecteur);
    if (!trouve) throw new Error(`Quiz : élément ${selecteur} introuvable`);
    return trouve;
}

/** Copie du premier élément d'un modèle <template data-modele="…"> */
function depuisModele(racine: ParentNode, nom: string): HTMLElement {
    const modele = element<HTMLTemplateElement>(racine, `template[data-modele="${nom}"]`);
    return modele.content.firstElementChild?.cloneNode(true) as HTMLElement;
}

export function initialiserQuiz(racine: HTMLElement): void {
    const fiche = racine.dataset['quiz'] ?? '';
    const questions = JSON.parse(element(racine, '[data-quiz-donnees]').textContent || '[]') as QuestionQuiz[];
    const conteneur = element<HTMLElement>(racine, '[data-quiz-questions]');
    const score = element<HTMLElement>(racine, '[data-quiz-score]');
    const bilan = element<HTMLElement>(racine, '[data-quiz-bilan]');
    const boutonErreurs = element<HTMLButtonElement>(racine, '[data-quiz-erreurs]');
    const boutonRecommencer = element<HTMLButtonElement>(racine, '[data-quiz-recommencer]');
    if (!questions.length) return;

    const cle = cleQuiz(fiche);
    const parId = new Map(questions.map((q) => [idQuestion(q), q]));
    const erreursMemorisees = (): string[] =>
        (lireStockage<DonneesQuiz>(cle)?.erreurs ?? []).filter((id) => parId.has(id));

    let serie: Reponse[] = [];
    let mode: ModeQuiz = 'complet';

    function afficherBilan(): void {
        const donnees = lireStockage<DonneesQuiz>(cle);
        bilan.replaceChildren();
        if (donnees?.meilleur == null) return;

        const carte = depuisModele(racine, 'bilan');
        element(carte, '[data-meilleur]').textContent = `${donnees.meilleur} / ${donnees.total}`;

        const date = element<HTMLElement>(carte, '[data-date]');
        if (donnees.date) element(date, '[data-valeur]').textContent = dateLisible(donnees.date);
        else date.remove();

        // « Revoir mes erreurs » tant que la nouvelle tentative complète n'a pas commencé
        const erreurs = erreursMemorisees();
        const revoir = element<HTMLButtonElement>(carte, '[data-revoir]');
        if (erreurs.length && mode === 'complet' && !conteneur.querySelector('.answered')) {
            revoir.textContent = `Revoir ${mesErreurs(erreurs.length)}`;
            revoir.addEventListener('click', () => demarrer('erreurs'));
        } else {
            revoir.remove();
        }
        bilan.append(carte);
    }

    function carteQuestion(question: QuestionQuiz, k: number): HTMLElement {
        const carte = depuisModele(racine, 'question');
        carte.dataset['k'] = String(k);
        const enonce = element<HTMLElement>(carte, '[data-enonce]');
        enonce.id = `question-${k + 1}`;
        carte.setAttribute('aria-labelledby', enonce.id);
        // Énoncés et propositions viennent du dépôt (quiz.json) : le HTML simple y est permis
        enonce.innerHTML = `${k + 1}. ${question.question}`;

        const propositions = element<HTMLElement>(carte, '[data-propositions]');
        for (const { texte, index } of melanger(question.options.map((texte, index) => ({ texte, index })))) {
            const bouton = depuisModele(racine, 'proposition');
            bouton.dataset['index'] = String(index);
            bouton.innerHTML = texte;
            propositions.append(bouton);
        }
        return carte;
    }

    function demarrer(nouveauMode: ModeQuiz): void {
        const source = nouveauMode === 'erreurs' ? erreursMemorisees().flatMap((id) => parId.get(id) ?? []) : questions;
        if (!source.length && nouveauMode === 'erreurs') {
            demarrer('complet');
            return;
        }
        mode = nouveauMode;
        serie = melanger(source).map((question) => ({ question, juste: null }));
        conteneur.replaceChildren(...serie.map(({ question }, k) => carteQuestion(question, k)));

        boutonErreurs.hidden = true;
        boutonRecommencer.classList.add('invisible');
        score.textContent =
            mode === 'erreurs' ? `Révision de vos erreurs : 0 / ${serie.length}` : `Prêt ? 0 / ${serie.length}`;
        afficherBilan();
    }

    function terminer(bonnes: number): void {
        const total = serie.length;
        const erreurs = serie.filter((r) => !r.juste).map((r) => idQuestion(r.question));
        const donnees = enregistrerTentative(lireStockage<DonneesQuiz>(cle), {
            mode,
            bonnes,
            total,
            erreurs,
            date: new Date(),
        });
        ecrireStockage(cle, donnees);

        score.textContent = texteScoreFinal(mode, bonnes, total, erreurs.length);
        if (erreurs.length) {
            boutonErreurs.textContent = `Refaire ${mesErreurs(erreurs.length)}`;
            boutonErreurs.hidden = false;
        }
        boutonRecommencer.classList.remove('invisible');
        afficherBilan();
    }

    function mettreAJourScore(): void {
        const repondues = serie.filter((r) => r.juste !== null);
        const bonnes = repondues.filter((r) => r.juste).length;
        if (repondues.length < serie.length) {
            score.textContent = `${mode === 'erreurs' ? 'Révision de vos erreurs' : 'Votre score'} : ${bonnes} / ${repondues.length}`;
            if (repondues.length === 1) afficherBilan();
            return;
        }
        terminer(bonnes);
    }

    conteneur.addEventListener('click', (evenement) => {
        const option = (evenement.target as Element).closest<HTMLButtonElement>('.qcm-option');
        const carte = option?.closest<HTMLElement>('.qcm-question');
        if (!option || !carte || carte.classList.contains('answered')) return;
        carte.classList.add('answered');

        const reponse = serie[Number(carte.dataset['k'])];
        if (!reponse) return;
        const { question } = reponse;
        reponse.juste = Number(option.dataset['index']) === question.correct;

        const retour = depuisModele(racine, reponse.juste ? 'juste' : 'faux');
        element(retour, '[data-explication]').insertAdjacentHTML('beforeend', ` ${question.feedback ?? ''}`);
        if (reponse.juste) {
            option.classList.add('correct');
        } else {
            option.classList.add('incorrect');
            carte.querySelector(`[data-index="${question.correct}"]`)?.classList.add('correct');
        }
        element(carte, '[data-retour]').replaceChildren(retour);
        for (const bouton of carte.querySelectorAll<HTMLButtonElement>('.qcm-option')) bouton.disabled = true;
        mettreAJourScore();
    });

    boutonErreurs.addEventListener('click', () => demarrer('erreurs'));
    boutonRecommencer.addEventListener('click', () => demarrer('complet'));

    demarrer('complet');
}
