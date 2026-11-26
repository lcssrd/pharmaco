/**
 * Onglets des fiches.
 *
 *  - l'onglet affiché est inscrit dans l'adresse (antico.html#avk) : lien partageable,
 *    et le bouton « Retour » du navigateur revient à l'onglet précédent ;
 *  - clavier : flèches gauche/droite, Début et Fin passent d'un onglet à l'autre.
 *
 * L'apparence des boutons découle de aria-selected (voir ListeOnglets.astro).
 */

type Historique = 'ajouter' | 'remplacer' | 'aucun';

/** Onglet demandé dans l'adresse (#avk), sans l'éventuel surlignage de texte (#avk:~:text=…) */
function ongletDepuisAdresse(): string {
    const brut = location.hash.slice(1).split(':~:')[0] ?? '';
    try {
        return decodeURIComponent(brut);
    } catch {
        return brut;
    }
}

export function initialiserOnglets(liste: HTMLElement): void {
    const boutons = [...liste.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
    const ids = boutons.map((bouton) => bouton.getAttribute('aria-controls') ?? '');
    if (!boutons.length) return;

    let actif: string | null = null;

    function afficher(
        demande: string,
        { historique = 'ajouter', defiler = true }: { historique?: Historique; defiler?: boolean } = {},
    ): void {
        const id = ids.includes(demande) ? demande : (ids[0] ?? '');
        if (id === actif) return;
        actif = id;

        for (const [i, bouton] of boutons.entries()) {
            const selectionne = ids[i] === id;
            bouton.setAttribute('aria-selected', String(selectionne));
            bouton.tabIndex = selectionne ? 0 : -1;
            const panneau = document.getElementById(ids[i] ?? '');
            if (panneau) panneau.hidden = !selectionne;
        }

        const adresse = `#${encodeURIComponent(id)}`;
        if (historique === 'ajouter') history.pushState(null, '', adresse);
        else if (historique === 'remplacer') history.replaceState(null, '', adresse);

        if (defiler) window.scrollTo({ top: 0 });
    }

    for (const [i, bouton] of boutons.entries()) {
        bouton.addEventListener('click', () => afficher(ids[i] ?? ''));
    }

    liste.addEventListener('keydown', (evenement) => {
        const index = boutons.indexOf(document.activeElement as HTMLButtonElement);
        if (index < 0) return;
        const cibles: Record<string, number> = {
            ArrowRight: index + 1,
            ArrowLeft: index - 1,
            Home: 0,
            End: boutons.length - 1,
        };
        const cible = cibles[evenement.key];
        if (cible === undefined) return;
        evenement.preventDefault();
        const n = boutons.length;
        const suivant = boutons[(cible + n) % n];
        if (!suivant) return;
        suivant.focus();
        afficher(ids[boutons.indexOf(suivant)] ?? '');
    });

    // Bouton « Retour », lien direct vers un onglet. Les autres ancres (comme #contenu,
    // le lien « Aller au contenu ») ne changent pas d'onglet.
    const suivreAdresse = (): void => {
        const id = ongletDepuisAdresse();
        if (!id || ids.includes(id)) afficher(id, { historique: 'aucun' });
    };
    window.addEventListener('popstate', suivreAdresse);
    window.addEventListener('hashchange', suivreAdresse);

    const initial = ongletDepuisAdresse();
    afficher(initial, { historique: ids.includes(initial) || !initial ? 'aucun' : 'remplacer', defiler: false });

    // Avec antico.html#avk, le navigateur fait défiler jusqu'à la section, qui se retrouve
    // sous l'en-tête : on revient en haut de page. (Un passage surligné depuis la recherche
    // n'est pas concerné : la section n'est alors pas collée en haut de l'écran.)
    window.addEventListener('load', () =>
        requestAnimationFrame(() => {
            const haut = actif ? document.getElementById(actif)?.getBoundingClientRect().top : undefined;
            if (haut !== undefined && Math.abs(haut) < 2) window.scrollTo({ top: 0, behavior: 'instant' });
        }),
    );
}
