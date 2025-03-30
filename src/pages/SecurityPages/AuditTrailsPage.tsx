
import React from 'react';
import { Card } from '@/components/ui/card';
import AuditTrails from '@/components/security/AuditTrails';

const AuditTrailsPage = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-blue-900">Trilhas de Auditoria</h1>
        <p className="text-muted-foreground">
          Visualize e analise o histórico de atividades no sistema
        </p>
      </div>

      <AuditTrails />
    </div>
  );
};

export default AuditTrailsPage;
