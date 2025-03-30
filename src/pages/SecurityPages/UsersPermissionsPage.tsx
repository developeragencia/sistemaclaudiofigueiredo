
import React from 'react';
import { Card } from '@/components/ui/card';
import UsersPermissions from '@/components/security/UsersPermissions';

const UsersPermissionsPage = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-blue-900">Usuários e Permissões</h1>
        <p className="text-muted-foreground">
          Gerencie usuários, funções e controle de acesso ao sistema
        </p>
      </div>

      <UsersPermissions />
    </div>
  );
};

export default UsersPermissionsPage;
