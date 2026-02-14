/**
 * Prefix a path with the configured Astro base path.
 */
export function url(path: string): string {
  const base = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '');
  return `${base}${path}`;
}

/**
 * Category metadata — must stay in sync with src/data/categories.yaml.
 */
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

/**
 * Get the category display name from a slug.
 */
export function categoryLabel(slug: string): string {
  return categories[slug]?.name ?? slug;
}

/**
 * Get the emoji icon for a category.
 */
export function getCategoryIcon(slug: string): string {
  return categories[slug]?.icon ?? '🌱';
}

/**
 * Get all categories sorted by order.
 */
export function getCategories(): Array<{ slug: string; name: string; description: string; icon: string; order: number }> {
  return Object.entries(categories)
    .map(([slug, info]) => ({ slug, ...info }))
    .sort((a, b) => a.order - b.order);
}

/**
 * Guide group icons — used on guide cards and section headers.
 */
const groupIcons: Record<string, string> = {
  health: '💚',
  life: '🏠',
  practical: '🎯',
  reference: '📖',
};

/**
 * Get the emoji icon for a guide group.
 */
export function getGroupIcon(group?: string): string {
  return (group && groupIcons[group]) ?? '📗';
}

/**
 * Capitalize the first letter of a string.
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Format a light level enum to human-readable display.
 */
export function formatLight(level: string): string {
  const labels: Record<string, string> = {
    'low': 'Low light',
    'low-medium': 'Low to medium',
    'medium': 'Medium light',
    'bright-indirect': 'Bright indirect',
    'direct': 'Direct sunlight',
  };
  return labels[level] ?? level;
}

/**
 * Format a water need enum to human-readable display.
 */
export function formatWater(level: string): string {
  const labels: Record<string, string> = {
    'minimal': 'Minimal',
    'low': 'Low',
    'moderate': 'Moderate',
    'regular': 'Regular',
    'frequent': 'Frequent',
  };
  return labels[level] ?? level;
}
