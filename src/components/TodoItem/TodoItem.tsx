import React from 'react';
import cn from 'classnames';

import { Todo } from '../../types';

interface Props {
  todo: Todo;
  isSelected: boolean | null;
  openTodoModal: (todo: Todo) => void;
}

export const TodoItem: React.FC<Props> = ({
  todo,
  isSelected,
  openTodoModal,
}) => {
  const { id, title, completed } = todo;

  return (
    <tr
      data-cy="todo"
      className={cn({ 'has-background-info-light': isSelected })}
      key={id}
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
          onClick={() => openTodoModal(todo)}
        >
          <span className="icon">
            <i
              className={cn('far', {
                'fa-eye-slash': isSelected,
                'fa-eye': !isSelected,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
