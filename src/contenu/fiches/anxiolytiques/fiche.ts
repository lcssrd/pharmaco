import type { Fiche } from '../../../types/fiche';

const fiche: Fiche = {
    titre: 'Anxiolytiques & Hypnotiques (Cours IFSI)',
    seo: {
        titre: 'Anxiolytiques & Hypnotiques : Cours Pharmacologie IFSI - UE 2.11 S5',
        description:
            'Fiche de révision IFSI sur les anxiolytiques et hypnotiques : Benzodiazépines, Z-drugs, risques (dépendance, tolérance), règles de prescription et rôle infirmier. UE 2.11 S5.',
        ogTitre: 'Anxiolytiques & Hypnotiques - Révision Pharmacologie IFSI',
        ogDescription: 'Tout savoir sur les psychotropes anxiolytiques et hypnotiques. Fiche de révision UE 2.11 S5.',
    },
    miseAJour: '2026-11-25',
    carte: {
        titre: 'Anxiolytiques & Hypnotiques',
        sousTitre: 'Benzodiazépines & Z-drugs',
        semestre: 'S5',
        couleur: 'pink',
        icone: 'M236.37,139.4a12,12,0,0,0-12-3A84.07,84.07,0,0,1,119.6,31.59a12,12,0,0,0-15-15A108.86,108.86,0,0,0,49.69,55.07,108,108,0,0,0,136,228a107.09,107.09,0,0,0,64.93-21.69,108.86,108.86,0,0,0,38.44-54.94A12,12,0,0,0,236.37,139.4Zm-49.88,47.74A84,84,0,0,1,68.86,69.51,84.93,84.93,0,0,1,92.27,48.29Q92,52.13,92,56A108.12,108.12,0,0,0,200,164q3.87,0,7.71-.27A84.79,84.79,0,0,1,186.49,187.14Z',
    },
    apparence: {
        titre: 'from-purple-400 to-pink-500',
        grilleOnglets: 'grid-cols-3 sm:grid-cols-6',
        pleineHauteur: false,
    },
    onglets: [
        {
            id: 'generalites',
            libelle: 'Généralités',
            actif: 'from-purple-500 to-pink-600',
            survol: 'hover:bg-purple-100 hover:text-purple-800',
        },
        {
            id: 'bzd',
            libelle: 'Benzodiazépines',
            actif: 'from-indigo-500 to-blue-600',
            survol: 'hover:bg-indigo-100 hover:text-indigo-800',
        },
        {
            id: 'zdrugs',
            libelle: 'Z-Drugs',
            actif: 'from-teal-500 to-cyan-600',
            survol: 'hover:bg-teal-100 hover:text-teal-800',
        },
        {
            id: 'autres',
            libelle: 'Autres',
            actif: 'from-amber-500 to-orange-600',
            survol: 'hover:bg-amber-100 hover:text-amber-800',
        },
        {
            id: 'risques',
            libelle: 'Risques & Règles',
            actif: 'from-red-500 to-rose-600',
            survol: 'hover:bg-red-100 hover:text-red-800',
        },
        {
            id: 'quiz',
            libelle: 'Quiz',
            actif: 'from-slate-500 to-gray-700',
            survol: 'hover:bg-slate-300 hover:text-slate-800',
        },
    ],
    quiz: {
        intro: 'Testez vos connaissances sur les anxiolytiques et hypnotiques.',
        centre: false,
        bouton: 'from-indigo-500 via-purple-500 to-pink-500',
    },
};

export default fiche;
