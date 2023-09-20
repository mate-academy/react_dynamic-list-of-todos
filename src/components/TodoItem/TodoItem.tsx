import cn from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  isSelectedTodo: boolean,
  todo: Todo,
  setSelectTodo: (todo: Todo) => void
};
export const TodoItem: React.FC<Props> = ({
  isSelectedTodo,
  todo: currentTodo,
  setSelectTodo,
}) => {
  const openModal = (todo: Todo) => {
    setSelectTodo(todo);
  };

  return (
    <tr
      data-cy="todo"
      className={cn({
        'has-background-info-light': isSelectedTodo,
      })}
      key={currentTodo.id}
    >
      <td className="is-vcentered">
        {currentTodo.id}
      </td>

      {currentTodo.completed ? (
        <td className="is-vcentered">
          <span
            className="icon"
            data-cy="iconCompleted"
          >
            <i className="fas fa-check" />
          </span>
        </td>
      ) : (
        <td
          aria-label="icon is clicked"
          className="is-vcentered"
        />
      )}

      <td className="is-vcentered is-expanded">
        <p
          className={cn(
            {
              'has-text-success': currentTodo.completed,
              'has-text-danger': !currentTodo.completed,
            },
          )}
        >
          {currentTodo.title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          onClick={() => openModal(currentTodo)}
          data-cy="selectButton"
          className="button"
          type="button"
          aria-label="View Todo"
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
