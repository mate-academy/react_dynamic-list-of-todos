import React from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  onTodoSelect: (userId: Todo) => void,
  selectedTodo: Todo | null,
}

export const TodoItem: React.FC<Props> = ({
  todo,
  onTodoSelect,
  selectedTodo,
}) => {
  const { id, completed, title } = todo;

  return (
    <tr
      key={id}
      data-cy="todo"
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
          onClick={() => {
            onTodoSelect(todo);
          }}
        >
          <span className="icon">
            <i className={cn('far', {
              'fa-eye': id !== selectedTodo?.id,
              'fa-eye-slash': id === selectedTodo?.id,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
