
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Check, Layout, Loader2, Monitor, PanelLeft, Smartphone, Tablet } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const LayoutSettings: React.FC = () => {
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [layouts, setLayouts] = useState({
    sidebar: {
      enabled: true,
      position: 'left',
      collapsible: true,
      defaultCollapsed: false,
    },
    header: {
      enabled: true,
      fixed: true,
      showLogo: true,
      showUserMenu: true,
    },
    footer: {
      enabled: true,
      showCredits: true,
      showSocialLinks: true,
    },
    responsive: {
      mobileMenuStyle: 'drawer',
      breakpoint: 'md',
    }
  });

  const handleSwitchChange = (checked: boolean, section: string, field: string) => {
    setLayouts(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: checked
      }
    }));
  };

  const handleSelectChange = (value: string, section: string, field: string) => {
    setLayouts(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Layout atualizado",
        description: "As configurações de layout foram atualizadas com sucesso.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Erro ao atualizar layout",
        description: "Ocorreu um erro ao atualizar as configurações de layout.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900">Configurações de Layout</h3>
        <p className="text-muted-foreground">
          Personalize a estrutura e layout do sistema.
        </p>
      </div>
      
      <Tabs defaultValue="desktop" className="space-y-6">
        <div className="flex justify-center">
          <TabsList>
            <TabsTrigger value="desktop" className="flex items-center gap-2">
              <Monitor className="h-4 w-4" /> Desktop
            </TabsTrigger>
            <TabsTrigger value="tablet" className="flex items-center gap-2">
              <Tablet className="h-4 w-4" /> Tablet
            </TabsTrigger>
            <TabsTrigger value="mobile" className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" /> Mobile
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="desktop">
          <div className="grid gap-6 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PanelLeft className="h-5 w-5 mr-2 text-blue-500" />
                  Barra Lateral
                </CardTitle>
                <CardDescription>
                  Configure a barra lateral do sistema.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="sidebar-enabled" className="flex-1">
                    Exibir barra lateral
                  </Label>
                  <Switch
                    id="sidebar-enabled"
                    checked={layouts.sidebar.enabled}
                    onCheckedChange={(checked) => handleSwitchChange(checked, 'sidebar', 'enabled')}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Posição</Label>
                  <RadioGroup
                    value={layouts.sidebar.position}
                    onValueChange={(value) => handleSelectChange(value, 'sidebar', 'position')}
                    className="flex gap-4"
                    disabled={!layouts.sidebar.enabled}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="left" id="sidebar-left" />
                      <Label htmlFor="sidebar-left">Esquerda</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="right" id="sidebar-right" />
                      <Label htmlFor="sidebar-right">Direita</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="sidebar-collapsible" className="flex-1">
                    Permitir recolher
                  </Label>
                  <Switch
                    id="sidebar-collapsible"
                    checked={layouts.sidebar.collapsible}
                    onCheckedChange={(checked) => handleSwitchChange(checked, 'sidebar', 'collapsible')}
                    disabled={!layouts.sidebar.enabled}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="sidebar-collapsed" className="flex-1">
                    Recolhida por padrão
                  </Label>
                  <Switch
                    id="sidebar-collapsed"
                    checked={layouts.sidebar.defaultCollapsed}
                    onCheckedChange={(checked) => handleSwitchChange(checked, 'sidebar', 'defaultCollapsed')}
                    disabled={!layouts.sidebar.enabled || !layouts.sidebar.collapsible}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Layout className="h-5 w-5 mr-2 text-blue-500" />
                  Cabeçalho
                </CardTitle>
                <CardDescription>
                  Configure o cabeçalho do sistema.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="header-enabled" className="flex-1">
                    Exibir cabeçalho
                  </Label>
                  <Switch
                    id="header-enabled"
                    checked={layouts.header.enabled}
                    onCheckedChange={(checked) => handleSwitchChange(checked, 'header', 'enabled')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="header-fixed" className="flex-1">
                    Cabeçalho fixo
                  </Label>
                  <Switch
                    id="header-fixed"
                    checked={layouts.header.fixed}
                    onCheckedChange={(checked) => handleSwitchChange(checked, 'header', 'fixed')}
                    disabled={!layouts.header.enabled}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="header-logo" className="flex-1">
                    Exibir logo no cabeçalho
                  </Label>
                  <Switch
                    id="header-logo"
                    checked={layouts.header.showLogo}
                    onCheckedChange={(checked) => handleSwitchChange(checked, 'header', 'showLogo')}
                    disabled={!layouts.header.enabled}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="header-user-menu" className="flex-1">
                    Exibir menu do usuário
                  </Label>
                  <Switch
                    id="header-user-menu"
                    checked={layouts.header.showUserMenu}
                    onCheckedChange={(checked) => handleSwitchChange(checked, 'header', 'showUserMenu')}
                    disabled={!layouts.header.enabled}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Layout className="h-5 w-5 mr-2 text-blue-500" />
                  Rodapé
                </CardTitle>
                <CardDescription>
                  Configure o rodapé do sistema.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="footer-enabled" className="flex-1">
                    Exibir rodapé
                  </Label>
                  <Switch
                    id="footer-enabled"
                    checked={layouts.footer.enabled}
                    onCheckedChange={(checked) => handleSwitchChange(checked, 'footer', 'enabled')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="footer-credits" className="flex-1">
                    Exibir créditos
                  </Label>
                  <Switch
                    id="footer-credits"
                    checked={layouts.footer.showCredits}
                    onCheckedChange={(checked) => handleSwitchChange(checked, 'footer', 'showCredits')}
                    disabled={!layouts.footer.enabled}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="footer-social" className="flex-1">
                    Exibir links sociais
                  </Label>
                  <Switch
                    id="footer-social"
                    checked={layouts.footer.showSocialLinks}
                    onCheckedChange={(checked) => handleSwitchChange(checked, 'footer', 'showSocialLinks')}
                    disabled={!layouts.footer.enabled}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Smartphone className="h-5 w-5 mr-2 text-blue-500" />
                  Responsivo
                </CardTitle>
                <CardDescription>
                  Configure os comportamentos responsivos.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Estilo do menu mobile</Label>
                  <Select
                    value={layouts.responsive.mobileMenuStyle}
                    onValueChange={(value) => handleSelectChange(value, 'responsive', 'mobileMenuStyle')}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um estilo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="drawer">Drawer</SelectItem>
                      <SelectItem value="dropdown">Dropdown</SelectItem>
                      <SelectItem value="fullscreen">Tela cheia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Breakpoint responsivo</Label>
                  <Select
                    value={layouts.responsive.breakpoint}
                    onValueChange={(value) => handleSelectChange(value, 'responsive', 'breakpoint')}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um breakpoint" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sm">Pequeno (sm - 640px)</SelectItem>
                      <SelectItem value="md">Médio (md - 768px)</SelectItem>
                      <SelectItem value="lg">Grande (lg - 1024px)</SelectItem>
                      <SelectItem value="xl">Extra grande (xl - 1280px)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="tablet" className="flex items-center justify-center p-10">
          <div className="text-center space-y-2">
            <Tablet className="h-16 w-16 mx-auto text-gray-400" />
            <p className="text-muted-foreground">
              As configurações para tablet usam as mesmas do desktop com algumas adaptações.
            </p>
            <p className="text-sm text-muted-foreground">
              Configure na aba Desktop e as mudanças serão refletidas automaticamente.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="mobile" className="flex items-center justify-center p-10">
          <div className="text-center space-y-2">
            <Smartphone className="h-16 w-16 mx-auto text-gray-400" />
            <p className="text-muted-foreground">
              As configurações para mobile são gerenciadas automaticamente.
            </p>
            <p className="text-sm text-muted-foreground">
              Configure na aba Desktop e na seção "Responsivo" para personalizar a exibição mobile.
            </p>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading}>
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
  );
};

export default LayoutSettings;
