
import React from 'react';
import { Client } from '../../types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface ClientsTableProps {
  clients: Client[];
  limit?: number;
}

const ClientsTable: React.FC<ClientsTableProps> = ({ clients }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 hover:from-green-200 hover:to-emerald-200 border-green-200';
      case 'inactive':
        return 'bg-gradient-to-r from-slate-100 to-gray-100 text-slate-800 hover:from-slate-200 hover:to-gray-200 border-slate-200';
      case 'pending':
        return 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 hover:from-amber-200 hover:to-yellow-200 border-amber-200';
      default:
        return 'bg-gradient-to-r from-slate-100 to-gray-100 text-slate-800 hover:from-slate-200 hover:to-gray-200 border-slate-200';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  // Animation variants
  const tableVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };
  
  const fadeInVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.4 } }
  };

  return (
    <motion.div 
      className="rounded-xl border overflow-hidden shadow-md bg-white"
      initial="hidden"
      animate="show"
      variants={fadeInVariants}
    >
      <Table>
        <TableHeader className="bg-gradient-to-r from-slate-50 to-gray-50">
          <TableRow>
            <TableHead className="font-medium text-slate-800">Nome do Cliente</TableHead>
            <TableHead className="font-medium text-slate-800">CNPJ</TableHead>
            <TableHead className="font-medium text-slate-800">Status</TableHead>
            <TableHead className="font-medium text-slate-800">Data de Cadastro</TableHead>
            <TableHead className="font-medium text-slate-800">Última Atualização</TableHead>
          </TableRow>
        </TableHeader>
        <motion.tbody
          variants={tableVariants}
          initial="hidden"
          animate="show"
        >
          {clients.map((client, index) => (
            <motion.tr 
              key={client.id} 
              className="hover:bg-slate-50 cursor-pointer border-b last:border-0 transition-colors"
              variants={rowVariants}
              custom={index}
              whileHover={{ backgroundColor: "rgba(241, 245, 249, 0.9)", scale: 1.005 }}
              transition={{ duration: 0.2 }}
            >
              <TableCell className="font-medium">{client.name}</TableCell>
              <TableCell>{client.cnpj}</TableCell>
              <TableCell>
                <Badge className={`${getStatusColor(client.status)} transition-all duration-300`} variant="outline">
                  {client.status === 'active' ? 'Ativo' : 
                   client.status === 'inactive' ? 'Inativo' : 'Pendente'}
                </Badge>
              </TableCell>
              <TableCell>{formatDate(client.createdAt)}</TableCell>
              <TableCell>{formatDate(client.updatedAt)}</TableCell>
            </motion.tr>
          ))}
        </motion.tbody>
      </Table>
    </motion.div>
  );
};

export default ClientsTable;
