import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

const CONTENT_DIR = join(process.cwd(), 'src/content/plants');
const VALID_CATEGORIES = [
  'bedroom', 'home-office', 'kitchen-herbs', 'living-room',
  'kids-baby', 'air-wellness', 'pet-safe', 'low-maintenance',
];

function getPlantFiles(): { path: string; dir: string; file: string }[] {
  const files: { path: string; dir: string; file: string }[] = [];
  if (!existsSync(CONTENT_DIR)) return files;

  for (const dir of readdirSync(CONTENT_DIR, { withFileTypes: true })) {
    if (!dir.isDirectory()) continue;
    const dirPath = join(CONTENT_DIR, dir.name);
    for (const file of readdirSync(dirPath)) {
      if (file.endsWith('.mdx')) {
        files.push({ path: join(dirPath, file), dir: dir.name, file });
      }
    }
  }
  return files;
}

function extractFrontmatter(content: string): Record<string, string> {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0 && !line.startsWith(' ') && !line.startsWith('-')) {
      const key = line.substring(0, colonIdx).trim();
      const value = line.substring(colonIdx + 1).trim().replace(/^["']|["']$/g, '');
      fm[key] = value;
    }
  }
  return fm;
}

describe('Content Consistency', () => {
  const plants = getPlantFiles();

  it('has plant files', () => {
    expect(plants.length).toBeGreaterThan(0);
  });

  it('all plant directories are valid categories', () => {
    const dirs = [...new Set(plants.map((p) => p.dir))];
    for (const dir of dirs) {
      expect(VALID_CATEGORIES, `"${dir}" is not a valid category`).toContain(dir);
    }
  });

  it('all plant files have frontmatter', () => {
    for (const plant of plants) {
      const content = readFileSync(plant.path, 'utf-8');
      expect(content.startsWith('---'), `${plant.file} missing frontmatter`).toBe(true);
      expect(content.includes('\n---'), `${plant.file} missing frontmatter closing`).toBe(true);
    }
  });

  it('all plants have required frontmatter fields', () => {
    const requiredFields = ['title', 'scientificName', 'description', 'category', 'difficulty', 'light', 'water', 'toxicity'];
    for (const plant of plants) {
      const content = readFileSync(plant.path, 'utf-8');
      const fm = extractFrontmatter(content);
      for (const field of requiredFields) {
        expect(fm[field], `${plant.file} missing ${field}`).toBeDefined();
      }
    }
  });

  it('plant category matches directory', () => {
    for (const plant of plants) {
      const content = readFileSync(plant.path, 'utf-8');
      const fm = extractFrontmatter(content);
      expect(fm.category, `${plant.file}: category "${fm.category}" doesn't match dir "${plant.dir}"`).toBe(plant.dir);
    }
  });

  it('all plant files use .mdx extension', () => {
    for (const plant of plants) {
      expect(plant.file.endsWith('.mdx'), `${plant.file} should have .mdx extension`).toBe(true);
    }
  });

  it('no plant titles exceed 80 characters', () => {
    for (const plant of plants) {
      const content = readFileSync(plant.path, 'utf-8');
      const fm = extractFrontmatter(content);
      if (fm.title) {
        expect(fm.title.length, `${plant.file} title too long: "${fm.title}"`).toBeLessThanOrEqual(80);
      }
    }
  });

  it('all plants have a Setup Guide section', () => {
    for (const plant of plants) {
      const content = readFileSync(plant.path, 'utf-8');
      expect(content.includes('## Setup Guide'), `${plant.file} missing ## Setup Guide section`).toBe(true);
    }
  });
});
