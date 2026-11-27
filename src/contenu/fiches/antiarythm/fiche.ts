import type { Fiche } from '../../../types/fiche';

const fiche: Fiche = {
    titre: 'Anti-arythmiques & Digitaliques (Cours IFSI)',
    seo: {
        titre: 'Les Anti-arythmiques & Digitaliques : Cours Pharmacologie IFSI - UE 2.11 S3',
        description:
            'Fiche de révision IFSI sur les anti-arythmiques et digitaliques : Classes de Vaughan Williams (1 à 4), Amiodarone, Bêta-bloquants, Digoxine et surveillance infirmière (ECG, Kaliémie).',
        ogTitre: 'Anti-arythmiques & Digitaliques - Révision Pharmacologie IFSI',
        ogDescription:
            "Comprendre les traitements des troubles du rythme et l'insuffisance cardiaque. Fiche de révision UE 2.11.",
    },
    miseAJour: '2026-11-25',
    carte: {
        titre: 'Antiarythmiques & Digitaliques',
        semestre: 'S3',
        couleur: 'rose',
        icone: 'M244,128a12,12,0,0,1-12,12H207.42l-36.69,73.37A12,12,0,0,1,160,220h-.6a12,12,0,0,1-10.61-7.72L95,71.15,66.92,133A12,12,0,0,1,56,140H24a12,12,0,0,1,0-24H48.27L85.08,35a12,12,0,0,1,22.13.7l54.28,142.46,27.78-55.56A12,12,0,0,1,200,116h32A12,12,0,0,1,244,128Z',
    },
    apparence: {
        titre: 'from-red-500 to-red-800',
        grilleOnglets: 'grid-cols-4 sm:grid-cols-4 md:grid-cols-8',
        pleineHauteur: false,
    },
    onglets: [
        {
            id: 'rythme',
            libelle: 'Rythme',
            actif: 'from-red-500 to-rose-600',
            survol: 'hover:bg-rose-100 hover:text-rose-800',
        },
        {
            id: 'classe1',
            libelle: 'Stab. Membrane',
            actif: 'from-sky-500 to-blue-600',
            survol: 'hover:bg-sky-100 hover:text-sky-800',
        },
        {
            id: 'classe2',
            libelle: 'Bêta-bloquants',
            actif: 'from-purple-500 to-indigo-600',
            survol: 'hover:bg-purple-100 hover:text-purple-800',
        },
        {
            id: 'classe3',
            libelle: 'Inhib. Potassiques',
            actif: 'from-red-500 to-orange-500',
            survol: 'hover:bg-red-100 hover:text-red-800',
        },
        {
            id: 'classe4',
            libelle: 'Inhib. Calciques',
            actif: 'from-green-500 to-emerald-600',
            survol: 'hover:bg-green-100 hover:text-green-800',
        },
        {
            id: 'digitaliques',
            libelle: 'Digitaliques',
            actif: 'from-amber-500 to-yellow-500',
            survol: 'hover:bg-amber-100 hover:text-amber-800',
        },
        {
            id: 'quiz',
            libelle: 'Quiz',
            actif: 'from-slate-500 to-gray-700',
            survol: 'hover:bg-slate-300 hover:text-slate-800',
        },
        {
            id: 'synthese',
            libelle: 'Synthèse',
            actif: 'from-gray-400 to-gray-600',
            survol: 'hover:bg-gray-200 hover:text-gray-800',
        },
    ],
    quiz: {
        intro: 'Testez vos connaissances sur les anti-arythmiques et les digitaliques.',
        centre: true,
        bouton: 'from-indigo-500 via-purple-500 to-pink-500',
    },
};

export default fiche;
