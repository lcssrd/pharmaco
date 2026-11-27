/** Informations générales du site */
export const SITE = {
    nom: 'Les essentiels en pharmacologie',
    auteur: 'Lucas Séraudie',
    annee: 2026,
    version: 'V6',
    couleurTheme: '#ffffff',
    licence: {
        nom: 'CC BY-SA 4.0',
        url: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
} as const;

/** Mesure d'audience Umami (sans cookie, sans donnée personnelle) */
export const MESURE_AUDIENCE = {
    script: 'https://cloud.umami.is/script.js',
    idSite: 'a71ff4d4-4d84-4066-aa50-313ab8d66b1b',
    domaines: 'pharma.eidos-simul.fr,lcssrd.github.io',
} as const;
