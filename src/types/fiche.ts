/**
 * Description d'une fiche de révision.
 *
 * Chaque fiche vit dans son propre dossier : src/contenu/fiches/<identifiant>/
 *   - fiche.ts         : ce qui est décrit ici (titres, référencement, couleurs, onglets)
 *   - <onglet>.html    : le contenu de chaque onglet (un fichier par onglet, hors quiz)
 *   - quiz.json        : les questions du quiz
 *   - graphiques.ts    : facultatif, la configuration des graphiques Chart.js de la fiche
 *
 * L'identifiant du dossier donne l'adresse de la page (antico -> antico.html).
 *
 * Les valeurs de type « classes » sont des classes Tailwind écrites en toutes lettres
 * (par exemple « from-red-500 to-orange-500 ») : Tailwind ne génère que les classes
 * qu'il trouve telles quelles dans les fichiers du projet.
 */

/** Date au format AAAA-MM-JJ */
export type DateIso = `${number}-${number}-${number}`;

/** Couleurs disponibles pour les cartes de l'accueil (voir src/data/themes-cartes.ts) */
export type CouleurCarte =
    | 'amber'
    | 'blue'
    | 'cyan'
    | 'emerald'
    | 'fuchsia'
    | 'lime'
    | 'pink'
    | 'purple'
    | 'red'
    | 'rose'
    | 'sky'
    | 'teal'
    | 'violet';

export interface Onglet {
    /** Identifiant de l'onglet : ancre de l'adresse (antico.html#avk) et nom du fichier de contenu */
    id: string;
    /** Texte du bouton */
    libelle: string;
    /** Dégradé du bouton lorsqu'il est actif, par exemple « from-red-500 to-orange-500 » */
    actif: string;
    /** Couleurs au survol lorsqu'il est inactif, par exemple « hover:bg-red-100 hover:text-red-800 » */
    survol?: string;
}

export interface Fiche {
    /** Titre principal affiché en haut de la fiche */
    titre: string;
    seo: {
        /** Titre de l'onglet du navigateur et des moteurs de recherche */
        titre: string;
        description: string;
        /** Titre lors d'un partage (réseaux sociaux, messageries) */
        ogTitre: string;
        ogDescription?: string;
    };
    /** Date de la dernière mise à jour du contenu, affichée en bas de la fiche */
    miseAJour: DateIso;
    /** Carte de la fiche sur l'accueil */
    carte: {
        titre: string;
        sousTitre?: string;
        /** Pastille en haut à droite de la carte (S1, S3, S5) */
        semestre: string;
        couleur: CouleurCarte;
        /** Tracé SVG de l'icône (Phosphor, grille 256 × 256) */
        icone: string;
    };
    apparence: {
        /** Dégradé du titre principal */
        titre: string;
        /** Dégradé du nom de l'auteur dans l'en-tête */
        auteurEntete: string;
        /** Dégradé du nom de l'auteur dans le pied de page */
        auteurPied: string;
        /** Nombre de colonnes de la barre d'onglets, par exemple « grid-cols-4 md:grid-cols-8 » */
        grilleOnglets: string;
        /** En-tête qui reste en haut de l'écran au défilement (avec son niveau d'empilement), ou non */
        enteteCollant: 'z-10' | 'z-20' | 'z-50' | false;
        /** La fiche occupe au moins toute la hauteur de l'écran */
        pleineHauteur: boolean;
        /** Ombre intérieure sur le pied de page */
        ombrePied: boolean;
    };
    /** Onglets dans l'ordre d'affichage ; l'onglet « quiz » accueille le quiz */
    onglets: Onglet[];
    quiz: {
        /** Phrase d'introduction sous le titre « Quiz Interactif » */
        intro: string;
        /** Quiz centré dans une colonne plus étroite */
        centre: boolean;
        /** Dégradé du bouton « Recommencer » */
        bouton: string;
    };
}

export interface QuestionQuiz {
    question: string;
    /** Propositions (le HTML simple comme <strong> est accepté) */
    options: string[];
    /** Position de la bonne réponse dans « options » (0 pour la première) */
    correct: number;
    /** Explication affichée après la réponse */
    feedback?: string;
}
