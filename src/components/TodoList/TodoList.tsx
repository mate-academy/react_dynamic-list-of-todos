import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  selectedTodoId?: number,
  setSelectedTodo: (todo: Todo) => void
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoId,
  setSelectedTodo,
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
        {todos.map(todo => (
          <tr
            data-cy="todo"
            className={classNames(
              {
                'has-background-info-light': todo.id === selectedTodoId,
              },
            )}
            key={todo.id}
          >
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed ? (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              ) : (
                <span className="icon">
                  &#10006;
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p className={classNames(
                {
                  'has-text-danger': !todo.completed,
                  'has-text-success': todo.completed,
                },
              )}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => setSelectedTodo(todo)}
              >
                <span className="icon">
                  {todo.id === selectedTodoId && (
                    <i className="far fa-eye-slash" />
                  )}
                  <i className="far fa-eye" />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
