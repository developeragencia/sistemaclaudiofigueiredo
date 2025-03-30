
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import SidebarItem from '../SidebarItem';
import { MenuItemType } from '../types';

interface SidebarContentProps {
  items: MenuItemType[];
  title: string;
  collapsed: boolean;
  openMenus: {[key: string]: boolean};
  toggleSubmenu: (label: string) => void;
  location: any;
  hasBorder?: boolean;
  onMenuMouseEnter?: (label: string) => void;
  onMenuMouseLeave?: (label: string) => void;
  hoveredItem?: string | null;
}

const SidebarContent: React.FC<SidebarContentProps> = ({ 
  items, 
  title, 
  collapsed, 
  openMenus, 
  toggleSubmenu, 
  location,
  hasBorder = false,
  onMenuMouseEnter,
  onMenuMouseLeave,
  hoveredItem
}) => {
  return (
    <div className={cn("p-3", hasBorder && "border-t border-blue-100/70 pt-5")}>
      {!collapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mb-3 px-3"
        >
          <span className="text-xs uppercase font-semibold tracking-wider text-blue-500">
            {title}
          </span>
        </motion.div>
      )}
      
      {items.map((item) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          onMouseEnter={() => onMenuMouseEnter && onMenuMouseEnter(item.label)}
          onMouseLeave={() => onMenuMouseLeave && onMenuMouseLeave(item.label)}
        >
          <SidebarItem 
            item={item}
            collapsed={collapsed}
            isActive={location.pathname === item.to}
            isOpen={!!openMenus[item.label] || hoveredItem === item.label}
            toggleSubmenu={() => toggleSubmenu(item.label)}
            showArrows={false} 
          />
        </motion.div>
      ))}
    </div>
  );
};

export default SidebarContent;
