import { renderToStaticMarkup } from 'react-dom/server';
import PalmDesertAreaPage from '@/components/sections/PalmDesertAreaPage';
import { palmDesertAreas, palmDesertPath, palmDesertPageMetadata } from '@/data/palm-desert';
import { residentialLocationParams } from '@/data/locations';
import { commercialSubLocationParams } from '@/data/commercial';

describe('Palm Desert coverage and content', () => {
  it('publishes the six authored community pages without neighborhood micro-pages', () => {
    const names = ['palm-desert', 'indian-wells', 'bermuda-dunes', 'la-quinta', 'indio', 'coachella'];
    expect(palmDesertAreas.map((area) => area.slug)).toEqual(names);
    expect(residentialLocationParams().filter((param) => param.slug === 'palm-desert').map((param) => param.subLocation))
      .toEqual(names.slice(1).map((name) => `turf-cleaning-in-${name}`));
    expect(commercialSubLocationParams().filter((param) => param.location === 'palm-desert').map((param) => param.subLocation))
      .toEqual(names.slice(1).map((name) => `commercial-turf-cleaning-in-${name}`));
  });

  it('gives residential and commercial pages their own substantive sections', () => {
    const pages = palmDesertAreas.flatMap((area) => [area.residential, area.commercial]);
    const summaries = pages.map((page) => page.summary);
    const bodies = pages.flatMap((page) => page.sections.map((section) => section.body));
    expect(new Set(summaries).size).toBe(pages.length);
    expect(new Set(bodies).size).toBe(bodies.length);
    for (const page of pages) {
      expect(page.sections).toHaveLength(3);
      expect(page.faqs).toHaveLength(3);
    }
  });

  it('keeps the northern unincorporated coverage on the hub and names Bermuda Dunes correctly', () => {
    expect(palmDesertAreas[0].coverage).toContain('Sun City Palm Desert / Desert Palms');
    expect(palmDesertAreas.find((area) => area.slug === 'bermuda-dunes')?.placeType).toBe('Place');
    expect(palmDesertAreas.find((area) => area.slug === 'coachella')?.coverage).toContain('not the entire Coachella Valley');
  });
});

describe.each(palmDesertAreas.map((area) => [area.name, area] as const))('%s service pages', (_name, area) => {
  it.each([false, true])('renders matching visible FAQ and honest service schema (commercial=%s)', (commercial) => {
    const html = renderToStaticMarkup(<PalmDesertAreaPage area={area} commercial={commercial} />);
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const schemas = Array.from(doc.querySelectorAll('script[type="application/ld+json"]')).map((script) => JSON.parse(script.textContent || '{}'));
    doc.querySelectorAll('script').forEach((script) => script.remove());
    const service = schemas.find((schema) => schema['@type'] === 'Service');
    const faq = schemas.find((schema) => schema['@type'] === 'FAQPage');
    expect(service.provider).toEqual({ '@id': 'https://murphysturf.com/#localbusiness' });
    expect(service).not.toHaveProperty('address');
    expect(service).not.toHaveProperty('aggregateRating');
    expect(service.url).toBe(`https://murphysturf.com${palmDesertPath(area, commercial)}`);
    expect(doc.querySelectorAll('h1')).toHaveLength(1);
    expect(doc.querySelector('h1')?.textContent).toContain(area.name);
    expect(faq.mainEntity.map((question: { name: string }) => question.name)).toEqual(Array.from(doc.querySelectorAll('summary')).map((summary) => summary.textContent));
    for (const question of faq.mainEntity) expect(doc.body.textContent).toContain(question.acceptedAnswer.text);
    expect(doc.querySelector('a[href="tel:951-331-3300"]')).not.toBeNull();
    expect(palmDesertPageMetadata(area, commercial).path).toBe(palmDesertPath(area, commercial));
    const ids = Array.from(doc.querySelectorAll('[id]')).map((element) => element.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
