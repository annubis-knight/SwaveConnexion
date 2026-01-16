import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Switch from '~/components/ui/Switch.vue';

describe('Switch', () => {
  // Helper pour accéder aux éléments
  const getSwitch = (wrapper: ReturnType<typeof mount>) => wrapper.find('.switch');
  const getInput = (wrapper: ReturnType<typeof mount>) => wrapper.find('input[type="checkbox"]');
  const getTrack = (wrapper: ReturnType<typeof mount>) => wrapper.find('.switch__track');
  const getLabel = (wrapper: ReturnType<typeof mount>) => wrapper.find('.switch__label');

  // ============================================
  // RENDU DE BASE
  // ============================================

  it('renders a label element with switch class', () => {
    const wrapper = mount(Switch);

    expect(getSwitch(wrapper).exists()).toBe(true);
    expect(wrapper.find('label').exists()).toBe(true);
  });

  it('renders track and thumb elements', () => {
    const wrapper = mount(Switch);

    expect(getTrack(wrapper).exists()).toBe(true);
    expect(wrapper.find('.switch__thumb').exists()).toBe(true);
  });

  // ============================================
  // PROPS
  // ============================================

  describe('props', () => {
    it('label prop renders label text', () => {
      const wrapper = mount(Switch, {
        props: { label: 'Dark mode' },
      });

      expect(getLabel(wrapper).exists()).toBe(true);
      expect(getLabel(wrapper).text()).toBe('Dark mode');
    });

    it('slot can replace label', () => {
      const wrapper = mount(Switch, {
        slots: { default: 'Enable notifications' },
      });

      expect(getLabel(wrapper).text()).toBe('Enable notifications');
    });

    it('modelValue=true applies switch--checked class', () => {
      const wrapper = mount(Switch, {
        props: { modelValue: true },
      });

      expect(getSwitch(wrapper).classes()).toContain('switch--checked');
    });

    it('modelValue=false does not apply switch--checked', () => {
      const wrapper = mount(Switch, {
        props: { modelValue: false },
      });

      expect(getSwitch(wrapper).classes()).not.toContain('switch--checked');
    });

    it('disabled=true applies switch--disabled class', () => {
      const wrapper = mount(Switch, {
        props: { disabled: true },
      });

      expect(getSwitch(wrapper).classes()).toContain('switch--disabled');
    });

    it('disabled=true sets disabled attribute on input', () => {
      const wrapper = mount(Switch, {
        props: { disabled: true },
      });

      expect(getInput(wrapper).attributes('disabled')).toBeDefined();
    });

  });

  // ============================================
  // EVENTS
  // ============================================

  describe('events', () => {
    it('emits update:modelValue when toggled on', async () => {
      const wrapper = mount(Switch, {
        props: { modelValue: false },
      });

      await getInput(wrapper).setValue(true);

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([true]);
    });

    it('emits update:modelValue when toggled off', async () => {
      const wrapper = mount(Switch, {
        props: { modelValue: true },
      });

      await getInput(wrapper).setValue(false);

      expect(wrapper.emitted('update:modelValue')![0]).toEqual([false]);
    });
  });

  // ============================================
  // CONFORMITÉ CLAUDE.md - UI (Niveau 2a)
  // ============================================

  describe('conformité CLAUDE.md', () => {
    it('utilise des classes BEM (.switch, .switch__*, .switch--*)', () => {
      const wrapper = mount(Switch, {
        props: { label: 'Test', modelValue: true, disabled: true },
      });

      // Block
      expect(getSwitch(wrapper).classes()).toContain('switch');
      // Elements
      expect(wrapper.find('.switch__input').exists()).toBe(true);
      expect(wrapper.find('.switch__track').exists()).toBe(true);
      expect(wrapper.find('.switch__thumb').exists()).toBe(true);
      expect(wrapper.find('.switch__label').exists()).toBe(true);
      // Modifiers
      expect(getSwitch(wrapper).classes()).toContain('switch--checked');
      expect(getSwitch(wrapper).classes()).toContain('switch--disabled');
    });

    it('émet uniquement update:modelValue (v-model natif)', async () => {
      const wrapper = mount(Switch, {
        props: { modelValue: false },
      });

      await getInput(wrapper).setValue(true);

      const emittedEvents = Object.keys(wrapper.emitted());
      // Les events natifs HTML (input, change) + v-model sont autorisés par le CDC
      const allowedEvents = ['input', 'change', 'update:modelValue'];
      emittedEvents.forEach((event) => {
        expect(allowedEvents).toContain(event);
      });
      // Doit au moins émettre update:modelValue pour v-model
      expect(emittedEvents).toContain('update:modelValue');
    });
  });

  // ============================================
  // SNAPSHOTS
  // ============================================

  describe('snapshots', () => {
    it('matches snapshot - off with label', () => {
      const wrapper = mount(Switch, {
        props: { label: 'Toggle me' },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });

    it('matches snapshot - on disabled', () => {
      const wrapper = mount(Switch, {
        props: { modelValue: true, disabled: true, label: 'Disabled switch' },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});
