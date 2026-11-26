import type { ChartConfiguration } from 'chart.js';

/**
 * Graphiques d'une fiche, par identifiant du <canvas> placé dans le contenu d'un onglet.
 * La configuration ne contient que des données (pas de fonctions) : elle est transmise
 * à la page au format JSON, et Chart.js n'est téléchargé que sur les fiches qui en ont.
 */
export type Graphiques = Record<string, ChartConfiguration<'radar'>>;
