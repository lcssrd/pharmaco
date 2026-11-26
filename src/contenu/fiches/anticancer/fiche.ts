import type { Fiche } from '../../../types/fiche';

const fiche: Fiche = {
    titre: 'Les Anticancéreux (Cours IFSI)',
    seo: {
        titre: 'Les Anticancéreux (Chimiothérapies) : Cours Pharmacologie IFSI - UE 2.11 S5',
        description:
            'Fiche de révision IFSI sur les anticancéreux : Chimiothérapies (Alkylants, Antimétabolites), Thérapies ciblées, Immunothérapie, toxicités et rôle infirmier (extravasation).',
        ogTitre: 'Les Anticancéreux - Révision Pharmacologie IFSI',
        ogDescription:
            'Comprendre les chimiothérapies, thérapies ciblées et la surveillance infirmière. Fiche UE 2.11 S5.',
    },
    miseAJour: '2026-06-15',
    carte: {
        titre: 'Anticancéreux',
        sousTitre: 'Cytotoxiques & Thérapies ciblées',
        semestre: 'S5',
        couleur: 'blue',
        icone: 'M204,204.5V232a12,12,0,0,1-24,0V204.5a59.68,59.68,0,0,0-33.17-53.67l-48.4-24.2A83.54,83.54,0,0,1,52,51.5V24a12,12,0,0,1,24,0V51.5a59.68,59.68,0,0,0,33.17,53.67l48.4,24.2A83.54,83.54,0,0,1,204,204.5Zm-52-.5H76a59.75,59.75,0,0,1,2.34-16h56.2a12,12,0,0,0,0-24H91.76c1-1.1,2-2.18,3.13-3.21a12,12,0,0,0-16.45-17.48A84.38,84.38,0,0,0,52,204.5V232a12,12,0,0,0,24,0v-4h76a12,12,0,0,0,0-24ZM192,12a12,12,0,0,0-12,12v4H104a12,12,0,0,0,0,24h76a59.75,59.75,0,0,1-2.34,16H121.44a12,12,0,0,0,0,24h42.8c-1,1.1-2,2.18-3.13,3.21a12,12,0,0,0,16.45,17.48A84.38,84.38,0,0,0,204,51.5V24A12,12,0,0,0,192,12Z',
    },
    apparence: {
        titre: 'from-blue-400 to-blue-700',
        auteurEntete: 'from-cyan-400 to-blue-500',
        auteurPied: 'from-sky-400 via-violet-500 to-pink-500',
        grilleOnglets: 'grid-cols-3 sm:grid-cols-6',
        enteteCollant: 'z-10',
        pleineHauteur: false,
        ombrePied: true,
    },
    onglets: [
        {
            id: 'principes',
            libelle: 'Principes Clés',
            actif: 'from-blue-600 to-blue-800',
            survol: 'hover:bg-blue-100 hover:text-blue-800',
        },
        {
            id: 'chimiotherapies',
            libelle: 'Chimiothérapies',
            actif: 'from-red-500 to-orange-500',
            survol: 'hover:bg-red-100 hover:text-red-800',
        },
        {
            id: 'therapies_innovantes',
            libelle: 'Thérapies Innovantes',
            actif: 'from-cyan-500 to-sky-500',
            survol: 'hover:bg-cyan-100 hover:text-cyan-800',
        },
        {
            id: 'toxicités',
            libelle: 'Toxicités',
            actif: 'from-yellow-500 to-amber-500',
            survol: 'hover:bg-yellow-100 hover:text-yellow-800',
        },
        {
            id: 'role_ide',
            libelle: 'Rôle IDE',
            actif: 'from-teal-500 to-cyan-600',
            survol: 'hover:bg-teal-100 hover:text-teal-800',
        },
        {
            id: 'quiz',
            libelle: 'Quiz',
            actif: 'from-slate-500 to-gray-700',
            survol: 'hover:bg-slate-300 hover:text-slate-800',
        },
    ],
    quiz: {
        intro: 'Testez vos connaissances sur les anticancéreux.',
        centre: false,
        bouton: 'from-indigo-500 via-purple-500 to-pink-500',
    },
};

export default fiche;
