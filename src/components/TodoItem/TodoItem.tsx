import React, { memo } from 'react';
import classNames from 'classnames';

import { Todo } from '../../types';

type Props = {
  todo: Todo;
  selectedTodo?: Todo | null;
  onSelect?: (todo: Todo | null) => void;
};

export const TodoItem: React.FC<Props> = memo(({
  todo,
  selectedTodo = null,
  onSelect = () => {},
}) => {
  const { id, title, completed } = todo;
  const isSelected = id === selectedTodo?.id;

  return (
    <tr
      data-cy="todo"
      className={classNames({
        'has-background-info-light': isSelected,
      })}
    >
      <td className="is-vcentered">
        {id}
      </td>

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
          type="button"
          className="button"
          data-cy="selectButton"
          onClick={() => onSelect(todo)}
        >
          <span className="icon">
            <i
              className={classNames('far', {
                'fa-eye-slash': isSelected,
                'fa-eye': !isSelected,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
});
