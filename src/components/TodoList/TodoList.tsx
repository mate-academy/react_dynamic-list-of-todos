import React from 'react';
import classnames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectTodo: (todoId: number) => void;
  selectedTodoId: number;
};

export const TodoList: React.FC<Props> = ({
  todos, selectTodo, selectedTodoId,
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
        <tr data-cy="todo" key={todo.id}>
          <td className="is-vcentered">{todo.id}</td>
          <td>
            {todo.completed && (
              <span className="icon">
                <i className="fas fa-check" />
              </span>
            )}
          </td>
          <td className="is-vcentered" />

          <td className="is-vcentered is-expanded">
            <p className={classnames(
              {
                'has-text-success': todo.completed,
                'has-text-danger': !todo.completed,
              },
            )}
            >
              {todo.title}
            </p>
          </td>

          <td className="has-text-right is-vcentered">
            {selectedTodoId === todo.id ? (
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
            ) : (
              <button
                onClick={() => {
                  selectTodo(todo.id);
                }}
                data-cy="selectButton"
                className="button"
                type="button"
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
