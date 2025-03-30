
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Shield, Lock, Bell, UserCog, History, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/contexts/AuthContext";

export default function SecuritySettings() {
  const { toast } = useToast();
  const { userEmail } = useAuth();
  
  // Two-factor authentication state
  const [twoFactorEnabled, setTwoFactorEnabled] = useState<boolean>(false);
  const [twoFactorStep, setTwoFactorStep] = useState<number>(1);
  const [verificationCode, setVerificationCode] = useState<string>("");
  
  // Session settings
  const [sessionTimeout, setSessionTimeout] = useState<number>(30);
  const [remoteLogout, setRemoteLogout] = useState<boolean>(true);
  
  // Login attempt settings
  const [maxLoginAttempts, setMaxLoginAttempts] = useState<string>("5");
  const [lockoutDuration, setLockoutDuration] = useState<string>("30");
  const [emailAlerts, setEmailAlerts] = useState<boolean>(true);

  // Mock active sessions data
  const activeSessions = [
    { id: 1, device: "Chrome em Windows 10", location: "São Paulo, Brasil", ipAddress: "189.103.xx.xx", lastActive: "Agora" },
    { id: 2, device: "Firefox em macOS", location: "Rio de Janeiro, Brasil", ipAddress: "201.17.xx.xx", lastActive: "4 horas atrás" },
    { id: 3, device: "Safari em iPhone", location: "Belo Horizonte, Brasil", ipAddress: "177.92.xx.xx", lastActive: "1 dia atrás" },
  ];
  
  const handleEnableTwoFactor = () => {
    if (twoFactorStep === 1) {
      // In a real implementation, this would generate and send a QR code
      setTwoFactorStep(2);
      toast({
        title: "Código QR enviado",
        description: "Verifique seu email para encontrar o código QR para configuração.",
        variant: "default",
      });
    } else {
      // Verify the code entered by the user
      if (verificationCode === "123456") {  // Mock verification for demo
        setTwoFactorEnabled(true);
        setTwoFactorStep(1);
        toast({
          title: "2FA ativado com sucesso",
          description: "A autenticação de dois fatores foi ativada para sua conta.",
          variant: "default",
        });
      } else {
        toast({
          title: "Código inválido",
          description: "O código informado é inválido. Por favor, tente novamente.",
          variant: "destructive",
        });
      }
    }
  };
  
  const handleDisableTwoFactor = () => {
    setTwoFactorEnabled(false);
    toast({
      title: "2FA desativado",
      description: "A autenticação de dois fatores foi desativada para sua conta.",
      variant: "default",
    });
  };
  
  const handleSessionSettingsSave = () => {
    toast({
      title: "Configurações salvas",
      description: "As configurações de sessão foram atualizadas com sucesso.",
      variant: "default",
    });
  };
  
  const handleLogoutSession = (id: number) => {
    toast({
      title: "Sessão encerrada",
      description: "A sessão selecionada foi encerrada com sucesso.",
      variant: "default",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-sky-800">Segurança e Auditoria</h1>
      </div>

      <Tabs defaultValue="2fa" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="2fa">Autenticação de 2 Fatores</TabsTrigger>
          <TabsTrigger value="sessions">Gerenciamento de Sessões</TabsTrigger>
          <TabsTrigger value="access">Controle de Acesso</TabsTrigger>
          <TabsTrigger value="logs">Registros de Atividade</TabsTrigger>
        </TabsList>

        {/* 2FA Tab */}
        <TabsContent value="2fa" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="text-sky-600" />
                Autenticação de Dois Fatores
              </CardTitle>
              <CardDescription>
                Adicione uma camada extra de segurança à sua conta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!twoFactorEnabled ? (
                <>
                  {twoFactorStep === 1 ? (
                    <div className="space-y-4">
                      <p>
                        A autenticação de dois fatores adiciona uma camada extra de segurança à sua conta, 
                        exigindo não apenas uma senha, mas também um código gerado por um aplicativo autenticador.
                      </p>
                      <div className="flex items-center space-x-2">
                        <Button 
                          onClick={handleEnableTwoFactor}
                          className="bg-sky-700 hover:bg-sky-800"
                        >
                          Configurar 2FA
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-4 bg-sky-50 border border-sky-200 rounded-md">
                        <p className="text-sm">
                          1. Escaneie o código QR com seu aplicativo autenticador<br/>
                          2. Digite o código de 6 dígitos gerado pelo aplicativo
                        </p>
                      </div>
                      <div className="flex flex-col space-y-4">
                        <Input
                          placeholder="Código de 6 dígitos"
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                          maxLength={6}
                        />
                        <div className="flex space-x-2">
                          <Button 
                            onClick={handleEnableTwoFactor}
                            className="bg-sky-700 hover:bg-sky-800"
                          >
                            Verificar
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={() => setTwoFactorStep(1)}
                          >
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-md flex items-center">
                    <Shield className="text-green-500 mr-2" />
                    <p className="text-green-700">
                      A autenticação de dois fatores está ativada para sua conta.
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={handleDisableTwoFactor}
                    className="border-red-300 text-red-600 hover:bg-red-50"
                  >
                    Desativar 2FA
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sessions Tab */}
        <TabsContent value="sessions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="text-sky-600" />
                Configurações de Sessão
              </CardTitle>
              <CardDescription>
                Configure o comportamento de sessões no sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Tempo limite de sessão (minutos)</Label>
                  <div className="flex items-center space-x-2">
                    <Slider
                      value={[sessionTimeout]}
                      min={5}
                      max={120}
                      step={5}
                      onValueChange={(value) => setSessionTimeout(value[0])}
                      className="flex-1"
                    />
                    <span className="w-12 text-right">{sessionTimeout}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="remote-logout"
                    checked={remoteLogout}
                    onCheckedChange={setRemoteLogout}
                  />
                  <Label htmlFor="remote-logout">Permitir logout remoto de sessões</Label>
                </div>
              </div>
              
              <Button 
                onClick={handleSessionSettingsSave}
                className="bg-sky-700 hover:bg-sky-800"
              >
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="text-sky-600" />
                Sessões Ativas
              </CardTitle>
              <CardDescription>
                Gerencie suas sessões ativas em diferentes dispositivos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Dispositivo</TableHead>
                    <TableHead>Localização</TableHead>
                    <TableHead>Endereço IP</TableHead>
                    <TableHead>Última Atividade</TableHead>
                    <TableHead className="text-right">Ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeSessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell>{session.device}</TableCell>
                      <TableCell>{session.location}</TableCell>
                      <TableCell>{session.ipAddress}</TableCell>
                      <TableCell>{session.lastActive}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleLogoutSession(session.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          Encerrar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Access Control Tab */}
        <TabsContent value="access" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCog className="text-sky-600" />
                Configurações de Acesso
              </CardTitle>
              <CardDescription>
                Configure políticas de segurança para tentativas de login
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Máximo de tentativas de login</Label>
                  <Select value={maxLoginAttempts} onValueChange={setMaxLoginAttempts}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 tentativas</SelectItem>
                      <SelectItem value="5">5 tentativas</SelectItem>
                      <SelectItem value="10">10 tentativas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Duração do bloqueio (minutos)</Label>
                  <Select value={lockoutDuration} onValueChange={setLockoutDuration}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutos</SelectItem>
                      <SelectItem value="30">30 minutos</SelectItem>
                      <SelectItem value="60">1 hora</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="email-alerts"
                    checked={emailAlerts}
                    onCheckedChange={setEmailAlerts}
                  />
                  <Label htmlFor="email-alerts">
                    Alertas por email para tentativas suspeitas
                  </Label>
                </div>
              </div>
              
              <Button 
                onClick={() => {
                  toast({
                    title: "Configurações salvas",
                    description: "As configurações de segurança foram atualizadas com sucesso.",
                    variant: "default",
                  });
                }}
                className="bg-sky-700 hover:bg-sky-800"
              >
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Logs Tab */}
        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="text-sky-600" />
                Registros de Atividade
              </CardTitle>
              <CardDescription>
                Visualize registros recentes de atividade em sua conta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Abaixo estão os registros recentes de atividade em sua conta. 
                    Verifique regularmente para identificar acessos não autorizados.
                  </p>
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data/Hora</TableHead>
                        <TableHead>Atividade</TableHead>
                        <TableHead>Endereço IP</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Hoje, 14:32</TableCell>
                        <TableCell>Login bem-sucedido</TableCell>
                        <TableCell>189.103.xx.xx</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Hoje, 10:15</TableCell>
                        <TableCell>Alteração de configurações</TableCell>
                        <TableCell>189.103.xx.xx</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Ontem, 18:45</TableCell>
                        <TableCell>Logout</TableCell>
                        <TableCell>189.103.xx.xx</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Ontem, 09:21</TableCell>
                        <TableCell>Login bem-sucedido</TableCell>
                        <TableCell>201.17.xx.xx</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
