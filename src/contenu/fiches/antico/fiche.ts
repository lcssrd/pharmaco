import type { Fiche } from '../../../types/fiche';

const fiche: Fiche = {
    titre: 'Les Antithrombotiques (Cours IFSI)',
    seo: {
        titre: 'Les Antithrombotiques : Cours Pharmacologie IFSI - UE 2.11 S1',
        description:
            'Fiche de révision complète sur les antithrombotiques pour étudiants infirmiers (IFSI). Hémostase, Héparines (HNF/HBPM), AVK, AOD, surveillance biologique (INR, TCA) et rôle infirmier.',
        ogTitre: 'Les Antithrombotiques - Révision Pharmacologie IFSI',
        ogDescription:
            "Tout comprendre sur l'hémostase et les traitements antithrombotiques. Fiche de révision UE 2.11.",
    },
    miseAJour: '2026-11-25',
    carte: {
        titre: 'Antithrombotiques',
        sousTitre: 'Anticoagulants, Antiagrégants Plaquetaires',
        semestre: 'S1',
        couleur: 'red',
        icone: 'M134.88,6.17a12,12,0,0,0-13.76,0,259,259,0,0,0-42.18,39C50.85,77.43,36,111.62,36,144a92,92,0,0,0,184,0C220,66.64,138.36,8.6,134.88,6.17ZM128,212a68.07,68.07,0,0,1-68-68c0-33.31,20-63.37,36.7-82.71A249.35,249.35,0,0,1,128,31.11a249.35,249.35,0,0,1,31.3,30.18C176,80.63,196,110.69,196,144A68.07,68.07,0,0,1,128,212Zm49.62-52.4a52,52,0,0,1-34,34,12.2,12.2,0,0,1-3.6.55,12,12,0,0,1-3.6-23.45,28,28,0,0,0,18.32-18.32,12,12,0,0,1,22.9,7.2Z',
    },
    apparence: {
        titre: 'from-red-500 to-orange-500',
        grilleOnglets: 'grid-cols-4 sm:grid-cols-4 md:grid-cols-8',
        pleineHauteur: false,
    },
    onglets: [
        {
            id: 'hemostase',
            libelle: 'Hémostase',
            actif: 'from-red-500 to-orange-500',
        },
        {
            id: 'aap',
            libelle: 'AAP',
            actif: 'from-purple-500 to-indigo-600',
        },
        {
            id: 'hnf',
            libelle: 'HNF',
            actif: 'from-sky-400 to-cyan-500',
        },
        {
            id: 'hbpm',
            libelle: 'HBPM',
            actif: 'from-blue-600 to-indigo-700',
        },
        {
            id: 'aod',
            libelle: 'AOD',
            actif: 'from-amber-500 to-yellow-500',
        },
        {
            id: 'avk',
            libelle: 'AVK',
            actif: 'from-red-500 to-orange-500',
        },
        {
            id: 'quiz',
            libelle: 'Quiz',
            actif: 'from-slate-500 to-gray-700',
        },
        {
            id: 'synthese',
            libelle: 'Synthèse',
            actif: 'from-gray-400 to-gray-600',
        },
    ],
    quiz: {
        intro: 'Testez vos connaissances et validez vos acquis sur les anticoagulants.',
        centre: false,
        bouton: 'from-indigo-500 via-purple-500 to-pink-500',
    },
};

export default fiche;
