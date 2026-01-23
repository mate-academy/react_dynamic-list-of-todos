import React from 'react';
import { UsersTodo } from '../../types/Todo';

interface Props {
  todo: UsersTodo;
  onSelectTodo: (todo: UsersTodo) => void;
}

export const TodoItem: React.FC<Props> = ({ todo, onSelectTodo }) => {
  const { id, title, completed } = todo;

  return (
    <tr data-cy="todo" className={completed ? 'has-background-info-light' : ''}>
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        {completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p className={completed ? 'has-text-success' : 'has-text-danger'}>
          {title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => onSelectTodo(todo)}
        >
          <span className="icon">
            <i className={completed ? 'far fa-eye' : 'far fa-eye-slash'} />
          </span>
        </button>
      </td>
    </tr>
  );
};
