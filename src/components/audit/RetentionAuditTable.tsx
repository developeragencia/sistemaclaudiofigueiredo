
import React, { useState } from 'react';
import { 
  Table, TableBody, TableCaption, TableCell, 
  TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Eye, AlertTriangle, CheckCircle, XCircle, 
  ArrowUpDown, Search, FileText, Calculator 
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

// Mock audit data
const auditItems = [
  {
    id: '1',
    supplier: 'Serviços Tecnologia LTDA',
    cnpj: '12.345.678/0001-90',
    invoice: 'NF-123456',
    paymentDate: '2023-10-15',
    amount: 'R$ 25.000,00',
    declaredTax: 'R$ 825,00',
    calculatedTax: 'R$ 1.125,00',
    difference: 'R$ 300,00',
    status: 'discrepancy',
    activityCode: '6201-5/01'
  },
  {
    id: '2',
    supplier: 'Consultoria Empresarial S.A.',
    cnpj: '98.765.432/0001-10',
    invoice: 'NF-789012',
    paymentDate: '2023-10-18',
    amount: 'R$ 18.500,00',
    declaredTax: 'R$ 610,50',
    calculatedTax: 'R$ 832,50',
    difference: 'R$ 222,00',
    status: 'discrepancy',
    activityCode: '7020-4/00'
  },
  {
    id: '3',
    supplier: 'Soluções em Marketing LTDA',
    cnpj: '45.678.901/0001-23',
    invoice: 'NF-345678',
    paymentDate: '2023-10-20',
    amount: 'R$ 12.800,00',
    declaredTax: 'R$ 422,40',
    calculatedTax: 'R$ 422,40',
    difference: 'R$ 0,00',
    status: 'correct',
    activityCode: '7311-4/00'
  },
  {
    id: '4',
    supplier: 'Assessoria Contábil ME',
    cnpj: '34.567.890/0001-45',
    invoice: 'NF-901234',
    paymentDate: '2023-10-22',
    amount: 'R$ 5.600,00',
    declaredTax: 'R$ 0,00',
    calculatedTax: 'R$ 252,00',
    difference: 'R$ 252,00',
    status: 'discrepancy',
    activityCode: '6920-6/01'
  },
  {
    id: '5',
    supplier: 'Transporte e Logística S.A.',
    cnpj: '56.789.012/0001-67',
    invoice: 'NF-567890',
    paymentDate: '2023-10-25',
    amount: 'R$ 8.750,00',
    declaredTax: 'R$ 288,75',
    calculatedTax: 'R$ 0,00',
    difference: '-R$ 288,75',
    status: 'exempt',
    activityCode: '4930-2/02'
  }
];

// Mock supplier detail data
const supplierDetail = {
  name: 'Serviços Tecnologia LTDA',
  cnpj: '12.345.678/0001-90',
  activityCode: '6201-5/01',
  activityDescription: 'Desenvolvimento de programas de computador sob encomenda',
  taxRegime: 'Lucro Presumido',
  address: 'Av. Paulista, 1000 - Bela Vista, São Paulo - SP, 01310-100',
  phone: '(11) 3456-7890',
  email: 'contato@servicostecnologia.com.br',
  taxRates: {
    irpj: '1.5%',
    csll: '1.0%',
    cofins: '3.0%',
    pis: '0.65%',
    iss: '3.0%',
    inss: '0.0%',
    total: '9.15%'
  },
  retentionHistory: [
    {
      invoice: 'NF-123456',
      date: '2023-10-15',
      amount: 'R$ 25.000,00',
      declaredTax: 'R$ 825,00',
      calculatedTax: 'R$ 1.125,00',
      difference: 'R$ 300,00'
    },
    {
      invoice: 'NF-122345',
      date: '2023-09-10',
      amount: 'R$ 22.000,00',
      declaredTax: 'R$ 726,00',
      calculatedTax: 'R$ 990,00',
      difference: 'R$ 264,00'
    },
    {
      invoice: 'NF-121234',
      date: '2023-08-15',
      amount: 'R$ 18.500,00',
      declaredTax: 'R$ 610,50',
      calculatedTax: 'R$ 832,50',
      difference: 'R$ 222,00'
    }
  ]
};

// Audit report mock data
const auditReportData = {
  payment: {
    id: '1',
    invoice: 'NF-123456',
    supplier: 'Serviços Tecnologia LTDA',
    cnpj: '12.345.678/0001-90',
    date: '2023-10-15',
    amount: 'R$ 25.000,00',
    description: 'Serviços de desenvolvimento de software',
    notes: ''
  },
  supplier: {
    activityCode: '6201-5/01',
    activityDescription: 'Desenvolvimento de programas de computador sob encomenda',
    taxRegime: 'Lucro Presumido',
    retentionRules: [
      { rule: 'Serviços de informática - Retenção completa aplicável' },
      { rule: 'CNPJ válido para retenção' },
      { rule: 'Valor acima do mínimo para retenção (R$ 215,05)' }
    ]
  },
  taxCalculation: [
    { tax: 'IRPJ', rate: '1.50%', base: 'R$ 25.000,00', calculated: 'R$ 375,00', declared: 'R$ 250,00', difference: 'R$ 125,00' },
    { tax: 'CSLL', rate: '1.00%', base: 'R$ 25.000,00', calculated: 'R$ 250,00', declared: 'R$ 200,00', difference: 'R$ 50,00' },
    { tax: 'COFINS', rate: '3.00%', base: 'R$ 25.000,00', calculated: 'R$ 750,00', declared: 'R$ 650,00', difference: 'R$ 100,00' },
    { tax: 'PIS', rate: '0.65%', base: 'R$ 25.000,00', calculated: 'R$ 162,50', declared: 'R$ 137,50', difference: 'R$ 25,00' },
    { tax: 'ISS', rate: '3.00%', base: 'R$ 25.000,00', calculated: 'R$ 750,00', declared: 'R$ 750,00', difference: 'R$ 0,00' }
  ],
  summary: {
    totalCalculated: 'R$ 2.287,50',
    totalDeclared: 'R$ 1.987,50',
    totalDifference: 'R$ 300,00',
    status: 'discrepancy',
    observations: 'Diferença significativa identificada nas retenções de IRPJ, CSLL, COFINS e PIS.'
  },
  auditTrail: [
    { date: '2023-10-26 09:45:12', user: 'Sistema', action: 'Auditoria automática iniciada' },
    { date: '2023-10-26 09:45:15', user: 'Sistema', action: 'CNAE do fornecedor identificado: 6201-5/01' },
    { date: '2023-10-26 09:45:18', user: 'Sistema', action: 'Aplicadas regras de retenção para serviços de informática' },
    { date: '2023-10-26 09:45:22', user: 'Sistema', action: 'Diferença de R$ 300,00 identificada' },
    { date: '2023-10-26 10:30:45', user: 'Maria Silva', action: 'Auditoria revisada e aprovada' }
  ]
};

const RetentionAuditTable = () => {
  const [detailOpen, setDetailOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Format currency
  const formatCurrency = (value: string) => {
    return value;
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'discrepancy':
        return (
          <Badge className="bg-amber-500 hover:bg-amber-600">
            <AlertTriangle className="h-3 w-3 mr-1" /> Discrepância
          </Badge>
        );
      case 'correct':
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle className="h-3 w-3 mr-1" /> Correto
          </Badge>
        );
      case 'exempt':
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            <CheckCircle className="h-3 w-3 mr-1" /> Isento
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            Desconhecido
          </Badge>
        );
    }
  };

  const openDetail = (item: any) => {
    setSelectedItem(supplierDetail);
    setDetailOpen(true);
  };

  const openReport = (item: any) => {
    setSelectedItem(auditReportData);
    setReportOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold">Auditoria de Retenções</h2>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-muted-foreground" />
            <Input 
              placeholder="Pesquisar por fornecedor ou NF..." 
              className="pl-8 w-full sm:w-[250px]" 
            />
          </div>
          
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4" />
            Filtros
          </Button>
        </div>
      </div>

      <Table>
        <TableCaption>Lista de auditoria de retenções tributárias</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[220px]">Fornecedor</TableHead>
            <TableHead>Nota Fiscal</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Declarado</TableHead>
            <TableHead>Calculado</TableHead>
            <TableHead>Diferença</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {auditItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">
                <div>
                  <div>{item.supplier}</div>
                  <div className="text-xs text-muted-foreground">{item.cnpj}</div>
                </div>
              </TableCell>
              <TableCell>{item.invoice}</TableCell>
              <TableCell>{item.paymentDate}</TableCell>
              <TableCell>{formatCurrency(item.amount)}</TableCell>
              <TableCell>{formatCurrency(item.declaredTax)}</TableCell>
              <TableCell>{formatCurrency(item.calculatedTax)}</TableCell>
              <TableCell className={
                item.difference.includes('-') ? 'text-red-600' :
                item.difference === 'R$ 0,00' ? '' : 'text-amber-600'
              }>
                {formatCurrency(item.difference)}
              </TableCell>
              <TableCell>
                {getStatusBadge(item.status)}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button 
                    size="icon" 
                    variant="ghost"
                    onClick={() => openReport(item)}
                    title="Ver relatório de auditoria"
                  >
                    <FileText className="h-4 w-4" />
                  </Button>
                  
                  <Button 
                    size="icon" 
                    variant="ghost"
                    onClick={() => openDetail(item)}
                    title="Ver detalhes do fornecedor"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  
                  <Button 
                    size="icon" 
                    variant="ghost"
                    onClick={() => toast.success("Recálculo iniciado")}
                    title="Recalcular retenção"
                  >
                    <Calculator className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {/* Supplier Detail Modal */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Fornecedor</DialogTitle>
            <DialogDescription>
              Informações completas sobre o fornecedor e seu histórico de retenções.
            </DialogDescription>
          </DialogHeader>
          
          {selectedItem && (
            <div className="space-y-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Razão Social</p>
                  <p className="font-semibold">{selectedItem.name}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">CNPJ</p>
                  <p>{selectedItem.cnpj}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">CNAE Principal</p>
                  <p>{selectedItem.activityCode} - {selectedItem.activityDescription}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Regime Tributário</p>
                  <p>{selectedItem.taxRegime}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Endereço</p>
                  <p className="text-sm">{selectedItem.address}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Contato</p>
                  <p className="text-sm">{selectedItem.phone}<br />{selectedItem.email}</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-medium text-lg mb-3">Taxas de Retenção Aplicáveis</h3>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 text-center">
                  <div className="space-y-1">
                    <span className="text-xs font-medium text-muted-foreground">IRPJ</span>
                    <p className="font-semibold">{selectedItem.taxRates.irpj}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-medium text-muted-foreground">CSLL</span>
                    <p className="font-semibold">{selectedItem.taxRates.csll}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-medium text-muted-foreground">COFINS</span>
                    <p className="font-semibold">{selectedItem.taxRates.cofins}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-medium text-muted-foreground">PIS</span>
                    <p className="font-semibold">{selectedItem.taxRates.pis}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-medium text-muted-foreground">ISS</span>
                    <p className="font-semibold">{selectedItem.taxRates.iss}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-medium text-muted-foreground">Total</span>
                    <p className="font-semibold">{selectedItem.taxRates.total}</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-medium text-lg mb-3">Histórico de Retenções</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nota Fiscal</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Declarado</TableHead>
                      <TableHead>Calculado</TableHead>
                      <TableHead>Diferença</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedItem.retentionHistory.map((item: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{item.invoice}</TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{item.amount}</TableCell>
                        <TableCell>{item.declaredTax}</TableCell>
                        <TableCell>{item.calculatedTax}</TableCell>
                        <TableCell className="text-amber-600">{item.difference}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Audit Report Modal */}
      <Dialog open={reportOpen} onOpenChange={setReportOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Relatório de Auditoria de Retenção</DialogTitle>
            <DialogDescription>
              Detalhamento do cálculo e auditoria das retenções tributárias.
            </DialogDescription>
          </DialogHeader>
          
          {selectedItem && (
            <ScrollArea className="h-[calc(90vh-120px)] pr-4">
              <div className="space-y-6 pt-4">
                <Tabs defaultValue="summary">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="summary">Resumo</TabsTrigger>
                    <TabsTrigger value="calculation">Cálculo Detalhado</TabsTrigger>
                    <TabsTrigger value="audit">Trilha de Auditoria</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="summary" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Payment Info */}
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium text-base mb-3">Informações do Pagamento</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Fornecedor:</span>
                            <span className="font-medium">{selectedItem.payment.supplier}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">CNPJ:</span>
                            <span>{selectedItem.payment.cnpj}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Nota Fiscal:</span>
                            <span>{selectedItem.payment.invoice}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Data:</span>
                            <span>{selectedItem.payment.date}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Valor:</span>
                            <span className="font-medium">{selectedItem.payment.amount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Descrição:</span>
                            <span className="text-right max-w-[60%]">{selectedItem.payment.description}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Supplier Info */}
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium text-base mb-3">Informações do Fornecedor</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">CNAE:</span>
                            <span className="font-medium">{selectedItem.supplier.activityCode}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Atividade:</span>
                            <span className="text-right max-w-[60%]">{selectedItem.supplier.activityDescription}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Regime Tributário:</span>
                            <span>{selectedItem.supplier.taxRegime}</span>
                          </div>
                          <div className="mt-2">
                            <span className="text-sm text-muted-foreground">Regras de Retenção Aplicáveis:</span>
                            <ul className="mt-1 text-sm list-disc list-inside">
                              {selectedItem.supplier.retentionRules.map((rule: any, index: number) => (
                                <li key={index}>{rule.rule}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Summary */}
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium text-base mb-3">Resumo da Auditoria</h3>
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="flex flex-col p-3 bg-muted/50 rounded-lg">
                          <span className="text-sm text-muted-foreground">Total Calculado</span>
                          <span className="text-xl font-semibold">{selectedItem.summary.totalCalculated}</span>
                        </div>
                        <div className="flex flex-col p-3 bg-muted/50 rounded-lg">
                          <span className="text-sm text-muted-foreground">Total Declarado</span>
                          <span className="text-xl font-semibold">{selectedItem.summary.totalDeclared}</span>
                        </div>
                        <div className="flex flex-col p-3 bg-amber-50 rounded-lg">
                          <span className="text-sm text-muted-foreground">Diferença</span>
                          <span className="text-xl font-semibold text-amber-600">{selectedItem.summary.totalDifference}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Status da Auditoria:</span>
                          {getStatusBadge(selectedItem.summary.status)}
                        </div>
                        
                        <div>
                          <span className="text-sm font-medium">Observações:</span>
                          <p className="text-sm mt-1">{selectedItem.summary.observations}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button 
                        onClick={() => setReportOpen(false)} 
                        variant="outline"
                      >
                        Fechar
                      </Button>
                      <Button 
                        onClick={() => toast.success("Ações corretivas iniciadas")}
                      >
                        Iniciar Ação Corretiva
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="calculation" className="space-y-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Imposto</TableHead>
                          <TableHead>Alíquota</TableHead>
                          <TableHead>Base de Cálculo</TableHead>
                          <TableHead>Valor Calculado</TableHead>
                          <TableHead>Valor Declarado</TableHead>
                          <TableHead>Diferença</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedItem.taxCalculation.map((tax: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{tax.tax}</TableCell>
                            <TableCell>{tax.rate}</TableCell>
                            <TableCell>{tax.base}</TableCell>
                            <TableCell>{tax.calculated}</TableCell>
                            <TableCell>{tax.declared}</TableCell>
                            <TableCell className={tax.difference !== 'R$ 0,00' ? 'text-amber-600' : ''}>
                              {tax.difference}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    
                    <div className="flex justify-end gap-2">
                      <Button 
                        onClick={() => setReportOpen(false)} 
                        variant="outline"
                      >
                        Fechar
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="audit" className="space-y-6">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium text-base mb-3">Trilha de Auditoria</h3>
                      <div className="space-y-3">
                        {selectedItem.auditTrail.map((entry: any, index: number) => (
                          <div key={index} className="flex items-start py-2 border-b last:border-0">
                            <div className="w-36 flex-shrink-0">
                              <p className="text-sm font-medium">{entry.date}</p>
                              <p className="text-xs text-muted-foreground">{entry.user}</p>
                            </div>
                            <div>
                              <p className="text-sm">{entry.action}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button 
                        onClick={() => setReportOpen(false)} 
                        variant="outline"
                      >
                        Fechar
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RetentionAuditTable;
