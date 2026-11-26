// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
    site: 'https://pharma.eidos-simul.fr',

    // Les pages sont publiées sous la forme « antico.html » (et non « antico/index.html ») :
    // les adresses de la première version restent valides (liens partagés, favoris,
    // référencement, scores des quiz mémorisés par le navigateur).
    build: {
        format: 'file',
    },

    vite: {
        plugins: [tailwindcss()],
    },

    devToolbar: {
        enabled: false,
    },
});
