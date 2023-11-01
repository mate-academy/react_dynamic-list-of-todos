import React, { useContext } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { DispatchContext, StateContext } from '../../Store';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;
  const dispatch = useContext(DispatchContext);
  const { todoModal } = useContext(StateContext);

  const handleModal = () => {
    dispatch({ type: 'setTodoModal', payload: todo });
  };

  return (
    <tr data-cy="todo" className="">
      <td className="is-vcentered">
        {id}
      </td>
      <td className="is-vcentered">
        {completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p
          className={cn({
            'has-text-danger': !completed,
            'has-text-success': completed,
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
          onClick={handleModal}
        >
          <span className="icon">
            <i
              className={cn('far', {
                'fa-eye': todoModal?.id !== id,
                'fa-eye-slash': todoModal?.id === id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
