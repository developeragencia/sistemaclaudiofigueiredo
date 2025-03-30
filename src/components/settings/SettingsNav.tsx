
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Mail, 
  Lock, 
  Palette, 
  Settings, 
  Globe, 
  Database,
  Layout
} from 'lucide-react';

interface SettingsNavProps {
  variant?: 'vertical' | 'horizontal';
  className?: string;
}

const SettingsNav: React.FC<SettingsNavProps> = ({ 
  variant = 'vertical',
  className = ''
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop() || 'profile';
  
  const navItems = [
    { id: 'profile', label: 'Perfil', icon: <User className="h-4 w-4 mr-2" />, path: '/settings/profile' },
    { id: 'account', label: 'Conta', icon: <Mail className="h-4 w-4 mr-2" />, path: '/settings/account' },
    { id: 'security', label: 'Segurança', icon: <Lock className="h-4 w-4 mr-2" />, path: '/settings/security' },
    { id: 'appearance', label: 'Aparência', icon: <Palette className="h-4 w-4 mr-2" />, path: '/settings/appearance' },
    { id: 'system', label: 'Sistema', icon: <Settings className="h-4 w-4 mr-2" />, path: '/settings/system' },
    { id: 'site', label: 'Site', icon: <Globe className="h-4 w-4 mr-2" />, path: '/settings/site' },
    { id: 'database', label: 'Banco de Dados', icon: <Database className="h-4 w-4 mr-2" />, path: '/settings/database' },
    { id: 'layout', label: 'Layout', icon: <Layout className="h-4 w-4 mr-2" />, path: '/settings/layout' }
  ];

  if (variant === 'horizontal') {
    return (
      <div className={`flex overflow-x-auto pb-2 gap-2 ${className}`}>
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant={item.id === currentPath ? "secondary" : "ghost"}
            size="sm"
            className={`whitespace-nowrap ${item.id === currentPath ? "bg-blue-50 text-blue-700" : "text-gray-700"}`}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            {item.label}
          </Button>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex flex-col space-y-1 ${className}`}>
      {navItems.map((item) => (
        <Button
          key={item.id}
          variant={item.id === currentPath ? "secondary" : "ghost"}
          className={`justify-start ${item.id === currentPath ? "bg-blue-50 text-blue-700" : "text-gray-700"}`}
          onClick={() => navigate(item.path)}
        >
          {item.icon}
          {item.label}
        </Button>
      ))}
    </div>
  );
};

export default SettingsNav;
