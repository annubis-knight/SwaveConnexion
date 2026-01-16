import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SplitPane from '~/components/layout/SplitPane.vue';

describe('SplitPane', () => {
  // Helper pour accéder aux éléments
  const getSplitPane = (wrapper: ReturnType<typeof mount>) => wrapper.find('div');
  const getLeftPane = (wrapper: ReturnType<typeof mount>) => wrapper.findAll('div')[1]; // Premier enfant
  const getRightPane = (wrapper: ReturnType<typeof mount>) => wrapper.findAll('div')[2]; // Deuxième enfant

  // ============================================
  // RENDU DE BASE
  // ============================================

  it('renders a div element', () => {
    const wrapper = mount(SplitPane, {
      slots: { left: 'Left', right: 'Right' },
    });

    expect(getSplitPane(wrapper).exists()).toBe(true);
  });

  it('renders left and right slots', () => {
    const wrapper = mount(SplitPane, {
      slots: {
        left: '<nav>Navigation</nav>',
        right: '<main>Content</main>',
      },
    });

    expect(wrapper.find('nav').exists()).toBe(true);
    expect(wrapper.find('main').exists()).toBe(true);
  });

  it('has grid class', () => {
    const wrapper = mount(SplitPane, {
      slots: { left: 'L', right: 'R' },
    });

    expect(getSplitPane(wrapper).classes()).toContain('grid');
  });

  // ============================================
  // PROPS
  // ============================================

  describe('props', () => {
    it('default leftWidth is 3 (applies lg:col-span-3)', () => {
      const wrapper = mount(SplitPane, {
        slots: { left: 'L', right: 'R' },
      });

      expect(getLeftPane(wrapper).classes()).toContain('lg:col-span-3');
    });

    it.each([
      [2, 'lg:col-span-2', 'lg:col-span-10'],
      [3, 'lg:col-span-3', 'lg:col-span-9'],
      [4, 'lg:col-span-4', 'lg:col-span-8'],
      [6, 'lg:col-span-6', 'lg:col-span-6'],
    ] as const)('leftWidth=%i applies left "%s" and right "%s"', (leftWidth, leftClass, rightClass) => {
      const wrapper = mount(SplitPane, {
        props: { leftWidth },
        slots: { left: 'L', right: 'R' },
      });

      expect(getLeftPane(wrapper).classes()).toContain(leftClass);
      expect(getRightPane(wrapper).classes()).toContain(rightClass);
    });

    it.each([
      ['none', 'gap-0'],
      ['sm', 'gap-4'],
      ['md', 'gap-6'],
      ['lg', 'gap-8'],
      ['xl', 'gap-12'],
    ] as const)('gap="%s" applies class "%s"', (gap, expectedClass) => {
      const wrapper = mount(SplitPane, {
        props: { gap },
        slots: { left: 'L', right: 'R' },
      });

      expect(getSplitPane(wrapper).classes()).toContain(expectedClass);
    });

    it('default gap is "md"', () => {
      const wrapper = mount(SplitPane, {
        slots: { left: 'L', right: 'R' },
      });

      expect(getSplitPane(wrapper).classes()).toContain('gap-6');
    });

    it('collapsible=true hides left pane on mobile', () => {
      const wrapper = mount(SplitPane, {
        props: { collapsible: true },
        slots: { left: 'L', right: 'R' },
      });

      expect(getLeftPane(wrapper).classes()).toContain('hidden');
      expect(getLeftPane(wrapper).classes()).toContain('lg:block');
    });

    it('fullHeight=true applies min-h-screen', () => {
      const wrapper = mount(SplitPane, {
        props: { fullHeight: true },
        slots: { left: 'L', right: 'R' },
      });

      expect(getSplitPane(wrapper).classes()).toContain('min-h-screen');
    });
  });

  // ============================================
  // RESPONSIVE
  // ============================================

  describe('responsive', () => {
    it('mobile layout is grid-cols-1 (stacked)', () => {
      const wrapper = mount(SplitPane, {
        slots: { left: 'L', right: 'R' },
      });

      expect(getSplitPane(wrapper).classes()).toContain('grid-cols-1');
    });

    it('desktop layout is lg:grid-cols-12', () => {
      const wrapper = mount(SplitPane, {
        slots: { left: 'L', right: 'R' },
      });

      expect(getSplitPane(wrapper).classes()).toContain('lg:grid-cols-12');
    });
  });

  // ============================================
  // CONFORMITÉ CLAUDE.md - LAYOUT (Niveau 2b)
  // ============================================

  describe('conformité CLAUDE.md - Layout', () => {
    it('utilise uniquement des classes Tailwind', () => {
      const wrapper = mount(SplitPane, {
        props: { leftWidth: 4, gap: 'lg' },
        slots: { left: 'L', right: 'R' },
      });

      const classes = getSplitPane(wrapper).classes();

      // Classes Tailwind grid
      expect(classes).toContain('grid');
      expect(classes.some((c) => c.includes('grid-cols'))).toBe(true);
      expect(classes.some((c) => c.startsWith('gap-'))).toBe(true);

      // Pas de classes BEM
      expect(classes.every((c) => !c.includes('__'))).toBe(true);
      expect(classes.every((c) => !c.match(/^split-pane--/))).toBe(true);
    });

    it('n\'émet AUCUN événement (wrapper passif)', () => {
      const wrapper = mount(SplitPane, {
        slots: { left: 'L', right: 'R' },
      });

      expect(wrapper.emitted()).toEqual({});
    });

    it('n\'a pas de <style scoped>', () => {
      const wrapper = mount(SplitPane, {
        slots: { left: 'L', right: 'R' },
      });
      const html = wrapper.html();

      // SplitPane n'a pas de style scoped
      expect(html).not.toMatch(/data-v-[a-f0-9]+/);
    });
  });

  // ============================================
  // SNAPSHOTS
  // ============================================

  describe('snapshots', () => {
    it('matches snapshot - default', () => {
      const wrapper = mount(SplitPane, {
        slots: {
          left: '<nav>Sidebar</nav>',
          right: '<main>Main content</main>',
        },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });

    it('matches snapshot - collapsible fullHeight', () => {
      const wrapper = mount(SplitPane, {
        props: { leftWidth: 4, gap: 'lg', collapsible: true, fullHeight: true },
        slots: {
          left: '<aside>Menu</aside>',
          right: '<article>Article</article>',
        },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});
