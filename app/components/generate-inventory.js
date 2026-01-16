#!/usr/bin/env node

/**
 * generate-inventory.js
 *
 * Génère automatiquement un fichier INVENTORY.json consolidé
 * regroupant tous les composants (sections/, layout/, ui/).
 *
 * Usage:
 *   node generate-inventory.js
 *
 * Output:
 *   - /components/INVENTORY.json (fichier unique consolidé)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const COMPONENT_DIRS = {
  sections: path.join(__dirname, 'sections'),
  layout: path.join(__dirname, 'layout'),
  ui: path.join(__dirname, 'ui'),
};

// Couleurs pour les logs
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Extrait les props depuis l'interface Props d'un fichier Vue
 */
function extractProps(fileContent) {
  const props = [];

  // Chercher interface Props { ... }
  const propsMatch = fileContent.match(/interface Props \{([\s\S]*?)\}/);
  if (!propsMatch) return props;

  const propsContent = propsMatch[1];

  // Parser chaque ligne de prop
  const propLines = propsContent.split('\n').filter(line => line.trim());

  for (const line of propLines) {
    // Format: propName?: type; ou propName: type;
    const match = line.match(/^\s*([a-zA-Z_][a-zA-Z0-9_]*)\??\s*:\s*(.+?);?\s*(?:\/\/.*)?$/);
    if (match) {
      const [, name, type] = match;
      props.push({
        name: name.trim(),
        type: type.trim(),
        optional: line.includes('?'),
      });
    }
  }

  return props;
}

/**
 * Extrait les valeurs par défaut depuis withDefaults
 */
function extractDefaults(fileContent) {
  const defaults = {};

  // Chercher withDefaults(defineProps<Props>(), { ... })
  const defaultsMatch = fileContent.match(/withDefaults\(defineProps<Props>\(\),\s*\{([\s\S]*?)\}\)/);
  if (!defaultsMatch) return defaults;

  const defaultsContent = defaultsMatch[1];

  // Parser chaque ligne de default
  const defaultLines = defaultsContent.split('\n').filter(line => line.trim() && !line.trim().startsWith('//'));

  for (const line of defaultLines) {
    // Format: propName: 'value', ou propName: value,
    const match = line.match(/^\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*(.+?),?\s*$/);
    if (match) {
      const [, name, value] = match;
      defaults[name.trim()] = value.trim().replace(/['"]/g, '');
    }
  }

  return defaults;
}

/**
 * Extrait les events depuis interface Emits
 */
function extractEvents(fileContent) {
  const events = [];

  // Chercher interface Emits { ... }
  const emitsMatch = fileContent.match(/interface Emits \{([\s\S]*?)\}/);
  if (!emitsMatch) return events;

  const emitsContent = emitsMatch[1];

  // Parser chaque ligne d'event
  const eventLines = emitsContent.split('\n').filter(line => line.trim());

  for (const line of eventLines) {
    // Format: 'event-name': [arg1, arg2]; ou 'event-name': [];
    const match = line.match(/['"]([a-z-]+)['"]/);
    if (match) {
      events.push(match[1]);
    }
  }

  return events;
}

/**
 * Extrait les slots depuis le template
 */
function extractSlots(fileContent) {
  const slots = [];

  // Chercher <slot name="..." />
  const slotMatches = fileContent.matchAll(/<slot(?:\s+name=["']([^"']+)["'])?/g);

  for (const match of slotMatches) {
    const slotName = match[1] || 'default';
    if (!slots.includes(slotName)) {
      slots.push(slotName);
    }
  }

  return slots;
}

/**
 * Parse un fichier Vue et extrait les informations minimales
 */
function parseVueComponent(filePath, category) {
  const fileName = path.basename(filePath, '.vue');
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  // Extraire props
  const props = extractProps(fileContent);
  const defaults = extractDefaults(fileContent);

  // Enrichir props avec les valeurs par défaut
  const enrichedProps = props.map(prop => ({
    name: prop.name,
    type: prop.type,
    optional: prop.optional,
    default: defaults[prop.name] || undefined,
  }));

  // Extraire events
  const events = extractEvents(fileContent);

  // Extraire slots
  const slots = extractSlots(fileContent);

  // Construire le chemin d'import
  const importPath = `@/components/${category}/${fileName}.vue`;

  return {
    name: fileName,
    path: importPath,
    props: enrichedProps,
    events,
    slots: slots.length > 0 ? slots : undefined,
  };
}

/**
 * Génère l'inventaire pour un dossier
 */
function generateInventoryForDir(dirPath, category) {
  if (!fs.existsSync(dirPath)) {
    log(`⚠️  Dossier non trouvé : ${dirPath}`, 'yellow');
    return null;
  }

  const files = fs.readdirSync(dirPath)
    .filter(file => file.endsWith('.vue'))
    .sort();

  if (files.length === 0) {
    log(`⚠️  Aucun fichier .vue dans ${category}/`, 'yellow');
    return null;
  }

  const inventory = {
    _meta: {
      generated: new Date().toISOString(),
      category,
      count: files.length,
    },
    components: [],
  };

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    try {
      const componentInfo = parseVueComponent(filePath, category);
      inventory.components.push(componentInfo);
      log(`  ✓ ${file}`, 'green');
    } catch (error) {
      log(`  ✗ ${file} - Erreur: ${error.message}`, 'red');
    }
  }

  return inventory;
}

/**
 * Sauvegarde l'inventaire consolidé dans un fichier JSON unique
 */
function saveConsolidatedInventory(inventory) {
  const outputPath = path.join(__dirname, 'INVENTORY.json');
  fs.writeFileSync(outputPath, JSON.stringify(inventory, null, 2), 'utf-8');
  log(`📄 ${path.relative(process.cwd(), outputPath)}`, 'cyan');
}

/**
 * Fonction principale
 */
function main() {
  console.log('');
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'blue');
  log('  📦 GÉNÉRATION DE L\'INVENTAIRE CONSOLIDÉ', 'blue');
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'blue');
  console.log('');

  let totalComponents = 0;
  const consolidatedInventory = {
    _meta: {
      generated: new Date().toISOString(),
      totalCount: 0,
    },
    categories: {},
  };

  for (const [category, dirPath] of Object.entries(COMPONENT_DIRS)) {
    log(`\n📂 ${category.toUpperCase()}/`, 'cyan');

    const inventory = generateInventoryForDir(dirPath, category);

    if (inventory) {
      consolidatedInventory.categories[category] = {
        count: inventory.components.length,
        components: inventory.components,
      };
      totalComponents += inventory.components.length;
      log(`  → ${inventory.components.length} composant(s) indexé(s)`, 'green');
    }
  }

  // Mettre à jour le total
  consolidatedInventory._meta.totalCount = totalComponents;

  // Sauvegarder le fichier consolidé
  console.log('');
  saveConsolidatedInventory(consolidatedInventory);

  console.log('');
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'blue');
  log(`✨ TERMINÉ : ${totalComponents} composants indexés`, 'green');
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'blue');
  console.log('');

  // Afficher le fichier créé
  const outputPath = path.join(__dirname, 'INVENTORY.json');
  log('📁 Fichier créé :', 'cyan');
  log(`   ✓ ${path.relative(process.cwd(), outputPath)}`, 'green');
  console.log('');
}

// Exécution
main();
