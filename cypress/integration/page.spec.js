describe('Page', () => {
  beforeEach(() => {
    cy.intercept('**/todos', { fixture: 'todos' });

    cy.visit('/');
  });

  it('user details should be updated after selecting a different user', () => {
    cy.intercept('**/users/1', { fixture: 'userOne' });
    cy.intercept('**/users/2', { fixture: 'userTwo' });

    cy.getByDataCy('userButton')
      .contains('1')
      .click();

    cy.getByDataCy('userName')
      .should('have.text', 'Chelsey Dietrich');

    cy.getByDataCy('userButton')
      .contains('2')
      .click();

    cy.getByDataCy('userName')
      .should('have.text', 'Mrs. Dennis Schulist');
  });

  it('no request to the server after selecting the same user again', () => {
    cy.intercept('**/todos', { fixture: 'todos' });
    cy.intercept('**/users/*', cy.spy().as('apiCall'));

    cy.getByDataCy('userButton')
      .contains('1')
      .click();

    cy.getByDataCy('userButton')
      .contains('1')
      .click();

    cy.get('@apiCall')
      .its('callCount')
      .should('equal', 1);
  });

  it('selected user is cleared after clicking "Clear" button', () => {
    cy.intercept('**/users/1', { fixture: 'userOne' });

    cy.getByDataCy('userButton')
      .contains('1')
      .click();

    cy.getByDataCy('userName')
      .should('have.text', 'Chelsey Dietrich');

    cy.get('button')
      .contains(/[A-z]lear/)
      .click();

    cy.getByDataCy('userName')
      .should('not.exist');
  });

  it('todos can be filtered by title', () => {
    cy.get('input')
      .type('Todo 4');

    cy.get('li')
      .should('have.length', 1)
      .and('contain', 'Todo 4');
  });

  it('all todos can be selected using selector', () => {
    cy.get('select')
      .select('all');

    cy.get('li')
      .should('have.length', 3);
  });

  it('only active todos can be selected using selector', () => {
    cy.get('select')
      .select('completed');

    cy.get('li')
      .should('have.length', 1);
  });

  it('only completed todos can be selected using selector', () => {
    cy.get('select')
      .select('active');

    cy.get('li')
      .should('have.length', 2);
  });
});
