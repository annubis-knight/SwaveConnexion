import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Toast from '~/components/ui/Toast.vue';

// Mock Teleport pour les tests
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue');
  return {
    ...actual,
    Teleport: (props: any, { slots }: any) => slots.default?.(),
  };
});

describe('Toast', () => {
  // Helper pour accéder aux éléments
  const getToast = (wrapper: ReturnType<typeof mount>) => wrapper.find('.toast');
  const getIcon = (wrapper: ReturnType<typeof mount>) => wrapper.find('.toast__icon');
  const getTitle = (wrapper: ReturnType<typeof mount>) => wrapper.find('.toast__title');
  const getMessage = (wrapper: ReturnType<typeof mount>) => wrapper.find('.toast__message');
  const getClose = (wrapper: ReturnType<typeof mount>) => wrapper.find('.toast__close');

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // ============================================
  // RENDU DE BASE
  // ============================================

  it('does not render when isOpen is false', () => {
    const wrapper = mount(Toast, {
      props: { isOpen: false, title: 'Test' },
    });

    expect(getToast(wrapper).exists()).toBe(false);
  });

  it('renders when isOpen is true', () => {
    const wrapper = mount(Toast, {
      props: { isOpen: true, title: 'Test' },
    });

    expect(getToast(wrapper).exists()).toBe(true);
  });

  it('renders icon, title and close button', () => {
    const wrapper = mount(Toast, {
      props: { isOpen: true, title: 'Notification' },
    });

    expect(getIcon(wrapper).exists()).toBe(true);
    expect(getTitle(wrapper).exists()).toBe(true);
    expect(getClose(wrapper).exists()).toBe(true);
  });

  it('has role="alert" for accessibility', () => {
    const wrapper = mount(Toast, {
      props: { isOpen: true, title: 'Alert' },
    });

    expect(getToast(wrapper).attributes('role')).toBe('alert');
  });

  // ============================================
  // PROPS
  // ============================================

  describe('props', () => {
    it('title is displayed', () => {
      const wrapper = mount(Toast, {
        props: { isOpen: true, title: 'Success!' },
      });

      expect(getTitle(wrapper).text()).toBe('Success!');
    });

    it.each([
      ['success', 'toast--success', '✓'],
      ['warning', 'toast--warning', '⚠'],
      ['error', 'toast--error', '✕'],
      ['info', 'toast--info', 'ℹ'],
    ] as const)('variant="%s" applies class "%s" and icon "%s"', (variant, expectedClass, expectedIcon) => {
      const wrapper = mount(Toast, {
        props: { isOpen: true, title: 'Test', variant },
      });

      expect(getToast(wrapper).classes()).toContain(expectedClass);
      expect(getIcon(wrapper).text()).toBe(expectedIcon);
    });

    it('default variant is "info"', () => {
      const wrapper = mount(Toast, {
        props: { isOpen: true, title: 'Test' },
      });

      expect(getToast(wrapper).classes()).toContain('toast--info');
    });

    it('closable=false hides close button', () => {
      const wrapper = mount(Toast, {
        props: { isOpen: true, title: 'Test', closable: false },
      });

      expect(getClose(wrapper).exists()).toBe(false);
    });

    it('closable=true shows close button (default)', () => {
      const wrapper = mount(Toast, {
        props: { isOpen: true, title: 'Test' },
      });

      expect(getClose(wrapper).exists()).toBe(true);
    });
  });

  // ============================================
  // SLOTS
  // ============================================

  describe('slots', () => {
    it('renders default slot as message', () => {
      const wrapper = mount(Toast, {
        props: { isOpen: true, title: 'Title' },
        slots: { default: 'Additional message content' },
      });

      expect(getMessage(wrapper).exists()).toBe(true);
      expect(getMessage(wrapper).text()).toBe('Additional message content');
    });

    it('does not render message when slot is empty', () => {
      const wrapper = mount(Toast, {
        props: { isOpen: true, title: 'Title' },
      });

      expect(getMessage(wrapper).exists()).toBe(false);
    });
  });

  // ============================================
  // EVENTS
  // ============================================

  describe('events', () => {
    it('emits close when close button clicked', async () => {
      const wrapper = mount(Toast, {
        props: { isOpen: true, title: 'Test' },
      });

      await getClose(wrapper).trigger('click');

      expect(wrapper.emitted('close')).toBeTruthy();
    });

    it('auto-closes after duration', async () => {
      // Avec immediate: true, le timer démarre dès le montage si isOpen: true
      const wrapper = mount(Toast, {
        props: { isOpen: true, title: 'Test', duration: 3000 },
      });

      expect(wrapper.emitted('close')).toBeFalsy();

      vi.advanceTimersByTime(3000);
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted('close')).toBeTruthy();
    });

    it('does not auto-close when duration is 0', async () => {
      const wrapper = mount(Toast, {
        props: { isOpen: true, title: 'Test', duration: 0 },
      });

      vi.advanceTimersByTime(10000);

      expect(wrapper.emitted('close')).toBeFalsy();
    });
  });

  // ============================================
  // CONFORMITÉ CLAUDE.md - UI (Niveau 2a)
  // ============================================

  describe('conformité CLAUDE.md', () => {
    it('utilise des classes BEM (.toast, .toast__*, .toast--*)', () => {
      const wrapper = mount(Toast, {
        props: { isOpen: true, title: 'Test', variant: 'success' },
        slots: { default: 'Message' },
      });

      // Block
      expect(getToast(wrapper).classes()).toContain('toast');
      // Elements
      expect(wrapper.find('.toast__icon').exists()).toBe(true);
      expect(wrapper.find('.toast__content').exists()).toBe(true);
      expect(wrapper.find('.toast__title').exists()).toBe(true);
      expect(wrapper.find('.toast__message').exists()).toBe(true);
      expect(wrapper.find('.toast__close').exists()).toBe(true);
      // Modifiers
      expect(getToast(wrapper).classes()).toContain('toast--success');
    });

    it('émet "close" event', async () => {
      const wrapper = mount(Toast, {
        props: { isOpen: true, title: 'Test' },
      });

      await getClose(wrapper).trigger('click');

      expect(wrapper.emitted('close')).toBeTruthy();
    });
  });

  // ============================================
  // SNAPSHOTS
  // ============================================

  describe('snapshots', () => {
    it('matches snapshot - success with message', () => {
      const wrapper = mount(Toast, {
        props: { isOpen: true, title: 'Saved!', variant: 'success' },
        slots: { default: 'Your changes have been saved.' },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });

    it('matches snapshot - error without close button', () => {
      const wrapper = mount(Toast, {
        props: { isOpen: true, title: 'Error', variant: 'error', closable: false },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});
