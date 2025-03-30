
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Clock, UserCheck, FileCheck } from "lucide-react";
import { motion } from "framer-motion";
import TwoFactorAuth from '@/components/security/TwoFactorAuth';
import SessionExpiration from '@/components/security/SessionExpiration';
import AccessProtection from '@/components/security/AccessProtection';
import AuditTrails from '@/components/security/AuditTrails';
import UsersPermissions from '@/components/security/UsersPermissions';

const SecurityHub = () => {
  const [activeTab, setActiveTab] = useState("two-factor");
  
  const tabModules = [
    { 
      id: "two-factor", 
      label: "Autenticação em Dois Fatores", 
      icon: <Lock className="h-5 w-5" />, 
      component: <TwoFactorAuth /> 
    },
    { 
      id: "session", 
      label: "Expiração de Sessão", 
      icon: <Clock className="h-5 w-5" />, 
      component: <SessionExpiration /> 
    },
    { 
      id: "access", 
      label: "Proteção de Acesso", 
      icon: <Shield className="h-5 w-5" />, 
      component: <AccessProtection /> 
    },
    { 
      id: "audit", 
      label: "Trilhas de Auditoria", 
      icon: <FileCheck className="h-5 w-5" />, 
      component: <AuditTrails /> 
    },
    { 
      id: "users", 
      label: "Usuários e Permissões", 
      icon: <UserCheck className="h-5 w-5" />, 
      component: <UsersPermissions /> 
    }
  ];

  return (
    <div className="container mx-auto py-6 space-y-6">
      <motion.div 
        className="flex flex-col space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold tracking-tight text-blue-900">Segurança & Auditoria</h1>
        <p className="text-muted-foreground">
          Central de gerenciamento de segurança e auditorias do sistema
        </p>
      </motion.div>

      <Card className="overflow-hidden border-blue-100">
        <CardHeader className="bg-blue-50/50">
          <CardTitle className="text-blue-900 flex items-center gap-2">
            <Shield className="text-blue-600" />
            Central de Segurança
          </CardTitle>
          <CardDescription>
            Gerencie todas as configurações de segurança e auditoria em um só lugar
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="two-factor" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 mb-8">
              {tabModules.map(module => (
                <TabsTrigger key={module.id} value={module.id} className="flex items-center gap-2">
                  {module.icon}
                  <span className="hidden sm:inline">{module.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            
            {tabModules.map(module => (
              <TabsContent key={module.id} value={module.id} className="mt-0">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {module.component}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityHub;
