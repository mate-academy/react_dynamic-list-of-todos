import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { SelectedId } from '../../types/variables';
import { OnTodoClick } from '../../types/functions';

type Props = {
  todo: Todo;
  selectedTodoId: SelectedId;
  onTodoClick: OnTodoClick;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  selectedTodoId,
  onTodoClick,
}) => {
  const isSelected = todo.id === selectedTodoId;

  return (
    <tr
      data-cy="todo"
      className={classNames({
        'has-background-info-light': isSelected,
      })}
    >
      <td className="is-vcentered">{todo.id}</td>

      <td className="is-vcentered">
        {todo.completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>

      <td className="is-vcentered is-expanded">
        <p className={todo.completed ? 'has-text-success' : 'has-text-danger'}>
          {todo.title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => onTodoClick(todo.id)}
        >
          <span className="icon">
            <i className={`far ${isSelected ? 'fa-eye-slash' : 'fa-eye'}`} />
          </span>
        </button>
      </td>
    </tr>
  );
};
