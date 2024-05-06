import React, { useContext } from 'react';
import { Todo } from '../../types/Todo';
import { DispatchContext, StateContext } from '../../context/TodoContext';
import { getUser } from '../../api';
import classNames from 'classnames';

interface Props {
  theTodo: Todo;
}

export const TodoElement: React.FC<Props> = ({ theTodo }) => {
  const { title, id, completed } = theTodo;
  const { todo, isModal } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const handleModal = async () => {
    try {
      dispatch({ type: 'modalLoading', modalLoading: true });
      dispatch({ type: 'showModal', isModal: true });

      const user = await getUser(theTodo.userId);

      dispatch({
        type: 'todoModal',
        todo: { ...theTodo, user },
      });
    } catch (error) {
      alert(error);
    } finally {
      dispatch({ type: 'modalLoading', modalLoading: false });
    }
  };

  return (
    <tr data-cy="todo">
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        {completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check"></i>
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p className={
          classNames({
            'has-text-danger': !completed,
            'has-text-success': completed,
          })
        }>{title}</p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={handleModal}
        >
          <span className="icon">
            {isModal && todo?.id === id
              ? <i className="far fa-eye-slash" />
              : <i className="far fa-eye" />
            }
          </span>
        </button>
      </td>
    </tr>
  );
};
