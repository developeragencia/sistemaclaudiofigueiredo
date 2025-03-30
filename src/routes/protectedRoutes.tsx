
import React from "react";
import { Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Main pages
import Dashboard from "@/pages/Dashboard";
import AuditTax from "@/pages/AuditTax";
import DataImport from "@/pages/DataImport";
import RetentionAudit from "@/pages/RetentionAudit";
import Reports from "@/pages/Reports";
import SecuritySettingsPage from "@/pages/SecuritySettings";
import SiteEditor from "@/components/admin/SiteEditor";
import ClientsManagement from "@/pages/ClientsManagement";
import SuppliersManagement from "@/pages/SuppliersManagement";
import PaymentsManagement from "@/pages/PaymentsManagement";
import TaxCredits from "@/pages/TaxCredits";
import AdvancedCalculator from "@/pages/AdvancedCalculator";
import SecurityHub from "@/pages/SecurityHub";
import ProfilePage from "@/pages/ProfilePage";

// Operational pages
import OperationalImport from "@/pages/operational/OperationalImport";
import OperationalDashboard from "@/pages/operational/OperationalDashboard";
import OperationalAudits from "@/pages/operational/OperationalAudits";
import OperationalReceipts from "@/pages/operational/OperationalReceipts";

// Security pages
import TwoFactorAuthPage from "@/pages/SecurityPages/TwoFactorAuthPage";
import SessionExpirationPage from "@/pages/SecurityPages/SessionExpirationPage";
import AccessProtectionPage from "@/pages/SecurityPages/AccessProtectionPage";
import AuditTrailsPage from "@/pages/SecurityPages/AuditTrailsPage";
import UsersPermissionsPage from "@/pages/SecurityPages/UsersPermissionsPage";

// Settings pages
import SettingsLayout from "@/pages/settings/SettingsLayout";
import ProfileSettings from "@/pages/settings/ProfileSettings";
import AccountSettings from "@/pages/settings/AccountSettings";
import SecuritySettings from "@/pages/settings/SecuritySettings";
import AppearanceSettings from "@/pages/settings/AppearanceSettings";
import SystemSettings from "@/pages/settings/SystemSettings";
import SiteSettings from "@/pages/settings/SiteSettings";
import DatabaseSettings from "@/pages/settings/DatabaseSettings";
import LayoutSettings from "@/pages/settings/LayoutSettings";

/**
 * Function to create a protected route with Layout
 */
const createProtectedRoute = (path: string, element: React.ReactNode) => (
  <Route path={path} element={
    <ProtectedRoute>
      <Layout>
        {element}
      </Layout>
    </ProtectedRoute>
  } />
);

/**
 * Main application routes that require authentication
 */
export const mainRoutes = [
  createProtectedRoute("/dashboard", <Dashboard />),
  createProtectedRoute("/tax-audit", <AuditTax />),
  createProtectedRoute("/import", <DataImport />),
  createProtectedRoute("/retention-audit", <RetentionAudit />),
  createProtectedRoute("/reports", <Reports />),
  createProtectedRoute("/security", <SecuritySettingsPage />),
  createProtectedRoute("/site-editor", <SiteEditor />),
  createProtectedRoute("/clients-management", <ClientsManagement />),
  createProtectedRoute("/suppliers-management", <SuppliersManagement />),
  createProtectedRoute("/payments-management", <PaymentsManagement />),
];

/**
 * Operational routes
 */
export const operationalRoutes = [
  createProtectedRoute("/operational-import", <OperationalImport />),
  createProtectedRoute("/operational-dashboard", <OperationalDashboard />),
  createProtectedRoute("/operational-audits", <OperationalAudits />),
  createProtectedRoute("/operational-receipts", <OperationalReceipts />),
];

/**
 * Tax credits routes
 */
export const taxCreditRoutes = [
  createProtectedRoute("/tax-credits", <TaxCredits />),
  createProtectedRoute("/advanced-calculator", <AdvancedCalculator />),
];

/**
 * Security & Audit routes
 */
export const securityRoutes = [
  createProtectedRoute("/security-hub", <SecurityHub />),
  createProtectedRoute("/two-factor-auth", <TwoFactorAuthPage />),
  createProtectedRoute("/session-expiration", <SessionExpirationPage />),
  createProtectedRoute("/access-protection", <AccessProtectionPage />),
  createProtectedRoute("/audit-trails", <AuditTrailsPage />),
  createProtectedRoute("/users-permissions", <UsersPermissionsPage />),
];

/**
 * Profile route
 */
export const profileRoutes = [
  <Route path="/profile" element={
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  } />,
];

/**
 * Settings routes
 */
export const settingsRoutes = [
  <Route path="/settings" element={
    <ProtectedRoute>
      <Layout>
        <SettingsLayout />
      </Layout>
    </ProtectedRoute>
  }>
    <Route path="profile" element={<ProfileSettings />} />
    <Route path="account" element={<AccountSettings />} />
    <Route path="security" element={<SecuritySettings />} />
    <Route path="appearance" element={<AppearanceSettings />} />
    <Route path="system" element={<SystemSettings />} />
    <Route path="site" element={<SiteSettings />} />
    <Route path="database" element={<DatabaseSettings />} />
    <Route path="layout" element={<LayoutSettings />} />
    <Route index element={<ProfileSettings />} />
  </Route>,
];

/**
 * Placeholder routes that are under development
 */
export const placeholderRoutes = [
  createProtectedRoute("/irrf-calculations", 
    <div className="p-6">
      <h1 className="text-2xl font-bold">Cálculos IRRF</h1>
      <p className="text-gray-500">Página em desenvolvimento</p>
    </div>
  ),
  createProtectedRoute("/irrf-recovery", 
    <div className="p-6">
      <h1 className="text-2xl font-bold">Recuperação IRRF/PJ</h1>
      <p className="text-gray-500">Página em desenvolvimento</p>
    </div>
  ),
  createProtectedRoute("/credits-identification", 
    <div className="p-6">
      <h1 className="text-2xl font-bold">Identificação de Créditos</h1>
      <p className="text-gray-500">Página em desenvolvimento</p>
    </div>
  ),
  createProtectedRoute("/detailed-reports", 
    <div className="p-6">
      <h1 className="text-2xl font-bold">Relatórios Detalhados</h1>
      <p className="text-gray-500">Página em desenvolvimento</p>
    </div>
  ),
  createProtectedRoute("/retention-receipts", 
    <div className="p-6">
      <h1 className="text-2xl font-bold">Comprovantes de Retenção</h1>
      <p className="text-gray-500">Página em desenvolvimento</p>
    </div>
  ),
  createProtectedRoute("/fiscal-reports", 
    <div className="p-6">
      <h1 className="text-2xl font-bold">Relatórios Fiscais</h1>
      <p className="text-gray-500">Página em desenvolvimento</p>
    </div>
  ),
  createProtectedRoute("/interactive-dashboard", 
    <div className="p-6">
      <h1 className="text-2xl font-bold">Painel Interativo</h1>
      <p className="text-gray-500">Página em desenvolvimento</p>
    </div>
  ),
  createProtectedRoute("/commercial-proposals", 
    <div className="p-6">
      <h1 className="text-2xl font-bold">Propostas Comerciais</h1>
      <p className="text-gray-500">Página em desenvolvimento</p>
    </div>
  ),
  createProtectedRoute("/tax-compensation", 
    <div className="p-6">
      <h1 className="text-2xl font-bold">Compensação Tributária</h1>
      <p className="text-gray-500">Página em desenvolvimento</p>
    </div>
  ),
  createProtectedRoute("/audit-management", 
    <div className="p-6">
      <h1 className="text-2xl font-bold">Gestão de Auditorias</h1>
      <p className="text-gray-500">Página em desenvolvimento</p>
    </div>
  ),
  createProtectedRoute("/support", 
    <div className="p-6">
      <h1 className="text-2xl font-bold">Suporte</h1>
      <p className="text-gray-500">Página em desenvolvimento</p>
    </div>
  ),
];

