
import React from 'react';
import { Payment } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { CalendarDays, Receipt, Building2, FileText, Calculator, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface PaymentDetailsProps {
  payment: Payment | null;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({ payment }) => {
  // Format currency for display
  const formatCurrency = (value: number | undefined) => {
    if (value === undefined) return '-';
    
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };
  
  // Get supplier name based on ID (mock data)
  const getSupplierName = (supplierId: string | undefined) => {
    if (!supplierId) return 'Fornecedor não identificado';
    
    switch (supplierId) {
      case 'supplier1':
        return 'ABC Tecnologia';
      case 'supplier2':
        return 'XYZ Consulting';
      default:
        return 'Fornecedor não identificado';
    }
  };
  
  if (!payment) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Receipt className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground">Selecione um pagamento para ver os detalhes</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Informações do Pagamento</h3>
        <div className="space-y-3">
          <div className="grid grid-cols-[20px_1fr] gap-2">
            <Receipt className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">
                {payment.invoiceNumber || 'Nota fiscal não informada'}
              </p>
              <p className="text-xs text-muted-foreground">
                {payment.description || 'Sem descrição'}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-[20px_1fr] gap-2">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">
                {getSupplierName(payment.supplierId)}
              </p>
              <p className="text-xs text-muted-foreground">
                CNPJ: {payment.supplierId === 'supplier1' ? '12.345.678/0001-90' : '98.765.432/0001-21'}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-[20px_1fr] gap-2">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm">
                Data do pagamento: {format(payment.date, 'dd/MM/yyyy', { locale: ptBR })}
              </p>
              <p className="text-xs text-muted-foreground">
                Registrado em: {format(payment.createdAt, 'dd/MM/yyyy', { locale: ptBR })}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Valores</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-muted/30 rounded-md">
            <p className="text-xs text-muted-foreground">Valor Bruto</p>
            <p className="text-lg font-semibold">{formatCurrency(payment.amount)}</p>
          </div>
          
          <div className="p-3 bg-muted/30 rounded-md">
            <p className="text-xs text-muted-foreground">Retenção</p>
            <p className="text-lg font-semibold">{formatCurrency(payment.taxWithheld)}</p>
          </div>
          
          <div className="p-3 bg-muted/30 rounded-md">
            <p className="text-xs text-muted-foreground">Valor Líquido</p>
            <p className="text-lg font-semibold">
              {formatCurrency(payment.amount - (payment.taxWithheld || 0))}
            </p>
          </div>
          
          <div className="p-3 bg-muted/30 rounded-md">
            <p className="text-xs text-muted-foreground">% Retido</p>
            <p className="text-lg font-semibold">
              {((payment.taxWithheld || 0) / payment.amount * 100).toFixed(2)}%
            </p>
          </div>
        </div>
      </div>
      
      {payment.taxWithheld !== payment.taxWithheldCalculated && (
        <div className="bg-amber-50 border border-amber-200 rounded-md p-3 flex gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />
          <div className="text-xs text-amber-800">
            <p className="font-medium">Divergência na Retenção</p>
            <p>Valor retido: {formatCurrency(payment.taxWithheld)}</p>
            <p>Valor calculado: {formatCurrency(payment.taxWithheldCalculated)}</p>
            <p>Diferença: {formatCurrency((payment.taxWithheldCalculated || 0) - (payment.taxWithheld || 0))}</p>
          </div>
        </div>
      )}
      
      {payment.taxWithheld === payment.taxWithheldCalculated && (
        <div className="bg-green-50 border border-green-200 rounded-md p-3 flex gap-2">
          <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
          <div className="text-xs text-green-800">
            <p className="font-medium">Retenção Correta</p>
            <p>O valor retido está de acordo com o calculado pelo sistema.</p>
          </div>
        </div>
      )}
      
      <div className="flex gap-2 pt-2">
        <Button variant="outline" className="text-sky-700 border-sky-300">
          <FileText className="mr-2 h-4 w-4" />
          Comprovante
        </Button>
        <Button variant="outline" className="text-sky-700 border-sky-300">
          <Calculator className="mr-2 h-4 w-4" />
          Recalcular
        </Button>
      </div>
    </div>
  );
};

export default PaymentDetails;
