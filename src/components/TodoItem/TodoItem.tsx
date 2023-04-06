import { useContext } from 'react';
import classNames from 'classnames';

import { DispatchContext, StateContext } from '../../providers/StateProvider';

import { Todo } from '../../types/Todo';
import { ActionTypes } from '../../types/ActionTypes';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);
  const { selectedTodo } = useContext(StateContext);

  return (
    <tr data-cy="todo" className="">
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">
        {todo.completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p
          className={classNames(
            {
              'has-text-danger': !todo.completed,
              'has-text-success': todo.completed,
            },
          )}
        >
          {todo.title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => dispatch({
            type: ActionTypes.SELECT_TODO,
            selectedTodo: todo,
          })}
        >
          <span className="icon">
            {todo.id === selectedTodo?.id ? (
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
