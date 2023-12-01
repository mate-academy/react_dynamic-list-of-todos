/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo,
  getUserAction: (id: Todo) => void,
  selectedTodo: Todo | null,
}

export const TodoItem: React.FC<Props> = ({
  todo,
  getUserAction,
  selectedTodo,
}) => {
  const {
    id, completed, title,
  } = todo;

  return (
    <tr
      data-cy="todo"
      className={cn({
        'has-background-info-light': selectedTodo?.id === id,
      })}
    >
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        {todo.completed && (
          <span
            className="icon"
            data-cy="iconCompleted"
          >
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p className={cn({
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
          onClick={() => {
            getUserAction(todo);
          }}
        >
          <span className="icon">
            <i className={cn('far',
              {
                'fa-eye': selectedTodo?.id !== id,
                'fa-eye-slash': selectedTodo?.id === id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
