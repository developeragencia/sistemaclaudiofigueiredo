
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Shield, Smartphone, QrCode, Check, AlertCircle } from "lucide-react";

const TwoFactorAuth = () => {
  const { toast } = useToast();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState<boolean>(false);
  const [setupStep, setSetupStep] = useState<number>(0);
  const [verificationCode, setVerificationCode] = useState<string>("");

  const handleEnable2FA = () => {
    setSetupStep(1);
    toast({
      title: "Configuração Iniciada",
      description: "Escaneie o código QR com o seu aplicativo autenticador.",
      variant: "default",
    });
  };

  const handleVerifyCode = () => {
    if (verificationCode.length !== 6) {
      toast({
        title: "Código Inválido",
        description: "O código deve conter 6 dígitos.",
        variant: "destructive",
      });
      return;
    }

    // Simulate verification (in a real app, this would validate against the server)
    // For demo purposes, we'll accept any 6-digit code
    setTwoFactorEnabled(true);
    setSetupStep(2);
    toast({
      title: "2FA Ativado com Sucesso",
      description: "A autenticação de dois fatores foi ativada para sua conta.",
      variant: "default",
    });
  };

  const handleDisable2FA = () => {
    setTwoFactorEnabled(false);
    setSetupStep(0);
    setVerificationCode("");
    toast({
      title: "2FA Desativado",
      description: "A autenticação de dois fatores foi desativada.",
      variant: "default",
    });
  };

  const handleGenerateRecoveryCodes = () => {
    toast({
      title: "Códigos de Recuperação",
      description: "Os códigos de recuperação foram gerados e enviados para seu email.",
      variant: "default",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="text-blue-600" />
            Autenticação de Dois Fatores (2FA)
          </CardTitle>
          <CardDescription>
            Adicione uma camada extra de segurança à sua conta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!twoFactorEnabled ? (
            setupStep === 0 ? (
              <div className="space-y-6">
                <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-amber-800">
                  <div className="flex gap-2 items-start">
                    <AlertCircle className="h-5 w-5 mt-0.5 text-amber-500" />
                    <p className="text-sm">
                      A autenticação de dois fatores adiciona uma camada extra de segurança à sua conta,
                      exigindo não apenas uma senha, mas também um código temporário gerado por um aplicativo
                      autenticador como Google Authenticator, Microsoft Authenticator ou Authy.
                    </p>
                  </div>
                </div>
                <Button onClick={handleEnable2FA} className="bg-blue-600 hover:bg-blue-700">
                  Configurar 2FA
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex flex-col items-center space-y-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <QrCode className="h-12 w-12 text-blue-600" />
                  <div className="text-center">
                    <h3 className="font-medium">Escaneie o Código QR</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Abra seu aplicativo autenticador e escaneie o código QR abaixo
                    </p>
                  </div>
                  <div className="h-48 w-48 bg-white flex items-center justify-center border">
                    <p className="text-sm text-muted-foreground">Código QR de exemplo</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="verification-code">Digite o código de 6 dígitos</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="verification-code"
                      placeholder="000000"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                      className="font-mono text-center letter-spacing-1"
                      maxLength={6}
                    />
                    <Button onClick={handleVerifyCode} className="bg-blue-600 hover:bg-blue-700">
                      Verificar
                    </Button>
                  </div>
                </div>
              </div>
            )
          ) : (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-center gap-2 text-green-800">
                <Check className="h-5 w-5 text-green-600" />
                <span>A autenticação de dois fatores está ativada para sua conta.</span>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" onClick={handleGenerateRecoveryCodes}>
                  Gerar Códigos de Recuperação
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleDisable2FA} 
                  className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  Desativar 2FA
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="text-blue-600" />
            Atividade de Login
          </CardTitle>
          <CardDescription>
            Monitore tentativas recentes de login em sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-slate-50/80">
                    <th className="p-2 text-left text-sm font-medium text-slate-700">Data e Hora</th>
                    <th className="p-2 text-left text-sm font-medium text-slate-700">Status</th>
                    <th className="p-2 text-left text-sm font-medium text-slate-700">Endereço IP</th>
                    <th className="p-2 text-left text-sm font-medium text-slate-700">Localização</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2 text-sm">Hoje, 14:32</td>
                    <td className="p-2 text-sm">
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                        Sucesso
                      </span>
                    </td>
                    <td className="p-2 text-sm">189.103.xx.xx</td>
                    <td className="p-2 text-sm">São Paulo, Brasil</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 text-sm">Ontem, 18:45</td>
                    <td className="p-2 text-sm">
                      <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                        Falha
                      </span>
                    </td>
                    <td className="p-2 text-sm">201.17.xx.xx</td>
                    <td className="p-2 text-sm">Rio de Janeiro, Brasil</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TwoFactorAuth;
