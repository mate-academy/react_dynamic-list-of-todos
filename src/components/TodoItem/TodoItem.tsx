import React, { memo, useContext } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { DispatchContext, StateContext } from '../../store/Store';
import { ActionTypes } from '../../store/ActionTypes';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = memo(({ todo }) => {
  const dispatch = useContext(DispatchContext);
  const { currentTodo } = useContext(StateContext);

  const { id, title, completed } = todo;

  const showTodo = () => {
    dispatch({
      type: ActionTypes.ToggleTodoModal,
      payload: {
        todo,
      },
    });
  };

  return (
    <tr
      data-cy="todo"
      className={classNames({
        'has-background-info-light': currentTodo?.id === id,
      })}
    >
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
          onClick={showTodo}
        >
          <span className="icon">
            <i
              className={classNames('far', {
                'fa-eye': currentTodo?.id !== id,
                'fa-eye-slash': currentTodo?.id === id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
});
