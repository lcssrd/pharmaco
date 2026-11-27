import type { Fiche } from '../../../types/fiche';

const fiche: Fiche = {
    titre: 'Antiasthmatiques & Antihistaminiques (Cours IFSI)',
    seo: {
        titre: 'Antiasthmatiques & Antihistaminiques : Cours Pharmacologie IFSI - UE 2.11 S3',
        description:
            "Fiche de révision IFSI sur l'asthme et les allergies : Bronchodilatateurs (SABA/LABA), Corticoïdes inhalés, Antihistaminiques H1, dispositifs d'inhalation et surveillance IDE.",
        ogTitre: 'Antiasthmatiques & Antihistaminiques - Révision Pharmacologie IFSI',
        ogDescription: "Tout comprendre sur le traitement de l'asthme et des allergies. Fiche UE 2.11 S3.",
    },
    miseAJour: '2026-11-25',
    carte: {
        titre: 'Antiasthmatiques',
        sousTitre: 'Bronchodilatateurs & Antihistaminiques',
        semestre: 'S3',
        couleur: 'fuchsia',
        icone: 'M224.11,31.92A68,68,0,0,0,128,31.87l-70.12,69.3A19.91,19.91,0,0,0,52,115.31V187L23.52,215.51a12,12,0,0,0,17,17L69,204H140.7a19.87,19.87,0,0,0,14.15-5.86l.05,0,69.21-70A68.06,68.06,0,0,0,224.11,31.92Zm-79.21,17A44,44,0,0,1,210,108H165l27.52-27.51a12,12,0,0,0-17-17L124,115V69.54ZM76,117l24-23.72V139L76,163Zm63,63H93l48-48h45.5Z',
    },
    apparence: {
        titre: 'from-fuchsia-500 to-purple-600',
        grilleOnglets: 'grid-cols-4 sm:grid-cols-4 md:grid-cols-7',
        pleineHauteur: false,
    },
    onglets: [
        {
            id: 'asthme',
            libelle: "L'Asthme",
            actif: 'from-fuchsia-500 to-purple-600',
            survol: 'hover:bg-fuchsia-100 hover:text-fuchsia-800',
        },
        {
            id: 'antihistaminiques',
            libelle: 'Antihistaminiques',
            actif: 'from-teal-500 to-cyan-600',
            survol: 'hover:bg-teal-100 hover:text-teal-800',
        },
        {
            id: 'beta2',
            libelle: 'β2-mimétiques',
            actif: 'from-emerald-500 to-green-700',
            survol: 'hover:bg-emerald-100 hover:text-emerald-800',
        },
        {
            id: 'corticoides',
            libelle: 'Corticoïdes',
            actif: 'from-rose-500 to-red-600',
            survol: 'hover:bg-rose-100 hover:text-rose-800',
        },
        {
            id: 'autres',
            libelle: 'Autres Traitements',
            actif: 'from-sky-500 to-blue-600',
            survol: 'hover:bg-sky-100 hover:text-sky-800',
        },
        {
            id: 'role',
            libelle: 'Administration',
            actif: 'from-slate-500 to-gray-600',
            survol: 'hover:bg-slate-200 hover:text-slate-800',
        },
        {
            id: 'quiz',
            libelle: 'Quiz',
            actif: 'from-violet-500 to-indigo-700',
            survol: 'hover:bg-violet-100 hover:text-violet-800',
        },
    ],
    quiz: {
        intro: 'Testez vos connaissances sur les antiasthmatiques et antihistaminiques.',
        centre: false,
        bouton: 'from-indigo-500 via-purple-500 to-pink-500',
    },
};

export default fiche;
