
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  ChevronDown, 
  BarChart2, 
  FileText, 
  Calculator, 
  Database, 
  CreditCard,
  ArrowUpRight,
  PieChart,
  TrendingUp,
  Check
} from "lucide-react";
import { motion } from "framer-motion";

interface HeroSectionProps {
  scrollY: number;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollY }) => {
  const scrollToCarousel = () => {
    document.getElementById('carousel-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const floatingIcons = [
    { icon: <BarChart2 size={16} />, delay: 0, x: '10%', y: '20%' },
    { icon: <Calculator size={18} />, delay: 1.2, x: '85%', y: '15%' },
    { icon: <FileText size={14} />, delay: 2.4, x: '75%', y: '75%' },
    { icon: <Database size={16} />, delay: 3.6, x: '15%', y: '65%' },
    { icon: <CreditCard size={18} />, delay: 4.8, x: '60%', y: '85%' },
    { icon: <PieChart size={16} />, delay: 6, x: '25%', y: '35%' },
    { icon: <TrendingUp size={14} />, delay: 7.2, x: '45%', y: '55%' },
  ];

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Background gradients */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-sky-50/40 to-white pointer-events-none"
        style={{ 
          transform: `translateY(${scrollY * 0.1}px)`, 
          transition: 'transform 0.2s ease-out' 
        }}
      ></motion.div>
      
      {/* Animated blobs */}
      <motion.div 
        className="absolute top-1/4 left-1/5 w-32 h-32 rounded-full bg-sky-100/30 filter blur-xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-sky-100/20 filter blur-xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <motion.div 
        className="absolute top-1/2 right-1/3 w-28 h-28 rounded-full bg-sky-200/10 filter blur-lg"
        animate={{ 
          scale: [1, 1.4, 1],
          opacity: [0.15, 0.3, 0.15]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <motion.div 
        className="absolute bottom-1/4 left-1/3 w-24 h-24 rounded-full bg-lawyer-100/15 filter blur-md"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.25, 0.1]
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      />

      {/* Floating icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute z-10 text-sky-500/30"
          initial={{ x: item.x, y: item.y, opacity: 0 }}
          animate={{ 
            opacity: [0, 0.7, 0],
            scale: [0.7, 1, 0.7],
            y: parseFloat(item.y as string) - 10 + '%'
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut"
          }}
        >
          {item.icon}
        </motion.div>
      ))}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            className="md:w-1/2 md:pr-12 mb-10 md:mb-0"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ 
              type: "spring", 
              duration: 0.8,
              bounce: 0.4
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="mb-3 inline-flex items-center space-x-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium"
            >
              <motion.span 
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center"
              >
                <Check className="w-3 h-3 text-white" />
              </motion.span>
              <span>Sistema Completo de Gestão</span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-black leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              Sistema de <span className="text-sky-600 relative">
                Gestão Tributária
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-sky-300 via-sky-400 to-sky-600"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 1, duration: 0.8 }}
                ></motion.span>
              </span> para Escritórios de Advocacia
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 max-w-xl mb-10 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              Soluções completas para empresas que precisam de excelência em consultoria fiscal e recuperação de impostos.
            </motion.p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/login">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-600 hover:to-sky-800 transition-all duration-300 shadow-md hover:shadow-lg w-full sm:w-auto group"
                  >
                    Acessar Sistema 
                    <motion.span
                      className="ml-2 inline-block"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </motion.span>
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ 
              type: "spring", 
              duration: 0.8,
              bounce: 0.4,
              delay: 0.3
            }}
          >
            <motion.div 
              className="relative bg-gradient-to-br from-white to-sky-50 rounded-xl shadow-2xl p-8 transform hover:scale-[1.02] transition-all duration-500"
              initial={{ rotate: 2 }}
              whileHover={{ rotate: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="absolute -top-2 -right-2 bg-sky-100 text-sky-700 px-3 py-1 rounded-lg text-xs font-medium shadow-sm"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.3, type: "spring" }}
              >
                <motion.span 
                  animate={{ color: ['#0ea5e9', '#0284c7', '#0ea5e9'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  Dashboard Interativo
                </motion.span>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="relative"
              >
                <img 
                  src="/lovable-uploads/d5d79599-0ca0-43c9-a921-360cebf9b230.png" 
                  alt="Dashboard Preview" 
                  className="rounded-lg w-full object-cover"
                />
                
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-tl from-sky-500/10 to-transparent mix-blend-overlay rounded-lg"
                  animate={{ 
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 8, 
                    repeat: Infinity, 
                    ease: "easeInOut"
                  }}
                />
                
                <motion.div 
                  className="absolute -bottom-6 -left-4 flex items-center bg-sky-600 text-white px-6 py-3 rounded-lg shadow-lg"
                  initial={{ scale: 0, rotate: -5 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1, type: "spring", stiffness: 100 }}
                  whileHover={{ 
                    y: -3, 
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                >
                  <motion.span 
                    className="mr-2"
                    animate={{ 
                      rotate: [0, 15, -15, 0],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut", 
                      repeatDelay: 1
                    }}
                  >
                    <BarChart2 className="h-5 w-5" />
                  </motion.span>
                  <span>Recuperação de Impostos</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-sky-600 cursor-pointer"
            onClick={scrollToCarousel}
          >
            <ChevronDown className="h-8 w-8" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
