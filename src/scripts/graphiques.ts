/**
 * Graphiques des fiches (Chart.js).
 * La bibliothèque n'est téléchargée que sur les pages qui ont des graphiques, après l'affichage.
 */
import type { Graphiques } from '../types/graphiques';

export async function initialiserGraphiques(donnees: HTMLElement): Promise<void> {
    const graphiques = JSON.parse(donnees.textContent || '{}') as Graphiques;
    const canevas = Object.entries(graphiques).flatMap(([id, configuration]) => {
        const element = document.getElementById(id);
        return element instanceof HTMLCanvasElement ? [{ element, configuration }] : [];
    });
    if (!canevas.length) return;

    const { Chart, registerables } = await import('chart.js');
    Chart.register(...registerables);
    for (const { element, configuration } of canevas) {
        new Chart(element, configuration);
    }
}
