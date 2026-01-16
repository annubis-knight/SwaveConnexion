import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Button from '~/components/ui/Button.vue';

describe('Button', () => {
  // Helper pour accéder au bouton
  const getButton = (wrapper: ReturnType<typeof mount>) => wrapper.find('button');

  // ============================================
  // RENDU DE BASE
  // ============================================

  it('renders a button element', () => {
    const wrapper = mount(Button, {
      slots: { default: 'Click me' },
    });

    expect(getButton(wrapper).exists()).toBe(true);
  });

  it('renders slot content', () => {
    const wrapper = mount(Button, {
      slots: { default: 'Click me' },
    });

    expect(getButton(wrapper).text()).toBe('Click me');
  });

  it('applies default classes (primary, md)', () => {
    const wrapper = mount(Button);
    const button = getButton(wrapper);

    expect(button.classes()).toContain('btn');
    expect(button.classes()).toContain('btn--primary');
    expect(button.classes()).toContain('btn--md');
  });

  // ============================================
  // PROPS
  // ============================================

  describe('props', () => {
    it.each([
      ['primary', 'btn--primary'],
      ['secondary', 'btn--secondary'],
      ['accent', 'btn--accent'],
      ['outline', 'btn--outline'],
      ['outline-light', 'btn--outline-light'],
    ] as const)('variant="%s" applies class "%s"', (variant, expectedClass) => {
      const wrapper = mount(Button, {
        props: { variant },
      });

      expect(getButton(wrapper).classes()).toContain(expectedClass);
    });

    it.each([
      ['sm', 'btn--sm'],
      ['md', 'btn--md'],
      ['lg', 'btn--lg'],
    ] as const)('size="%s" applies class "%s"', (size, expectedClass) => {
      const wrapper = mount(Button, {
        props: { size },
      });

      expect(getButton(wrapper).classes()).toContain(expectedClass);
    });

    it('disabled=true applies btn--disabled class', () => {
      const wrapper = mount(Button, {
        props: { disabled: true },
      });

      expect(getButton(wrapper).classes()).toContain('btn--disabled');
    });

    it('disabled=true sets disabled attribute', () => {
      const wrapper = mount(Button, {
        props: { disabled: true },
      });

      expect(getButton(wrapper).attributes('disabled')).toBeDefined();
    });
  });

  // ============================================
  // EVENTS
  // ============================================

  describe('events', () => {
    it('emits click event when clicked', async () => {
      const wrapper = mount(Button);

      await getButton(wrapper).trigger('click');

      expect(wrapper.emitted('click')).toHaveLength(1);
    });

    it('click event contains MouseEvent', async () => {
      const wrapper = mount(Button);

      await getButton(wrapper).trigger('click');

      const clickEvents = wrapper.emitted('click');
      expect(clickEvents).toBeTruthy();
      expect(clickEvents![0][0]).toBeInstanceOf(MouseEvent);
    });
  });

  // ============================================
  // SNAPSHOTS
  // ============================================

  describe('snapshots', () => {
    it('matches snapshot - primary md', () => {
      const wrapper = mount(Button, {
        slots: { default: 'Primary Button' },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });

    it('matches snapshot - outline lg', () => {
      const wrapper = mount(Button, {
        props: { variant: 'outline', size: 'lg' },
        slots: { default: 'Outline Large' },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });

    it('matches snapshot - disabled', () => {
      const wrapper = mount(Button, {
        props: { disabled: true },
        slots: { default: 'Disabled' },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});
