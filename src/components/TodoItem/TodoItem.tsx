import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface TodoItemProps {
  todo: Todo;
  currentTodo: Todo | null;
  onSelect: (todo: Todo) => void;
}

export const TodoItem: React.FC<TodoItemProps> = (
  { todo, currentTodo, onSelect },
) => {
  const {
    id,
    title,
    completed,
  } = todo;

  return (
    <tr
      data-cy="todo"
      key={id}
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
        <p className={classNames({
          'has-text-danger': !completed,
          'has-text-success': completed,
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
          onClick={() => onSelect(todo)}
        >
          <span className="icon">
            <i className={classNames('far', {
              'fa-eye': id !== currentTodo?.id,
              'fa-eye-slash': id === currentTodo?.id,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
