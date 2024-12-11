import { SideBarMenu } from "../models/menu";

export const MENU_ITEMS: SideBarMenu[] = [
  {
    link: '/home',
    icon: 'home',
    menu: 'Dashboard',
    roles: ['ADMIN'],
  },
  {
    link: '/button',
    icon: 'disc',
    menu: 'Buttons',
    roles: ['ADMIN', 'CUSTOMER'],
  },
  {
    link: '/forms',
    icon: 'layout',
    menu: 'Forms',
    roles: ['ADMIN', 'CUSTOMER'],
  },
  {
    link: '/alerts',
    icon: 'info',
    menu: 'Alerts',
    roles: ['ADMIN'],
  },
  {
    link: '/grid-list',
    icon: 'file-text',
    menu: 'Grid List',
    roles: ['ADMIN'],
  },
  {
    link: '/menu',
    icon: 'menu',
    menu: 'Menus',
    roles: ['ADMIN'],
  },
  {
    link: '/table',
    icon: 'grid',
    menu: 'Tables',
    roles: ['ADMIN'],
  },
  {
    link: '/expansion',
    icon: 'divide-circle',
    menu: 'Expansion Panel',
    roles: ['ADMIN'],
  },
  {
    link: '/chips',
    icon: 'award',
    menu: 'Chips',
    roles: ['ADMIN'],
  },
  {
    link: '/tabs',
    icon: 'list',
    menu: 'Tabs',
    roles: ['ADMIN'],
  },
  {
    link: '/progress',
    icon: 'bar-chart-2',
    menu: 'Progress Bar',
    roles: ['ADMIN'],
  },
  {
    link: '/toolbar',
    icon: 'voicemail',
    menu: 'Toolbar',
    roles: ['ADMIN'],
  },
  {
    link: '/progress-snipper',
    icon: 'loader',
    menu: 'Progress Snipper',
    roles: ['ADMIN'],
  },
  {
    link: '/tooltip',
    icon: 'bell',
    menu: 'Tooltip',
    roles: ['ADMIN'],
  },
  {
    link: '/snackbar',
    icon: 'slack',
    menu: 'Snackbar',
    roles: ['ADMIN'],
  },
  {
    link: '/slider',
    icon: 'sliders',
    menu: 'Slider',
    roles: ['ADMIN'],
  },
  {
    link: '/slide-toggle',
    icon: 'layers',
    menu: 'Slide Toggle',
    roles: ['ADMIN'],
  },
];
