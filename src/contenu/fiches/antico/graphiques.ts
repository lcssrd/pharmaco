import type { Graphiques } from '../../../types/graphiques';

const options = {
    scales: {
        r: { suggestedMin: 0, suggestedMax: 5, ticks: { stepSize: 1 }, pointLabels: { font: { size: 10 } } },
    },
    plugins: { legend: { position: 'top' } },
} as const;

const heparines = {
    type: 'radar',
    data: {
        labels: [
            ['Usage ambulatoire', 'facile'],
            ['Action', 'rapide'],
            ['Demi-vie', 'courte'],
            ['Surveillance', 'stricte'],
            ['Réversibilité', 'complète'],
        ],
        datasets: [
            {
                label: 'HNF',
                data: [2, 5, 5, 5, 5],
                fill: true,
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderColor: 'rgb(59, 130, 246)',
                pointBackgroundColor: 'rgb(59, 130, 246)',
                pointBorderColor: '#fff',
            },
            {
                label: 'HBPM',
                data: [5, 4, 2, 1, 3],
                fill: true,
                backgroundColor: 'rgba(30, 58, 138, 0.2)',
                borderColor: 'rgb(30, 58, 138)',
                pointBackgroundColor: 'rgb(30, 58, 138)',
                pointBorderColor: '#fff',
            },
        ],
    },
    options,
} satisfies Graphiques[string];

const anticoagulantsOraux = {
    type: 'radar',
    data: {
        labels: [
            ["Délai d'action"],
            ['Surveillance', 'biologique'],
            ['Interactions', 'alimentaires'],
            ['Durée du', 'relai'],
        ],
        datasets: [
            {
                label: 'AVK',
                data: [1, 1, 1, 1],
                fill: true,
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                borderColor: 'rgb(239, 68, 68)',
                pointBackgroundColor: 'rgb(239, 68, 68)',
                pointBorderColor: '#fff',
            },
            {
                label: 'AOD',
                data: [5, 5, 4, 5],
                fill: true,
                backgroundColor: 'rgba(251, 191, 36, 0.2)',
                borderColor: 'rgb(251, 191, 36)',
                pointBackgroundColor: 'rgb(251, 191, 36)',
                pointBorderColor: '#fff',
            },
        ],
    },
    options,
} satisfies Graphiques[string];

/** Graphiques de la fiche, par identifiant du <canvas> dans les onglets */
export default {
    heparineChartHNF: heparines,
    heparineChartHBPM: heparines,
    oralAnticoagChartAOD: anticoagulantsOraux,
    oralAnticoagChartAVK: anticoagulantsOraux,
} satisfies Graphiques;
