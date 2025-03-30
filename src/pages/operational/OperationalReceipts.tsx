
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, Printer, Search, Filter, Eye } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from '@/components/ui/scroll-area';

const OperationalReceipts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReceipts, setSelectedReceipts] = useState<string[]>([]);
  
  const receiptsData = [
    {
      id: 'RCP-2024-001',
      title: 'Comprovante de Importação #1234',
      date: '2024-05-10',
      type: 'importação',
      category: 'fiscal',
      client: 'Empresa ABC Ltda',
      status: 'approved'
    },
    {
      id: 'RCP-2024-002',
      title: 'Comprovante de Auditoria #567',
      date: '2024-04-25',
      type: 'auditoria',
      category: 'operacional',
      client: 'XYZ Comércio S.A.',
      status: 'approved'
    },
    {
      id: 'RCP-2024-003',
      title: 'Comprovante de Processamento #789',
      date: '2024-05-05',
      type: 'processamento',
      category: 'fiscal',
      client: 'Indústria Modelo Ltda',
      status: 'pending'
    },
    {
      id: 'RCP-2024-004',
      title: 'Comprovante de Transferência #321',
      date: '2024-03-18',
      type: 'transferência',
      category: 'financeiro',
      client: 'Tech Solutions Inc.',
      status: 'approved'
    },
    {
      id: 'RCP-2024-005',
      title: 'Comprovante de Validação #654',
      date: '2024-04-30',
      type: 'validação',
      category: 'operacional',
      client: 'Global Trade Ltda',
      status: 'rejected'
    },
    {
      id: 'RCP-2024-006',
      title: 'Comprovante de Análise #987',
      date: '2024-05-12',
      type: 'análise',
      category: 'técnico',
      client: 'Serviços Financeiros S.A.',
      status: 'pending'
    }
  ];

  const filteredReceipts = receiptsData.filter(receipt => {
    if (searchTerm === '') return true;
    
    return receipt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           receipt.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
           receipt.client.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleSelectAll = () => {
    if (selectedReceipts.length === filteredReceipts.length) {
      setSelectedReceipts([]);
    } else {
      setSelectedReceipts(filteredReceipts.map(receipt => receipt.id));
    }
  };

  const handleSelect = (id: string) => {
    if (selectedReceipts.includes(id)) {
      setSelectedReceipts(selectedReceipts.filter(item => item !== id));
    } else {
      setSelectedReceipts([...selectedReceipts, id]);
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Aprovado</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pendente</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Rejeitado</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Comprovantes Operacionais</h1>
      
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Buscar Comprovantes</CardTitle>
          <CardDescription>
            Encontre e gerencie comprovantes operacionais
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Buscar por ID, título ou cliente..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full md:w-auto">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>Status</DropdownMenuItem>
                    <DropdownMenuItem>Tipo de Comprovante</DropdownMenuItem>
                    <DropdownMenuItem>Categoria</DropdownMenuItem>
                    <DropdownMenuItem>Data</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button>Buscar</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="selectAll" 
            checked={selectedReceipts.length === filteredReceipts.length && filteredReceipts.length > 0}
            onCheckedChange={handleSelectAll}
          />
          <Label htmlFor="selectAll">Selecionar todos</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          {selectedReceipts.length > 0 && (
            <>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" /> Download ({selectedReceipts.length})
              </Button>
              <Button variant="outline" size="sm">
                <Printer className="h-4 w-4 mr-1" /> Imprimir ({selectedReceipts.length})
              </Button>
            </>
          )}
          <Button size="sm">Novo Comprovante</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredReceipts.map((receipt) => (
          <Card key={receipt.id} className="overflow-hidden border border-gray-200">
            <div className="flex items-center p-4 bg-gray-50 border-b border-gray-200">
              <Checkbox
                checked={selectedReceipts.includes(receipt.id)}
                onCheckedChange={() => handleSelect(receipt.id)}
                className="mr-3"
              />
              <div className="flex-1">
                <div className="font-medium">{receipt.id}</div>
                <div className="text-sm text-gray-500">{receipt.date}</div>
              </div>
              {getStatusBadge(receipt.status)}
            </div>
            
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-md">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">{receipt.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">Cliente: {receipt.client}</p>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{receipt.type}</Badge>
                    <Badge variant="outline">{receipt.category}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <div className="border-t border-gray-200 p-3 bg-gray-50 flex justify-end space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-1" /> Visualizar
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>{receipt.title}</DialogTitle>
                    <DialogDescription>{receipt.id} | {receipt.date}</DialogDescription>
                  </DialogHeader>
                  
                  <ScrollArea className="h-[500px] rounded-md border p-4">
                    <div className="space-y-8 py-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h3 className="text-xl font-bold">{receipt.title}</h3>
                          <p className="text-gray-500">Gerado em {receipt.date}</p>
                        </div>
                        <div>
                          {getStatusBadge(receipt.status)}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-gray-500">Detalhes do Cliente</p>
                          <p className="font-medium">{receipt.client}</p>
                          <p>CNPJ: 00.000.000/0001-00</p>
                          <p>contato@empresa.com.br</p>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-gray-500">Detalhes do Documento</p>
                          <p>ID: <span className="font-medium">{receipt.id}</span></p>
                          <p>Tipo: <span className="font-medium">{receipt.type}</span></p>
                          <p>Categoria: <span className="font-medium">{receipt.category}</span></p>
                        </div>
                      </div>
                      
                      <div className="border-t pt-6 border-gray-200">
                        <h4 className="font-medium mb-4">Detalhes Operacionais</h4>
                        <div className="bg-gray-50 p-4 rounded-md space-y-4">
                          <div className="flex justify-between">
                            <span className="font-medium">Data do Processamento:</span>
                            <span>{receipt.date}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Responsável:</span>
                            <span>Carlos Silva</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Método:</span>
                            <span>Processamento Automatizado</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Observações:</span>
                            <span>Processado conforme procedimento padrão</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t pt-6 border-gray-200">
                        <h4 className="font-medium mb-4">Detalhes do Documento</h4>
                        <div className="bg-gray-50 p-4 rounded-md">
                          <p>Este documento certifica que o processamento operacional foi realizado de acordo com os procedimentos estabelecidos pela empresa Claudio Figueiredo Consultoria, seguindo os padrões de qualidade e conformidade exigidos.</p>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                  
                  <DialogFooter>
                    <Button variant="outline" className="mr-2">
                      <Download className="h-4 w-4 mr-1" /> Download
                    </Button>
                    <Button variant="outline" className="mr-2">
                      <Printer className="h-4 w-4 mr-1" /> Imprimir
                    </Button>
                    <Button>Fechar</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">Ações</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Download</DropdownMenuItem>
                  <DropdownMenuItem>Imprimir</DropdownMenuItem>
                  <DropdownMenuItem>Compartilhar</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">Excluir</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </Card>
        ))}
        
        {filteredReceipts.length === 0 && (
          <div className="col-span-3 py-12 text-center text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-medium">Nenhum comprovante encontrado</p>
            <p>Tente ajustar seus critérios de busca</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OperationalReceipts;
