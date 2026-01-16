import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ContainerFlex from '~/components/layout/ContainerFlex.vue';

describe('ContainerFlex', () => {
  // Helper pour accéder à l'élément container flex
  const getContainerFlex = (wrapper: ReturnType<typeof mount>) => wrapper.find('div');

  // ============================================
  // RENDU DE BASE
  // ============================================

  it('renders a div element', () => {
    const wrapper = mount(ContainerFlex);

    expect(getContainerFlex(wrapper).exists()).toBe(true);
  });

  it('renders slot content', () => {
    const wrapper = mount(ContainerFlex, {
      slots: { default: '<span>Item 1</span><span>Item 2</span>' },
    });

    expect(wrapper.findAll('span').length).toBe(2);
  });

  it('has flex class', () => {
    const wrapper = mount(ContainerFlex);

    expect(getContainerFlex(wrapper).classes()).toContain('flex');
  });

  // ============================================
  // PROPS
  // ============================================

  describe('props', () => {
    it('direction="vertical" applies flex-col', () => {
      const wrapper = mount(ContainerFlex, {
        props: { direction: 'vertical' },
      });

      expect(getContainerFlex(wrapper).classes()).toContain('flex-col');
    });

    it('direction="horizontal" applies flex-row', () => {
      const wrapper = mount(ContainerFlex, {
        props: { direction: 'horizontal' },
      });

      expect(getContainerFlex(wrapper).classes()).toContain('flex-row');
    });

    it('default direction is "vertical"', () => {
      const wrapper = mount(ContainerFlex);

      expect(getContainerFlex(wrapper).classes()).toContain('flex-col');
    });

    it.each([
      ['none', 'gap-0'],
      ['xs', 'gap-2'],
      ['sm', 'gap-4'],
      ['md', 'gap-6'],
      ['lg', 'gap-8'],
      ['xl', 'gap-12'],
    ] as const)('gap="%s" applies class "%s"', (gap, expectedClass) => {
      const wrapper = mount(ContainerFlex, {
        props: { gap },
      });

      expect(getContainerFlex(wrapper).classes()).toContain(expectedClass);
    });

    it('default gap is "md"', () => {
      const wrapper = mount(ContainerFlex);

      expect(getContainerFlex(wrapper).classes()).toContain('gap-6');
    });

    it.each([
      ['start', 'items-start'],
      ['center', 'items-center'],
      ['end', 'items-end'],
      ['stretch', 'items-stretch'],
    ] as const)('align="%s" applies class "%s"', (align, expectedClass) => {
      const wrapper = mount(ContainerFlex, {
        props: { align },
      });

      expect(getContainerFlex(wrapper).classes()).toContain(expectedClass);
    });

    it('default align is "stretch"', () => {
      const wrapper = mount(ContainerFlex);

      expect(getContainerFlex(wrapper).classes()).toContain('items-stretch');
    });

    it.each([
      ['start', 'justify-start'],
      ['center', 'justify-center'],
      ['end', 'justify-end'],
      ['between', 'justify-between'],
      ['around', 'justify-around'],
    ] as const)('justify="%s" applies class "%s"', (justify, expectedClass) => {
      const wrapper = mount(ContainerFlex, {
        props: { justify },
      });

      expect(getContainerFlex(wrapper).classes()).toContain(expectedClass);
    });

    it('default justify is "start"', () => {
      const wrapper = mount(ContainerFlex);

      expect(getContainerFlex(wrapper).classes()).toContain('justify-start');
    });

    it('wrap=true applies flex-wrap', () => {
      const wrapper = mount(ContainerFlex, {
        props: { wrap: true },
      });

      expect(getContainerFlex(wrapper).classes()).toContain('flex-wrap');
    });

    it('wrap=false (default) does not apply flex-wrap', () => {
      const wrapper = mount(ContainerFlex);

      expect(getContainerFlex(wrapper).classes()).not.toContain('flex-wrap');
    });

    it('combines all props correctly', () => {
      const wrapper = mount(ContainerFlex, {
        props: {
          direction: 'horizontal',
          gap: 'lg',
          align: 'center',
          justify: 'between',
          wrap: true,
        },
      });

      const classes = getContainerFlex(wrapper).classes();
      expect(classes).toContain('flex');
      expect(classes).toContain('flex-row');
      expect(classes).toContain('gap-8');
      expect(classes).toContain('items-center');
      expect(classes).toContain('justify-between');
      expect(classes).toContain('flex-wrap');
    });
  });

  // ============================================
  // CONFORMITÉ CLAUDE.md - LAYOUT (Niveau 2b)
  // ============================================

  describe('conformité CLAUDE.md - Layout', () => {
    it('utilise uniquement des classes Tailwind', () => {
      const wrapper = mount(ContainerFlex, {
        props: { direction: 'horizontal', gap: 'md', align: 'center' },
      });

      const classes = getContainerFlex(wrapper).classes();

      // Classes Tailwind flex
      expect(classes).toContain('flex');
      expect(classes.some((c) => c.startsWith('flex-'))).toBe(true);
      expect(classes.some((c) => c.startsWith('gap-'))).toBe(true);
      expect(classes.some((c) => c.startsWith('items-'))).toBe(true);
      expect(classes.some((c) => c.startsWith('justify-'))).toBe(true);

      // Pas de classes BEM
      expect(classes.every((c) => !c.includes('__'))).toBe(true);
      expect(classes.every((c) => !c.match(/^container-flex--/))).toBe(true);
    });

    it('n\'émet AUCUN événement custom (wrapper passif)', async () => {
      const wrapper = mount(ContainerFlex, {
        slots: { default: '<button id="btn">Click</button>' },
      });

      await wrapper.find('#btn').trigger('click');

      // ContainerFlex ne définit pas d'emit custom (via defineEmits)
      // Les clicks DOM natifs peuvent remonter via bubbling mais ContainerFlex n'ajoute pas de logique
      const customEvents = Object.keys(wrapper.emitted()).filter(
        (e) => !['click'].includes(e),
      );
      expect(customEvents.length).toBe(0);
    });

    it('n\'a pas de <style scoped> (vérifié par absence de data-v-*)', () => {
      const wrapper = mount(ContainerFlex);
      const html = wrapper.html();

      // ContainerFlex n'a pas de style scoped
      expect(html).not.toMatch(/data-v-[a-f0-9]+/);
    });

    it('est transparent pour les événements (ne bloque pas le bubbling)', async () => {
      // Créer un parent qui écoute les clicks
      const parentWrapper = mount({
        components: { ContainerFlex },
        template: `
          <div @click="handleClick">
            <ContainerFlex>
              <button id="inner-btn">Click</button>
            </ContainerFlex>
          </div>
        `,
        setup() {
          const clicked = ref(false);
          const handleClick = () => { clicked.value = true; };
          return { clicked, handleClick };
        },
      });

      await parentWrapper.find('#inner-btn').trigger('click');

      // Le click doit remonter au parent (ContainerFlex ne bloque pas)
      expect(parentWrapper.vm.clicked).toBe(true);
    });
  });

  // ============================================
  // SNAPSHOTS
  // ============================================

  describe('snapshots', () => {
    it('matches snapshot - vertical default', () => {
      const wrapper = mount(ContainerFlex, {
        slots: { default: '<div>A</div><div>B</div>' },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });

    it('matches snapshot - horizontal centered', () => {
      const wrapper = mount(ContainerFlex, {
        props: { direction: 'horizontal', gap: 'sm', align: 'center', justify: 'center' },
        slots: { default: '<button>1</button><button>2</button>' },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });

    it('matches snapshot - with wrap', () => {
      const wrapper = mount(ContainerFlex, {
        props: { direction: 'horizontal', gap: 'md', wrap: true },
        slots: { default: '<button>1</button><button>2</button><button>3</button>' },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});
