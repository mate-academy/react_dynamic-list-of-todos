import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { TodoModal } from '../TodoModal';

type Props = {
  todo: Todo;
};
export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <tr data-cy="todo" className="">
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
            className={classNames({
              'has-text-success': todo.completed,
              'has-text-danger': !todo.completed,
            })}
          >
            {todo.title}
          </p>
        </td>
        <td className="has-text-right is-vcentered">
          <button
            data-cy="selectButton"
            className="button"
            type="button"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            <span className="icon">
              <i
                className={classNames('far', {
                  'fa-eye': !openModal,
                  'fa-eye-slash': openModal,
                })}
              />
            </span>
          </button>
        </td>
      </tr>

      {openModal && <TodoModal todo={todo} onClose={setOpenModal} />}
    </>
  );
};
