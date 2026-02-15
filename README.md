# Plant Therapy

Find the perfect plant for any space — bedroom, office, kitchen, and beyond.

**Live site:** [naorbrown.github.io/plant-therapy](https://naorbrown.github.io/plant-therapy)

## What is this?

A plant guide organized by use case, not by species. Each plant page includes:

- Complete care guide (light, water, soil, temperature)
- Health wisdom from TCM, Ayurveda, and modern science
- Setup instructions from pot selection to placement
- Maintenance schedules and troubleshooting
- Pet and child safety information
- Related plant recommendations

## Tech stack

- [Astro](https://astro.build) v5 — static site generator
- [Tailwind CSS](https://tailwindcss.com) v4 — utility-first styling
- [MDX](https://mdxjs.com) — content as code with Zod schema validation
- [Pagefind](https://pagefind.app) — static search (⌘K)
- [Vitest](https://vitest.dev) — unit tests
- [Playwright](https://playwright.dev) — E2E tests
- GitHub Pages — deployment via GitHub Actions

## Development

```bash
pnpm install        # Install dependencies
pnpm dev            # Start dev server at localhost:4321
pnpm build          # Build for production
pnpm preview        # Preview production build
pnpm check          # Run Astro type checking
pnpm test           # Run unit tests
pnpm test:e2e       # Run E2E tests (requires build first)
```

## Project structure

```
src/
├── components/     # Astro components (global, plant, ui)
├── content/        # MDX content files
│   ├── plants/     # 20 plants organized by category
│   └── guides/     # 44 use-case guides
├── data/           # Category metadata (YAML)
├── layouts/        # Page layouts (Base, Page, Plant, Guide)
├── lib/            # Utilities and JSON-LD schema generators
├── pages/          # Astro page routes
└── styles/         # Global CSS with Tailwind theme
tests/
├── unit/           # Vitest unit tests
└── e2e/            # Playwright E2E tests
```

## Categories

| Category | Focus |
|----------|-------|
| 🌙 Bedroom & Sleep | Sleep quality, calming, air purification |
| 💻 Home Office | Focus, screen fatigue, desk-friendly |
| 🌿 Kitchen & Herbs | Culinary, antimicrobial, pest deterrent |
| 🪴 Living Room | Statement plants, conversation pieces |
| 👶 Kids & Baby | Non-toxic, educational, safe |
| 🌬️ Air & Wellness | NASA plants, stress relief, medicinal |
| 🐾 Pet Safe | Verified non-toxic for cats and dogs |
| 🧘 Low Maintenance | Drought-tolerant, near-indestructible |

## Adding a plant

Create a new `.mdx` file in `src/content/plants/[category]/`:

```bash
src/content/plants/bedroom/new-plant.mdx
```

The Zod schema in `src/content.config.ts` validates all frontmatter at build time.

## Deployment

Push to `main` triggers automatic deployment to GitHub Pages via GitHub Actions.
