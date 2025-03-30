
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Upload, FileText, FileSpreadsheet, CheckCircle2, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const SupplierImport = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [processing, setProcessing] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === 'text/csv' || 
          selectedFile.type === 'application/vnd.ms-excel' ||
          selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        setFile(selectedFile);
        setError(null);
      } else {
        setFile(null);
        setError('Por favor, selecione um arquivo CSV ou Excel válido.');
      }
    }
  };
  
  const simulateUpload = () => {
    setUploadProgress(0);
    setProcessing(true);
    setCompleted(false);
    
    // Simulate progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // After upload completes, simulate processing
          simulateProcessing();
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };
  
  const simulateProcessing = () => {
    setTimeout(() => {
      setProcessing(false);
      setCompleted(true);
      toast({
        title: "Importação concluída",
        description: `${file?.name} foi importado com sucesso.`,
      });
    }, 1500);
  };
  
  const handleUpload = () => {
    if (!file) {
      setError('Por favor, selecione um arquivo para importar.');
      return;
    }
    
    simulateUpload();
  };
  
  const resetForm = () => {
    setFile(null);
    setUploadProgress(0);
    setProcessing(false);
    setCompleted(false);
    setError(null);
  };

  return (
    <div className="space-y-4">
      <div className="text-sm">
        <p className="mb-2">Importe fornecedores a partir de um arquivo CSV ou Excel.</p>
        <p className="text-muted-foreground text-xs">
          O arquivo deve conter as colunas: CNPJ, Razão Social, Nome Fantasia, Endereço, etc.
        </p>
      </div>
      
      {!processing && !completed && (
        <div className="space-y-4">
          <div className="border-2 border-dashed rounded-md p-6 text-center hover:border-sky-300 transition-colors cursor-pointer">
            <input 
              type="file" 
              id="supplier-file" 
              className="hidden"
              accept=".csv,.xls,.xlsx" 
              onChange={handleFileChange}
            />
            <label htmlFor="supplier-file" className="cursor-pointer">
              {file ? (
                <div className="flex flex-col items-center">
                  <FileSpreadsheet className="h-10 w-10 text-sky-600 mb-2" />
                  <p className="font-medium text-sm mb-1">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="font-medium text-sm">Arraste um arquivo ou clique para selecionar</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Suporta CSV, XLS, XLSX
                  </p>
                </div>
              )}
            </label>
          </div>
          
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              <p className="text-sm">{error}</p>
            </div>
          )}
          
          <div className="flex gap-2">
            <Button 
              onClick={handleUpload} 
              className="w-full bg-sky-600 hover:bg-sky-700"
              disabled={!file}
            >
              <FileText className="mr-2 h-4 w-4" />
              Importar Arquivo
            </Button>
          </div>
        </div>
      )}
      
      {(processing || completed) && (
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Status:</span>
              <span>
                {processing ? "Processando..." : "Concluído"}
              </span>
            </div>
            <Progress value={uploadProgress} />
          </div>
          
          <div className="p-4 rounded-md bg-muted flex items-start gap-3">
            <FileSpreadsheet className="h-6 w-6 text-sky-600 flex-shrink-0" />
            <div>
              <p className="font-medium text-sm">{file?.name}</p>
              <p className="text-xs text-muted-foreground">
                {processing ? (
                  "Analisando e processando dados..."
                ) : (
                  "Importação concluída com sucesso"
                )}
              </p>
            </div>
          </div>
          
          {completed && (
            <div className="bg-green-50 border border-green-200 rounded-md p-3 flex gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
              <div className="text-xs text-green-800">
                <p className="font-medium">Dados importados com sucesso</p>
                <p>Os fornecedores foram adicionados ao sistema.</p>
              </div>
            </div>
          )}
          
          <Button 
            onClick={resetForm} 
            variant="outline"
            className="w-full"
          >
            Importar Outro Arquivo
          </Button>
        </div>
      )}
    </div>
  );
};

export default SupplierImport;
