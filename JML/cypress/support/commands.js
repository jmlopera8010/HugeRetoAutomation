
import { login } from './pages/login';
import { signup } from './pages/signup';
import { home } from './pages/home';
import { product } from './pages/product';
import { order } from './pages/order';

//Verify if there are any broken links.
Cypress.Commands.add('checkLinks', () => {
  cy.get('a').each(($el) => {
    const href = $el.prop('href');
    if (href && href.startsWith('http')) {
      cy.request({
        url: href,
        failOnStatusCode: false,
      }).then((resp) => {
        expect(resp.status).to.be.within(200, 399);
      });
    }
  });
});

//Check if the internal links open in the same tab.
Cypress.Commands.add('internalLinks', () => {
  cy.get('a[href^="/"]').each(($el) => {
    cy.wrap($el).should('not.have.attr', 'target', '_blank');
  });
});

//Check if the external links open in a new tab.
Cypress.Commands.add('externalLinks', () => {
  cy.get('a[href^="http"]').not('[href*="' + Cypress.config().baseUrl + '"]').each(($el) => {
    cy.wrap($el).should('have.attr', 'target', '_blank');
  });
});

//command to login into the page
Cypress.Commands.add('login', (email, password) => {
  cy.get(login.emailInput).type(email);
  cy.get(login.passwordInput).type(password);
  cy.get(login.loginButton).click();
});

//command to signup into the page
Cypress.Commands.add('signup', (email, name, password, confirmpassword) => {
  cy.get(signup.email).type(email);
  cy.get(signup.name).type(name);
  cy.get(signup.password).type(password);
  cy.get(signup.repeatPassword).type(confirmpassword);
  cy.get(signup.submit).should('not.be.disabled').click();
});

//command to select a product
Cypress.Commands.add('product', () => {
  cy.get(home.product).eq(0).click();
  cy.get(home.product_add).click();
  cy.get(product.product_add).click();
  cy.get(product.add_cart).click();
});

//Fill out the form for the buyer.
Cypress.Commands.add('buyer', (name, lastname, email, address, country) => {
cy.get(order.name).type(name);
  cy.get(order.last_name).type(lastname);
  cy.get(order.email).type(email);
  cy.get(order.address).type(address);
  cy.get(order.country).select(country);
});

//Fill out the form with the payment information.
Cypress.Commands.add('payment', (name, card, expiredate, code) => {
  cy.get(order.name_holder).type(name);
  cy.get(order.card_number).type(card);
  cy.get(order.expery_date).type(expiredate);
  cy.get(order.security_code).type(code);
});