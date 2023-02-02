import React from 'react';
import classNames from 'classnames';
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
            onClick={() => onClick(todo)}
          >
            <span className="icon">
              <i
                className={classNames('far', {
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
