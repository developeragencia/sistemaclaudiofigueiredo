-- Habilita a extensão uuid-ossp para gerar UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Cria a tabela de clientes
CREATE TABLE IF NOT EXISTS clientes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cnpj VARCHAR(14) UNIQUE NOT NULL,
    razao_social VARCHAR(255) NOT NULL,
    nome_fantasia VARCHAR(255),
    email VARCHAR(255),
    telefone VARCHAR(20),
    endereco VARCHAR(255),
    cidade VARCHAR(100),
    estado CHAR(2),
    cep VARCHAR(8),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cria a tabela de fornecedores
CREATE TABLE IF NOT EXISTS fornecedores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cnpj VARCHAR(14) UNIQUE NOT NULL,
    razao_social VARCHAR(255) NOT NULL,
    nome_fantasia VARCHAR(255),
    atividade_principal VARCHAR(255),
    email VARCHAR(255),
    telefone VARCHAR(20),
    endereco VARCHAR(255),
    cidade VARCHAR(100),
    estado CHAR(2),
    cep VARCHAR(8),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cria a tabela de tipos de serviço
CREATE TABLE IF NOT EXISTS tipos_servico (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    percentual_retencao DECIMAL(5,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cria a tabela de pagamentos
CREATE TABLE IF NOT EXISTS pagamentos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    data_pagamento DATE NOT NULL,
    fornecedor_id UUID NOT NULL REFERENCES fornecedores(id),
    cliente_id UUID NOT NULL REFERENCES clientes(id),
    numero_nota VARCHAR(50) NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    tipo_servico_id UUID NOT NULL REFERENCES tipos_servico(id),
    status VARCHAR(20) NOT NULL DEFAULT 'pendente',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cria a tabela de auditoria
CREATE TABLE IF NOT EXISTS auditoria (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pagamento_id UUID NOT NULL REFERENCES pagamentos(id),
    valor_retencao DECIMAL(10,2) NOT NULL,
    percentual_retencao DECIMAL(5,2) NOT NULL,
    data_auditoria TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    observacoes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cria a tabela de configurações
CREATE TABLE IF NOT EXISTS configuracoes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    api_key_cnpjws VARCHAR(255),
    notificacoes_email BOOLEAN DEFAULT false,
    email_notificacoes VARCHAR(255),
    limite_consultas_diarias INTEGER DEFAULT 100,
    dias_retencao_cache INTEGER DEFAULT 30,
    valor_minimo_retencao DECIMAL(10,2) DEFAULT 666.66,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cria a tabela de consultas CNPJ
CREATE TABLE IF NOT EXISTS consultas_cnpj (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cnpj VARCHAR(14) NOT NULL,
    data_consulta TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cria função para atualizar o updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Cria triggers para atualizar o updated_at
CREATE TRIGGER update_clientes_updated_at
    BEFORE UPDATE ON clientes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_fornecedores_updated_at
    BEFORE UPDATE ON fornecedores
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tipos_servico_updated_at
    BEFORE UPDATE ON tipos_servico
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pagamentos_updated_at
    BEFORE UPDATE ON pagamentos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_auditoria_updated_at
    BEFORE UPDATE ON auditoria
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_configuracoes_updated_at
    BEFORE UPDATE ON configuracoes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insere alguns tipos de serviço padrão
INSERT INTO tipos_servico (nome, descricao, percentual_retencao) VALUES
    ('Serviços de limpeza, conservação ou zeladoria', 'Serviços de limpeza, conservação ou zeladoria', 11.00),
    ('Serviços de vigilância ou segurança', 'Serviços de vigilância ou segurança', 11.00),
    ('Serviços de construção civil', 'Serviços de construção civil', 11.00),
    ('Serviços de consultoria', 'Serviços de consultoria', 9.45),
    ('Serviços profissionais', 'Serviços profissionais', 9.45),
    ('Serviços de propaganda e publicidade', 'Serviços de propaganda e publicidade', 9.45),
    ('Serviços de transporte de valores', 'Serviços de transporte de valores', 11.00),
    ('Serviços de informática', 'Serviços de informática', 9.45),
    ('Outros serviços', 'Outros serviços', 9.45); 