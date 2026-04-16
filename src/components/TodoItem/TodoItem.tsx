import React from 'react';
import clnms from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  isSelected: boolean;
  onClick: (id: number) => void;
};

export const TodoItem: React.FC<Props> = React.memo(
  ({ todo, isSelected, onClick }) => {
    const { id, title, completed } = todo;

    return (
      <tr
        data-cy="todo"
        className={clnms({
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
            className={clnms({
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
            onClick={() => onClick(id)}
          >
            <span className="icon">
              <i
                className={clnms('far', {
                  'fa-eye-slash': isSelected,
                  'fa-eye': !isSelected,
                })}
              />
            </span>
          </button>
        </td>
      </tr>
    );
  },
);

TodoItem.displayName = 'TodoItem';
