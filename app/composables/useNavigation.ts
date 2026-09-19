export interface NavLink {
  labelKey: string
  to: string
}

export const useNavigation = () => {
  const navLinks: NavLink[] = [
    { labelKey: 'nav.home', to: '/' },
    { labelKey: 'nav.services', to: '/services' },
    { labelKey: 'nav.about', to: '/a-propos' },
    { labelKey: 'nav.contact', to: '/contact' }
  ]

  return { navLinks }
}
