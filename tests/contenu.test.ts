/**
 * Vérifie le contenu des fiches (src/contenu/fiches/) : à lancer après chaque modification
 * avec « npm test ». Le chargement lui-même contrôle onglets, fichiers et questions.
 */
import { describe, expect, it } from 'vitest';
import { toutesLesFiches, ONGLET_QUIZ } from '../src/lib/serveur/fiches';
import { construireIndexRecherche } from '../src/lib/serveur/index-recherche';
import { remplacerIcones, svgIcone } from '../src/lib/serveur/icones';

const fiches = toutesLesFiches();

describe('fiches', () => {
    it('sont toutes chargées', () => {
        expect(fiches.length).toBe(13);
    });

    describe.each(fiches.map((f) => [f.slug, f] as const))('%s', (_, fiche) => {
        it('a un onglet quiz et des questions', () => {
            expect(fiche.onglets.some((o) => o.id === ONGLET_QUIZ)).toBe(true);
            expect(fiche.questions.length).toBeGreaterThan(0);
        });

        it('a une date de mise à jour valide', () => {
            expect(Number.isNaN(Date.parse(fiche.miseAJour))).toBe(false);
        });

        it("n'a plus d'icône à remplacer ni de script dans son contenu", () => {
            for (const html of Object.values(fiche.contenus)) {
                expect(html).not.toMatch(/data-lucide=/);
                expect(html).not.toMatch(/<script/i);
            }
        });

        it('a un seul titre principal (le <h1> est dans l’en-tête)', () => {
            for (const html of Object.values(fiche.contenus)) expect(html).not.toMatch(/<h1[\s>]/);
        });

        it('a des graphiques qui correspondent à des <canvas>', () => {
            const html = Object.values(fiche.contenus).join('');
            for (const id of Object.keys(fiche.graphiques)) expect(html).toContain(`<canvas id="${id}"`);
        });
    });
});

describe('index de recherche', () => {
    it('contient chaque onglet de contenu', () => {
        const index = construireIndexRecherche(fiches);
        const attendu = fiches.reduce((n, f) => n + f.onglets.filter((o) => o.id !== ONGLET_QUIZ).length, 0);
        expect(index).toHaveLength(attendu);
        expect(index.every((e) => e.x.length > 0)).toBe(true);
    });
});

describe('icônes', () => {
    it('produit le SVG Lucide avec les classes et attributs du contenu', () => {
        const svg = svgIcone('pill', { class: 'w-4 h-4' });
        expect(svg).toMatch(/^<svg xmlns="http:\/\/www.w3.org\/2000\/svg" width="24" height="24"/);
        expect(svg).toContain('class="lucide lucide-pill w-4 h-4"');
        expect(svg).toContain('aria-hidden="true"');
    });

    it('remplace les balises <i data-lucide>', () => {
        expect(remplacerIcones('<p><i data-lucide="pill" class="w-4"></i> Texte</p>')).toMatch(
            /^<p><svg [^>]+>.*<\/svg> Texte<\/p>$/,
        );
    });

    it('signale une icône inconnue', () => {
        expect(() => svgIcone('icone-qui-n-existe-pas')).toThrow(/inconnue/);
    });
});
