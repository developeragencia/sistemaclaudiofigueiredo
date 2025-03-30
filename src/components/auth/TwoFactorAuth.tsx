
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { AlertCircle, KeyRound, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const TwoFactorAuth = () => {
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { userEmail } = useAuth();

  // Check if user is admin (admin@example.com) and redirect to dashboard if so
  useEffect(() => {
    if (userEmail?.includes('admin')) {
      toast({
        title: "Autenticação simplificada",
        description: "Usuários administradores não necessitam de 2FA.",
        variant: "default",
      });
      navigate('/dashboard');
    }
  }, [userEmail, navigate, toast]);

  // In a real app, this would verify against an actual 2FA service
  const verifyCode = async (code: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, any 6-digit code is valid
      if (code.length === 6 && /^\d+$/.test(code)) {
        toast({
          title: "Verificação concluída",
          description: "Autenticação de dois fatores bem-sucedida.",
          variant: "default",
        });
        navigate('/dashboard');
      } else {
        setError("Código inválido. Por favor, tente novamente.");
      }
    } catch (err) {
      setError("Erro ao verificar o código. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verifyCode(verificationCode);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="bg-sky-50/50 space-y-1">
        <CardTitle className="text-sky-800 flex items-center gap-2">
          <KeyRound className="h-5 w-5 text-sky-600" />
          Autenticação de Dois Fatores
        </CardTitle>
        <CardDescription>
          Entre o código enviado para seu dispositivo
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-sky-100 rounded-full">
              <Smartphone className="h-8 w-8 text-sky-600" />
            </div>
          </div>
          
          <p className="text-sm text-center mb-4">
            Um código de verificação foi enviado para {userEmail || "seu dispositivo registrado"}.
            Por favor, digite o código abaixo.
          </p>
          
          <div className="space-y-2">
            <Label htmlFor="verificationCode">Código de Verificação</Label>
            <InputOTP maxLength={6} value={verificationCode} onChange={setVerificationCode}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              <p className="text-sm">{error}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button 
            type="submit" 
            className="w-full bg-sky-600 hover:bg-sky-700" 
            disabled={isLoading || verificationCode.length < 6}
          >
            {isLoading ? "Verificando..." : "Verificar"}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            className="w-full" 
            onClick={() => navigate('/login')}
          >
            Voltar
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default TwoFactorAuth;
