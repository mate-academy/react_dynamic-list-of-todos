import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  todo: Todo;
  onSelectTodo: (id: number) => void;
  isSelected: boolean;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  onSelectTodo,
  isSelected,
}: Props) => {
  const isCompleted = todo.completed;

  return (
    <tr
      data-cy="todo"
      className={cn({
        'has-background-info-light': isSelected,
      })}
    >
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">
        {isCompleted && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p className={isCompleted ? 'has-text-success' : 'has-text-danger'}>
          {todo.title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => onSelectTodo(todo.id)}
        >
          <span className="icon">
            <i className={`far ${isSelected ? 'fa-eye-slash' : 'fa-eye'}`} />
          </span>
        </button>
      </td>
    </tr>
  );
};
