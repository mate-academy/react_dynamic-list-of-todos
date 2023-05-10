import React from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';

interface Props {
  visibleTodos: Todo[];
  selectedTodo: Todo | null;
  setSelectedTodo: (todo: Todo | null) => void;
}

export const TodoList: React.FC<Props> = ({
  visibleTodos,
  setSelectedTodo,
  selectedTodo,
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

        {visibleTodos.map(todo => {
          const { id, title, completed } = todo;

          return (
            <tr
              data-cy="todo"
              className=""
              key={id}
            >
              <td className="is-vcentered">
                {id}
              </td>
              <td className="is-vcentered" />

              <td className="is-vcentered">
                {completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>

              <td className="is-vcentered is-expanded">
                <p className={classNames({
                  'has-text-success': completed,
                  'has-text-danger': !completed,
                })}
                >
                  {title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                {selectedTodo?.id === id
                  ? (
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => setSelectedTodo(null)}
                    >
                      <span className="icon">
                        <i className="far fa-eye-slash" />
                      </span>
                    </button>
                  )
                  : (
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => setSelectedTodo(todo)}
                    >
                      <span className="icon">
                        <i className="far fa-eye" />
                      </span>
                    </button>
                  )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
