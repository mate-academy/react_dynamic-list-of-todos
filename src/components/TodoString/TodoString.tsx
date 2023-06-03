import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  selectedTodo: Todo | null;
  onOpen: (todo: Todo, userId: number) => void;
}

export const TodoString: React.FC<Props> = ({
  todo,
  selectedTodo,
  onOpen,
}) => {
  const {
    id,
    title,
    completed,
    userId,
  } = todo;

  return (
    <tr
      key={id}
      data-cy="todo"
      className={cn({
        'has-background-info-light': selectedTodo,
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
        <p className={cn(completed
          ? 'has-text-success'
          : 'has-text-danger')}
        >
          {title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => onOpen(todo, userId)}
        >
          <span className="icon">
            <i className={cn(selectedTodo
              ? 'far fa-eye-slash'
              : 'far fa-eye')}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
