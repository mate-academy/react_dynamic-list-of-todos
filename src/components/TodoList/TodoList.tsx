import React from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';

type Props = {
  visibleTodos: Todo[];
  handleUserId: React.Dispatch<React.SetStateAction<number | null>>;
  handleTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
  selectedTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  visibleTodos,
  handleUserId,
  handleTodo,
  selectedTodo,
}) => {
  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {visibleTodos.map(todo => (
          <tr
            data-cy="todo"
            key={todo.id}
            className={cn((selectedTodo?.id === todo.id)
              && 'has-background-info-light')}
          >
            <td className="is-vcentered">
              {todo.id}
            </td>

            <td className="is-vcentered">
              {todo.completed
                && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
            </td>

            <td className="is-vcentered is-expanded">
              <p className={todo.completed
                ? 'has-text-success'
                : 'has-text-danger'}
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
                  handleUserId(todo.userId);
                  handleTodo(todo);
                }}
              >
                <span className="icon">
                  <i className={cn('far', (selectedTodo?.id === todo.id)
                    ? 'fa-eye-slash'
                    : 'fa-eye')}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
