
import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { DateRange } from 'react-day-picker';
import { Card } from '@/components/ui/card';

interface PaymentSummaryProps {
  totalAmount: number;
  totalTaxWithheld: number;
  paymentsCount: number;
  dateRange: DateRange;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  totalAmount,
  totalTaxWithheld,
  paymentsCount,
  dateRange
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };
  
  const getDateRangeText = () => {
    if (dateRange.from && dateRange.to) {
      return `${format(dateRange.from, 'dd/MM/yyyy', { locale: ptBR })} até ${format(dateRange.to, 'dd/MM/yyyy', { locale: ptBR })}`;
    } else if (dateRange.from) {
      return `A partir de ${format(dateRange.from, 'dd/MM/yyyy', { locale: ptBR })}`;
    }
    return 'Período não especificado';
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">Período</h3>
        <p className="text-sm">{getDateRangeText()}</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Total de Pagamentos</h3>
          <p className="text-2xl font-bold">{formatCurrency(totalAmount)}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Total de Retenções</h3>
          <p className="text-2xl font-bold">{formatCurrency(totalTaxWithheld)}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Percentual Médio</h3>
          <p className="text-2xl font-bold">
            {totalAmount > 0 
              ? `${((totalTaxWithheld / totalAmount) * 100).toFixed(2)}%`
              : '0.00%'
            }
          </p>
        </div>
      </div>
      
      <div className="pt-4 border-t">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Quantidade de notas</span>
          <span className="font-bold">{paymentsCount}</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;
