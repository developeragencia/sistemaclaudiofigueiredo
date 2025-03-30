
import React, { useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertTriangle, ArrowRight, CheckCircle2, Mail, RotateCw } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Create a schema for form validation with more specific messages
const formSchema = z.object({
  email: z.string()
    .email("Por favor, insira um endereço de email válido.")
    .min(1, "Email é obrigatório."),
});

type FormData = z.infer<typeof formSchema>;

const PasswordReset: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [attemptCount, setAttemptCount] = useState<number>(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Initialize form with react-hook-form and zod validation
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    }
  });

  const handleFormSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      
      // Increment attempt counter for UX feedback
      setAttemptCount(prev => prev + 1);
      
      // Here we would integrate with the actual password reset API
      // For now, we'll simulate a successful password reset request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Solicitação enviada com sucesso",
        description: "Enviamos um email com instruções para redefinir sua senha.",
        variant: "success",
      });
      
      setEmailSent(true);
    } catch (err) {
      console.error('Password reset error:', err);
      toast({
        title: "Erro na solicitação",
        description: "Não foi possível processar sua solicitação. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  const handleTryAgain = () => {
    setEmailSent(false);
    form.reset();
  };

  return (
    <Card className="shadow-lg border-sky-100 w-full max-w-md">
      <CardHeader className="bg-sky-50/50 space-y-1">
        <CardTitle className="text-sky-800 text-2xl text-center">Redefinir Senha</CardTitle>
        <CardDescription className="text-center text-sky-600">
          {emailSent 
            ? "Verifique seu email para instruções de redefinição" 
            : "Digite seu email para receber instruções de redefinição de senha"}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-6">
        {!emailSent ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sky-800 font-medium">
                      <Mail className="h-4 w-4" />
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        className="border-sky-200 focus:border-sky-400 focus:ring-sky-300 transition-colors"
                        placeholder="seu-email@exemplo.com"
                        disabled={isSubmitting}
                        autoComplete="email"
                        autoFocus
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-destructive flex items-center gap-1">
                      {form.formState.errors.email && (
                        <>
                          <AlertTriangle className="h-3 w-3" />
                          {form.formState.errors.email.message}
                        </>
                      )}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {attemptCount > 1 && (
                <Alert className="bg-amber-50 text-amber-700 border-amber-200">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Você tentou redefinir sua senha várias vezes. Verifique sua caixa de spam se não recebeu o email anterior.
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex flex-col gap-3">
                <Button 
                  type="submit" 
                  className="w-full bg-sky-600 hover:bg-sky-700 transition-colors shadow"
                  disabled={isSubmitting || !form.formState.isValid}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <RotateCw className="h-4 w-4 mr-2 animate-spin" />
                      Enviando...
                    </span>
                  ) : (
                    <>
                      Enviar Instruções
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
                
                <Button 
                  type="button" 
                  variant="ghost" 
                  className="text-sky-600 hover:text-sky-800"
                  onClick={handleBackToLogin}
                >
                  Voltar para o Login
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
            <p className="text-muted-foreground">
              Se o email estiver cadastrado em nosso sistema, você receberá um link para redefinir sua senha em breve.
            </p>
            <div className="flex flex-col mt-4 space-y-2">
              <Button 
                onClick={handleTryAgain}
                variant="outline" 
                className="border-sky-200 text-sky-700 hover:bg-sky-50"
              >
                Tentar com outro email
              </Button>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col space-y-4">
        <div className="text-center w-full">
          <Link to="/">
            <Button 
              type="button" 
              variant="ghost" 
              className="text-sky-600 hover:text-sky-800 mx-auto"
            >
              Voltar para Home
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PasswordReset;
