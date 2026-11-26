import type { Fiche } from '../../../types/fiche';

const fiche: Fiche = {
    titre: 'Les Antihypertenseurs (Cours IFSI)',
    seo: {
        titre: 'Les Antihypertenseurs : Cours Pharmacologie IFSI - UE 2.11 S3',
        description:
            "Fiche de révision IFSI sur les antihypertenseurs : Physiopathologie de l'HTA, IEC, ARA II, Bêtabloquants, Inhibiteurs calciques, Diurétiques et surveillance infirmière.",
        ogTitre: 'Les Antihypertenseurs - Révision Pharmacologie IFSI',
        ogDescription: "Tout comprendre sur le traitement de l'HTA : SRAA, médicaments et rôle IDE. Fiche UE 2.11 S3.",
    },
    miseAJour: '2026-11-25',
    carte: {
        titre: 'Antihypertenseurs',
        sousTitre: 'IEC, ARA II, Bêtabloquants',
        semestre: 'S3',
        couleur: 'emerald',
        icone: 'M71.76,148H31.7a12,12,0,1,1,0-24H65.33l12.45-18.66a12,12,0,0,1,20,0l22,33,6-9a12,12,0,0,1,10-5.34h24a12,12,0,1,1,0,24h-17.6l-12.46,18.66a12,12,0,0,1-20,0l-22-33-6,9A12,12,0,0,1,71.76,148ZM177.91,36c-20.12,0-38,7.93-50.07,21.56C115.74,43.93,97.89,36,77.76,36A66,66,0,0,0,12.07,94.68,12,12,0,0,0,36,97.32,42,42,0,0,1,77.76,60c17.83,0,32.75,9.4,38.95,24.54a12,12,0,0,0,22.25,0C145.16,69.4,160.08,60,177.91,60A42.08,42.08,0,0,1,220,102c0,29.42-25.86,57.77-47.56,76.36a329,329,0,0,1-44.58,31.81c-10.87-6.45-35.37-22-56.51-42.73a12,12,0,1,0-16.84,17.12c30.39,29.81,66.15,49.2,67.66,50a12.06,12.06,0,0,0,11.39,0C138,232.14,244,174.34,244,102A66.12,66.12,0,0,0,177.91,36Z',
    },
    apparence: {
        titre: 'from-emerald-400 to-green-600',
        auteurEntete: 'from-emerald-400 to-green-600',
        auteurPied: 'from-sky-400 via-violet-500 to-pink-500',
        grilleOnglets: 'grid-cols-4 sm:grid-cols-4 md:grid-cols-7',
        enteteCollant: 'z-50',
        pleineHauteur: true,
        ombrePied: false,
    },
    onglets: [
        {
            id: 'physioHTA',
            libelle: 'Physio. HTA',
            actif: 'from-green-500 to-emerald-600',
        },
        {
            id: 'iec',
            libelle: 'IEC',
            actif: 'from-orange-500 to-red-500',
        },
        {
            id: 'ara2',
            libelle: 'ARA II',
            actif: 'from-red-500 to-rose-500',
        },
        {
            id: 'calciques',
            libelle: 'Inhib. Calciques',
            actif: 'from-amber-500 to-orange-500',
        },
        {
            id: 'beta',
            libelle: 'Bêtabloquants',
            actif: 'from-sky-500 to-cyan-500',
        },
        {
            id: 'diuretiques',
            libelle: 'Diurétiques',
            actif: 'from-indigo-500 to-purple-600',
        },
        {
            id: 'quiz',
            libelle: 'Quiz',
            actif: 'from-slate-500 to-gray-700',
        },
    ],
    quiz: {
        intro: 'Testez vos connaissances sur les antihypertenseurs.',
        centre: false,
        bouton: 'from-indigo-500 via-purple-500 to-pink-500',
    },
};

export default fiche;
