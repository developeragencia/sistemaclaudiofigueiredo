-- Função para buscar pagamentos com filtros
CREATE OR REPLACE FUNCTION buscar_pagamentos_com_filtros(
    p_data_inicio DATE DEFAULT NULL,
    p_data_fim DATE DEFAULT NULL,
    p_fornecedor_id UUID DEFAULT NULL,
    p_cliente_id UUID DEFAULT NULL,
    p_tipo_servico_id UUID DEFAULT NULL,
    p_valor_minimo DECIMAL DEFAULT NULL,
    p_valor_maximo DECIMAL DEFAULT NULL,
    p_status VARCHAR DEFAULT NULL
)
RETURNS TABLE (
    id UUID,
    data_pagamento DATE,
    fornecedor_id UUID,
    fornecedor_razao_social VARCHAR,
    cliente_id UUID,
    cliente_razao_social VARCHAR,
    numero_nota VARCHAR,
    valor DECIMAL,
    tipo_servico_id UUID,
    tipo_servico_nome VARCHAR,
    status VARCHAR,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id,
        p.data_pagamento,
        p.fornecedor_id,
        f.razao_social as fornecedor_razao_social,
        p.cliente_id,
        c.razao_social as cliente_razao_social,
        p.numero_nota,
        p.valor,
        p.tipo_servico_id,
        ts.nome as tipo_servico_nome,
        p.status,
        p.created_at,
        p.updated_at
    FROM pagamentos p
    JOIN fornecedores f ON f.id = p.fornecedor_id
    JOIN clientes c ON c.id = p.cliente_id
    JOIN tipos_servico ts ON ts.id = p.tipo_servico_id
    WHERE
        (p_data_inicio IS NULL OR p.data_pagamento >= p_data_inicio) AND
        (p_data_fim IS NULL OR p.data_pagamento <= p_data_fim) AND
        (p_fornecedor_id IS NULL OR p.fornecedor_id = p_fornecedor_id) AND
        (p_cliente_id IS NULL OR p.cliente_id = p_cliente_id) AND
        (p_tipo_servico_id IS NULL OR p.tipo_servico_id = p_tipo_servico_id) AND
        (p_valor_minimo IS NULL OR p.valor >= p_valor_minimo) AND
        (p_valor_maximo IS NULL OR p.valor <= p_valor_maximo) AND
        (p_status IS NULL OR p.status = p_status)
    ORDER BY p.data_pagamento DESC;
END;
$$ LANGUAGE plpgsql;

-- Função para buscar auditoria com filtros
CREATE OR REPLACE FUNCTION buscar_auditoria_com_filtros(
    p_data_inicio DATE DEFAULT NULL,
    p_data_fim DATE DEFAULT NULL,
    p_fornecedor_id UUID DEFAULT NULL,
    p_cliente_id UUID DEFAULT NULL,
    p_tipo_servico_id UUID DEFAULT NULL,
    p_valor_minimo DECIMAL DEFAULT NULL,
    p_valor_maximo DECIMAL DEFAULT NULL
)
RETURNS TABLE (
    id UUID,
    pagamento_id UUID,
    data_pagamento DATE,
    fornecedor_razao_social VARCHAR,
    cliente_razao_social VARCHAR,
    numero_nota VARCHAR,
    valor DECIMAL,
    tipo_servico_nome VARCHAR,
    valor_retencao DECIMAL,
    percentual_retencao DECIMAL,
    data_auditoria TIMESTAMP WITH TIME ZONE,
    observacoes TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        a.id,
        a.pagamento_id,
        p.data_pagamento,
        f.razao_social as fornecedor_razao_social,
        c.razao_social as cliente_razao_social,
        p.numero_nota,
        p.valor,
        ts.nome as tipo_servico_nome,
        a.valor_retencao,
        a.percentual_retencao,
        a.data_auditoria,
        a.observacoes
    FROM auditoria a
    JOIN pagamentos p ON p.id = a.pagamento_id
    JOIN fornecedores f ON f.id = p.fornecedor_id
    JOIN clientes c ON c.id = p.cliente_id
    JOIN tipos_servico ts ON ts.id = p.tipo_servico_id
    WHERE
        (p_data_inicio IS NULL OR p.data_pagamento >= p_data_inicio) AND
        (p_data_fim IS NULL OR p.data_pagamento <= p_data_fim) AND
        (p_fornecedor_id IS NULL OR p.fornecedor_id = p_fornecedor_id) AND
        (p_cliente_id IS NULL OR p.cliente_id = p_cliente_id) AND
        (p_tipo_servico_id IS NULL OR p.tipo_servico_id = p_tipo_servico_id) AND
        (p_valor_minimo IS NULL OR p.valor >= p_valor_minimo) AND
        (p_valor_maximo IS NULL OR p.valor <= p_valor_maximo)
    ORDER BY a.data_auditoria DESC;
END;
$$ LANGUAGE plpgsql;

-- Função para gerar relatório de pagamentos
CREATE OR REPLACE FUNCTION gerar_relatorio_pagamentos(
    p_data_inicio DATE,
    p_data_fim DATE,
    p_cliente_id UUID DEFAULT NULL
)
RETURNS TABLE (
    total_pagamentos DECIMAL,
    total_retencoes DECIMAL,
    media_mensal_pagamentos DECIMAL,
    quantidade_pagamentos BIGINT,
    pagamentos_por_mes JSON,
    retencoes_por_tipo JSON
) AS $$
DECLARE
    v_meses INTEGER;
BEGIN
    -- Calcula o número de meses entre as datas
    v_meses := EXTRACT(YEAR FROM age(p_data_fim, p_data_inicio)) * 12 +
               EXTRACT(MONTH FROM age(p_data_fim, p_data_inicio)) + 1;

    RETURN QUERY
    WITH pagamentos_filtrados AS (
        SELECT 
            p.*,
            a.valor_retencao,
            ts.nome as tipo_servico_nome
        FROM pagamentos p
        LEFT JOIN auditoria a ON a.pagamento_id = p.id
        LEFT JOIN tipos_servico ts ON ts.id = p.tipo_servico_id
        WHERE 
            p.data_pagamento BETWEEN p_data_inicio AND p_data_fim
            AND (p_cliente_id IS NULL OR p.cliente_id = p_cliente_id)
    ),
    pagamentos_mes AS (
        SELECT 
            TO_CHAR(data_pagamento, 'YYYY-MM') as mes,
            SUM(valor) as total
        FROM pagamentos_filtrados
        GROUP BY mes
        ORDER BY mes
    ),
    retencoes_tipo AS (
        SELECT 
            tipo_servico_nome,
            SUM(valor_retencao) as total
        FROM pagamentos_filtrados
        WHERE valor_retencao IS NOT NULL
        GROUP BY tipo_servico_nome
        ORDER BY total DESC
    )
    SELECT
        COALESCE(SUM(pf.valor), 0) as total_pagamentos,
        COALESCE(SUM(pf.valor_retencao), 0) as total_retencoes,
        COALESCE(SUM(pf.valor) / v_meses, 0) as media_mensal_pagamentos,
        COUNT(*) as quantidade_pagamentos,
        COALESCE(
            json_agg(
                json_build_object(
                    'mes', pm.mes,
                    'total', pm.total
                )
            ),
            '[]'::json
        ) as pagamentos_por_mes,
        COALESCE(
            json_agg(
                json_build_object(
                    'tipo', rt.tipo_servico_nome,
                    'total', rt.total
                )
            ),
            '[]'::json
        ) as retencoes_por_tipo
    FROM pagamentos_filtrados pf
    LEFT JOIN pagamentos_mes pm ON true
    LEFT JOIN retencoes_tipo rt ON true
    GROUP BY pm.mes, rt.tipo_servico_nome;
END;
$$ LANGUAGE plpgsql; 