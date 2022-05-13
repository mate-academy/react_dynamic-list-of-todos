const page = {
  clickButton(value) {
    cy.getByDataCy('userButton')
      .contains(value)
      .click();
  }
};

describe('Page', () => {
  beforeEach(() => {
    cy.intercept('**/todos', { fixture: 'todos' });

    cy.visit('/');
  });

  it('should update user details after selecting a different user', () => {
    cy.intercept('**/users/1', { fixture: 'userOne' });
    cy.intercept('**/users/2', { fixture: 'userTwo' });

    cy.visit('/');

    page.clickButton('1');

    cy.getByDataCy('userName')
      .should('have.text', 'Chelsey Dietrich');

    page.clickButton('2');

    cy.getByDataCy('userName')
      .should('have.text', 'Mrs. Dennis Schulist');
  });

  it('should not send request to the server after selecting the same user again', () => {
    cy.intercept('**/todos', { fixture: 'todos' });
    cy.intercept('**/users/*', cy.spy().as('apiCall'));

    cy.visit('/');

    page.clickButton('1');

    page.clickButton('1');

    cy.get('@apiCall')
      .its('callCount')
      .should('equal', 1);
  });

  it('should clear selected user after clicking "Clear" button', () => {
    cy.intercept('**/users/1', { fixture: 'userOne' });

    cy.visit('/');

    page.clickButton('1');

    cy.getByDataCy('userName')
      .should('have.text', 'Chelsey Dietrich');

    cy.get('button')
      .contains(/[A-z]lear/)
      .click();

    cy.getByDataCy('userName')
      .should('not.exist');
  });

  it('should filter todos by title', () => {
    cy.getByDataCy('filterByTitle')
      .type('Todo 4');

    cy.get('li')
      .should('have.length', 1)
      .and('contain', 'Todo 4');
  });

  it('should select all todos using selector', () => {
    cy.get('select')
      .select('all');

    cy.get('li')
      .should('have.length', 3);
  });

  it('should select only active todos using selector', () => {
    cy.get('select')
      .select('completed');

    cy.get('li')
      .should('have.length', 1);
  });

  it('should select only completed todos using selector', () => {
    cy.get('select')
      .select('active');

    cy.get('li')
      .should('have.length', 2);
  });
});
