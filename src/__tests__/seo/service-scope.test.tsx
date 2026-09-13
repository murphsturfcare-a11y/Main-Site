import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import CommercialHubPage from '@/app/commercial-turf-cleaning/page';
import HomePage from '@/app/page';
import { locations } from '@/data/locations';
import { COMPANY_DESCRIPTION, SITE_URL } from '@/lib/seo/constants';

vi.mock('next/font/google', () => ({
  Montserrat: () => ({ variable: 'font-heading' }),
  Open_Sans: () => ({ variable: 'font-body' }),
}));

describe('published service scope', () => {
  it('renders one preferred site-name declaration on the canonical homepage', () => {
    const document = new DOMParser().parseFromString(renderToStaticMarkup(<HomePage />), 'text/html');
    const websites = [...document.querySelectorAll('script[type="application/ld+json"]')].map((script) => JSON.parse(script.textContent || '{}')).filter((schema) => schema['@type'] === 'WebSite');
    expect(websites).toHaveLength(1);
    expect(websites[0]).toMatchObject({ name: "Murphy's Turf", url: `${SITE_URL}/`, publisher: { '@id': `${SITE_URL}/#localbusiness` } });
    expect(websites[0]).not.toHaveProperty('potentialAction');
  });

  it('renders commercial schema for the same regions linked on the page without unsupported offer facts', () => {
    const document = new DOMParser().parseFromString(renderToStaticMarkup(<CommercialHubPage />), 'text/html');
    const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')].map((script) => JSON.parse(script.textContent || '{}'));
    const service = schemas.find((schema) => schema['@type'] === 'Service');
    expect(service.areaServed.map((area: { url: string }) => area.url)).toEqual(locations.map((location) => `${SITE_URL}/locations/${location.slug}`));
    for (const location of locations) {
      expect(document.querySelector(`a[href="/commercial-turf-cleaning/${location.slug}"]`)).not.toBeNull();
    }
    expect(service).not.toHaveProperty('offers');
    expect(service).not.toHaveProperty('priceRange');
  });

  it('uses the reviewed company description for inherited social previews', async () => {
    const { metadata } = await import('@/app/layout');
    expect(metadata.openGraph?.description).toBe(COMPANY_DESCRIPTION);
    expect(metadata.openGraph?.description).toContain('Palm Desert');
    expect(metadata.openGraph?.description).not.toMatch(/statewide/i);
  });
});
