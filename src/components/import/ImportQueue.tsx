import React from 'react';
import { 
  Table, TableBody, TableCaption, TableCell, 
  TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Play, Pause, XCircle, AlertTriangle, 
  CheckCircle, FileSpreadsheet, FileJson, FileText, Clock 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

// Mock processing queue data
const queueItems = [
  {
    id: '1',
    fileName: 'pagamentos-jan-2023.csv',
    fileType: 'csv',
    status: 'processing',
    progress: 45,
    totalRecords: 1245,
    processedRecords: 560,
    submittedAt: '2023-11-05T14:30:00',
    estimatedCompletion: '2023-11-05T14:45:00'
  },
  {
    id: '2',
    fileName: 'fornecedores.xlsx',
    fileType: 'xlsx',
    status: 'queued',
    progress: 0,
    totalRecords: 568,
    processedRecords: 0,
    submittedAt: '2023-11-05T14:35:00',
    estimatedCompletion: '2023-11-05T14:50:00'
  },
  {
    id: '3',
    fileName: 'notas-fiscais.pdf',
    fileType: 'pdf',
    status: 'paused',
    progress: 32,
    totalRecords: 89,
    processedRecords: 28,
    submittedAt: '2023-11-05T14:20:00',
    estimatedCompletion: '2023-11-05T14:40:00'
  },
  {
    id: '4',
    fileName: 'dados-api.json',
    fileType: 'json',
    status: 'error',
    progress: 78,
    totalRecords: 423,
    processedRecords: 329,
    submittedAt: '2023-11-05T14:15:00',
    estimatedCompletion: null,
    error: 'Formato de dados incompatível na linha 330'
  },
  {
    id: '5',
    fileName: 'retenções-out-2023.csv',
    fileType: 'csv',
    status: 'completed',
    progress: 100,
    totalRecords: 890,
    processedRecords: 890,
    submittedAt: '2023-11-05T13:50:00',
    completedAt: '2023-11-05T14:10:00'
  }
];

const ImportQueue = () => {
  // Format date to locale string
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  // Get file icon based on file type
  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'csv':
      case 'xlsx':
      case 'xls':
        return <FileSpreadsheet className="h-5 w-5 text-green-600" />;
      case 'json':
      case 'xml':
        return <FileJson className="h-5 w-5 text-blue-600" />;
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-600" />;
      default:
        return <FileSpreadsheet className="h-5 w-5" />;
    }
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processing':
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600">
            Processando
          </Badge>
        );
      case 'queued':
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-500">
            Na Fila
          </Badge>
        );
      case 'paused':
        return (
          <Badge variant="outline" className="border-gray-500 text-gray-500">
            Pausado
          </Badge>
        );
      case 'completed':
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            Concluído
          </Badge>
        );
      case 'error':
        return (
          <Badge variant="destructive">
            Erro
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            Desconhecido
          </Badge>
        );
    }
  };

  // Queue action handlers
  const handlePauseResume = (id: string, currentStatus: string) => {
    const action = currentStatus === 'paused' ? 'retomado' : 'pausado';
    toast.success(`Processamento ${action} com sucesso`);
  };

  const handleCancel = (id: string) => {
    toast.info(`Processamento cancelado`);
  };

  const handleRetry = (id: string) => {
    toast.success(`Processamento reiniciado`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Fila de Processamento</h2>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => toast.info('Atualizando fila...')}>
            <Clock className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
        </div>
      </div>

      <Table>
        <TableCaption>Arquivos na fila de processamento</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Arquivo</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Progresso</TableHead>
            <TableHead>Registros</TableHead>
            <TableHead>Enviado em</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {queueItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {getFileIcon(item.fileType)}
                  <span>{item.fileName}</span>
                </div>
              </TableCell>
              <TableCell>
                {getStatusBadge(item.status)}
              </TableCell>
              <TableCell>
                <div className="w-full flex flex-col gap-1">
                  <Progress value={item.progress} className="h-2" />
                  <span className="text-xs text-muted-foreground">
                    {item.progress}% completo
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm">
                  {item.processedRecords}/{item.totalRecords}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-sm">
                  {formatDate(item.submittedAt)}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  {item.status === 'processing' && (
                    <Button 
                      size="icon" 
                      variant="ghost"
                      onClick={() => handlePauseResume(item.id, item.status)}
                      title="Pausar processamento"
                    >
                      <Pause className="h-4 w-4" />
                    </Button>
                  )}
                  
                  {item.status === 'paused' && (
                    <Button 
                      size="icon" 
                      variant="ghost"
                      onClick={() => handlePauseResume(item.id, item.status)}
                      title="Retomar processamento"
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                  )}
                  
                  {item.status === 'error' && (
                    <Button 
                      size="icon" 
                      variant="ghost"
                      onClick={() => handleRetry(item.id)}
                      title="Tentar novamente"
                    >
                      <motion.div
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.3 }}
                      >
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                      </motion.div>
                    </Button>
                  )}
                  
                  {item.status !== 'completed' && (
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      onClick={() => handleCancel(item.id)}
                      title="Cancelar processamento"
                    >
                      <XCircle className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                  
                  {item.status === 'completed' && (
                    <Button 
                      size="icon" 
                      variant="ghost"
                      title="Processamento concluído"
                      disabled
                    >
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ImportQueue;
