import React from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
  selectedTodoId?: number;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  setSelectedTodo,
  selectedTodoId,
}) => {
  const { id, title, completed } = todo;

  return (
    <tr data-cy="todo" className="">
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
          onClick={() => setSelectedTodo(todo)}
        >
          <span className="icon">
            <i
              className={cn('far', {
                'fa-eye-slash': selectedTodoId === id,
                'fa-eye': selectedTodoId !== id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
