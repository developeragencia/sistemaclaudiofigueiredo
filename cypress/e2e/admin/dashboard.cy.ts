/// <reference types="cypress" />

describe('Dashboard Page', () => {
  beforeEach(() => {
    cy.login(Cypress.env('TEST_USER_EMAIL'), Cypress.env('TEST_USER_PASSWORD'));
    cy.visit('/admin');
  });

  it('should display dashboard page', () => {
    cy.get('h1').should('contain', 'Dashboard');
  });

  it('should display metrics cards', () => {
    // Verificar cards de métricas
    cy.get('[data-testid="total-pagamentos-mes"]').should('exist');
    cy.get('[data-testid="total-retencoes-mes"]').should('exist');
    cy.get('[data-testid="pagamentos-pendentes"]').should('exist');
    cy.get('[data-testid="pagamentos-atrasados"]').should('exist');
  });

  it('should display charts', () => {
    // Verificar gráfico de pagamentos por mês
    cy.get('[data-testid="chart-pagamentos-mes"]').should('exist');
    cy.get('.recharts-wrapper').first().should('be.visible');
    
    // Verificar gráfico de retenções por tipo
    cy.get('[data-testid="chart-retencoes-tipo"]').should('exist');
    cy.get('.recharts-wrapper').last().should('be.visible');
  });

  it('should display recent payments table', () => {
    // Verificar tabela de pagamentos recentes
    cy.get('[data-testid="tabela-pagamentos-recentes"]').should('exist');
    cy.get('table').should('exist');
    cy.get('table thead').should('contain', 'Data');
    cy.get('table thead').should('contain', 'Fornecedor');
    cy.get('table thead').should('contain', 'Valor');
    cy.get('table thead').should('contain', 'Status');
  });

  it('should display pending payments table', () => {
    // Verificar tabela de pagamentos pendentes
    cy.get('[data-testid="tabela-pagamentos-pendentes"]').should('exist');
    cy.get('table').should('exist');
    cy.get('table thead').should('contain', 'Data');
    cy.get('table thead').should('contain', 'Fornecedor');
    cy.get('table thead').should('contain', 'Valor');
    cy.get('table thead').should('contain', 'Status');
  });

  it('should navigate to payment details', () => {
    // Clicar no primeiro pagamento da tabela
    cy.get('[data-testid="tabela-pagamentos-recentes"] table tbody tr')
      .first()
      .click();
    
    // Verificar redirecionamento
    cy.url().should('include', '/admin/pagamentos/');
  });

  it('should filter data by period', () => {
    // Selecionar período
    cy.get('select[name="periodo"]').select('ULTIMO_MES');
    
    // Verificar atualização dos dados
    cy.get('[data-testid="total-pagamentos-mes"]').should('exist');
    cy.get('[data-testid="total-retencoes-mes"]').should('exist');
    cy.get('.recharts-wrapper').should('exist');
  });

  it('should display notifications', () => {
    // Verificar seção de notificações
    cy.get('[data-testid="notificacoes"]').should('exist');
    cy.get('[data-testid="notificacoes"] li').should('have.length.at.least', 1);
  });

  it('should mark notification as read', () => {
    // Clicar no botão de marcar como lida
    cy.get('[data-testid="notificacoes"] li')
      .first()
      .find('button[aria-label="Marcar como lida"]')
      .click();
    
    // Verificar mensagem de sucesso
 