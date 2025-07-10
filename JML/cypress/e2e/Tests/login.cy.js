import { login } from '../../support/pages/login';


describe('Form Validation', () => {
    
    beforeEach(() => {
    cy.visit('/auth/login');
    });
    
  it('verify email without @', () => {
    cy.get(login.emailInput).type('hugeemail').blur();
    cy.get(login.emailError)
      .should('be.visible')
      .and('have.text', 'Email inválido');
  });

  it('verify email without domain', () => {
    cy.get(login.emailInput).type('huge.test@gmail').blur();
    cy.get(login.emailError)
      .should('be.visible')
      .and('have.text', 'Email inválido');
  });

  it('verify password incorrect', () => {
    cy.get(login.passwordInput).type('Abc').blur();
    cy.get(login.passwordError)
      .should('be.visible')
      .and('have.text', 'La contraseña debe tener al menos 8 caracteres');
  });

  it('login with wrong credentials', () => {
    cy.login('juliana@example.com', 'MyPasswordSegura123');
    cy.get('.swal2-popup').should('be.visible')
  });

  it('Login', () => {
    cy.login('huge.test@gmail.com', 'Huge2025.');
    cy.url().should('not.include', '/auth/login');
  });
});
