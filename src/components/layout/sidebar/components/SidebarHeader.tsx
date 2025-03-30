
import React from 'react';
import { motion } from 'framer-motion';
import AnimatedLogo from '@/components/ui/AnimatedLogo';

interface SidebarHeaderProps {
  collapsed: boolean;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ collapsed }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex items-center justify-center p-4 ${collapsed ? 'justify-center' : 'justify-start'}`}
    >
      <AnimatedLogo size={collapsed ? "small" : "medium"} showText={!collapsed} />
    </motion.div>
  );
};

export default SidebarHeader;
