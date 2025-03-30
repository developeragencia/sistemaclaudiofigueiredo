
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { FileCheck, Download, Search, Filter, User, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock audit events
const auditEvents = [
  { id: 1, timestamp: "2023-10-15 14:32:45", user: "admin@exemplo.com", action: "Login bem-sucedido", resource: "Sistema", ip: "189.103.xx.xx" },
  { id: 2, timestamp: "2023-10-15 14:35:12", user: "admin@exemplo.com", action: "Acesso ao módulo", resource: "Segurança & Auditoria", ip: "189.103.xx.xx" },
  { id: 3, timestamp: "2023-10-15 14:38:27", user: "admin@exemplo.com", action: "Visualização de relatório", resource: "Trilhas de Auditoria", ip: "189.103.xx.xx" },
  { id: 4, timestamp: "2023-10-14 11:05:33", user: "usuario@exemplo.com", action: "Login falhou", resource: "Sistema", ip: "201.17.xx.xx" },
  { id: 5, timestamp: "2023-10-14 11:06:22", user: "usuario@exemplo.com", action: "Login bem-sucedido", resource: "Sistema", ip: "201.17.xx.xx" },
  { id: 6, timestamp: "2023-10-14 11:10:45", user: "usuario@exemplo.com", action: "Criação de documento", resource: "Relatórios", ip: "201.17.xx.xx" },
  { id: 7, timestamp: "2023-10-13 16:22:18", user: "admin@exemplo.com", action: "Alteração de configuração", resource: "Segurança", ip: "189.103.xx.xx" },
  { id: 8, timestamp: "2023-10-13 16:25:05", user: "admin@exemplo.com", action: "Login bem-sucedido", resource: "Sistema", ip: "189.103.xx.xx" },
];

// Access events
const accessEvents = auditEvents.filter(event => 
  event.action.includes("Login") || event.action.includes("Acesso")
);

// Data events
const dataEvents = auditEvents.filter(event => 
  event.action.includes("Criação") || event.action.includes("Alteração") || event.action.includes("Visualização")
);

// Configuration events
const configEvents = auditEvents.filter(event => 
  event.action.includes("configuração") || event.resource === "Segurança"
);

const AuditTrails = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("all");
  const [dateRange, setDateRange] = useState<string>("week");
  
  const handleSearch = () => {
    toast({
      title: "Pesquisa realizada",
      description: `Exibindo resultados para "${searchTerm}"`,
      variant: "default",
    });
  };
  
  const handleExport = () => {
    toast({
      title: "Exportação iniciada",
      description: "O relatório de auditoria será enviado para o seu email.",
      variant: "default",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCheck className="text-blue-600" />
            Trilhas de Auditoria
          </CardTitle>
          <CardDescription>
            Pesquise e visualize todas as atividades registradas no sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Pesquisar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Button 
                onClick={handleSearch} 
                size="icon"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="filter-type" className="text-xs font-normal text-muted-foreground">
                Filtrar por tipo
              </Label>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger id="filter-type" className="flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os eventos</SelectItem>
                    <SelectItem value="login">Login e acesso</SelectItem>
                    <SelectItem value="data">Dados e documentos</SelectItem>
                    <SelectItem value="config">Configuração</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="date-range" className="text-xs font-normal text-muted-foreground">
                Período
              </Label>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger id="date-range" className="flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Hoje</SelectItem>
                    <SelectItem value="week">Última semana</SelectItem>
                    <SelectItem value="month">Último mês</SelectItem>
                    <SelectItem value="custom">Período personalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              variant="outline"
              onClick={handleExport}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Exportar relatório
            </Button>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="access">Acessos</TabsTrigger>
              <TabsTrigger value="data">Dados</TabsTrigger>
              <TabsTrigger value="config">Configuração</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="pt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Ação</TableHead>
                    <TableHead>Recurso</TableHead>
                    <TableHead>Endereço IP</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-mono text-xs">{event.timestamp}</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <User className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{event.user}</span>
                      </TableCell>
                      <TableCell>{event.action}</TableCell>
                      <TableCell>{event.resource}</TableCell>
                      <TableCell className="font-mono text-xs">{event.ip}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="access" className="pt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Ação</TableHead>
                    <TableHead>Recurso</TableHead>
                    <TableHead>Endereço IP</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accessEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-mono text-xs">{event.timestamp}</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <User className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{event.user}</span>
                      </TableCell>
                      <TableCell>{event.action}</TableCell>
                      <TableCell>{event.resource}</TableCell>
                      <TableCell className="font-mono text-xs">{event.ip}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="data" className="pt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Ação</TableHead>
                    <TableHead>Recurso</TableHead>
                    <TableHead>Endereço IP</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dataEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-mono text-xs">{event.timestamp}</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <User className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{event.user}</span>
                      </TableCell>
                      <TableCell>{event.action}</TableCell>
                      <TableCell>{event.resource}</TableCell>
                      <TableCell className="font-mono text-xs">{event.ip}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="config" className="pt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Ação</TableHead>
                    <TableHead>Recurso</TableHead>
                    <TableHead>Endereço IP</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {configEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-mono text-xs">{event.timestamp}</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <User className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{event.user}</span>
                      </TableCell>
                      <TableCell>{event.action}</TableCell>
                      <TableCell>{event.resource}</TableCell>
                      <TableCell className="font-mono text-xs">{event.ip}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditTrails;
