
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, FileText, Table, BarChart3 } from 'lucide-react';

// Import components
import CalculatorForm from '@/components/calculator/CalculatorForm';
import CalculatorHistory from '@/components/calculator/CalculatorHistory';
import CalculatorCharts from '@/components/calculator/CalculatorCharts';
import TaxCalculator from '@/components/calculator/TaxCalculator';

const AdvancedCalculator = () => {
  const [calculationResults, setCalculationResults] = useState<any>(null);

  const handleCalculationComplete = (results: any) => {
    setCalculationResults(results);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Calculadora Avançada</h1>
        <p className="text-muted-foreground">
          Ferramentas para cálculos tributários complexos com múltiplos cenários
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-blue-600" />
                Calculadora Tributária
              </CardTitle>
              <CardDescription>
                Faça simulações e cálculos precisos de tributos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="tax" className="w-full">
                <TabsList className="grid grid-cols-4 mb-8">
                  <TabsTrigger value="tax">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculadora de Impostos
                  </TabsTrigger>
                  <TabsTrigger value="form">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculadora Completa
                  </TabsTrigger>
                  <TabsTrigger value="history">
                    <FileText className="h-4 w-4 mr-2" />
                    Histórico
                  </TabsTrigger>
                  <TabsTrigger value="charts">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Gráficos
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="tax" className="mt-0">
                  <TaxCalculator />
                </TabsContent>
                
                <TabsContent value="form" className="mt-0">
                  <CalculatorForm onCalculate={handleCalculationComplete} />
                </TabsContent>
                
                <TabsContent value="history" className="mt-0">
                  <CalculatorHistory />
                </TabsContent>
                
                <TabsContent value="charts" className="mt-0">
                  <CalculatorCharts data={calculationResults} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Table className="h-5 w-5 text-blue-600" />
                Tabelas de Referência
              </CardTitle>
              <CardDescription>
                Tabelas atualizadas para consulta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-blue-100 bg-blue-50">
                  <h3 className="text-sm font-medium text-blue-800 mb-1">Tabela IRRF - {new Date().getFullYear()}</h3>
                  <p className="text-xs text-blue-600">Valores atualizados para o exercício atual</p>
                  <div className="mt-2">
                    <button className="text-xs text-blue-700 hover:text-blue-800 flex items-center gap-1">
                      <FileText className="h-3 w-3" /> Visualizar tabela completa
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-blue-100 bg-blue-50">
                  <h3 className="text-sm font-medium text-blue-800 mb-1">Tabela INSS - {new Date().getFullYear()}</h3>
                  <p className="text-xs text-blue-600">Valores atualizados para o exercício atual</p>
                  <div className="mt-2">
                    <button className="text-xs text-blue-700 hover:text-blue-800 flex items-center gap-1">
                      <FileText className="h-3 w-3" /> Visualizar tabela completa
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-blue-100 bg-blue-50">
                  <h3 className="text-sm font-medium text-blue-800 mb-1">Índices Econômicos</h3>
                  <p className="text-xs text-blue-600">SELIC, IPCA e outros índices relevantes</p>
                  <div className="mt-2">
                    <button className="text-xs text-blue-700 hover:text-blue-800 flex items-center gap-1">
                      <BarChart3 className="h-3 w-3" /> Visualizar índices
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdvancedCalculator;
