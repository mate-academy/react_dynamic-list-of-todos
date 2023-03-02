import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  isSelectedTodo: boolean;
  selectTodo: (todo: Todo) => void;
};

export const TodoItem: React.FC<Props> = React.memo(
  ({
    todo,
    isSelectedTodo,
    selectTodo,
  }) => {
    return (
      <tr
        data-cy="todo"
        className={classNames(
          { 'has-background-info-light': isSelectedTodo },
        )}
      >
        <td className="is-vcentered">{todo.id}</td>
        <td className="is-vcentered">
          {todo.completed && (
            <span className="icon" data-cy="iconCompleted">
              <i className="fas fa-check" />
            </span>
          )}
        </td>

        <td className="is-vcentered is-expanded">
          <p className={classNames({
            'has-text-success': todo.completed,
            'has-text-danger': !todo.completed,
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
            onClick={() => {
              selectTodo(todo);
            }}
          >
            <span className="icon">
              <i className={classNames(
                'far',
                { 'fa-eye': !isSelectedTodo },
                { 'fa-eye-slash': isSelectedTodo },

              )}
              />
            </span>
          </button>
        </td>
      </tr>
    );
  },
);
