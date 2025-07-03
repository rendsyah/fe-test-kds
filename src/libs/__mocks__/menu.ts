import { Menu } from '@/types/commons.types';

export const Menus: Menu[] = [
  {
    id: 1,
    name: 'Home',
    path: '/home',
    icon: 'Home',
    level: 1,
    child: [],
  },
  {
    id: 2,
    name: 'Settings',
    path: '/settings',
    icon: 'Settings',
    level: 1,
    child: [
      {
        id: 3,
        name: 'Menu Groups',
        path: '/settings/menu-groups',
        icon: '',
        level: 2,
        child: [],
      },
      {
        id: 4,
        name: 'Menus',
        path: '/settings/menus',
        icon: '',
        level: 2,
        child: [],
      },
    ],
  },
];
