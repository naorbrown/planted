import sharp from 'sharp';
import { mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '..', 'public', 'og');
mkdirSync(OUT_DIR, { recursive: true });

const WIDTH = 1200;
const HEIGHT = 630;

// Brand colors from global.css
const COLORS = {
  bg: '#1A1F1C',
  surface: '#252C27',
  text: '#E3E8E4',
  muted: '#B8C0BA',
  leaf: '#5B9A6B',
  leafLight: '#8DC09A',
  terracotta: '#C4836E',
};

function createSvg({ subtitle, accent }) {
  // SVG seedling icon — pure paths, renders on any platform
  const leafIcon = `
    <g transform="translate(555, 120)">
      <path d="M45 155 Q45 100 45 70" stroke="${accent}" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M45 110 Q15 70 45 50 Q45 80 45 110Z" fill="${accent}" opacity="0.9"/>
      <path d="M45 90 Q75 50 45 30 Q45 55 45 90Z" fill="${accent}" opacity="0.7"/>
    </g>`;

  return Buffer.from(`<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="diag" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.08"/>
      <stop offset="60%" stop-color="${COLORS.bg}" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <!-- Gradient overlay -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#diag)"/>

  <!-- Top accent bar -->
  <rect x="0" y="0" width="${WIDTH}" height="6" fill="${accent}"/>

  <!-- Leaf icon -->
  ${leafIcon}

  <!-- Brand name -->
  <text x="600" y="360" font-size="64" font-weight="700" fill="${COLORS.text}"
        text-anchor="middle" font-family="Inter, system-ui, -apple-system, sans-serif"
        letter-spacing="-1">Plant Therapy</text>

  <!-- Subtitle -->
  <text x="600" y="410" font-size="26" fill="${COLORS.muted}"
        text-anchor="middle" font-family="Inter, system-ui, -apple-system, sans-serif">${subtitle}</text>

  <!-- Bottom accent bar -->
  <rect x="0" y="${HEIGHT - 6}" width="${WIDTH}" height="6" fill="${accent}"/>
</svg>`);
}

const variants = [
  { name: 'default', subtitle: 'The right plant for any space', accent: COLORS.leaf },
  { name: 'guide', subtitle: 'Plant Care Guide', accent: COLORS.terracotta },
  { name: 'plant', subtitle: 'Plant Profile', accent: COLORS.leafLight },
];

for (const v of variants) {
  const svg = createSvg(v);
  await sharp({
    create: {
      width: WIDTH,
      height: HEIGHT,
      channels: 4,
      background: COLORS.bg,
    },
  })
    .composite([{ input: svg, top: 0, left: 0 }])
    .png({ quality: 90 })
    .toFile(join(OUT_DIR, `${v.name}.png`));

  console.log(`  Generated public/og/${v.name}.png`);
}

console.log('OG images ready.');
