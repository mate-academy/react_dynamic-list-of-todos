import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  selectedTodo: Todo | null;
  selectTodo: (todo: Todo | null) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  selectTodo,
  selectedTodo,
}) => {
  const { title, id, completed } = todo;
  const isTodoSelected = id === selectedTodo?.id;

  return (
    <tr
      data-cy="todo"
      className={classNames({
        'has-background-info-light': isTodoSelected,
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
          className={classNames({
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
          onClick={() => selectTodo(todo)}
        >
          <span className="icon">
            <i className={classNames('far', {
              'fa-eye-slash': isTodoSelected,
              'fa-eye': !isTodoSelected,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
