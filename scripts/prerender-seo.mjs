import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
const root = process.cwd();
const dist = resolve(root, 'dist');
const routes = JSON.parse(readFileSync(resolve(root, 'src/seo/routes.json'), 'utf8'));
const source = readFileSync(resolve(dist, 'index.html'), 'utf8');
const base = 'https://xumai.app';
const image = base + '/og-image.png';
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function addSeo(html, route, meta) {
  const url = base + (route === '/' ? '/' : route + '/');
  const tags = [
    ['name', 'description', meta.description],
    ['name', 'robots', 'index,follow,max-image-preview:large'],
    ['property', 'og:site_name', 'XUM AI'],
    ['property', 'og:type', 'website'],
    ['property', 'og:title', meta.title],
    ['property', 'og:description', meta.description],
    ['property', 'og:url', url],
    ['property', 'og:image', image],
    ['property', 'og:image:width', '600'],
    ['property', 'og:image:height', '315'],
    ['property', 'og:image:alt', 'XUM AI — Human intelligence. Better AI.'],
    ['name', 'twitter:card', 'summary_large_image'],
    ['name', 'twitter:title', meta.title],
    ['name', 'twitter:description', meta.description],
    ['name', 'twitter:image', image],
  ].map(([attr,key,value]) => `<meta ${attr}="${esc(key)}" content="${esc(value)}" />`).join('\n  ');
  const schema = route === '/' ? '\n  <script type="application/ld+json">' + JSON.stringify({
    '@context': 'https://schema.org', '@type': 'Organization', name: 'XUM AI',
    url: base + '/', logo: base + '/apple-touch-icon.png',
    description: routes['/'].description
  }).replace(/</g, '\\u003c') + '</script>' : '';
  return html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(meta.title)}</title>`)
    .replace(/<meta\s+name="(?:description|robots)"[^>]*\/?>/gi, '')
    .replace('</head>', `  <link rel="canonical" href="${esc(url)}" />\n  ${tags}${schema}\n</head>`);
}
for (const [route, meta] of Object.entries(routes)) {
  if (!meta.index) continue;
  const filepath = route === '/' ? resolve(dist, 'index.html') : resolve(dist, '.' + route, 'index.html');
  mkdirSync(dirname(filepath), { recursive: true });
  writeFileSync(filepath, addSeo(source, route, meta));
}
console.log('Generated HTML metadata for', Object.values(routes).filter(x => x.index).length, 'public routes.');
