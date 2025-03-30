
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Calculator, Calendar, ArrowRight } from "lucide-react";

const TaxCreditsCalculator = () => {
  const [baseValue, setBaseValue] = useState<string>('');
  const [taxType, setTaxType] = useState<string>('irrf');
  const [period, setPeriod] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  // Simple calculation function (mock)
  const calculateCredit = () => {
    const value = parseFloat(baseValue.replace(/\./g, '').replace(',', '.')) || 0;
    let taxRate = 0;

    switch(taxType) {
      case 'irrf':
        taxRate = 0.015;
        break;
      case 'pis_cofins':
        taxRate = 0.0925;
        break;
      case 'iss':
        taxRate = 0.05;
        break;
      case 'icms':
        taxRate = 0.18;
        break;
      case 'ipi':
        taxRate = 0.12;
        break;
      default:
        taxRate = 0.01;
    }

    setResult(value * taxRate);
  };

  // Format currency input
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/\D/g, '');
    
    if (value) {
      value = (parseInt(value) / 100).toFixed(2);
      value = value.replace('.', ',');
      value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }
    
    setBaseValue(value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-6 flex items-center">
            <Calculator className="h-5 w-5 mr-2 text-blue-600" />
            Calculadora de Créditos Tributários
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium block mb-1">
                Tipo de Tributação
              </label>
              <Select value={taxType} onValueChange={setTaxType}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo de tributação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="irrf">IRRF</SelectItem>
                  <SelectItem value="pis_cofins">PIS/COFINS</SelectItem>
                  <SelectItem value="iss">ISS</SelectItem>
                  <SelectItem value="icms">ICMS</SelectItem>
                  <SelectItem value="ipi">IPI</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium block mb-1">
                Valor Base
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  R$
                </span>
                <Input 
                  value={baseValue} 
                  onChange={handleValueChange}
                  className="pl-8" 
                  placeholder="0,00"
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium block mb-1">
                Período de Referência
              </label>
              <div className="relative">
                <Input
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  placeholder="MM/AAAA"
                  className="pl-8"
                />
                <Calendar className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
            </div>
            
            <Button 
              onClick={calculateCredit} 
              className="w-full mt-4"
            >
              Calcular Crédito
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-6">Resultado</h3>
          
          {result !== null ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded">
                  {taxType === 'irrf' ? 'IRRF' : 
                   taxType === 'pis_cofins' ? 'PIS/COFINS' : 
                   taxType === 'iss' ? 'ISS' : 
                   taxType === 'icms' ? 'ICMS' : 'IPI'}
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded">
                  Crédito Calculado
                </div>
              </div>
              
              <div className="p-6 bg-gray-50 rounded-lg border text-center">
                <div className="text-sm text-gray-500 mb-2">Valor do Crédito</div>
                <div className="text-3xl font-bold text-green-700">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(result)}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium text-sm mb-3">Detalhamento do Cálculo</h4>
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">Valor Base:</td>
                      <td className="py-2 text-right font-medium">
                        {baseValue ? `R$ ${baseValue}` : 'R$ 0,00'}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Alíquota Aplicada:</td>
                      <td className="py-2 text-right font-medium">
                        {taxType === 'irrf' ? '1,50%' : 
                         taxType === 'pis_cofins' ? '9,25%' : 
                         taxType === 'iss' ? '5,00%' : 
                         taxType === 'icms' ? '18,00%' : '12,00%'}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Período:</td>
                      <td className="py-2 text-right font-medium">
                        {period || '-'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button variant="outline" className="w-1/2">
                  Salvar Cálculo
                </Button>
                <Button className="w-1/2">
                  Emitir Relatório
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] text-center p-4">
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <Calculator className="h-6 w-6 text-blue-700" />
              </div>
              <h4 className="text-lg font-medium text-gray-800">
                Calculadora de Créditos
              </h4>
              <p className="text-gray-500 mt-2 max-w-md">
                Preencha os campos ao lado e clique em "Calcular Crédito" para ver o resultado da simulação.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxCreditsCalculator;
