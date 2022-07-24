/* eslint-disable max-len */
import React from 'react';

export const TodoList: React.FC = () => (
  <table
    data-cy="listOfTodos"
    className="table is-narrow is-fullwidth is-size-5 has-text-weight-medium"
  >
    <tbody>
      <tr className="has-background-success-light has-text-success">
        <td className="is-vcentered">
          <span className="icon">
            <i className="fas fa-check-square" />
          </span>
        </td>

        <td className="is-vcentered is-expanded">
          delectus aut autem
        </td>

        <td className="has-text-right is-vcentered">
          <button
            className="button is-warning"
            disabled
            type="button"
            data-cy="userButton"
          >
            User&nbsp;#1
          </button>
        </td>
      </tr>

      <tr className="has-background-danger-light has-text-danger">
        <td className="is-vcentered">
          <span className="icon">
            <i className="fas fa-square-xmark" />
          </span>
        </td>

        <td className="is-vcentered is-expanded">
          distinctio vitae autem nihil ut molestias quo
        </td>

        <td className="has-text-right is-vcentered">
          <button
            className="button is-warning"
            type="button"
            data-cy="userButton"
          >
            User&nbsp;#2
          </button>
        </td>
      </tr>
    </tbody>
  </table>
);
