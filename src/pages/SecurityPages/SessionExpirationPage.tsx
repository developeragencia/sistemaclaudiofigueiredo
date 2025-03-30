
import React from 'react';
import { Card } from '@/components/ui/card';
import SessionExpiration from '@/components/security/SessionExpiration';

const SessionExpirationPage = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-blue-900">Expiração de Sessão</h1>
        <p className="text-muted-foreground">
          Gerencie as configurações de tempo de sessão e logout automático
        </p>
      </div>

      <SessionExpiration />
    </div>
  );
};

export default SessionExpirationPage;
