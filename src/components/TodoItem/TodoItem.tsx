import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todo: Todo;
  selectId: number | null;
  onSelectedTodo: (id: number) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  selectId,
  onSelectedTodo,
}) => {
  const { id, title, completed } = todo;

  return (
    <tr
      data-cy="todo"
      className={classNames('', {
        'has-background-info-light': selectId === id,
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
            'has-text-success': completed,
            'has-text-danger': !completed,
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
          onClick={() => onSelectedTodo(id)}
        >
          <span className="icon">
            <i
              className={classNames('far', {
                'fa-eye-slash': selectId === id,
                'fa-eye': selectId !== id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
