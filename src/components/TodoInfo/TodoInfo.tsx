import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';
import { SelectedTodo } from '../../types/SelectedTodo';

type Props = {
  todo: Todo;
  selectedTodo: SelectedTodo;
  setSelectedTodo: (todo: SelectedTodo) => void;
};

export const TodoInfo: React.FC<Props> = ({
  todo,
  selectedTodo,
  setSelectedTodo,
}: Props) => {
  const { id, title, completed } = todo;
  const isSelected = selectedTodo?.id === id;

  return (
    <tr
      key={id}
      data-cy="todo"
      className={cn({
        'has-background-info-light': isSelected,
      })}
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
          onClick={() => setSelectedTodo(todo)}
        >
          <span className="icon">
            <i
              className={cn('far', {
                'fa-eye': !isSelected,
                'fa-eye-slash': isSelected,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
