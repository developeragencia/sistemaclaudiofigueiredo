
import React from 'react';
import AnimatedLogo from '@/components/ui/AnimatedLogo';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LoginHeader: React.FC = () => {
  return (
    <div className="mb-8">
      <div className="flex justify-center mb-4">
        <AnimatedLogo size="large" showText={true} linkToHome={true} />
      </div>
      <p className="text-sky-700 text-center">
        Sistema de Auditoria e Gestão Tributária
      </p>
    </div>
  );
};

export default LoginHeader;
