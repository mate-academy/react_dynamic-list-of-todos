import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoModal } from '../TodoModal';

export const TodoItem: React.FC<Todo> = ({ id, title, userId, completed }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <tr data-cy="todo" className="">
        <td className="is-vcentered">{id}</td>
        <td className="is-vcentered">
          {completed && (
            <span className="icon" data-cy="iconCompleted">
              <i className="fas fa-check" />
            </span>
          )}
        </td>
        <td className="is-vcentered is-expanded">
          <p className={completed ? 'has-text-success' : 'has-text-danger'}>
            {title}
          </p>
        </td>
        <td className="has-text-right is-vcentered">
          <button
            data-cy="selectButton"
            className="button"
            type="button"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <span className="icon">
              <i className={`far fa-eye${isModalOpen ? '-slash' : ''}`} />
            </span>
          </button>
        </td>
      </tr>
      {isModalOpen && (
        <TodoModal
          setModal={setIsModalOpen}
          userId={userId}
          todo={{ id, title, completed }}
        />
      )}
    </>
  );
};
