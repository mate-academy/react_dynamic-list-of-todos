import React from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  isActive: boolean,
  setSelectedTodo: (todo: Todo | null) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  isActive,
  setSelectedTodo,
}) => {
  const {
    id,
    completed,
    title,
  } = todo;

  const handleShowBtn = () => {
    setSelectedTodo(todo);
  };

  return (
    <tr
      key={todo.id}
      data-cy="todo"
      className={cn(
        { 'has-background-info-light': isActive },
      )}
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
        <p
          className={cn({
            'has-text-danger': !completed,
            'has-text-success': completed,
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
          onClick={handleShowBtn}
        >
          <span className="icon">
            <i
              className={cn(
                'far',
                {
                  'fa-eye-slash': isActive,
                  'fa-eye': !isActive,
                },
              )}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
