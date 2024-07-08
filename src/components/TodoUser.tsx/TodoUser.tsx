import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

interface Props {
  todo: Todo;
  onOpen: (todo: Todo) => void;
  selectedTodoId: number | null;
  key: number | null;
}

export const TodoUser: React.FC<Props> = ({
  todo,
  onOpen,
  selectedTodoId,
  key,
}) => {
  return (
    <tr data-cy="todo" className="" key={key}>
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
          onClick={() => onOpen(todo)}
        >
          <span className="icon">
            <i
              className={cn('far', {
                'fa-eye-slash': selectedTodoId === todo.id,
                'fa-eye': selectedTodoId !== todo.id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
