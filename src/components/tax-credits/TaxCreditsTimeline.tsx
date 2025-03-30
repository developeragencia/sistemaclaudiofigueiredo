
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Check, AlertTriangle, AlertCircle } from "lucide-react";

// Mock timeline data
const timelineEvents = [
  {
    id: 1,
    date: "2023-10-25",
    title: "Crédito Aprovado",
    description: "Crédito de IRRF no valor de R$ 15.750,45 aprovado para compensação",
    status: "success",
    time: "15:32"
  },
  {
    id: 2,
    date: "2023-10-20",
    title: "Análise Documental",
    description: "Documentos complementares analisados pela equipe fiscal",
    status: "processing",
    time: "09:15"
  },
  {
    id: 3,
    date: "2023-10-15",
    title: "Solicitação de Documentos",
    description: "Solicitados documentos complementares para análise do crédito",
    status: "warning",
    time: "14:45"
  },
  {
    id: 4,
    date: "2023-10-10",
    title: "Identificação do Crédito",
    description: "Crédito identificado durante auditoria fiscal realizada",
    status: "info",
    time: "10:20"
  },
  {
    id: 5,
    date: "2023-10-05",
    title: "Início do Processo",
    description: "Iniciado processo de identificação de créditos tributários",
    status: "info",
    time: "08:30"
  }
];

// Helper function to render status icon
const getStatusIcon = (status: string) => {
  switch (status) {
    case 'success':
      return <Check className="h-5 w-5 text-green-500" />;
    case 'processing':
      return <Clock className="h-5 w-5 text-blue-500" />;
    case 'warning':
      return <AlertTriangle className="h-5 w-5 text-amber-500" />;
    case 'info':
    default:
      return <AlertCircle className="h-5 w-5 text-gray-500" />;
  }
};

// Helper function to get status color class
const getStatusColorClass = (status: string) => {
  switch (status) {
    case 'success':
      return 'bg-green-500';
    case 'processing':
      return 'bg-blue-500';
    case 'warning':
      return 'bg-amber-500';
    case 'info':
    default:
      return 'bg-gray-500';
  }
};

const TaxCreditsTimeline = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Linha do Tempo dos Créditos</h3>
      </div>
      
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-gray-200"></div>
        
        {/* Timeline events */}
        <div className="space-y-8">
          {timelineEvents.map((event) => (
            <div key={event.id} className="relative flex gap-x-4">
              {/* Timeline node */}
              <div className={`absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-full border-4 bg-white ${
                event.status === 'success' ? 'border-green-100' :
                event.status === 'processing' ? 'border-blue-100' :
                event.status === 'warning' ? 'border-amber-100' : 'border-gray-100'
              }`}>
                {getStatusIcon(event.status)}
              </div>
              
              {/* Timeline content */}
              <Card className="ml-16 flex-grow">
                <CardContent className="pt-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-xs text-gray-500">
                        {new Date(event.date).toLocaleDateString('pt-BR')} {event.time}
                      </div>
                      <div className={`h-2 w-2 rounded-full ${getStatusColorClass(event.status)}`}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaxCreditsTimeline;
