
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Plus, Receipt, FileBarChart } from 'lucide-react';
import { DateRangePicker, DateRange } from '@/components/ui/date-range-picker';
import { addDays, format, subMonths } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PaymentsList from '@/components/payments/PaymentsList';
import PaymentDetails from '@/components/payments/PaymentDetails';
import PaymentSummary from '@/components/payments/PaymentSummary';
import { Payment } from '@/types';

export default function PaymentsManagement() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [dateRange, setDateRange] = useState<DateRange>({
    from: subMonths(new Date(), 3),
    to: new Date(),
  });
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [filterSupplier, setFilterSupplier] = useState<string>('all');
  
  const mockPayments: Payment[] = [
    {
      id: '1',
      clientId: 'client1',
      supplierId: 'supplier1',
      invoiceNumber: 'NF-001234',
      amount: 5000,
      date: new Date('2023-09-15'),
      description: 'Serviços de consultoria em TI',
      taxWithheld: 425.00,
      taxWithheldCalculated: 425.00,
      hasAudit: true,
      createdAt: new Date('2023-09-16'),
      updatedAt: new Date('2023-09-16'),
    },
    {
      id: '2',
      clientId: 'client1',
      supplierId: 'supplier2',
      invoiceNumber: 'NF-005678',
      amount: 12500,
      date: new Date('2023-10-05'),
      description: 'Desenvolvimento de software',
      taxWithheld: 1062.50,
      taxWithheldCalculated: 1150.00,
      hasAudit: true,
      createdAt: new Date('2023-10-06'),
      updatedAt: new Date('2023-10-06'),
    },
    {
      id: '3',
      clientId: 'client1',
      supplierId: 'supplier1',
      invoiceNumber: 'NF-007890',
      amount: 3200,
      date: new Date('2023-11-20'),
      description: 'Suporte técnico mensal',
      taxWithheld: 272.00,
      taxWithheldCalculated: 272.00,
      hasAudit: false,
      createdAt: new Date('2023-11-21'),
      updatedAt: new Date('2023-11-21'),
    },
  ];
  
  const filteredPayments = mockPayments.filter(payment => {
    const matchesSearch = payment.invoiceNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        payment.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDateRange = payment.date >= (dateRange.from || new Date(0)) && 
                             payment.date <= (dateRange.to || new Date());
    
    const matchesSupplier = filterSupplier === 'all' || payment.supplierId === filterSupplier;
    
    return matchesSearch && matchesDateRange && matchesSupplier;
  });
  
  const totalAmount = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const totalTaxWithheld = filteredPayments.reduce((sum, payment) => sum + (payment.taxWithheld || 0), 0);
  
  const handlePaymentClick = (payment: Payment) => {
    setSelectedPayment(payment);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-sky-800">Gestão de Pagamentos</h1>
          <p className="text-muted-foreground">
            Registre pagamentos, audite retenções e gere relatórios
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="text-sky-700 border-sky-300">
            <FileBarChart className="mr-2 h-4 w-4" /> Relatório
          </Button>
          <Button className="bg-sky-700 hover:bg-sky-800">
            <Plus className="mr-2 h-4 w-4" /> Novo Pagamento
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="col-span-1 md:col-span-3 border-none shadow-lg">
          <CardHeader className="bg-sky-50/50 pb-4">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex items-center gap-2">
                <Receipt className="h-5 w-5 text-sky-600" />
                <CardTitle className="text-lg text-sky-800">Pagamentos Registrados</CardTitle>
              </div>
              
              <div className="flex flex-wrap gap-2 items-center">
                <div className="relative w-full max-w-xs">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar pagamento..."
                    className="pl-8 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <DateRangePicker 
                  date={dateRange}
                  setDate={setDateRange}
                />
                
                <Select value={filterSupplier} onValueChange={setFilterSupplier}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Fornecedor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os fornecedores</SelectItem>
                    <SelectItem value="supplier1">ABC Tecnologia</SelectItem>
                    <SelectItem value="supplier2">XYZ Consulting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <PaymentsList 
              payments={filteredPayments} 
              onPaymentClick={handlePaymentClick} 
              selectedPaymentId={selectedPayment?.id} 
            />
          </CardContent>
        </Card>
        
        <Card className="col-span-1 md:col-span-2 border-none shadow-lg">
          <Tabs defaultValue="details">
            <CardHeader className="bg-sky-50/50 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-sky-800">
                  {selectedPayment ? 'Detalhes do Pagamento' : 'Detalhes'}
                </CardTitle>
                <TabsList className="bg-sky-100">
                  <TabsTrigger value="details">Detalhes</TabsTrigger>
                  <TabsTrigger value="tax">Tributação</TabsTrigger>
                  <TabsTrigger value="audit">Auditoria</TabsTrigger>
                </TabsList>
              </div>
              <CardDescription>
                {selectedPayment 
                  ? `NF ${selectedPayment.invoiceNumber} - ${format(selectedPayment.date, 'dd/MM/yyyy')}`
                  : 'Selecione um pagamento para ver detalhes'}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <TabsContent value="details" className="mt-0">
                <PaymentDetails payment={selectedPayment} />
              </TabsContent>
              <TabsContent value="tax" className="mt-0">
                <h3 className="font-medium mb-2">Detalhes de Tributação</h3>
                {selectedPayment ? (
                  <div className="space-y-4">
                    <p className="text-sm">Informações detalhadas sobre a tributação para este pagamento.</p>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    Selecione um pagamento para ver os detalhes de tributação.
                  </p>
                )}
              </TabsContent>
              <TabsContent value="audit" className="mt-0">
                <h3 className="font-medium mb-2">Auditoria de Retenções</h3>
                {selectedPayment ? (
                  <div className="space-y-4">
                    <p className="text-sm">Resultado da auditoria de retenção para este pagamento.</p>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    Selecione um pagamento para ver os detalhes da auditoria.
                  </p>
                )}
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
        
        <Card className="col-span-1 border-none shadow-lg">
          <CardHeader className="bg-sky-50/50">
            <CardTitle className="text-lg text-sky-800">Resumo</CardTitle>
            <CardDescription>
              {filteredPayments.length} pagamentos no período selecionado
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <PaymentSummary 
              totalAmount={totalAmount}
              totalTaxWithheld={totalTaxWithheld}
              paymentsCount={filteredPayments.length}
              dateRange={dateRange}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
