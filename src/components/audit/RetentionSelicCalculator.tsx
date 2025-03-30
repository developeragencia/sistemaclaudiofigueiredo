
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calculator, ArrowRight, Info, Download, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from 'sonner';

// Mock Selic rates
const selicRates = [
  { date: '2023-11-01', rate: 12.25 },
  { date: '2023-10-01', rate: 12.25 },
  { date: '2023-09-01', rate: 13.25 },
  { date: '2023-08-01', rate: 13.25 },
  { date: '2023-07-01', rate: 13.75 },
  { date: '2023-06-01', rate: 13.75 },
  { date: '2023-05-01', rate: 13.75 },
  { date: '2023-04-01', rate: 13.75 },
  { date: '2023-03-01', rate: 13.75 },
  { date: '2023-02-01', rate: 13.75 },
  { date: '2023-01-01', rate: 13.75 },
  { date: '2022-12-01', rate: 13.75 },
  { date: '2022-11-01', rate: 13.75 },
  { date: '2022-10-01', rate: 13.75 },
  { date: '2022-09-01', rate: 13.75 },
  { date: '2022-08-01', rate: 13.75 },
  { date: '2022-07-01', rate: 13.25 },
  { date: '2022-06-01', rate: 13.25 },
  { date: '2022-05-01', rate: 12.75 },
  { date: '2022-04-01', rate: 12.75 },
  { date: '2022-03-01', rate: 11.75 },
  { date: '2022-02-01', rate: 10.75 },
  { date: '2022-01-01', rate: 9.25 },
  { date: '2021-12-01', rate: 9.25 },
];

interface CalculationResult {
  originalValue: number;
  correctedValue: number;
  selicRate: number;
  totalCorrection: number;
  correctionPercentage: number;
  monthlyBreakdown: {
    date: string;
    rate: number;
    monthlyCorrection: number;
    accumulatedValue: number;
  }[];
}

