import React, { useContext } from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';
import { DispatchContext, StateContext } from '../../context/ReduxContext';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { currentId } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const { id, title, completed, userId } = todo;

  const handleSeeClick = () => {
    dispatch({
      type: 'seeMore',
      curruntId: id,
      currentTitile: title,
      statusComleted: completed,
      userId: userId,
    });
  };

  return (
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
        <p
          className={cn('has-text-success', { 'has-text-danger': !completed })}
        >
          {title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          onClick={handleSeeClick}
          data-cy="selectButton"
          className="button"
          type="button"
        >
          {todo.id !== currentId ? (
            <span className="icon">
              <i className="far fa-eye" />
            </span>
          ) : (
            <span className="icon">
              <i className="far fa-eye-slash" />
            </span>
          )}
        </button>
      </td>
    </tr>
  );
};
