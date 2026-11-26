/**
 * Ancienne version hors ligne : désinstallation.
 *
 * Le site n'a plus de version hors ligne. Les navigateurs qui l'avaient installée lors d'une
 * visite précédente gardent un service worker et une copie des fichiers : on les retire
 * (public/sw.js fait de même de son côté). À supprimer quand plus aucun visiteur ne l'a.
 */
const PREFIXE_CACHE = 'pharmaco-';

export function nettoyerAncienneVersionHorsLigne(): void {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .getRegistrations()
            .then((inscriptions) => Promise.all(inscriptions.map((inscription) => inscription.unregister())))
            .catch(() => {
                // rien à désinstaller
            });
    }
    if ('caches' in window) {
        caches
            .keys()
            .then((noms) =>
                Promise.all(noms.filter((nom) => nom.startsWith(PREFIXE_CACHE)).map((nom) => caches.delete(nom))),
            )
            .catch(() => {
                // rien à effacer
            });
    }
}
