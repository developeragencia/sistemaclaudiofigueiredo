
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowUp, ArrowDown, Activity, BarChart2, TrendingUp, DollarSign
} from 'lucide-react';
import { motion } from 'framer-motion';
import StatCard from '@/components/dashboard/StatCard';

interface ClientExecutionProps {
  clientId: string;
}

const ClientExecution: React.FC<ClientExecutionProps> = ({ clientId }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 400 }}>
          <StatCard
            title="R$ Total Recuperado"
            value={125000}
            icon={<DollarSign className="h-4 w-4" />}
            trend={{ value: 12, isPositive: true }}
            className="h-full"
            iconClassName="bg-green-100 text-green-600"
          />
        </motion.div>
        
        <motion.div whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 400 }}>
          <StatCard
            title="Análises Realizadas"
            value="842"
            icon={<Activity className="h-4 w-4" />}
            trend={{ value: 8, isPositive: true }}
            className="h-full"
            iconClassName="bg-blue-100 text-blue-600"
          />
        </motion.div>
        
        <motion.div whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 400 }}>
          <StatCard
            title="Taxa de Aprovação"
            value="87%"
            icon={<TrendingUp className="h-4 w-4" />}
            trend={{ value: 2, isPositive: false }}
            className="h-full"
            iconClassName="bg-purple-100 text-purple-600"
          />
        </motion.div>
        
        <motion.div whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 400 }}>
          <StatCard
            title="R$ Estimado"
            value={214500}
            icon={<BarChart2 className="h-4 w-4" />}
            trend={{ value: 15, isPositive: true }}
            className="h-full"
            iconClassName="bg-amber-100 text-amber-600"
          />
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Execuções em Andamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-md">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Recuperação IRRF/PJ 2023</div>
                    <div className="text-sm text-muted-foreground">Análise de notas fiscais</div>
                  </div>
                  <div className="text-green-600 font-medium flex items-center">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    R$ 32.456,78
                  </div>
                </div>
                <div className="mt-2 w-full bg-muted rounded-full h-2.5 dark:bg-gray-700">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                  <span>Progresso: 65%</span>
                  <span>Previsão: 15/07/2023</span>
                </div>
              </div>
              
              <div className="p-4 border rounded-md">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Auditoria Tributária Q2</div>
                    <div className="text-sm text-muted-foreground">Revisão de impostos pagos</div>
                  </div>
                  <div className="text-green-600 font-medium flex items-center">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    R$ 18.930,45
                  </div>
                </div>
                <div className="mt-2 w-full bg-muted rounded-full h-2.5 dark:bg-gray-700">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '40%' }}></div>
                </div>
                <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                  <span>Progresso: 40%</span>
                  <span>Previsão: 30/08/2023</span>
                </div>
              </div>
              
              <div className="p-4 border rounded-md">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Recuperação INSS</div>
                    <div className="text-sm text-muted-foreground">Análise de folha de pagamento</div>
                  </div>
                  <div className="text-green-600 font-medium flex items-center">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    R$ 42.789,12
                  </div>
                </div>
                <div className="mt-2 w-full bg-muted rounded-full h-2.5 dark:bg-gray-700">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '20%' }}></div>
                </div>
                <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                  <span>Progresso: 20%</span>
                  <span>Previsão: 22/09/2023</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Histórico de Execuções</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-md bg-muted/30">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Recuperação IRRF/PJ 2022</div>
                    <div className="text-sm text-muted-foreground">Concluído em 10/12/2022</div>
                  </div>
                  <div className="text-green-600 font-medium flex items-center">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    R$ 28.753,90
                  </div>
                </div>
                <div className="mt-2 w-full bg-muted rounded-full h-2.5">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '100%' }}></div>
                </div>
                <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                  <span>Status: Concluído</span>
                  <span>Duração: 45 dias</span>
                </div>
              </div>
              
              <div className="p-4 border rounded-md bg-muted/30">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Auditoria Fiscal 2022</div>
                    <div className="text-sm text-muted-foreground">Concluído em 15/03/2022</div>
                  </div>
                  <div className="text-red-600 font-medium flex items-center">
                    <ArrowDown className="h-4 w-4 mr-1" />
                    R$ 0,00
                  </div>
                </div>
                <div className="mt-2 w-full bg-muted rounded-full h-2.5">
                  <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '100%' }}></div>
                </div>
                <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                  <span>Status: Nenhum crédito identificado</span>
                  <span>Duração: 30 dias</span>
                </div>
              </div>
              
              <div className="p-4 border rounded-md bg-muted/30">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Recuperação PIS/COFINS 2021</div>
                    <div className="text-sm text-muted-foreground">Concluído em 05/08/2021</div>
                  </div>
                  <div className="text-green-600 font-medium flex items-center">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    R$ 53.421,67
                  </div>
                </div>
                <div className="mt-2 w-full bg-muted rounded-full h-2.5">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '100%' }}></div>
                </div>
                <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                  <span>Status: Concluído</span>
                  <span>Duração: 60 dias</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientExecution;
