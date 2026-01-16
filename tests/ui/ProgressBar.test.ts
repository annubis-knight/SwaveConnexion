import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ProgressBar from '~/components/ui/ProgressBar.vue';

describe('ProgressBar', () => {
  // Helper pour accéder aux éléments
  const getProgress = (wrapper: ReturnType<typeof mount>) => wrapper.find('.progress');
  const getTrack = (wrapper: ReturnType<typeof mount>) => wrapper.find('.progress__track');
  const getBar = (wrapper: ReturnType<typeof mount>) => wrapper.find('.progress__bar');
  const getLabel = (wrapper: ReturnType<typeof mount>) => wrapper.find('.progress__label');

  // ============================================
  // RENDU DE BASE
  // ============================================

  it('renders progress element', () => {
    const wrapper = mount(ProgressBar);

    expect(getProgress(wrapper).exists()).toBe(true);
  });

  it('renders track and bar elements', () => {
    const wrapper = mount(ProgressBar);

    expect(getTrack(wrapper).exists()).toBe(true);
    expect(getBar(wrapper).exists()).toBe(true);
  });

  it('bar has progressbar role', () => {
    const wrapper = mount(ProgressBar);

    expect(getBar(wrapper).attributes('role')).toBe('progressbar');
  });

  // ============================================
  // PROPS
  // ============================================

  describe('props', () => {
    it('value sets bar width style', () => {
      const wrapper = mount(ProgressBar, {
        props: { value: 50 },
      });

      expect(getBar(wrapper).attributes('style')).toContain('width: 50%');
    });

    it('value is clamped to 0-100', () => {
      const wrapper1 = mount(ProgressBar, {
        props: { value: -10 },
      });
      expect(getBar(wrapper1).attributes('style')).toContain('width: 0%');

      const wrapper2 = mount(ProgressBar, {
        props: { value: 150 },
      });
      expect(getBar(wrapper2).attributes('style')).toContain('width: 100%');
    });

    it('default value is 0', () => {
      const wrapper = mount(ProgressBar);

      expect(getBar(wrapper).attributes('style')).toContain('width: 0%');
    });

    it.each([
      ['primary', 'progress--primary'],
      ['success', 'progress--success'],
      ['warning', 'progress--warning'],
      ['error', 'progress--error'],
    ] as const)('variant="%s" applies class "%s"', (variant, expectedClass) => {
      const wrapper = mount(ProgressBar, {
        props: { variant },
      });

      expect(getProgress(wrapper).classes()).toContain(expectedClass);
    });

    it('default variant is "primary"', () => {
      const wrapper = mount(ProgressBar);

      expect(getProgress(wrapper).classes()).toContain('progress--primary');
    });

    it('showLabel=true renders label', () => {
      const wrapper = mount(ProgressBar, {
        props: { value: 75, showLabel: true },
      });

      expect(getLabel(wrapper).exists()).toBe(true);
      expect(getLabel(wrapper).text()).toBe('75%');
    });

    it('showLabel=false does not render label', () => {
      const wrapper = mount(ProgressBar, {
        props: { value: 75, showLabel: false },
      });

      expect(getLabel(wrapper).exists()).toBe(false);
    });

  });

  // ============================================
  // ARIA
  // ============================================

  describe('accessibility', () => {
    it('sets aria-valuenow', () => {
      const wrapper = mount(ProgressBar, {
        props: { value: 60 },
      });

      expect(getBar(wrapper).attributes('aria-valuenow')).toBe('60');
    });

    it('sets aria-valuemin to 0', () => {
      const wrapper = mount(ProgressBar);

      expect(getBar(wrapper).attributes('aria-valuemin')).toBe('0');
    });

    it('sets aria-valuemax to 100', () => {
      const wrapper = mount(ProgressBar);

      expect(getBar(wrapper).attributes('aria-valuemax')).toBe('100');
    });
  });

  // ============================================
  // CONFORMITÉ CLAUDE.md - UI (Niveau 2a)
  // ============================================

  describe('conformité CLAUDE.md', () => {
    it('utilise des classes BEM (.progress, .progress__*, .progress--*)', () => {
      const wrapper = mount(ProgressBar, {
        props: { variant: 'success', showLabel: true, value: 50 },
      });

      // Block
      expect(getProgress(wrapper).classes()).toContain('progress');
      // Elements
      expect(wrapper.find('.progress__track').exists()).toBe(true);
      expect(wrapper.find('.progress__bar').exists()).toBe(true);
      expect(wrapper.find('.progress__label').exists()).toBe(true);
      // Modifiers
      expect(getProgress(wrapper).classes()).toContain('progress--success');
    });

    it('n\'émet aucun événement (composant dumb)', () => {
      const wrapper = mount(ProgressBar, {
        props: { value: 50 },
      });

      expect(wrapper.emitted()).toEqual({});
    });
  });

  // ============================================
  // SNAPSHOTS
  // ============================================

  describe('snapshots', () => {
    it('matches snapshot - primary 50%', () => {
      const wrapper = mount(ProgressBar, {
        props: { value: 50 },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });

    it('matches snapshot - success with label', () => {
      const wrapper = mount(ProgressBar, {
        props: { value: 75, variant: 'success', showLabel: true },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});
