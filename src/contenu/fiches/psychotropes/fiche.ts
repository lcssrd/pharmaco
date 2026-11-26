import type { Fiche } from '../../../types/fiche';

const fiche: Fiche = {
    titre: 'Les Psychotropes (Cours IFSI)',
    seo: {
        titre: 'Les Psychotropes : Cours Pharmacologie IFSI - UE 2.11 S5',
        description:
            'Fiche de révision IFSI sur les psychotropes : Neurotransmission, Antidépresseurs, Anxiolytiques, Neuroleptiques, Thymorégulateurs et surveillance infirmière.',
        ogTitre: 'Les Psychotropes - Révision Pharmacologie IFSI',
    },
    miseAJour: '2026-11-25',
    carte: {
        titre: 'Psychotropes',
        sousTitre: 'Antidépresseurs, Neuroleptiques, Thymorégulateurs',
        semestre: 'S5',
        couleur: 'lime',
        icone: 'M252,124a60.14,60.14,0,0,0-32-53.08,52,52,0,0,0-92-32.11A52,52,0,0,0,36,70.92a60,60,0,0,0,0,106.14,52,52,0,0,0,92,32.13,52,52,0,0,0,92-32.13A60.05,60.05,0,0,0,252,124ZM88,204a28,28,0,0,1-26.85-20.07c1,0,1.89.07,2.85.07h8a12,12,0,0,0,0-24H64A36,36,0,0,1,52,90.05a12,12,0,0,0,8-11.32V72a28,28,0,0,1,56,0v60.18a51.61,51.61,0,0,0-7.2-3.85,12,12,0,1,0-9.6,22A28,28,0,0,1,88,204Zm104-44h-8a12,12,0,0,0,0,24h8c1,0,1.9,0,2.85-.07a28,28,0,1,1-38-33.61,12,12,0,1,0-9.6-22,51.61,51.61,0,0,0-7.2,3.85V72a28,28,0,0,1,56,0v6.73a12,12,0,0,0,8,11.32,36,36,0,0,1-12,70Zm16-44a12,12,0,0,1-12,12,40,40,0,0,1-40-40V84a12,12,0,0,1,24,0v4a16,16,0,0,0,16,16A12,12,0,0,1,208,116ZM100,88a40,40,0,0,1-40,40,12,12,0,0,1,0-24A16,16,0,0,0,76,88V84a12,12,0,0,1,24,0Z',
    },
    apparence: {
        titre: 'from-lime-500 to-green-600',
        auteurEntete: 'from-lime-500 to-green-600',
        auteurPied: 'from-lime-400 to-green-500',
        grilleOnglets: 'grid-cols-3 sm:grid-cols-3 md:grid-cols-6',
        enteteCollant: 'z-50',
        pleineHauteur: true,
        ombrePied: false,
    },
    onglets: [
        {
            id: 'intro',
            libelle: 'Neurotransmission',
            actif: 'from-lime-500 to-green-600',
        },
        {
            id: 'antidep',
            libelle: 'Antidépresseurs',
            actif: 'from-sky-500 to-blue-600',
        },
        {
            id: 'anxio',
            libelle: 'Anxiolytiques',
            actif: 'from-violet-500 to-purple-600',
        },
        {
            id: 'neuro',
            libelle: 'Neuroleptiques',
            actif: 'from-rose-500 to-red-600',
        },
        {
            id: 'thymo',
            libelle: 'Thymorégulateurs',
            actif: 'from-amber-500 to-orange-600',
        },
        {
            id: 'quiz',
            libelle: 'Quiz',
            actif: 'from-slate-500 to-gray-700',
        },
    ],
    quiz: {
        intro: 'Testez vos connaissances sur la pharmacologie psychiatrique.',
        centre: false,
        bouton: 'from-lime-500 to-green-600',
    },
};

export default fiche;
