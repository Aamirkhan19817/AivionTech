export type SectionId =
  | 'home'
  | 'services'
  | 'about'
  | 'team'
  | 'portfolio'
  | 'technology'
  | 'process'
  | 'contact';

export interface NavLinkItem {
  id: SectionId;
  name: string;
  href: string;
}

export const NAV_LINKS: NavLinkItem[] = [
  { id: 'home', name: 'Home', href: '#home' },
  { id: 'services', name: 'Services', href: '#services' },
  { id: 'about', name: 'About', href: '#about' },
  { id: 'team', name: 'Team', href: '#team' },
  { id: 'portfolio', name: 'Portfolio', href: '#portfolio' },
  { id: 'technology', name: 'Technology', href: '#technology' },
  { id: 'process', name: 'Process', href: '#process' },
  { id: 'contact', name: 'Contact', href: '#contact' },
];

export const SECTION_ORDER: SectionId[] = [
  'home',
  'services',
  'about',
  'team',
  'portfolio',
  'technology',
  'process',
  'contact',
];

export function getSectionIndex(id: SectionId): number {
  const index = SECTION_ORDER.indexOf(id);
  return index !== -1 ? index : 0;
}
