import sharp from "sharp";
import { mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "../public");
mkdirSync(publicDir, { recursive: true });

// ─── icon.png 200×200 ─────────────────────────────────────────────────────
const iconSvg = `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1f2937"/>
      <stop offset="100%" stop-color="#0f1117"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="44" fill="url(#bg)"/>
  <!-- Hash # symbol — Bitcoin mining motif -->
  <rect x="72"  y="46"  width="14" height="108" rx="5" fill="#F7931A"/>
  <rect x="114" y="46"  width="14" height="108" rx="5" fill="#F7931A"/>
  <rect x="46"  y="76"  width="108" height="14" rx="5" fill="#F7931A"/>
  <rect x="46"  y="110" width="108" height="14" rx="5" fill="#F7931A"/>
  <!-- Subtle orange glow ring -->
  <circle cx="100" cy="100" r="88" fill="none" stroke="#F7931A" stroke-width="3" opacity="0.25"/>
</svg>`;

// ─── splash.png 200×200 ────────────────────────────────────────────────────
const splashSvg = `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#F7931A"/>
  <!-- Hash # symbol inverted -->
  <rect x="72"  y="46"  width="14" height="108" rx="5" fill="#111827"/>
  <rect x="114" y="46"  width="14" height="108" rx="5" fill="#111827"/>
  <rect x="46"  y="76"  width="108" height="14" rx="5" fill="#111827"/>
  <rect x="46"  y="110" width="108" height="14" rx="5" fill="#111827"/>
</svg>`;

// ─── image.png 1200×630 ────────────────────────────────────────────────────
const imageSvg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#111827"/>
      <stop offset="100%" stop-color="#030712"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Dot grid background -->
  ${Array.from({ length: 20 }, (_, row) =>
    Array.from({ length: 32 }, (_, col) =>
      `<circle cx="${col * 40 + 20}" cy="${row * 40 + 15}" r="1.5" fill="#374151" opacity="0.6"/>`
    ).join("")
  ).join("")}

  <!-- Large # icon left -->
  <rect x="80"  y="185" width="28" height="200" rx="8" fill="#F7931A"/>
  <rect x="168" y="185" width="28" height="200" rx="8" fill="#F7931A"/>
  <rect x="52"  y="255" width="200" height="28" rx="8" fill="#F7931A"/>
  <rect x="52"  y="329" width="200" height="28" rx="8" fill="#F7931A"/>

  <!-- Title -->
  <text x="316" y="268"
    font-family="Arial Black, Arial, sans-serif"
    font-size="76"
    font-weight="900"
    fill="white"
    letter-spacing="-1">Pool Power Map</text>

  <!-- Subtitle -->
  <text x="318" y="336"
    font-family="Arial, sans-serif"
    font-size="32"
    fill="#9CA3AF"
    letter-spacing="0.5">Bitcoin Mining Pool World Distribution</text>

  <!-- Data badge -->
  <rect x="318" y="368" width="332" height="46" rx="23" fill="#F7931A" opacity="0.15"/>
  <rect x="318" y="368" width="332" height="46" rx="23" fill="none" stroke="#F7931A" stroke-width="1.5" opacity="0.6"/>
  <text x="484" y="398"
    font-family="Arial, sans-serif"
    font-size="22"
    font-weight="bold"
    text-anchor="middle"
    fill="#F7931A">⛏ Live 24h · mempool.space</text>

  <!-- Bottom URL -->
  <text x="316" y="570"
    font-family="Arial, sans-serif"
    font-size="22"
    fill="#4B5563">bitcoin-pool-power-map.vercel.app</text>

  <!-- Right decorative circles -->
  <circle cx="980" cy="315" r="180" fill="none" stroke="#F7931A" stroke-width="1.5" opacity="0.1"/>
  <circle cx="980" cy="315" r="130" fill="none" stroke="#F7931A" stroke-width="1.5" opacity="0.15"/>
  <circle cx="980" cy="315" r="80"  fill="none" stroke="#F7931A" stroke-width="2"   opacity="0.2"/>
  <circle cx="980" cy="315" r="30"  fill="#F7931A" opacity="0.25"/>
  <!-- Small hash in circle -->
  <rect x="968" y="297" width="6" height="36" rx="2" fill="#F7931A" opacity="0.8"/>
  <rect x="984" y="297" width="6" height="36" rx="2" fill="#F7931A" opacity="0.8"/>
  <rect x="962" y="309" width="36" height="6" rx="2" fill="#F7931A" opacity="0.8"/>
  <rect x="962" y="321" width="36" height="6" rx="2" fill="#F7931A" opacity="0.8"/>
</svg>`;

async function generate() {
  await sharp(Buffer.from(iconSvg)).png().toFile(join(publicDir, "icon.png"));
  console.log("✓ icon.png");

  await sharp(Buffer.from(splashSvg)).png().toFile(join(publicDir, "splash.png"));
  console.log("✓ splash.png");

  await sharp(Buffer.from(imageSvg)).png().toFile(join(publicDir, "image.png"));
  console.log("✓ image.png");
}

generate().catch((e) => { console.error(e); process.exit(1); });
