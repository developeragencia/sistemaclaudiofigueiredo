
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Mail, 
  Lock, 
  Image, 
  Settings, 
  Layout, 
  Globe,
  Database,
  Palette
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const SettingsLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop() || 'profile';
  
  const tabs = [
    { id: 'profile', label: 'Perfil', icon: <User className="h-4 w-4 mr-2" />, path: '/settings/profile' },
    { id: 'account', label: 'Conta', icon: <Mail className="h-4 w-4 mr-2" />, path: '/settings/account' },
    { id: 'security', label: 'Segurança', icon: <Lock className="h-4 w-4 mr-2" />, path: '/settings/security' },
    { id: 'appearance', label: 'Aparência', icon: <Palette className="h-4 w-4 mr-2" />, path: '/settings/appearance' },
    { id: 'system', label: 'Sistema', icon: <Settings className="h-4 w-4 mr-2" />, path: '/settings/system' },
    { id: 'site', label: 'Site', icon: <Globe className="h-4 w-4 mr-2" />, path: '/settings/site' },
    { id: 'database', label: 'Banco de Dados', icon: <Database className="h-4 w-4 mr-2" />, path: '/settings/database' },
    { id: 'layout', label: 'Layout', icon: <Layout className="h-4 w-4 mr-2" />, path: '/settings/layout' },
  ];

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Mobile tabs */}
        <div className="md:hidden w-full">
          <Tabs defaultValue={currentPath} className="w-full">
            <TabsList className="grid grid-cols-2 gap-2 mb-4">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  onClick={() => navigate(tab.path)}
                  className={tab.id === currentPath ? "bg-blue-500 text-white" : ""}
                >
                  <div className="flex items-center">
                    {tab.icon}
                    {tab.label}
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Desktop sidebar */}
        <div className="hidden md:block w-64 shrink-0">
          <h2 className="text-2xl font-bold mb-6 text-blue-800">Configurações</h2>
          <div className="flex flex-col space-y-1">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={tab.id === currentPath ? "secondary" : "ghost"}
                className={`justify-start ${tab.id === currentPath ? "bg-blue-50 text-blue-700" : "text-gray-700"}`}
                onClick={() => navigate(tab.path)}
              >
                {tab.icon}
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Content area */}
        <div className="flex-1">
          <Separator className="mb-6" />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
