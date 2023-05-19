import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  onTodoSelect: (todo: Todo) => void;
  todoStatus: boolean;
};

export const TodoItem: React.FC<Props> = React.memo(
  ({
    todo,
    onTodoSelect,
    todoStatus,
  }) => {
    const { id, title, completed } = todo;

    return (
      <tr
        data-cy="todo"
        className={cn({ 'has-background-info-light': todoStatus })}
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
          <p className={cn({
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
            onClick={() => onTodoSelect(todo)}
          >
            <span className="icon">
              <i className={cn({
                'far fa-eye': !todoStatus,
                'far fa-eye-slash': todoStatus,
              })}
              />
            </span>
          </button>
        </td>
      </tr>
    );
  },
);
