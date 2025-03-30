
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { ArrowUp, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// Mock data
const retentionSummaryData = {
  totalAudited: 325,
  correctCount: 248,
  discrepancyCount: 65,
  exemptCount: 12,
  potentialCredit: 'R$ 156.485,25',
  averageDiscrepancy: 'R$ 2.407,47',
  recoveredAmount: 'R$ 83.750,00',
  pendingAmount: 'R$ 72.735,25'
};

const topDiscrepancies = [
  { supplier: 'Serviços Tecnologia LTDA', cnpj: '12.345.678/0001-90', amount: 'R$ 15.600,00' },
  { supplier: 'Consultoria Empresarial S.A.', cnpj: '98.765.432/0001-10', amount: 'R$ 12.850,50' },
  { supplier: 'Assessoria Contábil ME', cnpj: '34.567.890/0001-45', amount: 'R$ 9.750,75' },
  { supplier: 'Software Solutions LTDA', cnpj: '23.456.789/0001-12', amount: 'R$ 8.500,00' },
  { supplier: 'Marketing Digital S.A.', cnpj: '87.654.321/0001-98', amount: 'R$ 7.200,00' }
];

const statusData = [
  { name: 'Correto', value: 248, color: '#10b981' },
  { name: 'Discrepância', value: 65, color: '#f59e0b' },
  { name: 'Isento', value: 12, color: '#3b82f6' }
];

const monthlyData = [
  { month: 'Jun', audited: 45, discrepancies: 8, recovered: 28500 },
  { month: 'Jul', audited: 58, discrepancies: 12, recovered: 32400 },
  { month: 'Ago', audited: 65, discrepancies: 15, recovered: 41200 },
  { month: 'Set', audited: 72, discrepancies: 18, recovered: 49800 },
  { month: 'Out', audited: 85, discrepancies: 22, recovered: 54600 }
];

const taxTypeData = [
  { name: 'IRPJ', value: 52 },
  { name: 'CSLL', value: 48 },
  { name: 'COFINS', value: 65 },
  { name: 'PIS', value: 58 },
  { name: 'ISS', value: 42 }
];

const RetentionSummary = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Auditado</CardDescription>
            <CardTitle className="text-2xl">
              {retentionSummaryData.totalAudited} <span className="text-sm font-normal text-muted-foreground">operações</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 items-center">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-green-500 mr-1"></div>
                <span className="text-xs">{retentionSummaryData.correctCount} corretos</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-amber-500 mr-1"></div>
                <span className="text-xs">{retentionSummaryData.discrepancyCount} discrepâncias</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-blue-500 mr-1"></div>
                <span className="text-xs">{retentionSummaryData.exemptCount} isentos</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Créditos Potenciais</CardDescription>
            <CardTitle className="text-2xl">{retentionSummaryData.potentialCredit}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 items-center text-xs text-muted-foreground">
              <div className="flex items-center">
                <ArrowUp className="h-3 w-3 text-green-600 mr-1" />
                <span>+28% em relação ao mês anterior</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Recuperado</CardDescription>
            <CardTitle className="text-2xl text-green-600">{retentionSummaryData.recoveredAmount}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center mb-1 text-xs">
                <span>Progresso</span>
                <span>53.5%</span>
              </div>
              <Progress value={53.5} className="h-2" />
              <div className="text-xs text-muted-foreground">
                Pendente: {retentionSummaryData.pendingAmount}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Diferença Média</CardDescription>
            <CardTitle className="text-2xl text-amber-600">{retentionSummaryData.averageDiscrepancy}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 items-center">
              <Badge variant="outline" className="border-amber-500 text-amber-500">
                <AlertTriangle className="h-3 w-3 mr-1" /> 
                <span className="text-xs">Por discrepância</span>
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Chart */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Distribuição por Status</CardTitle>
            <CardDescription>
              Auditorias por resultado de análise
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="flex flex-col items-center p-2 rounded-md bg-muted/50">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm font-medium">Correto</span>
                </div>
                <span className="text-lg font-bold">{statusData[0].value}</span>
              </div>
              
              <div className="flex flex-col items-center p-2 rounded-md bg-muted/50">
                <div className="flex items-center">
                  <AlertTriangle className="h-4 w-4 text-amber-600 mr-1" />
                  <span className="text-sm font-medium">Discrepância</span>
                </div>
                <span className="text-lg font-bold">{statusData[1].value}</span>
              </div>
              
              <div className="flex flex-col items-center p-2 rounded-md bg-muted/50">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-blue-600 mr-1" />
                  <span className="text-sm font-medium">Isento</span>
                </div>
                <span className="text-lg font-bold">{statusData[2].value}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Monthly Trend Chart */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Tendência Mensal</CardTitle>
            <CardDescription>
              Auditorias e recuperação por mês
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthlyData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip formatter={(value, name) => {
                    if (name === "recovered") return [`R$ ${value}`, "Recuperado"];
                    return [value, name === "audited" ? "Auditorias" : "Discrepâncias"];
                  }} />
                  <Legend formatter={(value) => {
                    if (value === "audited") return "Auditorias";
                    if (value === "discrepancies") return "Discrepâncias";
                    return "Valor Recuperado";
                  }} />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="audited"
                    stroke="#8b5cf6"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="discrepancies"
                    stroke="#f59e0b"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="recovered"
                    stroke="#10b981"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Tax Type Chart */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Discrepâncias por Imposto</CardTitle>
            <CardDescription>
              Distribuição de discrepâncias por tipo de imposto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={taxTypeData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Quantidade" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Top Discrepancies */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Maiores Discrepâncias</CardTitle>
            <CardDescription>
              Fornecedores com maiores discrepâncias em valores absolutos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topDiscrepancies.map((item, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-3 last:border-0">
                  <div className="space-y-1">
                    <div className="font-medium">{item.supplier}</div>
                    <div className="text-xs text-muted-foreground">{item.cnpj}</div>
                  </div>
                  <div className="text-lg font-semibold text-amber-600">{item.amount}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RetentionSummary;
