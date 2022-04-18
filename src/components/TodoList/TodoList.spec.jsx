import React from 'react';
import { mount } from '@cypress/react';
import { TodoList } from './TodoList';

describe('TodoList', () => {
    it('should have an input field', () => {
        mount(<TodoList />)

        cy.get('input')
            .should('exist')
    });

    it('should have "select" element', () => {
        mount(<TodoList />)

        cy.get('select')
            .should('exist')
    });
});