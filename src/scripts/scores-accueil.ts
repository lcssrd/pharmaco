/** Accueil : pastille du meilleur score au quiz sur la carte de chaque fiche */
import type { DonneesQuiz, NiveauScore } from '../lib/quiz';
import { cleQuiz, niveauScore } from '../lib/quiz';
import { lireStockage } from '../lib/stockage';

const COULEURS: Readonly<Record<NiveauScore, string>> = {
    bon: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    moyen: 'bg-amber-100 text-amber-800 border-amber-300',
    faible: 'bg-rose-100 text-rose-800 border-rose-300',
};

export function afficherScoresAccueil(): void {
    for (const carte of document.querySelectorAll<HTMLElement>('[data-fiche]')) {
        const donnees = lireStockage<DonneesQuiz>(cleQuiz(carte.dataset['fiche'] ?? ''));
        if (donnees?.meilleur == null || !donnees.total) continue;

        const pastille = document.createElement('p');
        pastille.className = `inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full border text-[11px] font-semibold ${COULEURS[niveauScore((donnees.meilleur / donnees.total) * 100)]}`;
        pastille.textContent = `Quiz : ${donnees.meilleur} / ${donnees.total}`;
        pastille.title = 'Votre meilleur score au quiz de cette fiche';
        carte.querySelector('[data-carte-texte]')?.append(pastille);
    }
}
