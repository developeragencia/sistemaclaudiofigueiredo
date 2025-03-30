
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, Calculator, FileCheck, BarChart3 } from 'lucide-react';

// Import components
import TaxCreditsTable from '@/components/tax-credits/TaxCreditsTable';
import TaxCreditsSummary from '@/components/tax-credits/TaxCreditsSummary';
import TaxCreditsTimeline from '@/components/tax-credits/TaxCreditsTimeline';
import TaxCreditSimulator from '@/components/tax-credits/TaxCreditSimulator';
import TaxCreditsCalculator from '@/components/tax-credits/TaxCreditsCalculator';

const TaxCredits = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Créditos Tributários</h1>
        <p className="text-muted-foreground">
          Gestão completa de créditos tributários: identifique, calcule e recupere valores.
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Gestão de Créditos Tributários</CardTitle>
          <CardDescription>
            Sistema integrado para controle e recuperação de créditos fiscais
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="table" className="w-full">
            <TabsList className="grid grid-cols-5 mb-8">
              <TabsTrigger value="table">
                <CreditCard className="h-4 w-4 mr-2" />
                Créditos Disponíveis
              </TabsTrigger>
              <TabsTrigger value="summary">
                <BarChart3 className="h-4 w-4 mr-2" />
                Resumo Gerencial
              </TabsTrigger>
              <TabsTrigger value="simulator">
                <Calculator className="h-4 w-4 mr-2" />
                Simulador
              </TabsTrigger>
              <TabsTrigger value="calculator">
                <Calculator className="h-4 w-4 mr-2" />
                Calculadora
              </TabsTrigger>
              <TabsTrigger value="timeline">
                <FileCheck className="h-4 w-4 mr-2" />
                Linha do Tempo
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="table" className="mt-0">
              <TaxCreditsTable />
            </TabsContent>
            
            <TabsContent value="summary" className="mt-0">
              <TaxCreditsSummary />
            </TabsContent>
            
            <TabsContent value="simulator" className="mt-0">
              <TaxCreditSimulator />
            </TabsContent>
            
            <TabsContent value="calculator" className="mt-0">
              <TaxCreditsCalculator />
            </TabsContent>
            
            <TabsContent value="timeline" className="mt-0">
              <TaxCreditsTimeline />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxCredits;
