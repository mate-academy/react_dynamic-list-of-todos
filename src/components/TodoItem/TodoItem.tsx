import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  todo: Todo;
  selectedTodoId: number;
  onSelectTodo: (todo: Todo) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  selectedTodoId,
  onSelectTodo,
}) => {
  const { id, title, completed } = todo;

  return (
    <tr data-cy="todo">
      <td className="is-vcentered">{id}</td>
      {!completed ? (
        <td className="is-vcentered" />
      ) : (
        <td className="is-vcentered">
          <span data-cy="iconCompleted" className="icon">
            <i className="fas fa-check" />
          </span>
        </td>
      )}
      <td className="is-vcentered is-expanded">
        <p
          className={cn(
            { 'has-text-danger': !completed },
            { 'has-text-success': completed },
          )}
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
            <i
              className={cn(
                'far',
                { 'fa-eye-slash': id === selectedTodoId },
                { 'fa-eye': id !== selectedTodoId },
              )}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
