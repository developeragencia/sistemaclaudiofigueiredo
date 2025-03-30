
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Supplier } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { 
  Building2, MapPin, Phone, Mail, Calendar, FileSpreadsheet, 
  Pencil, Trash2, AlertCircle
} from 'lucide-react';

interface SupplierDetailsProps {
  supplier: Supplier | null;
}

const SupplierDetails: React.FC<SupplierDetailsProps> = ({ supplier }) => {
  if (!supplier) {
    return (
      <Card className="h-full border-dashed border-2">
        <CardHeader className="bg-muted/30">
          <CardTitle className="text-muted-foreground text-lg">Detalhes do Fornecedor</CardTitle>
          <CardDescription>Selecione um fornecedor para visualizar detalhes</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-80">
          <div className="text-center">
            <Building2 className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhum fornecedor selecionado</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="bg-sky-50/50">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-sky-800 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-sky-600" />
              {supplier.tradeName || supplier.name}
            </CardTitle>
            <CardDescription className="mt-1">
              {supplier.cnpj}
            </CardDescription>
          </div>
          
          <Badge variant="outline" className={
            supplier.taxRegime?.toLowerCase() === 'lucro real' ? 'bg-blue-100 text-blue-800' :
            supplier.taxRegime?.toLowerCase() === 'lucro presumido' ? 'bg-amber-100 text-amber-800' :
            supplier.taxRegime?.toLowerCase() === 'simples nacional' ? 'bg-green-100 text-green-800' :
            'bg-gray-100 text-gray-800'
          }>
            {supplier.taxRegime || "Regime não informado"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Informações Gerais</h3>
          <div className="space-y-2">
            <div className="grid grid-cols-[20px_1fr] gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{supplier.name}</p>
                {supplier.tradeName && supplier.tradeName !== supplier.name && (
                  <p className="text-xs text-muted-foreground">{supplier.tradeName}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-[20px_1fr] gap-2">
              <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm">{supplier.activityCode}</p>
                {supplier.activityDescription && (
                  <p className="text-xs text-muted-foreground">{supplier.activityDescription}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Contato</h3>
          <div className="space-y-2">
            {supplier.address && (
              <div className="grid grid-cols-[20px_1fr] gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm">{supplier.address}</p>
                  <p className="text-xs text-muted-foreground">
                    {[supplier.city, supplier.state, supplier.zipCode].filter(Boolean).join(', ')}
                  </p>
                </div>
              </div>
            )}
            
            {supplier.phone && (
              <div className="grid grid-cols-[20px_1fr] gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm">{supplier.phone}</p>
              </div>
            )}
            
            {supplier.email && (
              <div className="grid grid-cols-[20px_1fr] gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm">{supplier.email}</p>
              </div>
            )}
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Informações do Sistema</h3>
          <div className="grid grid-cols-[20px_1fr] gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs">
                Cadastrado em: {supplier.createdAt.toLocaleDateString('pt-BR')}
              </p>
              <p className="text-xs text-muted-foreground">
                Última atualização: {supplier.updatedAt.toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-amber-50 border border-amber-200 rounded-md p-3 flex gap-2">
          <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0" />
          <div className="text-xs text-amber-800">
            <p className="font-medium">Verificação pendente</p>
            <p>Este fornecedor ainda não passou por verificação fiscal automatizada.</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-2 border-t pt-4 bg-muted/10">
        <Button variant="outline" className="w-full text-sky-700 border-sky-300">
          <Pencil className="mr-2 h-4 w-4" />
          Editar
        </Button>
        <Button variant="outline" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50">
          <Trash2 className="mr-2 h-4 w-4" />
          Remover
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SupplierDetails;
