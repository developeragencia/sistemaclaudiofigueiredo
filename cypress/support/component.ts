import { mount } from 'cypress/react18';
import '@cypress/code-coverage/support';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from '@/store';

// Augment the Cypress namespace to include type definitions for
// your custom command.
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to mount React component with providers
       * @example cy.mount(<MyComponent />)
       */
      mount: typeof mount;
    }
  }
}

// Create a new instance of QueryClient for each test
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

Cypress.Commands.add('mount', (component, options = {}) => {
  const wrapped = (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        {component}
      </Provider>
    </QueryClientProvider>
  );

  return mount(wrapped, options);
});

// Example: Import commands.js using ES2015 syntax:
import './commands'; 