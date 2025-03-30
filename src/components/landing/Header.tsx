
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedLogo from "@/components/ui/AnimatedLogo";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-4 flex justify-between items-center"
      >
        <div className="flex items-center gap-3">
          <AnimatedLogo size="medium" />
        </div>
        <Link to="/login">
          <Button 
            variant="default" 
            className="bg-sky-600 hover:bg-sky-500 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Área Restrita <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </motion.div>
    </header>
  );
};

export default Header;
