import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Container from '~/components/layout/Container.vue';

describe('Container', () => {
  // Helper pour accéder à l'élément container
  const getContainer = (wrapper: ReturnType<typeof mount>) => wrapper.find('div');

  // ============================================
  // RENDU DE BASE
  // ============================================

  it('renders a div element', () => {
    const wrapper = mount(Container);

    expect(getContainer(wrapper).exists()).toBe(true);
  });

  it('renders slot content', () => {
    const wrapper = mount(Container, {
      slots: { default: '<p>Content</p>' },
    });

    expect(wrapper.text()).toBe('Content');
  });

  // ============================================
  // PROPS
  // ============================================

  describe('props', () => {
    it.each([
      ['sm', 'max-w-sm'],
      ['md', 'max-w-md'],
      ['lg', 'max-w-lg'],
      ['xl', 'max-w-xl'],
      ['2xl', 'max-w-2xl'],
      ['full', 'max-w-full'],
    ] as const)('size="%s" applies class "%s"', (size, expectedClass) => {
      const wrapper = mount(Container, {
        props: { size },
      });

      expect(getContainer(wrapper).classes()).toContain(expectedClass);
    });

    it('default size is "full"', () => {
      const wrapper = mount(Container);

      expect(getContainer(wrapper).classes()).toContain('max-w-full');
    });

    it('padding=true applies padding classes', () => {
      const wrapper = mount(Container, {
        props: { padding: true },
      });

      expect(getContainer(wrapper).classes()).toContain('px-6');
    });

    it('padding=false does not apply padding classes', () => {
      const wrapper = mount(Container, {
        props: { padding: false },
      });

      expect(getContainer(wrapper).classes()).not.toContain('px-6');
    });

    it('default padding is true', () => {
      const wrapper = mount(Container);

      expect(getContainer(wrapper).classes()).toContain('px-6');
    });

    it('always has w-full class', () => {
      const wrapper = mount(Container);

      expect(getContainer(wrapper).classes()).toContain('w-full');
    });
  });

  // ============================================
  // CONFORMITÉ CLAUDE.md - LAYOUT (Niveau 2b)
  // ============================================

  describe('conformité CLAUDE.md - Layout', () => {
    it('utilise des classes Tailwind (pas de CSS natif BEM)', () => {
      const wrapper = mount(Container, {
        props: { size: 'lg', padding: true },
      });

      const classes = getContainer(wrapper).classes();

      // Vérifier que ce sont des classes Tailwind
      expect(classes.some((c) => c.startsWith('max-w-'))).toBe(true);
      expect(classes).toContain('w-full');
      expect(classes.some((c) => c.startsWith('px-'))).toBe(true);

      // Pas de classes BEM style (.container, .container--, etc.)
      expect(classes.every((c) => !c.startsWith('container--'))).toBe(true);
    });

    it('n\'émet AUCUN événement (wrapper passif)', async () => {
      const wrapper = mount(Container, {
        slots: { default: '<button>Click</button>' },
      });

      // Simuler des interactions
      await wrapper.find('button').trigger('click');

      // Le container ne doit pas émettre d'events
      // Seuls les events du contenu (button) sont émis, pas relayés par Container
      const containerEvents = Object.keys(wrapper.emitted()).filter(
        (e) => !['click'].includes(e), // Ignorer les events DOM natifs
      );
      expect(containerEvents.length).toBe(0);
    });

    it('est un wrapper passif sans logique métier', () => {
      const wrapper = mount(Container);

      // Vérifier qu'il n'y a pas de data-* attributes de state complexe
      // Note: data-v-* est normal (scoped CSS), on cherche data-loading, data-error, etc.
      expect(wrapper.html()).not.toContain('data-loading');
      expect(wrapper.html()).not.toContain('data-error');
      expect(wrapper.html()).not.toContain('data-state');
    });
  });

  // ============================================
  // SNAPSHOTS
  // ============================================

  describe('snapshots', () => {
    it('matches snapshot - default', () => {
      const wrapper = mount(Container, {
        slots: { default: '<p>Container content</p>' },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });

    it('matches snapshot - lg without padding', () => {
      const wrapper = mount(Container, {
        props: { size: 'lg', padding: false },
        slots: { default: '<p>No padding</p>' },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});
