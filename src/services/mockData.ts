
import { Client, User, Proposal, Activity, DashboardStats, Supplier, Payment, TaxRate, AuditReport } from '../types';

// Mock Clients
const clients: Client[] = [
  {
    id: '1',
    name: 'Prefeitura Municipal de São Paulo',
    cnpj: '45.877.221/0001-01',
    status: 'active',
    email: 'contato@prefeitura.sp.gov.br',
    phone: '(11) 3333-4444',
    address: 'Viaduto do Chá, 15 - Centro, São Paulo - SP, 01002-020',
    createdAt: new Date('2022-01-15'),
    updatedAt: new Date('2023-05-20')
  },
  {
    id: '2',
    name: 'Governo do Estado de Minas Gerais',
    cnpj: '18.715.532/0001-70',
    status: 'active',
    email: 'contato@mg.gov.br',
    phone: '(31) 3222-1000',
    address: 'Cidade Administrativa - Rod. Papa João Paulo II, 4001 - Belo Horizonte, MG',
    createdAt: new Date('2022-03-10'),
    updatedAt: new Date('2023-04-15')
  },
  {
    id: '3',
    name: 'Tribunal Regional Federal',
    cnpj: '03.401.842/0001-39',
    status: 'pending',
    email: 'contato@trf.jus.br',
    phone: '(61) 3022-7070',
    address: 'SAUS Quadra 2, Lote 7 - Brasília, DF, 70070-000',
    createdAt: new Date('2022-07-05'),
    updatedAt: new Date('2023-06-18')
  },
  {
    id: '4',
    name: 'Instituto Federal de Educação',
    cnpj: '10.791.831/0001-20',
    status: 'inactive',
    email: 'contato@ifsp.edu.br',
    phone: '(11) 3775-4500',
    address: 'Rua Pedro Vicente, 625 - Canindé, São Paulo - SP, 01109-010',
    createdAt: new Date('2022-05-20'),
    updatedAt: new Date('2022-11-30')
  },
  {
    id: '5',
    name: 'Universidade Estadual de Campinas',
    cnpj: '46.168.086/0001-32',
    status: 'active',
    email: 'contato@unicamp.br',
    phone: '(19) 3521-2121',
    address: 'Cidade Universitária Zeferino Vaz - Barão Geraldo, Campinas - SP, 13083-970',
    createdAt: new Date('2023-01-10'),
    updatedAt: new Date('2023-06-05')
  }
];

// Default dashboard stats
const defaultStats: DashboardStats = {
  totalClients: 5,
  activeClients: 3,
  pendingProposals: 8,
  totalCredits: 250000,
  recentActivities: [
    {
      id: '1',
      userId: 'user1',
      type: 'create_client',
      description: 'Novo cliente cadastrado: Prefeitura de São Paulo',
      createdAt: new Date('2023-06-10T14:30:00')
    },
    {
      id: '2',
      userId: 'user2',
      clientId: '1',
      type: 'create_proposal',
      description: 'Proposta comercial criada para Prefeitura de São Paulo',
      createdAt: new Date('2023-06-11T09:15:00')
    },
    {
      id: '3',
      userId: 'user3',
      type: 'import_data',
      description: 'Importação de dados concluída para Tribunal Regional Federal',
      createdAt: new Date('2023-06-12T16:45:00')
    }
  ]
};

// Mock Users
export const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@taxcredit.com',
    role: 'admin',
    isActive: true,
    createdAt: new Date('2022-10-01')
  },
  {
    id: '2',
    name: 'Office Staff',
    email: 'staff@taxcredit.com',
    role: 'office_staff',
    isActive: true,
    createdAt: new Date('2023-01-05')
  },
  {
    id: '3',
    name: 'Client User',
    email: 'cliente@prefeiturasp.gov.br',
    role: 'client',
    clientId: '1',
    isActive: true,
    createdAt: new Date('2023-02-10')
  },
  {
    id: '4',
    name: 'Sales Rep',
    email: 'vendas@taxcredit.com',
    role: 'sales_rep',
    isActive: true,
    createdAt: new Date('2023-03-15')
  }
];

