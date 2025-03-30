
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { UserRole } from '@/types';
import LoginHeader from '@/components/auth/LoginHeader';
import LoginForm from '@/components/auth/LoginForm';
import LoginFooter from '@/components/auth/LoginFooter';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (email: string, password: string) => {
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const isAdminUser = email.includes('admin');
      
      // Determine user role
      const userRole: UserRole = email.includes('admin') 
        ? 'admin' 
        : email.includes('client') 
          ? 'client' 
          : email.includes('sales') 
            ? 'sales_rep' 
            : 'office_staff';

      // Check if the user requires 2FA (no longer required for admin users)
      if (!isAdminUser && email.includes('client')) {
        // Only redirect to 2FA for non-admin users
        toast({
          title: "Verificação adicional necessária",
          description: "Por favor, complete a autenticação de dois fatores.",
        });
        login(email, userRole); // Store login info for the 2FA component
        navigate('/2fa');
      } else {
        // For admin users or other roles, log in directly
        login(email, userRole);
        
        toast({
          title: "Login realizado com sucesso",
          description: `Bem-vindo de volta${isAdminUser ? ', Administrador' : ''}!`,
          variant: "default",
        });
        
        navigate('/dashboard');
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Erro de login",
        description: "Não foi possível realizar o login. Verifique suas credenciais.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-50 p-4">
      <div className="max-w-lg w-full">
        <LoginHeader />
        
        <Card className="shadow-md border-sky-100">
          <CardHeader className="bg-white space-y-1 border-b border-sky-100">
            <CardTitle className="text-sky-800 text-2xl text-center font-bold">Acesso ao Sistema</CardTitle>
          </CardHeader>
          
          <CardContent className="pt-6">
            <LoginForm onSubmit={handleLogin} />
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4 bg-white">
            <LoginFooter />
          </CardFooter>
        </Card>
        
        <div className="mt-6 flex justify-center">
          <Link to="/">
            <Button 
              variant="outline" 
              className="text-sky-600 border-sky-200 hover:bg-sky-50 hover:text-sky-700 flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Voltar para Home
            </Button>
          </Link>
        </div>
        
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>
            Desenvolvido por{" "}
            <a 
              href="https://alexdesenvolvedor.com.br" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sky-600 hover:text-sky-800 font-medium"
            >
              Alex Developer
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
