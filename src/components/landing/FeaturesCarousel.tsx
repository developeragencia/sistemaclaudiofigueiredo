
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BarChart3, Calculator, Database, LayoutDashboard, FileSearch, Shield } from "lucide-react";

interface CarouselItemType {
  title: string;
  description: string;
  icon: React.ElementType;
  link: string;
  buttonText: string;
  colorFrom: string;
}

interface FeaturesCarouselProps {
  isVisible: boolean;
}

const FeaturesCarousel: React.FC<FeaturesCarouselProps> = ({ isVisible }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const carouselItems: CarouselItemType[] = [
    {
      title: "Painel Administrador",
      description: "Controle total sobre todas as operações em uma interface intuitiva e completa",
      icon: LayoutDashboard,
      link: "/dashboard",
      buttonText: "Acessar Painel",
      colorFrom: "blue"
    },
    {
      title: "Cálculos e Recuperação",
      description: "Identifique e recupere créditos tributários com precisão e segurança jurídica",
      icon: Calculator,
      link: "/irrf-calculations",
      buttonText: "Iniciar Cálculos",
      colorFrom: "green"
    },
    {
      title: "Importação de Dados",
      description: "Importe e processe dados de diversas fontes com facilidade e segurança",
      icon: FileSearch,
      link: "/operational-import",
      buttonText: "Importar Dados",
      colorFrom: "purple"
    },
    {
      title: "Auditoria Tributária",
      description: "Análises detalhadas e completas para garantir conformidade fiscal",
      icon: Shield,
      link: "/tax-audit",
      buttonText: "Iniciar Auditoria",
      colorFrom: "amber"
    },
    {
      title: "Sistema Operacional",
      description: "Gestão completa das operações diárias com automação e controle",
      icon: Database,
      link: "/operational-dashboard",
      buttonText: "Ver Operações",
      colorFrom: "cyan"
    }
  ];

  return (
    <motion.section 
      id="carousel-section"
      className="py-16 bg-gradient-to-br from-sky-100 to-sky-50/80 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div 
        className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-sky-200/30 filter blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 20, 0],
          y: [0, -20, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute -bottom-40 -right-20 w-96 h-96 rounded-full bg-purple-200/20 filter blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          x: [0, -30, 0],
          y: [0, 30, 0]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-4 text-lawyer-800"
          >
            Sistema Completo para Gestão Tributária
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-lawyer-600 md:text-lg max-w-2xl mx-auto"
          >
            Ferramenta especializada para escritórios que buscam excelência em consultoria fiscal
          </motion.p>
        </motion.div>
        
        <div className="max-w-6xl mx-auto">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {carouselItems.map((item, index) => (
                <CarouselItem key={item.title} className="md:basis-1/2 lg:basis-1/3 p-2">
                  <motion.div 
                    className={`h-full rounded-xl overflow-hidden bg-gradient-to-br from-${item.colorFrom}-50 to-white shadow-lg hover:shadow-xl transition-all duration-500 border-t-4 border-${item.colorFrom}-500 perspective-1000`}
                    whileHover={{ 
                      y: -8, 
                      scale: 1.03,
                      rotateY: 5,
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: index * 0.1, 
                      duration: 0.5,
                      type: "spring",
                      stiffness: 100
                    }}
                  >
                    <div className="p-6 flex flex-col h-full">
                      <motion.div 
                        className={`rounded-full bg-${item.colorFrom}-100 p-3 w-12 h-12 flex items-center justify-center mb-4`}
                        whileHover={{ rotate: 15, scale: 1.1 }}
                      >
                        <item.icon className={`w-6 h-6 text-${item.colorFrom}-600`} />
                      </motion.div>
                      <h3 className="text-xl font-bold text-lawyer-800 mb-2">{item.title}</h3>
                      <p className="text-lawyer-600 mb-4 flex-grow">{item.description}</p>
                      <Link to={item.link} className="mt-auto">
                        <motion.div 
                          whileHover={{ scale: 1.05 }} 
                          whileTap={{ scale: 0.95 }}
                          className="w-full"
                        >
                          <Button 
                            variant="outline" 
                            className={`border-${item.colorFrom}-200 hover:border-${item.colorFrom}-400 text-${item.colorFrom}-700 hover:text-${item.colorFrom}-800 hover:bg-${item.colorFrom}-50 w-full group`}
                          >
                            {item.buttonText}
                            <ArrowRight className={`ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1`} />
                          </Button>
                        </motion.div>
                      </Link>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-center mt-8 gap-6">
              <motion.div 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.9 }}
                className="shadow-lg"
              >
                <CarouselPrevious className="static transform-none bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white border-none h-12 w-12" />
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.9 }}
                className="shadow-lg"
              >
                <CarouselNext className="static transform-none bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white border-none h-12 w-12" />
              </motion.div>
            </div>
          </Carousel>
        </div>
        
        <div className="carousel-dots mt-8 flex justify-center items-center gap-2">
          {[...Array(5)].map((_, i) => (
            <motion.div 
              key={i}
              className="carousel-dot w-3 h-3 rounded-full bg-sky-200 cursor-pointer"
              whileHover={{ scale: 1.3 }}
              animate={{ 
                backgroundColor: i === 0 ? 'rgb(14 165 233)' : 'rgb(186 230 253)', 
                scale: i === 0 ? 1.2 : 1 
              }}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturesCarousel;
