import React from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[] | undefined;
  handleShowModal: (userId: number) => void;
  selectTodos: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  handleShowModal,
  selectTodos,
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
        {todos &&
          todos.map(todo => {
            const { title, completed, id } = todo;

            return (
              <tr key={id} data-cy="todo">
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
                    className={cn({
                      'has-text-danger': !completed,
                      'has-text-success': completed,
                    })}
                  >
                    {title}
                  </p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => handleShowModal(id)}
                  >
                    <span className="icon">
                      <i
                        className={cn('far', {
                          'fa-eye-slash': selectTodos === todo,
                          'fa-eye': selectTodos !== todo,
                        })}
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
