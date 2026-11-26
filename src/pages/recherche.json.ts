/**
 * Index de la recherche de l'accueil : le texte de chaque onglet de chaque fiche (hors quiz).
 * Produit à la construction du site, il reste ainsi toujours à jour avec le contenu.
 */
import type { APIRoute } from 'astro';
import { construireIndexRecherche } from '../lib/serveur/index-recherche';
import { toutesLesFiches } from '../lib/serveur/fiches';

export const GET: APIRoute = () =>
    new Response(JSON.stringify(construireIndexRecherche(toutesLesFiches())), {
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
