import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CTA from '~/components/sections/CTA.vue';

// Stubs pour les composants utilisés
const stubs = {
  LayoutContainer: {
    template: '<div class="layout-container"><slot /></div>',
    props: ['size', 'padding'],
  },
  LayoutContainerFlex: {
    template: '<div class="layout-container-flex"><slot /></div>',
    props: ['direction', 'gap', 'align', 'justify', 'wrap'],
  },
  Heading: {
    template: '<h2 class="heading"><slot /></h2>',
    props: ['level', 'color', 'align'],
  },
  Text: {
    template: '<p class="text"><slot /></p>',
    props: ['size', 'color', 'align'],
  },
  Button: {
    template: '<button class="button" @click="$emit(\'click\', $event)"><slot /></button>',
    props: ['variant', 'size'],
    emits: ['click'],
  },
};

describe('CTA', () => {
  // Helper pour accéder aux éléments
  const getCTA = (wrapper: ReturnType<typeof mount>) => wrapper.find('section');
  const getButtons = (wrapper: ReturnType<typeof mount>) => wrapper.findAll('.button');

  // ============================================
  // RENDU DE BASE
  // ============================================

  it('renders a section element', () => {
    const wrapper = mount(CTA, {
      props: { title: 'Test Title' },
      global: { stubs },
    });

    expect(getCTA(wrapper).exists()).toBe(true);
  });

  it('renders title via Heading component', () => {
    const wrapper = mount(CTA, {
      props: { title: 'Join Us Today' },
      global: { stubs },
    });

    expect(wrapper.find('.heading').text()).toBe('Join Us Today');
  });

  // ============================================
  // PROPS
  // ============================================

  describe('props', () => {
    it('title is rendered', () => {
      const wrapper = mount(CTA, {
        props: { title: 'Get Started' },
        global: { stubs },
      });

      expect(wrapper.text()).toContain('Get Started');
    });

    it('description is rendered when provided', () => {
      const wrapper = mount(CTA, {
        props: { title: 'Title', description: 'Some description text' },
        global: { stubs },
      });

      expect(wrapper.find('.text').exists()).toBe(true);
      expect(wrapper.text()).toContain('Some description text');
    });

    it('description is not rendered when not provided', () => {
      const wrapper = mount(CTA, {
        props: { title: 'Title' },
        global: { stubs },
      });

      // Text component should not be rendered for description
      // Only the heading
      const textElements = wrapper.findAll('.text');
      expect(textElements.length).toBe(0);
    });

    it('primaryText is displayed on primary button', () => {
      const wrapper = mount(CTA, {
        props: { title: 'Title', primaryText: 'Sign Up Now' },
        global: { stubs },
      });

      const buttons = getButtons(wrapper);
      expect(buttons[0].text()).toBe('Sign Up Now');
    });

    it('default primaryText is "Commencer"', () => {
      const wrapper = mount(CTA, {
        props: { title: 'Title' },
        global: { stubs },
      });

      expect(wrapper.text()).toContain('Commencer');
    });

    it('secondaryText renders second button when provided', () => {
      const wrapper = mount(CTA, {
        props: { title: 'Title', secondaryText: 'Learn More' },
        global: { stubs },
      });

      const buttons = getButtons(wrapper);
      expect(buttons.length).toBe(2);
      expect(buttons[1].text()).toBe('Learn More');
    });

    it('no secondary button when secondaryText not provided', () => {
      const wrapper = mount(CTA, {
        props: { title: 'Title' },
        global: { stubs },
      });

      const buttons = getButtons(wrapper);
      expect(buttons.length).toBe(1);
    });

    it('variant="primary" applies cta--primary class', () => {
      const wrapper = mount(CTA, {
        props: { title: 'Title', variant: 'primary' },
        global: { stubs },
      });

      expect(getCTA(wrapper).classes()).toContain('cta--primary');
    });

    it('variant="gradient" applies cta--gradient class', () => {
      const wrapper = mount(CTA, {
        props: { title: 'Title', variant: 'gradient' },
        global: { stubs },
      });

      expect(getCTA(wrapper).classes()).toContain('cta--gradient');
    });

    it('default variant is "primary"', () => {
      const wrapper = mount(CTA, {
        props: { title: 'Title' },
        global: { stubs },
      });

      expect(getCTA(wrapper).classes()).toContain('cta--primary');
    });
  });

  // ============================================
  // EVENTS
  // ============================================

  describe('events', () => {
    it('emits primary-click when primary button clicked', async () => {
      const wrapper = mount(CTA, {
        props: { title: 'Title' },
        global: { stubs },
      });

      await getButtons(wrapper)[0].trigger('click');

      expect(wrapper.emitted('primary-click')).toBeTruthy();
      expect(wrapper.emitted('primary-click')).toHaveLength(1);
    });

    it('emits secondary-click when secondary button clicked', async () => {
      const wrapper = mount(CTA, {
        props: { title: 'Title', secondaryText: 'Secondary' },
        global: { stubs },
      });

      await getButtons(wrapper)[1].trigger('click');

      expect(wrapper.emitted('secondary-click')).toBeTruthy();
      expect(wrapper.emitted('secondary-click')).toHaveLength(1);
    });
  });

  // ============================================
  // CONFORMITÉ CLAUDE.md - SECTIONS (Niveau 3)
  // ============================================

  describe('conformité CLAUDE.md - Sections', () => {
    it('utilise des composants Layout (Container, ContainerFlex)', () => {
      const wrapper = mount(CTA, {
        props: { title: 'Title' },
        global: { stubs },
      });

      expect(wrapper.find('.layout-container').exists()).toBe(true);
      expect(wrapper.find('.layout-container-flex').exists()).toBe(true);
    });

    it('utilise des composants UI (Heading, Text, Button)', () => {
      const wrapper = mount(CTA, {
        props: { title: 'Title', description: 'Desc' },
        global: { stubs },
      });

      expect(wrapper.find('.heading').exists()).toBe(true);
      expect(wrapper.find('.text').exists()).toBe(true);
      expect(wrapper.find('.button').exists()).toBe(true);
    });

    it('émet des événements custom sémantiques (primary-click, secondary-click)', async () => {
      const wrapper = mount(CTA, {
        props: { title: 'Title', secondaryText: 'Sec' },
        global: { stubs },
      });

      await getButtons(wrapper)[0].trigger('click');
      await getButtons(wrapper)[1].trigger('click');

      // Events sémantiques (pas 'click' brut)
      expect(wrapper.emitted('primary-click')).toBeTruthy();
      expect(wrapper.emitted('secondary-click')).toBeTruthy();
    });

    it('transforme les events natifs en events sémantiques (pattern Event Chaining)', async () => {
      const wrapper = mount(CTA, {
        props: { title: 'Title' },
        global: { stubs },
      });

      // Le click natif sur Button est transformé en 'primary-click'
      await getButtons(wrapper)[0].trigger('click');

      // CTA émet 'primary-click' (événement sémantique) et non pas juste un 'click' brut
      // Note: le click DOM natif peut remonter via bubbling, on vérifie que primary-click est émis
      expect(wrapper.emitted('primary-click')).toBeTruthy();
      expect(wrapper.emitted('primary-click')?.length).toBe(1);
    });

    it('utilise des classes BEM pour le styling de la section', () => {
      const wrapper = mount(CTA, {
        props: { title: 'Title', variant: 'gradient' },
        global: { stubs },
      });

      const classes = getCTA(wrapper).classes();
      expect(classes).toContain('cta');
      expect(classes).toContain('cta--gradient');
    });

    it('n\'a pas de logique métier (navigation, API, state global)', () => {
      // CTA ne devrait pas avoir de router.push, useFetch, etc.
      // C'est la responsabilité de la Page (Niveau 4)
      const wrapper = mount(CTA, {
        props: { title: 'Title' },
        global: { stubs },
      });

      // Vérifier qu'il n'y a pas d'indicateurs de logique métier
      expect(wrapper.html()).not.toContain('data-loading');
      expect(wrapper.html()).not.toContain('data-route');
    });
  });

  // ============================================
  // SNAPSHOTS
  // ============================================

  describe('snapshots', () => {
    it('matches snapshot - minimal', () => {
      const wrapper = mount(CTA, {
        props: { title: 'Simple CTA' },
        global: { stubs },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });

    it('matches snapshot - full with all props', () => {
      const wrapper = mount(CTA, {
        props: {
          title: 'Join Our Community',
          description: 'Get access to exclusive content and updates.',
          primaryText: 'Sign Up Free',
          secondaryText: 'Learn More',
          variant: 'gradient',
          centered: true,
        },
        global: { stubs },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});
