import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const categoryEnum = z.enum([
  'bedroom',
  'home-office',
  'kitchen-herbs',
  'living-room',
  'kids-baby',
  'air-wellness',
  'pet-safe',
  'low-maintenance',
]);

const plants = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/plants' }),
  schema: z.object({
    title: z.string().max(80),
    scientificName: z.string(),
    description: z.string().max(200),
    category: categoryEnum,
    secondaryCategories: z.array(categoryEnum).default([]),
    light: z.enum(['low', 'low-medium', 'medium', 'bright-indirect', 'direct']),
    water: z.enum(['minimal', 'low', 'moderate', 'regular', 'frequent']),
    humidity: z.enum(['low', 'moderate', 'high']).default('moderate'),
    temperature: z.string(),
    soil: z.string(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    toxicity: z.enum(['non-toxic', 'mildly-toxic', 'toxic']),
    petSafe: z.boolean(),
    childSafe: z.boolean(),
    sizeAtMaturity: z.enum(['tiny', 'small', 'medium', 'large', 'extra-large']),
    matureHeight: z.string(),
    growthRate: z.enum(['slow', 'moderate', 'fast']),
    origin: z.string().optional(),
    benefits: z.array(z.string()),
    nasaCleanAir: z.boolean().default(false),
    healthWisdom: z.object({
      tcm: z.string().optional(),
      ayurveda: z.string().optional(),
      modernScience: z.string().optional(),
      folklore: z.string().optional(),
    }).optional(),
    tags: z.array(z.string()).default([]),
    relatedPlants: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
      credit: z.string().optional(),
    }).optional(),
  }),
});

const guides = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/guides' }),
  schema: z.object({
    title: z.string().max(100),
    description: z.string().max(200),
    category: categoryEnum.optional(),
    tags: z.array(z.string()).default([]),
    relatedPlants: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    publishDate: z.coerce.date(),
  }),
});

export const collections = { plants, guides };
