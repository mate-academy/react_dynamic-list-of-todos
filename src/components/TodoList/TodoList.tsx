import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  todos: Todo[];
  onOpen: (todo: Todo) => void;
  selectedTodoId: number | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onOpen,
  selectedTodoId,
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
        {todos.map(({ completed, title, id, userId }) => (
          <tr key={id} data-cy="todo">
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
                  'has-text-success': completed === true,
                  'has-text-danger': completed === false,
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
                onClick={() => onOpen({ completed, title, id, userId })}
              >
                <span className="icon">
                  <i
                    className={cn('far', {
                      'fa-eye-slash': selectedTodoId === id,
                      'fa-eye': selectedTodoId !== id,
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
