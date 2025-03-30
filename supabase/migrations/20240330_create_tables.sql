-- Create fornecedores table
CREATE TABLE fornecedores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cnpj TEXT NOT NULL UNIQUE,
  razao_social TEXT NOT NULL,
  nome_fantasia TEXT,
  atividade_principal TEXT NOT NULL,
  atividade_secundaria TEXT[] DEFAULT '{}',
  natureza_juridica TEXT,
  logradouro TEXT,
  numero TEXT,
  complemento TEXT,
  cep TEXT,
  bairro TEXT,
  municipio TEXT,
  uf TEXT,
  email TEXT,
  telefone TEXT,
  data_situacao TEXT,
  status TEXT DEFAULT 'ativo',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW())
);

-- Create clientes table
CREATE TABLE clientes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cnpj TEXT NOT NULL UNIQUE,
  razao_social TEXT NOT NULL,
  nome_fantasia TEXT,
  email TEXT,
  telefone TEXT,
  status TEXT DEFAULT 'ativo',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW())
);

-- Create pagamentos table
CREATE TABLE pagamentos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cliente_id UUID NOT NULL REFERENCES clientes(id),
  fornecedor_id UUID NOT NULL REFERENCES fornecedores(id),
  valor DECIMAL(10,2) NOT NULL,
  data_pagamento DATE NOT NULL,
  descricao TEXT,
  numero_nota TEXT,
  tipo_servico TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW())
);

-- Create aliquotas_retencao table
CREATE TABLE aliquotas_retencao (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  atividade TEXT NOT NULL UNIQUE,
  aliquota_ir DECIMAL(5,2) NOT NULL,
  aliquota_pis DECIMAL(5,2) NOT NULL,
  aliquota_cofins DECIMAL(5,2) NOT NULL,
  aliquota_csll DECIMAL(5,2) NOT NULL,
  aliquota_iss DECIMAL(5,2) NOT NULL,
  valor_minimo_retencao DECIMAL(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW())
);

-- Create auditorias table
CREATE TABLE auditorias (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pagamento_id UUID NOT NULL REFERENCES pagamentos(id),
  valor_original DECIMAL(10,2) NOT NULL,
  valor_ir DECIMAL(10,2) NOT NULL,
  valor_pis DECIMAL(10,2) NOT NULL,
  valor_cofins DECIMAL(10,2) NOT NULL,
  valor_csll DECIMAL(10,2) NOT NULL,
  valor_iss DECIMAL(10,2) NOT NULL,
  valor_liquido DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW())
);

-- Create indexes
CREATE INDEX idx_fornecedores_cnpj ON fornecedores(cnpj);
CREATE INDEX idx_clientes_cnpj ON clientes(cnpj);
CREATE INDEX idx_pagamentos_cliente_id ON pagamentos(cliente_id);
CREATE INDEX idx_pagamentos_fornecedor_id ON pagamentos(fornecedor_id);
CREATE INDEX idx_auditorias_pagamento_id ON auditorias(pagamento_id);

-- Create trigger to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::TEXT, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_fornecedores_updated_at
    BEFORE UPDATE ON fornecedores
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clientes_updated_at
    BEFORE UPDATE ON clientes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pagamentos_updated_at
    BEFORE UPDATE ON pagamentos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_aliquotas_retencao_updated_at
    BEFORE UPDATE ON aliquotas_retencao
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 