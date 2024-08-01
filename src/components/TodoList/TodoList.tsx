import cn from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectedId?: number | null;
  onSelect?: (id: number | null) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedId,
  onSelect = () => {},
}) => {
  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {todos.map(({ id, title, completed }) => (
          <tr
            key={id}
            data-cy="todo"
            className={cn({
              'has-background-info-light': id === selectedId,
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
              <p className={completed ? 'has-text-success' : 'has-text-danger'}>
                {title}
              </p>
            </td>

            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => {
                  if (selectedId === id) {
                    onSelect(null);
                  } else {
                    onSelect(id);
                  }
                }}
              >
                <span className="icon">
                  <i
                    className={cn('far', {
                      'fa-eye': selectedId !== id,
                      'fa-eye-slash': selectedId === id,
                    })}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
