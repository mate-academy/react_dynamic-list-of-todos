import { useContext, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import {
  ACTIONS,
  DispatchContext,
  StateContext,
} from '../components/ToDoContext';

type Props = {
  todo: Todo
};

export const ToDoItem: React.FC<Props> = ({ todo }) => {
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const dispatch = useContext(DispatchContext);
  const { selectedTodo } = useContext(StateContext);

  function selectUser() {
    dispatch({ type: ACTIONS.SET_TODO, payload: todo });
    setIsButtonPressed(!isButtonPressed);
  }

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
        <p className={classNames({
          'has-text-success': todo.completed === true,
          'has-text-danger': todo.completed === false,
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
          onClick={selectUser}
        >
          <span className="icon">
            <i className={classNames('far fa-eye', {
              'far fa-eye fa-eye-slash': selectedTodo.id,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
