#!/usr/bin/env node
/**
 * GATE PERFORMANCE IMAGES — check-image-weights.mjs
 *
 * OBJECTIF
 * --------
 * Garantir qu'AUCUNE image lourde ne parte en production, quelle que soit
 * son format d'origine, sa taille source ou l'endroit ou elle a ete posee.
 * S'execute sur la sortie du build statique (.output/public), donc analyse
 * exactement ce qui sera deploye sur Firebase Hosting.
 *
 * COMMENT CA MARCHE
 * -----------------
 * Chaque image du build est classee en 3 categories :
 *
 *   1. OPTIMIZED  -> variantes generees par @nuxt/image (dossier _ipx/).
 *                    C'est ce que les visiteurs telechargent reellement.
 *                    Chacune doit rester sous le seuil FAIL.
 *
 *   2. RAW        -> image servie TELLE QUELLE aux visiteurs (bundle Vite dans
 *                    _nuxt/, ou fichier public/ reference en <img> brut) SANS
 *                    variante _ipx correspondante = non optimisee. C'est LE
 *                    risque perf : au-dessus du seuil FAIL -> echec.
 *
 *   3. SOURCE     -> original present dans public/ qui possede des variantes
 *                    _ipx (donc consomme via <NuxtImg>). Le visiteur NE le
 *                    telecharge PAS -> pas un souci de perf, juste du poids de
 *                    deploiement (astuce: image.dir pour le sortir du dossier
 *                    servi). Avertissement, jamais echec.
 *
 * USAGE
 * -----
 *   node scripts/check-image-weights.mjs            # rapport (n'echoue jamais)
 *   node scripts/check-image-weights.mjs --strict   # exit 1 si un RAW/OPTIMIZED depasse FAIL
 *
 * SEUILS (surchargeables par variables d'env)
 *   IMG_WARN_KB (defaut 150)  -> au-dela : averti
 *   IMG_FAIL_KB (defaut 300)  -> au-dela : bloque en mode --strict
 */

import { readdirSync, statSync } from 'node:fs';
import { join, relative, sep, posix } from 'node:path';
import { fileURLToPath } from 'node:url';

/* ── Config ─────────────────────────────────────────────────────────────── */
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const OUTPUT_DIR = join(ROOT, '.output', 'public');
const WARN_KB = Number(process.env.IMG_WARN_KB ?? 150);
const FAIL_KB = Number(process.env.IMG_FAIL_KB ?? 300);
const STRICT = process.argv.includes('--strict');
const IMAGE_RE = /\.(png|jpe?g|webp|avif|gif)$/i;

const c = {
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
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
    const full = join(dir, e.name);
    if (e.isDirectory()) walk(full, acc);
    else if (IMAGE_RE.test(e.name)) acc.push(full);
  }
  return acc;
}

const toPosix = (p) => p.split(sep).join(posix.sep);

/** _ipx/w_640&f_webp&q_70/images/foo.png  ->  images/foo.png */
const ipxSourceKey = (relPosix) => relPosix.split('/').slice(2).join('/');

function statSafe(p) {
  try {
    return statSync(p);
  } catch {
    return null;
  }
}

function main() {
  if (!statSafe(OUTPUT_DIR)) {
    console.error(c.red(`\n✗ Build introuvable : ${toPosix(relative(ROOT, OUTPUT_DIR))}`));
    console.error(c.dim("  Lance d'abord `nuxt generate`.\n"));
    process.exit(STRICT ? 1 : 0);
  }

  const files = walk(OUTPUT_DIR).map((full) => {
    const rel = toPosix(relative(OUTPUT_DIR, full));
    return { rel, kb: statSync(full).size / 1024, isIpx: rel.startsWith('_ipx/') };
  });

  const ipxKeys = new Set(files.filter((f) => f.isIpx).map((f) => ipxSourceKey(f.rel)));

  const optimized = [];
  const raw = [];
  const source = [];
  for (const f of files) {
    if (f.isIpx) optimized.push(f);
    else if (ipxKeys.has(f.rel)) source.push(f);
    else raw.push(f);
  }

  const failOptimized = optimized.filter((f) => f.kb > FAIL_KB);
  const failRaw = raw.filter((f) => f.kb > FAIL_KB);
  const warnRaw = raw.filter((f) => f.kb > WARN_KB && f.kb <= FAIL_KB);
  const warnSource = source.filter((f) => f.kb > WARN_KB);
  const failures = [...failRaw, ...failOptimized].sort((a, b) => b.kb - a.kb);

  const kb = (n) => `${n.toFixed(0).padStart(5)} Ko`;
  const totalOpt = optimized.reduce((s, f) => s + f.kb, 0);
  const totalSrc = source.reduce((s, f) => s + f.kb, 0);

  console.log(c.bold('\n━━━ Gate performance images ') + c.dim(`(warn ${WARN_KB} Ko / fail ${FAIL_KB} Ko)`));
  console.log(
    c.dim(
      `  ${files.length} images | ${optimized.length} optimisees _ipx (${(totalOpt / 1024).toFixed(1)} Mo) | ` +
        `${raw.length} brutes | ${source.length} originaux-source (${(totalSrc / 1024).toFixed(1)} Mo)`
    )
  );

  if (failures.length) {
    console.log(c.red(c.bold('\n  ✗ IMAGES NON OPTIMISEES TELECHARGEES PAR LES VISITEURS :')));
    for (const f of failures) console.log('    ' + c.red(kb(f.kb)) + '  ' + f.rel);
    console.log(c.dim('    → convertir en <NuxtImg> (ou reduire) : ces images partent brutes en prod.'));
  }

  if (warnRaw.length) {
    console.log(c.yellow('\n  ! Images brutes moyennes (a surveiller) :'));
    for (const f of warnRaw.sort((a, b) => b.kb - a.kb)) console.log('    ' + c.yellow(kb(f.kb)) + '  ' + f.rel);
  }

  if (warnSource.length) {
    const srcMo = (warnSource.reduce((s, f) => s + f.kb, 0) / 1024).toFixed(1);
    console.log(
      c.dim(
        `\n  · ${warnSource.length} originaux-source > ${WARN_KB} Ko dans public/ (${srcMo} Mo, NON telecharges ` +
          `par les visiteurs mais deployes). Astuce : image.dir pour les sortir du dossier servi.`
      )
    );
  }

  if (!failures.length && !warnRaw.length) {
    console.log(c.green('\n  ✓ Toutes les images telechargees par les visiteurs sont optimisees.'));
  }
  console.log('');

  if (STRICT && failures.length) {
    console.error(c.red(`✗ Gate echouee : ${failures.length} image(s) au-dessus de ${FAIL_KB} Ko.\n`));
    process.exit(1);
  }
}

main();
