import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  selectedTodo: Todo | null;
  onTodoSelect: (todo: Todo) => void;
}

export const TodoItem: React.FC<Props> = ({
  todo,
  selectedTodo,
  onTodoSelect,
}) => {
  const {
    id,
    title,
    completed,
  } = todo;

  const isSelected = selectedTodo && selectedTodo.id === id;

  return (
    <tr
      data-cy="todo"
      className={cn({
        'has-background-info-light': isSelected,
      })}
      key={todo.id}
    >
      <td className="is-vcentered">{id}</td>
      {completed
        ? (
          <>
            <td className="is-vcentered">
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            </td>
            <td className="is-vcentered is-expanded">
              <p className="has-text-success">{title}</p>
            </td>
          </>
        )
        : (
          <>
            <td className="is-vcentered" />
            <td className="is-vcentered is-expanded">
              <p className="has-text-danger">{title}</p>
            </td>
          </>
        )}
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => onTodoSelect(todo)}
        >
          <span className="icon">
            <i className={cn('far', {
              'fa-eye': !isSelected, 'fa-eye-slash': isSelected,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
