/**
 * JSON destiné à un <script type="application/json"> : « < » est échappé pour qu'un texte
 * contenant « </script> » ne puisse pas refermer la balise (le JSON reste identique une fois lu).
 */
export const enJsonPourHtml = (valeur: unknown): string => JSON.stringify(valeur).replace(/</g, '\\u003c');
