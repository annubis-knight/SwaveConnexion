import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Input from '~/components/ui/Input.vue';

describe('Input', () => {
  // Helper pour accéder à l'élément input
  const getInput = (wrapper: ReturnType<typeof mount>) => wrapper.find('input');
  const getLabel = (wrapper: ReturnType<typeof mount>) => wrapper.find('.input-group__label');
  const getError = (wrapper: ReturnType<typeof mount>) => wrapper.find('.input-group__error');

  // ============================================
  // RENDU DE BASE
  // ============================================

  it('renders an input element', () => {
    const wrapper = mount(Input);

    expect(getInput(wrapper).exists()).toBe(true);
  });

  it('renders input-group wrapper', () => {
    const wrapper = mount(Input);

    expect(wrapper.find('.input-group').exists()).toBe(true);
  });

  // ============================================
  // PROPS
  // ============================================

  describe('props', () => {
    it('renders label when provided', () => {
      const wrapper = mount(Input, {
        props: { label: 'Email' },
      });

      expect(getLabel(wrapper).exists()).toBe(true);
      expect(getLabel(wrapper).text()).toBe('Email');
    });

    it('does not render label when not provided', () => {
      const wrapper = mount(Input);

      expect(getLabel(wrapper).exists()).toBe(false);
    });

    it('type="email" sets input type attribute', () => {
      const wrapper = mount(Input, {
        props: { type: 'email' },
      });

      expect(getInput(wrapper).attributes('type')).toBe('email');
    });

    it('type="password" sets input type attribute', () => {
      const wrapper = mount(Input, {
        props: { type: 'password' },
      });

      expect(getInput(wrapper).attributes('type')).toBe('password');
    });

    it('default type is "text"', () => {
      const wrapper = mount(Input);

      expect(getInput(wrapper).attributes('type')).toBe('text');
    });

    it('placeholder is rendered', () => {
      const wrapper = mount(Input, {
        props: { placeholder: 'Enter your email' },
      });

      expect(getInput(wrapper).attributes('placeholder')).toBe('Enter your email');
    });

    it('modelValue sets input value', () => {
      const wrapper = mount(Input, {
        props: { modelValue: 'test@example.com' },
      });

      expect(getInput(wrapper).element.value).toBe('test@example.com');
    });

    it('error renders error message', () => {
      const wrapper = mount(Input, {
        props: { error: 'Email invalide' },
      });

      expect(getError(wrapper).exists()).toBe(true);
      expect(getError(wrapper).text()).toBe('Email invalide');
    });

    it('error applies input-group__input--error class', () => {
      const wrapper = mount(Input, {
        props: { error: 'Error message' },
      });

      expect(getInput(wrapper).classes()).toContain('input-group__input--error');
    });

    it('no error class when error is not provided', () => {
      const wrapper = mount(Input);

      expect(getInput(wrapper).classes()).not.toContain('input-group__input--error');
    });
  });

  // ============================================
  // EVENTS
  // ============================================

  describe('events', () => {
    it('emits update:modelValue on input', async () => {
      const wrapper = mount(Input);

      await getInput(wrapper).setValue('new value');

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0]).toEqual(['new value']);
    });

    it('v-model works correctly', async () => {
      const wrapper = mount(Input, {
        props: {
          modelValue: 'initial',
          'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e }),
        },
      });

      expect(getInput(wrapper).element.value).toBe('initial');

      await getInput(wrapper).setValue('updated');

      expect(wrapper.emitted('update:modelValue')![0]).toEqual(['updated']);
    });
  });

  // ============================================
  // CONFORMITÉ CLAUDE.md - UI (Niveau 2a)
  // ============================================

  describe('conformité CLAUDE.md', () => {
    it('utilise des classes BEM (.input-group, .input-group__*, .input-group__input--*)', () => {
      const wrapper = mount(Input, {
        props: { label: 'Test', error: 'Error' },
      });

      // Block
      expect(wrapper.find('.input-group').exists()).toBe(true);
      // Elements
      expect(wrapper.find('.input-group__label').exists()).toBe(true);
      expect(wrapper.find('.input-group__input').exists()).toBe(true);
      expect(wrapper.find('.input-group__error').exists()).toBe(true);
      // Modifier
      expect(getInput(wrapper).classes()).toContain('input-group__input--error');
    });

    it('émet uniquement update:modelValue (événement v-model natif)', () => {
      const wrapper = mount(Input);

      // Seul event autorisé pour UI component: update:modelValue (v-model)
      // Pas d'events custom
      const emittedEvents = Object.keys(wrapper.emitted());
      expect(emittedEvents.every((e) => e === 'update:modelValue')).toBe(true);
    });
  });

  // ============================================
  // SNAPSHOTS
  // ============================================

  describe('snapshots', () => {
    it('matches snapshot - basic input', () => {
      const wrapper = mount(Input, {
        props: { placeholder: 'Enter text' },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });

    it('matches snapshot - with label and error', () => {
      const wrapper = mount(Input, {
        props: {
          label: 'Email',
          type: 'email',
          error: 'Format invalide',
          placeholder: 'email@example.com',
        },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});
