// @ts-check
import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import globals from 'globals';

export default defineConfig(
    // Outils d'assistance locaux (non versionnés) : .claude/, .agent/, .agents/, docs/
    globalIgnores(['dist/', '.astro/', 'node_modules/', '.claude/', '.agent/', '.agents/', 'docs/']),
    js.configs.recommended,
    tseslint.configs.recommended,
    astro.configs.recommended,
    // Règles d'accessibilité (images sans alternative, rôles ARIA invalides, etc.)
    astro.configs['jsx-a11y-recommended'],
    {
        languageOptions: {
            globals: { ...globals.browser, ...globals.node },
        },
        rules: {
            eqeqeq: ['error', 'always', { null: 'ignore' }],
            'no-console': 'warn',
            '@typescript-eslint/no-non-null-assertion': 'off',
        },
    },
);
