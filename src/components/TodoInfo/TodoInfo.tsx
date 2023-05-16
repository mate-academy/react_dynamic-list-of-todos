import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  todoModal: boolean;
  handleTodoOpen: (todo: Todo) => void;
};

export const TodoInfo: React.FC<Props> = ({
  todo,
  todoModal,
  handleTodoOpen,
}) => {
  const isSuccess = todo.completed;

  return (
    <tr data-cy="todo">
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">
        {isSuccess && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p className={classNames({
          'has-text-danger': !isSuccess,
          'has-text-success': isSuccess,
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
          onClick={() => handleTodoOpen(todo)}
        >
          <span className="icon">
            <i className={classNames('far', {
              'fa-eye': !todoModal,
              'fa-eye-slash': todoModal,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
