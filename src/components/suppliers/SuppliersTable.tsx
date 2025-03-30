
import React from 'react';
import { Supplier } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { FileText, Mail, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SuppliersTableProps {
  suppliers: Supplier[];
  searchTerm: string;
  onShowDetails: (supplier: Supplier) => void;
}

const SuppliersTable: React.FC<SuppliersTableProps> = ({ 
  suppliers, 
  searchTerm,
  onShowDetails 
}) => {
  // Filter suppliers based on search term
  const filteredSuppliers = suppliers.filter(supplier => 
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.cnpj.includes(searchTerm) ||
    supplier.tradeName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format CNPJ for display
  const formatCnpj = (cnpj: string) => {
    return cnpj; // Already formatted in the mock data
  };
  
  // Get tax regime badge color
  const getTaxRegimeColor = (regime: string | undefined) => {
    if (!regime) return "bg-gray-200 text-gray-700";
    
    switch (regime.toLowerCase()) {
      case 'simples nacional':
        return "bg-green-100 text-green-800";
      case 'lucro presumido':
        return "bg-amber-100 text-amber-800";
      case 'lucro real':
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="relative">
      {filteredSuppliers.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Nenhum fornecedor encontrado.</p>
        </div>
      ) : (
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>CNPJ</TableHead>
              <TableHead>Fornecedor</TableHead>
              <TableHead className="hidden md:table-cell">Regime</TableHead>
              <TableHead className="hidden md:table-cell">Contato</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSuppliers.map((supplier) => (
              <TableRow key={supplier.id}>
                <TableCell className="font-mono text-sm">
                  {formatCnpj(supplier.cnpj)}
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{supplier.name}</p>
                    {supplier.tradeName && (
                      <p className="text-muted-foreground text-xs">{supplier.tradeName}</p>
                    )}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {supplier.taxRegime && (
                    <Badge variant="outline" className={getTaxRegimeColor(supplier.taxRegime)}>
                      {supplier.taxRegime}
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex flex-col text-sm">
                    {supplier.email && (
                      <div className="flex items-center gap-1 text-sky-700">
                        <Mail className="h-3 w-3" />
                        <span className="text-xs truncate max-w-[150px]">{supplier.email}</span>
                      </div>
                    )}
                    {supplier.phone && (
                      <div className="flex items-center gap-1 text-sky-700">
                        <Phone className="h-3 w-3" />
                        <span className="text-xs">{supplier.phone}</span>
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-sky-700"
                    onClick={() => onShowDetails(supplier)}
                  >
                    <FileText className="h-4 w-4 mr-1" /> Detalhes
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default SuppliersTable;
