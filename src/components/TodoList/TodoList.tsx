import React from 'react';
import clsx from 'clsx';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  selectedUser: number;
  changeSelectUser: (p: number) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectedUser,
  changeSelectUser,
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
        {todos.map(todo => {
          const isComplete: boolean = todo.completed;

          return (
            <tr key={todo.id} data-cy="todo" className="">
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {isComplete && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p
                  className={clsx(
                    isComplete ? 'has-text-success' : 'has-text-danger',
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
                  onClick={() => changeSelectUser(todo.id)}
                >
                  <span className="icon">
                    <i
                      className={clsx(
                        'far',
                        selectedUser !== todo.id
                          ? 'far fa-eye'
                          : 'fa-eye-slash',
                      )}
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
};
