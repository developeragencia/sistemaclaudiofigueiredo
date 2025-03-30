
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronRight, ArrowRight, Calculator } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface SimulationResult {
  originalAmount: number;
  recoveredAmount: number;
  taxBase: number;
  taxRate: number;
  periodInMonths: number;
  withInterest: boolean;
  interestAmount?: number;
  totalAmount?: number;
}

const TaxCreditSimulator: React.FC = () => {
  const [originalAmount, setOriginalAmount] = useState<string>('');
  const [taxType, setTaxType] = useState<string>('irpj');
  const [period, setPeriod] = useState<string>('12');
  const [withInterest, setWithInterest] = useState<boolean>(true);
  const [result, setResult] = useState<SimulationResult | null>(null);
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.,]/g, '');
    setOriginalAmount(value);
  };
  
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };
  
  const parseValueToNumber = (value: string): number => {
    return parseFloat(value.replace(/\./g, '').replace(',', '.')) || 0;
  };
  
  const getTaxRate = (type: string): number => {
    switch(type) {
      case 'irpj':
        return 0.15;
      case 'csll':
        return 0.09;
      case 'pis':
        return 0.0165;
      case 'cofins':
        return 0.076;
      case 'inss':
        return 0.11;
      default:
        return 0.15;
    }
  };
  
  const handleSimulate = () => {
    const amount = parseValueToNumber(originalAmount);
    const taxRate = getTaxRate(taxType);
    const periodInt = parseInt(period) || 12;
    
    const taxBase = amount;
    const recoveredAmount = taxBase * taxRate;
    
    let interestAmount = 0;
    let totalAmount = recoveredAmount;
    
    if (withInterest) {
      // Simple annual interest of 12%
      const monthlyRate = 0.01;
      const months = periodInt;
      
      interestAmount = recoveredAmount * monthlyRate * months;
      totalAmount = recoveredAmount + interestAmount;
    }
    
    const simulationResult: SimulationResult = {
      originalAmount: amount,
      recoveredAmount,
      taxBase,
      taxRate,
      periodInMonths: periodInt,
      withInterest,
      interestAmount: withInterest ? interestAmount : undefined,
      totalAmount: withInterest ? totalAmount : undefined
    };
    
    setResult(simulationResult);
  };
  
  const handleClear = () => {
    setOriginalAmount('');
    setTaxType('irpj');
    setPeriod('12');
    setWithInterest(true);
    setResult(null);
  };

  return (
    <Card className="border-blue-100">
      <CardHeader className="bg-blue-50/50">
        <CardTitle className="text-blue-800">Simulador de Recuperação de Créditos</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="amount">Valor Base para Cálculo</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                <Input
                  id="amount"
                  placeholder="0,00"
                  className="pl-9"
                  value={originalAmount}
                  onChange={handleAmountChange}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tax-type">Tipo de Tributo</Label>
              <Select value={taxType} onValueChange={setTaxType}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo de tributo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="irpj">IRPJ - Imposto de Renda Pessoa Jurídica</SelectItem>
                  <SelectItem value="csll">CSLL - Contribuição Social sobre Lucro Líquido</SelectItem>
                  <SelectItem value="pis">PIS - Programa de Integração Social</SelectItem>
                  <SelectItem value="cofins">COFINS - Contribuição para Financ. da Seguridade Social</SelectItem>
                  <SelectItem value="inss">INSS - Instituto Nacional do Seguro Social</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="period">Período de Recuperação (meses)</Label>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12">12 meses (1 ano)</SelectItem>
                  <SelectItem value="24">24 meses (2 anos)</SelectItem>
                  <SelectItem value="36">36 meses (3 anos)</SelectItem>
                  <SelectItem value="48">48 meses (4 anos)</SelectItem>
                  <SelectItem value="60">60 meses (5 anos)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="with-interest" checked={withInterest} onCheckedChange={() => setWithInterest(!withInterest)} />
              <Label htmlFor="with-interest" className="cursor-pointer">
                Incluir juros de remuneração SELIC
              </Label>
            </div>
          </div>
          
          <div>
            {result ? (
              <div className="space-y-6">
                <div className="flex items-center bg-blue-50 p-4 rounded-lg">
                  <div className="flex-1 space-y-2">
                    <div className="text-sm text-blue-600">Valor Base</div>
                    <div className="text-2xl font-bold text-blue-800">{formatCurrency(result.originalAmount)}</div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-blue-400" />
                  <div className="flex-1 space-y-2">
                    <div className="text-sm text-blue-600">Valor Recuperável</div>
                    <div className="text-2xl font-bold text-blue-800">{formatCurrency(result.recoveredAmount)}</div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <h4 className="font-medium">Detalhes do Cálculo</h4>
                  
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div className="text-gray-500">Alíquota Aplicada:</div>
                    <div className="text-gray-900 font-medium">{(result.taxRate * 100).toFixed(2)}%</div>
                    
                    <div className="text-gray-500">Período Considerado:</div>
                    <div className="text-gray-900 font-medium">{result.periodInMonths} meses</div>
                    
                    {result.withInterest && (
                      <>
                        <div className="text-gray-500">Juros SELIC:</div>
                        <div className="text-gray-900 font-medium">{formatCurrency(result.interestAmount || 0)}</div>
                        
                        <div className="text-gray-500">Total com Juros:</div>
                        <div className="text-green-600 font-medium">{formatCurrency(result.totalAmount || 0)}</div>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                  <h4 className="text-green-800 font-medium text-sm">Potencial de Recuperação</h4>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-green-600">{formatCurrency(result.originalAmount)}</span>
                    <ArrowRight className="h-4 w-4 text-green-500" />
                    <span className="text-xl font-bold text-green-700">
                      {formatCurrency(result.withInterest && result.totalAmount ? result.totalAmount : result.recoveredAmount)}
                    </span>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="text-center">
                  <Button className="w-full">
                    Solicitar Análise Detalhada
                  </Button>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center p-8 bg-gray-50 rounded-lg w-full">
                  <Calculator className="h-10 w-10 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Simule a Recuperação de Créditos</h3>
                  <p className="text-gray-500 mb-6">
                    Preencha os campos ao lado para calcular o potencial de recuperação para sua empresa.
                  </p>
                  <Button onClick={handleSimulate}>
                    Iniciar Simulação
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleClear}>
          Limpar
        </Button>
        <Button onClick={handleSimulate}>
          <Calculator className="mr-2 h-4 w-4" />
          Simular Recuperação
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TaxCreditSimulator;
