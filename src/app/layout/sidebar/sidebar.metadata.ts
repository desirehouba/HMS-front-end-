export interface RouteInfo {
  path: string;
  title: string;
  iconType: string;
  icon: string;
  class: string;
  groupTitle: boolean;
  badge: string;
  badgeClass: string;
  role: string[];
  typeRole: string[];
  submenu: RouteInfo[];
  scholar_level: string[];
  permissions: any[];
  registrationPaid: any;
}
