import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  onOpen: (id: number) => void;
  isOpen: boolean;
  selectedId: number | null;
}

export const TodoItem: React.FC<Props> = React.memo(
  ({
    todo,
    onOpen,
    isOpen,
    selectedId,
  }) => {
    const { id, completed, title } = todo;

    return (
      <tr data-cy="todo">
        <td className="is-vcentered">{id}</td>
        {completed ? (
          <td className="is-vcentered">
            <span className="icon" data-cy="iconCompleted">
              <i className="fas fa-check" />
            </span>
          </td>
        ) : (
          <td className="is-vcentered" />
        )}
        <td className="is-vcentered is-expanded">
          <p className={classNames({
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
            onClick={() => onOpen(id)}
          >
            <span className="icon">
              <i className={classNames('far', {
                'fa-eye': !isOpen
                  || id !== selectedId,
                'fa-eye-slash': isOpen
                  && id === selectedId,
              })}
              />
            </span>
          </button>
        </td>
      </tr>
    );
  },
);
