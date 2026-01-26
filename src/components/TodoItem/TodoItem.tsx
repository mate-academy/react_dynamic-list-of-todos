import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

interface Props {
  todo: Todo;
  selectedTodo: Todo | null;
  onSelectTodo: (todo: Todo) => void;
}

export const TodoItem: React.FC<Props> = ({
  todo,
  onSelectTodo,
  selectedTodo,
}) => {
  const { id, title, completed } = todo;

  return (
    <tr
      data-cy="todo"
      className={classNames({
        'has-background-info-light': selectedTodo?.id === id,
      })}
    >
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        {completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p
          className={classNames({
            'has-text-success': completed,
            'has-text-danger': !completed,
          })}
        >
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
            <i
              className={classNames({
                'far fa-eye-slash': selectedTodo?.id === id,
                'far fa-eye': selectedTodo?.id !== id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
