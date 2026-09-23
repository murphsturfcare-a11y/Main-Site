import type { ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ResidentialHub from '@/app/locations/[slug]/page';
import ResidentialCity from '@/app/locations/[slug]/[subLocation]/page';
import CommercialHub from '@/app/commercial-turf-cleaning/[location]/page';
import CommercialCity from '@/app/commercial-turf-cleaning/[location]/[subLocation]/page';
import { locations, residentialLocationParams } from '@/data/locations';
import { commercialSubLocationParams } from '@/data/commercial';
import { regionalCare, cityCareContext } from '@/data/regional-care';

// Every region renders through the same templates. These tests compare Palm
// Desert against Murrieta so a region cannot quietly lose the gallery, process,
// neighborhoods, climate note or map that the other areas publish.
async function markup(element: Promise<unknown>): Promise<Document> {
  const html = renderToStaticMarkup((await element) as ReactElement);
  return new DOMParser().parseFromString(html, 'text/html');
}

function sectionShape(doc: Document, names: string[]): string[] {
  return Array.from(doc.querySelectorAll('h2')).map((heading) => {
    let text = (heading.textContent ?? '').replace(/\s+/g, ' ').trim();
    for (const name of names) text = text.split(name).join('CITY');
    return text;
  });
}

const palmDesert = locations.find((location) => location.slug === 'palm-desert')!;
const murrieta = locations.find((location) => location.slug === 'murrieta')!;
const desertNames = [palmDesert.name, 'Palm Desert', 'Indio'];
const inlandNames = [murrieta.name, 'Murrieta', 'Temecula'];

describe('Palm Desert uses the same templates as the other regions', () => {
  it('renders the same hub sections as Murrieta', async () => {
    const desert = await markup(ResidentialHub({ params: Promise.resolve({ slug: 'palm-desert' }) }));
    const inland = await markup(ResidentialHub({ params: Promise.resolve({ slug: 'murrieta' }) }));
    expect(sectionShape(desert, desertNames)).toEqual(sectionShape(inland, inlandNames));
    // The sections the bespoke Palm Desert page used to omit.
    const text = desert.body.textContent ?? '';
    expect(text).toContain('Turf Gallery');
    expect(text).toContain('Our Simple 3 Step Process');
    expect(text).toContain('Neighborhoods We Serve');
    expect(text).toContain('Local Climate');
    expect(desert.querySelector('iframe[src*="google.com/maps"]')?.getAttribute('src')).toContain('Palm%20Desert');
    // Coverage that must survive the move to the shared template.
    expect(text).toContain('Sun City Palm Desert / Desert Palms');
  });

  it('renders the same city sections as a Murrieta city page', async () => {
    const desert = await markup(ResidentialCity({ params: Promise.resolve({ slug: 'palm-desert', subLocation: 'turf-cleaning-in-indio' }) }));
    const inland = await markup(ResidentialCity({ params: Promise.resolve({ slug: 'murrieta', subLocation: 'turf-cleaning-in-temecula' }) }));
    expect(sectionShape(desert, desertNames)).toEqual(sectionShape(inland, inlandNames));
  });

  it('renders the same commercial sections as Murrieta', async () => {
    const desertHub = await markup(CommercialHub({ params: Promise.resolve({ location: 'palm-desert' }) }));
    const inlandHub = await markup(CommercialHub({ params: Promise.resolve({ location: 'murrieta' }) }));
    expect(sectionShape(desertHub, desertNames)).toEqual(sectionShape(inlandHub, inlandNames));

    const desertCity = await markup(CommercialCity({ params: Promise.resolve({ location: 'palm-desert', subLocation: 'commercial-turf-cleaning-in-indio' }) }));
    const inlandCity = await markup(CommercialCity({ params: Promise.resolve({ location: 'murrieta', subLocation: 'commercial-turf-cleaning-in-temecula' }) }));
    expect(sectionShape(desertCity, desertNames)).toEqual(sectionShape(inlandCity, inlandNames));
  });

  it('calls the Palm Desert number and never the shared inland line', async () => {
    for (const element of [
      ResidentialHub({ params: Promise.resolve({ slug: 'palm-desert' }) }),
      ResidentialCity({ params: Promise.resolve({ slug: 'palm-desert', subLocation: 'turf-cleaning-in-indian-wells' }) }),
      CommercialHub({ params: Promise.resolve({ location: 'palm-desert' }) }),
      CommercialCity({ params: Promise.resolve({ location: 'palm-desert', subLocation: 'commercial-turf-cleaning-in-indian-wells' }) }),
    ]) {
      const doc = await markup(element);
      expect(doc.querySelector('a[href="tel:9255886546"]')).not.toBeNull();
      expect(doc.querySelector('a[href^="tel:"][href*="331"]')).toBeNull();
    }
  });
});

describe('regional content covers every published region', () => {
  it.each(locations.map((location) => location.slug))('%s has regional care guidance', (slug) => {
    expect(regionalCare[slug]).toBeDefined();
    expect(regionalCare[slug].challenges).toHaveLength(4);
    expect(regionalCare[slug].commercial.length).toBeGreaterThan(0);
  });

  it('gives every service-area city a care context block', () => {
    for (const location of locations) {
      for (const city of location.neighborhoods) {
        expect(cityCareContext(city), `${city} (${location.slug})`).toBeDefined();
      }
    }
  });

  it('keeps the Palm Desert URL set unchanged', () => {
    expect(residentialLocationParams().filter((param) => param.slug === 'palm-desert').map((param) => param.subLocation)).toEqual([
      'turf-cleaning-in-indian-wells',
      'turf-cleaning-in-bermuda-dunes',
      'turf-cleaning-in-la-quinta',
      'turf-cleaning-in-indio',
      'turf-cleaning-in-coachella',
    ]);
    expect(commercialSubLocationParams().filter((param) => param.location === 'palm-desert').map((param) => param.subLocation)).toEqual([
      'commercial-turf-cleaning-in-indian-wells',
      'commercial-turf-cleaning-in-bermuda-dunes',
      'commercial-turf-cleaning-in-la-quinta',
      'commercial-turf-cleaning-in-indio',
      'commercial-turf-cleaning-in-coachella',
    ]);
  });
});
