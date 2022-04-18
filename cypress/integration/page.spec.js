/// <reference types="cypress" />

describe('Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('user details should be updated after selecting a different user', () => {
    cy.contains('5')
      .click()

    cy.contains('Chelsey Dietrich')
      .should('have.text', 'Chelsey Dietrich')

    cy.contains('6')
      .click()

    cy.contains('Mrs. Dennis Schulist')
      .should('have.text', 'Mrs. Dennis Schulist')
  });

  it('no request to the server after selecting the same user again', () => {
    cy.intercept('https://mate.academy/students-api/users/5', cy.spy().as('apiCall'))

    cy.contains('5')
      .click()
      .click()

    cy.get('@apiCall')
      .its('callCount')
      .should('equal', 1)
  });

  it('selected user is cleared after clicking "Clear" button', () => {
    cy.contains('5')
      .click()

    cy.contains('Chelsey Dietrich')
      .should('have.text', 'Chelsey Dietrich')

    cy.contains('Clear')
      .click()

    cy.contains('No user selected')
      .should('have.text', 'No user selected')
  });

  it('todos can be filtered by title', () => {
    cy.request('https://mate.academy/students-api/todos')
      .then((response) => {
        const toDoTitle = response.body[0].title;

        cy.get('#input')
          .type(`${toDoTitle}`)

        cy.get('ul>li')
          .should('have.length', 1)
          .should('contain', `${toDoTitle}`)
      })
  });

  it('all todos can be selected using selector', () => {
    cy.request('https://mate.academy/students-api/todos')
      .then((response) => {
        cy.get('select')
          .select('All')

        cy.get('ul>li')
          .should('have.length', response.body.length)
      })
  });

  it('only active todos can be selected using selector', () => {
    cy.request('https://mate.academy/students-api/todos')
      .then((response) => {
        let numberOfTodos = 0;

        cy.get('select')
          .select('Not completed')

        response.body.forEach((todo) => {
          if (todo.completed === false) {
            numberOfTodos++
          }
        })

        cy.get('ul>li')
          .should('have.length', numberOfTodos)
      })
  });

  it('only completed todos can be selected using selector', () => {
    cy.request('https://mate.academy/students-api/todos')
      .then((response) => {
        let numberOfTodos = 0;

        cy.get('select')
          .select('Completed')

        response.body.forEach((todo) => {
          if (todo.completed === true) {
            numberOfTodos++
          }
        })

        cy.get('ul>li')
          .should('have.length', numberOfTodos)
      })
  });
});
