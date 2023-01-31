import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[],
  todoId: number,
  onSelectTodo: (id: number) => void,
  onSelectUser: (id: number) => void,
}

export const TodoList: React.FC<Props> = ({
  todos,
  todoId,
  onSelectTodo,
  onSelectUser,
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
          key={todo.id}
          data-cy="todo"
          className={classNames({
            'has-background-info-light': todo.id === todoId,
          })}
        >
          <td className="is-vcentered">{todo.id}</td>
          {!todo.completed && <td className="is-vcentered" />}
          {todo.completed && (
            <td className="is-vcentered">
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            </td>
          )}
          <td className="is-vcentered is-expanded">
            <p className={classNames('has-text-success', {
              'has-text-danger': !todo.completed,
            })}
            >
              {todo.title}
            </p>
          </td>
          {todo.id === todoId
            ? (
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                >
                  <span className="icon">
                    <i className="far fa-eye-slash" />
                  </span>
                </button>
              </td>
            )
            : (
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => {
                    onSelectTodo(todo.id);
                    onSelectUser(todo.userId);
                  }}
                >
                  <span className="icon">
                    <i className="far fa-eye" />
                  </span>
                </button>
              </td>
            )}
        </tr>
      ))}
    </tbody>
  </table>
);
