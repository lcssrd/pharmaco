/**
 * Recherche de l'accueil : l'index n'est téléchargé qu'au premier usage du champ.
 * Les résultats sont construits avec textContent (jamais innerHTML) : aucun risque d'injection.
 */
import type { EntreeIndex, EntreePreparee } from '../lib/recherche';
import { extrait, lienResultat, motsRecherche, preparerIndex, rechercher, trouverPassage } from '../lib/recherche';

const MAX_RESULTATS = 12;
const DELAI_SAISIE_MS = 120;

function creer<K extends keyof HTMLElementTagNameMap>(
    balise: K,
    classes: string,
    texte?: string,
): HTMLElementTagNameMap[K] {
    const el = document.createElement(balise);
    el.className = classes;
    if (texte !== undefined) el.textContent = texte;
    return el;
}

function carteResultat(entree: EntreePreparee, premierMot: string): HTMLLIElement {
    const passage = trouverPassage(entree, premierMot);
    const lien = creer(
        'a',
        'resultat-recherche block px-5 py-3 rounded-3xl border-2 border-white bg-white shadow-pastille hover:border-pharma hover:-translate-y-0.5 transition',
    );
    lien.href = lienResultat(entree, passage);

    const titre = creer('span', 'block text-sm font-bold text-encre');
    titre.append(`${entree.n} `, creer('span', 'text-indice', '›'), ` ${entree.l}`);
    lien.append(titre);

    if (passage) {
        const { coupeAvant, avant, trouve, apres, coupeApres } = extrait(entree.x, passage);
        const texte = creer('span', 'block text-xs text-slate-600 mt-1 leading-relaxed');
        texte.append(
            `${coupeAvant ? '… ' : ''}${avant}`,
            creer('mark', '', trouve),
            `${apres}${coupeApres ? ' …' : ''}`,
        );
        lien.append(texte);
    }

    const item = document.createElement('li');
    item.append(lien);
    return item;
}

export function initialiserRecherche(zone: HTMLElement): void {
    const champ = zone.querySelector<HTMLInputElement>('input[type="search"]');
    const resultats = zone.querySelector<HTMLElement>('#resultats-recherche');
    const statut = zone.querySelector<HTMLElement>('[data-recherche-statut]');
    const urlIndex = zone.dataset['recherche'];
    if (!champ || !resultats || !statut || !urlIndex) return;

    let index: EntreePreparee[] | null = null;
    let chargement: Promise<void> | null = null;

    const chargerIndex = (): Promise<void> =>
        (chargement ??= fetch(urlIndex)
            .then((reponse) => {
                if (!reponse.ok) throw new Error(`Index de recherche : erreur ${reponse.status}`);
                return reponse.json() as Promise<EntreeIndex[]>;
            })
            .then((entrees) => {
                index = preparerIndex(entrees);
            })
            .catch(() => {
                // nouvel essai à la prochaine saisie
                chargement = null;
            }));

    const afficher = (...elements: HTMLElement[]): void => {
        resultats.hidden = false;
        resultats.replaceChildren(...elements);
    };

    // Fonction fléchée : TypeScript sait alors que les éléments vérifiés plus haut existent
    const lancer = (): void => {
        const requete = champ.value.trim();
        const mots = motsRecherche(requete);
        if (!mots.length) {
            resultats.hidden = true;
            resultats.replaceChildren();
            statut.textContent = '';
            return;
        }
        if (!index) {
            afficher(creer('p', 'text-sm text-attenue px-5', 'Chargement…'));
            void chargerIndex().then(() => {
                if (index) lancer();
            });
            return;
        }

        const trouves = rechercher(index, mots);
        if (!trouves.length) {
            const message = `Aucun résultat pour « ${requete} ».`;
            afficher(creer('p', 'text-sm text-attenue px-5', message));
            statut.textContent = message;
            return;
        }

        const affiches = trouves.slice(0, MAX_RESULTATS);
        const pluriel = trouves.length > 1 ? 's' : '';
        const resume = `${trouves.length} résultat${pluriel}${trouves.length > affiches.length ? ` (les ${affiches.length} plus pertinents)` : ''}`;
        const liste = creer('ul', 'grid gap-3');
        liste.append(...affiches.map(({ entree }) => carteResultat(entree, mots[0] ?? '')));
        afficher(creer('p', 'text-xs text-attenue px-5 mb-2', resume), liste);
        statut.textContent = resume;
    };

    let minuterie: ReturnType<typeof setTimeout> | undefined;
    champ.addEventListener('focus', () => void chargerIndex(), { once: true });
    champ.addEventListener('input', () => {
        clearTimeout(minuterie);
        minuterie = setTimeout(lancer, DELAI_SAISIE_MS);
    });
    champ.addEventListener('keydown', (evenement) => {
        if (evenement.key === 'Enter') {
            const premier = resultats.querySelector('a');
            if (premier) location.href = premier.href;
        } else if (evenement.key === 'Escape') {
            champ.value = '';
            lancer();
        }
    });
    // Texte déjà présent (retour arrière du navigateur)
    if (champ.value) lancer();
}
