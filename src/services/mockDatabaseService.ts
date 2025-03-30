
import { Client, Supplier, Payment, TaxRate, AuditReport } from '../types';
import { toast } from '@/hooks/use-toast';
import { fetchCompanyInfoFromCNPJ, mapCNPJResponseToSupplier } from './cnpjService';

// Mock database collections
let suppliers: Supplier[] = [];
let payments: Payment[] = [];
let taxRates: TaxRate[] = [];
let auditReports: AuditReport[] = [];

// Initialize with some tax rates based on activity codes
const initTaxRates = () => {
  taxRates = [
    {
      id: '1',
      activityCode: '62.01-5-01',
      description: 'Desenvolvimento de sistemas',
      irpjRate: 1.5,
      csllRate: 1.0,
      cofinsRate: 3.0,
      pisRate: 0.65,
      issRate: 2.0,
      inssRate: 0,
      totalRate: 8.15,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      activityCode: '69.20-6-01',
      description: 'Contabilidade',
      irpjRate: 1.5,
      csllRate: 1.0,
      cofinsRate: 3.0,
      pisRate: 0.65,
      issRate: 2.0,
      inssRate: 0,
      totalRate: 8.15,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      activityCode: '71.12-0-00',
      description: 'Engenharia',
      irpjRate: 1.5,
      csllRate: 1.0,
      cofinsRate: 3.0,
      pisRate: 0.65,
      issRate: 5.0,
      inssRate: 0,
      totalRate: 11.15,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];
};

// Initialize the mock database
initTaxRates();

// Supplier CRUD operations
export const getSupplierByCNPJ = async (cnpj: string): Promise<Supplier | null> => {
  // Clean up CNPJ format
  const cleanCNPJ = cnpj.replace(/[^\d]/g, '');
  
  // Search local database first
  const existingSupplier = suppliers.find(s => s.cnpj === cleanCNPJ);
  
  if (existingSupplier) {
    return existingSupplier;
  }
  
  // If not found locally, try to fetch from API
  const apiResponse = await fetchCompanyInfoFromCNPJ(cleanCNPJ);
  
  if (apiResponse) {
    // Map and save to local database
    const newSupplier = mapCNPJResponseToSupplier(apiResponse);
    suppliers.push(newSupplier);
    toast({
      title: "Fornecedor adicionado",
      description: `Fornecedor ${newSupplier.name} foi adicionado com sucesso`,
    });
    return newSupplier;
  }
  
  return null;
};

export const getAllSuppliers = (): Supplier[] => {
  return [...suppliers];
};

export const addSupplier = (supplier: Supplier): Supplier => {
  suppliers.push(supplier);
  return supplier;
};

export const updateSupplier = (supplier: Supplier): Supplier | null => {
  const index = suppliers.findIndex(s => s.id === supplier.id);
  
  if (index !== -1) {
    suppliers[index] = {
      ...supplier,
      updatedAt: new Date()
    };
    return suppliers[index];
  }
  
  return null;
};

// Payment CRUD operations
export const addPayment = (payment: Omit<Payment, 'id' | 'createdAt' | 'updatedAt' | 'hasAudit'>): Payment => {
  const newPayment: Payment = {
    ...payment,
    id: crypto.randomUUID(),
    hasAudit: false,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  payments.push(newPayment);
  return newPayment;
};

export const getPaymentsByClientId = (clientId: string): Payment[] => {
  return payments.filter(p => p.clientId === clientId);
};

export const getPaymentById = (id: string): Payment | undefined => {
  return payments.find(p => p.id === id);
};

// Tax Rate operations
export const getTaxRateByActivityCode = (activityCode: string): TaxRate | null => {
  // Try to find exact match first
  const exactMatch = taxRates.find(tr => tr.activityCode === activityCode);
  if (exactMatch) return exactMatch;
  
  // Try to find partial match (first 2 digits)
  const mainActivity = activityCode.split('.')[0];
  const partialMatch = taxRates.find(tr => tr.activityCode.startsWith(mainActivity));
  
  return partialMatch || null;
};

// Audit operations
export const auditPayment = async (paymentId: string): Promise<AuditReport | null> => {
  const payment = getPaymentById(paymentId);
  if (!payment) return null;
  
  const supplier = suppliers.find(s => s.id === payment.supplierId);
  if (!supplier) return null;
  
  const activityCode = supplier.activityCode;
  if (!activityCode) return null;
  
  const taxRate = getTaxRateByActivityCode(activityCode);
  if (!taxRate) return null;
  
  // Calculate expected tax amount
  const calculatedTaxAmount = payment.amount * (taxRate.totalRate / 100);
  
  // Create audit report
  const auditReport: AuditReport = {
    id: crypto.randomUUID(),
    clientId: payment.clientId,
    supplierId: payment.supplierId,
    paymentId: payment.id,
    originalAmount: payment.amount,
    calculatedTaxAmount: calculatedTaxAmount,
    actualTaxAmount: payment.taxWithheld || 0,
    difference: calculatedTaxAmount - (payment.taxWithheld || 0),
    status: Math.abs(calculatedTaxAmount - (payment.taxWithheld || 0)) < 0.01 ? 'correct' : 'discrepancy',
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  // Update payment to show it's been audited
  const paymentIndex = payments.findIndex(p => p.id === payment.id);
  if (paymentIndex !== -1) {
    payments[paymentIndex] = {
      ...payment,
      taxWithheldCalculated: calculatedTaxAmount,
      hasAudit: true,
      updatedAt: new Date()
    };
  }
  
  auditReports.push(auditReport);
  return auditReport;
};

export const getAuditReportsByClientId = (clientId: string): AuditReport[] => {
  return auditReports.filter(ar => ar.clientId === clientId);
};

export const getAllTaxRates = (): TaxRate[] => {
  return [...taxRates];
};

export const addTaxRate = (taxRate: Omit<TaxRate, 'id' | 'createdAt' | 'updatedAt'>): TaxRate => {
  const newTaxRate: TaxRate = {
    ...taxRate,
    id: crypto.randomUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
    totalRate: taxRate.irpjRate + taxRate.csllRate + taxRate.cofinsRate + taxRate.pisRate + taxRate.issRate + taxRate.inssRate
  };
  
  taxRates.push(newTaxRate);
  return newTaxRate;
};
