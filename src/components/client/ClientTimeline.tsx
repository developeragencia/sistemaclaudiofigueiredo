
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from '@/types';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, AlertTriangle, FileText, User, 
  Calendar, Clock, Filter, RefreshCcw, Activity as ActivityLucideIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ClientTimelineProps {
  clientId: string;
}

// Mock activities
const MOCK_ACTIVITIES: Activity[] = [
  {
    id: '1',
    userId: 'user1',
    clientId: '1',
    type: 'create_client',
    description: 'Cliente criado no sistema',
    createdAt: new Date('2023-01-15T10:30:00')
  },
  {
    id: '2',
    userId: 'user2',
    clientId: '1',
    type: 'create_proposal',
    description: 'Nova proposta comercial adicionada: Recuperação de Créditos',
    metadata: { proposalId: 'prop1', status: 'requested' },
    createdAt: new Date('2023-01-20T14:45:00')
  },
  {
    id: '3',
    userId: 'user3',
    clientId: '1',
    type: 'update_proposal',
    description: 'Proposta atualizada para: Em Análise',
    metadata: { proposalId: 'prop1', oldStatus: 'requested', newStatus: 'analyzing' },
    createdAt: new Date('2023-01-22T09:15:00')
  },
  {
    id: '4',
    userId: 'user3',
    clientId: '1',
    type: 'update_proposal',
    description: 'Proposta aprovada',
    metadata: { proposalId: 'prop1', oldStatus: 'analyzing', newStatus: 'approved' },
    createdAt: new Date('2023-01-25T16:20:00')
  },
  {
    id: '5',
    userId: 'user1',
    clientId: '1',
    type: 'import_data',
    description: 'Importação de dados fiscais realizada',
    metadata: { fileCount: 12, recordCount: 1584 },
    createdAt: new Date('2023-02-05T11:10:00')
  },
  {
    id: '6',
    userId: 'user4',
    clientId: '1',
    type: 'update_client',
    description: 'Informações do cliente atualizadas',
    createdAt: new Date('2023-02-10T15:30:00')
  }
];

const ActivityIcon = ({ type }: { type: Activity['type'] }) => {
  switch (type) {
    case 'create_client':
      return <User className="h-5 w-5 text-blue-600" />;
    case 'update_client':
      return <RefreshCcw className="h-5 w-5 text-amber-600" />;
    case 'create_proposal':
      return <FileText className="h-5 w-5 text-green-600" />;
    case 'update_proposal':
      return <CheckCircle2 className="h-5 w-5 text-purple-600" />;
    case 'import_data':
      return <AlertTriangle className="h-5 w-5 text-orange-600" />;
    case 'login':
      return <User className="h-5 w-5 text-gray-600" />;
    default:
      return <ActivityLucideIcon className="h-5 w-5 text-gray-600" />;
  }
};

const ClientTimeline: React.FC<ClientTimelineProps> = ({ clientId }) => {
  const activities = MOCK_ACTIVITIES.sort((a, b) => 
    b.createdAt.getTime() - a.createdAt.getTime()
  );

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

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
        <CardTitle className="text-lg">Timeline de Atividades</CardTitle>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Filter className="h-4 w-4" />
          Filtrar
        </Button>
      </CardHeader>
      <CardContent>
        <motion.div 
          className="relative border-l border-gray-200 ml-3 pl-8 space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {activities.map((activity) => (
            <motion.div
              key={activity.id}
              variants={itemVariants}
              className="relative"
            >
              {/* Activity Dot */}
              <div className="absolute -left-11 mt-1.5 p-1 rounded-full border-4 border-background">
                <ActivityIcon type={activity.type} />
              </div>
              
              {/* Activity Content */}
              <div className="p-4 bg-card border rounded-lg">
                <p className="font-medium">{activity.description}</p>
                
                <div className="mt-2 flex flex-col sm:flex-row sm:justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>Usuário ID: {activity.userId}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 mt-1 sm:mt-0">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(activity.createdAt)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Optional Metadata */}
                {activity.metadata && (
                  <div className="mt-2 p-2 bg-muted rounded-md text-sm">
                    <div className="font-medium mb-1">Detalhes:</div>
                    <ul className="list-disc pl-5 space-y-1">
                      {Object.entries(activity.metadata).map(([key, value]) => (
                        <li key={key}>
                          <span className="font-medium">{key}:</span> {value.toString()}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default ClientTimeline;
