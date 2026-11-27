/**
 * Menu « Aussi sur Eidos-Simul » de l'en-tête (Eidos-Simul.fr, Skopéo), comme sur Eidos-Simul :
 * le bouton ouvre et ferme le panneau ; un clic en dehors, la touche Échap ou le focus qui
 * quitte le menu le referment. L'apparence découle de aria-expanded (voir global.css).
 */
export function initialiserMenuSites(menu: HTMLElement): void {
    const bouton = menu.querySelector<HTMLButtonElement>('[aria-controls]');
    if (!bouton) return;

    const estOuvert = (): boolean => bouton.getAttribute('aria-expanded') === 'true';
    const ouvrir = (ouvert: boolean): void => bouton.setAttribute('aria-expanded', String(ouvert));

    bouton.addEventListener('click', () => ouvrir(!estOuvert()));

    document.addEventListener('click', (evenement) => {
        if (estOuvert() && !menu.contains(evenement.target as Node)) ouvrir(false);
    });

    // Échap ferme le menu et rend le focus au bouton
    document.addEventListener('keydown', (evenement) => {
        if (evenement.key === 'Escape' && estOuvert()) {
            ouvrir(false);
            bouton.focus();
        }
    });

    // Le focus qui quitte le menu (touche Tab) le referme
    menu.addEventListener('focusout', (evenement) => {
        const suivant = evenement.relatedTarget as Node | null;
        if (suivant && !menu.contains(suivant)) ouvrir(false);
    });
}
