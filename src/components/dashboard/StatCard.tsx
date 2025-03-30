
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend: {
    value: number;
    isPositive: boolean;
  };
  trendLabel?: string;
  className?: string;
  color?: string;
  iconClassName?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  trendLabel,
  className = "",
  color = "blue",
  iconClassName = "bg-muted"
}) => {
  const formattedValue = typeof value === 'number' && title.includes('R$')
    ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
    : value;

  // Format trend percentage
  const formattedTrend = trend
    ? `${trend.isPositive ? '+' : '-'}${trend.value}%`
    : null;

  // Get color based on the color prop
  const getBgGradient = () => {
    switch (color) {
      case 'blue':
        return 'from-blue-50 to-blue-100/50 hover:from-blue-100 hover:to-sky-100';
      case 'purple':
        return 'from-purple-50 to-purple-100/50 hover:from-purple-100 hover:to-indigo-100';
      case 'emerald':
        return 'from-emerald-50 to-emerald-100/50 hover:from-emerald-100 hover:to-green-100';
      case 'amber':
        return 'from-amber-50 to-amber-100/50 hover:from-amber-100 hover:to-yellow-100';
      default:
        return 'from-slate-50 to-slate-100/50 hover:from-slate-100 hover:to-blue-50';
    }
  };

  const getTextColor = () => {
    switch (color) {
      case 'blue':
        return 'text-blue-800';
      case 'purple':
        return 'text-purple-800';
      case 'emerald':
        return 'text-emerald-800';
      case 'amber':
        return 'text-amber-800';
      default:
        return 'text-slate-800';
    }
  };
  
  const getIconColor = () => {
    switch (color) {
      case 'blue':
        return 'text-blue-600 bg-blue-100';
      case 'purple':
        return 'text-purple-600 bg-purple-100';
      case 'emerald':
        return 'text-emerald-600 bg-emerald-100';
      case 'amber':
        return 'text-amber-600 bg-amber-100';
      default:
        return 'text-slate-600 bg-slate-100';
    }
  };

  // Animation variants
  const valueVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }} 
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Card className={`overflow-hidden border transition-all duration-500 hover:shadow-lg bg-gradient-to-br ${getBgGradient()} ${className}`}>
        <CardContent className="p-6">
          <div className="flex justify-between">
            <motion.div 
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
              className={`p-3 rounded-lg shadow-sm ${iconClassName} ${getIconColor()}`}
            >
              {icon}
            </motion.div>
            
            {trend && (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className={`flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${
                  trend.isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {trend.isPositive ? (
                  <TrendingUp className="w-3 h-3 mr-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1" />
                )}
                {formattedTrend}
              </motion.div>
            )}
          </div>
          
          <div className="mt-5">
            <motion.h3 
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-sm font-medium text-slate-600"
            >
              {title}
            </motion.h3>
            <motion.p 
              variants={valueVariants}
              initial="initial"
              animate="animate"
              className={`text-2xl font-bold mt-1.5 ${getTextColor()}`}
            >
              {formattedValue}
            </motion.p>
            {trendLabel && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xs text-slate-500 mt-1"
              >
                {trendLabel}
              </motion.p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatCard;
