import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  activeId: number;
  onActivateTodo: (id: number) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  activeId,
  onActivateTodo,
}) => {
  return (
    <table className="table is-hoverable is-striped m-3">
      <thead>
        <tr>
          <th className="is-info">#</th>
          <th className="is-info">
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th className="is-info">Title</th>
          <th className="is-info"> </th>
        </tr>
      </thead>

      <tbody>
        {todos.map(todo => {
          const {
            id,
            title,
            completed,
          } = todo;
          const isActiveId = id === activeId;

          return (
            <tr
              key={id}
              data-cy="todo"
              className={classNames({
                'has-background-info-light': isActiveId,
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
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => onActivateTodo(id)}
                >
                  <span className="icon">
                    <i className={classNames(
                      'far',
                      { 'fa-eye-slash': isActiveId },
                      { 'fa-eye': !isActiveId },
                    )}
                    />
                  </span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
