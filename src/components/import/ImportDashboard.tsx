
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from '@/components/ui/select';
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
import { CheckCircle2, AlertTriangle, XCircle, FileText, ArrowUp, ArrowDown } from 'lucide-react';

// Mock data for the charts
const importStatsByDate = [
  { date: '01/11/2023', total: 5, success: 4, partial: 1, failed: 0 },
  { date: '02/11/2023', total: 3, success: 2, partial: 0, failed: 1 },
  { date: '03/11/2023', total: 8, success: 7, partial: 1, failed: 0 },
  { date: '04/11/2023', total: 6, success: 3, partial: 2, failed: 1 },
  { date: '05/11/2023', total: 10, success: 9, partial: 0, failed: 1 }
];

const importsByFileType = [
  { name: 'CSV', value: 45 },
  { name: 'XLSX', value: 30 },
  { name: 'PDF', value: 15 },
  { name: 'JSON', value: 8 },
  { name: 'XML', value: 2 }
];

const importTrend = [
  { month: 'Jul', count: 20 },
  { month: 'Ago', count: 25 },
  { month: 'Set', count: 30 },
  { month: 'Out', count: 40 },
  { month: 'Nov', count: 35 }
];

const importsByStatus = [
  { name: 'Sucesso', value: 75, color: '#10b981' },
  { name: 'Parcial', value: 15, color: '#f59e0b' },
  { name: 'Falha', value: 10, color: '#ef4444' }
];

const summaryMetrics = [
  { 
    title: 'Total de Importações', 
    value: '245', 
    change: '+12%', 
    trend: 'up',
    description: 'Nos últimos 30 dias'
  },
  { 
    title: 'Taxa de Sucesso', 
    value: '92%', 
    change: '+3%', 
    trend: 'up',
    description: 'Melhoria em relação ao mês anterior'
  },
  { 
    title: 'Registros Processados', 
    value: '568.342', 
    change: '+18%', 
    trend: 'up',
    description: 'Aumento de volume processado'
  },
  { 
    title: 'Tempo Médio', 
    value: '3m 45s', 
    change: '-30s', 
    trend: 'down',
    description: 'Tempo de processamento por importação'
  }
];

const ImportDashboard = () => {
  const [period, setPeriod] = useState('30days');
  
  const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold">Dashboard de Importações</h2>
        
        <div className="mt-2 sm:mt-0">
          <Select defaultValue="30days" onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Últimos 7 dias</SelectItem>
              <SelectItem value="30days">Últimos 30 dias</SelectItem>
              <SelectItem value="90days">Últimos 90 dias</SelectItem>
              <SelectItem value="year">Este ano</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex flex-col">
                <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                <div className="flex items-baseline justify-between mt-1">
                  <h3 className="text-2xl font-bold">{metric.value}</h3>
                  <div className={`text-sm flex items-center ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.trend === 'up' ? (
                      <ArrowUp className="h-4 w-4 mr-1" />
                    ) : (
                      <ArrowDown className="h-4 w-4 mr-1" />
                    )}
                    {metric.change}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Imports by Status */}
        <Card>
          <CardHeader>
            <CardTitle>Status das Importações</CardTitle>
            <CardDescription>Distribuição por status de conclusão</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={importsByStatus}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {importsByStatus.map((entry, index) => (
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
                  <CheckCircle2 className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm font-medium">Sucesso</span>
                </div>
                <span className="text-lg font-bold">75%</span>
              </div>
              
              <div className="flex flex-col items-center p-2 rounded-md bg-muted/50">
                <div className="flex items-center">
                  <AlertTriangle className="h-4 w-4 text-amber-600 mr-1" />
                  <span className="text-sm font-medium">Parcial</span>
                </div>
                <span className="text-lg font-bold">15%</span>
              </div>
              
              <div className="flex flex-col items-center p-2 rounded-md bg-muted/50">
                <div className="flex items-center">
                  <XCircle className="h-4 w-4 text-red-600 mr-1" />
                  <span className="text-sm font-medium">Falha</span>
                </div>
                <span className="text-lg font-bold">10%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Import Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Tendência de Importações</CardTitle>
            <CardDescription>Volume de importações ao longo do tempo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={importTrend}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#3b82f6"
                    activeDot={{ r: 8 }}
                    name="Importações"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* File Types */}
        <Card>
          <CardHeader>
            <CardTitle>Tipos de Arquivos</CardTitle>
            <CardDescription>Distribuição por formato de arquivo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={importsByFileType}
                  layout="vertical"
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Contagem" fill="#8b5cf6">
                    {importsByFileType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 grid grid-cols-5 gap-2">
              {importsByFileType.map((type, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className="w-3 h-3 rounded-full mb-1"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-xs font-medium">{type.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Daily Imports */}
        <Card>
          <CardHeader>
            <CardTitle>Importações por Dia</CardTitle>
            <CardDescription>Detalhamento diário das importações recentes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={importStatsByDate}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="success" name="Sucesso" stackId="a" fill="#10b981" />
                  <Bar dataKey="partial" name="Parcial" stackId="a" fill="#f59e0b" />
                  <Bar dataKey="failed" name="Falha" stackId="a" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ImportDashboard;
