/// <reference types="cypress" />

describe('Perfil Page', () => {
  beforeEach(() => {
    cy.login(Cypress.env('TEST_USER_EMAIL'), Cypress.env('TEST_USER_PASSWORD'));
    cy.visit('/admin/perfil');
  });

  it('should display perfil page', () => {
    cy.get('h1').should('contain', 'Perfil');
  });

  it('should update profile information', () => {
    // Atualizar informações do perfil
    cy.get('input[name="nome"]').clear().type('João da Silva');
    cy.get('input[name="email"]').clear().type('joao@email.com');
    cy.get('input[name="telefone"]').clear().type('(11) 99999-9999');
    
    // Salvar
    cy.get('button[type="submit"]').click();
    
    // Verificar mensagem de sucesso
    cy.get('[role="alert"]').should('contain', 'Perfil atualizado com sucesso');
  });

  it('should update password', () => {
    // Navegar para aba de senha
    cy.get('button').contains('Alterar Senha').click();
    
    // Preencher formulário
    cy.get('input[name="senha_atual"]').type('senha_atual');
    cy.get('input[name="nova_senha"]').type('nova_senha123');
    cy.get('input[name="confirmar_senha"]').type('nova_senha123');
    
    // Salvar
    cy.get('button[type="submit"]').click();
    
    // Verificar mensagem de sucesso
    cy.get('[role="alert"]').should('contain', 'Senha atualizada com sucesso');
  });

  it('should show error for wrong current password', () => {
    // Navegar para aba de senha
    cy.get('button').contains('Alterar Senha').click();
    
    // Preencher formulário com senha atual errada
    cy.get('input[name="senha_atual"]').type('senha_errada');
    cy.get('input[name="nova_senha"]').type('nova_senha123');
    cy.get('input[name="confirmar_senha"]').type('nova_senha123');
    
    // Salvar
    cy.get('button[type="submit"]').click();
    
    // Verificar mensagem de erro
    cy.get('[role="alert"]').should('contain', 'Senha atual incorreta');
  });

  it('should show error for password mismatch', () => {
    // Navegar para aba de senha
    cy.get('button').contains('Alterar Senha').click();
    
    // Preencher formulário com senhas diferentes
    cy.get('input[name="senha_atual"]').type('senha_atual');
    cy.get('input[name="nova_senha"]').type('nova_senha123');
    cy.get('input[name="confirmar_senha"]').type('senha_diferente');
    
    // Salvar
    cy.get('button[type="submit"]').click();
    
    // Verificar mensagem de erro
    cy.get('[role="alert"]').should('contain', 'As senhas não conferem');
  });

  it('should enable 2FA', () => {
    // Navegar para aba de segurança
    cy.get('button').contains('Segurança').click();
    
    // Habilitar 2FA
    cy.get('button').contains('Habilitar 2FA').click();
    
    // Verificar se o QR code é exibido
    cy.get('img[alt="QR Code 2FA"]').should('be.visible');
    
    // Preencher código de verificação
    cy.get('input[name="codigo_verificacao"]').type('123456');
    
    // Confirmar
    cy.get('button').contains('Confirmar').click();
    
    // Verificar mensagem de sucesso
    cy.get('[role="alert"]').should('contain', '2FA habilitado com sucesso');
  });

  it('should disable 2FA', () => {
    // Navegar para aba de segurança
    cy.get('button').contains('Segurança').click();
    
    // Desabilitar 2FA
    cy.get('button').contains('Desabilitar 2FA').click();
    
    // Confirmar
    cy.get('button').contains('Sim, desabilitar').click();
    
    // Verificar mensagem de sucesso
    cy.get('[role="alert"]').should('contain', '2FA desabilitado com sucesso');
  });

  it('should display activity log', () => {
    // Navegar para aba de atividades
    cy.get('button').contains('Atividades').click();
    
    // Verificar se a tabela de atividades existe
    cy.get('table').should('exist');
    cy.get('table thead').should('contain', 'Data');
    cy.get('table thead').should('contain', 'Ação');
    cy.get('table thead').should('contain', 'IP');
    
    // Verificar se há pelo menos uma atividade
    cy.get('table tbody tr').should('have.length.at.least', 1);
  });

  it('should filter activity log', () => {
    // Navegar para aba de atividades
    cy.get('button').contains('Atividades').click();
    
    // Selecionar período
    cy.get('select[name="periodo"]').select('ULTIMO_MES');
    
    // Verificar se a tabela foi atualizada
    cy.get('table tbody tr').should('exist');
  });
}); 