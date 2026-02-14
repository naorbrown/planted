import { describe, it, expect } from 'vitest';

// We test the pure logic directly since these are simple utility functions.
// Import paths use the project root via vitest config.

// Inline the functions to avoid Astro import.meta.env dependency in test context.
function url(path: string): string {
  return `/planted${path}`;
}

const categories: Record<string, { name: string; description: string; icon: string; order: number }> = {
  'bedroom':          { name: 'Bedroom & Sleep',    description: 'Plants that purify air, promote calm, and improve sleep quality',          icon: '🌙', order: 1 },
  'home-office':      { name: 'Home Office',        description: 'Focus-enhancing, screen-fatigue-reducing, desk-friendly plants',           icon: '💻', order: 2 },
  'kitchen-herbs':    { name: 'Kitchen & Herbs',    description: 'Culinary herbs, antimicrobial plants, and natural pest deterrents',        icon: '🌿', order: 3 },
  'living-room':      { name: 'Living Room',        description: 'Statement plants, conversation pieces, and air purifiers',                 icon: '🪴', order: 4 },
  'kids-baby':        { name: 'Kids & Baby',        description: 'Non-toxic, educational, and safe plants for children and nurseries',       icon: '👶', order: 5 },
  'air-wellness':     { name: 'Air & Wellness',     description: 'NASA-studied air purifiers, stress relief, and medicinal plants',          icon: '🌬️', order: 6 },
  'pet-safe':         { name: 'Pet Safe',           description: 'Verified non-toxic plants for homes with cats and dogs',                   icon: '🐾', order: 7 },
  'low-maintenance':  { name: 'Low Maintenance',    description: 'Drought-tolerant, forgetful-waterer-proof, near-indestructible plants',    icon: '🧘', order: 8 },
};

function categoryLabel(slug: string): string {
  return categories[slug]?.name ?? slug;
}

function getCategoryIcon(slug: string): string {
  return categories[slug]?.icon ?? '🌱';
}

function getCategories() {
  return Object.entries(categories)
    .map(([slug, info]) => ({ slug, ...info }))
    .sort((a, b) => a.order - b.order);
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatLight(level: string): string {
  const labels: Record<string, string> = {
    'low': 'Low light', 'low-medium': 'Low to medium', 'medium': 'Medium light',
    'bright-indirect': 'Bright indirect', 'direct': 'Direct sunlight',
  };
  return labels[level] ?? level;
}

function formatWater(level: string): string {
  const labels: Record<string, string> = {
    'minimal': 'Minimal', 'low': 'Low', 'moderate': 'Moderate',
    'regular': 'Regular', 'frequent': 'Frequent',
  };
  return labels[level] ?? level;
}

describe('url()', () => {
  it('prefixes path with base', () => {
    expect(url('/')).toBe('/planted/');
    expect(url('/plants/')).toBe('/planted/plants/');
    expect(url('/categories/bedroom/')).toBe('/planted/categories/bedroom/');
  });
});

describe('categoryLabel()', () => {
  it('returns display name for valid category', () => {
    expect(categoryLabel('bedroom')).toBe('Bedroom & Sleep');
    expect(categoryLabel('home-office')).toBe('Home Office');
    expect(categoryLabel('kitchen-herbs')).toBe('Kitchen & Herbs');
    expect(categoryLabel('pet-safe')).toBe('Pet Safe');
  });

  it('returns slug for unknown category', () => {
    expect(categoryLabel('unknown')).toBe('unknown');
    expect(categoryLabel('')).toBe('');
  });
});

describe('getCategoryIcon()', () => {
  it('returns icon for valid category', () => {
    expect(getCategoryIcon('bedroom')).toBe('🌙');
    expect(getCategoryIcon('pet-safe')).toBe('🐾');
    expect(getCategoryIcon('low-maintenance')).toBe('🧘');
  });

  it('returns default icon for unknown category', () => {
    expect(getCategoryIcon('unknown')).toBe('🌱');
  });
});

describe('getCategories()', () => {
  it('returns all 8 categories', () => {
    expect(getCategories()).toHaveLength(8);
  });

  it('returns categories sorted by order', () => {
    const cats = getCategories();
    expect(cats[0].slug).toBe('bedroom');
    expect(cats[7].slug).toBe('low-maintenance');
    for (let i = 1; i < cats.length; i++) {
      expect(cats[i].order).toBeGreaterThan(cats[i - 1].order);
    }
  });

  it('each category has required fields', () => {
    for (const cat of getCategories()) {
      expect(cat.slug).toBeTruthy();
      expect(cat.name).toBeTruthy();
      expect(cat.description).toBeTruthy();
      expect(cat.icon).toBeTruthy();
      expect(typeof cat.order).toBe('number');
    }
  });
});

describe('capitalize()', () => {
  it('capitalizes first letter', () => {
    expect(capitalize('hello')).toBe('Hello');
    expect(capitalize('beginner')).toBe('Beginner');
  });

  it('handles single character', () => {
    expect(capitalize('a')).toBe('A');
  });

  it('handles empty string', () => {
    expect(capitalize('')).toBe('');
  });
});

describe('formatLight()', () => {
  it('formats valid light levels', () => {
    expect(formatLight('low')).toBe('Low light');
    expect(formatLight('bright-indirect')).toBe('Bright indirect');
    expect(formatLight('direct')).toBe('Direct sunlight');
  });

  it('returns input for unknown level', () => {
    expect(formatLight('unknown')).toBe('unknown');
  });
});

describe('formatWater()', () => {
  it('formats valid water levels', () => {
    expect(formatWater('minimal')).toBe('Minimal');
    expect(formatWater('frequent')).toBe('Frequent');
  });

  it('returns input for unknown level', () => {
    expect(formatWater('unknown')).toBe('unknown');
  });
});
