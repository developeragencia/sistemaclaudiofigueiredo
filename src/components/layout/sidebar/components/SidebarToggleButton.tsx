
import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SidebarToggleButtonProps {
  collapsed: boolean;
  toggleCollapse: () => void;
}

const SidebarToggleButton: React.FC<SidebarToggleButtonProps> = ({ collapsed, toggleCollapse }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.button 
            onClick={toggleCollapse}
            className={cn(
              "w-8 h-8 flex items-center justify-center",
              "rounded-full hover:bg-blue-50 text-blue-500 transition-colors",
              collapsed && "mx-auto"
            )}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {collapsed ? (
              <ChevronsRight className="h-5 w-5" />
            ) : (
              <ChevronsLeft className="h-5 w-5" />
            )}
          </motion.button>
        </TooltipTrigger>
        <TooltipContent side="right">
          {collapsed ? 'Expandir menu' : 'Recolher menu'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SidebarToggleButton;
