import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  selectedTodosId?: number | null;
  onSelect?: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = React.memo(function TodoList({
  todos,
  selectedTodosId,
  onSelect = () => {},
}) {
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
        {todos.map(todo => (
          <tr
            key={todo.id}
            data-cy="todo"
            className={classNames({
              'has-background-info-light': selectedTodosId === todo.id,
            })}
          >
            <td>{todo.id}</td>
            <td>
              {todo.completed ? (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              ) : null}
            </td>
            <td>
              <p
                className={classNames({
                  'has-text-success': todo.completed,
                  'has-text-danger': !todo.completed,
                })}
              >
                {todo.title}
              </p>
            </td>
            <td>
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => onSelect(todo)}
              >
                {selectedTodosId === todo.id ? (
                  <span className="icon">
                    <i className="far fa-eye-slash" />
                  </span>
                ) : (
                  <span className="icon">
                    <i className="far fa-eye" />
                  </span>
                )}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});
