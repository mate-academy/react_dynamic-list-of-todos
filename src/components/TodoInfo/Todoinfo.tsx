import React, { useState } from 'react';
import classnames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoModal } from '../TodoModal';

interface TodoInfoProps {
  todo: Todo;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  const { id, title, completed } = todo;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectButton = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      {isModalOpen && (
        <TodoModal
          todo={todo}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <tr
        key={id}
        data-cy="todo"
        className={classnames({
          'has-background-info-light': completed,
        })}
      >
        <td className="is-vcentered">{id}</td>
        <td className="is-vcentered">
          {completed && (
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          )}
        </td>
        <td className="is-vcentered is-expanded">
          <p
            className={classnames({
              'has-text-success': completed,
              'has-text-danger': !completed,
            })}
          >
            {title}
          </p>
        </td>
        <td className="has-text-right is-vcentered">
          <button
            onClick={handleSelectButton}
            data-cy="selectButton"
            className="button"
            type="button"

          >
            <span className="icon">
              <i className="far fa-eye" />
            </span>
          </button>
        </td>
      </tr>
    </>

  );
};
