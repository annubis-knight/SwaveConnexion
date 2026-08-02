/**
 * gen-favicons.mjs — Génère les icônes SERP / PWA depuis un master unique
 *
 * Master (source de vérité) : app/assets/images/favicon-master.png
 *   = le logo « S » en silhouette (fond transparent), hors du dossier public/.
 *
 * Design retenu (option C, validée 2 août 2026) : TUILE BLANCHE + « S » bleu de
 * marque (#0f8fc5). Le S complet est visible et lisible dès 16px dans le SERP
 * Google (l'ancien logo bicolore avait la moitié des traits en gris clair,
 * invisibles en petit).
 *
 * ⚠️ SÉPARATION VOULUE onglet ≠ SERP :
 *   - Onglet navigateur → favicon.ico + favicon-16/32.png = logo BICOLORE
 *     TRANSPARENT d'origine (préféré tel quel). Ce script n'y touche PAS.
 *   - SERP Google (privilégie le ≥48px multiple de 48) + PWA/iOS → la tuile ci-dessous.
 *
 * Sorties (public/) : android-chrome-192x192.png, android-chrome-512x512.png,
 *   apple-touch-icon.png (180).
 * Usage : node scripts/gen-favicons.mjs
 */

import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const master = join(root, 'app', 'assets', 'images', 'favicon-master.png');
const pub = (f) => join(root, 'public', f);

const BLUE = { r: 0x0f, g: 0x8f, b: 0xc5 }; /* --primary */
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };
const FILL = 0.72; /* part du cadre occupée par le S (marge modérée) */
const SRC = 512;

/* Silhouette du S recolorée en bleu plein (via le canal alpha du master) */
const alpha = await sharp(master).resize(SRC, SRC).extractChannel('alpha').raw().toBuffer();
const blueS = await sharp({ create: { width: SRC, height: SRC, channels: 3, background: BLUE } })
  .joinChannel(alpha, { raw: { width: SRC, height: SRC, channels: 1 } })
  .png()
  .toBuffer();

/* Une icône = tuile blanche carrée + S bleu centré à FILL, redimensionnée */
async function icon(size) {
  const inner = Math.round(SRC * FILL);
  const off = Math.round((SRC - inner) / 2);
  const s = await sharp(blueS).resize(inner, inner, { fit: 'contain' }).toBuffer();
  const tile = await sharp({ create: { width: SRC, height: SRC, channels: 4, background: WHITE } })
    .composite([{ input: s, top: off, left: off }])
    .png()
    .toBuffer();
  return size === SRC ? tile : sharp(tile).resize(size, size).png().toBuffer();
}

/* Icônes SERP / PWA / iOS (la tuile). Onglet (.ico/16/32) laissé intact. */
const [i180, i192, i512] = await Promise.all([180, 192, 512].map(icon));

await writeFile(pub('apple-touch-icon.png'), i180);
await writeFile(pub('android-chrome-192x192.png'), i192);
await writeFile(pub('android-chrome-512x512.png'), i512);

console.log('✓ Icônes SERP/PWA générées (option C : tuile blanche + S bleu) depuis', master);
