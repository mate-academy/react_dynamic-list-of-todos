import React, { useContext } from 'react';
import {
  ActionTypes,
  DispatchContext,
  StateContext,
} from '../../context/TodoContext';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);
  const { openModal, currentTodo } = useContext(StateContext);
  const onOpenModal = () => {
    dispatch({ type: ActionTypes.OPEN_MODAL, payload: true });
    dispatch({ type: ActionTypes.CURRENT_TODO, payload: todo });
  };

  return (
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
        <p className={todo.completed ? 'has-text-success' : 'has-text-danger'}>
          {todo.title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          onClick={onOpenModal}
          data-cy="selectButton"
          className="button"
          type="button"
        >
          <span className="icon">
            {openModal && currentTodo?.id === todo.id ? (
              <i className="far fa-eye-slash" />
            ) : (
              <i className="far fa-eye" />
            )}
          </span>
        </button>
      </td>
    </tr>
  );
};
