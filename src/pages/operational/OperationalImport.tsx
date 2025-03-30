
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileType, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

const OperationalImport = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('importar');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [recentImports, setRecentImports] = useState([
    { id: 1, name: 'Dados_Operacionais_Maio_2024.xlsx', date: '2024-05-10', status: 'completed', records: 145 },
    { id: 2, name: 'Auditoria_Q1_2024.csv', date: '2024-04-15', status: 'completed', records: 78 },
    { id: 3, name: 'Comprovantes_Marco_2024.xlsx', date: '2024-03-22', status: 'completed', records: 56 }
  ]);

  const handleFileUpload = (e: React.FormEvent) => {
    e.preventDefault();
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      setUploading(true);
      
      // Simulate upload progress
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 5;
        setProgress(currentProgress);
        
        if (currentProgress >= 100) {
          clearInterval(interval);
          setUploading(false);
          setProgress(0);
          
          toast({
            title: "Arquivo importado com sucesso",
            description: `${fileInput.files[0].name} foi importado com sucesso.`,
          });
          
          // Add new import to the list
          setRecentImports(prev => [
            {
              id: Date.now(),
              name: fileInput.files[0].name,
              date: new Date().toISOString().split('T')[0],
              status: 'completed',
              records: Math.floor(Math.random() * 100) + 50
            },
            ...prev
          ]);
          
          // Reset file input
          fileInput.value = "";
        }
      }, 200);
    } else {
      toast({
        title: "Nenhum arquivo selecionado",
        description: "Por favor, selecione um arquivo para importar.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Importação de Dados Operacionais</h1>
      
      <Tabs defaultValue="importar" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="importar">Importar Dados</TabsTrigger>
          <TabsTrigger value="historico">Histórico de Importações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="importar">
          <Card>
            <CardHeader>
              <CardTitle>Importar Dados Operacionais</CardTitle>
              <CardDescription>
                Faça upload de arquivos Excel, CSV ou PDF contendo dados operacionais.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFileUpload}>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 text-center">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <Upload className="h-12 w-12 text-gray-400" />
                    <div>
                      <p className="text-lg font-medium">Arraste e solte arquivos aqui</p>
                      <p className="text-sm text-gray-500">ou clique para selecionar arquivos</p>
                    </div>
                    <input 
                      type="file" 
                      id="file-upload" 
                      className="hidden" 
                      accept=".xlsx,.xls,.csv,.pdf" 
                      disabled={uploading}
                    />
                    <Button 
                      type="button" 
                      onClick={() => document.getElementById('file-upload')?.click()}
                      disabled={uploading}
                    >
                      Selecionar Arquivo
                    </Button>
                  </div>
                </div>
                
                {uploading && (
                  <div className="mb-6">
                    <p className="mb-2">Enviando arquivo... {progress}%</p>
                    <Progress value={progress} />
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Formatos suportados: .xlsx, .csv, .pdf</p>
                    <p className="text-sm text-gray-500">Tamanho máximo: 10MB</p>
                  </div>
                  <Button type="submit" disabled={uploading}>
                    {uploading ? "Enviando..." : "Importar Dados"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="historico">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Importações</CardTitle>
              <CardDescription>
                Veja o histórico de todas as importações de dados operacionais.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-5 bg-slate-50 p-4 font-medium">
                  <div>Nome do Arquivo</div>
                  <div>Data de Importação</div>
                  <div>Status</div>
                  <div>Registros</div>
                  <div>Ações</div>
                </div>
                
                {recentImports.length > 0 ? (
                  <div className="divide-y">
                    {recentImports.map((item) => (
                      <div key={item.id} className="grid grid-cols-5 p-4 hover:bg-slate-50">
                        <div className="flex items-center gap-2">
                          <FileType size={18} className="text-blue-500" />
                          {item.name}
                        </div>
                        <div className="flex items-center">{item.date}</div>
                        <div className="flex items-center">
                          <span className="flex items-center text-green-600">
                            <CheckCircle2 size={16} className="mr-1" /> {item.status}
                          </span>
                        </div>
                        <div className="flex items-center">{item.records}</div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">Visualizar</Button>
                          <Button variant="outline" size="sm">Reprocessar</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    Nenhuma importação encontrada
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OperationalImport;
