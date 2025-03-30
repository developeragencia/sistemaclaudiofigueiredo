
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart3, TrendingUp, TrendingDown } from 'lucide-react';

const TaxCreditsSummary = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Total de Créditos</p>
                <h3 className="text-2xl font-bold text-blue-700 mt-1">R$ 55.765,67</h3>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>12% em relação ao trimestre anterior</span>
                </p>
              </div>
              <div className="bg-blue-100 p-2 rounded-lg">
                <BarChart3 className="h-5 w-5 text-blue-700" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Créditos Disponíveis</p>
                <h3 className="text-2xl font-bold text-green-700 mt-1">R$ 41.643,56</h3>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>8% em relação ao trimestre anterior</span>
                </p>
              </div>
              <div className="bg-green-100 p-2 rounded-lg">
                <BarChart3 className="h-5 w-5 text-green-700" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Créditos Pendentes</p>
                <h3 className="text-2xl font-bold text-amber-700 mt-1">R$ 14.122,11</h3>
                <p className="text-xs text-red-600 flex items-center mt-1">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  <span>3% em relação ao trimestre anterior</span>
                </p>
              </div>
              <div className="bg-amber-100 p-2 rounded-lg">
                <BarChart3 className="h-5 w-5 text-amber-700" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Distribuição de Créditos por Tipo</h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>IRRF</span>
              <span className="font-medium">42%</span>
            </div>
            <Progress value={42} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>PIS/COFINS</span>
              <span className="font-medium">28%</span>
            </div>
            <Progress value={28} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>ICMS</span>
              <span className="font-medium">18%</span>
            </div>
            <Progress value={18} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>ISS</span>
              <span className="font-medium">8%</span>
            </div>
            <Progress value={8} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>Outros</span>
              <span className="font-medium">4%</span>
            </div>
            <Progress value={4} className="h-2" />
          </div>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <h4 className="text-sm font-medium mb-4">Créditos por Período</h4>
            <div className="h-[200px] flex items-end justify-between gap-2">
              {[35, 42, 58, 75, 62, 80].map((value, index) => (
                <div key={index} className="relative flex flex-col items-center group">
                  <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium">
                    {value}%
                  </div>
                  <div 
                    className="w-8 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t"
                    style={{ height: `${value * 1.5}px` }}
                  />
                  <div className="text-xs mt-2">
                    {`Q${index + 1}`}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h4 className="text-sm font-medium mb-4">Status de Aprovação</h4>
            <div className="flex justify-center h-[200px]">
              <div className="w-40 h-40 rounded-full border-8 border-l-blue-500 border-t-green-500 border-r-amber-500 border-b-red-500 flex items-center justify-center transform -rotate-45">
                <div className="transform rotate-45 text-center">
                  <div className="text-3xl font-bold">78%</div>
                  <div className="text-xs text-muted-foreground">Aprovação</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TaxCreditsSummary;
