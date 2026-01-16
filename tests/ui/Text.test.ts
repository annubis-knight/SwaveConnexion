import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Text from '~/components/ui/Text.vue';

describe('Text', () => {
  // Helper pour accéder à l'élément text
  const getText = (wrapper: ReturnType<typeof mount>, tag: 'p' | 'span' = 'p') =>
    wrapper.find(tag);

  // ============================================
  // RENDU DE BASE
  // ============================================

  it('renders p element by default', () => {
    const wrapper = mount(Text, {
      slots: { default: 'Paragraph text' },
    });

    expect(getText(wrapper, 'p').exists()).toBe(true);
  });

  it('renders slot content', () => {
    const wrapper = mount(Text, {
      slots: { default: 'Paragraph text' },
    });

    expect(getText(wrapper, 'p').text()).toBe('Paragraph text');
  });

  // ============================================
  // PROPS
  // ============================================

  describe('props', () => {
    it('as="span" renders span element', () => {
      const wrapper = mount(Text, {
        props: { as: 'span' },
        slots: { default: 'Inline text' },
      });

      expect(getText(wrapper, 'span').exists()).toBe(true);
      expect(getText(wrapper, 'p').exists()).toBe(false);
    });

    it('as="p" renders p element', () => {
      const wrapper = mount(Text, {
        props: { as: 'p' },
        slots: { default: 'Paragraph' },
      });

      expect(getText(wrapper, 'p').exists()).toBe(true);
    });

    it('size="small" applies text-small class', () => {
      const wrapper = mount(Text, {
        props: { size: 'small' },
      });

      expect(getText(wrapper).classes()).toContain('text-small');
    });

    it('size="large" applies text-large class', () => {
      const wrapper = mount(Text, {
        props: { size: 'large' },
      });

      expect(getText(wrapper).classes()).toContain('text-large');
    });

    it('color="primary" applies text-primary class', () => {
      const wrapper = mount(Text, {
        props: { color: 'primary' },
      });

      expect(getText(wrapper).classes()).toContain('text-primary');
    });

    it('color="white" applies text-light class', () => {
      const wrapper = mount(Text, {
        props: { color: 'light' },
      });

      expect(getText(wrapper).classes()).toContain('text-light');
    });

    it('color="dark" applies text-dark class', () => {
      const wrapper = mount(Text, {
        props: { color: 'dark' },
      });

      expect(getText(wrapper).classes()).toContain('text-dark');
    });

    it('align="center" applies text-center class', () => {
      const wrapper = mount(Text, {
        props: { align: 'center' },
      });

      expect(getText(wrapper).classes()).toContain('text-center');
    });

    it('align="right" applies text-right class', () => {
      const wrapper = mount(Text, {
        props: { align: 'right' },
      });

      expect(getText(wrapper).classes()).toContain('text-right');
    });

    it('combines multiple props correctly', () => {
      const wrapper = mount(Text, {
        props: {
          as: 'span',
          size: 'small',
          color: 'light',
          align: 'right',
        },
      });

      const span = getText(wrapper, 'span');
      expect(span.exists()).toBe(true);
      expect(span.classes()).toContain('text-small');
      expect(span.classes()).toContain('text-light');
      expect(span.classes()).toContain('text-right');
    });

    it('has no utility classes when no optional props provided', () => {
      const wrapper = mount(Text, {
        slots: { default: 'Text' },
      });

      const p = getText(wrapper, 'p');
      expect(p.classes()).not.toContain('text-small');
      expect(p.classes()).not.toContain('text-large');
      expect(p.classes()).not.toContain('text-primary');
      expect(p.classes()).not.toContain('text-light');
      expect(p.classes()).not.toContain('text-dark');
      expect(p.classes()).not.toContain('text-center');
      expect(p.classes()).not.toContain('text-right');
    });
  });

  // ============================================
  // SNAPSHOTS
  // ============================================

  describe('snapshots', () => {
    it('matches snapshot - paragraph default', () => {
      const wrapper = mount(Text, {
        slots: { default: 'Default paragraph text.' },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });

    it('matches snapshot - span small', () => {
      const wrapper = mount(Text, {
        props: { as: 'span', size: 'small' },
        slots: { default: 'Small span' },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });

    it('matches snapshot - large light centered', () => {
      const wrapper = mount(Text, {
        props: { size: 'large', color: 'light', align: 'center' },
        slots: { default: 'Large centered text' },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});
