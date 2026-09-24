#!/usr/bin/env node
/**
 * OPTIMISATION DES IMAGES SOURCES — optimize-images.mjs
 *
 * OBJECTIF
 * --------
 * Alleger les images sources AVANT le build, pour que le deploiement
 * n'embarque plus d'originaux de plusieurs Mo. Complementaire de
 * check-image-weights.mjs, qui lui ne fait que CONSTATER, apres coup, ce
 * qui part en production.
 *
 * POURQUOI CE N'EST PAS REDONDANT AVEC @nuxt/image
 * ------------------------------------------------
 * @nuxt/image genere les variantes _ipx que les visiteurs telechargent :
 * de ce cote, tout est deja optimise. Mais l'original reste dans public/
 * et part quand meme sur Firebase (15 Mo de photos que personne ne
 * telecharge). Ce script s'attaque a cette masse morte, et accelere au
 * passage la generation des variantes.
 *
 * COMMENT CA MARCHE
 * -----------------
 * Pour chaque image trop lourde ou trop large :
 *   1. l'original est copie dans _images-source/originaux/ (gitignore),
 *      jamais ecrase, jamais supprime ;
 *   2. l'image est redimensionnee puis reencodee ;
 *   3. le resultat ne remplace l'original que s'il est reellement plus
 *      leger. Sinon il est jete.
 *
 * IDEMPOTENCE
 * -----------
 * Une image deja traitee possede une sauvegarde : elle est ignoree aux
 * passages suivants. Sans ce garde-fou, chaque deploiement reencoderait
 * les memes JPEG et la qualite se degraderait a chaque fois. Si le fichier
 * est plus recent que sa sauvegarde, c'est une nouvelle image : elle est
 * retraitee et la sauvegarde est rafraichie.
 *
 * JPEG vs PNG
 * -----------
 * JPEG : reencodage mozjpeg, gains importants.
 * PNG  : compression sans perte uniquement, donc gains modestes mais aucun
 *        risque. --png-palette active la quantification 256 couleurs, bien
 *        plus efficace, au prix d'un risque de banding sur les degrades.
 *
 * USAGE
 * -----
 *   node scripts/optimize-images.mjs             # optimise
 *   node scripts/optimize-images.mjs --dry-run   # simule, n'ecrit rien
 *   node scripts/optimize-images.mjs --png-palette
 *
 * SEUILS (surchargeables par variables d'env)
 *   IMG_OPT_KB      (defaut 400)   -> au-dela : l'image est traitee
 *   IMG_OPT_WIDTH   (defaut 2560)  -> largeur max conservee
 *   IMG_OPT_QUALITY (defaut 82)    -> qualite JPEG/WebP
 */

import {
  readdirSync,
  statSync,
  mkdirSync,
  copyFileSync,
  existsSync,
  renameSync,
  writeFileSync,
  utimesSync,
} from 'node:fs';
import { join, relative, dirname, sep, posix } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

/* ── Config ─────────────────────────────────────────────────────────────── */
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const BACKUP_DIR = join(ROOT, '_images-source', 'originaux');
const MAX_KB = Number(process.env.IMG_OPT_KB ?? 400);
const MAX_WIDTH = Number(process.env.IMG_OPT_WIDTH ?? 2560);
const QUALITY = Number(process.env.IMG_OPT_QUALITY ?? 82);
const DRY_RUN = process.argv.includes('--dry-run');
const PNG_PALETTE = process.argv.includes('--png-palette');
const IMAGE_RE = /\.(png|jpe?g|webp)$/i;

/*
  Dossiers analyses : uniquement ceux dont le contenu part en production.
  Le vivier de photos non publiees vit dans _images-source/ (gitignore), hors
  de ces dossiers — inutile de traiter des images que personne ne telecharge.
*/
const SCAN_DIRS = [join(ROOT, 'public', 'images'), join(ROOT, 'app', 'assets', 'images')];
const SKIP_DIRS = new Set();

const c = {
  red: (s) => `\x1B[31m${s}\x1B[0m`,
  green: (s) => `\x1B[32m${s}\x1B[0m`,
  yellow: (s) => `\x1B[33m${s}\x1B[0m`,
  dim: (s) => `\x1B[2m${s}\x1B[0m`,
  bold: (s) => `\x1B[1m${s}\x1B[0m`,
};

/* ── Collecte ───────────────────────────────────────────────────────────── */
function walk(dir, acc = []) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return acc;
  }
  for (const e of entries) {
    if (e.isDirectory()) {
      if (!SKIP_DIRS.has(e.name)) walk(join(dir, e.name), acc);
    } else if (IMAGE_RE.test(e.name)) {
      acc.push(join(dir, e.name));
    }
  }
  return acc;
}

const toPosix = (p) => p.split(sep).join(posix.sep);
const kb = (bytes) => bytes / 1024;
const fmt = (n) => `${n.toFixed(0).padStart(5)} Ko`;

