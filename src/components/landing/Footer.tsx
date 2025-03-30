
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-10 relative">
      <div className="container mx-auto px-6">
        {/* Copyright Text */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p className="text-gray-600 text-sm">
            © 2025 Advogados Associados. Todos os direitos reservados.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Desenvolvido por{" "}
            <a 
              href="https://alexdesenvolvedor.com.br" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-gray-900 transition-colors duration-300"
            >
              Alex Developer
            </a>
          </p>
        </motion.div>
        
        {/* Subtle footer line */}
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-gray-100/0 via-gray-300/30 to-gray-100/0"></div>
      </div>
    </footer>
  );
};

export default Footer;
