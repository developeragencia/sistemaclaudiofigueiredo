/// <reference types="cypress" />

describe('Configurações Page', () => {
  beforeEach(() => {
    cy.login(Cypress.env('TEST_USER_EMAIL'), Cypress.env('TEST_USER_PASSWORD'));
    cy.visit('/admin/configuracoes');
  });

  it('should display configurações page', () => {
    cy.get('h1').should('contain', 'Configurações');
  });

  it('should update company information', () => {
    // Atualizar informações da empresa
    cy.get('input[name="razao_social"]').clear().type('Empresa Teste LTDA');
    cy.get('input[name="cnpj"]').clear().type('12.345.678/0001-90');
    cy.get('input[name="endereco"]').clear().type('Rua Teste, 123');
    cy.get('input[name="telefone"]').clear().type('(11) 99999-9999');
    cy.get('input[name="email"]').clear().type('contato@empresateste.com.br');
    
    // Salvar
    cy.get('button[type="submit"]').click();
    
    // Verificar mensagem de sucesso
    cy.get('[role="alert"]').should('contain', 'Configurações atualizadas com sucesso');
  });

  it('should update email settings', () => {
    // Navegar para aba de configurações de email
    cy.get('button').contains('Configurações de Email').click();
    
    // Atualizar configurações
    cy.get('input[name="smtp_host"]').clear().type('smtp.gmail.com');
    cy.get('input[name="smtp_port"]').clear().type('587');
    cy.get('input[name="smtp_user"]').clear().type('teste@gmail.com');
    cy.get('input[name="smtp_password"]').clear().type('senha123');
    cy.get('select[name="smtp_security"]').select('TLS');
    
    // Salvar
    cy.get('button[type="submit"]').click();
    
    // Verificar mensagem de sucesso
    cy.get('[role="alert"]').should('contain', 'Configurações de email atualizadas com sucesso');
  });

  it('should test email settings', () => {
    // Navegar para aba de configurações de email
    cy.get('button').contains('Configurações de Email').click();
    
    // Clicar no botão de teste
    cy.get('button').contains('Testar Configurações').click();
    
    // Verificar mensagem de sucesso
    cy.get('[role="alert"]').should('contain', 'Email de teste enviado com sucesso');
  });

  it('should update notification settings', () => {
    // Navegar para aba de notificações
    cy.get('button').contains('Notificações').click();
    
    // Atualizar configurações
    cy.get('input[name="notificar_pagamento_pendente"]').check();
    cy.get('input[name="notificar_pagamento_atrasado"]').check();
    cy.get('input[name="dias_antecedencia_notificacao"]').clear().type('5');
    
    // Salvar
    cy.get('button[type="submit"]').click();
    
    // Verificar mensagem de sucesso
    cy.get('[role="alert"]').should('contain', 'Configurações de notificação atualizadas com sucesso');
  });

  it('should update backup settings', () => {
    // Navegar para aba de backup
    cy.get('button').contains('Backup').click();
    
    // Atualizar configurações
    cy.get('select[name="frequencia_backup"]').select('DIARIO');
    cy.get('input[name="hora_backup"]').clear().type('23:00');
    cy.get('input[name="manter_backups_dias"]').clear().type('30');
    
    // Salvar
    cy.get('button[type="submit"]').click();
    
    // Verificar mensagem de sucesso
    cy.get('[role="alert"]').should('contain', 'Configurações de backup atualizadas com sucesso');
  });

  it('should perform manual backup', () => {
    // Navegar para aba de backup
    cy.get('button').contains('Backup').click();
    
    // Clicar no botão de backup manual
    cy.get('button').contains('Realizar Backup Manual').click();
    
    // Verificar mensagem de sucesso
    cy.get('[role="alert"]').should('contain', 'Backup realizado com sucesso');
  });

  it('should update security settings', () => {
    // Navegar para aba de segurança
    cy.get('button').contains('Segurança').click();
    
    // Atualizar configurações
    cy.get('input[name="exigir_2fa"]').check();
    cy.get('input[name="tempo_sessao_minutos"]').clear().type('30');
    cy.get('input[name="tentativas_login"]').clear().type('3');
    
    // Salvar
    cy.get('button[type="submit"]').click();
    
    // Verificar mensagem de sucesso
    cy.get('[role="alert"]').should('contain', 'Configurações de segurança atualizadas com sucesso');
  });
}); 