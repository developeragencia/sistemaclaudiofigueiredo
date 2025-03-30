
// Client Types
export type ClientStatus = 'active' | 'inactive' | 'pending';

export interface Client {
  id: string;
  name: string;
  cnpj: string;
  status: ClientStatus;
  email: string;
  phone?: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}

// User Types
export type UserRole = 'admin' | 'office_staff' | 'client' | 'sales_rep';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  clientId?: string;
  isActive: boolean;
  createdAt: Date;
}

// Proposal Types
export type ProposalStatus = 'requested' | 'analyzing' | 'approved' | 'rejected' | 'converted';

export interface Proposal {
  id: string;
  clientId: string;
  representativeId: string;
  title: string;
  description: string;
  status: ProposalStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Activity Types
export type ActivityType = 'login' | 'create_client' | 'update_client' | 'create_proposal' | 'update_proposal' | 'import_data';

export interface Activity {
  id: string;
  userId: string;
  clientId?: string;
  type: ActivityType;
  description: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}

// Dashboard Statistics
export interface DashboardStats {
  totalClients: number;
  activeClients: number;
  pendingProposals: number;
  totalCredits: number;
  recentActivities: Activity[];
}

// Supplier Types
export interface Supplier {
  id: string;
  cnpj: string;
  name: string;
  tradeName?: string;
  activityCode?: string;
  activityDescription?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  phone?: string;
  email?: string;
  taxRegime?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Payment Types
export interface Payment {
  id: string;
  clientId: string;
  supplierId: string;
  invoiceNumber?: string;
  amount: number;
  date: Date;
  description?: string;
  taxWithheld?: number;
  taxWithheldCalculated?: number;
  hasAudit: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Tax Rate Types
export interface TaxRate {
  id: string;
  activityCode: string;
  description: string;
  irpjRate: number;
  csllRate: number;
  cofinsRate: number;
  pisRate: number;
  issRate: number;
  inssRate: number;
  totalRate: number;
  createdAt: Date;
  updatedAt: Date;
}

// CNPJ API Response Type
export interface CNPJAPIResponse {
  cnpj: string;
  nome: string;
  fantasia?: string;
  atividade_principal: {
    code: string;
    text: string;
  }[];
  atividades_secundarias?: {
    code: string;
    text: string;
  }[];
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  municipio?: string;
  uf?: string;
  cep?: string;
  telefone?: string;
  email?: string;
  situacao?: string;
  data_situacao?: string;
  capital_social?: string;
  regime_tributario?: string;
  erro?: boolean;
  message?: string;
}

// Audit Report Type
export interface AuditReport {
  id: string;
  clientId: string;
  supplierId: string;
  paymentId: string;
  originalAmount: number;
  calculatedTaxAmount: number;
  actualTaxAmount: number;
  difference: number;
  status: 'correct' | 'discrepancy' | 'pending';
  createdAt: Date;
  updatedAt: Date;
}
