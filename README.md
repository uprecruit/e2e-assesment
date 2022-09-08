# e2e-assesment

To run the tests, perform the following steps:

1. In the terminal, run npm install to install dependencies.
2. To run cypress, run npx cypress open
3. Once the cypress opens, select e2e testing, then google chrome, and then login-test.cy.js.
4. The test spec will run automatically

- I have modularized the sign in flow, it can be found in cypress/support/commands.js
- It can be accessed in any other test flow using cy.signIn(username,password) where user name and password are passed in the arguments.
