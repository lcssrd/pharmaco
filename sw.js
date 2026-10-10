/*
 * Service worker : permet de consulter les fiches sans connexion
 * (dans le train, à l'hôpital...) une fois le site visité une première fois.
 *
 *  - Fichiers du site : on essaie d'abord le réseau (pour toujours avoir la dernière version,
 *    avec un HTML et un CSS/JS cohérents), puis la copie enregistrée si on est hors ligne
 *    ou si le réseau met trop de temps à répondre.
 *  - Bibliothèques et polices externes (versions figées) : enregistrées au premier chargement.
 *  - Statistiques de visite, vidéos YouTube : jamais mises en cache.
 *  - Le PDF de cours (plusieurs Mo) n'est pas préchargé : il est enregistré quand on l'ouvre.
 */

// <genere> (par scripts/build.mjs, ne pas modifier à la main)
const VERSION = 'e4c86f4d7961';
const FICHIERS = [
    "./",
    "antalgiques.html",
    "antiarythm.html",
    "anticancer.html",
    "antico.html",
    "antidiabetiques.html",
    "antihta.html",
    "antiinflam.html",
    "anxiolytiques.html",
    "asthme.html",
    "digestif.html",
    "hypolipemiants.html",
    "immunosuppresseurs.html",
    "index.html",
    "psychotropes.html",
    "manifest.webmanifest",
    "assets/css/site.css",
    "assets/js/icones.js",
    "assets/js/site.js",
    "assets/data/recherche.json",
    "assets/icones/apple-touch-icon.png",
    "assets/icones/favicon-32.png",
    "assets/icones/favicon.svg",
    "assets/icones/icone-192.png",
    "assets/icones/icone-512.png",
    "assets/icones/icone-maskable-512.png",
    "atherose.jpg",
    "chambre.jpg",
    "diskus.jpg",
    "doseur.jpg",
    "turbu.jpg"
];
// </genere>

const CACHE = `pharmaco-${VERSION}`;
const CACHE_EXTERNE = 'pharmaco-externe-v1';
const HOTES_EXTERNES = ['cdn.jsdelivr.net', 'unpkg.com', 'fonts.googleapis.com', 'fonts.gstatic.com'];
const RESSOURCES_EXTERNES = [
    'https://cdn.jsdelivr.net/npm/chart.js@4.5.1/dist/chart.umd.min.js',
    'https://unpkg.com/@phosphor-icons/web@2.1.2/src/bold/style.css',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap',
];

self.addEventListener('install', (evenement) => {
    evenement.waitUntil((async () => {
        const cache = await caches.open(CACHE);
        // cache: 'reload' : on ignore le cache HTTP du navigateur pour enregistrer la version en ligne
        await cache.addAll(FICHIERS.map((f) => new Request(f, { cache: 'reload' })));
        // Les ressources externes sont un bonus : un échec ne bloque pas l'installation
        const externe = await caches.open(CACHE_EXTERNE);
        await Promise.all(RESSOURCES_EXTERNES.map(async (url) => {
            if (await externe.match(url)) return;
            try {
                const reponse = await fetch(url, { mode: 'cors' });
                if (reponse.ok) await externe.put(url, reponse);
            } catch {
                /* hors ligne pendant l'installation */
            }
        }));
        await self.skipWaiting();
    })());
});

self.addEventListener('activate', (evenement) => {
    evenement.waitUntil((async () => {
        const noms = await caches.keys();
        await Promise.all(noms
            .filter((nom) => nom.startsWith('pharmaco-') && nom !== CACHE && nom !== CACHE_EXTERNE)
            .map((nom) => caches.delete(nom)));
        await self.clients.claim();
    })());
});

// Délai au-delà duquel on sert la copie enregistrée (réseau très lent, wifi d'hôpital...)
const DELAI_RESEAU = 4000;

async function trouverEnCache(cache, requete) {
    const url = new URL(requete.url);
    return (await cache.match(requete, { ignoreSearch: true }))
        // GitHub Pages sert aussi les pages sans extension (antico -> antico.html)
        || (requete.mode === 'navigate' && (await cache.match(`${url.pathname}.html`)))
        || (requete.mode === 'navigate' && (await cache.match('index.html')))
        || null;
}

async function reseauDAbord(requete) {
    const cache = await caches.open(CACHE);
    const reseau = fetch(requete).then((reponse) => {
        if (reponse.status === 200) cache.put(requete, reponse.clone());
        return reponse;
    });
    reseau.catch(() => { /* hors ligne : géré ci-dessous */ });
    const delai = new Promise((resoudre) => setTimeout(resoudre, DELAI_RESEAU, null));
    const reponse = await Promise.race([reseau, delai]).catch(() => null);
    // Hors ligne, ou réseau trop lent : copie enregistrée si on l'a, sinon on attend le réseau
    return reponse || (await trouverEnCache(cache, requete)) || reseau;
}

async function cacheDAbord(requete) {
    const cache = await caches.open(CACHE_EXTERNE);
    const enCache = await cache.match(requete);
    if (enCache) return enCache;
    const reponse = await fetch(requete);
    if (reponse.status === 200 || reponse.type === 'opaque') cache.put(requete, reponse.clone());
    return reponse;
}

self.addEventListener('fetch', (evenement) => {
    const { request: requete } = evenement;
    if (requete.method !== 'GET' || requete.headers.has('range')) return;
    const url = new URL(requete.url);

    if (url.origin === self.location.origin) {
        evenement.respondWith(reseauDAbord(requete));
    } else if (HOTES_EXTERNES.includes(url.hostname)) {
        evenement.respondWith(cacheDAbord(requete));
    }
    // Tout le reste (statistiques, YouTube, images externes) passe directement par le réseau
});
