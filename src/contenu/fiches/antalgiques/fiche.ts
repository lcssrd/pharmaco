import type { Fiche } from '../../../types/fiche';

const fiche: Fiche = {
    titre: 'Les Antalgiques (Cours IFSI)',
    seo: {
        titre: 'Les Antalgiques : Cours Pharmacologie IFSI - UE 2.11 S1',
        description:
            'Fiche de révision complète sur les antalgiques pour étudiants infirmiers (IFSI). Paliers OMS 1, 2 et 3, paracétamol, AINS, opioïdes, effets secondaires et rôle infirmier.',
        ogTitre: 'Les Antalgiques - Révision Pharmacologie IFSI',
        ogDescription: 'Tout savoir sur les antalgiques : Paliers, mécanismes, surveillance infirmière.',
    },
    miseAJour: '2026-11-26',
    carte: {
        titre: 'Antalgiques',
        sousTitre: 'Paliers OMS, Morphine, AINS',
        semestre: 'S1',
        couleur: 'cyan',
        icone: 'M219.26,36.77a57.28,57.28,0,0,0-81,0L36.77,138.26a57.26,57.26,0,0,0,81,81L219.26,117.74A57.33,57.33,0,0,0,219.26,36.77ZM100.78,202.26a33.26,33.26,0,1,1-47-47L96,113l47,47Zm101.5-101.49L160,143,113,96l42.27-42.26a33.26,33.26,0,0,1,47,47Zm-9.77-25.26a12,12,0,0,1,0,17l-24,24a12,12,0,1,1-17-17l24-24A12,12,0,0,1,192.51,75.51Z',
    },
    apparence: {
        titre: 'from-cyan-400 to-blue-500',
        grilleOnglets: 'grid-cols-4 sm:grid-cols-4 md:grid-cols-7',
        pleineHauteur: false,
    },
    onglets: [
        {
            id: 'douleur',
            libelle: 'La Douleur',
            actif: 'from-cyan-400 to-blue-500',
            survol: 'hover:bg-cyan-100 hover:text-cyan-800',
        },
        {
            id: 'nonopioides',
            libelle: 'Non-opioïdes',
            actif: 'from-green-500 to-emerald-600',
            survol: 'hover:bg-green-100 hover:text-green-800',
        },
        {
            id: 'opioidesfaibles',
            libelle: 'Opioïdes faibles',
            actif: 'from-amber-500 to-yellow-500',
            survol: 'hover:bg-amber-100 hover:text-amber-800',
        },
        {
            id: 'opioidesforts',
            libelle: 'Opioïdes forts',
            actif: 'from-red-500 to-orange-500',
            survol: 'hover:bg-red-100 hover:text-red-800',
        },
        {
            id: 'coanalgesiques',
            libelle: 'Co-analgésiques',
            actif: 'from-purple-500 to-indigo-600',
            survol: 'hover:bg-purple-100 hover:text-purple-800',
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
        intro: 'Testez vos connaissances et validez vos acquis sur les antalgiques.',
        centre: false,
        bouton: 'from-indigo-500 via-purple-500 to-pink-500',
    },
};

export default fiche;
