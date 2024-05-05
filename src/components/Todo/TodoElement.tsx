import React, { useContext } from 'react';
import { Todo } from '../../types/Todo';
import { DispatchContext } from '../../context/TodoContext';
import { getUser } from '../../api';
import classNames from 'classnames';

interface Props {
  theTodo: Todo;
}

export const TodoElement: React.FC<Props> = ({ theTodo }) => {
  const { title, id, completed } = theTodo;
  const dispatch = useContext(DispatchContext);

  const handleModal = async () => {
    try {
      dispatch({ type: 'showModal', isModal: true });
      dispatch({ type: 'modalLoading', modalLoading: true });
      const user = await getUser(theTodo.userId);

      dispatch({
        type: 'todoModal',
        todo: { ...theTodo, user },
      });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <tr data-cy="todo" className="">
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
            <i className="far fa-eye" />
          </span>
        </button>
      </td>
    </tr>
  );
};
