import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Checkbox from '~/components/ui/Checkbox.vue';

describe('Checkbox', () => {
  // Helper pour accéder aux éléments
  const getCheckbox = (wrapper: ReturnType<typeof mount>) => wrapper.find('.checkbox');
  const getInput = (wrapper: ReturnType<typeof mount>) => wrapper.find('input[type="checkbox"]');
  const getLabel = (wrapper: ReturnType<typeof mount>) => wrapper.find('.checkbox__label');

  // ============================================
  // RENDU DE BASE
  // ============================================

  it('renders a label element with checkbox class', () => {
    const wrapper = mount(Checkbox);

    expect(getCheckbox(wrapper).exists()).toBe(true);
    expect(wrapper.find('label').exists()).toBe(true);
  });

  it('renders a hidden checkbox input', () => {
    const wrapper = mount(Checkbox);

    expect(getInput(wrapper).exists()).toBe(true);
  });

  it('renders checkmark element', () => {
    const wrapper = mount(Checkbox);

    expect(wrapper.find('.checkbox__checkmark').exists()).toBe(true);
  });

  // ============================================
  // PROPS
  // ============================================

  describe('props', () => {
    it('label prop renders label text', () => {
      const wrapper = mount(Checkbox, {
        props: { label: 'Accept terms' },
      });

      expect(getLabel(wrapper).exists()).toBe(true);
      expect(getLabel(wrapper).text()).toBe('Accept terms');
    });

    it('no label text when label prop is empty', () => {
      const wrapper = mount(Checkbox);

      expect(getLabel(wrapper).exists()).toBe(false);
    });

    it('slot can replace label', () => {
      const wrapper = mount(Checkbox, {
        slots: { default: 'Custom label via slot' },
      });

      expect(getLabel(wrapper).text()).toBe('Custom label via slot');
    });

    it('modelValue=true sets checked attribute', () => {
      const wrapper = mount(Checkbox, {
        props: { modelValue: true },
      });

      expect((getInput(wrapper).element as HTMLInputElement).checked).toBe(true);
    });

    it('modelValue=false sets unchecked', () => {
      const wrapper = mount(Checkbox, {
        props: { modelValue: false },
      });

      expect((getInput(wrapper).element as HTMLInputElement).checked).toBe(false);
    });

    it('disabled=true applies checkbox--disabled class', () => {
      const wrapper = mount(Checkbox, {
        props: { disabled: true },
      });

      expect(getCheckbox(wrapper).classes()).toContain('checkbox--disabled');
    });

    it('disabled=true sets disabled attribute on input', () => {
      const wrapper = mount(Checkbox, {
        props: { disabled: true },
      });

      expect(getInput(wrapper).attributes('disabled')).toBeDefined();
    });

  });

  // ============================================
  // EVENTS
  // ============================================

  describe('events', () => {
    it('emits update:modelValue when clicked', async () => {
      const wrapper = mount(Checkbox, {
        props: { modelValue: false },
      });

      await getInput(wrapper).setValue(true);

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([true]);
    });

    it('emits false when unchecked', async () => {
      const wrapper = mount(Checkbox, {
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
    it('utilise des classes BEM (.checkbox, .checkbox__*, .checkbox--*)', () => {
      const wrapper = mount(Checkbox, {
        props: { label: 'Test', disabled: true },
      });

      // Block
      expect(getCheckbox(wrapper).classes()).toContain('checkbox');
      // Elements
      expect(wrapper.find('.checkbox__input').exists()).toBe(true);
      expect(wrapper.find('.checkbox__checkmark').exists()).toBe(true);
      expect(wrapper.find('.checkbox__label').exists()).toBe(true);
      // Modifiers
      expect(getCheckbox(wrapper).classes()).toContain('checkbox--disabled');
    });

    it('émet uniquement des events natifs autorisés (input, change, update:modelValue)', async () => {
      const wrapper = mount(Checkbox, {
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
    it('matches snapshot - unchecked with label', () => {
      const wrapper = mount(Checkbox, {
        props: { label: 'I agree to terms' },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });

    it('matches snapshot - checked disabled', () => {
      const wrapper = mount(Checkbox, {
        props: { modelValue: true, disabled: true, label: 'Disabled checkbox' },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});
