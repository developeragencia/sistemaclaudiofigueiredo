
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, UserRole } from '@/types';
import { Plus, User as UserIcon, Shield, Mail, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';

// Mock users data
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@empresa.com',
    role: 'admin',
    isActive: true,
    createdAt: new Date('2023-01-15'),
  },
  {
    id: '2',
    name: 'Maria Souza',
    email: 'maria@empresa.com',
    role: 'office_staff',
    clientId: '1',
    isActive: true,
    createdAt: new Date('2023-02-20'),
  },
  {
    id: '3',
    name: 'Carlos Ferreira',
    email: 'carlos@cliente.gov.br',
    role: 'client',
    clientId: '1',
    isActive: true,
    createdAt: new Date('2023-03-10'),
  },
  {
    id: '4',
    name: 'Ana Oliveira',
    email: 'ana@representante.com',
    role: 'sales_rep',
    clientId: '1',
    isActive: false,
    createdAt: new Date('2023-04-05'),
  }
];

interface ClientUsersProps {
  clientId: string;
}

const ClientUsers: React.FC<ClientUsersProps> = ({ clientId }) => {
  const [users] = useState<User[]>(MOCK_USERS);
  const { userRole } = useAuth();
  const isAdmin = userRole === 'admin';
  
  // Role display mapping
  const roleDisplay: Record<UserRole, string> = {
    admin: 'Administrador',
    office_staff: 'Equipe do Escritório',
    client: 'Cliente',
    sales_rep: 'Representante Comercial',
  };

  // Role color mapping for badges
  const roleColor: Record<UserRole, string> = {
    admin: 'bg-purple-100 text-purple-800 border-purple-200',
    office_staff: 'bg-blue-100 text-blue-800 border-blue-200',
    client: 'bg-green-100 text-green-800 border-green-200',
    sales_rep: 'bg-amber-100 text-amber-800 border-amber-200',
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
        <CardTitle className="text-lg">Usuários</CardTitle>
        {isAdmin && (
          <Button size="sm" className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Novo Usuário
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <motion.div 
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {users.map((user) => (
            <motion.div
              key={user.id}
              variants={itemVariants}
              className={`p-4 rounded-lg border ${
                !user.isActive ? 'bg-muted/30' : ''
              }`}
            >
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    user.role === 'admin' ? 'bg-purple-100' :
                    user.role === 'office_staff' ? 'bg-blue-100' :
                    user.role === 'client' ? 'bg-green-100' : 'bg-amber-100'
                  }`}>
                    <UserIcon className={`h-5 w-5 ${
                      user.role === 'admin' ? 'text-purple-600' :
                      user.role === 'office_staff' ? 'text-blue-600' :
                      user.role === 'client' ? 'text-green-600' : 'text-amber-600'
                    }`} />
                  </div>
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      {user.name}
                      {!user.isActive && (
                        <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                          Inativo
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {user.email}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:items-end justify-center gap-1">
                  <Badge variant="outline" className={roleColor[user.role]}>
                    <Shield className="mr-1 h-3 w-3" />
                    {roleDisplay[user.role]}
                  </Badge>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Cadastrado em {user.createdAt.toLocaleDateString()}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default ClientUsers;