/* ── Traitement d'une image ─────────────────────────────────────────────── */
async function optimize(file) {
  const rel = toPosix(relative(ROOT, file));
  const before = statSync(file);
  const backup = join(BACKUP_DIR, relative(ROOT, file));

  /* Deja traitee, et inchangee depuis : on ne retouche pas (cf. IDEMPOTENCE) */
  if (existsSync(backup)) {
    const backupStat = statSync(backup);
    if (before.mtimeMs <= backupStat.mtimeMs + 1000) {
      return { rel, statut: 'deja traitee', avant: kb(before.size), apres: kb(before.size) };
    }
  }

  const image = sharp(file, { failOn: 'none' });
  const meta = await image.metadata();
  const tooHeavy = kb(before.size) > MAX_KB;
  const tooWide = (meta.width ?? 0) > MAX_WIDTH;
  if (!tooHeavy && !tooWide) return null;

  let pipeline = image;
  if (tooWide) pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });

  const isPng = (meta.format ?? '') === 'png';
  if (isPng) {
    /* Sans perte par defaut : une photo en PNG gagne peu, mais rien n'est
       degrade. --png-palette echange cette prudence contre du poids. */
    pipeline = pipeline.png(
      PNG_PALETTE
        ? { compressionLevel: 9, effort: 10, palette: true, quality: 90 }
        : { compressionLevel: 9, effort: 10 }
    );
  } else if ((meta.format ?? '') === 'webp') {
    pipeline = pipeline.webp({ quality: QUALITY });
  } else {
    pipeline = pipeline.jpeg({ quality: QUALITY, mozjpeg: true });
  }

  const buffer = await pipeline.toBuffer();
  const gain = before.size - buffer.length;

  /* Jamais d'alourdissement : sous 2% de gain, l'original reste en place */
  if (gain <= before.size * 0.02) {
    return { rel, statut: 'deja optimale', avant: kb(before.size), apres: kb(before.size) };
  }

  if (DRY_RUN) {
    return { rel, statut: 'a optimiser', avant: kb(before.size), apres: kb(buffer.length) };
  }

  /* L'original part en sauvegarde AVANT toute ecriture */
  mkdirSync(dirname(backup), { recursive: true });
  copyFileSync(file, backup);

  /* Ecriture via un fichier temporaire : une interruption ne laisse jamais
     l'image d'origine a moitie ecrasee. Le buffer est ecrit tel quel — le
     repasser dans sharp le reencoderait une seconde fois. */
  const tmp = `${file}.opt-tmp`;
  writeFileSync(tmp, buffer);
  renameSync(tmp, file);

  /* La sauvegarde est datee apres l'ecriture, donc toujours plus recente que
     l'image optimisee : c'est ce qui fait tenir le test d'idempotence,
     meme si l'encodage a dure plusieurs secondes. */
  const stamp = new Date();
  utimesSync(backup, stamp, stamp);

  return { rel, statut: 'optimisee', avant: kb(before.size), apres: kb(buffer.length) };
}

/* ── Rapport ────────────────────────────────────────────────────────────── */
async function main() {
  const files = SCAN_DIRS.flatMap((d) => walk(d));
  const results = [];
  for (const f of files) {
    try {
      const r = await optimize(f);
      if (r) results.push(r);
    } catch (err) {
      results.push({ rel: toPosix(relative(ROOT, f)), statut: `echec : ${err.message}`, avant: 0, apres: 0 });
    }
  }

  const touched = results.filter((r) => r.statut === 'optimisee' || r.statut === 'a optimiser');
  const failed = results.filter((r) => r.statut.startsWith('echec'));
  const gain = touched.reduce((s, r) => s + (r.avant - r.apres), 0);

  console.log(
    c.bold('\n━━━ Optimisation des images sources ') +
      c.dim(`(> ${MAX_KB} Ko ou > ${MAX_WIDTH} px${DRY_RUN ? ' — simulation' : ''})`)
  );
  console.log(c.dim(`  ${files.length} images analysees | ${touched.length} traitees`));

  for (const r of touched.sort((a, b) => b.avant - a.avant)) {
    const pct = ((1 - r.apres / r.avant) * 100).toFixed(0);
    console.log(`    ${c.dim(fmt(r.avant))} → ${c.green(fmt(r.apres))}  ${c.dim(`-${pct}%`)}  ${r.rel}`);
  }

  for (const r of failed) console.log('    ' + c.red(r.statut) + '  ' + r.rel);

  if (touched.length) {
    console.log(
      c.green(`\n  ✓ ${(gain / 1024).toFixed(1)} Mo ${DRY_RUN ? 'economisables' : 'economises'}`) +
        c.dim(` — originaux conserves dans ${toPosix(relative(ROOT, BACKUP_DIR))}/`)
    );
  } else {
    console.log(c.green('\n  ✓ Rien a optimiser.'));
  }
  console.log('');

  if (failed.length) process.exit(1);
}

main();
