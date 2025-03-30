
import React from 'react';
import { Card } from '@/components/ui/card';
import TwoFactorAuth from '@/components/security/TwoFactorAuth';

const TwoFactorAuthPage = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-blue-900">Autenticação em Dois Fatores</h1>
        <p className="text-muted-foreground">
          Aumente a segurança da sua conta com autenticação de dois fatores
        </p>
      </div>

      <TwoFactorAuth />
    </div>
  );
};

export default TwoFactorAuthPage;
