import type { Fiche } from '../../../types/fiche';

const fiche: Fiche = {
    titre: 'Les Anti-Inflammatoires (Cours IFSI)',
    seo: {
        titre: 'Les Anti-Inflammatoires : Cours Pharmacologie IFSI - UE 2.11 S1',
        description:
            'Fiche de révision complète sur les anti-inflammatoires pour étudiants infirmiers (IFSI). Processus inflammatoire, AINS, Corticoïdes, effets secondaires et rôle infirmier.',
        ogTitre: 'Les Anti-Inflammatoires - Révision Pharmacologie IFSI',
        ogDescription: "Comprendre l'inflammation, les AINS et les Corticoïdes. Fiche de révision UE 2.11.",
    },
    miseAJour: '2026-11-25',
    carte: {
        titre: 'Anti-inflammatoires',
        sousTitre: 'Stéroïdiens (AIS) & Non Stéroïdiens (AINS)',
        semestre: 'S1',
        couleur: 'purple',
        icone: 'M84,128a12,12,0,0,1,12-12h20V96a12,12,0,0,1,24,0v20h20a12,12,0,0,1,0,24H140v20a12,12,0,0,1-24,0V140H96A12,12,0,0,1,84,128ZM228,56v56c0,54.29-26.32,87.22-48.4,105.29-23.71,19.39-47.44,26-48.44,26.29a12.1,12.1,0,0,1-6.32,0c-1-.28-24.73-6.9-48.44-26.29C54.32,199.22,28,166.29,28,112V56A20,20,0,0,1,48,36H208A20,20,0,0,1,228,56Zm-24,4H52v52c0,35.71,13.09,64.69,38.91,86.15A126.14,126.14,0,0,0,128,219.38a126.28,126.28,0,0,0,37.09-21.23C190.91,176.69,204,147.71,204,112Z',
    },
    apparence: {
        titre: 'from-purple-500 to-pink-600',
        grilleOnglets: 'grid-cols-2 sm:grid-cols-4',
        pleineHauteur: false,
    },
    onglets: [
        {
            id: 'inflammation',
            libelle: 'Inflammation',
            actif: 'from-purple-500 to-pink-500',
        },
        {
            id: 'ains',
            libelle: 'AINS',
            actif: 'from-orange-500 to-yellow-500',
        },
        {
            id: 'cortico',
            libelle: 'Corticoïdes',
            actif: 'from-lime-500 to-green-500',
        },
        {
            id: 'quiz',
            libelle: 'Quiz',
            actif: 'from-slate-500 to-gray-700',
        },
    ],
    quiz: {
        intro: 'Testez vos connaissances sur les AINS et les Corticoïdes.',
        centre: false,
        bouton: 'from-teal-500 via-cyan-500 to-blue-500',
    },
};

export default fiche;
