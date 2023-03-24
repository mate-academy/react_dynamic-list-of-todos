import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  todoId: number,
  setTodoId: (id: number) => void,
  setUserId: (id: number) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  todoId,
  setTodoId,
  setUserId,
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

      {todos.map((todo) => {
        const {
          id,
          title,
          completed,
        } = todo;

        return (
          <tr
            data-cy="todo"
            className={classNames({
              'has-background-info-light': todoId === todo.id,
            })}
            key={id}
          >
            <td className="is-vcentered">{id}</td>
            <td className="is-vcentered">
              {completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={classNames(completed
                  ? 'has-text-success' : 'has-text-danger')}
              >
                {title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => {
                  setTodoId(todo.id);
                  setUserId(todo.userId);
                }}
              >
                <span className="icon">
                  <i
                    className={classNames('far',
                      todo.id !== todoId ? 'fa-eye' : 'fa-eye-slash')}
                  />
                </span>
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
