-- Inserir alíquotas de retenção padrão
INSERT INTO aliquotas_retencao 
(atividade, aliquota_ir, aliquota_pis, aliquota_cofins, aliquota_csll, aliquota_iss, valor_minimo_retencao)
VALUES
-- Serviços profissionais
('SERVIÇOS DE CONSULTORIA', 1.5, 0.65, 3.0, 1.0, 5.0, 666.66),
('SERVIÇOS DE ADVOCACIA', 1.5, 0.65, 3.0, 1.0, 5.0, 666.66),
('SERVIÇOS DE CONTABILIDADE', 1.5, 0.65, 3.0, 1.0, 5.0, 666.66),
('SERVIÇOS DE AUDITORIA', 1.5, 0.65, 3.0, 1.0, 5.0, 666.66),

-- Serviços de limpeza e conservação
('SERVIÇOS DE LIMPEZA', 1.0, 0.65, 3.0, 1.0, 5.0, 215.05),
('SERVIÇOS DE CONSERVAÇÃO', 1.0, 0.65, 3.0, 1.0, 5.0, 215.05),
('SERVIÇOS DE SEGURANÇA', 1.0, 0.65, 3.0, 1.0, 5.0, 215.05),

-- Serviços de construção civil
('CONSTRUÇÃO CIVIL', 1.2, 0.65, 3.0, 1.0, 5.0, 215.05),
('SERVIÇOS DE ENGENHARIA', 1.2, 0.65, 3.0, 1.0, 5.0, 215.05),

-- Serviços de TI
('DESENVOLVIMENTO DE SOFTWARE', 1.5, 0.65, 3.0, 1.0, 2.0, 666.66),
('SUPORTE TÉCNICO EM INFORMÁTICA', 1.5, 0.65, 3.0, 1.0, 2.0, 666.66),

-- Outros serviços
('LOCAÇÃO DE MÃO DE OBRA', 1.0, 0.65, 3.0, 1.0, 5.0, 215.05),
('SERVIÇOS DE PROPAGANDA E PUBLICIDADE', 1.5, 0.65, 3.0, 1.0, 5.0, 666.66),
('SERVIÇOS DE TRANSPORTE', 1.5, 0.65, 3.0, 1.0, 5.0, 666.66),
('OUTROS SERVIÇOS', 1.5, 0.65, 3.0, 1.0, 5.0, 666.66); 