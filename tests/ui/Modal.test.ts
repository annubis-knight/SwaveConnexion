import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Modal from '~/components/ui/Modal.vue';

// Mock Teleport pour les tests
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue');
  return {
    ...actual,
    Teleport: (props: any, { slots }: any) => slots.default?.(),
  };
});

describe('Modal', () => {
  // Helper pour accéder aux éléments
  const getModal = (wrapper: ReturnType<typeof mount>) => wrapper.find('.modal');
  const getBackdrop = (wrapper: ReturnType<typeof mount>) => wrapper.find('.modal__backdrop');
  const getContainer = (wrapper: ReturnType<typeof mount>) => wrapper.find('.modal__container');
  const getHeader = (wrapper: ReturnType<typeof mount>) => wrapper.find('.modal__header');
  const getTitle = (wrapper: ReturnType<typeof mount>) => wrapper.find('.modal__title');
  const getBody = (wrapper: ReturnType<typeof mount>) => wrapper.find('.modal__body');
  const getFooter = (wrapper: ReturnType<typeof mount>) => wrapper.find('.modal__footer');
  const getClose = (wrapper: ReturnType<typeof mount>) => wrapper.find('.modal__close');

  beforeEach(() => {
    document.body.style.overflow = '';
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  // ============================================
  // RENDU DE BASE
  // ============================================

  it('does not render when isOpen is false', () => {
    const wrapper = mount(Modal, {
      props: { isOpen: false },
    });

    expect(getModal(wrapper).exists()).toBe(false);
  });

  it('renders when isOpen is true', () => {
    const wrapper = mount(Modal, {
      props: { isOpen: true },
    });

    expect(getModal(wrapper).exists()).toBe(true);
  });

  it('renders backdrop, container, header, and body', () => {
    const wrapper = mount(Modal, {
      props: { isOpen: true },
    });

    expect(getBackdrop(wrapper).exists()).toBe(true);
    expect(getContainer(wrapper).exists()).toBe(true);
    expect(getHeader(wrapper).exists()).toBe(true);
    expect(getBody(wrapper).exists()).toBe(true);
  });

  // ============================================
  // PROPS
  // ============================================

  describe('props', () => {
    it('title prop is displayed', () => {
      const wrapper = mount(Modal, {
        props: { isOpen: true, title: 'Confirm Action' },
      });

      expect(getTitle(wrapper).text()).toBe('Confirm Action');
    });

    it('default title is "Modal"', () => {
      const wrapper = mount(Modal, {
        props: { isOpen: true },
      });

      expect(getTitle(wrapper).text()).toBe('Modal');
    });
  });

  // ============================================
  // SLOTS
  // ============================================

  describe('slots', () => {
    it('renders default slot in body', () => {
      const wrapper = mount(Modal, {
        props: { isOpen: true },
        slots: { default: '<p>Modal content here</p>' },
      });

      expect(getBody(wrapper).html()).toContain('Modal content here');
    });

    it('renders footer slot when provided', () => {
      const wrapper = mount(Modal, {
        props: { isOpen: true },
        slots: { footer: '<button>Save</button>' },
      });

      expect(getFooter(wrapper).exists()).toBe(true);
      expect(getFooter(wrapper).html()).toContain('Save');
    });

    it('does not render footer when slot is empty', () => {
      const wrapper = mount(Modal, {
        props: { isOpen: true },
      });

      expect(getFooter(wrapper).exists()).toBe(false);
    });
  });

  // ============================================
  // EVENTS
  // ============================================

  describe('events', () => {
    it('emits close when close button clicked', async () => {
      const wrapper = mount(Modal, {
        props: { isOpen: true },
      });

      await getClose(wrapper).trigger('click');

      expect(wrapper.emitted('close')).toBeTruthy();
      expect(wrapper.emitted('close')).toHaveLength(1);
    });

    it('emits close when backdrop clicked', async () => {
      const wrapper = mount(Modal, {
        props: { isOpen: true },
      });

      await getModal(wrapper).trigger('click');

      expect(wrapper.emitted('close')).toBeTruthy();
    });

    it('does not emit close when container clicked (stopPropagation)', async () => {
      const wrapper = mount(Modal, {
        props: { isOpen: true },
      });

      await getContainer(wrapper).trigger('click');

      expect(wrapper.emitted('close')).toBeFalsy();
    });
  });

  // ============================================
  // ACCESSIBILITY
  // ============================================

  describe('accessibility', () => {
    it('close button has aria-label', () => {
      const wrapper = mount(Modal, {
        props: { isOpen: true },
      });

      expect(getClose(wrapper).attributes('aria-label')).toBe('Fermer');
    });
  });

  // ============================================
  // CONFORMITÉ CLAUDE.md - UI (Niveau 2a)
  // ============================================

  describe('conformité CLAUDE.md', () => {
    it('utilise des classes BEM (.modal, .modal__*)', () => {
      const wrapper = mount(Modal, {
        props: { isOpen: true, title: 'Test' },
        slots: { footer: '<button>OK</button>' },
      });

      // Block
      expect(getModal(wrapper).classes()).toContain('modal');
      // Elements
      expect(wrapper.find('.modal__backdrop').exists()).toBe(true);
      expect(wrapper.find('.modal__container').exists()).toBe(true);
      expect(wrapper.find('.modal__header').exists()).toBe(true);
      expect(wrapper.find('.modal__title').exists()).toBe(true);
      expect(wrapper.find('.modal__close').exists()).toBe(true);
      expect(wrapper.find('.modal__body').exists()).toBe(true);
      expect(wrapper.find('.modal__footer').exists()).toBe(true);
    });

    it('émet "close" event (événement de fermeture)', async () => {
      const wrapper = mount(Modal, {
        props: { isOpen: true },
      });

      await getClose(wrapper).trigger('click');

      // 'close' est acceptable car c'est un event de contrôle UI, pas métier
      expect(wrapper.emitted('close')).toBeTruthy();
    });
  });

  // ============================================
  // SNAPSHOTS
  // ============================================

  describe('snapshots', () => {
    it('matches snapshot - open with content', () => {
      const wrapper = mount(Modal, {
        props: { isOpen: true, title: 'Confirmation' },
        slots: {
          default: '<p>Are you sure?</p>',
          footer: '<button>Yes</button><button>No</button>',
        },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});
