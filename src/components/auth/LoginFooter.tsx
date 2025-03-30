
import React from 'react';

const LoginFooter: React.FC = () => {
  return (
    <>
      <p className="text-sm text-center text-muted-foreground">
        Este é um sistema de acesso restrito para clientes e usuários autorizados.
      </p>
      
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          Sistema Claudio Figueiredo.
        </p>
      </div>
    </>
  );
};

export default LoginFooter;
