import React from 'react';
import classnames from 'classnames';
import { Todo } from '../../types/Todo';

interface TodoInfoProps {
  todo: Todo;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  const { id, title, completed } = todo;

  return (
    <tr
      key={id}
      data-cy="todo"
      className={classnames({
        'has-background-info-light': completed,
      })}
    >
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        {completed && (
          <span className="icon">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p
          className={classnames({
            'has-text-success': completed,
            'has-text-danger': !completed,
          })}
        >
          {title}
        </p>
      </td>
      {/* Кнопка око */}
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
        >
          <span className="icon">
            <i className={classnames({
              'far fa-eye-slash': completed,
              'far fa-eye': !completed,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  )
};
