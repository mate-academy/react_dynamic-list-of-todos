import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectedTodoId?: number;
  onSelect?: (todo: Todo | null) => void;
};

export const TodoList: React.FC<Props> = React.memo(
  ({ todos, selectedTodoId, onSelect = () => {} }) => (
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
        {todos.map(({
          id,
          completed,
          title,
          userId,
        }) => (
          <tr data-cy="todo" className="" key={id}>
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
              <p className={classNames(
                { 'has-text-success': completed },
                { 'has-text-danger': !completed },
              )}
              >
                {title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              {selectedTodoId === id ? (
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => onSelect(null)}
                >
                  <span className="icon">
                    <i className="far fa-eye-slash" />
                  </span>
                </button>
              ) : (
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => onSelect({
                    id,
                    completed,
                    title,
                    userId,
                  })}
                >
                  <span className="icon">
                    <i className="far fa-eye" />
                  </span>
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
);
