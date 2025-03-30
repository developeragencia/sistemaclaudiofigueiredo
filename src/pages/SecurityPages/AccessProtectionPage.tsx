
import React from 'react';
import { Card } from '@/components/ui/card';
import AccessProtection from '@/components/security/AccessProtection';

const AccessProtectionPage = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-blue-900">Proteção de Acesso</h1>
        <p className="text-muted-foreground">
          Configure políticas de segurança para tentativas de login e bloqueio de IPs
        </p>
      </div>

      <AccessProtection />
    </div>
  );
};

export default AccessProtectionPage;
