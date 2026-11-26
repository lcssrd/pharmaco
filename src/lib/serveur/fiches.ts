/**
 * Chargement des fiches (src/contenu/fiches/<identifiant>/) lors de la construction du site.
 *
 * Le contenu est vérifié ici : un onglet sans fichier, un fichier sans onglet, une question
 * mal formée ou une fiche absente de l'accueil arrêtent la construction avec un message clair,
 * plutôt que de publier une page incomplète.
 */
import type { Fiche, QuestionQuiz } from '../../types/fiche';
import type { Graphiques } from '../../types/graphiques';
import ordreAccueil from '../../contenu/ordre-accueil.json';
import { remplacerIcones } from './icones';

export const ONGLET_QUIZ = 'quiz';

export interface FicheChargee extends Fiche {
    /** Identifiant de la fiche, nom de la page (antico -> antico.html) */
    slug: string;
    /** HTML de chaque onglet de contenu, icônes intégrées */
    contenus: Record<string, string>;
    /** HTML source de chaque onglet, tel qu'écrit dans les fichiers (pour l'index de recherche) */
    sources: Record<string, string>;
    questions: QuestionQuiz[];
    graphiques: Graphiques;
}

const DOSSIER = '/src/contenu/fiches/';

const configurations = import.meta.glob<Fiche>('/src/contenu/fiches/*/fiche.ts', { eager: true, import: 'default' });
const fragments = import.meta.glob<string>('/src/contenu/fiches/*/*.html', {
    eager: true,
    query: '?raw',
    import: 'default',
});
const quiz = import.meta.glob<QuestionQuiz[]>('/src/contenu/fiches/*/quiz.json', { eager: true, import: 'default' });
const graphiques = import.meta.glob<Graphiques>('/src/contenu/fiches/*/graphiques.ts', {
    eager: true,
    import: 'default',
});

/** « /src/contenu/fiches/antico/avk.html » -> ['antico', 'avk'] */
const decouper = (chemin: string): [string, string] => {
    const [slug = '', fichier = ''] = chemin.slice(DOSSIER.length).split('/');
    return [slug, fichier.replace(/\.[^.]+$/, '')];
};

function verifierQuestions(slug: string, questions: QuestionQuiz[]): void {
    const vues = new Set<string>();
    questions.forEach((q, i) => {
        const ou = `${slug}/quiz.json, question ${i + 1}`;
        if (!q.question?.trim()) throw new Error(`${ou} : énoncé manquant`);
        if (vues.has(q.question)) throw new Error(`${ou} : énoncé en double (« ${q.question} »)`);
        vues.add(q.question);
        if (!Array.isArray(q.options) || q.options.length < 2)
            throw new Error(`${ou} : il faut au moins deux propositions`);
        if (!Number.isInteger(q.correct) || q.correct < 0 || q.correct >= q.options.length) {
            throw new Error(`${ou} : « correct » doit désigner une proposition (de 0 à ${q.options.length - 1})`);
        }
    });
}

function charger(): FicheChargee[] {
    const sourcesParFiche = new Map<string, Record<string, string>>();
    for (const [chemin, html] of Object.entries(fragments)) {
        const [slug, onglet] = decouper(chemin);
        sourcesParFiche.set(slug, { ...sourcesParFiche.get(slug), [onglet]: html });
    }

    const fiches = Object.entries(configurations).map(([chemin, fiche]): FicheChargee => {
        const [slug] = decouper(chemin);
        const sources = sourcesParFiche.get(slug) ?? {};
        const idsContenu = fiche.onglets.map((o) => o.id).filter((id) => id !== ONGLET_QUIZ);

        for (const id of idsContenu) {
            if (!(id in sources)) throw new Error(`Fiche ${slug} : l'onglet « ${id} » n'a pas de fichier ${id}.html`);
        }
        for (const id of Object.keys(sources)) {
            if (!idsContenu.includes(id))
                throw new Error(`Fiche ${slug} : ${id}.html ne correspond à aucun onglet de fiche.ts`);
        }
        if (new Set(fiche.onglets.map((o) => o.id)).size !== fiche.onglets.length) {
            throw new Error(`Fiche ${slug} : deux onglets ont le même identifiant`);
        }

        const questions = quiz[`${DOSSIER}${slug}/quiz.json`] ?? [];
        verifierQuestions(slug, questions);

        return {
            ...fiche,
            slug,
            sources,
            contenus: Object.fromEntries(Object.entries(sources).map(([id, html]) => [id, remplacerIcones(html)])),
            questions,
            graphiques: graphiques[`${DOSSIER}${slug}/graphiques.ts`] ?? {},
        };
    });

    // Ordre d'affichage : celui de l'accueil (src/contenu/ordre-accueil.json)
    const rang = (slug: string): number => {
        const i = ordreAccueil.indexOf(slug);
        if (i < 0) throw new Error(`Fiche ${slug} : à ajouter dans src/contenu/ordre-accueil.json`);
        return i;
    };
    for (const slug of ordreAccueil) {
        if (!fiches.some((f) => f.slug === slug))
            throw new Error(`ordre-accueil.json : la fiche « ${slug} » n'existe pas`);
    }
    return fiches.sort((a, b) => rang(a.slug) - rang(b.slug));
}

let cache: FicheChargee[] | undefined;

/** Toutes les fiches, dans l'ordre de l'accueil */
export const toutesLesFiches = (): FicheChargee[] => (cache ??= charger());
