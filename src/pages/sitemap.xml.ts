/** Plan du site pour les moteurs de recherche (déclaré dans public/robots.txt) */
import type { APIRoute } from 'astro';
import { toutesLesFiches } from '../lib/serveur/fiches';

export const GET: APIRoute = ({ site }) => {
    const url = (page: string): string => new URL(page, site).href;
    const pages: { loc: string; priority: string; changefreq?: string }[] = [
        { loc: url('index.html'), priority: '1.0', changefreq: 'weekly' },
        ...toutesLesFiches().map((fiche) => ({ loc: url(`${fiche.slug}.html`), priority: '0.8' })),
    ];
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
    .map(
        ({ loc, priority, changefreq }) => `   <url>
      <loc>${loc}</loc>
      <priority>${priority}</priority>${changefreq ? `\n      <changefreq>${changefreq}</changefreq>` : ''}
   </url>`,
    )
    .join('\n')}
</urlset>
`;
    return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
