import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Prope = {
  todos: Todo[],
  selectUser: (id: number, todoId: number) => void;
};

export const TodoList: React.FC<Prope> = ({ todos, selectUser }) => {
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
          <tr data-cy="todo" className="">
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed ? (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              ) : (
                ''
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p className={classNames(
                todo.completed ? 'has-text-success' : 'has-text-danger',
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
                onClick={() => {
                  selectUser(todo.userId, todo.id);
                }}
              >
                {/* <span className="icon">
                  {selectedTodo === todo.id ? (
                    <i className="far fa-eye-slash" />
                  ) : (
                    <i className="far fa-eye" />
                  )}
                </span> */}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
