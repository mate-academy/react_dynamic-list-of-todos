import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import React from 'react';

type Props = {
  todo: Todo;
  selectedId: number | null;
  onSelect: (id: number) => void;
};

export const PostItem: React.FC<Props> = ({ todo, selectedId, onSelect }) => {
  const { id, title, completed } = todo;

  return (
    <tr
      data-cy="todo"
      className={classNames({
        'has-background-info-light': selectedId === id,
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
          onClick={() => onSelect(id)}
        >
          <span className="icon">
            <i
              className={classNames('far', {
                'fa-eye': selectedId !== id,
                'fa-eye-slash': selectedId === id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
