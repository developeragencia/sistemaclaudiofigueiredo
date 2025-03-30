
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Minus, Calculator, Clock, Calendar, ArrowRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CalculationResult {
  originalValue: number;
  taxAmount: number;
  finalValue: number;
  interestAmount?: number;
  totalValue?: number;
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

const TaxCalculator: React.FC = () => {
  const [baseValue, setBaseValue] = useState<string>('');
  const [taxRate, setTaxRate] = useState<string>('');
  const [calculationType, setCalculationType] = useState<string>('add');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [calculationHistory, setCalculationHistory] = useState<CalculationResult[]>([]);

  const handleBaseValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.,]/g, '');
    setBaseValue(value);
  };

  const handleTaxRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.,]/g, '');
    setTaxRate(value);
  };

  const parseValueToNumber = (value: string): number => {
    return parseFloat(value.replace(/\./g, '').replace(',', '.')) || 0;
  };
  
  const handleCalculate = () => {
    const baseValueNumber = parseValueToNumber(baseValue);
    const taxRateNumber = parseValueToNumber(taxRate) / 100;
    
    const taxAmount = baseValueNumber * taxRateNumber;
    let finalValue: number;
    
    if (calculationType === 'add') {
      finalValue = baseValueNumber + taxAmount;
    } else {
      finalValue = baseValueNumber - taxAmount;
    }
    
    const newResult = {
      originalValue: baseValueNumber,
      taxAmount: taxAmount,
      finalValue: finalValue
    };
    
    setResult(newResult);
    setCalculationHistory([newResult, ...calculationHistory.slice(0, 9)]);
  };
  
  const handleWithInterest = () => {
    if (!result) return;
    
    const interestRate = 0.01; // 1% monthly interest
    const interestAmount = result.finalValue * interestRate;
    const totalValue = result.finalValue + interestAmount;
    
    const newResult = {
      ...result,
      interestAmount,
      totalValue
    };
    
    setResult(newResult);
    setCalculationHistory([newResult, ...calculationHistory.slice(0, 9)]);
  };
  
  const handleClear = () => {
    setBaseValue('');
    setTaxRate('');
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="calculator" className="w-full">
        <TabsList>
          <TabsTrigger value="calculator">
            <Calculator className="mr-2 h-4 w-4" />
            Calculadora
          </TabsTrigger>
          <TabsTrigger value="history">
            <Clock className="mr-2 h-4 w-4" />
            Histórico
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="calculator" className="space-y-4">
          <Card className="border border-blue-100">
            <CardHeader className="bg-blue-50/50">
              <CardTitle className="text-blue-800">Calculadora de Impostos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="base-value">Valor Base</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                    <Input
                      id="base-value"
                      placeholder="0,00"
                      className="pl-9"
                      value={baseValue}
                      onChange={handleBaseValueChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tax-rate">Alíquota (%)</Label>
                  <div className="relative">
                    <Input
                      id="tax-rate"
                      placeholder="0,00"
                      value={taxRate}
                      onChange={handleTaxRateChange}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Tipo de Cálculo</Label>
                <Select value={calculationType} onValueChange={setCalculationType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de cálculo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="add">
                      <div className="flex items-center">
                        <Plus className="mr-2 h-4 w-4" />
                        <span>Adicionar ao valor (valor + imposto)</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="subtract">
                      <div className="flex items-center">
                        <Minus className="mr-2 h-4 w-4" />
                        <span>Subtrair do valor (valor - imposto)</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {result && (
                <Card className="mt-6 bg-blue-50/30">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Valor Base:</span>
                        <span className="font-medium">{formatCurrency(result.originalValue)}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Valor do Imposto:</span>
                        <span className="font-medium">{formatCurrency(result.taxAmount)}</span>
                      </div>
                      
                      <div className="h-px bg-gray-200"></div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Valor Final:</span>
                        <span className="text-lg font-bold text-blue-700">{formatCurrency(result.finalValue)}</span>
                      </div>
                      
                      {result.interestAmount && result.totalValue && (
                        <>
                          <div className="h-px bg-gray-200"></div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Juros Aplicados:</span>
                            <span className="font-medium">{formatCurrency(result.interestAmount)}</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Valor com Juros:</span>
                            <span className="text-lg font-bold text-green-600">{formatCurrency(result.totalValue)}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                  {!result.interestAmount && (
                    <CardFooter className="justify-end py-3 px-6 bg-blue-50/50 border-t border-blue-100">
                      <Button variant="outline" size="sm" onClick={handleWithInterest}>
                        Calcular com Juros
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleClear}>
                Limpar
              </Button>
              <Button onClick={handleCalculate}>
                <Calculator className="mr-2 h-4 w-4" />
                Calcular
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Histórico de Cálculos</CardTitle>
            </CardHeader>
            <CardContent>
              {calculationHistory.length > 0 ? (
                <div className="space-y-4">
                  {calculationHistory.map((item, index) => (
                    <Card key={index} className="bg-gray-50">
                      <CardContent className="p-4">
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-gray-500">{new Date().toLocaleString()}</span>
                        </div>
                        
                        <div className="mt-2 flex items-center">
                          <div className="bg-white px-3 py-1.5 rounded border">
                            {formatCurrency(item.originalValue)}
                          </div>
                          <ArrowRight className="mx-2 text-gray-400" />
                          <div className="bg-blue-50 px-3 py-1.5 rounded border border-blue-100 font-medium">
                            {formatCurrency(item.finalValue)}
                          </div>
                          {item.totalValue && (
                            <>
                              <ArrowRight className="mx-2 text-gray-400" />
                              <div className="bg-green-50 px-3 py-1.5 rounded border border-green-100 font-medium">
                                {formatCurrency(item.totalValue)}
                              </div>
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-gray-500">
                  <Clock className="mx-auto h-8 w-8 text-gray-300 mb-2" />
                  <p>Nenhum cálculo no histórico.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaxCalculator;
