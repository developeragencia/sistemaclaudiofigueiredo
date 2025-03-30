
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { getGroupedSidebarItems } from './sidebarMenuItems';
import { SidebarProps } from './types';

// Import refactored components
import SidebarHeader from './components/SidebarHeader';
import SidebarContent from './components/SidebarContent';
import SidebarUserProfile from './components/SidebarUserProfile';
import SidebarToggleButton from './components/SidebarToggleButton';
import SidebarMobileToggle from './components/SidebarMobileToggle';

const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleCollapse }) => {
  const location = useLocation();
  const { userRole, currentUser } = useAuth();
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [openMenus, setOpenMenus] = useState<{[key: string]: boolean}>({});
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Get grouped sidebar items
  const { mainItems, moduleItems, systemItems } = getGroupedSidebarItems();
  
  // Update active item based on current location
  useEffect(() => {
    const path = location.pathname;
    const allItems = [...mainItems, ...moduleItems, ...systemItems];
    
    const currentItem = allItems.find(item => 
      item.to === path || 
      item.submenu?.some(subitem => subitem.to === path)
    );
    
    if (currentItem) {
      setActiveItem(currentItem.label);
      // Auto-expand menu if a submenu item is active
      if (currentItem.submenu && currentItem.submenu.some(subitem => subitem.to === path)) {
        setOpenMenus(prev => ({ ...prev, [currentItem.label]: true }));
      }
    }
  }, [location.pathname, mainItems, moduleItems, systemItems]);
  
  // Handle submenu hover for auto-expand
  const handleMenuMouseEnter = (label: string) => {
    setHoveredItem(label);
    if (collapsed) {
      // When collapsed, show submenu on hover
      setOpenMenus(prev => ({ ...prev, [label]: true }));
    }
  };

  const handleMenuMouseLeave = (label: string) => {
    setHoveredItem(null);
    if (collapsed) {
      // When collapsed, hide submenu when not hovering
      setOpenMenus(prev => ({ ...prev, [label]: false }));
    }
  };

  // Handle submenu toggle (manual click)
  const toggleSubmenu = (label: string) => {
    if (!collapsed) {
      setOpenMenus(prev => ({
        ...prev,
        [label]: !prev[label]
      }));
    }
  };

  // Mobile toggle
  const handleMobileToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <SidebarMobileToggle 
        isMobileMenuOpen={isMobileMenuOpen}
        handleMobileToggle={handleMobileToggle}
      />

      {/* Sidebar overlay for mobile */}
      {isMobileMenuOpen && (
        <motion.div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main sidebar - now fixed and doesn't close automatically */}
      <motion.aside
        className={cn(
          "fixed top-0 left-0 z-40 h-full",
          "transition-all duration-300 ease-in-out",
          collapsed ? "w-20" : "w-72",
          !isMobileMenuOpen && "hidden md:block"
        )}
        initial={false}
        animate={{ 
          width: collapsed ? "80px" : "288px",
          x: isMobileMenuOpen ? 0 : (collapsed ? 0 : 0)
        }}
        transition={{ duration: 0.3 }}
      >
        <div className={cn(
          "flex flex-col h-full overflow-hidden",
          "bg-white shadow-xl rounded-r-xl",
          "text-blue-900 border-r border-blue-100"
        )}>
          {/* Sidebar header with toggle button */}
          <div className="flex items-center justify-between px-4 py-5 border-b border-blue-100">
            <SidebarHeader collapsed={collapsed} />
            <SidebarToggleButton collapsed={collapsed} toggleCollapse={toggleCollapse} />
          </div>
          
          {/* Sidebar content */}
          <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
            <SidebarContent 
              items={mainItems} 
              title="Navegação Principal" 
              collapsed={collapsed}
              openMenus={openMenus}
              toggleSubmenu={toggleSubmenu}
              location={location}
              onMenuMouseEnter={handleMenuMouseEnter}
              onMenuMouseLeave={handleMenuMouseLeave}
              hoveredItem={hoveredItem}
            />
            
            <SidebarContent 
              items={moduleItems} 
              title="Módulos Principais" 
              collapsed={collapsed}
              openMenus={openMenus}
              toggleSubmenu={toggleSubmenu}
              location={location}
              hasBorder={true}
              onMenuMouseEnter={handleMenuMouseEnter}
              onMenuMouseLeave={handleMenuMouseLeave}
              hoveredItem={hoveredItem}
            />
            
            <SidebarContent 
              items={systemItems} 
              title="Sistema" 
              collapsed={collapsed}
              openMenus={openMenus}
              toggleSubmenu={toggleSubmenu}
              location={location}
              hasBorder={true}
              onMenuMouseEnter={handleMenuMouseEnter}
              onMenuMouseLeave={handleMenuMouseLeave}
              hoveredItem={hoveredItem}
            />
          </div>
          
          {/* Sidebar user profile */}
          <SidebarUserProfile 
            collapsed={collapsed}
            userRole={userRole}
            currentUser={currentUser}
          />
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
