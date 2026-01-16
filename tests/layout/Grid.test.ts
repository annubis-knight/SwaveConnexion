import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Grid from '~/components/layout/Grid.vue';

describe('Grid', () => {
  // Helper pour accéder à l'élément grid
  const getGrid = (wrapper: ReturnType<typeof mount>) => wrapper.find('div');

  // ============================================
  // RENDU DE BASE
  // ============================================

  it('renders a div element', () => {
    const wrapper = mount(Grid);

    expect(getGrid(wrapper).exists()).toBe(true);
  });

  it('renders slot content', () => {
    const wrapper = mount(Grid, {
      slots: { default: '<div>Item 1</div><div>Item 2</div>' },
    });

    expect(wrapper.findAll('div').length).toBeGreaterThan(1);
  });

  it('has grid class', () => {
    const wrapper = mount(Grid);

    expect(getGrid(wrapper).classes()).toContain('grid');
  });

  // ============================================
  // PROPS
  // ============================================

  describe('props', () => {
    it.each([
      [1, 'grid-cols-1'],
      [2, 'grid-cols-2'],
      [3, 'grid-cols-3'],
      [4, 'grid-cols-4'],
      [6, 'grid-cols-6'],
      [12, 'grid-cols-12'],
    ] as const)('cols=%i applies class "%s"', (cols, expectedClass) => {
      const wrapper = mount(Grid, {
        props: { cols },
      });

      expect(getGrid(wrapper).classes()).toContain(expectedClass);
    });

    it('default cols is 3', () => {
      const wrapper = mount(Grid);

      expect(getGrid(wrapper).classes()).toContain('grid-cols-3');
    });

    it.each([
      ['sm', 'gap-4'],
      ['md', 'gap-6'],
      ['lg', 'gap-8'],
      ['xl', 'gap-12'],
    ] as const)('gap="%s" applies class "%s"', (gap, expectedClass) => {
      const wrapper = mount(Grid, {
        props: { gap },
      });

      expect(getGrid(wrapper).classes()).toContain(expectedClass);
    });

    it('default gap is "md"', () => {
      const wrapper = mount(Grid);

      expect(getGrid(wrapper).classes()).toContain('gap-6');
    });

    it('responsive prop adds breakpoint classes', () => {
      const wrapper = mount(Grid, {
        props: {
          cols: 4,
          responsive: { sm: 1, md: 2, lg: 4 },
        },
      });

      const classes = getGrid(wrapper).classes();
      expect(classes).toContain('sm:grid-cols-1');
      expect(classes).toContain('md:grid-cols-2');
      expect(classes).toContain('lg:grid-cols-4');
    });
  });

  // ============================================
  // CONFORMITÉ CLAUDE.md - LAYOUT (Niveau 2b)
  // ============================================

  describe('conformité CLAUDE.md - Layout', () => {
    it('utilise uniquement des classes Tailwind', () => {
      const wrapper = mount(Grid, {
        props: { cols: 3, gap: 'lg' },
      });

      const classes = getGrid(wrapper).classes();

      // Vérifier que ce sont des classes Tailwind
      expect(classes).toContain('grid');
      expect(classes.some((c) => c.startsWith('grid-cols-'))).toBe(true);
      expect(classes.some((c) => c.startsWith('gap-'))).toBe(true);

      // Pas de classes BEM
      expect(classes.every((c) => !c.includes('__'))).toBe(true);
      expect(classes.every((c) => !c.match(/^[a-z]+--/))).toBe(true);
    });

    it('n\'émet AUCUN événement (wrapper passif)', () => {
      const wrapper = mount(Grid, {
        slots: { default: '<div>Item</div>' },
      });

      expect(wrapper.emitted()).toEqual({});
    });

    it('ne contient pas de <style scoped>', () => {
      // Le composant Grid ne devrait pas avoir de styles scopés
      // Vérification indirecte: pas de data-v-* attribute
      const wrapper = mount(Grid);
      const html = wrapper.html();

      // Grid n'a pas de style scoped, donc pas de data-v-*
      // (contrairement aux composants UI qui ont des styles scopés)
      expect(html).not.toMatch(/data-v-[a-f0-9]+/);
    });
  });

  // ============================================
  // SNAPSHOTS
  // ============================================

  describe('snapshots', () => {
    it('matches snapshot - 3 cols default', () => {
      const wrapper = mount(Grid, {
        slots: { default: '<div>1</div><div>2</div><div>3</div>' },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });

    it('matches snapshot - responsive', () => {
      const wrapper = mount(Grid, {
        props: { cols: 4, gap: 'lg', responsive: { sm: 1, md: 2, lg: 4 } },
        slots: { default: '<div>A</div><div>B</div>' },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});
