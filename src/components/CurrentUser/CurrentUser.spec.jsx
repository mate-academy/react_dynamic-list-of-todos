import React from 'react';
import { mount } from '@cypress/react';
import { CurrentUser } from './CurrentUser';

describe('CurrentUser', () => {
  it('should have a button with the name "Clear', () => {
    mount(<CurrentUser />);

    cy.get('[type="button"]')
      .should('contain', 'Clear');
  });
});
