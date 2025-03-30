import React, { useState } from 'react';
import { 
  Table, TableBody, TableCaption, TableCell, 
  TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FileSpreadsheet, FileJson, FileText, CheckCircle, 
  XCircle, AlertTriangle, ArrowDownToLine, Eye, Calendar 
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock import history data
const historyItems = [
  {
    id: '1',
    fileName: 'pagamentos-jan-2023.csv',
    fileType: 'csv',
    status: 'success',
    totalRecords: 1245,
    processedRecords: 1245,
    importedRecords: 1242,
    errorRecords: 3,
    processingTime: '00:15:22',
    importedAt: '2023-11-04T10:30:00',
    importedBy: 'Maria Silva'
  },
  {
    id: '2',
    fileName: 'fornecedores-jan2023.xlsx',
    fileType: 'xlsx',
    status: 'success',
    totalRecords: 568,
    processedRecords: 568,
    importedRecords: 568,
    errorRecords: 0,
    processingTime: '00:08:43',
    importedAt: '2023-11-03T14:22:00',
    importedBy: 'João Santos'
  },
  {
    id: '3',
    fileName: 'notas-fiscais-janeiro.pdf',
    fileType: 'pdf',
    status: 'partial',
    totalRecords: 89,
    processedRecords: 89,
    importedRecords: 74,
    errorRecords: 15,
    processingTime: '00:20:11',
    importedAt: '2023-11-02T09:45:00',
    importedBy: 'Carlos Eduardo'
  },
  {
    id: '4',
    fileName: 'dados-api-janeiro.json',
    fileType: 'json',
    status: 'failed',
    totalRecords: 423,
    processedRecords: 213,
    importedRecords: 0,
    errorRecords: 213,
    processingTime: '00:05:33',
    importedAt: '2023-11-01T16:10:00',
    importedBy: 'Ana Paula'
  },
  {
    id: '5',
    fileName: 'retenções-dezembro.csv',
    fileType: 'csv',
    status: 'success',
    totalRecords: 890,
    processedRecords: 890,
    importedRecords: 888,
    errorRecords: 2,
    processingTime: '00:12:15',
    importedAt: '2023-10-31T11:20:00',
    importedBy: 'Lucas Mendes'
  }
];

// Detail mock data
const detailMockData = {
  fileName: 'pagamentos-jan-2023.csv',
  fileType: 'csv',
  status: 'success',
  totalRecords: 1245,
  processedRecords: 1245,
  importedRecords: 1242,
  errorRecords: 3,
  processingTime: '00:15:22',
  importedAt: '2023-11-04T10:30:00',
  importedBy: 'Maria Silva',
  fileSize: '2.8 MB',
  checksum: '8f7d88e4c6934beb22df7864928f87fb',
  errorDetails: [
    { line: 145, error: 'Formato de data inválido na coluna "data_pagamento"' },
    { line: 678, error: 'Valor numérico inválido na coluna "valor_pago"' },
    { line: 901, error: 'CNPJ inválido na coluna "cnpj_fornecedor"' }
  ],
  importSummary: {
    newSuppliers: 12,
    updatedSuppliers: 5,
    newPayments: 1242,
    identifiedRetentions: 980,
    potentialCredits: 'R$ 45.320,15'
  }
};

const ImportHistory = () => {
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  
  // Format date to locale string
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  // Get file icon based on file type
  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'csv':
      case 'xlsx':
      case 'xls':
        return <FileSpreadsheet className="h-5 w-5 text-green-600" />;
      case 'json':
      case 'xml':
        return <FileJson className="h-5 w-5 text-blue-600" />;
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-600" />;
      default:
        return <FileSpreadsheet className="h-5 w-5" />;
    }
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle className="h-3 w-3 mr-1" /> Sucesso
          </Badge>
        );
      case 'partial':
        return (
          <Badge className="bg-amber-500 hover:bg-amber-600">
            <AlertTriangle className="h-3 w-3 mr-1" /> Parcial
          </Badge>
        );
      case 'failed':
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" /> Falha
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
    setSelectedItem(detailMockData);
    setDetailOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold">Histórico de Importações</h2>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex">
            <Input 
              placeholder="Pesquisar por arquivo..." 
              className="max-w-xs" 
            />
          </div>
          
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="success">Sucesso</SelectItem>
                <SelectItem value="partial">Parcial</SelectItem>
                <SelectItem value="failed">Falha</SelectItem>
              </SelectContent>
            </Select>
            
            <Button size="icon" variant="outline">
              <Calendar className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Table>
        <TableCaption>Histórico de importações recentes</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Arquivo</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Registros</TableHead>
            <TableHead>Importado em</TableHead>
            <TableHead>Usuário</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {historyItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {getFileIcon(item.fileType)}
                  <span>{item.fileName}</span>
                </div>
              </TableCell>
              <TableCell>
                {getStatusBadge(item.status)}
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  <span className="font-medium">{item.importedRecords}</span>
                  {" / "}
                  <span>{item.totalRecords}</span>
                  {item.errorRecords > 0 && (
                    <span className="text-red-500 ml-2">
                      ({item.errorRecords} erros)
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm">
                  {formatDate(item.importedAt)}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-sm">
                  {item.importedBy}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button 
                    size="icon" 
                    variant="ghost"
                    onClick={() => openDetail(item)}
                    title="Ver detalhes"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  
                  <Button 
                    size="icon" 
                    variant="ghost"
                    title="Baixar log"
                  >
                    <ArrowDownToLine className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {/* Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalhes da Importação</DialogTitle>
            <DialogDescription>
              Informações completas sobre a importação do arquivo.
            </DialogDescription>
          </DialogHeader>
          
          {selectedItem && (
            <div className="space-y-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {getFileIcon(selectedItem.fileType)}
                    <h3 className="font-semibold">{selectedItem.fileName}</h3>
                  </div>
                  <div>{getStatusBadge(selectedItem.status)}</div>
                </div>
                
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Importado em:</span>
                    <span>{formatDate(selectedItem.importedAt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Importado por:</span>
                    <span>{selectedItem.importedBy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tempo de processamento:</span>
                    <span>{selectedItem.processingTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tamanho do arquivo:</span>
                    <span>{selectedItem.fileSize}</span>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 space-y-3">
                <h3 className="font-medium">Resumo da Importação</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Registros Totais</span>
                    <span className="text-xl font-semibold">{selectedItem.totalRecords}</span>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Importados</span>
                    <span className="text-xl font-semibold text-green-600">{selectedItem.importedRecords}</span>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Com Erros</span>
                    <span className="text-xl font-semibold text-red-600">{selectedItem.errorRecords}</span>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Taxa de Sucesso</span>
                    <span className="text-xl font-semibold">
                      {Math.round((selectedItem.importedRecords / selectedItem.totalRecords) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4 space-y-3">
                  <h3 className="font-medium">Dados Processados</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Novos fornecedores:</span>
                      <span>{selectedItem.importSummary.newSuppliers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Fornecedores atualizados:</span>
                      <span>{selectedItem.importSummary.updatedSuppliers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Novos pagamentos:</span>
                      <span>{selectedItem.importSummary.newPayments}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Retenções identificadas:</span>
                      <span>{selectedItem.importSummary.identifiedRetentions}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Créditos potenciais:</span>
                      <span className="text-green-600">{selectedItem.importSummary.potentialCredits}</span>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 space-y-3">
                  <h3 className="font-medium">Erros Encontrados</h3>
                  {selectedItem.errorRecords > 0 ? (
                    <div className="space-y-2 overflow-auto max-h-[200px] pr-2">
                      {selectedItem.errorDetails.map((error: any, index: number) => (
                        <div key={index} className="border-l-2 border-red-500 pl-3 py-1">
                          <div className="text-sm font-medium">Linha {error.line}</div>
                          <div className="text-sm text-muted-foreground">{error.error}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center p-4 text-muted-foreground">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      Nenhum erro encontrado
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setDetailOpen(false)}>Fechar</Button>
                <Button variant="outline">
                  <ArrowDownToLine className="h-4 w-4 mr-2" />
                  Baixar Relatório
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImportHistory;
