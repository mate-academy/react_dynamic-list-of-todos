/// <reference types="cypress" />

describe('Page', () => {
  const apiUrl = 'https://mate.academy/students-api/'

  beforeEach(() => {
    cy.visit('/')
  });

  it('user details should be updated after selecting a different user', () => {
    cy.intercept(`${apiUrl}` + 'users/5', { fixture: 'user5' });
    cy.intercept(`${apiUrl}` + 'users/6', { fixture: 'user6' });

    cy.get('button')
      .contains('5')
      .click();

    cy.getByDataCy('userName')
      .should('have.text', 'Chelsey Dietrich');

    cy.get('button')
      .contains('6')
      .click();

    cy.getByDataCy('userName')
      .should('have.text', 'Mrs. Dennis Schulist');
  });

  it('no request to the server after selecting the same user again', () => {
    cy.intercept(`${apiUrl}` + 'users/5', cy.spy().as('apiCall'));

    cy.get('button')
      .contains('5')
      .click()
      .click();

    cy.get('@apiCall')
      .its('callCount')
      .should('equal', 1);
  });

  it('selected user is cleared after clicking "Clear" button', () => {
    cy.intercept(`${apiUrl}` + 'users/5', { fixture: 'user5' });

    cy.get('button')
      .contains('5')
      .click();

    cy.getByDataCy('userName')
      .should('have.text', 'Chelsey Dietrich');

    cy.get('button').contains(/[A-z]lear/)
      .click();

    cy.getByDataCy('userName')
      .should('not.exist');
  });

  it('todos can be filtered by title', () => {
    cy.fixture('todos.json').as('todosList');

    cy.get('@todosList')
      .then(todosList => {
        cy.getByDataCy('filterByTitle')
          .type(todosList[0].title);

        cy.getByDataCy('listOfTodos')
          .children()
          .should('have.length', 2)
          .should('contain', 'Todo 4');
      });
  });

  it('all todos can be selected using selector', () => {
    cy.fixture('todos.json').as('todosList');

    cy.get('@todosList')
      .then((todosList) => {
        cy.get('select')
          .select('all');

        cy.getByDataCy('listOfTodos')
          .children()
          .should('have.length', todosList.length);
      });
  });

  it('only active todos can be selected using selector', () => {
    cy.fixture('todos.json').as('todosList');

    cy.get('@todosList')
      .then((todosList) => {
        let numberOfTodos = 0;

        cy.get('select')
          .select('active');

        todosList.forEach((todo) => {
          if (todo.completed === false) {
            numberOfTodos++;
          }
        });

        cy.getByDataCy('listOfTodos')
          .children()
          .should('have.length', numberOfTodos);
      });
  });


  it('only completed todos can be selected using selector', () => {
    cy.fixture('todos.json').as('todosList');

    cy.get('@todosList')
      .then((todosList) => {
        let numberOfTodos = 0;

        cy.get('select')
          .select('completed');

        todosList.forEach((todo) => {
          if (todo.completed === true) {
            numberOfTodos++;
          }
        })

        cy.getByDataCy('listOfTodos')
          .children()
          .should('have.length', numberOfTodos);
      });
  });
});
