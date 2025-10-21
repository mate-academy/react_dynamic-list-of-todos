import React from 'react';
import cn from 'classnames';
import type { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
};

export const TodoRow: React.FC<Props> = ({
  todo,
  isSelected,
  onToggleSelect,
}) => {
  return (
    <tr
      data-cy="todo"
      className={cn({ 'has-background-info-light': isSelected })}
    >
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
          className={cn({
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
          className="button is-small"
          type="button"
          onClick={() => onToggleSelect(todo.id)}
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
