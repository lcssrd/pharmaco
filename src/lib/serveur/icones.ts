/**
 * Icônes Lucide (licence ISC, https://lucide.dev), intégrées au HTML lors de la construction.
 *
 * Dans le contenu des fiches, une icône s'écrit <i data-lucide="nom" class="w-4 h-4"></i> ;
 * elle est remplacée ici par le SVG correspondant : aucun script à télécharger dans le
 * navigateur, et pas de décalage de la mise en page à l'affichage.
 */
import { icons } from 'lucide';

type NoeudIcone = [balise: string, attributs: Record<string, string | number>];

const ATTRIBUTS_SVG: Readonly<Record<string, string | number>> = {
    xmlns: 'http://www.w3.org/2000/svg',
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': 2,
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'aria-hidden': 'true',
};

const echapperAttribut = (valeur: string | number): string =>
    String(valeur).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const attributs = (valeurs: Record<string, string | number>): string =>
    Object.entries(valeurs)
        .map(([cle, valeur]) => ` ${cle}="${echapperAttribut(valeur)}"`)
        .join('');

const enPascalCase = (nom: string): string =>
    nom
        .split('-')
        .map((m) => m.charAt(0).toUpperCase() + m.slice(1))
        .join('');

/** Code SVG de l'icône ; une icône inconnue arrête la construction (faute de frappe probable) */
export function svgIcone(nom: string, attributsSupplementaires: Record<string, string> = {}): string {
    const noeuds = (icons as Record<string, NoeudIcone[] | undefined>)[enPascalCase(nom)];
    if (!noeuds) {
        throw new Error(`Icône Lucide inconnue : « ${nom} » (liste : https://lucide.dev/icons)`);
    }
    const { class: classe = '', ...autres } = attributsSupplementaires;
    const racine = { ...ATTRIBUTS_SVG, ...autres, class: `lucide lucide-${nom} ${classe}`.trim() };
    const enfants = noeuds.map(([balise, valeurs]) => `<${balise}${attributs(valeurs)}></${balise}>`).join('');
    return `<svg${attributs(racine)}>${enfants}</svg>`;
}

const BALISE_ICONE = /<i\s([^>]*?)>\s*<\/i>/g;
const ATTRIBUT = /([\w:-]+)="([^"]*)"/g;

/** Remplace chaque <i data-lucide="…"></i> du HTML par l'icône SVG */
export function remplacerIcones(html: string): string {
    return html.replace(BALISE_ICONE, (balise, brut: string) => {
        const valeurs = Object.fromEntries([...brut.matchAll(ATTRIBUT)].map(([, cle, valeur]) => [cle, valeur]));
        const { 'data-lucide': nom, ...autres } = valeurs;
        return nom ? svgIcone(nom, autres as Record<string, string>) : balise;
    });
}
