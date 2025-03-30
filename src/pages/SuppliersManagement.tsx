
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Building2, FileCog } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Supplier } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SuppliersTable from '@/components/suppliers/SuppliersTable';
import SupplierImport from '@/components/suppliers/SupplierImport';
import SupplierDetails from '@/components/suppliers/SupplierDetails';

export default function SuppliersManagement() {
  const [activeSupplier, setActiveSupplier] = useState<Supplier | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { toast } = useToast();

  // Mock data for demo purposes
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: '1',
      cnpj: '12.345.678/0001-90',
      name: 'Empresa de Software ABC Ltda',
      tradeName: 'ABC Tecnologia',
      activityCode: '62.01-5-01',
      activityDescription: 'Desenvolvimento de programas de computador sob encomenda',
      address: 'Rua da Tecnologia, 123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
      phone: '(11) 98765-4321',
      email: 'contato@abctech.com.br',
      taxRegime: 'Lucro Presumido',
      createdAt: new Date('2023-01-15'),
      updatedAt: new Date('2023-08-20'),
    },
    {
      id: '2',
      cnpj: '98.765.432/0001-21',
      name: 'Consultoria de TI XYZ S.A.',
      tradeName: 'XYZ Consulting',
      activityCode: '62.04-0-00',
      activityDescription: 'Consultoria em tecnologia da informação',
      address: 'Avenida Consultor, 456',
      city: 'Rio de Janeiro',
      state: 'RJ',
      zipCode: '20000-123',
      phone: '(21) 3456-7890',
      email: 'contato@xyzconsulting.com',
      taxRegime: 'Lucro Real',
      createdAt: new Date('2022-11-05'),
      updatedAt: new Date('2023-07-10'),
    },
  ]);

  const handleShowDetails = (supplier: Supplier) => {
    setActiveSupplier(supplier);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-sky-800">Gestão de Fornecedores</h1>
          <p className="text-muted-foreground">
            Gerencie fornecedores, consulte dados fiscais e monitore retenções
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="text-sky-700 border-sky-300">
            <FileCog className="mr-2 h-4 w-4" /> Importar
          </Button>
          <Button className="bg-sky-700 hover:bg-sky-800">
            <Plus className="mr-2 h-4 w-4" /> Novo Fornecedor
          </Button>
        </div>
      </div>

      <div className="flex gap-4 flex-col lg:flex-row">
        <div className="w-full lg:w-2/3 space-y-4">
          <Card>
            <CardHeader className="bg-sky-50/50 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-sky-600" />
                  <CardTitle className="text-lg text-sky-800">Fornecedores Cadastrados</CardTitle>
                </div>
                <div className="relative w-full max-w-xs">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar fornecedor..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <CardDescription>
                {suppliers.length} fornecedores cadastrados no sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SuppliersTable 
                suppliers={suppliers} 
                searchTerm={searchTerm} 
                onShowDetails={handleShowDetails} 
              />
            </CardContent>
          </Card>

          <Card>
            <Tabs defaultValue="import">
              <CardHeader className="bg-sky-50/50 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-sky-800">Ferramentas de Gerenciamento</CardTitle>
                  <TabsList className="bg-sky-100">
                    <TabsTrigger value="import">Importação</TabsTrigger>
                    <TabsTrigger value="audit">Auditoria</TabsTrigger>
                    <TabsTrigger value="reports">Relatórios</TabsTrigger>
                  </TabsList>
                </div>
                <CardDescription>
                  Utilize as ferramentas para gerenciar seus fornecedores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TabsContent value="import" className="mt-0 pt-4">
                  <SupplierImport />
                </TabsContent>
                <TabsContent value="audit" className="mt-0 pt-4">
                  <h3 className="font-medium mb-2">Auditoria de Fornecedores</h3>
                  <p className="text-muted-foreground text-sm">
                    Ferramentas para auditoria e verificação de fornecedores serão disponibilizadas em breve.
                  </p>
                </TabsContent>
                <TabsContent value="reports" className="mt-0 pt-4">
                  <h3 className="font-medium mb-2">Relatórios de Fornecedores</h3>
                  <p className="text-muted-foreground text-sm">
                    Ferramentas para geração de relatórios serão disponibilizadas em breve.
                  </p>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>

        <div className="w-full lg:w-1/3">
          <SupplierDetails supplier={activeSupplier} />
        </div>
      </div>
    </div>
  );
}