const RetentionSelicCalculator = () => {
  const [originalValue, setOriginalValue] = useState<string>('');
  const [retentionDate, setRetentionDate] = useState<Date | undefined>(new Date(Date.now() - 180 * 24 * 60 * 60 * 1000)); // 6 months ago
  const [calculationDate, setCalculationDate] = useState<Date | undefined>(new Date());
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const handleCalculate = () => {
    if (!originalValue || !retentionDate || !calculationDate) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }

    const value = parseFloat(originalValue.replace(/\./g, '').replace(',', '.'));
    
    if (isNaN(value) || value <= 0) {
      toast.error('Por favor, informe um valor válido');
      return;
    }
    
    if (retentionDate > calculationDate) {
      toast.error('A data de retenção não pode ser posterior à data de cálculo');
      return;
    }

    setIsCalculating(true);
    
    // Simulate calculation delay
    setTimeout(() => {
      // Sample calculation (simplified for demo)
      const monthDiff = (calculationDate.getFullYear() - retentionDate.getFullYear()) * 12 + 
                      calculationDate.getMonth() - retentionDate.getMonth();
      
      // Get relevant selic rates for the period
      const monthlyBreakdown = [];
      let accumulatedValue = value;
      
      for (let i = 0; i <= monthDiff; i++) {
        const currentDate = new Date(retentionDate);
        currentDate.setMonth(retentionDate.getMonth() + i);
        
        const dateString = format(currentDate, 'yyyy-MM-dd');
        const closestRate = findClosestRate(dateString);
        
        const monthlyRate = closestRate.rate / 100 / 12;
        const monthlyCorrection = accumulatedValue * monthlyRate;
        accumulatedValue += monthlyCorrection;
        
        monthlyBreakdown.push({
          date: format(currentDate, 'MMM yyyy', { locale: ptBR }),
          rate: closestRate.rate,
          monthlyCorrection,
          accumulatedValue
        });
      }
      
      const totalCorrection = accumulatedValue - value;
      const correctionPercentage = (totalCorrection / value) * 100;
      
      setResult({
        originalValue: value,
        correctedValue: accumulatedValue,
        selicRate: 12.25, // Current rate
        totalCorrection,
        correctionPercentage,
        monthlyBreakdown
      });
      
      setIsCalculating(false);
    }, 1500);
  };

  const findClosestRate = (date: string) => {
    // Find the closest rate in time
    const targetDate = new Date(date);
    let closestRate = selicRates[0];
    let smallestDiff = Infinity;
    
    for (const rate of selicRates) {
      const rateDate = new Date(rate.date);
      const diff = Math.abs(targetDate.getTime() - rateDate.getTime());
      
      if (diff < smallestDiff) {
        smallestDiff = diff;
        closestRate = rate;
      }
    }
    
    return closestRate;
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Calculadora de Correção pela Selic</CardTitle>
            <CardDescription>
              Calcule a atualização monetária de créditos tributários utilizando a taxa Selic.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="original-value">Valor Original (R$)</Label>
              <Input 
                id="original-value" 
                placeholder="0,00" 
                value={originalValue}
                onChange={(e) => setOriginalValue(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="retention-date">Data da Retenção</Label>
                <DatePicker
                  id="retention-date"
                  date={retentionDate}
                  onSelect={setRetentionDate}
                  alignment="start"
                  disabled={isCalculating}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="calculation-date">Data do Cálculo</Label>
                <DatePicker
                  id="calculation-date"
                  date={calculationDate}
                  onSelect={setCalculationDate}
                  alignment="start"
                  disabled={isCalculating}
                />
              </div>
            </div>
            
            <Button 
              onClick={handleCalculate} 
              className="w-full mt-2"
              disabled={isCalculating}
            >
              <Calculator className="h-4 w-4 mr-2" />
              {isCalculating ? 'Calculando...' : 'Calcular Correção'}
            </Button>
            
            <div className="text-center text-xs text-muted-foreground flex items-center justify-center mt-2">
              <Info className="h-3 w-3 mr-1" />
              Taxa Selic atual: 12,25% ao ano
            </div>
          </CardContent>
        </Card>
        
        {result && (
          <Card>
            <CardHeader>
              <CardTitle>Resultado do Cálculo</CardTitle>
              <CardDescription>
                Correção monetária de {format(retentionDate!, 'dd/MM/yyyy')} até {format(calculationDate!, 'dd/MM/yyyy')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Valor Original</span>
                    <span className="text-xl font-semibold">{formatCurrency(result.originalValue)}</span>
                  </div>
                  
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Valor Corrigido</span>
                    <span className="text-xl font-semibold text-green-600">{formatCurrency(result.correctedValue)}</span>
                  </div>
                </div>
                
                <div className="w-full grid grid-cols-2 gap-4 mt-2">
                  <div className="border rounded-md p-3">
                    <div className="text-sm text-muted-foreground">Correção Total</div>
                    <div className="text-lg font-semibold text-amber-600">
                      {formatCurrency(result.totalCorrection)}
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <div className="text-sm text-muted-foreground">Percentual</div>
                    <div className="text-lg font-semibold">
                      {result.correctionPercentage.toFixed(2)}%
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Histórico de correção mensal</h3>
                <div className="max-h-48 overflow-y-auto pr-2">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mês</TableHead>
                        <TableHead>Taxa Selic</TableHead>
                        <TableHead>Correção</TableHead>
                        <TableHead className="text-right">Acumulado</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {result.monthlyBreakdown.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{item.date}</TableCell>
                          <TableCell>{item.rate.toFixed(2)}%</TableCell>
                          <TableCell>{formatCurrency(item.monthlyCorrection)}</TableCell>
                          <TableCell className="text-right">{formatCurrency(item.accumulatedValue)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              <div className="flex justify-center pt-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Exportar Relatório
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Histórico de Taxas Selic</CardTitle>
          <CardDescription>
            Taxas Selic mensais utilizadas para cálculo de correção monetária
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Fonte: Banco Central do Brasil (BCB)</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Taxa Anual</TableHead>
                <TableHead>Taxa Mensal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selicRates.slice(0, 12).map((rate, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {format(new Date(rate.date), 'MMM yyyy', { locale: ptBR })}
                  </TableCell>
                  <TableCell>{rate.rate.toFixed(2)}%</TableCell>
                  <TableCell>{(rate.rate / 12).toFixed(3)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RetentionSelicCalculator;
