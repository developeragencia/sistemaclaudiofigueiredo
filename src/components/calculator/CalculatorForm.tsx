
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Calculator, Check, X } from "lucide-react";

interface CalculatorFormProps {
  onCalculate: (results: any) => void;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({ onCalculate }) => {
  const [baseValue, setBaseValue] = useState<string>('');
  const [taxType, setTaxType] = useState<string>('irrf');
  const [aliquota, setAliquota] = useState<string>('');
  const [period, setPeriod] = useState<string>('');
  const [withInterest, setWithInterest] = useState<boolean>(true);
  const [withFines, setWithFines] = useState<boolean>(false);
  const [advancedMode, setAdvancedMode] = useState<boolean>(false);
  
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
  
  const handleAliquotaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/[^\d,]/g, '');
    setAliquota(value);
  };
  
  const handleCalculate = () => {
    const baseValueNumber = parseFloat(baseValue.replace(/\./g, '').replace(',', '.')) || 0;
    const aliquotaNumber = parseFloat(aliquota.replace(',', '.')) || 0;
    
    let taxRate = aliquotaNumber > 0 ? aliquotaNumber / 100 : 0;
    
    // If no custom aliquota, use default values
    if (taxRate === 0) {
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
    }
    
    let result = baseValueNumber * taxRate;
    
    // Add interests (mock calculation - in a real app this would use SELIC rates)
    if (withInterest) {
      result = result * 1.05; // 5% interest
    }
    
    // Add fines (mock calculation)
    if (withFines) {
      result = result * 1.10; // 10% fine
    }
    
    // Create detailed results object to pass back
    const results = {
      baseValue: baseValueNumber,
      taxType,
      period,
      aliquota: taxRate * 100,
      withInterest,
      withFines,
      taxAmount: result,
      calculationDate: new Date().toISOString()
    };
    
    onCalculate(results);
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
        <h3 className="text-blue-800 font-medium flex items-center mb-2">
          <Calculator className="h-4 w-4 mr-2" />
          Calculadora Avançada de Tributos
        </h3>
        <p className="text-sm text-blue-700">
          Preencha os dados para calcular valores de recuperação tributária com precisão.
        </p>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label>Tipo de Tributo</Label>
          <Select value={taxType} onValueChange={setTaxType}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo de tributação" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="irrf">IRRF - Imposto de Renda Retido na Fonte</SelectItem>
              <SelectItem value="pis_cofins">PIS/COFINS</SelectItem>
              <SelectItem value="iss">ISS - Imposto Sobre Serviços</SelectItem>
              <SelectItem value="icms">ICMS - Imposto sobre Circulação de Mercadorias</SelectItem>
              <SelectItem value="ipi">IPI - Imposto sobre Produtos Industrializados</SelectItem>
              <SelectItem value="outros">Outros Tributos</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Valor Base</Label>
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
            <Label>Período de Referência</Label>
            <Input
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              placeholder="MM/AAAA"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="advanced"
            checked={advancedMode}
            onCheckedChange={() => setAdvancedMode(!advancedMode)}
          />
          <label
            htmlFor="advanced"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Modo avançado
          </label>
        </div>
        
        {advancedMode && (
          <>
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Alíquota Customizada (%)</Label>
                <Input
                  value={aliquota}
                  onChange={handleAliquotaChange}
                  placeholder="Ex: 15,00"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Deixe em branco para usar a alíquota padrão
                </p>
              </div>
              
              <div>
                <Label className="block mb-2">Opções Adicionais</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="withInterest"
                      checked={withInterest}
                      onCheckedChange={() => setWithInterest(!withInterest)}
                    />
                    <label
                      htmlFor="withInterest"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Calcular com juros (SELIC)
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="withFines"
                      checked={withFines}
                      onCheckedChange={() => setWithFines(!withFines)}
                    />
                    <label
                      htmlFor="withFines"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Incluir multa por atraso
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline" type="button" className="gap-1">
          <X className="h-4 w-4" /> Limpar
        </Button>
        <Button type="button" onClick={handleCalculate} className="gap-1">
          <Check className="h-4 w-4" /> Calcular
        </Button>
      </div>
    </div>
  );
};

export default CalculatorForm;
