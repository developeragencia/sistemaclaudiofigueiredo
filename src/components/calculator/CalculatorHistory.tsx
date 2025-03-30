
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Trash2, ExternalLink } from "lucide-react";

// Mock data for calculation history
const mockHistory = [
  {
    id: 1,
    taxType: "IRRF",
    baseValue: 15000,
    aliquota: 1.5,
    result: 225,
    date: "2023-10-25T14:30:00"
  },
  {
    id: 2,
    taxType: "PIS/COFINS",
    baseValue: 25000,
    aliquota: 9.25,
    result: 2312.5,
    date: "2023-10-25T11:15:00"
  },
  {
    id: 3,
    taxType: "ISS",
    baseValue: 10000,
    aliquota: 5,
    result: 500,
    date: "2023-10-24T16:45:00"
  },
  {
    id: 4,
    taxType: "ICMS",
    baseValue: 30000,
    aliquota: 18,
    result: 5400,
    date: "2023-10-24T09:20:00"
  },
  {
    id: 5,
    taxType: "IPI",
    baseValue: 12000,
    aliquota: 12,
    result: 1440,
    date: "2023-10-23T15:10:00"
  }
];

// Format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

const CalculatorHistory = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Histórico de Cálculos</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="h-4 w-4" /> Exportar
          </Button>
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tributo</TableHead>
            <TableHead>Valor Base</TableHead>
            <TableHead>Alíquota</TableHead>
            <TableHead>Resultado</TableHead>
            <TableHead>Data/Hora</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockHistory.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.taxType}</TableCell>
              <TableCell>{formatCurrency(item.baseValue)}</TableCell>
              <TableCell>{item.aliquota}%</TableCell>
              <TableCell className="font-medium">{formatCurrency(item.result)}</TableCell>
              <TableCell>{formatDate(item.date)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CalculatorHistory;
