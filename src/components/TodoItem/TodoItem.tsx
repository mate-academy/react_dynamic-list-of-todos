import React from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  handleBuuton: (el: Todo) => void;
  modalActive: boolean;
  selectedTodo: Todo | null;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  handleBuuton,
  modalActive,
  selectedTodo,
}) => {
  return (
    <tr data-cy="todo">
      <td className="is-vcentered">{todo.id}</td>

      {todo.completed ? (
        <td className="is-vcentered">
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        </td>
      ) : (
        <td className="is-vcentered"></td>
      )}

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
          onClick={() => handleBuuton(todo)}
        >
          <span className="icon">
            <i
              className={cn('far', {
                'fa-eye': !modalActive || selectedTodo?.id !== todo.id,
                'fa-eye-slash': modalActive && selectedTodo?.id === todo.id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
