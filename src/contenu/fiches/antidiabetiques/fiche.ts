import type { Fiche } from '../../../types/fiche';

const fiche: Fiche = {
    titre: 'Les Antidiabétiques (Cours IFSI)',
    seo: {
        titre: 'Les Antidiabétiques : Cours Pharmacologie IFSI - UE 2.11 S3',
        description:
            'Fiche de révision IFSI sur les antidiabétiques : Diabète de type 1 et 2, Insulines (rapides, lentes), Antidiabétiques oraux (Metformine, Sulfamides) et rôle infirmier.',
        ogTitre: 'Les Antidiabétiques - Révision Pharmacologie IFSI',
        ogDescription:
            'Tout comprendre sur le diabète et ses traitements : Insulino-thérapie, ADO et surveillance. Fiche UE 2.11 S3.',
    },
    miseAJour: '2026-11-25',
    carte: {
        titre: 'Anti-diabétiques',
        sousTitre: 'Insulines & ADO',
        semestre: 'S3',
        couleur: 'violet',
        icone: 'M240.49,63.51l-48-48a12,12,0,0,0-17,17L191,48,168,71,136.49,39.51a12,12,0,1,0-17,17L123,60,41.86,141.17A19.86,19.86,0,0,0,36,155.31V203L15.51,223.51a12,12,0,0,0,17,17L53,220h47.72a19.86,19.86,0,0,0,14.14-5.86L196,133l3.51,3.52a12,12,0,0,0,17-17L185,88l23-23,15.51,15.52a12,12,0,1,0,17-17ZM99,196H60V157l14-14,17.51,17.52a12,12,0,0,0,17-17L91,126l11-11,17.51,17.52a12,12,0,0,0,17-17L119,98l21-21,39,39Z',
    },
    apparence: {
        titre: 'from-cyan-400 to-blue-500',
        grilleOnglets: 'grid-cols-4 sm:grid-cols-4 md:grid-cols-7',
        pleineHauteur: false,
    },
    onglets: [
        {
            id: 'generalites',
            libelle: 'Généralités',
            actif: 'from-violet-500 to-purple-600',
            survol: 'hover:bg-violet-100 hover:text-violet-800',
        },
        {
            id: 'dt1',
            libelle: 'Diabète Type I',
            actif: 'from-teal-500 to-cyan-600',
            survol: 'hover:bg-teal-100 hover:text-teal-800',
        },
        {
            id: 'insulines',
            libelle: 'Insulines',
            actif: 'from-sky-500 to-blue-600',
            survol: 'hover:bg-sky-100 hover:text-sky-800',
        },
        {
            id: 'dt2',
            libelle: 'Diabète Type II',
            actif: 'from-orange-500 to-red-500',
            survol: 'hover:bg-orange-100 hover:text-orange-800',
        },
        {
            id: 'ado',
            libelle: 'ADO',
            actif: 'from-rose-500 to-pink-500',
            survol: 'hover:bg-rose-100 hover:text-rose-800',
        },
        {
            id: 'role',
            libelle: 'Rôle Infirmier',
            actif: 'from-indigo-500 to-blue-500',
            survol: 'hover:bg-indigo-100 hover:text-indigo-800',
        },
        {
            id: 'quiz',
            libelle: 'Quiz',
            actif: 'from-slate-500 to-gray-700',
            survol: 'hover:bg-slate-300 hover:text-slate-800',
        },
    ],
    quiz: {
        intro: 'Testez vos connaissances et validez vos acquis sur les antidiabétiques.',
        centre: false,
        bouton: 'from-indigo-500 via-purple-500 to-pink-500',
    },
};

export default fiche;
