/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  seletedUsers: Todo | null,
  setSeletedUsers: (user: Todo) => void,
}

export const TodoList: React.FC<Props> = ({
  todos,
  seletedUsers,
  setSeletedUsers,
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
        {todos.map((todo) => (
          <tr
            data-cy="todo"
            className={classNames({
              'has-background-info-light': seletedUsers === todo,
            })}
            key={todo.id}
          >
            <td className="is-vcentered">{todo.id}</td>

            {todo.completed ? (
              <td className="is-vcentered">
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              </td>
            ) : (
              <td className="is-vcentered" />
            )}
            <td className="is-vcentered is-expanded">
              <p
                className={
                  todo.completed ? 'has-text-success' : 'has-text-danger'
                }
              >
                {todo.title}
              </p>
            </td>

            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => setSeletedUsers(todo)}
              >
                <span className="icon">
                  <i className={classNames('far', {
                    'fa-eye': seletedUsers !== todo,
                    'fa-eye-slash': seletedUsers === todo,
                  })}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
