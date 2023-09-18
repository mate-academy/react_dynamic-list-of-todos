import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  selectedTodo: Todo | null;
  onSelectTodo: (todo: Todo) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  selectedTodo,
  onSelectTodo,
}) => {
  const { id, title, completed } = todo;
  const isTodoSelected = selectedTodo === todo;

  return (
    <tr
      data-cy="todo"
      className={cn({ 'has-background-info-light': isTodoSelected })}
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
        <p className={cn({
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
          onClick={() => onSelectTodo(todo)}
        >
          <span className="icon">
            <i className={cn(
              'far',
              {
                'fa-eye': !isTodoSelected,
                'fa-eye-slash': isTodoSelected,
              },
            )}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
