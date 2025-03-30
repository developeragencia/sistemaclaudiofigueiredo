
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Download, FileCheck, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for the tax credits
const mockCredits = [
  {
    id: "CR001",
    description: "IRRF sobre serviços prestados",
    amount: 15750.45,
    period: "2023/01",
    status: "available",
    updated: "2023-10-15",
  },
  {
    id: "CR002",
    description: "PIS/COFINS sobre insumos",
    amount: 8432.90,
    period: "2023/02",
    status: "pending",
    updated: "2023-10-12",
  },
  {
    id: "CR003",
    description: "ICMS sobre aquisições",
    amount: 22647.33,
    period: "2023/01",
    status: "available",
    updated: "2023-10-10",
  },
  {
    id: "CR004",
    description: "IPI sobre exportações",
    amount: 5689.21,
    period: "2023/03",
    status: "processing",
    updated: "2023-10-18",
  },
  {
    id: "CR005",
    description: "ISS retido na fonte",
    amount: 3245.78,
    period: "2023/02",
    status: "available",
    updated: "2023-10-14",
  }
];

// Helper function to get status badge style
const getStatusBadge = (status: string) => {
  switch (status) {
    case 'available':
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Disponível</Badge>;
    case 'pending':
      return <Badge variant="outline" className="text-amber-600 border-amber-300 bg-amber-50">Pendente</Badge>;
    case 'processing':
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Em Processamento</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

// Format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

const TaxCreditsTable = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Créditos Identificados</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="h-4 w-4" /> Exportar
          </Button>
          <Button size="sm" className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" /> Validar Créditos
          </Button>
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Período</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Atualizado</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockCredits.map((credit) => (
            <TableRow key={credit.id}>
              <TableCell className="font-medium">{credit.id}</TableCell>
              <TableCell>{credit.description}</TableCell>
              <TableCell className="font-medium">{formatCurrency(credit.amount)}</TableCell>
              <TableCell>{credit.period}</TableCell>
              <TableCell>{getStatusBadge(credit.status)}</TableCell>
              <TableCell>{new Date(credit.updated).toLocaleDateString('pt-BR')}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Abrir menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      <Eye className="h-4 w-4 mr-2" /> Visualizar Detalhes
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Download className="h-4 w-4 mr-2" /> Exportar Relatório
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer text-red-600 hover:text-red-700">
                      Remover
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TaxCreditsTable;
