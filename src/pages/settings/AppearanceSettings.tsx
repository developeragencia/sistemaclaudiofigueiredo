
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle, Check, Loader2, Upload } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ColorPicker } from '@/components/settings/ColorPicker';

const AppearanceSettings: React.FC = () => {
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [settings, setSettings] = useState({
    theme: 'light',
    primaryColor: '#0369a1',
    secondaryColor: '#0ea5e9',
    logoUrl: '/public/logo-advogados.svg',
    faviconUrl: '/favicon.svg',
  });

  const handleColorChange = (color: string, type: 'primaryColor' | 'secondaryColor') => {
    setSettings(prev => ({ ...prev, [type]: color }));
  };

  const handleThemeChange = (value: string) => {
    setSettings(prev => ({ ...prev, theme: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'logoUrl' | 'faviconUrl') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // In a real app, you'd upload this to storage
    const reader = new FileReader();
    reader.onload = () => {
      setSettings(prev => ({ ...prev, [type]: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Aparência atualizada",
        description: "As configurações de aparência foram atualizadas com sucesso.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Erro ao atualizar aparência",
        description: "Ocorreu um erro ao atualizar as configurações de aparência.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreview = () => {
    setIsPreviewing(true);
    
    // In a real app, you'd update the theme and styles dynamically
    setTimeout(() => {
      setIsPreviewing(false);
      toast({
        title: "Visualização ativada",
        description: "As alterações estão sendo exibidas temporariamente.",
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900">Aparência</h3>
        <p className="text-muted-foreground">
          Personalize a aparência visual do sistema.
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tema</CardTitle>
              <CardDescription>
                Escolha um tema para o sistema.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={settings.theme}
                onValueChange={handleThemeChange}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              >
                <div className={`
                  flex flex-col items-center border rounded-lg p-4 
                  ${settings.theme === 'light' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
                `}>
                  <div className="h-24 w-full bg-white border rounded-md mb-2"></div>
                  <RadioGroupItem value="light" id="theme-light" className="sr-only" />
                  <Label htmlFor="theme-light">Claro</Label>
                </div>
                
                <div className={`
                  flex flex-col items-center border rounded-lg p-4 
                  ${settings.theme === 'dark' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
                `}>
                  <div className="h-24 w-full bg-gray-900 border rounded-md mb-2"></div>
                  <RadioGroupItem value="dark" id="theme-dark" className="sr-only" />
                  <Label htmlFor="theme-dark">Escuro</Label>
                </div>
                
                <div className={`
                  flex flex-col items-center border rounded-lg p-4 
                  ${settings.theme === 'system' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
                `}>
                  <div className="h-24 w-full bg-gradient-to-r from-white to-gray-900 border rounded-md mb-2"></div>
                  <RadioGroupItem value="system" id="theme-system" className="sr-only" />
                  <Label htmlFor="theme-system">Sistema</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Cores</CardTitle>
              <CardDescription>
                Personalize as cores principais do sistema.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Cor primária</Label>
                <ColorPicker 
                  value={settings.primaryColor}
                  onChange={(color) => handleColorChange(color, 'primaryColor')}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Cor secundária</Label>
                <ColorPicker 
                  value={settings.secondaryColor}
                  onChange={(color) => handleColorChange(color, 'secondaryColor')}
                />
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="text-sm text-gray-500 mb-3 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                  Visualização das cores selecionadas
                </div>
                <div className="flex flex-wrap gap-4">
                  <div 
                    className="h-10 w-24 rounded" 
                    style={{ backgroundColor: settings.primaryColor }}
                  ></div>
                  <div 
                    className="h-10 w-24 rounded" 
                    style={{ backgroundColor: settings.secondaryColor }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Logo e Favicon</CardTitle>
              <CardDescription>
                Atualize o logo e favicon do sistema.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="logo">Logo</Label>
                  <div className="bg-gray-50 border p-4 rounded-md flex justify-center items-center h-32">
                    <img 
                      src={settings.logoUrl} 
                      alt="Logo" 
                      className="max-h-full" 
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Input
                      id="logo"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'logoUrl')}
                    />
                    <Button type="button" size="icon" variant="outline">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="favicon">Favicon</Label>
                  <div className="bg-gray-50 border p-4 rounded-md flex justify-center items-center h-32">
                    <img 
                      src={settings.faviconUrl} 
                      alt="Favicon" 
                      className="max-h-16" 
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Input
                      id="favicon"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'faviconUrl')}
                    />
                    <Button type="button" size="icon" variant="outline">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handlePreview}
              disabled={isPreviewing || isLoading}
            >
              {isPreviewing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Visualizar alterações
            </Button>
            
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Salvar alterações
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AppearanceSettings;
