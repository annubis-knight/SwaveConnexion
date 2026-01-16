import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Card from '~/components/ui/Card.vue';

describe('Card', () => {
  // Helper pour accéder à l'élément card
  const getCard = (wrapper: ReturnType<typeof mount>) => wrapper.find('.card');

  // ============================================
  // RENDU DE BASE
  // ============================================

  it('renders a div element with card class', () => {
    const wrapper = mount(Card);

    expect(getCard(wrapper).exists()).toBe(true);
  });

  it('renders default slot content in card__body', () => {
    const wrapper = mount(Card, {
      slots: { default: 'Card content' },
    });

    expect(wrapper.find('.card__body').text()).toBe('Card content');
  });

  // ============================================
  // PROPS
  // ============================================

  describe('props', () => {
    it('variant="default" applies card--default class', () => {
      const wrapper = mount(Card, {
        props: { variant: 'default' },
      });

      expect(getCard(wrapper).classes()).toContain('card--default');
    });

    it('variant="bordered" applies card--bordered class', () => {
      const wrapper = mount(Card, {
        props: { variant: 'bordered' },
      });

      expect(getCard(wrapper).classes()).toContain('card--bordered');
    });

    it('variant="elevated" applies card--elevated class', () => {
      const wrapper = mount(Card, {
        props: { variant: 'elevated' },
      });

      expect(getCard(wrapper).classes()).toContain('card--elevated');
    });

    it('default variant is "default"', () => {
      const wrapper = mount(Card);

      expect(getCard(wrapper).classes()).toContain('card--default');
    });

    it('icon prop renders icon element', () => {
      const wrapper = mount(Card, {
        props: { icon: '🎨' },
      });

      expect(wrapper.find('.card__icon').exists()).toBe(true);
      expect(wrapper.find('.card__icon').text()).toBe('🎨');
    });

    it('title prop renders title element', () => {
      const wrapper = mount(Card, {
        props: { title: 'Card Title' },
      });

      expect(wrapper.find('.card__title').exists()).toBe(true);
      expect(wrapper.find('.card__title').text()).toBe('Card Title');
    });

    it('description prop renders description element', () => {
      const wrapper = mount(Card, {
        props: { description: 'Card description text' },
      });

      expect(wrapper.find('.card__description').exists()).toBe(true);
      expect(wrapper.find('.card__description').text()).toBe('Card description text');
    });

    it('does not render icon when prop not provided', () => {
      const wrapper = mount(Card);

      expect(wrapper.find('.card__icon').exists()).toBe(false);
    });

    it('does not render title when prop not provided', () => {
      const wrapper = mount(Card);

      expect(wrapper.find('.card__title').exists()).toBe(false);
    });

    it('does not render description when prop not provided', () => {
      const wrapper = mount(Card);

      expect(wrapper.find('.card__description').exists()).toBe(false);
    });

    it('renders all props together', () => {
      const wrapper = mount(Card, {
        props: {
          icon: '⚡',
          title: 'Feature Title',
          description: 'Feature description here',
          variant: 'elevated',
        },
      });

      expect(wrapper.find('.card__icon').text()).toBe('⚡');
      expect(wrapper.find('.card__title').text()).toBe('Feature Title');
      expect(wrapper.find('.card__description').text()).toBe('Feature description here');
      expect(getCard(wrapper).classes()).toContain('card--elevated');
    });
  });

  // ============================================
  // SLOTS
  // ============================================

  describe('slots', () => {
    it('renders default slot in card__body when provided', () => {
      const wrapper = mount(Card, {
        slots: { default: 'Custom content' },
      });

      expect(wrapper.find('.card__body').exists()).toBe(true);
      expect(wrapper.find('.card__body').text()).toBe('Custom content');
    });

    it('does not render card__body when slot is empty', () => {
      const wrapper = mount(Card);

      expect(wrapper.find('.card__body').exists()).toBe(false);
    });

    it('can combine props and slot', () => {
      const wrapper = mount(Card, {
        props: { icon: '🔧', title: 'Title' },
        slots: { default: 'Extra content' },
      });

      expect(wrapper.find('.card__icon').text()).toBe('🔧');
      expect(wrapper.find('.card__title').text()).toBe('Title');
      expect(wrapper.find('.card__body').text()).toBe('Extra content');
    });
  });

  // ============================================
  // CONFORMITÉ CLAUDE.md - UI (Niveau 2a)
  // ============================================

  describe('conformité CLAUDE.md', () => {
    it('utilise des classes BEM (.card, .card__*, .card--*)', () => {
      const wrapper = mount(Card, {
        props: { icon: '🎨', title: 'Test', description: 'Desc', variant: 'elevated' },
      });

      // Block
      expect(getCard(wrapper).classes()).toContain('card');
      // Elements
      expect(wrapper.find('.card__icon').exists()).toBe(true);
      expect(wrapper.find('.card__title').exists()).toBe(true);
      expect(wrapper.find('.card__description').exists()).toBe(true);
      // Modifier
      expect(getCard(wrapper).classes()).toContain('card--elevated');
    });

    it('n\'émet aucun événement custom (composant dumb)', () => {
      const wrapper = mount(Card);

      // Card ne devrait pas avoir d'emit
      expect(wrapper.emitted()).toEqual({});
    });
  });

  // ============================================
  // SNAPSHOTS
  // ============================================

  describe('snapshots', () => {
    it('matches snapshot - default variant', () => {
      const wrapper = mount(Card, {
        slots: { default: 'Default card content' },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });

    it('matches snapshot - elevated with all props', () => {
      const wrapper = mount(Card, {
        props: {
          icon: '⚡',
          title: 'Card Title',
          description: 'Card description text',
          variant: 'elevated',
        },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });

    it('matches snapshot - with props and slot', () => {
      const wrapper = mount(Card, {
        props: { icon: '🔧', title: 'Title' },
        slots: { default: 'Extra content' },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});
