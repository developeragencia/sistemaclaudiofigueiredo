
import React, { useState } from "react";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Search, User, FileText, RefreshCw, Settings, Lock } from "lucide-react";

// Mock data for audit trail
const auditData = [
  { id: 1, user: "admin@sistemasclaudiofigueiredo.com.br", action: "login", target: "Sistema", details: "Login bem-sucedido", timestamp: "2023-11-28 13:45:22" },
  { id: 2, user: "admin@sistemasclaudiofigueiredo.com.br", action: "create", target: "Cliente", details: "Criação de novo cliente: ABC Corp", timestamp: "2023-11-28 13:52:10" },
  { id: 3, user: "admin@sistemasclaudiofigueiredo.com.br", action: "update", target: "Fornecedor", details: "Atualização de dados: XYZ Ltda", timestamp: "2023-11-28 14:10:05" },
  { id: 4, user: "admin@sistemasclaudiofigueiredo.com.br", action: "view", target: "Relatório", details: "Visualização de relatório fiscal", timestamp: "2023-11-28 14:30:15" },
  { id: 5, user: "admin@sistemasclaudiofigueiredo.com.br", action: "generate", target: "Comprovante", details: "Geração de comprovante de retenção", timestamp: "2023-11-28 15:12:47" },
  { id: 6, user: "admin@sistemasclaudiofigueiredo.com.br", action: "export", target: "Dados", details: "Exportação de dados para CSV", timestamp: "2023-11-28 15:45:33" },
  { id: 7, user: "admin@sistemasclaudiofigueiredo.com.br", action: "logout", target: "Sistema", details: "Logout do sistema", timestamp: "2023-11-28 17:30:00" },
  { id: 8, user: "admin@sistemasclaudiofigueiredo.com.br", action: "login", target: "Sistema", details: "Login bem-sucedido", timestamp: "2023-11-29 08:15:22" },
  { id: 9, user: "admin@sistemasclaudiofigueiredo.com.br", action: "update", target: "Cliente", details: "Atualização de status: ABC Corp", timestamp: "2023-11-29 09:23:45" },
  { id: 10, user: "admin@sistemasclaudiofigueiredo.com.br", action: "import", target: "Fornecedores", details: "Importação de lista de fornecedores", timestamp: "2023-11-29 10:08:12" },
];

// Helper function to get the appropriate icon for each action type
const getActionIcon = (action: string) => {
  switch (action) {
    case "login":
    case "logout":
      return <Lock size={16} className="text-sky-600" />;
    case "create":
    case "update":
      return <Settings size={16} className="text-sky-600" />;
    case "view":
      return <User size={16} className="text-sky-600" />;
    case "generate":
    case "export":
      return <FileText size={16} className="text-sky-600" />;
    case "import":
      return <RefreshCw size={16} className="text-sky-600" />;
    default:
      return null;
  }
};

export default function AuditTrailTable() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  
  // Filter data based on search term and filter
  const filteredData = auditData.filter(item => {
    const matchesSearch = 
      item.user.toLowerCase().includes(search.toLowerCase()) ||
      item.action.toLowerCase().includes(search.toLowerCase()) ||
      item.target.toLowerCase().includes(search.toLowerCase()) ||
      item.details.toLowerCase().includes(search.toLowerCase());
      
    const matchesFilter = filter === "all" || item.action === filter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar na trilha de auditoria..." 
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filtrar por ação" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as ações</SelectItem>
            <SelectItem value="login">Login</SelectItem>
            <SelectItem value="logout">Logout</SelectItem>
            <SelectItem value="create">Criação</SelectItem>
            <SelectItem value="update">Atualização</SelectItem>
            <SelectItem value="view">Visualização</SelectItem>
            <SelectItem value="generate">Geração</SelectItem>
            <SelectItem value="export">Exportação</SelectItem>
            <SelectItem value="import">Importação</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">ID</TableHead>
              <TableHead className="w-[200px]">Usuário</TableHead>
              <TableHead className="w-[120px]">Ação</TableHead>
              <TableHead className="w-[120px]">Alvo</TableHead>
              <TableHead>Detalhes</TableHead>
              <TableHead className="w-[180px]">Data/Hora</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.user}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {getActionIcon(item.action)}
                      <span className="capitalize">{item.action}</span>
                    </div>
                  </TableCell>
                  <TableCell>{item.target}</TableCell>
                  <TableCell>{item.details}</TableCell>
                  <TableCell>{item.timestamp}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">Nenhum registro encontrado</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
