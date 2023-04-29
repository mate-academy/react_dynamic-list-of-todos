import React from 'react';
import classnames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[]
  onTodoSelected: (todo: Todo | null) => void,
  todoId: number | undefined
}

export const TodoList: React.FC<Props> = ({
  todos,
  onTodoSelected,
  todoId,
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
      {todos.map(todo => {
        return (
          <tr
            data-cy="todo"
            className={classnames({
              'has-background-info-light': todo.id === todoId,
            })}
            key={todo.id}
          >
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed
                && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
            </td>
            <td className="is-vcentered is-expanded">
              <p className={classnames(
                todo.completed
                  ? 'has-text-success'
                  : 'has-text-danger',
              )}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              {todoId === todo.id ? (
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => onTodoSelected(null)}
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
                  onClick={() => onTodoSelected(todo)}
                >
                  <span className="icon">
                    <i className="far fa-eye" />
                  </span>
                </button>
              )}
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
