import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  choosingUser: (userId: Todo) => void,
  choosingRow?: number,
};

export const TodoList: React.FC<Props> = (
  {
    todos,
    choosingRow,
    choosingUser: choosingUserTodo,
  },
) => (
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
          title, id, completed,
        } = todo;

        const clicked = choosingRow === id;

        return (
          <tr
            data-cy="todo"
            key={id}
            className={
              classNames(
                { 'has-background-info-light': clicked },
              )
            }
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
              <p className={completed
                ? 'has-text-success'
                : 'has-text-danger'}
              >
                { title }
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => {
                  choosingUserTodo(todo);
                }}
              >
                <span className="icon">
                  {clicked ? (
                    <i className="far fa-eye-slash" />
                  ) : (
                    <i className="far fa-eye" />
                  )}
                </span>
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
