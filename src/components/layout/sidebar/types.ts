
import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

export interface MenuItemType {
  icon: LucideIcon;
  label: string;
  to: string;
  badge?: string | number;
  submenu?: SubMenuItemType[];
}

export interface SubMenuItemType {
  label: string;
  to: string;
  badge?: string | number;
  icon?: LucideIcon;
}

export interface SidebarProps {
  collapsed: boolean;
  toggleCollapse: () => void;
}

export interface SidebarItemProps {
  item: MenuItemType;
  collapsed: boolean;
  isActive: boolean;
  isOpen: boolean;
  toggleSubmenu: () => void;
}
