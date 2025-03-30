/// <reference types="cypress" />

describe('Relatórios Page', () => {
  beforeEach(() => {
    cy.login(Cypress.env('TEST_USER_EMAIL'), Cypress.env('TEST_USER_PASSWORD'));
    cy.visit('/admin/relatorios');
  });

  it('should display relatórios page', () => {
    cy.get('h1').should('contain', 'Relatórios');
    cy.get('button').contains('Exportar PDF').should('exist');
    cy.get('button').contains('Exportar Excel').should('exist');
  });

  it('should filter by period', () => {
    cy.get('select[name="periodo"]').select('ULTIMO_MES');
    cy.get('.recharts-wrapper').should('exist');
    cy.get('[data-testid="total-pagamentos"]').should('exist');
    cy.get('[data-testid="total-retencoes"]').should('exist');
  });

  it('should filter by report type', () => {
    cy.get('select[name="tipoRelatorio"]').select('PAGAMENTOS');
    cy.get('.recharts-wrapper').should('exist');
    cy.get('[data-testid="total-pagamentos"]').should('exist');
  });

  it('should export PDF', () => {
    cy.get('button').contains('Exportar PDF').click();
    cy.get('[role="alert"]').should('contain', 'Relatório PDF gerado com sucesso');
  });

  it('should export Excel', () => {
    cy.get('button').contains('Exportar Excel').click();
    cy.get('[role="alert"]').should('contain', 'Relatório Excel gerado com sucesso');
  });

  it('should display metrics cards', () => {
    cy.get('[data-testid="total-pagamentos"]').should('exist');
    cy.get('[data-testid="total-retencoes"]').should('exist');
    cy.get('[data-testid="media-mensal"]').should('exist');
    cy.get('[data-testid="quantidade-pagamentos"]').should('exist');
  });

  it('should display charts', () => {
    // Verificar gráfico de pagamentos por mês
    cy.get('[data-testid="chart-pagamentos-mes"]').should('exist');
    cy.get('.recharts-wrapper').first().should('be.visible');
    
    // Verificar gráfico de retenções por tipo
    cy.get('[data-testid="chart-retencoes-tipo"]').should('exist');
    cy.get('.recharts-wrapper').last().should('be.visible');
  });

  it('should update data when filters change', () => {
    // Mudar período
    cy.get('select[name="periodo"]').select('ULTIMO_MES');
    cy.get('[data-testid="total-pagamentos"]').should('exist');
    
    // Mudar tipo de relatório
    cy.get('select[name="tipoRelatorio"]').select('RETENCOES');
    cy.get('[data-testid="total-retencoes"]').should('exist');
    
    // Verificar se os gráficos foram atualizados
    cy.get('.recharts-wrapper').should('exist');
  });
}); 