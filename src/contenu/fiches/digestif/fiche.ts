import type { Fiche } from '../../../types/fiche';

const fiche: Fiche = {
    titre: 'Thérapeutiques Digestives (Cours IFSI)',
    seo: {
        titre: 'Thérapeutiques Digestives : Cours Pharmacologie IFSI - UE 2.11 S3',
        description:
            'Fiche de révision IFSI sur les médicaments du système digestif : IPP, Antiémétiques (Sétrons), Laxatifs, Antidiarrhéiques et rôle infirmier. UE 2.11 S3.',
        ogTitre: 'Thérapeutiques Digestives - Révision Pharmacologie IFSI',
        ogDescription:
            'Tout savoir sur les traitements digestifs : IPP, antiémétiques, laxatifs. Fiche de révision UE 2.11.',
    },
    miseAJour: '2026-11-25',
    carte: {
        titre: 'Digestif',
        sousTitre: 'IPP, Antiémétiques, Laxatifs',
        semestre: 'S3',
        couleur: 'lime',
        icone: 'M216,84H172V40a20,20,0,0,0-20-20H104A20,20,0,0,0,84,40V84H40a20,20,0,0,0-20,20v48a20,20,0,0,0,20,20H84v44a20,20,0,0,0,20,20h48a20,20,0,0,0,20-20V172h44a20,20,0,0,0,20-20V104A20,20,0,0,0,216,84Zm-4,64H160a12,12,0,0,0-12,12v52H108V160a12,12,0,0,0-12-12H44V108H96a12,12,0,0,0,12-12V44h40V96a12,12,0,0,0,12,12h52Z',
    },
    apparence: {
        titre: 'from-lime-500 to-green-600',
        auteurEntete: 'from-lime-400 to-green-500',
        auteurPied: 'from-sky-400 via-violet-500 to-pink-500',
        grilleOnglets: 'grid-cols-4 sm:grid-cols-4 md:grid-cols-7',
        enteteCollant: 'z-10',
        pleineHauteur: false,
        ombrePied: true,
    },
    onglets: [
        {
            id: 'rappels',
            libelle: 'Rappels',
            actif: 'from-lime-500 to-green-600',
            survol: 'hover:bg-green-100 hover:text-green-800',
        },
        {
            id: 'antiacides',
            libelle: 'Anti-acides',
            actif: 'from-orange-400 to-amber-500',
            survol: 'hover:bg-orange-100 hover:text-orange-800',
        },
        {
            id: 'antiemetiques',
            libelle: 'Antiémétiques',
            actif: 'from-sky-400 to-blue-500',
            survol: 'hover:bg-sky-100 hover:text-sky-800',
        },
        {
            id: 'laxatifs',
            libelle: 'Laxatifs',
            actif: 'from-yellow-400 to-orange-500',
            survol: 'hover:bg-yellow-100 hover:text-yellow-800',
        },
        {
            id: 'antidiarrheiques',
            libelle: 'Anti-diarrhéiques',
            actif: 'from-lime-400 to-green-500',
            survol: 'hover:bg-lime-100 hover:text-lime-800',
        },
        {
            id: 'role',
            libelle: 'Rôle Infirmier',
            actif: 'from-pink-500 to-rose-600',
            survol: 'hover:bg-pink-100 hover:text-pink-800',
        },
        {
            id: 'quiz',
            libelle: 'Quiz',
            actif: 'from-slate-500 to-gray-700',
            survol: 'hover:bg-slate-300 hover:text-slate-800',
        },
    ],
    quiz: {
        intro: 'Testez vos connaissances sur les thérapeutiques du système digestif.',
        centre: false,
        bouton: 'from-indigo-500 via-purple-500 to-pink-500',
    },
};

export default fiche;
