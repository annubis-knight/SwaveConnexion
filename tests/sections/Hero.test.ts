import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Hero from '~/components/sections/Hero.vue';

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
    template: '<h1 class="heading"><slot /></h1>',
    props: ['level', 'color'],
  },
  Text: {
    template: '<p class="text"><slot /></p>',
    props: ['size', 'color'],
  },
  Button: {
    template: '<button class="button"><slot /></button>',
    props: ['variant', 'size'],
  },
};

describe('Hero', () => {
  // Helper pour accéder à l'élément hero
  const getHero = (wrapper: ReturnType<typeof mount>) => wrapper.find('section');

  // Helper pour accéder au contentDiv (dans LayoutContainer)
  const getContentDiv = (wrapper: ReturnType<typeof mount>) =>
    wrapper.find('.layout-container > div');

  // ============================================
  // RENDU DE BASE
  // ============================================

  it('renders a section element', () => {
    const wrapper = mount(Hero, {
      global: { stubs },
    });

    expect(getHero(wrapper).exists()).toBe(true);
  });

  it('renders default slot content', () => {
    const wrapper = mount(Hero, {
      global: { stubs },
      slots: { default: '<h1>Custom Title</h1>' },
    });

    expect(wrapper.find('h1').text()).toBe('Custom Title');
  });

  it('renders default content when no slot provided', () => {
    const wrapper = mount(Hero, {
      global: { stubs },
    });

    expect(wrapper.text()).toContain('Design System Moderne');
  });

  // ============================================
  // PROPS
  // ============================================

  describe('props', () => {
    it.each([
      ['default', 'bg-gray-50', 'text-gray-900'],
      ['primary', 'bg-blue-600', 'text-white'],
      ['gradient', 'bg-gradient-to-br', 'text-white'],
      ['dark', 'bg-gray-900', 'text-white'],
    ] as const)('variant="%s" applies correct classes', (variant, bgClass, textClass) => {
      const wrapper = mount(Hero, {
        global: { stubs },
        props: { variant },
      });

      const classes = getHero(wrapper).classes().join(' ');
      expect(classes).toContain(bgClass);
      expect(classes).toContain(textClass);
    });

    it('default variant is "default"', () => {
      const wrapper = mount(Hero, {
        global: { stubs },
      });

      const classes = getHero(wrapper).classes().join(' ');
      expect(classes).toContain('bg-gray-50');
    });

    it('centered=true applies text-center and mx-auto', () => {
      const wrapper = mount(Hero, {
        global: { stubs },
        props: { centered: true },
      });

      expect(getContentDiv(wrapper).classes()).toContain('text-center');
      expect(getContentDiv(wrapper).classes()).toContain('mx-auto');
    });

    it('centered=false does not apply centering classes', () => {
      const wrapper = mount(Hero, {
        global: { stubs },
        props: { centered: false },
      });

      expect(getContentDiv(wrapper).classes()).not.toContain('text-center');
    });

    it('default centered is true', () => {
      const wrapper = mount(Hero, {
        global: { stubs },
      });

      expect(getContentDiv(wrapper).classes()).toContain('text-center');
    });
  });

  // ============================================
  // CONFORMITÉ CLAUDE.md - SECTIONS (Niveau 3)
  // ============================================

  describe('conformité CLAUDE.md - Sections', () => {
    it('est un wrapper visuel (pas d\'événements custom)', () => {
      const wrapper = mount(Hero, {
        global: { stubs },
        slots: { default: '<button id="cta">Click me</button>' },
      });

      // Hero n'émet pas d'events custom
      // Le contenu (bouton) est géré par le slot
      expect(wrapper.emitted()).toEqual({});
    });

    it('utilise un slot pour le contenu (pattern Hero)', () => {
      const wrapper = mount(Hero, {
        global: { stubs },
        slots: { default: '<div class="custom-content">Content</div>' },
      });

      // Le contenu est passé via slot, pas via props
      expect(wrapper.find('.custom-content').exists()).toBe(true);
    });

    it('applique des classes Tailwind pour la structure', () => {
      const wrapper = mount(Hero, {
        global: { stubs },
      });

      const classes = getHero(wrapper).classes();
      // Classes Tailwind
      expect(classes.some((c) => c.includes('overflow'))).toBe(true);
    });

    it('n\'a pas de logique métier (navigation, API, etc.)', () => {
      // Hero est un wrapper visuel pur
      // Pas de router, pas de fetch, pas de store
      const wrapper = mount(Hero, {
        global: { stubs },
      });

      // Vérifier qu'il n'y a pas de data-* attributes indiquant du state complexe
      expect(wrapper.html()).not.toContain('data-loading');
      expect(wrapper.html()).not.toContain('data-error');
    });
  });

  // ============================================
  // SNAPSHOTS
  // ============================================

  describe('snapshots', () => {
    it('matches snapshot - default', () => {
      const wrapper = mount(Hero, {
        global: { stubs },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });

    it('matches snapshot - gradient centered', () => {
      const wrapper = mount(Hero, {
        global: { stubs },
        props: { variant: 'gradient', centered: true },
        slots: { default: '<h1>Welcome</h1><p>Description</p>' },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});
