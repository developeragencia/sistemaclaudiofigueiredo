/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    // Comandos personalizados
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