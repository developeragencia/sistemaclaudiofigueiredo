
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Calendar, FileSpreadsheet, FileText, Download, BarChart3, FileCog, FileJson } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import RevenueChart from "@/components/reports/RevenueChart";
import AuditTrailTable from "@/components/reports/AuditTrailTable";
import CompensationSimulator from "@/components/reports/CompensationSimulator";

export default function Reports() {
  const { toast } = useToast();
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date()
  });
  const [reportType, setReportType] = useState("detailed");
  const [reportFormat, setReportFormat] = useState("pdf");

  const handleGenerateReport = () => {
    toast({
      title: "Relatório gerado",
      description: `O relatório foi gerado e está pronto para download.`,
      variant: "default",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-sky-800">Relatórios e Dossiês Tributários</h1>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="general">Dashboard Gerencial</TabsTrigger>
          <TabsTrigger value="detailed">Relatórios Detalhados</TabsTrigger>
          <TabsTrigger value="compensation">Compensação Tributária</TabsTrigger>
          <TabsTrigger value="audit">Trilha de Auditoria</TabsTrigger>
        </TabsList>

        {/* Dashboard Gerencial */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="text-sky-600" />
                Dashboard Gerencial
              </CardTitle>
              <CardDescription>
                Visualize dados essenciais para tomada de decisões
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RevenueChart />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Relatórios Detalhados */}
        <TabsContent value="detailed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="text-sky-600" />
                Gerar Relatórios Detalhados
              </CardTitle>
              <CardDescription>
                Selecione as opções para gerar relatórios específicos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tipo de Relatório</label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="detailed">Retenções Detalhadas</SelectItem>
                      <SelectItem value="summary">Resumo de Retenções</SelectItem>
                      <SelectItem value="supplier">Retenções por Fornecedor</SelectItem>
                      <SelectItem value="retention">Comprovantes de Retenção</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Formato</label>
                  <Select value={reportFormat} onValueChange={setReportFormat}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o formato" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">Período</label>
                  <DateRangePicker date={date} setDate={setDate} />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleGenerateReport} className="bg-sky-700 hover:bg-sky-800">
                <Download className="mr-2 h-4 w-4" />
                Gerar Relatório
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Compensação Tributária */}
        <TabsContent value="compensation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCog className="text-sky-600" />
                Simulação de Compensação Tributária
              </CardTitle>
              <CardDescription>
                Simule cenários de compensação com correção monetária pela Selic
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CompensationSimulator />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trilha de Auditoria */}
        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileJson className="text-sky-600" />
                Trilha de Auditoria
              </CardTitle>
              <CardDescription>
                Registro detalhado de alterações no sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AuditTrailTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
