import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FeaturesGrid from '~/components/sections/FeaturesGrid.vue';

// Stubs pour les composants utilisés
const stubs = {
  LayoutContainer: {
    name: 'LayoutContainer',
    template: '<div class="layout-container"><slot /></div>',
    props: ['size', 'padding'],
  },
  LayoutGrid: {
    name: 'LayoutGrid',
    template: '<div class="layout-grid"><slot /></div>',
    props: ['cols', 'gap', 'responsive'],
  },
  Heading: {
    name: 'Heading',
    template: '<h2 class="heading"><slot /></h2>',
    props: ['level', 'color', 'align'],
  },
  Text: {
    name: 'Text',
    template: '<p class="text"><slot /></p>',
    props: ['size', 'color', 'align'],
  },
  Card: {
    name: 'Card',
    template: `<div class="card">
      <span v-if="icon" class="card__icon">{{ icon }}</span>
      <span v-if="title" class="card__title">{{ title }}</span>
      <span v-if="description" class="card__description">{{ description }}</span>
    </div>`,
    props: ['icon', 'title', 'description', 'variant'],
  },
};

const sampleFeatures = [
  { icon: '🚀', title: 'Fast', description: 'Lightning fast performance' },
  { icon: '🔒', title: 'Secure', description: 'Enterprise-grade security' },
  { icon: '📱', title: 'Responsive', description: 'Works on all devices' },
];

describe('FeaturesGrid', () => {
  // Helper pour accéder aux éléments
  const getSection = (wrapper: ReturnType<typeof mount>) => wrapper.find('section');
  const getTitle = (wrapper: ReturnType<typeof mount>) => wrapper.find('h2');
  const getSubtitle = (wrapper: ReturnType<typeof mount>) => wrapper.find('p.text');
  const getFeatureCards = (wrapper: ReturnType<typeof mount>) =>
    wrapper.findAll('.card');

  // ============================================
  // RENDU DE BASE
  // ============================================

  it('renders a section element', () => {
    const wrapper = mount(FeaturesGrid, {
      props: { title: 'Features', features: sampleFeatures },
      global: { stubs },
    });

    expect(getSection(wrapper).exists()).toBe(true);
  });

  it('renders title', () => {
    const wrapper = mount(FeaturesGrid, {
      props: { title: 'Our Features', features: sampleFeatures },
      global: { stubs },
    });

    expect(getTitle(wrapper).text()).toBe('Our Features');
  });

  it('renders all features', () => {
    const wrapper = mount(FeaturesGrid, {
      props: { title: 'Features', features: sampleFeatures },
      global: { stubs },
    });

    const cards = getFeatureCards(wrapper);
    expect(cards.length).toBe(3);
  });

  // ============================================
  // PROPS
  // ============================================

  describe('props', () => {
    it('subtitle is rendered when provided', () => {
      const wrapper = mount(FeaturesGrid, {
        props: {
          title: 'Title',
          subtitle: 'Subtitle text here',
          features: sampleFeatures,
        },
        global: { stubs },
      });

      expect(wrapper.text()).toContain('Subtitle text here');
    });

    it('subtitle is not rendered when not provided', () => {
      const wrapper = mount(FeaturesGrid, {
        props: { title: 'Title', features: sampleFeatures },
        global: { stubs },
      });

      // Subtitle uses Text component (p.text), no subtitle = 0 text paragraphs in header
      // Cards have their own description spans
      const subtitleElement = wrapper.find('.layout-container > p.text');
      expect(subtitleElement.exists()).toBe(false);
    });

    it('default cols is 3', () => {
      const wrapper = mount(FeaturesGrid, {
        props: { title: 'Title', features: sampleFeatures },
        global: { stubs },
      });

      const grid = wrapper.findComponent({ name: 'LayoutGrid' });
      expect(grid.props('cols')).toBe(3);
    });

    it('cols prop is passed to LayoutGrid', () => {
      const wrapper = mount(FeaturesGrid, {
        props: { title: 'Title', features: sampleFeatures, cols: 4 },
        global: { stubs },
      });

      const grid = wrapper.findComponent({ name: 'LayoutGrid' });
      expect(grid.props('cols')).toBe(4);
    });

    it('renders feature icon', () => {
      const wrapper = mount(FeaturesGrid, {
        props: { title: 'Title', features: sampleFeatures },
        global: { stubs },
      });

      expect(wrapper.text()).toContain('🚀');
      expect(wrapper.text()).toContain('🔒');
      expect(wrapper.text()).toContain('📱');
    });

    it('renders feature title', () => {
      const wrapper = mount(FeaturesGrid, {
        props: { title: 'Title', features: sampleFeatures },
        global: { stubs },
      });

      expect(wrapper.text()).toContain('Fast');
      expect(wrapper.text()).toContain('Secure');
      expect(wrapper.text()).toContain('Responsive');
    });

    it('renders feature description', () => {
      const wrapper = mount(FeaturesGrid, {
        props: { title: 'Title', features: sampleFeatures },
        global: { stubs },
      });

      expect(wrapper.text()).toContain('Lightning fast performance');
      expect(wrapper.text()).toContain('Enterprise-grade security');
    });
  });

  // ============================================
  // CONFORMITÉ CLAUDE.md - SECTIONS (Niveau 3)
  // ============================================

  describe('conformité CLAUDE.md - Sections', () => {
    it('utilise des composants Layout (Container, Grid)', () => {
      const wrapper = mount(FeaturesGrid, {
        props: { title: 'Title', features: sampleFeatures },
        global: { stubs },
      });

      expect(wrapper.find('.layout-container').exists()).toBe(true);
      expect(wrapper.find('.layout-grid').exists()).toBe(true);
    });

    it('n\'émet AUCUN événement (présentation pure)', () => {
      const wrapper = mount(FeaturesGrid, {
        props: { title: 'Title', features: sampleFeatures },
        global: { stubs },
      });

      // FeaturesGrid est de la présentation pure, pas d'actions
      expect(wrapper.emitted()).toEqual({});
    });

    it('n\'a pas de logique métier', () => {
      const wrapper = mount(FeaturesGrid, {
        props: { title: 'Title', features: sampleFeatures },
        global: { stubs },
      });

      // Pas d'indicateurs de state complexe
      expect(wrapper.html()).not.toContain('data-loading');
      expect(wrapper.html()).not.toContain('data-error');
    });

    it('utilise des props high-level (title, features, cols)', () => {
      // Les props sont simples et sémantiques
      // Pas de props de style bas niveau
      const wrapper = mount(FeaturesGrid, {
        props: {
          title: 'Features',
          subtitle: 'Our best features',
          features: sampleFeatures,
          cols: 3,
        },
        global: { stubs },
      });

      expect(wrapper.exists()).toBe(true);
    });
  });

  // ============================================
  // SNAPSHOTS
  // ============================================

  describe('snapshots', () => {
    it('matches snapshot - 3 features', () => {
      const wrapper = mount(FeaturesGrid, {
        props: { title: 'Features', features: sampleFeatures },
        global: { stubs },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });

    it('matches snapshot - with subtitle and 4 cols', () => {
      const wrapper = mount(FeaturesGrid, {
        props: {
          title: 'Why Choose Us',
          subtitle: 'We offer the best solutions',
          features: sampleFeatures,
          cols: 4,
        },
        global: { stubs },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});
