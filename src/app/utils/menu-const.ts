import { SideBarMenu } from "../models/menu";

export const MENU_ITEMS: SideBarMenu[] = [
  {
    link: '/home',
    icon: 'home',
    title: 'Dashboard',
    permission: 'VIEW_DASHBOARD',
  },
  {
    link: '/users',
    icon: 'users',
    title: 'Manage Users',
    permission: 'ACCESS_PERMISSIONS',
  },
  {
    link: '/roles',
    icon: 'disc',
    title: 'Manage Roles',
    permission: '',
  },
  {
    link: '/forms',
    icon: 'layout',
    title: 'Forms',
    permission: 'ACCESS_PERMISSIONS',
  },
  {
    link: '/alerts',
    icon: 'info',
    title: 'Alerts',
    permission: '',
  },
  {
    link: '/grid-list',
    icon: 'file-text',
    title: 'Grid List',
    permission: '',
  },
  {
    link: '/menu',
    icon: 'menu',
    title: 'Menus',
    permission: '',
  },
  {
    link: '/expansion',
    icon: 'divide-circle',
    title: 'Expansion Panel',
    permission: 'ACCESS_PERMISSIONS',
  },
  {
    link: '/chips',
    icon: 'award',
    title: 'Chips',
    permission: '',
  },
  {
    link: '/tabs',
    icon: 'list',
    title: 'Tabs',
    permission: '',
  },
  {
    link: '/progress',
    icon: 'bar-chart-2',
    title: 'Progress Bar',
    permission: '',
  },
  {
    link: '/toolbar',
    icon: 'voicemail',
    title: 'Toolbar',
    permission: '',
  },
  {
    link: '/progress-snipper',
    icon: 'loader',
    title: 'Progress Snipper',
    permission: '',
  },
  {
    link: '/tooltip',
    icon: 'bell',
    title: 'Tooltip',
    permission: '',
  },
  {
    link: '/snackbar',
    icon: 'slack',
    title: 'Snackbar',
    permission: '',
  },
  {
    link: '/slider',
    icon: 'sliders',
    title: 'Slider',
    permission: '',
  },
  {
    link: '/slide-toggle',
    icon: 'layers',
    title: 'Slide Toggle',
    permission: '',
  },
];
