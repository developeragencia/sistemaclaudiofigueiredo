import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://sistemaclaudio-figueiredo.vercel.app',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    video: true,
    screenshotOnRunFailure: true,
    chromeWebSecurity: false,
    experimentalStudio: false,
    defaultCommandTimeout: 30000,
    pageLoadTimeout: 60000,
    requestTimeout: 30000,
    responseTimeout: 60000,
    viewportWidth: 1280,
    viewportHeight: 720,
    retries: {
      runMode: 3,
      openMode: 0,
    },
    env: {
      coverage: false,
    },
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
}); 