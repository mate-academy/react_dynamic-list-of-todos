import classnames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';
interface Props {
  todo: Todo;
  onSelect: (value: Todo | undefined) => void;
  isSelected: boolean;
}

export const TodoItem: React.FC<Props> = React.memo(
  ({ todo, onSelect, isSelected }) => {
    return (
      <tr
        data-cy="todo"
        className={classnames({
          'has-background-info-light': isSelected,
        })}
      >
        <td className="is-vcentered">{todo.id}</td>
        <td className="is-vcentered">
          {todo.completed && (
            <span className="icon" data-cy="iconCompleted">
              <i className="fas fa-check"></i>
            </span>
          )}
        </td>
        <td className="is-vcentered is-expanded">
          <p
            className={classnames({
              'has-text-success': todo.completed,
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
            onClick={() => onSelect(isSelected ? undefined : todo)}
          >
            <span className="icon">
              <i className={isSelected ? 'far fa-eye-slash' : 'far fa-eye'}></i>
            </span>
          </button>
        </td>
      </tr>
    );
  },
);

TodoItem.displayName = 'TodoItem';
