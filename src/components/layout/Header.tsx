import React, { useState } from 'react';
import { Bell, Search, Menu, X, LogOut, Sun, Moon, Settings } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import AnimatedLogo from '@/components/ui/AnimatedLogo';
import ClientSwitcher from '@/components/client/ClientSwitcher';
import { useClient } from '@/contexts/ClientContext';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { userEmail, logout, userRole } = useAuth();
  const { clients, availableClients, activeClient } = useClient();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [darkMode, setDarkMode] = useState(false);
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado do sistema."
    });
    navigate('/login');
  };
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // You would implement actual dark mode logic here
    // document.documentElement.classList.toggle('dark');
  };
  
  const userInitials = userEmail ? userEmail.substring(0, 2).toUpperCase() : 'AA';

  return (
    <header className="h-16 px-4 border-b flex items-center justify-between backdrop-blur-sm bg-background/80 z-20">
      {/* Left section - Logo and Menu toggle */}
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden mr-2" aria-label="Menu">
          <Menu className="h-6 w-6" />
        </Button>
        <AnimatedLogo size="small" showText={true} className="hidden sm:flex" />
        
        {/* Search bar */}
        <div className="ml-8 relative hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Buscar..."
              className="pl-10 pr-4 py-1.5 rounded-full bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring w-64"
            />
          </div>
        </div>
      </div>

      {/* Center section - Active Client */}
      {userEmail && (
        <div className="hidden md:flex items-center">
          <ClientSwitcher clients={availableClients} />
        </div>
      )}

      {/* Right section - notifications and user menu */}
      <div className="flex items-center space-x-4">
        {/* Role Badge */}
        {userRole && (
          <Badge variant="outline" className="hidden md:flex">
            {userRole === 'admin' && 'Administrador'}
            {userRole === 'office_staff' && 'Equipe do Escritório'}
            {userRole === 'client' && 'Cliente'}
            {userRole === 'sales_rep' && 'Rep. Comercial'}
          </Badge>
        )}

        {/* Mobile search icon */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSearchOpen(true)}>
          <Search className="h-5 w-5" />
        </Button>

        {/* Theme toggle */}
        <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
          {darkMode ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>

        {/* Notifications */}
        <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <motion.span 
                className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              ></motion.span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 mt-2" align="end">
            <div className="space-y-4">
              <div className="font-medium flex justify-between items-center">
                <span>Notificações</span>
                <Button variant="ghost" size="sm" className="text-xs">Marcar todas como lidas</Button>
              </div>
              
              <div className="space-y-3 max-h-[300px] overflow-auto">
                <div className="bg-muted/50 p-3 rounded-lg hover:bg-muted/80 transition-colors cursor-pointer border-l-4 border-blue-500">
                  <div className="text-sm font-medium">Nova proposta comercial</div>
                  <div className="text-xs text-muted-foreground">Cliente ABC Ltda enviou uma nova proposta</div>
                  <div className="text-xs text-muted-foreground/80 mt-1">Há 5 minutos atrás</div>
                </div>
                
                <div className="bg-muted/50 p-3 rounded-lg hover:bg-muted/80 transition-colors cursor-pointer border-l-4 border-green-500">
                  <div className="text-sm font-medium">Crédito identificado</div>
                  <div className="text-xs text-muted-foreground">R$ 4.325,00 em créditos identificados para XYZ S.A.</div>
                  <div className="text-xs text-muted-foreground/80 mt-1">Há 3 horas atrás</div>
                </div>
                
                <div className="bg-muted/50 p-3 rounded-lg hover:bg-muted/80 transition-colors cursor-pointer border-l-4 border-yellow-500">
                  <div className="text-sm font-medium">Lembrete de reunião</div>
                  <div className="text-xs text-muted-foreground">Reunião de equipe em 30 minutos</div>
                  <div className="text-xs text-muted-foreground/80 mt-1">Há 25 minutos atrás</div>
                </div>
              </div>
              
              <div className="text-center">
                <Button variant="ghost" size="sm" className="text-xs">Ver todas as notificações</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* User Avatar */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar>
                <AvatarFallback className="bg-sidebar text-sidebar-foreground">{userInitials}</AvatarFallback>
              </Avatar>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-60 mt-2" align="end">
            <div className="space-y-3">
              <div className="border-b pb-2">
                <p className="font-medium">Administrador</p>
                <p className="text-sm text-muted-foreground">{userEmail}</p>
              </div>
              
              <div className="space-y-1">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-sm"
                  onClick={() => navigate('/profile')}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Perfil e configurações
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 text-sm"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      {/* Mobile search modal */}
      {searchOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4">
          <div className="bg-card w-full max-w-lg rounded-lg shadow-xl border p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Buscar</h3>
              <Button variant="ghost" size="icon" onClick={() => setSearchOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Digite para buscar..."
                className="pl-10 pr-4 py-2 rounded-md bg-background border border-input w-full focus:outline-none focus:ring-2 focus:ring-ring"
                autoFocus
              />
            </div>
            
            <div className="mt-4">
              <h4 className="text-xs font-medium text-muted-foreground mb-2">RESULTADOS RECENTES</h4>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-sm">Dashboard</Button>
                <Button variant="ghost" className="w-full justify-start text-sm">Gestão de Clientes</Button>
                <Button variant="ghost" className="w-full justify-start text-sm">Relatórios Fiscais</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile client switcher */}
      {userEmail && activeClient && (
        <div className="md:hidden fixed bottom-4 left-0 right-0 mx-auto z-50 flex justify-center">
          <Button 
            variant="default" 
            className="shadow-lg flex items-center gap-2 px-4 py-2 rounded-full bg-primary"
            onClick={() => navigate('/clients-management')}
          >
            {activeClient.name}
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
