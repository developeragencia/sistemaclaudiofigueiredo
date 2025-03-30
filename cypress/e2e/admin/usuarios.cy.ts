/// <reference types="cypress" />

describe('Usuários Page', () => {
  beforeEach(() => {
    cy.login(Cypress.env('TEST_USER_EMAIL'), Cypress.env('TEST_USER_PASSWORD'));
    cy.visit('/admin/usuarios');
  });

  it('should display usuários list page', () => {
    cy.get('h1').should('contain', 'Usuários');
    cy.get('button').contains('Novo Usuário').should('exist');
    cy.get('input[placeholder="Buscar usuários..."]').should('exist');
  });

  it('should search usuários', () => {
    cy.get('input[placeholder="Buscar usuários..."]').type('Teste');
    cy.get('table').should('exist');
  });

  it('should navigate to new usuário form', () => {
    cy.get('button').contains('Novo Usuário').click();
    cy.url().should('include', '/admin/usuarios/novo');
    cy.get('h1').should('contain', 'Novo Usuário');
  });

  it('should create new usuário', () => {
    cy.get('button').contains('Novo Usuário').click();
    
    // Preencher formulário
    cy.get('input[name="nome"]').type('Usuário Teste');
    cy.get('input[name="email"]').type('usuario@teste.com');
    cy.get('input[name="senha"]').type('Senha@123');
    cy.get('input[name="confirmar_senha"]').type('Senha@123');
    cy.get('select[name="perfil"]').select('ADMIN');
    cy.get('input[name="telefone"]').type('(11) 99999-9999');
    cy.get('input[name="ativo"]').check();
    
    // Salvar
    cy.get('button[type="submit"]').click();
    
    // Verificar redirecionamento e mensagem de sucesso
    cy.url().should('include', '/admin/usuarios');
    cy.get('[role="alert"]').should('contain', 'Usuário criado com sucesso');
  });

  it('should edit usuário', () => {
    // Clicar no botão de editar do primeiro usuário
    cy.get('table tbody tr').first().find('button[aria-label="Editar"]').click();
    
    // Verificar redirecionamento para página de edição
    cy.url().should('include', '/admin/usuarios/');
    
    // Editar nome
    cy.get('input[name="nome"]').clear().type('Usuário Teste Editado');
    
    // Salvar
    cy.get('button[type="submit"]').click();
    
    // Verificar redirecionamento e mensagem de sucesso
    cy.url().should('include', '/admin/usuarios');
    cy.get('[role="alert"]').should('contain', 'Usuário atualizado com sucesso');
  });

  it('should delete usuário', () => {
    // Clicar no botão de deletar do primeiro usuário
    cy.get('table tbody tr').first().find('button[aria-label="Deletar"]').click();
    
    // Confirmar deleção
    cy.get('button').contains('Sim, deletar').click();
    
    // Verificar mensagem de sucesso
    cy.get('[role="alert"]').should('contain', 'Usuário deletado com sucesso');
  });

  it('should validate required fields', () => {
    cy.get('button').contains('Novo Usuário').click();
    
    // Tentar salvar sem preencher campos obrigatórios
    cy.get('button[type="submit"]').click();
    
    // Verificar mensagens de erro
    cy.get('[data-testid="erro-nome"]').should('contain', 'Campo obrigatório');
    cy.get('[data-testid="erro-email"]').should('contain', 'Campo obrigatório');
    cy.get('[data-testid="erro-senha"]').should('contain', 'Campo obrigatório');
  });

  it('should validate email format', () => {
    cy.get('button').contains('Novo Usuário').click();
    
    // Preencher email com formato inválido
    cy.get('input[name="email"]').type('email_invalido');
    
    // Verificar mensagem de erro
    cy.get('[data-testid="erro-email"]').should('contain', 'Email inválido');
  });

  it('should validate password strength', () => {
    cy.get('button').contains('Novo Usuário').click();
    
    // Preencher senha fraca
    cy.get('input[name="senha"]').type('123');
    
    // Verificar mensagem de erro
    cy.get('[data-testid="erro-senha"]').should('contain', 'A senha deve ter no mínimo 8 caracteres');
  });

  it('should validate password confirmation', () => {
    cy.get('button').contains('Novo Usuário').click();
    
    // Preencher senhas diferentes
    cy.get('input[name="senha"]').type('Senha@123');
    cy.get('input[name="confirmar_senha"]').type('Senha@456');
    
    // Verificar mensagem de erro
    cy.get('[data-testid="erro-confirmar-senha"]').should('contain', 'As senhas não conferem');
  });

  it('should toggle user status', () => {
    // Clicar no switch de status do primeiro usuário
    cy.get('table tbody tr').first().find('button[role="switch"]').click();
    
    // Verificar mensagem de sucesso
    cy.get('[role="alert"]').should('contain', 'Status do usuário atualizado com sucesso');
  });

  it('should reset user password', () => {
    // Clicar no botão de resetar senha do primeiro usuário
    cy.get('table tbody tr').first().find('button[aria-label="Resetar Senha"]').click();
    
    // Confirmar reset
    cy.get('button').contains('Sim, resetar').click();
    
    // Verificar mensagem de sucesso
    cy.get('[role="alert"]').should('contain', 'Senha resetada com sucesso');
  });
}); 