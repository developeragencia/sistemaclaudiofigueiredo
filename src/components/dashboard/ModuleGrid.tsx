
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LucideIcon, ArrowRight } from 'lucide-react';

interface ModuleItemProps {
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
  colorClass: string;
  index: number;
}

const ModuleItem: React.FC<ModuleItemProps> = ({ 
  title, 
  description, 
  icon: Icon,
  to,
  colorClass,
  index
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        y: -5,
        boxShadow: '0 15px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
      }}
      className={cn(
        "rounded-xl border transition-all duration-500 h-full overflow-hidden shadow-md group",
        colorClass
      )}
    >
      <Link to={to} className="flex flex-col h-full">
        <div className="px-5 pt-6 pb-3 relative overflow-hidden">
          {/* Animated background gradient with transparency */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/30 opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
          
          <div className="relative z-10">
            <motion.div 
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="p-2.5 rounded-full bg-white/25 mb-4 inline-flex"
            >
              <Icon className="w-6 h-6 text-white" />
            </motion.div>
            
            <h3 className="font-bold text-lg text-white mb-2">{title}</h3>
            <p className="text-white/90 text-sm mb-4 line-clamp-2">{description}</p>
          </div>
        </div>
        
        <div className="mt-auto bg-black/15 p-3 group-hover:bg-black/25 transition-all duration-300">
          <motion.div 
            whileHover={{ x: 5 }}
            className="inline-flex items-center text-white text-sm font-medium"
          >
            Acessar
            <motion.span 
              className="ml-2 transition-transform duration-300"
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.span>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};

interface ModuleGridProps {
  modules: {
    title: string;
    description: string;
    icon: LucideIcon;
    to: string;
  }[];
}

// Enhanced color classes with transparency for a more modern look
const colorClasses = [
  "bg-gradient-to-br from-blue-500/90 to-blue-700/90 border-blue-400/30",
  "bg-gradient-to-br from-purple-500/90 to-indigo-700/90 border-purple-400/30",
  "bg-gradient-to-br from-rose-500/90 to-pink-700/90 border-rose-400/30",
  "bg-gradient-to-br from-amber-500/90 to-orange-600/90 border-amber-400/30",
  "bg-gradient-to-br from-emerald-500/90 to-green-600/90 border-emerald-400/30",
  "bg-gradient-to-br from-cyan-500/90 to-teal-600/90 border-cyan-400/30",
];

const ModuleGrid: React.FC<ModuleGridProps> = ({ modules }) => {
  // Container variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {modules.map((module, index) => (
        <ModuleItem 
          key={module.title}
          title={module.title}
          description={module.description}
          icon={module.icon}
          to={module.to}
          colorClass={colorClasses[index % colorClasses.length]}
          index={index}
        />
      ))}
    </motion.div>
  );
};

export default ModuleGrid;
