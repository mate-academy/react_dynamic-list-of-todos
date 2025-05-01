import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoModal } from '../TodoModal';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const [isTodoModal, setIsTodoModal] = useState<number | null>(null);

  const handleCloseModal = useCallback(() => {
    setIsTodoModal(null);
  }, []);

  const handleOpenModal = useCallback((id: number) => {
    setIsTodoModal(id);
  }, []);

  return (
    <div className="block">
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
            <th></th>
          </tr>
        </thead>

        <tbody>
          {todos.map(({ id, title, completed }) => (
            <tr data-cy="todo" key={id}>
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
                  className={classNames({
                    'has-text-success': completed,
                    'has-text-danger': !completed,
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
                  onClick={() => handleOpenModal(id)}
                >
                  <span className="icon">
                    <i
                      className={classNames('far', {
                        'fa-eye': id !== isTodoModal,
                        'fa-eye-slash': id === isTodoModal,
                      })}
                    />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isTodoModal && (
        <TodoModal
          todoId={isTodoModal}
          todos={todos}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};
