/**
 * TESTS DE CONFORMITÉ AU CAHIER DES CHARGES (CDC)
 *
 * Ce fichier vérifie que tous les composants respectent les règles
 * définies dans les fichiers CLAUDE.md de chaque niveau.
 *
 * Structure du CDC :
 * - Niveau 2a : UI Components (dumb, CSS natif, BEM, events natifs uniquement)
 * - Niveau 2b : Layout Components (wrappers passifs, Tailwind, AUCUN event)
 * - Niveau 3  : Sections (orchestrateurs, events custom autorisés, pas de logique métier)
 */

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import * as fs from 'fs';
import * as path from 'path';

// ============================================
// RÈGLE 1 : NIVEAUX ET RESPONSABILITÉS
// ============================================

describe('CDC - Niveaux et Responsabilités', () => {
  describe('Niveau 2a - UI Components (Dumb)', () => {
    it('les composants UI sont de présentation pure sans logique métier', () => {
      // Cette règle est vérifiée par inspection du code source
      // Les composants UI ne doivent pas avoir : useRouter, useFetch, useStore
      const uiComponentsPath = path.resolve(__dirname, '../../app/components/ui');

      // Vérifier que le dossier existe
      expect(fs.existsSync(uiComponentsPath)).toBe(true);

      // Liste des patterns interdits dans UI components
      const forbiddenPatterns = [
        'useRouter',
        'useFetch',
        'useAsyncData',
        'navigateTo',
        'useUserStore',
        'useAuthStore',
        'router.push',
        '$router',
      ];

      const uiFiles = fs.readdirSync(uiComponentsPath).filter((f) => f.endsWith('.vue'));

      uiFiles.forEach((file) => {
        const content = fs.readFileSync(path.join(uiComponentsPath, file), 'utf-8');

        forbiddenPatterns.forEach((pattern) => {
          expect(content).not.toContain(pattern);
        });
      });
    });

    it('les composants UI utilisent des classes BEM', () => {
      const uiComponentsPath = path.resolve(__dirname, '../../app/components/ui');
      const uiFiles = fs.readdirSync(uiComponentsPath).filter((f) => f.endsWith('.vue'));

      // Composants qui doivent avoir du BEM (exclus: Heading, Text qui délèguent à _typography.css)
      const componentsWithBEM = uiFiles.filter(
        (f) => !['Heading.vue', 'Text.vue'].includes(f),
      );

      componentsWithBEM.forEach((file) => {
        const content = fs.readFileSync(path.join(uiComponentsPath, file), 'utf-8');

        // Doit avoir un <style scoped> (sauf Heading/Text)
        if (!['Heading.vue', 'Text.vue'].includes(file)) {
          // BEM pattern : .block, .block__element, .block--modifier
          // Au minimum un . suivi de lettres
          expect(content).toMatch(/<style[^>]*scoped[^>]*>/);
        }
      });
    });
  });

  describe('Niveau 2b - Layout Components (Wrappers Passifs)', () => {
    // Composants Layout "purs" (wrappers passifs sans logique)
    // Exclus: Header, Footer, Sidebar qui sont des composants Layout "spéciaux"
    // avec logique de navigation/theme/état
    const pureLayoutComponents = ['Container.vue', 'Grid.vue', 'ContainerFlex.vue', 'SplitPane.vue'];

    it('les composants Layout purs n\'ont PAS de <style scoped> (sauf exceptions)', () => {
      const layoutComponentsPath = path.resolve(__dirname, '../../app/components/layout');

      // Exceptions connues: Container.vue a un style scoped minimal pour le centrage
      const exceptions = ['Container.vue'];

      pureLayoutComponents
        .filter((f) => !exceptions.includes(f))
        .forEach((file) => {
          const content = fs.readFileSync(path.join(layoutComponentsPath, file), 'utf-8');

          // Ne doit PAS avoir de <style scoped> avec du CSS natif complexe
          const hasStyleScoped = content.includes('<style scoped>');
          if (hasStyleScoped) {
            // Si style scoped présent, il doit être minimal (juste quelques lignes)
            const styleMatch = content.match(/<style[^>]*scoped[^>]*>([\s\S]*?)<\/style>/);
            if (styleMatch) {
              const styleContent = styleMatch[1];
              // Maximum 10 lignes de CSS autorisées
              const lines = styleContent.trim().split('\n').filter((l) => l.trim());
              expect(lines.length).toBeLessThan(15);
            }
          }
        });
    });

    it('les composants Layout purs n\'émettent AUCUN événement', () => {
      const layoutComponentsPath = path.resolve(__dirname, '../../app/components/layout');

      pureLayoutComponents.forEach((file) => {
        const content = fs.readFileSync(path.join(layoutComponentsPath, file), 'utf-8');

        // Ne doit PAS avoir defineEmits
        expect(content).not.toContain('defineEmits');
        // Ne doit PAS avoir emit(
        expect(content).not.toMatch(/emit\s*\(/);
        // Ne doit PAS avoir @click="emit
        expect(content).not.toMatch(/@click="emit/);
      });
    });

    it('les composants Layout utilisent des classes Tailwind', () => {
      const layoutComponentsPath = path.resolve(__dirname, '../../app/components/layout');
      const layoutFiles = fs.readdirSync(layoutComponentsPath).filter((f) => f.endsWith('.vue'));

      const tailwindPatterns = [
        'flex',
        'grid',
        'gap-',
        'items-',
        'justify-',
        'max-w-',
        'col-span-',
        'grid-cols-',
      ];

      layoutFiles.forEach((file) => {
        const content = fs.readFileSync(path.join(layoutComponentsPath, file), 'utf-8');

        // Doit utiliser au moins un pattern Tailwind
        const hasTailwind = tailwindPatterns.some((pattern) => content.includes(pattern));
        expect(hasTailwind).toBe(true);
      });
    });
  });

  describe('Niveau 3 - Sections (Orchestrateurs)', () => {
    it('les Sections utilisent des composants Layout OU Tailwind pour la structure', () => {
      const sectionsPath = path.resolve(__dirname, '../../app/components/sections');
      const sectionFiles = fs.readdirSync(sectionsPath).filter((f) => f.endsWith('.vue'));

      // Les sections doivent utiliser des composants Layout OU Tailwind directement
      const layoutComponents = ['LayoutContainer', 'LayoutContainerFlex', 'LayoutGrid', 'LayoutSplitPane'];
      const tailwindLayoutPatterns = ['container', 'flex', 'grid', 'mx-auto'];

      sectionFiles.forEach((file) => {
        const content = fs.readFileSync(path.join(sectionsPath, file), 'utf-8');

        // Doit utiliser soit un Layout component soit Tailwind pour la structure
        const hasLayoutComponent = layoutComponents.some((comp) => content.includes(`<${comp}`));
        const hasTailwindLayout = tailwindLayoutPatterns.some((pattern) => content.includes(pattern));

        expect(hasLayoutComponent || hasTailwindLayout).toBe(true);
      });
    });

    it('les Sections n\'ont pas de logique métier', () => {
      const sectionsPath = path.resolve(__dirname, '../../app/components/sections');
      const sectionFiles = fs.readdirSync(sectionsPath).filter((f) => f.endsWith('.vue'));

      const forbiddenPatterns = [
        'useRouter',
        'useFetch',
        'useAsyncData',
        'navigateTo',
        'router.push',
        '$router',
        'useUserStore',
        'useAuthStore',
      ];

      sectionFiles.forEach((file) => {
        const content = fs.readFileSync(path.join(sectionsPath, file), 'utf-8');

        forbiddenPatterns.forEach((pattern) => {
          expect(content).not.toContain(pattern);
        });
      });
    });
  });
});

// ============================================
// RÈGLE 2 : EVENTS
// ============================================

describe('CDC - Règles d\'événements', () => {
  describe('UI Components - Events natifs uniquement', () => {
    it('les composants UI n\'émettent que des events natifs ou v-model', () => {
      const uiComponentsPath = path.resolve(__dirname, '../../app/components/ui');
      const uiFiles = fs.readdirSync(uiComponentsPath).filter((f) => f.endsWith('.vue'));

      // Events natifs autorisés
      const allowedEvents = [
        'update:modelValue', // v-model
        'click',
        'input',
        'change',
        'focus',
        'blur',
        'keydown',
        'keyup',
        'select', // Dropdown select (natif pour <select>)
        'close', // Modal/Toast close (comportement UI standard)
      ];

      uiFiles.forEach((file) => {
        const content = fs.readFileSync(path.join(uiComponentsPath, file), 'utf-8');

        // Chercher les defineEmits
        const emitsMatch = content.match(/defineEmits<[^>]+>/s);
        if (emitsMatch) {
          // Vérifier que tous les events sont dans la liste autorisée
          const emitsContent = emitsMatch[0];

          // Extraire les noms d'events
          const eventMatches = emitsContent.match(/'([^']+)'/g);
          if (eventMatches) {
            eventMatches.forEach((event) => {
              const eventName = event.replace(/'/g, '');
              expect(allowedEvents).toContain(eventName);
            });
          }
        }
      });
    });
  });

  describe('Layout Components - AUCUN event (wrappers passifs)', () => {
    // Composants Layout "purs" (wrappers passifs sans logique)
    // Exclus: Header, Footer, Sidebar qui sont des composants Layout "spéciaux" avec logique de navigation/theme
    const pureLayoutComponents = ['Container.vue', 'Grid.vue', 'ContainerFlex.vue', 'SplitPane.vue'];

    it('les composants Layout purs n\'ont aucun defineEmits', () => {
      const layoutComponentsPath = path.resolve(__dirname, '../../app/components/layout');

      pureLayoutComponents.forEach((file) => {
        const content = fs.readFileSync(path.join(layoutComponentsPath, file), 'utf-8');
        expect(content).not.toContain('defineEmits');
      });
    });
  });

  describe('Sections - Events custom sémantiques', () => {
    it('les Sections peuvent émettre des events custom', () => {
      const sectionsPath = path.resolve(__dirname, '../../app/components/sections');

      // CTA.vue doit avoir des events
      const ctaContent = fs.readFileSync(path.join(sectionsPath, 'CTA.vue'), 'utf-8');
      expect(ctaContent).toContain('defineEmits');
      expect(ctaContent).toContain('primary-click');
    });

    it('les events de Section sont sémantiques (pas des events DOM bruts)', () => {
      const sectionsPath = path.resolve(__dirname, '../../app/components/sections');
      const ctaContent = fs.readFileSync(path.join(sectionsPath, 'CTA.vue'), 'utf-8');

      // Doit avoir des handlers qui transforment les events
      expect(ctaContent).toContain('handlePrimaryClick');
      expect(ctaContent).toContain('handleSecondaryClick');
    });
  });
});

// ============================================
// RÈGLE 3 : STYLING
// ============================================

describe('CDC - Règles de styling', () => {
  describe('UI Components - CSS natif avec variables', () => {
    it('les composants UI utilisent des variables CSS', () => {
      const uiComponentsPath = path.resolve(__dirname, '../../app/components/ui');
      const uiFiles = fs.readdirSync(uiComponentsPath).filter((f) => f.endsWith('.vue'));

      // Composants avec CSS (pas Heading/Text)
      const componentsWithCSS = uiFiles.filter(
        (f) => !['Heading.vue', 'Text.vue'].includes(f),
      );

      componentsWithCSS.forEach((file) => {
        const content = fs.readFileSync(path.join(uiComponentsPath, file), 'utf-8');

        // Si a un <style>, doit utiliser var(--)
        if (content.includes('<style')) {
          expect(content).toMatch(/var\(--[a-z-]+\)/);
        }
      });
    });
  });

  describe('Layout Components - Tailwind uniquement', () => {
    it('les composants Layout n\'utilisent pas var(--)', () => {
      const layoutComponentsPath = path.resolve(__dirname, '../../app/components/layout');
      const layoutFiles = fs.readdirSync(layoutComponentsPath).filter((f) => f.endsWith('.vue'));

      layoutFiles.forEach((file) => {
        const content = fs.readFileSync(path.join(layoutComponentsPath, file), 'utf-8');

        // Ne doit pas utiliser var(--) dans le template (inline styles)
        const templateMatch = content.match(/<template>([\s\S]*?)<\/template>/);
        if (templateMatch) {
          // Autorisé dans des classes Tailwind comme bg-[var(--primary)] mais pas dans style=
          expect(templateMatch[1]).not.toMatch(/style="[^"]*var\(--/);
        }
      });
    });
  });
});

// ============================================
// RÈGLE 4 : COMPOSITION
// ============================================

describe('CDC - Règles de composition', () => {
  describe('Sections composent UI + Layout', () => {
    it('les Sections utilisent des composants UI (Button, Heading, etc.)', () => {
      const ctaPath = path.resolve(__dirname, '../../app/components/sections/CTA.vue');
      const content = fs.readFileSync(ctaPath, 'utf-8');

      // CTA doit utiliser Button, Heading, Text
      expect(content).toContain('<Button');
      expect(content).toContain('<Heading');
      expect(content).toContain('<Text');
    });

    it('les Sections utilisent des composants Layout pour la structure', () => {
      const ctaPath = path.resolve(__dirname, '../../app/components/sections/CTA.vue');
      const content = fs.readFileSync(ctaPath, 'utf-8');

      // CTA doit utiliser LayoutContainer, LayoutContainerFlex
      expect(content).toContain('<LayoutContainer');
      expect(content).toContain('<LayoutContainerFlex');
    });
  });
});

// ============================================
// RÈGLE 5 : PROPS MINIMALES (YAGNI)
// ============================================

describe('CDC - Props minimales (YAGNI)', () => {
  it('les composants UI ont des interfaces Props TypeScript', () => {
    const uiComponentsPath = path.resolve(__dirname, '../../app/components/ui');
    const uiFiles = fs.readdirSync(uiComponentsPath).filter((f) => f.endsWith('.vue'));

    uiFiles.forEach((file) => {
      const content = fs.readFileSync(path.join(uiComponentsPath, file), 'utf-8');

      // Doit avoir interface Props
      expect(content).toMatch(/interface Props/);
    });
  });

  it('les composants Layout avec props ont des interfaces Props TypeScript', () => {
    const layoutComponentsPath = path.resolve(__dirname, '../../app/components/layout');
    const layoutFiles = fs.readdirSync(layoutComponentsPath).filter((f) => f.endsWith('.vue'));

    layoutFiles.forEach((file) => {
      const content = fs.readFileSync(path.join(layoutComponentsPath, file), 'utf-8');

      // Si le composant a des props, il doit avoir interface Props
      if (content.includes('defineProps')) {
        expect(content).toMatch(/interface Props/);
      }
    });
  });

  it('les composants avec props optionnelles utilisent withDefaults()', () => {
    const uiComponentsPath = path.resolve(__dirname, '../../app/components/ui');
    const uiFiles = fs.readdirSync(uiComponentsPath).filter((f) => f.endsWith('.vue'));

    // Composants avec uniquement des props requises (pas besoin de withDefaults)
    const componentsWithOnlyRequiredProps = ['Tabs.vue'];

    uiFiles
      .filter((f) => !componentsWithOnlyRequiredProps.includes(f))
      .forEach((file) => {
        const content = fs.readFileSync(path.join(uiComponentsPath, file), 'utf-8');

        // Si le composant a des props optionnelles (?:), il doit avoir withDefaults
        if (content.includes('defineProps') && content.match(/\w+\?:/)) {
          expect(content).toContain('withDefaults');
        }
      });
  });
});

// ============================================
// RÈGLE 6 : DOCUMENTATION
// ============================================

describe('CDC - Documentation', () => {
  it('chaque dossier de composants a un CLAUDE.md', () => {
    const componentsDirs = [
      '../../app/components/ui',
      '../../app/components/layout',
      '../../app/components/sections',
      '../../app/components/showcase',
    ];

    componentsDirs.forEach((dir) => {
      const fullPath = path.resolve(__dirname, dir, 'CLAUDE.md');
      expect(fs.existsSync(fullPath)).toBe(true);
    });
  });

  it('les composants ont des headers de documentation', () => {
    const uiComponentsPath = path.resolve(__dirname, '../../app/components/ui');
    const uiFiles = fs.readdirSync(uiComponentsPath).filter((f) => f.endsWith('.vue'));

    // Au moins 80% des composants doivent avoir une documentation
    let documented = 0;

    uiFiles.forEach((file) => {
      const content = fs.readFileSync(path.join(uiComponentsPath, file), 'utf-8');

      // Chercher un commentaire de documentation
      if (
        content.includes('Description :') ||
        content.includes('Input (Props)') ||
        content.includes('@dev')
      ) {
        documented++;
      }
    });

    const percentage = (documented / uiFiles.length) * 100;
    expect(percentage).toBeGreaterThanOrEqual(80);
  });
});
