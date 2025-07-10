
import { signup } from '../../support/pages/signup';

describe('Form Validation', () => {
    
    beforeEach(() => {
    cy.visit('/auth/signup');
    });

  it('verify email without @', () => {
    cy.get(signup.email).type('correoSinArroba').blur();
    cy.get(signup.emailError).should('contain', 'Email inválido');
  });

  it('Different password', () => {
    cy.get(signup.password).type('password123');
    cy.get(signup.repeatPassword).type('otraClave').blur();;
    cy.get(signup.repeatPasswordError).should('contain', 'Las contraseñas no coinciden');
  });

  it('Duplicte user', () => {
    cy.signup('juliana2@example.com', 'Juliana Lopera', 'passwordTest123','passwordTest123');
    cy.get(signup.submit).should('not.be.disabled').click();
    cy.get(signup.modal).should('be.visible');
    cy.get(signup.modal_title).should('have.text', 'Error');
    cy.get(signup.modal_cta).click();
    cy.get(signup.modal).should('not.exist');
  });
});
