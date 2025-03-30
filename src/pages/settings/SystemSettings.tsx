
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SystemSettings: React.FC = () => {
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    siteName: 'Sistema de Auditoria e Gestão Tributária',
    tagline: 'A plataforma completa para gestão tributária',
    siteDescription: 'Sistema especializado em auditoria e gestão tributária para empresas.',
    companyName: 'Alex Developer',
    companyURL: 'https://alexdesenvolvedor.com.br',
    timezone: 'America/Sao_Paulo',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    analyticsEnabled: true,
    maintenanceMode: false,
    debugMode: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean, name: string) => {
    setSettings(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Configurações atualizadas",
        description: "As configurações do sistema foram atualizadas com sucesso.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Erro ao atualizar configurações",
        description: "Ocorreu um erro ao atualizar as configurações.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900">Configurações do Sistema</h3>
        <p className="text-muted-foreground">
          Gerencie as configurações gerais do sistema.
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Informações do Site</CardTitle>
            <CardDescription>
              Configure as informações básicas do site.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="siteName">Nome do Site</Label>
                <Input
                  id="siteName"
                  name="siteName"
                  value={settings.siteName}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tagline">Slogan</Label>
                <Input
                  id="tagline"
                  name="tagline"
                  value={settings.tagline}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="siteDescription">Descrição do Site</Label>
              <Input
                id="siteDescription"
                name="siteDescription"
                value={settings.siteDescription}
                onChange={handleInputChange}
              />
            </div>
            
            <Separator />
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="companyName">Nome da Empresa</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={settings.companyName}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="companyURL">URL da Empresa</Label>
                <Input
                  id="companyURL"
                  name="companyURL"
                  value={settings.companyURL}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Localização e Formato</CardTitle>
            <CardDescription>
              Configure o fuso horário e formatos de data e hora.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="timezone">Fuso Horário</Label>
                <Select
                  value={settings.timezone}
                  onValueChange={(value) => handleSelectChange(value, 'timezone')}
                >
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Selecione o fuso horário" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/Sao_Paulo">América/São Paulo</SelectItem>
                    <SelectItem value="America/Recife">América/Recife</SelectItem>
                    <SelectItem value="America/Manaus">América/Manaus</SelectItem>
                    <SelectItem value="America/Belem">América/Belém</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dateFormat">Formato de Data</Label>
                <Select
                  value={settings.dateFormat}
                  onValueChange={(value) => handleSelectChange(value, 'dateFormat')}
                >
                  <SelectTrigger id="dateFormat">
                    <SelectValue placeholder="Selecione o formato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="timeFormat">Formato de Hora</Label>
                <Select
                  value={settings.timeFormat}
                  onValueChange={(value) => handleSelectChange(value, 'timeFormat')}
                >
                  <SelectTrigger id="timeFormat">
                    <SelectValue placeholder="Selecione o formato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12h">12 horas (AM/PM)</SelectItem>
                    <SelectItem value="24h">24 horas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Configurações Avançadas</CardTitle>
            <CardDescription>
              Configurações avançadas do sistema.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="analyticsEnabled" 
                checked={settings.analyticsEnabled}
                onCheckedChange={(checked) => 
                  handleCheckboxChange(!!checked, 'analyticsEnabled')
                }
              />
              <Label htmlFor="analyticsEnabled">Habilitar Analytics</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="maintenanceMode" 
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => 
                  handleCheckboxChange(!!checked, 'maintenanceMode')
                }
              />
              <Label htmlFor="maintenanceMode">Modo de Manutenção</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="debugMode" 
                checked={settings.debugMode}
                onCheckedChange={(checked) => 
                  handleCheckboxChange(!!checked, 'debugMode')
                }
              />
              <Label htmlFor="debugMode">Modo de Debug</Label>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Salvar configurações
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default SystemSettings;
