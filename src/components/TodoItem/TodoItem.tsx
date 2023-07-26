import { useContext } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoContext } from '../../TodoContext';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const {
    oppenModalWindow,
    selectedTodoId,
    isVisible,
  } = useContext(TodoContext);
  const completeIcon = (
    <span className="icon" data-cy="iconCompleted">
      <i className="fas fa-check" />
    </span>
  );

  const infoButton = selectedTodoId === todo.id && isVisible
    ? (
      <i className="far fa-eye-slash" />
    )
    : (
      <i className="far fa-eye" />
    );

  return (
    <tr data-cy="todo" className="">
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">
        {todo.completed && completeIcon}
      </td>
      <td className="is-vcentered is-expanded">
        <p className={classNames({
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
            oppenModalWindow(todo);
          }}
        >
          <span className="icon">
            {infoButton}
          </span>
        </button>
      </td>
    </tr>
  );
};
