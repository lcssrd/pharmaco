/*
 * Le site n'a plus de version hors ligne.
 *
 * Ce fichier reste à la même adresse pour les navigateurs qui avaient installé l'ancien
 * service worker : en vérifiant s'il a changé, ils récupèrent cette version, qui efface la
 * copie des fichiers, se désinstalle et laisse toutes les requêtes passer par le réseau.
 * Il ne contient volontairement aucun gestionnaire « fetch ».
 *
 * À garder quelques mois, le temps que les anciens visiteurs repassent sur le site ;
 * il pourra ensuite être supprimé.
 */

self.addEventListener('install', () => {
    self.skipWaiting();
});

self.addEventListener('activate', (evenement) => {
    evenement.waitUntil((async () => {
        const noms = await caches.keys();
        await Promise.all(noms.filter((nom) => nom.startsWith('pharmaco-')).map((nom) => caches.delete(nom)));
        await self.registration.unregister();
    })());
});
