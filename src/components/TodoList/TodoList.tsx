import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  selectedTodo: Todo | null;
  selectTodo: (todo: Todo | null) => void
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodo,
  selectTodo,
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
      {todos.map((todo) => (
        <tr data-cy="todo" className="" key={todo.id}>
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
                todo.completed ? 'has-text-success' : 'has-text-danger',
              )}
            >
              {todo.title}
            </p>
          </td>
          <td className="has-text-right is-vcentered">
            {selectedTodo?.id === todo.id ? (
              <button
                data-cy="selectButton"
                className="button is-success"
                type="button"
                onClick={() => {
                  selectTodo(null);
                }}
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
                onClick={() => {
                  selectTodo(todo);
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