// Mock Proposals
export const proposals: Proposal[] = [
  {
    id: '1',
    clientId: '1',
    representativeId: '4',
    title: 'Recuperação de créditos tributários 2019-2023',
    description: 'Proposta para recuperação de créditos do período de 2019 a 2023, estimativa de R$ 2.5 milhões.',
    status: 'approved',
    createdAt: new Date('2023-06-10'),
    updatedAt: new Date('2023-06-25')
  },
  {
    id: '2',
    clientId: '2',
    representativeId: '4',
    title: 'Auditoria fiscal e recuperação 2020-2022',
    description: 'Auditoria completa e recuperação de créditos do período de 2020 a 2022.',
    status: 'analyzing',
    createdAt: new Date('2023-07-20'),
    updatedAt: new Date('2023-07-20')
  },
  {
    id: '3',
    clientId: '3',
    representativeId: '4',
    title: 'Análise preliminar de potencial de recuperação',
    description: 'Análise preliminar para identificação de oportunidades de recuperação de créditos.',
    status: 'requested',
    createdAt: new Date('2023-08-15'),
    updatedAt: new Date('2023-08-15')
  }
];

// Mock Activities
export const activities: Activity[] = [
  {
    id: '1',
    userId: '1',
    type: 'create_client',
    description: 'Cliente Prefeitura de São Paulo criado',
    createdAt: new Date('2023-01-15'),
    clientId: '1'
  },
  {
    id: '2',
    userId: '4',
    clientId: '1',
    type: 'create_proposal',
    description: 'Proposta de recuperação criada para Prefeitura de São Paulo',
    createdAt: new Date('2023-06-10')
  },
  {
    id: '3',
    userId: '1',
    clientId: '1',
    type: 'update_proposal',
    description: 'Proposta aprovada para Prefeitura de São Paulo',
    createdAt: new Date('2023-06-25')
  },
  {
    id: '4',
    userId: '2',
    clientId: '2',
    type: 'create_client',
    description: 'Cliente Governo de Minas Gerais criado',
    createdAt: new Date('2023-02-20')
  },
  {
    id: '5',
    userId: '3',
    clientId: '1',
    type: 'login',
    description: 'Usuário Cliente User fez login',
    createdAt: new Date('2023-10-05')
  }
];

// Dashboard Statistics
export const dashboardStats: DashboardStats = {
  totalClients: clients.length,
  activeClients: clients.filter(client => client.status === 'active').length,
  pendingProposals: proposals.filter(proposal => proposal.status === 'requested' || proposal.status === 'analyzing').length,
  totalCredits: 3750000, // R$ 3,75 milhões
  recentActivities: activities.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 5)
};

// Service functions
export const getClients = (): Promise<Client[]> => {
  return Promise.resolve(clients);
};

// Unified getActiveClient function (removing the duplicate)
export const getActiveClient = async (): Promise<Client | null> => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return the first active client for demo purpose
  return clients.find(client => client.status === 'active') || null;
};

// Get all clients
export const getClientsList = async (): Promise<Client[]> => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return [...clients];
};

export const getUsers = (): Promise<User[]> => {
  return Promise.resolve(users);
};

export const getProposals = (): Promise<Proposal[]> => {
  return Promise.resolve(proposals);
};

export const getActivities = (clientId?: string): Promise<Activity[]> => {
  let filteredActivities = activities;
  if (clientId) {
    filteredActivities = activities.filter(activity => activity.clientId === clientId);
  }
  return Promise.resolve(filteredActivities.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
};

// Unified getDashboardStats function (removing the duplicate)
export const getDashboardStats = async (): Promise<DashboardStats> => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  return defaultStats;
};
