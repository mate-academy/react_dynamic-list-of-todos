import React from 'react';

import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  currentTodo: Todo | null;
  onSetCurrentTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  onSetCurrentTodo,
  currentTodo,
}) => {
  const { title, completed, id } = todo;

  return (
    <tr
      data-cy="todo"
      className={cn({ 'has-background-info-light': id === currentTodo?.id })}
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
        <p className={completed ? 'has-text-success' : 'has-text-danger'}>
          {title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => onSetCurrentTodo(todo)}
        >
          <span className="icon">
            <i
              className={cn('far', {
                'fa-eye': id !== currentTodo?.id,
                'fa-eye-slash': id === currentTodo?.id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
