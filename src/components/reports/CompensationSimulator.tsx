
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalculatorIcon, PlusCircle, Download, LineChart } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function CompensationSimulator() {
  const [baseValue, setBaseValue] = useState<number>(10000);
  const [taxRate, setTaxRate] = useState<number>(4.65);
  const [startDate, setStartDate] = useState<Date>(new Date(new Date().setMonth(new Date().getMonth() - 3)));
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [selicRate, setSelicRate] = useState<number>(0.92);
  const [compensationType, setCompensationType] = useState<string>("per_dcomp");
  const [result, setResult] = useState<number | null>(null);
  const [historicalData, setHistoricalData] = useState<any[]>([]);
  const [openChartDialog, setOpenChartDialog] = useState<boolean>(false);

  // Calculate the compensation value
  useEffect(() => {
    if (baseValue && taxRate && startDate && endDate) {
      // Get the difference in months
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
      
      // Calculate base tax amount
      const taxAmount = baseValue * (taxRate / 100);
      
      // Apply Selic correction
      const selicCorrection = taxAmount * ((selicRate / 100) * diffMonths);
      
      const totalCompensation = taxAmount + selicCorrection;
      setResult(totalCompensation);
      
      // Generate historical data for simulation
      const newHistoricalData = [];
      let currentDate = new Date(startDate);
      let accumulatedValue = taxAmount;
      
      while (currentDate <= end) {
        newHistoricalData.push({
          date: format(new Date(currentDate), 'MM/yyyy', { locale: ptBR }),
          value: accumulatedValue,
          original: taxAmount
        });
        
        // Move to next month and add Selic correction
        currentDate.setMonth(currentDate.getMonth() + 1);
        accumulatedValue += accumulatedValue * (selicRate / 100);
      }
      
      setHistoricalData(newHistoricalData);
    }
  }, [baseValue, taxRate, startDate, endDate, selicRate]);

  // Format currency for display
  const formatCurrency = (value: number | null) => {
    if (value === null) return 'R$ 0,00';
    
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };
  
  // Custom tooltip for chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const difference = data.value - data.original;
      
      return (
        <div className="bg-white p-3 border rounded shadow-sm">
          <p className="font-medium">{label}</p>
          <p className="text-sm">Valor Atualizado: {formatCurrency(data.value)}</p>
          <p className="text-sm">Valor Original: {formatCurrency(data.original)}</p>
          <p className="text-sm text-green-600">Correção Selic: {formatCurrency(difference)}</p>
        </div>
      );
    }
    
    return null;
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="bg-sky-50/50">
        <CardTitle className="text-sky-800 flex items-center gap-2">
          <CalculatorIcon className="h-5 w-5 text-sky-600" />
          Simulador de Compensação Tributária
        </CardTitle>
        <CardDescription>
          Simule valores de compensação com correção monetária pela taxa Selic
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="baseValue">Valor Base (R$)</Label>
              <Input 
                id="baseValue"
                type="number" 
                value={baseValue}
                onChange={(e) => setBaseValue(Number(e.target.value))}
                className="border-sky-200 focus:border-sky-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="taxRate">Alíquota (%)</Label>
              <Input 
                id="taxRate"
                type="number" 
                value={taxRate}
                onChange={(e) => setTaxRate(Number(e.target.value))}
                step="0.01"
                className="border-sky-200 focus:border-sky-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="startDate">Data Inicial</Label>
              <DatePicker
                date={startDate}
                onSelect={setStartDate}
                id="startDate"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endDate">Data Final</Label>
              <DatePicker
                date={endDate}
                onSelect={setEndDate}
                id="endDate"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="selicRate">Taxa Selic mensal (%)</Label>
              <Input 
                id="selicRate"
                type="number"
                value={selicRate}
                onChange={(e) => setSelicRate(Number(e.target.value))}
                step="0.01"
                className="border-sky-200 focus:border-sky-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="compensationType">Tipo de Compensação</Label>
              <Select 
                value={compensationType} 
                onValueChange={setCompensationType}
              >
                <SelectTrigger className="border-sky-200 focus:border-sky-500">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="per_dcomp">PER/DCOMP</SelectItem>
                  <SelectItem value="judicial">Decisão Judicial</SelectItem>
                  <SelectItem value="administrative">Processo Administrativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {result !== null && (
              <div className="p-4 bg-sky-50 rounded-md mt-4">
                <p className="text-sm text-sky-700 font-medium">Valor estimado para compensação:</p>
                <p className="text-xl font-bold text-sky-800">
                  {formatCurrency(result)}
                </p>
                <p className="text-xs text-sky-600 mt-1">
                  Valor original: {formatCurrency(baseValue * (taxRate / 100))}
                </p>
                <p className="text-xs text-sky-600">
                  Correção Selic: {formatCurrency(result - (baseValue * (taxRate / 100)))}
                </p>
              </div>
            )}
          </div>
        </div>
        
        {result !== null && historicalData.length > 1 && (
          <div className="mt-6 p-4 bg-sky-50/30 rounded-md">
            <h3 className="text-sm font-medium text-sky-700 mb-2">
              Evolução da Correção pela Taxa Selic
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart
                  data={historicalData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="date" stroke="#64748b" />
                  <YAxis 
                    stroke="#64748b" 
                    tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="original"
                    name="Valor Original" 
                    stroke="#94a3b8" 
                    strokeDasharray="5 5"
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    name="Com Correção Selic"
                    stroke="#0284c7" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2 justify-between bg-sky-50/30">
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="text-sky-700 border-sky-300"
            onClick={() => {
              setBaseValue(10000);
              setTaxRate(4.65);
              setStartDate(new Date(new Date().setMonth(new Date().getMonth() - 3)));
              setEndDate(new Date());
              setSelicRate(0.92);
              setCompensationType("per_dcomp");
            }}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Novo Cálculo
          </Button>
          <Button variant="outline" className="text-sky-700 border-sky-300">
            <Download className="mr-2 h-4 w-4" /> Exportar
          </Button>
        </div>
        
        <Dialog open={openChartDialog} onOpenChange={setOpenChartDialog}>
          <DialogTrigger asChild>
            <Button className="bg-sky-700 hover:bg-sky-800">
              <LineChart className="mr-2 h-4 w-4" /> Ver Projeção Detalhada
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Projeção Detalhada de Compensação</DialogTitle>
              <DialogDescription>
                Evolução do valor com correção pela taxa Selic ao longo do tempo
              </DialogDescription>
            </DialogHeader>
            
            {result !== null && historicalData.length > 1 && (
              <div className="space-y-6">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart
                      data={historicalData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="date" stroke="#64748b" />
                      <YAxis 
                        stroke="#64748b" 
                        tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="original"
                        name="Valor Original" 
                        stroke="#94a3b8" 
                        strokeDasharray="5 5"
                        strokeWidth={2}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        name="Com Correção Selic"
                        stroke="#0284c7" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="border rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Período</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Original</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Corrigido</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Correção Selic</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {historicalData.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatCurrency(item.original)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatCurrency(item.value)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 text-right">{formatCurrency(item.value - item.original)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}

export default CompensationSimulator;
