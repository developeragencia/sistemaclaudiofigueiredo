
import React from "react";
import { Card } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", retenções: 14000, recuperados: 9800 },
  { month: "Fev", retenções: 18000, recuperados: 12400 },
  { month: "Mar", retenções: 16000, recuperados: 10200 },
  { month: "Abr", retenções: 21000, recuperados: 15800 },
  { month: "Mai", retenções: 19000, recuperados: 13600 },
  { month: "Jun", retenções: 25000, recuperados: 18900 },
  { month: "Jul", retenções: 27000, recuperados: 21300 },
  { month: "Ago", retenções: 29000, recuperados: 23700 },
  { month: "Set", retenções: 31000, recuperados: 24900 },
  { month: "Out", retenções: 29000, recuperados: 22100 },
  { month: "Nov", retenções: 33000, recuperados: 25600 },
  { month: "Dez", retenções: 39000, recuperados: 31200 },
];

const chartConfig = {
  retenções: {
    label: "Retenções Tributárias",
    color: "#0369a1", // sky-700
  },
  recuperados: {
    label: "Valores Recuperados",
    color: "#38bdf8", // sky-400
  },
};

export default function RevenueChart() {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-medium mb-4">Evolução Financeira Anual</h3>
      <div className="h-80">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `R$${value}`} />
              <ChartTooltip content={<ChartTooltipContent formatter={(value) => `R$ ${value}`} />} />
              <Area
                type="monotone"
                dataKey="retenções"
                name="retenções"
                stackId="1"
                stroke="#0369a1"
                fill="#0369a1"
              />
              <Area
                type="monotone"
                dataKey="recuperados"
                name="recuperados"
                stackId="1"
                stroke="#38bdf8"
                fill="#38bdf8"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </Card>
  );
}
