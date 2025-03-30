
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Legend, PieChart, Pie, Cell
} from 'recharts';

const OperationalDashboard = () => {
  const areaChartData = [
    { name: 'Jan', processados: 400, aprovados: 240, reprovados: 160 },
    { name: 'Fev', processados: 300, aprovados: 220, reprovados: 80 },
    { name: 'Mar', processados: 200, aprovados: 180, reprovados: 20 },
    { name: 'Abr', processados: 278, aprovados: 250, reprovados: 28 },
    { name: 'Mai', processados: 189, aprovados: 170, reprovados: 19 },
    { name: 'Jun', processados: 239, aprovados: 220, reprovados: 19 },
    { name: 'Jul', processados: 349, aprovados: 310, reprovados: 39 },
  ];

  const barChartData = [
    { tipo: 'Nota Fiscal', quantidade: 120 },
    { tipo: 'Recibo', quantidade: 85 },
    { tipo: 'Contrato', quantidade: 45 },
    { tipo: 'Declaração', quantidade: 30 },
    { tipo: 'Outros', quantidade: 20 },
  ];

  const pieChartData = [
    { name: 'Em Processamento', value: 20 },
    { name: 'Processados', value: 65 },
    { name: 'Pendentes', value: 15 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FF8042'];

  const summaryCards = [
    { title: 'Total de Processamentos', value: '2,345', trend: '+15%', trendUp: true },
    { title: 'Taxa de Aprovação', value: '89,2%', trend: '+3.2%', trendUp: true },
    { title: 'Tempo Médio', value: '4.7 min', trend: '-1.5 min', trendUp: false },
    { title: 'Pendências', value: '28', trend: '-12%', trendUp: false },
  ];

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Painel Operacional</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {summaryCards.map((card, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-gray-500">{card.title}</p>
              <div className="flex items-end justify-between mt-2">
                <h3 className="text-3xl font-bold">{card.value}</h3>
                <div className={`text-sm px-2 py-1 rounded-full flex items-center ${
                  card.trendUp ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {card.trend}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Tabs defaultValue="visaoGeral" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="visaoGeral">Visão Geral</TabsTrigger>
          <TabsTrigger value="documentos">Documentos</TabsTrigger>
          <TabsTrigger value="desempenho">Desempenho</TabsTrigger>
        </TabsList>
        
        <TabsContent value="visaoGeral">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Volume Operacional</CardTitle>
                <CardDescription>
                  Número de documentos processados nos últimos 7 meses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={areaChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorProcessados" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorAprovados" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorReprovados" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#ffc658" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="processados" stroke="#8884d8" fillOpacity={1} fill="url(#colorProcessados)" />
                      <Area type="monotone" dataKey="aprovados" stroke="#82ca9d" fillOpacity={1} fill="url(#colorAprovados)" />
                      <Area type="monotone" dataKey="reprovados" stroke="#ffc658" fillOpacity={1} fill="url(#colorReprovados)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Tipos de Documentos</CardTitle>
                <CardDescription>
                  Distribuição por tipo de documento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="tipo" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="quantidade" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Status de Processamento</CardTitle>
                <CardDescription>
                  Distribuição por status atual
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="documentos">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Documentos</CardTitle>
              <CardDescription>
                Detalhamento por tipo e status de documentos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-12 text-gray-500">
                Conteúdo da aba Documentos será implementado em breve
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="desempenho">
          <Card>
            <CardHeader>
              <CardTitle>Métricas de Desempenho</CardTitle>
              <CardDescription>
                Indicadores de desempenho operacional
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-12 text-gray-500">
                Conteúdo da aba Desempenho será implementado em breve
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OperationalDashboard;
