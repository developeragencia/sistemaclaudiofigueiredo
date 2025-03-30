
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { Clock, Lock, LogOut, AlertCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const SessionExpiration = () => {
  const { toast } = useToast();
  const [sessionTimeout, setSessionTimeout] = useState<number>(30);
  const [autoExtendSession, setAutoExtendSession] = useState<boolean>(true);
  const [remoteLogout, setRemoteLogout] = useState<boolean>(true);
  const [idleDetection, setIdleDetection] = useState<boolean>(false);

  const handleSessionSettingsSave = () => {
    toast({
      title: "Configurações Salvas",
      description: `Tempo de sessão configurado para ${sessionTimeout} minutos.`,
      variant: "default",
    });
  };

  const handleLogoutSession = (id: number) => {
    toast({
      title: "Sessão Encerrada",
      description: "A sessão foi encerrada com sucesso.",
      variant: "default",
    });
  };

  // Mock active sessions data
  const activeSessions = [
    { id: 1, device: "Chrome em Windows 10", location: "São Paulo, Brasil", ipAddress: "189.103.xx.xx", lastActive: "Agora" },
    { id: 2, device: "Firefox em macOS", location: "Rio de Janeiro, Brasil", ipAddress: "201.17.xx.xx", lastActive: "4 horas atrás" },
    { id: 3, device: "Safari em iPhone", location: "Belo Horizonte, Brasil", ipAddress: "177.92.xx.xx", lastActive: "1 dia atrás" },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="text-blue-600" />
            Configurações de Expiração de Sessão
          </CardTitle>
          <CardDescription>
            Defina quanto tempo uma sessão permanece ativa
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-100 rounded-md p-4 text-blue-800 text-sm">
              <div className="flex gap-2 items-start">
                <AlertCircle className="h-5 w-5 mt-0.5 text-blue-500" />
                <p>
                  Configurar um tempo de expiração de sessão adequado é uma prática recomendada de segurança. 
                  Isso limita o tempo que uma sessão permanece ativa, reduzindo o risco em caso de acesso não autorizado.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Tempo limite de sessão</Label>
                  <span className="text-sm font-medium">{sessionTimeout} minutos</span>
                </div>
                <Slider
                  value={[sessionTimeout]}
                  min={5}
                  max={120}
                  step={5}
                  onValueChange={(value) => setSessionTimeout(value[0])}
                  className="w-full"
                />
              </div>
              
              <div className="flex items-center justify-between space-x-2 py-2">
                <Label htmlFor="auto-extend" className="flex-1 cursor-pointer">
                  Estender sessão automaticamente durante uso ativo
                </Label>
                <Switch
                  id="auto-extend"
                  checked={autoExtendSession}
                  onCheckedChange={setAutoExtendSession}
                />
              </div>
              
              <div className="flex items-center justify-between space-x-2 py-2">
                <Label htmlFor="idle-detection" className="flex-1 cursor-pointer">
                  Detecção de inatividade (logout automático)
                </Label>
                <Switch
                  id="idle-detection"
                  checked={idleDetection}
                  onCheckedChange={setIdleDetection}
                />
              </div>
              
              <div className="flex items-center justify-between space-x-2 py-2">
                <Label htmlFor="remote-logout" className="flex-1 cursor-pointer">
                  Permitir encerrar outras sessões remotamente
                </Label>
                <Switch
                  id="remote-logout"
                  checked={remoteLogout}
                  onCheckedChange={setRemoteLogout}
                />
              </div>
            </div>
            
            <Button 
              onClick={handleSessionSettingsSave}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Salvar Configurações
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="text-blue-600" />
            Sessões Ativas
          </CardTitle>
          <CardDescription>
            Visualize e gerencie suas sessões ativas em diferentes dispositivos
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
                  <TableCell className="font-medium">{session.device}</TableCell>
                  <TableCell>{session.location}</TableCell>
                  <TableCell>{session.ipAddress}</TableCell>
                  <TableCell>{session.lastActive}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleLogoutSession(session.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 flex items-center gap-1"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Encerrar</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SessionExpiration;
