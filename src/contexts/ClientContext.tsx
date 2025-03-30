
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Client, User, UserRole } from '../types';
import { getActiveClient, getClientsList } from '../services/mockData';
import { useToast } from '@/components/ui/use-toast';

interface ClientContextType {
  activeClient: Client | null;
  setActiveClient: (client: Client | null) => void;
  clients: Client[];
  loading: boolean;
  userRole: UserRole;
  availableClients: Client[];
}

export const ClientContext = createContext<ClientContextType | undefined>(undefined);

interface ClientProviderProps {
  children: React.ReactNode;
  initialRole?: UserRole;
}

export const ClientProvider: React.FC<ClientProviderProps> = ({ 
  children, 
  initialRole = 'admin' 
}) => {
  const [activeClient, setActiveClient] = useState<Client | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userRole, setUserRole] = useState<UserRole>(initialRole);
  const { toast } = useToast();

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Get list of all clients
        const clientsList = await getClientsList();
        setClients(clientsList);
        
        // Get active client
        const client = await getActiveClient();
        if (client) {
          setActiveClient(client);
          toast({
            title: "Cliente carregado",
            description: `${client.name} foi carregado como cliente ativo.`,
            variant: "default",
          });
        }
      } catch (error) {
        console.error('Failed to fetch client data:', error);
        toast({
          title: "Erro ao carregar clientes",
          description: "Não foi possível carregar os dados dos clientes.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  // Filter available clients based on user role
  const availableClients = clients.filter(client => {
    if (userRole === 'admin') return true;
    // Add filtering logic for other roles here
    return true;
  });

  return (
    <ClientContext.Provider 
      value={{ 
        activeClient, 
        setActiveClient, 
        clients, 
        loading, 
        userRole, 
        availableClients 
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export const useClient = () => {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error('useClient must be used within a ClientProvider');
  }
  return context;
};
