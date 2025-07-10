import { home } from '../../support/pages/home';
import { product } from '../../support/pages/product';
import { order } from '../../support/pages/order';

describe('Form Validation', () => {
    
    beforeEach(() => {
      cy.viewport(1440, 800);
      cy.visit('/auth/login');
      cy.login('huge.test@gmail.com', 'Huge2025.');
    });

   it('select product', () => {
      cy.product();
      cy.get(product.message_add_cart).should('be.visible');
   });

   it('panel shopping visible', () => {
      cy.product();
      cy.get(product.message_add_cart).click();
      cy.get(product.cartcta).click();
      cy.get(product.modal).should('be.visible');
   });

   it('panel shopping - Checkout', () => {
     cy.product();
     cy.get(product.message_add_cart).click();
     cy.get(product.cartcta).click();
     cy.get(product.modal).should('be.visible');
     cy.get(product.modal_cta).click();
     cy.url().should('include', '/checkout');
   });

   it('order sucessfully', () => {
     cy.product();
     cy.get(product.message_add_cart).click();
     cy.get(product.cartcta).click();
     cy.get(product.modal_cta).click();

     //form Información del comprador
     cy.buyer('Juliana','Lopera','juliana@example.com','Carrera 123 #45-67','Colombia');

     //Información de Pago
     cy.payment('Testuser','4301822375925071','2029-09','668')

     cy.get(order.cta).contains('Completar Pago').click();
     cy.get(order.modal).should('be.visible')
     cy.get(order.modal_title).should('have.text', 'Orden creada');
     cy.get(order.modal_cta).click();
     cy.url().should('include', '/my-account');
   });

  it('order - wrong pay information', () => {
      cy.product();
      cy.get(product.message_add_cart).click();
      cy.get(product.cartcta).click();
      cy.get(product.modal_cta).click();
      //form
      cy.buyer('Juliana','Lopera','juliana@example.com','Carrera 123 #45-67','Colombia'); 
      cy.payment('Testuser','63018223759','2029-09','668')
      cy.get(order.cta).contains('Completar Pago').click();
      cy.get(order.modal).should('be.visible')
      cy.get(order.modal_title).should('have.text', 'Error al procesar el pago');
  });
});
     

