import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  selectedTodoId: number;
  onTodoSelection: (id: number) => void;
}

export const TodoItem: React.FC<Props> = ({
  todo,
  selectedTodoId,
  onTodoSelection,
}) => {
  const {
    id,
    title,
    completed,
  } = todo;

  const isSelected = selectedTodoId === id;

  return (
    <tr
      data-cy="todo"
      className={cn({
        'has-background-info-light': isSelected,
      })}
      key={id}
    >
      <td className="is-vcentered">{id}</td>
      {completed
        ? (
          <td className="is-vcentered">
            <span className="icon" data-cy="iconCompleted">
              <i className="fas fa-check" />
            </span>
          </td>

        )
        : (
          <td className="is-vcentered" />
        )}
      <td className="is-vcentered is-expanded">
        <p className={cn(
          { 'has-text-danger': !completed },
          { 'has-text-success': completed },
        )}
        >
          {title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className={cn('button', {
            'is-link': isSelected,
          })}
          type="button"
          onClick={() => onTodoSelection(id)}
        >
          <span className="icon">
            {!isSelected
              ? (<i className="far fa-eye" />)
              : (<i className="far fa-eye-slash" />)}
          </span>
        </button>
      </td>
    </tr>
  );
};
