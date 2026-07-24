/**
 * useHeroVisibility
 *
 * Composable partagé pour gérer la visibilité du Hero.
 * Permet à LandingHero de signaler quand l'utilisateur quitte la section,
 * et à Navbar de réagir en affichant le CTA.
 *
 * @dev Utilise useState de Nuxt pour partager l'état entre composants
 */

export const useHeroVisibility = () => {
  /*
    isHeroVisible: true tant que l'utilisateur est dans la section Hero
    Passe à false quand le bas du Hero sort du viewport (scroll vers le bas)
  */
  const isHeroVisible = useState<boolean>('hero-visibility', () => true);

  const setHeroVisible = (visible: boolean) => {
    isHeroVisible.value = visible;
  };

  return {
    isHeroVisible: readonly(isHeroVisible),
    setHeroVisible,
  };
};
