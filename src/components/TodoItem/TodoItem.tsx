import React from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  selectedTodoId: number;
  selectTodo: (todo: Todo) => void;
};

export const TodoItem: React.FC<Props> = React.memo(
  ({ todo, selectedTodoId, selectTodo }) => {
    return (
      <tr
        data-cy="todo"
        className={classNames({
          'has-background-info-light': todo.id === selectedTodoId,
        })}
      >
        <td className="is-vcentered">{todo.id}</td>

        {todo.completed ? (
          <td className="is-vcentered">
            <span className="icon" data-cy="iconCompleted">
              <i className="fas fa-check" />
            </span>
          </td>
        ) : (
          <td className="is-vcentered" />
        )}

        <td className="is-vcentered is-expanded">
          <p
            className={classNames({
              'has-text-danger': !todo.completed,
              'has-text-success': todo.completed,
            })}
          >
            {todo.title}
          </p>
        </td>

        <td className="has-text-right is-vcentered">
          <button
            data-cy="selectButton"
            className="button"
            type="button"
            onClick={() => selectTodo(todo)}
          >
            <span className="icon">
              <i
                className={classNames('far', {
                  'fa-eye': todo.id !== selectedTodoId,
                  'fa-eye-slash': todo.id === selectedTodoId,
                })}
              />
            </span>
          </button>
        </td>
      </tr>
    );
  },
);
