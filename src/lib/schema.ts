interface PlantSchemaInput {
  name: string;
  scientificName: string;
  description: string;
  image?: string;
  url: string;
}

export function generatePlantSchema(input: PlantSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    name: input.name,
    alternateName: input.scientificName,
    description: input.description,
    image: input.image,
    url: input.url,
    publisher: {
      '@type': 'Organization',
      name: 'Planted',
    },
  };
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
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
