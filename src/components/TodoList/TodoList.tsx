import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  selectedTodoId: number,
  selectTodo: (value: number) => void
};

export const TodoList: React.FC<Props> = React.memo(
  ({ todos, selectedTodoId, selectTodo }) => {
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
              className=""
              key={todo.id}
            >
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                <span className="icon">
                  <i className={classNames(
                    { 'fas fa-check': todo.completed },
                  )}
                  />
                </span>
              </td>
              <td className="is-vcentered is-expanded">
                <p className={classNames(
                  todo.completed
                    ? 'has-text-success'
                    : 'has-text-danger',
                )}
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                {
                  selectedTodoId === todo.id
                    ? (
                      <button
                        data-cy="selectButton"
                        className="button"
                        type="button"
                        onClick={() => selectTodo(0)}
                      >
                        <span className="icon">
                          <i className="far fa-eye-slash" />
                        </span>
                      </button>
                    ) : (
                      <button
                        data-cy="selectButton"
                        className="button"
                        type="button"
                        onClick={() => selectTodo(todo.id)}
                      >
                        <span className="icon">
                          <i className="far fa-eye" />
                        </span>
                      </button>
                    )
                }

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  },
);
