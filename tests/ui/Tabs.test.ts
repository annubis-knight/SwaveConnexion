import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Tabs from '~/components/ui/Tabs.vue';

describe('Tabs', () => {
  const defaultItems = [
    { label: 'Tab 1', value: 'tab1' },
    { label: 'Tab 2', value: 'tab2' },
    { label: 'Tab 3', value: 'tab3' },
  ];

  // Helper pour accéder aux éléments
  const getTabs = (wrapper: ReturnType<typeof mount>) => wrapper.find('.tabs');
  const getTabList = (wrapper: ReturnType<typeof mount>) => wrapper.find('.tabs__list');
  const getTabItems = (wrapper: ReturnType<typeof mount>) => wrapper.findAll('.tabs__item');
  const getPanels = (wrapper: ReturnType<typeof mount>) => wrapper.find('.tabs__panels');

  // ============================================
  // RENDU DE BASE
  // ============================================

  it('renders tabs element', () => {
    const wrapper = mount(Tabs, {
      props: { items: defaultItems, modelValue: 'tab1' },
    });

    expect(getTabs(wrapper).exists()).toBe(true);
  });

  it('renders tab list with role="tablist"', () => {
    const wrapper = mount(Tabs, {
      props: { items: defaultItems, modelValue: 'tab1' },
    });

    expect(getTabList(wrapper).exists()).toBe(true);
    expect(getTabList(wrapper).attributes('role')).toBe('tablist');
  });

  it('renders all tab items', () => {
    const wrapper = mount(Tabs, {
      props: { items: defaultItems, modelValue: 'tab1' },
    });

    expect(getTabItems(wrapper).length).toBe(3);
  });

  it('renders panels container', () => {
    const wrapper = mount(Tabs, {
      props: { items: defaultItems, modelValue: 'tab1' },
    });

    expect(getPanels(wrapper).exists()).toBe(true);
  });

  // ============================================
  // PROPS
  // ============================================

  describe('props', () => {
    it('displays item labels', () => {
      const wrapper = mount(Tabs, {
        props: { items: defaultItems, modelValue: 'tab1' },
      });

      const items = getTabItems(wrapper);
      expect(items[0].text()).toBe('Tab 1');
      expect(items[1].text()).toBe('Tab 2');
      expect(items[2].text()).toBe('Tab 3');
    });

    it('modelValue sets active tab', () => {
      const wrapper = mount(Tabs, {
        props: { items: defaultItems, modelValue: 'tab2' },
      });

      const items = getTabItems(wrapper);
      expect(items[1].classes()).toContain('tabs__item--active');
      expect(items[0].classes()).not.toContain('tabs__item--active');
    });

    it('disabled item has tabs__item--disabled class', () => {
      const itemsWithDisabled = [
        { label: 'Tab 1', value: 'tab1' },
        { label: 'Tab 2', value: 'tab2', disabled: true },
      ];

      const wrapper = mount(Tabs, {
        props: { items: itemsWithDisabled, modelValue: 'tab1' },
      });

      const items = getTabItems(wrapper);
      expect(items[1].classes()).toContain('tabs__item--disabled');
    });
  });

  // ============================================
  // INTERACTIONS
  // ============================================

  describe('interactions', () => {
    it('clicking tab emits update:modelValue', async () => {
      const wrapper = mount(Tabs, {
        props: { items: defaultItems, modelValue: 'tab1' },
      });

      await getTabItems(wrapper)[1].trigger('click');

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0]).toEqual(['tab2']);
    });

    it('clicking disabled tab does not emit', async () => {
      const itemsWithDisabled = [
        { label: 'Tab 1', value: 'tab1' },
        { label: 'Tab 2', value: 'tab2', disabled: true },
      ];

      const wrapper = mount(Tabs, {
        props: { items: itemsWithDisabled, modelValue: 'tab1' },
      });

      await getTabItems(wrapper)[1].trigger('click');

      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
    });
  });

  // ============================================
  // ACCESSIBILITY
  // ============================================

  describe('accessibility', () => {
    it('tab items have role="tab"', () => {
      const wrapper = mount(Tabs, {
        props: { items: defaultItems, modelValue: 'tab1' },
      });

      getTabItems(wrapper).forEach((item) => {
        expect(item.attributes('role')).toBe('tab');
      });
    });

    it('active tab has aria-selected="true"', () => {
      const wrapper = mount(Tabs, {
        props: { items: defaultItems, modelValue: 'tab2' },
      });

      const items = getTabItems(wrapper);
      expect(items[1].attributes('aria-selected')).toBe('true');
      expect(items[0].attributes('aria-selected')).toBe('false');
    });

    it('disabled tab has aria-disabled', () => {
      const itemsWithDisabled = [
        { label: 'Tab 1', value: 'tab1' },
        { label: 'Tab 2', value: 'tab2', disabled: true },
      ];

      const wrapper = mount(Tabs, {
        props: { items: itemsWithDisabled, modelValue: 'tab1' },
      });

      expect(getTabItems(wrapper)[1].attributes('aria-disabled')).toBe('true');
    });
  });

  // ============================================
  // CONFORMITÉ CLAUDE.md - UI (Niveau 2a)
  // ============================================

  describe('conformité CLAUDE.md', () => {
    it('utilise des classes BEM (.tabs, .tabs__*, .tabs__item--*)', () => {
      const itemsWithDisabled = [
        { label: 'Tab 1', value: 'tab1' },
        { label: 'Tab 2', value: 'tab2', disabled: true },
      ];

      const wrapper = mount(Tabs, {
        props: { items: itemsWithDisabled, modelValue: 'tab1' },
      });

      // Block
      expect(getTabs(wrapper).classes()).toContain('tabs');
      // Elements
      expect(wrapper.find('.tabs__list').exists()).toBe(true);
      expect(wrapper.find('.tabs__item').exists()).toBe(true);
      expect(wrapper.find('.tabs__panels').exists()).toBe(true);
      // Modifiers
      expect(getTabItems(wrapper)[0].classes()).toContain('tabs__item--active');
      expect(getTabItems(wrapper)[1].classes()).toContain('tabs__item--disabled');
    });

    it('émet uniquement des events natifs autorisés (click, update:modelValue)', async () => {
      const wrapper = mount(Tabs, {
        props: { items: defaultItems, modelValue: 'tab1' },
      });

      await getTabItems(wrapper)[1].trigger('click');

      const emittedEvents = Object.keys(wrapper.emitted());
      // Les events natifs HTML (click) + v-model sont autorisés par le CDC
      const allowedEvents = ['click', 'update:modelValue'];
      emittedEvents.forEach((event) => {
        expect(allowedEvents).toContain(event);
      });
      // Doit au moins émettre update:modelValue pour v-model
      expect(emittedEvents).toContain('update:modelValue');
    });
  });

  // ============================================
  // SLOTS
  // ============================================

  describe('slots', () => {
    it('renders default slot content in panels', () => {
      const wrapper = mount(Tabs, {
        props: { items: defaultItems, modelValue: 'tab1' },
        slots: { default: '<div class="panel-content">Panel content</div>' },
      });

      expect(wrapper.find('.panel-content').exists()).toBe(true);
    });
  });

  // ============================================
  // SNAPSHOTS
  // ============================================

  describe('snapshots', () => {
    it('matches snapshot - first tab active', () => {
      const wrapper = mount(Tabs, {
        props: { items: defaultItems, modelValue: 'tab1' },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });

    it('matches snapshot - with disabled tab', () => {
      const itemsWithDisabled = [
        { label: 'Active', value: 'active' },
        { label: 'Disabled', value: 'disabled', disabled: true },
        { label: 'Normal', value: 'normal' },
      ];

      const wrapper = mount(Tabs, {
        props: { items: itemsWithDisabled, modelValue: 'active' },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});
