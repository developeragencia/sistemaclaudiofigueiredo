/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Cypress Testing Library commands
import '@testing-library/cypress/add-commands';

// Custom commands
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login');
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('logout', () => {
  cy.get('button[aria-label="Sair"]').click();
});

Cypress.Commands.add('getByTestId', (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`);
});

Cypress.Commands.add('getByRole', (role: string) => {
  return cy.get(`[role="${role}"]`);
});

Cypress.Commands.add('getByLabelText', (label: string) => {
  return cy.get(`[aria-label="${label}"]`);
});

Cypress.Commands.add('getByPlaceholder', (placeholder: string) => {
  return cy.get(`[placeholder="${placeholder}"]`);
});

Cypress.Commands.add('getByText', (text: string) => {
  return cy.contains(text);
});

Cypress.Commands.add('getByTitle', (title: string) => {
  return cy.get(`[title="${title}"]`);
});

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      logout(): Chainable<void>;
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
      getByRole(role: string): Chainable<JQuery<HTMLElement>>;
      getByLabelText(label: string): Chainable<JQuery<HTMLElement>>;
      getByPlaceholder(placeholder: string): Chainable<JQuery<HTMLElement>>;
      getByText(text: string): Chainable<JQuery<HTMLElement>>;
      getByTitle(title: string): Chainable<JQuery<HTMLElement>>;
    }
  }
} 