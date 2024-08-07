/* eslint-env cypress */

const DEMO_DEVICE_URL = '/1d3dc3e03047b0c7';
const DEMO_ROUTE_URL = '/1d3dc3e03047b0c7/000000dd--455f14369d';
const ZOOMED_DEMO_URL = '/1d3dc3e03047b0c7/000000dd--455f14369d/109/423';

describe('drive view', () => {
  it('back button disabled when in route bounds', () => {
    cy.clearAllLocalStorage();
    cy.visit('/');
    cy.get('a').contains('Try the demo').click();

    cy.visit(DEMO_ROUTE_URL);
    cy.get('.DriveView').should('be.visible');
    cy.get('.DriveView button[aria-label="Go Back"]').invoke('attr', 'disabled').should('exist');
  });

  it('back button selects route bounds if timeline is zoomed when clicked', () => {
    cy.clearAllLocalStorage();
    cy.visit('/');
    cy.get('a').contains('Try the demo').click();

    cy.visit(ZOOMED_DEMO_URL);
    cy.get('.DriveView').should('be.visible');
    cy.get('.DriveView button[aria-label="Go Back"]').invoke('attr', 'disabled').should('be.undefined');
    cy.get('.DriveView button[aria-label="Go Back"]').click();
    cy.url().should('include', DEMO_ROUTE_URL);
  });

  it('close button navigates to drive list when clicked', () => {
    cy.clearAllLocalStorage();
    cy.visit('/');
    cy.get('a').contains('Try the demo').click();

    cy.visit(DEMO_ROUTE_URL);
    cy.get('.DriveView').should('be.visible');
    cy.get('.DriveView a[aria-label="Close"]').click();
    cy.url().should('include', DEMO_DEVICE_URL);
  });
});
