
export interface ClientContact {
  name: string;
  role: string;
  email: string;
  phone: string;
}

export interface ClientFinancialInfo {
  taxId: string;
  bankAccount?: string;
  billingAddress?: string;
  paymentMethod?: string;
  creditLimit?: number;
}

export interface ClientTaxCredit {
  id: string;
  type: string;
  amount: number;
  createdAt: Date;
  status: 'pending' | 'approved' | 'rejected';
}

export interface ClientDetailedInfo {
  contacts: ClientContact[];
  financialInfo: ClientFinancialInfo;
  taxCredits: ClientTaxCredit[];
  documents: {
    name: string;
    type: string;
    uploadDate: Date;
    url: string;
  }[];
}
