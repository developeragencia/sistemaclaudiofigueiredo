
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { 
  FileArchive, FileSpreadsheet, FileJson, FileText,
  File, Upload, AlertTriangle, CheckCircle2, RotateCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface UploadState {
  status: 'idle' | 'uploading' | 'processing' | 'success' | 'error';
  progress: number;
  files: FileList | null;
  error?: string;
}

const FileUploader = () => {
  const [uploadState, setUploadState] = useState<UploadState>({
    status: 'idle',
    progress: 0,
    files: null
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const supportedFormats = [
    { extension: 'csv', icon: <FileSpreadsheet className="h-10 w-10 text-green-600" /> },
    { extension: 'xls', icon: <FileSpreadsheet className="h-10 w-10 text-green-600" /> },
    { extension: 'xlsx', icon: <FileSpreadsheet className="h-10 w-10 text-green-600" /> },
    { extension: 'json', icon: <FileJson className="h-10 w-10 text-blue-600" /> },
    { extension: 'xml', icon: <FileArchive className="h-10 w-10 text-amber-600" /> },
    { extension: 'pdf', icon: <FileText className="h-10 w-10 text-red-600" /> },
  ];
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadState({
        ...uploadState,
        files: e.target.files,
        status: 'idle',
        error: undefined
      });
    }
  };
  
  const handleUpload = async () => {
    if (!uploadState.files) {
      toast.error('Por favor, selecione pelo menos um arquivo para upload');
      return;
    }
    
    // Set uploading state
    setUploadState(prev => ({ ...prev, status: 'uploading', progress: 0 }));
    
    // Simulate file upload process with timeout
    const totalFiles = uploadState.files.length;
    
    for (let i = 0; i < totalFiles; i++) {
      const file = uploadState.files[i];
      
      // Simulating upload progress
      for (let progress = 0; progress <= 100; progress += 5) {
        await new Promise(resolve => setTimeout(resolve, 50));
        setUploadState(prev => ({ 
          ...prev, 
          progress: Math.floor((i / totalFiles) * 100) + Math.floor(progress / totalFiles)
        }));
      }
    }
    
    // Set processing state
    setUploadState(prev => ({ ...prev, status: 'processing', progress: 100 }));
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate success
    setUploadState(prev => ({ ...prev, status: 'success' }));
    toast.success('Arquivos enviados para processamento com sucesso!');
    
    // Reset after success
    setTimeout(() => {
      if (fileInputRef.current) fileInputRef.current.value = '';
      setUploadState({
        status: 'idle',
        progress: 0,
        files: null
      });
    }, 3000);
  };
  
  const handleReset = () => {
    if (fileInputRef.current) fileInputRef.current.value = '';
    setUploadState({
      status: 'idle',
      progress: 0,
      files: null
    });
  };
  
  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase() || '';
    const format = supportedFormats.find(f => f.extension === extension);
    return format?.icon || <File className="h-10 w-10 text-gray-600" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center justify-center mb-8">
        {supportedFormats.map((format) => (
          <div key={format.extension} className="flex flex-col items-center">
            {format.icon}
            <span className="mt-1 text-sm text-muted-foreground">
              .{format.extension}
            </span>
          </div>
        ))}
      </div>
      
      <Card className="border-dashed border-2 bg-muted/50">
        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            accept=".csv,.xls,.xlsx,.json,.xml,.pdf"
            className="hidden"
            disabled={uploadState.status === 'uploading' || uploadState.status === 'processing'}
          />
          
          <AnimatePresence mode="wait">
            {uploadState.status === 'idle' && !uploadState.files && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center"
              >
                <div className="p-4 rounded-full bg-muted mb-4">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-medium text-lg mb-2">Arraste arquivos ou clique para upload</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Suporta CSV, XLS, XLSX, JSON, XML e PDF
                </p>
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  size="lg"
                >
                  Selecionar Arquivos
                </Button>
              </motion.div>
            )}
            
            {uploadState.files && (uploadState.status === 'idle') && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full"
              >
                <h3 className="font-medium text-lg mb-4">Arquivos selecionados:</h3>
                <div className="space-y-3 max-h-60 overflow-auto mb-6 pr-2">
                  {Array.from(uploadState.files).map((file, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-background rounded-lg border">
                      {getFileIcon(file.name)}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button 
                    onClick={handleUpload} 
                    className="flex-1"
                  >
                    Iniciar Upload
                  </Button>
                  <Button 
                    onClick={handleReset}
                    variant="outline"
                  >
                    Cancelar
                  </Button>
                </div>
              </motion.div>
            )}
            
            {(uploadState.status === 'uploading' || uploadState.status === 'processing') && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full text-center"
              >
                <div className="p-4 rounded-full bg-muted inline-flex mb-4">
                  {uploadState.status === 'processing' ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <RotateCw className="h-8 w-8 text-primary" />
                    </motion.div>
                  ) : (
                    <Upload className="h-8 w-8 text-primary" />
                  )}
                </div>
                
                <h3 className="font-medium text-lg mb-2">
                  {uploadState.status === 'uploading' ? 'Enviando arquivos...' : 'Processando arquivos...'}
                </h3>
                
                <Progress value={uploadState.progress} className="h-2 mb-2" />
                
                <p className="text-sm text-muted-foreground">
                  {uploadState.status === 'uploading' 
                    ? `Enviando ${uploadState.files?.length} arquivo(s)` 
                    : 'Realizando análise e processamento dos dados'}
                </p>
              </motion.div>
            )}
            
            {uploadState.status === 'success' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="p-4 rounded-full bg-green-100 inline-flex mb-4">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                
                <h3 className="font-medium text-lg mb-2">Upload concluído com sucesso!</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Seus arquivos estão na fila para processamento. O resultado estará disponível em breve.
                </p>
              </motion.div>
            )}
            
            {uploadState.status === 'error' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full"
              >
                <Alert variant="destructive">
                  <AlertTriangle className="h-5 w-5" />
                  <AlertTitle>Erro no upload</AlertTitle>
                  <AlertDescription>
                    {uploadState.error || 'Ocorreu um erro durante o upload dos arquivos. Por favor, tente novamente.'}
                  </AlertDescription>
                </Alert>
                
                <div className="mt-6 flex justify-center">
                  <Button 
                    onClick={handleReset}
                    variant="outline"
                  >
                    Tentar Novamente
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
};

export default FileUploader;
