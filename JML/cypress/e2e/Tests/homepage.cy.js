//Homepage cases

describe('OpenSite', () => {
  beforeEach(() => {
      cy.visit('/');
      });

//Verify if there are any broken links.
  it('check broken links', () => {
    cy.checkLinks(); 
  });

//Check if the internal links open in the same tab.
it('check internal links in the same tab', () => {
    cy.internalLinks(); 
  });

//Check if the external links open in a new tab.
it('check external links open in a new tab', () => {
    cy.internalLinks(); 
  });
});