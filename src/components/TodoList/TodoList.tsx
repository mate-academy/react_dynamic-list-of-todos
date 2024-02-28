import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onSelect?: (user: Todo | null) => void;
  selectedTodoId?: number;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onSelect = () => {},
  selectedTodoId,
}) => (
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
          data-cy="todo"
          className={classNames(
            todo.id === selectedTodoId && 'has-background-info-light',
          )}
          key={todo.id}
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
            <p
              className={classNames(
                todo.completed === true
                  ? 'has-text-success'
                  : 'has-text-danger',
              )}
            >
              {todo.title}
            </p>
          </td>

          <td className="has-text-right is-vcentered">
            <button
              data-cy="selectButton"
              onClick={() => onSelect(todo.id === selectedTodoId ? null : todo)}
              type="button"
              className="button"
            >
              <span className="icon">
                <i
                  className={`far ${todo.id !== selectedTodoId ? 'fa-eye' : 'fa-eye-slash'}`}
                />
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
