
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Database, Lock, Download, Share2, Server, Shield, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DatabaseSettings: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('connection');
  
  const handleSaveConnection = () => {
    toast({
      title: "Configurações salvas",
      description: "As configurações de conexão com o banco de dados foram salvas com sucesso.",
      variant: "default",
    });
  };
  
  const handleRunBackup = () => {
    toast({
      title: "Backup iniciado",
      description: "O backup do banco de dados foi iniciado. Você será notificado quando estiver completo.",
      variant: "default",
    });
    
    // Simulate backup completion
    setTimeout(() => {
      toast({
        title: "Backup concluído",
        description: "O backup do banco de dados foi concluído com sucesso.",
        variant: "default",
      });
    }, 3000);
  };
  
  const handleRestoreBackup = () => {
    toast({
      title: "Restauração iniciada",
      description: "A restauração do banco de dados foi iniciada. Você será notificado quando estiver completa.",
      variant: "default",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900">Configurações do Banco de Dados</h3>
        <p className="text-muted-foreground">
          Gerencie as configurações de conexão e manutenção do banco de dados.
        </p>
      </div>
      
      <Alert variant="default" className="bg-blue-50 border-blue-200">
        <AlertCircle className="h-4 w-4 text-blue-600" />
        <AlertTitle className="text-blue-800">Atenção</AlertTitle>
        <AlertDescription className="text-blue-700">
          Alterações nas configurações do banco de dados podem afetar o funcionamento da aplicação.
          Certifique-se de que você sabe o que está fazendo.
        </AlertDescription>
      </Alert>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="connection">
            <Server className="h-4 w-4 mr-2" />
            Conexão
          </TabsTrigger>
          <TabsTrigger value="backup">
            <Download className="h-4 w-4 mr-2" />
            Backup e Restauração
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            Segurança
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="connection" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Conexão</CardTitle>
              <CardDescription>
                Configure os parâmetros de conexão com o banco de dados.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="db-type">Tipo de Banco de Dados</Label>
                <Select defaultValue="mysql">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de banco de dados" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mysql">MySQL</SelectItem>
                    <SelectItem value="postgresql">PostgreSQL</SelectItem>
                    <SelectItem value="oracle">Oracle</SelectItem>
                    <SelectItem value="sqlserver">SQL Server</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="db-host">Host</Label>
                <Input id="db-host" placeholder="localhost" defaultValue="localhost" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="db-port">Porta</Label>
                <Input id="db-port" placeholder="3306" defaultValue="3306" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="db-name">Nome do Banco de Dados</Label>
                <Input id="db-name" placeholder="meu_banco" defaultValue="app_database" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="db-user">Usuário</Label>
                <Input id="db-user" placeholder="root" defaultValue="app_user" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="db-password">Senha</Label>
                <Input id="db-password" type="password" defaultValue="********" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveConnection} className="ml-auto">
                Salvar Configurações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="backup" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Backup do Banco de Dados</CardTitle>
              <CardDescription>
                Crie e gerencie backups do seu banco de dados.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Diretório de Backup</Label>
                <div className="flex gap-2">
                  <Input defaultValue="/var/app/backups/" className="flex-1" />
                  <Button variant="outline">Explorar</Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Frequência de Backup Automático</Label>
                <Select defaultValue="daily">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a frequência" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">A cada hora</SelectItem>
                    <SelectItem value="daily">Diário</SelectItem>
                    <SelectItem value="weekly">Semanal</SelectItem>
                    <SelectItem value="monthly">Mensal</SelectItem>
                    <SelectItem value="never">Desativado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Compressão de Backup</Label>
                <Select defaultValue="gzip">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de compressão" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Sem compressão</SelectItem>
                    <SelectItem value="gzip">gzip</SelectItem>
                    <SelectItem value="zip">zip</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Retenção de Backups</Label>
                <Select defaultValue="30">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o período de retenção" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 dias</SelectItem>
                    <SelectItem value="30">30 dias</SelectItem>
                    <SelectItem value="90">90 dias</SelectItem>
                    <SelectItem value="365">365 dias</SelectItem>
                    <SelectItem value="forever">Para sempre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={handleRunBackup} className="gap-1">
                  <Download className="h-4 w-4" />
                  Criar Backup Agora
                </Button>
                <Button variant="outline" className="gap-1">
                  <Share2 className="h-4 w-4" />
                  Exportar Backup
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Restauração de Backup</CardTitle>
              <CardDescription>
                Restaure o banco de dados a partir de um backup existente.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant="default" className="bg-amber-50 border-amber-200">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <AlertTitle className="text-amber-800">Atenção</AlertTitle>
                <AlertDescription className="text-amber-700">
                  A restauração de backup irá substituir todos os dados atuais no banco de dados.
                  Este processo não pode ser desfeito.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-2">
                <Label>Selecione um backup para restaurar</Label>
                <Select defaultValue="latest">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um backup" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latest">Último backup (04/05/2023 15:30)</SelectItem>
                    <SelectItem value="backup1">03/05/2023 10:15</SelectItem>
                    <SelectItem value="backup2">02/05/2023 09:00</SelectItem>
                    <SelectItem value="backup3">01/05/2023 12:45</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="upload-backup">Ou faça upload de um arquivo de backup</Label>
                <Input id="upload-backup" type="file" />
              </div>
              
              <Button onClick={handleRestoreBackup} variant="destructive" className="gap-1">
                <Database className="h-4 w-4" />
                Restaurar Backup
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Segurança do Banco de Dados</CardTitle>
              <CardDescription>
                Configure opções de segurança para o seu banco de dados.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Criptografia de Dados</Label>
                <Select defaultValue="aes">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de criptografia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Desativada</SelectItem>
                    <SelectItem value="aes">AES-256</SelectItem>
                    <SelectItem value="tls">TLS/SSL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>IP Whitelist</Label>
                <Input placeholder="127.0.0.1, 192.168.1.0/24" />
                <p className="text-xs text-muted-foreground mt-1">
                  Separe múltiplos IPs ou redes com vírgulas
                </p>
              </div>
              
              <div className="space-y-2">
                <Label>Nível de Log de Segurança</Label>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o nível de log" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baixo (apenas erros)</SelectItem>
                    <SelectItem value="medium">Médio (erros e acessos)</SelectItem>
                    <SelectItem value="high">Alto (todas as operações)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button className="gap-1">
                <Lock className="h-4 w-4" />
                Salvar Configurações de Segurança
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DatabaseSettings;
