/// <reference types="cypress" />

describe('Fornecedores Page', () => {
  beforeEach(() => {
    cy.login(Cypress.env('TEST_USER_EMAIL'), Cypress.env('TEST_USER_PASSWORD'));
    cy.visit('/admin/fornecedores');
  });

  it('should display fornecedores list page', () => {
    cy.get('h1').should('contain', 'Fornecedores');
    cy.get('button').contains('Novo Fornecedor').should('exist');
    cy.get('input[placeholder="Buscar fornecedores..."]').should('exist');
  });

  it('should search fornecedores', () => {
    cy.get('input[placeholder="Buscar fornecedores..."]').type('Teste');
    cy.get('table').should('exist');
  });

  it('should navigate to new fornecedor form', () => {
    cy.get('button').contains('Novo Fornecedor').click();
    cy.url().should('include', '/admin/fornecedores/novo');
    cy.get('h1').should('contain', 'Novo Fornecedor');
  });

  it('should create new fornecedor', () => {
    cy.get('button').contains('Novo Fornecedor').click();
    
    // Preencher formulário
    cy.get('input[name="razao_social"]').type('Fornecedor Teste LTDA');
    cy.get('input[name="nome_fantasia"]').type('Fornecedor Teste');
    cy.get('input[name="cnpj"]').type('12.345.678/0001-90');
    cy.get('input[name="inscricao_estadual"]').type('123456789');
    cy.get('input[name="inscricao_municipal"]').type('987654321');
    cy.get('input[name="endereco"]').type('Rua Teste, 123');
    cy.get('input[name="bairro"]').type('Centro');
    cy.get('input[name="cidade"]').type('São Paulo');
    cy.get('select[name="estado"]').select('SP');
    cy.get('input[name="cep"]').type('01234-567');
    cy.get('input[name="telefone"]').type('(11) 99999-9999');
    cy.get('input[name="email"]').type('contato@fornecedor.com.br');
    cy.get('input[name="site"]').type('www.fornecedor.com.br');
    cy.get('textarea[name="observacoes"]').type('Observações de teste');
    
    // Salvar
    cy.get('button[type="submit"]').click();
    
    // Verificar redirecionamento e mensagem de sucesso
    cy.url().should('include', '/admin/fornecedores');
    cy.get('[role="alert"]').should('contain', 'Fornecedor criado com sucesso');
  });

  it('should edit fornecedor', () => {
    // Clicar no botão de editar do primeiro fornecedor
    cy.get('table tbody tr').first().find('button[aria-label="Editar"]').click();
    
    // Verificar redirecionamento para página de edição
    cy.url().should('include', '/admin/fornecedores/');
    
    // Editar razão social
    cy.get('input[name="razao_social"]').clear().type('Fornecedor Teste Editado LTDA');
    
    // Salvar
    cy.get('button[type="submit"]').click();
    
    // Verificar redirecionamento e mensagem de sucesso
    cy.url().should('include', '/admin/fornecedores');
    cy.get('[role="alert"]').should('contain', 'Fornecedor atualizado com sucesso');
  });

  it('should delete fornecedor', () => {
    // Clicar no botão de deletar do primeiro fornecedor
    cy.get('table tbody tr').first().find('button[aria-label="Deletar"]').click();
    
    // Confirmar deleção
    cy.get('button').contains('Sim, deletar').click();
    
    // Verificar mensagem de sucesso
    cy.get('[role="alert"]').should('contain', 'Fornecedor deletado com sucesso');
  });

  it('should view fornecedor details', () => {
    // Clicar no primeiro fornecedor da tabela
    cy.get('table tbody tr').first().click();
    
    // Verificar redirecionamento para página de detalhes
    cy.url().should('include', '/admin/fornecedores/');
    
    // Verificar informações básicas
    cy.get('[data-testid="razao-social"]').should('exist');
    cy.get('[data-testid="cnpj"]').should('exist');
    cy.get('[data-testid="contato"]').should('exist');
    
    // Verificar histórico de pagamentos
    cy.get('[data-testid="historico-pagamentos"]').should('exist');
    cy.get('table').should('exist');
  });

  it('should validate required fields', () => {
    cy.get('button').contains('Novo Fornecedor').click();
    
    // Tentar salvar sem preencher campos obrigatórios
    cy.get('button[type="submit"]').click();
    
    // Verificar mensagens de erro
    cy.get('[data-testid="erro-razao-social"]').should('contain', 'Campo obrigatório');
    cy.get('[data-testid="erro-cnpj"]').should('contain', 'Campo obrigatório');
    cy.get('[data-testid="erro-email"]').should('contain', 'Campo obrigatório');
  });

  it('should validate CNPJ format', () => {
    cy.get('button').contains('Novo Fornecedor').click();
    
    // Preencher CNPJ com formato inválido
    cy.get('input[name="cnpj"]').type('12345');
    
    // Verificar mensagem de erro
    cy.get('[data-testid="erro-cnpj"]').should('contain', 'CNPJ inválido');
  });

  it('should validate email format', () => {
    cy.get('button').contains('Novo Fornecedor').click();
    
    // Preencher email com formato inválido
    cy.get('input[name="email"]').type('email_invalido');
    
    // Verificar mensagem de erro
    cy.get('[data-testid="erro-email"]').should('contain', 'Email inválido');
  });
}); 