import React from 'react';
import cn from 'classnames';
import { Todo } from '../../../types';

type Props = {
  todo: Todo,
  isSelected: boolean,
  onClick: (todo: Todo) => void,
};

export const TodoItem: React.FC<Props> = React.memo(
  ({ todo, isSelected, onClick }) => {
    const { id, completed, title } = todo;

    return (
      <tr
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
            onClick={() => onClick(todo)}
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
  },
);
