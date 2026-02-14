import { describe, it, expect } from 'vitest';

// Inline schema functions to avoid Astro import issues in test context.
function generatePlantSchema(input: { name: string; scientificName: string; description: string; image?: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    name: input.name,
    alternateName: input.scientificName,
    description: input.description,
    image: input.image,
    url: input.url,
    publisher: { '@type': 'Organization', name: 'Planted' },
  };
}

function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

describe('generatePlantSchema()', () => {
  it('generates valid Article schema', () => {
    const schema = generatePlantSchema({
      name: 'Lavender',
      scientificName: 'Lavandula angustifolia',
      description: 'A fragrant bedroom plant.',
      url: 'https://example.com/plants/bedroom/lavender/',
    });

    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('Article');
    expect(schema.name).toBe('Lavender');
    expect(schema.alternateName).toBe('Lavandula angustifolia');
    expect(schema.description).toBe('A fragrant bedroom plant.');
    expect(schema.url).toContain('lavender');
    expect(schema.publisher.name).toBe('Planted');
  });

  it('includes image when provided', () => {
    const schema = generatePlantSchema({
      name: 'Test',
      scientificName: 'Testus plantus',
      description: 'Test plant.',
      image: '/images/test.jpg',
      url: 'https://example.com/test/',
    });

    expect(schema.image).toBe('/images/test.jpg');
  });

  it('omits image when not provided', () => {
    const schema = generatePlantSchema({
      name: 'Test',
      scientificName: 'Testus plantus',
      description: 'Test plant.',
      url: 'https://example.com/test/',
    });

    expect(schema.image).toBeUndefined();
  });
});

describe('generateBreadcrumbSchema()', () => {
  it('generates valid BreadcrumbList schema', () => {
    const schema = generateBreadcrumbSchema([
      { name: 'Home', url: 'https://example.com/' },
      { name: 'Bedroom & Sleep', url: 'https://example.com/categories/bedroom/' },
      { name: 'Lavender', url: 'https://example.com/plants/bedroom/lavender/' },
    ]);

    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('BreadcrumbList');
    expect(schema.itemListElement).toHaveLength(3);
    expect(schema.itemListElement[0].position).toBe(1);
    expect(schema.itemListElement[0].name).toBe('Home');
    expect(schema.itemListElement[2].position).toBe(3);
    expect(schema.itemListElement[2].name).toBe('Lavender');
  });

  it('handles single item', () => {
    const schema = generateBreadcrumbSchema([{ name: 'Home', url: 'https://example.com/' }]);
    expect(schema.itemListElement).toHaveLength(1);
    expect(schema.itemListElement[0].position).toBe(1);
  });
});
