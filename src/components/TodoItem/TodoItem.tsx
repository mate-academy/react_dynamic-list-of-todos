import cn from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  selectedTodo: Todo | null;
  onSelect: (todo: Todo) => void;
}

export const TodoItem: React.FC<Props> = ({ todo, selectedTodo, onSelect }) => {
  const isSelectedTodo = todo.id === selectedTodo?.id;

  return (
    <tr
      data-cy="todo"
      className={cn({
        'has-background-info-light': isSelectedTodo,
      })}
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
          className="button"
          type="button"
          onClick={() => onSelect(todo)}
        >
          <span className="icon">
            <i
              className={cn('far', {
                'fa-eye': !isSelectedTodo,
                'fa-eye-slash': isSelectedTodo,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
