import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  selectedTodo: Todo | null;
  onSelect: (todo: Todo) => void;
}

export const TodoInfo: React.FC<Props> = ({
  todo,
  selectedTodo,
  onSelect,
}) => {
  const { id, title, completed } = todo;

  const isTodoSelected = id === selectedTodo?.id;

  return (
    <tr
      key={id}
      data-cy="todo"
      className={cn({
        'has-background-info-light': isTodoSelected,
      })}
    >
      <td className="is-vcentered">
        {id}
      </td>

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
          onClick={() => onSelect(todo)}
        >
          <span className="icon">
            <i className={cn('far', {
              'fa-eye': !isTodoSelected,
              'fa-eye-slash': isTodoSelected,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
