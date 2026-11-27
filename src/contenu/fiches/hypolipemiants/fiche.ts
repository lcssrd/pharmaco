import type { Fiche } from '../../../types/fiche';

const fiche: Fiche = {
    titre: 'Les Hypolipémiants (Cours IFSI)',
    seo: {
        titre: 'Les Hypolipémiants : Cours Pharmacologie IFSI - UE 2.11 S3',
        description:
            'Fiche de révision IFSI sur les hypolipémiants : Cholestérol (LDL/HDL), Athérosclérose, Statines, Fibrates, règles hygiéno-diététiques et rôle infirmier.',
        ogTitre: 'Les Hypolipémiants - Révision Pharmacologie IFSI',
        ogDescription:
            'Tout comprendre sur le traitement du cholestérol et la prévention cardiovasculaire. Fiche UE 2.11 S3.',
    },
    miseAJour: '2026-11-25',
    carte: {
        titre: 'Hypolipémiants',
        sousTitre: 'Statines & Fibrates',
        semestre: 'S3',
        couleur: 'teal',
        icone: 'M243.14,131.54l-32-80h0a12,12,0,0,0-13.73-7.25L140,57V40a12,12,0,0,0-24,0V62.37L53.4,76.29a12,12,0,0,0-8.54,7.25h0l0,0v0l-32,79.92A12,12,0,0,0,12,168c0,12.13,6.2,22.43,17.45,29A55,55,0,0,0,56,204a55,55,0,0,0,26.55-7C93.8,190.43,100,180.13,100,168a12,12,0,0,0-.86-4.46L72.38,96.65,116,87V204H104a12,12,0,0,0,0,24h48a12,12,0,0,0,0-24H140V81.63l40.42-9-23.56,58.9A12,12,0,0,0,156,136c0,12.13,6.2,22.43,17.45,29a53.78,53.78,0,0,0,53.1,0C237.8,158.43,244,148.13,244,136A12,12,0,0,0,243.14,131.54ZM56,180c-3.71,0-18-1.87-19.81-10.18L56,120.31l19.81,49.51C74,178.13,59.71,180,56,180Zm144-32c-3.71,0-18-1.87-19.81-10.18L200,88.31l19.81,49.51C218,146.13,203.71,148,200,148Z',
    },
    apparence: {
        titre: 'from-teal-500 to-cyan-600',
        grilleOnglets: 'grid-cols-3 sm:grid-cols-3 md:grid-cols-5',
        pleineHauteur: false,
    },
    onglets: [
        {
            id: 'generalites',
            libelle: 'Généralités',
            actif: 'from-teal-500 to-cyan-600',
            survol: 'hover:bg-teal-100 hover:text-teal-800',
        },
        {
            id: 'rhd',
            libelle: 'Regles Hygiéno-Diét.',
            actif: 'from-orange-500 to-amber-600',
            survol: 'hover:bg-orange-100 hover:text-orange-800',
        },
        {
            id: 'traitements',
            libelle: 'Traitements',
            actif: 'from-sky-500 to-blue-600',
            survol: 'hover:bg-sky-100 hover:text-sky-800',
        },
        {
            id: 'role',
            libelle: 'Rôle Infirmier',
            actif: 'from-red-500 to-rose-600',
            survol: 'hover:bg-red-100 hover:text-red-800',
        },
        {
            id: 'quiz',
            libelle: 'Quiz',
            actif: 'from-gray-600 to-slate-800',
            survol: 'hover:bg-gray-200 hover:text-gray-800',
        },
    ],
    quiz: {
        intro: 'Testez vos connaissances sur les hypolipémiants.',
        centre: false,
        bouton: 'from-indigo-500 via-purple-500 to-pink-500',
    },
};

export default fiche;
