import type { Graphiques } from '../../../types/graphiques';

/** Graphiques de la fiche, par identifiant du <canvas> dans les onglets */
export default {
    aarChart: {
        type: 'radar',
        data: {
            labels: [
                'Ralentissement FC',
                'Effet Inotrope',
                'Ralentissement Conduction AV',
                'Risque Pro-arythmogène',
                'Effets Extra-Cardiaques',
            ],
            datasets: [
                {
                    label: 'Stab. Membrane',
                    data: [3, 2, 5, 5, 1],
                    borderColor: 'rgb(244, 63, 94)',
                    backgroundColor: 'rgba(244, 63, 94, 0.2)',
                },
                {
                    label: 'Bêta-bloquants',
                    data: [5, 2, 4, 2, 4],
                    borderColor: 'rgb(139, 92, 246)',
                    backgroundColor: 'rgba(139, 92, 246, 0.2)',
                },
                {
                    label: 'Inhib. Potassiques',
                    data: [4, 1, 3, 4, 5],
                    borderColor: 'rgb(239, 68, 68)',
                    backgroundColor: 'rgba(239, 68, 68, 0.2)',
                },
                {
                    label: 'Inhib. Calciques',
                    data: [4, 2, 5, 2, 3],
                    borderColor: 'rgb(34, 197, 94)',
                    backgroundColor: 'rgba(34, 197, 94, 0.2)',
                },
                {
                    label: 'Digitaliques',
                    data: [5, 5, 4, 3, 4],
                    borderColor: 'rgb(245, 158, 11)',
                    backgroundColor: 'rgba(245, 158, 11, 0.2)',
                },
            ],
        },
        options: {
            scales: {
                r: { suggestedMin: 0, suggestedMax: 5, ticks: { stepSize: 1 }, pointLabels: { font: { size: 11 } } },
            },
            plugins: { legend: { position: 'top' } },
        },
    },
} satisfies Graphiques;
