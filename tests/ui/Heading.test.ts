import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Heading from '~/components/ui/Heading.vue';

describe('Heading', () => {
  // Helper pour accéder à l'élément heading
  const getHeading = (wrapper: ReturnType<typeof mount>, level = 2) =>
    wrapper.find(`h${level}`);

  // ============================================
  // RENDU DE BASE
  // ============================================

  it('renders h2 element by default', () => {
    const wrapper = mount(Heading, {
      slots: { default: 'Title' },
    });

    expect(getHeading(wrapper, 2).exists()).toBe(true);
  });

  it('renders slot content', () => {
    const wrapper = mount(Heading, {
      slots: { default: 'Title' },
    });

    expect(getHeading(wrapper, 2).text()).toBe('Title');
  });

  // ============================================
  // PROPS
  // ============================================

  describe('props', () => {
    it.each([1, 2, 3, 4, 5, 6] as const)('level=%i renders h%i element', (level) => {
      const wrapper = mount(Heading, {
        props: { level },
        slots: { default: 'Title' },
      });

      expect(getHeading(wrapper, level).exists()).toBe(true);
    });

    it('color="primary" applies text-primary class', () => {
      const wrapper = mount(Heading, {
        props: { color: 'primary' },
      });

      expect(getHeading(wrapper).classes()).toContain('text-primary');
    });

    it('color="white" applies text-light class', () => {
      const wrapper = mount(Heading, {
        props: { color: 'light' },
      });

      expect(getHeading(wrapper).classes()).toContain('text-light');
    });

    it('color="dark" applies text-dark class', () => {
      const wrapper = mount(Heading, {
        props: { color: 'dark' },
      });

      expect(getHeading(wrapper).classes()).toContain('text-dark');
    });

    it('align="center" applies text-center class', () => {
      const wrapper = mount(Heading, {
        props: { align: 'center' },
      });

      expect(getHeading(wrapper).classes()).toContain('text-center');
    });

    it('align="right" applies text-right class', () => {
      const wrapper = mount(Heading, {
        props: { align: 'right' },
      });

      expect(getHeading(wrapper).classes()).toContain('text-right');
    });

    it('combines multiple props correctly', () => {
      const wrapper = mount(Heading, {
        props: { level: 1, color: 'light', align: 'center' },
      });

      const h1 = getHeading(wrapper, 1);
      expect(h1.exists()).toBe(true);
      expect(h1.classes()).toContain('text-light');
      expect(h1.classes()).toContain('text-center');
    });

    it('has no utility classes when no optional props provided', () => {
      const wrapper = mount(Heading, {
        slots: { default: 'Title' },
      });

      const h2 = getHeading(wrapper, 2);
      expect(h2.classes()).not.toContain('text-primary');
      expect(h2.classes()).not.toContain('text-light');
      expect(h2.classes()).not.toContain('text-dark');
      expect(h2.classes()).not.toContain('text-center');
      expect(h2.classes()).not.toContain('text-right');
    });
  });

  // ============================================
  // SNAPSHOTS
  // ============================================

  describe('snapshots', () => {
    it('matches snapshot - h1 centered light', () => {
      const wrapper = mount(Heading, {
        props: { level: 1, color: 'light', align: 'center' },
        slots: { default: 'Main Title' },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });

    it('matches snapshot - h3 primary', () => {
      const wrapper = mount(Heading, {
        props: { level: 3, color: 'primary' },
        slots: { default: 'Section Title' },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });

    it('matches snapshot - h2 default (no props)', () => {
      const wrapper = mount(Heading, {
        slots: { default: 'Default Heading' },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});
