
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Proposal, ProposalStatus } from '@/types';
import { 
  Plus, FileText, User, Calendar, 
  AlertCircle, CheckCircle, XCircle, RotateCw, ArrowRightCircle 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock proposals data
const MOCK_PROPOSALS: Proposal[] = [
  {
    id: '1',
    clientId: '1',
    representativeId: '4',
    title: 'Proposta de Recuperação de Créditos',
    description: 'Análise e recuperação de créditos tributários dos últimos 5 anos.',
    status: 'requested',
    createdAt: new Date('2023-05-10'),
    updatedAt: new Date('2023-05-10'),
  },
  {
    id: '2',
    clientId: '1',
    representativeId: '4',
    title: 'Auditoria Tributária Anual',
    description: 'Auditoria completa dos impostos pagos no último ano fiscal.',
    status: 'analyzing',
    createdAt: new Date('2023-06-15'),
    updatedAt: new Date('2023-06-16'),
  },
  {
    id: '3',
    clientId: '1',
    representativeId: '4',
    title: 'Consultoria para Planejamento Tributário',
    description: 'Elaboração de estratégias para otimização tributária no próximo ano.',
    status: 'approved',
    createdAt: new Date('2023-07-20'),
    updatedAt: new Date('2023-07-25'),
  },
  {
    id: '4',
    clientId: '1',
    representativeId: '4',
    title: 'Análise de Conformidade Fiscal',
    description: 'Verificação da conformidade com a legislação fiscal vigente.',
    status: 'rejected',
    createdAt: new Date('2023-08-05'),
    updatedAt: new Date('2023-08-10'),
  },
  {
    id: '5',
    clientId: '1',
    representativeId: '4',
    title: 'Recuperação de Impostos Estaduais',
    description: 'Análise e recuperação de impostos estaduais pagos indevidamente.',
    status: 'converted',
    createdAt: new Date('2023-09-01'),
    updatedAt: new Date('2023-09-15'),
  }
];

interface ClientProposalsProps {
  clientId: string;
}

const ClientProposals: React.FC<ClientProposalsProps> = ({ clientId }) => {
  const [proposals] = useState<Proposal[]>(MOCK_PROPOSALS);
  const [activeTab, setActiveTab] = useState<string>('all');
  const { userRole } = useAuth();
  
  const isAdmin = userRole === 'admin';
  const isSalesRep = userRole === 'sales_rep';
  const canCreateProposal = isAdmin || isSalesRep;

  // Status display mapping
  const statusInfo: Record<ProposalStatus, { label: string, icon: React.ReactNode, color: string }> = {
    requested: { 
      label: 'Solicitada', 
      icon: <AlertCircle className="h-4 w-4" />, 
      color: 'bg-blue-100 text-blue-800 border-blue-200'
    },
    analyzing: { 
      label: 'Em Análise', 
      icon: <RotateCw className="h-4 w-4" />, 
      color: 'bg-amber-100 text-amber-800 border-amber-200'
    },
    approved: { 
      label: 'Aprovada', 
      icon: <CheckCircle className="h-4 w-4" />, 
      color: 'bg-green-100 text-green-800 border-green-200'
    },
    rejected: { 
      label: 'Rejeitada', 
      icon: <XCircle className="h-4 w-4" />, 
      color: 'bg-red-100 text-red-800 border-red-200'
    },
    converted: { 
      label: 'Convertida', 
      icon: <ArrowRightCircle className="h-4 w-4" />, 
      color: 'bg-purple-100 text-purple-800 border-purple-200'
    }
  };

  const filteredProposals = activeTab === 'all' 
    ? proposals 
    : proposals.filter(p => p.status === activeTab);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05 
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3 flex flex-row justify-between items-center">
        <CardTitle className="text-lg">Propostas Comerciais</CardTitle>
        {canCreateProposal && (
          <Button size="sm" className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Nova Proposta
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="requested">Solicitadas</TabsTrigger>
            <TabsTrigger value="analyzing">Em Análise</TabsTrigger>
            <TabsTrigger value="approved">Aprovadas</TabsTrigger>
            <TabsTrigger value="rejected">Rejeitadas</TabsTrigger>
            <TabsTrigger value="converted">Convertidas</TabsTrigger>
          </TabsList>
        </Tabs>

        <motion.div 
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredProposals.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Nenhuma proposta encontrada nesta categoria.
            </div>
          ) : (
            filteredProposals.map((proposal) => (
              <motion.div
                key={proposal.id}
                variants={itemVariants}
                className="p-4 rounded-lg border hover:border-primary cursor-pointer transition-colors"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <h3 className="font-medium">{proposal.title}</h3>
                    </div>
                    <Badge variant="outline" className={statusInfo[proposal.status].color}>
                      {statusInfo[proposal.status].icon}
                      <span className="ml-1">{statusInfo[proposal.status].label}</span>
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">{proposal.description}</p>
                  
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-2 pt-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>Representante ID: {proposal.representativeId}</span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>Criada: {proposal.createdAt.toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>Atualizada: {proposal.updatedAt.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default ClientProposals;
