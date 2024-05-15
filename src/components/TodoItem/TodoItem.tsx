import React, {useState} from "react";
import { Todo } from '../../types/Todo';
import { TodoModal } from '../TodoModal';

export const TodoItem: React.FC<Todo>  = ({ id,completed, title, userId }) => {
  const [modalOpen, setModalOpen] = useState(false);

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
            setModalOpen(true);
          }}
        >
            <span className="icon">
              <i className={`far fa-eye${modalOpen ? '-slash' : ''}`} />
            </span>
        </button>
      </td>
    </tr>
      {modalOpen && (
        <TodoModal
          setModal={setModalOpen}
          userId={userId}
          todo={{ id, title, completed }}
        />
      )}
    </>
  )
};
