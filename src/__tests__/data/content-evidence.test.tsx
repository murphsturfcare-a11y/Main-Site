import { renderToStaticMarkup } from 'react-dom/server';
import ServiceDetailPage from '@/app/services/[slug]/page';
import LocationPage from '@/app/locations/[slug]/page';
import CommercialRegionPage from '@/app/commercial-turf-cleaning/[location]/page';
import { commercialOverview } from '@/data/commercial';
import { services } from '@/data/services';
import { locations, residentialLocationParams } from '@/data/locations';
import { regionalCare, cityCareContext } from '@/data/regional-care';

describe('Published source alignment', () => {
  it.each(services.map((service) => [service.slug, service] as const))('%s uses the reviewed shared service copy and matching FAQ schema', async (_slug, service) => {
    const html = renderToStaticMarkup(await ServiceDetailPage({ params: Promise.resolve({ slug: service.slug }) }));
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const schemas = [...doc.querySelectorAll('script[type="application/ld+json"]')].map((script) => JSON.parse(script.textContent || '{}'));
    doc.querySelectorAll('script').forEach((script) => script.remove());
    expect(doc.querySelector('h1')?.textContent).toContain(service.name);
    for (const paragraph of service.fullDescription.split('\n\n')) expect(doc.body.textContent).toContain(paragraph);
    const faq = schemas.find((schema) => schema['@type'] === 'FAQPage');
    expect(faq.mainEntity.map((entry: { name: string }) => entry.name)).toEqual(service.faqs.map((entry) => entry.question));
    for (const entry of service.faqs) expect(doc.body.textContent).toContain(entry.answer);
    expect(doc.querySelector('img[src="/images/before-after.png"]')).toBeNull();
  });

  it.each(locations.map((location) => [location.slug, location] as const))('%s publishes regional guidance without a fabricated branch or reviews', async (slug, location) => {
    const doc = new DOMParser().parseFromString(renderToStaticMarkup(await LocationPage({ params: Promise.resolve({ slug }) })), 'text/html');
    const schemas = [...doc.querySelectorAll('script[type="application/ld+json"]')].map((script) => JSON.parse(script.textContent || '{}'));
    doc.querySelectorAll('script').forEach((script) => script.remove());
    const service = schemas.find((schema) => schema['@type'] === 'Service');
    expect(service.provider).toEqual({ '@id': 'https://murphysturf.com/#localbusiness' });
    expect(service).not.toHaveProperty('address');
    expect(schemas.some((schema) => schema['@type'] === 'Review' || schema.aggregateRating)).toBe(false);
    expect(doc.querySelectorAll('blockquote')).toHaveLength(0);
    expect(doc.body.textContent).toContain(regionalCare[slug].intro);
    expect(doc.querySelector(`a[href="tel:${location.phone.replace(/[^\d+]/g, '')}"]`)).not.toBeNull();
  });

  it.each(locations.map((location) => location.slug))('%s commercial hub renders the FAQ content declared in its schema', async (location) => {
    const html = renderToStaticMarkup(await CommercialRegionPage({ params: Promise.resolve({ location }) }));
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const schemas = [...doc.querySelectorAll('script[type="application/ld+json"]')].map((script) => JSON.parse(script.textContent || '{}'));
    const faq = schemas.find((schema) => schema['@type'] === 'FAQPage');
    expect(faq.mainEntity).toHaveLength(commercialOverview.faqs.length);
    doc.querySelectorAll('script').forEach((script) => script.remove());
    for (const question of faq.mainEntity) {
      expect([...doc.querySelectorAll('summary')].map((summary) => summary.textContent)).toContain(question.name);
      expect(doc.body.textContent).toContain(question.acceptedAnswer.text);
    }
  });

  it('has explicit care context for every retained legacy child route', () => {
    for (const { slug, subLocation } of residentialLocationParams()) {
      const location = locations.find((entry) => entry.slug === slug)!;
      const name = location.neighborhoods.find((entry) => `turf-cleaning-in-${entry.toLowerCase().replace(/[^a-z0-9]+/g, '-')}` === subLocation)!;
      expect(cityCareContext(name), `${name} needs a supported care context`).toBeDefined();
    }
  });
});
