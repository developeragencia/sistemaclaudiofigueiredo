
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ClientDetailedInfo, ClientTaxCredit } from '@/types/client';
import { Phone, Mail, Building2, FileText, Download, Plus, CalendarDays } from 'lucide-react';
import { Client } from '@/types';

interface ClientDetailsPanelProps {
  client: Client;
  detailedInfo?: ClientDetailedInfo;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const ClientDetailsPanel: React.FC<ClientDetailsPanelProps> = ({ client, detailedInfo }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações Detalhadas</CardTitle>
        <CardDescription>Dados completos do cliente</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="contacts" className="w-full">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="contacts">Contatos</TabsTrigger>
            <TabsTrigger value="financial">Financeiro</TabsTrigger>
            <TabsTrigger value="tax-credits">Créditos Tributários</TabsTrigger>
            <TabsTrigger value="documents">Documentos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="contacts" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Contatos</h3>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Contato
              </Button>
            </div>
            
            {detailedInfo?.contacts ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {detailedInfo.contacts.map((contact, i) => (
                  <Card key={i} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium text-lg">
                          {contact.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{contact.name}</h4>
                          <p className="text-sm text-gray-500">{contact.role}</p>
                          
                          <div className="mt-2 space-y-1">
                            <div className="flex items-center text-sm">
                              <Mail className="h-3.5 w-3.5 text-gray-500 mr-2" />
                              <span>{contact.email}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Phone className="h-3.5 w-3.5 text-gray-500 mr-2" />
                              <span>{contact.phone}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed">
                <Building2 className="mx-auto h-10 w-10 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum contato cadastrado</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Comece adicionando informações de contato para este cliente.
                </p>
                <div className="mt-6">
                  <Button size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Contato
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="financial" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Informações Financeiras</h3>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Editar Informações
              </Button>
            </div>
            
            {detailedInfo?.financialInfo ? (
              <div className="grid grid-cols-1 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">CNPJ/CPF</dt>
                        <dd className="mt-1 text-sm text-gray-900">{detailedInfo.financialInfo.taxId}</dd>
                      </div>
                      
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Conta Bancária</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {detailedInfo.financialInfo.bankAccount || "Não informado"}
                        </dd>
                      </div>
                      
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Endereço de Cobrança</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {detailedInfo.financialInfo.billingAddress || "Não informado"}
                        </dd>
                      </div>
                      
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Método de Pagamento</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {detailedInfo.financialInfo.paymentMethod || "Não informado"}
                        </dd>
                      </div>
                      
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Limite de Crédito</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {detailedInfo.financialInfo.creditLimit 
                            ? formatCurrency(detailedInfo.financialInfo.creditLimit)
                            : "Não definido"}
                        </dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed">
                <FileText className="mx-auto h-10 w-10 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma informação financeira</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Adicione informações financeiras para este cliente.
                </p>
                <div className="mt-6">
                  <Button size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Informações
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="tax-credits" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Créditos Tributários</h3>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Crédito
              </Button>
            </div>
            
            {detailedInfo?.taxCredits && detailedInfo.taxCredits.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {detailedInfo.taxCredits.map((credit) => (
                    <TableRow key={credit.id}>
                      <TableCell>{credit.type}</TableCell>
                      <TableCell>{formatCurrency(credit.amount)}</TableCell>
                      <TableCell>{credit.createdAt.toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            credit.status === 'approved' ? 'default' :
                            credit.status === 'rejected' ? 'destructive' : 'outline'
                          }
                        >
                          {credit.status === 'approved' ? 'Aprovado' :
                           credit.status === 'rejected' ? 'Rejeitado' : 'Pendente'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="ghost">
                          Visualizar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed">
                <CalendarDays className="mx-auto h-10 w-10 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum crédito tributário</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Este cliente ainda não possui créditos tributários registrados.
                </p>
                <div className="mt-6">
                  <Button size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Crédito
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="documents" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Documentos</h3>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Documento
              </Button>
            </div>
            
            {detailedInfo?.documents && detailedInfo.documents.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {detailedInfo.documents.map((doc, i) => (
                    <TableRow key={i}>
                      <TableCell>{doc.name}</TableCell>
                      <TableCell>{doc.type}</TableCell>
                      <TableCell>{doc.uploadDate.toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed">
                <FileText className="mx-auto h-10 w-10 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum documento</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Adicione documentos importantes relativos ao cliente.
                </p>
                <div className="mt-6">
                  <Button size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Documento
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ClientDetailsPanel;
