import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import pageMetadata from './routes.json';

type PageMeta = { title: string; description: string; index: boolean };
const SITE_ORIGIN = 'https://xumai.app';
const IMAGE = SITE_ORIGIN + '/og-image.svg';
const routes = pageMetadata as Record<string, PageMeta>;

function upsertMeta(attribute: 'name' | 'property', key: string, value: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) { element = document.createElement('meta'); element.setAttribute(attribute, key); document.head.appendChild(element); }
  element.content = value;
}

export function RouteSeo() {
  const { pathname } = useLocation();
  useEffect(() => {
    const route = pathname.replace(/\/$/, '') || '/';
    const meta = routes[route] ?? { title: 'XUM AI | Global Intelligence Platform', description: 'Explore XUM AI, a global AI data collection and validation platform.', index: false };
    const url = SITE_ORIGIN + (route === '/' ? '/' : route);
    document.title = meta.title;
    upsertMeta('name', 'description', meta.description);
    upsertMeta('name', 'robots', meta.index ? 'index,follow,max-image-preview:large' : 'noindex,nofollow,noarchive');
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', 'XUM AI');
    upsertMeta('property', 'og:title', meta.title);
    upsertMeta('property', 'og:description', meta.description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', IMAGE);
    upsertMeta('property', 'og:image:alt', 'XUM AI — Human intelligence. Better AI.');
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', meta.title);
    upsertMeta('name', 'twitter:description', meta.description);
    upsertMeta('name', 'twitter:image', IMAGE);
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    canonical.href = url;
  }, [pathname]);
  return null;
}
