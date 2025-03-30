describe('Pagamentos Page', () => {
  beforeEach(() => {
    cy.login(Cypress.env('TEST_USER_EMAIL'), Cypress.env('TEST_USER_PASSWORD'));
    cy.visit('/admin/pagamentos');
  });

  it('should display pagamentos list page', () => {
    cy.get('h1').should('contain', 'Pagamentos');
    cy.get('button').contains('Novo Pagamento').should('exist');
    cy.get('input[placeholder="Buscar pagamentos..."]').should('exist');
  });

  it('should search pagamentos', () => {
    cy.get('input[placeholder="Buscar pagamentos..."]').type('Teste');
    cy.get('table').should('exist');
  });

  it('should navigate to new pagamento form', () => {
    cy.get('button').contains('Novo Pagamento').click();
    cy.url().should('include', '/admin/pagamentos/novo');
    cy.get('h1').should('contain', 'Novo Pagamento');
  });

  it('should create new pagamento', () => {
    cy.get('button').contains('Novo Pagamento').click();
    
    // Preencher formulário
    cy.get('input[name="data_pagamento"]').type('2024-03-20');
    cy.get('select[name="fornecedor_id"]').select('1');
    cy.get('select[name="cliente_id"]').select('1');
    cy.get('input[name="numero_nota"]').type('12345');
    cy.get('input[name="valor"]').type('1000');
    cy.get('select[name="tipo_servico"]').select('CONSULTORIA');
    cy.get('select[name="status"]').select('PENDENTE');
    
    // Salvar
    cy.get('button[type="submit"]').click();
    
    // Verificar redirecionamento e mensagem de sucesso
    cy.url().should('include', '/admin/pagamentos');
    cy.get('[role="alert"]').should('contain', 'Pagamento criado com sucesso');
  });

  it('should edit pagamento', () => {
    // Clicar no botão de editar do primeiro pagamento
    cy.get('table tbody tr').first().find('button[aria-label="Editar"]').click();
    
    // Verificar redirecionamento para página de edição
    cy.url().should('include', '/admin/pagamentos/');
    
    // Editar valor
    cy.get('input[name="valor"]').clear().type('2000');
    
    // Salvar
    cy.get('button[type="submit"]').click();
    
    // Verificar redirecionamento e mensagem de sucesso
    cy.url().should('include', '/admin/pagamentos');
    cy.get('[role="alert"]').should('contain', 'Pagamento atualizado com sucesso');
  });

  it('should delete pagamento', () => {
    // Clicar no botão de deletar do primeiro pagamento
    cy.get('table tbody tr').first().find('button[aria-label="Deletar"]').click();
    
    // Confirmar deleção
    cy.get('button').contains('Sim, deletar').click();
    
    // Verificar mensagem de sucesso
    cy.get('[role="alert"]').should('contain', 'Pagamento deletado com sucesso');
  });

  it('should view audit details', () => {
    // Clicar no botão de auditoria do primeiro pagamento
    cy.get('table tbody tr').first().find('button[aria-label="Ver Auditoria"]').click();
    
    // Verificar se o modal de auditoria está visível
    cy.get('[role="dialog"]').should('be.visible');
    cy.get('[role="dialog"]').should('contain', 'Histórico de Auditoria');
    
    // Fechar modal
    cy.get('button[aria-label="Fechar"]').click();
    cy.get('[role="dialog"]').should('not.exist');
  });
}); 