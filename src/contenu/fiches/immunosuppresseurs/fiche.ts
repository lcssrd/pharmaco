import type { Fiche } from '../../../types/fiche';

const fiche: Fiche = {
    titre: 'Les Immunosuppresseurs (Cours IFSI)',
    seo: {
        titre: 'Les Immunosuppresseurs : Cours Pharmacologie IFSI - UE 2.11 S5',
        description:
            'Fiche de révision IFSI sur les immunosuppresseurs : Prévention du rejet de greffe, Corticoïdes, Anti-calcineurines (Tacrolimus, Ciclosporine), Biothérapies et surveillance infirmière.',
        ogTitre: 'Les Immunosuppresseurs - Révision Pharmacologie IFSI',
        ogDescription: 'Comprendre les traitements anti-rejet et immunosuppresseurs. Fiche UE 2.11 S5.',
    },
    miseAJour: '2026-11-25',
    carte: {
        titre: 'Immunosuppresseurs',
        semestre: 'S5',
        couleur: 'amber',
        icone: 'M208,36H48A20,20,0,0,0,28,56v56c0,54.29,26.32,87.22,48.4,105.29,23.71,19.39,47.44,26,48.44,26.29a12.1,12.1,0,0,0,6.32,0c1-.28,24.73-6.9,48.44-26.29,22.08-18.07,48.4-51,48.4-105.29V56A20,20,0,0,0,208,36Zm-4,76c0,35.71-13.09,64.69-38.91,86.15A126.28,126.28,0,0,1,128,219.38a126.14,126.14,0,0,1-37.09-21.23C65.09,176.69,52,147.71,52,112V60H204ZM79.51,144.49a12,12,0,1,1,17-17L112,143l47.51-47.52a12,12,0,0,1,17,17l-56,56a12,12,0,0,1-17,0Z',
    },
    apparence: {
        titre: 'from-amber-500 to-orange-600',
        grilleOnglets: 'grid-cols-3 sm:grid-cols-4 md:grid-cols-4',
        pleineHauteur: false,
    },
    onglets: [
        {
            id: 'generalites',
            libelle: 'Généralités',
            actif: 'from-amber-500 to-orange-600',
            survol: 'hover:bg-amber-100 hover:text-amber-800',
        },
        {
            id: 'mecanismes',
            libelle: 'Classes & Molécules',
            actif: 'from-emerald-500 to-teal-600',
            survol: 'hover:bg-emerald-100 hover:text-emerald-800',
        },
        {
            id: 'surveillance',
            libelle: 'Surveillance',
            actif: 'from-pink-500 to-rose-600',
            survol: 'hover:bg-pink-100 hover:text-pink-800',
        },
        {
            id: 'quiz',
            libelle: 'Quiz',
            actif: 'from-slate-600 to-gray-700',
            survol: 'hover:bg-slate-200 hover:text-slate-800',
        },
    ],
    quiz: {
        intro: 'Testez vos connaissances sur les immunosuppresseurs.',
        centre: false,
        bouton: 'from-indigo-500 via-purple-500 to-pink-500',
    },
};

export default fiche;
