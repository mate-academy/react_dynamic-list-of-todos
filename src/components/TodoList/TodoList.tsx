import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  visibleTodos: Todo[];
  visibleModal: Todo | null;
  setVisibleModal: (todo: Todo) => void
};
export const TodoList: React.FC<Props> = ({
  visibleTodos, visibleModal, setVisibleModal,
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
        {visibleTodos.map(({
          id, completed, title, userId,
        }) => (
          <tr
            data-cy="todo"
            className={classNames({
              'has-background-info-light': visibleModal && visibleModal
                .id === id,
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
                className={classNames(
                  completed ? 'has-text-success' : 'has-text-danger',
                )}
              >
                {title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={
                  () => setVisibleModal({
                    id, completed, title, userId,
                  })
                }
              >
                <span className="icon">
                  <i
                    className={classNames(
                      'far',
                      visibleModal && visibleModal.id === id
                        ? 'fa-eye-slash'
                        : 'fa-eye',
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
