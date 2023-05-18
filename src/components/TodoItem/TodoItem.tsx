import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

export interface Props {
  todo: Todo;
  selectedTodo: Todo | null;
  showModal: (userId: number, todo: Todo) => void;
}

export const TodoItem: React.FC<Props> = ({
  todo,
  selectedTodo,
  showModal,
}) => {
  const {
    id,
    completed,
    title,
    userId,
  } = todo;

  return (
    <tr
      key={id}
      data-cy="todo"
      className={classNames({
        'has-background-info-light': selectedTodo,
      })}
    >
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        {completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check has-text-success" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p className={classNames({
          'has-text-success': completed,
          'has-text-danger': !completed,
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
          onClick={() => showModal(userId, todo)}
        >
          <span className="icon">
            <i className={classNames('far', {
              'fa-eye': !selectedTodo,
              'fa-eye-slash': selectedTodo,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
