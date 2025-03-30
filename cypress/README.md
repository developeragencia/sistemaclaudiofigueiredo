# Testes E2E com Cypress

Este diretório contém os testes end-to-end (E2E) do Sistema Claudio Figueiredo utilizando o Cypress.

## Estrutura de Diretórios

```
cypress/
├── e2e/                    # Testes E2E
│   ├── admin/             # Testes das páginas administrativas
│   └── auth/              # Testes de autenticação
├── fixtures/              # Dados de teste
├── support/               # Comandos e configurações personalizadas
└── downloads/            # Downloads gerados durante os testes
```

## Configuração

1. Copie o arquivo `cypress.env.example.json` para `cypress.env.json`:
   ```bash
   cp cypress.env.example.json cypress.env.json
   ```

2. Configure as variáveis de ambiente no arquivo `cypress.env.json`:
   ```json
   {
     "TEST_USER_EMAIL": "seu-email@exemplo.com",
     "TEST_USER_PASSWORD": "sua-senha",
     ...
   }
   ```

## Executando os Testes

### Interface Gráfica

```bash
npm run cypress:open
```

### Linha de Comando

```bash
# Executar todos os testes
npm run cypress:run

# Executar testes específicos
npm run cypress:run --spec "cypress/e2e/admin/**/*.cy.ts"
```

## Comandos Personalizados

Os seguintes comandos personalizados estão disponíveis:

- `cy.login(email, password)`: Realiza login no sistema
- `cy.logout()`: Realiza logout do sistema
- `cy.getByTestId(testId)`: Seleciona elemento por data-testid
- `cy.getByRole(role)`: Seleciona elemento por role
- `cy.getByLabelText(label)`: Seleciona elemento por aria-label
- `cy.getByPlaceholder(placeholder)`: Seleciona elemento por placeholder
- `cy.getByText(text)`: Seleciona elemento por texto
- `cy.getByTitle(title)`: Seleciona elemento por título

## Boas Práticas

1. Use seletores de dados (data-testid) em vez de seletores CSS
2. Evite timeouts fixos (cy.wait)
3. Mantenha os testes independentes
4. Use fixtures para dados de teste
5. Documente cenários complexos
6. Siga o padrão AAA (Arrange, Act, Assert)

## Scripts NPM

```json
{
  "scripts": {
    "cypress:open": "cypress open",
    "cypress:run": "cypress run",
    "cypress:run:chrome": "cypress run --browser chrome",
    "cypress:run:firefox": "cypress run --browser firefox",
    "cypress:run:edge": "cypress run --browser edge"
  }
}
```

## Integração Contínua

Os testes são executados automaticamente em cada pull request e push para a branch principal.

### GitHub Actions

```yaml
name: E2E Tests
on: [push, pull_request]
jobs:
  cypress:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: cypress-io/github-action@v2
        with:
          browser: chrome
          headless: true
```

## Relatórios

Os relatórios de teste são gerados automaticamente após cada execução:

- Screenshots: `cypress/screenshots/`
- Vídeos: `cypress/videos/`
- Relatórios HTML: `cypress/reports/`

## Depuração

1. Use `cy.debug()` para pausar a execução
2. Use `cy.log()` para adicionar mensagens ao log
3. Use a DevTools do Cypress para inspeção

## Contribuindo

1. Crie uma branch para sua feature
2. Adicione ou atualize testes
3. Verifique se todos os testes passam
4. Faça commit das alterações
5. Abra um pull request

## Suporte

Para dúvidas ou problemas, abra uma issue no repositório. 