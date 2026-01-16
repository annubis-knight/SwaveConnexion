import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Badge from '~/components/ui/Badge.vue';

describe('Badge', () => {
  // Helper pour accéder à l'élément badge
  const getBadge = (wrapper: ReturnType<typeof mount>) => wrapper.find('.badge');

  // ============================================
  // RENDU DE BASE
  // ============================================

  it('renders a span element', () => {
    const wrapper = mount(Badge, {
      slots: { default: 'Badge' },
    });

    expect(wrapper.find('span').exists()).toBe(true);
  });

  it('renders slot content', () => {
    const wrapper = mount(Badge, {
      slots: { default: 'New' },
    });

    expect(getBadge(wrapper).text()).toBe('New');
  });

  // ============================================
  // PROPS
  // ============================================

  describe('props', () => {
    it.each([
      ['primary', 'badge--primary'],
      ['secondary', 'badge--secondary'],
      ['accent', 'badge--accent'],
      ['success', 'badge--success'],
      ['warning', 'badge--warning'],
      ['error', 'badge--error'],
    ] as const)('variant="%s" applies class "%s"', (variant, expectedClass) => {
      const wrapper = mount(Badge, {
        props: { variant },
        slots: { default: 'Label' },
      });

      expect(getBadge(wrapper).classes()).toContain(expectedClass);
    });

    it('default variant is "primary"', () => {
      const wrapper = mount(Badge, {
        slots: { default: 'Label' },
      });

      expect(getBadge(wrapper).classes()).toContain('badge--primary');
    });

    it.each([
      ['sm', 'badge--sm'],
      ['md', 'badge--md'],
    ] as const)('size="%s" applies class "%s"', (size, expectedClass) => {
      const wrapper = mount(Badge, {
        props: { size },
        slots: { default: 'Label' },
      });

      expect(getBadge(wrapper).classes()).toContain(expectedClass);
    });

    it('default size is "md"', () => {
      const wrapper = mount(Badge, {
        slots: { default: 'Label' },
      });

      expect(getBadge(wrapper).classes()).toContain('badge--md');
    });

    it('combines variant and size', () => {
      const wrapper = mount(Badge, {
        props: { variant: 'success', size: 'sm' },
        slots: { default: 'OK' },
      });

      expect(getBadge(wrapper).classes()).toContain('badge--success');
      expect(getBadge(wrapper).classes()).toContain('badge--sm');
    });
  });

  // ============================================
  // CONFORMITÉ CLAUDE.md - UI (Niveau 2a)
  // ============================================

  describe('conformité CLAUDE.md', () => {
    it('utilise des classes BEM (.badge, .badge--*)', () => {
      const wrapper = mount(Badge, {
        props: { variant: 'warning', size: 'sm' },
        slots: { default: 'Alert' },
      });

      // Block
      expect(getBadge(wrapper).classes()).toContain('badge');
      // Modifiers
      expect(getBadge(wrapper).classes()).toContain('badge--warning');
      expect(getBadge(wrapper).classes()).toContain('badge--sm');
    });

    it('n\'émet aucun événement (composant dumb)', () => {
      const wrapper = mount(Badge, {
        slots: { default: 'Test' },
      });

      expect(wrapper.emitted()).toEqual({});
    });
  });

  // ============================================
  // SNAPSHOTS
  // ============================================

  describe('snapshots', () => {
    it('matches snapshot - primary md', () => {
      const wrapper = mount(Badge, {
        slots: { default: 'Primary Badge' },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });

    it('matches snapshot - error sm', () => {
      const wrapper = mount(Badge, {
        props: { variant: 'error', size: 'sm' },
        slots: { default: 'Error' },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});
