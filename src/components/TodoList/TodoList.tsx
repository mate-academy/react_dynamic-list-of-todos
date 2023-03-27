import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  activeId: number;
  setActiveId: (id: number) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  activeId,
  setActiveId,
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
                  className={completed
                    ? 'has-text-success'
                    : 'has-text-danger'}
                >
                  {title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => setActiveId(id)}
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
