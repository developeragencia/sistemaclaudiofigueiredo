
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus, Trash } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import PageEditor from '@/components/settings/PageEditor';

const SiteSettings: React.FC = () => {
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState('pages');
  
  // Pages
  const [pages, setPages] = useState([
    { id: 1, title: 'Home', slug: 'home', content: '<h1>Bem-vindo ao sistema</h1><p>Conteúdo da página inicial.</p>' },
    { id: 2, title: 'Sobre', slug: 'sobre', content: '<h1>Sobre nós</h1><p>Somos uma empresa especializada em soluções tributárias.</p>' },
    { id: 3, title: 'Contato', slug: 'contato', content: '<h1>Entre em contato</h1><p>Formulário de contato e informações.</p>' }
  ]);
  const [currentPage, setCurrentPage] = useState(pages[0]);
  
  // Menu items
  const [menuItems, setMenuItems] = useState([
    { id: 1, label: 'Home', url: '/', order: 1 },
    { id: 2, label: 'Serviços', url: '/servicos', order: 2 },
    { id: 3, label: 'Blog', url: '/blog', order: 3 },
    { id: 4, label: 'Contato', url: '/contato', order: 4 }
  ]);
  const [newMenuItem, setNewMenuItem] = useState({ label: '', url: '' });

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };
  
  const handleContentChange = (content: string) => {
    setCurrentPage(prev => ({ ...prev, content }));
  };
  
  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentPage(prev => ({ ...prev, [name]: value }));
  };
  
  const handleMenuItemChange = (e: React.ChangeEvent<HTMLInputElement>, id: number, field: string) => {
    const { value } = e.target;
    setMenuItems(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };
  
  const handleNewMenuItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMenuItem(prev => ({ ...prev, [name]: value }));
  };
  
  const addMenuItem = () => {
    if (!newMenuItem.label || !newMenuItem.url) return;
    
    setMenuItems(prev => [
      ...prev,
      {
        id: prev.length ? Math.max(...prev.map(item => item.id)) + 1 : 1,
        label: newMenuItem.label,
        url: newMenuItem.url,
        order: prev.length + 1
      }
    ]);
    
    setNewMenuItem({ label: '', url: '' });
  };
  
  const removeMenuItem = (id: number) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };
  
  const handleSavePages = async () => {
    setIsLoading(true);

    try {
      // Update current page in the pages array
      const updatedPages = pages.map(page => 
        page.id === currentPage.id ? currentPage : page
      );
      setPages(updatedPages);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Páginas atualizadas",
        description: "As páginas do site foram atualizadas com sucesso.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Erro ao atualizar páginas",
        description: "Ocorreu um erro ao atualizar as páginas do site.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSaveMenu = async () => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Menu atualizado",
        description: "O menu do site foi atualizado com sucesso.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Erro ao atualizar menu",
        description: "Ocorreu um erro ao atualizar o menu do site.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900">Gerenciamento do Site</h3>
        <p className="text-muted-foreground">
          Edite a aparência e conteúdo do seu site com nosso editor intuitivo.
        </p>
      </div>
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="w-full">
          <TabsTrigger value="pages" className="flex-1">Páginas</TabsTrigger>
          <TabsTrigger value="menu" className="flex-1">Menu</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pages" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciar Páginas</CardTitle>
              <CardDescription>
                Edite o conteúdo das páginas do site.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-64">
                  <h4 className="text-sm font-medium mb-3">Páginas disponíveis</h4>
                  <div className="border rounded-md overflow-hidden">
                    {pages.map(page => (
                      <button
                        key={page.id}
                        className={`
                          w-full px-3 py-2 text-left text-sm transition-colors
                          ${page.id === currentPage.id ? 'bg-blue-50 text-blue-600 font-medium' : 'hover:bg-gray-50'}
                          border-b last:border-b-0
                        `}
                        onClick={() => handlePageChange(page)}
                      >
                        {page.title}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="title">Título da Página</Label>
                        <Input
                          id="title"
                          name="title"
                          value={currentPage.title}
                          onChange={handlePageInputChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="slug">Slug (URL)</Label>
                        <Input
                          id="slug"
                          name="slug"
                          value={currentPage.slug}
                          onChange={handlePageInputChange}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="content">Conteúdo</Label>
                      <PageEditor 
                        initialValue={currentPage.content} 
                        onChange={handleContentChange} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => {}}>
                Visualizar
              </Button>
              <Button onClick={handleSavePages} disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Salvar alterações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="menu" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciar Menu</CardTitle>
              <CardDescription>
                Configure os itens de menu do site.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Itens do menu</h4>
                  
                  {menuItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-2">
                      <Input
                        value={item.label}
                        onChange={(e) => handleMenuItemChange(e, item.id, 'label')}
                        placeholder="Título do item"
                        className="flex-1"
                      />
                      <Input
                        value={item.url}
                        onChange={(e) => handleMenuItemChange(e, item.id, 'url')}
                        placeholder="URL"
                        className="flex-1"
                      />
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => removeMenuItem(item.id)}
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium mb-2">Adicionar novo item</h4>
                  <div className="flex items-end gap-2">
                    <div className="space-y-2 flex-1">
                      <Label htmlFor="newMenuLabel">Título</Label>
                      <Input
                        id="newMenuLabel"
                        name="label"
                        value={newMenuItem.label}
                        onChange={handleNewMenuItemChange}
                        placeholder="Ex: Produtos"
                      />
                    </div>
                    <div className="space-y-2 flex-1">
                      <Label htmlFor="newMenuUrl">URL</Label>
                      <Input
                        id="newMenuUrl"
                        name="url"
                        value={newMenuItem.url}
                        onChange={handleNewMenuItemChange}
                        placeholder="Ex: /produtos"
                      />
                    </div>
                    <Button onClick={addMenuItem} disabled={!newMenuItem.label || !newMenuItem.url}>
                      <Plus className="h-4 w-4 mr-1" /> Adicionar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline">
                Visualizar
              </Button>
              <Button onClick={handleSaveMenu} disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Salvar menu
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SiteSettings;
