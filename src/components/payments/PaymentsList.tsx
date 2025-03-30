
import React from 'react';
import { Payment } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface PaymentsListProps {
  payments: Payment[];
  onPaymentClick: (payment: Payment) => void;
  selectedPaymentId: string | undefined;
}

const PaymentsList: React.FC<PaymentsListProps> = ({ 
  payments,
  onPaymentClick,
  selectedPaymentId
}) => {
  // Format currency for display
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <div>
      {payments.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Nenhum pagamento encontrado para os filtros selecionados.</p>
        </div>
      ) : (
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Nota Fiscal</TableHead>
              <TableHead>Fornecedor</TableHead>
              <TableHead className="text-right">Valor</TableHead>
              <TableHead className="text-right">Retenção</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow 
                key={payment.id}
                className={`cursor-pointer hover:bg-muted/50 ${selectedPaymentId === payment.id ? 'bg-sky-50' : ''}`}
                onClick={() => onPaymentClick(payment)}
              >
                <TableCell>
                  {format(payment.date, 'dd/MM/yyyy', { locale: ptBR })}
                </TableCell>
                <TableCell className="font-medium">
                  {payment.invoiceNumber || 'N/A'}
                </TableCell>
                <TableCell>
                  {payment.supplierId === 'supplier1' ? 'ABC Tecnologia' : 
                   payment.supplierId === 'supplier2' ? 'XYZ Consulting' : 
                   'Fornecedor não identificado'}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(payment.amount)}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(payment.taxWithheld || 0)}
                </TableCell>
                <TableCell className="text-center">
                  {payment.taxWithheld !== payment.taxWithheldCalculated ? (
                    <div className="flex justify-center">
                      <Badge variant="outline" className="bg-amber-100 text-amber-800 flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        <span>Divergência</span>
                      </Badge>
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <Badge variant="outline" className="bg-green-100 text-green-800 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Correto</span>
                      </Badge>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default PaymentsList;
