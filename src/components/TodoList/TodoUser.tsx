import React from 'react';

import { Todo } from '../../types/Todo';

interface PropsTodoUser {
  todo: Todo;
  getClickedDataFromTable: (value: number) => void;
}

export const TodoUser: React.FC<PropsTodoUser> = ({ todo, getClickedDataFromTable }) => {
  const { id, title, completed } = todo;

  const getClickedValue = (id: number) => {
    getClickedDataFromTable(id);
  };

  return (
    <tr data-cy="todo">
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        <span className="icon" data-cy="iconCompleted">
          {completed && <i className="fas fa-check" />}
        </span>
      </td>
      <td className="is-vcentered is-expanded">
        {completed ? (
          <p className="has-text-success">{title}</p>
        ) : (
          <p className="has-text-danger">{title}</p>
        )}
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => getClickedValue(id)}
        >
          <span className="icon">
            <i className="far fa-eye" />
          </span>
        </button>
      </td>
    </tr>
  );
};
