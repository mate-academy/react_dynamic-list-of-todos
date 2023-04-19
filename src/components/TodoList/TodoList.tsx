import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  selectTodo: (todoId: number) => void,
  selectedTodoId: number,
};

export const TodoList: React.FC<Props> = (
  {
    todos,
    selectTodo,
    selectedTodoId,
  },
) => {
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
            className=""
          >
            <td className="is-vcentered">{todo.id}</td>
            {!todo.completed
              ? <td className="is-vcentered" />
              : (
                <td className="is-vcentered">
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                </td>
              )}

            <td className="is-vcentered is-expanded">
              <p className={classNames('', {
                'has-text-success': todo.completed,
                'has-text-danger': !todo.completed,
              })}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              {selectedTodoId === todo.id
                ? (
                  <button
                    data-cy="selectButton"
                    className="button is-link"
                    type="button"
                    onClick={() => {
                      selectTodo(0);
                    }}
                  >
                    <span className="icon">
                      <i className="far fa-eye-slash" />
                    </span>
                  </button>
                )
                : (
                  <button
                    type="button"
                    data-cy="selectButton"
                    className="button"
                    onClick={() => {
                      selectTodo(todo.id);
                    }}
                  >
                    <span className="icon">
                      <i className="far fa-eye" />
                    </span>
                  </button>
                )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
