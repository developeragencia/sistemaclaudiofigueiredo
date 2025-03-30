
import React from 'react';
import { 
  ArrowLeft,
  LayoutDashboard,
  Users, 
  Calculator, 
  FileText, 
  BarChart3,
  Globe,
  LifeBuoy,
  Cog,
  ShieldCheck,
  Database,
  Clipboard,
  FileCheck,
  Import,
  CreditCard,
  Gauge,
  Receipt,
  FileBarChart,
  Handshake,
  BookOpen,
  Table,
  Lock,
  Shield,
  Clock,
  KeyRound,
  UserCheck,
  Settings,
  User,
  Mail,
  Palette,
  Layout
} from 'lucide-react';
import { MenuItemType } from './types';

export const getSidebarItems = (): MenuItemType[] => {
  return [
    { 
      icon: ArrowLeft, 
      label: "Voltar para Home", 
      to: "/" 
    },
    { 
      icon: LayoutDashboard, 
      label: "Painel Administrador", 
      to: "/dashboard" 
    },
    { 
      icon: Users, 
      label: "Gestão de Clientes", 
      to: "/clients-management",
      badge: "2" 
    },
    { 
      icon: CreditCard, 
      label: "Créditos Tributários", 
      to: "/tax-credits" 
    },
    { 
      icon: Calculator, 
      label: "Calculadora Avançada", 
      to: "/advanced-calculator" 
    },
    { 
      icon: Calculator, 
      label: "Cálculos e Recuperação", 
      to: "#",
      submenu: [
        { label: "Cálculos IRRF", to: "/irrf-calculations" },
        { label: "Recuperação IRRF/PJ", to: "/irrf-recovery" },
        { label: "Identificação de Créditos", to: "/credits-identification" },
      ]
    },
    { 
      icon: FileText, 
      label: "Relatórios", 
      to: "#",
      badge: "3",
      submenu: [
        { label: "Relatórios Detalhados", to: "/detailed-reports" },
        { label: "Comprovantes de Retenção", to: "/retention-receipts", badge: "3" },
        { label: "Relatórios Fiscais", to: "/fiscal-reports" },
        { label: "Painel Interativo", to: "/interactive-dashboard" },
      ]
    },
    { 
      icon: BarChart3, 
      label: "Gestão", 
      to: "#",
      badge: "5",
      submenu: [
        { label: "Propostas Comerciais", to: "/commercial-proposals", badge: "5" },
        { label: "Compensação Tributária", to: "/tax-compensation" },
        { label: "Gestão de Auditorias", to: "/audit-management" },
      ]
    },
    { 
      icon: Shield, 
      label: "Segurança & Auditoria", 
      to: "#",
      badge: "Novo",
      submenu: [
        { label: "Autenticação em Dois Fatores", to: "/two-factor-auth" },
        { label: "Expiração de Sessão", to: "/session-expiration" },
        { label: "Proteção de Acesso", to: "/access-protection" },
        { label: "Trilhas de Auditoria", to: "/audit-trails" },
        { label: "Usuários e Permissões", to: "/users-permissions" },
      ]
    },
    { 
      icon: Database, 
      label: "Operacional", 
      to: "#",
      submenu: [
        { label: "Painel Operacional", to: "/operational-dashboard" },
        { label: "Auditorias Operacionais", to: "/operational-audits" },
        { label: "Comprovantes Operacionais", to: "/operational-receipts" },
      ]
    },
    { 
      icon: Globe, 
      label: "Sistema", 
      to: "#",
      submenu: [
        { label: "Site e Conteúdo", to: "/site-editor" },
      ]
    },
    { 
      icon: LifeBuoy, 
      label: "Suporte", 
      to: "/support" 
    },
    { 
      icon: Cog, 
      label: "Configurações", 
      to: "#",
      submenu: [
        { label: "Perfil", to: "/settings/profile" },
        { label: "Conta", to: "/settings/account" },
        { label: "Segurança", to: "/settings/security" },
        { label: "Aparência", to: "/settings/appearance" },
        { label: "Sistema", to: "/settings/system" },
        { label: "Site", to: "/settings/site" },
        { label: "Banco de Dados", to: "/settings/database" },
        { label: "Layout", to: "/settings/layout" },
      ]
    }
  ];
};

// Helper function to group items by category
export const getGroupedSidebarItems = () => {
  const sidebarItems = getSidebarItems();
  
  return {
    mainItems: sidebarItems.slice(0, 2),
    moduleItems: sidebarItems.slice(2, 11),
    systemItems: sidebarItems.slice(11)
  };
};
