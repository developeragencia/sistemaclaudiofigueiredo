
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
}

// Create a schema for form validation
const formSchema = z.object({
  email: z.string().email("Por favor, insira um email válido.").min(1, "Email é obrigatório."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
  rememberMe: z.boolean().default(false)
});

type FormData = z.infer<typeof formSchema>;

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Initialize form with react-hook-form and zod validation
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    mode: 'onChange' // Validate on change for better user experience
  });

  // Load remembered credentials on mount if they exist
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    const rememberedPassword = localStorage.getItem('rememberedPassword');
    
    if (rememberedEmail && rememberedPassword) {
      form.setValue('email', rememberedEmail);
      form.setValue('password', rememberedPassword);
      form.setValue('rememberMe', true);
    }
  }, [form]);
  
  const handleFormSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      // Store or remove credentials based on rememberMe
      if (data.rememberMe) {
        localStorage.setItem('rememberedEmail', data.email);
        localStorage.setItem('rememberedPassword', data.password);
      } else {
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberedPassword');
      }
      
      await onSubmit(data.email, data.password);
    } catch (err) {
      console.error('Login error:', err);
      setError('Erro ao realizar login. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sky-800 font-medium">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  className="border-sky-200 focus:border-sky-400"
                  placeholder="seu-email@exemplo.com"
                  autoComplete="email"
                  disabled={isSubmitting}
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
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sky-800 font-medium">
                Senha
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  className="border-sky-200 focus:border-sky-400"
                  placeholder="Sua senha"
                  autoComplete="current-password"
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage className="text-sm text-destructive flex items-center gap-1">
                {form.formState.errors.password && (
                  <>
                    <AlertTriangle className="h-3 w-3" />
                    {form.formState.errors.password.message}
                  </>
                )}
              </FormMessage>
            </FormItem>
          )}
        />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    className="rounded border-sky-300 text-sky-600"
                  />
                  <Label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                    Lembrar-me
                  </Label>
                </div>
              )}
            />
          </div>
          
          <Link 
            to="/reset-password" 
            className="text-sm font-medium text-sky-600 hover:text-sky-800"
          >
            Esqueceu a senha?
          </Link>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <p className="text-sm">{error}</p>
          </div>
        )}
        
        {form.formState.isValid && form.formState.isDirty && !error && (
          <div className="bg-green-50 text-green-700 p-3 rounded-md flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            <p className="text-sm">Dados válidos! Pronto para entrar.</p>
          </div>
        )}
      
        <Button 
          type="submit" 
          className="w-full bg-sky-600 hover:bg-sky-700" 
          disabled={isSubmitting || (!form.formState.isValid && form.formState.isDirty)}
        >
          {isSubmitting ? "Entrando..." : "Entrar"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
