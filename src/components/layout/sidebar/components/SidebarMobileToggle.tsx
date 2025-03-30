
import React from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarMobileToggleProps {
  isMobileMenuOpen: boolean;
  handleMobileToggle: () => void;
}

const SidebarMobileToggle: React.FC<SidebarMobileToggleProps> = ({ 
  isMobileMenuOpen, 
  handleMobileToggle 
}) => {
  return (
    <div className="fixed top-4 left-4 z-50 md:hidden">
      <motion.button 
        className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-blue-600 shadow-lg border border-blue-100"
        onClick={handleMobileToggle}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </motion.button>
    </div>
  );
};

export default SidebarMobileToggle;
