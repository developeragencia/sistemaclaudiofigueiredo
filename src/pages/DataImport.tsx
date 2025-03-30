
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ImportDashboard from '@/components/import/ImportDashboard';
import FileUploader from '@/components/import/FileUploader';
import ImportHistory from '@/components/import/ImportHistory';
import ImportQueue from '@/components/import/ImportQueue';

const DataImport = () => {
  const [activeTab, setActiveTab] = useState('upload');

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Importação de Dados</h1>
        <p className="text-muted-foreground">
          Importe, processe e analise dados de pagamentos e retenções fiscais.
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Processamento Inteligente de Dados</CardTitle>
          <CardDescription>
            O sistema aprende com cada importação para facilitar processamentos futuros.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="upload"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="upload">Upload de Arquivos</TabsTrigger>
              <TabsTrigger value="queue">Fila de Processamento</TabsTrigger>
              <TabsTrigger value="history">Histórico de Importação</TabsTrigger>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="mt-0">
              <FileUploader />
            </TabsContent>
            
            <TabsContent value="queue" className="mt-0">
              <ImportQueue />
            </TabsContent>
            
            <TabsContent value="history" className="mt-0">
              <ImportHistory />
            </TabsContent>
            
            <TabsContent value="dashboard" className="mt-0">
              <ImportDashboard />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataImport;
