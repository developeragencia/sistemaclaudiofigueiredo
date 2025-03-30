
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Shield, ShieldAlert, Lock, AlertTriangle } from "lucide-react";

const AccessProtection = () => {
  const { toast } = useToast();
  const [maxLoginAttempts, setMaxLoginAttempts] = useState<string>("5");
  const [lockoutDuration, setLockoutDuration] = useState<string>("30");
  const [requirePasswordChange, setRequirePasswordChange] = useState<string>("90");
  const [emailAlerts, setEmailAlerts] = useState<boolean>(true);
  const [blockedIps, setBlockedIps] = useState<string>("");
  const [ipBlocklist, setIpBlocklist] = useState<string[]>([
    "192.168.1.100", 
    "45.123.45.67"
  ]);

  const handleSaveSettings = () => {
    toast({
      title: "Configurações Salvas",
      description: "As configurações de proteção de acesso foram atualizadas com sucesso.",
      variant: "default",
    });
  };

  const handleAddBlockedIp = () => {
    if (blockedIps.trim()) {
      setIpBlocklist([...ipBlocklist, blockedIps.trim()]);
      setBlockedIps("");
      toast({
        title: "IP Bloqueado",
        description: `O endereço IP ${blockedIps.trim()} foi adicionado à lista de bloqueio.`,
        variant: "default",
      });
    }
  };

  const handleRemoveBlockedIp = (ip: string) => {
    setIpBlocklist(ipBlocklist.filter(item => item !== ip));
    toast({
      title: "IP Removido",
      description: `O endereço IP ${ip} foi removido da lista de bloqueio.`,
      variant: "default",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldAlert className="text-blue-600" />
            Políticas de Acesso
          </CardTitle>
          <CardDescription>
            Configure políticas de segurança para tentativas de login e proteção contra ataques
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="grid gap-6 sm:grid-cols-2">
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
                <p className="text-xs text-muted-foreground">
                  Número máximo de tentativas falhas de login antes de bloquear a conta
                </p>
              </div>
              
              <div className="space-y-2">
                <Label>Duração do bloqueio</Label>
                <Select value={lockoutDuration} onValueChange={setLockoutDuration}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutos</SelectItem>
                    <SelectItem value="30">30 minutos</SelectItem>
                    <SelectItem value="60">1 hora</SelectItem>
                    <SelectItem value="1440">24 horas</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Tempo que a conta permanece bloqueada após tentativas falhas
                </p>
              </div>
              
              <div className="space-y-2">
                <Label>Alteração de senha obrigatória</Label>
                <Select value={requirePasswordChange} onValueChange={setRequirePasswordChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 dias</SelectItem>
                    <SelectItem value="60">60 dias</SelectItem>
                    <SelectItem value="90">90 dias</SelectItem>
                    <SelectItem value="180">180 dias</SelectItem>
                    <SelectItem value="0">Nunca</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Intervalo para forçar alteração de senha
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between pt-2">
                  <Label htmlFor="email-alerts" className="cursor-pointer">
                    Alertas por email para tentativas suspeitas
                  </Label>
                  <Switch
                    id="email-alerts"
                    checked={emailAlerts}
                    onCheckedChange={setEmailAlerts}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Enviar alertas por email quando tentativas suspeitas forem detectadas
                </p>
              </div>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-amber-800">Atenção</h4>
                  <p className="text-xs text-amber-700 mt-1">
                    Configurações muito restritivas podem impedir usuários legítimos de acessar o sistema. 
                    Recomendamos testar as configurações antes de aplicar em produção.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="text-blue-600" />
            Lista de IPs Bloqueados
          </CardTitle>
          <CardDescription>
            Bloqueie o acesso de endereços IP específicos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Endereço IP"
                value={blockedIps}
                onChange={(e) => setBlockedIps(e.target.value)}
              />
              <Button 
                onClick={handleAddBlockedIp} 
                className="bg-blue-600 hover:bg-blue-700"
              >
                Adicionar
              </Button>
            </div>
            
            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-slate-50/80">
                    <th className="p-2 text-left text-sm font-medium text-slate-700">Endereço IP</th>
                    <th className="p-2 text-right text-sm font-medium text-slate-700">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {ipBlocklist.length > 0 ? (
                    ipBlocklist.map((ip, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2 text-sm">{ip}</td>
                        <td className="p-2 text-right">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleRemoveBlockedIp(ip)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            Remover
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2} className="p-4 text-center text-sm text-muted-foreground">
                        Nenhum IP bloqueado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <Button 
              onClick={handleSaveSettings}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Salvar Configurações
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessProtection;
