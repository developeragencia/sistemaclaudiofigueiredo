
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { 
  getSupplierByCNPJ, 
  addPayment, 
  getPaymentsByClientId, 
  auditPayment,
  getAuditReportsByClientId,
  getAllSuppliers
} from '../services/mockDatabaseService';
import { Payment, Supplier, AuditReport } from '../types';
import { Search, ChevronRight, AlertTriangle, CheckCircle, FileSpreadsheet } from 'lucide-react';

const AuditTax = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('import');
  const [cnpjInput, setCnpjInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [supplierDetails, setSupplierDetails] = useState<Supplier | null>(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [paymentDescription, setPaymentDescription] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [taxWithheld, setTaxWithheld] = useState('');
  const [payments, setPayments] = useState<Payment[]>([]);
  const [auditReports, setAuditReports] = useState<AuditReport[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  
  // Mock client ID - in a real app, this would come from auth context
  const mockClientId = "client-123";
  
  // Format CNPJ for display
  const formatCNPJ = (cnpj: string) => {
    const cleaned = cnpj.replace(/[^\d]/g, '');
    return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  };
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };
  
  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };
  
  // Handle CNPJ lookup
  const handleLookupCNPJ = async () => {
    if (!cnpjInput) {
      toast({
        title: "CNPJ não informado",
        description: "Por favor, informe um CNPJ válido",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const supplier = await getSupplierByCNPJ(cnpjInput);
      setSupplierDetails(supplier);
      
      if (!supplier) {
        toast({
          title: "Fornecedor não encontrado",
          description: "Não foi possível encontrar informações para este CNPJ",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro ao buscar CNPJ:", error);
      toast({
        title: "Erro ao buscar CNPJ",
        description: "Ocorreu um erro ao buscar informações do CNPJ",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle payment record
  const handleAddPayment = () => {
    if (!supplierDetails) {
      toast({
        title: "Fornecedor não selecionado",
        description: "Por favor, busque um fornecedor pelo CNPJ",
        variant: "destructive",
      });
      return;
    }
    
    const amount = parseFloat(paymentAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Valor inválido",
        description: "Por favor, informe um valor válido",
        variant: "destructive",
      });
      return;
    }
    
    const parsedTaxWithheld = parseFloat(taxWithheld || '0');
    
    const newPayment = addPayment({
      clientId: mockClientId,
      supplierId: supplierDetails.id,
      amount,
      date: paymentDate ? new Date(paymentDate) : new Date(),
      description: paymentDescription,
      invoiceNumber: invoiceNumber,
      taxWithheld: isNaN(parsedTaxWithheld) ? 0 : parsedTaxWithheld
    });
    
    toast({
      title: "Pagamento registrado",
      description: "O pagamento foi registrado com sucesso",
    });
    
    // Reset form
    setPaymentAmount('');
    setPaymentDate('');
    setPaymentDescription('');
    setInvoiceNumber('');
    setTaxWithheld('');
    
    // Update payments list
    loadPayments();
  };
  
  // Load payments
  const loadPayments = () => {
    const clientPayments = getPaymentsByClientId(mockClientId);
    setPayments(clientPayments);
    
    const clientAuditReports = getAuditReportsByClientId(mockClientId);
    setAuditReports(clientAuditReports);
    
    const allSuppliers = getAllSuppliers();
    setSuppliers(allSuppliers);
  };
  
  // Handle audit payment
  const handleAuditPayment = async (paymentId: string) => {
    try {
      const auditResult = await auditPayment(paymentId);
      
      if (auditResult) {
        toast({
          title: "Auditoria concluída",
          description: auditResult.status === 'correct' 
            ? "O valor retido está correto!" 
            : "Foi detectada uma discrepância na retenção",
        });
        
        // Refresh data
        loadPayments();
      }
    } catch (error) {
      console.error("Erro ao auditar pagamento:", error);
      toast({
        title: "Erro na auditoria",
        description: "Não foi possível auditar este pagamento",
        variant: "destructive",
      });
    }
  };
  
  // Load data when tab changes
  React.useEffect(() => {
    if (activeTab === 'payments' || activeTab === 'audit') {
      loadPayments();
    }
  }, [activeTab]);

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-7xl">
      <div className="flex flex-col space-y-4 mb-6">
        <div className="bg-gradient-to-r from-sky-100 to-sky-50 p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-sky-900 flex items-center">
            <FileSpreadsheet className="mr-3 h-8 w-8 text-sky-600" />
            Auditoria Fiscal e Tributária
          </h1>
          <p className="text-sky-700 mt-2">
            Gerencie suas auditorias tributárias e identifique oportunidades de recuperação fiscal.
          </p>
        </div>
      </div>
      
      <Tabs defaultValue="import" onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full mb-6 bg-sky-50 p-1 rounded-lg">
          <TabsTrigger value="import" className="data-[state=active]:bg-sky-600 data-[state=active]:text-white">
            Importar Dados
          </TabsTrigger>
          <TabsTrigger value="payments" className="data-[state=active]:bg-sky-600 data-[state=active]:text-white">
            Pagamentos
          </TabsTrigger>
          <TabsTrigger value="audit" className="data-[state=active]:bg-sky-600 data-[state=active]:text-white">
            Resultados da Auditoria
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="import">
          <Card className="border-sky-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-sky-50 to-white border-b border-sky-100">
              <CardTitle className="text-sky-900">Importar Dados de Fornecedores</CardTitle>
              <CardDescription className="text-sky-700">
                Busque informações de fornecedores pelo CNPJ e registre pagamentos para análise posterior.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-3">
                  <Label htmlFor="cnpj" className="text-sky-800">CNPJ do Fornecedor</Label>
                  <div className="relative mt-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      id="cnpj"
                      placeholder="00.000.000/0000-00"
                      value={cnpjInput}
                      onChange={(e) => setCnpjInput(e.target.value)}
                      className="pl-10 border-sky-200 focus:border-sky-400 focus:ring-sky-300"
                    />
                  </div>
                </div>
                <div className="flex items-end">
                  <Button 
                    onClick={handleLookupCNPJ} 
                    disabled={isLoading}
                    className="w-full bg-sky-600 hover:bg-sky-700 text-white"
                  >
                    {isLoading ? "Buscando..." : "Buscar CNPJ"}
                  </Button>
                </div>
              </div>
              
              {supplierDetails && (
                <div className="mt-6 animate-fade-in">
                  <h3 className="text-lg font-medium text-sky-900 mb-2 flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                    Dados do Fornecedor
                  </h3>
                  <div className="bg-gradient-to-r from-blue-50 to-sky-50 p-4 rounded-md shadow-inner border border-sky-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 bg-white bg-opacity-70 rounded-md shadow-sm">
                        <p className="text-sm font-medium text-sky-900">Nome:</p>
                        <p className="text-base">{supplierDetails.name}</p>
                      </div>
                      <div className="p-3 bg-white bg-opacity-70 rounded-md shadow-sm">
                        <p className="text-sm font-medium text-sky-900">CNPJ:</p>
                        <p className="text-base">{formatCNPJ(supplierDetails.cnpj)}</p>
                      </div>
                      <div className="p-3 bg-white bg-opacity-70 rounded-md shadow-sm">
                        <p className="text-sm font-medium text-sky-900">Nome Fantasia:</p>
                        <p className="text-base">{supplierDetails.tradeName || 'Não informado'}</p>
                      </div>
                      <div className="p-3 bg-white bg-opacity-70 rounded-md shadow-sm">
                        <p className="text-sm font-medium text-sky-900">Atividade Principal:</p>
                        <p className="text-base">{supplierDetails.activityDescription || 'Não informado'}</p>
                      </div>
                      <div className="p-3 bg-white bg-opacity-70 rounded-md shadow-sm">
                        <p className="text-sm font-medium text-sky-900">Código da Atividade:</p>
                        <p className="text-base">{supplierDetails.activityCode || 'Não informado'}</p>
                      </div>
                      <div className="p-3 bg-white bg-opacity-70 rounded-md shadow-sm">
                        <p className="text-sm font-medium text-sky-900">Regime Tributário:</p>
                        <p className="text-base">{supplierDetails.taxRegime || 'Não informado'}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="my-6 bg-sky-100" />
                  
                  <h3 className="text-lg font-medium text-sky-900 mb-4 flex items-center">
                    <FileSpreadsheet className="mr-2 h-5 w-5 text-sky-600" />
                    Registrar Pagamento
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4 p-4 bg-gradient-to-r from-white to-sky-50 rounded-lg border border-sky-100">
                      <div>
                        <Label htmlFor="invoiceNumber" className="text-sky-800">Número da Nota Fiscal</Label>
                        <Input
                          id="invoiceNumber"
                          placeholder="NF-123456"
                          value={invoiceNumber}
                          onChange={(e) => setInvoiceNumber(e.target.value)}
                          className="border-sky-200 focus:border-sky-400 focus:ring-sky-300 mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="paymentAmount" className="text-sky-800">Valor do Pagamento (R$)</Label>
                        <Input
                          id="paymentAmount"
                          type="number"
                          placeholder="0,00"
                          value={paymentAmount}
                          onChange={(e) => setPaymentAmount(e.target.value)}
                          className="border-sky-200 focus:border-sky-400 focus:ring-sky-300 mt-1"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4 p-4 bg-gradient-to-r from-sky-50 to-white rounded-lg border border-sky-100">
                      <div>
                        <Label htmlFor="paymentDate" className="text-sky-800">Data do Pagamento</Label>
                        <Input
                          id="paymentDate"
                          type="date"
                          value={paymentDate}
                          onChange={(e) => setPaymentDate(e.target.value)}
                          className="border-sky-200 focus:border-sky-400 focus:ring-sky-300 mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="taxWithheld" className="text-sky-800">Valor Retido (R$)</Label>
                        <Input
                          id="taxWithheld"
                          type="number"
                          placeholder="0,00"
                          value={taxWithheld}
                          onChange={(e) => setTaxWithheld(e.target.value)}
                          className="border-sky-200 focus:border-sky-400 focus:ring-sky-300 mt-1"
                        />
                      </div>
                    </div>
                    
                    <div className="md:col-span-2">
                      <Label htmlFor="paymentDescription" className="text-sky-800">Descrição</Label>
                      <Input
                        id="paymentDescription"
                        placeholder="Descrição do pagamento"
                        value={paymentDescription}
                        onChange={(e) => setPaymentDescription(e.target.value)}
                        className="border-sky-200 focus:border-sky-400 focus:ring-sky-300 mt-1"
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            
            {supplierDetails && (
              <CardFooter className="bg-gradient-to-r from-white to-sky-50 border-t border-sky-100 flex justify-end">
                <Button 
                  onClick={handleAddPayment}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Registrar Pagamento
                </Button>
              </CardFooter>
            )}
          </Card>
        </TabsContent>
        
        <TabsContent value="payments">
          <Card className="border-sky-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-sky-50 to-white border-b border-sky-100">
              <CardTitle className="text-sky-900">Pagamentos Registrados</CardTitle>
              <CardDescription className="text-sky-700">
                Visualize todos os pagamentos registrados e selecione pagamentos para auditoria.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {payments.length > 0 ? (
                <div className="rounded-lg overflow-hidden border border-sky-100">
                  <Table>
                    <TableHeader className="bg-sky-100">
                      <TableRow>
                        <TableHead className="text-sky-900">Fornecedor</TableHead>
                        <TableHead className="text-sky-900">Nota Fiscal</TableHead>
                        <TableHead className="text-sky-900">Data</TableHead>
                        <TableHead className="text-sky-900">Valor</TableHead>
                        <TableHead className="text-sky-900">Valor Retido</TableHead>
                        <TableHead className="text-sky-900">Status</TableHead>
                        <TableHead className="text-sky-900">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments.map((payment, index) => {
                        const supplier = suppliers.find(s => s.id === payment.supplierId);
                        const isEven = index % 2 === 0;
                        
                        return (
                          <TableRow key={payment.id} className={isEven ? "bg-white" : "bg-sky-50"}>
                            <TableCell className="font-medium">{supplier?.name || 'Desconhecido'}</TableCell>
                            <TableCell>{payment.invoiceNumber || 'N/A'}</TableCell>
                            <TableCell>{formatDate(payment.date)}</TableCell>
                            <TableCell>{formatCurrency(payment.amount)}</TableCell>
                            <TableCell>{formatCurrency(payment.taxWithheld || 0)}</TableCell>
                            <TableCell>
                              {payment.hasAudit ? (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  <CheckCircle className="mr-1 h-3 w-3" /> Auditado
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                  <AlertTriangle className="mr-1 h-3 w-3" /> Pendente
                                </span>
                              )}
                            </TableCell>
                            <TableCell>
                              <Button 
                                variant={payment.hasAudit ? "outline" : "default"} 
                                size="sm"
                                onClick={() => handleAuditPayment(payment.id)}
                                disabled={payment.hasAudit}
                                className={payment.hasAudit ? 
                                  "border-green-200 text-green-700" : 
                                  "bg-sky-600 hover:bg-sky-700 text-white"
                                }
                              >
                                {payment.hasAudit ? 'Auditado' : 'Auditar'}
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-16 bg-sky-50/50 rounded-lg border border-dashed border-sky-200">
                  <FileSpreadsheet className="mx-auto h-12 w-12 text-sky-300" />
                  <p className="mt-4 text-sky-800 font-medium">Nenhum pagamento registrado.</p>
                  <p className="text-sky-600">Registre pagamentos na aba "Importar Dados".</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="audit">
          <Card className="border-sky-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-sky-50 to-white border-b border-sky-100">
              <CardTitle className="text-sky-900">Resultados da Auditoria</CardTitle>
              <CardDescription className="text-sky-700">
                Visualize os resultados da auditoria fiscal e tributária.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {auditReports.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card className="border-green-100 bg-gradient-to-br from-white to-green-50">
                      <CardHeader className="pb-2 border-b border-green-100">
                        <CardTitle className="text-sm font-medium text-green-800">Total Auditado</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <p className="text-2xl font-bold text-green-700">
                          {auditReports.length}
                        </p>
                        <p className="text-xs text-green-600 mt-1">Pagamentos analisados</p>
                      </CardContent>
                    </Card>
                    <Card className="border-green-100 bg-gradient-to-br from-white to-green-50">
                      <CardHeader className="pb-2 border-b border-green-100">
                        <CardTitle className="text-sm font-medium text-green-800">Pagamentos Corretos</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <p className="text-2xl font-bold text-green-700">
                          {auditReports.filter(ar => ar.status === 'correct').length}
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                          <div 
                            className="bg-green-600 h-1.5 rounded-full" 
                            style={{width: `${(auditReports.filter(ar => ar.status === 'correct').length / auditReports.length) * 100}%`}}
                          ></div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-amber-100 bg-gradient-to-br from-white to-amber-50">
                      <CardHeader className="pb-2 border-b border-amber-100">
                        <CardTitle className="text-sm font-medium text-amber-800">Com Discrepâncias</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <p className="text-2xl font-bold text-amber-600">
                          {auditReports.filter(ar => ar.status === 'discrepancy').length}
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                          <div 
                            className="bg-amber-500 h-1.5 rounded-full" 
                            style={{width: `${(auditReports.filter(ar => ar.status === 'discrepancy').length / auditReports.length) * 100}%`}}
                          ></div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="rounded-lg overflow-hidden border border-sky-100">
                    <Table>
                      <TableHeader className="bg-sky-100">
                        <TableRow>
                          <TableHead className="text-sky-900">Fornecedor</TableHead>
                          <TableHead className="text-sky-900">Valor Original</TableHead>
                          <TableHead className="text-sky-900">Retenção Aplicada</TableHead>
                          <TableHead className="text-sky-900">Retenção Calculada</TableHead>
                          <TableHead className="text-sky-900">Diferença</TableHead>
                          <TableHead className="text-sky-900">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {auditReports.map((report, index) => {
                          const supplier = suppliers.find(s => s.id === report.supplierId);
                          const isEven = index % 2 === 0;
                          
                          return (
                            <TableRow key={report.id} className={isEven ? "bg-white" : "bg-sky-50"}>
                              <TableCell className="font-medium">{supplier?.name || 'Desconhecido'}</TableCell>
                              <TableCell>{formatCurrency(report.originalAmount)}</TableCell>
                              <TableCell>{formatCurrency(report.actualTaxAmount)}</TableCell>
                              <TableCell>{formatCurrency(report.calculatedTaxAmount)}</TableCell>
                              <TableCell className={
                                report.difference > 0 
                                  ? 'text-red-600 font-medium' 
                                  : report.difference < 0 
                                    ? 'text-amber-600 font-medium' 
                                    : 'text-green-600 font-medium'
                              }>
                                {formatCurrency(Math.abs(report.difference))}
                                {report.difference > 0 
                                  ? ' (a menos)' 
                                  : report.difference < 0 
                                    ? ' (a mais)' 
                                    : ''}
                              </TableCell>
                              <TableCell>
                                {report.status === 'correct' ? (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    <CheckCircle className="mr-1 h-3 w-3" /> Correto
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                    <AlertTriangle className="mr-1 h-3 w-3" /> Discrepância
                                  </span>
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </>
              ) : (
                <div className="text-center py-16 bg-sky-50/50 rounded-lg border border-dashed border-sky-200">
                  <AlertTriangle className="mx-auto h-12 w-12 text-sky-300" />
                  <p className="mt-4 text-sky-800 font-medium">Nenhuma auditoria realizada.</p>
                  <p className="text-sky-600">Audite pagamentos na aba "Pagamentos".</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuditTax;
