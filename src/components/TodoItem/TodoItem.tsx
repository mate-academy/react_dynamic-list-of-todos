import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  isPressed: boolean,
  updateModal: (newTodo: Todo) => void
};

export const TodoItem: React.FC<Props> = ({ todo, isPressed, updateModal }) => {
  const { id, title, completed } = todo;

  return (
    <tr
      data-cy="todo"
      className={classNames({
        'has-background-info-light': isPressed,
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
        <p className={classNames({
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
          onClick={() => updateModal(todo)}
        >
          <span className="icon">
            <i
              className={classNames('far', {
                'fa-eye': !isPressed,
                'fa-eye-slash': isPressed,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
