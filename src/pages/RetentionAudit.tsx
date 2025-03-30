
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RetentionAuditTable from '@/components/audit/RetentionAuditTable';
import RetentionSummary from '@/components/audit/RetentionSummary';
import RetentionSelicCalculator from '@/components/audit/RetentionSelicCalculator';

const RetentionAudit = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Auditoria de Retenções</h1>
        <p className="text-muted-foreground">
          Audite, calcule e analise as retenções fiscais para identificar créditos recuperáveis.
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Cálculo e Auditoria de Retenções</CardTitle>
          <CardDescription>
            Sistema automatizado para identificar discrepâncias entre valores retidos e devidos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="auditTable" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="auditTable">Tabela de Auditoria</TabsTrigger>
              <TabsTrigger value="summary">Resumo de Retenções</TabsTrigger>
              <TabsTrigger value="calculator">Calculadora Selic</TabsTrigger>
            </TabsList>
            
            <TabsContent value="auditTable" className="mt-0">
              <RetentionAuditTable />
            </TabsContent>
            
            <TabsContent value="summary" className="mt-0">
              <RetentionSummary />
            </TabsContent>
            
            <TabsContent value="calculator" className="mt-0">
              <RetentionSelicCalculator />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default RetentionAudit;
