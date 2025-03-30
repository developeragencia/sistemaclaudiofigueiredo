
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, PieChart, Pie, Bar, XAxis, YAxis, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';

interface CalculatorChartsProps {
  data: any | null;
}

// Mock data for charts
const mockData = [
  { name: 'IRRF', value: 225, fill: '#3b82f6' },
  { name: 'PIS/COFINS', value: 2312.5, fill: '#10b981' },
  { name: 'ISS', value: 500, fill: '#f59e0b' },
  { name: 'ICMS', value: 5400, fill: '#8b5cf6' },
  { name: 'IPI', value: 1440, fill: '#ef4444' }
];

const monthlyData = [
  { name: 'Jan', IRRF: 150, PISCOFINS: 1800, ISS: 450, ICMS: 5100, IPI: 1200 },
  { name: 'Fev', IRRF: 180, PISCOFINS: 2100, ISS: 500, ICMS: 5300, IPI: 1300 },
  { name: 'Mar', IRRF: 200, PISCOFINS: 2200, ISS: 520, ICMS: 5400, IPI: 1350 },
  { name: 'Abr', IRRF: 220, PISCOFINS: 2300, ISS: 530, ICMS: 5450, IPI: 1400 },
  { name: 'Mai', IRRF: 225, PISCOFINS: 2312.5, ISS: 500, ICMS: 5400, IPI: 1440 }
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];

// Format currency for tooltip
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-lg rounded">
        <p className="font-medium">{`${label}`}</p>
        <p className="text-blue-600">
          {`${payload[0].name}: ${formatCurrency(payload[0].value)}`}
        </p>
      </div>
    );
  }

  return null;
};

const CalculatorCharts: React.FC<CalculatorChartsProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4">
        <h3 className="text-blue-800 font-medium mb-1">Análise Visual</h3>
        <p className="text-sm text-blue-600">
          Visualize graficamente a distribuição dos créditos tributários calculados.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <h4 className="text-lg font-medium mb-4">Distribuição por Tipo de Tributo</h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mockData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h4 className="text-lg font-medium mb-4">Evolução Mensal por Tributo</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={monthlyData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="IRRF" fill="#3b82f6" />
                <Bar dataKey="PISCOFINS" fill="#10b981" />
                <Bar dataKey="ISS" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <h4 className="text-lg font-medium mb-4">Comparativo Total por Tipo de Tributo</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={mockData}
              layout="vertical"
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend />
              <Bar dataKey="value" fill="#3b82f6">
                {mockData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalculatorCharts;
