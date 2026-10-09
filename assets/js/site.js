/*
 * Script commun à toutes les pages du site.
 *
 *  - Thème clair / sombre (bouton dans l'en-tête, choix mémorisé)
 *  - Fiches : navigation par onglets avec l'onglet dans l'URL (antico.html#avk),
 *    accessibilité clavier, quiz (progression mémorisée, « refaire mes erreurs »),
 *    impression de toute la fiche
 *  - Accueil : recherche dans toutes les fiches, scores des quiz sur les cartes
 *  - Hors ligne : enregistrement du service worker (sw.js)
 *
 * Les données propres à chaque fiche (questions du quiz, graphiques) restent
 * dans le <script> en bas de la fiche.
 */
(() => {
    'use strict';

    const FICHE = decodeURIComponent(location.pathname.split('/').pop() || 'index.html').replace(/\.html$/, '') || 'index';
    const CLE_THEME = 'pharmaco:theme';
    const cleQuiz = (fiche) => `pharmaco:quiz:${fiche}`;

    // localStorage peut être indisponible (navigation privée, stockage bloqué) :
    // le site doit fonctionner normalement, simplement sans mémoire.
    const stockage = {
        lire(cle) {
            try {
                return JSON.parse(localStorage.getItem(cle));
            } catch {
                return null;
            }
        },
        ecrire(cle, valeur) {
            try {
                localStorage.setItem(cle, JSON.stringify(valeur));
            } catch {
                /* stockage indisponible */
            }
        },
    };

    const echapper = (texte) => String(texte).replace(/[&<>"']/g, (c) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    })[c]);

    const melanger = (tableau) => {
        const copie = tableau.slice();
        for (let i = copie.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copie[i], copie[j]] = [copie[j], copie[i]];
        }
        return copie;
    };

    // ==================================================================
    // Thème clair / sombre
    // ==================================================================
    // Le thème initial est posé par le petit script en tête de chaque page
    // (avant l'affichage, pour éviter un flash blanc).

    const racine = document.documentElement;
    const themeActuel = () => (racine.dataset.theme === 'dark' ? 'dark' : 'light');

    function appliquerTheme(theme) {
        racine.dataset.theme = theme;
        document.querySelectorAll('[data-action="theme"]').forEach((bouton) => {
            const sombre = theme === 'dark';
            bouton.setAttribute('aria-pressed', String(sombre));
            bouton.setAttribute('aria-label', sombre ? 'Passer en mode clair' : 'Passer en mode sombre');
            bouton.title = bouton.getAttribute('aria-label');
        });
        mettreAJourGraphiques();
    }

    // Couleurs des graphiques Chart.js selon le thème
    function mettreAJourGraphiques() {
        if (!window.Chart) return;
        const sombre = themeActuel() === 'dark';
        const texte = sombre ? '#cbd5e1' : '#475569';
        const grille = sombre ? 'rgba(148, 163, 184, 0.25)' : 'rgba(0, 0, 0, 0.1)';
        const fondGraduations = sombre ? 'rgba(15, 23, 42, 0.75)' : 'rgba(255, 255, 255, 0.75)';
        // Graphiques créés ensuite
        Chart.defaults.color = texte;
        Chart.defaults.borderColor = grille;
        // Graphiques déjà affichés : Chart.js fige les options des axes à leur création
        Object.values(Chart.instances || {}).forEach((graphique) => {
            const options = graphique.config.options;
            options.scales ||= {};
            Object.keys(graphique.scales).forEach((id) => {
                const echelle = (options.scales[id] ||= {});
                echelle.ticks = { ...echelle.ticks, color: texte, backdropColor: fondGraduations };
                echelle.pointLabels = { ...echelle.pointLabels, color: texte };
                echelle.grid = { ...echelle.grid, color: grille };
                echelle.angleLines = { ...echelle.angleLines, color: grille };
            });
            options.plugins ||= {};
            options.plugins.legend = { ...options.plugins.legend, labels: { ...options.plugins.legend?.labels, color: texte } };
            graphique.update('none');
        });
    }

    document.addEventListener('click', (evenement) => {
        if (evenement.target.closest('[data-action="theme"]')) {
            const nouveau = themeActuel() === 'dark' ? 'light' : 'dark';
            stockage.ecrire(CLE_THEME, nouveau);
            appliquerTheme(nouveau);
        } else if (evenement.target.closest('[data-action="imprimer"]')) {
            window.print();
        }
    });

    // Sans choix explicite, on suit le réglage du système
    const preferenceSysteme = window.matchMedia?.('(prefers-color-scheme: dark)');
    preferenceSysteme?.addEventListener?.('change', (e) => {
        if (!stockage.lire(CLE_THEME)) appliquerTheme(e.matches ? 'dark' : 'light');
    });

    appliquerTheme(themeActuel());
    // Les graphiques des fiches sont créés au chargement de la page (DOMContentLoaded)
    document.addEventListener('DOMContentLoaded', mettreAJourGraphiques);

    // ==================================================================
    // Fiches : navigation par onglets
    // ==================================================================

    const boutonsOnglets = [...document.querySelectorAll('.nav-btn[data-page]')];
    const idsOnglets = boutonsOnglets.map((b) => b.dataset.page);
    let ongletActif = null;

    // Lit l'onglet demandé dans l'URL (#avk). Ignore une éventuelle directive
    // de surlignage de texte (#avk:~:text=...) ajoutée par la recherche.
    const ongletDepuisUrl = () => {
        const brut = location.hash.slice(1).split(':~:')[0];
        try {
            return decodeURIComponent(brut);
        } catch {
            return brut;
        }
    };

    function afficherOnglet(id, { historique = 'ajouter', defiler = true } = {}) {
        if (!idsOnglets.includes(id)) id = idsOnglets[0];
        if (id === ongletActif) return;
        ongletActif = id;

        idsOnglets.forEach((idPage) => {
            document.getElementById(idPage)?.classList.toggle('hidden', idPage !== id);
        });

        boutonsOnglets.forEach((bouton) => {
            const actif = bouton.dataset.page === id;
            const classes = [bouton.dataset.classesBase];
            if (actif) classes.push('bg-gradient-to-r text-white shadow-md', bouton.dataset.actif || 'from-slate-500 to-gray-700');
            else classes.push('text-slate-800', bouton.dataset.survol || '');
            bouton.className = classes.join(' ').trim();
            bouton.setAttribute('aria-selected', String(actif));
            bouton.tabIndex = actif ? 0 : -1;
        });

        const url = `#${encodeURIComponent(id)}`;
        if (historique === 'ajouter') history.pushState(null, '', url);
        else if (historique === 'remplacer') history.replaceState(null, '', url);

        if (defiler) window.scrollTo({ top: 0 });
    }

    if (boutonsOnglets.length) {
        const liste = boutonsOnglets[0].parentElement;
        liste.setAttribute('role', 'tablist');
        liste.setAttribute('aria-label', 'Sections de la fiche');

        boutonsOnglets.forEach((bouton) => {
            bouton.type = 'button';
            bouton.dataset.classesBase = bouton.className.replace(/\btext-slate-800\b/, '').replace(/\s+/g, ' ').trim();
            bouton.id ||= `onglet-${bouton.dataset.page}`;
            bouton.setAttribute('role', 'tab');
            bouton.setAttribute('aria-controls', bouton.dataset.page);
            const panneau = document.getElementById(bouton.dataset.page);
            panneau?.setAttribute('role', 'tabpanel');
            panneau?.setAttribute('aria-labelledby', bouton.id);
            bouton.addEventListener('click', () => afficherOnglet(bouton.dataset.page));
        });

        // Flèches gauche/droite, Début/Fin pour passer d'un onglet à l'autre
        liste.addEventListener('keydown', (e) => {
            const index = boutonsOnglets.indexOf(document.activeElement);
            if (index < 0) return;
            const cibles = {
                ArrowRight: index + 1,
                ArrowLeft: index - 1,
                Home: 0,
                End: boutonsOnglets.length - 1,
            };
            if (!(e.key in cibles)) return;
            e.preventDefault();
            const n = boutonsOnglets.length;
            const suivant = boutonsOnglets[(cibles[e.key] + n) % n];
            suivant.focus();
            afficherOnglet(suivant.dataset.page);
        });

        // Bouton « Retour » du navigateur, lien direct vers un onglet. Les autres ancres
        // (comme #contenu du lien « Aller au contenu ») ne changent pas d'onglet.
        const suivreUrl = () => {
            const id = ongletDepuisUrl();
            if (!id || idsOnglets.includes(id)) afficherOnglet(id, { historique: 'aucun' });
        };
        window.addEventListener('popstate', suivreUrl);
        window.addEventListener('hashchange', suivreUrl);

        const initial = ongletDepuisUrl();
        afficherOnglet(initial, { historique: idsOnglets.includes(initial) || !initial ? 'aucun' : 'remplacer', defiler: false });

        // Avec antico.html#avk, le navigateur fait défiler jusqu'à la section, qui se retrouve
        // sous l'en-tête : on revient en haut de page. (Un passage surligné depuis la recherche
        // n'est pas concerné : la section n'est alors pas collée en haut de l'écran.)
        window.addEventListener('load', () => requestAnimationFrame(() => {
            const haut = document.getElementById(ongletActif)?.getBoundingClientRect().top;
            if (haut !== undefined && Math.abs(haut) < 2) window.scrollTo({ top: 0, behavior: 'instant' });
        }));

        // Compatibilité avec d'éventuels onclick="showPage('...')" dans le contenu
        window.showPage = (id) => afficherOnglet(id);
    }

    // ==================================================================
    // Fiches : quiz
    // ==================================================================

    const ICONE_OK = '<svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>';
    const ICONE_KO = '<svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>';

    // Identifiant stable d'une question (indépendant de son ordre dans la liste)
    const idQuestion = (question) => {
        let h = 0;
        for (const c of question.question) h = (Math.imul(31, h) + c.charCodeAt(0)) | 0;
        return (h >>> 0).toString(36);
    };

    const mesErreurs = (n) => (n > 1 ? `mes ${n} erreurs` : 'mon erreur');

    const dateLisible = (iso) => new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

    function initialiserQuiz(questions) {
        const conteneur = document.getElementById('qcm-container');
        const score = document.getElementById('quiz-score');
        const boutonRecommencer = document.getElementById('reset-button');
        if (!conteneur || !score || !questions.length) return;

        score.setAttribute('aria-live', 'polite');

        // Bilan des tentatives précédentes, au-dessus des questions
        const bilan = document.createElement('div');
        bilan.id = 'quiz-bilan';
        conteneur.before(bilan);

        // Bouton « Refaire mes erreurs », à côté de « Recommencer »
        const actions = document.createElement('div');
        actions.className = 'flex flex-wrap gap-3';
        const boutonErreurs = document.createElement('button');
        boutonErreurs.type = 'button';
        boutonErreurs.className = 'bg-white border-2 border-slate-300 text-slate-800 font-semibold py-3 px-6 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200 transform hidden';
        if (boutonRecommencer) {
            boutonRecommencer.type = 'button';
            boutonRecommencer.textContent = 'Recommencer tout le quiz';
            boutonRecommencer.before(actions);
            actions.append(boutonErreurs, boutonRecommencer);
            boutonRecommencer.addEventListener('click', () => demarrer('complet'));
        } else {
            score.after(actions);
            actions.append(boutonErreurs);
        }
        boutonErreurs.addEventListener('click', () => demarrer('erreurs'));

        let serie = [];
        let mode = 'complet';

        const parId = new Map(questions.map((q) => [idQuestion(q), q]));
        const erreursMemorisees = () => (stockage.lire(cleQuiz(FICHE))?.erreurs || []).filter((id) => parId.has(id));

        function afficherBilan() {
            const donnees = stockage.lire(cleQuiz(FICHE));
            const erreurs = erreursMemorisees();
            if (!donnees || donnees.meilleur == null) {
                bilan.innerHTML = '';
                return;
            }
            const boutonRevoir = erreurs.length && mode === 'complet' && !conteneur.querySelector('.answered')
                ? `<button type="button" data-revoir class="font-semibold underline underline-offset-2 hover:no-underline text-indigo-700">Revoir ${mesErreurs(erreurs.length)}</button>`
                : '';
            bilan.innerHTML = `
                <div class="mb-6 p-4 rounded-xl bg-white border border-slate-200 text-sm text-slate-700 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span>🏆 Meilleur score : <strong>${donnees.meilleur} / ${donnees.total}</strong></span>
                    ${donnees.date ? `<span class="text-slate-500">Dernière tentative le ${dateLisible(donnees.date)}</span>` : ''}
                    ${boutonRevoir}
                </div>`;
            bilan.querySelector('[data-revoir]')?.addEventListener('click', () => demarrer('erreurs'));
        }

        function demarrer(nouveauMode) {
            const source = nouveauMode === 'erreurs' ? erreursMemorisees().map((id) => parId.get(id)) : questions;
            if (!source.length && nouveauMode === 'erreurs') return demarrer('complet');
            mode = nouveauMode;
            serie = melanger(source).map((question) => ({ question, reponse: null }));

            conteneur.innerHTML = serie.map(({ question }, k) => {
                const propositions = melanger(question.options.map((texte, index) => ({ texte, index })))
                    .map(({ texte, index }) => `<button type="button" class="qcm-option w-full text-left p-4 rounded-xl bg-white border-2 border-slate-200 hover:bg-slate-100 hover:border-slate-300 transition-all duration-200" data-index="${index}">${texte}</button>`)
                    .join('');
                return `
                    <div class="qcm-question bg-slate-100/70 border border-slate-200/80 p-6 rounded-2xl shadow-lg" data-k="${k}">
                        <p class="font-semibold text-lg text-slate-800 mb-4">${k + 1}. ${question.question}</p>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">${propositions}</div>
                        <div class="qcm-feedback mt-4 text-sm font-medium" aria-live="polite"></div>
                    </div>`;
            }).join('');

            boutonErreurs.classList.add('hidden');
            boutonRecommencer?.classList.add('invisible');
            score.textContent = mode === 'erreurs'
                ? `Révision de vos erreurs : 0 / ${serie.length}`
                : `Prêt ? 0 / ${serie.length}`;
            afficherBilan();
        }

        conteneur.addEventListener('click', (e) => {
            const option = e.target.closest('.qcm-option');
            const carte = option?.closest('.qcm-question');
            if (!carte || carte.classList.contains('answered')) return;
            carte.classList.add('answered');

            const element = serie[Number(carte.dataset.k)];
            const { question } = element;
            const juste = Number(option.dataset.index) === question.correct;
            element.reponse = juste;

            const retour = carte.querySelector('.qcm-feedback');
            const explication = question.feedback || '';
            if (juste) {
                option.classList.add('correct');
                retour.innerHTML = `<div class="text-emerald-700 p-3 bg-emerald-100 rounded-lg flex items-start gap-2">${ICONE_OK}<div><b class="font-bold">Bravo !</b> ${explication}</div></div>`;
            } else {
                option.classList.add('incorrect');
                carte.querySelector(`[data-index="${question.correct}"]`)?.classList.add('correct');
                retour.innerHTML = `<div class="text-red-700 p-3 bg-red-100 rounded-lg flex items-start gap-2">${ICONE_KO}<div><b class="font-bold">Dommage.</b> ${explication}</div></div>`;
            }
            carte.querySelectorAll('.qcm-option').forEach((b) => { b.disabled = true; });
            mettreAJourScore();
        });

        function mettreAJourScore() {
            const repondues = serie.filter((x) => x.reponse !== null);
            const bonnes = repondues.filter((x) => x.reponse).length;
            if (repondues.length < serie.length) {
                score.textContent = `${mode === 'erreurs' ? 'Révision de vos erreurs' : 'Votre score'} : ${bonnes} / ${repondues.length}`;
                if (repondues.length === 1) afficherBilan();
                return;
            }
            terminer(bonnes);
        }

        function terminer(bonnes) {
            const total = serie.length;
            const erreurs = serie.filter((x) => !x.reponse).map((x) => idQuestion(x.question));
            const donnees = stockage.lire(cleQuiz(FICHE)) || {};

            if (mode === 'complet') {
                donnees.meilleur = Math.max(donnees.total === total ? (donnees.meilleur ?? 0) : 0, bonnes);
                donnees.total = total;
                donnees.dernier = bonnes;
            }
            donnees.date = new Date().toISOString();
            donnees.erreurs = erreurs;
            stockage.ecrire(cleQuiz(FICHE), donnees);

            const pourcentage = (bonnes / total) * 100;
            const message = pourcentage >= 80 ? 'Excellent travail ! 🎉'
                : pourcentage >= 50 ? 'Pas mal, continuez à réviser ! 💪'
                    : 'Encore un effort ! 📚';
            score.textContent = mode === 'erreurs'
                ? `Erreurs corrigées : ${bonnes} / ${total} - ${erreurs.length ? message : 'Tout est acquis ! 🎉'}`
                : `Score final : ${bonnes} / ${total} - ${message}`;

            if (erreurs.length) {
                boutonErreurs.textContent = `Refaire ${mesErreurs(erreurs.length)}`;
                boutonErreurs.classList.remove('hidden');
            }
            boutonRecommencer?.classList.remove('invisible');
            afficherBilan();
        }

        // Compatibilité avec l'ancien bouton onclick="resetQuiz()"
        window.resetQuiz = () => demarrer('complet');

        demarrer('complet');
    }

    // quizData est déclaré par le script de la fiche (const globale)
    if (typeof quizData !== 'undefined' && Array.isArray(quizData)) {
        initialiserQuiz(quizData);
    }

    // ==================================================================
    // Fiches : impression et vidéos
    // ==================================================================

    // Les vidéos ne s'impriment pas : on affiche leur lien à la place
    document.querySelectorAll('iframe[src*="youtube.com/embed/"]').forEach((video) => {
        const id = video.src.split('/embed/')[1]?.split(/[?#]/)[0];
        if (!id) return;
        const cadre = video.parentElement.matches('main, .page') ? video : video.parentElement;
        cadre.classList.add('cadre-video');
        const lien = document.createElement('p');
        lien.className = 'seulement-impression text-sm';
        lien.textContent = `Vidéo : https://youtu.be/${id}`;
        cadre.after(lien);
    });

    // Avant l'impression : thème clair, toutes les sections visibles, graphiques redimensionnés
    // (un graphique d'un onglet jamais ouvert n'a pas encore de taille). Une animation en cours
    // reporterait le redimensionnement après l'impression : on l'arrête d'abord.
    const redimensionnerGraphiques = () => Object.values(window.Chart?.instances || {}).forEach((graphique) => {
        graphique.stop();
        graphique.resize();
    });
    let themeAvantImpression = null;
    window.addEventListener('beforeprint', () => {
        themeAvantImpression = themeActuel();
        racine.classList.add('impression');
        if (themeAvantImpression === 'dark') appliquerTheme('light');
        redimensionnerGraphiques();
    });
    window.addEventListener('afterprint', () => {
        racine.classList.remove('impression');
        if (themeAvantImpression === 'dark') appliquerTheme('dark');
        redimensionnerGraphiques();
    });

    // ==================================================================
    // Accueil : scores des quiz sur les cartes
    // ==================================================================

    document.querySelectorAll('[data-fiche]').forEach((carte) => {
        const donnees = stockage.lire(cleQuiz(carte.dataset.fiche));
        if (!donnees || donnees.meilleur == null || !donnees.total) return;
        const pourcentage = (donnees.meilleur / donnees.total) * 100;
        const couleur = pourcentage >= 80 ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
            : pourcentage >= 50 ? 'bg-amber-100 text-amber-800 border-amber-300'
                : 'bg-rose-100 text-rose-800 border-rose-300';
        const pastille = document.createElement('p');
        pastille.className = `inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full border text-[11px] font-semibold ${couleur}`;
        pastille.textContent = `Quiz : ${donnees.meilleur} / ${donnees.total}`;
        pastille.title = 'Votre meilleur score au quiz de cette fiche';
        carte.querySelector('.flex-grow')?.append(pastille);
    });

    // ==================================================================
    // Accueil : recherche dans toutes les fiches
    // ==================================================================

    // Texte en minuscules, sans accents (« Cœur » -> « coeur »). « positions » donne, pour
    // chaque caractère normalisé, sa position dans le texte d'origine (pour surligner).
    const REMPLACEMENTS = { 'œ': 'oe', 'æ': 'ae', '’': "'", ' ': ' ', ' ': ' ' };
    function normaliserAvecPositions(texte) {
        let n = '';
        const positions = [];
        for (let i = 0; i < texte.length; i++) {
            let c = texte[i].normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
            c = REMPLACEMENTS[c] ?? c;
            for (let k = 0; k < c.length; k++) {
                n += c[k];
                positions.push(i);
            }
        }
        positions.push(texte.length);
        return { n, positions };
    }
    const normaliser = (texte) => normaliserAvecPositions(texte).n;

    // Étend [debut, fin[ aux mots entiers (le surlignage du navigateur ne trouve que des mots entiers)
    const LETTRE = /[\p{L}\p{N}]/u;
    function motsEntiers(texte, debut, fin) {
        while (debut > 0 && LETTRE.test(texte[debut - 1])) debut--;
        while (fin < texte.length && LETTRE.test(texte[fin])) fin++;
        return texte.slice(debut, fin);
    }

    const champ = document.getElementById('champ-recherche');
    const zoneResultats = document.getElementById('resultats-recherche');

    if (champ && zoneResultats) {
        let index = null;
        let chargement = null;

        const chargerIndex = () => {
            chargement ||= fetch('assets/data/recherche.json')
                .then((r) => r.json())
                .then((donnees) => {
                    index = donnees.map((e) => {
                        const { n, positions } = normaliserAvecPositions(e.x);
                        return { ...e, xn: n, positions, en: normaliser(`${e.n} ${e.l}`) };
                    });
                })
                .catch(() => {
                    chargement = null;
                });
            return chargement;
        };

        // Extrait du texte d'origine autour de [position, finMot[, avec le passage surligné
        const extrait = (texte, position, finMot) => {
            const debut = position > 60 ? texte.lastIndexOf(' ', position - 60) + 1 : 0;
            const finBrute = finMot + 90;
            const espace = finBrute < texte.length ? texte.indexOf(' ', finBrute) : -1;
            const fin = espace < 0 ? texte.length : espace;
            return `${debut > 0 ? '… ' : ''}${echapper(texte.slice(debut, position))}<mark>${echapper(texte.slice(position, finMot))}</mark>${echapper(texte.slice(finMot, fin))}${fin < texte.length ? ' …' : ''}`;
        };

        function rechercher() {
            const requete = champ.value.trim();
            const mots = normaliser(requete).split(/\s+/).filter((m) => m.length >= 2);
            if (!mots.length) {
                zoneResultats.classList.add('hidden');
                zoneResultats.innerHTML = '';
                return;
            }
            if (!index) {
                zoneResultats.classList.remove('hidden');
                zoneResultats.innerHTML = '<p class="text-sm text-slate-500 px-1">Chargement…</p>';
                chargerIndex().then(() => index && rechercher());
                return;
            }

            const resultats = [];
            for (const entree of index) {
                if (!mots.every((m) => entree.xn.includes(m) || entree.en.includes(m))) continue;
                let points = 0;
                for (const m of mots) {
                    points += entree.xn.split(m).length - 1;
                    if (entree.en.includes(m)) points += 20;
                }
                resultats.push({ entree, points });
            }
            resultats.sort((a, b) => b.points - a.points);

            zoneResultats.classList.remove('hidden');
            if (!resultats.length) {
                zoneResultats.innerHTML = `<p class="text-sm text-slate-600 px-1">Aucun résultat pour « ${echapper(requete)} ».</p>`;
                return;
            }

            const affiches = resultats.slice(0, 12);
            zoneResultats.innerHTML = `
                <p class="text-xs text-slate-500 px-1 mb-2">${resultats.length} résultat${resultats.length > 1 ? 's' : ''}${resultats.length > affiches.length ? ` (les ${affiches.length} plus pertinents)` : ''}</p>
                <ul class="grid gap-2">${affiches.map(({ entree }) => {
                    const p = entree.xn.indexOf(mots[0]);
                    const debut = p >= 0 ? entree.positions[p] : -1;
                    const fin = p >= 0 ? entree.positions[p + mots[0].length - 1] + 1 : -1;
                    // Le fragment #:~:text= fait surligner le passage par le navigateur
                    const fragment = p >= 0 ? `:~:text=${encodeURIComponent(motsEntiers(entree.x, debut, fin))}` : '';
                    return `
                    <li>
                        <a href="${entree.f}.html#${encodeURIComponent(entree.o)}${fragment}" class="resultat-recherche block p-3 rounded-xl border border-slate-200 bg-white hover:border-sky-400 hover:shadow-md transition">
                            <span class="block text-sm font-bold text-slate-800">${echapper(entree.n)} <span class="text-slate-400">›</span> ${echapper(entree.l)}</span>
                            ${p >= 0 ? `<span class="block text-xs text-slate-600 mt-1 leading-relaxed">${extrait(entree.x, debut, fin)}</span>` : ''}
                        </a>
                    </li>`;
                }).join('')}</ul>`;
        }

        let minuterie;
        champ.addEventListener('focus', chargerIndex, { once: true });
        champ.addEventListener('input', () => {
            clearTimeout(minuterie);
            minuterie = setTimeout(rechercher, 120);
        });
        champ.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const premier = zoneResultats.querySelector('a');
                if (premier) location.href = premier.href;
            } else if (e.key === 'Escape') {
                champ.value = '';
                rechercher();
            }
        });
        if (champ.value) rechercher();
    }

    // ==================================================================
    // Application installable et consultation hors ligne
    // ==================================================================

    const boutonInstaller = document.querySelector('[data-action="installer"]');
    let invitationInstallation = null;
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        invitationInstallation = e;
        boutonInstaller?.classList.remove('hidden');
    });
    boutonInstaller?.addEventListener('click', async () => {
        if (!invitationInstallation) return;
        invitationInstallation.prompt();
        await invitationInstallation.userChoice;
        invitationInstallation = null;
        boutonInstaller.classList.add('hidden');
    });

    // En local, le service worker n'est activé qu'avec ?sw dans l'adresse (pour le tester),
    // afin de ne pas servir d'anciennes copies pendant qu'on modifie les fiches.
    const enLigne = location.protocol === 'https:';
    const testLocal = ['localhost', '127.0.0.1'].includes(location.hostname) && new URLSearchParams(location.search).has('sw');
    if ('serviceWorker' in navigator && (enLigne || testLocal)) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js').catch(() => { /* hors ligne indisponible */ });
        });
    }
})();
