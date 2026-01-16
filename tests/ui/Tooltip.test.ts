import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Tooltip from '~/components/ui/Tooltip.vue';

describe('Tooltip', () => {
  // Helper pour accéder aux éléments
  const getTooltip = (wrapper: ReturnType<typeof mount>) => wrapper.find('.tooltip');
  const getTrigger = (wrapper: ReturnType<typeof mount>) => wrapper.find('.tooltip__trigger');
  const getContent = (wrapper: ReturnType<typeof mount>) => wrapper.find('.tooltip__content');

  // ============================================
  // RENDU DE BASE
  // ============================================

  it('renders tooltip wrapper', () => {
    const wrapper = mount(Tooltip, {
      props: { text: 'Tooltip text' },
      slots: { default: '<button>Hover me</button>' },
    });

    expect(getTooltip(wrapper).exists()).toBe(true);
  });

  it('renders trigger slot content', () => {
    const wrapper = mount(Tooltip, {
      props: { text: 'Tooltip text' },
      slots: { default: '<button>Hover me</button>' },
    });

    expect(getTrigger(wrapper).find('button').exists()).toBe(true);
  });

  it('tooltip content is hidden by default', () => {
    const wrapper = mount(Tooltip, {
      props: { text: 'Tooltip text' },
      slots: { default: '<button>Hover me</button>' },
    });

    expect(getContent(wrapper).exists()).toBe(false);
  });

  // ============================================
  // PROPS
  // ============================================

  describe('props', () => {
    it('text is displayed when visible', async () => {
      const wrapper = mount(Tooltip, {
        props: { text: 'Help text' },
        slots: { default: '<span>?</span>' },
      });

      await getTrigger(wrapper).trigger('mouseenter');

      expect(getContent(wrapper).exists()).toBe(true);
      expect(getContent(wrapper).text()).toBe('Help text');
    });

    it('position="top" applies tooltip__content--top class', async () => {
      const wrapper = mount(Tooltip, {
        props: { text: 'Text', position: 'top' },
        slots: { default: '<span>?</span>' },
      });

      await getTrigger(wrapper).trigger('mouseenter');

      expect(getContent(wrapper).classes()).toContain('tooltip__content--top');
    });

    it('position="bottom" applies tooltip__content--bottom class', async () => {
      const wrapper = mount(Tooltip, {
        props: { text: 'Text', position: 'bottom' },
        slots: { default: '<span>?</span>' },
      });

      await getTrigger(wrapper).trigger('mouseenter');

      expect(getContent(wrapper).classes()).toContain('tooltip__content--bottom');
    });

    it('position="left" applies tooltip__content--left class', async () => {
      const wrapper = mount(Tooltip, {
        props: { text: 'Text', position: 'left' },
        slots: { default: '<span>?</span>' },
      });

      await getTrigger(wrapper).trigger('mouseenter');

      expect(getContent(wrapper).classes()).toContain('tooltip__content--left');
    });

    it('position="right" applies tooltip__content--right class', async () => {
      const wrapper = mount(Tooltip, {
        props: { text: 'Text', position: 'right' },
        slots: { default: '<span>?</span>' },
      });

      await getTrigger(wrapper).trigger('mouseenter');

      expect(getContent(wrapper).classes()).toContain('tooltip__content--right');
    });

    it('default position is "top"', async () => {
      const wrapper = mount(Tooltip, {
        props: { text: 'Text' },
        slots: { default: '<span>?</span>' },
      });

      await getTrigger(wrapper).trigger('mouseenter');

      expect(getContent(wrapper).classes()).toContain('tooltip__content--top');
    });
  });

  // ============================================
  // INTERACTIONS - HOVER
  // ============================================

  describe('hover interactions', () => {
    it('shows on mouseenter', async () => {
      const wrapper = mount(Tooltip, {
        props: { text: 'Tooltip' },
        slots: { default: '<span>?</span>' },
      });

      expect(getContent(wrapper).exists()).toBe(false);

      await getTrigger(wrapper).trigger('mouseenter');

      expect(getContent(wrapper).exists()).toBe(true);
    });

    it('hides on mouseleave', async () => {
      const wrapper = mount(Tooltip, {
        props: { text: 'Tooltip' },
        slots: { default: '<span>?</span>' },
      });

      await getTrigger(wrapper).trigger('mouseenter');
      expect(getContent(wrapper).exists()).toBe(true);

      await getTrigger(wrapper).trigger('mouseleave');
      expect(getContent(wrapper).exists()).toBe(false);
    });
  });

  // ============================================
  // ACCESSIBILITY
  // ============================================

  describe('accessibility', () => {
    it('content has role="tooltip"', async () => {
      const wrapper = mount(Tooltip, {
        props: { text: 'Accessible tooltip' },
        slots: { default: '<span>?</span>' },
      });

      await getTrigger(wrapper).trigger('mouseenter');

      expect(getContent(wrapper).attributes('role')).toBe('tooltip');
    });
  });

  // ============================================
  // CONFORMITÉ CLAUDE.md - UI (Niveau 2a)
  // ============================================

  describe('conformité CLAUDE.md', () => {
    it('utilise des classes BEM (.tooltip, .tooltip__*, .tooltip__content--*)', async () => {
      const wrapper = mount(Tooltip, {
        props: { text: 'Text', position: 'bottom' },
        slots: { default: '<span>?</span>' },
      });

      await getTrigger(wrapper).trigger('mouseenter');

      // Block
      expect(getTooltip(wrapper).classes()).toContain('tooltip');
      // Elements
      expect(wrapper.find('.tooltip__trigger').exists()).toBe(true);
      expect(wrapper.find('.tooltip__content').exists()).toBe(true);
      expect(wrapper.find('.tooltip__arrow').exists()).toBe(true);
      // Modifiers
      expect(getContent(wrapper).classes()).toContain('tooltip__content--bottom');
    });

    it('n\'émet aucun événement (composant dumb)', async () => {
      const wrapper = mount(Tooltip, {
        props: { text: 'Text' },
        slots: { default: '<span>?</span>' },
      });

      await getTrigger(wrapper).trigger('mouseenter');
      await getTrigger(wrapper).trigger('mouseleave');

      expect(wrapper.emitted()).toEqual({});
    });
  });

  // ============================================
  // SNAPSHOTS
  // ============================================

  describe('snapshots', () => {
    it('matches snapshot - hidden', () => {
      const wrapper = mount(Tooltip, {
        props: { text: 'Tooltip text' },
        slots: { default: '<button>Hover</button>' },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });

    it('matches snapshot - visible top', async () => {
      const wrapper = mount(Tooltip, {
        props: { text: 'Top tooltip', position: 'top' },
        slots: { default: '<button>Hover</button>' },
      });

      await getTrigger(wrapper).trigger('mouseenter');

      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});
