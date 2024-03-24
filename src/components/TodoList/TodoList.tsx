import React from 'react';

import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  todos: Todo[];
  modalInfo: Todo | null;
  setModalInfo: (todoInfo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  modalInfo,
  setModalInfo,
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
        {todos.map(todo => (
          <tr
            data-cy="todo"
            className={cn({
              'has-background-info-light': modalInfo?.id === todo.id,
            })}
            key={todo.id}
          >
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
                className={cn(
                  {
                    'has-text-success': todo.completed,
                    'has-text-danger': !todo.completed
                  }
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
                onClick={() => setModalInfo(todo)}
              >
                <span className="icon">
                  <i
                    className={cn(
                      'far',
                      {
                        'fa-eye-slash': modalInfo?.id === todo.id,
                        'fa-eye': modalInfo?.id !== todo.id
                      }
                    )}
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
