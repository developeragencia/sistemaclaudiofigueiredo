
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, Clock, Filter, Search } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const OperationalAudits = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const auditsData = [
    {
      id: 'AUD-2024-001',
      title: 'Auditoria de Processos Operacionais Q1',
      status: 'completed',
      responsible: 'Carlos Silva',
      startDate: '2024-01-15',
      endDate: '2024-03-30',
      findings: 12,
      critical: 2
    },
    {
      id: 'AUD-2024-002',
      title: 'Verificação de Conformidade Documental',
      status: 'in-progress',
      responsible: 'Ana Oliveira',
      startDate: '2024-03-10',
      endDate: '2024-06-15',
      findings: 8,
      critical: 1
    },
    {
      id: 'AUD-2024-003',
      title: 'Auditoria de Segurança de Dados',
      status: 'pending',
      responsible: 'Marcos Pereira',
      startDate: '2024-05-01',
      endDate: '2024-07-30',
      findings: 0,
      critical: 0
    },
    {
      id: 'AUD-2024-004',
      title: 'Revisão de Processos de Importação',
      status: 'completed',
      responsible: 'Juliana Costa',
      startDate: '2024-02-01',
      endDate: '2024-04-15',
      findings: 5,
      critical: 0
    },
    {
      id: 'AUD-2024-005',
      title: 'Auditoria de Comprovantes Fiscais',
      status: 'in-progress',
      responsible: 'Ricardo Mendes',
      startDate: '2024-04-01',
      endDate: '2024-06-30',
      findings: 3,
      critical: 0
    }
  ];

  const filteredAudits = auditsData.filter(audit => {
    // Apply status filter
    if (filter !== 'all' && audit.status !== filter) {
      return false;
    }
    
    // Apply search term
    if (searchTerm && !audit.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !audit.id.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !audit.responsible.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const getStatusBadge = (status) => {
    switch(status) {
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" /> Concluído
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3 mr-1" /> Em Andamento
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <AlertCircle className="w-3 h-3 mr-1" /> Pendente
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Auditorias Operacionais</h1>
      
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle>Dashboard de Auditorias</CardTitle>
          <CardDescription>
            Visão geral das auditorias operacionais
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <h3 className="text-lg font-medium text-blue-700 mb-2">Total de Auditorias</h3>
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold text-blue-900">{auditsData.length}</span>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4 border border-green-100">
              <h3 className="text-lg font-medium text-green-700 mb-2">Auditorias Concluídas</h3>
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold text-green-900">
                  {auditsData.filter(a => a.status === 'completed').length}
                </span>
                <div className="bg-green-100 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
              <h3 className="text-lg font-medium text-yellow-700 mb-2">Descobertas Críticas</h3>
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold text-yellow-900">
                  {auditsData.reduce((total, audit) => total + audit.critical, 0)}
                </span>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <AlertCircle className="h-6 w-6 text-yellow-500" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <div className="w-full md:w-auto">
          <Tabs value={filter} onValueChange={setFilter} className="w-full">
            <TabsList>
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="completed">Concluídas</TabsTrigger>
              <TabsTrigger value="in-progress">Em Andamento</TabsTrigger>
              <TabsTrigger value="pending">Pendentes</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar auditoria..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Mais recentes</DropdownMenuItem>
              <DropdownMenuItem>Mais antigas</DropdownMenuItem>
              <DropdownMenuItem>Críticas primeiro</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button>Nova Auditoria</Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableCaption>Lista de auditorias operacionais</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Período</TableHead>
                <TableHead>Descobertas</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAudits.map((audit) => (
                <TableRow key={audit.id}>
                  <TableCell className="font-medium">{audit.id}</TableCell>
                  <TableCell>{audit.title}</TableCell>
                  <TableCell>{getStatusBadge(audit.status)}</TableCell>
                  <TableCell>{audit.responsible}</TableCell>
                  <TableCell>
                    {audit.startDate} - {audit.endDate}
                  </TableCell>
                  <TableCell>
                    {audit.findings} 
                    {audit.critical > 0 && (
                      <span className="ml-1 text-red-500 text-xs font-medium">
                        ({audit.critical} críticas)
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Detalhes</Button>
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredAudits.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                    Nenhuma auditoria encontrada
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex items-center justify-between pt-6">
          <div className="text-sm text-gray-500">
            Mostrando {filteredAudits.length} de {auditsData.length} auditorias
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>Anterior</Button>
            <Button variant="outline" size="sm" disabled>Próxima</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OperationalAudits;
